<template>
  <div>
    <div class="py-4 px-2 px-md-4 tranasition">
      <default-header />
    </div>
    <nuxt />
    <default-footer />
  </div>
</template>

<script>

import default_header from '@/components/partials/Appbar.vue'
import AppFooter from '../components/partials/AppFooter.vue'

export default {
  components: {
    "default-header": default_header,
    "default-footer": AppFooter
  },
  mounted() {
    AOS.init();    
  }
  
}
</script>

<style>
</style>
