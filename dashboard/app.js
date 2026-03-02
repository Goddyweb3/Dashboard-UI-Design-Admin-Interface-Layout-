const toggleBtn = document.getElementById("menu-toggle");
const dashboard = document.querySelector(".dashboard");

toggleBtn.addEventListener("click", () => {
    const mobile = window.innerWidth <= 600;

    if (mobile) {
        dashboard.classList.toggle("mobile-active");
    } else {
        dashboard.classList.toggle("collapsed");
    }
});

const navLinks = document.querySelectorAll(".nav-links li");

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        document.querySelector(".nav-links li.active")?.classList.remove("active");
        link.classList.add("active");
    });
});

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("keyup", () => {
    const value = searchInput.value.toLowerCase();
    const rows = document.querySelectorAll("tbody tr");

    rows.forEach(row => {
        const name = row.children[0].textContent.toLowerCase();
        const email = row.children[1].textContent.toLowerCase();

        row.Style.display = 
        name.includes(value) || email.includes(value)
        ? ""
        : "none";
    });
    });

    function attachDeleteEvents() {
        document.querySelectorAll(".delete-btn").forEach(btn => {
            btn.onclick = () => {
                if (confirm("Delete this user")) {
                    btn.closest("tr").remove();
                    updateUserCount();
                }
            };
        });
    }
   
    attachDeleteEvents();

    const modal = document.getElementById("modal");
const addBtn = document.getElementById("addUserBtn");
const closeModal = document.getElementById("closeModal");

addBtn.onclick = () => modal.classList.add("show");
closeModal.onclick = () => modal.classList.remove("show");

window.onclick = e => {
  if (e.target === modal) modal.classList.remove("show");
};

const form = document.getElementById("userForm");
const tbody = document.querySelector("tbody");

form.addEventListener("submit", e => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const role = document.getElementById("role").value.trim();
  const status = document.getElementById("status").value;

  if (!name || !email || !role) return alert("Please fill all fields");

  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${name}</td>
    <td>${email}</td>
    <td>${role}</td>
    <td>${status}</td>
    <td><button class="btn btn-outline delete-btn">Delete</button></td>
  `;

  tbody.appendChild(row);

  modal.classList.remove("show");
  form.reset();

  attachDeleteEvents();
  updateUserCount();
});

function updateUserCount() {
  const count = document.querySelectorAll("tbody tr").length;
  document.getElementById("userCount").textContent = count;
}

updateUserCount();