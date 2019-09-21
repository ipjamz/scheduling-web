<template>
  <div class="row q-pa-md">
    <div class="col-4"></div>
    <div class="col">
      <q-form
        @submit="onSubmit"
      >

        <q-table
          title="Appointment List"
          :data="user.schedules"
          :columns="columns"
          row-key="name"
        />

        <div class="text-h5 q-mt-md">Schedule Information</div>

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
        <q-input
          filled
          v-model="schedule.location"
          label="Location"
          lazy-rules
          :rules="[val => !!val || 'Field is required']"
        />

        <q-btn class="q-mt-md" label="Submit" type="submit" color="primary"/>
      </q-form>
    </div>
    <div class="col-4"></div>
  </div>

</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
  name: 'Schedule',
  data: function () {
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
      schedule: {
        dayOfWeek: null,
        from: null,
        to: null,
        location: null
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
      ],
      columns: [
        { name: 'dayOfWeek', required: true, label: 'Day of Week', align: 'left', sortable: true },
        {
          name: 'from',
          required: true,
          label: 'From',
          align: 'left',
          sortable: true,
          format: (val) => moment(val).format('HH:mm')
        },
        {
          name: 'to',
          required: true,
          label: 'To',
          align: 'left',
          sortable: true,
          format: (val) => moment(val).format('HH:mm')
        },
        { name: 'location', required: true, label: 'Location', align: 'left', sortable: true }
      ]
    }
  },
  methods: {
    onSubmit () {
      this.schedule.from = moment(this.fromDateString, 'HH:mm').valueOf()
      this.schedule.to = moment(this.toDateString, 'HH:mm').valueOf()
      this.user.schedules.push(this.schedule)

      const self = this
      axios.post('/api/user/register', this.user).then(function (response) {
        if (response.status === 200) {
          self.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: 'Success.'
          })
          self.clearForm()
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
    userSate: {
      get: function () {
        return this.$store.state.user.user
      }
    }
  },
  created () {
    this.user = this.userSate
  }
}
</script>

<style scoped>

</style>
