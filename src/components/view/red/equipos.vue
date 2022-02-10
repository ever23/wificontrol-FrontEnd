<template>
<div class="card">
    <div class="card-header">
        <h3 class="card-title">{{titulo}}</h3>
    </div>
    <!-- /.card-header -->
    <div class="card-body p-0">
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th class ="d-none d-md-none d-lg-table-cell">IP</th>
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
import axios from 'axios'
import itemWifi from './item.vue'
export default {
 components: {
        'wifi-item':itemWifi,
      
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
    data(){
        return {
            conexionRouter:false
        }
    },
    created(){
        this.sockets.subscribe('ok-conexion', () => {
             this.conexionRouter=true

        });
    }
  
}
</script>
