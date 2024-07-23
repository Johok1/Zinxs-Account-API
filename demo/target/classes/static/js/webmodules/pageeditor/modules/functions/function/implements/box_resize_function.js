import Function from '../function.js'

export default class BoxResizeFunction extends Function {

    setElement = (element) => {
        this.element = element 
    }

    onImageDrag = ({ movementX, movementY }) => {
        let container = document.getElementById("page");
        let containerRect = container.getBoundingClientRect();
        let resizeButton = document.getElementById("page").querySelector(".resize-popup")
        let cancelImageButton = document.getElementById("toolbar").querySelector(".cancel-image")
        let elementStyles = window.getComputedStyle(this.element);
        let elementWidth = parseFloat(elementStyles.width) || 0; // Use 0 if width is not defined
        let elementHeight = parseFloat(elementStyles.height) || 0; // Use 0 if height is not defined
        let elementRect = this.element.getBoundingClientRect();

        let newWidth = elementWidth + movementX;
        let newHeight = elementHeight + movementY;

        // Calculate the maximum width and height to avoid overflowing the container
        let maxWidth = containerRect.right - elementRect.left; // Maximum width without overflowing the container horizontally
        let maxHeight = containerRect.bottom - elementRect.top; // Maximum height without overflowing the container vertically

        // Ensure the element stays within the maximum width and height
        newWidth = Math.min(newWidth, maxWidth);
        newHeight = Math.min(newHeight, maxHeight);

        let oldWidth = this.element.style.width
        let oldHeight = this.element.style.height 


        // Update the element's size
      
        let imageWidth = parseFloat(this.element.querySelector(".image-main").style.width) || 0; // Use 0 if width is not defined
        let imageHeight = parseFloat(this.element.querySelector(".image-main").style.height) || 0; // Use 0 if height is not defined

        let oldResizeButtonLeft = resizeButton.style.left
        let oldResizeButtonTop = resizeButton.style.top

        resizeButton.style.left = (movementX + parseInt(resizeButton.style.left)) + "px";
        resizeButton.style.top = (movementY + parseInt(resizeButton.style.top)) + "px";

       // let oldCancelImageButtonStyleTop = cancelImageButton.style.top 

       // cancelImageButton.style.top = (movementY + parseInt(resizeButton.style.top)) + "px";

        let newImageWidth = imageWidth + movementX
        let newImageHeight = imageHeight + movementY

        let oldImageWidth = this.element.querySelector(".image-main").style.width
        let oldImageHeight = this.element.querySelector(".image-main").style.height

        this.element.style.width = `${newWidth}px`;
        this.element.style.height = `${newHeight}px`;

        this.element.querySelector(".image-main").style.width = newWidth + "px"
        this.element.querySelector(".image-main").style.height = newHeight + "px"

        let newRect = this.element.getBoundingClientRect()
        let utilityList = container.querySelectorAll(".utility")
        let utilityCollision = this.isUtilityCollision(utilityList, newRect)

        if (utilityCollision) {
            this.element.style.width = oldWidth
            this.element.style.height = oldHeight
            resizeButton.style.left = oldResizeButtonLeft
            resizeButton.style.top = oldResizeButtonTop
          //  cancelImageButton.style.top = oldCancelImageButtonStyleTop
            this.element.querySelector(".image-main").style.width = oldWidth
            this.element.querySelector(".image-main").style.height = oldHeight
           

        } else {

            for (let z = 0; z < utilityList.length; z++) {
            //    utilityList[z].style.border = "none"
            }
        }
    }

   

    isUtilityCollision = (utilityList, newRect) => {
           let utilityCollision = false
           for (let x = 0; x < utilityList.length; x++) {
           if((utilityList[x].classList.contains("text") && this.element.classList.contains("text") )||
               (utilityList[x].classList.contains("image") && this.element.classList.contains("image"))){
               if ((utilityList[x].getAttribute("layer") == this.element.getAttribute("layer")) && utilityList[x] != this.element) {
                   let utilityRect = utilityList[x].querySelector(".main").getBoundingClientRect()
                   let rect1 = newRect
                   let rect2 = utilityRect
                  // console.log("same layer collision possible")
                   if (!(rect2.x > rect1.x + rect1.width ||
                       rect2.x + rect2.width < rect1.x ||
                       rect2.y > rect1.y + rect1.height ||
                       rect2.y + rect2.height < rect1.y)) {
                       utilityCollision = true
                     // console.log("isColliding")
                   //    utilityList[x].style.border = "2px solid red"
                   }
               } else {
                 //  console.log("no collisions on different layers")
               }
           }
           }
           return utilityCollision;
       }
}