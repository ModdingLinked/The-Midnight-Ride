var menuIsOpen = false;

window.addEventListener('resize', sizeChanged);
document.addEventListener('DOMContentLoaded', function () {
    updateProgressBarAndFadeIn();
    createRightSidebar();
    createImageHandlers();
    markActivePage();
    resizeAllTextAreas();
});
window.onscroll = updateProgressBarAndFadeIn;

document.addEventListener('keydown', (e) => {
    if (e.code === "ArrowRight") {
        window.open(document.getElementById("next").href, "_self")
    }
    else if (e.code === "ArrowLeft") {
        window.open(document.getElementById("previous").href, "_self")
    }
});

function sizeChanged() {
    var sidebar = document.getElementsByClassName("left-sidebar");
    if (sidebar && sidebar.length > 0) {
        if (document.documentElement.clientWidth > 760) {
            document.getElementsByClassName("left-sidebar")[0].style.width = "";
        }
    }

    resizeAllTextAreas();
}

function toggleNav() {
    var sidbear = document.getElementsByClassName("sidebar left-sidebar")[0];
    if (sidbear.style.width == 0) {
        sidbear.style.width = "75%";
        globalThis.menuIsOpen = true;
    }
    else {
        sidbear.style.width = "";
        globalThis.menuIsOpen = false;
    }
}

function fadeOut(element) {
    element.style.opacity = "0%";
}

function rotate(element, rotation = 180) {
    element.style.transform = 'rotatex(' + rotation + 'deg)';
}

function expandCard(thisObj, $open, $dontReset) {
    const chevron = thisObj.getElementsByClassName("chevron")[0]
    if ($open.classList.contains('expander-opened') && !$dontReset) {
        rotate(chevron, 0)
        $open.classList.remove('expander-opened');
        setTimeout(() => $open.style.display = "none", 400);
        thisObj.classList.remove('active');
    }
    else {
        $open.classList.add('expander-opened');
        rotate(chevron, 180);
        $open.style.display = "block";
        thisObj.classList.add('active');

        const textareas = $open.querySelectorAll('.auto-resize');
        if (textareas) {
            console.log("Found textareas: " + textareas.length);
            for (var i = 0; i < textareas.length; i++) {
                autoResize(textareas[i]);
            }
        }
    }
}

function resizeAllTextAreas() {
    const textareas = document.querySelectorAll('.auto-resize');
    if (textareas) {
        for (var i = 0; i < textareas.length; i++) {
            autoResize(textareas[i]);
        }
    }
}

function autoResize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}

function emToPixels(em) {
    const baseFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    return em * baseFontSize;
}

function updateProgressBarAndFadeIn() {
    var sections = document.getElementsByClassName("section");
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = window.innerHeight;

    if (sections) {
        for (var i = 0; i < sections.length; i++) {
            var sectionTop = sections[i].getBoundingClientRect().top;
            var sectionHeight = sections[i].clientHeight;

            if (sectionTop < height && sectionTop + sectionHeight > 0) {
                sections[i].classList.add("fade-in");
            }
        }
    }

    var progressBar = document.getElementsByClassName("progress-bar")[0];
    if (progressBar) {
        height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        var scroll = (winScroll / height);
        var bottomMargin = (height - 25) / height;
        progressBar.style.width = scroll * 100 + "%";
    }

    var sidebars = document.getElementsByClassName("sidebar");
    if (sidebars) {
        var styleVal = "calc(100vh - 6.25em)";

        if (document.documentElement.clientHeight > 900 && scroll > bottomMargin) {
            styleVal = "calc(100vh - 8.5em)";
        }

        for (var i = 0; i < sidebars.length; i++) {
            sidebars[i].style.height = styleVal;
        }
    }
}

function createRightSidebar() {
    const content = document.getElementsByClassName('content')[0];
    if (!content)
        return;

    const sections = content.getElementsByClassName('section');
    if (!sections)
        return;

    var sidebarContent = document.getElementById('sidebarContent');
    if (!sidebarContent)
        return;

    for (var i = 0; i < sections.length; i++) {
        var section = sections[i];
        const headers = section.querySelectorAll('h2');
        const cards = section.querySelectorAll('.card');

        headers.forEach(header => {
            if (!header.innerHTML || header.innerHTML.length == 0)
                return;

            // Create the section div
            const sectionDiv = document.createElement('div');
            sidebarContent.appendChild(sectionDiv);

            // Create the header link
            const bold = document.createElement('b');
            sectionDiv.appendChild(bold);

            const separator = document.createElement('a');
            separator.href = `#${section.id}`;
            separator.textContent = header.innerHTML;
            bold.appendChild(separator);

            // Create section links
            cards.forEach(card => {
                var text;
                const title = card.getAttribute('title');
                if (title && title.length > 0) {
                    text = title;
                }
                else {
                    text = card.id.replace(/([A-Z])/g, ' $1').trim();
                }

                if (!text || text.length == 0) {
                    return;
                }

                const cardId = card.id;
                const cardLink = document.createElement('a');
                cardLink.href = `#${cardId}`;
                cardLink.textContent = text;

                sectionDiv.appendChild(cardLink);
            })
        });
    };
};


function markActivePage() {
    const leftSidebar = document.querySelector(".sidebar.left-sidebar");

    if (!leftSidebar)
        return;

    const sidebarLinks = leftSidebar.querySelectorAll(".sidebar a");

    if (!sidebarLinks)
        return;

    const currentPage = "./" + window.location.pathname.split("/").pop();

    let currentIndex = -1;

    // Loop through the links to find the current page index
    sidebarLinks.forEach((link, index) => {
        const linkPage = link.getAttribute("href");

        if (linkPage === currentPage) {
            link.classList.add("active");
            currentIndex = index;

            if (link.classList.contains("sublink")) {
                link.setAttribute('style', 'display:flex !important');
            }
        }
    });

    const allowedPageLinks = leftSidebar.querySelectorAll(".pageLinks");
    if (allowedPageLinks) {
        let linkCount = 0;

        for (let i = 0; i < allowedPageLinks.length; i++) {
            linkCount += allowedPageLinks[i].children.length;
        }

        if (currentIndex > linkCount - 1)
            currentIndex = -1;

        createPageArrows(currentIndex);
    }
}

function createPageArrows(currentIndex) {
    const linkSections = document.querySelectorAll(".pageLinks");

    if (!linkSections)
        return;

    const prevLink = document.getElementById("previous");
    const nextLink = document.getElementById("next");

    let sidebarLinks = [];

    for (let i = 0; i < linkSections.length; i++) {
        var list = linkSections[i].querySelectorAll(".sidebar a");
        for (let j = 0; j < list.length; j++) {
            sidebarLinks.push(list[j]);
        }
    }

    // Set the previous and next links if the current page is found
    // Otherwise default to the home page
    if (currentIndex !== -1) {
        if (prevLink) {
            if (currentIndex > 0) {
                const prevPage = sidebarLinks[currentIndex - 1];
                prevLink.href = prevPage.getAttribute("href");
                prevLink.querySelector(".arrowText").textContent = prevPage.textContent.trim();
            } else {
                prevLink.style.display = "none";
            }
        }

        if (nextLink) {
            if (currentIndex < sidebarLinks.length - 1) {
                const nextPage = sidebarLinks[currentIndex + 1];
                nextLink.href = nextPage.getAttribute("href");
                nextLink.querySelector(".arrowText").textContent = nextPage.textContent.trim();
            } else {
                nextLink.style.display = "none";
            }
        }
    }
    else if (prevLink) {
        console.log("Current page not found in sidebar links");
        const prevPage = sidebarLinks[0];
        prevLink.href = prevPage.getAttribute("href");
        prevLink.querySelector(".arrowText").textContent = prevPage.textContent.trim();
    }
}

function createImageHandlers() {

    const overlay = document.getElementById('image-overlay');
    const enlargedImage = document.getElementById('enlarged-image');

    if (!enlargedImage || !overlay)
        return;

    const images = document.querySelectorAll('.content-img');
    if (!images)
        return;

    images.forEach(image => {
        image.addEventListener('click', function () {
            overlay.style.display = "flex";
            enlargedImage.src = this.src;
        });
    });

    overlay.addEventListener('click', function () {
        overlay.style.display = "none";
        enlargedImage.src = '';
    });
}

function isChildOfSidebar(element) {
    while (element) {
        if (element.classList && element.classList.contains('sidebar') && element.classList.contains('left-sidebar')) {
            return true;
        }
        element = element.parentElement;
    }
    return false;
}

document.addEventListener('click', function (event) {
    if (globalThis.menuIsOpen) {
        const target = event.target;
        if (target.id != "navButton" && isChildOfSidebar(target) == false) {
            toggleNav();
        }
    }
});