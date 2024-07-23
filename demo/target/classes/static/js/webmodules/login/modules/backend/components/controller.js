export default class Controller {
    constructor() {
        this.fetch_url_validation ="https://www.zinxswiki.com/api/v1/validation"
    }

    postGoogleLoginRequest(token) {

        return fetch(this.fetch_url_validation + "/googleLogin/" + token, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        }).catch(error => {
            console.error(error);
        });
    }

    postLoginRequest(email, password) {
        const loginRequest = {
            "email": email,
            "password": password
        };
        return fetch(this.fetch_url_validation + "/static/login", {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginRequest)
        }).catch(error => {
            console.error(error);
        });
    }

  
   

}