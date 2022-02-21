import $router from '@/router'
import axios from 'axios'

export default
{

    state:{
        token:null,
        id_user:'',
        user:'',
        nombre:'',
        root:false

    },
    getters:
    {
        User(state)
        {
            return {
                id_user:state.id_user,
                user:state.user,
                nombre:state.nombre,
                root:state.root
            }
        },
        SessionId(state)
        {
            return state.token;
        },
        IsUser(state)
        {
            return state.id_user!==null;
        },
        IsRoot(state)
        {
            return state.root
        }
    },
    mutations:
    {
        Login(state,Session)
        {
            state.token=Session.token;
            state.id_user=Session.id_user;
            state.user=Session.user;
            state.nombre=Session.nombre;
            state.root=Session.root;
          
        },
        Logout(state)
        {
            state.token=null;
            state.id_user=null;
            state.user=null;
            state.nombre=null;
            state.root=null;
        
        }
    },
    actions:
    {

        LogIn(context,data)
        {
             context.commit('loading',true);
             return axios.post('/api/user',data)
                        .then(request =>
                        {
                             context.commit('loading',false);
                            if(request.data.login)
                            {
                                context.commit("Login", request.data.data);
                               // login(request.data.data.token);
                                //$router.push('admin');
                            }else
                            {
                                context.commit("Logout");
                            }
                            return request.data;
                           // console.log( request.data,typeof request.data);
                        });
        },
        LogOut(context)
        {
             context.commit('loading',true);
             return axios.get('/api/user/logout')
                        .then(request =>
                        {
                             context.commit('loading',false);
                            context.commit("Logout");
                            return request.data;
                           // console.log( request.data,typeof request.data);
                        });
        },
        user(context)
        {
             context.commit('loading',true);
            return axios.get('/api/user/islogin') 
                        .then(request =>
                        {
                             context.commit('loading',false);
                            if(request.data.login)
                            {
                               // console.log(request.data.data)
                                context.commit("Login", request.data.data);
                                //$router.push('login-form');
                            }else
                            {
                                context.commit("Logout");
                                //swal("Failed", request.data.error, "error")
                            }
                            return request.data;
                           // console.log( request.data,typeof request.data);
                        });
        }


    }
}
