<template>
  <div class="elevation-2 panel">
    <v-toolbar flat dense class="blue-grey lighten-1" dark>
        <v-toolbar-title>{{title}}</v-toolbar-title>
    </v-toolbar>

    <div dark class="pl-4 pr-4 pt-4 pb-2 grey lighten-4">
      <slot>
          No content has been defined.
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'title'
  ]
}
</script>

<style scoped>
.panel {
  background-color: #EEEEEE;
}
</style>
