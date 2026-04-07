'use client';

import { useEffect, useRef, useState } from 'react';
import type * as THREE_NS from 'three';

interface PlatformModel {
  name: string;
  color: number;
  position: [number, number, number];
}

const platformModels: PlatformModel[] = [
  { name: 'WordPress', color: 0x2196F3, position: [-2.5, 0, 0] },
  { name: 'AWS SDK', color: 0xFF9900, position: [-0.8, 0, 0] },
  { name: 'Android DIBZ', color: 0x00BCD4, position: [0.8, 0, 0] },
  { name: 'Brave Browser', color: 0xFF5722, position: [2.5, 0, 0] },
  { name: 'HackerOne', color: 0x4CAF50, position: [-1.5, -1.8, 0] },
  { name: 'Professional', color: 0x9C27B0, position: [1.5, -1.8, 0] },
];

export default function PlatformModels3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const rendererRef = useRef<THREE_NS.WebGLRenderer | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setIsVisible(entries[0].isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    if (rendererRef.current) return;

    let animId: number;
    let disposed = false;

    import('three').then((THREE) => {
      if (disposed || !containerRef.current) return;

      const container = containerRef.current;
      const w = container.clientWidth;
      const h = container.clientHeight;

      const scene = new THREE.Scene();

      const aspect = w / h;
      const frustum = 4;
      const camera = new THREE.OrthographicCamera(
        -frustum * aspect, frustum * aspect,
        frustum, -frustum,
        0.1, 100
      );
      camera.position.set(0, 2, 5);
      camera.lookAt(0, -0.5, 0);

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      scene.add(new THREE.AmbientLight(0xffffff, 0.4));
      const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
      dirLight.position.set(2, 4, 3);
      scene.add(dirLight);

      const meshes: THREE_NS.Mesh[] = [];

      platformModels.forEach((pm) => {
        let geometry: THREE_NS.BufferGeometry;
        const material = new THREE.MeshStandardMaterial({
          color: pm.color,
          emissive: pm.color,
          emissiveIntensity: 0.3,
          metalness: 0.2,
          roughness: 0.6,
          transparent: true,
          opacity: 0.85,
        });

        switch (pm.name) {
          case 'WordPress': {
            geometry = new THREE.BoxGeometry(0.4, 0.4, 0.1);
            break;
          }
          case 'AWS SDK': {
            geometry = new THREE.IcosahedronGeometry(0.25, 1);
            material.emissiveIntensity = 0.4;
            break;
          }
          case 'Android DIBZ': {
            geometry = new THREE.BoxGeometry(0.3, 0.55, 0.04);
            material.emissiveIntensity = 0.35;
            break;
          }
          case 'Brave Browser': {
            geometry = new THREE.BoxGeometry(0.6, 0.4, 0.03);
            break;
          }
          case 'HackerOne': {
            geometry = new THREE.IcosahedronGeometry(0.22, 1);
            material.wireframe = true;
            material.emissiveIntensity = 0.5;
            break;
          }
          case 'Professional': {
            geometry = new THREE.BoxGeometry(0.45, 0.3, 0.15);
            break;
          }
          default:
            geometry = new THREE.BoxGeometry(0.3, 0.3, 0.1);
        }

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(...pm.position);
        scene.add(mesh);
        meshes.push(mesh);
      });

      let frame = 0;
      function animate() {
        if (disposed) return;
        frame++;
        meshes.forEach((mesh, i) => {
          mesh.rotation.y += 0.005;
          mesh.rotation.x += 0.002;
          mesh.position.y = platformModels[i].position[1] + Math.sin(frame * 0.02 + i * 1.5) * 0.1;
        });
        renderer.render(scene, camera);
        animId = requestAnimationFrame(animate);
      }
      animate();
    });

    return () => {
      disposed = true;
      if (animId) cancelAnimationFrame(animId);
      if (rendererRef.current && containerRef.current) {
        const r = rendererRef.current;
        if (containerRef.current.contains(r.domElement)) {
          containerRef.current.removeChild(r.domElement);
        }
        r.dispose();
        rendererRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full pointer-events-none"
      style={{
        height: '180px',
        position: 'relative',
        marginBottom: '-20px',
        opacity: 0.75,
      }}
    />
  );
}
