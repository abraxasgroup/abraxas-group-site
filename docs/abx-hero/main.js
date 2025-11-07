import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

// Canvas & sizes
const canvas = document.querySelector('.webgl');
const sizes = { width: window.innerWidth, height: window.innerHeight };

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(70, sizes.width / sizes.height, 0.1, 100);
camera.position.set(0, 1.6, 2.2);
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
renderer.outputColorSpace = THREE.SRGBColorSpace;

// Lights
const ambient = new THREE.AmbientLight(0x5575ff, 0.5);
scene.add(ambient);

const rim = new THREE.PointLight(0xffffff, 18, 4, 2);
rim.position.set(1.2, 1.6, 1.2);
scene.add(rim);

const key = new THREE.SpotLight(0xffffff, 14, 30, Math.PI/6, 0.4, 1.2);
key.position.set(-2, 3.2, 3);
scene.add(key);

// Torus glow
const torusGeom = new THREE.TorusGeometry(0.28, 0.045, 16, 80);
const torusMat  = new THREE.MeshStandardMaterial({ color: 0x2af598, emissive: 0x2af598, emissiveIntensity: 2, metalness: 0.2, roughness: 0.3 });
const torus = new THREE.Mesh(torusGeom, torusMat);
torus.position.set(0, 1.65, -0.25);
scene.add(torus);

// Postprocessing
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
const bloom = new UnrealBloomPass(new THREE.Vector2(sizes.width, sizes.height), 0.9, 0.9, 0.0);
composer.addPass(bloom);

// Loader
const preloader = document.getElementById('preloader');
const gltfLoader = new GLTFLoader();
gltfLoader.load(
  'models/base.glb',
  (gltf) => {
    const root = gltf.scene;
    root.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
    root.position.set(0, 0.2, -0.4);
    root.scale.set(1,1,1);
    scene.add(root);
    // hide loader
    if (preloader) { preloader.style.display = 'none'; }
  },
  undefined,
  (err) => {
    console.error('Error cargando GLB:', err);
    if (preloader) { preloader.innerHTML = '<p style=\"color:#ff9b9b\">No pudimos cargar el modelo 3D.</p>'; }
  }
);

// Resize
function onResize(){
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
  composer.setSize(sizes.width, sizes.height);
}
window.addEventListener('resize', onResize);

// Loop
let t = 0;
function tick(){
  t += 0.01;
  torus.rotation.x = Math.sin(t)*0.2;
  torus.rotation.y += 0.01;
  composer.render();
  requestAnimationFrame(tick);
}
tick();
