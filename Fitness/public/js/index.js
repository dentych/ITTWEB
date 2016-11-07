$(document).ready(function () {


    $("#btnAddProgram").click(function () {

        var programName = prompt("Enter Program name:", "Titel here");

        if(programName != null) {
        document.getElementById("btnAddProgram").innerHTML = programName;
        }

    });
});