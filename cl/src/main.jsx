import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx'
import './index.css'
import{TransactionsProvider} from './context/TransactionContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <TransactionsProvider>
  <React.StrictMode>

    <App />
  
  </React.StrictMode>
  </TransactionsProvider>
)


