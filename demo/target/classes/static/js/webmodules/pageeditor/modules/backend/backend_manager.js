import Cookie from './components/cookie.js'
import Controller from './components/controller.js'

export default class BackendManager {
    constructor() {
        this.cookie = new Cookie()
        this.controller = new Controller()
    }
}