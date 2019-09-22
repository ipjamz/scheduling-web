<template>
  <div class="row q-ma-md">
    <div class="col-4"></div>
    <div class="col">
      <q-card>
        <q-card-section>
          <q-form
            class="q-my-md"
            @submit="onSubmit">
            <div class="text-h5 q-mb-md">Student Registration Form</div>
            <q-input dense v-model="student.idNumber" label="Id Number"
                     :rules="[val => !!val || 'Field is required']"
            />
            <q-input dense v-model="student.course" label="Course"
                     :rules="[val => !!val || 'Field is required']"
            />
            <q-input dense v-model="student.year" label="Year"
                     :rules="[val => !!val || 'Field is required']"
            />
            <q-input dense v-model="student.firstName" label="First Name"
                     :rules="[val => !!val || 'Field is required']"
            />
            <q-input dense v-model="student.middleName" label="Middle Name"
                     :rules="[val => !!val || 'Field is required']"
            />
            <q-input dense v-model="student.lastName" label="Last Name"
                     :rules="[val => !!val || 'Field is required']"
            />
            <q-input dense v-model="student.contactNo" label="Contact Number"
                     :rules="[val => !!val || 'Field is required']"
            />
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
  name: 'StudentRegistration',
  data () {
    return {
      student: {
        id: null,
        idNumber: null,
        course: null,
        year: null,
        firstName: null,
        lastName: null,
        middleName: null,
        contactNo: null
      }
    }
  },
  methods: {
    onSubmit () {
      const self = this
      axios.post('/api/student/save', this.student)
        .then((response) => {
          if (response.status === 200) {
            self.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'fas fa-check-circle',
              message: 'Success.'
            })
            this.onClear()
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
      this.$router.push('/student')
    },

    onClear () {
      this.student.idNumber = ''
      this.student.course = ''
      this.student.year = ''
      this.student.firstName = ''
      this.student.lastName = ''
      this.student.middleName = ''
      this.student.contactNo = ''
    }
  }
}
</script>

<style scoped>

</style>
