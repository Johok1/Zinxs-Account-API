import ToolbarInterface from '../../toolbar/toolbar_interface.js'
import UtilityFunctionInterface from '../utility_function_interface.js'
export default class Utility {
    constructor(element) {
        this.element = element
        this.utilityFunctionInterface = new UtilityFunctionInterface()
        this.toolbarInterface = new ToolbarInterface()
    }

    selectElement = () => {
        console.log("Must override selectElement")
    }

    deselectElement = () => {
        console.log("Must override deselectElement")
    }

    constructToolbar = () => {
        console.log("Must override constructToolbar")
    }

    enableDrag = () => {
        console.log("Must override enableDrag")
    }
}