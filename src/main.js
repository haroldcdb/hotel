import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import BootstrapVue from 'bootstrap-vue'
import * as VueGoogleMaps from 'vue2-google-maps';

// Se importa bootstrap en el proyecto - archivo main.js
Vue.use(BootstrapVue);
Vue.use(VueGoogleMaps, {
    load: {
        key: "AIzaSyDRvgHixbIiELz55ECIqM6k7RmAj75tw7Q",
        libraries: "places"
    }
});

// Se importa los estilos de bootstrap - archivo main.js
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@fortawesome/fontawesome-free/css/all.css'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')