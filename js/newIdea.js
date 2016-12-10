$(document).ready(function() {
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
