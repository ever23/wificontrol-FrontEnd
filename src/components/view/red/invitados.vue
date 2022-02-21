<template>
<main class="app-content">
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0"> <i :class="['fa','fa-line-chart']"></i> Red </h1>
                </div><!-- /.col -->
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="#">Home</a></li>

                    </ol>
                </div><!-- /.col -->
            </div><!-- /.row -->
        </div><!-- /.container-fluid -->
    </div>

    <red-invitados ></red-invitados>

    </div>
     <div class="row  justify-content-center">
            
             <div class="col-lg-8 col-sm-12">
                <wifi-equipos :wifi="invitados" titulo="Red de alquiler"></wifi-equipos>
            </div>
        </div>
   
    
  

</main>
</template>

<script>
import axios from 'axios'
import {
    meses
} from '@/assets/js/Date.js'
import filter from '@/assets/js/UserVueFilter.js'
import {
    DateTime
} from 'luxon'
import wifiEquipos from './equipos.vue'
import red from './red-invitados.vue'
export default {
    filters: filter,
    components: {
        wifiEquipos,
        "red-invitados":red
    },
    name: 'invitados',
    data() {
        return {
           
            invitados: []
        }
    },
    created() {
      
        this.sockets.subscribe('equipos', (data) => {
            this.invitados = data.filter(e => e.type == "invitado" && !e.bloqueado)

        });
         
        
         
       
    },
    mounted() {
       
        //this.$store.commit('loading', true);

        //this.$('.select2').select2()
    },
    computed: {
        getEquipos() {
            return this.equipos;
        },

        settings() {
            return this.$store.getters.settings;
        }
    },
    methods: {
       
       
        

    }
}
</script>
