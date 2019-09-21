<template>
  <div class="row q-pa-md">
    <div class="col-4"></div>
    <div class="col">
      <q-table
        title="Teachers Schedule"
        :data="user.schedules"
        :columns="columns"
        row-key="name"
      />
    </div>
    <div class="col-4"></div>
  </div>

</template>

<script>
export default {
  name: 'Schedule',
  data: function () {
    return {
      schedule: {
        dayOfWeek: null,
        from: null,
        to: null,
        location: null
      }
    }
  }
}
</script>

<style scoped>

</style>
