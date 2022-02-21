<template>
<tbody v-if="!eliminado">
    <tr data-widget="expandable-table" aria-expanded="false" @click="expandir">
        <td>{{ cliente.id_cliente }}</td>
        <td>{{ cliente.nombre }}</td>
        <td class="d-none d-md-none d-lg-table-cell">{{ cliente.activos }}</td>
        <td class="d-none d-md-none d-lg-table-cell">{{ cliente.conecciones }}</td>
        <td>{{ cliente.deuda }} Bs</td>
        <td> 
            <button class="btn btn-primary btn-sm" type="button" v-if="isRoot()"  @click="eliminar"><i class="fa fa-trash"></i></button>
        </td>
    </tr>
    <tr class="expandable-body d-none">
        <td colspan="5">

            <div class="card card-item" style="display: none;">
                <div class="card-header">
                    <div class="row">
                        <div class="col-12 col-sm-6 col-md-3">
                            <div class="info-box">
                                <span class="info-box-icon bg-danger elevation-1"><i class="fas fa-search-dollar"></i></span>

                                <div class="info-box-content">
                                    <span class="info-box-text">Deudas</span>
                                    <span class="info-box-number">
                                        {{ cliente.deuda }} Bs
                                    </span>
                                </div>
                                <!-- /.info-box-content -->
                            </div>
                            <!-- /.info-box -->
                        </div>

                        <!-- /.col -->
                    </div>
                </div>
                <!-- /.card-header -->
                <div class="card-body p-0">
                    <div class="table-responsive">
                        <table class="table">
                            <thead class="thead">
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
                                <item-equipo @update="update" :costoHora="costoHora" v-for="(equipo,index) in equipos" :item="equipo" :key="equipo.id_equipo" v-show="(pag - 1) * NUM_RESULTS <= index  && pag * NUM_RESULTS > index"></item-equipo>
                            </tbody>
                        </table>
                    </div>
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

        </td>
    </tr>
</tbody>
</template>

<style>
.dark-mode .card-item {
    background-color: #212529 !important;
}

.dark-mode .thead {
    background-color: #3a4047 !important;
}
</style>

<script>
import axios from 'axios'
import {
    DateTime
} from 'luxon'
import itemEquipo from '../equipos/item-equipo-ls.vue'
export default {
    name: 'item-cliente',
    components: {

        'item-equipo': itemEquipo
    },
    props: {
        item: {
            type: Object,
            required: true
        },

    },
    data() {
        return {
            cliente: {},
            equipos: {},
            expandido: false,
            costoHora: 3,
            deudas: null,
            eliminado: false,
            NUM_RESULTS: 8, // Numero de resultados por página
            pag: 1,
        }
    },
    created() {
        this.cliente = this.item

    },
    computed: {

    },
    methods: {
           isRoot() {
            return this.$store.getters.IsRoot
        },
        pagePrevius() {
            if (this.pag > 1)
                this.pag -= 1
        },
        pageNext() {
            if (this.pag < this.equipos.length)
                this.pag += 1
        },

        update() {
            this.expandido = false
            this.expandir()
            this.$emit("update");
        },
        eliminar() {

            Swal.fire({
                title: 'Desea eliminar el registro?',
                showDenyButton: true,
                confirmButtonText: 'Eliminar'
            }).then((result) => {

                if (result.isConfirmed) {
                    axios.delete('/api/clientes/?id_cliente=' + this.cliente.id_cliente).then(d => {
                        this.eliminado = true
                        this.$emit("update");
                        Swal.fire('Eliminado!', '', 'success')
                    }).catch(e => {

                    })

                }
            })

        },
        expandir() {
            this.expandido = !this.expandido

            if (this.expandido) {
                this.cliente.deuda = 0
                axios.get('/api/equipos/cliente?id_cliente=' + this.cliente.id_cliente).then(data => {
                    this.equipos = data.data
                    for (let equipo of data.data) {
                        // console.log(this.equipos)
                        if (equipo.tPago == '') {
                            this.cliente.deuda += equipo.costo
                        }
                    }
                }).catch(AxiosCatch)
            }
        }
    }

}
</script>

<style>

</style>
