let photos = [];

// Charger les données
fetch('data/photos.json')
  .then(r => r.json())
  .then(data => {
    photos = data;
    afficherPhotos(photos);
    remplirFiltres(photos);
  });

// Affichage galerie
function afficherPhotos(liste) {
  const galerie = document.getElementById('galerie');
  galerie.innerHTML = '';

  liste.forEach(p => {
    galerie.innerHTML += `
      <div class="photo">
        <img src="images/${p.fichier}" alt="${p.espece}">
        <p><strong>${p.espece}</strong></p>
        <p>${p.famille} | ${p.lieu} | ${p.date}</p>
      </div>
    `;
  });
}

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

  const filtrées = photos.filter(p => {
    return (!valFamille || p.famille === valFamille) &&
           (!valEspece || p.espece === valEspece);
  });

  afficherPhotos(filtrées);
}
