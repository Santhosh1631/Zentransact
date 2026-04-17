import React, { useContext, useState } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { fetchBackendStatus } from "../utils/api";

const ConnectionTest = () => {
  const { currentAccount, connectWallet } = useContext(TransactionContext);
  const [backendStatus, setBackendStatus] = useState("");

  const getEthereum = () => {
    if (typeof window === "undefined") {
      return null;
    }

    return window.ethereum || null;
  };

  const testConnection = async () => {
    try {
      console.log("Testing connection...");
      console.log("Current account:", currentAccount);
      const ethereum = getEthereum();
      console.log("Ethereum object:", ethereum);
      
      if (ethereum) {
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        console.log("Available accounts:", accounts);
        
        const chainId = await ethereum.request({ method: 'eth_chainId' });
        console.log("Current chain ID:", chainId);
        
        const balance = await ethereum.request({
          method: 'eth_getBalance',
          params: [accounts[0], 'latest']
        });
        console.log("Account balance:", balance);
      }
    } catch (error) {
      console.error("Connection test failed:", error);
    }
  };

  const testBackend = async () => {
    try {
      const status = await fetchBackendStatus();
      setBackendStatus(`Backend OK: ${status.environment || "unknown"}`);
    } catch (error) {
      setBackendStatus(`Backend unavailable: ${error.message}`);
    }
  };

  return (
    <div className="p-4 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl border border-white border-opacity-20 mb-4">
      <h3 className="text-white font-bold mb-2">Connection Test</h3>
      <p className="text-white mb-2">Current Account: {currentAccount || "Not connected"}</p>
      {backendStatus && <p className="text-white mb-2">{backendStatus}</p>}
      <div className="space-x-2">
        <button
          onClick={connectWallet}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Connect Wallet
        </button>
        <button
          onClick={testConnection}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Test Connection
        </button>
        <button
          onClick={testBackend}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Test Backend
        </button>
      </div>
    </div>
  );
};

export default ConnectionTest;