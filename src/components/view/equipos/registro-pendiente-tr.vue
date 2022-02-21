<template>
<tr>
    <td>
        <div>
            <span :alt="wifi.mac"> IP {{ wifi.ip }}</span>
        </div>
        <button v-if="!formActivecliente" class="btn  btn-primary" @click="formActivecliente=true;newEquipo.id_cliente=null"> {{newEquipo.nombre}}</button>

        <autocomplete v-if="formActivecliente" :initValue="wifi.nombre" :url="api" :onShouldGetData="bucarCliente" anchor="nombre" label="writer" :classes="{ wrapper: 'form-wrapper', input: 'form-control', list: 'data-list', item: 'data-list-item' }" :on-select="getData" :onInput="d=>newEquipo.nombre=d">
        </autocomplete>

    </td>
    <td>
        <div>
            <div v-if="!newEquipo.libre" class="float-left"> {{ computedTiempo }}</div>
            <div class="form-group float-right">
                <div class="custom-control custom-switch custom-switch-off-danger custom-switch-on-success">
                    <input type="checkbox" class="custom-control-input" v-model=" newEquipo.libre" :id="'customSwitch'+wifi.mac">
                    <label class="custom-control-label" :for="'customSwitch'+wifi.mac"></label>
                </div>

            </div>
        </div>
        <div class="form-group" v-if="! newEquipo.libre">
            <input type="range" class="custom-range" v-model="newEquipo.rangoTiempo" step="0.5" max="5">
        </div>
    </td>
    <td>{{ newEquipo.costo }}</td>
    <td>
        <select class="form-control" v-model="newEquipo.tPago">
            <option>Pagomovil</option>
            <option>Efectivo</option>
        </select>
    </td>
    <td><input type="text" class="form-control" v-model="newEquipo.referencia"></td>
    <td class="d-none d-md-none d-lg-table-cell"> {{ newEquipo.apertura }} </td>
    <td class="d-none d-md-none d-lg-table-cell"> {{ newEquipo.cierre }}</td>
    <th class="d-none d-md-none d-lg-table-cell">
        <div v-if="!wifi.bloqueado">
            <i class="fa fa-arrow-up"></i>{{ subida }} <i class="fa fa-arrow-down"></i>{{ bajada }}
        </div>
    </th>
    <td>

        <div class="btn-group">
            <button class="btn btn-sm btn-primary" @click="guardar">Activar</button>
            <button class="btn btn-primary btn-sm" type="button" v-if="wifi.bloqueado" @click="desbloquear"><i class="fa fa-lock"></i></button>
            <button class="btn btn-primary btn-sm" type="button" v-if="!wifi.bloqueado" @click="bloquear"><i class="fa fa-lock-open"></i></button>
        </div>
    </td>
</tr>
</template>

<script>
import axios from 'axios'
import registro from './registro.vue'
import itemWifi from '../red/item.vue'
export default {

    name: 'registro-pendiente-tr',
    mixins: [registro, itemWifi],
    props: {
        item: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            formActivecliente: true
        }
    },
    created() {
        this.costoHora = this.$store.getters.configuraciones.costo_hora

        this.api = axios.defaults.baseURL + '/api/clientes/busqueda'
        this.wifi = this.item
        this.newEquipo.ip = this.wifi.ip
        this.newEquipo.mac = this.wifi.mac
        this.sockets.subscribe('equipo/wifi/' + this.wifi.mac, (data) => {
                this.wifi = data

        })
        axios.get('/api/equipos/mac?mac=' + this.newEquipo.mac).then(result => {
            if (result.data.nombre !== null) {

                this.newEquipo.nombre = result.data.nombre
                this.newEquipo.id_cliente = result.data.id_cliente
                this.formActivecliente = false
            } else {
                this.newEquipo.nombre = this.wifi.nombre
                this.formActivecliente = true
            }

        }).catch(AxiosCatch)

        //this.$('.select2').select2()
    },
      computed: {
        subida(){
            
            return this.calcularDatos(this.wifi.up)
        },
        bajada(){
            return this.calcularDatos(this.wifi.down)
        }

    },
    watch: {
        // cada vez que equipo cambie, esta función será ejecutada
        item: function (newitem, olditem) {

            this.wifi = newitem
        }
    },
    methods: {
        /* bloquear() {
             Swal.fire({
                 title: 'Seguro que desea bloquear el equipo? ',
                 showDenyButton: true,
                 confirmButtonText: 'si'
             }).then((result) => {
                 if (result.isConfirmed) {
                     axios.post('/api/mercusys/bloquear', {
                         ip: this.newEquipo.ip
                     }).then(d => {
                         if (d.data.ok) {
                             Swal.fire('bloqueado!', '', 'success')
                             this.wifi.bloqueado=true
                         } else {
                             Swal.fire('no se bloqueo!', '', 'danger')
                         }

                     }).catch(AxiosCatch)

                 }
             })

         }*/
    }

}
</script>
