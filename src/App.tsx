import React from 'react';
import './App.css';

// Redux
import { store } from './redux/store'
import { Provider } from 'react-redux'

// Routing
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom' 

import TransactionsPage from './pages/Transactions';
import TransactionDetailPage from './pages/TransactionDetailPage';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className='App'>
          <Routes>
            <Route path='/transactions' element={<TransactionsPage />} />
            <Route path='/transaction-detail/:id' element={<TransactionDetailPage />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
