<template>
  <div class="rotating-earth">
    <vue-echarts :options="options" />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import "echarts-gl";
const ROOT_PATH = "./"; // 编译完成后文件就是public下的index.html，所以同层目录下找
export default {
  name: "RotatingEarth",
  setup() {
    const options = ref({});
    const update = () => {
      options.value = {
        globe: {
          baseTexture: `${ROOT_PATH}assets/datav-gl-texture.jpeg`,
          heightTexture: `${ROOT_PATH}assets/datav-gl-texture.jpeg`,
          displacementScale: 0.05, // 地球顶点位移大小，可以使地球更加立体
          environment: `${ROOT_PATH}assets/star-bg.jpeg`,
          shading: "realistic",
          realisticMaterial: {
            roughness: 0.8 // 材质的粗糙度
          },
          postEffect: {
            // 后期处理特效
            enable: true
          },
          light: {
            main: {
              intensity: 5,
              shadow: true,
              alpha: 80,
              beta: 180
            },
            ambient: {
              // 环境光
              intensity: 1
            }
          }
        }
      };
    };
    onMounted(update);
    return {
      options
    };
  }
};
</script>

<style lang="scss" scoped>
.rotating-earth {
  width: 100%;
  height: 100%;
}
</style>
