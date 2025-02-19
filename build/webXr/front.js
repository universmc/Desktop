const frontCamera = document.getElementById('frontCamera');
const backCamera = document.getElementById('backCamera');
const switchCameraButton = document.getElementById('switchCamera');
let currentCamera = 'back'; // Variable pour suivre la caméra активна

// Fonction pour obtenir le flux vidéo d'une caméra spécifique
async function getCameraStream(facingMode) {
  const constraints = {
    video: { facingMode: facingMode }, // Spécifie la caméra (frontale ou arrière)
    audio: false,
  };
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    return stream;
  } catch (error) {
    console.error('Erreur lors de l\'accès à la caméra :', error);
  }
}

// Fonction pour afficher une caméra et masquer l'autre
function showCamera(camera) {
  if (camera === 'front') {
    frontCamera.style.display = 'block';
    backCamera.style.display = 'none';
    switchCameraButton.textContent = 'Basculer vers la caméra arrière';
  } else {
    frontCamera.style.display = 'none';
    backCamera.style.display = 'block';
    switchCameraButton.textContent = 'Basculer vers la caméra frontale';
  }
  currentCamera = camera;
}

// Fonction pour initialiser les caméras
async function initCameras() {
  try {
    const backStream = await getCameraStream('environment'); // Caméra arrière
    backCamera.srcObject = backStream;

    const frontStream = await getCameraStream('user'); // Caméra frontale
    frontCamera.srcObject = frontStream;
  } catch (error) {
    console.error('Erreur lors de l\'initialisation des caméras :', error);
  }
}

// Gestion du bouton de commutation de caméra
switchCameraButton.addEventListener('click', () => {
  if (currentCamera === 'back') {
    showCamera('front');
  } else {
    showCamera('back');
  }
});

// Initialisation des caméras au chargement de la page
initCameras();