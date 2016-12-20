var name;
var email;
var idea;
var currentIdea = 0;
var ideaList;
var keys = [];

$(document).ready(function() {

    var db = firebase.database().ref("/ideas/");

    db.on("value", function(snap) {
        snap.forEach(function(childSnap) {
            keys.push(childSnap.key);
        });

        newIdea(currentIdea);
    });

    $("#btn-connect").click(function() {
        $("#idea").fadeOut(function() {
            $("#pair-name").text(name).fadeIn();
            $("#pair-email").text(email).fadeIn();
        });
    });

    $("#btn-next").click(function() {
       newIdea(currentIdea);
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

    //Clear out the contact info if that is displayed from the previous idea
    $("#pair-name").text("").fadeOut();
    $("#pair-email").text("").fadeOut();

    if(keys.length == 0) {
        $("#idea").text("Add your idea now!");
        return;
    };

    var db = firebase.database().ref("/ideas/");

    //Child reference to the specific idea
    var newIdeaRef = db.child(keys[number] + "/");

    //Set our global variables equal to the current idea
    newIdeaRef.once("value", function(snap) {
        name = snap.val().name;
        email = snap.val().email;
        idea = snap.val().idea;
    }).then(function() {
        $("#idea").fadeOut(function() {
            $(this).text(idea).fadeIn();
        });
    });

    //Reset currentIdea making sure it doesn't excede the keys
    if(currentIdea < keys.length - 1) {
        currentIdea++;
    } else {
        currentIdea = 0;
    }
};
