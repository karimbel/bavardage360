window.InitUserScripts = function()
{
var player = GetPlayer();
var object = player.object;
var once = player.once;
var addToTimeline = player.addToTimeline;
var setVar = player.SetVar;
var getVar = player.GetVar;
var update = player.update;
var pointerX = player.pointerX;
var pointerY = player.pointerY;
var showPointer = player.showPointer;
var hidePointer = player.hidePointer;
var slideWidth = player.slideWidth;
var slideHeight = player.slideHeight;
window.Script1 = function()
{
  const player = GetPlayer();
const canvases = document.querySelectorAll('canvas'); // Sélectionne tous les canvas de Storyline
canvases.forEach((canvas) => {
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (ctx) {
    console.log('Canvas optimisé pour readback');
  }
});
}

window.Script2 = function()
{
  const player = GetPlayer();
if (!window.io) {
  const script = document.createElement('script');
  script.src = 'https://cdn.socket.io/4.7.5/socket.io.min.js';
  script.async = true;
  script.onload = () => initializeSocket();
  script.onerror = () => console.error('Erreur lors du chargement de Socket.IO');
  document.head.appendChild(script);
} else {
  initializeSocket();
}
function initializeSocket() {
  //const socket = io('http://localhost:3000'); // adresse local si module est utilisé sur server node local
  const socket = io('https://bavardage360.onrender.com'); // adresse distante si module est utilisé avec service externe
  window.socket = socket;
  socket.on('connect', () => {
    const pseudo = player.GetVar('utilisateurPseudo') || 'Utilisateur' + Math.floor(Math.random() * 100);
    socket.emit('join', pseudo);
    socket.pseudo = pseudo;
  });
  socket.on('joinedChat', (data) => {
    player.SetVar('utilisateurSalon', true);
    player.SetVar('message', data.message);
    player.SetVar('utilisateurPage', 'Salon');
  });
  socket.on('waitingUpdate', (list) => {
    player.SetVar('utilisateurAttente', list);
    player.SetVar('utilisateurPage', 'Attente');
  });
  socket.on('newMessage', (data) => {
    let messages = player.GetVar('messageSalon') || '';
    player.SetVar('messageSalon', messages + `\n${data.pseudo}: ${data.message}`);
  });
  socket.on('userJoined', (message) => {
    let messages = player.GetVar('messageSalon') || '';
    player.SetVar('messageSalon', messages + `\n${message}`);
  });
  socket.on('disconnect', () => {
    player.SetVar('utilisateurSalon', false);
    player.SetVar('message', 'Vous avez été déconnecté.');
    player.SetVar('utilisateurPage', 'Accueil');
  });
  window.envoyerMessage = function() {
    const msg = player.GetVar('messagePublication');
    if (msg) {
      socket.emit('sendMessage', msg);
      player.SetVar('messagePublication', '');
    }
  };
}
}

window.Script3 = function()
{
  const player = GetPlayer();
const utilisateurPseudo = player.GetVar('utilisateurPseudo'); // Variable Storyline pour le pseudo
player.SetVar("message", "Connexion au serveur, cela peut prendre quelques secondes...");
const socket = io('https://bavardage360.onrender.com');
socket.emit('join', utilisateurPseudo); // Envoyer le pseudo au serveur
}

window.Script4 = function()
{
  if (window.socket) {
  window.socket.disconnect();
  player.SetVar('utilisateurSalon', false);
  player.SetVar('utilisateurPage', 'Deconnexion');
}
}

window.Script5 = function()
{
  window.envoyerMessage();
}

window.Script6 = function()
{
  if (window.socket) {
  window.socket.disconnect();
  player.SetVar('utilisateurSalon', false);
  player.SetVar('utilisateurPage', 'Deconnexion');
}
}

};
