<template>
<!-- /.login-logo -->
<div class="card card-outline card-primary">
    <div class="card-header text-center">
        <h1><b> {{ equipo.nombre }}</b></h1>
    </div>
    <div class="card-body">
        <formulario>
            <div class="input-group mb-3 justify-content-center">
                <div class="form-group ">
                    <h3>{{ tiempoEquipo }}</h3>
                </div>
            </div>
            <i class="fa fa-check-circle" v-if="!equipo.activo"></i>
            <div class="progress progress-sm active" v-else>
                <div class="progress-bar bg-success progress-bar-striped" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" :style="'width: '+progress+'%'">
                </div>
            </div>
            <div class="input-group mb-3 row">

                <div class="form-group  col-md-4">
                    {{ equipo.tPago }}

                </div>

                <div class="  col-md-4"> {{ equipo.referencia }}</div>

                <h5 class=" col-md-4">{{ equipo.costo }} Bs</h5>

            </div>
            <div class="btn-group">

                <button type="submit" class="btn btn-danger btn-md" v-if="equipo.cierre=='Indefinido'" @click="cerrar">
                    <b> Cerrar </b>
                </button>
                <button type="submit" class="btn btn-primary btn-md" @click="pagomovil">
                    <b> Pagomovil</b>
                </button>

            </div>
        </formulario>
    </div>

    <!-- /.card-body -->
    <div class="card-footer clearfix">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title ">Pagos Pendientes</h3>
                <h4><span class="badge badge-danger  float-right">Total: {{ deuda }} bs</span></h4>
            </div>
            <!-- /.card-header -->
            <div class="card-body table-responsive p-0" style="height: 150px;">
                <table class="table table-sm table-head-fixed text-nowrap">
                    <thead>
                        <tr>
                            <th>tiempo</th>
                            <th>Costo</th>
                            <th>Hora</th>
                            <th>Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in equipos" :key="item.id_equipo">
                            <th> {{ item.tiempo }} </th>
                            <th>{{ item.costo }}</th>
                            <th>{{ item.apertura }}</th>
                            <th>{{ item.fecha }}</th>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- /.card-body -->
        </div>

    </div>
</div>
<!-- /.card -->
</template>

<script>
import axios from 'axios'
import itemEquipo from './item-equipo.vue'
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
                this.equipo.costo = (this.horaFloat(this.tiempoIndefinido) * this.costoHora).toLocaleString('en')
            }, 1000)
        }

    },
    destroyed() {
        clearInterval(this.intervalIndefinido)
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
            if (this.equipo.tiempo == 'Indefinido') {
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
            let texto = 'PAGAR 0102 04266023263 23781625 ' + monto

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
