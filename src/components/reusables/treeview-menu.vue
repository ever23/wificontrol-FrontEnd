
<template>

    <nav class="mt-2">
  <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
    <treeview
        v-for="item in AppMenu"
        :key="item.key"
        :title="item.title"
        :to="item.to"
        :icon="item.icon"
        :menu="item.menu"
        :expanded="item.expanded"
        @treeview="treeview(item)"
        >
      </treeview>
  </ul>
</nav>
</template>

<script>
import treeview from './treeview.vue'
    export default {
        name :'treeview-menu',
        components:{treeview},
        props:{
           menu:{type:Array,required:true}
        },
       data () {
           return { AppMenu:[]}
        },
        created()
        {
          this.AppMenu=this.menu;

        },
        methods:
        {
          treeview(item)
          {
            if(item.expanded=='')
              for(let i of this.AppMenu)
              i.expanded='';
            item.expanded=item.expanded==''?'is-expanded':'';

           //console.log(this.AppMenu)

          }
        },




    }
</script>

<style>

</style>
