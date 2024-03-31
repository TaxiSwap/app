import { TransactionsLogRepository } from "@/app/repositories/TransactionsLogRepository";
import { TransactionsLogService } from "@/app/services/TransactionsLogService";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;

    const transactionsLogRepository = new TransactionsLogRepository();
    const transactionsService = new TransactionsLogService(
      transactionsLogRepository
    );
    const { transactions, totalCount } =
      await transactionsService.getTransactions(page, limit);

    return NextResponse.json({ transactions, totalCount }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 200 }
    );
  }
}
