<template>
  <div class="row q-pa-md">
    <div class="col-4"></div>
    <div class="col">
      <q-form
        @submit="onSubmit"
      >

        <q-table
          class="q-mb-md"
          title="Schedule List"
          :data="schedules"
          :columns="columns"
          row-key="name"
        />
        <q-card>
          <q-card-section>
            <div class="text-h5 q-mt-md">Schedule Detail Form</div>

            <q-select class="q-mb-md" v-model="schedule.dayOfWeek" :options="options" label="Day of Week"
                      :option-value="opt => opt === null ? null : opt.id"
                      :option-label="opt => opt === null ? '- Null -' : opt.desc"
                      emit-value
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
            <div class="q-mt-md">
              <q-btn class="q-mr-md" label="Add" type="button" color="secondary" @click="onAdd"/>
              <q-btn label="Submit" type="submit" color="primary"/>
            </div>
          </q-card-section>
        </q-card>
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
      schedules: [],
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
        {
          name: 'dayOfWeek',
          required: true,
          label: 'Day of Week',
          align: 'left',
          sortable: true,
          field: row => row.dayOfWeek
        },
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
        {
          name: 'location',
          required: true,
          label: 'Location',
          align: 'left',
          sortable: true,
          field: row => row.location
        }
      ]
    }
  },
  methods: {
    onSubmit () {
      const self = this
      axios.post('/api/user/update', this.user).then(function (response) {
        if (response.status === 200) {
          self.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: 'Success.'
          })

          self.$store.commit('user/updateUserState', response.data)
          self.onClear()
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

    onAdd () {
      this.schedule.from = moment(this.fromDateString, 'HH:mm').valueOf()
      this.schedule.to = moment(this.toDateString, 'HH:mm').valueOf()
      this.schedules.push(this.schedule)

      this.$store.commit('user/updateUserSchedulesState', this.schedules)
    },

    onClear () {
      this.schedule.dayOfWeek = ''
      this.schedule.from = ''
      this.schedule.to = ''
      this.schedule.location = ''
    }

  },
  computed: {
    user: {
      get () {
        return this.$store.state.user.user
      }
    }
  }
}
</script>

<style scoped>

</style>
