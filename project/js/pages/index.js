$(document).ready(function() {
    $("#loginForm").submit(function(e) {
        e.preventDefault();
        userController.login(
            $("#loginFormEmail").val(),
            $("#loginFormPassword").val(),
            function () {
                window.location.href = "infoAjudar.html"
            },
            function (msg) {
                alert(msg);
            }
        )
    })
})