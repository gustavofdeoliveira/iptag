var pressEnter = document.getElementById('senha')
pressEnter.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {
        verifyLogin()
    }
});

function verifyLogin() {
    debugger
    if ($("#email").val() && $("#senha").val()) {
        $.post("http://localhost:3001/user/login",
            {
                "email": $("#email").val(),
                "senha": $("#senha").val()
            }
            , function (msg) {
                console.log(msg);
                window.location.href = '/view/dashboard.html'
            }).fail(function (err) {
                debugger
                errorMessage(err.responseJSON.error)
            })
    }
}