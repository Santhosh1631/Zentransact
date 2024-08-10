// import React, { useState, useEffect } from 'react';
// import Web3 from 'web3';

// const abi = [
//     {
//         "inputs": [],
//         "name": "getAllTransactions",
//         "outputs": [
//             {
//                 "components": [
//                     { "internalType": "address", "name": "sender", "type": "address" },
//                     { "internalType": "address", "name": "receiver", "type": "address" },
//                     { "internalType": "uint256", "name": "amount", "type": "uint256" },
//                     { "internalType": "string", "name": "message", "type": "string" },
//                     { "internalType": "uint256", "name": "timestamp", "type": "uint256" }
//                 ],
//                 "internalType": "struct Transactions.TransferStruct[]",
//                 "name": "",
//                 "type": "tuple[]"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     }
// ];

// const contractAddress = "0x570f236c625Bdba6a3510EBd813Ab42F90cdaE70";
// const userWalletAddress = "0x468F943F0293C246949B40d708C7850Dcb50fC75";

// function WalletBalance() {
//     const cryptoCardStyle = {
//         width: '50%',
//         padding: '40px',
//         margin: '20px auto',
//         background: 'rgba(255, 255, 255, 0.1)',
//         borderRadius: '20px',
//         boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
//         boxSizing: 'border-box',
//         textAlign: 'center'
//       };
//     const [transactions, setTransactions] = useState([]);
//     const [walletBalance, setWalletBalance] = useState(0);

//     useEffect(() => {
//         const loadTransactions = async () => {
//             try {
//                 const web3 = new Web3('http://localhost:7545');
//                 const contract = new web3.eth.Contract(abi, contractAddress);
//                 const result = await contract.methods.getAllTransactions().call();
//                 const sortedTransactions = result.sort((a, b) => parseInt(b.timestamp) - parseInt(a.timestamp));
//                 setTransactions(sortedTransactions);
//             } catch (error) {
//                 console.error('Error retrieving transactions:', error);
//             }
//         };

//         const loadBalance = async () => {
//             try {
//                 const web3 = new Web3('http://localhost:7545');
//                 const balance = await web3.eth.getBalance(userWalletAddress);
//                 const balanceInEther = web3.utils.fromWei(balance, 'ether');
//                 setWalletBalance(balanceInEther);
//             } catch (error) {
//                 console.error('Error retrieving wallet balance:', error);
//             }
//         };

//         loadTransactions();
//         loadBalance();
//     }, []);

//     const formatTimestamp = (timestamp) => {
//         const date = new Date(Number(timestamp) * 1000); // Convert BigInt to Number
//         return date.toLocaleString(); // Format the date and time
//     };

//     const formatAmount = (amount) => {
//         const web3 = new Web3('http://localhost:7545');
//         return web3.utils.fromWei(amount, 'ether');
//     };

//     return (
//         <div className='text-white text-center'>
//             <h1>Wallet Balance: {walletBalance} ETH</h1>
//             <br/>
//             <div style={cryptoCardStyle}>
//             <h2>All Transactions</h2>
//             <br/>
//             <ul>
//                 {transactions.map((transaction, index) => (
//                     <li key={index}>
//                         Sender: {transaction.sender}<br />
//                         Receiver: {transaction.receiver}<br />
//                         Date & Time: {formatTimestamp(transaction.timestamp)}<br />
//                         Amount: {formatAmount(transaction.amount)} ETH<br /> {/* Display sending amount */}
//                         Message: {transaction.message}<br />
//                         <br/>
//                         <br/>
//                     </li>
//                 ))}
//             </ul>
//             </div>
//         </div>
//     );
// }

// export default WalletBalance;

import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

const abi = [
    {
        "inputs": [],
        "name": "getAllTransactions",
        "outputs": [
            {
                "components": [
                    { "internalType": "address", "name": "sender", "type": "address" },
                    { "internalType": "address", "name": "receiver", "type": "address" },
                    { "internalType": "uint256", "name": "amount", "type": "uint256" },
                    { "internalType": "string", "name": "message", "type": "string" },
                    { "internalType": "uint256", "name": "timestamp", "type": "uint256" }
                ],
                "internalType": "struct Transactions.TransferStruct[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

const contractAddress = "0x570f236c625Bdba6a3510EBd813Ab42F90cdaE70";
const userWalletAddress = "0x468F943F0293C246949B40d708C7850Dcb50fC75";

function WalletBalance() {
    const cryptoCardStyle = {
        width: '50%',
        padding: '40px',
        margin: '20px auto',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '20px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
        boxSizing: 'border-box',
        textAlign: 'center',
        position: 'relative' // Ensure relative positioning for the container
    };

    const filterBoxStyle = {
        position: 'absolute',
        top: '2.5%', // Adjust top position as needed
        right: '10px', // Adjust right position as needed
        padding: '5px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '5px',
        color: 'black', // Set text color to black
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)'
    };
    

    const [transactions, setTransactions] = useState([]);
    const [walletBalance, setWalletBalance] = useState(0);
    const [filterDate, setFilterDate] = useState('');

    useEffect(() => {
        const loadTransactions = async () => {
            try {
                const web3 = new Web3('http://localhost:7545');
                const contract = new web3.eth.Contract(abi, contractAddress);
                const result = await contract.methods.getAllTransactions().call();
                const sortedTransactions = result.sort((a, b) => parseInt(b.timestamp) - parseInt(a.timestamp));
                setTransactions(sortedTransactions);
            } catch (error) {
                console.error('Error retrieving transactions:', error);
            }
        };

        const loadBalance = async () => {
            try {
                const web3 = new Web3('http://localhost:7545');
                const balance = await web3.eth.getBalance(userWalletAddress);
                const balanceInEther = web3.utils.fromWei(balance, 'ether');
                setWalletBalance(balanceInEther);
            } catch (error) {
                console.error('Error retrieving wallet balance:', error);
            }
        };

        loadTransactions();
        loadBalance();
    }, []);

    const formatTimestamp = (timestamp) => {
        const date = new Date(Number(timestamp) * 1000); // Convert BigInt to Number
        return date.toLocaleString(); // Format the date and time
    };

    const formatAmount = (amount) => {
        const web3 = new Web3('http://localhost:7545');
        return web3.utils.fromWei(amount, 'ether');
    };

    const handleFilter = () => {
        // Filter transactions based on selected date
        const filteredTransactions = transactions.filter(transaction => {
            const transactionDate = new Date(Number(transaction.timestamp) * 1000);
            const selectedDate = new Date(filterDate);
            return transactionDate.toDateString() === selectedDate.toDateString();
        });
        setTransactions(filteredTransactions);
    };
    

    return (
        <div className='text-white text-center' style={cryptoCardStyle}>
            <h1>Wallet Balance: {walletBalance} ETH</h1>
            <br />
            {/* Filter by Date */}
            <div style={filterBoxStyle}>
                <input type="date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} />
                <button onClick={handleFilter}>Filter</button>
            </div>
            <br />
            <div>
                <h2>All Transactions</h2>
                <br />
                <ul>
                    {transactions.map((transaction, index) => (
                        <li key={index}>
                            Sender: {transaction.sender}<br />
                            Receiver: {transaction.receiver}<br />
                            Date & Time: {formatTimestamp(transaction.timestamp)}<br />
                            Amount: {formatAmount(transaction.amount)} ETH<br /> {/* Display sending amount */}
                            Message: {transaction.message}<br />
                            <br />
                            <br />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default WalletBalance;

// import React, { useState, useEffect } from 'react';
// import Web3 from 'web3';

// // ABI of your contract
// const abi = [
//     {
//         "inputs": [],
//         "name": "getAllTransactions",
//         "outputs": [
//             {
//                 "components": [
//                     { "internalType": "address", "name": "sender", "type": "address" },
//                     { "internalType": "address", "name": "receiver", "type": "address" },
//                     { "internalType": "uint256", "name": "amount", "type": "uint256" },
//                     { "internalType": "string", "name": "message", "type": "string" },
//                     { "internalType": "uint256", "name": "timestamp", "type": "uint256" }
//                 ],
//                 "internalType": "struct Transactions.TransferStruct[]",
//                 "name": "",
//                 "type": "tuple[]"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     }
//     // Your ABI here
// ];

// // Address of your deployed contract (replace this with your actual deployed contract address)
// const contractAddress = "0x570f236c625Bdba6a3510EBd813Ab42F90cdaE70";
// // Address of the user's wallet (replace this with the user's actual wallet address)
// const userWalletAddress = "0x468F943F0293C246949B40d708C7850Dcb50fC75";

// function WalletBalance() {
//     const cryptoCardStyle = {
//         width: '50%',
//         padding: '30px',
//         margin: '20px auto',
//         background: 'rgba(255, 255, 255, 0.1)',
//         borderRadius: '20px',
//         boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
//         boxSizing: 'border-box',
//         textAlign: 'center'
        
//       };
//     const [transactions, setTransactions] = useState([]);
//     const [walletBalance, setWalletBalance] = useState(0);

//     useEffect(() => {
//         const loadTransactions = async () => {
//             try {
//                 // Connect to the Ethereum network (assuming it's running locally on port 7545)
//                 const web3 = new Web3('http://localhost:7545');

//                 // Instantiate the contract object
//                 const contract = new web3.eth.Contract(abi, contractAddress);

//                 // Call the getAllTransactions function to retrieve all transactions
//                 const result = await contract.methods.getAllTransactions().call();

//                 // Sort transactions array based on timestamp in descending order
//                 const sortedTransactions = result.sort((a, b) => parseInt(b.timestamp) - parseInt(a.timestamp));

//                 setTransactions(sortedTransactions);
//             } catch (error) {
//                 console.error('Error retrieving transactions:', error);
//             }
//         };

//         const loadBalance = async () => {
//             try {
//                 // Connect to the Ethereum network (assuming it's running locally on port 7545)
//                 const web3 = new Web3('http://localhost:7545');

//                 // Get the balance of the user's wallet
//                 const balance = await web3.eth.getBalance(userWalletAddress);
                
//                 // Convert balance from Wei to Ether
//                 const balanceInEther = web3.utils.fromWei(balance, 'ether');

//                 setWalletBalance(balanceInEther);
//             } catch (error) {
//                 console.error('Error retrieving wallet balance:', error);
//             }
//         };

//         loadTransactions();
//         loadBalance();
//     }, []);

//     return (
//         <div className='text-white text-center'>
//             <h1>Wallet Balance: {walletBalance} ETH</h1>
//             <br/>
//             <div style={cryptoCardStyle}>
//             <h2>All Transactions</h2>
//             <br/>
//             <ul>
//                 {transactions.map((transaction, index) => (
//                     <li key={index}>
//                         Sender: {transaction.sender}<br />
//                         Receiver: {transaction.receiver}<br />
//                         Amount: 0.0001<br />
//                         Message: {transaction.message}<br />
//                         <br/>
                       
                       
//                     </li>
//                 ))}
//             </ul>
//             </div>
//         </div>
//     );
// }

// export default WalletBalance;
