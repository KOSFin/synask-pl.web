import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from '../pages/MainPage';

const DesktopApp = () => {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
        </Routes>
    )
}

export default DesktopApp;