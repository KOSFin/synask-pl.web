// app/providers.jsx
import { DisplayProvider } from '../hooks/useDisplay';
import { DeviceProvider } from './useDevice';

export const Providers = ({ children }) => (
    <DeviceProvider>
        <DisplayProvider>
            {children}
        </DisplayProvider>
    </DeviceProvider>
);