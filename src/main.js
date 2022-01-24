// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
//import BootstrapVue from 'bootstrap-vue'
import router from './router'
import store from './store'
import Reusables from './components/reusables/index.js'

//import 'bootstrap-vue/dist/bootstrap-vue.css'


import './assets/js/main.js'
import axios from 'axios';

axios.defaults.baseURL =process.env.AXIOS_BASE_URL
axios.defaults.withCredentials = true
/*
axios.defaults.baseURL ="http://192.168.1.102:3000"
axios.defaults.withCredentials = false*/
//axios.defaults.baseURL =store.getters.ApiServer;

import auth from './auth.js'
router.beforeEach(auth);

Vue.config.productionTip = process.env.NODE_ENV=="development"?false:true
//Vue.use(BootstrapVue);

/* eslint-disable no-new */
const app =new Vue({
    el:'#app',
    store,
    router,
    components:{App},
    template: '<App/>'
})//.$mount('#app');
