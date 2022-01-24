<template>
<tr>
    <td>
        <autocomplete :url="api" :onShouldGetData="bucarCliente" anchor="nombre" label="writer" :classes="{ wrapper: 'form-wrapper', input: 'form-control', list: 'data-list', item: 'data-list-item' }" :on-select="getData" :onInput="d=>newEquipo.nombre=d">
        </autocomplete>
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
import registro from './registro.vue'
export default {

    name: 'registro-equipo-tr',
    mixins: [registro]/*,
    created() {

        this.api = axios.defaults.baseURL + '/api/clientes/busqueda'
         this.tiempo(this.newEquipo)
            setInterval(() => this.tiempo(this.newEquipo), 10000)

        //this.$('.select2').select2()
    }*/

}
</script>
