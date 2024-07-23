class Controller {
    constructor() {
        this.fetch_url_validation = "https://www.zinxswiki.com/api/v1/validation"
    }

    postGoogleRegisterRequest(token) {
        const googleRegistrationRequest = {
            "token": token,
            "blank": ""
        }

        return fetch(this.fetch_url_validation + "/googleRegister", {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(googleRegistrationRequest)
        }).catch(error => {
            console.error(error);
        });
    }

    postRegisterRequest(username, email, password) {
        const registrationRequest = {
            "username": username,
            "email": email,
            "password": password
        };
        return fetch(this.fetch_url_validation + "/register", {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registrationRequest)
        }).catch(error => {
            console.error(error);
        });
    }




}

class Cookie {
    setCookie(cname, cvalue, exhours) {
        const d = new Date();
        d.setTime(d.getTime() + (exhours * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
}

class BackendManager {
    constructor() {
        this.cookie = new Cookie()
        this.controller = new Controller()
    }
}

class Register {
    constructor() {
        this.backendManager = new BackendManager()
        this.createAccountBtn = document.getElementById("createAccountBtn")
        this.usernameInput = document.getElementById("usernameInput")
        this.passwordInput = document.getElementById("passwordInput")
        this.emailInput = document.getElementById("emailInput")
        this.confirmPasswordInput = document.getElementById("confirmPasswordInput")
        this.errorDiv = document.getElementById("errorDiv")
        this.errorDiv.classList.add("visually-hidden")
        this.createAccountBtn.addEventListener("click", this.sendRegisterRequest)
    }

    sendRegisterRequest = () => {
        if (this.passwordInput.value != this.confirmPasswordInput.value) {
            this.errorDiv.classList.remove("visually-hidden")
            this.errorDiv.innerHTML = "Passwords do not match!"
        } else {
            this.backendManager.controller.postRegisterRequest(this.usernameInput.value, this.emailInput.value, this.passwordInput.value)
                .then(response => response.text())
                .then(response => {
                    if (response == "true") {
                        this.errorDiv.classList.remove("visually-hidden")
                        this.errorDiv.innerHTML = "Check your email and login!"
                    } else {
                        this.errorDiv.innerHTML = response
                        this.errorDiv.classList.remove("visually-hidden")
                    }
                })
        }
    }

}

const app = new Register()

function handleCredentialResponse(response) {
    app.backendManager.controller.postGoogleRegisterRequest(response.credential)
        .then(response => response.text())
        .then(response => {
            if (response == "true") {
                window.location.href = "https://www.zinxswiki.com/login"
            } else {
                console.error("google registration request failed in the backend")
            }
        })
}

