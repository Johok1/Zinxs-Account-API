import Function from '../function.js'

export default class ImageBackendFunction extends Function{


    
    imageInputConstructor() {
        this.master = document.createElement("div");
        this.master.classList.add("card");
        this.master.classList.add("mb-2");

        this.header = document.createElement("div");
        this.header.classList.add("card-header");
        this.header.innerHTML = "Image Input";

        this.body = document.createElement("div");
        this.body.classList.add("card-body");
        this.body.classList.add("text-center");

        this.image = document.createElement("img");
        this.image.style.width = "5vw";

        this.fileInput = document.createElement("input");
        this.fileInput.classList.add("btn");
        this.fileInput.setAttribute("type", "file");

        this.body.appendChild(this.image);
        this.body.appendChild(this.fileInput);

        this.master.appendChild(this.header);
        this.master.appendChild(this.body);

        this.fileInput.addEventListener("change", (e) => {
            this.element.querySelector(".image-main").style.backgroundColor = "transparent"
            //this.element.querySelector(".image-main").style.width = ""
            //  this.element.querySelector(".image-main").style.height = ""

            let file = e.target.files.item(0)
            this.addImageToBackend(file, file.name)

            this.processFile(file)
                .then(result => {
                    console.log("process file result " + result)
                    console.log("file " + file.name)

                    this.element.querySelector(".image-main").src = URL.createObjectURL(result)




                    this.element.querySelector(".image-main").id = file.name

                    const addImageToBackend = this.addImageToBackend

                    const reader = new FileReader();
                    // Define a function to handle the FileReader's load event
                    reader.onload = function (event) {
                        // Access the ArrayBuffer representing the Blob's data
                        const arrayBuffer = event.target.result;

                        // Convert ArrayBuffer to Uint8Array (byte array)
                        const byteArray = new Uint8Array(arrayBuffer);

                        const base64String = btoa(String.fromCharCode.apply(null, byteArray));

                        // Now you can send the byteArray to the backend
                        //  addImageToBackend(base64String, file.name);
                    };

                    // Read the Blob as an ArrayBuffer
                    reader.readAsArrayBuffer(result);




                })
        })

        document.getElementById("toolbar").appendChild(this.master)
    }

    imageInputDestruct() {
        this.master.remove()
    }




    constructor(backendManager) {
        super()
        this.cookie = backendManager.cookie
        this.controller = backendManager.controller
    }

    attachFileInputHandler = (element) => {
    
        let image = element.querySelector(".image-main")
        this.element = element 

        function preventDefaults(e) {
            e.preventDefault()
            e.stopPropagation()
        }

        // Prevent default drag behaviors
        ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            image.addEventListener(eventName, preventDefaults, false)
            document.body.addEventListener(eventName, preventDefaults, false)
        })

        this.element.querySelector(".image-main").addEventListener("drop", this.handleFileInput, false)

        this.imageInputConstructor()
    }

    removeFileInputHandler = (element) => {

        let image = element.querySelector(".image-main")
        this.element = element

        function preventDefaults(e) {
            e.preventDefault()
            e.stopPropagation()
        }

        // Prevent default drag behaviors
        ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            image.addEventListener(eventName, preventDefaults, false)
            document.body.addEventListener(eventName, preventDefaults, false)
        })

        this.element.querySelector(".image-main").removeEventListener("drop", this.handleFileInput, false)

        this.imageInputDestruct()
    }

    handleFileInput = (e) => {
        this.element.querySelector(".image-main").style.backgroundColor = "transparent"
        //this.element.querySelector(".image-main").style.width = ""
      //  this.element.querySelector(".image-main").style.height = ""
      
        let file = e.dataTransfer.files.item(0)
        this.addImageToBackend(file, file.name)
        
        this.processFile(file)
            .then(result => {
                console.log("process file result " + result)
                console.log("file " + file.name)

                this.element.querySelector(".image-main").src = URL.createObjectURL(result)


               

                this.element.querySelector(".image-main").id = file.name

                const addImageToBackend = this.addImageToBackend

                const reader = new FileReader();
                // Define a function to handle the FileReader's load event
                reader.onload = function (event) {
                    // Access the ArrayBuffer representing the Blob's data
                    const arrayBuffer = event.target.result;

                    // Convert ArrayBuffer to Uint8Array (byte array)
                    const byteArray = new Uint8Array(arrayBuffer);

                    const base64String = btoa(String.fromCharCode.apply(null, byteArray));

                    // Now you can send the byteArray to the backend
                  //  addImageToBackend(base64String, file.name);
                };

                // Read the Blob as an ArrayBuffer
                reader.readAsArrayBuffer(result);




            })
            
    }

    addImageToBackend = (file, filename) => {
        const memberId = this.cookie.getCookie("token")
        const pageId = this.cookie.getCookie("pageId")
        this.controller.addPageImageUrl(memberId, pageId, file, filename)
            .then(response => response.text())
            .then(response => {
                if (response === "true") {
                    console.log("Image Submitted Successfully!")
                } else {
                    console.error(response)
                }
            })
    }

    processFile = (file) => {
        if (!file) {
            return;
        }
        console.log(file);


        // Load the data into an image
        return new Promise(function (resolve, reject) {
            let rawImage = new Image();

            rawImage.addEventListener("load", function () {
                resolve(rawImage);
            });

            rawImage.src = URL.createObjectURL(file);
        })
            .then(function (rawImage) {
                // Convert image to webp ObjectURL via a canvas blob
                return new Promise(function (resolve, reject) {
                    let canvas = document.createElement('canvas');
                    let ctx = canvas.getContext("2d");

                    canvas.width = rawImage.width;
                    canvas.height = rawImage.height;
                    ctx.drawImage(rawImage, 0, 0);

                    canvas.toBlob(function (blob) {
                        console.log("blob" + blob)

                        resolve(blob);
                    }, "image/webp");
                });
            })
            .then(function (blob) {

                return blob
            });

    }


}