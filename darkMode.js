function toggleDarkMode() {
    var elements = document.querySelectorAll("body, header, div, a, button");

    elements.forEach(function(element) {
        element.classList.toggle("dark-mode");
    });

    var image = document.querySelector(".headerdiv.homebutton img");
    var currentSrc = image.getAttribute("src");

    if (currentSrc === "media/HomeDark.png") {
        image.setAttribute("src", "media/HomeLight.png");
        //localStorage.setItem("darkModeEnabled", "true");
    } else {
        image.setAttribute("src", "media/HomeDark.png");
        //localStorage.removeItem("darkModeEnabled");
    }
    
    var sections = document.querySelectorAll("section");
    sections.forEach(function(section) {
        var image = section.querySelector("img");
        if (image) {
            var currentSrc = image.getAttribute("src");
            if (currentSrc.includes("Dark")) {
                var newSrc = currentSrc.replace("Dark", "Light");
                image.setAttribute("src", newSrc);
            }
        }
    });
}

/*DARK MODE

function applyDarkModePreference() {
    var darkModeEnabled = localStorage.getItem("darkModeEnabled");
    
    if (darkModeEnabled === "true") {
        toggleDarkMode();
    }
}

applyDarkModePreference();*/
