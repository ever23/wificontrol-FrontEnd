<template>
<main class="app-content">
    <div class="card">
        <div class="card-header border-transparent">
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Reporte mensual</h3>
                            <div class="card-tools">

                                <div class="input-group">
                                    <datepicker :language="es" @selected="datapicker" v-model="date" minimum-view="month" input-class="form-control" format="MM/yyyy"></datepicker>
                                    <input type="text" v-model="busqueda" @keyup="buscar" name="table_search" class="form-control" placeholder="Search">
                                    <div class="input-group-append">
                                        <button type="submit" @click="buscar" class="btn btn-default">
                                            <i class="fas fa-search"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- /.card-header -->
                        <div class="card-body p-0">
                            <div class="row">
                                <div class="col-lg-3 col-6">
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
                                <div class="col-lg-3 col-6">
                                    <!-- small box -->
                                    <div class="small-box bg-success">
                                        <div class="inner">
                                            <h3>{{estadisticas.gananciames}} Bs</h3>

                                            <p>Ganancias en el mes</p>
                                        </div>
                                        <div class="icon">
                                            <i class="ion ion-stats-bars"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-6">
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

                                <div class="col-lg-3 col-6">
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
                            </div>

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
                                            <th class="d-none d-md-none d-lg-table-cell">Fecha</th>
                                            <th></th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        <item-equipo @update="cargarDatos" :costoHora="costoHora" v-for="(equipo, index) in equipos" :item="equipo" :key="equipo.id_equipo" v-show="isShow(index)">
                                        </item-equipo>

                                    </tbody>
                                </table>

                            </div>

                            <!-- /.table-responsive -->
                        </div>
                        <div class="card-footer clearfix">

                            <div class="dataTables_paginate paging_simple_numbers float-right" id="example2_paginate">
                                <ul class="pagination">
                                    <li :class="'paginate_button page-item previous '+classPrevius" id="example2_previous"><a href="#" class="page-link" @click.prevent="pagePrevius">Atras</a></li>

                                    <li :class="'paginate_button page-item next '+classNext" id="example2_next">
                                        <a href="#" class="page-link" @click.prevent="pageNext">SIgiente</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <!-- /.card-body -->
                    </div>
                    <!-- /.card -->
                </div>
            </div>
        </div>
    </div>
</main>
</template>

<style>
.dark-mode .vdp-datepicker__calendar {
    background-color: #3f474e;
}
</style>

<script>
import axios from 'axios';
import {
    fecha
} from '@/assets/js/Date.js'
import itemEquipo from '../equipos/item-equipo-ls.vue'
import pagingTable from '../../reusables/paging-table.js'
import Datepicker from 'vuejs-datepicker';
import {
    es
} from 'vuejs-datepicker/dist/locale'
import {
    DateTime
} from 'luxon'
export default {
    name: 'resporte-mensual',
    mixins: [pagingTable],
    components: {
        'item-equipo': itemEquipo,
        Datepicker
    },
    //props:['id_granjas'],
    data() {
        return {
            equipos: {},
            busqueda: "",
            costoHora: 3,
            estadisticas: {},
            mes: DateTime.now().toFormat('LL/yyyy'),
            date: new Date(),
            es: es
        }
    },
    created() {
        this.cargarDatos()
    },
    computed: {
        settings() {
            return this.$store.getters.settings;
        }

    },
    methods: {
        cargarDatos() {
            this.$store.commit('loading', true);
            axios.get('/api/equipos/reporte-mensual?mes=' + this.mes).then(result => {
                if (!result.data.ok) {
                    return AxiosCatch(result.data.error)
                }

                this.equipos = result.data.equipos;
                this.estadisticas = result.data.estadisticas;
                this.$store.commit('loading', false);
            }).catch(e => {
                AxiosCatch(e)
                this.$store.commit('loading', false);
            })
        },
        datapicker(time) {
            this.mes = DateTime.fromJSDate(time).toFormat('LL/yyyy')
            this.cargarDatos()
        },
        lengthTable() {
            return this.equipos.length
        },

        buscar() {

            axios.get('/api/equipos/busqueda?q=' + this.busqueda + '&mes=' + this.mes).then(data => {
                this.equipos = data.data;
            }).catch(AxiosCatch)

        }

    }
}
</script>
