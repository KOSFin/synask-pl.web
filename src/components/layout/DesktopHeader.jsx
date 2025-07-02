import React from 'react';
import { headerStyles } from './styles/DesktopLayout.styles';

const DesktopHeader = ({
  backgroundColor = 'rgba(255, 255, 255, 0.8)',
  borderColor = '#e0e0e0',
}) => {
  const headerStyle = headerStyles(backgroundColor, borderColor);

  return (
    <>
      <div style={headerStyle.headerStyle} className="desktop-header">
        {/* Здесь можно разместить виджеты, поиск, профиль пользователя и т.д. */}
        <p style={{ margin: 0 }}>Header Content</p>
      </div>
    </>
  );
};

export default DesktopHeader;