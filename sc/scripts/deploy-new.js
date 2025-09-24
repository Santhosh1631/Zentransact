const main = async () => {
  console.log("🚀 Starting deployment of ZenTransact contract...");
  
  // Get the ContractFactory and deploy
  const transactionsFactory = await hre.ethers.getContractFactory("Transactions");
  
  console.log("📄 Deploying contract...");
  const transactionsContract = await transactionsFactory.deploy();

  console.log("⏳ Waiting for deployment to be mined...");
  await transactionsContract.deployed();

  console.log("✅ Contract deployed successfully!");
  console.log("📍 Contract Address:", transactionsContract.address);
  
  // Get the network info
  const network = await hre.ethers.provider.getNetwork();
  console.log("🌐 Network:", network.name, "(Chain ID:", network.chainId + ")");
  
  // Get deployer info
  const [deployer] = await hre.ethers.getSigners();
  console.log("👤 Deployed by:", deployer.address);
  
  const balance = await deployer.getBalance();
  console.log("💰 Deployer balance:", hre.ethers.utils.formatEther(balance), "ETH");
  
  // Test basic contract functions
  console.log("\n🧪 Testing basic contract functions...");
  
  try {
    const transactionCount = await transactionsContract.getTransactionCount();
    console.log("📊 Initial transaction count:", transactionCount.toString());
    
    const scheduledCount = await transactionsContract.getScheduledTransactionCount();
    console.log("📅 Initial scheduled transaction count:", scheduledCount.toString());
    
    const contractBalance = await transactionsContract.getContractBalance();
    console.log("💳 Initial contract balance:", hre.ethers.utils.formatEther(contractBalance), "ETH");
    
    console.log("✅ Contract is working correctly!");
  } catch (error) {
    console.error("❌ Error testing contract:", error.message);
  }
  
  console.log("\n📝 Don't forget to:");
  console.log("1. Update the CONTRACT_ADDRESS in your frontend constants.js");
  console.log("2. Update the CONTRACT_ADDRESS in your scheduler .env file");
  console.log("3. Update the contract ABI in your frontend if you made changes");
  
  return transactionsContract.address;
};

const runMain = async () => {
  try { 
    await main();
    process.exit(0);
  } catch (error) {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  }
};

runMain();