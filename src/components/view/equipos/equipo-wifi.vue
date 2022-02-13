<template>
<div>
   <i class="fa fa-arrow-up" ></i> {{ subida }} <i class="fa fa-arrow-down" ></i>{{ bajada }}
</div>
</template>

<script>
import itemWifi from '../red/item.vue'
export default {
    name: 'equipo-wifi',
    mixins: [itemWifi]
}
</script>
