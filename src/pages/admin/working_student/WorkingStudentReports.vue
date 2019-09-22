<template>
  <div class="row q-pa-md">
<!--    <div class="col-4"></div>-->
<!--    <div class="col">-->
<!--      <q-form-->
<!--        @submit="onSubmit"-->
<!--        class="q-mb-md"-->
<!--      >-->

<!--        <q-table-->
<!--          title="Teacher's Schedule"-->
<!--          :data="user.schedules"-->
<!--          :columns="columns"-->
<!--          row-key="name"-->
<!--        />-->

<!--        <div class="text-h5 q-mt-md">Appointment Detail Form</div>-->

<!--        <q-select-->
<!--          class="q-mb-md"-->
<!--          v-model="user"-->
<!--          use-input-->
<!--          hide-selected-->
<!--          fill-input-->
<!--          input-debounce="0"-->
<!--          :options="options"-->
<!--          @filter="filterFn"-->
<!--          label="Teacher Name"-->
<!--          emit-value-->
<!--          map-options>-->
<!--          <template v-slot:no-option>-->
<!--            <q-item>-->
<!--              <q-item-section class="text-grey">-->
<!--                No results-->
<!--              </q-item-section>-->
<!--            </q-item>-->
<!--          </template>-->
<!--        </q-select>-->

<!--        <q-input-->
<!--          filled-->
<!--          v-model="appointment.studentName"-->
<!--          label="Student Name"-->
<!--          lazy-rules-->
<!--          :rules="[val => !!val || 'Field is required']"-->
<!--        />-->
<!--        <q-input-->
<!--          filled-->
<!--          v-model="appointment.studentContactNo"-->
<!--          label="Student Contact No."-->
<!--          lazy-rules-->
<!--          :rules="[val => !!val || 'Field is required']"-->
<!--        />-->
<!--        <q-input-->
<!--          filled-->
<!--          v-model="appointment.studentYear"-->
<!--          label="Student Year"-->
<!--          lazy-rules-->
<!--          :rules="[val => !!val || 'Field is required']"-->
<!--        />-->
<!--        <q-input-->
<!--          filled-->
<!--          v-model="appointment.studentCourse"-->
<!--          label="Student Course"-->
<!--          lazy-rules-->
<!--          :rules="[val => !!val || 'Field is required']"-->
<!--        />-->
<!--        <q-input-->
<!--          filled-->
<!--          v-model="appointment.subject"-->
<!--          label="Subject"-->
<!--          lazy-rules-->
<!--          :rules="[val => !!val || 'Field is required']"-->
<!--        />-->
<!--        <q-input filled v-model="fromDateString" mask="time" :rules="['time']" label="From" type="time">-->
<!--          <template v-slot:append>-->
<!--            <q-icon name="access_time" class="cursor-pointer">-->
<!--              <q-popup-proxy transition-show="scale" transition-hide="scale">-->
<!--                <q-time v-model="fromDateString"/>-->
<!--              </q-popup-proxy>-->
<!--            </q-icon>-->
<!--          </template>-->
<!--        </q-input>-->
<!--        <q-input filled v-model="toDateString" mask="time" :rules="['time']" label="To" type="time">-->
<!--          <template v-slot:append>-->
<!--            <q-icon name="access_time" class="cursor-pointer">-->
<!--              <q-popup-proxy transition-show="scale" transition-hide="scale">-->
<!--                <q-time v-model="toDateString"/>-->
<!--              </q-popup-proxy>-->
<!--            </q-icon>-->
<!--          </template>-->
<!--        </q-input>-->

<!--        <q-btn class="q-mt-md" label="Submit" type="submit" color="primary"/>-->
<!--      </q-form>-->
<!--    </div>-->
<!--    <div class="col-4">-->
<!--    </div>-->
  </div>
</template>

<script>
// import axios from 'axios'
// import moment from 'moment'
//
// const userOptions = []

export default {
  name: 'Appointment',
  data: function () {
    return {
    //   appointment: {
    //     id: null,
    //     teacherId: null,
    //     teacherName: null,
    //     studentName: null,
    //     studentContactNo: null,
    //     studentYear: null,
    //     studentCourse: null,
    //     subject: null,
    //     dayOfWeek: null,
    //     ScheduleStatus: null,
    //     from: null,
    //     to: null,
    //     updatedBy: null,
    //     dateUpdated: null,
    //     createdBy: null,
    //     dateCreated: moment().valueOf()
    //   },
    //   user: {
    //     id: null,
    //     firstName: null,
    //     middleName: null,
    //     lastName: null,
    //     postNominal: null,
    //     contact: null,
    //     department: null,
    //     userType: null,
    //     username: null,
    //     password: null,
    //     schedules: []
    //   },
    //   fromDateString: null,
    //   toDateString: null,
    //   options: userOptions,
    //   columns: [
    //     { name: 'dayOfWeek', required: true, label: 'Day of Week', align: 'left', sortable: true },
    //     { name: 'from', required: true, label: 'From', align: 'left', sortable: true, format: (val) => moment(val).format('HH:mm') },
    //     { name: 'to', required: true, label: 'To', align: 'left', sortable: true, format: (val) => moment(val).format('HH:mm') },
    //     { name: 'location', required: true, label: 'Location', align: 'left', sortable: true }
    //   ]
    }
  },
  methods: {
    // onSubmit () {
    //   const self = this
    //   console.log(this.user)
    //
    //   this.appointment.teacherId = this.user.id
    //   this.appointment.teacherName = this.user.lastName + ', ' + this.user.firstName + ' ' + this.user.lastName
    //   this.appointment.from = moment(this.fromDateString, 'HH:mm').valueOf()
    //   this.appointment.to = moment(this.toDateString, 'HH:mm').valueOf()
    //
    //   axios.post('/api/appointment/save', this.appointment).then(function (response) {
    //     if (response.status === 200) {
    //       self.$q.notify({
    //         color: 'green-4',
    //         textColor: 'white',
    //         icon: 'fas fa-check-circle',
    //         message: 'Success.'
    //       })
    //     } else {
    //       self.$q.notify({
    //         color: 'red-5',
    //         textColor: 'white',
    //         icon: 'fas fa-exclamation-triangle',
    //         message: 'Please contact administrator.'
    //       })
    //     }
    //   })
    // },
    // filterFn (val, update) {
    //   const self = this
    //   update(() => {
    //     const needle = val.toLowerCase()
    //     self.options = userOptions.filter((option) => option.label.toLowerCase().indexOf(needle) > -1)
    //   })
    // },
    // initData () {
    //   axios.get('/api/user/findByUserType', {
    //     params: {
    //       userType: 'TEACHER'
    //     }
    //   }).then(function (response) {
    //     response.data.forEach(user => {
    //       userOptions.push({
    //         label: user.lastName + ', ' + user.firstName + ' ' + user.lastName,
    //         value: user
    //       })
    //     })
    //   })
    // }
  },
  computed: {
  //   userState: {
  //     get: function () {
  //       return this.$store.state.user.user
  //     }
  //   }
  // },
  // created () {
  //   this.initData()
  }
}
</script>

<style scoped>

</style>
