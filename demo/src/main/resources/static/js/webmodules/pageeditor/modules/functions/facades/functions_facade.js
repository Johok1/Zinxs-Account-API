import ImageFunctionFacade from './image_function_facade.js'

import TextFunctionFacade from './text_function_facade.js'


export default class FunctionFacade {
    constructor(backendManager) {
        this.textFunctionFacade = new TextFunctionFacade() 
        this.imageFunctionFacade = new ImageFunctionFacade(backendManager)
    }
}