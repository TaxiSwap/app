import React, { useEffect, useState } from "react";
import { ITransactionsLog } from "@/app/models/ITransactionsLog";

const TransactionsList: React.FC = () => {
  const [transactions, setTransactions] = useState<ITransactionsLog[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const limit: number = 10; // Items per page

  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await fetch(
        `/api/log/transactions/index?page=${page}&limit=${limit}`
      );
      const data = await response.json();
      if (response.ok) {
        setTransactions(data.transactions);
        setTotalCount(data.totalCount);
      } else {
        console.error(
          "Failed to fetch transactions:",
          data.message || "Unknown error"
        );
      }
    };

    fetchTransactions();
  }, [page]);

  return (
    <div className="max-w-full mx-auto p-4 overflow-x-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Transactions Log
      </h2>
      <table className="min-w-full table-auto text-sm divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
              Account
            </th>
            <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
              Start
            </th>
            <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
              End
            </th>
            <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
              Source Chain
            </th>
            <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
              Destination Chain
            </th>
            <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
              Error Message
            </th>
            {/* Add more headers for other fields as needed */}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">
                {transaction.account}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {new Date(transaction.timestampStart).toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {transaction.timestampEnd
                  ? new Date(transaction.timestampEnd).toLocaleString()
                  : "N/A"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {transaction.sourceChain}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {transaction.destinationChain}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {transaction.amount}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    transaction.stepStatus === "completed"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {transaction.stepStatus}
                </span>
              </td>
              <td
                className="px-6 py-4 break-words max-w-xs"
                title={transaction.errorMessage || ""}
              >
                {transaction.errorMessage
                  ? transaction.errorMessage.slice(0, 50) + "..."
                  : "N/A"}
              </td>
              {/* Include cells for other fields as needed, similar to above */}
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination goes here */}
      <div className="flex justify-between items-center mt-4">
        {page > 1 && (
          <button
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Previous
          </button>
        )}
        {page < Math.ceil(totalCount / limit) && (
          <button
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default TransactionsList;
