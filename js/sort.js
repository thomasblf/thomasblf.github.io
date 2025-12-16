function trierParDate(ordre = 'asc') {
  const galerie = document.getElementById('galerie');
  const listeTriee = [...photos].sort((a,b) => {
    return ordre === 'asc' 
      ? new Date(a.date) - new Date(b.date)
      : new Date(b.date) - new Date(a.date);
  });
  afficherPhotos(listeTriee);
}
