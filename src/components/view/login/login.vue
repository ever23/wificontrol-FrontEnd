<template>
<!-- /.login-logo -->
<div class="card card-outline card-primary">
    
    <login-form v-if="!formRegistro"></login-form>
    <registro-form v-if="formRegistro" @registro="registro"></registro-form>
    
</div>
<!-- /.card -->
</template>

<script>
import axios from 'axios'
import loginForm from './login-form.vue'
import registro from './registro-form.vue'
export default {
    name: 'login',
    components: {
        loginForm,
        'registro-form':registro,
    },
    props: ['redirect'],
    data() {
        return {
            formRegistro: false
        }
    },
    mounted() {
        
    },
    created() {
        axios.get('/api/user/isNew').then(result=>{
            if(result.data.ok==false){
                this.formRegistro=true

            }
        })

    },
    computed: {
       
    },
    methods: {
        registro(){
              this.formRegistro=false
        }
        
    }
}
</script>

<style>

</style>
