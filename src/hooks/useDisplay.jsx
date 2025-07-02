// file: useDevice.js
import React, { useState, useEffect, createContext, useContext } from 'react';

const DeviceContext = createContext(null);
const MOBILE_BREAKPOINT = 768;

export const DisplayProvider = ({ children }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Функция для проверки размера окна
        const handleResize = () => {
            setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
        };

        // Вызываем функцию при первом рендере
        handleResize();

        // Добавляем слушатель события resize
        window.addEventListener('resize', handleResize);

        // Очищаем слушатель при размонтировании компонента
        return () => window.removeEventListener('resize', handleResize);
    }, []); // Пустой массив зависимостей означает, что эффект выполнится один раз при монтировании

    // Передаем значение isMobile через провайдер
    return (
        <DeviceContext.Provider value={{ isMobile }}>
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