import React, { useState, useEffect } from 'react';
import { FaArrowUp, FaArrowDown, FaSearch, FaSpinner, FaChartLine, FaDollarSign, FaClock } from 'react-icons/fa';

function Market() {
  const [cryptoData, setCryptoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('market_cap');
  const [sortOrder, setSortOrder] = useState('desc');

  const cryptoList = [
    { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' },
    { id: 'ethereum', name: 'Ethereum', symbol: 'ETH' },
    { id: 'tether', name: 'Tether', symbol: 'USDT' },
    { id: 'binancecoin', name: 'Binance Coin', symbol: 'BNB' },
    { id: 'ripple', name: 'XRP', symbol: 'XRP' },
    { id: 'usd-coin', name: 'USD Coin', symbol: 'USDC' },
    { id: 'staked-ether', name: 'Lido Staked Ether', symbol: 'STETH' },
    { id: 'cardano', name: 'Cardano', symbol: 'ADA' },
    { id: 'solana', name: 'Solana', symbol: 'SOL' },
    { id: 'dogecoin', name: 'Dogecoin', symbol: 'DOGE' },
    { id: 'tron', name: 'TRON', symbol: 'TRX' },
    { id: 'polkadot', name: 'Polkadot', symbol: 'DOT' },
    { id: 'polygon', name: 'Polygon', symbol: 'MATIC' },
    { id: 'litecoin', name: 'Litecoin', symbol: 'LTC' },
    { id: 'shiba-inu', name: 'Shiba Inu', symbol: 'SHIB' },
    { id: 'avalanche-2', name: 'Avalanche', symbol: 'AVAX' },
    { id: 'dai', name: 'Dai', symbol: 'DAI' },
    { id: 'chainlink', name: 'Chainlink', symbol: 'LINK' },
    { id: 'uniswap', name: 'Uniswap', symbol: 'UNI' },
    { id: 'bitcoin-cash', name: 'Bitcoin Cash', symbol: 'BCH' },
    { id: 'leo-token', name: 'LEO Token', symbol: 'LEO' },
    { id: 'stellar', name: 'Stellar', symbol: 'XLM' },
    { id: 'monero', name: 'Monero', symbol: 'XMR' },
    { id: 'ethereum-classic', name: 'Ethereum Classic', symbol: 'ETC' },
    { id: 'okb', name: 'OKB', symbol: 'OKB' },
    { id: 'cosmos', name: 'Cosmos Hub', symbol: 'ATOM' },
    { id: 'filecoin', name: 'Filecoin', symbol: 'FIL' },
    { id: 'hedera-hashgraph', name: 'Hedera', symbol: 'HBAR' },
    { id: 'internet-computer', name: 'Internet Computer', symbol: 'ICP' },
    { id: 'lido-dao', name: 'Lido DAO', symbol: 'LDO' },
    { id: 'crypto-com-chain', name: 'Cronos', symbol: 'CRO' },
    { id: 'vechain', name: 'VeChain', symbol: 'VET' },
    { id: 'aptos', name: 'Aptos', symbol: 'APT' },
    { id: 'near', name: 'NEAR Protocol', symbol: 'NEAR' },
    { id: 'quant-network', name: 'Quant', symbol: 'QNT' },
    { id: 'algorand', name: 'Algorand', symbol: 'ALGO' },
    { id: 'aave', name: 'Aave', symbol: 'AAVE' },
    { id: 'the-graph', name: 'The Graph', symbol: 'GRT' },
    { id: 'maker', name: 'Maker', symbol: 'MKR' },
    { id: 'fantom', name: 'Fantom', symbol: 'FTM' },
    { id: 'arbitrum', name: 'Arbitrum', symbol: 'ARB' },
    { id: 'optimism', name: 'Optimism', symbol: 'OP' },
    { id: 'sandbox', name: 'The Sandbox', symbol: 'SAND' },
    { id: 'theta', name: 'Theta Network', symbol: 'THETA' },
    { id: 'flow', name: 'Flow', symbol: 'FLOW' },
    { id: 'decentraland', name: 'Decentraland', symbol: 'MANA' },
    { id: 'axie-infinity', name: 'Axie Infinity', symbol: 'AXS' },
    { id: 'elrond-erd-2', name: 'MultiversX', symbol: 'EGLD' },
    { id: 'tezos', name: 'Tezos', symbol: 'XTZ' },
    { id: 'eos', name: 'EOS', symbol: 'EOS' },
    { id: 'klaytn', name: 'Klaytn', symbol: 'KLAY' },
    { id: 'iota', name: 'IOTA', symbol: 'MIOTA' }
  ];

  useEffect(() => {
    fetchCryptoData();
    const interval = setInterval(fetchCryptoData, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const fetchCryptoData = async () => {
    try {
      setLoading(true);
      const ids = cryptoList.map(crypto => crypto.id).join(',');
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch crypto data');
      }
      
      const data = await response.json();
      setCryptoData(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching crypto data:', error);
      setError('Failed to fetch crypto data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    if (price >= 1) {
      return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    } else {
      return `$${price.toFixed(6)}`;
    }
  };

  const formatMarketCap = (marketCap) => {
    if (marketCap >= 1e12) {
      return `$${(marketCap / 1e12).toFixed(2)}T`;
    } else if (marketCap >= 1e9) {
      return `$${(marketCap / 1e9).toFixed(2)}B`;
    } else if (marketCap >= 1e6) {
      return `$${(marketCap / 1e6).toFixed(2)}M`;
    } else {
      return `$${marketCap.toLocaleString()}`;
    }
  };

  const formatVolume = (volume) => {
    if (volume >= 1e9) {
      return `$${(volume / 1e9).toFixed(2)}B`;
    } else if (volume >= 1e6) {
      return `$${(volume / 1e6).toFixed(2)}M`;
    } else {
      return `$${volume.toLocaleString()}`;
    }
  };

  const filteredData = cryptoData?.filter(coin =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = filteredData?.sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];
    
    if (sortBy === 'price_change_percentage_24h') {
      aValue = a.price_change_percentage_24h || 0;
      bValue = b.price_change_percentage_24h || 0;
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const MarketOverview = () => {
    if (!cryptoData) return null;
    
    const totalMarketCap = cryptoData.reduce((sum, coin) => sum + (coin.market_cap || 0), 0);
    const totalVolume = cryptoData.reduce((sum, coin) => sum + (coin.total_volume || 0), 0);
    const avgChange = cryptoData.reduce((sum, coin) => sum + (coin.price_change_percentage_24h || 0), 0) / cryptoData.length;

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Market Cap</p>
              <p className="text-2xl font-bold">{formatMarketCap(totalMarketCap)}</p>
            </div>
            <FaDollarSign className="text-3xl text-blue-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">24h Volume</p>
              <p className="text-2xl font-bold">{formatVolume(totalVolume)}</p>
            </div>
            <FaChartLine className="text-3xl text-green-200" />
          </div>
        </div>
        
        <div className={`bg-gradient-to-r ${avgChange >= 0 ? 'from-green-600 to-emerald-600' : 'from-red-600 to-pink-600'} rounded-2xl p-6 text-white`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-100 text-sm">Avg 24h Change</p>
              <p className="text-2xl font-bold flex items-center">
                {avgChange >= 0 ? <FaArrowUp className="mr-2" /> : <FaArrowDown className="mr-2" />}
                {Math.abs(avgChange).toFixed(2)}%
              </p>
            </div>
            <FaClock className="text-3xl text-gray-200" />
          </div>
        </div>
      </div>
    );
  };

  if (loading && !cryptoData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <FaSpinner className="animate-spin text-4xl text-white mb-4 mx-auto" />
            <p className="text-white text-xl">Loading market data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="bg-red-600 bg-opacity-20 border border-red-600 rounded-2xl p-8">
            <p className="text-red-400 text-xl">{error}</p>
            <button 
              onClick={fetchCryptoData}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Crypto Market
        </h1>
        <p className="text-xl text-gray-300">
          Real-time cryptocurrency prices and market data
        </p>
      </div>

      {/* Market Overview */}
      <MarketOverview />

      {/* Search and Filter */}
      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white border-opacity-20">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search cryptocurrencies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="market_cap" className="bg-gray-800">Market Cap</option>
              <option value="current_price" className="bg-gray-800">Price</option>
              <option value="price_change_percentage_24h" className="bg-gray-800">24h Change</option>
              <option value="total_volume" className="bg-gray-800">Volume</option>
            </select>
            
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg transition-colors flex items-center"
            >
              {sortOrder === 'asc' ? <FaArrowUp /> : <FaArrowDown />}
            </button>
          </div>
        </div>
      </div>

      {/* Crypto Table */}
      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl border border-white border-opacity-20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white bg-opacity-10">
              <tr>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">#</th>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">Name</th>
                <th className="text-right py-4 px-6 text-gray-300 font-medium">Price</th>
                <th className="text-right py-4 px-6 text-gray-300 font-medium">24h</th>
                <th className="text-right py-4 px-6 text-gray-300 font-medium hidden md:table-cell">Market Cap</th>
                <th className="text-right py-4 px-6 text-gray-300 font-medium hidden lg:table-cell">Volume</th>
              </tr>
            </thead>
            <tbody>
              {sortedData?.map((coin, index) => (
                <tr key={coin.id} className="border-t border-white border-opacity-10 hover:bg-white hover:bg-opacity-5 transition-colors">
                  <td className="py-4 px-6 text-gray-300">{coin.market_cap_rank}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full mr-3" />
                      <div>
                        <p className="text-white font-medium">{coin.name}</p>
                        <p className="text-gray-400 text-sm">{coin.symbol.toUpperCase()}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right text-white font-mono">
                    {formatPrice(coin.current_price)}
                  </td>
                  <td className={`py-4 px-6 text-right font-medium ${
                    coin.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    <div className="flex items-center justify-end">
                      {coin.price_change_percentage_24h >= 0 ? (
                        <FaArrowUp className="mr-1 text-xs" />
                      ) : (
                        <FaArrowDown className="mr-1 text-xs" />
                      )}
                      {Math.abs(coin.price_change_percentage_24h || 0).toFixed(2)}%
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right text-gray-300 font-mono hidden md:table-cell">
                    {formatMarketCap(coin.market_cap)}
                  </td>
                  <td className="py-4 px-6 text-right text-gray-300 font-mono hidden lg:table-cell">
                    {formatVolume(coin.total_volume)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Last Updated */}
      <div className="text-center mt-6">
        <p className="text-gray-400 text-sm">
          Data updates every minute • Powered by CoinGecko API
        </p>
        {loading && (
          <div className="flex items-center justify-center mt-2">
            <FaSpinner className="animate-spin mr-2" />
            <span className="text-gray-400 text-sm">Updating...</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Market;