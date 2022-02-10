<template>
	<div>
		<h3> Configuracion</h3>
		<formulario :error="errores"   @submit.prevent="editar">
            <div class="form-group">
                <label class="control-label">Url de acceso al router Mercusys</label>
                <input class="form-control" v-model="config.url_router" name="url_router" type="url" placeholder="url">
            </div>
            <div class="form-group">
                <label class="control-label">Contrasena de acesso al router</label>
                <input class="form-control" v-model="config.pass_router" name="pass_router" type="text" placeholder="Contraseña">
            </div>
            <div class="form-group">
                <label class="control-label">Precio por hora </label>
                <input class="form-control" v-model="config.costo_hora" name="costo_hora" type="text" placeholder="Hora">
            </div>
           <div class="form-group">
	              <button class="btn btn-primary" type="submit">
	              	<i class="fa fa-fw fa-lg fa-check-circle"></i>Guardar
	              </button>
	                          
	         </div>
        </formulario>
  	</div>
</template>
<script>
import axios from 'axios'
	export default
	{
		name:'settings',
		data()
		{
			return {
				config:
				{
			        url_router:'', 
			        pass_router:'',
			        costo_hora:'',
			        modo_oscuro:false
				},
				errores:{},
				imagen:null
			}
		},
		created() 
		{
			this.config.url_router=this.$store.getters.configuraciones.url_router;
			this.config.pass_router=this.$store.getters.configuraciones.pass_router;
			this.config.costo_hora=this.$store.getters.configuraciones.costo_hora;
			this.config.modo_oscuro=this.$store.getters.configuraciones.modo_oscuro;
		},
		methods:
		{
		
			editar()
			{
				
				axios.put('/api/configuraciones',this.config).
				then((request)=>
				{
					if(request.data.ok)
					{
						Swal.fire('Listo!', '', 'success')
						this.$store.dispatch('fetchConfiguraciones')
					
					}else
					{
						
						AxiosCatch(request.data.error)
					}
				}).catch(AxiosCatch);
			}
		}
		
	}
</script>