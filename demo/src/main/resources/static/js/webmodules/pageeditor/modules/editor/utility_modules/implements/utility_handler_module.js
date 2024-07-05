import UtilityHandlerModuleInterface from '../utility_handler_module_interface.js'
export default class UtilityHandlerModule extends UtilityHandlerModuleInterface {

    constructor() {
        super()
    }

    registerAllHandlers = (select) => {

        this.registerElementHandlers(".image", this.registerImageHandlers, select);
        this.registerElementHandlers(".text", this.registerTextHandlers, select);
    }

    resetAllElementHandlers = (select) => {
        this.registerElementHandlers(".image", this.resetImageElementHandlers, select)
        this.registerElementHandlers(".text", this.resetTextElementHandlers, select)
    }

    registerImageHandlers = (imgElement, select) => {
        if (imgElement.getAttribute('data-dblclick-attached') !== 'true') {
            const imageUtility = this.editorUtilityInterface.utilityFactory.getUtility(imgElement);

           
                // Attach the dblclick event listener
                imgElement.addEventListener("dblclick", () => select(imageUtility));

                // Set a custom attribute to indicate that the event listener has been attached
                imgElement.setAttribute('data-dblclick-attached', 'true');
            
        }
    }

    registerTextHandlers = (textElement, select) => {


        // Check if the dblclick handler has not already been attached
        if (!textElement.hasAttribute('data-dblclick-attached')) {
            const textUtility = this.editorUtilityInterface.utilityFactory.getUtility(textElement);

           
                textElement.addEventListener("dblclick", () => select(textUtility));
                textElement.setAttribute('data-dblclick-attached', 'true'); // Mark it as attached
            
        }


    }

    resetImageElementHandlers = (element,select) => {
        if (element.hasAttribute('data-dblclick-attached')) {
            let newElement = element.cloneNode(true)
            newElement.removeAttribute('data-dblclick-attached');
            element.parentNode.replaceChild(newElement, element);
        }
    }

    resetTextElementHandlers = (element,select) => {
        if (element.hasAttribute("data-dblclick-attached")) {
            let newElement = element.cloneNode(true)
           
            newElement.removeAttribute("data-dblclick-attached")

            element.parentNode.replaceChild(newElement, element)
        }
    }

    registerElementHandlers = (selector, handlerFunction, select) => {
        document.querySelectorAll(selector).forEach(element => {
            handlerFunction.call(this, element, select); // using call() to maintain 'this' context
        });
    }

    
}