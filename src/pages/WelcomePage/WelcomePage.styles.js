const styles = {
    // -- ОБЩИЕ СТИЛИ ПРИЛОЖЕНИЯ --
    appContainer: {
        backgroundColor: '#000',
        color: '#fff',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
    pageContent: {
        position: 'relative',
        zIndex: 30, 
    },
    glassPane: {
        position: 'relative',
        zIndex: 10,
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        backgroundColor: 'rgba(25, 22, 47, 0.94)',
        backdropFilter: 'blur(12px) saturate(150%)',
        borderBottom: '1px solid rgba(187, 0, 255, 0.37)',
        borderTop: '1px solid rgba(187, 0, 255, 0.37)',
        borderRadius: '1.5rem',
        margin: '0 auto',
        width: '100vw',
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
    },
    sectionTitle: {
        fontSize: 'clamp(2rem, 4vw, 3rem)',
        fontWeight: 800,
        background: 'linear-gradient(to right, #FB923C, #C084FC)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textAlign: 'center',
        margin: 0,
    },
    sectionSubtitle: {
        fontSize: '1.125rem',
        color: '#9CA3AF',
        maxWidth: '48rem',
        textAlign: 'center',
        margin: '0 auto',
    },

    sectionBlock: (isMobile) => ({
        height: 'calc(100vh - 80px)',
        marginTop: '50px',
        padding: isMobile ? '5px' : '20px'
    }),

    // -- ХЕДЕР (HEADER) --
    header: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 50,
        borderBottom: '1px solid', // Управляется через variants
        transition: 'background-color 0.3s ease, border-color 0.3s ease',
    },
    headerContent: {
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '5rem',
    },
    logo: {
        flexShrink: 0,
        fontWeight: 'bold',
        fontSize: '1.875rem',
        letterSpacing: '0.05em',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
    },
    desktopNav: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
    },
    navLink: {
        color: '#D1D5DB',
        transition: 'color 0.2s',
        padding: '0.5rem 0.75rem',
        borderRadius: '0.375rem',
        textDecoration: 'none',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem',
    },
    navButton: {
        background: 'linear-gradient(to right, #F97316, #A855F7)',
        color: 'white',
        fontWeight: 'bold',
        padding: '0.5rem 1.25rem',
        borderRadius: '0.5rem',
        transition: 'all 0.3s',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 4px 15px rgba(168, 85, 247, 0.2)',
    },
    dropdownContainer: {
        position: 'relative',
    },
    dropdownMenu: {
        position: 'absolute',
        top: '100%',
        marginTop: '0.5rem',
        width: '12rem',
        backgroundColor: 'rgba(17, 24, 39, 0.8)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '0.5rem',
        padding: '0.5rem',
    },
    dropdownLink: {
        color: '#D1D5DB',
        transition: 'color 0.2s',
        padding: '0.5rem 0.75rem',
        borderRadius: '0.375rem',
        textDecoration: 'none',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem',
        width: '100%',
    },
    headerVariants: {
        top: {
            backgroundColor: 'rgba(17, 24, 39, 0)',
            backdropFilter: 'blur(0px) saturate(100%)',
            borderColor: 'rgba(187, 0, 255, 0)',
        },
        scrolled: {
            backgroundColor: 'rgba(17, 24, 39, 0.45)',
            backdropFilter: 'blur(15px) saturate(150%)',
            borderColor: 'rgba(187, 0, 255, 0.37)',
        }
    },
    
    // -- СЕКЦИЯ INTRO --
    introSectionContainer: (isMobile) => ({
        position: 'relative',
        alignItems: 'center',
        padding: isMobile ? 0 : '2rem 1rem 0 1rem',
    }),
    introMainTitle: (isMobile) => ({
        fontSize: isMobile ? '2.5rem' : '3.2rem',
        fontWeight: 800,
        textAlign: 'center',
        background: 'linear-gradient(90deg, #FB923C, #C084FC)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '2.5rem',
        maxWidth: '1280px',
        width: '100%',
    }),
    introWrapper: (isMobile) => ({
        position: 'relative',
        width: '100%',
        maxWidth: isMobile ? 'none' : 'calc(100vw - 60px)',
        margin: '0 auto',
        zIndex: 20,
        borderRadius: '2rem 2rem 0 0',
        boxShadow: '0 0 80px 40px rgba(249,115,22,0.18), 0 0 120px 60px rgba(168,85,247,0.12)',
        background: 'rgba(25, 22, 47, 0.85)',
        overflow: 'hidden',
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        backdropFilter: 'blur(10px)',
    }),
    introLeft: (isMobile) => ({
        flex: 1.2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        // Используем только развернутые свойства для padding
        paddingTop: isMobile ? '2rem' : '3.5rem',
        paddingRight: isMobile ? '1.5rem' : '3.5rem',
        paddingBottom: isMobile ? '2rem' : '3.5rem',
        paddingLeft: isMobile ? '1.5rem' : '3.5rem',
    }),
    introRight: (isMobile) => ({
        flex: 0.8,
        position: 'relative',
        minHeight: isMobile ? '300px' : 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }),
    introStoryText: (isMobile) => ({
        color: '#D1D5DB',
        fontSize: isMobile ? '1rem' : '1.1rem',
        lineHeight: 1.7,
        maxWidth: '550px',
    }),
    introMascot: (isMobile) => ({
        position: 'absolute',
        bottom: isMobile ? '-40px' : '-60px',
        right: isMobile ? '-50px' : '-80px',
        width: isMobile ? '280px' : '450px',
        height: 'auto',
        pointerEvents: 'none',
        transition: 'transform 0.3s ease-out',
    }),
    introArrow: {
        position: 'absolute',
        bottom: '120px',
        right: '280px',
        width: '100px',
        transform: 'rotate(-25deg)',
        opacity: 0.7
    },

    // -- ГЛАВНАЯ СЕКЦИЯ (HERO) --
    heroSection: (isMobile) => ({
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0 1rem', // Убрал вертикальный padding, он теперь управляется ниже
        position: 'sticky',
        top: 0,
        zIndex: 10,
        // На ПК - центрируем. На мобильных - прижимаем к верху.
        justifyContent: isMobile ? 'flex-start' : 'center', 
        // На мобильных - даем отступ СВЕРХУ. На ПК - небольшой отступ для баланса.
        paddingTop: isMobile ? '15vh' : '1rem',
        paddingBottom: '1rem', // Добавим небольшой нижний отступ для всех
    }),

    heroTitle: (isMobile) => ({
        fontWeight: 800,
        background: 'linear-gradient(to right, #FB923C, #C084FC)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '1.5rem',
        textAlign: 'center',
        width: '100%',
        fontSize: isMobile ? '7.5vw' : 'clamp(2.5rem, 5vw + 1rem, 3.75rem)',
        whiteSpace: isMobile ? 'nowrap' : 'normal',
    }),

    heroSubtitle: (isMobile) => ({
        fontSize: '1.125rem',
        color: '#9CA3AF',
        maxWidth: '42rem',
        textAlign: 'center',
        // Отступы меняются из-за смены порядка блоков на мобильных
        marginTop: '1.5rem'
    }),
    heroContentWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    badgesContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '0.75rem',
        marginBottom: '2rem',
    },
    badge: {
        fontSize: '0.75rem',
        fontWeight: 600,
        padding: '0.25rem 0.75rem',
        borderRadius: '9999px',
    },
    badgeStatus: {
        fontSize: '0.75rem',
        fontWeight: 600,
        padding: '0.25rem 0.75rem',
        borderRadius: '9999px',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        border: '1px solid rgba(34, 197, 94, 0.3)',
        color: '#4ADE80',
    },
    badgeVersion: {
        fontSize: '0.75rem',
        fontWeight: 600,
        padding: '0.25rem 0.75rem',
        borderRadius: '9999px',
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        border: '1px solid rgba(168, 85, 247, 0.3)',
        color: '#C084FC',
    },
    badgeUsers: {
        fontSize: '0.75rem',
        fontWeight: 600,
        padding: '0.25rem 0.75rem',
        borderRadius: '9999px',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        border: '1px solid rgba(59, 130, 246, 0.3)',
        color: '#93C5FD',
    },
    emailForm: {
        width: '100%',
        maxWidth: '28rem'
    },
    emailInputContainer: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'rgba(17, 24, 39, 0.5)',
        border: '1px solid rgba(168, 85, 247, 0.5)',
        borderRadius: '0.5rem',
        padding: '0.5rem',
        backdropFilter: 'blur(4px)',
    },
    emailInput: {
        appearance: 'none',
        backgroundColor: 'transparent',
        border: 'none',
        width: '100%',
        color: 'white',
        marginRight: '0.75rem',
        padding: '0.5rem',
        lineHeight: '1.5',
    },

    // -- СЕКЦИЯ С ТЕЛЕФОНОМ (PHONE FEED) --
    phoneSectionContainer: {
        position: 'relative',
        height: '220vh',
        width: '100%',
    },
    phoneStickyContainer: {
        position: 'sticky',
        top: '13%',
        marginTop: '20px',
        height: '85vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    phoneBody: {
        position: 'relative',
        width: 'clamp(300px, 22vw, 400px)',
        height: '100%',
        backgroundColor: '#000',
        border: '10px solid #27272a',
        borderRadius: '3rem',
        boxShadow: '0 25px 50px -12px rgba(168, 85, 247, 0.4)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
    },
    phoneNotch: {
        position: 'absolute',
        top: '0px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '35%',
        height: '1.75rem',
        backgroundColor: '#27272a',
        borderRadius: '0 0 1rem 1rem',
        zIndex: 20,
    },
    phoneFeed: {
        position: 'relative',
        width: '100%',
    },
    postCard: {
        width: '100%',
        borderRadius: '1rem',
        backgroundColor: '#111827',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        marginBottom: '1rem',
        border: '1px solid rgba(255, 255, 255, 0.05)',
    },
    postHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0.75rem',
        gap: '0.75rem'
    },
    postAvatar: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: '#374151',
        backgroundSize: 'cover'
    },
    postUsername: {
        fontWeight: '600',
        color: 'white'
    },
    postImage: {
        aspectRatio: '1 / 1',
        width: '100%',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#374151'
    },
    postContent: {
        padding: '0.5rem 1rem 1rem 1rem'
    },
    postActions: {
        display: 'flex',
        gap: '1rem',
        marginBottom: '0.5rem'
    },
    postActionIcon: {
        cursor: 'pointer',
        transition: 'transform 0.2s ease',
        fontSize: '1.5rem'
    },
    postLikes: {
        fontWeight: '600',
        fontSize: '0.875rem',
        color: 'white',
        marginBottom: '0.5rem'
    },
    postDescription: {
        fontSize: '0.875rem',
        color: '#D1D5DB',
        lineHeight: 1.5
    },

    // -- СЕКЦИЯ С ИСТОРИЕЙ AI (AI STORY & CHAT) --
    aiStorySection: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: '4rem 1rem',
        textAlign: 'center',
    },
    aiChatContainer: {
        maxWidth: '48rem',
        backgroundColor: 'rgba(17, 24, 39, 0.5)',
        border: '1px solid rgba(168, 85, 247, 0.5)',
        borderRadius: '1rem',
        padding: '1.5rem',
        backdropFilter: 'blur(10px)',
        minHeight: '300px',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    messageBubble: {
        padding: '0.75rem 1rem',
        borderRadius: '1rem',
        maxWidth: '75%',
        lineHeight: 1.5,
        fontSize: '1rem'
    },
    userMessage: {
        backgroundColor: '#A855F7',
        color: 'white',
        alignSelf: 'flex-end',
        borderBottomRightRadius: '0.25rem'
    },
    aiMessage: {
        backgroundColor: '#374151',
        color: 'white',
        alignSelf: 'flex-start',
        borderBottomLeftRadius: '0.25rem'
    },
    typingIndicatorContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        alignSelf: 'flex-start'
    },
    typingDot: {
        width: '8px',
        height: '8px',
        backgroundColor: '#9CA3AF',
        borderRadius: '50%'
    },

    // -- НОВЫЕ СТИЛИ ДЛЯ ЗВЕЗДЫ И ОБНОВЛЕННЫЕ СТИЛИ --
    featuresSectionWrapper: {
        position: 'relative',
        height: '300vh',
        marginTop: '50px',
    },
    // -- ИЗМЕНЕНО: Добавлены отступы, gap и выравнивание по верху --
    stickyContainer: (isMobile) => ({
        position: 'sticky',
        top: '0', // Прилипает к самому верху
        height: 'calc(100vh - 80px - 1.5rem', // Занимает всю высоту экрана
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start', // Выравниваем контент по верху
        alignItems: 'center',
        padding: isMobile ? '80px 3rem' : '80px 1.5rem', // Отступы сверху/снизу и по бокам для всего блока
        gap: '1.5rem', // Расстояние между заголовками и сеткой фич
    }),
    sectionHeader: {
        textAlign: 'center',
        color: '#FFFFFF',
    },
    // -- ИЗМЕНЕНО: Позиция звезды скорректирована относительно нового родителя --
    shootingStarContainer: {
        position: 'absolute',
        top: '-40px',   // Выносим немного выше блока с текстом
        left: '-30px',  // и левее
        width: '150px',
        height: '80px',
        transform: 'rotate(-25deg)', // Скорректирован угол
        transition: 'transform 0.3s ease-in-out',
        pointerEvents: 'none',
    },
    star: {
        /* ... стили звезды остаются прежними ... */
        position: 'absolute',
        top: '0',
        left: '0',
        width: '12px',
        height: '12px',
        backgroundColor: '#F0E6FF',
        borderRadius: '50%',
        animation: 'flicker 2s infinite ease-in-out',
        transition: 'all 0.3s ease-in-out',
        pointerEvents: 'auto',
        cursor: 'pointer',
    },
    starTrail: {
        /* ... стили хвоста остаются прежними ... */
        position: 'absolute',
        top: '6px',
        left: '6px',
        width: '150px',
        height: '2px',
        background: 'linear-gradient(to right, rgba(168, 85, 247, 0.8), transparent)',
        borderRadius: '50%',
        animation: 'trail-shimmer 2s infinite ease-in-out',
        transition: 'all 0.3s ease-in-out',
        pointerEvents: 'none',
    },
    // -- НОВОЕ: Стили для ховер-эффекта звезды --
    starHover: {
        transform: 'scale(1.3)',
        boxShadow: '0 0 20px #C4B5FD, 0 0 35px #C4B5FD, 0 0 50px #C4B5FD',
    },
    starTrailHover: {
        opacity: '1',
        background: 'linear-gradient(to right, rgba(196, 181, 253, 1), transparent)',
    },
    scrollContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        scrollSnapType: 'y mandatory',
        overflowY: 'auto',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
    },
    'scrollContainer::-webkit-scrollbar': {
        display: 'none',
    },
    scrollSnapSection: {
        height: '100vh',
        scrollSnapAlign: 'start',
    },
    // -- ИЗМЕНЕНО: Добавлены отступы для мобильных и для демо-блока --
    featuresGrid: (isMobile) => ({
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gridTemplateRows: isMobile ? 'auto 1fr' : '1fr',
        gap: '3rem',
        alignItems: 'center',
        width: '100%',
        maxWidth: '72rem',
        flex: 1, // Позволяет сетке занять оставшееся место по высоте
        minHeight: 0, // Важно для корректной работы flex: 1 в некоторых браузерах
    }),
    // -- ИЗМЕНЕНО: Добавлен position: 'relative' для корректного позиционирования звезды --
    featuresDescriptionContainer: (isMobile) => ({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '1.5rem',
        height: isMobile ? '300px' : '100%', // Увеличена высота для лучшего вида
        position: 'relative', // Обязательно для дочерней звезды
    }),
    featuresTextWrapper: {
        transition: 'transform 0.1s linear',
    },
    featureTextItem: (isActive) => ({
        opacity: isActive ? 1 : 0,
        transform: isActive ? 'translateY(0)' : 'translateY(-50px)',
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
    }),
    // -- ИЗМЕНЕНО: Заголовок стал более заметным --
    featureTitle: {
        fontSize: 'clamp(2rem, 4vw, 3rem)', // Увеличен размер
        fontWeight: 800,     // Увеличена жирность
        lineHeight: 1.2,
        // Эффект градиента для текста
        background: 'linear-gradient(90deg, #E2D2FF, #A855F7)',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        backgroundClip: 'text',
        textShadow: '0 0 25px rgba(168, 85, 247, 0.3)', // Легкая тень
        marginBottom: '1.5rem',
    },
    // -- ИЗМЕНЕНО: Описание стало более читабельным --
    featureDescriptionText: {
        fontSize: 'clamp(1rem, 2vw, 1.5rem)',   // Немного увеличен размер
        color: '#E5E7EB',      // Слегка светлее для контраста
        lineHeight: 1.7,       // Увеличен межстрочный интервал
    },
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        gap: '0.75rem',
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
    },
    paginationDot: (isActive) => ({
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        backgroundColor: isActive ? '#A855F7' : '#4B5563',
        transition: 'background-color 0.3s ease',
    }),
    featuresDemoContainer: {
        position: 'relative',
        height: '100%',
        width: '100%',
        minHeight: isMobile => isMobile ? '300px' : '500px', // Увеличена высота демо
    },
    featureDemoItem: (isActive) => ({
        position: 'absolute',
        inset: 0,
        opacity: isActive ? 1 : 0,
        transform: isActive ? 'translateY(0)' : 'translateY(50px)',
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }),
    demoPlaceholder: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(30, 30, 50, 0.5)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.25rem',
        color: '#D1D5DB',
        backdropFilter: 'blur(5px)',
    },


    // -- СЕКЦИЯ УСТАНОВКИ (INSTALLATION GUIDE) --
    installationSection: {
        padding: '4rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    installationLayout: {
        display: 'grid',
        gridTemplateColumns: '1fr 2fr', // Динамически меняется в компоненте
        gap: '3rem',
        width: '100%',
        maxWidth: '64rem',
        alignItems: 'flex-start',
    },
    installationControls: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
    },
    controlGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
    },
    controlLabel: {
        fontWeight: 600,
        color: '#D1D5DB',
        fontSize: '1rem',
    },
    controlButtons: {
        display: 'flex',
        gap: '0.5rem',
        flexWrap: 'wrap',
    },
    controlButton: {
        padding: '0.5rem 1rem',
        borderRadius: '0.5rem',
        border: '1px solid #374151',
        backgroundColor: 'transparent',
        color: '#9CA3AF',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
    },
    activeControlButton: {
        backgroundColor: '#A855F7',
        color: 'white',
        borderColor: '#A855F7',
    },
    instructionBox: {
        backgroundColor: 'rgba(17, 24, 39, 0.7)',
        borderRadius: '1rem',
        padding: '1.5rem',
        border: '1px solid rgba(255, 255, 255, 0.1)',
    },
    instructionList: {
        listStylePosition: 'inside',
        paddingLeft: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        color: '#D1D5DB',
        lineHeight: 1.6,
    },

    // -- СЕКЦИЯ НОВОСТЕЙ (NEWS SECTION) --
    newsSection: {
        padding: '4rem 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        overflow: 'hidden',
    },
    newsSliderContainer: {
        display: 'flex',
        width: 'max-content', // Изменено для корректной работы
        cursor: 'grab',
    },
    newsCard: {
        flex: '0 0 clamp(280px, 80vw, 350px)',
        margin: '0 1rem',
        backgroundColor: '#111827',
        borderRadius: '1rem',
        overflow: 'hidden',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        flexDirection: 'column',
    },
    newsImage: {
        aspectRatio: '16 / 9',
        width: '100%',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    newsContent: {
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
    },
    newsDate: {
        color: '#9CA3AF',
        fontSize: '0.75rem',
        marginBottom: '0.5rem',
    },
    newsTitle: {
        color: 'white',
        fontWeight: 600,
        fontSize: '1.125rem',
        marginBottom: 'auto',
    },
    newsReadMore: {
        marginTop: '1rem',
        color: '#C084FC',
        textDecoration: 'none',
        fontWeight: 600,
        alignSelf: 'flex-start',
    },

    // -- ФУТЕР (FOOTER) --
    footer: {
        backgroundColor: 'rgba(17, 24, 39, 0.5)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        color: '#9CA3AF',
        padding: '3rem 1rem',
        position: 'relative',
        zIndex: 30,
        marginTop: '20px',
    },
    footerGrid: {
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'grid',
        gap: '2rem',
        // gridTemplateColumns динамически задается в компоненте
    },
    footerColumn: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
    },
    footerLink: {
        color: 'inherit',
        textDecoration: 'none',
        transition: 'color 0.2s'
    },
    footerBottom: {
        maxWidth: '1280px',
        margin: '2rem auto 0',
        paddingTop: '2rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '0.875rem',
        // flexDirection и gap динамически задаются в компоненте
    },
};

export default styles;