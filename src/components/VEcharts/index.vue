<template>
  <div :class="[className, 'echarts']"></div>
</template>

<script>
import { watch, onMounted } from "vue";
import echarts from "echarts";
import { v4 as uuidv4 } from "uuid";

export default {
  name: "VueEcharts",
  props: {
    options: Object,
    theme: [String, Object]
  },
  setup(ctx) {
    let dom;
    let chart;
    /* eslint-disable-next-line */
    let className = `echarts${uuidv4()}`;
    const initChart = () => {
      if (!chart) {
        dom = document.getElementsByClassName(className)[0];
        chart = echarts.init(dom, ctx.theme);
      }
      if (ctx.optins) {
        chart.setOption(ctx.options);
      }
    };
    onMounted(() => {
      initChart();
    });
    watch(
      () => ctx.options,
      () => {
        initChart();
        chart.setOption(ctx.options);
        console.log("changed", echarts.getMap());
        console.log(echarts);
      }
    );
    return {
      className
    };
  }
};
</script>

<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 100%;
}
</style>
