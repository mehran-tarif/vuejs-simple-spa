<template>
  <div class="Profile">
    <h1>Profile</h1>
    <div class="alert alert-success">Hello {{username}}, I can identify YOU!</div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Profile',
  data() {
    return {
      username: ''
    }
  },
  mounted() {
    axios
      .get('/api/auth/users/me/')
      .then(response => {
        this.username = response.data.username
      })
      .catch(error => {
        console.log(error.response.data)
        this.$store.commit("logout")
        this.$router.push("/login")
      })
  }
}
</script>