export default class CustomCard {
    constructor(masterDiv, pageName, pageId,logoUrl) {
        this.pageId = pageId 
        this.master = document.createElement("div");
        this.master.className = "col-xl-4 col-lg-6 mb-4 mb-xl-0";

        this.card = document.createElement("div");
        this.card.className = "card";
        this.card.style.margin = "1%";

        this.rowG0 = document.createElement("div");
        this.rowG0.className = "row g-0";

        this.cardHeader = document.createElement("div");
        this.cardHeader.className = "card-header";

        this.headerRow = document.createElement("div");
        this.headerRow.className = "row";

        this.col1 = document.createElement("div");
        this.col1.className = "col-1";
        this.col1.style.textAlign = "left";

        this.sidebarToggleBtn = document.createElement("button");
        this.sidebarToggleBtn.className = "btn btn-icon btn-transparent-dark";
        this.sidebarToggleBtn.id = "sidebarToggle";

        this.sidebarToggleImg = document.createElement("img");
        this.sidebarToggleImg.style.width = "100%";
        this.sidebarToggleImg.style.height = "100%";
        this.sidebarToggleImg.src = logoUrl;

        this.sidebarToggleBtn.appendChild(this.sidebarToggleImg);
        this.col1.appendChild(this.sidebarToggleBtn);

        this.colRight = document.createElement("div");
        this.colRight.className = "col";
        this.colRight.style.textAlign = "right";

        this.closeBtn = document.createElement("button");
        this.closeBtn.className = "btn btn-dark btn-icon me-3";

        this.closeIcon = document.createElement("i");
        this.closeIcon.dataset.feather = "x-circle";

        this.closeBtn.appendChild(this.closeIcon);
        this.colRight.appendChild(this.closeBtn);

        this.headerRow.appendChild(this.col1);
        this.headerRow.appendChild(this.colRight);
        this.cardHeader.appendChild(this.headerRow);

        this.colMd8 = document.createElement("div");
        this.colMd8.className = "col-md-8";

        this.cardBody = document.createElement("div");
        this.cardBody.className = "card-body";

        this.cardTitle = document.createElement("h5");
        this.cardTitle.className = "card-title";
        this.cardTitle.innerHTML = pageName;

        this.viewPageLink = document.createElement("a");
        this.viewPageLink.href = "https://www.zinxswiki.com/pageeditor";
        this.viewPageLink.innerHTML = "View Page";

        this.cardBody.appendChild(this.cardTitle);
        this.cardBody.appendChild(this.viewPageLink);
        this.colMd8.appendChild(this.cardBody);

        this.rowG0.appendChild(this.cardHeader);
        this.rowG0.appendChild(this.colMd8);
        this.card.appendChild(this.rowG0);
        this.master.appendChild(this.card);
        masterDiv.appendChild(this.master)
    }
}
