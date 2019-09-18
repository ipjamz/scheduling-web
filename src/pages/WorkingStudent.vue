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
          :rules="[val => !!val || 'Field is required']"
        />
        <q-input
          filled
          v-model="schedule.studentName"
          label="Student Name"
          lazy-rules
          :rules="[val => !!val || 'Field is required']"
        />
        <q-input
          filled
          v-model="schedule.studentContactNo"
          label="Student Contact No."
          lazy-rules
          :rules="[val => !!val || 'Field is required']"
        />
        <q-input
          filled
          v-model="schedule.studentYear"
          label="Student Year"
          lazy-rules
          :rules="[val => !!val || 'Field is required']"
        />
        <q-input
          filled
          v-model="schedule.studentCourse"
          label="Student Course"
          lazy-rules
          :rules="[val => !!val || 'Field is required']"
        />
        <q-input
          filled
          v-model="schedule.subject"
          label="Subject"
          lazy-rules
          :rules="[val => !!val || 'Field is required']"
        />
        <q-select class="q-mb-md" v-model="schedule.dayOfWeek" :options="options" label="Day of Week"
                  emit-value
                  :option-value="opt => opt === null ? null : opt.id"
                  :option-label="opt => opt === null ? '- Null -' : opt.desc"
                  map-options/>
        <q-input filled v-model="fromDateString" mask="time" :rules="['time']" label="From" type="time">
          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-time v-model="fromDateString"/>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-input filled v-model="toDateString" mask="time" :rules="['time']" label="To" type="time">
          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-time v-model="toDateString"/>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <q-btn class="q-mt-md" label="Submit" type="submit" color="primary"/>
      </q-form>
    </div>
    <div class="col-4">
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
  name: 'WorkingStudent',
  data: function () {
    return {
      schedule: {
        id: null,
        teacherId: null,
        teacherName: null,
        studentName: null,
        studentContactNo: null,
        studentYear: null,
        studentCourse: null,
        subject: null,
        dayOfWeek: null,
        ScheduleStatus: null,
        from: null,
        to: null,
        updatedBy: null,
        dateUpdated: null,
        createdBy: null,
        dateCreated: moment().valueOf()
      },
      fromDateString: null,
      toDateString: null,
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
      this.schedule.from = moment(this.fromDateString, 'HH:mm').valueOf()
      this.schedule.to = moment(this.toDateString, 'HH:mm').valueOf()
      this.schedule.createdBy = this.user.username
      console.log(this.schedule)
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
  },
  computed: {
    user: {
      get: function () {
        return this.$store.state.user.user
      }
    }
  }
}
</script>

<style scoped>

</style>
