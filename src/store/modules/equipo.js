import axios from 'axios'

function getLocalStorageEquipo() {
    let json = localStorage.getItem('equipo')
    let equipo={
        id_equipo: null,
        id_cliente: null,
        nombre: null,
        tiempo: null,
        costo: null,
        tPago: null,
        referencia: null,
        apertura:null,
        cierre: null,
        activo: null
    }
    let result= null
    try {
        result =  JSON.parse(json)
    } catch (e) {
        
    }
    if(result==null){
        return equipo
    }else{
        return result
    }
  
}
function setLocalStorageEquipo(equipo) {
    localStorage.setItem('equipo', JSON.stringify(equipo))
}
var localEquipo = getLocalStorageEquipo()
export default
    {
        state: {
            id_equipo: localEquipo.id_equipo,
            id_cliente: localEquipo.id_cliente,
            nombre: localEquipo.nombre,
            tiempo: localEquipo.tiempo,
            costo: localEquipo.costo,
            tPago: localEquipo.tPago,
            referencia: localEquipo.referencia,
            apertura: localEquipo.apertura,
            cierre: localEquipo.cierre,
            activo: localEquipo.activo,
            ip: localEquipo.ip,
            mac: localEquipo.mac
        },
        getters:
        {
            equipo(state) {
                return {
                    id_equipo: state.id_equipo,
                    id_cliente: state.id_cliente,
                    nombre: state.nombre,
                    tiempo: state.tiempo,
                    costo: state.costo,
                    tPago: state.tPago,
                    referencia: state.referencia,
                    apertura: state.apertura,
                    cierre: state.cierre,
                    activo: state.activo,
                    ip: state.ip,
                    mac: state.mac
                }
            },
            cliente(state) {
                return {
                    id_cliente: state.id_cliente,
                    nombre: state.nombre
                }
            },
            isActivo(state) {
                return state.activo
            },
            MAC(state){
                return state.mac
            }

        },
        mutations:
        {
            fijarEquipo(state, equipo) {

                if (equipo.activo) {
                    state.id_equipo = equipo.id_equipo
                    state.id_cliente = equipo.id_cliente
                    state.nombre = equipo.nombre
                    state.tiempo = equipo.tiempo
                    state.costo = equipo.costo
                    state.tPago = equipo.tPago
                    state.referencia = equipo.referencia
                    state.apertura = equipo.apertura
                    state.cierre = equipo.cierre
                    state.activo = equipo.activo
                    state.ip = equipo.ip
                    state.mac = equipo.mac
                } else {
                    state.id_equipo = null
                    state.id_cliente = equipo.id_cliente
                    state.nombre = equipo.nombre
                    state.tiempo = null
                    state.costo = null
                    state.tPago = null
                    state.referencia = null
                    state.apertura = null
                    state.cierre = null
                    state.activo = null
                    state.ip = null
                }
                setLocalStorageEquipo(state)

                // state.id_granjas=Session.id_granjas;
            },
            fijarCliente(state, settings) {
                state.id_cliente = settings.id_cliente
                state.nombre = settings.nombre
            }
        },
        actions:
        {
            verificarEquipo(context) {

                if (context.state.id_equipo) {

                    context.dispatch('actualizarEquipo')

                } else if (context.state.id_cliente) {

                    context.dispatch('equipoCliente')

                }
            },
            fijarEquipo(context, equipo) {

                context.commit("fijarEquipo", equipo);
            },
            actualizarEquipo(context) {
                let id_equipo = context.state.id_equipo
                axios.get('/api/equipos/equipo?id_equipo=' + id_equipo).then(d => {
                    
                    context.commit("fijarEquipo", d.data);
                    
                }).catch(AxiosCatch)
            },
            equipoCliente(context) {
                axios.get('/api/equipos/mac-activa?mac=' + context.state.mac).then(d => {

                    if (!d.data.error) {

                        context.commit("fijarEquipo", d.data);

                    }
                }).catch(AxiosCatch)
            }


        }
    }