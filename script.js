const ol = document.getElementById("ol");
var i = findTasks()

//Getting all the keys from localStorage that conatains the "Tasks" and returning the max value among all the keys;
function findTasks() {
  let keys = Object.keys(localStorage);
  let taskArr = [];
  for(let i = 0; i<keys.length; i++) {
    if(!isNaN(keys[i])) {
      let parsed = parseInt(keys[i])
      taskArr.push(parsed);
    }
  }
  if(localStorage.length <= 0) {
    return localStorage.length;
  } else {
    return Math.max(...taskArr);
  }
}


function addListToLocalstorage() {
  //adding 1 to i so that every new task can have a different key in local storage;
  i += 1;
  var listItem = document.getElementById("add").value;
  if(listItem === "") {
    alert('You must write something')
  } else {
    localStorage.setItem(i, listItem);
    createList();
  }
  //Emptying the input box after adding the task;
  document.getElementById("add").value = '';
}

//Binding the enter key to the "Add" button;
$('#add').keyup(function(event) {
  if(event.which === 13) {
    addListToLocalstorage();
  }
})

//displaying the newly added task;
function createList() {
  let Content = localStorage.getItem(i);
  ol.innerHTML += `<div id="li_container"><li class="${i}">${Content}</li><i id="close" class="far fa-times-circle"></i></div>`;
}

//Displaying all the task and from localStorage everytime the page is refreshed. Also checking if the task is checked or not.
function displayList() {
  let loopLength = findTasks();
  for (let n = 0; n <= loopLength; n++) {
    let listContent = localStorage.getItem(n);
    if (listContent) {
      ol.innerHTML += `<div id="li_container"><li class="${n}" id="unchecked">${listContent}</li><i id="close" class="far fa-times-circle"></i></div>`;
    }
  }
  for (let n = 0; n <= loopLength; n++) {
    if(localStorage.getItem(`${n} checked`) === 'true') {
      $(`.${n}`).attr('id','checked')
    }
  } 
}


//Adding a check and uncheck option when click on the task. 
$(document).ready(function () {
  $("#ol").on("click", "li", function () {
    let loopLength = findTasks();
    var clickedElementClass;
    if($(this).attr("id") === "unchecked") {
          clickedElementClass = $(this).attr("class");
          localStorage.setItem(`${clickedElementClass} checked`, "true");
          $(this).attr("id", "checked");
          console.log($(this))
    } else if($(this).attr("id") === "checked") {
      $(this).attr("id", "unchecked");
      clickedElementClass = $(this).attr("class");
      localStorage.removeItem(`${clickedElementClass} checked`)
    }
  });
});


//Adding a remove option to delete the task from local storage. 
$(document).on('click', '#close', function () {
  let key = $(this).prev().attr('class');
  let checkedKey = `${key} checked`;
  localStorage.removeItem(key)
  localStorage.removeItem(checkedKey);
  $(this).prev().hide();
  $(this).hide();
})
