// Fonction pour activer/désactiver l'ID "snow"
function toggleSnow() {
  const htmlElement = document.querySelector('html');
  if (htmlElement.id === 'snow') {
		htmlElement.id = '';
		localStorage.setItem('snowAnim', 'false');
  } else {
		htmlElement.id = 'snow';
		localStorage.setItem('snowAnim', 'true');
  }
}

// Écouteur d'événements pour la touche espace
window.addEventListener('keydown', function(event) {
  if (event.code === 'Space') {
    toggleSnow();
  }
});

// Écouteur d'événements pour les clics sur autre chose qu'un lien sur un smartphone
window.addEventListener('touchend', function(event) {
  if (event.target.tagName !== 'A' && event.target.tagName !== 'BUTTON') {
    toggleSnow();
  }
});