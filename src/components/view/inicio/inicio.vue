<template>
<main class="app-content">
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0"> <i :class="['fa','fa-line-chart']"></i> Control Wifi</h1>
                </div><!-- /.col -->
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="#">Home</a></li>

                    </ol>
                </div><!-- /.col -->
            </div><!-- /.row -->
        </div><!-- /.container-fluid -->
    </div>

    <div class="row">
        <div class="col-lg-3 col-6">
            <!-- small box -->
            <div class="small-box bg-info">
                <div class="inner">
                    <h3>{{ estadisticas.gananciaDia}} Bs</h3>

                    <p>Ganancias al dia</p>
                </div>
                <div class="icon">
                    <i class="ion ion-bag"></i>
                </div>
            </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-6">
            <!-- small box -->
            <div class="small-box bg-success">
                <div class="inner">
                    <h3>{{estadisticas.gananciaMes}} Bs</h3>

                    <p>Ganancias en el mes</p>
                </div>
                <div class="icon">
                    <i class="ion ion-stats-bars"></i>
                </div>
            </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-6">
            <!-- small box -->
            <div class="small-box bg-warning">
                <div class="inner">
                    <h3>{{estadisticas.clientes}}</h3>

                    <p>Clientes</p>
                </div>
                <div class="icon">
                    <i class="ion ion-person-add"></i>
                </div>
            </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-6">
            <!-- small box -->
            <div class="small-box bg-danger">
                <div class="inner">
                    <h3>{{estadisticas.activos}}</h3>

                    <p>Equipos Activos</p>
                </div>
                <div class="icon">
                    <i class="ion ion-pie-graph"></i>
                </div>
            </div>
        </div>
        <!-- ./col -->
    </div>

    </div>
    <div class="card">
        <div class="card-header border-transparent">
            <h3 class="card-title">Equipos Conectados </h3><br>
            <span class="badge badge-danger" v-if="activosPendientes.length!=0"><i class="fa fa-lock-open"></i>Pendientes {{activosPendientes.length}}</span>
            <span class="badge badge-warning" v-if="bloqueadosPendientes.length!=0"><i class="fa fa-lock"></i>Pendientes {{bloqueadosPendientes.length}}</span>
            <span class="badge badge-success trafic"><i class="fa fa-arrow-up"></i>{{ subida }}</span>
            <span class="badge badge-success trafic"> <i class="fa fa-arrow-down"></i>{{ bajada }}</span>

            <div class="card-tools" v-if="activosPendientes.length!=0 || bloqueadosPendientes.length!=0">

                <button type="button" class="btn btn-primary d-none d-md-none d-lg-table-cell" @click="activarFormulario">
                    Agregar
                    <i class="fas fa-plus" v-if="!formActive"></i>
                    <i class="fas fa-chevron-up" v-if="formActive"></i>
                </button>
                <router-link class="btn btn-primary d-block d-md-block d-lg-none" :to="{name:'registro'}">
                    <i class="fas fa-plus"></i>
                </router-link>

            </div>
        </div>
        <!-- /.card-header -->
        <div class="card-body p-0">
            <div class="table-responsive">
                <table class="table m-0">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>tiempo</th>
                            <th>Costo</th>
                            <th class="d-none d-md-none d-lg-table-cell">Tipo de pago</th>
                            <th class="d-none d-md-none d-lg-table-cell">Referencia</th>
                            <th class="d-none d-md-none d-lg-table-cell">Apertura</th>
                            <th class="d-none d-md-none d-lg-table-cell">Cierre</th>
                            <th class="d-none d-md-none d-lg-table-cell">Actividad</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>

                        <registro-pendiente-tr v-if="formActive" @registro="registroEquipoPendiente" v-for="item in equiposPendientes" :item="item" :key="item.mac"></registro-pendiente-tr>

                        <item-equipo @update="actualizar" :costoHora="costoHora" v-for="equipo in getEquipos" :item="equipo" :key="equipo.id_equipo"></item-equipo>

                    </tbody>
                </table>
            </div>
            <!-- /.table-responsive -->
        </div>
        <!-- /.card-body -->
        <div class="card-footer clearfix">
            <a href="javascript:void(0)" class="btn btn-sm btn-info float-left">Place New Order</a>
            <a href="javascript:void(0)" class="btn btn-sm btn-secondary float-right">View All Orders</a>
        </div>
        <!-- /.card-footer -->
    </div>
    <div class="row justify-content-center">
        <div class="col-lg-2 col-6">
            <!-- small box -->
            <div class="small-box bg-info">
                <div class="inner">
                    <h3>{{ estadisticas.efectivo}} Bs</h3>

                    <p>Efectivo</p>
                </div>
                <div class="icon">
                    <i class="ion ion-bag"></i>
                </div>
            </div>
        </div>
        <!-- ./col -->

        <div class="col-lg-2 col-6">
            <!-- small box -->
            <div class="small-box bg-success">
                <div class="inner">
                    <h3>{{estadisticas.pagomovil}} Bs</h3>

                    <p>Pagomovil</p>
                </div>
                <div class="icon">
                    <i class="ion ion-stats-bars"></i>
                </div>
            </div>
        </div>

        <!-- ./col -->
        <div class="col-lg-2 col-6">
            <!-- small box -->
            <div class="small-box bg-danger">
                <div class="inner">
                    <h3>{{estadisticas.deudas}} Bs</h3>

                    <p>Pagos Pendientes</p>
                </div>
                <div class="icon">
                    <i class="ion ion-pie-graph"></i>
                </div>
            </div>
        </div>
        <!-- ./col -->
    </div>

</main>
</template>

<script>
import axios from 'axios'
import {
    meses
} from '@/assets/js/Date.js'
import filter from '@/assets/js/UserVueFilter.js'
import {
    DateTime
} from 'luxon'
import Autocomplete from 'vue2-autocomplete-js';
import itemEquipo from '../equipos/item-equipo.vue'
import registroPendiente from '../equipos/registro-pendiente-tr.vue'
import wifiEquipos from '../red/equipos.vue'
import calcularTraferencia from '@/assets/js/calcularTrasferencia.js'
export default {
    filters: filter,
    components: {
        itemEquipo,
        'registro-pendiente-tr': registroPendiente,
        wifiEquipos
    },
    name: 'inicio',
    data() {
        return {
            costoHora: 3,
            equipos: [],
            time: 0,
            formActive: false,
            estadisticas: {},
            wifi: [],
            equiposPendientes: [],
            activosPendientes: [],
            bloqueadosPendientes: []
        }
    },
    created() {
        this.sockets.subscribe('equipos', (data) => {
            this.wifi = data.filter(w => w.type == "invitado" && w.online)
            this.activosPendientes = []
            this.bloqueadosPendientes = []
            this.equiposPendientes = []
            let equiposActivos = this.equipos.filter(equipo => equipo.activo)
            for (let wifi of this.wifi) {
                let activo = equiposActivos.find(equipo => equipo.mac == wifi.mac);
                if (activo == undefined) {
                    if (!wifi.bloqueado) {
                        this.activosPendientes.push(wifi)
                    } else {
                        this.bloqueadosPendientes.push(wifi)
                    }
                    this.equiposPendientes.push(wifi)

                }
            }
        });
        this.sockets.subscribe('/equipo/registro', (data) => {
            console.log(data)
            this.equipos.unshift(data)
            this.actualizar()

        });

    },
    destroyed() {
        this.sockets.unsubscribe("/equipo/registro");
        this.sockets.unsubscribe('equipos');
       
      
    },
    mounted() {
        this.actualizar()
        //this.$store.commit('loading', true);

        //this.$('.select2').select2()
    },
    computed: {
        subida() {
            let subida = 0;
            for (let w of this.wifi) {
                subida = Number(subida) + Number(w.up)
            }
            return calcularTraferencia(subida)
        },
        bajada() {
            let bajada = 0;
            for (let w of this.wifi) {
                bajada = Number(bajada) + Number(w.down)
            }
            return calcularTraferencia(bajada)
        },

        getEquipos() {
            return this.equipos;
        },

        settings() {
            return this.$store.getters.settings;
        }
    },
    methods: {
        registroEquipo(equipo) {
            this.formActive = false

        },
        registroEquipoPendiente(equipo) {

            this.equiposPendientes = this.equiposPendientes.filter(item => item.mac != equipo.mac)

            this.formActive = false
        },
        actualizar() {
            this.cargarLista()

        },
        activarFormulario() {

            if (!this.formActive) {

                this.formActive = !this.formActive;

            } else {
                this.formActive = !this.formActive;
            }

        },
        cargarLista() {

            axios.get('/api/equipos/hoy').then(data => {
                if (data.error) {
                    return AxiosCatch(data.error)
                }
                this.equipos = data.data;

            }).catch(e => {
                AxiosCatch(e)

            })
            axios.get('/api/equipos/estadisticas').then(d => {
                if (d.error) {
                    return AxiosCatch(data.error)
                }
                this.estadisticas = d.data

            }).catch(AxiosCatch)

        }

    }
}
</script>
