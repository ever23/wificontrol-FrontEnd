import loginLayaut from '@/components/layaut/login-layaut.vue'
import login from '@/components/view/login/login.vue'
//import login_form from '@/components/view/login/login-form.vue'
import recuperapass from '@/components/view/login/recupera-pass.vue'
import Admin404 from '@/components/view/login404.vue'
import LockScreen from '@/components/view/login/LockScreen.vue'

import $store from '@/store'
import path from 'path'
export default
{
    path: path.join($store.getters.ApiServer,'/login'),
    component:loginLayaut,
    children:
    [
        { path: '/',name:'login', component: login,props: route =>{return { redirect: route.query.redirect }} },
        { path: 'recupera-password',name:'RecuperaPass', component: recuperapass },
        { path: 'lockscreen',name:'LockScreen',component:LockScreen,props:true},
        { path:'*',name:'Login404',component:Admin404},
    ],
    meta: {
        isPublic: true
    },

}
