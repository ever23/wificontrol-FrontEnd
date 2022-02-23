<template>
<div>
    <span class="badge badge-success trafic"><i class="fa fa-arrow-up"></i>{{ subida }}</span><br>
    <span class="badge badge-success trafic"> <i class="fa fa-arrow-down"></i>{{ bajada }}</span>
</div>
</template>

<script>
import itemWifi from '../red/item.vue'
export default {
    name: 'equipo-wifi',
    mixins: [itemWifi]
}
</script>
