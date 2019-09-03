<template>
  <div class="q-pa-md" style="max-width: 400px">

    <div class="text-h5">
      Subject Form
    </div>

    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="subject.name"
        label="Name"
        lazy-rules
        :rules="[ val => val && val.length > 0 || emptyField]"
      />

      <q-input
        filled
        v-model="subject.code"
        label="Subject Code"
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
  name: 'Subject',
  data () {
    return {
      subject: {
        id: 0,
        name: '',
        code: ''
      },
      emptyField: 'Please fill this field.'
    }
  },
  methods: {
    onSubmit () {
      const self = this

      axios.post('/api/subject/save', this.subject)
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
      this.subject.id = 0
      this.subject.name = ''
      this.subject.code = ''
    }

  }
}
</script>

<style scoped>

</style>
