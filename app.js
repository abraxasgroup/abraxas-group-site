// Abraxas Enhanced 3D hero and interactivity
// This script powers the cosmic hero section on the Abraxas website.
// It loads a GLB model, adds lighting and a neon ring and animates the scene
// in response to scroll. It also sets up tilt interactions on cards and
// handles the floating WhatsApp button and modal behaviour.

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.161.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/loaders/GLTFLoader.js";
import { gsap } from "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";
import { ScrollTrigger } from "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js";

// Select the canvas from the DOM. It is defined in index.html via the <canvas class="webgl"></canvas> element
const canvas = document.querySelector('canvas.webgl');
// Configure WebGL renderer with antialiasing and transparency
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.setSize(window.innerWidth, window.innerHeight);

// Create a new scene
const scene = new THREE.Scene();

// Set the cosmic background image on the body (defined in style.css)
document.body.style.backgroundImage = "url('./images/bg_universe.webp')";
document.body.style.backgroundSize = "cover";
document.body.style.backgroundAttachment = "fixed";
document.body.style.backgroundPosition = "center";

// Configure the camera
const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 1.4, 2.2);
scene.add(camera);

// Lighting setup: hemisphere for ambient, a spot light as key and a rim light for accent
const hemi = new THREE.HemisphereLight(0x88bbff, 0x202020, 0.6);
scene.add(hemi);
const key = new THREE.SpotLight(0xffffff, 3, 20, Math.PI / 6, 0.4, 1);
key.position.set(2.5, 3.5, 2);
scene.add(key);
const rim = new THREE.PointLight(0x2555FD, 1.5, 10, 2);
rim.position.set(-2, 1.4, -1.5);
scene.add(rim);

// Create a group that will contain our 3D model and ring
const group = new THREE.Group();
scene.add(group);

// Add a neon ring around the model
const ringGeometry = new THREE.TorusGeometry(0.8, 0.02, 8, 64);
const ringMaterial = new THREE.MeshBasicMaterial({
  color: 0x00ffa0,
  wireframe: true,
  transparent: true,
  opacity: 0.5
});
const ring = new THREE.Mesh(ringGeometry, ringMaterial);
ring.rotation.x = Math.PI / 2;
group.add(ring);

// Load the Abraxas statue model from GLB
const loader = new GLTFLoader();
loader.load("./models/base.glb", (gltf) => {
  const mesh = gltf.scene;
  // Disable shadows for performance in this static environment
  mesh.traverse((obj) => {
    if (obj.isMesh) {
      obj.castShadow = false;
      obj.receiveShadow = false;
    }
  });
  mesh.scale.set(1, 1, 1);
  mesh.position.set(0, -0.2, 0);
  group.add(mesh);
}, undefined, (error) => {
  console.warn("Error loading GLB:", error);
});

// Handle responsive resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Register GSAP scroll plugin
gsap.registerPlugin(ScrollTrigger);
// Rotate the model group as the user scrolls
gsap.to(group.rotation, {
  y: "+=1.8",
  ease: "none",
  scrollTrigger: {
    trigger: document.body,
    start: "top top",
    end: "bottom bottom",
    scrub: 1
  }
});
// Move the camera slightly during scroll for parallax depth
gsap.to(camera.position, {
  z: 2.8,
  y: 1.1,
  ease: "none",
  scrollTrigger: {
    trigger: document.body,
    start: "top top",
    end: "bottom 80%",
    scrub: 1
  }
});

// Initialize VanillaTilt on any elements with data-tilt attribute (cards)
document.querySelectorAll('[data-tilt]').forEach(el => {
  if (window.VanillaTilt) {
    window.VanillaTilt.init(el, {
      max: 12,
      speed: 400,
      glare: true,
      "max-glare": 0.2
    });
  }
});

// WhatsApp floating button and contact modal interaction
const fab = document.getElementById('wbFab');
const modal = document.getElementById('wbModal');
const closeBtn = document.getElementById('wbClose');
// When the floating button is clicked, open modal
fab?.addEventListener('click', () => {
  if (modal) modal.style.display = 'flex';
});
// Close the modal when clicking the close button
closeBtn?.addEventListener('click', () => {
  if (modal) modal.style.display = 'none';
});
// Close modal when clicking outside the panel
modal?.addEventListener('click', (e) => {
  if (e.target === modal) modal.style.display = 'none';
});

// Animation loop: spin the ring slowly and render the scene
const animate = () => {
  ring.rotation.z += 0.003;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};
animate();