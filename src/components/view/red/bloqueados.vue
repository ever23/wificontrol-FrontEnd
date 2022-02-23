<template>
<main class="app-content">
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0"> <i :class="['fa','fa-line-chart']"></i> Bloqueados </h1>
                </div><!-- /.col -->
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="#">Home</a></li>

                    </ol>
                </div><!-- /.col -->
            </div><!-- /.row -->
        </div><!-- /.container-fluid -->
    </div>

    </div>
     <div class="row  justify-content-center">
            
             <div class="col-lg-8 col-sm-12">
                <wifi-equipos :wifi="bloqueados" titulo="Bloqueados "></wifi-equipos>
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
export default {
    filters: filter,
    components: {
        wifiEquipos
    },
    name: 'bloqueados',
    data() {
        return {
           
            bloqueados: [],
          
        }
    },
    created() {
       
        this.sockets.subscribe('equipos', (data) => {
            this.bloqueados = data.filter(e => e.bloqueado)

        });
         
        
         
       
    },
     destroyed() {
        this.sockets.unsubscribe("equipos");

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
