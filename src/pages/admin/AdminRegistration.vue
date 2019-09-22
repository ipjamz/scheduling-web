<template>
  <div class="row q-ma-md">
    <div class="col-4"></div>
    <div class="col">
      <q-card>
        <q-card-section>
          <q-form
            class="q-my-md"
            @submit="onSubmit">
            <div class="text-h5 q-mb-md">Admin Registration Form</div>
            <div class="text-h6">User Security</div>
            <q-input dense v-model="user.username" label="Username"
                     :rules="[val => !!val || 'Field is required']"
            />
            <q-input dense v-model="user.password" label="Password"
                     :rules="[val => !!val || 'Field is required']"

                     type="password"/>
            <div class="text-h6">User Details</div>
            <q-input dense v-model="user.firstName" label="First Name"
                     :rules="[val => !!val || 'Field is required']"
            />
            <q-input dense v-model="user.middleName" label="Middle Name"
                     :rules="[val => !!val || 'Field is required']"
            />
            <q-input dense v-model="user.lastName" label="Last Name"
                     :rules="[val => !!val || 'Field is required']"
            />
            <q-input dense v-model="user.postNominal" label="Post Nominal"/>
            <q-input dense v-model="user.contact" label="Contact"
                     :rules="[val => !!val || 'Field is required']"
            />
            <q-input dense v-model="user.department" label="Department"
                     :rules="[val => !!val || 'Field is required']"
            />
            <q-select class="q-mb-md" v-model="user.userType" :options="options" label="User Type"
                      :option-value="opt => opt === null ? null : opt.id"
                      :option-label="opt => opt === null ? '- Null -' : opt.desc"
                      emit-value
                      map-options/>
            <q-btn class="q-mr-md" label="Submit" type="submit" color="primary"/>
            <q-btn label="Back" type="button" flat @click="onBack"/>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-4"></div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AdminRegistration',
  data () {
    return {
      user: {
        id: null,
        firstName: null,
        middleName: null,
        lastName: null,
        postNominal: null,
        contact: null,
        department: null,
        userType: null,
        username: null,
        password: null,
        schedules: []
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
    onSubmit () {
      const self = this
      axios.post('/api/user/register', this.user)
        .then((response) => {
          if (response.status === 200) {
            self.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'fas fa-check-circle',
              message: 'Success.'
            })
            self.onClear()
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

    onBack () {
      this.$router.push('/admin')
    },

    onClear () {
      this.user.firstName = ''
      this.user.middleName = ''
      this.user.lastName = ''
      this.user.postNominal = ''
      this.user.contact = ''
      this.user.department = ''
      this.user.userType = ''
      this.user.username = ''
      this.user.password = ''
    }
  }
}
</script>

<style scoped>

</style>
