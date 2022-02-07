import loginLayaut from '@/components/layaut/login-layaut.vue'
import cliente from '@/components/view/cliente/cliente.vue'
//import login_form from '@/components/view/login/login-form.vue'
import recuperapass from '@/components/view/login/recupera-pass.vue'

import Admin404 from '@/components/view/login404.vue'


import $store from '@/store'
import path from 'path'
export default
{
    path: path.join($store.getters.ApiServer,'/'),
    component:loginLayaut,
    children:
    [
        { path: '/',name:'cliente', component: cliente },
    ],
    meta: {
        isPublic: true
    },

}
