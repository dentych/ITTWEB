$(document).ready(function () {
    $.material.init();
});

function formSubmit() {
    var form = $("#form");

    if (!form[0].checkValidity()) {
        return false;
    }

    var title = $("#title").val();
    var description = $("#description").val();
}