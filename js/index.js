var name;
var email;
var idea;
var currentIdea = 1;

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

    $("#submit").click(function() {
        var enteredName = $("#name").val();
        var newEmail = $("#email").val();
        var newIdea = $("#idea").val();

        if(enteredName == "" || newEmail == "" || newIdea == "") {
            alert("Please try again");
            return;
        }

        var db = firebase.database().ref("/users/" + enteredName + "/");
        db.child("email").set(newEmail);
        db.child("idea").set(newIdea);

    });

});

function newIdea(number) {
    $.getJSON("input.json", function(json) {
        $("#pair-name").text("");
        $("#pair-email").text("");
        name = json[number]["name"];
        email = json[number]["email"];
        idea = json[number]["idea"]
        $("#idea").text(idea);

        if(currentIdea == Object.keys(json).length) {
            currentIdea = 1;
        } else {
            currentIdea++;
        }
    });

};

function setNewIdea() {


}
