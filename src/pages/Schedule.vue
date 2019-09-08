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

      <q-select
        filled
        v-model="teacher"
        use-input
        hide-selected
        fill-input
        input-debounce="0"
        :options="teacherOptions"
        @filter="filterTeacherFn"
        emit-value
        map-options
        label="Teacher"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              No results
            </q-item-section>
          </q-item>
        </template>
      </q-select>

      <q-input
        filled
        v-model="schedule.teacherContactNo"
        label="Contact No."
        type="tel"
        lazy-rules
        :rules="[ val => val && val.length > 0 || emptyField]"
      />

      <q-input
        filled
        v-model="schedule.studentName"
        label="Student No."
        type="tel"
        lazy-rules
        :rules="[ val => val && val.length > 0 || emptyField]"
      />

      <q-input
        filled
        v-model="schedule.yearAndSection"
        label="Year and Section"
        type="tel"
        lazy-rules
        :rules="[ val => val && val.length > 0 || emptyField]"
      />

      <q-select
        filled
        v-model="subject"
        use-input
        hide-selected
        fill-input
        input-debounce="0"
        :options="subjectOptions"
        @filter="filterSubjectFn"
        emit-value
        map-options
        label="Subject"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              No results
            </q-item-section>
          </q-item>
        </template>
      </q-select>

      <q-table
        title="Time Table"
        :data="teacher.timeTables"
        :columns="columns"
        row-key="__index"
        selection="single"
        :selected.sync="selectedTimeTable"
      />

      <div class="q-mt-md">
        Selected: {{ JSON.stringify(selectedTimeTable.to) }}
      </div>

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
        { name: 'to', label: 'To', align: 'left', field: 'to', sortable: true },
        { name: 'from', label: 'From', align: 'left', field: 'from', sortable: true }
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
