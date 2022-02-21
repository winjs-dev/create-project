<script setup>
  /**
   * 以下仅为事例代码，可以随意扩展修改
   */
  // 工具类
  import { formatDate } from 'utils';
  import { ref } from 'vue';
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
      <!-- 静态资源路径写法事例 -->
      <img src="@/assets/img/logo.png" />
      <h1 v-text="msg"></h1>
      <h2 v-text="message"></h2>
      <svg-icon icon-name="dog"></svg-icon>
      <div class="demo">
        <h3>方法示例</h3>
        <pre>
          &lt;script setup&gt;
          /**
           * 以下仅为事例代码，可以随意扩展修改
           */
          // 工具类
          import { formatDate } from &#x27;utils&#x27;;
          import { ref } from &#x27;vue&#x27;;
          import services from &#x27;@/services&#x27;;

          const msg = ref(&#x27;Welcome to Your Vue.js App.This a composition-api and setup demo&#x27;);
          const message = ref(&#x27;现在时间是：&#x27; + formatDate(Date.now()));

          function movieComingSoon () {
            const data = {};
            services
                .octocat({
                  method: &#x27;get&#x27;,
                  data
                })
                .then((res) =&gt; {
                  console.log(&#x27;接口请求成功：&#x27; + JSON.stringify(res, null, 2));
                })
                .catch((err) =&gt; {
                  console.log(&#x27;接口请求异常：&#x27; + err);
                });
          }

          movieComingSoon();
        &lt;/script&gt;
        &lt;template&gt;
          &lt;div class=&quot;page page-hello&quot;&gt;
            &lt;div class=&quot;page-content&quot;&gt;
              &lt;!-- 静态资源路径写法事例 --&gt;
              &lt;img src=&quot;@/assets/img/logo.png&quot; /&gt;
              &lt;h1 v-text=&quot;msg&quot;&gt;&lt;/h1&gt;
              &lt;h2 v-text=&quot;message&quot;&gt;&lt;/h2&gt;
              &lt;svg-icon icon-name=&quot;dog&quot;&gt;&lt;/svg-icon&gt;
            &lt;/div&gt;
          &lt;/div&gt;
        &lt;/template&gt;

        &lt;style lang=&quot;less&quot; scoped src=&quot;./style.less&quot;&gt;&lt;/style&gt;
        </pre>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped src="./style.less"></style>
