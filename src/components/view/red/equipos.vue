<template>
<div class="card">
    <div class="card-header">
        <h3 class="card-title">{{titulo}}

        </h3>
        <div class="card-tools">

            <div>
                <span class="badge badge-success trafic"><i class="fa fa-arrow-up"></i>{{ subida }}</span>
                <span class="badge badge-success trafic"> <i class="fa fa-arrow-down"></i>{{ bajada }}</span>
            </div>

        </div>

    </div>
    <!-- /.card-header -->
    <div class="card-body p-0">
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th class="d-none d-md-none d-lg-table-cell">IP</th>
                    <th class="d-none d-md-none d-lg-table-cell">MAC</th>
                    <th>Subida</th>
                    <th>Bajada</th>
                    <th style="width: 40px"></th>
                </tr>
            </thead>
            <tbody>
                <wifi-item v-for="item in wifi" :item="item" :key="item.mac"></wifi-item>
                <tr v-if="!conexionRouter">
                    <th colspan="6">Conectando con el router.....</th>

                </tr>
            </tbody>
        </table>
    </div>
    <!-- /.card-body -->
</div>
</template>

<script>
import calcularTraferencia from '@/assets/js/calcularTrasferencia.js'
import axios from 'axios'
import itemWifi from './item.vue'
export default {
    components: {
        'wifi-item': itemWifi,

    },
    props: {
        wifi: {
            type: Array,
            required: true
        },
        titulo: {
            type: String,
            required: false,
            default: "Dispositivos Wifi"
        }
    },
    name: 'wifi-equipos',
    data() {
        return {
            conexionRouter: false
        }
    },
    created() {
        this.sockets.subscribe('ok-conexion', () => {
            this.conexionRouter = true

        });
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
        }
    },
    methods: {

    }

}
</script>
