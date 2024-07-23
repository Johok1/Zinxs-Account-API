export default class Controller {
    constructor() {
        this.fetch_url_page = "https://www.zinxswiki.com/page"
        this.fetch_url_image = "https://www.zinxswiki.com/image"
    }

    createAccountPage(token, name) {
        
        return fetch(this.fetch_url_page + "/postNewAccountPage/" + token + "/" + name, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*'
            }
        }).catch(error => {
            console.error(error)
        });
    }

    postPageImage(token, pageId, fileName,  file) {
        let formData = new FormData()
        formData.append('file', file)
        return fetch(this.fetch_url_image + "/postPageImage/" + token + "/" + pageId + "/" + fileName, {
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

    

}