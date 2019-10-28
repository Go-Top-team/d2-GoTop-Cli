<template>
  <!-- 可拖动 -->
  <div class="title">
    <div id="app">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
@import '~@/assets/style/public-class.scss';
.title{
  -webkit-app-region:drag;
  height: 5%;
  background: gray;
}
</style>
