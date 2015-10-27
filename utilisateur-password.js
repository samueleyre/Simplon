// console.log('Votre email et votre mot de passe, svp Monsieur/Madame/Mademoiselle/Autre.');
var emails = ["bob@gogo.fr", "remi@gogo.fr", "charles@gogo.fr", "crouton@gogo.fr"];
var mdps = ["tutd" , "tzot" , "tyat" , "tzde"];
var email = prompt('email');
var mdp = prompt('Mdp ?');
var answer = "";
var logged = false;
function Enregistrer(Enreg) {
        Enreg = Enreg.toUpperCase();
        if (Enreg === "Y") {
        emailtest(email);
        }
        else if (Enreg === "N")
        {
          console.log("bye bye !!                                                                                                                               F**  wasting my time."    );
        }
        else {
          answer = prompt("I said Yes or No ? Answer with y or n");
          Enregistrer(answer);
        }
}
function check(email, mdp) {
  for (i=0; i<4;i++) {
    if ((emails[i] === email) && (mdps[i] === mdp)) {
      console.log('logged in');
      logged = true;
      return;
    }
    else {
    }
  }
  if (logged === false) {
    answer = prompt('Vous n\'êtes pas enregisté chez nous ! Souhaitez-vous vous inscrire ? Y/N ');
    Enregistrer(answer);
  }
}


function password(reponse){
    if (reponse.length < 4) {
        mdp = prompt('Not strong enough');
        password(mdp);
    }
    else {
        mdp = reponse;
        console.log();
        answer = prompt(email + ", " + mdp + ", ok for you or restart ? Y/N").toUpperCase();
                if (answer === "N") {
                    email = prompt('Email stp ;(');
                    emailtest(email);
                }
                else if (answer === "Y") {
                    console.log('Vous êtes enregistrée !');
                    emails.push(email);
                    mdps.push(mdp);
                    // console.log(emails[4] + mdps[4]);
                    return;
                }
                else {
                    console.log('Speak english dude..');
                    password(mdp);
                    return;
                }
      }
  }
function emailtest(reponse) {
    if ((reponse.length < 4 )||(0 === reponse.split("@").length - 1)) {
       email = prompt('Not a email, please retry.');
       emailtest(email);
    }
   else {
       password(mdp);
   }
}



check(email, mdp);
