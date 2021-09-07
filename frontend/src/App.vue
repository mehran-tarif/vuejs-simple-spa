<template>
  <Navbar />
  <router-view class="container" />
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar
  },
  watch: {
    $route() {
      this.$store.dispatch("onStart")
    }
  },
  mounted() {
    this.$store.dispatch("onStart")
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

.navbar-brand {
  color: #2c3e50 !important;
}

#nav a.router-link-exact-active {
  color: #239dcd;
}
</style>
