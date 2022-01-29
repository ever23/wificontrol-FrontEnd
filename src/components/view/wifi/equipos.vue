<template>
<div class="card">
    <div class="card-header">
        <h3 class="card-title">Dispositivos Wifi</h3>
    </div>
    <!-- /.card-header -->
    <div class="card-body p-0">
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>IP</th>
                    <th>MAC</th>
                    <th style="width: 40px"></th>
                </tr>
            </thead>
            <tbody>
                <wifi-item v-for="(item,key) in wifi" :item="item" :key="key"></wifi-item>
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
        }
    },
    name: 'wifi-equipos',
    data() {
        return {

        }
    },
    created() {

    },
    mounted() {

    },
    computed: {

    },
    methods: {
        bloquear(e){
            let id = e.target.id
            console.log(id)

        },
        desbloquear(){

        }

    }
}
</script>
