<template>
  <div class="Logout">
    <h1>Logout</h1>
    <div class="alert alert-danger" v-if="logoutError">
      {{logoutError}}
    </div>
    <button class="btn btn-danger" @click="doLogout">Logout</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Logout',
  data() {
    return {
      logoutError: ''
    }
  },
  methods: {
    doLogout() {
        axios
          .post('/api/auth/token/logout/')
          .then(response => {
            this.$store.commit("logout")
            this.$router.push("/login")
          })
          .catch(error => {
            console.log(error.response.data)
            this.logoutError = error.response.data
          })
    }
  }
}
</script>