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
            v-model="user.userName"
            label="Username"
            lazy-rules
            :rules="[ val => val && val.length > 0 || emptyField]"
          />

          <q-input
            filled
            v-model="user.password"
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
                <q-input dense v-model="loginUser.userName" autofocus @keyup.enter="prompt = false" label="Username"/>
                <q-input dense v-model="loginUser.password" autofocus @keyup.enter="prompt = false" label="Password"
                         type="password"/>
              </div>
              <div class="text-h6">User Details</div>
              <q-input dense v-model="user.firstName" autofocus @keyup.enter="prompt = false" label="First Name"/>
              <q-input dense v-model="user.middleName" autofocus @keyup.enter="prompt = false" label="Middle Name"/>
              <q-input dense v-model="user.lastName" autofocus @keyup.enter="prompt = false" label="Last Name"/>
              <q-input dense v-model="user.postNominal" autofocus @keyup.enter="prompt = false" label="Post Nominal"/>
              <q-input dense v-model="user.contact" autofocus @keyup.enter="prompt = false" label="User contact"/>
              <q-input dense v-model="user.department" autofocus @keyup.enter="prompt = false" label="Department"/>
              <q-select v-model="user.userType" :options="options" label="User Type"
                        :option-value="opt => opt === null ? null : opt.id"
                        :option-label="opt => opt === null ? '- Null -' : opt.desc"
                        map-options/>
            </q-card-section>

            <q-card-actions align="right" class="text-primary">
              <q-btn flat label="Cancel" v-close-popup/>
              <q-btn flat label="Create User" v-close-popup/>
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
      <div class="col-5"></div>
    </div>

  </q-page>

</template>
<script>
export default {
  name: 'Login',
  data: function () {
    return {
      loginUser: {
        userName: '',
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
        userName: '',
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
      if (this.user.userName === 'admin' && this.user.password === 'admin') {
        this.$router.push('main')
      } else {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'fas fa-exclamation-triangle',
          message: 'Username/Password incorrect.'
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
