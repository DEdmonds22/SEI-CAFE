import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import NewOrderPage from './pages/NewOrderPage';
import AuthPage from './pages/AuthPage';
import { Routes, Route } from 'react-router-dom';
import OrderHistoryPage from './pages/OrderHistoryPage';
import NavBar from './components/NavBar';

function App() {
  const [user, setUser] = useState();
  return (
    <div className="App">
      { user ?
      <>
        <NavBar />
        <Routes>
          <Route path='/orders' element={<OrderHistoryPage />} />
          <Route path='/orders/new' element={<NewOrderPage />} />
        </Routes>
        </>
      : <AuthPage />}
    </div>
  );
}

export default App;
