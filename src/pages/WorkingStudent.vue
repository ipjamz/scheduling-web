<template>
  <div class="row q-pa-md">
    <div class="col-4"></div>
    <div class="col">
      <div class="text-h5 q-mb-md">Schedule Information</div>
      <q-form
        @submit="onSubmit"
        class="q-mb-md"
      >
        <q-input
          filled
          v-model="schedule.teacherName"
          label="Teacher Name"
          lazy-rules
          :rules="[ val => val && val.length > 0 || emptyField]"
        />
        <q-input
          filled
          v-model="schedule.studentName"
          label="Student Name"
          lazy-rules
          :rules="[ val => val && val.length > 0 || emptyField]"
        />
        <q-input
          filled
          v-model="schedule.studentContactNo"
          label="Student Contact No."
          lazy-rules
          :rules="[ val => val && val.length > 0 || emptyField]"
        />
        <q-input
          filled
          v-model="schedule.studentYear"
          label="Student Year"
          lazy-rules
          :rules="[ val => val && val.length > 0 || emptyField]"
        />
        <q-input
          filled
          v-model="schedule.studentCourse"
          label="Student Course"
          lazy-rules
          :rules="[ val => val && val.length > 0 || emptyField]"
        />
        <q-input
          filled
          v-model="schedule.subject"
          label="Subject"
          lazy-rules
          :rules="[ val => val && val.length > 0 || emptyField]"
        />
        <q-select v-model="schedule.dayOfWeek" :options="options" label="Day of Week"
                  emit-value
                  :option-value="opt => opt === null ? null : opt.id"
                  :option-label="opt => opt === null ? '- Null -' : opt.desc"
                  map-options/>

        <q-btn class="q-mt-md" label="Submit" type="submit" color="primary"/>
      </q-form>
    </div>
    <div class="col-4">
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'WorkingStudent',
  data: function () {
    return {
      schedule: {
        id: '',
        teacherId: '',
        teacherName: '',
        studentName: '',
        studentContactNo: '',
        studentYear: '',
        studentCourse: '',
        subject: '',
        dayOfWeek: '',
        ScheduleStatus: '',
        from: '',
        to: '',
        updatedBy: '',
        dateUpdated: '',
        createdBy: '',
        dateCreate: ''
      },
      options: [
        {
          id: 'SUNDAY',
          desc: 'Sunday'
        },
        {
          id: 'MONDAY',
          desc: 'Monday'
        },
        {
          id: 'TUESDAY',
          desc: 'Tuesday'
        },
        {
          id: 'WEDNESDAY',
          desc: 'Wednesday'
        },
        {
          id: 'THURSDAY',
          desc: 'Thursday'
        },
        {
          id: 'FRIDAY',
          desc: 'Friday'
        },
        {
          id: 'SATURDAY',
          desc: 'Saturday'
        }
      ]
    }
  },
  methods: {
    onSubmit: function () {
      const self = this
      axios.post('/api/schedule/save', this.schedule).then(function (response) {
        if (response.status === 200) {
          self.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: 'Success.'
          })
        } else {
          self.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'fas fa-exclamation-triangle',
            message: 'Please contact administrator.'
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
