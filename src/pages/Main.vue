<template>
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
    } else if (this.user.userType === 'WORKING_STUDENT') {
      this.$router.push('/working_student')
    } else {
      this.$router.push('/')
    }
  }
}
</script>
