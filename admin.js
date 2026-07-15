if (
    localStorage.getItem("isAdminLoggedIn")
    !== "true"
) {

    window.location.href =
        "admin-login.html";

}

const tableBody =
    document.getElementById("leadTableBody");

const totalLeads =
    document.getElementById("totalLeads");

const searchInput =
    document.getElementById("searchInput");

let allLeads = [];

/* ==========================
   LOAD LEADS
========================== */

async function loadLeads() {

    try {

        const response = await fetch("https://sk-property-hub-123-production.up.railway.app/api/leads");

        const result =
            await response.json();

        allLeads = result.data;

        renderLeads(allLeads);

    } catch (error) {

        console.log(error);

        alert("Failed To Load Leads");

    }

}

/* ==========================
   RENDER TABLE
========================== */

function renderLeads(leads) {

    totalLeads.textContent =
        leads.length;

    tableBody.innerHTML = "";

    leads.forEach((lead) => {

        tableBody.innerHTML += `
        <tr>

            <td>${lead.id}</td>

            <td>${lead.name}</td>

            <td>${lead.mobile}</td>

            <td>${lead.email || ""}</td>

            <td>${lead.city || ""}</td>

            <td>${lead.requirement || ""}</td>

            <td>${lead.message || ""}</td>

            <td>
                <button
                    onclick="deleteLead(${lead.id})"
                    style="
                        background:red;
                        color:white;
                        border:none;
                        padding:8px 12px;
                        cursor:pointer;
                        border-radius:5px;
                    ">
                    Delete
                </button>
            </td>

        </tr>
        `;

    });

}

/* ==========================
   DELETE LEAD
========================== */

async function deleteLead(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this lead?"
        );

    if (!confirmDelete) return;

    try {

        await fetch(`https://sk-property-hub-123-production.up.railway.app/api/leads/${id}`,
            {
                method: "DELETE"
            }
        );

        loadLeads();

    } catch (error) {

        console.log(error);

        alert("Delete Failed");

    }

}

/* ==========================
   SEARCH
========================== */

searchInput.addEventListener(
    "input",
    function () {

        const value =
            this.value.toLowerCase();

        const filtered =
            allLeads.filter((lead) => {

                return (
                    lead.name?.toLowerCase().includes(value) ||
                    lead.mobile?.toLowerCase().includes(value) ||
                    lead.email?.toLowerCase().includes(value)
                );

            });

        renderLeads(filtered);

    }
);

loadLeads();

const logoutBtn =
    document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        function () {

            localStorage.removeItem(
                "isAdminLoggedIn"
            );

            window.location.href =
                "admin-login.html";

        }
    );

}
const exportBtn =
    document.getElementById("exportBtn");

if (exportBtn) {

    exportBtn.addEventListener(
    "click",
    function () {

        window.open(
            "https://sk-property-hub-123-production.up.railway.app/api/leads/export",
            "_blank"
        );

    }
);

}