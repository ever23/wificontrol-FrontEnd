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
                        <th>tiempo</th>
                        <th>Costo</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>
                            <div>{{ tiempoEquipo }}</div>

                        </th>
                        <th>{{ equipo.costo }}</th>
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

                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td c>{{ equipo.apertura }}</td>
                        <td>{{ equipo.cierre }}</td>

                    </tr>
                </tbody>
            </table>
        </div>
        <div class="card btn-group">

            <button type="submit" class="btn btn-danger btn-md" v-if="equipo.cierre=='Indefinido'" @click="cerrar">
                <b> Cerrar </b>
            </button>
            <button type="submit" class="btn btn-primary btn-md" @click="pagomovil">
                <b> Pagomovil</b>
            </button>

        </div>
    </div>

    <!-- /.card-body -->
    <div class="card-footer clearfix">
       

    </div>
</div>
<!-- /.card -->
</template>

<script>
import axios from 'axios'
import itemEquipo from '../equipos/item-equipo.vue'
import {
    DateTime
} from 'luxon'

export default {
    name: 'item-equipo-login',
    mixins: [itemEquipo],
    data() {
        return {
            relog: '',
            intervalRelog: null,
            equipos: [],
            deuda: 0,
            equipos: []
        }
    },
    mounted() {
        axios.get('/api/equipos/pendientes?id_cliente=' + this.equipo.id_cliente)
            .then(result => {

                this.equipos = result.data;
            }).catch(AxiosCatch)
    },
    created() {

        this.equipo = this.item;
        clearInterval(this.intervalRelog)
         clearInterval(this.intervalIndefinido)
        if (this.equipo.cierre !== "Indefinido") {

            this.progress = this.calcularProgreso(this.equipo.tiempo, this.equipo.cierre)

            if (this.equipo.activo) {
                this.progreso(this.equipo.tiempo, this.equipo.cierre)
            }
            this.intervalRelog = setInterval(() => {

                let time = DateTime.fromFormat(this.equipo.cierre, 'HH:mm')
                let time2 = DateTime.now()
                this.relog = time2.diff(time).toFormat("hh:mm:ss").replaceAll('-', '')

            }, 1000)
        } else {

            this.intervalIndefinido = setInterval(() => {
                this.tiempoIndefinido = this.tiempoActivo()
                this.equipo.costo = (this.horaFloat(this.tiempoIndefinido) *this.$store.getters.configuraciones.costo_hora).toLocaleString('en')
            }, 1000)
        }

    },
    destroyed() {
        clearInterval(this.intervalRelog)
    },
    watch: {
        // cada vez que equipo cambie, esta función será ejecutada
        equipo: function (newEquipo, oldEquipo) {
            if (!newEquipo.activo) {
                this.$emit("update");
            }
        },
        equipos: function (newEquipos, oldEquipos) {
            let deuda = 0
            for (let equipo of newEquipos) {
                deuda += equipo.costo
            }
            this.deuda = deuda + this.equipo.costo
        }
    },
    computed: {
        tiempoEquipo() {
            if (this.equipo.cierre == 'Indefinido') {
                return this.tiempoIndefinido
            } else {

                return this.relog

            }
        }
    },
    methods: {
        pagomovil() {
            let monto = new Intl.NumberFormat('es-ES', {
                minimumFractionDigits: 2
            }).format(this.deuda);
            // monto = this.equipo.costo
            let banco =this.$store.getters.configuraciones.banco
            let telefono =this.$store.getters.configuraciones.telefono
            let cedula =this.$store.getters.configuraciones.cedula

            let texto = 'PAGAR '+banco+' '+telefono+' '+cedula+' ' + monto

            Swal.fire(
                'Copiado!',
                texto,
                'success'
            )
            try {
                navigator.clipboard.writeText(texto)
            } catch (e) {

            }

        }

    }
}
</script>

<style>
#py-modal {
    position: sticky !important;
}

.swal2-html-container {

    color: #000 !important;

}
</style>
