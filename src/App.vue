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
      <!-- <van-calendar v-model:show="show"/> -->
      <div class="theme">
        <div class="theme-item" v-for="index in 3">{{ index }}</div>
      </div>
  </div>
</template>

<style lang="scss" scoped>
.theme{
  display: flex;
  justify-content: space-between;

  .theme-item{
    margin: 10px 20px;
    width: 30%;
    padding: 30px 0;
    text-align: center;
    font-size: var(--primary-size);
    color: var(--primary-color);
    background-color: var(--primary-bg);

    /*
    @include fontSize('big-size');
    @include bg('menu-bg');
    @include color('menu-text-color');
    */
  }
}
</style>
