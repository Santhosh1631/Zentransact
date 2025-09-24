import React, { useState, useEffect, useContext } from 'react';
import { ethers } from 'ethers';
import { TransactionContext } from "../context/TransactionContext";
import { contractABI, contractAddress } from "../utils/constants";
import { shortenAddress } from "../utils/shortenAddress";

function WalletBalance() {
    const { currentAccount } = useContext(TransactionContext);
    const [transactions, setTransactions] = useState([]);
    const [walletBalance, setWalletBalance] = useState("0");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            if (currentAccount) {
                try {
                    setLoading(true);
                    if (window.ethereum) {
                        const provider = new ethers.providers.Web3Provider(window.ethereum);
                        const contract = new ethers.Contract(contractAddress, contractABI, provider);
                        
                        // Get all transactions
                        const allTransactions = await contract.getAllTransactions();
                        const sortedTransactions = allTransactions.slice().reverse();
                        setTransactions(sortedTransactions);

                        // Get wallet balance
                        const balance = await provider.getBalance(currentAccount);
                        setWalletBalance(ethers.utils.formatEther(balance));
                    }
                } catch (error) {
                    console.error('Error loading data:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        loadData();
    }, [currentAccount]);

    if (!currentAccount) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
                <div className="container mx-auto px-4 py-16">
                    <div className="flex items-center justify-center min-h-[400px]">
                        <div className="text-center">
                            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-12 border border-white border-opacity-20 shadow-2xl">
                                <h2 className="text-white text-4xl font-bold mb-6">Wallet Not Connected</h2>
                                <p className="text-gray-300 text-lg mb-8">Please connect your wallet to view balance and transactions.</p>
                                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mb-4">
                                    <span className="text-white text-2xl">🔗</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
                <div className="container mx-auto px-4 py-16">
                    <div className="flex flex-col items-center justify-center min-h-[400px]">
                        <div className="relative">
                            <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-opacity-20"></div>
                            <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent absolute top-0 left-0"></div>
                        </div>
                        <p className="text-white text-lg font-medium mt-6">Loading wallet data...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
            <div className="container mx-auto px-4 py-16">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                        My{' '}
                        <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                            Wallet
                        </span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Monitor your balance and track all your cryptocurrency transactions
                    </p>
                </div>

                {/* Wallet Overview */}
                <div className="mb-12">
                    <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-20 rounded-3xl p-8 shadow-2xl">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="text-center md:text-left">
                                <h2 className="text-white text-2xl font-bold mb-4">Account Details</h2>
                                <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-20">
                                    <p className="text-gray-300 text-sm mb-2 uppercase tracking-wide">Connected Account</p>
                                    <p className="text-white text-lg font-mono break-all">{shortenAddress(currentAccount)}</p>
                                </div>
                            </div>
                            <div className="text-center md:text-right">
                                <h2 className="text-white text-2xl font-bold mb-4">Current Balance</h2>
                                <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 shadow-xl">
                                    <p className="text-white text-4xl lg:text-5xl font-bold">
                                        {parseFloat(walletBalance).toFixed(4)}
                                    </p>
                                    <p className="text-purple-200 text-lg font-medium mt-2">ETH</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Transaction History */}
                <div>
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-white mb-4">Transaction History</h2>
                        <p className="text-xl text-gray-300">All your cryptocurrency transactions in one place</p>
                    </div>
                {transactions.length > 0 ? (
                    <div className="space-y-4">
                        {transactions.map((transaction, index) => (
                            <div key={index} className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-20 shadow-lg">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                                    <div className="flex items-center space-x-4 mb-4 md:mb-0">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                            transaction.sender.toLowerCase() === currentAccount.toLowerCase() 
                                                ? 'bg-red-500' 
                                                : 'bg-green-500'
                                        }`}>
                                            <span className="text-white font-bold">
                                                {transaction.sender.toLowerCase() === currentAccount.toLowerCase() ? '↑' : '↓'}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-white font-semibold">
                                                {transaction.sender.toLowerCase() === currentAccount.toLowerCase() ? 'Sent' : 'Received'}
                                            </p>
                                            <p className="text-gray-300 text-sm">
                                                {new Date(transaction.timestamp * 1000).toLocaleDateString()} at{' '}
                                                {new Date(transaction.timestamp * 1000).toLocaleTimeString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className={`text-xl font-bold ${
                                            transaction.sender.toLowerCase() === currentAccount.toLowerCase() 
                                                ? 'text-red-400' 
                                                : 'text-green-400'
                                        }`}>
                                            {transaction.sender.toLowerCase() === currentAccount.toLowerCase() ? '-' : '+'}
                                            {ethers.utils.formatEther(transaction.amount)} ETH
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-gray-300 font-medium">From</p>
                                        <p className="text-white font-mono break-all">{shortenAddress(transaction.sender)}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-300 font-medium">To</p>
                                        <p className="text-white font-mono break-all">{shortenAddress(transaction.receiver)}</p>
                                    </div>
                                </div>
                                
                                {transaction.message && (
                                    <div className="mt-4">
                                        <p className="text-gray-300 font-medium text-sm">Message</p>
                                        <p className="text-white bg-white bg-opacity-10 rounded-lg p-3 mt-1">{transaction.message}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="bg-white bg-opacity-10 rounded-xl p-8">
                            <p className="text-gray-400 text-lg">No transactions found</p>
                            <p className="text-gray-500 text-sm mt-2">Your transaction history will appear here</p>
                        </div>
                    </div>
                )}
                </div>
            </div>
        </div>
    );
}

export default WalletBalance;