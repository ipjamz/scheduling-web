<template>
  <div v-if="user.userType === 'TEACHER'">
    <teacher></teacher>
  </div>
  <div v-else>
    <working-student></working-student>
  </div>
</template>

<style>
</style>

<script>

import Teacher from './Teacher'
import WorkingStudent from './WorkingStudent'

export default {
  name: 'Main',
  components: { WorkingStudent, Teacher },
  data () {
    return {}
  },
  methods: {},
  computed: {
    user: {
      get: function () {
        return this.$store.state.user.user
      }
    }
  }
}
</script>
