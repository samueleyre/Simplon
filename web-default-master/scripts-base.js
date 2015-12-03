// raccourci pour document.getElementById()
// var maDiv = byId('photoBox');

function byId( elementId ){
  if( typeof elementId != 'string' ){
    console.log('Erreur : elementId doit être une chaine de caractère');
    return null;
  }
  return document.getElementById( elementId );
}

/** raccourci pour document.getElementsByClassName( ... )
// le 2nd paramètre est facultatif :
  - si il est fourni on renvoie l'item à la position demandé
  - sinon onrenvoie le tableau complet
**/
function byClass(className, atIndex){
  var elements = document.getElementsByClassName( className );
  var tElements = Array.prototype.slice.call(elements);
  return (atIndex !== null) ? tElements[atIndex] : tElements ;
}

function byTag(){

}

function addClass(){

}

function removeClass(){

}
