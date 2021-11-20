import { ref, onMounted, onUnmounted } from 'vue'

function dateFilter(v){
  let m = v.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  let d = v.getDate()
  d = d < 10 ? '0' + d : d;
  return `${v.getfullYear()}-${m}-${d}`;
}
function timeFilter(v){
  const h = fillZero(v.getHours())
  const m = fillZero(v.getMinutes())
  const s = fillZero(v.getSeconds())
  return `${h}:${m}-${s}`;
}
function fillZero(v){
  return v < 10 ? '0' + v : v;
}
export function clock(){
  const now = new Date();
  const date = ref(dateFilter(now));
  const time = ref(timeFilter(now));

  let task
  const start = () => {
    task = setInterval(() => {
      const now = new Date();
      date.value = dateFilter(now);
      time.value = timeFilter(now);
    }, 1000)
  }
  onMounted(start)
  onUnmounted(() => {
    task && clearInterval(task)
  })
  return {
    date,
    time
  }
}
