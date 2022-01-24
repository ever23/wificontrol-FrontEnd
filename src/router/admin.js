//inicio
import admin from '@/components/layaut/main-layaut.vue'
import inicio from '@/components/view/inicio/inicio.vue'
//equipos
import equipos from '@/components/view/equipos/equipos.vue'
//import registoEquipo from '@/components/view/equipos/registro.vue'
//clientes
import clientes from '@/components/view/clientes/clientes.vue'
//404
import Admin404 from '@/components/view/Admin404.vue'
import error401 from '@/components/view/Admin401.vue'
import login404 from '@/components/view/login404.vue'
//setiings
import perfilLayaut from '@/components/layaut/profile.vue'
import perfil from '@/components/view/settings/profile.vue'
import settings from '@/components/view/settings/settings.vue'
import usuarios from '@/components/view/settings/usuarios.vue'
import registroUsuario from '@/components/view/settings/registro-usuario.vue'
import sessiones from '@/components/view/settings/sessiones.vue'
import editar_usuario from '@/components/view/settings/editar-usuario.vue'
import editar_contrasena from '@/components/view/settings/editar-contrasena.vue'

import $store from '@/store'
import path from 'path'
export default
{
    path:"/",
    component:admin,
    children:
    [
        //{ path: '/',name:'registro', component: registoEquipo },
        { path: '/',name:'inicio', component: inicio },
        { path: '/equipos',name:'equipos', component: equipos },
        { path: '/clientes',name:'clientes', component: clientes },

      
        //perfill
        {
            path: 'settings',
            component:perfilLayaut,
            children:
            [
                { path: '/', name: 'perfil',component:perfil},
                { path: 'settings', name: 'settings',component:settings},
                { path: 'usuarios', name:'usuarios', component:usuarios},
                { path: 'usuarios/registro', name:'registro-usuario',component:registroUsuario},
                { path: 'usuarios/sessiones', name:'sessiones',component:sessiones},
                { path: 'usuarios/editar', name:'editar-usuario', component:editar_usuario,props:true},
                { path: 'usuarios/contraseña', name:'editar-contrasena', component:editar_contrasena},
                { path: '401', name:'401', component:error401,props:true},
               { path:'*',name:'404',component:login404},
               // { path:'*',name:'Admin404',component:Admin404},

            ]
        },



        //404
        { path:'*',name:'Admin404',component:Admin404},
    ]
}
