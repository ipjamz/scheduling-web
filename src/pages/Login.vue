<template>
  <q-page class="content-center">
    <div class="row q-ma-md">
      <div class="col-5"></div>
      <div class="col">
        <div class="text-h5 q-ma-lg">Login to Schedule Web</div>
        <q-form
          @submit="onSubmit"
          class="q-mb-md"
        >

          <q-input
            filled
            v-model="loginUser.username"
            label="Username"
            lazy-rules
            :rules="[ val => val && val.length > 0 || emptyField]"
          />

          <q-input
            filled
            v-model="loginUser.password"
            type="password"
            label="Password"
            lazy-rules
            :rules="[ val => val && val.length > 0 || emptyField]"
          />

          <q-btn class="q-mr-md" label="Login" type="submit" color="primary"/>
          <q-btn flat label="Sign up" @click="prompt = true"/>
        </q-form>

        <q-dialog v-model="prompt" persistent>
          <q-card style="min-width: 400px">
            <q-card-section>
              <div class="text-h5">Register a New User</div>
            </q-card-section>

            <q-card-section>
              <div class="q-mb-md">
                <div class="text-h6">User Security</div>
                <q-input dense v-model="user.username" autofocus @keyup.enter="prompt = false" label="Username"
                         :rules="[val => !!val || 'Field is required']"
                />
                <q-input dense v-model="user.password" @keyup.enter="prompt = false" label="Password"
                         :rules="[val => !!val || 'Field is required']"

                         type="password"/>
              </div>
              <div class="text-h6">User Details</div>
              <q-input dense v-model="user.firstName" @keyup.enter="prompt = false" label="First Name"
                       :rules="[val => !!val || 'Field is required']"
              />
              <q-input dense v-model="user.middleName" @keyup.enter="prompt = false" label="Middle Name"
                       :rules="[val => !!val || 'Field is required']"
              />
              <q-input dense v-model="user.lastName" @keyup.enter="prompt = false" label="Last Name"
                       :rules="[val => !!val || 'Field is required']"
              />
              <q-input dense v-model="user.postNominal" @keyup.enter="prompt = false" label="Post Nominal"/>
              <q-input dense v-model="user.contact" @keyup.enter="prompt = false" label="Contact"
                       :rules="[val => !!val || 'Field is required']"
              />
              <q-input dense v-model="user.department" @keyup.enter="prompt = false" label="Department"
                       :rules="[val => !!val || 'Field is required']"
              />
              <q-select v-model="user.userType" :options="options" label="User Type"
                        emit-value
                        :option-value="opt => opt === null ? null : opt.id"
                        :option-label="opt => opt === null ? '- Null -' : opt.desc"
                        map-options/>
            </q-card-section>

            <q-card-actions align="right" class="text-primary">
              <q-btn flat label="Cancel" v-close-popup/>
              <q-btn flat label="Create User" v-close-popup @click="onRegister"/>
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
      <div class="col-5"></div>
    </div>

  </q-page>

</template>
<script>
import axios from 'axios'

export default {
  name: 'Login',
  data: function () {
    return {
      loginUser: {
        username: '',
        password: ''
      },
      user: {
        id: '',
        firstName: '',
        middleName: '',
        lastName: '',
        postNominal: '',
        contact: '',
        department: '',
        userType: '',
        username: '',
        password: ''
      },
      prompt: false,
      options: [
        {
          id: 'TEACHER',
          desc: 'Teacher'
        },
        {
          id: 'WORKING_STUDENT',
          desc: 'Working Student'
        }
      ]
    }
  },
  methods: {
    onSubmit: function () {
      const self = this
      axios.get('/api/user/validate', {
        params: {
          hospitalId: this.loginUser.username,
          password: this.loginUser.password
        }
      }).then(function (response) {
        if (response.status === 200) {
          self.userState.set(response.data)
          self.$router.push('main')
        } else {
          self.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'fas fa-exclamation-triangle',
            message: 'Username/Password incorrect.'
          })
        }
      })
    },
    onRegister: function () {
      const self = this
      axios.post('/api/user/register', this.user).then(function (response) {
        if (response.status === 200) {
          self.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: 'Success.'
          })
          self.clearForm()
        } else {
          self.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'fas fa-exclamation-triangle',
            message: 'Please contact administrator.'
          })
        }
      })
    },
    clearForm: function () {
      this.user.firstName = ''
      this.user.middleName = ''
      this.user.lastName = ''
      this.user.postNominal = ''
      this.user.contact = ''
      this.user.department = ''
      this.user.postNominal = ''
      this.user.userType = ''
      this.user.userName = ''
      this.user.password = ''
    }
  },
  computed: {
    userState: {
      get: function () {
        return this.$store.state.user
      },
      set: function (val) {
        this.$store.commit('user/updateUserState', val)
      }
    }
  }
}
</script>

<style scoped>

</style>
