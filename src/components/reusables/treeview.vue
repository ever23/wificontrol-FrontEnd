<template>
<li :class="navItem">
    <a class="nav-link" href="#" @click.prevent="treeview" data-toggle='treeview'>
        <i :class="'nav-icon  fa '+icon"></i>
        <p>
            {{ title }}
            <i class="fas fa-angle-left right"></i>

        </p>

        <i class="treeview-indicator fa fa-angle-right" v-if="to==undefined"></i>
    </a>

    <ul class="nav nav-treeview">
        <li v-for="item in menu" class="nav-item">
            <router-link class="treeview-item nav-link" v-if="typeof item.to=='object'" :to="item.to">&nbsp;&nbsp;
                <i :class="['icon', 'fa', item.icon]"></i> {{ item.name }}
            </router-link>
            <router-link class="treeview-item nav-link" v-if="typeof item.to!='object'" :to="{name:item.to}">&nbsp;&nbsp;
                <i :class="['icon', 'fa', item.icon]"></i> {{ item.name }}
            </router-link>
        </li>

    </ul>
</li>
</template>

<script>
export default {
    name: 'treeview',

    props: {
        icon: {
            type: String
        },
        to: {},
        title: {
            type: String,
            required: true
        },
        menu: {},
        expanded: {}
    },
    data() {
        return {
            treeview_class: 'treeview',
            link: {
                name: null
            },
            navItem: ['nav-item'],
            activo: false
        };
    },
    created() {
        ///console.log()
        if (this.to == undefined) {
            this.treeview_class = 'treeview';
            let m = this.menu.find(m => m.to == this.$route.name);
            if (m !== undefined)
                this.treeview();
        } else {
            if (typeof this.to == 'object') {
                this.link = this.to;
            } else {
                this.link = {
                    name: this.to
                };
            }
            if (this.$route.name == this.to)
                this.treeview();
        }
        if (this.espanded != "") {
            this.activo = true
        }

    },

    methods: {
        treeview() {
            this.activo = !this.activo
            if (this.activo) {
                this.navItem = ['nav-item', 'menu-is-opening', 'menu-open']
            } else {
                this.navItem = ['nav-item']
            }

            this.$emit('treeview');
            if (this.to !== undefined)
                this.$router.push({
                    name: this.to
                });
        }
    },
    mounted() {

    },

    computed: {

    },

}
</script>

<style>

</style>
