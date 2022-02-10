<template>
<div>
    <a class="nav-link" data-toggle="dropdown" href="#">
        <i class="far fa-bell"></i>
        <span class="badge badge-warning navbar-badge" v-if="numero_notificaciones>0"> {{ numero_notificaciones }}</span>
    </a>
    <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
        <span class="dropdown-item dropdown-header" v-if="numero_notificaciones>0"> Tienes {{ numero_notificaciones }} notificaciones nuevas
            <button class="btn btn-sm btn-primary" type="button" @click="vaciar"><i class="fa fa-trash-alt"></i></button>

        </span>
        <span class="dropdown-item dropdown-header" v-else>No tienes notificaciones</span>
        <div v-for="(item, i) in notificaciones" :key="i">
            <div class="dropdown-divider"></div>
            <a :class="['dropdown-item',item.visto==1?'visto':'']" :href="ApiServer+item.href_notificacion" @click.prevent="notificacion(item)">

                <div>
                    <i class="fas fa-envelope mr-2"></i>
                    <p> {{ item.desc_notificacion }}</p>
                    <span class="float-right text-muted text-sm">{{ item.tiempo }}</span>
                </div>

            </a>
        </div>

    </div>
</div>
</template>

<script>
import axios from 'axios'
import 'push.js'
var CancelToken = axios.CancelToken;
var source = CancelToken.source();
import notify from '@/assets/js/notify.js'
import subscription from '@/assets/js/notificaciones.js'
import path from 'path'
const TIME_NOTIFICACION = 30000;
import {
    DateTime
} from 'luxon'
export default {
    name: 'dropdown-notificaciones',
    data() {
        return {
            notificaciones: [],
            interval: null

        }
    },
    destroyed() {

        clearInterval(this.interval)

    },
    created() {

        subscription()
        this.cargarNotificaciones()
        this.sockets.subscribe('notificacion', (data) => {
            notify({title: data.message,icon: 'info'})
            this.cargarNotificaciones()
        });

        this.interval = setInterval(() => this.notificaciones = this.tiempo(this.notificaciones), 10000);
    },
    computed: {
        numero_notificaciones() {
            let n = this.notificaciones.filter(not => {
                return not.visto == 0;
            })
            ///console.log(n);
            return n.length;
        },
        ApiServer() {
            return this.$store.getters.ApiServer
        }
    },

    methods: {
        cargarNotificaciones() {
            if (!this.$store.getters.IsUser)
                return;

            let data = '';
            if (this.notificaciones.length > 0) {
                data = '?fech_notificacion=' + this.notificaciones[0].fech_notificacion;
            }

            axios.get('/api/notificaciones/now' + data, {
                    cancelToken: source.token
                })
                .then(request => {
                    if (request.data.ok) {
                        this.updateNotification(request.data);
                    } else {
                        AxiosCatch(request.data.error);
                    }

                }).catch(d => {
                    AxiosCatch(d);
                    //  console.log(d,this.$store.IsUser)
                    //if(this.$store.getters.User.permisos!==null)

                });
        },
        vaciar() {
            axios.delete('/api/notificaciones').
            then(req => {
                this.updateNotification(req.data);
            }).catch(AxiosCatch);
        },
        tiempo(notificaciones) {

            for (var i in notificaciones) {
                notificaciones[i].tiempo = this.date(notificaciones[i].fech_notificacion);

            }
            return notificaciones;
            //console.log( this.notificaciones[i].tiempo)
        },
        date(d) {

            let not = new Date(d);
            let now = new Date();

            let timeNow = now.getTime() / 1000;
            let timeNot = not.getTime() / 1000;
            let time = timeNow - timeNot;

            if (timeNow - 60 < timeNot) {
                return 'Hace ' + parseInt(time) + ' segundos';
            }
            if (timeNow - 3600 < timeNot) {
                return 'Hace ' + parseInt((time) / 60) + ' Minuto' + (parseInt((time) / 60) > 1 ? 's' : '');
            }
            if (timeNow - (3600 * 24) < timeNot) {
                return 'Hace ' + parseInt((time) / 3600) + ' Hora' + (parseInt((time) / 3600) > 1 ? 's' : '');
            }
            if (timeNow - ((3600 * 24) * 7) < timeNot) {
                return 'Hace ' + parseInt((time) / (3600 * 24)) + ' Dia' + (parseInt((time) / (3600 * 24)) > 1 ? 's' : '');
            }

        },
        updateNotification(data) {

            this.notificaciones = this.tiempo(data.data);
            if (data.new)
                this.launchNotification(data.new)
        },
        notificacion(not) {
            let id_notificacion = not.id_notificacion;
            let data = '?id_notificacion=' + id_notificacion;

            if (this.notificaciones.length > 0) {
                data += '&fech_notificacion=' + this.notificaciones[0].fech_notificacion;
            } else {
                let time = DateTime.now()
                data += '&fech_notificacion=' + time.toFormat('yyyy/MM/dd H:mm:ss')
            }

            axios.get('/api/notificaciones' + data).
            then(req => {

                this.updateNotification(req.data);
                not.visto = true;
                this.$router.replace(path.join(this.$store.getters.ApiServer, not.href_notificacion));
            }).catch(AxiosCatch);
        }

    }
}
</script>

<style>
.app-notification__icon {
    z-index: 5;
}

.notificacion-n {
    position: absolute;
    top: 20px;
    left: 26px;
}

.dropdown-item.visto {
    color: inherit;
    text-decoration: none;
    background-color: rgb(224, 224, 224);
}
</style>
