import ImageBackendFunction from '../function/implements/image_backend_function.js'
import BoxResizeFunction from '../function/implements/box_resize_function.js'

export default class ImageFunctionFacade {
    constructor(backendManager) {
        this.imageBackendFunction = new ImageBackendFunction(backendManager);
        this.boxResizeFunction = new BoxResizeFunction()
    }

    
}
