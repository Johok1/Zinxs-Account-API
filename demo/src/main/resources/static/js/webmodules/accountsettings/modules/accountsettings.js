import BackendManager from './backend/backend_manager.js'
import FileUtilities from './backend/utils/file_utilities.js'

class AccountSettings {
    constructor() {
        this.backendManager = new BackendManager()
        this.fileUtilities = new FileUtilities()

        this.usernameInput = document.getElementById("usernameInput")

        this.changeUsernameBtn = document.getElementById("changeUsernameBtn")

        this.profilePicture = document.getElementById("profilePicture")

        this.uploadBtn = document.getElementById("uploadImageBtn")

        this.submitImageBtn = document.getElementById("changePictureBtn")

        this.changeEmailInput = document.getElementById("changeEmailInput")

        this.changeEmailBtn = document.getElementById("changeEmailBtn")

        this.changePasswordInput = document.getElementById("changePasswordInput")



        this.changeProfilePictureHandler()
       
        this.changeEmailBtn.addEventListener("click", this.submitNewEmail)
        this.changeUsernameBtn.addEventListener("click", this.submitNewUsername)

    }


   

    submitNewEmail = () => {
        let newEmail = this.changeEmailInput.value
      
        let token = this.backendManager.cookie.getCookie("token")
        let backendManager = this.backendManager
      
        
        backendManager.controller.setProfileEmail(token, newEmail)
            .then(response => response.text())
            .then(response => {
                console.log(response)
            })
            
      
        
    }

    submitNewUsername = () => {
        let newUsername = this.usernameInput.value
     
        let token = this.backendManager.cookie.getCookie("token")
        let backendManager = this.backendManager
      
            
        backendManager.controller.setProfileUsername(token, newUsername)
            .then(response => response.text())
            .then(response => {
                console.log(response)
            })
    
        
    }

    changeProfilePictureHandler = () => {
        let fileUtilities = this.fileUtilities
        let profilePicture = this.profilePicture
        let backendManager = this.backendManager
        this.uploadBtn.addEventListener("change", (e) => {
            let file = e.target.files.item(0)
            backendManager.controller.setProfilePicture(backendManager.cookie.getCookie("token"), file)
                .then( ()=> {
                    fileUtilities.processFile(file)
                    .then(response => {
                            let url = URL.createObjectURL(response)
                            console.log(response)
                            console.log(url)
                            profilePicture.src = url;

                        })
                })
            })
            
    }

}

let app = new AccountSettings()