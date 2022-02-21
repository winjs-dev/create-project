<script setup>
  /**
   * 以下仅为事例代码，可以随意扩展修改
   */
  // 工具类
  import { formatDate } from 'utils';
  import { ref } from '@vue/composition-api';
  import services from '@/services';

  const msg = ref('Welcome to Your Vue.js App.This a composition-api and setup demo');
  const message = ref('现在时间是：' + formatDate(Date.now()));

  function movieComingSoon() {
    const data = {};
    services
      .octocat({
        method: 'get',
        data
      })
      .then((res) => {
        console.log('接口请求成功：' + JSON.stringify(res, null, 2));
      })
      .catch((err) => {
        console.log('接口请求异常：' + err);
      });
  }

  movieComingSoon();
</script>

<template>
  <div class="page page-hello">
    <div class="page-content">
      <img src="@/assets/img/logo.png" />
      <h1 v-text="msg"></h1>
      <h2 v-text="message"></h2>
      <win-button>测试按钮</win-button>
      <svg-icon icon-name="dog"></svg-icon>
    </div>
  </div>
</template>

<style lang="less" scoped src="./style.less"></style>
