// import React, { useEffect, useState ,useContext} from "react";
// import { ethers } from "ethers";


// import { contractABI, contractAddress } from "../utils/constants";

// export const TransactionContext = React.createContext();




// export const TransactionsProvider = ({ children }) => {
  
//   const [currentAccount, setCurrentAccount] = useState("");
//   const [formData, setformData] = useState({ addressTo: "", amount: "", message: "" });
//   const [isLoading, setIsLoading] = useState(false); // Define setIsLoading
//   const [transactionsCount, setTransactionsCount] = useState(localStorage.getItem('transactionCount'));

//   const handleChange = (e, name) => {
//     setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
//   };
 
//   const getEthereumContract = async () => {
//     try {
//       if (!ethereum) {
//         throw new Error("Ethereum object not available. Please make sure MetaMask is installed and your wallet is connected.");
//       }
  
//       await ethereum.request({ method: "eth_requestAccounts" }); // Ensure user permission
  
//       const provider = new ethers.providers.Web3Provider(ethereum);
//       const signer = provider.getSigner();
//       const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);
  
//      return transactionsContract;
//     } catch (error) {
//       console.error("Error in getEthereumContract:", error.message);
//     }
//   };
  
  
  
  
// const checkIfWalletIsConnect = async () => {
//     try {
//      if (!ethereum) return alert("Please install MetaMask.");
     
//      const accounts = await ethereum.request({ method: "eth_accounts" });
     
//      if (accounts.length) {
//        setCurrentAccount(accounts[1]);
       
//        //       getAllTransactions();
//       } else {
//         console.log("no accounts found");
//       }
//     } catch (error) {
//       console.log(error);
//       throw new Error("No ether object ")
//     }
//   };
  
  
  
//   const connectWallet = async () => {
//     try {
//       if (!ethereum) return alert("please install metamask");
//       const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

//         setCurrentAccount(accounts[0]);
//           } catch (error) {
//             console.error( error);
//             throw new Error("No object ")
//           }
//         };
//   const sendTransaction = async () => {
//      try {
//       if (!ethereum) return alert("Please install MetaMask.");
//             const { addressTo, amount, message } = formData;
        
//             const transactionsContract = await getEthereumContract();
        
//             const parsedAmount = ethers.utils.parseEther(amount);
        
//             const tx = await ethereum.request({
//               method: "eth_sendTransaction",
//               params: [{
//                 from: currentAccount,
//                 to: addressTo,
//                 gas: "0x5208",
//                 value: parsedAmount._hex,
//               }],
//             });
        
//             console.log("Transaction sent:", tx);
        
//             const transactionHash = await transactionsContract.addToBlockchain(
//               addressTo,
//               parsedAmount,
//               message
//             );
        
//             setIsLoading(true);
//             console.log(`Loading - ${transactionHash.hash}`);
//             await transactionHash.wait();
//             setIsLoading(false);
//             console.log(`Success - ${transactionHash.hash}`);
           
        
//             const transactionsCount = await transactionsContract.getTransactionCount();
//             setTransactionsCount(transactionsCount.toNumber());
//           } catch (error) {
//             console.error("Error in sendTransaction:", error);
//           }
//     };
        
        
  

//   useEffect(() => {
//     checkIfWalletIsConnect();
   
//   }, []);

//   return (
//     <TransactionContext.Provider
//       value={{connectWallet,currentAccount,formData,handleChange,sendTransaction,isLoading,transactionsCount}}
//     >
//       {children}
//     </TransactionContext.Provider>
//   );
// };
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

      const tx = await ethereum.request({
        method: "eth_sendTransaction",
        params: [{
          from: currentAccount,
          to: addressTo,
          gas: "0x5208", // 21000 GWEI
          value: parsedAmount._hex,
        }],
      });

      console.log("Transaction sent:", tx);

      const transactionHash = await transactionsContract.addToBlockchain(
        addressTo,
        parsedAmount,
        message
      );

      setIsLoading(true);
      console.log(`Loading - ${transactionHash.hash}`);
      await transactionHash.wait();
      setIsLoading(false);
      console.log(`Success - ${transactionHash.hash}`);

      const transactionsCount = await transactionsContract.getTransactionCount();
      setTransactionsCount(transactionsCount.toNumber());

      toast.success('Your payment was successful!');
    } catch (error) {
      if (error.code === -32602) {
        toast.error("Invalid parameters: Please check the recipient's address and amount.");
      } else {
        toast.error('Your payment failed: ' + error.message);
      }
      console.error("Error in sendTransaction:", error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnect();
  }, []);

  return (
    <TransactionContext.Provider
      value={{ connectWallet, currentAccount, formData, handleChange, sendTransaction, isLoading, transactionsCount }}>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      {children}
    </TransactionContext.Provider>
  );
};
