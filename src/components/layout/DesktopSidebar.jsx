import React from 'react';
import { useNavigate } from 'react-router-dom';
import { navItems } from './navigation';
import { sidebarStyles } from './styles/DesktopLayout.styles';
import { useDevice } from '../../providers/useDevice';

const DesktopSidebar = ({
  backgroundColor = 'rgba(255, 255, 255, 0.8)',
  borderColor = '#e0e0e0',
  iconColor = '#333',
}) => {
    const sidebarStyle = sidebarStyles(backgroundColor, borderColor, iconColor);
    const navigate = useNavigate();
    const { device } = useDevice();

  return (
    <div style={sidebarStyle.sidebarStyle}>
      {navItems(device).map((item, index) => {
        const Icon = item.icon;
        return <Icon key={index} style={sidebarStyle.iconStyle} title={item.title} onClick={() => navigate(item.path)} />;
      })}
    </div>
  );
};

export default DesktopSidebar;