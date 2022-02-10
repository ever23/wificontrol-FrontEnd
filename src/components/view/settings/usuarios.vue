<template>
<div class="card card-primary card-outline">
    <div class="card-header border-transparent">
        <h3 class="card-title">Usuarios</h3>

        <div class="card-tools">

            <div class="btn-group">
                <router-link class="btn btn-primary btn-sm" :to="{name:'registro-usuario'}"><i class="fa fa-plus"></i>Agregar usuario</router-link>
            </div>
        </div>
    </div>

    <!-- /.card-header -->
    <div class="card-body p-0">

        <div class="table-responsive">
            <table class="table  table-hover">
                <thead>
                    <tr class="info">
                        <td>
                            Nombre
                        </td>
                        <td>
                            Usuario
                        </td>

                        <td>

                        </td>

                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in usuarios" ref="items">

                        <td>
                            <a :href="user.url_user">
                                {{ user.nombre }}
                            </a>

                        </td>
                        <td>{{ user.user }} </td>

                        <td>
                            <div class="btn-group">
                               <!-- <router-link class="btn btn-primary btn-sm" :to="{name:'editar-usuario',params:{id_usuarios:user.id_usuarios}}"><i class="fa fa-edit"></i></router-link>
                               --> <button class="btn btn-primary btn-sm" type="button" @click="eliminar(user)"><i class="fa fa-trash"></i></button>

                                <!--<button class="btn btn-primary btn-sm" type="button" @click="permisos(user)"><i class="fa fa-refresh"></i></button>-->
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- /.table-responsive -->
    </div>
    <!-- /.card-body -->
    <div class="card-footer clearfix">
        
    </div>
    <!-- /.card-footer -->
</div>
</template>

<script>
import axios from 'axios'
import DataTable from '@/assets/js/list-DataTable.js'
export default {
    mixins: [DataTable],
    name: 'usuarios',
    data() {
        return {
            usuarios: []
        }
    },
    created() {

        this.refresh();
    },

    methods: {
        refresh() {
            this.$store.commit('loading', true);
            axios.get('/api/user/lista')
                .then(request => {
                    this.$store.commit('loading', false);
                    this.usuarios = request.data;
                }).catch(c => {
                    AxiosCatch(c);

                });
        },
        eliminar(user) {
            Swal.fire({
                title: "Deseas eliminar el usuario " + user.nombre + "?",
                showDenyButton: true,
                confirmButtonText: "si, Eliminar!",
                type: "warning",
            }).then(result => {

                if (result.isConfirmed) {
                    // delete(this.proyectos[index]);
                    this.$store.commit('loading', true);
                    axios.delete('/api/user/?id_usuarios=' + user.id_usuarios)
                        .then(request => {
                            this.$store.commit('loading', false);
                            if (request.data.ok) {
                                this.usuarios = this.usuarios.filter(p => p.id_usuarios != user.id_usuarios);
                                Swal.fire('Eliminado!', '', 'success')
                            } else {
                                AxiosCatch(request.data.error);
                            }

                        })
                        .catch(AxiosCatch);
                }
            })

        },
        permisos(user) {

        }
    }

}
</script>

<style>
.blob {
    font-weight: bold
}

td.btn-group {
    padding: 0px;
}
</style>
