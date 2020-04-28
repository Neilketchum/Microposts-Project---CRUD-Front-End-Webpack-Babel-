class EasyHTTP{
    // Make http get request
        async get(url){
             const response = await fetch(url);
             const resdata = await response.json();
             return resdata 
    }
        async post(url,data){
            const response = await fetch(url,{
                method : 'POST',
                headers : {
                    'content-type' : 'application/JSON'
                },
                body : JSON.stringify(data)
            })
            const resdata = await response.json()
            return resdata;
        }
        async put(url,data){
            const response = await fetch(url,{
                method : 'PUT',
                headers : {
                    'content-type' : 'application/JSON'
                },
                body:JSON.stringify(data)
            })
            const resdata = await response.json()
            return resdata 
        }
        async delete(url){
            const response = await fetch(url,{
                method : 'DELETE',
                headers : {
                    'content-type' : 'application/JSON'
                }
            },)
            return  "Resourse Deleted"
        }
}

export const http = new EasyHTTP();