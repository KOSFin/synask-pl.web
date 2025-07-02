import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDevice } from '../../providers/useDevice';
import MainPage from '../../pages/MainPage/MainPage';
import NotificationsPage from '../../pages/NotificationsPage/NotificationsPage';

const DevicesRoutes = () => {
    const { device } = useDevice();

    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/df" element={<MainPage />} />
            <Route path='/notifications' element={<NotificationsPage />} />
        </Routes>
    )
};

export default DevicesRoutes;