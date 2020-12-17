import App from './App.vue'
import Vue from 'vue'
import Vuex from "vuex"
import Buefy from 'buefy'
import store from './store/store'
import router from './router'
import { dom, library } from "@fortawesome/fontawesome-svg-core"
import { fas } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import vueContext from "vue-context"
import VueSidebarMenu from 'vue-sidebar-menu'
import 'buefy/dist/buefy.css'
library.add(fas)


Vue.component('VueContext', vueContext)
Vue.component('font-awesome-icon', FontAwesomeIcon)
dom.watch()

Vue.use(Buefy, {
  defaultIconComponent: 'font-awesome-icon',
  defaultIconPack: 'fas',
});
Vue.use(Buefy)
Vue.use(Vuex)
Vue.use(VueSidebarMenu)
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
