<template>
  <section class="main">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-rank"></i> 拖拽排序</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="plugins-tips">
        Vue.Draggable：基于 Sortable.js 的 Vue 拖拽组件。 访问地址：
        <a href="https://github.com/SortableJS/Vue.Draggable" target="_blank">Vue.Draggable</a>
      </div>
      <!-- 拖拽列表 start -->
      <div class="drag-box">
        <div class="drag-box-item">
          <div class="item-title">todo</div>
          <draggable v-model="todo" @remove="removeHandle" :options="dragOptions">
            <transition-group tag="div" id="todo" class="item-ul">
              <div v-for="(item,index) in todo" class="drag-list" :key="index">
                {{item.content}}
              </div>
            </transition-group>
          </draggable>
        </div>
        <div class="drag-box-item">
          <div class="item-title">doing</div>
          <draggable v-model="doing" @remove="removeHandle" :options="dragOptions">
            <transition-group tag="div" id="doing" class="item-ul">
              <div v-for="(item,index) in doing" class="drag-list" :key="index">
                {{item.content}}
              </div>
            </transition-group>
          </draggable>
        </div>
        <div class="drag-box-item">
          <div class="item-title">done</div>
          <draggable v-model="done" @remove="removeHandle" :options="dragOptions">
            <transition-group tag="div" id="done" class="item-ul">
              <div v-for="(item,index) in done" class="drag-list" :key="index">
                {{item.content}}
              </div>
            </transition-group>
          </draggable>
        </div>
        <div class="drag-box-item">
          <div class="item-title">todoing</div>
          <draggable v-model="todoing" @remove="removeHandle" :options="dragOptions">
            <transition-group tag="div" id="todoing" class="item-ul">
              <div v-for="(item,index) in todoing" class="drag-list" :key="index">
                {{item.content}}
              </div>
            </transition-group>
          </draggable>
        </div>
      </div>
      <!-- 拖拽列表 end -->

      <!-- table表格 start -->
      <template>
        <el-table :data="tableData" height="260" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange" class="drag-table">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column v-for="col in cols " :key="col.id" :prop="col.prop" :label="col.label" :width="col.tabelWidth">
          </el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
          </el-pagination>
        </div>
      </template>
      <!-- table 表格 end -->
    </div>
  </section>
</template>

<script>
import draggable from "vuedraggable";
export default {
  name: "draglist",
  data() {
    return {
      dragOptions: {
        animation: 120,
        scroll: true,
        group: "sortlist",
        ghostClass: "ghost-style"
      },
      todo: [
        {
          content: "开发图表组件"
        },
        {
          content: "开发拖拽组件"
        },
        {
          content: "开发权限测试组件"
        }
      ],
      doing: [
        {
          content: "开发登录注册页面"
        },
        {
          content: "开发头部组件"
        },
        {
          content: "开发表格相关组件"
        },
        {
          content: "开发表单相关组件"
        }
      ],
      done: [
        {
          content: "初始化项目，生成工程目录，完成相关配置"
        },
        {
          content: "开发项目整体框架"
        }
      ],
      todoing: [
        {
          content: "西瓜"
        },
        {
          content: "香蕉"
        },
        {
          content: "苹果"
        },
        {
          content: "荔枝"
        },
        {
          content: "葡萄"
        },
        {
          content: "水蜜桃"
        },
        {
          content: "火龙果"
        },
        {
          content: "草莓"
        },
        {
          content: "芒果"
        }
      ],
      tableData: [
        {
          date: "2018-2-18",
          name: "张三",
          address: "北京海淀区海淀南路"
        },
        {
          date: "2018-2-18",
          name: "王小二",
          address: "北京海淀区海淀南路"
        }
      ],
      cols: [
        { prop: "date", label: "日期", tabelWidth: "200" },
        { prop: "name", label: "姓名", tabelWidth: "180" },
        { prop: "address", label: "地址", tabelWidth: "600" }
      ]
    };
  },
  components: {
    draggable
  },
  methods: {
    removeHandle(event) {
      console.log(event);
      this.$message.success(`从 ${event.from.id} 移动到 ${event.to.id} `);
    },
    // 分页导航
    handleCurrentChange(val) {
      this.cur_page = val;
      this.getData();
    },
    // 获取 easy-mock 的模拟数据
    getData() {
      // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
      if (process.env.NODE_ENV === "development") {
        this.url = "/ms/table/list";
      }
      this.$axios
        .post(this.url, {
          page: this.cur_page
        })
        .then(res => {
          this.tableData = res.data.list;
        });
    },
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    handleEdit(index, row) {
      this.idx = index;
      const item = this.tableData[index];
      this.form = {
        name: item.name,
        date: item.date,
        address: item.address
      };
      this.editVisible = true;
    },
    handleDelete(index, row) {
      this.idx = index;
      this.delVisible = true;
    },
    delAll() {
      const length = this.multipleSelection.length;
      let str = "";
      this.del_list = this.del_list.concat(this.multipleSelection);
      for (let i = 0; i < length; i++) {
        str += this.multipleSelection[i].name + " ";
      }
      this.$message.error("删除了" + str);
      this.multipleSelection = [];
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 确定删除
    deleteRow() {
      this.tableData.splice(this.idx, 1);
      this.$message.success("删除成功");
      this.delVisible = false;
    }
  }
};
</script>

<style scoped>
.drag-box {
  display: flex;
  user-select: none;
}
.drag-box-item {
  flex: 1;
  max-width: 330px;
  /* min-width: 300px; */
  min-width: 284px;
  background-color: #eff1f5;
  margin-right: 16px;
  border-radius: 6px;
  border: 1px #e1e4e8 solid;
}
.item-title {
  padding: 8px 8px 8px 12px;
  font-size: 14px;
  line-height: 1.5;
  color: #24292e;
  font-weight: 600;
}
.item-ul {
  padding: 0 8px 8px;
  height: 500px;
  overflow-y: scroll;
}
.item-ul::-webkit-scrollbar {
  width: 0;
}
.drag-list {
  border: 1px #e1e4e8 solid;
  padding: 10px;
  margin: 5px 0 10px;
  list-style: none;
  background-color: #fff;
  border-radius: 6px;
  cursor: pointer;
  -webkit-transition: border 0.3s ease-in;
  transition: border 0.3s ease-in;
}
.drag-list:hover {
  border: 1px solid #20a0ff;
}
.drag-title {
  font-weight: 400;
  line-height: 25px;
  margin: 10px 0;
  font-size: 22px;
  color: #1f2f3d;
}
.ghost-style {
  display: block;
  color: transparent;
  border-style: dashed;
}
.drag-table {
  margin-top: 20px;
}
</style>
