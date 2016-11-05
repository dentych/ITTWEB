$(document).ready(function () {
    var id = $("#programId").text();

    $("#btnBack").click(function () {
        window.location.href = "/program/" + id;
    });

    $("#btnAdd").click(function (event) {
        event.preventDefault();

        var chosenExercises = [];
        $("#exerciseTable").find("tr").each(function (index, element) {
            if (index == 0) return;
            var items = $(this).find("td");

            if (items.first().contents()[0].checked) {
                var set = items.find("input[name=sets]").val();
                var rep = items.find("input[name=reps]").val();
                if (set.length > 0 && rep.length > 0) {
                    chosenExercises.push({
                        id: 1,
                        sets: set,
                        reps: rep
                    });
                }
                else {
                    alert("You must fill out both sets and repitions/time for all chosen exercises");
                    return false;
                }
            }
        });

        if (chosenExercises.length > 0) {
            // Send data
            $.post(window.location.href, {chosenExercises: chosenExercises}, function (data) {
                console.log("Successfully called the post!\n" +
                    "Received this: ");
                console.log(data);
            });
        }
    });
});