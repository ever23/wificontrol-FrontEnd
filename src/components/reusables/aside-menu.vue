<template>
<aside :class="main_class">
    <a href="#" class="brand-link">
        <img src="/static/img/wifi.jpg" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: .8">
        <span class="brand-text font-weight-light">Control Wifi</span>
    </a>
    <div class="sidebar ">

        <treeview-menu :menu="menu">
        </treeview-menu>
        
    </div>
</aside>
</template>

<script>
import vuex from 'vuex';
import MenuRoot from '@/assets/menu.js'
// import MenuAdmin from '@/assets/menu-admin.js'
export default {
    name: 'aside-menu',
    data() {
        return {
            menu: null
        }
    },
    components: {},
    created() {
        this.menu = MenuRoot;
    },
    computed: {
        main_class() {
            if (this.$store.getters.configuraciones.modo_oscuro) {
                return 'main-sidebar sidebar-dark-primary elevation-4';
            } else {
                return 'main-sidebar sidebar-dark-primary elevation-4';
            }

        },
        User() {
            return this.$store.getters.User;
        },
        imagen() {
            //console.log(this.$store.getters.settings)
            return this.$store.getters.settings.imagen;
        }
    }
}
</script>

<style>
.sidebar {
    position: fixed;
}
</style>
