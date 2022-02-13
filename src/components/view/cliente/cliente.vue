<template>
<!-- /.login-logo -->
<div class="card card-outline card-primary">
 <button class=" btn btn-primary" type="button"  @click="reload"><i class="fa fa-redo-alt"></i></button>
    <registro-equipo-login @registro="registroEquipo"  v-if="!isEquipo "></registro-equipo-login>
     <item-equipo-login @update="updateEquipo" :item="equipo" :costoHora="3" v-if="isEquipo "></item-equipo-login>
</div>
<!-- /.card -->
</template>

<script>
import axios from 'axios'
import registroEquipo from './registro-login.vue'
import itemEquipoLogin from './item-equipo-login.vue'
export default {
    name: 'cliente', 
    components: {
        "registro-equipo-login":registroEquipo,
        itemEquipoLogin
    },
    props: ['redirect'],
    data() {
        return {
            formLogin: false
        }
    },
    mounted() {
        this.$store.dispatch('verificarEquipo')
         axios.get('/api/equipos/pendientes?mac=' + this.$store.getters.mac)
            .then(result => {

                  this.$store.dispatch('fijarEquipo', result.data)
            }).catch(AxiosCatch)
    },
    created() {
   
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
        reload(){
            localStorage.setItem('equipo',"")
            this.$router.go(0)

        },
        updateEquipo(equipo){
            this.$store.dispatch('fijarEquipo', equipo)
            this.$store.dispatch('verificarEquipo')
        },
        registroEquipo(equipo) {
            console.log(equipo)
            this.$store.dispatch('fijarEquipo', equipo)
        }
    }
}
</script>

<style>

</style>
