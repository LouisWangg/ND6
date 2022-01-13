<template>
  <v-container>
    <v-row no-gutters>
      <v-col md="4" class="ml-12 pl-10">
        <div class="panel">
          <div class="pt-4">
            <v-row class="mt-4" justify="center">
              <v-img
                max-height="150"
                max-width="250"
                src="https://media.istockphoto.com/vectors/shopping-cart-line-icon-fast-buy-vector-logo-vector-id1184670036?b=1&k=20&m=1184670036&s=612x612&w=0&h=MR2CuvWcBB9uyU80GVBPbGks9DskWLus_i9a0tGVFnE="
              ></v-img>
              <v-btn dark @click="navigateTo({name: 'masterProduct'})" class="mt-2">Master Product</v-btn>
            </v-row>
          </div>
        </div>
      </v-col>
      <v-col offset-md="3">
        <div class="panel">
          <div class="pl-4 pr-4 pt-4 pb-2">
            <v-row class="mt-4" justify="center">
              <v-img
                max-height="150"
                max-width="250"
                src="data:image/png;base64,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"
              ></v-img>
              <v-btn dark @click="navigateTo({name: 'monitoringStock'})" class="mt-2">Monitoring Stock</v-btn>
            </v-row>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  methods: {
    navigateTo (route) {
        this.$router.push(route)
    }
  },
}
</script>

<style scoped>
.panel {
  height: 250px;
  width: 350px;
  margin-top: 100px;
  background-color: white;
}
</style>
