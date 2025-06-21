// app/providers.jsx
import { DeviceProvider } from '../hooks/useDevice';

export const Providers = ({ children }) => (
    <DeviceProvider>
        {children}
    </DeviceProvider>
);
