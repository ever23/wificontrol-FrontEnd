import axios from 'axios'
export default
{
	state:{
        nombre:'',
		usoGalpon:0,
		moneda:'',
		muertes:0,
		umalimentos:'',
		produccion:0,
        imagen:null
        
    },
    getters:
    {
        settings(state)
        {
            return {
                nombre:state.nombre,
                usoGalpon:state.usoGalpon,
                moneda:state.moneda,
                muertes:state.muertes,
                umalimentos:state.umalimentos,
                produccion:state.produccion,
                imagen:state.imagen
            }
        },
       
    },
    mutations:
    {
        update(state,settings)
        {
            state.nombre=settings.nombre;
            state.usoGalpon=settings.usoGalpon;
            state.moneda=settings.moneda;
            state.muertes=settings.muertes;
            state.umalimentos=settings.umalimentos;
            state.produccion=settings.produccion;
            state.imagen=settings.imagen
           // state.id_granjas=Session.id_granjas;
        },
        
    },
    actions:
    {
        
        fetch(context,data)
        { 
             //context.commit('loading',true);
             return axios.get('/api/settings/settings')
                        .then(req => 
                        {
                        	context.commit("update", req.data.settings); 
                            return req.data;
                           // console.log( request.data,typeof request.data);
                        });
        },
        
       
    }
}