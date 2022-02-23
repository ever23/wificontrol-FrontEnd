<template>
<div class="card card-outline card-primary">
    <div class="card-header text-center">
        <a href="." class="h1"><b>Registro</b></a>
    </div>
    <div class="card-body">

        <formulario @submit.prevent="guardar">

            <div class="input-group mb-3">

                <select class="form-control" @change="selectIp">
                    <option value=""> </option>
                    <option v-if="equiposPendientes.lenth==0" selected>Cargando..</option>
                    <option v-for="(item,id) in equiposPendientes" :value="item.mac"> IP {{ item.ip }} {{ item.nombre }}</option>
                </select>
                <!-- <button class="input btn btn-primary btn-sm float-right" type="button" @click="cargarWifi"><i class="fa fa-redo-alt"></i></button>
-->
            </div>
            <div class="input-group mb-3">
                <button v-if="!formActivecliente" class="btn  btn-primary" @click.prevent="formActivecliente=true;newEquipo.id_cliente=null"> {{newEquipo.nombre}}</button>

                <autocomplete v-if="formActivecliente" :initValue="newEquipo.nombre" :url="api" :onShouldGetData="bucarCliente" anchor="nombre" label="writer" :classes="{ wrapper: 'form-wrapper ', input: 'form-control', list: 'data-list', item: 'data-list-item' }" :on-select="getData" :onInput="d=>newEquipo.nombre=d">
                </autocomplete>
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
</template>

<script>
import axios from 'axios'
import registro from './registro.vue'
export default {

    name: 'registro-movil',
    mixins: [registro, ],
    props: {},
    data() {
        return {
            formActivecliente: true,
            equiposPendientes: []
        }
    },
    created() {
        this.costoHora = this.$store.getters.configuraciones.costo_hora

        this.api = axios.defaults.baseURL + '/api/clientes/busqueda'
        this.cargarWifi()

        //this.$('.select2').select2()
    },
    watch: {
        // cada vez que equipo cambie, esta función será ejecutada
        item: function (newitem, olditem) {

            console.log(newitem)
            this.wifi = newitem
        }
    },
    methods: {
        actualizar(data) {
            this.$router.push({
                name: 'inicio'
            })

        },
        cargarWifi() {
            axios.get('/api/equipos/activos').then(data => {
                this.equipos = data.data;

                this.sockets.subscribe('equipos', (wifi) => {
                    this.wifi = wifi.filter(w => w.type == "invitado" && w.online)
                    this.equiposPendientes = []
                    for (let wifi of this.wifi) {

                        let activo = this.equipos.find(equipo => equipo.mac == wifi.mac);

                        if (activo == undefined) {

                            this.equiposPendientes.push(wifi)
                        }
                    }

                });
            }).catch(e => {
                AxiosCatch(e)
            })
        },
        selectIp(e) {

            let equipo = this.equiposPendientes.find(eq => eq.mac == e.target.value)
            this.newEquipo.ip = equipo.ip
            this.newEquipo.mac = e.target.value
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

        },
    }

}
</script>
