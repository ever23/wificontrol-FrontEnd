<template>
     <aside class="main-sidebar sidebar-dark-primary elevation-4">
       <a href="#" class="brand-link">
       <img src="/static/dist/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: .8">
       <span class="brand-text font-weight-light">Control Wifi</span>
     </a>
      <div class="sidebar">
     

     <!-- SidebarSearch Form -->
     <div class="form-inline">
       <div class="input-group" data-widget="sidebar-search">
         <input class="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search">
         <div class="input-group-append">
           <button class="btn btn-sidebar">
             <i class="fas fa-search fa-fw"></i>
           </button>
         </div>
       </div>
     </div>
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
        name:'aside-menu',
        data () {
            return {
              menu:null
            }
        },
        components: {
        },
        created()
        {
           this.menu=MenuRoot;
        },
        computed:
        {
            User()
            {
                return this.$store.getters.User;
            },
            imagen()
            {
              //console.log(this.$store.getters.settings)
              return this.$store.getters.settings.imagen;
            }
        }
    }
</script>

<style>

</style>
