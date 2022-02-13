<template>
<tr v-if="!eliminado">
    <td @click="go">{{ equipo.nombre }}</td>
    <td>
        <div v-if="!formTiempo && equipo.cierre!='Indefinido'">
            <div class="progress progress-sm active" v-if="equipo.activo">
                <div class="progress-bar bg-success progress-bar-striped" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" :style="'width: '+progress+'%'">

                </div>
            </div>
        </div>
        <div @click="activarFormTiempo">{{ tiempoEquipo }}</div>
        <div v-if="formTiempo">
            <input type="range" v-model="tiempoFloat" class="custom-range" @input="calcularTiempo" @change="actualizarTiempo" step="0.5" max="5" min="0">
        </div>

    </td>
    <td @click="go">{{ equipo.costo }}</td>
    <td @click="activarFormPago" class="d-none d-md-none d-lg-table-cell">
        <div v-if="!formPago">{{ equipo.tPago }}</div>
        <div v-if="formPago">
            <select class="form-control" v-model="equipo.tPago">
                <option>Pagomovil</option>
                <option>Efectivo</option>
            </select>
        </div>
    </td>
    <td @click="activarFormPago" class="d-none d-md-none d-lg-table-cell">
        <div v-if="!formPago">{{ equipo.referencia }}</div>
        <div v-if="formPago">
            <input type="text" class="form-control" v-model="equipo.referencia">
        </div>
    </td>

    <td class="d-none d-md-none d-lg-table-cell">{{ equipo.apertura }}</td>
    <td class="d-none d-md-none d-lg-table-cell">{{ equipo.cierre }}</td>
    <td class="d-none d-md-none d-lg-table-cell">
        <i class="fa fa-check-circle" v-if="!equipo.activo"></i>
        <div class="" v-else>
            <equipo-wifi :item="wifi"></equipo-wifi>

        </div>
    </td>
    <td>
        <div class="btn-group">
            <button class="btn btn-primary btn-sm" type="button" v-if="equipo.cierre=='Indefinido'" @click="cerrar"><i class="fa fa-window-close"></i></button>
            <button class="btn btn-primary btn-sm" type="button" v-if="estaAsignado" @click="asignarEquipo"><i class="fa fa-thumbtack"></i></button>
            <button class="btn btn-primary btn-sm" type="button" v-if="formPago" @click="actualizarPago"><i class="fa fa-edit"></i></button>
            <button class="btn btn-primary btn-sm" type="button" @click="eliminar"><i class="fa fa-trash"></i></button>
        </div>
    </td>

</tr>
</template>

<script>
import axios from 'axios'
import {
    DateTime
} from 'luxon'
import '@/assets/js/py-script.js'
import Vue from 'vue'
import wifi_item from './equipo-wifi.vue'

export default {
    name: 'item-equipo',
    components: {
        'equipo-wifi': wifi_item,

    },
    props: {
        item: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            equipo: {},
            last: {},
            formTiempo: false,
            lastTiempo: "",
            tiempoSplit: ['00', '00'],
            tiempoFloat: 0,
            progress: 0,
            eliminado: false,
            formPago: false,
            tiempoIndefinido: '',
            intervalIndefinido: null,
            wifi: {}
        }
    },
    created() {
        if (this.item == undefined)
            return
        this.equipo = this.item;
        console.log('cres')
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

        })
        if (this.equipo.activo) {
            this.sockets.subscribe('equipo/wifi/' + this.equipo.mac, (data) => {
                this.wifi = data
                if (!this.equipo.activo) {
                    this.sockets.unsubscribe('equipo/wifi/' + this.equipo.mac);
                }
            })
        }

    },
    computed: {
        tiempoEquipo() {
            if (this.equipo.tiempo == 'Indefinido') {
                return this.tiempoIndefinido
            } else {
                return this.equipo.tiempo
            }
        },
        estaAsignado() {

            return !(this.equipo.id_equipo == this.$store.getters.equipo.id_equipo)
        }
    },
    methods: {
        go() {
            this.$router.push({
                name: 'item-equipo',
                query: {
                    id_equipo: this.equipo.id_equipo
                }
            })
        },
        puntoYa() {
            payWithPuntoYa(this.equipo.costo, response => {
                if (response.ok) {

                } else {

                }
                // Los valores de la respuesta son: 
                // ok: boolean, (true en caso de ser exitosa, false en caso de ser fallida)
                // description: string, (descripción de la transacción)
                // transactionId: string, (referencia bancaria de la transacción)
                // Ejemplo: { ok: true, description: 'Pago exitoso', transactionId: '1858749961512' }
            });

        },
        asignarEquipo() {
            Swal.fire({
                title: 'Desea Fijar a ' + this.equipo.nombre + ' a este equipo?',
                showDenyButton: true,
                confirmButtonText: 'si'
            }).then((result) => {

                if (result.isConfirmed) {
                    this.$store.dispatch('fijarEquipo', this.equipo)

                } else {

                }
            })

        },
        cerrar() {
            Swal.fire({
                title: 'Desea cerrar?',
                showDenyButton: true,
                confirmButtonText: 'si'
            }).then((result) => {

                if (result.isConfirmed) {

                    let update = {
                        id_equipo: this.equipo.id_equipo,
                        tiempo: this.tiempoIndefinido.substring(0, 5),
                        cierre: DateTime.now().toFormat("HH:mm"),
                        costo: this.equipo.costo,
                        activo: false

                    }
                    this.$store.commit('loading', true);
                    axios.put('/api/equipos/cerrar', {
                        id_equipo: this.equipo.id_equipo
                    }).then(d => {
                        this.$store.commit('loading', false);
                        clearInterval(this.intervalIndefinido)
                        this.equipo.tiempo = update.tiempo
                        this.equipo.cierre = update.cierre
                        this.progress = this.calcularProgreso(this.equipo.tiempo, this.equipo.cierre)
                        if (this.progreso == 0) {
                            this.activo = false
                        }
                        this.formTiempo = this.formPago = false
                        this.progreso(this.equipo.tiempo, this.equipo.cierre)
                        this.$forceUpdate()
                        this.$emit("update", this.equipo);
                        Swal.fire('Actualizado!', '', 'success')
                        this.$socket.emit('bloquear', this.equipo.mac)
                    }).catch(e => {
                        AxiosCatch(e)
                        this.$store.commit('loading', false);
                    })

                } else {

                }
            })
        },
        tiempoActivo() {
            let time = DateTime.fromFormat(this.equipo.apertura, 'HH:mm')
            let time2 = DateTime.now()
            return time2.diff(time).toFormat("hh:mm:ss")

        },
        horaFloat(time) {

            let tiempoSplit = time.split(":")
            return Number(tiempoSplit[0]) + (Number(tiempoSplit[1]) / 60)
        },
        calcularProgreso(tiempo, cierre) {

            let tiempoFloat = this.horaFloat(tiempo)
            let horaFloat = this.horaFloat(DateTime.now().toFormat('HH:mm'))
            let cierreFloat = this.horaFloat(cierre)
            let diferencia = cierreFloat - horaFloat;

            if (diferencia > 0) {

                return (diferencia / tiempoFloat) * 100
            }
            return 0

        },
        activarFormTiempo() {
            this.formTiempo = true

            this.last = Object.assign({}, this.equipo)
            //console.log(Object.assign({},this.equipo))
            // this.last.extends(this.equipo)
            let tiempoSplit = this.equipo.tiempo.split(':')
            this.tiempoFloat = Number(tiempoSplit[0]) + (Number(tiempoSplit[1]) / 60)
            this.$forceUpdate()
        },
        activarFormPago() {
            console.log('pag')
            this.formPago = true
            this.last = Object.assign({}, this.equipo)
        },
        actualizarTiempo() {
            Swal.fire({
                title: 'Cambiar el tiempo?',
                showDenyButton: true,
                confirmButtonText: 'si'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$store.commit('loading', true);

                    let update = {
                        id_equipo: this.equipo.id_equipo,
                        tiempo: this.equipo.tiempo
                    }
                    axios.put('/api/equipos/tiempo', update).then(d => {
                        this.$store.commit('loading', false);
                        this.formTiempo = false
                        if (d.data.ok) {
                            this.$emit("update", this.equipo);
                            if (d.data.equipo.activo) {
                                this.$socket.emit('desbloquear', this.equipo.mac)
                            } else {
                                this.$socket.emit('bloquear', this.equipo.mac)
                            }
                            Swal.fire('Actualizado!', '', 'success')

                        } else {
                            AxiosCatch("no se actualizo")
                            this.formTiempo = false
                            this.equipo = Object.assign({}, this.last)
                            this.tiempo(this.equipo, this.equipo.apertura)
                        }

                    }).catch(e => {
                        AxiosCatch(e)
                        this.$store.commit('loading', false);
                    })

                } else {
                    this.formTiempo = false
                    this.equipo = Object.assign({}, this.last)
                    this.tiempo(this.equipo, this.equipo.apertura)
                }
            })
        },
        actualizarPago() {

            Swal.fire({
                title: 'Cambiar el pago?',
                showDenyButton: true,
                confirmButtonText: 'si'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$store.commit('loading', true);

                    let update = {
                        id_equipo: this.equipo.id_equipo,
                        tPago: this.equipo.tPago,
                        referencia: this.equipo.referencia,
                    }
                    axios.put('/api/equipos/pago', update).then(d => {

                        this.formPago = false
                        this.$emit("update", d.data.equipo);

                        Swal.fire('Actualizado!', '', 'success')
                        this.$store.commit('loading', false);

                    }).catch(e => {
                        AxiosCatch(e)
                        this.$store.commit('loading', false);
                    })

                } else {
                    this.formTiempo = this.formPago = false
                    this.equipo = Object.assign({}, this.last)
                    this.tiempo(this.equipo, this.equipo.apertura)
                }
            })

        },
        actualizar() {

            Swal.fire({
                title: 'Cambiar el tiempo?',
                showDenyButton: true,
                confirmButtonText: 'si'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$store.commit('loading', true);
                    if (this.equipo.fecha != DateTime.now().toFormat('dd/LL/yyyy')) {
                        this.progress = 0
                    } else {
                        this.progress = this.calcularProgreso(this.equipo.tiempo, this.equipo.cierre)
                    }

                    let update = {
                        id_equipo: this.equipo.id_equipo,
                        tiempo: this.equipo.tiempo,
                        cierre: this.equipo.cierre,
                        apertura: this.equipo.apertura,
                        costo: this.equipo.costo,
                        activo: this.progress == 0 ? false : true,
                        tpago: this.equipo.tPago,
                        referencia: this.equipo.referencia,
                    }
                    axios.put('/api/equipos', update).then(d => {

                        if (this.progress == 0) {
                            this.activo = false
                        }
                        this.formTiempo = this.formPago = false
                        this.progreso(this.equipo.tiempo, this.equipo.cierre)
                        this.$forceUpdate()
                        this.$emit("update", this.equipo);
                        Swal.fire('Actualizado!', '', 'success')
                        this.$store.commit('loading', false);
                        if (this.activo) {
                            this.$socket.emit('desbloquear', this.equipo.mac)
                        }
                    }).catch(e => {
                        AxiosCatch(e)
                        this.$store.commit('loading', false);
                    })

                } else {
                    this.formTiempo = this.formPago = false
                    this.equipo = Object.assign({}, this.last)
                    this.tiempo(this.equipo, this.equipo.apertura)
                }
            })

        },
        progreso(tiempo, cierre) {

            let interval = setInterval(() => {
                this.progress = this.calcularProgreso(tiempo, cierre)
                if (this.progress == 0) {
                    this.equipo.activo = false
                    this.desactivar(this.equipo.id_equipo)
                    clearInterval(interval);
                }

            }, 50000)
        },
        calcularTiempo(e) {

            let time = DateTime.fromFormat('00:00', 'HH:mm')
            this.equipo.tiempo = time.plus({
                minutes: e.target.value * 60
            }).toFormat("HH:mm")

            this.equipo = this.tiempo(this.equipo, this.equipo.apertura)

        },
        tiempo(equipo, hora = null) {
            let time;
            if (hora == null) {
                time = DateTime.now()
            } else {
                time = DateTime.fromFormat(hora, 'HH:mm')
            }

            let tiempoSplit = [],
                horaFloat = 0,
                apertura = time.toFormat("HH:mm");
            if (equipo.tiempo == "Indefinido") {
                tiempoSplit = ['00', '00']
                equipo.cierre = "Indefinido"
            } else {
                tiempoSplit = equipo.tiempo.split(":")
                horaFloat = Number(tiempoSplit[0]) + (Number(tiempoSplit[1]) / 60)
                // let cierre = new Date(time.getTime() + (horaFloat * 3600000))
                equipo.cierre = time.plus({
                    hours: tiempoSplit[0],
                    minutes: tiempoSplit[1]
                }).toFormat("HH:mm");
            }

            equipo.costo = horaFloat * this.$store.getters.configuraciones.costo_hora
            equipo.apertura = apertura
            return equipo

        },
        desactivar() {

            /*axios.put('/api/equipos/desactivar', {
                id_equipo
            }).then(data => {}).catch(AxiosCatch)*/

        },
        eliminar() {
            Swal.fire({
                title: 'Desea eliminar el registro?',
                showDenyButton: true,
                confirmButtonText: 'Eliminar'
            }).then((result) => {

                if (result.isConfirmed) {
                    axios.delete('/api/equipos/?id_equipo=' + this.equipo.id_equipo).then(d => {
                        this.eliminado = true
                        this.$emit("update");
                        Swal.fire('Eliminado!', '', 'success')
                    }).catch(e => {

                    })

                }
            })

        }
    },

}
</script>

<style scoped>
td {
    cursor: pointer;
}
</style>
