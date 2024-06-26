import { connectToDatabase } from "../services/mongodb";
import { ITransactionsLog } from "../models/ITransactionsLog";

export class TransactionsLogRepository {
  async startTransaction(
    transactionDetails: Omit<
      ITransactionsLog,
      "timestampEnd" | "stepStatus" | "errorMessage"
    >
  ) {
    const db = await connectToDatabase();
    const collection = db.collection<ITransactionsLog>("transactions");

    const logId = this.generateTransactionId(
      transactionDetails.account,
      transactionDetails.timestampStart
    );
    const transaction: ITransactionsLog = {
      ...transactionDetails,
      timestampStart: new Date(),
      stepStatus: "working",
      logId,
    };

    await collection.insertOne(transaction);
    return logId;
  }

  async updateTransactionStep(
    logId: string,
    step: number,
    stepStatus: string,
    options: {
      errorMessage?: string;
      approvalTx?: string;
      depositTx?: string;
      responseData?: string;
      timestampEnd?: Date;
    } = {}
  ) {
    const db = await connectToDatabase();
    const collection = db.collection<ITransactionsLog>("transactions");

    // Retrieve the transaction to check its timestampStart
    const transaction = await collection.findOne({ logId });
    if (!transaction) {
      throw new Error("Transaction not found");
    }

    const updateFields: Partial<ITransactionsLog> = {
      step,
      stepStatus,
      ...options,
    };

    return await collection.updateOne(
      { logId },
      { $set: updateFields }
    );
  }

  private generateTransactionId(account: string, timestamp: Date): string {
    const data = `${account}-${timestamp.getTime()}`;
    return data;
  }

  async getTransactions(page: number = 1, limit: number = 10) {
    const db = await connectToDatabase();
    const collection = db.collection<ITransactionsLog>("transactions");

    const transactions = await collection
      .find({})
      .sort({ timestampStart: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    const totalCount = await collection.countDocuments();

    return { transactions, totalCount };
  }
}
