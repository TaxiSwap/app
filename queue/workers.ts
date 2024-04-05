import { Worker, Queue } from "bullmq";
import Redis from "ioredis";
import { ethers } from "ethers";
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

import {
  getMessageHashFromTransaction,
  pollAttestationStatus,
  findRejectionReason,
} from "../app/blockchain/utils";
import { chainConfigs } from "../app/config/ChainConfigMap";
import messageTransmitterAbi from "../app/blockchain/contracts/MessageTransmitter.abi.json";

// Establish the Redis connection
const connection = new Redis({
  host: "127.0.0.1",
  port: 6379,
  db: 0,
  password: process.env.REDIS_PASSWORD,
  maxRetriesPerRequest: null,
});
const queueName = "simpleMessageReceptionQueue";

export const simpleQueue = new Queue(queueName, {
  connection,

  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 500,
    },
  },
});

const simpleMessageReceptionQueueWorker = new Worker(
  queueName,
  async (job: {
    data: { depositTx: any; sourceChain: any; destinationChain: any };
  }) => {
    try {
      const { depositTx, sourceChain, destinationChain } = job.data;
      if (!depositTx || !sourceChain || !destinationChain) {
        throw new Error(
          "depositTx, sourceChain, and destinationChain are required"
        );
      }

      const providerSource = new ethers.JsonRpcProvider(
        chainConfigs[sourceChain]?.providerUrl
      );
      const transactionReceipt = await providerSource.getTransactionReceipt(
        depositTx
      );

      if (
        transactionReceipt?.to?.toLowerCase() !=
        chainConfigs[sourceChain]?.taxiSwapContractAddress.toLowerCase()
      ) {
        throw new Error("Transaction not from TaxiSwap contract");
      }

      const { messageHash, messageBytes } = await getMessageHashFromTransaction(
        depositTx,
        providerSource
      );

      const attestationResponse = await pollAttestationStatus(
        chainConfigs[sourceChain].attestationUrl,
        messageHash
      );

      const providerDestination = new ethers.JsonRpcProvider(
        chainConfigs[destinationChain]?.providerUrl
      );

      const signer = new ethers.Wallet(
        process.env.OPERATOR_PRIVATE_KEY as string,
        providerDestination
      );

      const messageTransmitterContract = new ethers.Contract(
        chainConfigs[destinationChain].messageTransmitterAddress,
        messageTransmitterAbi,
        signer
      );

      const receiveTx = await messageTransmitterContract.receiveMessage(
        messageBytes,
        attestationResponse.attestation
      );
      await receiveTx.wait();
      console.log("receiptTx: ", receiveTx.hash);

      return { hash: receiveTx.hash };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      throw new Error(findRejectionReason(errorMessage) || errorMessage);
    }
  },
  {
    connection,
    lockDuration: 60000,
    concurrency: 5,
    removeOnComplete: { count: 1000 },
    removeOnFail: { count: 5000 },
  }
);

export default simpleMessageReceptionQueueWorker;
