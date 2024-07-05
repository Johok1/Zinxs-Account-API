import Toolbar from './toolbar.js'
export default class ImageToolbar extends Toolbar{
  

    registerElement = (element) => {
        if (element.classList.contains("image")) {
            this.element = element
        } else {
            console.error("element type not suitable for toolbar")
        }
    }
    constructToolbar = () => {
      

        let page = document.getElementById("page")


        this.resizeButton = document.createElement("btn")



        this.resizeButtonSVG = document.createElement("svg")
        this.resizeButtonSVG.setAttribute("xmlns" , "http://www.w3.org/2000/svg")
        this.resizeButtonSVG.setAttribute("width", "24")
        this.resizeButtonSVG.setAttribute("height", "24")
        this.resizeButtonSVG.style.width = "10px"
        this.resizeButtonSVG.style.height = "10px"
        this.resizeButtonSVG.setAttribute("viewBox" , "0 0 24 24")
        this.resizeButtonSVG.setAttribute("fill" , "none")
        this.resizeButtonSVG.setAttribute("stroke" ,"currentColor")
        this.resizeButtonSVG.setAttribute("stroke-width", "3")
        this.resizeButtonSVG.setAttribute("stroke-linecap", "round")
        this.resizeButtonSVG.setAttribute("stroke-linejoin", "round")
        this.resizeButtonSVG.setAttribute("data-feather","circle")
        this.resizeButtonSVG.classList.add("feather")
        this.resizeButtonSVG.classList.add("feather-circle")
        this.resizeButtonSVG.style.color = "#BAA21F"

        this.resizeButton.appendChild(this.resizeButtonSVG)

       // this.resizeButton.innerText = "Resize Image"
        this.resizeButton.classList.add("image-popup")
        this.resizeButton.classList.add("resize-popup")
        this.resizeButton.style.position = "absolute"
        this.resizeButton.style.zIndex = "100"
        this.resizeButton.style.width = "30px"
        this.resizeButton.style.height = "30px"

        this.cancelSelectionBtn = document.createElement("btn")

        this.cancelSelectionBtnSVG = document.createElement("svg")
        this.cancelSelectionBtnSVG.setAttribute("xmlns" , "http://www.w3.org/2000/svg")
        this.cancelSelectionBtnSVG.setAttribute("width" ,"24")
        this.cancelSelectionBtnSVG.setAttribute("height",  "24")
        this.cancelSelectionBtnSVG.setAttribute("viewBox",  "0 0 24 24")
        this.cancelSelectionBtnSVG.setAttribute("fill" , "none")
        this.cancelSelectionBtnSVG.setAttribute("stroke",  "currentColor")
        this.cancelSelectionBtnSVG.setAttribute("stroke-width","2")
        this.cancelSelectionBtnSVG.setAttribute("stroke-linecap","round")
        this.cancelSelectionBtnSVG.setAttribute("stroke-linejoin","round")
        this.cancelSelectionBtnSVG.setAttribute("data-feather","x")
        this.cancelSelectionBtnSVG.classList.add("feather")
        this.cancelSelectionBtnSVG.classList.add("feather-x")
        this.cancelSelectionBtnSVG.style.color = "#BAA21F"
        this.cancelSelectionBtn.appendChild(this.cancelSelectionBtnSVG)

        this.cancelSelectionBtn.classList.add("image-popup")
        this.cancelSelectionBtn.classList.add("cancel-image")
        this.cancelSelectionBtn.style.position = "absolute"
        this.cancelSelectionBtn.style.zIndex = "100"

        this.deleteUtilityBtn = document.createElement("btn")
        this.deleteUtilityBtn.style.position = "absolute"
        this.deleteUtilityBtn.style.zIndex = "100"
        this.deleteUtilityBtn.classList.add("image-popup")
        this.deleteUtilityBtn.style.left = "95%"

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

        let toolbar = document.getElementById("toolbar")

        toolbar.appendChild(this.deleteUtilityBtn)


        page.appendChild(this.resizeButton)
        toolbar.appendChild(this.cancelSelectionBtn)
       
        this.updateToolbarPosition()
        document.feather.replace()

    }

    updateToolbarPosition = () => {


      //  this.positionExitBtn(this.element, this.cancelSelectionBtn)
        this.positionResizeElement(this.element, this.resizeButton)
    }

    positionResizeElement = (element1, element2) => {
        // Get computed styles of the first element
        var styles = window.getComputedStyle(element1);

        // Get dimensions and position of the first element
        var rect = element1.querySelector(".image-main").getBoundingClientRect();
        var pageRect = document.getElementById("page").getBoundingClientRect();
        // Set position of the second element
        element2.style.position = 'absolute';
        element2.style.left = (rect.width + (rect.left-pageRect.left)) + 'px';
        element2.style.top =  (rect.height + (rect.top-pageRect.top)) + 'px';
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

    deconstructToolbar = () => {
        $('.image-popup').remove()
    }



}