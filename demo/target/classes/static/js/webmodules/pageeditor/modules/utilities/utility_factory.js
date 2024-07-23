import ImageUtility from './utility/implements/image_utility.js';
import TextUtility from './utility/implements/text_utility_v2.js';

export default class UtilityFactory {

    // Method to create and return a new HTML element with applied styles and properties
    createElement(tagName, properties = {}, styles = {}) {
        const element = document.createElement(tagName);
        Object.assign(element, properties);
        Object.assign(element.style, styles);
        return element;
    }

    // Method to construct the text utility
    constructTextUtility = (layer) => {
        const page = document.getElementById("page");
        const font = this.createElement('font', { innerText: 'New Text' }, { color: 'black' });
        const label = this.createElement('p', { draggable: false, className: 'textParagraph main' }, {});
        label.style.overflowY ="auto"
        label.appendChild(font);
        label.id = "par"



        const labelDivStyles = {
            width: '300px', overflowY: 'auto',
            position: 'absolute', wordWrap: 'break-word', zIndex: `${parseInt(layer) + 1}`
        };
        const labelDiv = this.createElement('div', { className: 'utility text drag' }, labelDivStyles);

        let parDiv = document.createElement("div")
        parDiv.style.height = label.style.height
        parDiv.style.width = label.style.width
        parDiv.style.overflowY = "auto"

        parDiv.appendChild(label)

        // parDiv.style.zIndex = "2"
        labelDiv.setAttribute("layer", layer)

        labelDiv.appendChild(parDiv);
        labelDiv.style.height = parDiv.style.height
        labelDiv.style.width = parDiv.style.width
        labelDiv.style.overflowY ="auto"
        let utility = this.getUtility(labelDiv)
        return utility
      
    }

    // Method to construct the image utility
    constructImageUtility = (layer) => {
        const page = document.getElementById("page");
        const imgStyles = {};
        let img = this.createElement('img');
        img.style.backgroundColor = "transparent"
         img.style.width = "75px"
        img.style.height = "75px"
        img.style.objectFit = "cover"
        img.draggable = false
        img.classList.add("image-main")
        img.classList.add("main")
        img.style.userSelect = "none"
        // img.style.zIndex = "2"
        let input = document.createElement("input")
        input.classList.add("image-input")
        input.type = "file"
        input.accept = "image/jpeg, image/png, image/jpg"
        input.classList.add("hidden")
        img.appendChild(input)
        let div = this.createElement('div', { className: 'utility image drag', draggable: false }, imgStyles)
        div.style.width = img.style.width
        div.style.height = img.style.height
        div.style.zIndex =`${parseInt(layer)+1}`
        div.setAttribute("layer",layer)
        div.appendChild(img)
       
        let utility = this.getUtility(div)
        return utility
      
    }

    // Method to get the utility based on the element type
    getUtility = (element) => {
        if (element.classList.contains("text")) {
            return new TextUtility(element);
        } else if (element.classList.contains("image")) {
            return new ImageUtility(element);
        } else {
         //   console.log("Invalid element");
            return null; // It's better to return null for invalid cases for consistency
        }
    }
}
