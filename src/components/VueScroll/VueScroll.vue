<template>
  <div class="vuebar-element" v-bar>
    <!-- el1 -->
    <div>
      <!-- el2 -->
      <!-- your scrollable content -->
      <slot></slot>
    </div>
    <!-- dragger will be automatically added here -->
  </div>
</template>
<script>
import Vue from 'vue'
import Vuebar from 'vuebar'
Vue.use(Vuebar)
import './vuescroll.css'
export default {}
</script>
<style lang="css" scoped>

</style>


