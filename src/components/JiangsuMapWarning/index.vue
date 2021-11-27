<template>
  <vue-echarts :options="options" />
</template>
<script>
import { ref, onMounted, onUnmounted } from "vue";
import * as echarts from "echarts";
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "JiangsuMapWarning",
  setup() {
    const options = ref({});
    let timer = null;
    const update = () => {
      fetch("http://www.youbaobao.xyz/datav-res/datav/jiangsuMapData.json")
        .then(response => response.json())
        .then(data => {
          console.log(data);
          const center = [];
          data.features.forEach(item => {
            if (item.properties) {
              center.push({
                key: item.properties.name,
                value: item.properties.center
              });
            }
          });
          console.log(center);
          echarts.registerMap("jiangsu", data); // 注册地图
          options.value = {
            geo: [
              {
                map: "jiangsu", // 使用自定义地图
                zoom: 1,
                roam: false, // 启动鼠标滚轮缩放地图
                scaleLimit: { min: 0, max: 3 }, // 控制最大和最小缩放比例
                itemStyle: {
                  areaColor: "#013c62",
                  shadowColor: "#013c62",
                  shadowBlur: 15,
                  shadowOffsetX: -5,
                  shadowOffsetY: 15
                }
              }
            ],
            series: [
              {
                type: "map",
                map: "jiangsu",
                zoom: 1,
                label: { show: true, color: "#fff" },
                emphasis: {
                  label: {
                    color: "#fff"
                  },
                  itemStyle: {
                    areaColor: "#fa8c16"
                  }
                },
                itemStyle: {
                  borderColor: "#2980b9",
                  borderWidth: 1,
                  borderType: "solid",
                  areaColor: "#12235c"
                },
                data: center.map(centerItem => {
                  // 拿到城市名称，并且随机生成城市的人口数
                  const value = Math.random() * 100;
                  return {
                    name: centerItem.key,
                    value
                  };
                })
              },
              {
                type: "effectScatter",
                data: [], // [{city:'',value:''}]
                coordinateSystem: "geo",
                itemStyle: {
                  color: "#feae21", // 未生效
                  borderColor: "#000"
                },
                label: {
                  show: true,
                  position: "top",
                  formatter: function(params) {
                    return `${params.data.city}\n发生了事件a在b处`;
                  },
                  backgroundColor: "rgba(52, 152, 219,.4)",
                  padding: [0, 0],
                  borderRadius: 3,
                  lineHeight: 32,
                  color: "#fff",
                  rich: {
                    title: { padding: [0, 5] },
                    content: { padding: [10], color: "red" }
                  }
                }
              },
              {
                type: "effectScatter",
                data: [],
                coordinateSystem: "geo",
                itemStyle: {
                  color: "#e93f42", // 未生效
                  borderColor: "#000"
                },
                label: {
                  show: true,
                  position: "top",
                  formatter: function(params) {
                    return `${params.data.city}\n发生了事件a在b处`;
                  },
                  backgroundColor: "rgba(233, 63, 66,.9)",
                  padding: [0, 0],
                  borderRadius: 3,
                  lineHeight: 32,
                  color: "#fff",
                  rich: {
                    title: { padding: [0, 5] },
                    content: { padding: [10], color: "red" }
                  }
                }
              },
              {
                type: "effectScatter",
                data: [],
                coordinateSystem: "geo",
                itemStyle: {
                  color: "#08baec", // 未生效
                  borderColor: "#000"
                },
                label: {
                  show: true,
                  position: "top",
                  formatter: function(params) {
                    return `${params.data.city}\n发生了事件a在b处`;
                  },
                  backgroundColor: "rgba(8, 186, 236,.9)",
                  padding: [0, 0],
                  borderRadius: 3,
                  lineHeight: 32,
                  color: "#fff",
                  rich: {
                    title: { padding: [0, 5] },
                    content: { padding: [10], color: "red" }
                  }
                }
              }
            ],
            // 根据series中的 data 让地图不同区域显示不同颜色
            visualMap: {
              show: false,
              max: 100
              // inRange: ["#a5dcf4", "006edd"]
            }
          };
          // 随机展示事件信息
          timer = setInterval(() => {
            const _options = cloneDeep(options.value);
            // 初始化数据
            for (let i = 1; i <= 3; i++) {
              _options.series[i].data = [];
            }
            // 生成城市随机数
            const cityLength = center.length;
            const cityIndex = Math.floor(Math.random() * cityLength);
            const eventIndex = Math.floor(Math.random() * 3) + 1;
            _options.series[eventIndex].data = [
              {
                city: center[cityIndex].key,
                value: center[cityIndex].value
              }
            ];
            options.value = _options;
          }, 2000);
        });
    };
    onMounted(update);
    onUnmounted(() => timer && clearInterval(timer));
    return {
      options
    };
  }
};
</script>

<style lang="scss" scoped></style>
