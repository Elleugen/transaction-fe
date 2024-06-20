import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider, UserContext } from './UserContext';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import HomePage from './components/HomePage';
import TransactionsPage from './components/TransactionsPage';
import CreateTransactionPage from './components/CreateTransactionPage';
import NavigationMenu from './components/NavigationMenu';

const AppContent = () => {
    const { user } = useContext(UserContext);

    return (
        <div className="app-layout">
            {user && <NavigationMenu />}
            <div className="app-content">
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/transactions" element={<TransactionsPage role="Maker" />} />
                    <Route path="/create-transaction" element={<CreateTransactionPage />} />
                    <Route path="*" element={<LoginPage />} />
                </Routes>
            </div>
        </div>
    );
};

const App = () => {
    return (
        <UserProvider>
            <Router>
                <AppContent />
            </Router>
        </UserProvider>
    );
};

export default App;
