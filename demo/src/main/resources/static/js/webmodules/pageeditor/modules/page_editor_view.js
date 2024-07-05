import BackendManager from './backend/backend_manager.js';
import UtilityHelper from './editor/utility_helper.js';
import UtilityCreationModule from './editor/utility_modules/implements/utility_creation_module.js';
import PageSubmitTimer from './submit/page_submit_timer.js';


class View {
    constructor() {
        this.initializeViewElements();

        this.backendManager = new BackendManager()
        // Since select mode is enabled by default, ensure select functionalities are initialized
        this.controller = this.backendManager.controller
        this.cookie = this.backendManager.cookie
        this.utilityHelper = new UtilityHelper()
        this.page = document.getElementById("page")

        this.viewButton = document.getElementById("viewButton")
        this.viewButton.classList.add("visually-hidden")
        this.initPageDetails()
       
        let page = this.page

        this.pageSubmitTimer = new PageSubmitTimer(page)
        this.pageSubmitTimer.setSubmitTimer(10)

       

        this.selectLayerInput = document.getElementById("selectLayerInput")
        this.selectLayerBtn = document.getElementById("selectLayerBtn")

        this.hideLayerInput = document.getElementById("hideLayerInput")
        this.hideLayerBtn = document.getElementById("hideLayerBtn")

        this.textUtilityBtn = document.getElementById("textUtilityBtn")
        this.imageUtilityBtn = document.getElementById("imageUtilityBtn")

       

        this.selectLayerBtn.addEventListener("click", this.selectLayer.bind(this))
        this.hideLayerBtn.addEventListener("click", this.hideLayer.bind(this))
        this.textUtilityBtn.addEventListener("click", this.createTextBtnHandler.bind(this))
        this.imageUtilityBtn.addEventListener("click", this.createImageBtnHandler.bind(this))

        this.loadPageContent()

        this.utilityCreationModule = new UtilityCreationModule(this.utilityHelper)

       
        this.view = false;
        //this.viewButton.addEventListener("click", this.toggleViewMode.bind(this))
        this.resizePageBtn = document.getElementById("resizePageBtn")
        this.initResizeEvents()
      
    }

    initResizeEvents = () => {
       

        document.getElementById("resizePageBtn").onmousedown = this.resizePage.bind(this)
        this.page.addEventListener("mouseup", () => {
            console.log("weeee")
            this.page.onmousemove = null
        })

        this.page.addEventListener("mouseleave", () => {
            this.page.onmousemove = null
        })
    }

    resizePage = () => {
        this.page.onmousemove = this.pageResizeFunction.bind(this)
    }

    pageResizeFunction = ({ movementX, movementY }) => {
        let height = parseFloat(this.page.style.height)
        let newHeight = height + movementY
        let margin = parseFloat(document.getElementById("resizePageBtn").style.marginTop)
        let newMargin = margin + movementY
        document.getElementById("resizePageBtn").style.marginTop = `${newMargin}px`
        this.page.style.height = `${newHeight}px`

    }

    toggleViewMode = () => {
        this.view = !this.view
        let reset = this.utilityHelper.utilityHandlerModule.resetAllElementHandlers
        let enableDragAll = this.utilityHelper.utilityTranslationModule.enableDragAll
        let layerManager = this.utilityHelper.layerManagerModule 
        let select = this.utilityHelper.utilitySelectionModule.selectFunc
        let register = this.utilityHelper.utilityHandlerModule.registerAllHandlers

        if (this.view) {
            let list = document.getElementById("page").querySelectorAll(".utility")
            for (let x = 0; x < list.length; x++) {
                var new_element = list[x].cloneNode(true);
                list[x].parentNode.replaceChild(new_element, list[x]);
            }
        } else {
            let layer = layerManager.getCurrentSelectedLayer()

            reset(select)

            enableDragAll(layer)

            register(select, layer)
        }
    }



    initPageDetails = () => {
        let pageId = this.backendManager.cookie.getCookie("pageId")
        let token = this.backendManager.cookie.getCookie("token") 
        let pageLogo = this.pageLogo
        let pageName = this.pageName
        this.backendManager.controller.getPageImage(token, pageId)
            .then(response => response.blob())
            .then(response => {
                document.getElementById("pageLogo").src = URL.createObjectURL(response)
            })
        this.backendManager.controller.getPageName(pageId)
            .then(response => response.text())
            .then(response => {
                document.getElementById("pageName").innerText = response
            })
     }

    loadPageContent = () => {
        let page = this.page
        let select = this.utilityHelper.utilitySelectionModule.selectFunc
        let register = this.utilityHelper.utilityHandlerModule.registerAllHandlers
        let reset = this.utilityHelper.utilityHandlerModule.resetAllElementHandlers
        let enableDragAll = this.utilityHelper.utilityTranslationModule.enableDragAll
        let layerManager = this.utilityHelper.layerManagerModule 
        let loadPageImages = this.loadPageImages
        let initResizeEvents = this.initResizeEvents
        this.controller.getAccountPageContent(this.cookie.getCookie("token"), this.cookie.getCookie("pageId"))
            .then(response => response.text())
            .then(response => {
                let layer = layerManager.getCurrentSelectedLayer()
                if (response != null && response != "" && response != undefined) {
                    var wrapper = document.createElement('div');
                    wrapper.innerHTML = response
                    page.innerHTML = wrapper.firstChild.innerHTML
                    page.style.height = wrapper.firstChild.style.height 
                }
                
                initResizeEvents()

                reset(select)

                enableDragAll(layer)
              
                register(select, layer)
           
                loadPageImages()
            
            })
    }

    loadPageImages = () => {
        let pageId = this.cookie.getCookie("pageId")
        let controller = this.controller
        this.controller.getPageImageIds(pageId)
            .then(response => response.text())
            .then(ids => {
                let idList = ids.split(",")

                for (let x = 0; x < idList.length; x++) {
                    let imageId = idList[x];

                    if (imageId != "" && !imageId.includes(" ")) {

                        controller.getImageName(pageId, imageId)
                            .then(response => response.text())
                            .then(name => {
                                let filename = name 
                                controller.getPageImageUrl(pageId, imageId)
                                    .then(response => response.blob())
                                    .then(response => {

                                        console.log(response)
                                       
                                       

                                        let imgList = document.querySelectorAll(".image-main")
                                        for (let y = 0; y < imgList.length; y++) {

                                            let imgId = imgList[y].getAttribute("id");
                                            console.log("imgList[y] " + imgList[y])
                                            console.log("imgList[y] " + imgId)
                                            console.log("filename  " + filename)
                                            if (imgId === filename) {
                                                console.log("imgId === filename true")
                                                let logo = URL.createObjectURL(response)
                                                imgList[y].src = logo
                                            } else {
                                                console.log("imgId === filename false")
                                            }

                                        }
                                        // You can perform further processing with the filename and data here

                                    });
                            })

                     

                    }

                }
            })
        

       
    }



    initializeViewElements() {

        this.page = document.getElementById("page");
        this.toolbarDiv = document.getElementById("toolbarDiv");


    }

    registerAllHandlersSelect = () => {
        const select = this.utilityHelper.utilitySelectionModule.selectFunc
        const register = this.utilityHelper.utilityHandlerModule.registerAllHandlers
        const layerManager = this.utilityHelper.layerManagerModule
        console.log("select " + select)
        console.log("register " + register)
        register(select, layerManager.getCurrentSelectedLayer())
    }


    createTextBtnHandler() {
        this.utilityCreationModule.createTextUtility()

    }

    createImageBtnHandler() {
        this.utilityCreationModule.createImageUtility()
    }

    hideLayer() {
        let layerManager = this.utilityHelper.layerManagerModule
        layerManager.toggleHideLayer(this.hideLayerInput.value)
    }

    selectLayer() {
        let layerManager = this.utilityHelper.layerManagerModule
        layerManager.setSelectedLayer(this.selectLayerInput.value)
        this.utilityHelper.utilityHandlerModule.resetAllElementHandlers()
        this.registerAllHandlersSelect()
        this.utilityHelper.utilityTranslationModule.enableDragAll(this.selectLayerInput.value)
    }

 



}

const app = new View();