import BackendManager from './backend/backend_manager.js'
import FileUtilities from './backend/utils/file_utilities.js'
import CustomCard from './visuals/custom_card.js'

class PageViewer {
    constructor() {
        this.backendManager = new BackendManager()
        this.fileUtilities = new FileUtilities()
        this.cardDiv = document.getElementById("cardContainer")
        this.makePageList()

    }

    makePageList = () => {
        let constructCard = this.constructCard
        let backendManager = this.backendManager
        let token = this.backendManager.cookie.getCookie("token")
       
        this.backendManager.controller.getAccountPageHeaders(this.backendManager.cookie.getCookie("token"))
            .then(response => response.json())
            .then(response => {
                for (let x = 0; x < response.length; x++) {


                    backendManager.controller.getAccountPageLogo(token, response[x].pageId)
                        .then(data => data.blob())
                        .then(data => {
                            constructCard(response[x].pageName, response[x].pageId, data)
                        })
                  

                }
            })
    }

    constructCard = (pageName, pageId, pageLogo) => {
        console.log(pageLogo)
        let url = URL.createObjectURL(pageLogo)
        console.log(url)
            
        let card = new CustomCard(this.cardDiv, pageName, pageId, url)
        let backendManager = this.backendManager
        card.viewPageLink.addEventListener("click", () => {
            backendManager.cookie.setCookie("pageId", pageId)
        })
          
       
    }

}

const app = new PageViewer()
