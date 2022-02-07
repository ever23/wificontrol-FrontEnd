<template>
<tr v-if="!eliminado">
    <td>{{ equipo.nombre }}</td>
    <td>
        <div @click="activarFormTiempo">{{ tiempoEquipo }}</div>
        <div v-if="formTiempo">
            <input type="range" v-model="tiempoFloat" class="custom-range" @input="calcularTiempo" @change="actualizarTiempo" step="0.5" max="5" min="0">
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
        {{ equipo.fecha }}
    </td>
    <td >
    <div class="btn-group">
        
        <button class="btn btn-primary btn-sm" type="button" v-if="formPago" @click="actualizarPago"><i class="fa fa-edit"></i></button>
        <button class="btn btn-primary btn-sm" type="button" @click="eliminar"><i class="fa fa-trash"></i></button>
</div>
    </td>

</tr>
</template>

<script>
import axios from 'axios'
import itemEquipo from './item-equipo.vue'
export default {
    name: 'item-equipo-ls',
    mixins:[itemEquipo],
   
  

}
</script>

<style>

</style>
