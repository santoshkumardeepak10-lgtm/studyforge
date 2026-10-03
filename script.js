function toggleMenu() {
    const nav = document.getElementById("navMenu");
    
    if (nav) {
        nav.classList.toggle("show");
    }
}


function toggleTheme() {
    
    document.body.classList.toggle("dark");
    
    const darkMode = document.body.classList.contains("dark");
    
    localStorage.setItem(
        "studyforge-theme",
        darkMode ? "dark" : "light"
    );
    
    updateThemeButton();
}


function updateThemeButton() {
    
    const button = document.querySelector(".theme-btn");
    
    if (!button) return;
    
    if (document.body.classList.contains("dark")) {
        button.textContent = "☀️";
    } else {
        button.textContent = "🌙";
    }
}


window.addEventListener("DOMContentLoaded", function() {
    
    const savedTheme =
        localStorage.getItem("studyforge-theme");
    
    if (savedTheme === "dark") {
        document.body.classList.add("dark");
    }
    
    updateThemeButton();
    
});