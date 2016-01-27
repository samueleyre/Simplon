

<?php
header("Cache-Control: max-age=1");
// delete task from DataBase

function delete($i) {

  if( $connexion = mysqli_connect('localhost', 'root', '', 'samirello') ){
      $requete = "DELETE FROM users WHERE `id`=$i ";

      $resultat  = mysqli_query($connexion, $requete);

      echo "resultat : ".($resultat ? 'deleted':'error');
  } else {
      echo "erreur BDD !";
  }
}
if (isset($_GET['delete'])) {
   delete($_GET['delete']);
 }



 //delete list from database

 function deleteList($list) {

   if( $connexion = mysqli_connect('localhost', 'root', '', 'samirello') ){
       $requete = "DELETE FROM lists WHERE `listname`='$list'; ";
      //  $requete = "DELETE FROM users WHERE `listname`='$list' ";
       $requete .= "DELETE FROM users WHERE `listname`='$list' ";

       $resultat  = mysqli_multi_query($connexion, $requete);

       echo "resultat : ".($resultat ? 'deleted':'error');
   } else {
       echo "erreur BDD !";
   }
 }
 if (isset($_GET['deleteList'])) {
    deleteList($_GET['deleteList']);
  }





// Insert list into DataBase

$insertionListVerif;

function insertList($list) {
if( $connexion = mysqli_connect('localhost', 'root', '', 'samirello') ){
    $requete = "INSERT INTO lists(`id`,`listname`) VALUES (NULL, '$list')";

    $resultat  = mysqli_query($connexion, $requete);

    $insertionListVerif = "resultat : ".($resultat ? 'ok':'false');
} else {
    $insertionListVerif = "erreur BDD !";
}
}
if (isset($_GET['addedList'])) {
   insertList($_GET['addedList']);
 }



// Insert item into DataBase
$insertionVerif;

function insert($list,$name,$date, $task) {
if( $connexion = mysqli_connect('localhost', 'root', '', 'samirello') ){
    $requete = "INSERT INTO users(`id`,`listname`,`name`,`date`, `task`) VALUES (NULL,'$list', '$name','$date', '$task')";

    $resultat  = mysqli_query($connexion, $requete);

    $insertionVerif = "resultat : ".($resultat ? 'ok':'false');
} else {
    $insertionVerif = "erreur BDD !";
}
}
if (isset($_GET['list']) && isset($_GET['name']) && isset($_GET['date']) && isset($_GET['task']) ) {
   insert($_GET['list'],$_GET['name'],$_GET['date'], $_GET['task'] );
 }




//OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
// Get List from dataBase and Get values from dateBase when change of selected option   000000
//00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
function loadAfterSelectChange($listName) {


  if ($connexion = mysqli_connect('localhost', 'root', '', 'samirello') ) {
    $requetelists = "SELECT * FROM lists";
    $lists =  mysqli_query($connexion, $requetelists);
    $listname = [];
    while( $list = mysqli_fetch_assoc($lists)) {

         array_push($listname, [$list["id"], $list["listname"]]);
    }
    mysqli_free_result($lists);
    $requete = "SELECT * FROM users";
    $reponses = mysqli_query($connexion, $requete);
    // $users = [["hoho", "hoho", "hoho"]];
    $users = [$listname];
    while( $user = mysqli_fetch_assoc($reponses)) {
          if ($user["listname"] === $listName) {

         array_push($users,[$user["id"],$user["name"],$user["date"], $user["task"]]);
          }
    }
    mysqli_free_result($reponses);
    echo json_encode($users);
    // echo "ho";
  }
}

if (isset($_GET['listname'])) {
   loadAfterSelectChange($_GET['listname']);
 } else {



   if ($connexion = mysqli_connect('localhost', 'root', '', 'samirello') ) {
     $requetelists = "SELECT * FROM lists";
     $lists =  mysqli_query($connexion, $requetelists);
     $listname = [];
     while( $list = mysqli_fetch_assoc($lists)) {

          array_push($listname, [$list["id"], $list["listname"]]);
     }
     mysqli_free_result($lists);
     $requete = "SELECT * FROM users";
     $reponses = mysqli_query($connexion, $requete);
     // $users = [["hoho", "hoho", "hoho"]];
     $users = [$listname];
     while( $user = mysqli_fetch_assoc($reponses)) {
           if ($user["listname"] === "select") {

          array_push($users,[$user["id"],$user["name"],$user["date"], $user["task"]]);
           }
     }
     mysqli_free_result($reponses);
     echo json_encode($users);
     // echo "ho";
   }
 }

function updateAListName($list, $updatelist) {
  if( $connexion = mysqli_connect('localhost', 'root', '', 'samirello') ){
      $requete = "UPDATE lists SET `listname`='$updatelist' WHERE `listname`='$list'";

      $resultat  = mysqli_query($connexion, $requete);
  }
  if( $connexion = mysqli_connect('localhost', 'root', '', 'samirello') ){
      $requete = "UPDATE users SET `listname`='$updatelist' WHERE `listname`='$list'";

      $resultat  = mysqli_query($connexion, $requete);
  }
}
      // $updateVerif = "resultat : ".($resultat ? 'ok':'false');
  // } else {
      // $updateVerif = "erreur BDD !";
  // }

 if (isset($_GET['listValue']) && isset($_GET['updatedListName']) ) {
    updateAListName($_GET['listValue'],$_GET['updatedListName']);
  }

function updateTask($Id, $taskOption, $option ) {
  if( $connexion = mysqli_connect('localhost', 'root', '', 'samirello') ){
    $requete = "UPDATE users SET `$option`='$taskOption' WHERE `id`='$Id'";

    $resultat  = mysqli_query($connexion, $requete);
  }


}

if (isset($_GET['taskOptionId']) && isset($_GET['updatedOption']) && isset($_GET['option']) ) {
   updateTask($_GET['taskOptionId'],$_GET['updatedOption'], $_GET['option']);
}



 ?>
