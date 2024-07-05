import Function from '../function.js'
import '../summernote.js'

export default class SummernoteFunction extends Function{



    handleEditText(element, deconstructToolbar, constructToolbar){
        console.log(element)
        console.log(element.firstChild)
      //  deconstructToolbar()


        //element.classList.add("summernote")
        this.element = element
        this.dupeElement = element.cloneNode()
        this.dupeElement.innerHTML = this.element.innerHTML
        document.getElementById("page").appendChild(this.dupeElement)
        this.dupeElement.classList.add("summernote")

        this.deconstructToolbar = deconstructToolbar
        this.constructToolbar = constructToolbar

        $(document).ready(() => {
            this.initTextEditor(constructToolbar)
        })

    }

    initTextEditor = (constructToolbar) => {
        let top = this.element.style.top
        let left = this.element.style.left
        let width = this.element.style.width
        let height = this.element.style.height

        this.createSummernoteEditor(top, left, width, height)
       
        document.getElementById("toolbar").appendChild(document.querySelector(".note-editor"))

        //this.attachDisableEditButton(constructToolbar, this.element)

        let parList = document.querySelector('.note-editable')

        this.preventSummernoteParagraphDeletion(parList)
        this.preventSummernotePasteWithFormatting(parList)
        this.preventSummernoteSelectAll(parList)
        this.moveSummernoteEditorToLayer(parList)
        this.preventSummernoteEnterKeyParagraphCreation(parList)
        parList.addEventListener("keyup", this.setSummernoteTextToElementText)
      

    }

    moveSummernoteEditorToLayer = (editorElement) => {
        editorElement.style.zIndex = this.element.getAttribute("layer")
        document.querySelector(".note-editor").style.zIndex = this.element.getAttribute("layer")
    }


    createSummernoteEditor = (top, left ,width, height) => {
        $('.summernote').summernote({
            disableDragAndDrop:true,
            fontSizeUnits: ['px', 'pt'],
            fontColor: '#000000',
            toolbar: [
                // [groupName, [list of button]]
                ['style', ['bold', 'italic', 'underline', 'clear']],

                ['font', ['strikethrough', 'superscript', 'subscript']],
                ['fontname', ['fontname']],
                ['fontsize', ['fontsize']],
                ['color', ['color']]
            ],
            fontNames: ['Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Merriweather'],
            keyMap: {
                pc: {
                    'ENTER': ''
                },
                mac: {
                    'ENTER': ''
                }
            }
        });
        $('#summernote').summernote({
            disableDragAndDrop:true
        })
        $('.note-editor').css({
            color: "black",
            width: "90%",
            backgroundColor: "white"

        })
       document.querySelector(".note-editor").querySelector(".main").style.height = "20vh"
    }

    attachDisableEditButton = (constructToolbar, element) => {
        let disableEditBtn = $('<btn class="disable-edit-button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-feather="x" class="feather feather-x" style="color: #BAA21F;"></svg></btn>');
        
        // Add an event listener to the button


        $('.note-editor').append(disableEditBtn)
       

       

       // $('.disable-edit-button').on("click", () => this.handleDisableEditText(constructToolbar, element));

        document.feather.replace()
       
    }

    setSummernoteTextToElementText = () => {
        console.log("copy")
        this.element.querySelector("p").innerHTML = document.querySelector(".note-editable").querySelector("p").innerHTML
    }

    preventSummernoteEnterKeyParagraphCreation = (parList) =>{
        parList.addEventListener("keydown", ()=>{
            if(event.keyCode === 13){
                event.preventDefault();
                const range = $.summernote.range;
                const rng = range.create()
                const node = rng.insertNode(document.createElement('br'))

               // let br = document.createElement("br")
              //  let listOrs = parList.querySelector(".main").querySelectorAll("p")
              //  listOfPars[listOfPars.length-1].appendChild(br)
            }

        })
    }

    preventSummernoteParagraphDeletion = (parList) => {
        parList.addEventListener("keydown", () => {
            if (event.keyCode === 8 || event.keyCode === 46) {
                if (parList.querySelector(".main").querySelectorAll("p")[0].textContent == "") {
                    event.preventDefault();
                    console.log("no backspace on : " + parList.outerHTML)
                } else {
                    console.log("backspace on : " + parList.outerHTML)
                }
            } else {
                console.log("backspace not detected")
            }
             if (event.ctrlKey && (event.key === 'v'
                        || event.key === 'V')) {

                        }
        });
    }

    preventSummernoteSelectAll = (parList) => {
        parList.addEventListener('keydown', event => {
            if (event.ctrlKey && 'a'.indexOf(event.key) !== -1) {
                event.preventDefault()
            }
        })
    } 

    preventSummernotePasteWithFormatting = (parList) => {
        parList.addEventListener("paste", function (e) {
            e.preventDefault();
            var text = e.clipboardData.getData("text/plain");
            var temp = document.createElement("div");
            temp.innerHTML = text;
            document.execCommand("insertHTML", false, temp.textContent);
        });

    }

   

    handleDisableEditText (constructToolbar, element){
    if(document.querySelector(".note-editor") != null){
    document.querySelector(".note-editor").querySelector(".main").style.height = ""

        }
        var markup = $('.summernote').summernote('code');



        //  this.element.innerHTML = markup

        $('.summernote').summernote('destroy');

        $('.summernote').removeClass('summernote')

     //   constructToolbar()

        element.style.height = (parseInt(element.querySelector(".textParagraph").style.height) + 50) + "px"

        this.element.innerHTML = this.dupeElement.innerHTML
        this.dupeElement.remove()
    }
}