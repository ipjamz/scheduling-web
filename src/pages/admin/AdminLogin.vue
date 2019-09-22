<template>
  <div class="row q-ma-md">
    <div class="col-5"></div>
    <div class="col">
      <q-form
        class="q-my-md"
        @submit="onSubmit">
        <div class="row justify-center">
          <div class="text-h5 q-mb-md">Admin Login</div>
        </div>
        <q-input
          filled
          v-model="username"
          label="Username"
          lazy-rules
          :rules="[val => !!val || 'Field is required']"
        />
        <q-input
          filled
          v-model="password"
          label="Password"
          lazy-rules
          :rules="[val => !!val || 'Field is required']"
        />
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-form>
      <a href="#" @click="onRegister">Not registered yet?</a>
    </div>
    <div class="col-5"></div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AdminLogin',
  data () {
    return {
      username: null,
      password: null
    }
  },
  methods: {
    onRegister () {
      this.$router.push('/admin/registration')
    },

    onSubmit () {
      const self = this

      axios.get('/api/user/validate', {
        params: {
          username: this.username,
          password: this.password
        }
      }).then((response) => {
        if (response.status === 200) {
          this.$router.push('/admin/main')
          self.$store.commit('user/updateUserState', response.data)
        }
      }).catch(error => {
        self.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'fas fa-exclamation-triangle',
          message: error.response.data.message
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
