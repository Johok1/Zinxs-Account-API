export default class Controller {
    constructor() {
        this.fetch_url_validation ="https://www.zinxswiki.com/api/v1/validation"
    }

    postGoogleRegisterRequest(token) {
        const googleRegistrationRequest = {
            "token": token,
            "blank" :""
        }

        return fetch(this.fetch_url_validation + "/googleRegister", {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registrationRequest)
        }).catch(error => {
            console.error(error);
        });
    }

    postRegisterRequest(username, email, password) {
        const registrationRequest = {
            "username": username,
            "email": email,
            "password": password
        };
        return fetch(this.fetch_url_validation + "/register", {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registrationRequest)
        }).catch(error => {
            console.error(error);
        });
    }

  
   

}