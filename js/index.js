var name;
var email;
var idea;
var currentIdea = 0;
var ideaList;
var keys = [];

$(document).ready(function() {
    newIdea(currentIdea);

    $("#btn-connect").click(function() {
        $("#idea").text("");
        $("#pair-name").text(name);
        $("#pair-email").text(email);
    });

    $("#btn-next").click(function() {
       newIdea(currentIdea);
    });

    var db = firebase.database().ref("/ideas/");

    db.on("value", function(snap) {
        snap.forEach(function(childSnap) {
            keys.push(childSnap.key);
        });
    });

    $("#form").on("submit", function() {
        var enteredName = $("#name").val();
        var newEmail = $("#email").val();
        var newIdea = $("#idea").val();

        db.push({
            name: enteredName,
            email: newEmail,
            idea: newIdea
        }).then(function() {
            alert("Thank you, your idea is being added!");
            window.location.replace("/index.html");
        });
    });
});

function newIdea(number) {
    var db = firebase.database().ref("/ideas/");
    //Child reference to the specific idea
    var newIdeaRef = db.child("-KZ81Y2eSVpHV4A-jcof" + "/");

    console.log(keys);
    console.log(keys[number]);

    //Clear out the contact info if that is displayed from the previous idea
    $("#pair-name").text("");
    $("#pair-email").text("");

    //Set our global variables equal to the current idea
    newIdeaRef.once("value", function(snap) {
        name = snap.val().name;
        email = snap.val().email;
        idea = snap.val().idea;
    });

    //Set new idea
    $("#idea").text(idea);

    //Reset currentIdea making sure it doesn't excede the keys
    if(currentIdea < keys.length - 1) {
        currentIdea++;
    } else {
        currentIdea = 0;
    }
};
