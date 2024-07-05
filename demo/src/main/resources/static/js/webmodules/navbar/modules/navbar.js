import BackendManager from "./backend/backend_manager.js"

class Navbar {
    constructor() {
        this.backendManager = new BackendManager()

        this.profilePicture = document.getElementById("dropdownImage")
        this.profileUsername = document.getElementById("dropdownUsername")

        this.navbarProfilePicture = document.getElementById("navProfileImage")


    }


    loadProfilePicture = () => {
        let token = this.backendManager.cookie.getCookie("token")

        //we need a better way of verifying the token from the frontend, probably by sending it to a backend endpoint first. 
        if (this.backendManager.cookie.getCookie("token") != null) {

            this.backendManager.controller.getProfilePicture(token)
                .then(response => response.blob())
                .then(response => {
                    let imageUrl = URL.createObjectURL(response)
                    this.profilePicture.src = imageUrl;
                    this.navbarProfilePicture.src = imageUrl; 
                })
        } else {
            window.location.href = "https://www.zinxswiki.com"
        }
    }

    loadProfileUsername = () => {
        let token = this.backendManager.cookie.getCookie("token")
        if (this.backendManager.cookie.getCookie("token") != null) {
            this.backendManager.controller.getProfileUsername(token)
                .then(response => response.text())
                .then(response => {
                    this.profileUsername.innerText = response 
                })
        } else {
            window.location.href = "https://www.zinxswiki.com"
        }
    }

 

}

const app = new Navbar()

app.loadProfilePicture()

app.loadProfileUsername()