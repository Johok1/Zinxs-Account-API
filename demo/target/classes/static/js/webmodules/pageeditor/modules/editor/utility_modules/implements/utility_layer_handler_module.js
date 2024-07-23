import UtilityHandlerModule from "./utility_handler_module.js";

export default class UtilityLayerHandlerModule extends UtilityHandlerModule {
    constructor() {
        super()
    }

    registerAllHandlers(select, layer){

        this.registerElementHandlers(".image", this.registerImageHandlers, select, layer);
        this.registerElementHandlers(".text", this.registerTextHandlers, select, layer);
    }

    registerImageHandlers(imgElement, select, layer){
        
        if (imgElement.getAttribute("layer") == layer) {
            super.registerImageHandlers(imgElement, select)
        }
    }

    registerTextHandlers(textElement, select, layer){

        if (textElement.getAttribute("layer") == layer) {
            super.registerTextHandlers(textElement, select)
        }
    }

    registerElementHandlers(selector, handlerFunction, select, layer){
        document.querySelectorAll(selector).forEach(element => {
            handlerFunction.call(this, element, select, layer); // using call() to maintain 'this' context
        });
    }
}