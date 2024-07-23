class Controller {
    constructor() {
        this.fetch_url_validation = "https://www.zinxswiki.com/api/v1/validation"
    }

    postGoogleLoginRequest(token) {

        return fetch(this.fetch_url_validation + "/googleLogin/" + token, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        }).catch(error => {
            console.error(error);
        });
    }

    postLoginRequest(email, password) {
        const loginRequest = {
            "email": email,
            "password": password
        };
        return fetch(this.fetch_url_validation + "/static/login", {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginRequest)
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

class Login {
    constructor() {
        this.backendManager = new BackendManager()
        this.loginBtn = document.getElementById("loginBtn")
        this.passwordInput = document.getElementById("passwordInput")
        this.emailInput = document.getElementById("emailInput")
        this.loginBtn.addEventListener("click", this.sendLoginRequest)
        this.errorDiv = document.getElementById("errorDiv")
        this.errorDiv.classList.add("visually-hidden")
        this.rememberPasswordInput = document.getElementById("rememberPasswordInput")
        if (this.backendManager.cookie.getCookie("rememberPassword") != null) {
            this.passwordInput.value = this.backendManager.cookie.getCookie("rememberPassword")
        }
    }

    sendLoginRequest = () => {
        let backendManager = this.backendManager
        let rememberPasswordInput = this.rememberPasswordInput
        let errorDiv = this.errorDiv
        let passwordInput = this.passwordInput
        this.backendManager.controller.postLoginRequest(this.emailInput.value, this.passwordInput.value)
            .then(response => response.text())
            .then(response => {
                if (!(response === "false")) {
                    if (rememberPasswordInput.checked && passwordInput.value != "") {
                        backendManager.cookie.setCookie("rememberPassword", passwordInput.value, 72)
                    }
                    backendManager.cookie.setCookie("token", response, 8)
                    window.location.href = "https://www.zinxswiki.com"
                } else {
                    errorDiv.innerText = "Please ensure you validate your email"
                    errorDiv.classList.remove("visually-hidden")
                }

            })
    }



}

const app = new Login() 

function handleCredentialResponse(response) {
    app.backendManager.controller.postGoogleLoginRequest(response.credential)
        .then(response => response.text())
        .then(response => {    
            if (response != "false") {
               
                app.backendManager.cookie.setCookie("token", response, 8)
                window.location.href = "https://www.zinxswiki.com"
            } else {
                app.errorDiv.innerText = "Please ensure you validate your email"
                app.errorDiv.classList.remove("visually-hidden")
            }
        })
}