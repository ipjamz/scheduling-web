<template>
  <div class="q-pa-md" style="max-width: 400px">

    <div class="text-h5">
      Select Schedule Form
    </div>

    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >

      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm"/>
      </div>
    </q-form>

  </div>
</template>

<script>
import moment from 'moment'
import axios from 'axios'

const teacherOptions = []
const subjectOptions = []

export default {
  name: 'Schedule',
  data () {
    return {
      schedule: {
        id: 0,
        teachId: '',
        teacherContactNo: '',
        studentName: '',
        yearAndSection: '',
        subject: '',
        from: moment().format('YYYY-MM-DD'),
        to: moment().format('YYYY-MM-DD'),
        approved: false,
        code: ''
      },
      teacher: {
        id: 0,
        firstName: '',
        middleName: '',
        lastName: '',
        postNominal: '',
        department: '',
        timeTables: []
      },
      subject: {
        id: 0,
        name: '',
        code: ''
      },
      selectedTimeTable: [],
      teacherOptions: teacherOptions,
      subjectOptions: subjectOptions,
      columns: [
        { name: 'from', label: 'From', align: 'left', field: 'from', sortable: true },
        { name: 'to', label: 'To', align: 'left', field: 'to', sortable: true }
      ],
      emptyField: 'Please fill this field.'

    }
  },
  methods: {
    onSubmit () {
      const self = this

      this.schedule.teachId = this.teacher.id
      this.schedule.subject = this.subject.code
      this.schedule.from = this.selectedTimeTable[0].from
      this.schedule.to = this.selectedTimeTable[0].to

      axios.post('/api/schedule/create', this.schedule)
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
    },

    filterTeacherFn (val, update) {
      const self = this
      update(() => {
        const needle = val.toLowerCase()
        self.teacherOptions = teacherOptions.filter((option) => option.label.toLowerCase().indexOf(needle) > -1)
      })
    },

    filterSubjectFn (val, update) {
      const self = this
      update(() => {
        const needle = val.toLowerCase()
        self.subjectOptions = subjectOptions.filter((option) => option.label.toLowerCase().indexOf(needle) > -1)
      })
    },

    initData () {
      axios.get('/api/teacher/findAll')
        .then(function (response) {
          if (response.status === 200) {
            response.data.forEach(teacher => {
              teacher.timeTables = teacher.timeTables.map(value => {
                return {
                  from: moment(value.from).format('YYYY-MM-DD'),
                  to: moment(value.to).format('YYYY-MM-DD')
                }
              })
              teacherOptions.push({
                label: teacher.lastName + ', ' + teacher.firstName + ' ' + teacher.middleName,
                value: teacher
              })
            })
          }
        })

      axios.get('/api/subject/findAll')
        .then(function (response) {
          if (response.status === 200) {
            response.data.forEach(subject => {
              subjectOptions.push({
                label: subject.code,
                value: subject
              })
            })
          }
        })
    }
  },

  created: function () {
    this.initData()
  }
}
</script>

<style scoped>

</style>
