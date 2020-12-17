import Vue from "vue";
import VueRouter from "vue-router";


const Login =  ()  => import("./components/Login")
const Register =  ()  => import("./components/Register")
const Home = () => import("./components/Home")
const Key = () => import("./components/Key")
const Admin = () => import("./components/Admin")
Vue.use(VueRouter)


export default new VueRouter({
    mode: "history",
    routes: [
        {
            path: "/",
            component: Home,
            redirect:"/login",
            children: [
                {
                    path:"/dashboard",
                    name:"dashboard",
                    component:Home,
                    meta:{
                        requiresAuth:true
                    }
                }
            ],
        },
        {
            path:"/admin",
            name:"admin",
            component:Admin,
            meta:{
                requiresAuth: true
            }
        },
        {
            path: "/key",
            name: "key",
            component:Key
        },
        {
            path: "/login",
            name: "login",
            component: Login
        },
        {
            path: "/register",
            name:"register",
            component: Register
        }
    ]
});