import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { ArcballControls } from "three/addons/controls/ArcballControls.js";

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.filmOffset = 1;
//Keep the 3D object on a global variable so we can access it later
let object;

//Set which object to render
let objToRender = "eye";

const loader = new GLTFLoader();

//Set how far the camera will be from the 3D model
camera.position.z = objToRender === "dino" ? 500 : 500;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.minDistance = 0;
controls.maxDistance = 10;
controls.enableZoom = true;
controls.autoRotate = false;
controls.maxPolarAngle = 1.56550731330353;
controls.minPolarAngle = 0.63469453089671;
controls.maxDistance = 6.634204312890614;
//Add lights to the scene, so we can actually see the 3D model
const topLight = new THREE.DirectionalLight(0xffffff, 1); // (color, intensity)
topLight.position.set(500, 500, 500); //top-left-ish
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(
  0x333333,
  objToRender === "dino" ? 5 : 1
);
scene.add(ambientLight);

//Load the file
loader.load(
  `models/scene.glb`,
  function (gltf) {
    //If the file is loaded, add it to the scene
    object = gltf.scene;
    scene.add(object);
  },
  function (xhr) {
    //While it is loading, log the progress
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  function (error) {
    //If there is an error, log it
    console.error(error);
  }
);

function animate() {
  requestAnimationFrame(animate);
  console.log("getPolarAnglecontrols", controls.getPolarAngle());
  console.log("getPolarzoom", controls.getDistance());
  controls.update();
  renderer.render(scene, camera);
}

animate();
