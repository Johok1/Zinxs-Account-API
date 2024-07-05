import EditorUtilityInterface from '../interfaces/editor_utility_interface.js'
export default class UtilitySelectionModuleInterface {
    constructor() {
        this.editorUtilityInterface = new EditorUtilityInterface()
        this.selectedEl = null
  
    }

    selectHandler = (element) => {
        console.error("implementation required for selectHandler from type UtilitySelectionMouduleInterface")
    }
}