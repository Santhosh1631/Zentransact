import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { contractABI, contractAddress } from "../utils/constants";
const TransactionHistory = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const provider = new ethers.providers.JsonRpcProvider(); // Connect to your Ethereum node
                const contract = new ethers.Contract(contractAddress, contractABI, provider);

                // Call the smart contract function to retrieve all transactions
                const fetchedTransactions = await contract.getAllTransactions();

                // Update state with the fetched transactions
                setTransactions(fetchedTransactions);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };

        fetchTransactions();
    }, [contractAddress, contractABI]);

    return (
        <div>
            <h2>Transactions List</h2>
            <ul>
                {transactions.map((transaction, index) => (
                    <li key={index}>
                        <p>Sender: {transaction.sender}</p>
                        <p>Receiver: {transaction.receiver}</p>
                        <p>Amount: {transaction.amount}</p>
                        <p>Message: {transaction.message}</p>
                        <p>Timestamp: {transaction.timestamp}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TransactionHistory;
