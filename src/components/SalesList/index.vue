<template>
  <div class="salesList">
    <base-scroll-list :config="config" />
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
export default {
  props: {
    data: Array
  },
  setup(props) {
    console.log("data", props.data);
    const config = ref({});
    const update = () => {
      const data = [];
      const headerIndexData = [];
      const aligns = [];
      // 数据逻辑处理 i是行数据
      for (let i = 0; i < props.data.length; i++) {
        data[i] = [];
        // 处理索引列的内容
        if (i % 2 === 0) {
          headerIndexData[
            i
          ] = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;">
            <div style="width:15px;height:15px;background:rgb(72,122,72);border-radius:50%;border:1px solid #fff;"/>
          </div>`;
        } else {
          headerIndexData[
            i
          ] = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;">
            <div style="width:15px;height:15px;background:rgb(38,88,104);border-radius:50%;border:1px solid #fff;"/>
          </div>`;
        }
        // 处理内容列 每一行5列
        for (let j = 0; j < 5; j++) {
          aligns.push("center"); // 内容居中
          let text = "";
          switch (j) {
            case 0:
              text = props.data[i].order;
              break;
            case 1:
              text = props.data[i].shop;
              break;
            case 2:
              text = props.data[i].rider;
              break;
            case 3:
              text = props.data[i].newShop;
              break;
            case 4:
              text = props.data[i].avgOrder;
              break;
            default:
          }
          // 处理特定列的样式
          if (j === 1 || j === 3) {
            data[i].push(`<div style="color:rgb(178,209,126)">${text}</div>`);
          } else {
            data[i].push(`<div>${text}</div>`);
          }
        }
      }
      // 如果传入的值数量较少，可能会导致默认值不生效，使用merge解决
      config.value = {
        headerData: [
          "城市订单量",
          "店铺数",
          "接单骑手数",
          "新店铺数量",
          "人均订单量"
        ],
        headerFontSize: 24,
        headerHeight: "55",
        headerBg: "rgb(80,80,80)",
        headerIndexContent: "", // 表头序号列的内容
        headerIndexData,
        headerIndex: true,
        headerColor: "#fff",
        rowFontSize: 20,
        // 显示的行数
        rowNum: 10,
        rowBg: ["rgb(40,40,40)", "rgb(55,55,55)"],
        rowColor: "#fff",
        data,
        aligns
      };
    };
    onMounted(() => {
      update();
    });
    watch(() => props.data, update());
    return {
      config
    };
  }
};
</script>

<style lang="scss" scoped>
.salesList {
  width: 100%;
  height: 100%;
}
</style>
