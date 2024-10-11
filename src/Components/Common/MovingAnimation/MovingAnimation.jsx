import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { MarchingCubes } from 'three/examples/jsm/objects/MarchingCubes.js';
import './MovingAnimation.css';

const SimpleMarchingCubes = () => {
    const containerRef = useRef(null);
    let camera, scene, renderer, effect;
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
        effect = new MarchingCubes(resolution, new THREE.MeshStandardMaterial({ color: 0x9c0000 }), true, true, 100000);
        effect.position.set(0, 0, 0);
        effect.scale.set(350, 350, 350);
        scene.add(effect);

        // Renderer
        renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        // Controls
        new OrbitControls(camera, renderer.domElement);
    };

    const onWindowResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const updateCubes = () => {
        effect.reset();
        const numBlobs = 10;
        const strength = 1.2;

        for (let i = 0; i < numBlobs; i++) {
            const ballx = Math.sin(i + 1.26 * time) * 0.27 + 0.5;
            const bally = Math.abs(Math.cos(i + 1.12 * time)) * 0.77;
            const ballz = Math.cos(i + 1.32 * time * 0.1) * 0.27 + 0.5;
            effect.addBall(ballx, bally, ballz, strength, 12);
        }

        effect.update();
    };

    const animate = () => {
        time += clock.getDelta() * 0.5;
        updateCubes();
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    };

    return (
        <div ref={containerRef} className="w-[80%] h-[83vh] relative animation" /> // Set width to 80% and height to 70% of viewport height
    );
};

export default SimpleMarchingCubes;
