import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DesktopApp from '../DesktopApp';
import PocketApp from '../PocketApp';

const MainRoutes = () => (
    <Routes>
        <Route path="/d/*" element={<DesktopApp />} />
        <Route path="/p/*" element={<PocketApp />} />
    </Routes>
);

export default MainRoutes;