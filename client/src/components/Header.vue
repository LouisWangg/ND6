<template>
    <v-card class="mb-8">
        <v-toolbar dense class="blue-grey" dark>
            <v-toolbar-title class="mr-2 ml-2 header">
                <span @click="navigateTo({name: 'root'})">ND6</span>
            </v-toolbar-title>
            <v-divider class="mx-4" color="white" inset vertical />
            <v-toolbar-title v-show="$route.name == 'masterProduct'" class="mr-2 ml-2">
                Master Product
            </v-toolbar-title>
            <v-toolbar-title v-show="$route.name == 'monitoringStock'" class="mr-2 ml-2">
                Monitoring Stock
            </v-toolbar-title>
            <v-toolbar-title v-show="$route.name == 'addStock' || $route.name == 'detailStock' || $route.name == 'log'" class="mr-2 ml-2 header">
                <span @click="navigateTo({name: 'monitoringStock'})">Monitoring Stock</span>
            </v-toolbar-title>
            <v-spacer />
            <v-toolbar-title v-show="$route.name == 'monitoringStock'" class="mr-4 header">
                <span @click="navigateTo({name: 'addStock'})">Create</span>
            </v-toolbar-title>
            <v-toolbar-title v-show="$route.name == 'monitoringStock'" class="mr-6 ml-6 header">
                <span @click="navigateTo({name: 'log'})">Log</span>
            </v-toolbar-title>
        </v-toolbar>
    </v-card>
</template>

<script>

export default {
    async mounted () {
    },
    methods: {
        navigateTo (route) {
            this.$router.push(route)
        },
    }
}
</script>

<style scoped>
.header {
  cursor: pointer;
}

.header:hover {
  color: black;
}
</style>
