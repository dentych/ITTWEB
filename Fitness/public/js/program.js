$(document).ready(function () {
    var id = $("#programId").text();

    $("#btnHome").click(function () {
        window.location.href = "/";
    });

    $("#btnComplete").click(function () {
        alert("You marked the program as completed!");
    });

    $("#btnAddExercise").click(function () {
        window.location.href = "/program/" + id + "/add-exercise";
    });

    $("#wat").text(window.location.pathname);
});