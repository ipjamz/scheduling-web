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
        :options="teachers"
        @filter="filterFn"
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
        v-model="teacher.subject"
        use-input
        hide-selected
        fill-input
        input-debounce="0"
        :options="subjects"
        @filter="filterFn"
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
        :data="teacher.timeTableList"
        :columns="columns"
        row-key="name"
        selection="single"
        :selected.sync="selected"
      />

      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm"/>
      </div>
    </q-form>

  </div>
</template>

<script>
import moment from 'moment'

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
        timeTableList: []
      },
      selected: [],
      teachers: [],
      subjects: [],
      columns: [
        {
          name: 'name', label: 'Name', align: 'left', field: 'name', sortable: true
        },
        { name: 'to', label: 'To', align: 'left', field: 'to', sortable: true },
        { name: 'from', label: 'From', align: 'left', field: 'from', sortable: true }
      ],
      emptyField: 'Please fill this field.'

    }
  },
  methods: {
    onSubmit () {
      if (this.accept !== true) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'fas fa-exclamation-triangle',
          message: ''
        })
      } else {
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'fas fa-check-circle',
          message: 'Submitted'
        })
      }
    },

    onReset () {
    },

    filterFn (val, update) {
      update(() => {
        const needle = val.toLowerCase()
        this.teachers = this.teachers.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    }
  }
}
</script>

<style scoped>

</style>
