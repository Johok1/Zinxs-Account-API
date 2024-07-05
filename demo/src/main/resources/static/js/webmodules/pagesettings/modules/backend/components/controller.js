export default class Controller {
    constructor() {
        this.fetch_url_page = "https://www.zinxswiki.com/page"
        this.fetch_url_image = "https://www.zinxswiki.com/image"
    }

    postPageImage(token, pageId, file, filename) {
        let formData = new FormData()
        formData.append('file', file)
        return fetch(this.fetch_url_image + "/postPageImage/" + token + "/" + pageId + "/" + filename, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*'
            },
            body: formData
        }).catch(error => {
            console.error(error)
        });

    }

    postPageName(token, pageId, pageName) {
        return fetch(this.fetch_url_page + "/postPageName/" + token + "/" + pageId + "/" + pageName, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*'
            }
        }).catch(error => {
            console.error(error)
        });

    }

}