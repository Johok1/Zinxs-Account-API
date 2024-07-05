export default class Controller {
    constructor() {
        this.fetch_url_profile ="https://www.zinxswiki.com/api/v1/profile"
    }

    getAccountPageLogo(token, pageId) {
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