export default class LayerManagerModule {
    constructor() {
        this.layerSelected = "1"
    }

    getCurrentSelectedLayer = () => {
        return this.layerSelected;
    }

    setSelectedLayer = (layer) => {
        this.layerSelected = layer
        return this.layerSelected 
    }

    toggleHideLayer = (layer) => {
        let utilityList = document.getElementById("page").querySelectorAll(".utility")
        for (let x = 0; x < utilityList.length; x++) {
            if (utilityList[x].getAttribute("layer") == layer) {
                utilityList[x].classList.toggle("hidden")
            }
        }
    }
}