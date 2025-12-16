let photos = [];
let index = 0;           // position actuelle dans le tableau filtré
const batchSize = 2;     // nombre de photos à afficher à la fois
let photosFiltrees = []; // tableau des photos après application des filtres

// Charger les données
fetch('data/photos.json')
  .then(r => r.json())
  .then(data => {
    photos = data;
    photosFiltrees = photos; // au départ, toutes les photos sont visibles
    afficherPhotosBatch();   // affiche le premier batch
    remplirEcran();          // s'assure que la page est remplie pour le scroll
    remplirFiltres(photos);
  });

// Affichage galerie par batch
function afficherPhotosBatch() {
  const galerie = document.getElementById('galerie');

  if (index === 0) galerie.innerHTML = '';

  const batch = photosFiltrees.slice(index, index + batchSize);

  batch.forEach(p => {
    galerie.innerHTML += `
      <div class="photo">
        <img src="images/${p.fichier}" alt="${p.espece}" loading="lazy">
        <p><strong>${p.espece}</strong></p>
        <p>${p.famille} | ${p.lieu} | ${p.date}</p>
      </div>
    `;
  });

  index += batchSize;

  // ✅ NOUVEAU : remplir l’écran automatiquement
  requestAnimationFrame(() => {
    if (
      document.body.scrollHeight <= window.innerHeight &&
      index < photosFiltrees.length
    ) {
      afficherPhotosBatch();
    }
  });
}

// Fonction pour remplir l'écran si trop peu de photos
function remplirEcran() {
  while (document.body.offsetHeight < window.innerHeight && index < photosFiltrees.length) {
    afficherPhotosBatch();
  }
}

// Détection scroll pour charger la suite
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
    if (index < photosFiltrees.length) {
      afficherPhotosBatch();
    }
  }
});

// Remplir filtres
function remplirFiltres(data) {
  const familles = [...new Set(data.map(p => p.famille))];
  const especes = [...new Set(data.map(p => p.espece))];

  const selectFamille = document.getElementById('filtre-famille');
  const selectEspece = document.getElementById('filtre-espece');

  familles.forEach(f => selectFamille.innerHTML += `<option value="${f}">${f}</option>`);
  especes.forEach(e => selectEspece.innerHTML += `<option value="${e}">${e}</option>`);

  selectFamille.addEventListener('change', appliquerFiltres);
  selectEspece.addEventListener('change', appliquerFiltres);
}

// Appliquer filtres
function appliquerFiltres() {
  const valFamille = document.getElementById('filtre-famille').value;
  const valEspece = document.getElementById('filtre-espece').value;

  photosFiltrees = photos.filter(p => {
    return (!valFamille || p.famille === valFamille) &&
           (!valEspece || p.espece === valEspece);
  });

  index = 0; // reset index pour le lazy loading
  afficherPhotosBatch();
  remplirEcran(); // s'assure que la page reste remplie après filtrage
}

