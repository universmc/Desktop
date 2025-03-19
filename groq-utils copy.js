const fs = require('fs');
const base64 = require('base64-js');
const Groq = require('groq-sdk');

const DesktopCapture = new Groq();

const filename = process.argv[2];

if (filename) {
  const imagePath = filename;

  function encodeImage(imagePath) {
    const imageBuffer = fs.readFileSync(imagePath);
    return base64.fromByteArray(imageBuffer).toString('utf8');
  }

  const base64Image = encodeImage(imagePath);

  DesktopCapture.chat.completions.create({
    messages: [
      {
        role: 'user',
        content: [
          { type: 'text', text: 'Analyse de l image' },
          {
            type: 'image_url',
            image_url: {
              url: `data:image/jpeg;base64,${base64Image}`,
            },
          },
        ],
      },
    ],
    model: 'llama-3.2-11b-vision-preview',
  })
    .then((response) => {
      const analysisResult = response.choices[0].message.content;
      enregistrerResultatMarkdown(filename, analysisResult);
    })
    .catch((error) => {
      console.error(error);
    });
} else {
  console.error('Nom de fichier non fourni.');
}

function enregistrerResultatMarkdown(filename, analysisResult) {
  const now = new Date();
  const dateString = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;
  const markdownFilename = `analyse_${dateString}.md`;

  const markdownContent = `# Analyse de l'image ${filename}\n\n${analysisResult}`;

  fs.writeFile(markdownFilename, markdownContent, (err) => {
    if (err) {
      console.error(`Erreur lors de l'enregistrement du fichier Markdown : ${err}`);
    } else {
      console.log(`Résultat de l'analyse enregistré dans ${markdownFilename}`);
    }
  });
}