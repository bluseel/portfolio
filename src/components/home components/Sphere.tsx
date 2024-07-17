import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';
import styles from './sphere.module.css';

const Sphere = () => {
  const width = window.innerWidth;
  const isMobile = width <= 768;

  const canvasRef = useRef<HTMLCanvasElement>(null);


  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene
    const scene = new THREE.Scene();
    scene.background = null; // Ensure background is transparent

    // Sphere Geometry
    let geometry = new THREE.SphereGeometry(3, 64, 64); // Default size for desktop
    if (isMobile) {
      geometry = new THREE.SphereGeometry(3, 64, 64); // Sphere size (inside canvas)
    }

    const material = new THREE.MeshStandardMaterial({
      color: '#FFFF3F',
      roughness: 0.5,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Renderer Sizes
    let sizes = {
      width: window.innerWidth * 0.2,
      height: window.innerHeight * 0.5,
    };
    if (isMobile) {
      sizes = {
        width: window.innerWidth * 0.8, // Adjust width for mobile as needed (canvas size)
        height: window.innerHeight * 0.4, // Adjust height for mobile as needed
      };
    }

    // Light
    const light = new THREE.PointLight(0xffffff, 15, 10);
    light.position.set(0, 4, 5);
    light.intensity = 10;
    scene.add(light);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      20,
      sizes.width / sizes.height,
      0.1,
      100
    );
    camera.position.z = 20;
    scene.add(camera);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true }); // Alpha true for transparency
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(2);
    renderer.render(scene, camera);

    // Controls
    const controls = new OrbitControls(camera, canvasRef.current);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 5;

    // Resize
    const handleResize = () => {
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    const loop = () => {
      controls.update();
      renderer.render(scene, camera);
      window.requestAnimationFrame(loop);
    };
    loop();

    // GSAP Timeline
    const tl = gsap.timeline({ defaults: { duration: 1 } });
    tl.fromTo(mesh.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 });
    tl.fromTo(`.${styles.title}`, { opacity: 0 }, { opacity: 1 });


    // Clean up event listeners on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);

  return ( 
    <div className={styles.sphereContainer}>
      <canvas ref={canvasRef} className={styles.webgl}></canvas>
      <div className={styles.title}>SPIN ME!</div>
    </div>
  );
};

export default Sphere;
