screen.orientation.lock('landscape');
/* Permet de vérouiller le mode paysage
screen.orientation.lock('landscape-primary'); SI KO */

document.addEventListener("deviceready", onDeviceReady, onDeviceNotReady);

bluetoothSerial.connect("20:17:02:23:82:18", connectSuccess, connectFailure);
/* 20:17:02:23:82:18 représente l'@ MAC de la voiture RC */

function connectSuccess() { etat.innerHTML = "ETAT : Well Done vous êtes connecté !"; }

function connectFailure() { etat.innerHTML = "ETAT : La connection à échouée"; }

function onDeviceReady() {
    /* Cette fonction fait appel au addEventListener.
    Cette fonction s'active ET RESTE ACTIVEE une fois que l'app est chargée 
    Cette fonction, initialise les variables, 
    Bloque en paysage
    */
    accueil.innerHTML = "Coordonnées de l'accéléromètre : ";
    var b;
    var options = { frequency: 100 }; /* Rafraichissement 10 Hz, ajustable*/
    var watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
    /* Permet d'aller lire les données de l'acceleromètre (non stop) à 10 Hz (options = 10 Hz) */
}

function onDeviceNotReady() {
    /* Ce msg ne s'affichera pas compte tenu de la vitesse d'init 
des smartphones actuels, mais, sait-on jamais :) !!! */
    accueil.innerHTML = "L'application est en cours de chargement. PLEASE WAIT !";
}

function onSuccess(acceleration) { /* Retranscrit les valeurs de l'accéléromètre sur l'HTML */
    document.getElementById('x').innerHTML = "x : " + Math.round(acceleration.x);
    document.getElementById('y').innerHTML = "y : " + Math.round(acceleration.y);
    document.getElementById('z').innerHTML = "z : " + Math.round(acceleration.z);

    b = 0;

    document.getElementById('data').innerHTML = b;
    data = "#b=" + b + "#x=" + (acceleration.x.toFixed(2)) / 2 + "#y=" + (acceleration.y.toFixed(2)) / 2 + "#z=" + (acceleration.z.toFixed(2)) / 2 + "#<CR>";
    bluetoothSerial.write(data);

}

function onError() {
    etat.innerHTML = "ERREUR";;
    alert('onError!');
}