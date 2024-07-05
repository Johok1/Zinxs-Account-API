import BackendManager from './backend/backend_manager.js'

class ForgotPassword {
    constructor() {
        this.backendManager = new BackendManager()
        this.emailInput = document.getElementById("emailInput")
        this.resetBtn = document.getElementById("resetBtn")
        this.errorDiv = document.getElementById("errorDiv")
        this.errorDiv.classList.add("visually-hidden")
        this.passDiv = document.getElementById("passDiv")
        this.passDiv.classList.add("visually-hidden")
        this.resetBtn.addEventListener("click", this.sendResetRequest)
    }

    sendResetRequest = () => {
        let passDiv = this.passDiv 
        let email = this.emailInput.value
        let isValid = email != "" && email.includes("@")
        if (isValid) {
            this.errorDiv.classList.add("visually-hidden")
            let errorDiv = this.errorDiv
            console.log("email" + this.emailInput.value)
            this.backendManager.controller.postResetPasswordRequest(this.emailInput.value)
                .then(response => response.text())
                .then(response => {
                    if (response == "true") {
                        passDiv.innerText = "Check your Email !"
                        passDiv.classList.remove("visually-hidden")
                       
                    } else {
                        errorDiv.innerText = response
                        errorDiv.classList.remove("visually-hidden")
                    }
                })
        } else {
            this.errorDiv.innerText = "Invalid Email"
            this.errorDiv.classList.remove("visually-hidden")
        }
    }
}

const app = new ForgotPassword()