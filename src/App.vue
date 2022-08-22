<script setup lang="ts">
  Tools.LocalStorage.setItem('test_001', 'testvalue')

  let show: boolean = true
</script>

<template>
  <div>
      {{ app.getConfig('baseUrl') }}
      {{ lpk('Index') }}
      <Icon icon="icon-time"/>
      <van-button type="primary">主要按钮</van-button>
      <van-calendar v-model:show="show"/>
  </div>
</template>

<style scoped>
</style>
