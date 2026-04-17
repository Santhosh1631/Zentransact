import abi from "./Transactions.json";

export const contractAddress =
	import.meta.env.VITE_CONTRACT_ADDRESS || "0xa9fb859a397dcA2C189Bcb19Cac1C2728Ee53D9D";
export const rpcUrl = import.meta.env.VITE_RPC_URL || "";
export const apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:10000";
export const contractABI = abi.abi;
