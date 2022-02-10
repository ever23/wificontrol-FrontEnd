<template>
<main class="app-content">
    <div class="card">
        <div class="card-header border-transparent">
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Aquiler de wifi</h3>
                            <div class="card-tools">
                                <div class="input-group input-group-sm" style="width: 150px;">
                                    <input type="text" v-model="busqueda" @keyup="buscar" name="table_search" class="form-control float-right" placeholder="Search">
                                    <div class="input-group-append">
                                        <button type="submit" class="btn btn-default">
                                            <i class="fas fa-search"></i>
                                        </button>
                                    </div>
                                </div>
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
                                            <th class="d-none d-md-none d-lg-table-cell">Fecha</th>
                                            <th></th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        <item-equipo :costoHora="costoHora" v-for="(equipo, index) in equipos" :item="equipo" :key="equipo.id_equipo" v-show="(pag - 1) * NUM_RESULTS <= index  && pag * NUM_RESULTS > index"></item-equipo>

                                    </tbody>
                                </table>

                            </div>

                            <!-- /.table-responsive -->
                        </div>
                        <div class="card-footer clearfix">
                            <a href="javascript:void(0)" class="btn btn-sm btn-info float-left">Place New Order</a>
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

<script>
import axios from 'axios';
import {
    fecha
} from '@/assets/js/Date.js'
import itemEquipo from './item-equipo-ls.vue'
export default {
    name: 'equipos',
    components: {
        'item-equipo': itemEquipo
    },
    //props:['id_granjas'],
    data() {
        return {
            NUM_RESULTS: 8, // Numero de resultados por página
            pag: 1,
            equipos: {},
            busqueda: "",
            costoHora: 3
        }
    },
    created() {
        this.$store.commit('loading', true);
        axios.get('/api/equipos').then(data => {
            this.equipos = data.data;
            this.$store.commit('loading', false);
        }).catch(e => {
            AxiosCatch(e)
            this.$store.commit('loading', false);
        })
    },
    computed: {
        settings() {
            return this.$store.getters.settings;
        },
        classNext() {
            return this.pag * this.NUM_RESULTS / this.equipos.length < 1 ? '' : 'disabled'
        },
        classPrevius() {
            return this.pag != 1 ? '' : 'disabled'
        }
    },
    methods: {
        pagePrevius() {
            if (this.pag > 1)
                this.pag -= 1
        },
        pageNext() {
            if (this.pag < this.equipos.length)
                this.pag += 1
        },

        buscar() {

            axios.get('/api/equipos/busqueda?q=' + this.busqueda).then(data => {
                this.equipos = data.data;
            }).catch(AxiosCatch)

        },
        Enviar() {
            /*this.$store.commit('loading',true);

axios.post('/api/huevos/venta',this.huevos)
                .then(request => 
                {
                	 this.$store.commit('loading',false);
                    if(request.data.insert)
                    {
                        //swal("Listo!", "El proyecto se ha almacenado ", "success");
                        swal(
                        {
                            title: "Listo!",
                            text: "se ha agregrado la venta de huevos ",
                            type: "success",

                        },
                        ()=>this.$router.push({name:'resumen-huevos',params:{id_granjas:this.huevos.id_granjas}}));

                    }else
                    {
                        this.errores=request.data.error;
                    }  
                }).catch(AxiosCatch);*/
        }
    }
}
</script>
