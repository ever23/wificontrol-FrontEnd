<template>
<div>
    <!-- /.login-logo -->
    <div class="card card-outline card-primary">
        <button class=" btn btn-primary" type="button" @click="reload"><i class="fa fa-redo-alt"></i></button>
        <registro-equipo-login @registro="registroEquipo" v-if="!isEquipo "></registro-equipo-login>
        <item-equipo-login @update="updateEquipo" :item="equipo" :costoHora="3" v-if="isEquipo "></item-equipo-login>
    </div>
    <div class="card">
        <div class="card-header">
            <h3 class="card-title ">Pagos Pendientes</h3>
            <h4><span class="badge badge-danger  float-right">Total: {{ deuda }} bs</span></h4>
        </div>
        <!-- /.card-header -->
        <div class="card-body table-responsive p-0" style="height: 150px;">
            <table class="table table-sm table-head-fixed text-nowrap">
                <thead>
                    <tr>
                        <th>tiempo</th>
                        <th>Costo</th>
                        <th>Hora</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in equipos" :key="item.id_equipo">
                        <th> {{ item.tiempo }} </th>
                        <th>{{ item.costo }}</th>
                        <th>{{ item.apertura }}</th>
                        <th>{{ item.fecha }}</th>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- /.card -->
    </div>
</div>
</template>

<script>
import axios from 'axios'
import registroEquipo from './registro-login.vue'
import itemEquipoLogin from './item-equipo-login.vue'
export default {
    name: 'cliente',
    components: {
        "registro-equipo-login": registroEquipo,
        itemEquipoLogin
    },
    props: ['redirect'],
    data() {
        return {
            formLogin: false,
            equipos: [],
            deuda: 0
        }
    },
    mounted() {
        this.$store.dispatch('verificarEquipo')

        axios.get('/api/equipos/pendientes?id_cliente=' + this.$store.getters.equipo.id_cliente)
            .then(result => {

                this.equipos = result.data;
            }).catch(AxiosCatch)

    },
    created() {

    },
    watch: {
        // cada vez que equipo cambie, esta función será ejecutada

        equipos: function (newEquipos, oldEquipos) {
            let deuda = 0
            for (let equipo of newEquipos) {
                deuda += equipo.costo
            }
            this.deuda = deuda + this.equipo.costo
        }
    },
    computed: {
        isEquipo() {
            return this.$store.getters.isActivo
        },
        equipo() {
            return this.$store.getters.equipo
        }
    },
    methods: {
        reload() {
            localStorage.setItem('equipo', "")
            this.$router.go(0)

        },
        updateEquipo(equipo) {
            console.log(equipo)
            axios.get('/api/equipos/pendientes?id_cliente=' + equipo.id_cliente)
                .then(result => {

                    this.equipos = result.data;
                }).catch(AxiosCatch)

            this.$store.dispatch('fijarEquipo', equipo)
            this.$store.dispatch('verificarEquipo')
        },
        registroEquipo(equipo) {
            axios.get('/api/equipos/pendientes?id_cliente=' + equipo.id_cliente)
                .then(result => {

                    this.equipos = result.data;
                }).catch(AxiosCatch)
            this.$store.dispatch('fijarEquipo', equipo)
            this.sockets.subscribe("/equipo/update/" + equipo.id_equipo, (data) => {
                this.$store.dispatch('fijarEquipo', data)

            })
        }
    }
}
</script>

<style>

</style>
