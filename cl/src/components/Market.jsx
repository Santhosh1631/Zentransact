import React, { useState, useEffect } from 'react';

function Market() {
 
  const headingStyle = {
    textAlign: 'center',
    fontSize: '36px',
    fontWeight: 'bold',
    margin: '20px 0',
  };

  const cryptoCardStyle = {
    width: '50%',
    padding: '30px',
    margin: '20px',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '20px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
    boxSizing: 'border-box',
  };
  const cryptoCardStyle1 = {
    
    width: '70%',
    padding: '30px',
    margin: '20px',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '20px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
    boxSizing: 'border-box',
  };
  

  const [cryptoData, setCryptoData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCryptoData() {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ripple,litecoin,bitcoin-cash,cardano,polkadot,chainlink,stellar,dogecoin,solana,binancecoin,monero,eos,tron,avalanche,terra,uniswap,polygon,algorand,vechain,filecoin,theta-token,tezos,dai,cosmos,aave,compound,sushiswap,maker&vs_currencies=usd&include_24hr_change=true');
        if (!response.ok) {
          throw new Error('Failed to fetch crypto data');
        }
        const data = await response.json();
        console.log(data); // Log the fetched data
        setCryptoData(data);
      } catch (error) {
        console.error('Error fetching current crypto prices:', error);
        setError('Failed to fetch crypto data. Please try again later.');
      }
    }
    fetchCryptoData();
  }, []
  );

  return (
      <div className='market-container'>
    <div>
      <h1 style={headingStyle} className='d'>Crypto Prices</h1>

    </div>
      <div className='top-item text-white text-center '>
      </div>
      <div className='left-column text-center'>
      {/* <div className="p-8 sm:w-39 w-full flex flex-col justify-start blue-glassmorphism"> */}
   
        {/* <div style={cryptoContainerStyle}> */}
        <div style={cryptoCardStyle}>
          
        {cryptoData && (
          <>

            <CryptoCard currency="Bitcoin" data={cryptoData.bitcoin} /><br />
            <CryptoCard currency="Ethereum" data={cryptoData.ethereum} /><br />
            <CryptoCard currency="Ripple" data={cryptoData.ripple} /><br />
            <CryptoCard currency="Litecoin" data={cryptoData.litecoin} /><br />
            <CryptoCard currency="Bitcoin Cash" data={cryptoData['bitcoin-cash']} /><br />
            <CryptoCard currency="Cardano" data={cryptoData.cardano} /><br />
            <CryptoCard currency="Polkadot" data={cryptoData.polkadot} /><br />
            <CryptoCard currency="Chainlink" data={cryptoData.chainlink} /><br />
            <CryptoCard currency="Stellar" data={cryptoData.stellar} /><br />
            <CryptoCard currency="Dogecoin" data={cryptoData.dogecoin} /><br />
            <CryptoCard currency="Solana" data={cryptoData.solana} /><br />
            <CryptoCard currency="Binance Coin" data={cryptoData.binancecoin} /><br />
            <CryptoCard currency="Monero" data={cryptoData.monero} /><br />
            {/* <CryptoCard currency="EOS.IO" data={cryptoData.eos} /><br /> */}
            <CryptoCard currency="TRON" data={cryptoData.tron} /><br />
            
          </>
        )}
      {/* </div> */}
      </div>
    
      </div>
     
      <div className='right-column text-center'>
        
          {/* <div style={cryptoContainerStyle}> */}
        <div style={cryptoCardStyle1}>
        {/* <div className="p-8 sm:w-31 w-full flex flex-col justify-start blue-glassmorphism"> */}
        {cryptoData && (
          <>
            <CryptoCard currency="Avalanche" data={cryptoData.avalanche} /><br />
            <CryptoCard currency="Terra" data={cryptoData.terra} /><br />
            <CryptoCard currency="Uniswap" data={cryptoData.uniswap} /><br />
            <CryptoCard currency="Polygon" data={cryptoData.polygon} /><br />
            <CryptoCard currency="Algorand" data={cryptoData.algorand} /><br />
            <CryptoCard currency="VeChain" data={cryptoData.vechain} /><br />
            <CryptoCard currency="Filecoin" data={cryptoData.filecoin} /><br />
            <CryptoCard currency="Theta Token" data={cryptoData['theta-token']} /><br />
            <CryptoCard currency="Tezos" data={cryptoData.tezos} /><br />
            <CryptoCard currency="Dai" data={cryptoData.dai} /><br />
            <CryptoCard currency="Cosmos" data={cryptoData.cosmos} /><br />
            <CryptoCard currency="Aave" data={cryptoData.aave} /><br />
            <CryptoCard currency="Compound" data={cryptoData.compound} /><br />
            <CryptoCard currency="SushiSwap" data={cryptoData.sushiswap} /><br />
            <CryptoCard currency="Maker" data={cryptoData.maker} /><br />
          </>
        )}
   
      </div>
      {/* </div> */}
      </div>
    </div>
  );
}

function CryptoCard({ currency, data }) {
  const [percentageChange, setPercentageChange] = useState(null);
  const [changeColor, setChangeColor] = useState('black');
  const [changeSymbol, setChangeSymbol] = useState('');

  useEffect(() => {
    if (data) {
      const change = data.usd_24h_change.toFixed(2);
      setPercentageChange(change);
      // Determine color and symbol based on sign of the percentage change
      if (change > 0) {
        setChangeColor('#33ff00');
        setChangeSymbol('+');
      } else if (change < 0) {
        setChangeColor('red');
        setChangeSymbol('-');
      }
    }
  }, [data]);

  const priceStyle = {
    fontSize: '1.2em',
    color: 'rgb(144, 238, 144)',
  };

  const changeStyle = {
    color: changeColor,
  };

  return (
    <div className='crypto-card'>
      <h2>{currency} Price (USD)</h2>
      <p style={priceStyle}>{data ? `$${data.usd}` : 'Loading...'}</p>
      {percentageChange && (
        <p> 24h  : <span style={changeStyle}>{changeSymbol}{Math.abs(percentageChange)}%</span></p>
      )}
    </div>
  );
}

export default Market;


// import React, { useState, useEffect } from 'react';
// import { FaArrowRight } from 'react-icons/fa';

// function Market() {
//   const headingStyle = {
//     textAlign: 'center',
//     fontSize: '30px',
//     fontWeight: 'bold',
//     margin: '20px 0',
//   };
  
//   const [cryptoData, setCryptoData] = useState(null);
//   const [error, setError] = useState(null);
  

//   useEffect(() => {
//     async function fetchCryptoData() {
//       try {
//         const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ripple,litecoin,bitcoin-cash,cardano,polkadot,chainlink,stellar,dogecoin,solana,binancecoin,monero,eos,tron&vs_currencies=usd');
//         if (!response.ok) {
//           throw new Error('Failed to fetch crypto data');
//         }
//         const data = await response.json();
//         console.log(data); // Log the fetched data
//         setCryptoData(data);
//       } catch (error) {
//         console.error('Error fetching current crypto prices:', error);
//         setError('Failed to fetch crypto data. Please try again later.');
//       }
//     }
//     fetchCryptoData();
//   }, []
 
  
//   );

//   return (
//     <div className='market-container'>
//       <div className='top-item text-white text-center d'>
//         <h1 style={headingStyle}>Crypto Prices</h1>
//       </div>
//       <div className='left-column'>
//         {cryptoData && (
//           <>
//             <CryptoCard currency="Bitcoin" price={cryptoData.bitcoin && cryptoData.bitcoin.usd} /><br />
//             <CryptoCard currency="Ethereum" price={cryptoData.ethereum && cryptoData.ethereum.usd} /><br />
//             <CryptoCard currency="Ripple" price={cryptoData.ripple && cryptoData.ripple.usd} /><br />
//             <CryptoCard currency="Litecoin" price={cryptoData.litecoin && cryptoData.litecoin.usd} /><br />
//             <CryptoCard currency="Bitcoin Cash" price={cryptoData['bitcoin-cash'] && cryptoData['bitcoin-cash'].usd} /><br />
//             <CryptoCard currency="Cardano" price={cryptoData.cardano && cryptoData.cardano.usd} /><br />
//             <CryptoCard currency="Polkadot" price={cryptoData.polkadot && cryptoData.polkadot.usd} /><br />
//           </>
//         )}
//       </div>
//       <div className='right-column'>
//         {cryptoData && (
//           <>
//             <CryptoCard currency="Chainlink" price={cryptoData.chainlink && cryptoData.chainlink.usd} /><br />
//             <CryptoCard currency="Stellar" price={cryptoData.stellar && cryptoData.stellar.usd} /><br />
//             <CryptoCard currency="Dogecoin" price={cryptoData.dogecoin && cryptoData.dogecoin.usd} /><br />
//             <CryptoCard currency="Solana" price={cryptoData.solana && cryptoData.solana.usd} /><br />
//             <CryptoCard currency="Binance Coin" price={cryptoData.binancecoin && cryptoData.binancecoin.usd} /><br />
//             <CryptoCard currency="Monero" price={cryptoData.monero && cryptoData.monero.usd} /><br />
//             <CryptoCard currency="EOS.IO" price={cryptoData.eos && cryptoData.eos.usd} /><br />
//             <CryptoCard currency="TRON" price={cryptoData.tron && cryptoData.tron.usd} /><br />
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// function CryptoCard({ currency, price }) {
//   const [percentageChange, setPercentageChange] = useState(null);

//   useEffect(() => {
//     async function fetchPercentageChange() {
//       try {
//         const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${currency.toLowerCase()}&vs_currencies=usd`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch percentage change data');
//         }
//         const data = await response.json();
//         console.log(data); // Log the fetched data
//         const currentPrice = data[currency.toLowerCase()].usd;
//         // Calculate percentage change
//         const change = (((currentPrice - price) / price) * 100).toFixed(2);
//         setPercentageChange(change);
//       } catch (error) {
//         console.error(`Error fetching percentage change for ${currency}:`, error);
//         setPercentageChange('N/A');
//       }
//     }
//     fetchPercentageChange();
//   }, [currency, price]);

//   const priceStyle = {
//     fontSize: '1.2em',
//     color: 'rgb(144, 238, 144)',
//   };

//   return (
//     <div className='crypto-card'>
//       <h2>{currency} Price (USD)</h2>
//       <p style={priceStyle}>{price ? `$${price}` : 'Loading...'}</p>
//       {percentageChange && (
//         <p>Daily Change: {percentageChange}%</p>
//       )}
//     </div>
//   );
// }

// export default Market;
