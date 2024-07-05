import Utility from '../utility.js'


export default class TextUtility extends Utility {
    constructor(element) {
        super(element)
        this.toolbar = this.toolbarInterface.textToolbar;
        this.toolbar.registerElement(this.element)
        this.functions = this.utilityFunctionInterface.functionFacade.textFunctionFacade
        this.functions.horizontalResizeFunction.setElement(this.element)
    }

    selectElement = () => {
        document.getElementById("page").classList.add("editing")
     
        this.functions.summernoteFunction.disableDragMode(this.element)
        this.element.querySelector(".main").style.border = "solid 2px red"
        this.summernoteHandleEditText()
        this.toolbar.deleteUtilityBtn.addEventListener("click", this.deleteUtility)
    }

    deselectElement = () => {

        document.getElementById("page").classList.remove("editing")

        this.element.querySelector(".main").style.border = "none"
        this.functions.summernoteFunction.handleDisableEditText(this.constructToolbar, this.element)
        this.functions.summernoteFunction.enableDragMode(this.element)
        this.deconstructToolbar()

    }

    deleteUtility = () => {
        this.deselectElement()
        this.element.remove()
    }

    deconstructToolbar = () => {
        this.toolbar.deconstructToolbar()
    }

    constructToolbar = () => {
        this.toolbar.constructToolbar()
        this.initBoxResizeBtn()
      //  this.initEditTextBtn()
        this.initCancelSelectionBtn()

    }

    enableDrag = () => {
        this.functions.summernoteFunction.enableDragMode(this.element)
    }

    initCancelSelectionBtn = () => {
        this.toolbar.cancelSelectionBtn.addEventListener("click", this.deselectElement)
    }

    initBoxResizeBtn = () => {
        let onBoxResize = this.functions.horizontalResizeFunction.onBoxResize.bind(this.element)
        let element = this.element
        let toolbar = this.toolbar
        let updateToolbar = this.toolbar.updateToolbarPosition
        this.toolbar.resizeButton.addEventListener("mousedown", (event) => {
            // Initiate resizing - attach mousemove to document
            toolbar.resizeButton.addEventListener("mousemove", onBoxResize);
            //  updateToolbar()
            event.preventDefault(); // Prevent default drag behavior
        });

        document.addEventListener("mouseup", () => {
            // End resizing - remove mousemove from document
            toolbar.resizeButton.removeEventListener("mousemove", onBoxResize);
        });

    }

    initEditTextBtn = () => {
        this.toolbar.editTextBtn.addEventListener("click", this.summernoteHandleEditText)
    }

    summernoteHandleEditText = () => {
        this.functions.summernoteFunction.handleEditText(this.element, this.deconstructToolbar, this.constructToolbar)
    }


}