  const ol = document.getElementById("ol");
  var listArr = [];
  const li = document.getElementsByTagName("LI");
  var i = localStorage.length;
  

  function addListToLocalstorage() {
    i += 1;
    var listItem = document.getElementById("add").value;
    if(listItem === "") {
      alert('You must write something')
    } else {
      localStorage.setItem(`Task${i}`, listItem);
      createList();
    }
  }

  function createList() {
    let add = localStorage.length;
    let Content = localStorage.getItem(`Task${i}`);
    ol.innerHTML += `<div id="li_container"><li class="Task${i}">${Content}</li><i id="close" class="far fa-times-circle"></i></div>`;
  }

function displayList() {
    for (let n = 0; n <= localStorage.length; n++) {
      let listContent = localStorage.getItem(`Task${n}`);
      if (listContent) {
        ol.innerHTML += `<div id="li_container"><li class="Task${n}" id="unchecked">${listContent}</li><i id="close" class="far fa-times-circle"></i></div>`;
      }
    }
    for (let n = 0; n < localStorage.length; n++) {
      var status = `Task${n}`;
      if(localStorage.getItem(`${status} checked`) === 'true') {
        $(`.Task${n}`).attr('id','checked')
      }
    } 
}
  

  $(document).ready(function () {
    $("#ol").on("click", "li", function () {
      var clickedElementClass;
      if($(this).attr("id") === "unchecked") {
            clickedElementClass = $(this).attr("class");
            localStorage.setItem(`${clickedElementClass} checked`, "true");
            $(this).attr("id", "checked");
      } else if($(this).attr("id") === "checked") {
        $(this).attr("id", "unchecked");
        for(let i=0;i<localStorage.length;i++) {
          if($(this).attr("class") === `Task${i}`) {
            localStorage.removeItem(`Task${i} checked`)
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
    i -= 1;
  })
