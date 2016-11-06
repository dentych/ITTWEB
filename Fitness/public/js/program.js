$(document).ready(function () {
    var id = $("#programId").text();

    $("#btnHome").click(function () {
        window.location.href = "/";
    });

    $("#btnComplete").click(function () {
        // Send data
        $.post("/program/" + id + "/complete", function (data) {
            $("span#completed").text(data);
        });
    });

    $("#btnAddExercise").click(function () {
        window.location.href = "/program/" + id + "/add-exercise";
    });
});

function deleteExercise(index) {
    var id = $("#programId").text();
    $.ajax({
        url: "/program/" + id + "/exercise/" + index,
        type: 'DELETE',
        success: function(data) {
            console.log("received:");
            console.log(data);
            window.location.reload();
        },
        contentType: "text/json"
    });
}