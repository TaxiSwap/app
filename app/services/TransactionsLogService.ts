import { TransactionsLogRepository } from "../repositories/TransactionsLogRepository";
import { ITransactionsLog } from "../models/ITransactionsLog";

export class TransactionsLogService {
  private transactionsLogRepository: TransactionsLogRepository;

  constructor(transactionsLogRepository: TransactionsLogRepository) {
    this.transactionsLogRepository = transactionsLogRepository;
  }

  async startTransaction(
    transactionDetails: Omit<
      ITransactionsLog,
      "timestampStart" | "timestampEnd" | "stepStatus" | "errorMessage"
    >
  ): Promise<string> {
    try {
      // Automatically set timestampStart to the current time
      const transactionWithTimestamp: Omit<
        ITransactionsLog,
        "timestampEnd" | "stepStatus" | "errorMessage"
      > = {
        ...transactionDetails,
        timestampStart: new Date(),
      };

      return await this.transactionsLogRepository.startTransaction(
        transactionWithTimestamp
      );
    } catch (error) {
      console.error("Error starting transaction:", error);
      throw error; // Re-throw the error to be handled or logged by the caller
    }
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
    } = {}
  ): Promise<void> {
    try {
      // If responseData is provided, include the current timestamp as timestampEnd
      if (options.responseData) {
        await this.transactionsLogRepository.updateTransactionStep(
          logId,
          step,
          stepStatus,
          {
            ...options,
            timestampEnd: new Date(),
          }
        );
      } else {
        await this.transactionsLogRepository.updateTransactionStep(
          logId,
          step,
          stepStatus,
          options
        );
      }
    } catch (error) {
      console.error("Error updating transaction step:", error);
      throw error; // Re-throw the error to be handled or logged by the caller
    }
  }

  async getTransactions(page: number, limit: number) {
    return this.transactionsLogRepository.getTransactions(page, limit);
  }
}
