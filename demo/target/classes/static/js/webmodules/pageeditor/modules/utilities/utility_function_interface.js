import FunctionFacade from '../functions/facades/functions_facade.js'
import BackendManager from '../backend/backend_manager.js'
export default class UtilityFunctionInterface {
    constructor() {
        this.backendManager = new BackendManager()
        this.functionFacade = new FunctionFacade(this.backendManager)

    }
}