var name;
var email;
var idea;
var currentIdea = 1;
var ideaList;

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


    const ideasRef = firebase.database().ref("/ideas/").child("5945/name");



    ideasRef.on("value", snap => {
        console.log(snap.val());
        /*ideaList = JSON.stringify(snap.val());
        console.log(JSON.stringify(snap.val(), null, 3));*/
    });

    //var test = JSON.parse(ideaList);
    //alert(test["5945"]["name"]);

    console.log(ideaList);
    var keys = [];
    for(var k in ideaList) keys.push(k);

    console.log(keys);

    $("#form").on("submit", function() {

        var enteredName = $("#name").val();
        var newEmail = $("#email").val();
        var newIdea = $("#idea").val();
        var db = firebase.database().ref("/ideas/");

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
