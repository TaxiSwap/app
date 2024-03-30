import { TransactionsLogRepository } from "@/app/repositories/TransactionsLogRepository";
import { TransactionsLogService } from "@/app/services/TransactionsLogService";

export async function POST(request: Request) {
  const { logId, step, stepStatus, options } = await request.json();

  const transactionsLogRepository = new TransactionsLogRepository();
  const transactionsLogService = new TransactionsLogService(
    transactionsLogRepository
  );

  try {
    await transactionsLogService.updateTransactionStep(
      logId,
      step,
      stepStatus,
      options
    );
    return new Response(
      JSON.stringify({ message: "Transaction step updated successfully." }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    console.error("Error updating transaction step:", errorMessage);
    return new Response(JSON.stringify({ message: errorMessage }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
