import Function from '../function.js'

export default class HorizontalResizeFunction extends Function {

    setElement = (element) => {
        this.element = element
    }

    onBoxResize = ({ movementX, movementY }) => {
        let container = document.getElementById("page");

        let resizeButton = document.getElementById("page").querySelector(".resize-popup")

        let oldResizeBtnPosition = resizeButton.style.left
        //let oldResizeBtnPositionTop = resizeButton.style.top
        resizeButton.style.left = (movementX + parseInt(resizeButton.style.left)) + "px";


       // resizeButton.style.top = (movementY + parseInt(resizeButton.style.top)) + "px";

        let newPosition = this.calculateNewLeftPosition({ movementX, movementY})

        let newWidth = newPosition[0]
        let oldWidth = this.element.style.width
        this.element.style.width = `${newWidth}px`;

      //  let newHeight = newPosition[1]
       // let oldHeight = this.element.style.height

      //  this.element.style.height = `${newHeight}px`;
      //  this.element.querySelector(".main").style.height = `${newHeight}px`;

        let newRect = this.element.getBoundingClientRect()
        let utilityList = container.querySelectorAll(".utility")
        let utilityCollision = this.isUtilityCollision(utilityList, newRect)

        if (utilityCollision) {
            this.element.style.width = oldWidth
          //  this.element.style.height = oldHeight
            resizeButton.style.left = oldResizeBtnPosition
          //  resizeButton.style.top = oldResizeBtnPositionTop
          //  this.element.querySelector(".main").style.height = oldHeight

        } else {

            for (let z = 0; z < utilityList.length; z++) {
                utilityList[z].style.border = "none"
            }
        }

    }


    calculateNewLeftPosition = ({ movementX, movementY }) => {
        let container = document.getElementById("page");
        let containerRect = container.getBoundingClientRect();


        let elementStyles = window.getComputedStyle(this.element);
        let elementWidth = parseFloat(elementStyles.width) || 0; // Use 0 if width is not defined
        let elementHeight = parseFloat(elementStyles.height) || 0; // Use 0 if height is not defined
        let elementRect = this.element.getBoundingClientRect();

        let newWidth = elementWidth + movementX;
        let newHeight = elementHeight + movementY;


        let maxWidth = containerRect.right - elementRect.left; // Maximum width without overflowing the container horizontally
        let maxHeight = containerRect.bottom - elementRect.top; // Maximum height without overflowing the container vertically

        // Ensure the element stays within the maximum width and height
        newWidth = Math.min(newWidth, maxWidth);
        newHeight = Math.min(newHeight, maxHeight);

        return [newWidth, newHeight]

    }

    isUtilityCollision = (utilityList, newRect) => {
        let utilityCollision = false
        for (let x = 0; x < utilityList.length; x++) {
            if ((utilityList[x].getAttribute("layer") == this.element.getAttribute("layer")) && utilityList[x] != this.element) {
                let utilityRect = utilityList[x].getBoundingClientRect()
                let rect1 = newRect
                let rect2 = utilityRect
                console.log("same layer collision possible")
                if (!(rect2.x > rect1.x + rect1.width ||
                    rect2.x + rect2.width < rect1.x ||
                    rect2.y > rect1.y + rect1.height ||
                    rect2.y + rect2.height < rect1.y)) {
                    utilityCollision = true
                    console.log("isColliding")
                    utilityList[x].style.border = "2px solid red"
                }
            } else {
                console.log("no collisions on different layers")
            }
        }
        return utilityCollision;
    }
}