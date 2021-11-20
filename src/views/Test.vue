<template>
  <div style="width: 400px;height: 500px;">
    <base-scroll-list :config="config" />
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const config = ref({});
    const headerData = ["姓名", "年纪", "月薪"];
    const headerStyle = [{ color: "red" }, { width: "150px" }];
    const headerFontSize = 24;
    const headerColor = "#fff";
    const rowFontSize = 20;
    const rowColor = "#000";
    const rowStyle = [{ color: "blue" }];
    const rowBg = ["rgb(240,240,240)", "rgb(255,255,255)"];
    const aligns = ["center", "center", "flex-start"];
    const data = [];
    for (let i = 0; i < 10; i++) {
      data.push([
        "学生" + (i + 1),
        Math.floor(Math.random() * 10 + 20),
        Math.floor(Math.random() * 10000 + 10000)
      ]);
    }
    // 如果传入的值数量较少，可能会导致默认值不生效，使用merge解决
    config.value = {
      headerData,
      headerStyle,
      headerFontSize,
      headerColor,
      rowFontSize,
      rowColor,
      rowStyle,
      rowBg,
      headerBg: "rgb(80,80,80)",
      headerHeight: "40",
      headerIndex: true,
      data,
      // 显示的行数
      rowNum: 10,
      aligns
    };
    return {
      config
    };
  }
};
</script>

<style lang="scss" scoped></style>
