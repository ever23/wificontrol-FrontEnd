<template>
	<main class="wrapper">
		<app-title title="Configuracion" icon="cog"></app-title>
		 
      <div class="row user">
       
        <div class="col-md-3">
          <div class="tile p-0">
            <ul class="nav flex-column nav-tabs user-tabs">
             
              <li class="nav-item">
              	<router-link :class="['nav-link',active.settings]" :to="{name:'settings'}" >
              		Configuracion
              	</router-link>    
              </li>
               <li class="nav-item" >
                <router-link :class="['nav-link',active.usuarios]" :to="{name:'usuarios'}" >
                  Usuarios
                </router-link>     
              </li>
              
            </ul>
          </div>
        </div>
        <div class="col-md-8">
        
          	<section class="content">
          		 <router-view ></router-view>
          	</section>
          
        </div>
      </div>
    
	</main>
</template>
<script>
	export default
	{
		name:'profileLayaut',
		data()
		{
			return {
        active:
        {
          settings:null,perfil:null,usuarios:null,sessiones:null
        }
      }
		},
    created()
    {
      this.active[this.$route.name]='active';
    },
     computed:
        {
            User()
            {
                return this.$store.getters.User;
            }
        },
		watch: 
		{
	      	'$route' (to, from) 
	      	{
            for(let i in this.active)
            {
              this.active[i]=null;
            }
            this.active[to.name]='active';
	          //console.log(to);
	        
	      	}
    	},
	}
</script>