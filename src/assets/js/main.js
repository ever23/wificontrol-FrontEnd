
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
					notify({title: "Http Status "+data.response.status+":",message: data.response.data?data.response.data.error:statusText,icon: 'fa fa-warning'},{type: "danger"});
		
				}else
				{
					notify({title: "",message: data,icon: 'warning'},{type: "danger"});
				}
			}else
			{
				for(let i in data)
				{
					//console.log(i,data[i]);
					notify({title: "Error: ",message: data[i],icon: 'warning'},{type: "danger"});
				}
			}
			
		}else
		{
			notify({title: "Error: ",message: data,icon: 'warning'},{type: "danger"});
		}
		
	}
 

