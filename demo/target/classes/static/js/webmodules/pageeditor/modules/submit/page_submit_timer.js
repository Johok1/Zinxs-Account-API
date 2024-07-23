import BackendManager from '../backend/backend_manager.js'

export default class PageSubmitTimer {
    constructor(page) {
        this.backendManager = new BackendManager()
        this.page = page 
        this.id = null
    }

    stopSubmitTimer = () => {
        if (this.id != null) {
            clearInterval(this.id)
        } else {
           // console.log("no id set : "  + this.id)
        }
    }

    setSubmitTimer = (seconds) => {
        this.id = setInterval(this.submitPage, seconds*1000)
    }

    submitPage = () => {
        let page = this.page 
        let cookie = this.backendManager.cookie
        if (!page.classList.contains("dragging") && !page.classList.contains("editing")) {
            this.backendManager.controller.postAccountPageContent(cookie.getCookie("token"), cookie.getCookie("pageId"), page.outerHTML)
                .then(response => response.text())
                .then(response => {
                   // console.log("post page response: " + response)
                })
        } else {
           // console.log("cannot submit while dragging or editing")
        }
    }
}