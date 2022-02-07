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

    <div class="row">
        <div class="col-lg-3 col-6">
            <!-- small box -->
            <div class="small-box bg-info">
                <div class="inner">
                    <h3>Red</h3>

                    <p>{{ redPublica.red}}</p>
                </div>
                <div class="icon">
                    <i class="ion ion-bag"></i>
                </div>
            </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-6">
            <!-- small box -->
            <div class="small-box bg-success">
                <div class="inner">
                    <h3> Contraseña</h3>

                    <p>{{redPublica.password}}</p>
                </div>
                <div class="icon">
                    <i class="ion ion-stats-bars"></i>
                </div>
            </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-6">
            <!-- small box -->
            <div class="small-box bg-warning">
                <div class="inner">
                    <h3>Subida</h3>

                    <p> {{redPublica.UploadSpeed}}</p>
                </div>
                <div class="icon">
                    <i class="ion ion-person-add"></i>
                </div>
            </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-6">
            <!-- small box -->
            <div class="small-box bg-danger">
                <div class="inner">
                    <h3>Bajada</h3>

                    <p> {{redPublica.DownloadSpeed}}</p>
                </div>
                <div class="icon">
                    <i class="ion ion-pie-graph"></i>
                </div>
            </div>
        </div>
        <!-- ./col -->
    </div>

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
export default {
    filters: filter,
    components: {
        wifiEquipos
    },
    name: 'invitados',
    data() {
        return {
           
            invitados: [],
            redPublica: {}
        }
    },
    created() {
        this.$socket.emit('informacionInvitados',e=>{
            this.redPublica = e
        })
        this.sockets.subscribe('equipos', (data) => {
            this.invitados = data

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
