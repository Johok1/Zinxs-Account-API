import EditorUtilityInterface from '../interfaces/editor_utility_interface.js'

export default class UtilityHandlerModuleInterface {

    constructor() {
        this.editorUtilityInterface = new EditorUtilityInterface()
    }

    registerAllHandlers = () => {
        console.error("implementation required on registerAllHandlers from type UtilityHandlerModuleInterface")
    }

    resetAllElementHandlers = () => {
        console.error("implementation required on resetAllElementHandlers from type UtilityHandlerModuleInterface") 
    }
}