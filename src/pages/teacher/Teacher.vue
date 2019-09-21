<template>
  <div>
    <q-splitter
      v-model="splitterModel"
    >

      <template v-slot:before>
        <q-tabs
          v-model="tab"
          vertical
          class="text-grey-9"
        >
          <q-route-tab name="schedule" icon="schedule" label="Add Schedule" to="/schedule"/>
          <q-route-tab name="appointment" icon="schedule" label="Check Appointment" to="/appointment_list"/>
        </q-tabs>
      </template>

      <template v-slot:after>
        <router-view/>
      </template>

    </q-splitter>
  </div>
</template>

<script>
export default {
  name: 'Teacher',
  data: function () {
    return {
      tab: 'teacher',
      splitterModel: 20
    }
  },
  methods: {}
}
</script>

<style scoped>

</style>
