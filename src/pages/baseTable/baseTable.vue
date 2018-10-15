<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-tickets"></i> 基础表格</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
        <el-select v-model="select_cate" clearable placeholder="请选择">
          <el-option v-for="item in areaOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="search" @click="search">搜索</el-button>
      </div>
      <el-table :data="tableData" height="260" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column v-for="col in cols " :key="col.id" :prop="col.prop" :label="col.label" :width="col.tabelWidth">
        </el-table-column>
        <!-- <el-table-column prop="date" label="日期" sortable width="150">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="address" label="地址" :formatter="formatter">
        </el-table-column> -->

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
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
      <el-form ref="form" :model="form" label-width="50px">
        <el-form-item label="日期">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.code" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.namespace"></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 删除提示框 -->
    <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
      <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteRow">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "basetable",
  data() {
    return {
      url: "./static/vuetable.json",
      tableData: [
        {
          id: "123",
          gmtCreate: null,
          gmtModified: null,
          creator: null,
          editor: null,
          code: "newcode",
          name: "newnamae",
          description: null,
          classifierId: null,
          parentId: null,
          isRoot: null,
          leaf: null,
          classifierName: null,
          namespace: "/b1129f2d16e84499ab9b9b5b4916d276/123",
          string_1: null,
          string_2: null,
          string_3: null,
          string_4: null,
          string_5: null,
          string_6: null,
          string_7: null,
          string_8: null,
          string_9: null,
          string_10: null,
          string_11: null,
          string_12: null,
          string_13: null,
          string_14: null,
          string_15: null,
          string_16: null,
          string_17: null,
          string_18: null,
          string_19: null,
          string_20: null
        },
        {
          id: "e972e653ee0547a99fde31ef4daea562",
          gmtCreate: null,
          gmtModified: null,
          creator: null,
          editor: null,
          code: "dw_database",
          name: "dw_database",
          description: null,
          classifierId: null,
          parentId: null,
          isRoot: null,
          leaf: null,
          classifierName: null,
          namespace:
            "/8eb7876511e24812b14ba3a0f1adf6fd/9e50435be8234a999aa3356e63bdd71f/e972e653ee0547a99fde31ef4daea562",
          string_1: null,
          string_2: null,
          string_3: null,
          string_4: null,
          string_5: null,
          string_6: null,
          string_7: null,
          string_8: null,
          string_9: null,
          string_10: null,
          string_11: null,
          string_12: null,
          string_13: null,
          string_14: null,
          string_15: null,
          string_16: null,
          string_17: null,
          string_18: null,
          string_19: null,
          string_20: null
        }
      ],
      cur_page: 1,
      multipleSelection: [],
      select_cate: "",
      select_word: "",
      del_list: [],
      is_search: false,
      editVisible: false,
      delVisible: false,
      form: {
        name: "",
        date: "",
        address: ""
      },
      idx: -1,
      areaOptions: [
        {
          value: "1",
          label: "北京"
        },
        {
          value: "2",
          label: "上海"
        },
        {
          value: "3",
          label: "广州"
        },
        {
          value: "4",
          label: "长沙"
        },
        {
          value: "5",
          label: "武汉"
        }
      ],
      cols: [
        { prop: "date", label: "日期", tabelWidth: "200" },
        { prop: "name", label: "姓名", tabelWidth: "180" },
        { prop: "address", label: "地址", tabelWidth: "600" }
      ]
    };
  },
  created() {
    this.getData();
  },
  computed: {
    data() {
      return this.tableData.filter(d => {
        let is_del = false;
        for (let i = 0; i < this.del_list.length; i++) {
          if (d.name === this.del_list[i].name) {
            is_del = true;
            break;
          }
        }
        if (!is_del) {
          if (
            d.address.indexOf(this.select_cate) > -1 &&
            (d.name.indexOf(this.select_word) > -1 ||
              d.address.indexOf(this.select_word) > -1)
          ) {
            return d;
          }
        }
      });
    }
  },
  methods: {
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
    search() {
      this.is_search = true;
      console.log(this.tableData);
      let setData = [];
      for (var i = 0; i < this.tableData.length; i++) {
        setData.push(this.tableData[i]);
      }
      this.toggleSelection(setData);
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
    // 表格选中状态
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    // 保存编辑
    saveEdit() {
      this.$set(this.tableData, this.idx, this.form);
      this.editVisible = false;
      this.$message.success(`修改第 ${this.idx + 1} 行成功`);
    },
    // 确定删除
    deleteRow() {
      this.tableData.splice(this.idx, 1);
      this.$message.success("删除成功");
      this.delVisible = false;
    },
    // 备份

    selected() {
      let setData = [];
      for (var i = 0; i < this.tableData.length; i++) {
        setData.push(this.tableData[i]);
      }
      console.log(setData);
      // this.$refs.multipletable.toggleAllSelection();
      setData.forEach(row => {
        this.$refs.multipletable.toggleRowSelection(row);
      });
    }
  },
  mounted() {}
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.del-dialog-cnt {
  font-size: 16px;
  text-align: center;
}
</style>
