<template>
  <q-drawer
    v-model="leftDrawerOpen"
    bordered
    content-class="bg-grey-2"
  >
    <q-list>
      <q-item-label header>Navigation Bar</q-item-label>
      <q-item clickable to="/teacher">
        <q-item-section avatar>
          <q-icon name="school"/>
        </q-item-section>
        <q-item-section>
          <q-item-label>Teacher</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable to="/time_table">
        <q-item-section avatar>
          <q-icon name="timeline"/>
        </q-item-section>
        <q-item-section>
          <q-item-label>Time Table</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable to="/subject">
        <q-item-section avatar>
          <q-icon name="subject"/>
        </q-item-section>
        <q-item-section>
          <q-item-label>Subject</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable to="/schedule">
        <q-item-section avatar>
          <q-icon name="schedule"/>
        </q-item-section>
        <q-item-section>
          <q-item-label>Scheduling</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-drawer>

<!--  <q-page-container>-->
<!--    <router-view></router-view>-->
<!--  </q-page-container>-->
</template>

<style>
</style>

<script>

export default {
  name: 'PageIndex',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
  }
}
</script>
