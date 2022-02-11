<template>
<!-- /.login-logo -->
<div class="card card-outline card-primary">
    <div class="card-header text-center">
        <a href="." class="h1"><b>Registro</b></a>
    </div>
    <div class="card-body">

        <formulario @submit.prevent="guardar">
            <div class="input-group mb-3">
                <div v-if="newEquipo.cliente!=undefined" @click="newEquipo.cliente=undefined"> {{newEquipo.nombre}}</div><br>
                <autocomplete v-if="newEquipo.cliente==undefined" :initValue="newEquipo.nombre" :url="api" :onShouldGetData="bucarCliente" anchor="nombre" label="writer" :classes="{ wrapper: 'form-wrapper ', input: 'form-control', list: 'data-list', item: 'data-list-item' }" :on-select="getData" :onInput="d=>newEquipo.nombre=d">
                </autocomplete>
            </div>
            <div class="input-group mb-3" v-if="equiposPendientes.length>1">
                <div class="btn-group form-group">
                    <select class="form-control" @change="selectIp">
                        <option> </option>
                        <option v-if="equiposPendientes.lenth==0" selected>Cargando..</option>
                        <option v-for="(item,id) in equiposPendientes" :value="item.mac"> IP {{ item.ip }} {{ item.nombre }}</option>

                    </select>
                    <button class=" btn btn-primary btn-sm float-right" type="button" @click="cargarWifi"><i class="fa fa-redo-alt"></i></button>

                </div>
            </div>
            <div class="input-group mb-3" v-if="equiposPendientes.length==1">

                IP {{ newEquipo.ip }}, Mac {{ newEquipo.mac }} <button class=" btn btn-primary btn-sm float-right" type="button" @click="cargarWifi"><i class="fa fa-redo-alt"></i></button>

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
import {
    meses
} from '@/assets/js/Date.js'
import filter from '@/assets/js/UserVueFilter.js'
import ip from '@/assets/js/ip.js'
import {
    DateTime
} from 'luxon'
import Autocomplete from 'vue2-autocomplete-js';
import registro from '../equipos/registro.vue'
export default {

    mixins: [registro],
    name: 'registro-equipo-login',

    mounted() {
        this.costoHora = this.$store.getters.configuraciones.costo_hora
        this.cargarWifi()
    },
    watch: {
        // cada vez que equipo cambie, esta función será ejecutada
        newEquipo: function (newEquipo, oldEquipo) {

        }
    },
    computed: {

    },
    methods: {

        cargarWifi() {
            this.$store.commit('loading', true)
            this.api = axios.defaults.baseURL + '/api/clientes/busqueda'
            if (this.$store.getters.MAC) {
                this.newEquipo.cliente = this.newEquipo.nombre = this.$store.getters.cliente.nombre
                this.newEquipo.id_cliente = this.$store.getters.cliente.id_cliente

                this.sockets.subscribe('equipos', (data) => {
                    this.wifi = data
                    this.$store.commit('loading', false)
                    this.sockets.unsubscribe('equipos');
                    let dispositivo = this.wifi.find(wifi => this.$store.getters.MAC == wifi.mac);

                    this.newEquipo.ip = dispositivo.ip
                    this.newEquipo.mac = this.$store.getters.MAC

                });

            } else {
                this.$store.commit('loading', true)
                axios.get('/api/equipos/activos').then(data => {
                    this.equipos = data.data;
                    this.equiposPendientes = []
                    this.sockets.subscribe('equipos', (data) => {
                        this.wifi = data
                        this.$store.commit('loading', false)
                        this.sockets.unsubscribe('equipos');
                        for (let wifi of this.wifi.filter(w => !w.bloqueado)) {

                            let activo = this.equipos.find(equipo => equipo.mac == wifi.mac);

                            if (activo == undefined) {

                                this.equiposPendientes.push(wifi)
                            }
                        }
                        if (this.equiposPendientes.length == 1) {
                            this.newEquipo.ip = this.equiposPendientes[0].ip
                            this.newEquipo.mac = this.equiposPendientes[0].mac
                        }
                    });
                }).catch(e => {
                    AxiosCatch(e)
                    this.$store.commit('loading', false)
                })

            }
        },

        selectIp(e) {

            let equipo = this.equiposPendientes.find(eq => eq.mac == e.target.value)
            this.newEquipo.ip = equipo.ip
            this.newEquipo.mac = e.target.value
        }
    }
}
</script>

<style>
.transition,
.autocomplete,
.showAll-transition,
.autocomplete ul,
.autocomplete ul li a {
    transition: all 0.3s ease-out;
    -moz-transition: all 0.3s ease-out;
    -webkit-transition: all 0.3s ease-out;
    -o-transition: all 0.3s ease-out;
}

.autocomplete ul {
    font-family: sans-serif;
    position: absolute;
    list-style: none;
    background: #454d55;
    padding: 10px 0;
    margin: 0;
    display: inline-block;
    min-width: 15%;
    margin-top: 10px;
    z-index: 100;
}

.autocomplete ul:before {
    content: "";
    display: block;
    position: absolute;
    height: 0;
    width: 0;
    border: 10px solid transparent;
    border-bottom: 10px solid #f8f8f8;
    left: 46%;
    top: -20px
}

.autocomplete ul li a {
    text-decoration: none;
    display: block;
    background: #454d55;
    color: #2b2b2b;
    padding: 5px;
    padding-left: 10px;
}

.autocomplete ul li a:hover,
.autocomplete ul li.focus-list a {
    color: white;
    background: #343a40;
}

.autocomplete ul li a span {
    display: block;
    margin-top: 3px;
    color: grey;
    font-size: 13px;
}

.autocomplete ul li a:hover span,
.autocomplete ul li.focus-list a span {
    color: white;
}

.showAll-transition {
    opacity: 1;
    height: 50px;
    overflow: hidden;
}

.showAll-enter {
    opacity: 0.3;
    height: 0;
}

.showAll-leave {
    display: none;
}

.form-wrapper {
    width: 100%;
}
</style>
