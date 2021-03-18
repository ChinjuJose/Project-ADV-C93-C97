var userName;

function addUser(){
    userName = document.getElementById("userName").value;
    localStorage.setItem("userName",userName);
    window.location = "LCRoom.html";
}