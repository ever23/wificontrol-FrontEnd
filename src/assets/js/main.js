
import store from '@/store'
import notify from './notify.js'
window.AxiosCatch=function(data)
	{
		store.commit('loading',false);
		if(typeof data =='object')
		{
			//console.log(data);
			if(typeof data.config == 'object')
			{
				//console.log(data['XMLHttpRequest']);
				if(data.response)
				{
					//console.log(data.response)
					notify({title: "Http Status "+data.response.status+": "+data.response.data?data.response.data.error:statusText,icon: 'error'},{type: "error"});
		
				}else
				{
					notify({title: data,icon: 'error'},{type: "error"});
				}
			}else
			{
				for(let i in data)
				{
					//console.log(i,data[i]);
					notify({title: "Error: "+data[i],icon: 'error'},{type: "error"});
				}
			}
			
		}else
		{
			notify({title: "Error: "+data,icon: 'error'},{type: "error"});
		}
		
	}
 

