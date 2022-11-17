addEventListener("load", (event) => {
    $.ajax({
        url: "http://localhost:3001/user/getUsers",
        type: "POST",
       success: async function (resul) {
            console.log(resul.message)
            
        },
        error: function (err) {
            console.log(msg);
        }
    })
});