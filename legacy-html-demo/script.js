// 1. Form Validation & Backend Submission
document.getElementById("ideaForm").addEventListener("submit", async function (event) {
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

    if (name === "" || name.length < 2) {
        document.getElementById("nameError").innerText = "Name must be at least 2 characters.";
        isValid = false;
    }
    if (email === "" || !email.includes("@") || !email.includes(".")) {
        document.getElementById("emailError").innerText = "Please enter a valid email address.";
        isValid = false;
    }
    if (startupName === "") {
        document.getElementById("startupNameError").innerText = "Please enter your startup name.";
        isValid = false;
    }
    if (industry === "") {
        document.getElementById("industryError").innerText = "Please select an industry.";
        isValid = false;
    }
    if (pitch === "" || pitch.length < 20) {
        document.getElementById("pitchError").innerText = "Description must be at least 20 characters.";
        isValid = false;
    }

    if (!isValid) return;

    // Send Form Data to Backend API (Database Integration)
    try {
        const response = await fetch('/api/ideas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ founderName: name, founderEmail: email, startupName, industry, pitch })
        });
        const result = await response.json();
        alert(result.message || "Startup idea saved to database successfully!");
        document.getElementById("ideaForm").reset();
        fetchDatabaseRecords(); // Automatically reload the demo table!
    } catch (err) {
        alert("Idea submitted locally (Note: start backend server with 'npm start' to sync)");
        document.getElementById("ideaForm").reset();
    }
});

// 2. Slider Component
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

function showSlide(index) {
    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;

    slides.forEach((s, i) => s.classList.toggle("active", i === currentSlide));
    dots.forEach((d, i) => d.classList.toggle("active", i === currentSlide));
}

document.getElementById("nextBtn")?.addEventListener("click", () => showSlide(currentSlide + 1));
document.getElementById("prevBtn")?.addEventListener("click", () => showSlide(currentSlide - 1));
dots.forEach((dot, idx) => dot.addEventListener("click", () => showSlide(idx)));

// 3. Live Database Table & Backend Connection Status
async function checkBackendStatus() {
    const badge = document.getElementById("dbStatusBadge");
    const text = document.getElementById("dbStatusText");
    try {
        const res = await fetch('/api/status');
        const data = await res.json();
        badge.className = "connection-badge connected";
        text.innerText = `● ${data.database}`;
        document.getElementById("metaBackend").innerText = "Active (Port 5000)";
        document.getElementById("metaDatabase").innerText = data.database;
    } catch {
        badge.className = "connection-badge error";
        text.innerText = "● Backend Offline";
        document.getElementById("metaBackend").innerText = "Offline (Run: npm start)";
        document.getElementById("metaDatabase").innerText = "Disconnected";
    }
}

async function fetchDatabaseRecords() {
    const tableBody = document.getElementById("ideasTableBody");
    try {
        const res = await fetch('/api/ideas');
        const ideas = await res.json();
        document.getElementById("metaCount").innerText = ideas.length;

        if (ideas.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="7" class="text-center">No ideas recorded in database yet.</td></tr>`;
            return;
        }

        tableBody.innerHTML = ideas.map(item => `
            <tr>
                <td><strong>${item.founderName}</strong></td>
                <td>${item.founderEmail}</td>
                <td>${item.startupName}</td>
                <td><span class="badge-status">${item.industry}</span></td>
                <td>${item.pitch.substring(0, 45)}...</td>
                <td><span class="badge-status ${item.status || ''}">${item.status || 'Under Review'}</span></td>
                <td><button class="btn-del" onclick="deleteIdea('${item._id}')">Delete</button></td>
            </tr>
        `).join("");
    } catch {
        tableBody.innerHTML = `<tr><td colspan="7" class="text-center">Start backend with <code>npm start</code> to load database records.</td></tr>`;
    }
}

async function deleteIdea(id) {
    if (!confirm("Are you sure you want to delete this startup idea from the database?")) return;
    try {
        await fetch(`/api/ideas/${id}`, { method: 'DELETE' });
        fetchDatabaseRecords();
    } catch (err) {
        alert("Could not delete record from backend.");
    }
}

document.getElementById("refreshDbBtn")?.addEventListener("click", () => {
    checkBackendStatus();
    fetchDatabaseRecords();
});

// Initialize on page load
checkBackendStatus();
fetchDatabaseRecords();
