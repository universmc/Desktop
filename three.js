// Initialisation de la scène Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Activation de WebXR
navigator.xr.requestSession('immersive-ar').then(session => {
  renderer.xr.setSession(session);

  // Boucle de rendu
  function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  animate();
});

// Chargement des modèles 3D (ordinateur, tablette, etc.)
const loader = new THREE.GLTFLoader();
loader.load('ordinateur.glb', (gltf) => {
  const ordinateur = gltf.scene;
  scene.add(ordinateur);
});

// ... Code pour le placement des objets et les interactions ...