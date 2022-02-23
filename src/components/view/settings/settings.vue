<template>
<div>
    <h3> Configuracion</h3>
    <formulario :error="errores" @submit.prevent="editar">
        <div class="form-group">
            <label class="control-label">Url de acceso al router Mercusys</label>
            <input class="form-control" v-model="config.url_router" name="url_router" type="url" placeholder="url">
        </div>
        <div class="form-group">
            <label class="control-label">Contrasena de acesso al router</label>
            <input class="form-control" v-model="config.pass_router" name="pass_router" type="text" placeholder="Contraseña">
        </div>
        <div class="form-group">
            <label class="control-label">Precio por hora </label>
            <input class="form-control" v-model="config.costo_hora" name="costo_hora" type="text" placeholder="Hora">
        </div>

        <div class="form-group">
            <label class="control-label">Cedula </label>
            <input class="form-control" v-model="config.cedula" name="cedula" type="text" placeholder="Cedula">
        </div>
        <div class="form-group">
            <label class="control-label">Banco </label>
            <input class="form-control" v-model="config.banco" name="banco" type="text" placeholder="Banco">
        </div>
        <div class="form-group">
            <label class="control-label">Telefono </label>
            <input class="form-control" v-model="config.telefono" name="telefono" type="tel" placeholder="Telefono">
        </div>
        <div class="form-group">
            <label class="control-label">Unidad </label>
            <select class="form-control" v-model="unidad">
                <option value="0">Byte B/s</option>
                <option value="1024">Kilobyte KB/s</option>
                <option value="1000000">Megabyte MB/s</option>
            </select>
        </div>
        <div class="form-group">
            <label class="control-label">Limite de subida individual </label>
            <input class="form-control" v-model="uplimit" name="telefono" type="number">
        </div>
        <div class="form-group">
            <label class="control-label">Limite de bajada individual </label>
            <input class="form-control" v-model="downlimit" name="telefono" type="number">
        </div>
        <div class="form-group">
            <button class="btn btn-primary" type="submit">
                <i class="fa fa-fw fa-lg fa-check-circle"></i>Guardar
            </button>

        </div>
    </formulario>
</div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'settings',
    data() {
        return {
            config: {
                url_router: '',
                pass_router: '',
                costo_hora: '',
                modo_oscuro: false,
                cedula: '',
                banco: '',
                telefono: '',
                uplimit: '',
                downlimit: ''
            },
            errores: {},
            uplimit: '',
            downlimit: '',
            unidad: 0
        }
    },
    created() {
        this.config = this.$store.getters.configuraciones
        this.uplimit = this.config.uplimit
        this.downlimit = this.config.downlimit
    },
    watch: {
        // cada vez que equipo eliminado, esta función será ejecutada
        unidad: function (value) {
            if (value == 0) {
                this.uplimit = this.config.uplimit
                this.downlimit = this.config.downlimit
            } else {
                this.uplimit = this.config.uplimit / value
                this.downlimit = this.config.downlimit / value
            }

        },

    },
    methods: {

        editar() {
            if (this.unidad == 0) {
                this.config.uplimit = this.uplimit
                this.config.downlimit = this.downlimit
            } else {
                this.config.uplimit = this.uplimit * this.unidad
                this.config.downlimit = this.downlimit * this.unidad
            }

            axios.put('/api/configuraciones', this.config).
            then((request) => {
                if (request.data.ok) {
                    Swal.fire('Listo!', '', 'success')
                    this.$store.dispatch('fetchConfiguraciones')

                } else {

                    AxiosCatch(request.data.error)
                }
            }).catch(AxiosCatch);
        }
    }

}
</script>
