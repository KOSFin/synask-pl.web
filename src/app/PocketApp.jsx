import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from '../pages/WelcomePage/WelcomePage';

const PocketApp = () => {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
        </Routes>
    )
}

export default PocketApp;