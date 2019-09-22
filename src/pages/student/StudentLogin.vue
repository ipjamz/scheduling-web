<template>
    <div class="row q-ma-md">
        <div class="col-5"></div>
        <div class="col">
        <q-form
          class="q-my-md"
          @submit="onSubmit">
          <div class="row justify-center">
            <div class="text-h5 q-mb-md">Student Login</div>
          </div>
          <q-input
            filled
            v-model="idNumber"
            label="Student ID"
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
  name: 'StudentLogin',
  data: function () {
    return {
      idNumber: null
    }
  },
  methods: {
    onRegister () {
      this.$router.push('/student/registration')
    },

    onSubmit () {
      const self = this

      axios.get('/api/student/findByIdNumber', {
        params: {
          idNumber: this.idNumber
        }
      }).then((response) => {
        if (response.data !== '') {
          self.$router.push('/student/appointment')
          self.$store.commit('student/updateStudentState', response.data)
        } else {
          self.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'fas fa-exclamation-triangle',
            message: 'Student ID does not exist!'
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
