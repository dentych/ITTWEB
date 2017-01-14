$(document).ready(function () {
    $.material.init();
    $("#btnAddProgram").click(function () {
        var programName = prompt("Enter Program name:", "Titel here");

        if(programName !== "" && programName != undefined) {
            $.ajax({
                url: "/program",
                method: "POST",
                data: JSON.stringify({programName: programName}),
                contentType: "application/json",
                success: function(msg){
                    window.location.reload();
                },
                error: function(msg) {
                    console.log("Much error");
                    console.log(msg);
                }
            });
        }
    });    
});

function seeProgram(index) {
    window.location.href = "/program/" + index;
}

function deleteProgram(index) {
    var answer = confirm("You damn sure u gon delete dis program?");

    if (answer) {
        $.ajax({
            url: "/program/" + index,
            type: "DELETE",
            success: function(data) {
                window.location.reload();
            },
            contentType: "application/json"
        });
    }
}