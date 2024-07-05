export default class FileUtilities {


    /*
     * const reader = new FileReader();
                // Define a function to handle the FileReader's load event
                reader.onload = 
                
                ...

              // Read the Blob as an ArrayBuffer
                reader.readAsArrayBuffer(result);
    */
    blobToBase64ReaderOnLoadHandler = (event) => {
        // Access the ArrayBuffer representing the Blob's data
        const arrayBuffer = event.target.result;

        // Convert ArrayBuffer to Uint8Array (byte array)
        const byteArray = new Uint8Array(arrayBuffer);

        const base64String = btoa(String.fromCharCode.apply(null, byteArray));

        const imageObj = {
            "base64String": base64String,
            "fileName": file.name
            }

        return imageObj
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