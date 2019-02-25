/*
Activité 2
*/

// Liste des liens Web à afficher. Un lien est défini par :
// - son titre
// - son URL
// - son auteur (la personne qui l'a publié)
var listeLiens = [
    {
        titre: "So Foot",
        url: " http://sofoot.com",
        auteur: "yann.usaille"
    },
    {
        titre: "Guide d'autodéfense numérique",
        url: " http://guide.boum.org",
        auteur: "paulochon"
    },
    {
        titre: "L'encyclopédie en ligne Wikipedia",
        url: " http://Wikipedia.org",
        auteur: "annie.zette"
    }
];
/*******************Activité_1******************************/
// TODO : compléter ce fichier pour ajouter les liens à la page web
var content = document.getElementById('contenu'),
    ul = document.createElement('ul');
    ul.id = 'liste';

content.parentNode.style.backgroundColor = '#c3c3c3';


for(var i = 0; i < listeLiens.length; i++){

    var titre = document.createTextNode(listeLiens[i].titre),
        adresse = document.createTextNode(listeLiens[i].url),
        auteur = document.createTextNode(listeLiens[i].auteur),
        li = document.createElement('li'),
        a = document.createElement('a');

    a.appendChild(titre);
    a.href = listeLiens[i].url;

    var span = document.createElement('span'),
        text = document.createTextNode('Ajouté par ' + listeLiens[i].auteur);

    span.appendChild(text);
    span.style.display = 'block';


    li.appendChild(a).style.color = '#428bca';
    li.appendChild(adresse);
    li.appendChild(span);
    li.style.backgroundColor = '#ffffff';
    li.style.margin = '15px';
    li.style.padding = '15px 20px';
    li.style.listStyleType = "none";

    ul.appendChild(li);
}
content.appendChild(ul);
/****************Activité_2*********************/
var form = document.querySelector('form');
form.style.display = 'none';

var button = document.querySelector('button');
var msg = document.getElementById('message');

button.addEventListener('click', function(){
  form.style.display = 'block';
  button.style.display = 'none';
});

  ajaxGet("https://oc-jswebsrv.herokuapp.com", function(reponse){});

form.addEventListener('submit', function(e){
  e.preventDefault();

  var nouveauLien = {
    titre : e.target.elements.titre.value,
    url : e.target.elements.url.value,
    auteur : e.target.elements.nom.value
  };

  ajaxPost("https://oc-jswebsrv.herokuapp.com/api/lien",
  nouveauLien, function(reponse){
    var art = JSON.parse(reponse);
    art.forEach(function (article) {
      console.log(article.url);
    });
  },
true
);

  function afficher(){
      msg.textContent = "Le lien a bien été ajouté";
      msg.style.display = "block";
      msg.style.background = '#428bca';
      msg.style.color = "#fff";
      msg.style.padding = "15px 25px";
      msg.style.width = "25%";
      msg.style.textAlign = "center";
      msg.style.margin = "15px 3.3%";
    }

  var li = document.querySelector('li');
  var newLi = li.cloneNode(false);
  var newA = document.createElement('a');

  newA.style.color = '#428bca';
  newA.textContent = this.elements.titre.value;
  newA.href = this.elements.url.value;

  if(/^https?:\/\//.test(form.elements.url.value)){
    newLi.textContent = form.elements.url.value;
  }else{
    newLi.textContent = " http://" + form.elements.url.value;
  }

  newLi.appendChild(newA);
  newLi.insertBefore(newA, newLi.childNodes[0]);
  var newSpan = document.createElement('span');
  newSpan.style.display = "block";
  newSpan.textContent = 'Ajouté par ' + this.elements.nom.value;
  newLi.appendChild(newSpan);

  ul.insertBefore(newLi, ul.childNodes[0]);
  e.preventDefault();

  form.style.display = "none";
  button.style.display = "block";

  var intervalid = setInterval(afficher, 200);

  setTimeout(function () {
              clearInterval(intervalid);
              msg.style.display = "none";
            }, 2200)
});
