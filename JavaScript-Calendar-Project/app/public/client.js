import * as THREE from "./threejs/three.module.js";
import { OrbitControls } from "./threejs/OrbitControls.js";
//import Stats from "/jsm/libs/stats.module.js";
import { EffectComposer } from "./threejs/EffectComposer.js";
import { RenderPass } from "./threejs/RenderPass.js";
import { ShaderPass } from "./threejs/ShaderPass.js";
import { BloomPass } from "./threejs/BloomPass.js";
import { LuminosityShader } from "./threejs/shaders/LuminosityShader.js";

// Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const loader = new THREE.TextureLoader();
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
  antialias: true,
  powerPreference: "high-performance",
  stencil: false,
  depth: false,
});
const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
const luminosityPass = new ShaderPass(LuminosityShader);
const bloomPass = new BloomPass();

// Torus
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);

// Lights
const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(5, 5, 5);
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);

// Geometry
const geometry_2 = new THREE.SphereGeometry(0.25, 24, 24);
const material_2 = new THREE.MeshStandardMaterial({ color: 0xffffff });

// Background
const spaceTexture = loader.load("space.jpg");
scene.background = spaceTexture;

// Avatar
const hbatTexture = loader.load("hbat.png");
const hbat = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: hbatTexture })
);

// Moon
const moonTexture = loader.load("moon.jpg");
const normalTexture = loader.load("normal.jpg");
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

// Helpers
//const lightHelper = new THREE.PointLightHelper(pointLight)
//const gridHelper = new THREE.GridHelper(200, 50);

//const controls = new OrbitControls(camera, renderer.domElement);

function init() {
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  composer.addPass(renderPass);
  /* composer.addPass(bloomPass);
  composer.renderToScreen = true; */

  //composer.addPass(luminosityPass);

  camera.position.setZ(30);
  camera.position.setX(-3);

  moon.position.z = 30;
  moon.position.setX(-10);

  hbat.position.z = -5;
  hbat.position.x = 2;

  //scene.add(lightHelper, gridHelper);
  scene.add(pointLight, ambientLight, torus, moon, hbat);
  Array(200).fill().forEach(addStar);
  document.body.onscroll = moveCamera;
  moveCamera();
  animate();
}

function addStar() {
  const star = new THREE.Mesh(geometry_2, material_2);
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

// Scroll Animation
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  hbat.rotation.y += 0.01;
  hbat.rotation.z += 0.01;

  /* moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05; */

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  composer.render();

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  moon.rotation.x += 0.005;

  //controls.update();

  //renderer.render(scene, camera);
}

init();
