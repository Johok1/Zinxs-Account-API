export default class Controller {
    constructor() {
        this.fetch_url_profile ="https://www.zinxswiki.com/api/v1/profile"
    }

    getProfilePicture(token) {
        return fetch(this.fetch_url_profile + "/getProfileImage/" + token, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*',
            }
        }).catch(error => {
            console.error(error)
        });

    }


    getProfileUsername(token) {
        return fetch(this.fetch_url_profile + "/getUsername/" + token, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*',
            }
        }).catch(error => {
            console.error(error)
        });

    }
  
   

}