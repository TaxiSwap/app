import { TransactionsLogRepository } from "@/app/repositories/TransactionsLogRepository";
import { TransactionsLogService } from "@/app/services/TransactionsLogService";

export async function POST(request: Request) {
  const transactionsLogRepository = new TransactionsLogRepository();
  const transactionsService = new TransactionsLogService(
    transactionsLogRepository
  );
  const req = await request.json();
  try {
    const logId = await transactionsService.startTransaction(req);
    return new Response(JSON.stringify({ logId }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    console.error("Error starting transaction:", errorMessage);
    return new Response(JSON.stringify({ message: errorMessage }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
