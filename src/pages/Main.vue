<template>
<!--  <div v-if="user.userType === 'TEACHER'">-->
<!--    <teacher></teacher>-->
<!--  </div>-->
<!--  <div v-else>-->
<!--    <working-student></working-student>-->
<!--  </div>-->
  <router-view />
</template>

<style>
</style>

<script>

export default {
  name: 'Main',
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
  },
  created () {
    if (this.user.userType === 'TEACHER') {
      this.$router.push('/teacher')
    } else {
      this.$router.push('/working_student')
    }
  }
}
</script>
