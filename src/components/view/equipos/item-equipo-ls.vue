<template>
<tr v-if="!eliminado">
    <td @click="go">{{ equipo.nombre }}</td>
    <td  @click="go">
        <div >{{ tiempoEquipo }}</div>
        
    </td>
    <td @click="go">{{ equipo.costo }}</td>
    <td @click="activarFormPago" class="d-none d-md-none d-lg-table-cell">
        <div v-if="!formPago">{{ equipo.tPago }}</div>
        <div v-if="formPago">
            <select class="form-control" v-model="equipo.tPago">
                <option>Pagomovil</option>
                <option>Efectivo</option>
            </select>
        </div>
    </td>
    <td @click="activarFormPago" class="d-none d-md-none d-lg-table-cell">
        <div v-if="!formPago">{{ equipo.referencia }}</div>
        <div v-if="formPago">
            <input type="text" class="form-control" v-model="equipo.referencia">
        </div>
    </td>
    
    <td class="d-none d-md-none d-lg-table-cell">{{ equipo.apertura }}</td>
    <td class="d-none d-md-none d-lg-table-cell">{{ equipo.cierre }}</td>
    <td class="d-none d-md-none d-lg-table-cell">
        {{ equipo.fecha }}
    </td>
    <td >
    <div class="btn-group">
        
        <button class="btn btn-primary btn-sm" type="button" v-if="formPago" @click="actualizarPago"><i class="fa fa-edit"></i></button>
        <button class="btn btn-primary btn-sm" type="button" v-if="isRoot()" @click="eliminar"><i class="fa fa-trash"></i></button>
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

<style scoped>
td {
    cursor: pointer;
}
</style>
