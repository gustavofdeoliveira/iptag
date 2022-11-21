window.addEventListener("load", (event) => {
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

$( "#delete" ).click(function() {
    $( '<div class="modal" id="modal" tabindex="-1" role="dialog"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">Excluir</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true" onclick="close_modal()">&times;</span></button></div><div class="modal-body"><p>Você deseja realmente excluir permanentemente este usuário?</p></div><div class="modal-footer"><div class="col-sm-12"><div class="row"><div class="col-sm-6"><button onclick="close_modal()" type="button" class="btn-white-blue">Não</button></div><div class="col-sm-6"><button type="button" class="btn-blue" data-dismiss="modal" onclick="save()">Sim</button></div></div></div></div></div></div></div>'
    ).insertAfter( "#body-pd" );
    $("#modal").show();
  });

  
function close_modal () {
    document.getElementById("modal").style.display = "none";
  };

  function save () {
    document.getElementById("modal").style.display = "none";
  };