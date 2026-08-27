// Form Validation Script
document.getElementById("ideaForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let isValid = true;

    // Get form field values
    let name = document.getElementById("founderName").value.trim();
    let email = document.getElementById("founderEmail").value.trim();
    let startupName = document.getElementById("startupName").value.trim();
    let industry = document.getElementById("industry").value;
    let pitch = document.getElementById("pitch").value.trim();

    // Regular expression for email validation
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Reset previous error messages
    document.getElementById("nameError").innerText = "";
    document.getElementById("emailError").innerText = "";
    document.getElementById("startupNameError").innerText = "";
    document.getElementById("industryError").innerText = "";
    document.getElementById("pitchError").innerText = "";

    // 1. Validate Name
    if (name === "") {
        document.getElementById("nameError").innerText = "Please enter your name.";
        isValid = false;
    } else if (name.length < 2) {
        document.getElementById("nameError").innerText = "Name must be at least 2 characters.";
        isValid = false;
    }

    // 2. Validate Email
    if (email === "") {
        document.getElementById("emailError").innerText = "Please enter your email address.";
        isValid = false;
    } else if (!emailRegex.test(email)) {
        document.getElementById("emailError").innerText = "Please enter a valid email address.";
        isValid = false;
    }

    // 3. Validate Startup Name
    if (startupName === "") {
        document.getElementById("startupNameError").innerText = "Please enter your startup name.";
        isValid = false;
    }

    // 4. Validate Industry
    if (industry === "") {
        document.getElementById("industryError").innerText = "Please select an industry.";
        isValid = false;
    }

    // 5. Validate Description / Pitch
    if (pitch === "") {
        document.getElementById("pitchError").innerText = "Please describe your problem and solution.";
        isValid = false;
    } else if (pitch.length < 20) {
        document.getElementById("pitchError").innerText = "Description must be at least 20 characters.";
        isValid = false;
    }

    // If all inputs are valid
    if (isValid) {
        alert("Thank you! Your startup idea has been submitted successfully.");
        document.getElementById("ideaForm").reset();
    }
});
