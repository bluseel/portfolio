import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';
import styles from './sphere.module.css';

const Sphere = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Scene
    const scene = new THREE.Scene();
    scene.background = null



    // Sphere
    const geometry = new THREE.SphereGeometry(3, 64, 64);
    const material = new THREE.MeshStandardMaterial({
      color: '#FFFF3F',
      roughness: 0.5,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Sizes
    const sizes = {
      width: window.innerWidth*0.2,
      height: window.innerHeight*0.5,
    };

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
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
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
      sizes.width = window.innerWidth*0.2;
      sizes.height = window.innerHeight*0.5;
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

    // Mouse Animation Color
    let mouseDown = false;
    let rgb = [];
    window.addEventListener('mousedown', () => { mouseDown = true });
    window.addEventListener('mouseup', () => { mouseDown = false });

    window.addEventListener('mousemove', (e) => {
      if (mouseDown) {
        rgb = [
          Math.round((e.pageX / window.innerWidth) * 255 * Math.random()),
          Math.round((e.pageY / window.innerHeight) * 255 * Math.random()),
          150,
        ];
        const newColor = new THREE.Color(`rgb(${rgb.join(',')})`);
        gsap.to(mesh.material.color, {
          r: newColor.r,
          g: newColor.g,
          b: newColor.b,
        });
      }
    });

    // Clean up event listeners on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousedown', () => { mouseDown = true });
      window.removeEventListener('mouseup', () => { mouseDown = false });
      window.removeEventListener('mousemove', (e) => {
        if (mouseDown) {
          rgb = [
            Math.round((e.pageX / sizes.width) * 255),
            Math.round((e.pageY / sizes.height) * 255),
            150,
          ];
          const newColor = new THREE.Color(`rgb(${rgb.join(',')})`);
          gsap.to(mesh.material.color, {
            r: newColor.r,
            g: newColor.g,
            b: newColor.b,
          });
        }
      });
    };
  }, []);

  return (
    <div className={styles.sphereContainer}>
      <canvas ref={canvasRef} className={styles.webgl}></canvas>
      <div className={styles.title}>SPIN ME!</div>
    </div>
  );
};

export default Sphere;
