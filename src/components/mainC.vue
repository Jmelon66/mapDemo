<script setup>
import mapView from './mapView'
defineOptions({
  mapV: null,
  mounted() {
    this.mapV = new mapView(this.$el, {})
  }
})
</script>
<template>
  <div></div>
</template>
