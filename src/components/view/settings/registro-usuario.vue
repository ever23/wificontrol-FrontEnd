<template>
<div class="row">
    <div class="col-md-2 col-sm-1"></div>
    <div class="col-md-8 col-sm-10">
        <div>
            <h3 class="tile-title">Registrar Usuario</h3>
            <div class="tile-body">
                <formulario :error="errores" @submit.prevent="Enviar">
                    <div class="form-group">
                        <label class="control-label">Nombre </label>
                        <input class="form-control" v-model="user.nombre" name="nombres" required type="text" placeholder="Nombre">
                    </div>

                    <div class="form-group">
                        <label class="control-label">Nombre de usuario </label>
                        <input class="form-control" v-model="user.user" name="user" required type="text" placeholder="Nombre de usuarios">
                    </div>

                    <div class="form-group">
                        <label class="control-label">Contraseña</label>
                        <input class="form-control" v-model="user.pass1" name="pass1" required type="password" placeholder="Contraseña">
                    </div>
                    <div class="form-group">
                        <label class="control-label">Repita la contraseña </label>

                        <input class="form-control" v-model="user.pass2" name="pass2" type="password" placeholder="Repita contraseña">
                    </div>

                    <div class="form-group">
                        <button class="btn btn-primary" type="submit"><i class="fa fa-fw fa-lg fa-check-circle"></i>Guardar</button>&nbsp;&nbsp;&nbsp;<button class="btn btn-secondary" type="button" @click.prevent="Cancelar"><i class="fa fa-fw fa-lg fa-times-circle"></i>Cancelar</button>

                    </div>
                </formulario>
            </div>

        </div>
    </div>
    <div class="col-md-2 col-sm-1"></div>
</div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'registro-usuario',
    data() {
        return {
            user: {
                nombre: null,
                user: null,
                pass1: null,
                pass2: null,
                Submited: 1

            },
            errores: {}
        }
    },
    created() {

    },
    mounted() {},
    methods: {
        Cancelar() {

        },

        ValidForm() {

            if (this.user.pass2 != this.user.pass1) {
                Swal.fire('Las contraseñas no coinciden !', '', 'error')
               
                this.user.pass1 = '';
                this.user.pass2 = '';
                return false;
            }
            return true;
        },
        Enviar() {
            if (!this.ValidForm())
                return;
			
            this.$store.commit('loading', true);
            axios.post('/api/user/registro', this.user)
                .then(request => {
                    this.$store.commit('loading', false);
                    if (request.data.ok) {
                         Swal.fire('Guardado!', '', 'success').then(e=>{
                            this.$router.push({
                                name: 'usuarios'
                            })
                         })
                       
                    } else {
                        this.errores = request.data.error;
                    }
                }).catch(AxiosCatch);
        }
    }
}
</script>
