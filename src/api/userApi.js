import Axios from "axios";

//instance.baseURL = 'http://karacsony-env.eba-eh9i4nae.us-west-2.elasticbeanstalk.com/user';




const instance = Axios.create({
    baseURL :"http://karacsony-env.eba-eh9i4nae.us-west-2.elasticbeanstalk.com/user",
    headers:{
        'Content-Type' :'application/json;charset=utf-8',
        'Access-Control-Allow-Origin':'*'
    }
})

export default {


    async action(param){
        switch (param.type){
            case 'login':
                return await this.login(param);
            case 'register':
                return  await this.register(param);
            case 'find':
                return await this.find(param);
        }
    },

    async login(param){
            let response = await instance.get("login",{ params:
                    {
                        key:param.key
                    }
            })
        if(response.status === 200){
            return response.data
        }
        throw response.status;
    },
    async register(param){
        let response = await instance.post("",param.data)
        if(response.status === 200){
            return response.data
        }
        throw response.status;
    },
    async find(param){
        let response = await instance.get(param.key);
        if(response.status === 200){
            return response.data;
        }
        throw response.status;
    }
}