import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const AnimatedBackground = () => {
	const mountRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// Scene setup
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			0.1,
			1000
		);
		const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		const mountNode = mountRef.current;
		if (mountNode) {
			mountNode.appendChild(renderer.domElement);
		}

		// Camera position
		camera.position.z = 30;

		// Create particles
		const particlesGeometry = new THREE.BufferGeometry();
		const particlesCount = 2000;

		const posArray = new Float32Array(particlesCount * 3);

		for (let i = 0; i < particlesCount * 3; i++) {
			posArray[i] = (Math.random() - 0.5) * 50;
		}

		particlesGeometry.setAttribute(
			"position",
			new THREE.BufferAttribute(posArray, 3)
		);

		const textureLoader = new THREE.TextureLoader();
		const sprite = textureLoader.load("/Particle.png"); // Pfad zu deinem Partikelbild

		// Material
		const particlesMaterial = new THREE.PointsMaterial({
			size: 0.1,
			map: sprite,
			color: "#000000", // Hauptfarbe der Partikel
			transparent: true,
			depthWrite: false, // Verhindert, dass Partikel die Tiefe beeinflussen
			opacity: 0.8,
			blending: THREE.AdditiveBlending // Für einen leuchtenden Effekt
		});

		// Mesh
		const particlesMesh = new THREE.Points(
			particlesGeometry,
			particlesMaterial
		);
		scene.add(particlesMesh);

		// Handle resize
		const handleResize = () => {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		};

		window.addEventListener("resize", handleResize);

		// Animation
		const animate = () => {
			requestAnimationFrame(animate);

			particlesMesh.rotation.x += 0.0002;
			particlesMesh.rotation.y += 0.0002;

			renderer.render(scene, camera);
		};

		animate();

		// Cleanup
		return () => {
			if (mountNode) {
				mountNode.removeChild(renderer.domElement);
			}
		};
	}, []);

	return <div ref={mountRef} className="fixed top-0 left-0 w-full h-full " />;
};

export default AnimatedBackground;
