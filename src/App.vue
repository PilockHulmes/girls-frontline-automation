<template lang="html">
  <nav id="nav">
    <ul class="menu-list">
      <li :class="{'selected': activePage === 'index'}" @click="selectMenu('index')">测试画布</li>
    </ul>
  </nav>
  <main id="main">
    <index v-show="activePage == 'index'"></index>
  </main>
</template>

<script>
import index from './pages/index/index.vue'

export default {
  data() {
    return {
      activePage: 'index',
    };
  },
  computed: {},
  ready() {},
  attached() {},
  methods: {},
  components: {
    index,
  }
};
</script>

<style lang="less">
@import './styles/reset.less';
@import './styles/variables.less';

body {
  background-color: @nav-background-color;
  height: 100%;
}

.width-take(@width) {
  height: 100%;
  width: @width;
  float: left;
}

#nav {
  .width-take(25%);
  color: @nav-text-color;

  .menu-list {
    margin-top: 10px;
    text-align: center;

    .selected {
      background-color: @nav-selected-background-color;
    }
  }
}

#main {
  .width-take(75%);
  background-color: @content-background;
}
</style>
