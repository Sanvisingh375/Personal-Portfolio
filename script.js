const skills = [
  { category: "Programming", items: ["C", "Java", "Python"] },
  { category: "Web development", items: ["HTML", "CSS", "JavaScript", "React"] },
  { category: "Databases", items: ["MySQL", "MongoDB (familiar)"] },
  { category: "Computer science", items: ["Data structures", "Algorithms", "OOP", "Operating systems"] }
];

const projects = [
  { title: "SafeHer", type: "web", label: "Mini project · Web app",
    desc: "A progressive web app that helps women choose safer routes across Hyderabad. Each route gets a time-aware safety score based on lighting, crowds, police proximity and danger zones, and nearby police stations, hospitals and metro stops are shown along the way.",
    tech: ["React", "Vite", "Leaflet.js"] },
  { title: "LuxAir", type: "web", label: "Group project · Web app",
    desc: "A responsive airline booking site with scheduling logic that stops two flights from being booked into overlapping or conflicting time slots.",
    tech: ["HTML", "CSS", "JavaScript"] },
  { title: "Book Recommender", type: "python", label: "Internship · AI/ML",
    desc: "Suggests books similar to the ones a reader already likes, by comparing book descriptions with TF-IDF and cosine similarity. Built using Goodreads and Kaggle data.",
    tech: ["Python", "Pandas", "Scikit-learn"] }
];

const skillList = document.getElementById("skillList");

skills.forEach(skill => {
  const badges = skill.items
    .map(item => `<span class="badge rounded-pill bg-primary-subtle text-primary-emphasis me-1 mb-1">${item}</span>`)
    .join("");

  skillList.innerHTML += `
    <div class="card info-card">
      <div class="card-body">
        <h3 class="h5">${skill.category}</h3>
        ${badges}
      </div>
    </div>`;
});
const grid = document.getElementById("projectGrid");
const count = document.getElementById("projectCount");
const buttons = document.querySelectorAll("[data-filter]");

function showProjects(filter) {
  const list = filter === "all" ? projects : projects.filter(p => p.type === filter);

  grid.innerHTML = "";
  list.forEach(p => {
    const tags = p.tech.map(t => `<span class="badge text-bg-secondary me-1">${t}</span>`).join("");

    grid.innerHTML += `
      <div class="col-md-6 col-lg-4">
        <article class="card info-card h-100">
          <div class="card-body">
            <p class="eyebrow mb-1">${p.label}</p>
            <h3 class="h5">${p.title}</h3>
            <p>${p.desc}</p>
            <p class="mb-0">${tags}</p>
          </div>
        </article>
      </div>`;
  });

  count.textContent = `Showing ${list.length} of ${projects.length} projects.`;
}

buttons.forEach(button => {
  button.addEventListener("click", () => {
    buttons.forEach(b => b.classList.remove("active"));
    button.classList.add("active");
    showProjects(button.dataset.filter);
  });
});

showProjects("all");
const themeBtn = document.getElementById("themeToggle");

function setTheme(theme) {
  document.documentElement.setAttribute("data-bs-theme", theme);
  themeBtn.textContent = theme === "dark" ? "Light mode" : "Dark mode";
  themeBtn.setAttribute("aria-pressed", theme === "dark");
  localStorage.setItem("theme", theme);
}

setTheme(localStorage.getItem("theme") || "light");

themeBtn.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-bs-theme");
  setTheme(current === "dark" ? "light" : "dark");
});

const form = document.getElementById("contactForm");
const alertBox = document.getElementById("formAlert");
const checks = {
  name: value => value.length < 2 ? "Please enter your name." : "",
  email: value => /^\S+@\S+\.\S+$/.test(value) ? "" : "Please enter a valid email, like name@example.com.",
  message: value => value.length < 10 ? "Please write at least 10 characters." : ""
};

function validateField(id) {
  const input = document.getElementById(id);
  const error = checks[id](input.value.trim());

  input.classList.toggle("is-invalid", error !== "");
  input.classList.toggle("is-valid", error === "");
  input.nextElementSibling.textContent = error;

  return error === "";
}

form.addEventListener("submit", event => {
  event.preventDefault();
  const nameOk = validateField("name");
  const emailOk = validateField("email");
  const messageOk = validateField("message");

  if (nameOk && emailOk && messageOk) {
    alertBox.innerHTML = `<div class="alert alert-success">Thanks! Your message has been sent.</div>`;
    form.reset();
    form.querySelectorAll(".is-valid").forEach(el => el.classList.remove("is-valid"));
  } else {
    alertBox.innerHTML = `<div class="alert alert-danger">Please fix the highlighted fields.</div>`;
  }
});

document.getElementById("year").textContent = new Date().getFullYear();
const topButton = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {
  topButton.classList.toggle("d-none", window.scrollY < 400);
});