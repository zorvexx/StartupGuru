// Form Validation Script
document.getElementById("ideaForm").addEventListener("submit", function (event) {
    event.preventDefault();
    let isValid = true;

    let name = document.getElementById("founderName").value.trim();
    let email = document.getElementById("founderEmail").value.trim();
    let startupName = document.getElementById("startupName").value.trim();
    let industry = document.getElementById("industry").value;
    let pitch = document.getElementById("pitch").value.trim();

    document.getElementById("nameError").innerText = "";
    document.getElementById("emailError").innerText = "";
    document.getElementById("startupNameError").innerText = "";
    document.getElementById("industryError").innerText = "";
    document.getElementById("pitchError").innerText = "";

    // 1. Name Validation
    if (name === "") {
        document.getElementById("nameError").innerText = "Please enter your name.";
        isValid = false;
    } else if (name.length < 2) {
        document.getElementById("nameError").innerText = "Name must be at least 2 characters.";
        isValid = false;
    }

    // 2. Email Validation
    if (email === "") {
        document.getElementById("emailError").innerText = "Please enter your email address.";
        isValid = false;
    } else if (!email.includes("@") || !email.includes(".")) {
        document.getElementById("emailError").innerText = "Please enter a valid email address.";
        isValid = false;
    }

    // 3. Startup Name Validation
    if (startupName === "") {
        document.getElementById("startupNameError").innerText = "Please enter your startup name.";
        isValid = false;
    }

    // 4. Industry Validation
    if (industry === "") {
        document.getElementById("industryError").innerText = "Please select an industry.";
        isValid = false;
    }

    // 5. Pitch Validation
    if (pitch === "") {
        document.getElementById("pitchError").innerText = "Please describe your problem and solution.";
        isValid = false;
    } else if (pitch.length < 20) {
        document.getElementById("pitchError").innerText = "Description must be at least 20 characters.";
        isValid = false;
    }

    if (isValid) {
        alert("Thank you! Your startup idea has been submitted successfully.");
        document.getElementById("ideaForm").reset();
    }
});

// Slider Script
let currentSlide = 0;
let slides = document.querySelectorAll(".slide");
let dots = document.querySelectorAll(".dot");

function showSlide(index) {
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }

    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
        dots[i].classList.remove("active");
    }

    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
}

document.getElementById("nextBtn").addEventListener("click", function () {
    showSlide(currentSlide + 1);
});

document.getElementById("prevBtn").addEventListener("click", function () {
    showSlide(currentSlide - 1);
});

for (let i = 0; i < dots.length; i++) {
    dots[i].addEventListener("click", function () {
        showSlide(i);
    });
}
