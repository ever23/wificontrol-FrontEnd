<template>
<tr v-if="!eliminado">
    <td>{{ equipo.nombre }}</td>
    <td>
        <div @click="activarFormTiempo">{{ tiempoEquipo }}</div>
        <div v-if="formTiempo">
            <input type="range" v-model="tiempoFloat" class="custom-range" @input="calcularTiempo" @change="actualizar" step="0.5" max="5" min="0">
        </div>
    </td>
    <td>{{ equipo.costo }}</td>
    <td @click="activarFormPago">
        <div v-if="!formPago">{{ equipo.tPago }}</div>
        <div v-if="formPago">
            <select class="form-control" v-model="equipo.tPago">
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

    <td>{{ equipo.apertura }}</td>
    <td>{{ equipo.cierre }}</td>
    <td>
        <i class="fa fa-check-circle" v-if="!equipo.activo"></i>
        <div class="progress progress-sm active" v-else>
            <div class="progress-bar bg-success progress-bar-striped" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" :style="'width: '+progress+'%'">

            </div>
        </div>
    </td>
    <td>
        <div class="btn-group">
            <button class="btn btn-primary btn-sm" type="button" v-if="equipo.cierre=='Indefinido'" @click="cerrar"><i class="fa fa-window-close"></i></button>
            <button class="btn btn-primary btn-sm" type="button" v-if="estaAsignado" @click="asignarEquipo"><i class="fa fa-thumbtack"></i></button>
            <button class="btn btn-primary btn-sm" type="button" v-if="formPago" @click="actualizar"><i class="fa fa-edit"></i></button>
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
export default {
    name: 'item-equipo',
    props: {
        item: {
            type: Object,
            required: true
        },
        costoHora: {
            type: Number,
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
            intervalIndefinido: null
        }
    },
    created() {
        this.equipo = this.item;
        if (this.equipo.cierre !== "Indefinido") {

            this.progress = this.calcularProgreso(this.equipo.tiempo, this.equipo.cierre)

            if (this.equipo.activo) {
                this.progreso(this.equipo.tiempo, this.equipo.cierre)
            }
        } else {

            this.intervalIndefinido = setInterval(() => {
                this.tiempoIndefinido = this.tiempoActivo()
                this.equipo.costo = (this.horaFloat(this.tiempoIndefinido) * this.costoHora).toLocaleString('en')
            }, 1000)
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

                    axios.put('/api/equipos', update).then(d => {
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
                        this.$socket.emit('bloquear', this.equipo.ip)
                    }).catch(AxiosCatch)

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

            equipo.costo = horaFloat * 3
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

<style>

</style>
