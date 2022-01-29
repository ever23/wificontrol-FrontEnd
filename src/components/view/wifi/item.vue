<template>
<tr>
    <td>{{ item.nombre }}</td>
    <td>{{ item.ip }}</td>
    <td>{{ item.mac }}</td>
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

    },
    methods: {
        bloquear(e) {
            Swal.fire({
                title: 'Seguro que desea bloquear el equipo? ',
                showDenyButton: true,
                confirmButtonText: 'si'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$socket.emit('bloquear', this.item.ip)
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
