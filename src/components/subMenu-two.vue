/*** 左侧导航（三级导航）组件
 * author：zhaomin
 * verson：1.0
 */
<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157" text-color="#bfcbd9" active-text-color="#20a0ff" router>
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu v-if="item.isShow" :index="item.index" :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="(subItem,i) in item.subs">
              <el-submenu v-if="subItem.nextSubs" :index="subItem.index" :key="i" class="second-menu">
                <template slot="title">
                  <span slot="title" :title="subItem.title">{{ subItem.title }}</span>
                </template>
                <el-menu-item v-for="(nextSubItem,j) in subItem.nextSubs" :index="nextSubItem.index" :key="j">
                  <template slot="title">
                    <span slot="title" :title="nextSubItem.title">{{ nextSubItem.title }}</span>
                  </template>
                </el-menu-item>
              </el-submenu>
              <el-menu-item v-if="!subItem.nextSubs" :index="subItem.index" :key="subItem.index">
                <template slot="title">
                  <span slot="title" :title="subItem.title">{{ subItem.title }}</span>
                </template>
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import bus from "../assets/js/bus.js";
export default {
  data() {
    return {
      collapse: false,
      // 一级导航
      items: [
        {
          icon: "el-icon-setting",
          index: "dashboard",
          title: "系统首页"
        },
        {
          isShow: true,
          icon: "el-icon-tickets",
          index: "2",
          // index: "chartTable",
          title: "基础表格",
          subs: [
            {
              index: "chartTable",
              title: "原始table表格"
            },
            {
              index: "table",
              title: "基础表格"
            }
          ]
        },
        {
          icon: "el-icon-message",
          index: "tabs",
          title: "tab选项卡"
        },
        {
          isShow: true,
          icon: "el-icon-date",
          index: "3",
          title: "表单相关",
          // 二级导航
          subs: [
            {
              index: "form",
              title: "基本表单"
            },
            {
              index: "3-1",
              title: "表单-编辑器",
              // 三级导航
              nextSubs: [
                {
                  index: "fuEditor",
                  title: "富文本编辑器"
                },
                {
                  index: "markdown",
                  title: "markdown编辑器"
                }
              ]
            },

            {
              index: "upload",
              title: "文件上传"
            }
          ]
        },
        {
          isShow: true,
          icon: "el-icon-star-on",
          index: "4",
          title: "schart图表",
          subs: [
            {
              index: "charts",
              title: "图表01"
            },
            {
              index: "myCharts",
              title: "图表02"
            }
          ]
        },
        {
          isShow: true,
          icon: "el-icon-rank",
          index: "drag",
          title: "拖拽列表",
          subs: [
            {
              index: "drag",
              title: "拖拽列表"
            },
            {
              index: "dragTable",
              title: "拖拽列表02"
            }
          ]
        },
        {
          isShow: true,
          icon: "el-icon-printer",
          index: "6",
          title: "报表中心",
          subs: [
            {
              index: "reportView",
              title: "报表查看"
            },
            {
              index: "reportAdd",
              title: "报表新建"
            },
            {
              index: "themeReport",
              title: "主题报表"
            }
          ]
        },
        {
          isShow: true,
          icon: "el-icon-printer",
          index: "7",
          title: "树形结构",
          subs: [
            {
              index: "tree",
              title: "树形1"
            },
            {
              index: "treetwo",
              title: "树形2"
            },
            {
              index: "treethree",
              title: "树形3"
            },
            {
              index: "treechild",
              title: "树形4"
            }
          ]
        },
        {
          isShow: true,
          icon: "el-icon-printer",
          index: "8",
          title: "穿梭框案例",
          subs: [
            {
              index: "transferTree",
              title: "树形穿梭框"
            }
          ]
        },
        {
          icon: "el-icon-location",
          index: "mapbox",
          title: "地图可视化"
        },
        {
          icon: "el-icon-warning",
          index: "permission",
          title: "权限测试"
        },
        {
          icon: "el-icon-error",
          index: "404",
          title: "404页面"
        }
      ]
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    }
  },
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on("collapse", msg => {
      this.collapse = msg;
    });
  }
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}
.sidebar > ul {
  height: 100%;
}
</style>
