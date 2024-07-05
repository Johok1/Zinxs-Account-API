import EditorUtilityInterface from '../interfaces/editor_utility_interface.js'
export default class UtilityTranslationModuleInterface {
    constructor() {
        this.editorUtilityInterface = new EditorUtilityInterface()
    }

    enableDragAll = () => {
        console.error("implementation required on enableDragAll from type UtilityTranslationModuleInterface")
    }
}