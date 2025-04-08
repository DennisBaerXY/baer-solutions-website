"use client";
import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const MonitorModel: React.FC = () => {
	const mountRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!mountRef.current) return;

		// Scene setup
		const scene = new THREE.Scene();

		// Size for responsiveness
		const sizes = {
			width: mountRef.current.clientWidth,
			height: mountRef.current.clientHeight
		};

		// Camera setup
		const camera = new THREE.PerspectiveCamera(
			45,
			sizes.width / sizes.height,
			0.1,
			100
		);
		camera.position.z = 2;
		scene.add(camera);

		// Renderer with transparency
		const renderer = new THREE.WebGLRenderer({
			antialias: true,
			alpha: true
		});
		renderer.setSize(sizes.width, sizes.height);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		mountRef.current.appendChild(renderer.domElement);

		// Create noise texture for the screen
		function createNoiseTexture(): THREE.DataTexture {
			const size = 256;
			const data = new Uint8Array(size * size * 4); // RGBA format (4 components)

			for (let i = 0; i < size * size; i++) {
				const stride = i * 4;
				const value = Math.floor(Math.random() * 50); // Subtle noise
				data[stride] = value + 20; // R
				data[stride + 1] = value + 40; // G
				data[stride + 2] = value + 150; // B (more blue for a tech look)
				data[stride + 3] = 255; // A (fully opaque)
			}

			// Create the texture with the right format
			const texture = new THREE.DataTexture(
				data,
				size,
				size,
				THREE.RGBAFormat, // Use RGBA format
				THREE.UnsignedByteType
			);
			texture.needsUpdate = true;
			return texture;
		}

		// Update noise texture for animation
		function updateNoiseTexture(texture: THREE.DataTexture): void {
			const size = 256;
			const data = texture.image.data as Uint8Array;

			for (let i = 0; i < size * size; i++) {
				const stride = i * 4; // 4 components for RGBA
				const value = Math.floor(Math.random() * 40);
				data[stride] = value + 20; // R
				data[stride + 1] = value + 40; // G
				data[stride + 2] = value + 150; // B
				// Alpha stays at 255 (fully opaque)
			}

			texture.needsUpdate = true;
		}

		// Create monitor model
		const createMonitor = () => {
			// Monitor body
			const monitorGroup = new THREE.Group();

			// Monitor frame
			const frameGeometry = new THREE.BoxGeometry(1, 0.7, 0.05);
			const frameMaterial = new THREE.MeshPhongMaterial({
				color: 0x333333,
				shininess: 30
			});
			const frame = new THREE.Mesh(frameGeometry, frameMaterial);

			// Monitor screen
			const screenGeometry = new THREE.PlaneGeometry(0.9, 0.6);
			const noiseTexture = createNoiseTexture();

			// Use MeshBasicMaterial instead of MeshStandardMaterial for better texture visibility
			const screenMaterial = new THREE.MeshStandardMaterial({
				map: noiseTexture,
				emissive: 0x0000ff,
				emissiveIntensity: 0.2
			});

			const screen = new THREE.Mesh(screenGeometry, screenMaterial);
			screen.position.z = 0.03;

			// Stand
			const standGeometry = new THREE.BoxGeometry(0.1, 0.3, 0.05);
			const stand = new THREE.Mesh(standGeometry, frameMaterial);
			stand.position.y = -0.45;

			// Base
			const baseGeometry = new THREE.BoxGeometry(0.3, 0.05, 0.2);
			const base = new THREE.Mesh(baseGeometry, frameMaterial);
			base.position.y = -0.6;

			// Add all parts to the monitor group
			monitorGroup.add(frame);
			monitorGroup.add(screen);
			monitorGroup.add(stand);
			monitorGroup.add(base);

			// Set initial rotation

			monitorGroup.rotation.y = -Math.PI / 8;

			scene.add(monitorGroup);

			return { monitorGroup, screen, noiseTexture };
		};

		// Add ambient light
		const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
		scene.add(ambientLight);

		// Add directional light
		const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
		directionalLight.position.set(1, 1, 1);
		scene.add(directionalLight);

		// Create the monitor and get relevant parts
		const { noiseTexture } = createMonitor();

		// Animation variables
		let noiseUpdateCounter = 0;
		let animationFrameId: number;

		// Animation loop
		const animate = () => {
			// Update noise every few frames for performance
			noiseUpdateCounter++;
			if (noiseUpdateCounter > 15) {
				updateNoiseTexture(noiseTexture);
				noiseUpdateCounter = 0;
			}

			renderer.render(scene, camera);
			animationFrameId = window.requestAnimationFrame(animate);
		};

		animate();

		// Handle window resizing
		const handleResize = () => {
			if (!mountRef.current) return;

			sizes.width = mountRef.current.clientWidth;
			sizes.height = mountRef.current.clientHeight;

			camera.aspect = sizes.width / sizes.height;
			camera.updateProjectionMatrix();

			renderer.setSize(sizes.width, sizes.height);
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		};

		window.addEventListener("resize", handleResize);

		// Clean up
		return () => {
			window.removeEventListener("resize", handleResize);
			if (animationFrameId) {
				window.cancelAnimationFrame(animationFrameId);
			}

			if (mountRef.current && renderer.domElement) {
				mountRef.current.removeChild(renderer.domElement);
			}

			scene.traverse((object) => {
				if (object instanceof THREE.Mesh) {
					object.geometry.dispose();

					if (object.material instanceof THREE.Material) {
						if ("map" in object.material && object.material.map) {
							if (object.material.map instanceof THREE.Texture) {
								object.material.map.dispose();
							}
						}
						object.material.dispose();
					} else if (Array.isArray(object.material)) {
						object.material.forEach((material) => material.dispose());
					}
				}
			});

			renderer.dispose();
		};
	}, []);

	return <div ref={mountRef} className="h-full w-full" aria-hidden="true" />;
};

export default MonitorModel;
