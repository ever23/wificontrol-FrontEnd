<template>
<!-- /.login-logo -->
<div class="card card-outline card-primary">
    <button type="submit" class="btn btn-primary btn-block" @click="formLogin=!formLogin">
        <div v-if="!formLogin">Ingresar</div>
        <div v-if="formLogin">Registrar</div>
    </button>
    <login-form v-if="formLogin"></login-form>
    <registro-equipo  @registro="registroEquipo"  v-if="!formLogin && !isEquipo"></registro-equipo>
    <item-equipo-login  :item="equipo" :costoHora="3"  v-if="isEquipo && !formLogin"></item-equipo-login>
</div>
<!-- /.card -->
</template>

<script>
import axios from 'axios'
import loginForm from './login-form.vue'
import registroEquipo from '../equipos/registro.vue'
import itemEquipoLogin from '../equipos/item-equipo-login.vue'
export default {
    name: 'login',
    components: {
        loginForm,
        registroEquipo,
        itemEquipoLogin
    },
    props: ['redirect'],
    data() {
        return {
            formLogin: false
        }
    },
    created() {

        this.$store.dispatch('verificarEquipo')
       
    },computed:{
        isEquipo(){
           return  this.$store.getters.isActivo 
        },
        equipo(){
            return  this.$store.getters.equipo 
        }
    },
    methods: {
        registroEquipo(equipo){
            this.$store.dispatch('fijarEquipo', equipo)
        }
    }
}
</script>

<style>

</style>
