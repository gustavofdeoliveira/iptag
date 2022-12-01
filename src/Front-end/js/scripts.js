let auth = window.localStorage.getItem('auth');

window.onload = function () {
  var duration = 2; // Converter para segundos
  document.getElementById("body-pd").style.display = "none";
  document.getElementById("body-pd").insertAdjacentHTML("beforebegin", '<div class="container-background" id="loader"><div class="loader"><div></div>');

  startTimer(duration); // iniciando o timer

}

function startTimer(duration,) {
  var timer = duration, seconds;
  var setIntervalo = setInterval(function () {
    seconds = parseInt(timer % 60, 10);
    if (--timer <= 0) {
      clearInterval(setIntervalo);
      document.getElementById("loader").remove();
      document.getElementById("body-pd").style.display = "flex";
      createNavbar();

    }
  }, 1000);
}

var $input = document.getElementById('image'),
  $fileName = document.getElementById('image-name');

if ($fileName) {
  $input.addEventListener('change', function () {
    $fileName.textContent = this.value;
  });
}

function Logout() {
  window.localStorage.removeItem('auth')
  window.location.href = '/view/login.html'
}

async function createNavbar() {

  await $.ajax({
    url: "http://localhost:3001/user/get",
    headers: { "Authorization": ` ${auth}` },
    success: function (resul) {
      user = resul.message;
      if (!user.img) {
        user.img = "../images/avatar.png";
      }
      $(`<header class="header" id="header">
            
            <div class="header_toggle" onclick="showNav()"> <i class='bx bx-menu' id="header-toggle"></i> </div>
            <div class="d-flex align-items-center"> <img class="img-navbar" src="${user.img}">
            <div class="dropdown">
              <a class="dropdown-navbar dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                ${user.nome}
              </a>
              <div class="dropdown-menu dropdown-right" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="view-profile.html"> Meu perfil</a>
                <a class="dropdown-item" onclick="Logout()">Sair <i class="fa fa-sign-out" aria-hidden="true"></i></a>
              </div>
            </div>
          </div>
          </header>
          <div class="l-navbar" id="nav-bar">
            <nav class="nav">
              <div>
                
                <a href="#" class="nav_logo">
                  <img class="logo-white" src="../images/logo-ipt-white.png">
                  <span class="nav-logo-name">IPTag</span>
                </a>
                <div class="nav_list">
                  <a href="dashboard.html" class="nav_link active">
                    <i class='bx bx-grid-alt nav_icon'></i>
                    <span class="nav_name">Dashboard</span>
                  </a>
        
                  <a href="#" class="nav_link">
                    <i class='bx bx-bell nav_icon'></i>
                    <span class="nav_name">Notificações</span>
                  </a>
                  <a href="view-devices.html" class="nav_link">
                    <i class='bx bx-search nav_icon'></i>
                    <span class="nav_name">Buscar</span>
                  </a>
                  <a href="view-users.html" class="nav_link">
                    <i class='bx bxs-user nav_icon'></i>
                    <span class="nav_name">Usuários</span>
                  </a>
        
                </div>
              </div>
            </nav>
          </div>`).insertAfter("#body-pd");

    }
  }).fail(function (err) {
    console.log(err.responseJSON.message)
  })
}


  const showNavbar = (toggleId, navId, bodyId, headerId) => {
    const toggle = document.getElementById(toggleId),
      nav = document.getElementById(navId),
      bodypd = document.getElementById(bodyId),
      headerpd = document.getElementById(headerId)

    // Validate that all variables exist
    if (toggle && nav && bodypd && headerpd) {
      toggle.addEventListener('click', () => {
        // show navbar
        nav.classList.toggle('showw')
        // change icon
        toggle.classList.toggle('bx-x')
        // add padding to body
        bodypd.classList.toggle('body-pd')
        // add padding to header
        headerpd.classList.toggle('body-pd')
      })
    }
  }

  
  /*===== LINK ACTIVE =====*/
  const linkColor = document.querySelectorAll('.nav_link')

  function colorLink() {
    if (linkColor) {
      linkColor.forEach(l => l.classList.remove('active'))
      this.classList.add('active')
    }
  }
  linkColor.forEach(l => l.addEventListener('click', colorLink))

  // Your code to run since DOM is loaded and ready


function showNav() {
  showNavbar('header-toggle', 'nav-bar', 'body-pd', 'header')
};