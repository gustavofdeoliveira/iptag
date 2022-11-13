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

        }
    }, 1000);
}



document.addEventListener("DOMContentLoaded", function (event) {

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

    showNavbar('header-toggle', 'nav-bar', 'body-pd', 'header')

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
});

var $input    = document.getElementById('image'),
    $fileName = document.getElementById('image-name');

$input.addEventListener('change', function(){
  $fileName.textContent = this.value;
});