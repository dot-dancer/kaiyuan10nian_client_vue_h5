<script setup lang="ts">
  Tools.LocalStorage.setItem('test_001', 'testvalue')

  console.log(lpk('Index'))
</script>

<template>
  <div>
      {{ app.getConfig('baseUrl') }}

      {{ Tools.LocalStorage.getItem('test_001') }}

      {{ lpk('Index') }}

  </div>
</template>

<style scoped>
</style>
