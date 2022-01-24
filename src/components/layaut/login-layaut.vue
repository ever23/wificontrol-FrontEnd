<template>
  <main class="hold-transition login-page dark-mode ">
    <div class="login-box">

          <router-view ></router-view>
        
    </div>
  </main>
</template>

<script>
  import axios from 'axios'
    export default {
        name:'login-layaut',
        components: {

        },
        data () {
            return {

            }
        },
        created()
        {

        },
        computed:
        {
            settings()
            {
              //  return this.$store.getters.settings;
            },
            nombre()
            {

                  //  return this.$store.getters.settings.nombre;

            }
        },
        filters:
        {
            uppercase(data)
            {
                return data && data.toUpperCase();
            }
        }

    }
</script>

<style scope>
   .logo
   {
    margin-right: 20px;
    margin-right: 20px;
   }
</style>
