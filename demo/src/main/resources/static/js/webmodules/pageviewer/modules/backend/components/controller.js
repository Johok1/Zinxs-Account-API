export default class Controller {
    constructor() {
        this.fetch_url_profile ="https://www.zinxswiki.com/profile"
         this.fetch_url_image = "https://www.zinxswiki.com:444/image"
    }

    getAccountPageLogo(pageId) {
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

    getAccountPageHeaders(token) {
        
        return fetch(this.fetch_url_profile + "/getAccountPageHeaders/" + token, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*'
            }
        }).catch(error => {
            console.error(error)
        });
        
    }
  
   

}