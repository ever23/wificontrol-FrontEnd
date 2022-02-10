<template>
<div class="row">
    <div class="col-lg-3 col-6">
        <!-- small box -->
        <div class="small-box bg-info">
            <div class="inner">

                <a class="btn btn-sm float-right" @click.prevent="activarInput('Nombre')"><i class="fa fa-edit"></i></a>
                <h3>Red</h3>
                <div class="form-group float-right">
                    <div class="custom-control custom-switch custom-switch-off-danger custom-switch-on-success">
                        <input type="checkbox" @change="activarRed" class="custom-control-input" v-model=" redPublica.activo" :id="'customSwitch'+redPublica.red">
                        <label class="custom-control-label" :for="'customSwitch'+redPublica.red"></label>
                    </div>

                </div>
                <p v-if="!inputNombre"> {{ redPublica.red}} </p>
                <div class="input-group mb-3" v-else>
                    <input type="text" class="form-control" v-model="redPublica.red">
                    <button class=" btn btn-primary btn-sm float-right" type="button" @click="actualizar">
                        <i class="fa fa-save"></i></button>
                    <button class=" btn btn-primary btn-sm float-right" type="button" @click="cancelarInput('Nombre')">
                        <i class="fa fa-window-close"></i></button>

                </div>

            </div>
            <div class="icon">
                <i class="ion ion-bag"></i>
            </div>
        </div>
    </div>
    <!-- ./col -->
    <div class="col-lg-3 col-6">
        <!-- small box -->
        <div class="small-box bg-success">
            <div class="inner">
                <a class="btn btn-sm float-right" @click.prevent="activarInput('Pass')"><i class="fa fa-edit"></i></a>
                <h3> Contraseña</h3>
                <div class="form-group float-right">
                    <div class="custom-control custom-switch custom-switch-off-danger custom-switch-on-success">
                        <input type="checkbox" @change="activarRed" class="custom-control-input" v-model=" redPublica.seguridadActiva" :value="redPublica.seguridadActiva" id="customSwitchseguridad">
                        <label class="custom-control-label" for="customSwitchseguridad"></label>
                    </div>

                </div>
                <p v-if="!inputPass">{{redPublica.password}}</p>
                <div class="input-group mb-3" v-else>
                    <input type="text" class="form-control" v-model="redPublica.password">
                    <button class=" btn btn-primary btn-sm float-right" type="button" @click="actualizar">
                        <i class="fa fa-save"></i></button>
                    <button class=" btn btn-primary btn-sm float-right" type="button" @click="cancelarInput('Pass')">
                        <i class="fa fa-window-close"></i></button>

                </div>
            </div>
            <div class="icon">
                <i class="ion ion-stats-bars"></i>
            </div>
        </div>
    </div>
    <!-- ./col -->
    <div class="col-lg-3 col-6">
        <!-- small box -->
        <div class="small-box bg-warning">
            <div class="inner">
                <a class="btn btn-sm float-right" @click.prevent="activarInput('Up')"><i class="fa fa-edit"></i></a>

                <h3>Subida</h3>

                <p v-if="!inputUp"> {{redPublica.UploadSpeed}}</p>
                <div class="input-group mb-3" v-else>
                    <input type="text" class="form-control" v-model="redPublica.UploadSpeed">
                    <button class=" btn btn-primary btn-sm float-right" type="button" @click="actualizar">
                        <i class="fa fa-save"></i></button>
                    <button class=" btn btn-primary btn-sm float-right" type="button" @click="cancelarInput('Up')">
                        <i class="fa fa-window-close"></i></button>

                </div>
            </div>
            <div class="icon">
                <i class="ion ion-person-add"></i>
            </div>
        </div>
    </div>
    <!-- ./col -->
    <div class="col-lg-3 col-6">
        <!-- small box -->
        <div class="small-box bg-danger">
            <div class="inner">
                <a class="btn btn-sm float-right" @click.prevent="activarInput('Down')"><i class="fa fa-edit"></i></a>

                <h3>Bajada</h3>

                <p v-if="!inputDown"> {{redPublica.DownloadSpeed}}</p>
                <div class="input-group mb-3" v-else>
                    <input type="text" class="form-control" v-model="redPublica.DownloadSpeed">
                    <button class=" btn btn-primary btn-sm float-right" type="button" @click="actualizar">
                        <i class="fa fa-save"></i></button>
                    <button class=" btn btn-primary btn-sm float-right" type="button" @click="cancelarInput('Down')">
                        <i class="fa fa-window-close"></i></button>

                </div>
            </div>
            <div class="icon">
                <i class="ion ion-pie-graph"></i>
            </div>
        </div>
    </div>
    <!-- ./col -->
</div>
</template>

<script>
import {
    DateTime
} from 'luxon'
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

export default {
    name: 'red-invitados',
    data() {
        return {
            inputNombre: false,
            inputPass: false,
            inputUp: false,
            inputDown: false,
            redPublica: {},
            last: {}
        }
    },
    created() {
        this.$socket.emit('informacionInvitados', e => {
            this.redPublica = e
        })
    },
    mounted() {

    },
    computed: {
        getEquipos() {
            return this.equipos;
        },

        settings() {
            return this.$store.getters.settings;
        }
    },
    methods: {
        activarRed() {
            this.$socket.emit('actualizarRedInvitados', this.redPublica, ok => {

                if (ok) {

                    Toast.fire({
                        icon: 'success',
                        title: 'Actualizado!'
                    })

                } else {

                    Toast.fire({
                        icon: 'success',
                        title: 'No se Actualizo!'
                    })

                }
            })
        },
        actualizar() {
            this.$socket.emit('actualizarRedInvitados', this.redPublica, ok => {
                this.inputNombre = this.inputPass = this.inputUp = this.inputDown = false
                if (ok) {
                    Swal.fire('Actualizado!', '', 'success')

                } else {
                    Swal.fire('No se Actualizo!', '', 'error')
                    this.redPublica = Object.assign({}, this.last)
                }

            })
        },
        activarInput(name) {
            this['input' + name] = !this['input' + name]
            this.last = Object.assign({}, this.redPublica)
        },
        cancelarInput(name) {
            this['input' + name] = false
            this.redPublica = Object.assign({}, this.last)
        }

    }
}
</script>
