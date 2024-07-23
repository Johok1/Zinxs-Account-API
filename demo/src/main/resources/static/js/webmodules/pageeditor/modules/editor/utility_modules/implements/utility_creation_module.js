export default class UtilityCreationModule{
	constructor(utilityHelper){

		this.page = document.getElementById("page")
        this.utilityHelper = utilityHelper
        this.backDrop = document.getElementById("creationDiv")
	}

  
    registerAllHandlersSelect = () => {
        const select = this.utilityHelper.utilitySelectionModule.selectFunc
        const register = this.utilityHelper.utilityHandlerModule.registerAllHandlers
        const layerManager = this.utilityHelper.layerManagerModule
      //  console.log("select " + select)
      //  console.log("register " + register)
        register(select, layerManager.getCurrentSelectedLayer())
    }

    createTextUtility = () => {
        if (!this.page.classList.contains("placing")) { 
            this.page.classList.add("placing")
            let layerManager = this.utilityHelper.layerManagerModule
            let textUtility = this.utilityHelper.utilityFactory.constructTextUtility(layerManager.getCurrentSelectedLayer())
            this.setUtilityPlacementMode(textUtility)
         
        }
        //this.registerAllHandlersSelect()
	}

    createImageUtility = () => {
        if (!this.page.classList.contains("placing")) {
            this.page.classList.add("placing")
            let layerManager = this.utilityHelper.layerManagerModule
            let imageUtility = this.utilityHelper.utilityFactory.constructImageUtility(layerManager.getCurrentSelectedLayer())
            this.setUtilityPlacementMode(imageUtility)
            
        }

        // this.registerAllHandlersSelect()
    }

    setUtilityPlacementMode = (utility) => {
        utility.element.style.position = "fixed"
        utility.element.style.opacity = "50%"

        document.getElementById("page").after(utility.element)
        utility.element.style.zIndex = "9999"
        this.utility = utility
        this.backDrop.onmousemove = this.stickUtilityToMouse.bind(this)
        
        utility.element.addEventListener("click", function (event) {
            this.placeUtility(utility, event)
        }.bind(this))

        
       
    }

    stickUtilityToMouse = (event) => {
        let yOffset = (window.screen.height/100)*47
        let xOffset = (window.screen.width/100)*2
        this.utility.element.style.transform = 'translateY(' + (event.clientY-155) + 'px)'
        this.utility.element.style.transform += 'translateX(' + (event.clientX - 160) + 'px)';

      
     


    }


   

    placeUtility = (utility, event) => {
        if (this.page.classList.contains("placing")) {
            this.backDrop.onmousemove = null
            this.backDrop.removeChild(utility.element)
            utility.element.style.position = "absolute"
            utility.element.style.opacity = "100%"
            if(utility.element.classList.contains("text")){
                utility.element.style.zIndex = `${parseInt(utility.element.getAttribute("layer")) + 1}`;
            }else{
                utility.element.style.zIndex = `${parseInt(utility.element.getAttribute("layer"))}`;
            }
            this.element = utility.element
            this.page.appendChild(utility.element)
            
            
            //utility.element.style.transform = 'translateY(' + (event.clientY-230) + 'px)'
            //utility.element.style.transform += 'translateX(' + (event.clientX - 110) + 'px)';
            utility.element.style.transform = ""
            utility.element.style.left = `${event.clientX - 160}px`
            let scrollTop = document.querySelector("body").scrollTop
            utility.element.style.top = `${event.clientY + scrollTop - 155}px`
          //  console.log(window.scrollY)
            let newRect = utility.element.getBoundingClientRect()
            let utilityList = this.page.querySelectorAll(".utility")
            if (this.isUtilityCollision(utilityList, newRect,utility.element)) {
                utility.element.remove()
            }

            utility.enableDrag()
            this.registerAllHandlersSelect()
            this.page.classList.remove("placing")
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
                     //  console.log("isColliding")
                   //    utilityList[x].style.border = "2px solid red"
                   }
               } else {
                 //  console.log("no collisions on different layers")
               }
           }
           }
           return utilityCollision;
       }

    //set utility to placement mode and add eventer for placement 

}