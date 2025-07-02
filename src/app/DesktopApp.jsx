import React from 'react';
import DevicesRoutes from './routes/DevicesRouter';
import DesktopLayout from '../components/layout/DesktopLayout';

const DesktopApp = () => {
    return (
        <DesktopLayout
            borderColor="#d1d1d1"
            iconColor="#5a5a5a"
            headerBgColor="rgba(255, 255, 255, 0.7)"
            sidebarBgColor="rgba(255, 255, 255, 0.7)"
            mainBgColor="rgba(100, 100, 100, 0.7)"
            background="rgba(0, 29, 61, 0.7)"
            style={{width: '100vw', height: '100vh', margin: '0'}}
        >
            <DevicesRoutes />
        </DesktopLayout>
    )
}

export default DesktopApp; 