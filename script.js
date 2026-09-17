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

    // Idea Storage Helpers
    const getIdeas = () => JSON.parse(localStorage.getItem("startupguru_ideas") || "[]");
    const saveIdeas = (ideas) => localStorage.setItem("startupguru_ideas", JSON.stringify(ideas));

    // Idea Form Handler
    if (ideaForm) {
        ideaForm.addEventListener("submit", function (e) {
            e.preventDefault();
            clearErrs("#ideaForm .error-msg");

            const name = founderName.value.trim(), email = founderEmail.value.trim();
            const startupName = document.getElementById("startupName").value.trim();
            const industry = document.getElementById("industry").value;
            const pitch = document.getElementById("pitch").value.trim();
            const horizon = launchTimeline ? launchTimeline.value : "3";

            const vName = valField(name, "nameError", "Please enter your name.", 2, "Name must be at least 2 characters.");
            const vEmail = valEmail(email, "emailError");
            const vStartup = valField(startupName, "startupNameError", "Please enter your startup name.");
            const vInd = valField(industry, "industryError", "Please select an industry.");
            const vPitch = valField(pitch, "pitchError", "Please describe your problem and solution.", 20, "Description must be at least 20 characters.");

            if (vName && vEmail && vStartup && vInd && vPitch) {
                const ideas = getIdeas();
                const newIdea = {
                    id: Date.now(),
                    startupName,
                    industry,
                    pitch,
                    horizon,
                    userEmail: email,
                    date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                };
                ideas.unshift(newIdea);
                saveIdeas(ideas);

                alert("Thank you! Your startup idea has been submitted and saved to your profile.");
                ideaForm.reset();
                const currentUser = getSession();
                if (currentUser) {
                    founderName.value = currentUser.name;
                    founderEmail.value = currentUser.email;
                }
                renderProfile();
            }
        });
    }

    // Showcase Carousel Slider Handler
    const carouselTrack = document.getElementById("carouselTrack");
    const prevSlideBtn = document.getElementById("prevSlide");
    const nextSlideBtn = document.getElementById("nextSlide");
    const dotsContainer = document.getElementById("carouselDots");

    if (carouselTrack) {
        const slides = Array.from(carouselTrack.children);
        const dots = dotsContainer ? Array.from(dotsContainer.children) : [];
        let currentSlideIndex = 0;
        let carouselTimer = null;

        function updateCarousel(index) {
            currentSlideIndex = (index + slides.length) % slides.length;
            carouselTrack.style.transform = `translateX(-${currentSlideIndex * 100}%)`;

            slides.forEach((slide, i) => {
                slide.classList.toggle("active", i === currentSlideIndex);
            });

            dots.forEach((dot, i) => {
                dot.classList.toggle("active", i === currentSlideIndex);
            });
        }

        if (prevSlideBtn) {
            prevSlideBtn.addEventListener("click", () => {
                updateCarousel(currentSlideIndex - 1);
                resetAutoPlay();
            });
        }

        if (nextSlideBtn) {
            nextSlideBtn.addEventListener("click", () => {
                updateCarousel(currentSlideIndex + 1);
                resetAutoPlay();
            });
        }

        dots.forEach((dot, i) => {
            dot.addEventListener("click", () => {
                updateCarousel(i);
                resetAutoPlay();
            });
        });

        function startAutoPlay() {
            carouselTimer = setInterval(() => {
                updateCarousel(currentSlideIndex + 1);
            }, 5000);
        }

        function resetAutoPlay() {
            if (carouselTimer) clearInterval(carouselTimer);
            startAutoPlay();
        }

        const carouselContainer = document.querySelector(".carousel-container");
        if (carouselContainer) {
            carouselContainer.addEventListener("mouseenter", () => clearInterval(carouselTimer));
            carouselContainer.addEventListener("mouseleave", startAutoPlay);

            // Touch Swipe Support
            let touchStartX = 0;
            let touchEndX = 0;

            carouselContainer.addEventListener("touchstart", (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });

            carouselContainer.addEventListener("touchend", (e) => {
                touchEndX = e.changedTouches[0].screenX;
                const swipeDistance = touchEndX - touchStartX;
                if (Math.abs(swipeDistance) > 40) {
                    if (swipeDistance < 0) {
                        updateCarousel(currentSlideIndex + 1);
                    } else {
                        updateCarousel(currentSlideIndex - 1);
                    }
                    resetAutoPlay();
                }
            }, { passive: true });
        }

        startAutoPlay();
    }

    // Interactive Estimator & Custom Range Sliders
    const budgetSlider = document.getElementById("budgetSlider");
    const marketSlider = document.getElementById("marketSlider");
    const timelineSlider = document.getElementById("timelineSlider");
    const launchTimeline = document.getElementById("launchTimeline");

    const budgetValue = document.getElementById("budgetValue");
    const marketValue = document.getElementById("marketValue");
    const timelineValue = document.getElementById("timelineValue");
    const formTimelineVal = document.getElementById("formTimelineVal");
    const viabilityScore = document.getElementById("viabilityScore");
    const scoreBarFill = document.getElementById("scoreBarFill");
    const scoreDescription = document.getElementById("scoreDescription");

    const toggleBreakdownBtn = document.getElementById("toggleBreakdownBtn");
    const scoreBreakdownPanel = document.getElementById("scoreBreakdownPanel");
    const budgetFactorVal = document.getElementById("budgetFactorVal");
    const marketFactorVal = document.getElementById("marketFactorVal");
    const timelineFactorVal = document.getElementById("timelineFactorVal");

    function styleSliderTrack(slider) {
        if (!slider) return;
        const min = parseFloat(slider.min) || 0;
        const max = parseFloat(slider.max) || 100;
        const val = parseFloat(slider.value) || 0;
        const pct = ((val - min) / (max - min)) * 100;
        slider.style.background = `linear-gradient(to right, #f39c12 0%, #f39c12 ${pct}%, #e2e8f0 ${pct}%, #e2e8f0 100%)`;
    }

    function calculateViability() {
        if (!budgetSlider || !marketSlider || !timelineSlider) return;

        const budget = parseFloat(budgetSlider.value);
        const market = parseFloat(marketSlider.value);
        const timeline = parseFloat(timelineSlider.value);

        // Dynamic formula for Viability Index
        const budgetFactor = Math.min(budget / 50000, 1) * 35;
        const marketFactor = Math.min(market / 200000, 1) * 40;
        const timelineFactor = Math.max(0, (1 - Math.abs(timeline - 6) / 12)) * 25;

        let score = Math.round(budgetFactor + marketFactor + timelineFactor);
        score = Math.min(98, Math.max(20, score));

        if (viabilityScore) viabilityScore.innerText = score;
        if (scoreBarFill) scoreBarFill.style.width = `${score}%`;

        if (budgetFactorVal) budgetFactorVal.innerText = `${budgetFactor.toFixed(1)} / 35`;
        if (marketFactorVal) marketFactorVal.innerText = `${marketFactor.toFixed(1)} / 40`;
        if (timelineFactorVal) timelineFactorVal.innerText = `${timelineFactor.toFixed(1)} / 25`;

        if (scoreDescription) {
            if (score >= 80) {
                scoreDescription.innerText = "Excellent balance! Highly scalable budget, strong market reach, and efficient MVP horizon.";
            } else if (score >= 60) {
                scoreDescription.innerText = "Solid feasibility. Healthy resource allocation for an early-stage launch.";
            } else if (score >= 40) {
                scoreDescription.innerText = "Moderate readiness. Consider extending your budget or refining your target market focus.";
            } else {
                scoreDescription.innerText = "Early concept phase. Higher budget or tighter timeline recommended for faster validation.";
            }
        }
    }

    if (toggleBreakdownBtn && scoreBreakdownPanel) {
        toggleBreakdownBtn.addEventListener("click", () => {
            const isHidden = scoreBreakdownPanel.classList.contains("hidden");
            scoreBreakdownPanel.classList.toggle("hidden", !isHidden);
            toggleBreakdownBtn.innerHTML = isHidden ? "Hide Breakdown &#9652;" : "View Metric Breakdown &#9662;";
        });
    }

    function initSliders() {
        if (budgetSlider) {
            budgetSlider.addEventListener("input", (e) => {
                const val = parseFloat(e.target.value);
                if (budgetValue) budgetValue.innerText = `$${val.toLocaleString()}`;
                styleSliderTrack(e.target);
                calculateViability();
            });
            styleSliderTrack(budgetSlider);
        }

        if (marketSlider) {
            marketSlider.addEventListener("input", (e) => {
                const val = parseFloat(e.target.value);
                if (marketValue) marketValue.innerText = `${val.toLocaleString()} users`;
                styleSliderTrack(e.target);
                calculateViability();
            });
            styleSliderTrack(marketSlider);
        }

        if (timelineSlider) {
            timelineSlider.addEventListener("input", (e) => {
                const val = e.target.value;
                if (timelineValue) timelineValue.innerText = `${val} Months`;
                styleSliderTrack(e.target);
                calculateViability();
            });
            styleSliderTrack(timelineSlider);
        }

        if (launchTimeline) {
            launchTimeline.addEventListener("input", (e) => {
                const val = e.target.value;
                if (formTimelineVal) formTimelineVal.innerText = `${val} ${val === "1" ? "Month" : "Months"}`;
                styleSliderTrack(e.target);
            });
            styleSliderTrack(launchTimeline);
        }

        calculateViability();
    }

    initSliders();

    // User Profile Rendering
    function renderProfile() {
        const profileName = document.getElementById("profileName");
        const profileEmail = document.getElementById("profileEmail");
        const profileAvatar = document.getElementById("profileAvatar");
        const historyList = document.getElementById("historyList");
        const currentUser = getSession();

        if (!currentUser) return;

        if (profileName) profileName.innerText = currentUser.name;
        if (profileEmail) profileEmail.innerText = currentUser.email;
        if (profileAvatar) profileAvatar.innerText = currentUser.name.charAt(0).toUpperCase();

        if (historyList) {
            const allIdeas = getIdeas();
            const userIdeas = allIdeas.filter(i => i.userEmail.toLowerCase() === currentUser.email.toLowerCase());

            if (userIdeas.length === 0) {
                historyList.innerHTML = `
                    <div class="empty-history">
                        <p>No startup ideas submitted yet.</p>
                        <p><a href="submit.html" class="btn" style="margin-top:10px; display:inline-block;">Submit Your First Idea</a></p>
                    </div>
                `;
            } else {
                historyList.innerHTML = userIdeas.map(idea => `
                    <div class="history-item">
                        <div class="history-item-header">
                            <span class="history-item-title">${escapeHTML(idea.startupName)}</span>
                            <span class="history-item-badge">${escapeHTML(idea.industry)}</span>
                        </div>
                        <p class="history-item-desc">${escapeHTML(idea.pitch)}</p>
                        <div class="history-item-meta">
                            <span>Target Horizon: ${idea.horizon} Months</span> &bull; <span>Submitted on ${idea.date}</span>
                        </div>
                    </div>
                `).join("");
            }
        }
    }

    function escapeHTML(str) {
        return String(str || "").replace(/[&<>"']/g, function (m) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
        });
    }

    const clearHistoryBtn = document.getElementById("clearHistoryBtn");
    if (clearHistoryBtn) {
        clearHistoryBtn.addEventListener("click", () => {
            const currentUser = getSession();
            if (!currentUser) return;
            if (confirm("Are you sure you want to clear your submitted ideas history?")) {
                const allIdeas = getIdeas();
                const remainingIdeas = allIdeas.filter(i => i.userEmail.toLowerCase() !== currentUser.email.toLowerCase());
                saveIdeas(remainingIdeas);
                renderProfile();
            }
        });
    }

    // Active Navigation Link Highlighting for Discrete Pages
    function highlightActivePageNav() {
        const path = window.location.pathname.split("/").pop() || "index.html";
        const navLinks = document.querySelectorAll(".nav-links a");

        navLinks.forEach(link => {
            const href = link.getAttribute("href");
            if (!href) return;
            const isMatch = href === path || (path === "" && href === "index.html");
            link.classList.toggle("active", isMatch);
        });
    }

    highlightActivePageNav();
    renderProfile();

    // Initial Auth Check
    checkAuth();
});

