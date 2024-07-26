export default class Controller {
    constructor() {
        this.fetch_url_profile ="https://www.zinxswiki.com/profile"
    }

    postNewPassword(token, password) {
        return fetch(this.fetch_url_profile + "/setPassword/" + token + "/" + password, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }).catch(error => {
            console.error(error);
        });
    }

    

  
   

}