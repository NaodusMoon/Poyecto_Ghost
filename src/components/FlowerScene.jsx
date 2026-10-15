import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function FlowerScene() {
  const mount = useRef(null);
  useEffect(() => {
    const host = mount.current;
    let renderer;
    try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }); } catch { return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    host.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, .1, 100); camera.position.z = 9;
    scene.add(new THREE.AmbientLight(0xffffff, 2));
    const light = new THREE.DirectionalLight(0xffffff, 4); light.position.set(3, 5, 6); scene.add(light);
    const flower = new THREE.Group(); scene.add(flower);
    const petalGeo = new THREE.SphereGeometry(.68, 32, 24);
    const petalMat = new THREE.MeshStandardMaterial({ color: '#e8ec9a', roughness: .28, metalness: .08 });
    for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; const petal = new THREE.Mesh(petalGeo, petalMat); petal.position.set(Math.cos(a) * 1.1, Math.sin(a) * 1.1, 0); petal.scale.set(1.05, .58, .35); petal.rotation.z = a; flower.add(petal); }
    const centerGeo = new THREE.SphereGeometry(.57, 32, 24);
    const centerMat = new THREE.MeshStandardMaterial({ color: '#c6a356', roughness: .4 });
    const center = new THREE.Mesh(centerGeo, centerMat); center.scale.z = .55; center.position.z = .2; flower.add(center);
    let target = 0; const onMove = e => { target = (e.clientX / window.innerWidth - .5) * .7; };
    window.addEventListener('pointermove', onMove);
    const resize = () => { const { width, height } = host.getBoundingClientRect(); renderer.setSize(width, height); camera.aspect = width / height; camera.updateProjectionMatrix(); };
    const observer = new ResizeObserver(resize); observer.observe(host); resize();
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame; const animate = t => { flower.rotation.z = reduced ? .2 : Math.sin(t * .00035) * .2; flower.rotation.y += (target - flower.rotation.y) * .035; renderer.render(scene, camera); frame = requestAnimationFrame(animate); }; frame = requestAnimationFrame(animate);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener('pointermove', onMove); petalGeo.dispose(); centerGeo.dispose(); petalMat.dispose(); centerMat.dispose(); renderer.dispose(); renderer.domElement.remove(); };
  }, []);
  return <div className="flower-scene" ref={mount} aria-label="Flor tridimensional interactiva"><span className="flower-fallback">✿</span></div>;
}

