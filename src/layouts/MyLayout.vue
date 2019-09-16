<template>
  <q-layout>
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          Schedule Web
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <div class="row justify-center">
      <q-page-container>
        <router-view></router-view>
      </q-page-container>
    </div>
  </q-layout>
</template>

<script>
export default {
  name: 'MyLayout',
  data () {
    return {}
  },
  methods: {}
}
</script>

<style>
</style>
