<template>
<main class="app-content">
    <div class="card">
        <div class="card-header border-transparent">
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Clientes</h3>
                            <div class="card-tools">
                                <div class="input-group input-group-sm" style="width: 150px;">
                                    <input v-model="busqueda" @keyup="buscar" type="text" name="table_search" class="form-control float-right" placeholder="Search">

                                    <div class="input-group-append">
                                        <button type="submit" class="btn btn-default">
                                            <i class="fas fa-search"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- /.card-header -->
                        <div class="card-body table-responsive p-0">
                            <table class="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Nombre</th>
                                        <th>Activos</th>
                                        <th>conecciones</th>
                                        <th>deuda</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <item-cliente  v-for="(cliente, index) in clientes" :item="cliente" :key="cliente.id_cliente" v-show="(pag - 1) * NUM_RESULTS <= index  && pag * NUM_RESULTS > index"></item-cliente>

                            </table>
                        </div>

                        <!-- /.card-body -->
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
import itemCliente from './item-cliente.vue'
import {
    fecha
} from '@/assets/js/Date.js'

export default {
    name: 'clientes',
    components: {
        'item-cliente': itemCliente
    },
    //props:['id_granjas'],
    data() {
        return {
            NUM_RESULTS: 8, // Numero de resultados por página
            pag: 1,
            clientes: [],
            busqueda: ""
        }
    },
    created() {
        axios.get('/api/clientes').then(d => {
            this.clientes = d.data;

        }).catch(AxiosCatch)
    },
    computed: {
        classNext() {
            return this.pag * this.NUM_RESULTS / this.clientes.length < 1 ? '' : 'disabled'
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
            if (this.pag < this.clientes.length)
                this.pag += 1
        },
        buscar() {

            axios.get('/api/clientes/busqueda?q=' + this.busqueda).then(data => {
                this.clientes = data.data;
            }).catch(AxiosCatch)

        },
        Cancelar() {

        },
        Enviar() {

        }
    }
}
</script>
