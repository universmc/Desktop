navigator.mediaDevices.getUserMedia({ video: true })
  .then(function(stream) {
    const video = document.getElementById('video'); // Élément <video> dans votre HTML
    video.srcObject = stream;
    video.play();
  })
  .catch(function(error) {
    console.error('Erreur lors de l\'accès à la caméra :', error);
  });