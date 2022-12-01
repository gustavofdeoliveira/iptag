var pressEnter = document.getElementById('senha')
pressEnter.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {
        verifyLogin()
    }
});

function verifyLogin() {    
    if ($("#email").val() && $("#senha").val()) {
        $.post("http://localhost:3001/user/login",
            {
                "email": $("#email").val(),
                "senha": $("#senha").val()
            }
            , function (msg) {
                if (msg.token) {
                    window.localStorage.setItem('auth', msg.token)
                }
                console.log(msg);
                window.location.href = '/view/dashboard.html'
            }).fail(function (err) {
                window.location.href = '/view/login.html'
                errorMessage(err.responseJSON.error)
            })
    }
}