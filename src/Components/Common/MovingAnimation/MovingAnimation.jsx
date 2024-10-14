import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { MarchingCubes } from 'three/examples/jsm/objects/MarchingCubes.js';
import './MovingAnimation.css';

const SimpleMarchingCubes = () => {
    const containerRef = useRef(null);
    let camera, scene, renderer, effect, controls;
    let time = 0;
    const clock = new THREE.Clock();
    const resolution = 28;

    useEffect(() => {
        init();
        animate();

        window.addEventListener('resize', onWindowResize);
        return () => {
            window.removeEventListener('resize', onWindowResize);
            if (renderer) {
                renderer.dispose();
            }
        };
    }, []);

    const init = () => {
        const container = containerRef.current;

        // Camera
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
        camera.position.set(-300, 300, 1000);

        // Scene
        scene = new THREE.Scene();

        // Light
        const light = new THREE.DirectionalLight(0xffffff, 3);
        light.position.set(0.5, 0.5, 1);
        scene.add(light);

        // Marching Cubes
        effect = new MarchingCubes(resolution, new THREE.MeshStandardMaterial({ color: 0x0000ff }), true, true, 100000);
        effect.position.set(0, 0, 0);
        effect.scale.set(350, 350, 350);
        scene.add(effect);

        // Renderer
        renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        // Controls
        controls = new OrbitControls(camera, renderer.domElement);
        updateControls();
    };

    const updateControls = () => {
        const isMobile = window.innerWidth < 700;
        controls.enableRotate = !isMobile; // Disable rotation on mobile
        controls.enablePan = !isMobile; // Disable panning on mobile
        controls.enableZoom = !isMobile; // Disable zoom on mobile

        // Adjust scale for mobile
        if (isMobile) {
            controls.dispose(); // Dispose of controls to prevent interference
            effect.scale.set(200, 200, 200); // Set smaller scale for mobile
        } else {
            effect.scale.set(350, 350, 350); // Reset scale for larger screens
        }
    };

    const onWindowResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        updateControls(); // Update controls and scale on resize
    };

    const getColor = (time) => {
        const blueVariants = [
            new THREE.Color(0x0000ff),
            new THREE.Color(0x3399ff),
            new THREE.Color(0x66ccff),
            new THREE.Color(0x0099cc),
            new THREE.Color(0x003366),
        ];

        const index = Math.floor((time * 0.1) % blueVariants.length);
        const nextIndex = (index + 1) % blueVariants.length;

        const currentColor = blueVariants[index];
        const nextColor = blueVariants[nextIndex];

        const alpha = (time * 0.1) % 1;

        const color = currentColor.clone().lerp(nextColor, alpha);
        return color;
    };

    const updateCubes = () => {
        effect.reset();
        const numBlobs = 10;
        const strength = 1.2;

        for (let i = 0; i < numBlobs; i++) {
            const ballx = Math.sin(i + 0.5 * time) * 0.27 + 0.5;
            const bally = Math.abs(Math.cos(i + 0.5 * time)) * 0.77;
            const ballz = Math.cos(i + 0.5 * time * 0.1) * 0.27 + 0.5;

            const color = getColor(time);
            effect.addBall(ballx, bally, ballz, strength, 12);
            effect.material.color.set(color);
        }

        effect.update();
    };

    const animate = () => {
        time += clock.getDelta(); // Increment time

        // Rotate the effect slowly around the y-axis
        effect.rotation.y += 0.01; // Adjust this value for faster or slower rotation

        updateCubes();
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    };

    return (
        <div ref={containerRef} />
    );
};

export default SimpleMarchingCubes;
