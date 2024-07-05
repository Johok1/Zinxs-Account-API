import Toolbar from './toolbar.js'
export default class TextToolbar extends Toolbar{


    registerElement = (element) => {
        if (element.classList.contains("text")) {
            this.element = element
        } else {
            console.error("element type not suitable for toolbar")
        }
    }


    constructToolbar = () => {

      

        this.resizeButton = document.createElement("btn")
        this.resizeButton.classList.add("click")

        this.resizeButtonSVG = document.createElement("svg")
        this.resizeButtonSVG.setAttribute("xmlns", "http://www.w3.org/2000/svg")
        this.resizeButtonSVG.setAttribute("width", "24")
        this.resizeButtonSVG.setAttribute("height", "24")
        this.resizeButtonSVG.style.width = "10px"
        this.resizeButtonSVG.style.height = "10px"
        this.resizeButtonSVG.setAttribute("viewBox", "0 0 24 24")
        this.resizeButtonSVG.setAttribute("fill", "none")
        this.resizeButtonSVG.setAttribute("stroke", "currentColor")
        this.resizeButtonSVG.setAttribute("stroke-width", "5")
        this.resizeButtonSVG.setAttribute("stroke-linecap", "round")
        this.resizeButtonSVG.setAttribute("stroke-linejoin", "round")
        this.resizeButtonSVG.setAttribute("data-feather", "circle")
        this.resizeButtonSVG.classList.add("feather")
        this.resizeButtonSVG.classList.add("feather-arrow-down-right")
        this.resizeButtonSVG.style.color = "#BAA21F"

        this.resizeButton.appendChild(this.resizeButtonSVG)

        this.resizeButton.classList.add("text-popup")
        this.resizeButton.classList.add("resize-popup")
        this.resizeButton.style.position = "absolute"
        this.resizeButton.style.width = "30px"
        this.resizeButton.style.height = "30px"
        this.resizeButton.style.zIndex = "100"


        this.deleteUtilityBtn = document.createElement("btn")
        
        this.deleteUtilityBtn.classList.add("text-popup")
        this.deleteUtilityBtn.style.zIndex = "100"
        this.deleteUtilityBtn.style.position = "absolute"

        this.deleteUtilitySvg = document.createElement("svg")
        this.deleteUtilitySvg.setAttribute("xmlns", "http://www.w3.org/2000/svg")
        this.deleteUtilitySvg.setAttribute("width", "24")
        this.deleteUtilitySvg.setAttribute("height", "24")
        this.deleteUtilitySvg.setAttribute("viewBox", "0 0 24 24")
        this.deleteUtilitySvg.setAttribute("fill", "none")
        this.deleteUtilitySvg.setAttribute("stroke", "currentColor")
        this.deleteUtilitySvg.setAttribute("stroke-width", "2")
        this.deleteUtilitySvg.setAttribute("stroke-linecap", "round")
        this.deleteUtilitySvg.setAttribute("stroke-linejoin", "round")
        this.deleteUtilitySvg.setAttribute("data-feather", "trash-2")
        this.deleteUtilitySvg.classList.add("feather")
        this.deleteUtilitySvg.classList.add("feather-trash-2")
        this.deleteUtilitySvg.style.color = "#BAA21F"

        this.deleteUtilityBtn.appendChild(this.deleteUtilitySvg)
        this.deleteUtilityBtn.style.left = "85%"

      
       /* 
        this.editTextBtn = document.createElement("btn")

        this.editTextSVG = document.createElement("svg")
        this.editTextSVG.setAttribute("xmlns", "http://www.w3.org/2000/svg")
        this.editTextSVG.setAttribute("width", "24")
        this.editTextSVG.setAttribute("height", "24")
        this.editTextSVG.setAttribute("viewBox", "0 0 24 24")
        this.editTextSVG.setAttribute("fill", "none")
        this.editTextSVG.setAttribute("stroke", "currentColor")
        this.editTextSVG.setAttribute("stroke-width", "2")
        this.editTextSVG.setAttribute("stroke-linecap", "round")
        this.editTextSVG.setAttribute("stroke-linejoin", "round")
        this.editTextSVG.setAttribute("data-feather", "edit-2")
        this.editTextSVG.classList.add("feather")
        this.editTextSVG.classList.add("feather-edit")
        this.editTextSVG.style.color = "#BAA21F"
        this.editTextBtn.appendChild(this.editTextSVG)

        this.editTextBtn.classList.add("text-popup")
        this.editTextBtn.style.position = "absolute"
        this.editTextBtn.style.zIndex = "100"
       
   */

        this.cancelSelectionBtn = document.createElement("btn")

        this.cancelSelectionBtnSVG = document.createElement("svg")
        this.cancelSelectionBtnSVG.setAttribute("xmlns", "http://www.w3.org/2000/svg")
        this.cancelSelectionBtnSVG.setAttribute("width", "24")
        this.cancelSelectionBtnSVG.setAttribute("height", "24")
        this.cancelSelectionBtnSVG.setAttribute("viewBox", "0 0 24 24")
        this.cancelSelectionBtnSVG.setAttribute("fill", "none")
        this.cancelSelectionBtnSVG.setAttribute("stroke", "currentColor")
        this.cancelSelectionBtnSVG.setAttribute("stroke-width", "2")
        this.cancelSelectionBtnSVG.setAttribute("stroke-linecap", "round")
        this.cancelSelectionBtnSVG.setAttribute("stroke-linejoin", "round")
        this.cancelSelectionBtnSVG.setAttribute("data-feather", "x")
        this.cancelSelectionBtnSVG.classList.add("feather")
        this.cancelSelectionBtnSVG.classList.add("feather-x")
        this.cancelSelectionBtnSVG.style.color = "#BAA21F"
        this.cancelSelectionBtn.appendChild(this.cancelSelectionBtnSVG)


 
        this.cancelSelectionBtn.classList.add("text-popup")
        this.cancelSelectionBtn.style.position = "absolute"
        this.cancelSelectionBtn.style.zIndex = "100"
      //  this.cancelSelectionBtn.style.marginTop = "40px"
        
     //   this.cancelSelectionBtn.style.left = "0px"

        let page = document.getElementById("page")
        let toolbar = document.getElementById("toolbar")
     //   page.appendChild(this.editTextBtn)
        toolbar.appendChild(this.cancelSelectionBtn)
        page.appendChild(this.resizeButton)

        toolbar.appendChild(this.deleteUtilityBtn)

      //  this.positionEditBtn(this.element, this.editTextBtn)
        //this.positionExitBtn(this.element, this.cancelSelectionBtn)
        this.positionResizeElement(this.element, this.resizeButton)
   
        document.feather.replace()
        
      



    }

    updateToolbarPosition = () => {

     //   this.positionEditBtn(this.element, this.editTextBtn)
        this.positionExitBtn(this.element, this.cancelSelectionBtn)
        this.positionResizeElement(this.element, this.resizeButton)
    }

    positionEditBtn = (element1, element2) => {
        // Get computed styles of the first element
        var styles = window.getComputedStyle(element1);

        // Get dimensions and position of the first element
        var rect = element1.getBoundingClientRect();
        var pageRect = document.getElementById("page").getBoundingClientRect();

        // Set position of the second element
        element2.style.position = 'absolute';
        element2.style.left = ((rect.left - pageRect.left)) + 'px';
        element2.style.top = (rect.height+50 + (rect.top - pageRect.top)) + 'px';
    }

    positionExitBtn = (element1, element2) => {
        // Get computed styles of the first element
        var styles = window.getComputedStyle(element1);

        // Get dimensions and position of the first element
        var rect = element1.getBoundingClientRect();
        var pageRect = document.getElementById("page").getBoundingClientRect();

        // Set position of the second element
        element2.style.position = 'absolute';
        element2.style.left = ((rect.left - pageRect.left)) + 'px';
        element2.style.top = (rect.height + (rect.top - pageRect.top)) + 'px';
    }

    positionResizeElement = (element1, element2) => {
        // Get computed styles of the first element
        var styles = window.getComputedStyle(element1);

        // Get dimensions and position of the first element
        var rect = element1.querySelector(".main").getBoundingClientRect();
        var pageRect = document.getElementById("page").getBoundingClientRect();
        // Set position of the second element
        element2.style.position = 'absolute';
        element2.style.left = (rect.width + (rect.left - pageRect.left)) + 'px';
        element2.style.top = (rect.height + (rect.top - pageRect.top) +15) + 'px';
    }


    deconstructToolbar = () => {
        $('.text-popup').remove()
    }









}