<template>
  <div class="map" style="height:100%;width:100%;text-align:left;">
    这里是地图可视化组件
    <div ref="basicMapbox" :style="mapSize"></div>
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
export default {
  props: {
    mapWidth: {
      type: String
    },
    mapHeight: {
      type: String
    }
  },
  data() {
    return {
      nav: null,
      mapbox: {
        center: [113.206456, 23.072519],
        zoom: 6.2,
        pitch: 60,
        bearing: 0,
        style: "mapbox://styles/mapbox/dark-v9",
        boxHeight: 20,
        light: {
          main: {
            intensity: 1,
            shadow: true,
            shadowQuality: "high"
          },
          ambient: {
            intensity: 0.2
          }
        }
      },
      series: {
        name: "常驻人口",
        type: "bar3D",
        shading: "realistic",
        coordinateSystem: "mapbox",
        silent: true,
        barSize: 1, // 柱子粗细
        bevelSize: 0.3,
        emphasis: {
          label: {
            show: false
          }
        },
        label: {
          show: true,
          distance: 0,
          formatter: "{b}",
          textStyle: {
            fontSize: 12
          }
        },
        data: []
      }
    };
  },
  watch: {},
  computed: {
    mapSize() {
      let styleObj = {
        width: this.mapWidth,
        height: this.mapHeight
      };
      return styleObj;
    }
  },
  methods: {
    // 初始化
    init() {
      mapboxgl.accessToken = "your AK";
      const map = new mapboxgl.Map({
        container: this.$refs.basicMapbox,
        style: "mapbox://styles/mapbox/streets-v9"
      });
      console.log(map);
    }
  },
  mounted() {
    this.init();
    this.nav = new mapboxgl.NavigationControl();
    map.addControl(this.nav);

    map.addSource("states", {
      type: "geojson",
      data: gdData
    });
    map.addLayer({
      id: "state-fills",
      type: "fill",
      source: "states",
      layout: {},
      paint: {
        "fill-color": "#627BC1",
        "fill-opacity": 0.1
      }
    });
  }
};
</script>

<style  lang="less">
@import url("https://api.tiles.mapbox.com/mapbox-gl-js/v0.44.2/mapbox-gl.css");
</style>
