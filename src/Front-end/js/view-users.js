window.addEventListener("load", (event) => {
    debugger
    $.ajax({
        url: "http://localhost:3001/user/getUsers",
        type: "GET",
        headers: {"Authorization": `Bearer ${msg.token}`},
        success: function(resul) {
            console.log(resul);
        }
    }).fail(function(err) {
        console.log(err.responseJSON.error)
        errorMessage(err.responseJSON.error)
    })
});
