import React, { useState, useEffect, createContext, useContext } from 'react';

const DeviceContext = createContext(null);
const MOBILE_BREAKPOINT = 768;

export const DeviceProvider = ({ children }) => {
    // Состояние для хранения типа устройства: 'd' (desktop) или 'p' (pocket)
    const [device, setDevice] = useState(null);

    useEffect(() => {
        // Функция для однократной проверки размера окна
        const checkDevice = () => {
            const deviceType = window.innerWidth < MOBILE_BREAKPOINT ? 'p' : 'd';
            setDevice(deviceType);
        };

        checkDevice();

    }, []);
    if (!device) {
        return null; 
    }

    // Передаем значение ('d' или 'p') через провайдер
    return (
        <DeviceContext.Provider value={{ device }}>
            {children}
        </DeviceContext.Provider>
    );
};

export const useDevice = () => {
    const context = useContext(DeviceContext);
    if (context === null) {
        throw new Error('Хук useDevice должен использоваться внутри DeviceProvider');
    }
    return context;
};