import Axios from "axios";


const instance = Axios.create({
    baseURL : 'http://karacsony-env.eba-eh9i4nae.us-west-2.elasticbeanstalk.com/present',
    headers:{
        'Content-Type' :'application/json;charset=utf-8',
        'Access-Control-Allow-Origin':'*'
    }
})



export default {


    async action(param){
        switch (param.type){
            case 'find':
                return await this.find(param);
            case 'collect':
                return await this.collect();
            case "book":
                return await this.book(param);
            case "update":
                return await this.update(param);
            case "remove":
                return await this.remove(param);
            case "admin":
                return await this.adminFind();
            case "bookAdmin":
                return await this.bookAdmin(param);

        }
    },
    async adminFind(){
        let response = await instance.get("admin")
        if(response.status === 200){
            return response.data;
        }
        throw response.status;
    },
    async book(param){
        let response = await instance.post("book",
            {
                secretKey:param.data.secretKey,
                presents:param.data.presents
            });
        if(response.status === 200){
            return response.data;
        }
        throw response.status;
    },
    async find(param){
        let response = await instance.get(param.key);
        if(response.status === 200){
            return response.data;
        }
        throw response.status;
    },
    async collect(){
        let response = await instance.get("free",);
        if(response.status === 200){
            return response.data
        }
        throw response.status;
    },
    async update(param){
        let response = await instance.put("",param.data);
        if(response.status !==200)
        {
            throw response.status;
        }
    },
    async remove(param){
        let response = await instance.post("remove",param.data);
        if(response.status !==200)
        {
            throw response.status;
        }
    },
    async bookAdmin(param){
        let response = await instance.post("adminBook",param.data)
        if(response.status !== 200){
            throw response.status;
        }
    }
}