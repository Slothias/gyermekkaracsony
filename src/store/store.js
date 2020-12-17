import Vue from "vue"
import Vuex from "vuex"
import mutations from "./mutations"
import actions from "./actions"


Vue.use(Vuex)
export default new Vuex.Store({
    state:{
        user :{
            name:"",
            admin:false,
            loggedIn:false
        }
    },
    getters:{
        getUser(state){
            return state.user;
        },
        getUsername(state){
            return state.user.name;
        },
        isAdmin(state){
            return state.user.admin;
        },
        isLoggedIn(state){
            return state.user.loggedIn;
        }
    },
    mutations: mutations,
    actions:actions
})