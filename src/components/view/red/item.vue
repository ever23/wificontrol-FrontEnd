<template>
<tr >
    <td>{{ item.nombre }}</td>
    <td class="d-none d-md-none d-lg-table-cell">{{ item.ip }}</td>
    <td class="d-none d-md-none d-lg-table-cell">{{ item.mac }}</td>
    <td>{{ subida }}</td>
    <td>{{ bajada }}</td>
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
        subida(){
            
            return this.calcularDatos(this.item.up)
        },
        bajada(){
            return this.calcularDatos(this.item.down)
        }

    },
    methods: {
        calcularDatos(datos){
            let numberFormat = new Intl.NumberFormat('en-EN', {
                minimumFractionDigits: 1,
                maximumFractionDigits: 1
            })
            if(datos<1000){
                return datos+" B/s"
            }else {
                return  numberFormat.format(datos/1000)+" KB/s"
            }
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
