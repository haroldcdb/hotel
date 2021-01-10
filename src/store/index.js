import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        nav: true,
        btn: true,
        redireccion: "",
        footer: true,
        loader: false
    },
    mutations: {},
    actions: {},
    modules: {}
})