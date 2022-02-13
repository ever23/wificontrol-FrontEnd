<template>
<main :class="main_class">
    <div class="login-box">

        <router-view></router-view>

    </div>
</main>
</template>

<script>
import axios from 'axios'
export default {
    name: 'login-layaut',
    data() {
        return {

        }
    },
    created() {

    },
    computed: {

        main_class() {
            if (this.$store.getters.configuraciones.modo_oscuro) {
                return 'hold-transition login-page dark-mode';
            } else {
                return 'hold-transition login-page';
            }

        }
    },
    filters: {
        uppercase(data) {
            return data && data.toUpperCase();
        }
    }

}
</script>

<style>
.logo {
    margin-right: 20px;
    margin-right: 20px;
}
</style>
