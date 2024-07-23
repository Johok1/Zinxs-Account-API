import SummernoteFunction from '../function/implements/summernote_function.js'
import HorizontalResizeFunction from '../function/implements/horizontal_resize_function.js'

export default class TextFunctionFacade {

    constructor() {
        this.summernoteFunction = new SummernoteFunction()
        this.horizontalResizeFunction = new HorizontalResizeFunction()
    }
}