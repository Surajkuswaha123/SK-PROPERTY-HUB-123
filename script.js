/* =====================================
   SK PROPERTY HUB
   Owner: Suraj Kuswaha
   Main JavaScript File
===================================== */

/* ==============================
   MOBILE MENU TOGGLE
============================== */

function toggleMenu() {
    const navMenu = document.getElementById("navMenu");
    navMenu.classList.toggle("active");
}

/* ==============================
   CLOSE MENU AFTER CLICK
============================== */

document.querySelectorAll("#navMenu a").forEach(link => {
    link.addEventListener("click", () => {
        const navMenu = document.getElementById("navMenu");
        navMenu.classList.remove("active");
    });
});

/* ==============================
   SCROLL ANIMATION
============================== */

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    },
    {
        threshold: 0.2
    }
);

document.querySelectorAll(
    ".service-card, .property-card, .why-grid div"
).forEach(el => {
    observer.observe(el);
});
/* ==============================
   LEAD FORM DATABASE SUBMIT
============================== */

const leadForm = document.getElementById("buyForm");

if (leadForm) {

    leadForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        console.log("Form Submit Started");

        const name =
            document.getElementById("name").value.trim();

        const mobile =
            document.getElementById("mobile").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const message =
            document.getElementById("message").value.trim();

        if (name.length < 3) {
            alert("Please enter a valid name.");
            return;
        }

        if (!/^[0-9]{10}$/.test(mobile)) {
            alert("Enter a valid 10-digit mobile number.");
            return;
        }

        try {

            console.log("Sending request to backend...");

            const response = await fetch(
                "http://localhost:5000/api/leads",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        name,
                        mobile,
                        email,
                        city: "Mohali",
                        requirement: "Buy Property",
                        message
                    })
                }
            );

            console.log("Response Status:", response.status);

            const data = await response.json();

            console.log("Response Data:", data);

            if (response.ok) {

                alert(
                    "Enquiry Submitted Successfully ✅"
                );

                leadForm.reset();

            } else {

                alert(
                    "Server Error ❌"
                );

            }

        } catch (error) {

            console.error("FULL ERROR:", error);

            alert(
                "Server Connection Failed ❌"
            );

        }

    });

}

/* ==============================
   HEADER SHADOW ON SCROLL
============================== */

window.addEventListener("scroll", () => {

    const header = document.querySelector("header");

    if (window.scrollY > 50) {
        header.style.boxShadow =
            "0 4px 12px rgba(0,0,0,0.15)";
    } else {
        header.style.boxShadow = "none";
    }

});

/* ==============================
   SCROLL TO TOP BUTTON
============================== */

const scrollBtn = document.createElement("button");

scrollBtn.innerHTML = "↑";

scrollBtn.id = "scrollTopBtn";

document.body.appendChild(scrollBtn);

scrollBtn.style.position = "fixed";
scrollBtn.style.bottom = "170px";
scrollBtn.style.right = "20px";
scrollBtn.style.width = "50px";
scrollBtn.style.height = "50px";
scrollBtn.style.border = "none";
scrollBtn.style.borderRadius = "50%";
scrollBtn.style.cursor = "pointer";
scrollBtn.style.fontSize = "22px";
scrollBtn.style.background = "#0f172a";
scrollBtn.style.color = "#fff";
scrollBtn.style.display = "none";
scrollBtn.style.zIndex = "999";

window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {
        scrollBtn.style.display = "block";
    } else {
        scrollBtn.style.display = "none";
    }

});

scrollBtn.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

/* ==============================
   PROPERTY SEARCH FORM
============================== */

const searchForm =
    document.querySelector(".search-form");

if (searchForm) {

    searchForm.addEventListener(
        "submit",
        function (e) {

            e.preventDefault();

            const requirement =
                this.querySelector("select").value;

            const city =
                this.querySelector(
                    'input[placeholder="Enter City"]'
                ).value;

            const budget =
                this.querySelector(
                    'input[placeholder="Budget"]'
                ).value;

            alert(
                `Searching...\n\nRequirement: ${requirement}\nCity: ${city}\nBudget: ${budget}`
            );

        }
    );

}

/* ==============================
   FUTURE API INTEGRATION
============================== */

/*

Future Backend Integration Example

fetch("/api/leads", {

    method: "POST",

    headers: {
        "Content-Type": "application/json"
    },

    body: JSON.stringify({

        name: name,
        mobile: mobile,
        city: city,
        requirement: requirement

    })

})
.then(res => res.json())
.then(data => {
    console.log(data);
});

*/

/* ==============================
   CONSOLE MESSAGE
============================== */

console.log(
    "%cSK Property Hub Loaded Successfully",
    "color:green;font-size:18px;font-weight:bold;"
);