<template>
  <div class="row q-pa-md">
    <div class="col-3">
    </div>
    <div class="col">
      <q-table
        title="Teacher's Approval List"
        class="q-mt-md"
        :data="data"
        :columns="columns"
        row-key="id"
        selection="single"
        :selected.sync="selected"
      />
      <div class="q-mt-md">
        <q-btn class="q-mr-md" label="Approve" color="primary" @click="onApprove"/>
        <q-btn flat label="Decline" @click="onDecline"/>
      </div>
    </div>
    <div class="col-3">
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
  name: 'AppointmentList',
  data: function () {
    return {
      selected: [],
      columns: [
        { name: 'id', required: true, label: 'Appointment ID', align: 'left', sortable: true, field: row => row.id },
        { name: 'studentName', required: true, label: 'Student Name', align: 'left', sortable: true, field: row => row.studentName },
        { name: 'studentContactNo', required: true, label: 'Student Contact No.', align: 'left', sortable: true, field: row => row.studentContactNo },
        { name: 'studentYear', required: true, label: 'Student Year', align: 'left', sortable: true, field: row => row.studentYear },
        { name: 'studentCourse', required: true, label: 'Student Course', align: 'left', sortable: true, field: row => row.studentCourse },
        { name: 'subject', required: true, label: 'Subject', align: 'left', sortable: true, field: row => row.subject },
        { name: 'dayOfWeek', required: true, label: 'Day of Week', align: 'left', sortable: true, field: row => row.dayOfWeek },
        { name: 'scheduleStatus', required: true, label: 'Schedule Status', align: 'left', sortable: true, field: row => row.scheduleStatus },
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
        }
      ],
      data: [],
      updateStatusRequest: {
        id: null,
        appointmentStatus: null
      }
    }
  },
  methods: {
    onApprove: function () {
      const self = this
      this.updateStatusRequest.id = this.selected[0].id
      this.updateStatusRequest.appointmentStatus = 'APPROVED'

      axios.post('/api/appointment/updateStatus', this.updateStatusRequest).then(function (response) {
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
    },
    onDecline: function () {
      const self = this
      this.updateStatusRequest.id = this.selected.id
      this.updateStatusRequest.appointmentStatus = 'DECLINED'

      console.log(this.selected.id)

      axios.post('/api/appointment/updateStatus', this.updateStatusRequest).then(function (response) {
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
    },
    initData () {
      const self = this
      axios.get('/api/appointment/findByTeacherId', {
        params: {
          id: this.userState.id
        }
      }).then(function (response) {
        response.data.forEach(appointment => {
          self.data.push({
            id: appointment.id,
            studentName: appointment.studentName,
            studentContactNo: appointment.studentContactNo,
            studentYear: appointment.studentYear,
            studentCourse: appointment.studentCourse,
            subject: appointment.subject,
            dayOfWeek: appointment.dayOfWeek,
            scheduleStatus: appointment.scheduleStatus,
            from: moment(appointment.from).format('HH:mm'),
            to: moment(appointment.to).format('HH:mm')
          })
        })
      })
    }
  },
  created () {
    this.initData()
  },
  computed: {
    userState: {
      get: function () {
        return this.$store.state.user.user
      }
    }
  }
}
</script>

<style scoped>

</style>
