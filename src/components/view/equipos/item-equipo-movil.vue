<template>
<!-- /.login-logo -->
<div class="card card-outline card-primary">
    <div class="card-header text-center">
        <h1><b> {{ equipo.nombre }}</b></h1>
        <i class="fa fa-check-circle" v-if="!equipo.activo"></i>
        <div class="progress progress-sm active" v-else>
            <div class="progress-bar bg-success progress-bar-striped" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" :style="'width: '+progress+'%'">
            </div>
        </div>
    </div>
    <div class="card-body">
        <div class="card ">
            <table class="table">
                <thead class="thead">
                    <tr>
                        <th v-if="!equipo.activo">Mac</th>
                        <th>tiempo</th>
                        <th>Costo</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th v-if="!equipo.activo">{{ equipo.mac }}</th>
                        <th>
                            <div @click="activarFormTiempo" v-if="!equipo.libre">{{ tiempoEquipo }}</div>
                            <div v-if="formTiempo">
                                <input type="range" v-if="!equipo.libre" v-model="tiempoFloat" class="custom-range" @input="calcularTiempo" @change="actualizarTiempo" step="0.5" max="5" min="0">
                                <div class="btn-group float-right">
                                    <div class="custom-control custom-switch custom-switch-off-danger custom-switch-on-success">
                                        <input type="checkbox" class="custom-control-input" v-model="equipo.libre" :id="'customSwitch'+equipo.mac">
                                        <label class="custom-control-label" :for="'customSwitch'+equipo.mac"></label>
                                    </div>
                                    <i class="btn btn-sm btn-primary fa fa-edit" v-if="equipo.libre" @click="actualizarTiempo"></i>

                                </div>
                            </div>
                        </th>
                        <th>{{ equipo.costo }}</th>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="card" v-if="equipo.activo">
            <table class="table">
                <thead class="thead">
                    <tr>
                        <th>Nombre</th>
                        <th class="d-none d-md-none d-lg-table-cell">IP</th>
                        <th class="d-none d-md-none d-lg-table-cell">MAC</th>
                        <th>Subida</th>
                        <th>Bajada</th>
                        <th style="width: 40px"></th>
                    </tr>
                </thead>
                <tbody>
                    <wifi-item :item="wifi"></wifi-item>
                </tbody>
            </table>
        </div>
        <div class="card">
            <table class="table">
                <thead class="thead">
                    <tr>
                        <th>Tipo de pago</th>
                        <th>Referencia</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td @click="activarFormPago">
                            <div v-if="!formPago">{{ equipo.tPago }}</div>
                            <div v-if="formPago">
                                <select class="form-control" v-model="equipo.tPago">
                                    <option></option>
                                    <option>Pagomovil</option>
                                    <option>Efectivo</option>
                                </select>
                            </div>
                        </td>
                        <td @click="activarFormPago">
                            <div v-if="!formPago">{{ equipo.referencia }}</div>
                            <div v-if="formPago">
                                <input type="text" class="form-control" v-model="equipo.referencia">
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="card">
            <table class="table">
                <thead class="thead">
                    <tr>
                        <th>Apertura</th>
                        <th>Cierre</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td c>{{ equipo.apertura }}</td>
                        <td>{{ equipo.cierre }}</td>
                        <td>
                            {{ equipo.fecha }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="card-footer clearfix ">
        <div class="btn-group  float-right">
            <button class="btn btn-danger btn-md" type="button" v-if="equipo.cierre=='Indefinido'" @click="cerrar"><i class="fa fa-window-close"></i>Cerrar</button>
            <button class="btn btn-primary btn-md" type="button" v-if="formPago" @click="actualizarPago"><i class="fa fa-save"></i>Guardar</button>
            <button class="btn btn-primary btn-md" type="button"  v-if="equipo.activo || isRoot()"  @click="eliminar"><i class="fa fa-trash"></i>Eliminar</button>
        </div>
    </div>

    <!-- /.card-body -->

</div>
</template>

<script>
import axios from 'axios'
import itemEquipo from './item-equipo.vue'
import itemWifi from '../red/item.vue'
export default {
    name: 'item-equipo-movil',
    components: {
        'wifi-item': itemWifi,

    },
    mixins: [itemEquipo],
    props: {
        item: {
            type: Object,
            required: false
        },
        id_equipo: {
            required: true
        }
    },
    watch: {
        // cada vez que equipo eliminado, esta función será ejecutada
        eliminado: function (newEquipo) {
            if (newEquipo) {
                this.$router.push({
                    name: 'inicio'
                })
            }
        },

    },
    created() {
        axios.get('/api/equipos/equipo?id_equipo=' + this.id_equipo).then(d => {
            this.equipo = d.data;
            if (this.equipo.cierre !== "Indefinido") {

                this.progress = this.calcularProgreso(this.equipo.tiempo, this.equipo.cierre)

                if (this.equipo.activo) {
                    this.progreso(this.equipo.tiempo, this.equipo.cierre)
                }
            } else {

                this.intervalIndefinido = setInterval(() => {
                    this.tiempoIndefinido = this.tiempoActivo()
                    this.equipo.costo = (this.horaFloat(this.tiempoIndefinido) * this.$store.getters.configuraciones.costo_hora).toLocaleString('en')
                }, 1000)
            }
            this.sockets.subscribe("/equipo/update/" + this.equipo.id_equipo, (data) => {
                this.equipo = data
                  this.$emit("update", this.equipo);

            })
            if (this.equipo.activo) {
                this.sockets.subscribe('equipo/wifi/' + this.equipo.mac, (data) => {
                    this.wifi = data
                    if (!this.equipo.activo) {
                        this.sockets.unsubscribe('equipo/wifi/' + this.equipo.mac);
                    }
                })
            }
        }).catch(AxiosCatch)

    }

}
</script>

<style>

</style>
