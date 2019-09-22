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
      this.$router.push('/admin/main/teacher')
    } else if (this.user.userType === 'WORKING_STUDENT') {
      this.$router.push('/admin/main/working_student')
    }
  }
}
</script>
