<template>
<tr>
    <td>
        {{ item.nombre }}
    </td>
    <td class="d-none d-md-none d-lg-table-cell">{{ item.ip }}</td>
    <td class="d-none d-md-none d-lg-table-cell">{{ item.mac }}</td>
    <td><span class="trafic"><i class="fa fa-arrow-up"></i>{{ subida }}</span></td>

    <td> <span class="trafic"> <i class="fa fa-arrow-down"></i>{{ bajada }}</span></td>
    <td>
        <div class="btn-group">
            <button class="btn btn-primary btn-sm" type="button" v-if="item.bloqueado" @click="desbloquear"><i class="fa fa-lock"></i></button>
            <button class="btn btn-primary btn-sm" type="button" v-if="!item.bloqueado" @click="bloquear"><i class="fa fa-lock-open"></i></button>
        </div>
    </td>

</tr>
</template>

<script>
import axios from 'axios'

import calcularTraferencia from '@/assets/js/calcularTrasferencia.js'
export default {

    props: {
        item: {
            type: Object,
            required: true
        }
    },
    name: 'wifi-item',
    data() {
        return {

        }
    },
    created() {

    },
    mounted() {

    },
    computed: {
        subida() {

            return calcularTraferencia(this.item.up)
        },
        bajada() {
            return calcularTraferencia(this.item.down)
        }

    },
    methods: {
        calcularDatos(data) {
            return calcularTraferencia(data)
        },
        bloquear(e) {
            Swal.fire({
                title: 'Seguro que desea bloquear el equipo? ',
                showDenyButton: true,
                confirmButtonText: 'si'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$socket.emit('bloquear', this.item.mac)
                }
            })
        },
        desbloquear() {
            Swal.fire({
                title: 'Seguro que desea desbloquear el equipo? ',
                showDenyButton: true,
                confirmButtonText: 'si'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$socket.emit('desbloquear', this.item.mac)

                }
            })
        }

    }
}
</script>
