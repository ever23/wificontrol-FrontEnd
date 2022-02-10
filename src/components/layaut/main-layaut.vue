<template>
<div :class="main_class">
    <div class="wrapper">
        <header-menu @sidebar="sidebar" :timeOnline="time_online"></header-menu>
        <div class="app-sidebar__overlay" @click.prevent="sidebar"></div>
        <aside-menu></aside-menu>
        <div class="content-wrapper">
            <transition name="ease-in-out" mode="out-in" duration="2s">
                <router-view></router-view>
            </transition>
        </div>

    </div>
</div>
</template>

<script>
import notify from '@/assets/js/notify.js'
import axios from 'axios'
export default {
    name: 'main-layaut',

    data() {
        return {
            transitionName: 'ease-in-out',
            sidebar_toggle: '',
            time_online: 0,
            interval:null
        }
    },
  computed: {

        main_class() {
            if (this.$store.getters.configuraciones.modo_oscuro) {
                return 'hold-transition dark-mode sidebar-mini layout-fixed layout-navbar-fixed layout-footer-fixed';
            } else {
                return 'hold-transition  sidebar-mini layout-fixed layout-navbar-fixed layout-footer-fixed';
            }

        }
    },
    methods: {
        sidebar() {
            this.sidebar_toggle = this.sidebar_toggle == '' ? 'sidenav-toggled' : '';
        }
    },
    created() {
       // this.interval =  setInterval(()=>this.time_online++,1000);
       /* Swal.fire({
            title: 'Inserte el ID del administrador MERCUSYS',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            showLoaderOnConfirm: true,
            preConfirm: (id) => {
                axios.get(`/api/equipos/router?id=${id}`)
                    .then(response => {
                     console.log(response)
                    })
                    .catch(error => {
                        Swal.showValidationMessage(
                            `Request failed: ${error}`
                        )
                    })
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: `${result.value.login}'s avatar`,
                    imageUrl: result.value.avatar_url
                })
            }
        })*/

    },
    destroyed(){
        clearInterval(this.interval)
    },

    watch: {
        time_online() {
            if (this.time_online == 240) {
                //  setTimeout(()=>new Audio('/polleras/static/audio/beep.mp3').play(), 0);
                notify({
                    title: "Alerta de inactividad: ",
                    message: "<br>En 1 min sera bloqueada la sesion por inactividad",
                    icon: 'fa fa-warning'
                }, {
                    type: "warning"
                });
            }
            if (this.time_online == 270) {
                // setTimeout(()=>new Audio('/polleras/static/audio/beep.mp3').play(), 0);
                notify({
                    title: "Alerta de inactividad: ",
                    message: "<br>En 30 segundos sera bloqueada la sesion por inactividad",
                    icon: 'fa fa-warning'
                }, {
                    type: "danger"
                });
            }
            if (this.time_online == 300) {
                let user = this.$store.getters.User;
                this.$store.dispatch('LogOut').then(data => {
                    this.$router.push({
                        name: 'LockScreen',
                        params: {
                            redirect: this.$route.fullPath,
                            usuario: user
                        }
                    });
                });

            }
        },
        '$route'(to, from) {
            this.time_online = 0;
            if (window.outerWidth <= 768) {
                this.sidebar_toggle = '';
            }
            // return;
            const toDepth = to.path.split('/').length
            const fromDepth = from.path.split('/').length
            this.transitionName = toDepth < fromDepth ? 'slide-left' : 'slide-right'

        }
    },

}
</script>

<style>
.leaveClass {
    transition: margin-left 3s cubic-bezier(0.4, 0, 1, 1);

}

.enterClass {
    transition: ease-in-out;
}
</style>
