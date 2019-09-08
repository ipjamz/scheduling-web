<template>
  <div class="q-pa-md" style="max-width: 400px">

    <div class="text-h5">
      Time Table
    </div>

    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md q-mb-md"
    >

      <q-select
        filled
        v-model="teacher"
        use-input
        hide-selected
        fill-input
        input-debounce="0"
        :options="options"
        @filter="filterFn"
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

      <q-input v-model="timeTable.from" filled type="datetime" label="From"/>
      <q-input v-model="timeTable.to" filled type="datetime" label="To"/>

      <div>
        <q-btn label="Add" type="button" color="green" @click="onAdd"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm"/>
        <q-btn label="Submit" type="submit" color="primary" class="q-ml-sm"/>
      </div>
    </q-form>

    <q-table
      title="Time Table"
      :data="timeTables"
      :columns="columns"
      row-key="name"
    />

  </div>
</template>

<script>
import moment from 'moment'
import axios from 'axios'

const teacherOptions = []

export default {
  name: 'TimeTable',
  data () {
    return {
      timeTable: {
        from: moment().format('YYYY-MM-DD HH:mm'),
        to: moment().format('YYYY-MM-DD HH:mm')
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
      timeTables: [],
      columns: [
        { name: 'to', label: 'To', align: 'left', field: 'to', sortable: true },
        { name: 'from', label: 'From', align: 'left', field: 'from', sortable: true }
      ],
      options: teacherOptions
    }
  },
  methods: {
    onSubmit () {
      console.log(this.teacher)
      // const self = this
      // this.teacher.timeTables = self.timeTables.map(value => {
      //   return {
      //     from: moment(value.from).valueOf(),
      //     to: moment(value.to).valueOf()
      //   }
      // })
      //
      // if (this.teacher.id !== 0) {
      //   axios.post('/api/teacher/save', this.teacher)
      //     .then(function (response) {
      //       if (response.status === 200) {
      //         self.$q.notify({
      //           color: 'green-4',
      //           textColor: 'white',
      //           icon: 'fas fa-check-circle',
      //           message: 'Submitted'
      //         })
      //       } else {
      //         self.$q.notify({
      //           color: 'red-5',
      //           textColor: 'white',
      //           icon: 'fas fa-exclamation-triangle',
      //           message: 'Failed'
      //         })
      //       }
      //     })
      // }
    },

    onReset () {
      this.teacher.id = 0
      this.teacher.firstName = ''
      this.teacher.middleName = ''
      this.teacher.lastName = ''
      this.teacher.postNominal = ''
      this.teacher.department = ''
      this.teacher.timeTables = []
    },

    filterFn (val, update) {
      const self = this
      update(() => {
        const needle = val.toLowerCase()
        self.options = teacherOptions.filter((option) => option.label.toLowerCase().indexOf(needle) > -1)
      })
    },

    onAdd () {
      this.timeTables.push({
        from: moment(this.timeTable.from).format('YYYY-MM-DD HH:mm').toString(),
        to: moment(this.timeTable.to).format('YYYY-MM-DD HH:mm').toString()
      }
      )
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
    }
  },

  created: function () {
    this.initData()
  }
}
</script>

<style scoped>

</style>
