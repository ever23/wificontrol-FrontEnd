<template>

<div class="card card-outline card-primary">
    <div class="card-header text-center">
        <a href="." class="h1"><b>Admin</b>Wifi</a>
    </div>
    <div class="card-body">
        <p class="login-box-msg">Registrarse</p>

        <formulario :error="errores" @submit.prevent="registrar">
        <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Nombre" v-model="user.nombre">
                <div class="input-group-append">
                    <div class="input-group-text">
                        <span class="fas fa-envelope"></span>
                    </div>
                </div>
            </div>
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Usuario" v-model="user.user">
                <div class="input-group-append">
                    <div class="input-group-text">
                        <span class="fas fa-user"></span>
                    </div>
                </div>
            </div>
            <div class="input-group mb-3">
                <input type="password" class="form-control" placeholder="Contraseña" v-model="user.pass1">
                <div class="input-group-append">
                    <div class="input-group-text">
                        <span class="fas fa-lock"></span>
                    </div>
                </div>
            </div>
            <div class="input-group mb-3">
                <input type="password" class="form-control" placeholder="Repita Contraseña" v-model="user.pass2">
                <div class="input-group-append">
                    <div class="input-group-text">
                        <span class="fas fa-lock"></span>
                    </div>
                </div>
            </div>
            <div  class="input-group mb-3">
                
                    <button type="submit" class="btn btn-primary btn-block">Registrar</button>
                
                <!-- /.col -->
            </div>
        </formulario>

    </div>
    <!-- /.card-body -->
</div>
<!-- /.card -->
</template>

<script>
import axios from 'axios'
import registro from '../settings/registro-usuario.vue'
export default {
     mixins: [registro],
    name: 'registro-form',
    
    data() {
        return {
        
        }
    },
    created() {

    },
    methods:{
         registrar() {
           /* if (!this.ValidForm())
                return;*/
			
            this.$store.commit('loading', true);
            axios.post('/api/user/primerRegistro', this.user)
                .then(request => {
                    this.$store.commit('loading', false);
                    if (request.data.ok) {
                        
                        /*swal({
                                title: "Listo!",
                                text: "El portfolio se ha almacenado ",
                                type: "success",

                            },
                            () => this.$router.push({
                                name: 'usuarios'
                            }));*/

                    } else {
                        this.errores = request.data.error;
                    }
                }).catch(AxiosCatch);
        }
    
    }
   
}
</script>

<style>

</style>
