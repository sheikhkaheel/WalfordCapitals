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
        effect.scale.set(400, 400, 400); // Increased scale for larger effect
        scene.add(effect);

        // Renderer
        renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth / 1.65, window.innerHeight); // 50% of the width
        container.appendChild(renderer.domElement);

        // Controls
        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableRotate = true; 
        controls.enablePan = true; 
        controls.enableZoom = false; 
        updateControls();
    };

    const updateControls = () => {
        const isMobile = window.innerWidth < 700;
        controls.enableRotate = !isMobile; 
        controls.enablePan = !isMobile;

        if (isMobile) {
            effect.scale.set(250, 250, 250); // Adjust for mobile
        } else {
            effect.scale.set(400, 400, 400); // Increased scale for larger effect
        }
    };

    const onWindowResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth/ 1.65 , window.innerHeight);
        updateControls(); 
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
        time += clock.getDelta(); 

        effect.rotation.y += 0.01; 

        updateCubes();
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    };

    return (
        <div
            ref={containerRef}
            className='flex justify-center mt-8 lg:mt-1 h-[43vh] lg:h-[83vh] lg:relative lg:top-0 items-center' // Increased height
        />
    );
};

export default SimpleMarchingCubes;
