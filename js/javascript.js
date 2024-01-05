import './Components.js'

window.addEventListener('resize', sizeChanged);

document.addEventListener('keydown', (e) => {
    if (e.code === "ArrowRight") {
        window.open(document.getElementById("next").href, "_self")
    }
    else if (e.code === "ArrowLeft") {
        window.open(document.getElementById("previous").href, "_self")
    }
});

// Reworked Nav Code
const sideButton = document.getElementById('sideButton');
const sideNavLeft = document.getElementById('sidenavLeft');
sideButton.addEventListener('click', () => {
    if (sideNavLeft.style.width == 0) {
        sideButton.classList.add('pressed');
        sideNavLeft.style.width = '21.5em';
    } else {
        sideNavLeft.style.width = '';
        sideButton.classList.remove('pressed');
    }
})

// Reworked Dono Menu
const donoMenusContainer = document.querySelectorAll('.donoMenu');
donoMenusContainer.forEach(element => {
    const donoMenuBtn = element.previousElementSibling;
    donoMenuBtn.addEventListener('click', () => {
        element.classList.toggle('hidden');
        setTimeout(() => {
            element.classList.add('hidden');
        }, 5000);
    })
});

function sizeChanged() {
    if (document.documentElement.clientWidth > 760) {
        document.getElementById("sideButton").style.marginLeft = "";
        document.getElementById("sidenavLeft").style.width = "";
    }
}

function titleGlow(enable) {
    if (enable) {
        document.getElementById("title").classList.add("glow");
        document.getElementById("backdrop").classList.add("blur");
    }
    else {
        document.getElementById("title").classList.remove("glow");
        document.getElementById("backdrop").classList.remove("blur");
    }
}

function fadeOut(element) {
    element.style.opacity = "0%";
}

function rotate(element, rotation = 180) {
    element.style.transform = 'rotatex(' + rotation + 'deg)';
}

function expandCard(thisObj, $open, $dontReset) {
    const chevron = thisObj.getElementsByClassName("expander-info")[0]
    if ($open.classList.contains('expander-opened') && !$dontReset) {
        chevron.textContent = "Show";
        $open.classList.remove('expander-opened');
        setTimeout(() => $open.style.display = "none", 400);
        thisObj.classList.remove('active');
    }
    else {
        $open.classList.add('expander-opened');
        chevron.textContent = "Hide";
        $open.style.display = "block";
        thisObj.classList.add('active');
    }
}