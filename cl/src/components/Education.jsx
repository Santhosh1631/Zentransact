import React, { useState } from 'react';
import { 
  FaBitcoin, FaEthereum, FaCoins, FaChartLine, FaShieldAlt, FaGlobe, 
  FaBook, FaGraduationCap, FaLightbulb, FaDollarSign, FaNetworkWired,
  FaRocket, FaGamepad, FaCube, FaDatabase, FaLock, FaUsers,
  FaInfinity, FaLeaf, FaSearch
} from 'react-icons/fa';
import { 
  SiBinance, SiLitecoin, SiRipple, SiCardano, SiDogecoin, SiPolkadot,
  SiChainlink, SiSolana, SiTether, SiMonero
} from 'react-icons/si';

const Education = () => {
  const [activeTab, setActiveTab] = useState('basics');

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const coinsPerPage = 6;

  const cryptocurrencies = [
    {
      name: "Bitcoin (BTC)",
      category: "Store of Value",
      icon: <FaBitcoin className="text-orange-500 text-4xl" />,
      description: "Bitcoin is the first and most well-known cryptocurrency, operating as a decentralized digital currency that enables peer-to-peer transactions without intermediaries.",
      features: ["Decentralization", "Limited supply (21M)", "Proof of Work", "Immutable ledger", "Global accessibility"],
      useCases: ["Store of value", "Digital gold", "Cross-border payments", "Investment asset", "Hedge against inflation"]
    },
    {
      name: 'Ethereum (ETH)',
      category: "Smart Contract Platform",
      icon: <FaEthereum className="text-blue-500 text-4xl" />,
      description: 'Ethereum is a decentralized platform that enables smart contracts and decentralized applications, serving as the foundation for DeFi and Web3.',
      features: ["Smart Contracts", "DApps Platform", "Ethereum Virtual Machine", "Proof of Stake", "DeFi Foundation"],
      useCases: ["DeFi Protocols", "NFT Marketplace", "Smart Contracts", "Decentralized Apps", "Token Creation"]
    },
    {
      name: 'Tether (USDT)',
      category: "Stablecoin",
      icon: <SiTether className="text-green-500 text-4xl" />,
      description: 'Tether is a stablecoin pegged to the US Dollar, providing stability in the volatile cryptocurrency market.',
      features: ["USD-pegged", "Price stability", "High liquidity", "Multi-chain support", "Trading pairs"],
      useCases: ["Trading pairs", "Value preservation", "Remittances", "DeFi lending", "Cross-exchange transfers"]
    },
    {
      name: 'Binance Coin (BNB)',
      category: "Exchange Token",
      icon: <SiBinance className="text-yellow-500 text-4xl" />,
      description: 'Binance Coin is the native cryptocurrency of the Binance ecosystem, powering the world\'s largest crypto exchange and BSC network.',
      features: ["Exchange Utility", "BSC Network", "Trading Discounts", "Launchpad Access", "Burn Mechanism"],
      useCases: ["Trading fee discounts", "Staking rewards", "DeFi on BSC", "Token sales", "Payment method"]
    },
    {
      name: 'XRP (XRP)',
      category: "Payment Network",
      icon: <SiRipple className="text-blue-400 text-4xl" />,
      description: 'XRP is designed for fast, low-cost international payments and is used by financial institutions for cross-border transfers.',
      features: ["Fast settlements", "Low transaction costs", "Bank partnerships", "Energy efficient", "High throughput"],
      useCases: ["Cross-border payments", "Bank settlements", "Remittances", "Liquidity provision", "Institutional transfers"]
    },
    {
      name: 'Cardano (ADA)',
      category: "Blockchain Platform",
      icon: <SiCardano className="text-blue-600 text-4xl" />,
      description: 'Cardano is a proof-of-stake blockchain platform founded on peer-reviewed research and developed through evidence-based methods.',
      features: ["Proof of Stake", "Academic research", "Sustainability", "Smart contracts", "Governance"],
      useCases: ["Smart contracts", "DeFi applications", "Identity solutions", "Supply chain", "Voting systems"]
    },
    {
      name: 'Solana (SOL)',
      category: "High-Performance Blockchain",
      icon: <SiSolana className="text-purple-500 text-4xl" />,
      description: 'Solana is a high-performance blockchain supporting crypto apps and marketplaces with fast transactions and low fees.',
      features: ["High throughput", "Low fees", "Fast finality", "Proof of History", "Developer friendly"],
      useCases: ["DeFi protocols", "NFT marketplaces", "Web3 applications", "Gaming", "DEX platforms"]
    },
    {
      name: 'Dogecoin (DOGE)',
      category: "Meme Coin",
      icon: <SiDogecoin className="text-yellow-400 text-4xl" />,
      description: 'Dogecoin started as a meme but became a popular cryptocurrency for tips, donations, and micro-transactions.',
      features: ["Community driven", "Low transaction fees", "Fast transactions", "Inflationary supply", "Social currency"],
      useCases: ["Tips and donations", "Micro-payments", "Social media rewards", "Charitable giving", "Community projects"]
    },
    {
      name: 'Polkadot (DOT)',
      category: "Interoperability",
      icon: <SiPolkadot className="text-pink-500 text-4xl" />,
      description: 'Polkadot enables different blockchains to transfer messages and value in a trust-free fashion; sharing their unique features.',
      features: ["Interoperability", "Shared security", "Parachains", "Governance", "Scalability"],
      useCases: ["Cross-chain transfers", "Parachain auctions", "Governance voting", "Staking", "DeFi bridges"]
    },
    {
      name: 'Polygon (MATIC)',
      category: "Layer 2 Solution",
      icon: <FaNetworkWired className="text-purple-600 text-4xl" />,
      description: 'Polygon is a decentralized platform that provides faster and cheaper transactions on Ethereum using Layer 2 sidechains.',
      features: ["Layer 2 scaling", "Ethereum compatible", "Low fees", "Fast transactions", "Developer tools"],
      useCases: ["DeFi applications", "Gaming", "NFT marketplaces", "DApp scaling", "Enterprise solutions"]
    },
    {
      name: 'Litecoin (LTC)',
      category: "Digital Silver",
      icon: <SiLitecoin className="text-gray-400 text-4xl" />,
      description: 'Litecoin is a peer-to-peer cryptocurrency created as the "silver to Bitcoin\'s gold" with faster transaction times.',
      features: ["Fast transactions", "Low fees", "Scrypt algorithm", "Segwit support", "Atomic swaps"],
      useCases: ["Digital payments", "Micro-transactions", "Store of value", "Remittances", "P2P transfers"]
    },
    {
      name: 'Chainlink (LINK)',
      category: "Oracle Network",
      icon: <SiChainlink className="text-blue-500 text-4xl" />,
      description: 'Chainlink is a decentralized oracle network that provides real-world data to smart contracts on the blockchain.',
      features: ["Decentralized oracles", "Real-world data", "Smart contract connectivity", "Security", "Reliability"],
      useCases: ["Price feeds", "Weather data", "Sports results", "API integration", "Cross-chain communication"]
    },
    {
      name: 'Uniswap (UNI)',
      category: "Decentralized Exchange",
      icon: <FaChartLine className="text-pink-500 text-4xl" />,
      description: 'Uniswap is a decentralized trading protocol known for its role in facilitating automated trading of DeFi tokens.',
      features: ["Automated market maker", "Liquidity pools", "Decentralized trading", "Governance token", "Fee sharing"],
      useCases: ["Token swapping", "Liquidity provision", "Yield farming", "Governance voting", "DeFi trading"]
    },
    {
      name: 'Avalanche (AVAX)',
      category: "Smart Contract Platform",
      icon: <FaRocket className="text-red-500 text-4xl" />,
      description: 'Avalanche is a layer one blockchain that functions as a platform for decentralized applications and custom blockchain networks.',
      features: ["High throughput", "Low latency", "Eco-friendly", "Subnet creation", "Ethereum compatibility"],
      useCases: ["DeFi applications", "Enterprise blockchain", "Asset tokenization", "Custom networks", "Cross-chain bridges"]
    },
    {
      name: 'Shiba Inu (SHIB)',
      category: "Meme Token",
      icon: <FaCoins className="text-orange-400 text-4xl" />,
      description: 'Shiba Inu is a decentralized meme token that evolved into a vibrant ecosystem with its own DEX, NFTs, and more.',
      features: ["Community driven", "Ecosystem development", "ShibaSwap DEX", "NFT collections", "Burn mechanism"],
      useCases: ["Community governance", "DeFi trading", "NFT marketplace", "Gaming", "Ecosystem utility"]
    },
    {
      name: 'Monero (XMR)',
      category: "Privacy Coin",
      icon: <SiMonero className="text-orange-600 text-4xl" />,
      description: 'Monero is a privacy-focused cryptocurrency that uses ring signatures and stealth addresses to ensure transaction privacy.',
      features: ["Privacy by default", "Untraceable transactions", "Ring signatures", "Stealth addresses", "ASIC resistance"],
      useCases: ["Private transactions", "Confidential payments", "Anonymous transfers", "Privacy protection", "Fungible currency"]
    },
    {
      name: 'Cosmos (ATOM)',
      category: "Blockchain Ecosystem",
      icon: <FaGlobe className="text-indigo-500 text-4xl" />,
      description: 'Cosmos is an ecosystem of connected blockchains that can scale and interoperate with each other.',
      features: ["Inter-blockchain communication", "Tendermint consensus", "Cosmos SDK", "Scalability", "Sovereignty"],
      useCases: ["Cross-chain transfers", "Custom blockchains", "DeFi protocols", "Staking", "Governance"]
    },
    {
      name: 'Filecoin (FIL)',
      category: "Decentralized Storage",
      icon: <FaDatabase className="text-blue-400 text-4xl" />,
      description: 'Filecoin is a decentralized storage network designed to store humanity\'s most important information.',
      features: ["Decentralized storage", "Proof of storage", "Storage marketplace", "Data retrieval", "Incentive layer"],
      useCases: ["File storage", "Data backup", "Content distribution", "Web3 infrastructure", "Archival storage"]
    },
    {
      name: 'Aave (AAVE)',
      category: "DeFi Protocol",
      icon: <FaCoins className="text-purple-500 text-4xl" />,
      description: 'Aave is an open source and non-custodial liquidity protocol for earning interest on deposits and borrowing assets.',
      features: ["Lending protocol", "Flash loans", "Interest rates", "Collateralized lending", "Governance"],
      useCases: ["Crypto lending", "Borrowing assets", "Yield farming", "Flash loans", "DeFi strategies"]
    },
    {
      name: 'The Sandbox (SAND)',
      category: "Gaming & Metaverse",
      icon: <FaGamepad className="text-yellow-500 text-4xl" />,
      description: 'The Sandbox is a virtual gaming world where players can build, own, and monetize their gaming experiences.',
      features: ["Virtual world", "NFT integration", "Play-to-earn", "User-generated content", "LAND ownership"],
      useCases: ["Gaming", "Virtual real estate", "NFT creation", "Social experiences", "Digital assets"]
    }
  ];

  // Filter cryptocurrencies based on search term
  const filteredCurrencies = cryptocurrencies.filter(crypto =>
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    crypto.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    crypto.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredCurrencies.length / coinsPerPage);
  const startIndex = (currentPage - 1) * coinsPerPage;
  const paginatedCurrencies = filteredCurrencies.slice(startIndex, startIndex + coinsPerPage);

  const learningTopics = [
    {
      category: "Blockchain Basics",
      icon: <FaBook className="text-purple-500 text-3xl" />,
      topics: [
        "What is Blockchain?",
        "How Transactions Work",
        "Mining and Consensus Mechanisms",
        "Public vs Private Keys",
        "Wallet Security Best Practices",
        "Hash Functions and Cryptography",
        "Merkle Trees and Block Structure",
        "Network Nodes and Validation"
      ]
    },
    {
      category: "DeFi & Smart Contracts",
      icon: <FaGraduationCap className="text-green-500 text-3xl" />,
      topics: [
        "Decentralized Finance (DeFi)",
        "Smart Contract Development",
        "Automated Market Makers (AMM)",
        "Yield Farming Strategies",
        "Liquidity Mining",
        "Flash Loans",
        "Governance and DAOs",
        "Lending and Borrowing Protocols",
        "Cross-chain Bridges",
        "DeFi Security Risks"
      ]
    },
    {
      category: "Trading & Investment",
      icon: <FaChartLine className="text-red-500 text-3xl" />,
      topics: [
        "Technical Analysis Fundamentals",
        "Fundamental Analysis",
        "Risk Management Strategies",
        "Portfolio Diversification",
        "Dollar Cost Averaging (DCA)",
        "Market Psychology & Sentiment",
        "Long-term vs Short-term Strategies",
        "Stop Loss and Take Profit",
        "Reading Market Trends",
        "Tax Implications"
      ]
    },
    {
      category: "Web3 & NFTs",
      icon: <FaCube className="text-pink-500 text-3xl" />,
      topics: [
        "Non-Fungible Tokens (NFTs)",
        "Web3 and Decentralization",
        "Metaverse Platforms",
        "Digital Identity",
        "Creator Economy",
        "Gaming and Play-to-Earn",
        "Virtual Real Estate",
        "NFT Marketplaces",
        "Intellectual Property",
        "Future of Digital Ownership"
      ]
    },
    {
      category: "Advanced Topics",
      icon: <FaRocket className="text-indigo-500 text-3xl" />,
      topics: [
        "Layer 2 Solutions",
        "Interoperability Protocols",
        "Zero-Knowledge Proofs",
        "Quantum Computing Threats",
        "Central Bank Digital Currencies",
        "Regulatory Compliance",
        "Institutional Adoption",
        "Environmental Impact",
        "Scalability Trilemma",
        "Future Innovations"
      ]
    }
  ];

  const securityTips = [
    {
      title: "Secure Your Private Keys",
      description: "Never share your private keys or seed phrases. Store them offline in a hardware wallet for maximum security.",
      icon: <FaShieldAlt className="text-blue-500 text-2xl" />
    },
    {
      title: "Use Reputable Exchanges",
      description: "Only use well-established exchanges with strong security records, insurance, and regulatory compliance.",
      icon: <FaGlobe className="text-green-500 text-2xl" />
    },
    {
      title: "Enable 2FA Everywhere",
      description: "Always enable two-factor authentication on all your crypto accounts, wallets, and exchange platforms.",
      icon: <FaLightbulb className="text-yellow-500 text-2xl" />
    },
    {
      title: "Verify URLs and Apps",
      description: "Always double-check website URLs and download apps only from official sources to avoid phishing attacks.",
      icon: <FaLock className="text-red-500 text-2xl" />
    },
    {
      title: "Use Hardware Wallets",
      description: "For long-term storage, use hardware wallets that keep your private keys offline and secure.",
      icon: <FaDatabase className="text-purple-500 text-2xl" />
    },
    {
      title: "Keep Software Updated",
      description: "Regularly update your wallet software, browser, and operating system to patch security vulnerabilities.",
      icon: <FaRocket className="text-indigo-500 text-2xl" />
    }
  ];

  const TabButton = ({ id, label, active, onClick, icon: Icon }) => (
    <button
      onClick={() => onClick(id)}
      className={`group relative px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
        active
          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-2xl'
          : 'bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-20 text-gray-300 hover:bg-opacity-20 hover:text-white hover:shadow-xl'
      }`}
    >
      <div className="flex items-center space-x-2">
        {Icon && <Icon className="h-5 w-5" />}
        <span>{label}</span>
      </div>
      {active && (
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl opacity-20 blur-xl"></div>
      )}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-white bg-opacity-10 backdrop-blur-lg rounded-full border border-white border-opacity-20 mb-6">
            <FaGraduationCap className="h-5 w-5 text-purple-400 mr-2" />
            <span className="text-white text-sm font-medium">Educational Platform</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Crypto{' '}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Education
            </span>{' '}
            Hub
          </h1>
          
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Master the world of blockchain technology and cryptocurrencies with our comprehensive 
            educational resources. From basics to advanced concepts, we've got you covered.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-6 mb-16">
          <TabButton 
            id="basics" 
            label="Crypto Basics" 
            icon={FaBook}
            active={activeTab === 'basics'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="currencies" 
            label="Popular Coins" 
            icon={FaCoins}
            active={activeTab === 'currencies'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="learning" 
            label="Learning Paths" 
            icon={FaLightbulb}
            active={activeTab === 'learning'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="security" 
            label="Security Tips" 
            icon={FaShieldAlt}
            active={activeTab === 'security'} 
            onClick={setActiveTab} 
          />
        </div>

      {/* Content Sections */}
      {activeTab === 'basics' && (
        <div className="space-y-8">
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 border border-white border-opacity-20">
            <div className="flex items-center mb-6">
              <FaCoins className="text-gold-500 text-3xl mr-4" />
              <h2 className="text-3xl font-bold text-white">What is Cryptocurrency?</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  Cryptocurrency is a digital or virtual currency that uses cryptography for security. 
                  It operates independently of a central bank and uses decentralized control through blockchain technology.
                </p>
                <h3 className="text-xl font-semibold text-white mb-4">Key Characteristics:</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center"><span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>Decentralized</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>Secure</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>Transparent</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>Immutable</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl p-6 text-white">
                <h3 className="text-xl font-semibold mb-4">Why Use Crypto?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <FaGlobe className="text-xl mr-3 mt-1" />
                    <span>Global accessibility without borders</span>
                  </li>
                  <li className="flex items-start">
                    <FaShieldAlt className="text-xl mr-3 mt-1" />
                    <span>Enhanced security and privacy</span>
                  </li>
                  <li className="flex items-start">
                    <FaChartLine className="text-xl mr-3 mt-1" />
                    <span>Potential for investment growth</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'currencies' && (
        <div className="space-y-8">
          {/* Search and Filter */}
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-20">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search cryptocurrencies..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-10 pr-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="text-gray-300">
                {filteredCurrencies.length} cryptocurrencies found
              </div>
            </div>
          </div>

          {/* Cryptocurrency Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {paginatedCurrencies.map((crypto, index) => (
              <div key={index} className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-20 hover:bg-opacity-15 transition-all">
                <div className="flex items-center mb-4">
                  {crypto.icon}
                  <div className="ml-4">
                    <h3 className="text-2xl font-bold text-white">{crypto.name}</h3>
                    <span className="text-sm bg-purple-600 text-white px-2 py-1 rounded-full">{crypto.category}</span>
                  </div>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">{crypto.description}</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Key Features</h4>
                    <ul className="space-y-2">
                      {crypto.features.slice(0, 4).map((feature, idx) => (
                        <li key={idx} className="text-gray-300 flex items-center text-sm">
                          <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2 flex-shrink-0"></span>
                          {feature}
                        </li>
                      ))}
                      {crypto.features.length > 4 && (
                        <li className="text-gray-400 text-sm">+{crypto.features.length - 4} more</li>
                      )}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Use Cases</h4>
                    <ul className="space-y-2">
                      {crypto.useCases.slice(0, 4).map((useCase, idx) => (
                        <li key={idx} className="text-gray-300 flex items-center text-sm">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 flex-shrink-0"></span>
                          {useCase}
                        </li>
                      ))}
                      {crypto.useCases.length > 4 && (
                        <li className="text-gray-400 text-sm">+{crypto.useCases.length - 4} more</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-4">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-white bg-opacity-10 text-white rounded-lg hover:bg-opacity-20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Previous
              </button>
              
              <div className="flex space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 rounded-lg transition-all ${
                      currentPage === page
                        ? 'bg-purple-600 text-white'
                        : 'bg-white bg-opacity-10 text-gray-300 hover:bg-opacity-20'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-white bg-opacity-10 text-white rounded-lg hover:bg-opacity-20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}

      {activeTab === 'learning' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {learningTopics.map((topic, index) => (
            <div key={index} className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-20 hover:bg-opacity-15 transition-all">
              <div className="flex items-center mb-6">
                {topic.icon}
                <h3 className="text-lg font-bold text-white ml-3">{topic.category}</h3>
              </div>
              <ul className="space-y-2">
                {topic.topics.slice(0, 6).map((item, idx) => (
                  <li key={idx} className="text-gray-300 hover:text-white cursor-pointer transition-colors flex items-center p-2 rounded-lg hover:bg-white hover:bg-opacity-10 text-sm">
                    <span className="w-1.5 h-1.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mr-3 flex-shrink-0"></span>
                    {item}
                  </li>
                ))}
                {topic.topics.length > 6 && (
                  <li className="text-gray-400 text-xs italic pl-5">
                    +{topic.topics.length - 6} more topics
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'security' && (
        <div className="space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Stay Safe in Crypto</h2>
            <p className="text-xl text-gray-300">Essential security practices to protect your digital assets</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {securityTips.map((tip, index) => (
              <div key={index} className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-20 text-center hover:bg-opacity-15 transition-all">
                <div className="flex justify-center mb-4">
                  {tip.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{tip.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{tip.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">⚠️ Common Scams to Avoid</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <ul className="space-y-3">
                <li>• Phishing websites and emails</li>
                <li>• "Get rich quick" schemes</li>
                <li>• Fake social media giveaways</li>
                <li>• Unsolicited investment advice</li>
              </ul>
              <ul className="space-y-3">
                <li>• Fake mobile apps</li>
                <li>• Ponzi schemes and MLMs</li>
                <li>• Romance scams involving crypto</li>
                <li>• Fake celebrity endorsements</li>
              </ul>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default Education;