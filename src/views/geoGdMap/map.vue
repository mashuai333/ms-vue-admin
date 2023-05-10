<template>
  <div id="container" class="map-container" />
  <!-- <div class="input-card">
      <h4>左击获取经纬度：</h4>
      <div class="input-item">
        <input type="text" readonly="true" id="lnglat" />
      </div>
    </div> -->
</template>

<script setup lang="ts">
import { onMounted, watch, shallowRef } from 'vue'
// import { shallowRef } from '@vue/reactivity'
import AMapLoader from '@amap/amap-jsapi-loader'
const props = defineProps({
  setSymbol: {
    //各种类型的渲染数据
    type: Object
  }
})

watch(
  () => props.setSymbol,
  data => {
    setSymbol(data)
  }
)

onMounted(() => {
  initMap()
})

const railWayCoorMap = [
  [111.19456, 39.892641],
  [111.204998, 39.88907],
  [111.229719, 39.880392],
  [111.244236, 39.875367],
  [111.251018, 39.873007],
  [111.263972, 39.866527],
  [111.277779, 39.858286],
  [111.288486, 39.850573],
  [111.295601, 39.847844],
  [111.300632, 39.844493],
  [111.309866, 39.838904],
  [111.31443, 39.832477],
  [111.318274, 39.830427],
  [111.331318, 39.831549],
  [111.339798, 39.828446],
  [111.372694, 39.824997],
  [111.402374, 39.84378],
  [111.405643, 39.848848],
  [111.420708, 39.877897],
  [111.431703, 39.89744],
  [111.447657, 39.905189],
  [111.444639, 39.91814],
  [111.453263, 39.936122],
  [111.463108, 39.947573],
  [111.495663, 39.948403],
  [111.526277, 39.958801],
  [111.55337, 39.959133],
  [111.565695, 39.960018],
  [111.588098, 39.967774],
  [111.608095, 39.96729],
  [111.627103, 39.978901],
  [111.636822, 39.997517],
  [111.628886, 40.020424],
  [111.629083, 40.026571],
  [111.629173, 40.037164],
  [111.63106, 40.042108],
  [111.637869, 40.047618],
  [111.63936, 40.052368],
  [111.643187, 40.060224],
  [111.648397, 40.075684],
  [111.650876, 40.085414],
  [111.652763, 40.091376],
  [111.659302, 40.100455],
  [111.668825, 40.114251],
  [111.671376, 40.124017],
  [111.684096, 40.15223],
  [111.740797, 40.190051],
  [111.786503, 40.19231],
  [111.825237, 40.199199],
  [111.848018, 40.205537],
  [111.857792, 40.205316],
  [111.879639, 40.213967],
  [111.911115, 40.218485],
  [111.93749, 40.21876],
  [111.950282, 40.213526],
  [111.977518, 40.208622],
  [112.013882, 40.226197],
  [112.036735, 40.237599],
  [112.061025, 40.249109],
  [112.08244, 40.248118],
  [112.105437, 40.249219],
  [112.145609, 40.278619],
  [112.169648, 40.289875],
  [112.19825, 40.29447],
  [112.226025, 40.316465],
  [112.245034, 40.34391],
  [112.240362, 40.352818],
  [112.258832, 40.383107],
  [112.321785, 40.415634],
  [112.35398, 40.428047],
  [112.399686, 40.440348],
  [112.443595, 40.439195],
  [112.559441, 40.458521],
  [112.595373, 40.470487],
  [112.65617, 40.488542],
  [112.689515, 40.493809],
  [112.725376, 40.518385],
  [112.758074, 40.51301],
  [112.78567, 40.503575],
  [112.819374, 40.503904],
  [112.852791, 40.51301],
  [112.891598, 40.496772],
  [112.969212, 40.495455],
  [113.044669, 40.500942],
  [113.076936, 40.501874],
  [113.126379, 40.478719],
  [113.154837, 40.459564],
  [113.160447, 40.452475],
  [113.163196, 40.445228],
  [113.170203, 40.441069],
  [113.195769, 40.426131],
  [113.254626, 40.37781],
  [113.28524, 40.364563],
  [113.29372, 40.342157],
  [113.331449, 40.302992],
  [113.346397, 40.250369],
  [113.338204, 40.230322],
  [113.31262, 40.177421],
  [113.338258, 40.141221]
]
let _AMap = null
const map = shallowRef(null)

const initMap = () => {
  AMapLoader.load({
    key: '28968ecc6b8ed80e64342daf5d16c006', // 申请好的Web端开发者Key，首次调用 load 时必填
    version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    //   plugins: ["AMap.Scale", "AMap.ToolBar", "AMap.MapType"] // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    plugins: [] // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  })
    .then(AMap => {
      _AMap = AMap
      map.value = new AMap.Map('container', {
        zoom: 9, //级别
        center: [112.32, 40.05], //中心点坐标
        mapStyle: 'amap://styles/darkblue',
        viewMode: '3D' //使用3D视图
        // pitch: 45
      })
      // map.addControl(new AMap.Scale());
      // map.addControl(new AMap.ToolBar());
      // map.addControl(new AMap.MapType());

      // // 以 icon URL 的形式创建一个途经点
      // var viaMarker = new AMap.Marker({
      //   position: new AMap.LngLat(112.327428, 40.05923),
      //   // 将一张图片的地址设置为 icon
      //   icon: "//a.amap.com/jsapi_demos/static/demo-center/icons/dir-via-marker.png",
      //   // 设置了 icon 以后，设置 icon 的偏移量，以 icon 的 [center bottom] 为原点
      //   offset: new AMap.Pixel(-13, -30)
      // });
      // // 添加标记点
      // map.add(viaMarker);

      //   添加线路
      const polyline = new AMap.Polyline({
        path: railWayCoorMap, //设置线覆盖物路径
        strokeColor: '#ffffff', //线颜色
        strokeWeight: 16, //线宽
        strokeStyle: 'solid', //线样式
        zIndex: 11
      })
      const polyline1 = new AMap.Polyline({
        path: railWayCoorMap, //设置线覆盖物路径
        strokeColor: '#000000', //线颜色
        strokeWeight: 16, //线宽
        strokeStyle: 'solid', //线样式
        zIndex: 10
      })
      map.value.add([polyline, polyline1])

      // 多边形轮廓线的节点坐标数组
      const path = [
        new AMap.LngLat(111.292078, 39.840971),
        new AMap.LngLat(111.294739, 39.842972),
        new AMap.LngLat(111.298288, 39.840631),
        new AMap.LngLat(111.295072, 39.839524)
      ]

      const polygon = new AMap.Polygon({
        path: path,
        fillColor: '#fff', // 多边形填充颜色
        borderWeight: 2, // 线条宽度，默认为 1
        strokeColor: 'blue' // 线条颜色
      })

      map.value.add(polygon)
      //   AMap.plugin(["AMap.ControlBar"], function () {
      //     // 添加 3D 罗盘控制
      //     map.addControl(
      //       new AMap.ControlBar({
      //         position: {
      //           right: "20px",
      //           top: "20px"
      //         },
      //         showControlButton: true // 是否显示倾斜、旋转按钮。默认为 true
      //       })
      //     );
      //   });
      //为地图注册click事件获取鼠标点击出的经纬度坐标
      map.value.on('click', function (e) {
        // document.getElementById("lnglat")["value"] =
        //   e.lnglat.getLng() + "," + e.lnglat.getLat();
        console.log(e, 'cur')
        console.log(e.lnglat.getLng() + ',' + e.lnglat.getLat())
      })
    })
    .catch(e => {
      console.log(e)
    })
}

const markerList = []

// 实例化点标记
function addMarker(item) {
  console.log(item, 'item')
  // 点标记显示内容，HTML要素字符串
  // let markerContent = `<div class="custom-content-marker">${item.name}</div>`;
  const marker = new _AMap.Marker({
    // content: markerContent,
    icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
    position: item.value,
    title: item.name,
    offset: new _AMap.Pixel(-13, -30)
  })
  // 设置鼠标划过点标记显示的文字提示
  marker.setTitle(item.name)
  marker.setMap(map)
  markerList.push(marker)
}
// 清除 marker
const clearMarker = () => {
  if (markerList && markerList.length) {
    map.value.remove(markerList)
  }
}

// 设置标记点
const setSymbol = data => {
  if (data.isRender) {
    if (data.list && data.list.length) {
      for (let i = 0; i < data.list.length; i++) {
        const item = data.list[i]
        addMarker(item)
      }
    }
  } else {
    clearMarker()
  }
}
</script>

<style lang="scss">
.amap-logo {
  display: none !important;
}

.amap-copyright {
  bottom: -100px;
  display: none !important;
}

.map-container {
  width: 100%;
  height: 660px;
}

.input-card {
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  width: 352px;
  border-width: 0;
  border-radius: 6.4px;
  box-shadow: 0 2px 6px 0 rgb(114 124 245 / 50%);
  position: fixed;
  top: 114px;
  right: 122px;
  flex: 1 1 auto;
  padding: 12px 20px;

  .input-item {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;
    height: 48px;
  }
}
</style>
