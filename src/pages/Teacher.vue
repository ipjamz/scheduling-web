<template>
  <div class="q-pa-md" style="max-width: 400px">

    <div class="text-h5">
      Teacher Form
    </div>

    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="teacher.firstName"
        label="First Name"
        lazy-rules
        :rules="[ val => val && val.length > 0 || emptyField]"
      />

      <q-input
        filled
        v-model="teacher.middleName"
        label="Middle Name"
        lazy-rules
        :rules="[ val => val && val.length > 0 || emptyField]"
      />

      <q-input
        filled
        v-model="teacher.lastName"
        label="Last Name"
        lazy-rules
        :rules="[ val => val && val.length > 0 || emptyField]"
      />

      <q-input
        filled
        v-model="teacher.postNominal"
        label="Post Nominal"
      />

      <q-input
        filled
        v-model="teacher.department"
        label="Department"
        lazy-rules
        :rules="[ val => val && val.length > 0 || emptyField]"
      />

      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm"/>
      </div>
    </q-form>

  </div>

</template>

<script>
import axios from 'axios'

export default {
  name: 'Teacher',
  data () {
    return {
      teacher: {
        firstName: '',
        middleName: '',
        lastName: '',
        postNominal: '',
        department: ''
      },
      emptyField: 'Please fill this field.'
    }
  },
  methods: {
    onSubmit () {
      var self = this
      axios.post('/api/teacher/save', this.teacher)
        .then(function (response) {
          if (response.status === 200) {
            self.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'fas fa-check-circle',
              message: 'Submitted'
            })
          } else {
            self.$q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'fas fa-exclamation-triangle',
              message: 'Failed'
            })
          }
        })
    },

    onReset () {
      this.teacher.firstName = ''
      this.teacher.middleName = ''
      this.teacher.lastName = ''
      this.teacher.postNominal = ''
      this.teacher.department = ''
    }
  }
}
</script>

<style scoped>

</style>
