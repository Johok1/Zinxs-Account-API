import FunctionPrototype from './function_prototype.js'
export default class Function extends FunctionPrototype{

    constructor() {
        super()

    }

    enableDragMode = (element) => {
        element.contentEditable = false
        element.style.userSelect = "none"

        this.element = element

        this.dragElement(element)

    }

    disableDragMode = (element) => {

        this.disableDragElement(element)
   //     element.querySelector(".main").style.border = "2px red solid"
        //this.element.contentEditable = true
        element.style.userSelect = "default"
    }


    disableDragElement = (elmnt) => {
        
        elmnt.querySelector(".main").onmousedown = null
        
    }

    dragElement = (elmnt) => {



          elmnt.querySelector(".main").onmousedown = this.startDrag



      //  document.getElementById("page").onmouseup = this.stopDrag
       // elmnt.querySelector(".main").onmouseup = this.stopDrag
    }

    startDrag = () =>{
      if(!document.getElementById("page").classList.contains("resizing")){
         this.element.querySelector(".main").onmousemove = this.stickUtilityToMouse
         document.onmousemove = this.stickUtilityToMouse
         this.element.querySelector(".main").onmouseup = null
         this.element.querySelector(".main").onmouseup = this.stopDrag
         document.onmouseup = this.stopDrag
           }
    }

    stickUtilityToMouse = (event) =>{
             let container = document.getElementById("page");
             let containerRect = container.getBoundingClientRect();
             let elementRect = this.element.querySelector(".main").getBoundingClientRect();

             // Calculate the new position of the element based on the mouse position
             let newLeft = event.clientX - containerRect.left - (elementRect.width / 2);
             let newTop = event.clientY - containerRect.top - (elementRect.height / 2);

             // Ensure the element stays within the boundaries
             newLeft = Math.max(0, Math.min(newLeft, containerRect.width - elementRect.width));
             newTop = Math.max(0, Math.min(newTop, containerRect.height - elementRect.height));
               const oldLeft = this.element.style.left
                     const oldTop = this.element.style.top
             // Update the element's position
             this.element.style.left = `${newLeft}px`;
             this.element.style.top = `${newTop}px`;

             let newRect = this.element.querySelector(".main").getBoundingClientRect()
             let utilityList = container.querySelectorAll(".utility")
             let utilityCollision = this.isUtilityCollision(utilityList, newRect)

             if (utilityCollision) {

                this.element.style.left = oldLeft
                this.element.style.top = oldTop

             }
    }

    stopDrag = (event) => {
        if (!document.getElementById("page").classList.contains("editing")) {
            this.element.querySelector(".main").style.border = "none"
        }
        document.getElementById("page").classList.remove("dragging")
        event.currentTarget.removeEventListener("mousemove", this.drag)
        this.element.querySelector(".main").onmousemove = null

      //  this.element.style.zIndex = this.element.getAttribute("layer")
        this.element.querySelector(".main").onmouseup = this.startDrag
        document.onmousemove = null
    }

    dragElementDown = (event) => {
        let page = document.getElementById("page")
        page.classList.add("dragging")
        this.drag = this.onMouseDrag
       
       //this.element.querySelector(".main").style.border = "2px red solid"
        
        
        event.currentTarget.addEventListener("mousemove", this.drag)
    }



    onMouseDrag = ({ movementX, movementY }) => {
        let container = document.getElementById("page");
        let positionContainer = this.calculateNewPosition({ movementX, movementY })
        let newLeft = positionContainer[0]
        let newTop = positionContainer[1]
        const oldLeft = this.element.style.left
        const oldTop = this.element.style.top 
        // Update the element's position
        this.element.style.left = `${newLeft}px`;
        this.element.style.top = `${newTop}px`;

       
        let newRect = this.element.querySelector(".main").getBoundingClientRect()
        let utilityList = container.querySelectorAll(".utility")
        let utilityCollision = this.isUtilityCollision(utilityList, newRect)

        if (utilityCollision) {

            this.element.style.left = oldLeft
            this.element.style.top = oldTop
           
        } else {
            for (let z = 0; z < utilityList.length; z++) {
          //      utilityList[z].style.border = "none"
            }
        }
    }


    calculateNewPosition = ({ movementX, movementY }) => {
        let container = document.getElementById("page");
        let containerRect = container.getBoundingClientRect();


        let elementStyles = window.getComputedStyle(this.element);
        let elementLeft = parseFloat(elementStyles.left) || 0; // Use 0 if left is not defined
        let elementTop = parseFloat(elementStyles.top) || 0; // Use 0 if top is not defined
        let elementRect = this.element.querySelector(".main").getBoundingClientRect()

        let newLeft = elementLeft + movementX;
        let newTop = elementTop + movementY;

        // Calculate the boundaries based on the container's position and dimensions
        let minLeft = containerRect.left - elementRect.left; // Adjusted for container's position
        let maxLeft = containerRect.right - containerRect.left - elementRect.width; // Adjusted for container's position
        let minTop = containerRect.top - elementRect.top; // Adjusted for container's position
        let maxTop = containerRect.bottom - containerRect.top - elementRect.height; // Adjusted for container's position

        // Ensure the element stays within the boundaries
        newLeft = Math.max(minLeft, Math.min(newLeft, maxLeft));
        newTop = Math.max(minTop, Math.min(newTop, maxTop));

        return [newLeft, newTop]

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
                  //  console.log("isColliding")
                //    utilityList[x].style.border = "2px solid red"
                }
            } else {
                //console.log("no collisions on different layers")
            }
        }
        }
        return utilityCollision;
    }
}