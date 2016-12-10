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

    $("#form").on("submit", function() {

        var enteredName = $("#name").val();
        var newEmail = $("#email").val();
        var newIdea = $("#idea").val();
        var uId = randomNumer();
        var db = firebase.database().ref("/ideas/");

        db.child(uId + "/").set({
            name: enteredName,
            email: newEmail,
            idea: newIdea
        });

        alert("Thank you, your idea is being added!");

        setTimeout(function() {
            window.location.replace("/index.html");
        }, 1000);
    });

});

function randomNumer() {
    var max = 9999;
    var min = 1000;
    return Math.floor((Math.random() * (max - min) + min));
};

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
