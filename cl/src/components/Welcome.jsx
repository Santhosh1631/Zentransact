import React, { useContext, useState, useEffect } from "react";
import { SiEthereum } from "react-icons/si";
import { FaWallet, FaExchangeAlt, FaShieldAlt, FaGlobe, FaRocket, FaLock, FaArrowRight, FaCopy, FaCheck } from "react-icons/fa";
import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";
import { Loader } from ".";
import { toast, ToastContainer } from "react-toastify";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";

import "react-toastify/dist/ReactToastify.css";

const Input = ({ placeholder, name, type, value, handleChange, icon: Icon }) => (
  <div className="relative group">
    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
      {Icon && <Icon className="h-5 w-5 text-gray-400 group-focus-within:text-purple-400 transition-colors" />}
    </div>
    <input
      placeholder={placeholder}
      type={type}
      step="0.0001"
      value={value}
      onChange={(e) => handleChange(e, name)}
      className={`w-full ${Icon ? 'pl-12' : 'pl-4'} pr-4 py-4 bg-white bg-opacity-5 backdrop-blur-lg border border-white border-opacity-20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:bg-opacity-10`}
    />
  </div>
);

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="group relative bg-white bg-opacity-5 backdrop-blur-lg border border-white border-opacity-20 rounded-2xl p-6 hover:bg-opacity-10 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
    <div className="relative">
      <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
        <Icon className="h-6 w-6 text-white" />
      </div>
      <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
      <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
    </div>
  </div>
);

const Welcome = () => {
  const { currentAccount, connectWallet, handleChange, sendTransaction, formData, isLoading } = useContext(TransactionContext);
  const [transactions, setTransactions] = useState([]);
  const [walletBalance, setWalletBalance] = useState("0");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (currentAccount) {
        try {
          if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(contractAddress, contractABI, provider);
            
            const allTransactions = await contract.getAllTransactions();
            setTransactions(allTransactions);

            const balance = await provider.getBalance(currentAccount);
            setWalletBalance(ethers.utils.formatEther(balance));
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchTransactions();
  }, [currentAccount]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { addressTo, amount, message } = formData;

    if (!addressTo || !amount || !message) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await sendTransaction();
      toast.success("Transaction sent successfully!");
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      toast.error("Transaction failed. Please try again.");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentAccount);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Address copied to clipboard!");
  };

  const features = [
    {
      icon: FaShieldAlt,
      title: "Secure & Reliable",
      description: "Built on Ethereum blockchain with military-grade encryption to ensure your transactions are safe and secure."
    },
    {
      icon: FaRocket,
      title: "Lightning Fast",
      description: "Experience instant transactions with our optimized smart contracts and cutting-edge blockchain technology."
    },
    {
      icon: FaLock,
      title: "Privacy Protected",
      description: "Your privacy is our priority. All transactions are encrypted and your personal data remains confidential."
    },
    {
      icon: FaGlobe,
      title: "Global Access",
      description: "Send and receive cryptocurrencies anywhere in the world, 24/7, without geographical restrictions."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <ToastContainer position="top-right" theme="dark" />
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Hero Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-white bg-opacity-10 backdrop-blur-lg rounded-full border border-white border-opacity-20">
                <SiEthereum className="h-5 w-5 text-purple-400 mr-2" />
                <span className="text-white text-sm font-medium">Powered by Ethereum</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                Welcome to{' '}
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  ZenTransact
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                Experience the future of digital transactions with our secure, fast, and user-friendly 
                cryptocurrency platform. Built on Ethereum blockchain technology.
              </p>
            </div>

            {currentAccount ? (
              <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold text-lg">Connected Wallet</h3>
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <div className="flex items-center justify-between bg-white bg-opacity-5 rounded-xl p-4">
                  <span className="text-gray-300 font-mono text-sm">{shortenAddress(currentAccount)}</span>
                  <button
                    onClick={copyToClipboard}
                    className="p-2 hover:bg-white hover:bg-opacity-10 rounded-lg transition-all duration-200"
                  >
                    {copied ? (
                      <FaCheck className="h-4 w-4 text-green-400" />
                    ) : (
                      <FaCopy className="h-4 w-4 text-gray-400 hover:text-white" />
                    )}
                  </button>
                </div>
                <div className="mt-4">
                  <p className="text-gray-400 text-sm mb-1">Balance</p>
                  <p className="text-white text-2xl font-bold">{parseFloat(walletBalance).toFixed(4)} ETH</p>
                </div>
              </div>
            ) : (
              <button
                onClick={connectWallet}
                className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-2xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              >
                <FaWallet className="mr-3 h-5 w-5" />
                Connect MetaMask Wallet
                <FaArrowRight className="ml-3 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            )}
          </div>

          {/* Right Column - Transaction Form */}
          <div className="relative">
            {currentAccount && (
              <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-8 border border-white border-opacity-20 shadow-2xl">
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mr-4">
                    <FaExchangeAlt className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-white text-2xl font-bold">Send Transaction</h2>
                    <p className="text-gray-400 text-sm">Transfer ETH securely to any address</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <Input 
                    placeholder="Recipient Address" 
                    name="addressTo" 
                    type="text" 
                    value={formData.addressTo}
                    handleChange={handleChange}
                    icon={FaWallet}
                  />
                  
                  <Input 
                    placeholder="Amount in ETH" 
                    name="amount" 
                    type="number" 
                    value={formData.amount}
                    handleChange={handleChange}
                    icon={SiEthereum}
                  />
                  
                  <div className="relative">
                    <textarea
                      placeholder="Add a message (optional)"
                      name="message"
                      value={formData.message}
                      onChange={(e) => handleChange(e, 'message')}
                      rows={3}
                      className="w-full pl-4 pr-4 py-4 bg-white bg-opacity-5 backdrop-blur-lg border border-white border-opacity-20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:bg-opacity-10 resize-none"
                    />
                  </div>

                  {isLoading ? (
                    <div className="flex items-center justify-center py-4">
                      <Loader />
                      <span className="text-white ml-3">Processing transaction...</span>
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-4 rounded-2xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center group"
                    >
                      Send Transaction
                      <FaArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  )}
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Why Choose ZenTransact?</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the next generation of cryptocurrency transactions with our cutting-edge features
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>

      {/* Transaction History Section */}
      {currentAccount && transactions.length > 0 && (
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Transaction History</h2>
            <p className="text-xl text-gray-300">Track all your cryptocurrency transactions</p>
          </div>

          <div className="space-y-6">
            {transactions.slice().reverse().slice(0, 5).map((transaction, index) => (
              <div key={index} className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-20 hover:bg-opacity-15 transition-all duration-300">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <p className="text-gray-400 text-sm font-medium uppercase tracking-wide">From</p>
                    <p className="text-white font-mono text-sm bg-white bg-opacity-5 px-3 py-2 rounded-lg">
                      {shortenAddress(transaction.sender)}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-gray-400 text-sm font-medium uppercase tracking-wide">To</p>
                    <p className="text-white font-mono text-sm bg-white bg-opacity-5 px-3 py-2 rounded-lg">
                      {shortenAddress(transaction.receiver)}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-gray-400 text-sm font-medium uppercase tracking-wide">Amount</p>
                    <p className="text-white font-bold text-lg flex items-center">
                      <SiEthereum className="h-4 w-4 mr-2 text-purple-400" />
                      {ethers.utils.formatEther(transaction.amount)} ETH
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-gray-400 text-sm font-medium uppercase tracking-wide">Date</p>
                    <p className="text-white text-sm">
                      {new Date(transaction.timestamp * 1000).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
                
                {transaction.message && (
                  <div className="mt-6 pt-6 border-t border-white border-opacity-10">
                    <p className="text-gray-400 text-sm font-medium mb-2">Message</p>
                    <p className="text-white bg-white bg-opacity-5 px-4 py-3 rounded-xl italic">
                      "{transaction.message}"
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {transactions.length > 5 && (
            <div className="text-center mt-8">
              <button className="px-8 py-3 bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-20 text-white rounded-2xl hover:bg-opacity-20 transition-all duration-300">
                View All Transactions
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Welcome;
