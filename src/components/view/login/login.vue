<template>
<!-- /.login-logo -->
<div class="card card-outline card-primary">
    
    <login-form ></login-form>
    
</div>
<!-- /.card -->
</template>

<script>
import axios from 'axios'
import loginForm from './login-form.vue'
import registroEquipo from '../equipos/registro-login.vue'
import itemEquipoLogin from '../equipos/item-equipo-login.vue'
export default {
    name: 'login',
    components: {
        loginForm,
        'registro-equipo-login':registroEquipo,
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
        registroEquipo(equipo) {
            this.$store.dispatch('fijarEquipo', equipo)
        }
    }
}
</script>

<style>

</style>
