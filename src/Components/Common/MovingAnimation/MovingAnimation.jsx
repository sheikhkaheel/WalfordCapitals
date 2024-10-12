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
        new OrbitControls(camera, renderer.domElement);
    };

    const onWindowResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const getColor = (time) => {
        // Define blue shades
        const blueVariants = [
            new THREE.Color(0x0000ff), // Blue
            new THREE.Color(0x3399ff), // Light Blue
            new THREE.Color(0x66ccff), // Medium Light Blue
            new THREE.Color(0x0099cc), // Medium Blue
            new THREE.Color(0x003366), // Dark Blue
        ];

        // Determine the current and next index for interpolation
        const index = Math.floor((time * 0.1) % blueVariants.length);
        const nextIndex = (index + 1) % blueVariants.length;

        // Get the current and next colors
        const currentColor = blueVariants[index];
        const nextColor = blueVariants[nextIndex];

        // Calculate the interpolation factor
        const alpha = (time * 0.1) % 1; // Fractional part for smooth transition

        // Interpolate between current and next color
        const color = currentColor.clone().lerp(nextColor, alpha);
        return color;
    };

    const updateCubes = () => {
        effect.reset();
        const numBlobs = 10;
        const strength = 1.2;

        for (let i = 0; i < numBlobs; i++) {
            // Reduce the multipliers in the position calculations for slower movement
            const ballx = Math.sin(i + 0.5 * time) * 0.27 + 0.5; // Slower x movement
            const bally = Math.abs(Math.cos(i + 0.5 * time)) * 0.77; // Slower y movement
            const ballz = Math.cos(i + 0.5 * time * 0.1) * 0.27 + 0.5; // Slower z movement

            // Get color that changes smoothly to blue variants
            const color = getColor(time);
            effect.addBall(ballx, bally, ballz, strength, 12); // Add ball without material

            // Update color of the marching cubes effect based on time
            effect.material.color.set(color);
        }

        effect.update();
    };

    const animate = () => {
        time += clock.getDelta(); // Increment time
        updateCubes();
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    };

    return (
        <div ref={containerRef} className="h-[87vh] absolute animation" />
    );
};

export default SimpleMarchingCubes;
