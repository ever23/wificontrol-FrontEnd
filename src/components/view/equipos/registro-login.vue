<template>
<!-- /.login-logo -->
<div class="card card-outline card-primary">
    <div class="card-header text-center">
        <a href="." class="h1"><b>Registro</b></a>
    </div>
    <div class="card-body">

        <formulario @submit.prevent="guardar">
            <div class="input-group mb-3">
            <div v-if="newEquipo.cliente!=undefined" @click="newEquipo.cliente=undefined"> {{newEquipo.nombre}}</div>
                <autocomplete   v-if="newEquipo.cliente==undefined" :initValue="newEquipo.nombre" :url="api" :onShouldGetData="bucarCliente" anchor="nombre" label="writer" :classes="{ wrapper: 'form-wrapper ', input: 'form-control', list: 'data-list', item: 'data-list-item' }" :on-select="getData" :onInput="d=>newEquipo.nombre=d">
                </autocomplete>
                <select class="form-control" @change="selectIp" v-if="equiposPendientes.length>1">
                    <option> </option>
                    <option v-if="equiposPendientes.lenth==0" selected>Cargando..</option>
                    <option v-for="(item,id) in equiposPendientes" :value="id" > IP {{ item.ip }} {{ item.nombre }}</option>

                </select>
               

            </div>
            <div class="input-group mb-3">
                 IP {{ newEquipo.ip }}, Mac {{ newEquipo.mac }}
            </div>
            <div class="input-group mb-3">
                <div class="form-group form-control" v-if="! newEquipo.libre">
                    <input type="range" class="custom-range" v-model="newEquipo.rangoTiempo" step="0.5" max="5">
                </div>

            </div>
            <div class="input-group mb-3 row">

                <div class="form-group  col-md-4">
                    <div class="custom-control custom-switch custom-switch-off-danger custom-switch-on-success">
                        <input type="checkbox" class="custom-control-input" id="customSwitch3" v-model=" newEquipo.libre">
                        <label class="custom-control-label" for="customSwitch3"></label>
                    </div>

                </div>

                <div v-if="!newEquipo.libre" class="  col-md-4"> {{ computedTiempo }}</div>

                <div class=" col-md-4"> {{ newEquipo.costo }} Bs</div>

            </div>

            <div class="input-group mb-3">
                <select class="form-control" v-model="newEquipo.tPago">
                    <option>Pagomovil</option>
                    <option>Efectivo</option>
                </select>

            </div>
            <div class="input-group mb-3">
                <input type="text" class="form-control" v-model="newEquipo.referencia">

            </div>
            <div class="input-group mb-3">
                Apertura: {{ newEquipo.apertura }}<br>
                Clierre: {{ newEquipo.cierre }}

            </div>
            <div class="row">

                <!-- /.col -->
                <div class="col-4">
                    <button type="submit" class="btn btn-primary btn-block">Guardar</button>
                </div>
                <!-- /.col -->
            </div>
        </formulario>

    </div>
    <!-- /.card-body -->
</div>
<!-- /.card -->
</template>

<script>
import axios from 'axios'
import registro from './registro-tr.vue'
export default {

    name: 'registro-equipo-login',
    mixins: [registro],
    data(){
        return {
            cliente:undefined
        }
    },
   
    mounted() {
        

        this.api = axios.defaults.baseURL + '/api/clientes/busqueda'
        if ( this.$store.getters.MAC != "" &&  this.$store.getters.MAC != undefined) {
           this.newEquipo.cliente = this.newEquipo.nombre = this.$store.getters.cliente.nombre
            this.newEquipo.id_cliente = this.$store.getters.cliente.id_cliente
            this.sockets.subscribe('equipos', (data) => {
                let dispositivo = data.find(wifi => this.$store.getters.MAC == wifi.mac);
                this.newEquipo.ip = dispositivo.ip
                 this.newEquipo.mac =  this.$store.getters.MAC
            });
        } else {
            this.$store.commit('loading', true)
            axios.get('/api/equipos/activos').then(data => {
                this.equipos = data.data;
                axios.get('/api/mercusys/').then(data => {
                    this.wifi = data.data;
                    for (let wifi of this.wifi.filter(w=>!w.bloqueado)) {

                        let activo = this.equipos.find(equipo => equipo.mac == wifi.mac);

                        if (activo == undefined) {

                            this.equiposPendientes.push(wifi)
                        }
                    }
                    if(this.equiposPendientes.length==1){
                        this.newEquipo.ip = this.equiposPendientes[0].ip
                        this.newEquipo.mac = this.equiposPendientes[0].mac
                    }
                    this.$store.commit('loading', false)
                }).catch(e => {
                    AxiosCatch(e)
                    this.$store.commit('loading', false)
                })

            }).catch(e => {
                AxiosCatch(e)
                this.$store.commit('loading', false)
            })

        }

        //this.$('.select2').select2()
    },
    watch: {
        // cada vez que equipo cambie, esta función será ejecutada
        newEquipo: function (newEquipo, oldEquipo) {

        }
    },methods:{
         selectIp(e) {
            let id = e.target.value
            this.newEquipo.ip = this.equiposPendientes[id].ip
            this.newEquipo.mac = this.equiposPendientes[id].mac
        }
    }

}
</script>
