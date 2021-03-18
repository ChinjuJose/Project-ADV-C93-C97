// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyALEDKjipSksQfqSx4NOvmOtq9yZDGKM8k",
    authDomain: "kwitter-54ee8.firebaseapp.com",
    databaseURL: "https://kwitter-54ee8-default-rtdb.firebaseio.com",
    projectId: "kwitter-54ee8",
    storageBucket: "kwitter-54ee8.appspot.com",
    messagingSenderId: "908659477750",
    appId: "1:908659477750:web:fb75a3a70d90c0eb08f0d7"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

var roomName;
var userName = localStorage.getItem("userName");
document.getElementById("userName").innerHTML = "Welcome " + userName + "!";

function addRoom() {
    roomName = document.getElementById("roomName").value;
    console.log("Room name :" +roomName)

    firebase.database().ref("/").child(roomName).update({
        purpose: "Adding room name"
    });

    console.log("Done");

    localStorage.setItem("roomName", roomName);
    window.location = "LCPage.html";
}

function getData() {
    firebase.database().ref("/").on('value', function (snapshot) {
        document.getElementById("outputRoomDiv").innerHTML = ""; 
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            roomNames = childKey;
            console.log("Room Names - " + roomNames);
            row = "<div class='roomNames' id=" + roomNames + " onclick='redirectToRoomName(this.id)' >#" + roomNames + "</div><hr>";
            document.getElementById("outputRoomDiv").innerHTML += row;
        });
    });

}

getData();

function redirectToRoomName(name) {
    console.log(name);
    localStorage.setItem("roomName", name);
    window.location = "LCPage.html";
}

function logout() {
    localStorage.removeItem("userName");
    localStorage.removeItem("roomName");
    window.location = "LC.html";
}