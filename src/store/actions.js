import userApi from "../api/userApi";
import presentApi from "../api/presentApi";

const actions = {
    async userApi(context,param){
        return userApi.action(param);
    },
    async presentApi(context,param){
        console.log(param)
        return presentApi.action(param)
    }
}
export default actions;