import Utility from '../utility.js'



export default class ImageUtility extends Utility {
    constructor(element) {
        super(element)
        this.toolbar = this.toolbarInterface.imageToolbar
        this.toolbar.registerElement(this.element)
        this.functions = this.utilityFunctionInterface.functionFacade.imageFunctionFacade
        this.functions.boxResizeFunction.setElement(element)
    }



    selectElement = () => {
        document.getElementById("page").classList.add("editing")
    //    this.element.querySelector(".image-main").style.border = "2px solid red "
      //  this.functions.imageBackendFunction.disableDragMode(this.element)
        //   this.element.querySelector(".image-main").style.border = "3px solid red"
        this.functions.imageBackendFunction.attachFileInputHandler(this.element)
        this.toolbar.deleteUtilityBtn.addEventListener("click", this.deleteUtility)
    }

    deleteUtility = () => {
        this.deselectElement()
           
        this.element.remove()
         
       
    }

    deselectElement = () => {
        document.getElementById("page").classList.remove("editing")
        this.functions.imageBackendFunction.enableDragMode(this.element)
     //   this.element.querySelector(".image-main").style.border = "none"
        this.functions.imageBackendFunction.removeFileInputHandler(this.element)
        this.deconstructToolbar()
    }

    constructToolbar = () => {
        this.toolbar.constructToolbar()
        // this.attachFileInputHandler(this.functions.handleFileInput)
        //  this.attachFileInputSubmitHandler()

        this.initCancelSelectionBtn()
        this.initEnableImageResize()



    }

    deconstructToolbar = () => {
        this.toolbar.deconstructToolbar()
    }



    enableDrag = () => {
        this.functions.imageBackendFunction.enableDragMode(this.element)
    }
    initCancelSelectionBtn = () => {
        this.toolbar.cancelSelectionBtn.addEventListener("click", this.deselectElement)
    }

    attachFileInputSubmitHandler = () => {
        this.toolbar.fileInputSubmit.addEventListener("click", this.functions.imageBackendFunction.handleFileInputSubmit)
    }

    attachFileInputHandler = (handler) => {
        this.toolbar.fileInput.addEventListener("change", handler)
    }


    initEnableImageResize = () => {
        let onBoxResize = this.functions.boxResizeFunction.onImageDrag.bind(this.element)
        let element = this.element
        let toolbar = this.toolbar
         let updateToolbar = this.toolbar.updateToolbarPosition
        //  console.log(element)
        this.toolbar.resizeButton.addEventListener("mousedown", (event) => {
            document.getElementById("page").classList.add("resizing")
            // Initiate resizing - attach mousemove to document
            toolbar.resizeButton.addEventListener("mousemove", onBoxResize);
            document.addEventListener("mousemove", onBoxResize)
            event.preventDefault(); // Prevent default drag behavior
        });

        document.addEventListener("mouseup", () => {
        document.getElementById("page").classList.remove("resizing")
         updateToolbar()
            // End resizing - remove mousemove from document
            toolbar.resizeButton.removeEventListener("mousemove", onBoxResize);
            document.removeEventListener("mousemove", onBoxResize);
        });
    }



}