$(document).ready(function () {


    $("#btnAddProgram").click(function () {

        var programName = prompt("Enter Program name:", "Titel here");
        


        if(programName != null) {

            $.ajax({
                type: "POST",
                url: "/",                
                data: {programName:programName},
                success: function(msg){
                    console.log("now??");
                    console.log(msg);
                },
                contentType: "text/json"
            });
        }
    });    
});

function seeProgram(index) {
    window.location.href = "/program/" + index;
}