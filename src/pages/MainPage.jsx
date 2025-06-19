import React, { useState, useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from 'framer-motion';

// --- Стили в виде CSS-in-JS объектов ---
// Здесь собраны все стили для компонентов страницы.
const styles = {
    appContainer: {
        backgroundColor: '#000',
        color: '#fff',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
    header: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 50,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
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
    },
    nav: {
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
    heroSection: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '1rem',
        position: 'relative', // Для z-index
        zIndex: 10,
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
    heroTitle: {
        fontSize: '3.75rem',
        fontWeight: 800,
        marginBottom: '1rem',
        background: 'linear-gradient(to right, #FB923C, #C084FC)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    },
    heroSubtitle: {
        marginBottom: '2rem',
        fontSize: '1.125rem',
        color: '#9CA3AF',
        maxWidth: '42rem',
    },
    emailForm: {
        width: '100%',
        maxWidth: '28rem',
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
    // --- ИЗМЕНЕННЫЕ СТИЛИ СЕКЦИИ С ТЕЛЕФОНОМ ---
    contentWrapper: {
        position: 'relative',
        zIndex: 10,
        backgroundColor: '#000', // Чтобы контент не был прозрачным
        paddingTop: '5vh', // Отступ сверху, чтобы не налезать на hero
    },
    phoneSectionContainer: {
        position: 'relative',
        height: '220vh', // Оптимальная высота для 4 постов
        width: '100%',
    },
    phoneStickyContainer: {
        position: 'sticky',
        top: '15%',
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
    // --- Стили постов (без изменений) ---
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
        gap: '0.75rem',
    },
    postAvatar: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: '#374151',
        backgroundSize: 'cover',
    },
    postUsername: {
        fontWeight: '600',
        color: 'white',
    },
    postImage: {
        aspectRatio: '1 / 1',
        width: '100%',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#374151',
    },
    postContent: {
        padding: '0.5rem 1rem 1rem 1rem',
    },
    postActions: {
        display: 'flex',
        gap: '1rem',
        marginBottom: '0.5rem',
    },
    postActionIcon: {
        cursor: 'pointer',
        transition: 'transform 0.2s ease',
        fontSize: '1.5rem',
    },
    postLikes: {
        fontWeight: '600',
        fontSize: '0.875rem',
        color: 'white',
        marginBottom: '0.5rem',
    },
    postDescription: {
        fontSize: '0.875rem',
        color: '#D1D5DB',
        lineHeight: 1.5,
    },
    // --- Остальные стили ---
    aiStorySection: {
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 10,
    },
    footer: {
        backgroundColor: 'rgba(17, 24, 39, 0.5)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        color: '#9CA3AF',
        padding: '3rem 1rem',
        position: 'relative',
        zIndex: 30,
    },
    footerGrid: {
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'grid',
        gap: '2rem',
    },
    footerColumn: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    },
    footerLink: {
        color: 'inherit',
        textDecoration: 'none',
        transition: 'color 0.2s',
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
    },

    // --- НОВЫЕ СТИЛИ ДЛЯ СЕКЦИИ С AI-ЧАТОМ ---
    aiStorySection: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 10,
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
        fontSize: '1rem',
    },
    userMessage: {
        backgroundColor: '#A855F7',
        color: 'white',
        alignSelf: 'flex-end',
        borderBottomRightRadius: '0.25rem',
    },
    aiMessage: {
        backgroundColor: '#374151',
        color: 'white',
        alignSelf: 'flex-start',
        borderBottomLeftRadius: '0.25rem',
    },
    typingIndicatorContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        alignSelf: 'flex-start',
    },
    typingDot: {
        width: '8px',
        height: '8px',
        backgroundColor: '#9CA3AF',
        borderRadius: '50%',
    },
};

// --- Иконки (без изменений) ---
const ChevronDown = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"></path></svg>;
const GithubIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg> );
const TelegramIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7.89 12.56L2 9l20-7Z"/><path d="m22 2-15 12 4 10 4-10-3-7 6-2Z"/></svg> );
const TwitterIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 1.4 3.3 4.4 3.3 4.4s-1.4 1.4-3.3 1.4c-1.8 0-3.3-1.4-3.3-1.4s-1.4 2.8-4.7 2.8c-2.2 0-4.7-1.4-4.7-1.4s-1.4-1.4-1.4-2.8c0-1.4 1.4-2.8 1.4-2.8s2.1-.7 3.3 0c1.2.7 2.1 2.1 2.1 2.1s.7-2.1 2.8-2.8c2.1-.7 3.3-1.4 3.3-1.4s1.4-1.4 1.4-2.8c0-1.4-1.4-2.8-1.4-2.8s-2.1.7-2.8 1.4c-.7.7-1.4 2.1-1.4 2.1s-2.1-2.1-2.8-2.8c-.7-.7-2.1-1.4-2.8-1.4c-1.4 0-2.8 1.4-2.8 1.4s-1.4 1.4-1.4 2.8c0 1.4 1.4 2.8 1.4 2.8s1.4.7 2.8 0c1.4-.7 2.1-2.1 2.1-2.1s.7 1.4 2.1 2.1c1.4.7 2.8 1.4 4.7 1.4 2.2 0 4.7-1.4 4.7-1.4s1.4-1.4 1.4-2.8c0-1.4-1.4-2.8-2.8-2.8s-2.8 1.4-3.3 2.1c-.5.7-1.4 2.1-1.4 2.1s-1.4-2.1-2.8-2.8c-1.4-.7-2.8-1.4-4.7-1.4c-2.2 0-4.7 1.4-4.7 1.4s-1.4 1.4-1.4 2.8c0 1.4 1.4 2.8 1.4 2.8s1.4.7 2.8 0c1.4-.7 2.1-2.1 2.1-2.1Z"/></svg>);

// --- КОМПОНЕНТЫ ---

const ParticlesBackground = React.memo(() => {
    // Код этого компонента остается без изменений
    const mountRef = useRef(null);
    useEffect(() => {
        const currentMount = mountRef.current;
        if (!currentMount) return;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
        camera.position.z = 50;
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        currentMount.appendChild(renderer.domElement);
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 5000;
        const positions = [];
        for (let i = 0; i < particlesCount; i++) {
            const phi = Math.acos(-1 + (2 * i) / particlesCount);
            const theta = Math.sqrt(particlesCount * Math.PI) * phi;
            const x = 100 * Math.cos(theta) * Math.sin(phi);
            const y = 100 * Math.sin(theta) * Math.sin(phi);
            const z = 100 * Math.cos(phi);
            positions.push(x, y, z);
        }
        particlesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        const particlesMaterial = new THREE.PointsMaterial({ size: 0.5, vertexColors: true, blending: THREE.AdditiveBlending, transparent: true });
        const colors = [];
        const color1 = new THREE.Color("#ff8c00");
        const color2 = new THREE.Color("#9400d3");
        const vertices = particlesGeometry.attributes.position.array;
        for (let i = 0; i < vertices.length; i += 3) {
             const t = (vertices[i+1] / 100 + 1) / 2;
             const mixedColor = color1.clone().lerp(color2, t);
             colors.push(mixedColor.r, mixedColor.g, mixedColor.b);
        }
        particlesGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particleSystem);
        const clock = new THREE.Clock();
        const animate = () => {
            requestAnimationFrame(animate);
            particleSystem.rotation.y = clock.getElapsedTime() * 0.05;
            particleSystem.rotation.x = clock.getElapsedTime() * 0.02;
            renderer.render(scene, camera);
        };
        animate();
        const onResize = () => {
            camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        };
        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('resize', onResize);
            if (currentMount && renderer.domElement) { currentMount.removeChild(renderer.domElement); }
        };
    }, []);
    return <div ref={mountRef} style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1}} />;
});

const Header = React.memo(() => {
    // Код этого компонента остается без изменений
    const [isOpen, setIsOpen] = useState(false);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

    useEffect(() => {
        const handleResize = () => setIsDesktop(window.innerWidth > 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <header style={styles.header}>
            <div style={styles.headerContent}>
                <div style={styles.logo}>sYnask</div>
                {isDesktop && (
                    <nav style={{ ...styles.nav, display: 'flex' }}>
                        <div onMouseLeave={() => setIsOpen(false)} style={{position: 'relative'}}>
                            <button onMouseEnter={() => setIsOpen(true)} style={styles.navLink}>О нас <ChevronDown /></button>
                            <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                                    style={{position: 'absolute', top: '100%', marginTop: '0.5rem', width: '12rem', backgroundColor: 'rgba(17, 24, 39, 0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', padding: '0.5rem'}}
                                >
                                    <a href="#" style={styles.navLink}>Наша Команда</a>
                                    <a href="#" style={styles.navLink}>Карьера</a>
                                </motion.div>
                            )}
                            </AnimatePresence>
                        </div>
                        <a href="#" style={styles.navLink}>Фичи</a>
                    </nav>
                )}
                <button style={styles.navButton}>Начать</button>
            </div>
        </header>
    );
});

const PhoneFeedSection = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
      target: targetRef,
      offset: ["start start", "end end"],
    });
 
    const posts = useMemo(() => [
        { id: 1, username: 'neural_artist', avatar: 'https://placehold.co/40x40/A855F7/FFFFFF?text=NA', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop', likes: 256, description: 'Сгенерировал новый арт с помощью нашего AI. Как вам?', },
        { id: 2, username: 'travel_lover', avatar: 'https://placehold.co/40x40/F97316/FFFFFF?text=TL', image: 'https://images.unsplash.com/photo-1509343256512-d77a5cb3791b?q=80&w=2070&auto=format&fit=crop', likes: 482, description: 'Настроил ленту только на позитивные эмоции. Мир прекрасен!', },
        { id: 3, username: 'sec_guru', avatar: 'https://placehold.co/40x40/3B82F6/FFFFFF?text=SG', image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070&auto=format&fit=crop', likes: 1024, description: 'Безопасность превыше всего. Рад, что здесь используется сквозное шифрование.', },
        { id: 4, username: 'code_wizard', avatar: 'https://placehold.co/40x40/10B981/FFFFFF?text=CW', image: 'https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=2070&auto=format&fit=crop', likes: 512, description: 'Делюсь своим сетапом для работы. Минимализм и продуктивность.', },
    ], []);
 
    const feedY = useTransform(scrollYProgress, [0, 1], ['2%', '-72%']);

    const Post = ({ post }) => {
        const [liked, setLiked] = useState(false);
        return (
            <div style={styles.postCard}>
                <div style={styles.postHeader}>
                    <div style={{ ...styles.postAvatar, backgroundImage: `url(${post.avatar})` }}></div>
                    <span style={styles.postUsername}>{post.username}</span>
                </div>
                <div style={{ ...styles.postImage, backgroundImage: `url(${post.image})` }}></div>
                <div style={styles.postContent}>
                    <div style={styles.postActions}>
                        <motion.span style={styles.postActionIcon} whileTap={{ scale: 0.8 }} onClick={() => setLiked(!liked)}>
                            {liked ? '❤️' : '🤍'}
                        </motion.span>
                        <motion.span style={styles.postActionIcon} whileTap={{ scale: 0.8 }}>💬</motion.span>
                        <motion.span style={styles.postActionIcon} whileTap={{ scale: 0.8 }}>✈️</motion.span>
                    </div>
                    <div style={styles.postLikes}>{liked ? post.likes + 1 : post.likes} отметок "Нравится"</div>
                    <p style={styles.postDescription}>
                        <strong style={{color: 'white'}}>{post.username}</strong> {post.description}
                    </p>
                </div>
            </div>
        );
    };

    return (
        <section ref={targetRef} style={styles.phoneSectionContainer}>
            <div style={styles.phoneStickyContainer}>
                <div style={styles.phoneBody}>
                    <div style={styles.phoneNotch}></div>
                    <motion.div style={{...styles.phoneFeed, y: feedY}}>
                        {posts.map((post) => <Post key={post.id} post={post} />)}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
   
const AiStorySection = React.memo(() => {
    const [messages, setMessages] = React.useState([]);

    React.useEffect(() => {
        const chatFlow = [
            () => setMessages([{ type: 'user', text: 'Расскажи о себе' }]),
            () => setMessages(prev => [...prev, { type: 'typing' }]),
            () => setMessages(prev => [
                ...prev.filter(m => m.type !== 'typing'),
                { type: 'ai', text: 'Я — sYnask AI, нейросеть, обученная на огромных массивах данных из сети. Я знаю практически все и могу помочь вам найти любую информацию, сгенерировать контент или просто пообщаться. Спрашивайте!' }
            ])
        ];
        
        // Запускаем сценарий чата с задержками
        const timer1 = setTimeout(chatFlow[0], 500);
        const timer2 = setTimeout(chatFlow[1], 1800);
        const timer3 = setTimeout(chatFlow[2], 4000);

        return () => {
          clearTimeout(timer1);
          clearTimeout(timer2);
          clearTimeout(timer3);
        }
    }, []);

    const TypingIndicator = () => (
        <motion.div
            style={styles.typingIndicatorContainer}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <motion.span style={styles.typingDot} animate={{ y: [0, -4, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0 }}/>
            <motion.span style={styles.typingDot} animate={{ y: [0, -4, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}/>
            <motion.span style={styles.typingDot} animate={{ y: [0, -4, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}/>
        </motion.div>
    );

    return (
        <section style={styles.aiStorySection}>
            <motion.h2 style={styles.heroTitle} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }}>
                Наш AI всегда на связи
            </motion.h2>
            <motion.p style={{...styles.heroSubtitle, marginBottom: '3rem'}} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5, delay: 0.2 }}>
                Он — ядро платформы, которое обучается вместе с вами, возрождая актуальность и предлагая то, что нужно именно вам.
            </motion.p>
            <motion.div style={styles.aiChatContainer} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.3 }}>
                 <AnimatePresence>
                    {messages.map((msg, index) => {
                        if (msg.type === 'typing') {
                            return <TypingIndicator key="typing" />;
                        }
                        return (
                            <motion.div
                                key={index}
                                style={ msg.type === 'user' ? {...styles.messageBubble, ...styles.userMessage} : {...styles.messageBubble, ...styles.aiMessage} }
                                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0 }}
                                layout
                            >
                                {msg.text}
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </motion.div>
        </section>
    );
});

const Footer = React.memo(() => {
    // Код этого компонента остается без изменений
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

    useEffect(() => {
        const handleResize = () => setIsDesktop(window.innerWidth > 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const footerGridStyle = {
        ...styles.footerGrid,
        gridTemplateColumns: isDesktop ? 'repeat(4, 1fr)' : 'repeat(2, 1fr)',
    };
    
    const footerBottomStyle = {
        ...styles.footerBottom,
        flexDirection: isDesktop ? 'row' : 'column',
    }

    return (
        <footer style={styles.footer}>
            <div style={footerGridStyle}>
                <div><h3 style={{fontWeight: 'bold', fontSize: '1.25rem', color: 'white', marginBottom: '1rem'}}>sYnask</h3><p style={{fontSize: '0.875rem'}}>Будущее социальных сетей.</p></div>
                <div style={styles.footerColumn}><h4 style={{fontWeight: 600, color: 'white', marginBottom: '1rem'}}>Навигация</h4><a href="#" style={styles.footerLink}>Главная</a><a href="#" style={styles.footerLink}>О нас</a></div>
                <div style={styles.footerColumn}><h4 style={{fontWeight: 600, color: 'white', marginBottom: '1rem'}}>Ресурсы</h4><a href="#" style={styles.footerLink}>Документация</a><a href="#" style={styles.footerLink}>Поддержка</a></div>
                <div><h4 style={{fontWeight: 600, color: 'white', marginBottom: '1rem'}}>Присоединяйтесь</h4><div style={{display: 'flex', gap: '1rem'}}><a href="#" style={styles.footerLink}><GithubIcon /></a><a href="#" style={styles.footerLink}><TelegramIcon /></a><a href="#" style={styles.footerLink}><TwitterIcon /></a></div></div>
            </div>
            <div style={footerBottomStyle}>
                <p>&copy; {new Date().getFullYear()} sYnask. Все права защищены.</p>
                <div style={{display: 'flex', gap: '1rem', marginTop: isDesktop ? 0 : '1rem'}}><a href="#" style={styles.footerLink}>Политика конфиденциальности</a><a href="#" style={styles.footerLink}>Условия использования</a></div>
            </div>
        </footer>
    );
});


// ОСНОВНОЙ КОМПОНЕНТ СТРАНИЦЫ
export default function App() {
    const [email, setEmail] = useState('');

    const badgeStatusStyle = {...styles.badge, backgroundColor: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)', color: '#4ADE80'};
    const badgeVersionStyle = {...styles.badge, backgroundColor: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.3)', color: '#C084FC'};
    const badgeUsersStyle = {...styles.badge, backgroundColor: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', color: '#93C5FD'};

    return (
        <div style={styles.appContainer}>
            <ParticlesBackground />
            <Header />
            <main>
                <section style={styles.heroSection}>
                    <motion.div 
                        style={styles.badgesContainer}
                        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }}
                    >
                         <div style={badgeStatusStyle}>Статус: Online</div>
                         <div style={badgeVersionStyle}>Версия: 0.6.0-final</div>
                         <div style={badgeUsersStyle}>Пользователей: 3,102</div>
                    </motion.div>

                    <motion.h1 style={styles.heroTitle} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                        Войдите в будущее
                    </motion.h1>
                    <motion.p style={styles.heroSubtitle} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
                        Алгоритмы — под контролем. Ты — в фокусе.
                    </motion.p>
                    <motion.form
                        style={styles.emailForm}
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <div style={styles.emailInputContainer}>
                            <input 
                                style={styles.emailInput}
                                type="email" 
                                placeholder="your.email@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button style={styles.navButton} type="submit">
                                Продолжить
                            </button>
                        </div>
                    </motion.form>
                </section>
                
                {/* Новая обертка для контента после hero-секции */}
                <div style={styles.contentWrapper}>
                    <PhoneFeedSection />
                    <AiStorySection />
                </div>
            </main>
            <Footer />
        </div>
    );
}
