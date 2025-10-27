import "./style.css";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

let camera, scene, renderer, cube, pyramid, pentagon, animatedGroup, allObjects;

init();

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshPhongMaterial({ color: 0x00ff00 })
  );

  pyramid = new THREE.Mesh(
    new THREE.ConeGeometry(0.5, 1, 4),
    new THREE.MeshPhongMaterial({ color: 0xff0000 })
  );
  pyramid.position.y = -1;

  pentagon = new THREE.Mesh(
    new THREE.CylinderGeometry(0.5, 0.5, 0.5, 5),
    new THREE.MeshPhongMaterial({ color: 0x0000ff })
  );
  pentagon.position.x = 1.5;

  animatedGroup = new THREE.Group();
  animatedGroup.add(cube);
  animatedGroup.add(pyramid);
  allObjects = new THREE.Group();
  allObjects.add(animatedGroup);
  allObjects.add(pentagon);
  scene.add(allObjects);

  // Lights
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 10, 7.5);
  scene.add(directionalLight);

  const ambientLight = new THREE.AmbientLight(0x404040, 2);
  scene.add(ambientLight);

  const spotLight = new THREE.SpotLight(0xffffff, 10, 30, 0, Math.PI / 10, 0.5);
  spotLight.position.set(1.5, 1, 0);
  scene.add(spotLight);

  // Axes Helper
  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  // Orbital Controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.listenToKeyEvents(window);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

  controls.screenSpacePanning = false;

  controls.minDistance = 1;
  controls.maxDistance = 100;

  camera.position.z = 5;

  controls.maxPolarAngle = Math.PI / 2;

  window.addEventListener("resize", onWindowResize);
}

function animate() {
  // cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  pyramid.rotation.y -= 0.1;
  animatedGroup.rotation.x += 0.005;
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}
