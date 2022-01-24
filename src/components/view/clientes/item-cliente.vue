<template>
<tbody v-if="!eliminado">
    <tr data-widget="expandable-table" aria-expanded="false" @click="expandir">
        <td>{{ cliente.id_cliente }}</td>
        <td>{{ cliente.nombre }}</td>
        <td>{{ cliente.activos }}</td>
        <td>{{ cliente.conecciones }}</td>
          <td>{{ cliente.deuda }} Bs</td>
        <td>
            <button class="btn btn-primary btn-sm" type="button" @click="eliminar"><i class="fa fa-trash"></i></button>
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
                                        {{ deudas }} Bs
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
                                    <th>Tipo de pago</th>
                                    <th>Referencia</th>
                                    <th>Apertura</th>
                                    <th>Cierre</th>
                                    <th>Fecha</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                <item-equipo @update="update" :costoHora="costoHora" v-for="equipo in equipos" :item="equipo" :key="equipo.id_equipo"></item-equipo>
                            </tbody>
                        </table>
                    </div>
                </div>
                <!-- /.card-body -->
            </div>

        </td>
    </tr>
</tbody>
</template>

<style>
.card-item {
    background-color: #212529 !important;
}

.thead {
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
            deudas: 0,
            eliminado:false
        }
    },
    created() {
        this.cliente = this.item

    },
    computed: {

    },
    methods: {
        update(){
            this.expandido=false
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
            this.deudas = 0
            if (this.expandido) {

                axios.get('/api/equipos/cliente?id_cliente=' + this.cliente.id_cliente).then(data => {
                    this.equipos = data.data;
                    for (let equipo of data.data) {
                        // console.log(this.equipos)
                        if (equipo.tPago == '') {
                            this.deudas += equipo.costo
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
