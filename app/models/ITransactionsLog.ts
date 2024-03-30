export interface ITransactionsLog {
    logId?: string;
    timestampStart: Date;
    timestampEnd?: Date; 
    account: string;
    sourceChain: string;
    destinationChain: string;
    destinationDomain: number;
    usdcAddress: string;
    approvalTx?: string;
    depositTx?: string;
    amount: string;
    step: number;
    stepStatus: string;
    errorMessage?: string;
    responseData?: string;
    taxiswapContract: string;
  }
  