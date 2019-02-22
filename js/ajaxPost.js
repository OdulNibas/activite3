function ajaxPost(url, data, callback, isJson){
  // Création d'une requête HTTP
  var req = new XMLHttpRequest();
  // Requête asynchrone lorsque le 3è aramètre vaut true ou absent
  req.open("POST", url);
  // Ecoute de l'évènement
  req.addEventListener('load', function(){
    if(req.status >= 200 && req.status < 400){
      callback(req.responseText);
    } else {
      console.error(req.status + " " + req.statusText + ' ' + url);
    }
  });
  req.addEventListener("error", function(){
      console.error("Erreur réseau avec l'URL " + url);
  });
  if(isJson){
    //définit le contenu de la rêquete
    req.setRequestHeader('Content-Type', 'application/json');
    //transforme la donnée du format Json vers le format texte avant l'envoie
    data = JSON.stringify(data);
  }
  req.send(data);
}
