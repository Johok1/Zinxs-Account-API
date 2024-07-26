export default class Controller {
    constructor() {
        this.fetch_url_page = "https://www.zinxswiki.com/page"
        this.fetch_url_image = "https://www.zinxswiki.com/image"
    }

    getPageName(pageId) {
        return fetch(this.fetch_url_page + "/getPageName/" + pageId, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*'
            }
        }).catch(error => {
            console.error(error)
        });
    }

    getPageImage(pageId) {
      return fetch(this.fetch_url_image + "/getPageImage/"  + pageId, {
                 method: 'GET',
                 headers: {
                     'Access-Control-Allow-Origin': '*',
                     'Access-Control-Allow-Origin': '*'
                 }
             }).catch(error => {
                 console.error(error)
             });

    }

    getImageName(imageId) {
        return fetch(this.fetch_url_image + "/getImageName/"  + imageId, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }).catch(error =>{
            console.error(error)
        })
    }

    getPageImageIds(pageId) {
        return fetch(this.fetch_url_image + "/getPageImageIds/" + pageId, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }).catch(error => {
            console.error(error)
        });
    }

    getPageImageUrl( imageId) {
        return fetch(this.fetch_url_image + "/getPageImageUrl/"  + imageId, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }).catch(error => {
            console.error(error);
        });
    }

    addPageImageUrl( pageId, file, filename) {
        let formData = new FormData()
        formData.append('file', file)
        
      
        return fetch(this.fetch_url_image + "/addPageImageUrl/" + pageId + "/" + filename, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*'
            },
            body: formData
        }).catch(error => {
            console.error(error);
        });
    }

    getAccountPageContent(pageId) {
        return fetch(this.fetch_url_page + "/getAccountPageContent/"  + pageId, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }).catch(error => {
            console.error(error);
        });
    }

    postAccountPageContent(pageId, content) {
        return fetch(this.fetch_url_page + "/postAccountPageContent/"  + pageId, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'plain/text'
            },
            body: content
        }).catch(error => {
            console.error(error);
        });
    }

}