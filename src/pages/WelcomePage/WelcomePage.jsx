import React, { useState, useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from 'framer-motion';
import styles from './WelcomePage.styles';
import {useDevice} from '../../hooks/useDevice';

const ChevronDown = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"></path></svg>;
const GithubIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg> );
const TelegramIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7.89 12.56L2 9l20-7Z"/><path d="m22 2-15 12 4 10 4-10-3-7 6-2Z"/></svg> );
const TwitterIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 1.4 3.3 4.4 3.3 4.4s-1.4 1.4-3.3 1.4c-1.8 0-3.3-1.4-3.3-1.4s-1.4 2.8-4.7 2.8c-2.2 0-4.7-1.4-4.7-1.4s-1.4-1.4-1.4-2.8c0-1.4 1.4-2.8 1.4-2.8s2.1-.7 3.3 0c1.2.7 2.1 2.1 2.1 2.1s.7-2.1 2.8-2.8c2.1-.7 3.3-1.4 3.3-1.4s1.4-1.4 1.4-2.8c0-1.4-1.4-2.8-1.4-2.8s-2.1.7-2.8 1.4c-.7.7-1.4 2.1-1.4 2.1s-2.1-2.1-2.8-2.8c-.7-.7-2.1-1.4-2.8-1.4c-1.4 0-2.8 1.4-2.8 1.4s-1.4 1.4-1.4 2.8c0 1.4 1.4 2.8 1.4 2.8s1.4.7 2.8 0c1.4-.7 2.1-2.1 2.1-2.1s.7 1.4 2.1 2.1c1.4.7 2.8 1.4 4.7 1.4 2.2 0 4.7-1.4 4.7-1.4s1.4-1.4 1.4-2.8c0-1.4-1.4-2.8-2.8-2.8s-2.8 1.4-3.3 2.1c-.5.7-1.4 2.1-1.4 2.1s-1.4-2.1-2.8-2.8c-1.4-.7-2.8-1.4-4.7-1.4c-2.2 0-4.7 1.4-4.7 1.4s-1.4 1.4-1.4 2.8c0 1.4 1.4 2.8 1.4 2.8s1.4.7 2.8 0c1.4-.7 2.1-2.1 2.1-2.1s.7 1.4 2.1 2.1c1.4.7 2.8 1.4 4.7 1.4 2.2 0 4.7-1.4 4.7-1.4s1.4-1.4 1.4-2.8c0-1.4-1.4-2.8-2.8-2.8s-2.8 1.4-3.3 2.1c-.5.7-1.4 2.1-1.4 2.1s-1.4-2.1-2.8-2.8c-1.4-.7-2.8-1.4-4.7-1.4c-2.2 0-4.7 1.4-4.7 1.4s-1.4 1.4-1.4 2.8c0 1.4 1.4 2.8 1.4 2.8s1.4.7 2.8 0c1.4-.7 2.1-2.1 2.1-2.1s.7 1.4 2.1 2.1c1.4.7 2.8 1.4 4.7 1.4 2.2 0 4.7-1.4 4.7-1.4s1.4-1.4 1.4-2.8c0-1.4-1.4-2.8-2.8-2.8s-2.8 1.4-3.3 2.1c-.5.7-1.4 2.1-1.4 2.1s-1.4-2.1-2.8-2.8c-1.4-.7-2.8-1.4-4.7-1.4c-2.2 0-4.7 1.4-4.7 1.4s-1.4 1.4-1.4 2.8c0 1.4 1.4 2.8 1.4 2.8s1.4.7 2.8 0c1.4-.7 2.1-2.1 2.1-2.1Z"/></svg>);
const SmartphoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>;
const ComputerIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>;
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
    const [scrolled, setScrolled] = useState(false);
    const { isMobile } = useDevice(); // <-- ИСПОЛЬЗУЕМ ХУК

    const { scrollY } = useScroll();
    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 50);
    });

    return (
        <motion.header
            style={styles.header}
            variants={styles.headerVariants}
            animate={scrolled ? "scrolled" : "top"}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
            <div style={styles.headerContent}>
                <div style={styles.logo}>
                    <SynaskIcon />
                    <span>sYnask</span>
                </div>

                {!isMobile && ( // <-- ИСПОЛЬЗУЕМ isMobile
                    <nav style={styles.desktopNav}>
                        <div
                            onMouseLeave={() => setIsOpen(false)}
                            style={styles.dropdownContainer}
                        >
                            <button onMouseEnter={() => setIsOpen(true)} style={styles.navLink}>
                                О нас <ChevronDown />
                            </button>
                            <AnimatePresence>
                                {isOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        style={styles.dropdownMenu}
                                    >
                                        <a href="#" style={styles.dropdownLink}>Наша Команда</a>
                                        <a href="#" style={styles.dropdownLink}>Карьера</a>
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
                {/*<div style={styles.rightMenuContainer}>
                    <motion.h2 style={styles.sectionTitle} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }}>
                        Наш AI всегда на связи
                    </motion.h2>
                </div>
            </div>
            <div style={styles.descriptionSuperFunction}>
                <a>привет</a>*/}
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

const featuresData = [
    {
        title: 'Инструменты для авторов',
        description: 'Предоставляем мощные и удобные инструменты, которые помогут вам создавать уникальный контент, анализировать аудиторию и монетизировать свое творчество.',
        demoComponent: <div style={styles.demoPlaceholder}>Демонстрация инструментов</div>
    },
    {
        title: 'Защита авторских прав',
        description: 'Наша система автоматически отслеживает и защищает ваши авторские права, предотвращая несанкционированное использование вашего контента.',
        demoComponent: <div style={styles.demoPlaceholder}>Демонстрация защиты</div>
    },
    {
        title: 'Приватность и безопасность',
        description: 'Мы гарантируем высокий уровень приватности ваших данных и безопасность вашего аккаунта с помощью современных технологий шифрования и аутентификации.',
        demoComponent: <div style={styles.demoPlaceholder}>Демонстрация безопасности</div>
    }
];

const ShootingStar = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div style={styles.shootingStarContainer}>
            <div
                style={{ ...styles.star, ...(isHovered ? styles.starHover : {}) }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            />
            <div style={{ ...styles.starTrail, ...(isHovered ? styles.starTrailHover : {}) }} />
        </div>
    );
};

const FeaturesSection = () => {
    const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
    // Вместо window.innerWidth можно использовать хук useDevice(), как вы и предлагали.
    // Я оставлю логику с window.innerWidth для примера, как в исходном коде.
    const { isMobile } = useDevice();
    
    const scrollContainerRef = useRef(null);
    const textContainerRef = useRef(null);
    const sectionRefs = useRef([]);

    // ... (остальные хуки useEffect остаются без изменений)
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;
        const handleReverseScroll = () => {
            if (textContainerRef.current) {
                const scrollHeight = container.scrollHeight - container.clientHeight;
                const scrollTop = container.scrollTop;
                const scrollPercentage = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
                textContainerRef.current.style.transform = `translateY(${scrollPercentage * 30}px)`;
            }
        };
        container.addEventListener('scroll', handleReverseScroll);
        return () => container.removeEventListener('scroll', handleReverseScroll);
    }, []);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.6
        };

        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const index = parseInt(entry.target.dataset.index, 10);
                    setCurrentFeatureIndex(index);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        const refs = sectionRefs.current;
        refs.forEach(ref => {
            if (ref) observer.observe(ref);
        });

        return () => {
            refs.forEach(ref => {
                if (ref) observer.unobserve(ref);
            });
        };
    }, []);

    return (
        <section style={styles.featuresSectionWrapper}>
            {/* -- НОВОЕ: Вставляем CSS keyframes -- */}
            <style>
                {`
                    @keyframes flicker {
                      0%, 100% { opacity: 0.8; box-shadow: 0 0 10px #A855F7, 0 0 20px #A855F7, 0 0 30px #A855F7; }
                      50% { opacity: 1; box-shadow: 0 0 15px #C4B5FD, 0 0 25px #C4B5FD, 0 0 40px #C4B5FD; }
                    }
                    @keyframes trail-shimmer {
                      0%, 100% { opacity: 0.7; }
                      50% { opacity: 1; }
                    }
                `}
            </style>

            {/* -- ИЗМЕНЕНО: Вся видимая часть теперь обернута в stickyContainer -- */}
            <div style={styles.stickyContainer(isMobile)}>
                
                {/* -- НОВОЕ: Возвращаем заголовки -- */}
                <motion.h2 style={styles.sectionTitle} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }}>
                Возможности
                </motion.h2>
                <motion.p style={styles.sectionSubtitle} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5, delay: 0.2 }}>
                То, за что нас полюбили
                </motion.p>

                {/* Сетка с фичами теперь идет после заголовков */}
                <div style={styles.featuresGrid(isMobile)}>
                    {/* Левая часть - Описание */}
                    <div style={styles.featuresDescriptionContainer(isMobile)}>
                        {/* Звезда, как вы и разместили, внутри блока с описанием */}
                        {!isMobile && <ShootingStar />}
                        
                        <div ref={textContainerRef} style={styles.featuresTextWrapper}>
                            {featuresData.map((feature, index) => (
                                <div
                                    key={index}
                                    style={styles.featureTextItem(index === currentFeatureIndex)}
                                >
                                    <h3 style={styles.featureTitle}>{feature.title}</h3>
                                    <p style={styles.featureDescriptionText}>{feature.description}</p>
                                </div>
                            ))}
                        </div>
                        <div style={styles.pagination}>
                            {featuresData.map((_, index) => (
                                <div
                                    key={index}
                                    style={styles.paginationDot(index === currentFeatureIndex)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Правая часть - Демонстрация */}
                    <div style={styles.featuresDemoContainer}>
                        {featuresData.map((feature, index) => (
                            <div
                                key={index}
                                style={styles.featureDemoItem(index === currentFeatureIndex)}
                            >
                                {feature.demoComponent}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Невидимый скролл-контейнер остается без изменений */}
            <div ref={scrollContainerRef} style={styles.scrollContainer}>
                {featuresData.map((_, index) => (
                    <div
                        key={index}
                        ref={el => sectionRefs.current[index] = el}
                        style={styles.scrollSnapSection}
                        data-index={index}
                    />
                ))}
            </div>
        </section>
    );
};

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
    
    const { isMobile } = useDevice();

    const availableBrowsers = platform === 'pc' ? ['chrome', 'yandex', 'edge'] : ['chrome', 'safari'];
    
    useEffect(() => {
        if (!availableBrowsers.includes(browser)) {
            setBrowser(availableBrowsers[0]);
        }
    }, [platform, browser, availableBrowsers]);

    const installationLayoutDyn = isMobile ? {...styles.installationLayout, gridTemplateColumns: '1fr', gap: '2rem'} : styles.installationLayout;

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
    const { isMobile } = useDevice();

    const footerGridStyle = { ...styles.footerGrid, gridTemplateColumns: !isMobile ? 'repeat(4, 1fr)' : 'repeat(2, 1fr)' };
    const footerBottomStyle = { ...styles.footerBottom, flexDirection: !isMobile ? 'row' : 'column', gap: !isMobile ? 0 : '1rem' };
    
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
                <div style={{ display: 'flex', gap: '1rem', marginTop: !isMobile ? 0 : '1rem' }}><a href="#" style={styles.footerLink}>Политика конфиденциальности</a><a href="#" style={styles.footerLink}>Условия использования</a></div>
            </div>
        </footer>
    );
});

const IntroSection = () => {
    const { isMobile } = useDevice();

    return (
        <section style={styles.introSectionContainer(isMobile)}>
            <div style={styles.introWrapper(isMobile)}>
                <h2 style={styles.introMainTitle(isMobile)}>
                    История нашего возрождения
                </h2>
                <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row' }}>
                    {/* 2. ЛЕВАЯ ЧАСТЬ: ИСТОРИЯ В ВИДЕ ТЕКСТА */}
                    <div style={styles.introLeft(isMobile)}>
                        <p style={styles.introStoryText(isMobile)}>
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
                    <div style={styles.introRight(isMobile)}>
                        <motion.img
                            src="https://i.ibb.co/N2mVtYpB/18-20250531132732.png"
                            alt="Маскот Феникс"
                            style={styles.introMascot(isMobile)}
                            initial={{ x: 100, y: 100, opacity: 0, scale: 0.92, rotate: 8 }}
                            animate={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        />
                        {/* При желании можно раскомментировать и стилизовать стрелку */}
                        {/* <img src="https://example.com/arrow.svg" alt="Стрелка" style={styles.introArrow} /> */}
                    </div>
                </div>
            </div>
        </section>
    );
};


export default function App() {
    const [email, setEmail] = useState('');
    const { isMobile } = useDevice();

    // --- Логика для анимации скролла ---
    const mainRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: mainRef,
        offset: ['start start', 'end start']
    });

    const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.85]);

    return (
        // Убедитесь, что стиль styles.appContainer определен
        <div style={styles.appContainer}>
            <ParticlesBackground />
            <Header />
            <main ref={mainRef}>
                <section style={styles.heroSection(isMobile)}> 
                    <motion.div 
                        style={{...styles.heroContentWrapper, opacity: heroOpacity, scale: heroScale}}
                    >
                        {/* 1. Шилдики */}
                        <div style={styles.badgesContainer}>
                            <div style={styles.badgeStatus}>Статус: Online</div>
                            <div style={styles.badgeVersion}>Версия: 0.7.1-scroll</div>
                            <div style={styles.badgeUsers}>Пользователей: 3,102</div>
                        </div>

                        {/* 2. Заголовок */}
                        <h1 style={styles.heroTitle(isMobile)}>
                            Войдите в будущее
                        </h1>

                        {/* 3. Форма ввода (переехала вверх) */}
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
                                {/* Убедитесь, что стиль styles.navButton определен */}
                                <button style={styles.navButton} type="submit">Продолжить</button>
                            </div>
                        </form>
                        
                        {/* 4. Описание (переехало вниз) */}
                        <p style={styles.heroSubtitle(isMobile)}>
                            Алгоритмы — под контролем. Ты — в фокусе.
                        </p>

                    </motion.div>
                    {/* Стрелочка "Листай вниз" у нижней границы экрана */}
                    {/* 
                        На мобильных устройствах стрелка не отображается, потому что она перекрывается или становится незаметной из-за особенностей верстки (например, position: 'sticky' и paddingTop: '15vh' у heroSection), а также из-за того, что на мобильных часто нет необходимости явно указывать на скролл. 
                        Если вы хотите, чтобы стрелка была видна и на мобильных, просто уберите условие ниже.
                    */}
                        <div
                            style={{
                                position: 'absolute',
                                left: '50%',
                                bottom: isMobile ? 150 : 32,
                                transform: 'translateX(-50%)',
                                zIndex: 20,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                pointerEvents: 'none',
                                userSelect: 'none',
                            }}
                        >
                            <span
                                style={{
                                    display: 'block',
                                    width: 36,
                                    height: 36,
                                    borderRadius: '50%',
                                    background: 'rgba(255,255,255,0.08)',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: 4,
                                    animation: 'arrow-bounce 1.6s infinite',
                                }}
                            >
                                <svg width={22} height={22} viewBox="0 0 24 24" fill="none" style={{display: 'block'}} xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 5v14M12 19l-5-5M12 19l5-5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </span>
                            <span
                                style={{
                                    fontSize: '1rem',
                                    color: '#9CA3AF',
                                    opacity: 0.8,
                                    fontWeight: 500,
                                    letterSpacing: '0.01em',
                                    marginTop: 0,
                                    textShadow: '0 1px 4px rgba(0,0,0,0.18)',
                                }}
                            >
                                Листай вниз
                            </span>
                            {/* Анимация стрелки через встроенный keyframes */}
                            <style>
                                {`
                                    @keyframes arrow-bounce {
                                        0%, 100% { transform: translateY(0);}
                                        50% { transform: translateY(8px);}
                                    }
                                `}
                            </style>
                        </div>
                </section>
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
