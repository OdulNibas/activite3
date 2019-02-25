function ajaxGet(url, callback){
  // Création d'une requête HTTP
  var req = new XMLHttpRequest();
  // Requête asynchrone lorsque le 3è aramètre vaut true ou absent
  req.open("GET", url);
  // Ecoute de l'évènement
  req.addEventListener('load', function(){
    if(req.status >= 200 && req.status < 400){
      callback(req.responseText);
    } else {
      console.error(req.status + " " + req.statusText + ' ' +url);
    }
  });
  req.addEventListener("error", function(){
      console.error("Erreur réseau avec l'URL " + url);
  });
  req.send(null);
}
