import axios from 'axios'
export default
    {
        state: {
            costo_hora: '',
            modo_oscuro: false,
            url_router: "",
            pass_router: ""

        },
        getters:
        {
            configuraciones(state) {
                return {
                    costo_hora: state.costo_hora,
                    modo_oscuro: state.modo_oscuro,
                    url_router: state.url_router,
                    pass_router: state.pass_router,

                }
            },

        },
        mutations:
        {
            update(state, settings) {
                state.modo_oscuro = settings.modo_oscuro;
                state.costo_hora = settings.costo_hora;
                state.url_router = settings.url_router;
                state.pass_router = settings.pass_router;

                // state.id_granjas=Session.id_granjas;
            },
            alternar_modo(state,modo) {
                state.modo_oscuro = modo

                // state.id_granjas=Session.id_granjas;
            },

        },
        actions:
        {

            fetchConfiguraciones(context, data) {
                //context.commit('loading',true);
                return axios.get('/api/configuraciones/')
                    .then(req => {
                        context.commit("update", req.data);
                        return req.data;
                        // console.log( request.data,typeof request.data);
                    });
            },
            cambiar_modo(context) {
                if (context.state.modo_oscuro) {
                    return axios.put('/api/configuraciones/modo-normal')
                        .then(req => {
                            if(req.data.ok){
                                context.commit("alternar_modo",false);
                            }
                            // console.log( request.data,typeof request.data);
                        });
                } else {
                    return axios.put('/api/configuraciones/modo-oscuro')
                    .then(req => {
                        if(req.data.ok){
                            context.commit("alternar_modo",true);
                        }
                        // console.log( request.data,typeof request.data);
                    });
                }

            },


        }
    }