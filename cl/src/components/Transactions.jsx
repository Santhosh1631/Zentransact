import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

function TransactionStatus() {
  const [status, setStatus] = useState('Waiting for transaction...');
  const [transactionDetails, setTransactionDetails] = useState(null);
  const [transactionHistory, setTransactionHistory] = useState([]);

  useEffect(() => {
    async function checkTransactionStatus() {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
        } catch (error) {
          console.error(error);
        }
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
      } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
        return;
      }

      const transactionHash = 'YOUR_TRANSACTION_HASH'; // Replace with your transaction hash

      window.web3.eth.getTransactionReceipt(transactionHash, (error, receipt) => {
        if (error) {
          console.error(error);
        } else if (receipt) {
          console.log(receipt);
          if (receipt.status === true) {
            setStatus('Your transaction is successful!');
            setTransactionDetails({
              transactionHash: receipt.transactionHash,
              blockNumber: receipt.blockNumber,
              gasUsed: receipt.gasUsed,
              from: receipt.from,
              to: receipt.to,
              value: receipt.value,
            });
            setTransactionHistory(prevHistory => [...prevHistory, {
              transactionHash: receipt.transactionHash,
              blockNumber: receipt.blockNumber,
              gasUsed: receipt.gasUsed,
              from: receipt.from,
              to: receipt.to,
              value: receipt.value,
            }]);
          } else {
            setStatus('Transaction failed!');
          }
        }
      });
    }

    checkTransactionStatus();
  }, []);

  return (
    <div className='text-white text-center'>
      <h1>Blockchain Transaction Status</h1>
      <p>{status}</p>
      {transactionDetails && (
        <div>
          <h2>Transaction Details</h2>
          <p>Transaction Hash: {transactionDetails.transactionHash}</p>
          <p>Block Number: {transactionDetails.blockNumber}</p>
          <p>Gas Used: {transactionDetails.gasUsed}</p>
          <p>From: {transactionDetails.from}</p>
          <p>To: {transactionDetails.to}</p>
          <p>Value: {transactionDetails.value}</p>
        </div>
      )}
      <h2>Transaction History</h2>
      <ul>
        {transactionHistory.map((transaction, index) => (
          <li key={index}>
            Transaction Hash: {transaction.transactionHash}, 
            Block Number: {transaction.blockNumber}, 
            Gas Used: {transaction.gasUsed}, 
            From: {transaction.from}, 
            To: {transaction.to}, 
            Value: {transaction.value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionStatus;