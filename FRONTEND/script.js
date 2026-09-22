/* =========================================
   CIVICPLUSAI FRONTEND
   ========================================= */


/* PAGE NAVIGATION */

function showPage(pageId, clickedLink = null) {

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active-page");
    });

    const page = document.getElementById(pageId);

    if (page) {
        page.classList.add("active-page");
    }


    document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.remove("active");
    });


    if (clickedLink) {
        clickedLink.classList.add("active");
    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* SIDEBAR */

function toggleSidebar() {

    document
        .getElementById("sidebar")
        .classList.toggle("open");

}


/* GLOBAL SEARCH */

function globalSearch(value) {

    if (value.length < 2) {
        return;
    }

    console.log("Searching:", value);

}


/* ENTITY DATA */

const entities = {

    "ENT-1001": {
        name: "Rahul K.",
        type: "Person",
        connections: 42,
        risk: 91,
        phone: "+91 XXXXX XXXXX",
        location: "Kolkata",
        activity: "Today"
    },

    "ENT-1002": {
        name: "Entity 1002",
        type: "Person",
        connections: 31,
        risk: 67,
        phone: "+91 XXXXX XXXXX",
        location: "West Bengal",
        activity: "Yesterday"
    },

    "ENT-1003": {
        name: "Organization X",
        type: "Organization",
        connections: 87,
        risk: 88,
        phone: "N/A",
        location: "India",
        activity: "2 days ago"
    }

};


/* OPEN ENTITY */

function openEntity(id) {

    const entity = entities[id];

    if (!entity) {
        showToast("Entity not found");
        return;
    }


    const modal = document.getElementById("entityModal");

    document.getElementById("entityDetails").innerHTML = `

        <div class="entity-modal-header">

            <div class="entity-avatar">
                ${entity.name.substring(0, 2).toUpperCase()}
            </div>

            <div>

                <h2>${entity.name}</h2>

                <p style="color:#64748b">
                    ${entity.type} • ${id}
                </p>

            </div>

        </div>


        <div class="entity-details">

            <div class="detail-box">

                <span>Entity Type</span>
                <strong>${entity.type}</strong>

            </div>


            <div class="detail-box">

                <span>Risk Score</span>
                <strong>${entity.risk}/100</strong>

            </div>


            <div class="detail-box">

                <span>Connections</span>
                <strong>${entity.connections}</strong>

            </div>


            <div class="detail-box">

                <span>Phone</span>
                <strong>${entity.phone}</strong>

            </div>


            <div class="detail-box">

                <span>Location</span>
                <strong>${entity.location}</strong>

            </div>


            <div class="detail-box">

                <span>Last Activity</span>
                <strong>${entity.activity}</strong>

            </div>

        </div>

    `;


    modal.classList.add("show");

}


/* CLOSE MODAL */

function closeModal() {

    document
        .getElementById("entityModal")
        .classList.remove("show");

}


/* CLICK OUTSIDE MODAL */

window.addEventListener("click", function(event) {

    const modal = document.getElementById("entityModal");

    if (event.target === modal) {
        closeModal();
    }

});


/* GRAPH FILTER */

function filterGraph() {

    const type =
        document.getElementById("entityFilter").value;

    const nodes =
        document.querySelectorAll(".graph-node");


    nodes.forEach(node => {

        if (type === "all") {

            node.style.display = "block";
            return;

        }


        const text =
            node.querySelector("span")
                ?.textContent
                .toLowerCase();


        if (text === type) {
            node.style.display = "block";
        } else {
            node.style.display = "none";
        }

    });

}


/* GRAPH WEIGHT */

function updateWeight(value) {

    document.getElementById("weightValue")
        .textContent = value;

}


/* GRAPH ZOOM */

let graphScale = 1;

function zoomGraph(direction) {

    const graph =
        document.getElementById("graphArea");

    if (direction === "in") {
        graphScale += 0.1;
    }

    if (direction === "out") {
        graphScale -= 0.1;
    }

    graphScale =
        Math.max(.7, Math.min(1.6, graphScale));

    graph.style.transform =
        `scale(${graphScale})`;

}


function resetGraph() {

    graphScale = 1;

    document.getElementById("graphArea")
        .style.transform = "scale(1)";

    document.getElementById("entityFilter")
        .value = "all";

    filterGraph();

}


/* ENTITY SEARCH */

function searchEntities() {

    const search =
        document
            .getElementById("entitySearch")
            .value
            .toLowerCase();

    const type =
        document
            .getElementById("entityTypeFilter")
            .value;


    const rows =
        document.querySelectorAll(
            "#entityTable tbody tr"
        );


    rows.forEach(row => {

        const text =
            row.textContent.toLowerCase();

        const rowType =
            row.children[2].textContent;


        const matchesSearch =
            text.includes(search);

        const matchesType =
            type === "all" ||
            rowType === type;


        row.style.display =
            matchesSearch && matchesType
                ? ""
                : "none";

    });

}


/* FILE HANDLING */

function handleFile(input) {

    const file = input.files[0];

    if (!file) {
        return;
    }


    document.getElementById("fileInfo")
        .textContent =
        `Selected: ${file.name} (${formatBytes(file.size)})`;

}


function formatBytes(bytes) {

    if (bytes === 0) {
        return "0 Bytes";
    }

    const units =
        ["Bytes", "KB", "MB", "GB"];

    const index =
        Math.floor(
            Math.log(bytes) /
            Math.log(1024)
        );

    return (
        Math.round(
            bytes /
            Math.pow(1024, index) *
            100
        ) / 100
    ) + " " + units[index];

}


/* UPLOAD */

function uploadFile() {

    const input =
        document.getElementById("fileInput");

    if (!input.files.length) {

        showToast(
            "Please select a file first."
        );

        return;
    }


    const source =
        document.querySelector(
            'input[name="source"]:checked'
        ).value;


    showToast(
        `Processing ${source} data...`
    );


    /*
        BACKEND API EXAMPLE:

        const formData = new FormData();

        formData.append(
            "file",
            input.files[0]
        );

        fetch("/api/ingest/" + source.toLowerCase(), {
            method: "POST",
            body: formData
        });

    */


    setTimeout(() => {

        showToast(
            "Data processed successfully."
        );

    }, 2000);

}


/* PATH FINDER */

function findPath() {

    const source =
        document.getElementById(
            "sourceEntity"
        ).value;


    const destination =
        document.getElementById(
            "destinationEntity"
        ).value;


    const result =
        document.getElementById(
            "pathResult"
        );


    if (!source || !destination) {

        showToast(
            "Select both entities."
        );

        return;
    }


    if (source === destination) {

        showToast(
            "Source and destination cannot be same."
        );

        return;
    }


    /*
        BACKEND API EXAMPLE:

        GET /api/network/path?source=ENT-1001&target=ENT-1003
    */


    result.innerHTML = `

        <div class="path-chain">

            <div class="path-node">
                Rahul K.
            </div>

            <i class="bi bi-arrow-right"></i>

            <div class="path-node">
                Phone Connection
            </div>

            <i class="bi bi-arrow-right"></i>

            <div class="path-node">
                Organization X
            </div>

        </div>

        <p style="
            text-align:center;
            color:#64748b;
            padding-bottom:25px;
        ">

            Path found with
            <strong>2 relationships</strong>.

        </p>

    `;

}


/* ALERT ACKNOWLEDGE */

function acknowledgeAlert(button) {

    const alert =
        button.closest(".full-alert");

    alert.style.opacity = ".5";

    button.textContent = "Acknowledged";

    button.disabled = true;

    showToast(
        "Alert acknowledged."
    );

}


function acknowledgeAll() {

    document
        .querySelectorAll(".full-alert button")
        .forEach(button => {

            acknowledgeAlert(button);

        });


    showToast(
        "All alerts acknowledged."
    );

}


/* TOAST */

function showToast(message) {

    const toast =
        document.getElementById("toast");

    toast.textContent = message;

    toast.style.display = "block";


    setTimeout(() => {

        toast.style.display = "none";

    }, 3000);

}


/* INITIALIZATION */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        console.log(
            "CivicPlusAI frontend initialized."
        );

    }
);