<template lang="html">
  <div id="index">
    <canvas width="600px" height="600px" class="path-canvas"></canvas>
  </div>
</template>

<script>
import clickService from '../../utils/click.js'

export default {
  data() {
    return {
    };
  },
  computed: {},
  ready() {
    const canvas = document.getElementsByClassName('path-canvas')[0]
    const ctx = canvas.getContext('2d')
    clickService.setCtx(ctx)
    clickService.click({x: 50, y: 50})
    clickService.mouseDown({x: 100, y: 100})
    const start = {
      x: 50,
      y: 500
    }
    const end = {
      x: 500,
      y: 50
    }
    clickService.drag(start, end)
  },
  attached() {},
  methods: {},
  components: {}
};
</script>

<style lang="less">
  @import "./index.less";
</style>
