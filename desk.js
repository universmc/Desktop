const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

function surveillerRepertoire(repertoire, repertoireDestination) {
  fs.watch(repertoire, (eventType, filename) => {
    if (eventType === 'rename') {
      const nouveauFichier = path.join(repertoire, filename);
      fs.access(nouveauFichier, fs.constants.F_OK, (err) => {
        if (!err) {
          if (filename.toLowerCase().endsWith('.png') || filename.toLowerCase().endsWith('.jpg')) {
            const nouveauNom = `Desktop_capture_${Date.now()}${Math.floor(Math.random() * 1000)}.png`;
            const destination = path.join(repertoireDestination, nouveauNom);

            // Copier le fichier
            fs.copyFile(nouveauFichier, destination, (err) => {
              if (err) {
                console.error(`Erreur lors de la copie de la capture d'écran : ${err}`);
              } else {
                console.log(`Capture d'écran copiée et renommée : ${nouveauNom}`);
                envoyerInfoGroq(nouveauNom);

                // Supprimer le fichier d'origine
                fs.unlink(nouveauFichier, (err) => {
                  if (err) {
                    console.error(`Erreur lors de la suppression du fichier d'origine : ${err}`);
                  } else {
                    console.log(`Fichier d'origine supprimé : ${filename}`);
                  }
                });
              }
            });
          }
        }
      });
    }
  });

  console.log(`Surveillance du répertoire : ${repertoire}`);
}
function envoyerInfoGroq(filename) {
    const destination = '/Volumes/devOps/api/build/desktop/';
    const fullFilePath = destination + filename;
    exec(`node groq-utils.js "${fullFilePath}"`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Erreur lors de l'exécution de groq-utils.js : ${error}`);
        return;
      }
      console.log(`Sortie de groq-utils.js : ${stdout}`);
    });
  }

const repertoireSource = '/Users/univers/Desktop/';
const repertoireDestination = '/Volumes/devOps/api/build/desktop';

surveillerRepertoire(repertoireSource, repertoireDestination);