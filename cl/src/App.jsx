import { useState } from 'react'
import { Navbar,Welcome,Transactions,Market,Education,WalletBalance,Footer,TransactionHistory} from './components';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const App =()=> {
  

  // return (
  //   <div className='min-h-screen'>
  //     <div className='gradient-bg-welcome'>
      
  //       {/* <Navbar/>
  //       <Welcome/> */}

  //       <TransactionHistory/>
  //      </div>
  //       {/* <CryptoPrice /> */}


  //   </div>
  // )

    return (
      <Router>
        <div className='min-h-screen'>
    <div className='gradient-bg-welcome'>
          <Navbar />
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/market" element={<Market />} />
            <Route path="/education" element={<Education />} />
            <Route path="/wallets" element={<WalletBalance />} />
            {/* <Route exact path="/" component={PaymentPage} /> */}
          {/* <Route path="/transaction-successful" component={TransactionSuccessfulNotification} /> */}
          </Routes>
        </div>
        <Footer/>
        </div>
      </Router>
    );
  }
  

  

export default App

// // App.jsx
// // import React from 'react';
// //import Education from './components/Education'; // Correct casing
// //import Trasaction from './components/Trasaction';
// import React from 'react';
// import TransactionHistory from './components/TransactionHistory';

// const App = () => {
//   return (
//     <div>
//       <h1>Your Webpage</h1>
//       <TransactionHistory />
//     </div>
//   );
// };

// export default App;