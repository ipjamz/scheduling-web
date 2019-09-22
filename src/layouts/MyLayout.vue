<template>
  <q-layout>
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          Schedule Web
        </q-toolbar-title>

        <q-tabs shrink stretch>
          <q-route-tab name="admin" label="Admin" to="/admin" />
          <q-route-tab name="student" label="Student" to="/student" />
        </q-tabs>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MyLayout',
  data () {
    return {
    }
  }
}
</script>

<style>
</style>
