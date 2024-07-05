import ImageToolbar from './implements/image_toolbar.js'
import TextToolbar from './implements/text_toolbar.js'
export default class ToolbarInterface {
    constructor() {
        this.imageToolbar = new ImageToolbar()
        this.textToolbar = new TextToolbar()
    }
} 