<!--
 * @Date: 2024-03-30 09:51:31
 * @LastEditors: git config user.name && git config user.email
 * @LastEditTime: 2024-04-08 11:09:34
 * @FilePath: \mapDemoJS\src\components\mainC.vue
 * @Description: 
 * @Author: ms-tlzksaoastkh
-->
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
  <div id="mapV"></div>
</template>
<style lang="less" scoped>
#mapV {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>
