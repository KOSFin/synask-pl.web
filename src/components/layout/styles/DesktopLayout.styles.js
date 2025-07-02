import { positionGeometry } from "three/tsl";

const sidebarStyles = (backgroundColor, iconColor, borderColor) => ({
    sidebarStyle: {
        width: '80px',
        height: '100vh',
        position: 'fixed',
        top: '0',
        left: '0',
        paddingTop: '80px', // Отступ сверху, чтобы не перекрываться с "углом" хедера
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
    },
    
    iconStyle: {
        color: iconColor,
        fontSize: '28px',
        cursor: 'pointer',
        transition: 'color 0.3s ease',
    },

    buttonStyle: {
        backgroundColor: backgroundColor,
        borderRight: `1px solid ${borderColor}`,
    }
});

const headerStyles = (backgroundColor, borderColor) => ({
    headerStyle: {
        height: '80px',
        width: 'calc(100% - 80px)', // Ширина минус ширина сайдбара
        position: 'fixed',
        top: '0',
        left: '80px', // Сдвигаем вправо на ширину сайдбара
    }
});

const mainComponentStyles = (backgroundColor) => ({
    content: {
        backgroundColor: backgroundColor,
        position: 'absolute',
        width: 'calc(100vw - 80px)',
        height: 'calc(100vh - 80px)',
        top: '80px',
        left: '80px',
        borderTopLeftRadius: '30px',
        padding: '10px',
    }
});

export { sidebarStyles, headerStyles, mainComponentStyles };