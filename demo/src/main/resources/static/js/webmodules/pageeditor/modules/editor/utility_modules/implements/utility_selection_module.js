import UtilitySelectionModuleInterface from "../utility_selection_module_interface.js";

export default class UtilitySelectionModule extends UtilitySelectionModuleInterface {
    constructor() {
        super()
    }

    selectHandler = (utilityElementSelected) => {
        this.select(utilityElementSelected)
    }

    selectFunc = (utilityElementSelected) => {
      
      //  console.log(this.selectedEl)
     //   console.log(utilityElementSelected.element)


        if (this.selectedEl && !(this.selectedEl === utilityElementSelected)) {
         //   console.log("select case 1")
            this.selectedEl.deselectElement();
            this.selectedEl.enableDrag()
           
            this.selectedEl.deconstructToolbar()
            utilityElementSelected.constructToolbar()
            utilityElementSelected.selectElement()
            this.selectedEl = utilityElementSelected
            
            this.select = true
        }

        else if (!this.selectedEl && !(this.selectedEl === utilityElementSelected)) {
            // Assuming necessary for debugging
         //   console.log("select case 2")
            utilityElementSelected.constructToolbar();
            utilityElementSelected.selectElement();
            this.selectedEl = utilityElementSelected;
      
            this.select = true
        }

        else if (this.select && (this.selectedEl === utilityElementSelected)) {
         //   console.log("select case 3")
            if ((document.querySelectorAll(".text-popup").length <= 0) && (document.querySelectorAll(".image-popup").length <= 0)) {
                utilityElementSelected.constructToolbar();
                utilityElementSelected.selectElement();
                this.selectedEl = utilityElementSelected;
          
                this.select = true
            }


        }
    }
}