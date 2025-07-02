import React from 'react';
import DesktopHeader from './DesktopHeader';
import DesktopSidebar from './DesktopSidebar';
import { mainComponentStyles } from './styles/DesktopLayout.styles';

const DesktopLayout = ({children, ...props}) => {
    const mainStyle = mainComponentStyles(props.mainBgColor);

    return (
        <div style={{backgroundColor: props.backgroundColor, width: '100vw', height: '100vh', position: 'fixed', top: '0'}}>
            <DesktopHeader
                backgroundColor={props.headerBgColor}
                borderColor={props.borderColor}
            />
            <DesktopSidebar
                backgroundColor={props.sidebarBgColor}
                borderColor={props.borderColor}
                iconColor={props.iconColor}
            />
            <main style={mainStyle.content}>{children}</main>
        </div>
    )
};

export default DesktopLayout;