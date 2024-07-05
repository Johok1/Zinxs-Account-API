export default class Controller {
    constructor() {
        this.fetch_url_profile = "https://www.zinxswiki.com/api/v1/profile"
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

    getPageImage(token, pageId) {
        return fetch(this.fetch_url_profile + "/getAccountPageLogo/" + token + "/" + pageId, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*'
            }
        }).catch(error => {
            console.error(error)
        });

    }

    getImageName(pageId, imageId) {
        return fetch(this.fetch_url_image + "/getImageName/" + pageId + "/" + imageId, {
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

    getPageImageUrl(pageId, imageId) {
        return fetch(this.fetch_url_image + "/getPageImageUrl/" + pageId + "/" + imageId, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }).catch(error => {
            console.error(error);
        });
    }

    addPageImageUrl(wixId, pageId, file, filename) {
        let formData = new FormData()
        formData.append('file', file)
        
      
        return fetch(this.fetch_url_image + "/addPageImageUrl/" + wixId + "/" + pageId + "/" + filename, {
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

    getAccountPageContent(wixId, pageId) {
        return fetch(this.fetch_url_page + "/getAccountPageContent/" + wixId + "/" + pageId, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }).catch(error => {
            console.error(error);
        });
    }

    postAccountPageContent(wixId, pageId, content) {
        return fetch(this.fetch_url_page + "/postAccountPageContent/" + wixId + "/" + pageId, {
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