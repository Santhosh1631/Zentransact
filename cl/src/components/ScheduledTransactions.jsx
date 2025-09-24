import React, { useState, useContext, useEffect } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { AiOutlineClockCircle, AiOutlineCalendar, AiOutlineDelete, AiOutlineCheckCircle } from "react-icons/ai";
import { FiSend, FiClock, FiUser, FiDollarSign } from "react-icons/fi";
import { BsArrowRight, BsCalendar3 } from "react-icons/bs";
import { toast } from "react-toastify";
import ConnectionTest from "./ConnectionTest";

const ScheduledTransactions = () => {
  const { currentAccount, scheduleTransaction, getUserScheduledTransactions, cancelScheduledTransaction, executeScheduledTransaction, isLoading } = useContext(TransactionContext);
  
  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
    message: "",
    scheduledDate: "",
    scheduledTime: ""
  });
  
  const [scheduledTxs, setScheduledTxs] = useState([]);
  const [activeTab, setActiveTab] = useState("schedule");
  const [refreshing, setRefreshing] = useState(false);

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🚀 Schedule transaction button clicked!");
    console.log("Current form data:", formData);
    console.log("Current account:", currentAccount);
    
    const { addressTo, amount, message, scheduledDate, scheduledTime } = formData;
    
    if (!addressTo || !amount || !message || !scheduledDate || !scheduledTime) {
      console.error("❌ Missing required fields:", { addressTo, amount, message, scheduledDate, scheduledTime });
      toast.error("Please fill all fields");
      return;
    }

    try {
      console.log("📅 Creating scheduled date/time...");
      // Combine date and time to create timestamp
      const scheduledDateTime = new Date(`${scheduledDate}T${scheduledTime}`);
      const now = new Date();
      
      console.log("Scheduled DateTime:", scheduledDateTime);
      console.log("Current DateTime:", now);
      
      if (scheduledDateTime <= now) {
        console.error("❌ Scheduled time is in the past");
        toast.error("Scheduled time must be in the future");
        return;
      }

      const scheduledTimestamp = Math.floor(scheduledDateTime.getTime() / 1000);
      console.log("📊 Scheduled timestamp:", scheduledTimestamp);
      
      console.log("💼 Calling scheduleTransaction...");
      await scheduleTransaction(addressTo, amount, message, scheduledTimestamp);
      
      console.log("✅ Transaction scheduled successfully!");
      
      // Clear form
      setFormData({
        addressTo: "",
        amount: "",
        message: "",
        scheduledDate: "",
        scheduledTime: ""
      });
      
      // Refresh scheduled transactions
      await fetchScheduledTransactions();
      
      toast.success("Transaction scheduled successfully!");
    } catch (error) {
      console.error("❌ Error scheduling transaction:", error);
      toast.error("Failed to schedule transaction: " + error.message);
    }
  };

  const fetchScheduledTransactions = async () => {
    if (!currentAccount) {
      console.log("❌ No current account, skipping fetch");
      return;
    }
    
    console.log("🔄 Fetching scheduled transactions...");
    setRefreshing(true);
    try {
      const txs = await getUserScheduledTransactions(currentAccount);
      console.log("📋 Fetched transactions:", txs);
      console.log("📊 Setting scheduledTxs state with:", txs?.length || 0, "transactions");
      setScheduledTxs(txs || []);
    } catch (error) {
      console.error("❌ Error fetching scheduled transactions:", error);
      toast.error("Failed to fetch scheduled transactions");
    } finally {
      setRefreshing(false);
    }
  };

  const handleCancelTransaction = async (scheduleId) => {
    try {
      await cancelScheduledTransaction(scheduleId);
      await fetchScheduledTransactions();
      toast.success("Scheduled transaction cancelled successfully!");
    } catch (error) {
      console.error("Error cancelling transaction:", error);
      toast.error("Failed to cancel transaction: " + error.message);
    }
  };

  const handleExecuteTransaction = async (scheduleId) => {
    try {
      await executeScheduledTransaction(scheduleId);
      await fetchScheduledTransactions();
      toast.success("Scheduled transaction executed successfully!");
    } catch (error) {
      console.error("Error executing transaction:", error);
      toast.error("Failed to execute transaction: " + error.message);
    }
  };

  const formatDateTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleString();
  };

  const getTransactionStatus = (tx) => {
    const now = Math.floor(Date.now() / 1000);
    
    if (tx.isCancelled) return { status: "Cancelled", color: "text-red-500", bgColor: "bg-red-100" };
    if (tx.isExecuted) return { status: "Executed", color: "text-green-500", bgColor: "bg-green-100" };
    if (now >= tx.scheduledTime) return { status: "Ready to Execute", color: "text-yellow-500", bgColor: "bg-yellow-100" };
    return { status: "Scheduled", color: "text-blue-500", bgColor: "bg-blue-100" };
  };

  useEffect(() => {
    if (currentAccount && activeTab === "view") {
      fetchScheduledTransactions();
    }
  }, [currentAccount, activeTab]);

  if (!currentAccount) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <AiOutlineClockCircle className="text-6xl text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Connect Your Wallet</h3>
        <p className="text-gray-500">Please connect your wallet to schedule transactions</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      {/* Connection Test */}
      <ConnectionTest />
      
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
          Scheduled Transactions
        </h2>
        <p className="text-gray-600">Schedule transactions to be executed automatically at a future date and time</p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-2 border border-white border-opacity-20">
          <button
            onClick={() => setActiveTab("schedule")}
            className={`px-6 py-3 rounded-xl transition-all duration-300 ${
              activeTab === "schedule"
                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <FiSend className="inline mr-2" />
            Schedule Transaction
          </button>
          <button
            onClick={() => setActiveTab("view")}
            className={`px-6 py-3 rounded-xl transition-all duration-300 ${
              activeTab === "view"
                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <FiClock className="inline mr-2" />
            View Scheduled
          </button>
        </div>
      </div>

      {/* Schedule Transaction Form */}
      {activeTab === "schedule" && (
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-8 border border-white border-opacity-20 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Recipient Address */}
              <div className="space-y-2">
                <label className="flex items-center text-gray-700 font-medium">
                  <FiUser className="mr-2" />
                  Recipient Address
                </label>
                <input
                  type="text"
                  placeholder="0x..."
                  value={formData.addressTo}
                  onChange={(e) => handleChange(e, "addressTo")}
                  className="w-full px-4 py-3 bg-white bg-opacity-20 backdrop-blur-lg rounded-xl border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-gray-800 placeholder-gray-500"
                />
              </div>

              {/* Amount */}
              <div className="space-y-2">
                <label className="flex items-center text-gray-700 font-medium">
                  <FiDollarSign className="mr-2" />
                  Amount (ETH)
                </label>
                <input
                  type="number"
                  step="0.001"
                  placeholder="0.001"
                  value={formData.amount}
                  onChange={(e) => handleChange(e, "amount")}
                  className="w-full px-4 py-3 bg-white bg-opacity-20 backdrop-blur-lg rounded-xl border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-gray-800 placeholder-gray-500"
                />
              </div>

              {/* Date */}
              <div className="space-y-2">
                <label className="flex items-center text-gray-700 font-medium">
                  <BsCalendar3 className="mr-2" />
                  Scheduled Date
                </label>
                <input
                  type="date"
                  value={formData.scheduledDate}
                  onChange={(e) => handleChange(e, "scheduledDate")}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 bg-white bg-opacity-20 backdrop-blur-lg rounded-xl border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-gray-800"
                />
              </div>

              {/* Time */}
              <div className="space-y-2">
                <label className="flex items-center text-gray-700 font-medium">
                  <AiOutlineClockCircle className="mr-2" />
                  Scheduled Time
                </label>
                <input
                  type="time"
                  value={formData.scheduledTime}
                  onChange={(e) => handleChange(e, "scheduledTime")}
                  className="w-full px-4 py-3 bg-white bg-opacity-20 backdrop-blur-lg rounded-xl border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-gray-800"
                />
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className="flex items-center text-gray-700 font-medium">
                Message
              </label>
              <textarea
                placeholder="Enter a message for this transaction..."
                value={formData.message}
                onChange={(e) => handleChange(e, "message")}
                rows="3"
                className="w-full px-4 py-3 bg-white bg-opacity-20 backdrop-blur-lg rounded-xl border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-gray-800 placeholder-gray-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Scheduling...
                </>
              ) : (
                <>
                  <AiOutlineClockCircle className="mr-2" />
                  Schedule Transaction
                </>
              )}
            </button>
          </form>
        </div>
      )}

      {/* View Scheduled Transactions */}
      {activeTab === "view" && (
        <div className="space-y-6">
          {/* Refresh Button */}
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-800">Your Scheduled Transactions</h3>
            <button
              onClick={fetchScheduledTransactions}
              disabled={refreshing}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl transition-all duration-300 disabled:opacity-50"
            >
              {refreshing ? "Refreshing..." : "Refresh"}
            </button>
          </div>

          {/* Debug Info */}
          <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-3 mb-4">
            <p className="text-sm text-yellow-800">
              🐛 Debug: Found {scheduledTxs.length} scheduled transaction(s)
              {console.log("🎨 Current scheduledTxs state:", scheduledTxs) || ""}
            </p>
          </div>

          {/* Transactions List */}
          {scheduledTxs.length === 0 ? (
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-12 border border-white border-opacity-20 text-center">
              <AiOutlineCalendar className="text-6xl text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Scheduled Transactions</h3>
              <p className="text-gray-500">You haven't scheduled any transactions yet.</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {scheduledTxs.map((tx, index) => {
                console.log(`🔸 Rendering transaction ${index}:`, tx);
                const statusInfo = getTransactionStatus(tx);
                const now = Math.floor(Date.now() / 1000);
                const canExecute = !tx.isExecuted && !tx.isCancelled && now >= tx.scheduledTime;
                const canCancel = !tx.isExecuted && !tx.isCancelled;

                return (
                  <div
                    key={index}
                    className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-20 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                          <FiClock className="text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">Schedule ID: {tx.id?.toString()}</h4>
                          <p className="text-sm text-gray-600">Created: {formatDateTime(tx.createdAt)}</p>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${statusInfo.bgColor} ${statusInfo.color}`}>
                        {statusInfo.status}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Recipient</p>
                        <p className="font-mono text-sm bg-gray-100 px-2 py-1 rounded break-all">{tx.receiver}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Amount</p>
                        <p className="font-semibold text-lg text-gray-800">{tx.amount ? (parseInt(tx.amount) / 1e18).toFixed(4) : '0'} ETH</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Scheduled Time</p>
                        <p className="font-medium text-gray-800">{formatDateTime(tx.scheduledTime)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Message</p>
                        <p className="text-gray-800">{tx.message || "No message"}</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                      {canExecute && (
                        <button
                          onClick={() => handleExecuteTransaction(tx.id)}
                          className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-2 px-4 rounded-xl transition-all duration-300 flex items-center justify-center"
                        >
                          <AiOutlineCheckCircle className="mr-2" />
                          Execute Now
                        </button>
                      )}
                      {canCancel && (
                        <button
                          onClick={() => handleCancelTransaction(tx.id)}
                          className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-2 px-4 rounded-xl transition-all duration-300 flex items-center justify-center"
                        >
                          <AiOutlineDelete className="mr-2" />
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ScheduledTransactions;