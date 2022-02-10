<template>
<nav :class="main_class">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
        <li class="nav-item">
            <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
        </li>

    </ul>

    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">
        <!-- Navbar Search -->
        <li class="nav-item">
            <a class="nav-link" data-widget="navbar-search" href="#" role="button">
                <i class="fas fa-search"></i>
            </a>
            <div class="navbar-search-block">
                <form class="form-inline">
                    <div class="input-group input-group-sm">
                        <input class="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search">
                        <div class="input-group-append">
                            <button class="btn btn-navbar" type="submit">
                                <i class="fas fa-search"></i>
                            </button>
                            <button class="btn btn-navbar" type="button" data-widget="navbar-search">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </li>
        <!-- time -->
        <li class="nav-item">
            <i :class="['fa', RelogArena]"></i>
            <i class=" datetime">{{ datetime }}</i>
        </li>
        <li class="nav-item dropdown">
            <dropdown-notificaciones></dropdown-notificaciones>
        </li>
        <li class="nav-item dropdown">
            <a class="nav-link" href="#" data-toggle="dropdown" aria-label="Open Profile Menu">
                <i class="fa fa-user fa-lg"></i>
            </a>

            <ul class="dropdown-menu settings-menu dropdown-menu-right">

                <li>
                    <router-link class="dropdown-item" :to="{name:'settings'}">
                        <i class="fa fa-cog fa-lg"></i> Configuracion

                    </router-link>

                </li>
                <li>
                    <router-link class="dropdown-item" :to="{name:'usuarios'}">
                        <i class="fa fa-users fa-lg"></i> Usuarios

                    </router-link>

                </li>

                <li>
                    <a class="dropdown-item" href="#" @click.prevent="LogOut">
                        <i class="fa fa-sign-out fa-lg"></i> Logout
                    </a>
                </li>
            </ul>
        </li>
        <li class="nav-item">
            <div class="custom-control custom-switch custom-switch-off custom-switch-on">
                <input type="checkbox" @change="activar_oscuro" v-model="modo" class="custom-control-input" id="customSwitch-modo-oscuro">
                <label class="custom-control-label" for="customSwitch-modo-oscuro"></label>
            </div>
        </li>

    </ul>
</nav>
<!-- Navbar-->
</template>

<script>
import axios from 'axios'
var CancelToken = axios.CancelToken;
var source = CancelToken.source();
import {
    meses
} from '@/assets/js/Date.js'
import {
    DateTime
} from 'luxon'
export default {
    name: 'header-menu',
    props: ['timeOnline'],
    data() {
        return {
            nombre: null,
            datetime: null,
            modo: false
        }
    },
    created() {
        this.modo = this.$store.getters.configuraciones.modo_oscuro
        setInterval(e => {
            let time = DateTime.now()
            time.setLocale('es')
            this.datetime = time.toFormat('dd ') + meses[Number(time.toFormat('L')) - 1] + time.toFormat(' yyyy HH:mm')
        }, 1000)
    },
    components: {},
    computed: {
        modo_oscuro() {
            this.modo = this.$store.getters.configuraciones.modo_oscuro
            return this.$store.getters.configuraciones.modo_oscuro
        },
        main_class() {
            if (this.$store.getters.configuraciones.modo_oscuro) {
                return 'main-header navbar navbar-expand navbar-dark';
            } else {
                return 'main-header navbar navbar-expand navbar-white';
            }

        },

        User() {
            return this.$store.getters.User;
        },
        RelogArena() {

            if (this.timeOnline > 240)
                return 'fa-hourglass-end';
            if (this.timeOnline > 200)
                return 'fa-hourglass-3';
            if (this.timeOnline > 150)
                return 'fa-hourglass-2';
            if (this.timeOnline > 100)
                return 'fa-hourglass-1';
            if (this.timeOnline > 50)
                return 'fa-hourglass-1';
            return 'fa-hourglass-start';
        }
    },
    methods: {
        activar_oscuro() {
            this.$store.dispatch('cambiar_modo')
        },
        sidebar() {
            this.$emit('sidebar');
        },

        recargar() {
            window.location.reload();
        },
        retroceder() {
            this.$router.go(-1);

        },
        LogOut() {

            swal.fire({
                title: "cerrar sesion?",
                text: "Deseas finalizar la sesion actual !",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: 'Sesion finalisada!',
                confirmButtonText: "si, Cerar!",
                cancelButtonText: "No",
                closeOnConfirm: true,
                closeOnCancel: true
            }).then(result => {
                if (result.isConfirmed) {
                    source.cancel()
                    this.$store.dispatch('LogOut').then(data => {
                        this.$router.push({
                            name: 'login'
                        });
                    });

                }
            })
        }
    }
}
</script>

<style>
@media (max-width: 510px) {
    .datetime {
        display: none;
    }
}
</style>
