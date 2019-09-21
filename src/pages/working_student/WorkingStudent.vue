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
          <q-route-tab name="appointment" icon="schedule" label="Add Appointment" to="/appointment"/>
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
  name: 'WorkingStudent',
  data: function () {
    return {
      tab: 'working_student',
      splitterModel: 20
    }
  }
}
</script>

<style scoped>

</style>
