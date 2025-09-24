import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

export const TransactionsProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [formData, setformData] = useState({ addressTo: "", amount: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [transactionsCount, setTransactionsCount] = useState(localStorage.getItem('transactionCount'));

  const handleChange = (e, name) => {
    setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const getEthereumContract = async () => {
    try {
      if (!ethereum) {
        throw new Error("Ethereum object not available. Please make sure MetaMask is installed and your wallet is connected.");
      }

      await ethereum.request({ method: "eth_requestAccounts" });

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);

      return transactionsContract;
    } catch (error) {
      console.error("Error in getEthereumContract:", error.message);
    }
  };

  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
      throw new Error("No ether object ");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error(error);
      throw new Error("No ether object ");
    }
  };

  const getAllTransactions = async () => {
    try {
      if (!ethereum) return [];
      const transactionsContract = await getEthereumContract();
      const availableTransactions = await transactionsContract.getAllTransactions();
      return availableTransactions;
    } catch (error) {
      console.error("Error getting transactions:", error);
      return [];
    }
  };

  const sendTransaction = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");
      const { addressTo, amount, message } = formData;

      // Validate that addressTo is a valid Ethereum address
      if (!ethers.utils.isAddress(addressTo)) {
        throw new Error("Invalid Ethereum address.");
      }

      // Check that all fields are filled
      if (!addressTo || !amount || !message) {
        throw new Error("All fields are required. Please check the recipient's address, amount, and message.");
      }

      console.log("Sending transaction to:", addressTo);

      const transactionsContract = await getEthereumContract();

      const parsedAmount = ethers.utils.parseEther(amount);

      setIsLoading(true);

      const transactionHash = await transactionsContract.addToBlockchain(
        addressTo,
        parsedAmount,
        message,
        { value: parsedAmount }
      );

      console.log(`Loading - ${transactionHash.hash}`);
      await transactionHash.wait();
      setIsLoading(false);
      console.log(`Success - ${transactionHash.hash}`);

      const transactionsCount = await transactionsContract.getTransactionCount();
      setTransactionsCount(transactionsCount.toNumber());

      // Clear form after successful transaction
      setformData({ addressTo: "", amount: "", message: "" });

      toast.success('Your payment was successful!');
    } catch (error) {
      if (error.code === -32602) {
        toast.error("Invalid parameters: Please check the recipient's address and amount.");
      } else {
        toast.error('Your payment failed: ' + error.message);
      }
      console.error("Error in sendTransaction:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const scheduleTransaction = async (addressTo, amount, message, scheduledTimestamp) => {
    try {
      console.log("🔧 scheduleTransaction called with:", { addressTo, amount, message, scheduledTimestamp });
      
      if (!ethereum) {
        console.error("❌ Ethereum object not found");
        throw new Error("Please install MetaMask.");
      }
      
      // Validate inputs
      if (!ethers.utils.isAddress(addressTo)) {
        console.error("❌ Invalid address:", addressTo);
        throw new Error("Invalid Ethereum address.");
      }

      if (!addressTo || !amount || !message || !scheduledTimestamp) {
        console.error("❌ Missing required fields");
        throw new Error("All fields are required.");
      }

      console.log("🔗 Getting contract instance...");
      const transactionsContract = await getEthereumContract();
      
      console.log("💰 Parsing amount:", amount);
      const parsedAmount = ethers.utils.parseEther(amount);
      console.log("📊 Parsed amount:", parsedAmount.toString());

      setIsLoading(true);

      console.log("📤 Calling contract scheduleTransaction...");
      const transactionHash = await transactionsContract.scheduleTransaction(
        addressTo,
        parsedAmount,
        message,
        scheduledTimestamp,
        { value: parsedAmount }
      );

      console.log(`⏳ Scheduling transaction - ${transactionHash.hash}`);
      await transactionHash.wait();
      console.log(`✅ Scheduled successfully - ${transactionHash.hash}`);

      toast.success('Transaction scheduled successfully!');
    } catch (error) {
      console.error("❌ Error scheduling transaction:", error);
      
      // More detailed error logging
      if (error.code) {
        console.error("Error code:", error.code);
      }
      if (error.reason) {
        console.error("Error reason:", error.reason);
      }
      if (error.data) {
        console.error("Error data:", error.data);
      }
      
      toast.error('Failed to schedule transaction: ' + error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getUserScheduledTransactions = async (userAddress) => {
    try {
      console.log("🔍 Fetching scheduled transactions for:", userAddress);
      if (!ethereum) {
        console.log("❌ No ethereum object");
        return [];
      }
      const transactionsContract = await getEthereumContract();
      console.log("📄 Contract instance:", transactionsContract.address);
      
      const userScheduled = await transactionsContract.getUserScheduledTransactions(userAddress);
      console.log("📊 Raw scheduled transactions:", userScheduled);
      console.log("📈 Number of scheduled transactions:", userScheduled.length);
      
      // Convert BigNumber values to regular numbers/strings for easier handling
      const processedTransactions = userScheduled.map((tx, index) => {
        console.log(`Processing transaction ${index}:`, tx);
        return {
          id: tx.id.toString(),
          sender: tx.sender,
          receiver: tx.receiver,
          amount: tx.amount.toString(),
          message: tx.message,
          scheduledTime: tx.scheduledTime.toNumber(),
          isExecuted: tx.isExecuted,
          isCancelled: tx.isCancelled,
          createdAt: tx.createdAt.toNumber()
        };
      });
      
      console.log("✅ Processed transactions:", processedTransactions);
      return processedTransactions;
    } catch (error) {
      console.error("❌ Error getting user scheduled transactions:", error);
      return [];
    }
  };

  const getAllScheduledTransactions = async () => {
    try {
      if (!ethereum) return [];
      const transactionsContract = await getEthereumContract();
      const allScheduled = await transactionsContract.getAllScheduledTransactions();
      return allScheduled;
    } catch (error) {
      console.error("Error getting all scheduled transactions:", error);
      return [];
    }
  };

  const getPendingScheduledTransactions = async () => {
    try {
      if (!ethereum) return [];
      const transactionsContract = await getEthereumContract();
      const pending = await transactionsContract.getPendingScheduledTransactions();
      return pending;
    } catch (error) {
      console.error("Error getting pending scheduled transactions:", error);
      return [];
    }
  };

  const getExecutableTransactions = async () => {
    try {
      if (!ethereum) return [];
      const transactionsContract = await getEthereumContract();
      const executable = await transactionsContract.getExecutableTransactions();
      return executable;
    } catch (error) {
      console.error("Error getting executable transactions:", error);
      return [];
    }
  };

  const executeScheduledTransaction = async (scheduleId) => {
    try {
      if (!ethereum) throw new Error("Please install MetaMask.");
      
      const transactionsContract = await getEthereumContract();
      
      setIsLoading(true);

      const transactionHash = await transactionsContract.executeScheduledTransaction(scheduleId);
      
      console.log(`Executing scheduled transaction - ${transactionHash.hash}`);
      await transactionHash.wait();
      console.log(`Executed successfully - ${transactionHash.hash}`);

      toast.success('Scheduled transaction executed successfully!');
    } catch (error) {
      console.error("Error executing scheduled transaction:", error);
      toast.error('Failed to execute transaction: ' + error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const cancelScheduledTransaction = async (scheduleId) => {
    try {
      if (!ethereum) throw new Error("Please install MetaMask.");
      
      const transactionsContract = await getEthereumContract();
      
      setIsLoading(true);

      const transactionHash = await transactionsContract.cancelScheduledTransaction(scheduleId);
      
      console.log(`Cancelling scheduled transaction - ${transactionHash.hash}`);
      await transactionHash.wait();
      console.log(`Cancelled successfully - ${transactionHash.hash}`);

      toast.success('Scheduled transaction cancelled successfully!');
    } catch (error) {
      console.error("Error cancelling scheduled transaction:", error);
      toast.error('Failed to cancel transaction: ' + error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnect();
  }, []);

  return (
    <TransactionContext.Provider
      value={{ 
        connectWallet, 
        currentAccount, 
        formData, 
        handleChange, 
        sendTransaction, 
        isLoading, 
        transactionsCount, 
        getAllTransactions,
        scheduleTransaction,
        getUserScheduledTransactions,
        getAllScheduledTransactions,
        getPendingScheduledTransactions,
        getExecutableTransactions,
        executeScheduledTransaction,
        cancelScheduledTransaction
      }}>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      {children}
    </TransactionContext.Provider>
  );
};
