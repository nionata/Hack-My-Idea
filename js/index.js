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
        window.location.href = "index.html";
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
    console.log("asd");
    var newName = 5;
    var newEmail = 5;
    var newIdea = 5;

    $.getJSON("input.json", function(json) {
        json[Object.keys(json).length]["name"] = newName;
        json[Object.keys(json).length]["email"] = newEmail;
        json[Object.keys(json).length]["idea"] = newIdea;
        console.log(json[Object.keys(json).length]);
    });


}
