const ul = document.getElementById("ul");
var listArr = [];
const li = document.getElementsByTagName("LI");

function createList() {
    var i = localStorage.length;
    i += 1;
    var listItem = document.getElementById("add").value;
    localStorage.setItem(i, listItem);
    addList()
}

function addList() {
    let add = localStorage.length
    let Content = localStorage.getItem(add)
    ul.innerHTML += `<li id="tasks"><i class="fas fa-check-circle"></i>${Content}<i class="fas fa-times-circle"></i></li>`
}

function displayList() {
    for(let n=1; n<=localStorage.length; n++) {
        let listContent = localStorage.getItem(n)
        ul.innerHTML += `<li id="tasks"><i class="fas fa-check-circle"></i>${listContent}<i class="fas fa-times-circle"></i></li>`;
    }
}






/*var li = document.createElement('li');
var displayItem = localStorage.getItem(n)
li.appendChild(document.createTextNode(displayItem))
ul.appendChild(li)
console.log(n)*/