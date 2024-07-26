export default class Controller {
    constructor() {
        this.fetch_url_profile ="https://www.zinxswiki.com/profile"
        this.fetch_url_page = "https://www.zinxswiki.com:444/page"
        this.fetch_url_image = "https://www.zinxswiki.com:444/image"
    }

    addProfilePage(token, pageId, pageName){
     const headerResponse = {
                "pageId": pageId,
                "pageName" : pageName
            }
     return fetch(this.fetch_url_profile + "/addProfilePage/" + token,{
        method: 'POST',
        headers:{
             'Access-Control-Allow-Origin': '*'
        }
        body: JSON.stringify(headerResponse)
     }).catch(error=>{
        console.error(error)
     })

    }

    createPage(name) {
        
        return fetch(this.fetch_url_page + "/postNewPage/" + name, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*'
            }
        }).catch(error => {
            console.error(error)
        });
    }

    postPageImage(pageId, fileName,  file) {
        let formData = new FormData()
        formData.append('file', file)
        return fetch(this.fetch_url_image + "/postPageImage/"  + pageId + "/" + fileName, {
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