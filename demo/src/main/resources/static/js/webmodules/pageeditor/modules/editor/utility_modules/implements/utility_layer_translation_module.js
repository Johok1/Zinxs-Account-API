import UtilityTranslationModule from "./utility_translation_module.js";

export default class UtilityLayerTranslationModule extends UtilityTranslationModule {
    constructor() {
        super()
    }

    enableDragAll(layer){
        this.enableAllSelect(layer)
    }

    enableAllSelect(layer){
        this.registerElementHandlers(".image", this.enableDrag, layer)
        this.registerElementHandlers(".text", this.enableDrag, layer)
    }

    enableDrag(element, layer){
        if (element.getAttribute("layer") == layer) {
            super.enableDrag(element)
        }
    }

    registerElementHandlers(selector, handlerFunction, layer){
        document.querySelectorAll(selector).forEach(element => {
            handlerFunction.call(this, element, layer); // using call() to maintain 'this' context
        });
    }
}