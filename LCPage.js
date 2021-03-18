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

var roomName = localStorage.getItem("roomName");
var userName = localStorage.getItem("userName");

function send() {
    msg = document.getElementById("msg").value;
    firebase.database().ref(roomName).push({
        name: userName,
        message: msg,
        like: 0
    });
    document.getElementById("msg").value = "";
}

function getData() {
    firebase.database().ref("/" + roomName).on('value', function (snapshot) {
        document.getElementById("outputRoomDiv").innerHTML = ""; 
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val(); 
            if (childKey != "purpose") {
                firebaseMessageID = childKey;
                messageData = childData;
                console.log(firebaseMessageID);
                console.log(messageData);
                var name = messageData['name'];
                var message = messageData['message'];
                var like = messageData['like'];
                nameWithTag= "<h4> " + name + "<img class='userTick' src='tick.png'></h4>";
                messageWithTag= "<h4 class='message_h4'>" + message + "</h4>";
                likeButton = "<button class='btn btn-warning' id=" + firebaseMessageID + " value=" + like + " onclick='updateLike(this.id)'>";
                spanWithTag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";

                row = nameWithTag + messageWithTag + likeButton + spanWithTag;
                document.getElementById("outputRoomDiv").innerHTML += row;
                
            }
        });
    });
}

getData();


function updateLike(messageID) {
    console.log("clicked on like button - " + messageID);
    buttonID = messageID;
    likes = document.getElementById(buttonID).value;
    updLikes = Number(likes) + 1;
    console.log(updLikes);

    firebase.database().ref(roomName).child(messageID).update({
        like: updLikes
    });

}

function logout() {
    localStorage.removeItem("userName");
    localStorage.removeItem("roomName");
    window.location.replace("LC.html");
}
