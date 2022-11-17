var pressEnter = document.getElementById('senha')
pressEnter.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {
        verifyCreate()
    }
});

function verifyCreate() {
    if ($("#nome").val() && $("#cargo").val() && $("#setor").val() && $("#email").val() && $("#senha").val()) {
        debugger
        $.ajax({
            url: "http://localhost:3001/user/create",
            type: "POST",
            data: {
                nome: $("#nome").val(),
                setor: $("#setor").val(),
                cargo: $("#cargo").val(),
                email: $("#email").val(),
                senha: $("#senha").val()
            }, success: async function (resul) {
                console.log(resul.message)
                window.location.href = '/view/view-users.html'
            },
            error: function (err) {
                console.log(msg);
            }
        })
    }
}