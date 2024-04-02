import React, { useState } from "react";

const ReceiveMessageForm: React.FC = () => {
  const [depositTx, setDepositTx] = useState("");
  const [sourceChain, setSourceChain] = useState("");
  const [destinationChain, setDestinationChain] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError("");
    setResponse("");

    try {
      const response = await fetch("/api/blockchain/receiveMessage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ depositTx, sourceChain, destinationChain }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unknown error occurred");
      }

      setResponse(data.hash);
    } catch (error) {
      console.log(error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An unknown error occurred on handleSubmit of Receive Message Form";
      setError(errorMessage);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h2 className="block text-gray-700 text-xl font-bold mb-2">
          Receive Message
        </h2>

        {error && <p className="text-red-500 text-xs italic">{error}</p>}
        {response && (
          <p className="text-green-500 text-xs italic">Success: {response}</p>
        )}

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="depositTx"
          >
            Deposit Transaction
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="depositTx"
            type="text"
            placeholder="Transaction Hash"
            value={depositTx}
            onChange={(e) => setDepositTx(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="sourceChain"
          >
            Source Chain
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="sourceChain"
            type="text"
            placeholder="Source Chain"
            value={sourceChain}
            onChange={(e) => setSourceChain(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="destinationChain"
          >
            Destination Chain
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="destinationChain"
            type="text"
            placeholder="Destination Chain"
            value={destinationChain}
            onChange={(e) => setDestinationChain(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReceiveMessageForm;
