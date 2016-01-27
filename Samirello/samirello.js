



function changeColor() {
  document.getElementById('replaceInputDate').style.color = '#D7FF46';
}
var lists;
var users;
var editMode;

function hideOnStart(display) {
var x = document.getElementsByClassName("hideOnStart");
  for (var i = 0; i < x.length; i++) {
      x[i].style.display = display;
  }
}

hideOnStart('none');
var titleValue;
var taskValue;
var nameValue;
var dateValue;
var selectOptionId = 0;
var insertedList = "";

//OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
//00000000000                Edit content                   000000000
//0000000000000000000000000000000000000000000000000000000000000000000


function editListTitle() {
  // console.log(editListTitle)
  var x = document.getElementById('listTitleId');
  // x.backgroundColor = "blue";
  x.contentEditable = true;
  x.focus();
  titleValue = x.innerHTML;
}

function editTaskFunction(Id) {

  // console.log("editTaskFunction " + Id)
  var x = document.getElementById(Id);
  x.contentEditable = true;
  x.style.backgroundColor = 'rgba(215, 255, 70, 0.5)';
  // console.log("BackgroundColor" + x.backgroundColor)
  x.focus();
  if (Id.indexOf("task") !== -1) {
  taskOptionValue = x.innerHTML;
  // console.log(taskValue);
  }
  if (Id.indexOf("name") !== -1) {

  taskOptionValue = x.innerHTML;
  }
  if (Id.indexOf("date") !== -1) {

  taskOptionValue = x.innerHTML;
  }
}

  // selectOptionIndex = x.options[x.selectedIndex];



//OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
//00000000000          Change the name of a list            000000000
//0000000000000000000000000000000000000000000000000000000000000000000

function CancelEditableMode() {
  selectOptionId = getListId();

  document.getElementById('listTitleId').contentEditable = false;
  var changedTitleValue = document.getElementById('listTitleId').innerHTML;
  changedTitleValue = changedTitleValue.replace("<br>", "");
  var letterNumber = /^[0-9a-zA-Z _]+$/;
 if(changedTitleValue.match(letterNumber) === null ) {
   console.log("oooo");
  changedTitleValue = changedTitleValue.replace(" ", "");
    document.getElementById('listTitleId').innerHTML = titleValue;
    return;
 }
 if (changedTitleValue.length > 20) {
document.getElementById('listTitleId').innerHTML = titleValue;
   return;
 }

  // console.log("CancelEditableMode : changeTitleValue :" + changedTitleValue)
  for ( i = 0; i < lists.length; i++) {
    if ( lists[i][1] === changedTitleValue) {
            // console.log('ListName already taken.')
            // alert('ListName already taken.');
      return;
    }
  }

  var TitleValueId = document.getElementById('listTitleId').id;
  if (titleValue === changedTitleValue) {
    return;
  }
  var requeteUpdateName = new XMLHttpRequest();
  list = getListId();
  // list = titleValue;
  var url = "listValue=" + titleValue + "&updatedListName=" + changedTitleValue;
  url = 'todoList.php?' + url;
  requeteUpdateName.onreadystatechange=function() {
    if (requeteUpdateName.readyState == 4 && requeteUpdateName.status == 200) {
      loadList(changedTitleValue);
      // document.getElementById(TitleValueId).selected = true;
      // deleteOldSelectOption();
    }
  };

  requeteUpdateName.open('GET',url, true);
  requeteUpdateName.send();

}

document.getElementById('listTitleId').addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
      // console.log("What the Fuck")
      CancelEditableMode();
    }
    if (key === 27) {
      document.getElementById('listTitleId').contentEditable = false;
      document.getElementById('listTitleId').innerHTML = titleValue;
    }
});

//OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
//00000000000          Change the task details            000000000
//0000000000000000000000000000000000000000000000000000000000000000000


function updateEditionTask(Id) {
  // selectOptionId = getListId();
  document.getElementById(Id).style.backgroundColor = 'rgba(215, 255, 70, 0.9)';

  var currentList = getListName();
  var changedTaskOptionValue = document.getElementById(Id).innerHTML;
  var option;
  var j;
  if (Id.indexOf("name") !== -1) {
    option = "name";
    j = 1;
  }
  if (Id.indexOf("task") !== -1) {
    option = "task";
    j = 3;
  }
  if (Id.indexOf("date") !== -1) {
    option = "date";
    j = 2;
  }
  // console.log("updateEditionTask : option :" + option)
  for (var i = 0; i < users[1].length; i++) {
    if ( users[1][i][j] === changedTaskOptionValue) {
            // console.log('ListName already taken.')
            // alert('ListName already taken.');
      return;
    }
  }
  document.getElementById(Id).contentEditable = false;
  var taskOptionId = document.getElementById(Id).id;
  var taskOptionId = taskOptionId.replace( /^\D+/g, '');
  if (taskOptionValue === changedTaskOptionValue) {
    return;
  }
  var requeteUpdateTask = new XMLHttpRequest();
  var url = "taskOptionId=" + taskOptionId +"&option=" + option + "&updatedOption=" + changedTaskOptionValue;
  // console.log("updateEditionTask " + url)
  url = 'todoList.php?' + url;
  requeteUpdateTask.onreadystatechange=function() {
    if (requeteUpdateTask.readyState == 4 && requeteUpdateTask.status == 200) {
      loadList(currentList);
    }
  };

  requeteUpdateTask.open('GET',url, true);
  requeteUpdateTask.send();

}

document.getElementById('listTitleId').addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
      CancelEditableMode();
    }
    if (key === 27) {
      document.getElementById('listTitleId').contentEditable = false;
      document.getElementById('listTitleId').innerHTML = titleValue;
    }
});









//OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
//00000000000          shortcut functions                   000000000
//0000000000000000000000000000000000000000000000000000000000000000000

function getListName() {
  var e = document.getElementById("listname");
  var listname = e.options[e.selectedIndex].text;
  return listname;
}


function getListId() {
  var e = document.getElementById("listname");
  var listid = e.options[e.selectedIndex].id;
  return listid;
}

function getOptionsByValue(value)
{
    var allOptions = document.getElementById('listname').options;
    var results = [];
    for(var x=1;x<allOptions.length;x++) {

            console.log(allOptions[x].value);
        if(allOptions[x].value === value) {
          console.log(allOptions[x].value)
            results = allOptions[x];
        }
    }
    return results;
}
//OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
//00000000000          Insertion of a task                  000000000
//0000000000000000000000000000000000000000000000000000000000000000000



function insert() {


  var requeteInsertTask = new XMLHttpRequest();
  var name = "";
  var task = "";
  name = document.getElementsByName('name')[0].value;
  var date = "";
  var day = document.getElementById("day");
  day = day.value;
  var month = document.getElementById("month");
  month = month.options[month.selectedIndex].value;
  var year = document.getElementById("year");
  year = year.value;

  // var day = document.getElementsByClassName('dp_tag_day')[0].innerHTML;
  // var month = document.getElementsByClassName('dp_tag_month')[0].innerHTML;
  month = (['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul','Aug','Sep','Oct', 'Nov', 'Dec'].indexOf(month)) + 1;
  // var year = document.getElementsByClassName('dp_tag_year')[0].innerHTML;

  date = month + "/" + day + "/" + year;
  console.log("insert() date" + date);
  task = document.getElementsByName('task')[0].value;
  if (name === "") {
    alert("Name missing !");
    return;
  }
  // console.log("insert : date :" + date)
  if (date === "") {
    alert("Date missing !");
    return;
  }
  if (task === "") {
    alert("Task missing !");
    return;
  }

  var list = getListName();
  var url = "name=" + name  +"&date=" + date + "&list=" + list + "&task=" + task;
  url = 'todoList.php?' + url;
  requeteInsertTask.onreadystatechange=function() {
    if (requeteInsertTask.readyState == 4 && requeteInsertTask.status == 200) {
  loadlistname();
    }
  };
  requeteInsertTask.open('GET',url, true);
  requeteInsertTask.send();
}

//OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
//00000000000     Detect changement de Selected option      000000000
//0000000000000000000000000000000000000000000000000000000000000000000





function transferttoloadlistname() {


selectOptionId = getListId();
// console.log(selectOptionId);
loadlistname();

}

function SelectLoadChange() {
// document.getElementsByName('date')[0].value = "";
// when table loads
loadlistname();

// when change of load
document.getElementById('listname').onchange = transferttoloadlistname;
}

SelectLoadChange();


//OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
//00000000000                Refresh Page                   000000000
//0000000000000000000000000000000000000000000000000000000000000000000

function loadlistname() {
  // console.log("loadlistnameCalled")
  // setTitle
    // var listname = getListName();
    // console.log("selectOptionId " + selectOptionId);

    // if (listname === "select") {
    //   document.getElementById("listTitleId").innerHTML = "Myfirstlist";
    // } else {
    //   document.getElementById("listTitleId").innerHTML = listname;
    // }
// loadlist
    var element = document.getElementById('listname');
    var changedlistname = element.options[element.selectedIndex].text;
    // console.log(changedlistname);
    if (changedlistname !== "select") {
    hideOnStart('');
    }
    if ( insertedList !== "" ) {
      changedlistname = insertedList;
    }

    console.log("changedlistname " + changedlistname)

    loadList(changedlistname);
}


function loadList(listName) {
  var requeteLoadListName = new XMLHttpRequest();
  requeteLoadListName.onreadystatechange=function() {
    if (requeteLoadListName.readyState == 4 && requeteLoadListName.status == 200) {
      users = JSON.parse(requeteLoadListName.responseText);
      lists = users[0];
      console.log("check if this has been updated listnames = " + lists + " tasks = " + users);
      fillSelect(lists, users);
      // createblock(users);
      // console.log("LoadList-function selectOptionId " + selectOptionId);

    }
  };
  var url = 'todoList.php?listname=' + listName;
  requeteLoadListName.open('GET',url, true);
  requeteLoadListName.send();
}


//OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
//00000000000          Insertion of a new list              000000000
//0000000000000000000000000000000000000000000000000000000000000000000
function insertList() {

  insertedList = document.getElementsByName('newlist')[0].value;
  // var list = insertList;
  document.getElementsByName('newlist')[0].value = "";
  for (var i = 0; i < lists.length; i++) {
    if ( lists[i][1] === insertedList) {
            // console.log('ListName already taken.')
            alert('ListName already taken.');
      return;
    }
  }
  // insertListNameSelect(list);
  var url = "addedList=" + insertedList;
  url = 'todoList.php?' + url;
  // console.log("insertListUrl " + url);
  var requeteListInsert = new XMLHttpRequest();
  requeteListInsert.onreadystatechange=function() {
    if (requeteListInsert.readyState == 4 && requeteListInsert.status == 200) {
      loadlistname();
      // console.log("newlist" + newlist);
      // console.log(getOptionsByValue(newlist));
      // getOptionsByValue(newlist).selected = true;

    }
  };

  requeteListInsert.open('GET',url, true);
  requeteListInsert.send();
}
// Insert frontside js

//
// function insertListNameSelect(listNameAdded) {
//   var x = document.getElementById("listname");
//   var option = document.createElement("option");
//   option.text = listNameAdded;
//   x.add(option);
//   sortList();
// }



//OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
//00000000000          fill Select                          000000000
//0000000000000000000000000000000000000000000000000000000000000000000


function fillSelect(thelistname, taskList) {
  // console.log("selectOptionId " + selectOptionId);

    var x = document.getElementById("listname");
    var length = x.options.length;
    var selectList = [];
    // console.log("thelistname" + thelistname)
    for (var u = 0; u < x.options.length; u++) {
      selectList.push(x.options[u].text);
    }
    var DbList = [];
    for ( u = 0; u < thelistname.length; u++) {
      var val = thelistname[u][1];
      // console.log(val)
      // console.log(toString())

      DbList.push(val);
    }
    // console.log("selectlist" + selectList)
    // console.log("DbList " + DbList)
    // console.log(selectList.length)
    // console.log(x.options[selectList.length-1])
    var toBeDeleted = [];
    var currentTitle;
      for (var i = 1; i < selectList.length; i++) {
          if (DbList.indexOf(x.options[i].value) === -1) {
                  // console.log(x.options[i].value + " deleted !")
                  toBeDeleted.push(i);
          }
      }
      for (i = 0; i < toBeDeleted.length; i++) {
                  x.options[toBeDeleted[i]] = null;
      }
      for (var j = 0; j < thelistname.length; j++) {
        // console.log("jjjj" + selectList);
          if ((selectList).indexOf(thelistname[j][1]) === -1) {
            var option = document.createElement("option");
            option.text = thelistname[j][1];
            // console.log(option.text + " added !")
            option.id = thelistname[j][0];
            x.add(option);
          }
      }
      if (selectOptionId !== 0) {
            currentTitle = "select";
      }
      // console.log(insertedList);
      if (insertedList !== "") {
      selectOptionId = getOptionsByValue(insertedList).id;
      }
      insertedList = "";

      for ( j = 0; j < thelistname.length; j++) {
          if (thelistname[j][0] === selectOptionId ) {
            currentTitle = thelistname[j][1];
          }
      }
      // console.log("currentTitle " + currentTitle)
      sortList();
      // console.log("fillselect", "currentTitle", currentTitle)
      if (currentTitle === "select") {
        // console.log("ITs Select which is select !")
        document.getElementById("listTitleId").innerHTML = "";
      } else {
        document.getElementById("listTitleId").innerHTML = currentTitle;
      }

// SelectTheOption


      document.getElementById(selectOptionId).selected = true;

      createblock(taskList);

}
  // function reallyFillSelect(x, thelistname) {
  //   for (var i = 0; i < thelistname.length; i++) {
  //     var option = document.createElement("option");
  //     option.text = thelistname[i][1];
      // console.log("reallyFillSelect" + option.text)
  //     option.id = thelistname[i][0];
  //     x.add(option);
  //
  //   }
  //   document.getElementById(selectOptionId).selected = true;
  // }
  //
  // function fillSelect(thelistname) {
  //
  //   var x = document.getElementById("listname");
  //   var length = x.options.length;
  //     for (i = 1; i < length; i++) {
        // console.log(i);
        // console.log("fillselect" + x.options[i].text)
  //       x.options[i] = null;
        // console.log(length)
  //
  //       // if (i === (length - 1) ){
  //
  //       // }
  //     }
  //     reallyFillSelect(x, thelistname);
  // }

  //OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
  //00000000000          Set Date Format                      000000000
  //0000000000000000000000000000000000000000000000000000000000000000000

function setDateFormat(dateVal) {
  dateVal = dateVal.split("/");
  var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul','Aug','Sep','Oct', 'Nov', 'Dec'][(dateVal[0]-1)];
  dateVal =dateVal[1] + ' ' + month  + ' ' + dateVal[2];
  // var mydate = new Date(form.startDate.value);
  return dateVal;
    // date = date.replace("/", ".");
    // date = date.replace("/", ".");
    // date = date.parse();


}



//OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
//00000000000          Delete a Task                        000000000
//0000000000000000000000000000000000000000000000000000000000000000000


function ideletefunction(Id) {
    var requeteTaskDelete = new XMLHttpRequest();
    requeteTaskDelete.onreadystatechange=function() {
      if (requeteTaskDelete.readyState == 4 && requeteTaskDelete.status == 200) {
        var infoDeletion = requeteTaskDelete.responseText;
        console.log("Deleted task " + infoDeletion);
      loadlistname();
      }
    };
      var url = 'todoList.php?delete=' + Id;
      // console.log("URL" + url);
        requeteTaskDelete.open('GET',url, true);
        requeteTaskDelete.send();
}

//OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
//00000000000          Delete a list                        000000000
//0000000000000000000000000000000000000000000000000000000000000000000

function deleteList() {
  if (confirm("Are you sure you want to delete this List ?")) {
    var requeteListDelete = new XMLHttpRequest();
    var listName = getListName();
    requeteListDelete.onreadystatechange=function() {
      if (requeteListDelete.readyState == 4 && requeteListDelete.status == 200) {
        // var infoDeletion = requeteListDelete.responseText;
        // console.log(infoDeletion);
        // console.log("deleteList()" + requeteListDelete.responseText);

      loadlistname();
      }
    };
      var url = 'todoList.php?deleteList=' + listName;
      // console.log("URL" + url);
        requeteListDelete.open('GET',url, true);
        requeteListDelete.send();
  } else {
      return;
  }
}
//OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
//00000000000          Fill Tasks                           000000000
//0000000000000000000000000000000000000000000000000000000000000000000




  function createblock(Users) {
    var parentNode = document.getElementById('nameList');
    while (parentNode.firstChild) {
    parentNode.removeChild(parentNode.firstChild);
    }
    parentNode = document.getElementById('taskList');
    while (parentNode.firstChild) {
    parentNode.removeChild(parentNode.firstChild);
    }
    parentNode = document.getElementById('dateList');
    while (parentNode.firstChild) {
    parentNode.removeChild(parentNode.firstChild);
    }
    parentNode = document.getElementById('deleteList');
    while (parentNode.firstChild) {
    parentNode.removeChild(parentNode.firstChild);
    }

    if (Users.length !== 0) {
    // console.log(Users[0][1])
    // console.log(Users)

    Users = sortTasks(Users);
    // console.log(Users)
      for (var i = 1; i < Users.length; i++) {
          var Id = Users[i][0];
          // console.log("createblock 1" + Users[0][0] + Users[0][1] + Users[0][2]);
            console.log("createblock " + Users[i][0] + Users[i][1] + Users[i][2]);
            if (document.getElementById(Id) === null) {


            var mainDiv = document.createElement('div');
            var iDivDate = document.createElement('div');
            var iDivName = document.createElement('div');
            var iDivTask = document.createElement('div');
            var idelete = document.createElement('img');
            mainDiv.id = 'blockContainer' + Users[i][0];
            iDivDate.id = 'dateBlock'+ Users[i][0];
            iDivName.id = 'nameBlock'+ Users[i][0];
            iDivTask.id = 'taskBlock'+ Users[i][0];
            idelete.id = Users[i][0];
            // iDivDate.onclick = function () { editTaskFunction(this.id) }
            iDivName.onclick = function () { editTaskFunction(this.id); };
            iDivTask.onclick = function () { editTaskFunction(this.id); };
            // iDivDate.onblur = function () { updateEditionTask(this.id) }
            iDivName.onblur = function () { updateEditionTask(this.id); };
            iDivTask.onblur = function () { updateEditionTask(this.id); };
            idelete.onclick = function() { ideletefunction(this.id); };
            // console.log(Id);
            iDivDate.className = 'dateBlock';
            iDivName.className = 'nameBlock';
            iDivTask.className = 'taskBlock';
            idelete.className = 'delete';
            iDivName.addEventListener('keypress', function (e) {
                var key = e.which || e.keyCode;
                if (key === 13) { // 13 is enter
                  updateEditionTask(this.id);
                  // console.log("Editing Name : Pressed Enter")
                }
            });
            iDivTask.addEventListener('keypress', function (e) {
                var key = e.which || e.keyCode;
                if (key === 13) { // 13 is enter
                  updateEditionTask(this.id);
                  // console.log("Editing Name : Pressed Enter")
                }
            });
                // Escape Key
                //if (key === 27) {
                //   document.getElementById(this.id).contentEditable = false;
                //   document.getElementById(this.id)innerHTML = titleValue;
                // }

            document.getElementById('nameList').appendChild(iDivName);
            document.getElementById('taskList').appendChild(iDivTask);
            document.getElementById('dateList').appendChild(iDivDate);
            document.getElementById('deleteList').appendChild(idelete);
            // console.log(Users[i][2])
            iDivDate.innerHTML = setDateFormat(Users[i][2]);
            iDivName.innerHTML = Users[i][1];
            iDivTask.innerHTML = Users[i][3];
            idelete.src = 'imgs/RedCross.png';
            // idelete.innerHTML = "delete";
            }
      }
    }
  }
  // <img src="imgs/RedCross.png" alt="">
  //OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
  //00000000000          Sort Alpha. the Select Options       000000000
  //0000000000000000000000000000000000000000000000000000000000000000000


  function sortList() {

    var selectOptions = document.getElementById('listname');
     var selectOptionsTexts = new Array();

     for(i = 1; i < selectOptions.length; i++){
        selectOptionsTexts[i-1] =
            selectOptions.options[i].text.toUpperCase() + "," +
            selectOptions.options[i].text + "," +
            selectOptions.options[i].value + "," +
            selectOptions.options[i].id + "," +
            selectOptions.options[i].selected;
     }

     selectOptionsTexts.sort();

     for(i = 1; i < selectOptions.length; i++){
        var parts = selectOptionsTexts[i-1].split(',');

        selectOptions.options[i].text = parts[1];
        selectOptions.options[i].value = parts[2];
        selectOptions.options[i].id = parts[3];
        if(parts[4] == "true"){
            selectOptions.options[i].selected = true;
        }else{
           selectOptions.options[i].selected = false;
        }
     }

  }

  //OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
  //00000000000          Sort By Date the tasks               000000000
  //0000000000000000000000000000000000000000000000000000000000000000000


function sortTasks(dtnList) {

//     var dates = document.getElementsByClassName('dateBlock');
//     var tasks = document.getElementsByClassName('taskBlock');
//     var names = document.getElementsByClassName('nameBlock');
//   //
//   var dtnList = [];
//   console.log(dates[1].innerHTML)
// if (dates.length !== 0) {
//   for (var i = 0; i < dates.length; i++) {
//         dtnList.push([dates[i].innerHTML, tasks[i].innerHTML, names[i].innerHTML]);
//   }
// }
// console.log(dtnList[0][0
  // dtnList[0].pop();
  // var month = "";
  var MonthDayYear;
  var SortableDate;
  var sortedDtnList = [];
  var SortableDateList = [];
  for (i = 1 ; i < dtnList.length; i++) {
        MonthDayYear = dtnList[i][2].split("/");
        // console.log(MonthDayYear)
        // month = ["Jan.", "Feb.", "March", "April", "May", "June",
        // "July", "August", "Sept.", "Oct.", "Nov.", "Dec."].indexOf(MonthDayYear[1]) + 1;
        if (MonthDayYear[0].toString().length < 2) {
          MonthDayYear[0] = "0" + MonthDayYear[0];
        }
        if (MonthDayYear[1].toString().length < 2) {
          MonthDayYear[1] = "0" + MonthDayYear[1];
        }
        SortableDate = MonthDayYear[2] + MonthDayYear[0] + MonthDayYear[1] + dtnList[i][0] ;
        // console.log(SortableDate)
        dtnList[i][2] = SortableDate;
        SortableDateList.push(SortableDate);
  }
  // console.log(SortableDateList[1])
  for (var i = 0; i < dtnList.length; i++) {
    sortedDtnList[i] = "";
  }
  sortedDtnList[0] = dtnList[0];
  SortableDateList.sort(function(a, b){return a-b;});
  for (i = 1; i < SortableDateList.length + 1; i++) {
    sortedDtnList[i] = ["", "",SortableDateList[(i - 1)], ""];
  }
  // console.log(SortableDateList[0])
  for (i = 1; i < dtnList.length; i++) {
    for (var j = 1; j < sortedDtnList.length; j++) {
      if (sortedDtnList[j][2] === dtnList[i][2] ) {
        // console.log(dtnList[i][2] )
        sortedDtnList[j][1] = dtnList[i][1];
        sortedDtnList[j][0] = dtnList[i][0];
        sortedDtnList[j][3] = dtnList[i][3];
      }
    }
  }
  // var dtnList = [dtnList[0]];

  // console.log(dtnList[0][0])
// console.log(sortedDtnList[1][0])
  // var sortedDtnListe = dtnList.push(sortedDtnList);
  for (i = 1 ; i < sortedDtnList.length; i++) {
        // console.log(sortedDtnList[i][2])
        var split = (sortedDtnList[i][2]).split("");
        if (split[4] === 0) {
          split[4] = "";
        }
        if (split[6] === 0) {
          split[6] = "";
        }
        var Year = split[0] + split[1] + split[2] + split[3];
        var Month = split[4] + split[5];
        var Day = split[6] + split[7];
        sortedDtnList[i][2] = Month + "/" + Day + "/" + Year;
  }

  return sortedDtnList;

}

//OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
//00000000000               Debugging                       000000000
//0000000000000000000000000000000000000000000000000000000000000000000



//
//
// function testing() {
//
// var element = document.getElementById('listname');
// var listname = element.options[element.selectedIndex].text;
//
// var requeteTest = new XMLHttpRequest();
// requeteTest.onreadystatechange=function() {
//   if (requeteTest.readyState == 4 && requeteTest.status == 200) {
//     users = JSON.parse(requeteTest.responseText);
//     console.log("Test list + tasks = " + users);
//
//   }
// };
//
// var url = 'todoList.php?listname=' + listname;
//
// requeteTest.open('GET',url, true);
// requeteTest.send();
// }
