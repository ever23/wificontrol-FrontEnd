<template>

<div class="card card-outline card-primary">
    <div class="card-header text-center">
        <a href="." class="h1"><b>Admin</b>Wifi</a>
    </div>
    <div class="card-body">
        <p class="login-box-msg">Inicia session</p>

        <formulario :error="errores" @submit.prevent="login">
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Usuario" v-model="user">
                <div class="input-group-append">
                    <div class="input-group-text">
                        <span class="fas fa-envelope"></span>
                    </div>
                </div>
            </div>
            <div class="input-group mb-3">
                <input type="password" class="form-control" placeholder="Contraseña" v-model="pass">
                <div class="input-group-append">
                    <div class="input-group-text">
                        <span class="fas fa-lock"></span>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-8">
                    <div class="icheck-primary">
                        <input type="checkbox" id="remember" v-model="recordar">
                        <label for="remember">
                            Recuerdame
                        </label>
                    </div>
                </div>
                <!-- /.col -->
                <div class="col-4">
                    <button type="submit" class="btn btn-primary btn-block">Entrar</button>
                </div>
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
export default {
    name: 'login-form',
    props: ['redirect'],
    data() {
        return {
            user: null,
            pass: null,
            recordar: false,
            errores: {}
        }
    },
    created() {

    },
    methods: {
        login() {
            let redirect = this.redirect !== undefined ? this.redirect : {
                name: 'admin'
            }
            this.$store.commit('loading', true);
            this.$store.dispatch('LogIn', {
                    user: this.user,
                    pass: this.pass,
                    recordar: this.recordar,
                    Submited: 1
                })
                .then(data => {
                    console.log(!this.redirect ? {
                        name: 'inicio'
                    } : this.redirect)
                    this.$store.commit('loading', false);
                    if (data.login) {
                        //console.log('inicio');

                        this.$router.push(!this.redirect ? {
                            name: 'inicio'
                        } : this.redirect)
                    } else {
                        AxiosCatch(request.data.error)
                        this.errores = data.error;

                    }

                })
                .catch(d => {
                    AxiosCatch(d);
                    this.$store.commit('loading', false);
                });
        }
    }
}
</script>

<style>

</style>
