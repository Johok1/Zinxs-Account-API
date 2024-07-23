import BackendManager from './backend/backend_manager.js'
class ResetPassword {
    constructor() {
        this.backendManager = new BackendManager()
        this.passwordInput = document.getElementById("passwordInput")
        this.confirmPasswordInput = document.getElementById("confirmPasswordInput")
        this.resetPasswordBtn = document.getElementById("resetPasswordBtn")
        this.errorDiv = document.getElementById("errorDiv")
        this.errorDiv.classList.add("visually-hidden")
        this.resetPasswordBtn.addEventListener("click", this.sendResetRequest.bind(this))
    }

    sendResetRequest = () => {
        let passwordMatch = this.passwordInput.value == this.confirmPasswordInput.value
        let passwordValid = this.passwordInput.value != "" && passwordMatch
        let errorDiv = this.errorDiv
        if (passwordValid) {
            this.backendManager.controller.postNewPassword(this.backendManager.cookie.getCookie("token"), this.passwordInput.value)
                .then(response => response.text())
                .then(response => {
                    if (response == "true") {
                        window.location.href = "https://www.zinxswiki.com/login"
                    } else {
                        errorDiv.innerText = response
                        errorDiv.classList.remove("visually-hidden")
                    }
                })
        } else {
            this.errorDiv.innerText = "Invalid Password"
            this.errorDiv.classList.remove("visually-hidden")
            
        }
    }
}

const app = new ResetPassword()