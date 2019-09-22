<template>
  <div class="row q-ma-md">
    <div class="col-4"></div>
    <div class="col">
      <div class="text-h5 q-mb-md">Student Details</div>
      <q-card class="q-mb-md">
        <q-card-section>
          <div class="row">
            <div class="col-6">
              Name: {{ student.firstName + ' ' + student.middleName + ' ' + student.lastName }}
            </div>
            <div class="col-6">
              Course: {{ student.course }}
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              Year: {{ student.year }}
            </div>
            <div class="col-6">
              Section: {{ student.contactNo }}
            </div>
          </div>
        </q-card-section>
      </q-card>

      <div class="row q-mb-md">
        <q-btn class="q-mr-md" label="Submit" type="button" color="primary" @click="onSubmit"/>
        <q-btn label="Back" type="button" flat @click="onBack"/>
      </div>

      <q-table
        class="q-mb-md"
        title="Teachers Schedule"
        :data="schedules"
        :columns="columns"
        row-key="name"
      />
      <div class="text-h5 q-mt-md">Appointment List Form</div>
      <q-card v-for="(appointmentRequestDetail,index) in details" :key="index">
        <q-card-section class="q-ma-md">
          <q-select
            class="q-mb-md"
            v-model="appointmentRequestDetail.teacher"
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            :options="options"
            @filter="filterFn"
            label="Teacher Name"
            emit-value
            map-options
            @input="onSelectChange"
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
            v-model="appointmentRequestDetail.subject"
            label="Subject"
            lazy-rules
            :rules="[val => !!val || 'Field is required']"
          />
          <q-input filled v-model="appointmentRequestDetail.date" mask="date" :rules="['date']">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="appointmentRequestDetail.date" @input="() => $refs.qDateProxy.hide()"/>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-input filled v-model="appointmentRequestDetail.from" mask="time" :rules="['time']" label="From"
                   type="time">
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-time v-model="appointmentRequestDetail.from"/>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-input filled v-model="appointmentRequestDetail.to" mask="time" :rules="['time']" label="To" type="time">
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-time v-model="appointmentRequestDetail.to"/>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </q-card-section>
      </q-card>
      <q-btn class="q-mr-md" label="Add" type="button" color="primary" @click="onAddAppointment"/>
      <q-btn label="Remove" type="button" flat @click="onRemoveAppointment"/>
    </div>
    <div class="col-4"></div>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

let userOptions = []

export default {
  name: 'StudentView',
  data () {
    return {
      appointmentRequest: {
        idNumber: null,
        details: []
      },
      details: [
        {
          appointmentRequestDetail: {
            teacher: null,
            subject: null,
            date: null,
            from: null,
            to: null
          }
        }
      ],
      columns: [
        { name: 'dayOfWeek', required: true, label: 'Day of Week', align: 'left', sortable: true, field: row => row.dayOfWeek },
        {
          name: 'from',
          required: true,
          label: 'From',
          align: 'left',
          sortable: true,
          field: row => row.from,
          format: (val) => moment(val).format('HH:mm')
        },
        {
          name: 'to',
          required: true,
          label: 'To',
          align: 'left',
          sortable: true,
          field: row => row.to,
          format: (val) => moment(val).format('HH:mm')
        },
        { name: 'location', required: true, label: 'Location', align: 'left', sortable: true, field: row => row.location }
      ],
      options: userOptions,
      schedules: []
    }
  },
  methods: {
    onSubmit () {
      this.appointmentRequest.idNumber = this.student.idNumber
      this.appointmentRequest.details = this.details.map((detail) => {
        return {
          teacherId: detail.teacher.id,
          subject: detail.subject,
          date: moment(detail.date).valueOf(),
          from: moment(detail.from, 'HH:mm').valueOf(),
          to: moment(detail.to, 'HH:mm').valueOf()
        }
      })

      const self = this
      axios.post('/api/appointment/createAppointments', this.appointmentRequest)
        .then((response) => {
          if (response.status === 200) {
            console.log(response.data)
            self.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'fas fa-check-circle',
              message: 'Success.'
            })
          }
        }).catch(error => {
          console.log(error)
          self.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'fas fa-exclamation-triangle',
            message: 'Please contact administrator.'
          })
        })
    },

    onBack () {
      this.$router.push('/student')
    },

    onAddAppointment () {
      this.details.push({
        appointmentRequestDetail: {
          teacherId: null,
          subject: null,
          date: null,
          from: null,
          to: null
        }
      })
    },

    onRemoveAppointment () {
      this.details.pop()
    },

    filterFn (val, update) {
      const self = this
      update(() => {
        const needle = val.toLowerCase()
        self.options = userOptions.filter((option) => option.label.toLowerCase().indexOf(needle) > -1)
      })
    },

    onSelectChange (val) {
      this.schedules = val.schedules.map((schedule) => {
        return {
          dayOfWeek: schedule.dayOfWeek,
          from: schedule.from,
          to: schedule.to,
          location: schedule.location
        }
      })
    },

    initData () {
      const self = this
      axios.get('/api/user/findByUserType', {
        params: {
          userType: 'TEACHER'
        }
      }).then((response) => {
        userOptions = response.data.map((option) => {
          return {
            label: option.lastName + ', ' + option.firstName + ' ' + option.middleName,
            value: option
          }
        })
      }).catch(error => {
        console.log(error)
        self.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'fas fa-exclamation-triangle',
          message: 'Please contact administrator.'
        })
      })
    }
  },
  computed: {
    student: {
      get () {
        return this.$store.state.student.student
      }
    }
  },
  created () {
    this.initData()
  }
}
</script>

<style scoped>

</style>
