<template>
<div>
    <router-view @mounted="mounted"></router-view>
    <loader :active="loader"></loader>
</div>
</template>

<script>
export default {
    name: 'App',

    data() {
        return {
            transitionName: ''
        }
    },
    created() {
        this.sockets.subscribe('error-conexion', () => {
             Swal.fire({
                title: 'Error en conexion con el servidor',
                showDenyButton: false,
                confirmButtonText: 'Recargar',
                type:'error'
            }).then(result=>{
                if (result.isConfirmed) {
                   this.$router.go(0)
                }
            })

        });
        //  this.$store.dispatch('fetch').catch(AxiosCatch);
        //console.log(this.$createElement('div'))
    },
    watch: {
        '$route'(to, from) {
            //this.$store.commit('loaing',true);
        }
    },
    computed: {
        loader() {
            return this.$store.state.loader;
        }
    },
    methods: {
        mounted() {

        }
    }

}
</script>
