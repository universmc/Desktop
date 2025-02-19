// Sélection des éléments SVG
const ordinateur = document.getElementById('ordinateur');
const tablette = document.getElementById('tablette');
const stylet = document.getElementById('stylet');
const carte = document.getElementById('carte');

// Exemple d'interaction : animation au survol de l'ordinateur
ordinateur.addEventListener('mouseover', () => {
  ordinateur.style.transform = 'scale(1.1)';
});

ordinateur.addEventListener('mouseout', () => {
  ordinateur.style.transform = 'scale(1)';
});

// ... Autres interactions et logique pour l'IA ...