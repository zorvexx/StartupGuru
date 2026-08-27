// StartupGuru Application & Authentication Script

document.addEventListener("DOMContentLoaded", function () {
    // DOM Elements
    const authOverlay = document.getElementById("authOverlay");
    const siteContent = document.getElementById("siteContent");
    const tabLogin = document.getElementById("tabLogin");
    const tabRegister = document.getElementById("tabRegister");
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const switchToRegister = document.getElementById("switchToRegister");
    const switchToLogin = document.getElementById("switchToLogin");
    const userGreeting = document.getElementById("userGreeting");
    const logoutBtn = document.getElementById("logoutBtn");
    const ideaForm = document.getElementById("ideaForm");
    const founderName = document.getElementById("founderName");
    const founderEmail = document.getElementById("founderEmail");
    const loginEmail = document.getElementById("loginEmail");
    const loginPassword = document.getElementById("loginPassword");
    const regName = document.getElementById("regName");
    const regEmail = document.getElementById("regEmail");
    const regPassword = document.getElementById("regPassword");
    const regConfirmPassword = document.getElementById("regConfirmPassword");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Utility & Storage Helpers
    const setErr = (id, msg) => { document.getElementById(id).innerText = msg; };
    const clearErrs = (selector) => { document.querySelectorAll(selector).forEach(el => el.innerText = ""); };

    const getUsers = () => JSON.parse(localStorage.getItem("startupguru_users") || "[]");
    const saveUsers = (users) => localStorage.setItem("startupguru_users", JSON.stringify(users));
    const getSession = () => JSON.parse(localStorage.getItem("startupguru_session") || "null");
    const setSession = (user) => localStorage.setItem("startupguru_session", JSON.stringify({ name: user.name, email: user.email }));
    const clearSession = () => localStorage.removeItem("startupguru_session");

    const valField = (val, errId, emptyMsg, minLen = 0, lenMsg = "") => {
        if (!val) { setErr(errId, emptyMsg); return false; }
        if (minLen && val.length < minLen) { setErr(errId, lenMsg); return false; }
        return true;
    };

    const valEmail = (val, errId) => {
        if (!val) { setErr(errId, "Please enter your email address."); return false; }
        if (!emailRegex.test(val)) { setErr(errId, "Please enter a valid email address."); return false; }
        return true;
    };

    // Tab Switching
    function switchTab(isLogin) {
        clearErrs(".auth-modal .error-msg");
        tabLogin.classList.toggle("active", isLogin);
        tabRegister.classList.toggle("active", !isLogin);
        loginForm.classList.toggle("hidden", !isLogin);
        registerForm.classList.toggle("hidden", isLogin);
    }

    tabLogin.addEventListener("click", () => switchTab(true));
    tabRegister.addEventListener("click", () => switchTab(false));
    switchToLogin.addEventListener("click", (e) => { e.preventDefault(); switchTab(true); });
    switchToRegister.addEventListener("click", (e) => { e.preventDefault(); switchTab(false); });

    // Session Check & Gate Control
    function checkAuth() {
        const currentUser = getSession();
        const isAuthenticated = !!currentUser;

        authOverlay.classList.toggle("hidden", isAuthenticated);
        siteContent.classList.toggle("hidden", !isAuthenticated);

        if (currentUser) {
            userGreeting.innerText = `Welcome, ${currentUser.name}`;
            if (founderName && !founderName.value) founderName.value = currentUser.name;
            if (founderEmail && !founderEmail.value) founderEmail.value = currentUser.email;
        } else {
            switchTab(true);
        }
    }

    logoutBtn.addEventListener("click", () => {
        clearSession();
        checkAuth();
    });

    // Login Form Handler
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        clearErrs(".auth-modal .error-msg");

        const email = loginEmail.value.trim(), password = loginPassword.value;
        const vEmail = valEmail(email, "loginEmailError");
        const vPass = valField(password, "loginPasswordError", "Please enter your password.");

        if (!vEmail || !vPass) return;

        const foundUser = getUsers().find(u => u.email.toLowerCase() === email.toLowerCase());

        if (foundUser && foundUser.password === password) {
            setSession(foundUser);
            loginForm.reset();
            checkAuth();
        } else if (email.toLowerCase() === "demo@startupguru.com" && password === "password123") {
            setSession({ name: "Demo Founder", email: "demo@startupguru.com" });
            loginForm.reset();
            checkAuth();
        } else {
            setErr("loginGlobalError", "Invalid email or password. Please check your credentials or register.");
        }
    });

    // Registration Form Handler
    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();
        clearErrs(".auth-modal .error-msg");

        const name = regName.value.trim(), email = regEmail.value.trim();
        const password = regPassword.value, confirmPassword = regConfirmPassword.value;

        const vName = valField(name, "regNameError", "Please enter your full name.", 2, "Name must be at least 2 characters.");
        const vEmail = valEmail(email, "regEmailError");
        const vPass = valField(password, "regPasswordError", "Please create a password.", 6, "Password must be at least 6 characters.");
        let vConfirm = valField(confirmPassword, "regConfirmPasswordError", "Please confirm your password.");

        if (vConfirm && password !== confirmPassword) {
            setErr("regConfirmPasswordError", "Passwords do not match.");
            vConfirm = false;
        }

        if (!vName || !vEmail || !vPass || !vConfirm) return;

        const users = getUsers();
        if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
            setErr("regEmailError", "An account with this email address already exists.");
            return;
        }

        const newUser = { name, email, password };
        users.push(newUser);
        saveUsers(users);

        setSession(newUser);
        registerForm.reset();
        checkAuth();
    });

    // Idea Form Handler
    if (ideaForm) {
        ideaForm.addEventListener("submit", function (e) {
            e.preventDefault();
            clearErrs("#ideaForm .error-msg");

            const name = founderName.value.trim(), email = founderEmail.value.trim();
            const startupName = document.getElementById("startupName").value.trim();
            const industry = document.getElementById("industry").value;
            const pitch = document.getElementById("pitch").value.trim();

            const vName = valField(name, "nameError", "Please enter your name.", 2, "Name must be at least 2 characters.");
            const vEmail = valEmail(email, "emailError");
            const vStartup = valField(startupName, "startupNameError", "Please enter your startup name.");
            const vInd = valField(industry, "industryError", "Please select an industry.");
            const vPitch = valField(pitch, "pitchError", "Please describe your problem and solution.", 20, "Description must be at least 20 characters.");

            if (vName && vEmail && vStartup && vInd && vPitch) {
                alert("Thank you! Your startup idea has been submitted successfully.");
                ideaForm.reset();
                const currentUser = getSession();
                if (currentUser) {
                    founderName.value = currentUser.name;
                    founderEmail.value = currentUser.email;
                }
            }
        });
    }

    // Initial Auth Check
    checkAuth();
});
