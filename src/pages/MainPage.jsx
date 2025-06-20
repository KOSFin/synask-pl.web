import React, { useState, useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from 'framer-motion';

// --- Иконки ---
const ChevronDown = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"></path></svg>;
const GithubIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg> );
const TelegramIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7.89 12.56L2 9l20-7Z"/><path d="m22 2-15 12 4 10 4-10-3-7 6-2Z"/></svg> );
const TwitterIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 1.4 3.3 4.4 3.3 4.4s-1.4 1.4-3.3 1.4c-1.8 0-3.3-1.4-3.3-1.4s-1.4 2.8-4.7 2.8c-2.2 0-4.7-1.4-4.7-1.4s-1.4-1.4-1.4-2.8c0-1.4 1.4-2.8 1.4-2.8s2.1-.7 3.3 0c1.2.7 2.1 2.1 2.1 2.1s.7-2.1 2.8-2.8c2.1-.7 3.3-1.4 3.3-1.4s1.4-1.4 1.4-2.8c0-1.4-1.4-2.8-1.4-2.8s-2.1.7-2.8 1.4c-.7.7-1.4 2.1-1.4 2.1s-2.1-2.1-2.8-2.8c-.7-.7-2.1-1.4-2.8-1.4c-1.4 0-2.8 1.4-2.8 1.4s-1.4 1.4-1.4 2.8c0 1.4 1.4 2.8 1.4 2.8s1.4.7 2.8 0c1.4-.7 2.1-2.1 2.1-2.1s.7 1.4 2.1 2.1c1.4.7 2.8 1.4 4.7 1.4 2.2 0 4.7-1.4 4.7-1.4s1.4-1.4 1.4-2.8c0-1.4-1.4-2.8-2.8-2.8s-2.8 1.4-3.3 2.1c-.5.7-1.4 2.1-1.4 2.1s-1.4-2.1-2.8-2.8c-1.4-.7-2.8-1.4-4.7-1.4c-2.2 0-4.7 1.4-4.7 1.4s-1.4 1.4-1.4 2.8c0 1.4 1.4 2.8 1.4 2.8s1.4.7 2.8 0c1.4-.7 2.1-2.1 2.1-2.1s.7 1.4 2.1 2.1c1.4.7 2.8 1.4 4.7 1.4 2.2 0 4.7-1.4 4.7-1.4s1.4-1.4 1.4-2.8c0-1.4-1.4-2.8-2.8-2.8s-2.8 1.4-3.3 2.1c-.5.7-1.4 2.1-1.4 2.1s-1.4-2.1-2.8-2.8c-1.4-.7-2.8-1.4-4.7-1.4c-2.2 0-4.7 1.4-4.7 1.4s-1.4 1.4-1.4 2.8c0 1.4 1.4 2.8 1.4 2.8s1.4.7 2.8 0c1.4-.7 2.1-2.1 2.1-2.1s.7 1.4 2.1 2.1c1.4.7 2.8 1.4 4.7 1.4 2.2 0 4.7-1.4 4.7-1.4s1.4-1.4 1.4-2.8c0-1.4-1.4-2.8-2.8-2.8s-2.8 1.4-3.3 2.1c-.5.7-1.4 2.1-1.4 2.1s-1.4-2.1-2.8-2.8c-1.4-.7-2.8-1.4-4.7-1.4c-2.2 0-4.7 1.4-4.7 1.4s-1.4 1.4-1.4 2.8c0 1.4 1.4 2.8 1.4 2.8s1.4.7 2.8 0c1.4-.7 2.1-2.1 2.1-2.1Z"/></svg>);
const SmartphoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>;
const ComputerIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>;
// Новая иконка для логотипа
const SynaskIcon = () => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 2.33331C16.928 2.33331 19.5543 3.69343 21.4087 5.91891C23.263 8.14439 24.1667 11.0188 24.0134 13.9167C23.8601 16.8145 22.6611 19.5259 20.6667 21.4937C18.6723 23.4616 15.999 24.5 13.1667 24.5C10.2387 24.5 7.61239 23.14" stroke="url(#paint0_linear_icon)" strokeWidth="3" strokeLinecap="round"/>
        <path d="M14 25.6667C11.072 25.6667 8.44569 24.3066 6.59133 22.0811C4.73696 19.8556 3.83333 16.9812 3.98664 14.0833C4.13994 11.1855 5.33886 8.47413 7.33333 6.50628C9.3278 4.53844 12.001 3.5 14.8333 3.5C17.7613 3.5 20.3876 4.86012 22.242 7.0856" stroke="url(#paint1_linear_icon)" strokeWidth="3" strokeLinecap="round"/>
        <defs>
            <linearGradient id="paint0_linear_icon" x1="13.1667" y1="2.33331" x2="13.1667" y2="24.5" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F97316"/>
                <stop offset="1" stopColor="#A855F7"/>
            </linearGradient>
            <linearGradient id="paint1_linear_icon" x1="14.8333" y1="3.5" x2="14.8333" y2="25.6667" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F97316"/>
                <stop offset="1" stopColor="#C084FC"/>
            </linearGradient>
        </defs>
    </svg>
);


// --- Стили ---
const styles = {
    appContainer: {
        backgroundColor: '#000',
        color: '#fff',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
    header: { // Базовые стили хедера, остальное управляется анимацией
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 50,
        transition: 'background-color 0.3s ease, border-color 0.3s ease', // Для плавности
    },
    headerContent: {
        maxWidth: '1280px', margin: '0 auto', padding: '0 1rem', display: 'flex',
        alignItems: 'center', justifyContent: 'space-between', height: '5rem',
    },
    logo: {
        flexShrink: 0, fontWeight: 'bold', fontSize: '1.875rem', letterSpacing: '0.05em',
        display: 'flex', alignItems: 'center', gap: '0.75rem', // Flex для иконки и текста
    },
    nav: { alignItems: 'center', gap: '1rem' },
    navLink: {
        color: '#D1D5DB', transition: 'color 0.2s', padding: '0.5rem 0.75rem', borderRadius: '0.375rem',
        textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: '0.25rem',
    },
    navButton: {
        background: 'linear-gradient(to right, #F97316, #A855F7)', color: 'white', fontWeight: 'bold',
        padding: '0.5rem 1.25rem', borderRadius: '0.5rem', transition: 'all 0.3s',
        border: 'none', cursor: 'pointer', boxShadow: '0 4px 15px rgba(168, 85, 247, 0.2)',
    },
    heroSection: {
        height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', textAlign: 'center', padding: '1rem',
        position: 'sticky', // Делаем секцию "липкой"
        top: 0,
        zIndex: 10,
    },
    heroContentWrapper: { // Обертка для элементов, которые будут анимироваться
        display: 'flex', flexDirection: 'column', alignItems: 'center',
    },
    badgesContainer: {
        display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem', marginBottom: '2rem',
    },
    badge: {
        fontSize: '0.75rem', fontWeight: 600, padding: '0.25rem 0.75rem', borderRadius: '9999px',
    },
    heroTitle: {
        fontSize: 'clamp(2.5rem, 5vw + 1rem, 3.75rem)', fontWeight: 800, marginBottom: '1rem',
        background: 'linear-gradient(to right, #FB923C, #C084FC)', WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    },
    sectionTitle: { // Общий стиль для заголовков секций
        fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: '1rem',
        background: 'linear-gradient(to right, #FB923C, #C084FC)', WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent', textAlign: 'center',
    },
    sectionSubtitle: { // Общий стиль для подзаголовков
        marginBottom: '3rem', fontSize: '1.125rem', color: '#9CA3AF',
        maxWidth: '48rem', textAlign: 'center', margin: '0 auto 3rem auto',
    },
    heroSubtitle: {
        marginBottom: '2rem', fontSize: '1.125rem', color: '#9CA3AF', maxWidth: '42rem',
    },
    emailForm: { width: '100%', maxWidth: '28rem' },
    emailInputContainer: {
        display: 'flex', alignItems: 'center', backgroundColor: 'rgba(17, 24, 39, 0.5)',
        border: '1px solid rgba(168, 85, 247, 0.5)', borderRadius: '0.5rem',
        padding: '0.5rem', backdropFilter: 'blur(4px)',
    },
    emailInput: {
        appearance: 'none', backgroundColor: 'transparent', border: 'none',
        width: '100%', color: 'white', marginRight: '0.75rem', padding: '0.5rem',
        lineHeight: '1.5',
    },
    pageContent: { // Новый стиль для контента, который "наезжает"
        position: 'relative',
        zIndex: 30, // Выше чем heroSection, но ниже хедера
    },
    glassPane: {
        position: 'relative',
        zIndex: 10,
        WebkitBackdropFilter: 'blur(20px) saturate(180%)', // для Safari
        backgroundColor: 'rgba(25, 22, 47, 0.94)',
        backdropFilter: 'blur(12px) saturate(150%)',
        border: '1px solid rgba(187, 0, 255, 0.37)',
        borderRadius: '1.5rem',
        padding: '2rem',
        margin: '0 auto',
        maxWidth: '1280px',
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
    },
    phoneSectionContainer: {
        position: 'relative', height: '220vh', width: '100%',
    },
    phoneStickyContainer: {
        position: 'sticky', top: '13%', marginTop: '20px', height: '85vh', display: 'flex',
        justifyContent: 'center', alignItems: 'center',
    },
    phoneBody: {
        position: 'relative', width: 'clamp(300px, 22vw, 400px)', height: '100%',
        backgroundColor: '#000', border: '10px solid #27272a',
        borderRadius: '3rem', boxShadow: '0 25px 50px -12px rgba(168, 85, 247, 0.4)',
        overflow: 'hidden', display: 'flex', flexDirection: 'column',
    },
    phoneNotch: {
        position: 'absolute', top: '0px', left: '50%', transform: 'translateX(-50%)',
        width: '35%', height: '1.75rem', backgroundColor: '#27272a',
        borderRadius: '0 0 1rem 1rem', zIndex: 20,
    },
    phoneFeed: { position: 'relative', width: '100%' },
    postCard: {
        width: '100%', borderRadius: '1rem', backgroundColor: '#111827',
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
        marginBottom: '1rem', border: '1px solid rgba(255, 255, 255, 0.05)',
    },
    postHeader: { display: 'flex', alignItems: 'center', padding: '0.75rem', gap: '0.75rem' },
    postAvatar: { width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#374151', backgroundSize: 'cover' },
    postUsername: { fontWeight: '600', color: 'white' },
    postImage: { aspectRatio: '1 / 1', width: '100%', backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#374151' },
    postContent: { padding: '0.5rem 1rem 1rem 1rem' },
    postActions: { display: 'flex', gap: '1rem', marginBottom: '0.5rem' },
    postActionIcon: { cursor: 'pointer', transition: 'transform 0.2s ease', fontSize: '1.5rem' },
    postLikes: { fontWeight: '600', fontSize: '0.875rem', color: 'white', marginBottom: '0.5rem' },
    postDescription: { fontSize: '0.875rem', color: '#D1D5DB', lineHeight: 1.5 },
    aiStorySection: {
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', position: 'relative',
        padding: '4rem 1rem', textAlign: 'center',
    },
    aiChatContainer: {
        maxWidth: '48rem', backgroundColor: 'rgba(17, 24, 39, 0.5)',
        border: '1px solid rgba(168, 85, 247, 0.5)', borderRadius: '1rem',
        padding: '1.5rem', backdropFilter: 'blur(10px)', minHeight: '300px',
        display: 'flex', flexDirection: 'column', gap: '1rem',
    },
    messageBubble: { padding: '0.75rem 1rem', borderRadius: '1rem', maxWidth: '75%', lineHeight: 1.5, fontSize: '1rem' },
    userMessage: { backgroundColor: '#A855F7', color: 'white', alignSelf: 'flex-end', borderBottomRightRadius: '0.25rem' },
    aiMessage: { backgroundColor: '#374151', color: 'white', alignSelf: 'flex-start', borderBottomLeftRadius: '0.25rem' },
    typingIndicatorContainer: { display: 'flex', alignItems: 'center', gap: '0.5rem', alignSelf: 'flex-start' },
    typingDot: { width: '8px', height: '8px', backgroundColor: '#9CA3AF', borderRadius: '50%' },
    footer: {
        backgroundColor: 'rgba(17, 24, 39, 0.5)', borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        color: '#9CA3AF', padding: '3rem 1rem', position: 'relative', zIndex: 30, marginTop: '20px',
    },
    footerGrid: { maxWidth: '1280px', margin: '0 auto', display: 'grid', gap: '2rem' },
    footerColumn: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
    footerLink: { color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' },
    footerBottom: {
        maxWidth: '1280px', margin: '2rem auto 0', paddingTop: '2rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex',
        justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem',
    },
    installationSection: {
        padding: '4rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    installationLayout: {
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
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
    activeControlButton: { // Стиль для активной кнопки
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
        width: '100%',
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
    featuresSection: {
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center',
    },
    featuresDescription: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    accordionItem: {
        border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '0.75rem',
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    accordionHeader: {
        padding: '1rem 1.5rem', cursor: 'pointer', display: 'flex',
        justifyContent: 'space-between', alignItems: 'center',
        fontWeight: 600, fontSize: '1.125rem', color: 'white',
    },
    accordionContent: { overflow: 'hidden' },
    accordionText: {
        padding: '0 1.5rem 1.5rem 1.5rem', color: '#D1D5DB', lineHeight: 1.6
    },
};

// --- МАССИВЫ ДЛЯ ИСТОРИИ И ДИАГРАММЫ ---
const historyData = [
    { year: 2022, month: 'Март', event: 'Идея создания sYnask' },
    { year: 2022, month: 'Июль', event: 'Начало разработки прототипа' },
    { year: 2023, month: 'Январь', event: 'Первые тесты AI' },
    { year: 2023, month: 'Октябрь', event: 'Запуск закрытой беты' },
    { year: 2024, month: 'Май', event: 'Публичный релиз' },
    { year: 2025, month: 'Июнь', event: 'AI-помощник и новые фичи' },
];
const timelinePoints = [
    { year: 2022, month: 'Март', label: 'Идея', color: '#F97316' },
    { year: 2022, month: 'Июль', label: 'Прототип', color: '#A855F7' },
    { year: 2023, month: 'Январь', label: 'AI', color: '#F97316' },
    { year: 2023, month: 'Октябрь', label: 'Бета', color: '#A855F7' },
    { year: 2024, month: 'Май', label: 'Релиз', color: '#F97316' },
    { year: 2025, month: 'Июнь', label: 'AI+', color: '#A855F7' },
];

// --- КОМПОНЕНТЫ ---

const ParticlesBackground = React.memo(() => {
    const mountRef = useRef(null);
    const mousePos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const currentMount = mountRef.current;
        if (!currentMount) return;

        // --- Scene Setup ---
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1500);
        camera.position.z = 1;
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        currentMount.appendChild(renderer.domElement);

        // --- Star Shader ---
        const createStarTexture = () => {
            const canvas = document.createElement('canvas');
            canvas.width = 64; canvas.height = 64;
            const context = canvas.getContext('2d');
            const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
            gradient.addColorStop(0, 'rgba(255,255,255,1)');
            gradient.addColorStop(0.2, 'rgba(255,255,255,0.8)');
            gradient.addColorStop(0.5, 'rgba(200,200,255,0.4)');
            gradient.addColorStop(1, 'rgba(255,255,255,0)');
            context.fillStyle = gradient;
            context.fillRect(0, 0, 64, 64);
            return new THREE.CanvasTexture(canvas);
        };
        
        const starTexture = createStarTexture();

        const starShaderMaterial = new THREE.ShaderMaterial({
            uniforms: { pointTexture: { value: starTexture } },
            vertexShader: `
                attribute float size;
                attribute vec3 color;
                varying vec3 vColor;
                void main() {
                    vColor = color;
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    gl_PointSize = size * (300.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                uniform sampler2D pointTexture;
                varying vec3 vColor;
                void main() {
                    gl_FragColor = vec4(vColor, 1.0) * texture2D(pointTexture, gl_PointCoord);
                }
            `,
            blending: THREE.AdditiveBlending,
            depthTest: false,
            transparent: true,
        });

        // --- Create Star Layers ---
        const createStars = (count, radiusMin, radiusMax, sizeMin, sizeMax) => {
            const vertices = [], sizes = [], colors = [];
            const color1 = new THREE.Color("#ff8c00"), color2 = new THREE.Color("#c084fc");
            for (let i = 0; i < count; i++) {
                const vec = new THREE.Vector3().setFromSphericalCoords(
                    THREE.MathUtils.randFloat(radiusMin, radiusMax),
                    Math.acos(2 * Math.random() - 1),
                    Math.random() * 2 * Math.PI
                );
                vertices.push(vec.x, vec.y, vec.z);
                sizes.push(THREE.MathUtils.randFloat(sizeMin, sizeMax));
                const randomColor = Math.random() < 0.5 ? color1 : color2;
                const finalColor = randomColor.clone().multiplyScalar(THREE.MathUtils.randFloat(0.7, 1.3));
                colors.push(finalColor.r, finalColor.g, finalColor.b);
            }
            const geometry = new THREE.BufferGeometry();
            geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
            geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));
            geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
            return new THREE.Points(geometry, starShaderMaterial);
        };
        
        // --- Create Constellations ---
        const createConstellationGroup = () => {
            const group = new THREE.Group();
            const baseConstellations = [
                [[0,10,0],[15,12,-10],[25,18,-20],[30,15,-30],[45,18,-40],[55,15,-50],[60,5,-60]],
                [[-40,-10,0],[-35,0,-10],[-30,10,-20],[-50,0,-15],[-20,0,-5],[-55,-20,-25],[-15,-20,-30]],
                [[20,-40,0],[30,-30,-10],[25,-20,-20],[15,-25,-30],[10,-35,-40]]
            ];
            const constColor = new THREE.Color("#FB923C");
            const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.25 });
            const allPointsVertices = [], allPointsSizes = [], allPointsColors = [];

            for (let i = 0; i < 20; i++) {
                const pattern = baseConstellations[i % baseConstellations.length];
                const points = pattern.map(p => new THREE.Vector3(...p));
                const subGroup = new THREE.Group();
                subGroup.position.setFromSphericalCoords(
                    THREE.MathUtils.randFloat(200, 350), Math.acos(2*Math.random()-1), Math.random()*2*Math.PI
                );
                subGroup.quaternion.random();
                subGroup.updateMatrix();
                const transformedPoints = points.map(p => p.clone().applyMatrix4(subGroup.matrix));
                transformedPoints.forEach(p => {
                    allPointsVertices.push(p.x, p.y, p.z);
                    allPointsSizes.push(THREE.MathUtils.randFloat(6, 11));
                    allPointsColors.push(constColor.r, constColor.g, constColor.b);
                });
                const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(transformedPoints), lineMaterial);
                group.add(line);
            }
            const pointsGeometry = new THREE.BufferGeometry();
            pointsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(allPointsVertices, 3));
            pointsGeometry.setAttribute('size', new THREE.Float32BufferAttribute(allPointsSizes, 1));
            pointsGeometry.setAttribute('color', new THREE.Float32BufferAttribute(allPointsColors, 3));
            group.add(new THREE.Points(pointsGeometry, starShaderMaterial));
            return group;
        };
        
        const foregroundStars = createStars(200, 20, 80, 4, 8);
        scene.add(foregroundStars);

        const starField = createStars(20000, 100, 600, 1, 5);
        scene.add(starField);

        const constellationGroup = createConstellationGroup();
        scene.add(constellationGroup);
        
        // --- Create Comets ---
        const comets = [];
        const cometGeometry = new THREE.BufferGeometry();
        cometGeometry.setAttribute('position', new THREE.Float32BufferAttribute([0,0,0], 3));
        const cometMaterial = new THREE.PointsMaterial({
            color: 0xffffff, size: 15, map: starTexture,
            blending: THREE.AdditiveBlending, transparent: true, depthTest: false
        });

        for (let i = 0; i < 10; i++) {
            const cometMesh = new THREE.Points(cometGeometry, cometMaterial);
            const resetComet = () => {
                const phi = Math.acos(2 * Math.random() - 1);
                const theta = Math.random() * 2 * Math.PI;
                cometMesh.position.setFromSphericalCoords(1000, phi, theta);
                const target = new THREE.Vector3(
                    THREE.MathUtils.randFloat(-200, 200),
                    THREE.MathUtils.randFloat(-200, 200),
                    THREE.MathUtils.randFloat(-200, 200)
                );
                cometMesh.velocity = new THREE.Vector3().subVectors(target, cometMesh.position).normalize().multiplyScalar(THREE.MathUtils.randFloat(3, 5));
            };
            resetComet();
            comets.push({ mesh: cometMesh, reset: resetComet });
            scene.add(cometMesh);
        }

        // --- Event Listeners & Animation ---
        const onMouseMove = e => {
            mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', onMouseMove);

        const clock = new THREE.Clock();
        const animate = () => {
            requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime();

            // Update comets
            comets.forEach(comet => {
                comet.mesh.position.add(comet.mesh.velocity);
                if (comet.mesh.position.length() > 1100) {
                    comet.reset();
                }
            });

            // Automatic rotation
            starField.rotation.y = elapsedTime * 0.01;
            constellationGroup.rotation.y = elapsedTime * 0.015;
            foregroundStars.rotation.y = elapsedTime * 0.02;

            // Parallax rotation
            const parallaxStrength = 0.05;
            const targetRotX = mousePos.current.y * parallaxStrength;
            const targetRotY = mousePos.current.x * parallaxStrength;

            // Apply parallax with different intensity for each layer
            foregroundStars.rotation.x += (targetRotX * 2 - foregroundStars.rotation.x) * 0.02;
            foregroundStars.rotation.y += (targetRotY * 2 - foregroundStars.rotation.y) * 0.02;
            constellationGroup.rotation.x += (targetRotX - constellationGroup.rotation.x) * 0.02;
            constellationGroup.rotation.y += (targetRotY - constellationGroup.rotation.y) * 0.02;
            starField.rotation.x += (targetRotX * 0.5 - starField.rotation.x) * 0.02;
            starField.rotation.y += (targetRotY * 0.5 - starField.rotation.y) * 0.02;
            
            renderer.render(scene, camera);
        };
        animate();

        // --- Resize & Cleanup ---
        const onResize = () => {
            if (currentMount) {
                camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
            }
        };
        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('resize', onResize);
            window.removeEventListener('mousemove', onMouseMove);
            
            // Dispose all geometries and materials to prevent memory leaks
            scene.traverse(object => {
                if (object.geometry) {
                    object.geometry.dispose();
                }
                if (object.material) {
                    if (Array.isArray(object.material)) {
                        object.material.forEach(material => material.dispose());
                    } else {
                        object.material.dispose();
                    }
                }
            });

            starTexture.dispose();
            
            if (currentMount && renderer.domElement) {
                currentMount.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, []);

    return <div ref={mountRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 1 }} />;
});


const Header = React.memo(() => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
    const [scrolled, setScrolled] = useState(false);

    // Отслеживаем прокрутку для изменения стиля хедера
    const { scrollY } = useScroll();
    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 50);
    });

    useEffect(() => {
        const handleResize = () => setIsDesktop(window.innerWidth > 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const headerVariants = {
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
    };

    return (
        <motion.header
            style={{...styles.header, borderBottom: '1px solid'}}
            variants={headerVariants}
            animate={scrolled ? "scrolled" : "top"}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
            <div style={styles.headerContent}>
                <div style={styles.logo}>
                    <SynaskIcon />
                    <span>sYnask</span>
                </div>
                {isDesktop && (
                    <nav style={{ ...styles.nav, display: 'flex' }}>
                        <div onMouseLeave={() => setIsOpen(false)} style={{ position: 'relative' }}>
                            <button onMouseEnter={() => setIsOpen(true)} style={styles.navLink}>О нас <ChevronDown /></button>
                            <AnimatePresence>
                                {isOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                                        style={{ position: 'absolute', top: '100%', marginTop: '0.5rem', width: '12rem', backgroundColor: 'rgba(17, 24, 39, 0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', padding: '0.5rem' }}
                                    >
                                        <a href="#" style={{...styles.navLink, width: '100%'}}>Наша Команда</a>
                                        <a href="#" style={{...styles.navLink, width: '100%'}}>Карьера</a>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        <a href="#" style={styles.navLink}>Фичи</a>
                    </nav>
                )}
                <button style={styles.navButton}>Начать</button>
            </div>
        </motion.header>
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
                        <strong style={{ color: 'white' }}>{post.username}</strong> {post.description}
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
                    <motion.div style={{ ...styles.phoneFeed, y: feedY }}>
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

        const timer1 = setTimeout(chatFlow[0], 500);
        const timer2 = setTimeout(chatFlow[1], 1800);
        const timer3 = setTimeout(chatFlow[2], 4000);

        return () => { clearTimeout(timer1); clearTimeout(timer2); clearTimeout(timer3); }
    }, []);

    const TypingIndicator = () => (
        <motion.div style={styles.typingIndicatorContainer} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <motion.span style={styles.typingDot} animate={{ y: [0, -4, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0 }} />
            <motion.span style={styles.typingDot} animate={{ y: [0, -4, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }} />
            <motion.span style={styles.typingDot} animate={{ y: [0, -4, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }} />
        </motion.div>
    );

    return (
        <section style={styles.aiStorySection}>
            <motion.h2 style={styles.sectionTitle} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }}>
                Наш AI всегда на связи
            </motion.h2>
            <motion.p style={styles.sectionSubtitle} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5, delay: 0.2 }}>
                Он — ядро платформы, которое обучается вместе с вами, возрождая актуальность и предлагая то, что нужно именно вам.
            </motion.p>
            <motion.div style={styles.aiChatContainer} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.3 }}>
                <AnimatePresence>
                    {messages.map((msg, index) => {
                        if (msg.type === 'typing') { return <TypingIndicator key="typing" />; }
                        return (
                            <motion.div key={index}
                                style={msg.type === 'user' ? { ...styles.messageBubble, ...styles.userMessage } : { ...styles.messageBubble, ...styles.aiMessage }}
                                initial={{ opacity: 0, y: 20, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0 }} layout >
                                {msg.text}
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </motion.div>
        </section>
    );
});

const Accordion = ({ title, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
        <div style={styles.accordionItem}>
            <motion.header
                style={styles.accordionHeader}
                onClick={() => setIsOpen(!isOpen)}
                initial={false}
            >
                {title}
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                    <ChevronDown />
                </motion.div>
            </motion.header>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.section
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: { opacity: 1, height: "auto" },
                            collapsed: { opacity: 0, height: 0 }
                        }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                        style={styles.accordionContent}
                    >
                        <div style={styles.accordionText}>{children}</div>
                    </motion.section>
                )}
            </AnimatePresence>
        </div>
    );
};

const FeaturesSection = React.memo(() => {
    const [messages, setMessages] = React.useState([]);
    const [isMobileView, setIsMobileView] = useState(window.innerWidth < 1024);

    useEffect(() => {
        const handleResize = () => setIsMobileView(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    React.useEffect(() => {
        const chatFlow = [
            () => setMessages([{ type: 'user', text: 'Какие у тебя есть инструменты для авторов?' }]),
            () => setMessages(prev => [...prev, { type: 'typing' }]),
            () => setMessages(prev => [
                ...prev.filter(m => m.type !== 'typing'),
                { type: 'ai', text: 'Я могу помочь с генерацией идей для постов, написать текст в любом стиле, создать уникальные изображения и даже проверить факты. А наш редактор — это настоящее графическое полотно для вашего творчества!' }
            ])
        ];

        const timer1 = setTimeout(chatFlow[0], 500);
        const timer2 = setTimeout(chatFlow[1], 1800);
        const timer3 = setTimeout(chatFlow[2], 5000);

        return () => { clearTimeout(timer1); clearTimeout(timer2); clearTimeout(timer3); }
    }, []);

    const TypingIndicator = () => (
        <motion.div style={styles.typingIndicatorContainer} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <motion.span style={styles.typingDot} animate={{ y: [0, -4, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0 }} />
            <motion.span style={styles.typingDot} animate={{ y: [0, -4, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }} />
            <motion.span style={styles.typingDot} animate={{ y: [0, -4, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }} />
        </motion.div>
    );
    
    const featuresLayoutDyn = isMobileView ? {...styles.featuresSection, gridTemplateColumns: '1fr', gap: '2rem'} : styles.featuresSection;

    return (
        <section style={{padding: '4rem 1rem'}}>
            <motion.h2 style={styles.sectionTitle} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }}>
                Платформа нового поколения
            </motion.h2>
            <motion.p style={styles.sectionSubtitle} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5, delay: 0.2 }}>
                sYnask — это не просто соцсеть. Это экосистема для творчества, общения и безопасности, созданная с помощью передовых технологий.
            </motion.p>
            <div style={featuresLayoutDyn}>
                <div style={styles.featuresDescription}>
                   <Accordion title="Инструменты для авторов" defaultOpen={true}>
                       Мы предоставляем авторам мощные AI-функции и уникальный редактор постов. Представьте себе не просто текстовое поле, а безграничное графическое полотно, где вы можете комбинировать текст, изображения, видео и интерактивные элементы. Наш AI поможет сгенерировать контент, найти вдохновение и даже дописать за вас текст.
                   </Accordion>
                   <Accordion title="Защита авторских прав">
                       Ваш контент — ваша собственность. Мы разрабатываем систему на основе блокчейн-технологий, которая закрепляет авторство за создателем. Каждая уникальная работа получает цифровой сертификат, который невозможно подделать. Это как NFT, но создано специально для защиты интеллектуальной собственности в социальной сети.
                   </Accordion>
                    <Accordion title="Приватность и безопасность">
                        Все ваши личные переписки защищены сквозным шифрованием (E2E). Это значит, что никто, даже мы, не может получить доступ к их содержанию. Ваша приватность — наш абсолютный приоритет.
                    </Accordion>
                </div>
                <motion.div style={styles.aiChatContainer} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.3 }}>
                    <AnimatePresence>
                        {messages.map((msg, index) => {
                            if (msg.type === 'typing') { return <TypingIndicator key="typing" />; }
                            return (
                                <motion.div key={index}
                                    style={msg.type === 'user' ? { ...styles.messageBubble, ...styles.userMessage } : { ...styles.messageBubble, ...styles.aiMessage }}
                                    initial={{ opacity: 0, y: 20, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0 }} layout >
                                    {msg.text}
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
});


const InstallationGuide = () => {
    const [platform, setPlatform] = useState('pc'); // 'pc' или 'mobile'
    const [browser, setBrowser] = useState('chrome'); // 'chrome', 'yandex', 'edge', 'safari'

    const instructions = {
        pc: {
            chrome: [
                'Откройте sYnask в браузере Chrome.',
                'В адресной строке справа нажмите на иконку "Установить".',
                'Следуйте инструкциям на экране, чтобы завершить установку.',
            ],
            yandex: [
                'Откройте sYnask в Яндекс.Браузере.',
                'Нажмите на иконку (⋮) в правом верхнем углу.',
                'Выберите "Инструменты" -> "Создать ярлык".',
                'Отметьте "Открыть в отдельном окне" и нажмите "Создать".',
            ],
            edge: [
                'Откройте sYnask в браузере Microsoft Edge.',
                'Нажмите на иконку (...) в правом верхнем углу.',
                'Выберите "Приложения" -> "Установить этот сайт как приложение".',
                'Дайте приложению имя и нажмите "Установить".',
            ],
        },
        mobile: {
            chrome: [
                'Откройте sYnask в Chrome на Android.',
                'Нажмите на иконку меню (⋮) в правом верхнем углу.',
                'Выберите пункт "Установить приложение" или "Добавить на главный экран".',
                'Подтвердите добавление.',
            ],
            safari: [
                'Откройте sYnask в Safari на вашем iPhone или iPad.',
                'Нажмите на иконку "Поделиться" (квадрат со стрелкой вверх).',
                'Пролистайте вниз и выберите "На экран «Домой»".',
                'Нажмите "Добавить", и иконка sYnask появится на вашем рабочем столе.',
            ],
        }
    };
    
    const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobileView(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const availableBrowsers = platform === 'pc' ? ['chrome', 'yandex', 'edge'] : ['chrome', 'safari'];
    
    useEffect(() => {
        if (!availableBrowsers.includes(browser)) {
            setBrowser(availableBrowsers[0]);
        }
    }, [platform, browser, availableBrowsers]);

    const installationLayoutDyn = isMobileView ? {...styles.installationLayout, gridTemplateColumns: '1fr', gap: '2rem'} : styles.installationLayout;

    return (
        <section style={styles.installationSection}>
            <motion.h2 style={styles.sectionTitle} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }}>
                Всегда под рукой
            </motion.h2>
            <motion.p style={styles.sectionSubtitle} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5, delay: 0.2 }}>
                Установите sYnask как приложение на ваше устройство, чтобы получать доступ к ленте в один клик. Выберите платформу и браузер, чтобы увидеть инструкцию.
            </motion.p>

            <div style={installationLayoutDyn}>
                <div style={styles.installationControls}>
                    <div style={styles.controlGroup}>
                        <label style={styles.controlLabel}>1. Выберите устройство:</label>
                        <div style={styles.controlButtons}>
                            <button
                                style={platform === 'pc' ? { ...styles.controlButton, ...styles.activeControlButton } : styles.controlButton}
                                onClick={() => setPlatform('pc')}
                            >
                                <ComputerIcon /> ПК
                            </button>
                            <button
                                style={platform === 'mobile' ? { ...styles.controlButton, ...styles.activeControlButton } : styles.controlButton}
                                onClick={() => setPlatform('mobile')}
                            >
                                <SmartphoneIcon /> Смартфон
                            </button>
                        </div>
                    </div>
                    <div style={styles.controlGroup}>
                        <label style={styles.controlLabel}>2. Выберите браузер:</label>
                        <div style={styles.controlButtons}>
                            <AnimatePresence>
                                {availableBrowsers.map(b => (
                                    <motion.button
                                        key={b}
                                        style={browser === b ? { ...styles.controlButton, ...styles.activeControlButton } : styles.controlButton}
                                        onClick={() => setBrowser(b)}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                    >
                                        {b.charAt(0).toUpperCase() + b.slice(1)}
                                    </motion.button>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
                <div style={styles.instructionBox}>
                    <AnimatePresence mode="wait">
                        <motion.ol
                            key={platform + browser}
                            style={styles.instructionList}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {instructions[platform][browser]?.map((step, i) => <li key={i}>{step}</li>)}
                        </motion.ol>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};


const NewsSection = () => {
    const sliderRef = useRef(null);
    const newsData = useMemo(() => [
        { id: 1, title: 'Запуск AI-помощника в sYnask!', date: '15 июня 2025', image: 'https://images.unsplash.com/photo-1620712943543-2858200f745a?q=80&w=2070&auto=format&fit=crop', link: '#' },
        { id: 2, title: 'Новый уровень приватности: сквозное шифрование', date: '10 июня 2025', image: 'https://images.unsplash.com/photo-1554224155-8d044b4a15e3?q=80&w=2070&auto=format&fit=crop', link: '#' },
        { id: 3, title: 'Кастомизация ленты: теперь вы решаете все', date: '5 июня 2025', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop', link: '#' },
        { id: 4, title: 'Мы привлекли новый раунд инвестиций', date: '1 июня 2025', image: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=2070&auto=format&fit=crop', link: '#' },
        { id: 5, title: 'Присоединяйтесь к нашей команде!', date: '28 мая 2025', image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop', link: '#' },
    ], []);

    return(
        <section style={styles.newsSection}>
             <motion.h2 style={styles.sectionTitle} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }}>
                Что нового?
            </motion.h2>
            <motion.p style={styles.sectionSubtitle} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5, delay: 0.2 }}>
                Следите за последними обновлениями и новостями проекта sYnask. Мы постоянно развиваемся для вас.
            </motion.p>
            <motion.div ref={sliderRef} style={styles.newsSliderContainer} drag="x" dragConstraints={{ left: -((newsData.length - 1.5) * 350), right: 0 }}>
                {newsData.map(item => (
                    <motion.div key={item.id} style={styles.newsCard}>
                        <div style={{ ...styles.newsImage, backgroundImage: `url(${item.image})` }} />
                        <div style={styles.newsContent}>
                            <span style={styles.newsDate}>{item.date}</span>
                            <h3 style={styles.newsTitle}>{item.title}</h3>
                            <a href={item.link} style={styles.newsReadMore}>Читать полностью →</a>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};


const Footer = React.memo(() => {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
    useEffect(() => {
        const handleResize = () => setIsDesktop(window.innerWidth > 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const footerGridStyle = { ...styles.footerGrid, gridTemplateColumns: isDesktop ? 'repeat(4, 1fr)' : 'repeat(2, 1fr)' };
    const footerBottomStyle = { ...styles.footerBottom, flexDirection: isDesktop ? 'row' : 'column', gap: isDesktop ? 0 : '1rem' };
    
    return (
        <footer style={styles.footer}>
            <div style={footerGridStyle}>
                <div><h3 style={{ fontWeight: 'bold', fontSize: '1.25rem', color: 'white', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><SynaskIcon />sYnask</h3><p style={{ fontSize: '0.875rem' }}>Будущее социальных сетей.</p></div>
                <div style={styles.footerColumn}><h4 style={{ fontWeight: 600, color: 'white', marginBottom: '1rem' }}>Навигация</h4><a href="#" style={styles.footerLink}>Главная</a><a href="#" style={styles.footerLink}>О нас</a></div>
                <div style={styles.footerColumn}><h4 style={{ fontWeight: 600, color: 'white', marginBottom: '1rem' }}>Ресурсы</h4><a href="#" style={styles.footerLink}>Документация</a><a href="#" style={styles.footerLink}>Поддержка</a></div>
                <div><h4 style={{ fontWeight: 600, color: 'white', marginBottom: '1rem' }}>Присоединяйтесь</h4><div style={{ display: 'flex', gap: '1rem' }}><a href="#" style={styles.footerLink}><GithubIcon /></a><a href="#" style={styles.footerLink}><TelegramIcon /></a><a href="#" style={styles.footerLink}><TwitterIcon /></a></div></div>
            </div>
            <div style={footerBottomStyle}>
                <p>&copy; {new Date().getFullYear()} sYnask. Все права защищены.</p>
                <div style={{ display: 'flex', gap: '1rem', marginTop: isDesktop ? 0 : '1rem' }}><a href="#" style={styles.footerLink}>Политика конфиденциальности</a><a href="#" style={styles.footerLink}>Условия использования</a></div>
            </div>
        </footer>
    );
});

const IntroSection = () => {
    // Адаптивность
    const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 900);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const headerHeight = 80;
    const sectionHeight = `calc(100vh - ${headerHeight}px)`;

    // Стили
    const introStyles = {
        // Общий контейнер секции
        sectionContainer: {
            position: 'relative',
            minHeight: sectionHeight,
            alignItems: 'center',
            padding: '2rem 1rem 0 1rem', // Добавим отступ сверху
        },
        // Заголовок, вынесенный наверх
        mainTitle: {
            fontSize: isMobile ? '2.5rem' : '3.2rem',
            fontWeight: 800,
            textAlign: 'center',
            background: 'linear-gradient(90deg, #FB923C, #C084FC)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '2.5rem', // Отступ после заголовка
            maxWidth: '1280px',
            width: '100%',
        },
        // Основная обертка для контента (история + маскот)
        wrapper: {
            position: 'relative',
            width: '100%',
            maxWidth: 'calc(100vw - 60px)',
            margin: '0 auto',
            zIndex: 20,
            borderRadius: isMobile ? '0 0 2rem 2rem' : '2.5rem',
            boxShadow: '0 0 80px 40px rgba(249,115,22,0.18), 0 0 120px 60px rgba(168,85,247,0.12)',
            background: 'rgba(25, 22, 47, 0.85)',
            overflow: 'hidden', // Меняем на hidden, чтобы обрезать маскота
            borderBottomRightRadius: 0,
            borderBottomLeftRadius: 0,
            backdropFilter: 'blur(10px)',
        },
        // Левая часть с текстом истории
        left: {
            flex: 1.2, // Дадим чуть больше места тексту
            padding: isMobile ? '2rem 1.5rem' : '3.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingTop: 0,
        },
        // Правая часть с маскотом
        right: {
            flex: 0.8, // Меньше места для маскота
            position: 'relative', // Для позиционирования маскота
            minHeight: isMobile ? '300px' : 'auto', // Минимальная высота на мобильных
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        // Текст истории
        storyText: {
            color: '#D1D5DB',
            fontSize: isMobile ? '1rem' : '1.1rem',
            lineHeight: 1.7,
            maxWidth: '550px', // Ограничим ширину текста для читаемости
        },
        // Стили для маскота
        mascot: {
            position: 'absolute',
            bottom: isMobile ? '-40px' : '-60px',   // Выглядывает снизу
            right: isMobile ? '-50px' : '-80px',   // Выглядывает справа
            width: isMobile ? '280px' : '450px',    // Размер маскота
            height: 'auto',
            pointerEvents: 'none', // Чтобы не мешал кликам
            transition: 'transform 0.3s ease-out',
        },
        // Стрелка (если понадобится)
        arrow: {
            position: 'absolute',
            bottom: '120px',
            right: '280px',
            width: '100px',
            transform: 'rotate(-25deg)',
            opacity: 0.7
        },

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
            transition: 'background-color 0.3s ease, border-color 0.3s ease', 
        },
        headerContent: {
            maxWidth: '1280px', margin: '0 auto', padding: '0 1rem', display: 'flex',
            alignItems: 'center', justifyContent: 'space-between', height: '5rem',
        },
        logo: {
            flexShrink: 0, fontWeight: 'bold', fontSize: '1.875rem', letterSpacing: '0.05em',
            display: 'flex', alignItems: 'center', gap: '0.75rem', 
        },
        nav: { alignItems: 'center', gap: '1rem' },
        navLink: {
            color: '#D1D5DB', transition: 'color 0.2s', padding: '0.5rem 0.75rem', borderRadius: '0.375rem',
            textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '0.25rem',
        },
        navButton: {
            background: 'linear-gradient(to right, #F97316, #A855F7)', color: 'white', fontWeight: 'bold',
            padding: '0.5rem 1.25rem', borderRadius: '0.5rem', transition: 'all 0.3s',
            border: 'none', cursor: 'pointer', boxShadow: '0 4px 15px rgba(168, 85, 247, 0.2)',
        },
        heroSection: {
            height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', textAlign: 'center', padding: '1rem',
            position: 'sticky',
            top: 0,
            zIndex: 10,
        },
        heroContentWrapper: { 
            display: 'flex', flexDirection: 'column', alignItems: 'center',
        },
        badgesContainer: {
            display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem', marginBottom: '2rem',
        },
        badge: {
            fontSize: '0.75rem', fontWeight: 600, padding: '0.25rem 0.75rem', borderRadius: '9999px',
        },
        heroTitle: {
            fontSize: 'clamp(2.5rem, 5vw + 1rem, 3.75rem)', fontWeight: 800, marginBottom: '1rem',
            background: 'linear-gradient(to right, #FB923C, #C084FC)', WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
        },
        sectionTitle: { 
            fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: '1rem',
            background: 'linear-gradient(to right, #FB923C, #C084FC)', WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent', textAlign: 'center',
        },
        sectionSubtitle: { 
            marginBottom: '3rem', fontSize: '1.125rem', color: '#9CA3AF',
            maxWidth: '48rem', textAlign: 'center', margin: '0 auto 3rem auto',
        },
        heroSubtitle: {
            marginBottom: '2rem', fontSize: '1.125rem', color: '#9CA3AF', maxWidth: '42rem',
        },
        emailForm: { width: '100%', maxWidth: '28rem' },
        emailInputContainer: {
            display: 'flex', alignItems: 'center', backgroundColor: 'rgba(17, 24, 39, 0.5)',
            border: '1px solid rgba(168, 85, 247, 0.5)', borderRadius: '0.5rem',
            padding: '0.5rem', backdropFilter: 'blur(4px)',
        },
        emailInput: {
            appearance: 'none', backgroundColor: 'transparent', border: 'none',
            width: '100%', color: 'white', marginRight: '0.75rem', padding: '0.5rem',
            lineHeight: '1.5',
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
            border: '1px solid rgba(187, 0, 255, 0.37)',
            borderRadius: '1.5rem',
            padding: '2rem',
            margin: '0 auto',
            maxWidth: '1280px',
            borderTopRightRadius: 0,
            borderTopLeftRadius: 0,
        },
    };

    return (
        <section style={introStyles.sectionContainer}>
            {/* 1. ЗАГОЛОВОК ВО ВСЮ ШИРИНУ */}

            <div style={introStyles.wrapper}>
                {/* 2. ЛЕВАЯ ЧАСТЬ: ИСТОРИЯ В ВИДЕ ТЕКСТА */}
                <h2 style={introStyles.mainTitle}>
                    История нашего возрождения
                </h2>
                <div style={introStyles.left}>
                    <p style={introStyles.storyText}>
                        Путь sYnask начался в <strong>марте 2022 года</strong>, когда родилась сама идея проекта. 
                        Мы загорелись желанием создать нечто новое, и уже к <strong>июлю</strong> того же года приступили к активной разработке первого прототипа. 
                        <br/><br/>
                        <strong>Январь 2023</strong> стал для нас важной вехой — мы провели первые успешные тесты нашего AI. 
                        Осенью, в <strong>октябре 2023</strong>, мы запустили закрытое бета-тестирование, чтобы получить ценную обратную связь. 
                        <br/><br/>
                        И вот, в <strong>мае 2024 года</strong>, состоялся долгожданный публичный релиз. 
                        Сегодня, в <strong>июне 2025</strong>, мы с гордостью представляем вам мощного AI-помощника и множество новых функций, продолжая наш путь инноваций. Это наш Феникс — символ вечного обновления и возрождения идей.
                    </p>
                </div>
                
                {/* 3. ПРАВАЯ ЧАСТЬ: МАСКОТ */}
                <div style={introStyles.right}>
                    <motion.img
                        src="https://i.ibb.co/N2mVtYpB/18-20250531132732.png"
                        alt="Маскот Феникс"
                        style={{
                            ...introStyles.mascot,

                        }}
                        initial={{ x: 100, y: 100, opacity: 0, scale: 0.92, rotate: 8 }}
                        animate={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    />
                    {/* При желании можно раскомментировать и стилизовать стрелку */}
                    {/* <img src="https://example.com/arrow.svg" alt="Стрелка" style={introStyles.arrow} /> */}
                </div>
            </div>
        </section>
    );
};

// --- TimelineDiagram ---
const TimelineDiagram = ({ points, isMobile }) => {
    // SVG диаграмма с ломаной и остановками
    const width = isMobile ? 280 : 320;
    const height = isMobile ? 220 : 320;
    const margin = 32;
    const stepY = (height - 2 * margin) / (points.length - 1);
    return (
        <svg width={width} height={height} style={{ overflow: 'visible' }}>
            {/* Ломаная линия */}
            <polyline
                fill="none"
                stroke="url(#timelineGradient)"
                strokeWidth={5}
                points={points.map((p, i) => `${width / 2},${margin + i * stepY}`).join(' ')}
            />
            <defs>
                <linearGradient id="timelineGradient" x1="0" y1="0" x2="0" y2={height} gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#F97316" />
                    <stop offset="100%" stopColor="#A855F7" />
                </linearGradient>
            </defs>
            {/* Остановки */}
            {points.map((p, i) => (
                <g key={i}>
                    <circle
                        cx={width / 2}
                        cy={margin + i * stepY}
                        r={isMobile ? 13 : 16}
                        fill={p.color}
                        opacity={0.18}
                    />
                    <circle
                        cx={width / 2}
                        cy={margin + i * stepY}
                        r={isMobile ? 7 : 9}
                        fill={p.color}
                        stroke="#fff"
                        strokeWidth={2}
                    />
                    <text
                        x={width / 2 + (isMobile ? 18 : 24)}
                        y={margin + i * stepY + 5}
                        fontSize={isMobile ? 13 : 15}
                        fill="#fff"
                        style={{ fontWeight: 600 }}
                    >
                        {p.year}, {p.month}
                    </text>
                    <text
                        x={width / 2 + (isMobile ? 18 : 24)}
                        y={margin + i * stepY + (isMobile ? 22 : 26)}
                        fontSize={isMobile ? 12 : 14}
                        fill="#C084FC"
                    >
                        {p.label}
                    </text>
                </g>
            ))}
        </svg>
    );
};

// --- ОСНОВНОЙ КОМПОНЕНТ СТРАНИЦЫ ---
export default function App() {
    const [email, setEmail] = useState('');
    const badgeStatusStyle = { ...styles.badge, backgroundColor: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)', color: '#4ADE80' };
    const badgeVersionStyle = { ...styles.badge, backgroundColor: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.3)', color: '#C084FC' };
    const badgeUsersStyle = { ...styles.badge, backgroundColor: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', color: '#93C5FD' };

    // --- Логика для анимации скролла ---
    const mainRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: mainRef,
        offset: ['start start', 'end start']
    });

    const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.85]);

    return (
        <div style={styles.appContainer}>
            <ParticlesBackground />
            <Header />
            <main ref={mainRef}>
                <section style={styles.heroSection}>
                    <motion.div 
                        style={{...styles.heroContentWrapper, opacity: heroOpacity, scale: heroScale}}
                    >
                        <div style={styles.badgesContainer}>
                            <div style={badgeStatusStyle}>Статус: Online</div>
                            <div style={badgeVersionStyle}>Версия: 0.7.1-scroll</div>
                            <div style={badgeUsersStyle}>Пользователей: 3,102</div>
                        </div>

                        <h1 style={styles.heroTitle}>
                            Войдите в будущее
                        </h1>
                        <p style={styles.heroSubtitle}>
                            Алгоритмы — под контролем. Ты — в фокусе.
                        </p>
                        <form
                            style={styles.emailForm}
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
                                <button style={styles.navButton} type="submit">Продолжить</button>
                            </div>
                        </form>
                    </motion.div>
                </section>
                {/* --- IntroSection с историей и диаграммой --- */}
                <IntroSection />
                <div style={styles.pageContent}>
                    <div style={styles.glassPane}>
                        <FeaturesSection />
                        <PhoneFeedSection />
                        <AiStorySection />
                        <InstallationGuide />
                        <NewsSection />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
