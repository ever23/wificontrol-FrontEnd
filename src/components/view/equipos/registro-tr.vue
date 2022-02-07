<template>
<tr>
    <td>
        <autocomplete :url="api" :onShouldGetData="bucarCliente" anchor="nombre" label="writer" :classes="{ wrapper: 'form-wrapper', input: 'form-control', list: 'data-list', item: 'data-list-item' }" :on-select="getData" :onInput="d=>newEquipo.nombre=d">
        </autocomplete>
        <select class="form-control" @change="selectIp">
            <option> </option>
            <option v-for="(item,id) in wifi" :value="id"> IP {{ item.ip }} {{ item.nombre }}</option>

        </select>
    </td>
    <td>
        <div>
            <div v-if="!newEquipo.libre" class="float-left"> {{ computedTiempo }}</div>
            <div class="form-group float-right">
                <div class="custom-control custom-switch custom-switch-off-danger custom-switch-on-success">
                    <input type="checkbox" class="custom-control-input" id="customSwitch3" v-model=" newEquipo.libre">
                    <label class="custom-control-label" for="customSwitch3"></label>
                </div>

            </div>
        </div>
        <div class="form-group" v-if="! newEquipo.libre">
            <input type="range" class="custom-range" v-model="newEquipo.rangoTiempo" step="0.5" max="5">
        </div>
    </td>
    <td>{{ newEquipo.costo }}</td>
    <td>
        <select class="form-control" v-model="newEquipo.tPago">
            <option>Pagomovil</option>
            <option>Efectivo</option>
        </select>
    </td>
    <td><input type="text" class="form-control" v-model="newEquipo.referencia"></td>
    <td> {{ newEquipo.apertura }} </td>
    <td> {{ newEquipo.cierre }}</td>
    <th></th>
    <td>
        <button class="btn btn-sm btn-primary" @click="guardar">Confirmar</button>

    </td>
</tr>
</template>

<script>

import axios from 'axios'
import {
    meses
} from '@/assets/js/Date.js'
import filter from '@/assets/js/UserVueFilter.js'
import ip from '@/assets/js/ip.js'
import {
    DateTime
} from 'luxon'
import Autocomplete from 'vue2-autocomplete-js';
export default {
    filters: filter,
    components: {
        Autocomplete
    },
    name: 'registro-equipo-tr',
    data() {
        return {
            costoHora: 3,
            api: '',
            newEquipo: {
                libre: false,
                cliente: null,
                nombre: "",
                tiempo: "Indefinido",
                costo: "",
                tPago: "",
                referencia: "",
                apertura: "",
                cierre: "Indefinido",
                rangoTiempo: 0,
                ip: "",
                mac: ""
            },
            time: 0,
            equipo: {},
            wifi: [],
            equiposPendientes: []
        }
    },

    updated() {

        // this.tiempo(this.newEquipo)
        //  setInterval(() => this.tiempo(this.newEquipo), 10000)

    },
    created() {
        this.api = axios.defaults.baseURL + '/api/clientes/busqueda'
        

        //this.$('.select2').select2()
    },
    computed: {

        computedTiempo() {
            let time = DateTime.fromFormat('00:00', 'HH:mm')

            this.newEquipo.tiempo = time.plus({
                minutes: this.newEquipo.rangoTiempo * 60
            }).toFormat("HH:mm")

            this.newEquipo = this.tiempo(this.newEquipo)
            return this.newEquipo.tiempo
        }

    },
    methods: {
       
        actualizar(data) {
            this.equipo = data
            this.$emit('registro', data)
        },
        bucarCliente(q) {
            return new Promise((resolve, reject) => {
                axios.get(this.api + '?q=' + q).then(d => {

                    resolve(d.data)

                }).catch(reject)
            })
        },
        getData(obj) {
            this.newEquipo.id_cliente = obj.id_cliente
            this.newEquipo.nombre = obj.nombre
        },
        calcularTiempo(e) {

            let time = DateTime.fromFormat('00:00', 'HH:mm')
            this.equipos[e.target.id].tiempo = time.plus({
                minutes: e.target.value * 60
            }).toFormat("HH:mm")

            this.equipos[e.target.id] = this.tiempo(this.equipos[e.target.id], this.equipos[e.target.id].apertura)

        },
        guardar() {
            this.$store.commit('loading', true);
            if (this.newEquipo.libre) {
                this.newEquipo.tiempo = 'Indefinido'
                this.newEquipo.cierre = 'Indefinido'
            }
            delete this.newEquipo.libre
           
            axios.post('/api/equipos', this.newEquipo).
            then((data) => {
                
                let equipo = data.data.data
                Swal.fire('Equipo agregado!', '', 'success')
                this.newEquipo = {
                    nombre: "",
                    tiempo: "Indefinido",
                    costo: "",
                    tPago: "",
                    referencia: "",
                    apertura: "",
                    cierre: "Indefinido",
                    rangoTiempo: 0,
                    ip:"",
                    mac:""
                }
                
                this.actualizar(equipo)
                this.$store.commit('loading', false);
            }).catch(e => {
                AxiosCatch(e)
                this.$store.commit('loading', false);
            });
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

            equipo.costo = horaFloat * this.costoHora
            equipo.apertura = apertura
            return equipo

        }

    }
}
</script>

<style>
.transition,
.autocomplete,
.showAll-transition,
.autocomplete ul,
.autocomplete ul li a {
    transition: all 0.3s ease-out;
    -moz-transition: all 0.3s ease-out;
    -webkit-transition: all 0.3s ease-out;
    -o-transition: all 0.3s ease-out;
}

.autocomplete ul {
    font-family: sans-serif;
    position: absolute;
    list-style: none;
    background: #454d55;
    padding: 10px 0;
    margin: 0;
    display: inline-block;
    min-width: 15%;
    margin-top: 10px;
    z-index: 100;
}

.autocomplete ul:before {
    content: "";
    display: block;
    position: absolute;
    height: 0;
    width: 0;
    border: 10px solid transparent;
    border-bottom: 10px solid #f8f8f8;
    left: 46%;
    top: -20px
}

.autocomplete ul li a {
    text-decoration: none;
    display: block;
    background: #454d55;
    color: #2b2b2b;
    padding: 5px;
    padding-left: 10px;
}

.autocomplete ul li a:hover,
.autocomplete ul li.focus-list a {
    color: white;
    background: #343a40;
}

.autocomplete ul li a span {
    display: block;
    margin-top: 3px;
    color: grey;
    font-size: 13px;
}

.autocomplete ul li a:hover span,
.autocomplete ul li.focus-list a span {
    color: white;
}

.showAll-transition {
    opacity: 1;
    height: 50px;
    overflow: hidden;
}

.showAll-enter {
    opacity: 0.3;
    height: 0;
}

.showAll-leave {
    display: none;
}

.form-wrapper {
    width: 100%;
}
</style>
