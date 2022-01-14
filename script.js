const ol = document.getElementById("ol");
var i = findTasks()

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
  i += 1;
  var listItem = document.getElementById("add").value;
  if(listItem === "") {
    alert('You must write something')
  } else {
    localStorage.setItem(i, listItem);
    createList();
  }
  document.getElementById("add").value = '';
}

$('#add').keyup(function(event) {
  if(event.which === 13) {
    addListToLocalstorage();
  }
})

function createList() {
  let Content = localStorage.getItem(i);
  ol.innerHTML += `<div id="li_container"><li class="${i}">${Content}</li><i id="close" class="far fa-times-circle"></i></div>`;
}

function displayList() {
  let loopLength = findTasks();
  for (let n = 0; n <= loopLength; n++) {
    let listContent = localStorage.getItem(n);
    if (listContent) {
      ol.innerHTML += `<div id="li_container"><li class="${n}" id="unchecked">${listContent}</li><i id="close" class="far fa-times-circle"></i></div>`;
    }
  }
  for (let n = 0; n < loopLength; n++) {
    if(localStorage.getItem(`${n} checked`) === 'true') {
      $(`.${n}`).attr('id','checked')
    }
  } 
}

$(document).ready(function () {
  $("#ol").on("click", "li", function () {
    let loopLength = findTasks();
    var clickedElementClass;
    if($(this).attr("id") === "unchecked") {
          clickedElementClass = $(this).attr("class");
          localStorage.setItem(`${clickedElementClass} checked`, "true");
          $(this).attr("id", "checked");
    } else if($(this).attr("id") === "checked") {
      $(this).attr("id", "unchecked");
      for(let i=0;i<loopLength;i++) {
        if($(this).attr("class") === i) {
          localStorage.removeItem(`${i} checked`)
        }
      }
    }
  });
});

$(document).on('click', '#close', function () {
  let key = $(this).prev().attr('class');
  let checkedKey = `${key} checked`;
  localStorage.removeItem(key)
  localStorage.removeItem(checkedKey);
  $(this).prev().hide();
  $(this).hide();
})
