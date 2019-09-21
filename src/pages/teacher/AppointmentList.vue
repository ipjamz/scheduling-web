<template>
  <div class="row q-pa-md">
    <div class="col-3">
    </div>
    <div class="col">
      <q-table
        title="Teacher's Approval"
        class="q-mt-md"
        :data="data"
        :columns="columns"
        row-key="name"
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
export default {
  name: 'AppointmentList',
  data: function () {
    return {
      selected: [],
      columns: [
        { name: 'studentName', required: true, label: 'Student Name', align: 'left', sortable: true },
        { name: 'studentContactNo', required: true, label: 'Student Contact No.', align: 'left', sortable: true },
        { name: 'studentYear', required: true, label: 'Student Year', align: 'left', sortable: true },
        { name: 'studentCourse', required: true, label: 'Student Course', align: 'left', sortable: true },
        { name: 'subject', required: true, label: 'Subject', align: 'left', sortable: true },
        { name: 'dayOfWeek', required: true, label: 'Day of Week', align: 'left', sortable: true },
        { name: 'scheduleStatus', required: true, label: 'Schedule Status', align: 'left', sortable: true },
        { name: 'from', required: true, label: 'From', align: 'left', sortable: true },
        { name: 'to', required: true, label: 'To', align: 'left', sortable: true }
      ],
      data: []
    }
  },
  methods: {
    onApprove: function () {

    },
    onDecline: function () {

    }
  }
}
</script>

<style scoped>

</style>
