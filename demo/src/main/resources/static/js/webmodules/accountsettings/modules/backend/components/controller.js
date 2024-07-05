export default class Controller {
    constructor() {
        this.fetch_url_profile ="https://www.zinxswiki.com/api/v1/profile"
    }

    setProfilePicture(token, input) {
        let formData = new FormData()
        formData.append('file', input)
        return fetch(this.fetch_url_profile + "/setProfileImage/" + token, {
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

    setProfileEmail(token, email) {
        return fetch(this.fetch_url_profile + "/setEmail/" + token + "/" + email, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'plain/text'
            }
        }).catch(error => {
            console.error(error)
        });

    }

    setProfilePassword(token, password) {
        return fetch(this.fetch_url_profile + "/setPassword/" + token + "/" + password, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'plain/text'
            }
        }).catch(error => {
            console.error(error)
        });
    }

    setProfileUsername(token, username) {
        return fetch(this.fetch_url_profile + "/setUsername/" + token + "/" + username, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'plain/text'
            }
        }).catch(error => {
            console.error(error)
        });

    }
  
   

}