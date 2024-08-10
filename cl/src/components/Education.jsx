import React from 'react';

const Education = () => {
  const cryptocurrencies = [
    {
      name: "Bitcoin (BTC)",
      description: "'BTC' typically refers to Bitcoin, which is a decentralized digital currency, without a central bank or single administrator, that can be sent from user to user on the peer-to-peer bitcoin network without the need for intermediaries. Transactions are verified by network nodes through cryptography and recorded in a public distributed ledger called a blockchain. Bitcoin was invented in 2008 by an unknown person or group of people using the name Satoshi Nakamoto. The currency began use in 2009 when its implementation was released as open-source software",
      features: [
        "Decentralization",
        "Limited supply (21 million)",
        "Immutable ledger"
      ],
      useCases: [
        "Store of value",
        "Medium of exchange",
        "Digital gold"
      ]
    },
    {
      name: 'Ethereum (ETH)',
      description: 'Ethereum is a decentralized platform that enables the creation and execution of smart contracts. It is known for its use of Ether (ETH) as a cryptocurrency and plays a crucial role in the world of decentralized finance (DeFi). Ethereum provides a versatile environment for developers to build decentralized applications (DApps) and is a key player in the blockchain space.',
      features: [
        'Smart Contract Execution',
        'Decentralized Applications (DApps)',
        'Ethereum Virtual Machine (EVM)',
        'Active Developer Community',
        'Support for ERC-20 and ERC-721 Tokens',
      ],
      useCases: [
        'Decentralized Finance (DeFi)',
        'Non-Fungible Tokens (NFTs)',
        'Decentralized Autonomous Organizations (DAOs)',
        'Tokenization of Assets',
      ],
    },
    {
      name: 'Binance Coin (BNB)',
      description: 'Binance Coin is the native cryptocurrency of the Binance exchange. It holds significant value in the Binance Smart Chain (BSC) ecosystem and serves multiple purposes within the Binance platform. BNB is widely used for trading fee discounts, participating in token sales, and fueling transactions on the Binance Smart Chain.',
      features: [
        'Trading Fee Discounts',
        'Binance Smart Chain (BSC)',
        'Token Sales on Binance Launchpad',
        'Utility within the Binance Ecosystem',
        'Support for BEP-20 Tokens',
      ],
      useCases: [
        'Trading Fee Payments',
        'Participating in Token Sales',
        'BSC-Based Decentralized Applications (DApps)',
        'Staking and Yield Farming',
      ],
    },
    {
      name: 'Solana (SOL)',
      description: 'Solana is a high-performance blockchain platform designed for decentralized applications and crypto projects. It stands out for its fast transaction throughput and low transaction costs. Solana utilizes Proof-of-History (PoH) as a consensus mechanism, enabling it to scale and support a wide range of applications.',
      features: [
        'High Transaction Throughput',
        'Low Transaction Costs',
        'Proof-of-History (PoH) Consensus',
        'Support for Smart Contracts',
        'Growing Ecosystem of Projects',
      ],
      useCases: [
        'Decentralized Exchanges (DEX)',
        'Blockchain Gaming',
        'Tokenized Assets',
        'DeFi Applications on Solana',
      ],
    },
    {
      name: 'XRP (XRP)',
      description: 'XRP is a digital payment protocol designed to facilitate fast and cost-effective cross-border transactions. It operates on the XRP Ledger and aims to provide a seamless experience for transferring value globally. XRP is utilized by various financial institutions for its efficiency in settling payments.',
      features: [
        'Fast and Cost-Effective Transactions',
        'XRP Ledger',
        'Global Cross-Border Payments',
        'Used by Financial Institutions',
      ],
      useCases: [
        'Cross-Border Payments',
        'Remittances',
        'Liquidity for Financial Institutions',
      ],
    },
    {
      name: 'Tron (TRX)',
      description: 'Tron is a blockchain platform that aims to build a decentralized internet. It focuses on providing a scalable and cost-effective solution for content creators and users. Tron features a high throughput and supports smart contracts, making it suitable for various decentralized applications and entertainment content.',
      features: [
        'Scalable Blockchain Platform',
        'High Throughput',
        'Smart Contract Support',
        'Decentralized Applications (DApps)',
        'Decentralized Content Distribution',
      ],
      useCases: [
        'Content Creation and Distribution',
        'Gaming and Entertainment DApps',
        'Tokenized Assets',
        'DeFi Applications',
      ],
    },
    {
      name: 'Dogecoin (DOGE)',
      description: 'Dogecoin started as a meme-based cryptocurrency but has gained popularity for its active community and use in tipping and microtransactions. It features the Shiba Inu dog from the "Doge" meme as its logo. Dogecoin is often used for charitable donations and has a friendly and approachable image in the crypto space.',
      features: [
        'Meme-Based Cryptocurrency',
        'Active and Enthusiastic Community',
        'Low Transaction Fees',
        'Microtransactions and Tipping',
        'Participation in Memes and Internet Culture',
      ],
      useCases: [
        'Charitable Donations',
        'Tipping Content Creators',
        'Microtransactions on Social Media',
        'Community-driven Initiatives',
      ],
    },
    {
      name: 'Avalanche (AVAX)',
      description: 'Avalanche is a blockchain platform designed for launching decentralized applications and custom blockchain networks. It focuses on providing high performance, scalability, and flexibility. Avalanche features a unique consensus protocol called Avalanche Consensus, which enables quick finality and low-latency transactions.',
      features: [
        'High Performance',
        'Scalability',
        'Custom Blockchain Networks',
        'Avalanche Consensus Protocol',
        'Interoperability with Other Blockchains',
      ],
      useCases: [
        'Decentralized Finance (DeFi)',
        'Tokenization of Assets',
        'Custom Blockchain Development',
        'Cross-Chain Interoperability',
      ],
    },
    {
      name: 'Cardano (ADA)',
      description: 'Cardano is a blockchain platform that aims to provide a secure and scalable infrastructure for the development of decentralized applications and smart contracts. It is known for its research-driven approach and commitment to sustainability. Cardano features the Ouroboros consensus algorithm.',
      features: [
        'Secure and Scalable Blockchain',
        'Research-Driven Development',
        'Ouroboros Consensus Algorithm',
        'Decentralized Applications (DApps)',
        'Smart Contracts',
      ],
      useCases: [
        'Decentralized Finance (DeFi)',
        'Identity Management',
        'Supply Chain Tracking',
        'Governance and Voting Systems',
      ],
    },
    {
      name: 'Litecoin (LTC)',
      description: 'Litecoin is a peer-to-peer cryptocurrency that enables instant, near-zero-cost payments to anyone in the world. It is an open-source global payment network that is fully decentralized without any central authorities. Litecoin features faster block generation times compared to Bitcoin and uses the Scrypt hashing algorithm.',
      features: [
        'Fast Transaction Confirmation',
        'Scrypt Hashing Algorithm',
        'Decentralized',
        'Global Payment Network',
        'Open-Source',
      ],
      useCases: [
        'Peer-to-Peer Payments',
        'Microtransactions',
        'Store of Value',
        'Cryptocurrency Transactions',
      ],
    },
    {
      name: 'Monero (XMR)',
      description: 'Monero is a privacy-focused cryptocurrency that prioritizes user anonymity and security. It employs advanced cryptographic techniques to provide confidential and untraceable transactions. Monero uses a unique technology called Ring Signatures to mix transaction inputs, ensuring privacy and fungibility.',
      features: [
        'Privacy-Focused',
        'Untraceable Transactions',
        'Ring Signatures',
        'Decentralized and Secure',
        'Active Community',
      ],
      useCases: [
        'Private Transactions',
        'Anonymous Payments',
        'Store of Value',
        'Privacy Protection',
      ],
    },
    {
      name: 'NEO (NEO)',
      description: 'NEO is a blockchain platform that aims to build a smart economy by incorporating digital assets, smart contracts, and a digital identity system. It provides a comprehensive solution for the digitization of assets using smart contracts and aims to create a decentralized and efficient ecosystem for the new era of the internet.',
      features: [
        'Digital Assets',
        'Smart Contracts',
        'Digital Identity',
        'Decentralized Economy',
        'Developer-Friendly',
      ],
      useCases: [
        'Smart Contracts Development',
        'Tokenization of Assets',
        'Digital Identity Solutions',
        'Decentralized Applications (DApps)',
      ],
    },
    {
      name: 'Dash (DASH)',
      description: 'Dash is a cryptocurrency that focuses on fast and low-cost transactions. It features a two-tier network with miners and masternodes, providing additional services like InstantSend and PrivateSend. Dash aims to be user-friendly, allowing individuals and businesses to transact with ease.',
      features: [
        'Fast and Low-Cost Transactions',
        'Two-Tier Network',
        'InstantSend',
        'PrivateSend',
        'User-Friendly',
      ],
      useCases: [
        'Digital Cash Transactions',
        'Merchant Payments',
        'Private Transactions',
        'Decentralized Applications (DApps)',
      ],
    },
    {
      name: "Polkadot (DOT)",
      description: "Polkadot is a multi-chain blockchain platform that enables interoperability between different blockchains. It aims to provide a framework for building and connecting decentralized applications.",
      features: [
        "Interoperability between blockchains",
        "Scalability through shared security",
        "Governance through stakeholder voting"
      ],
      useCases: [
        "Cross-chain compatibility",
        "Decentralized finance (DeFi)",
        "Decentralized identity and authentication"
      ]
    },
    {
      name: "Chainlink (LINK)",
      description: "Chainlink is a decentralized oracle network that connects smart contracts with real-world data. It aims to enable smart contracts to securely interact with external data sources, APIs, and payment systems.",
      features: [
        "Decentralized oracle network",
        "Secure data delivery",
        "Wide range of data sources"
      ],
      useCases: [
        "Price feeds for decentralized finance (DeFi)",
        "Real-world asset tokenization",
        "Supply chain management"
      ]
    },
    {
      name: "Stellar (XLM)",
      description: "Stellar is an open network for storing and moving money. It facilitates cross-border transactions and enables users to create, send, and trade digital representations of all forms of money.",
      features: [
        "Fast and low-cost transactions",
        "Decentralized exchange",
        "Multi-currency transactions"
      ],
      useCases: [
        "Cross-border payments",
        "Remittances",
        "Tokenization of assets"
      ]
    },
    {
      name: "Terra (LUNA)",
      description: "Terra is a blockchain protocol that uses fiat-pegged stablecoins to power price-stable global payments systems. It aims to provide a scalable solution for decentralized finance (DeFi) applications.",
      features: [
        "Fiat-pegged stablecoins",
        "Scalable blockchain protocol",
        "Interoperability with other blockchains"
      ],
      useCases: [
        "Decentralized finance (DeFi)",
        "Cross-border payments",
        "Tokenization of assets"
      ]
    },
    {
      name: "Uniswap (UNI)",
      description: "Uniswap is a decentralized exchange (DEX) protocol that facilitates automated transactions between cryptocurrency tokens on the Ethereum blockchain. It operates without an order book and uses liquidity pools.",
      features: [
        "Automated token swaps",
        "Liquidity pools",
        "Decentralized governance"
      ],
      useCases: [
        "Token trading",
        "Liquidity provision",
        "Decentralized finance (DeFi)"
      ]
    },
    {
      name: "Polygon (MATIC)",
      description: "Polygon is a protocol and a framework for building and connecting Ethereum-compatible blockchain networks. It aims to address Ethereum's scalability issues and enable faster and cheaper transactions.",
      features: [
        "Scalability solutions",
        "Interoperability with Ethereum",
        "Developer-friendly tools"
      ],
      useCases: [
        "Scalable decentralized applications (DApps)",
        "Token transfers",
        "Layer 2 solutions for Ethereum"
      ]
    },
    {
      name: "Algorand (ALGO)",
      description: "Algorand is a blockchain platform that aims to provide a decentralized, scalable, and secure environment for building and deploying decentralized applications (DApps) and financial protocols.",
      features: [
        "Pure proof-of-stake consensus mechanism",
        "Scalable architecture",
        "Fast transaction speeds"
      ],
      useCases: [
        "Decentralized finance (DeFi)",
        "Asset tokenization",
        "Secure digital identity"
      ]
    },
    {
      name: "VeChain (VET)",
      description: "VeChain is a blockchain platform designed to enhance supply chain management and business processes. Its goal is to streamline these processes and information flow for complex supply chains through the use of distributed ledger technology (DLT).",
      features: [
        "Supply chain management solutions",
        "Traceability of goods",
        "Data authentication"
      ],
      useCases: [
        "Product authenticity verification",
        "Supply chain transparency",
        "Anti-counterfeiting measures"
      ]
    },
    {
      name: "Filecoin (FIL)",
      description: "Filecoin is a decentralized storage network designed to store humanity's most important information. It allows users to rent out excess storage space on their computers and get paid in FIL tokens.",
      features: [
        "Decentralized storage marketplace",
        "Incentivized storage sharing",
        "Data integrity and security"
      ],
      useCases: [
        "File storage and retrieval",
        "Data archiving",
        "Content delivery networks (CDNs)"
      ]
    },
    {
      name: "Theta Token (THETA)",
      description: "Theta is a decentralized video delivery network that aims to improve the quality of online video streaming and reduce the costs associated with delivering video content. It uses blockchain technology to incentivize users to share their redundant computing and bandwidth resources.",
      features: [
        "Decentralized video delivery",
        "Quality streaming services",
        "Token incentives for sharing resources"
      ],
      useCases: [
        "Video streaming platforms",
        "Content delivery networks (CDNs)",
        "Decentralized video applications"
      ]
    },
    {
      name: "Tezos (XTZ)",
      description: "Tezos is a blockchain platform that aims to improve upon the shortcomings of existing blockchain systems like Bitcoin and Ethereum. It features on-chain governance and formal verification of smart contracts.",
      features: [
        "On-chain governance",
        "Formal verification",
        "Liquid proof-of-stake consensus mechanism"
      ],
      useCases: [
        "Decentralized finance (DeFi)",
        "Tokenization of assets",
        "Smart contracts"
      ]
    },
    {
      name: "Dai (DAI)",
      description: "Dai is a decentralized stablecoin that aims to maintain a stable value relative to the US dollar. It is collateral-backed and governed by the MakerDAO protocol.",
      features: [
        "Decentralized stablecoin",
        "Collateral-backed",
        "Governance by the MakerDAO protocol"
      ],
      useCases: [
        "Stable medium of exchange",
        "Decentralized finance (DeFi)",
        "Hedging against cryptocurrency volatility"
      ]
    },
    {
      name: "Cosmos (ATOM)",
      description: "Cosmos is a decentralized network of independent parallel blockchains, each powered by BFT consensus algorithms like Tendermint. It aims to solve scalability, interoperability, and usability issues in blockchain ecosystems.",
      features: [
        "Interoperability between blockchains",
        "Scalability solutions",
        "Modular architecture"
      ],
      useCases: [
        "Cross-chain transactions",
        "Decentralized finance (DeFi)",
        "Scalable decentralized applications (DApps)"
      ]
    },
    {
      name: "Aave (AAVE)",
      description: "Aave is an open-source, non-custodial liquidity protocol that enables users to earn interest on deposits and borrow assets. It features flash loans, variable interest rates, and decentralized governance.",
      features: [
        "Liquidity protocol",
        "Interest earning and borrowing",
        "Flash loans"
      ],
      useCases: [
        "Earning interest on deposits",
        "Borrowing assets",
        "Leveraging flash loans for arbitrage"
      ]
    },
    
    {
      name: "SushiSwap (SUSHI)",
      description: "SushiSwap is a decentralized cryptocurrency exchange (DEX) built on the Ethereum blockchain. It aims to provide users with a more community-oriented and decentralized alternative to traditional centralized exchanges.",
      features: [
        "Automated market making",
        "Decentralized governance",
        "Community-driven development"
      ],
      useCases: [
        "Token trading",
        "Liquidity provision",
        "Yield farming"
      ]
    },
    {
      name: "Maker (MKR)",
      description: "Maker is a decentralized autonomous organization (DAO) that governs the Maker Protocol, which issues the stablecoin Dai. MKR token holders govern the system, including the stability of Dai's peg to the US dollar.",
      features: [
        "Decentralized autonomous organization (DAO)",
        "Stablecoin issuance",
        "Governance by MKR token holders"
      ],
      useCases: [
        "Stability governance",
        "Collateral management",
        "Decentralized finance (DeFi)"
      ]
    },
    
    {
      name: "Bitcoin Cash (BCH)",
      description: "Bitcoin Cash is a peer-to-peer electronic cash system that aims to enable fast, low-cost transactions. It emerged as a fork of Bitcoin with the goal of increasing the block size limit to improve scalability.",
      features: [
        "Fast and low-cost transactions",
        "Increased block size (8 MB)",
        "On-chain scalability"
      ],
      useCases: [
        "Peer-to-peer transactions",
        "Retail payments",
        "Micropayments"
      ]
    }
  ];

  // Styles
  const containerStyle = {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    background: 'radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), radial-gradient(at 50% 0%, rgb(108, 176, 240) 0, transparent 50%), radial-gradient(at 100% 0%, #F806CC 0, transparent 50%)',
    color: '#fff',
  };

  const headingStyle = {
    textAlign: 'center',
    fontSize: '36px',
    fontWeight: 'bold',
    margin: '20px 0',
  };

  const cryptoContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  };

  const cryptoCardStyle = {
    width: '30%',
    padding: '20px',
    margin: '20px',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
    boxSizing: 'border-box',
  };

  const cryptoTitleStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '10px 0',
  };

  const cryptoDescriptionStyle = {
    fontSize: '16px',
    lineHeight: '1.5',
    marginBottom: '20px',
  };

  const featureSectionStyle = {
    marginBottom: '20px',
  };

  const useCaseSectionStyle = {
    marginBottom: '20px',
  };

  const sectionHeadingStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    margin: '10px 0',
  };

  const listStyle = {
    listStyleType: 'none',
    margin: '0',
    padding: '0',
  };

  const listItemStyle = {
    fontSize: '16px',
    marginBottom: '5px',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Explore Cryptocurrencies</h1>

      <div style={cryptoContainerStyle}>
        {cryptocurrencies.map((crypto) => (
          <div key={crypto.name} style={cryptoCardStyle}>
            <h2 style={cryptoTitleStyle}>{crypto.name}</h2>
            <p style={cryptoDescriptionStyle}>{crypto.description}</p>

            <div style={featureSectionStyle}>
              <h3 style={sectionHeadingStyle}>Key Features</h3>
              <ul style={listStyle}>
                {crypto.features.map((feature, index) => (
                  <li key={index} style={listItemStyle}>{feature}</li>
                ))}
              </ul>
            </div>

            <div style={useCaseSectionStyle}>
              <h3 style={sectionHeadingStyle}>Use Cases</h3>
              <ul style={listStyle}>
                {crypto.useCases.map((useCase, index) => (
                  <li key={index} style={listItemStyle}>{useCase}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education;
