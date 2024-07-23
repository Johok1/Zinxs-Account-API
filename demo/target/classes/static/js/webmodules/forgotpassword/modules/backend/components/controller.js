export default class Controller {
    constructor() {
        this.fetch_url_validation ="https://www.zinxswiki.com/api/v1/validation"
    }

    postResetPasswordRequest(email) {
        return fetch(this.fetch_url_validation + "/resetPassword/" + email, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }).catch(error => {
            console.error(error);
        });
    }

    

  
   

}