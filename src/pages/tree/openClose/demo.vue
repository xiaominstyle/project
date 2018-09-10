<template>
  <div class="data-collection">
    <!-- 左侧数据列表 start -->
    <div class="grid-content bg-purple">
      <div class="data-list-search">
        <el-input class='data-search' placeholder="请输入数据集名称" v-model="searchInput" @keyup.enter.native="getSearch">
        </el-input>
        <span class="search-icon" @click="getSearch">
          <i class="el-icon-search"></i>
        </span>
      </div>
      <div class="data-list-search" v-if="!collecteData.length">
        <p class='data-title' style='text-align:center'>暂无数据</p>
      </div>
      <ul class="data-parent">
        <VueScroll>
          <li class="data-parent-list" v-for='(item,index) in collecteData' :key="index" :class="{'activeTitle':idxTitle == item.id}" @click="choosed(item.id)">
            <span class="data-parent-text" @click.stop="open(item,index)">
              <i class="icon iconfont icon-xiala1" v-if="item.openFlag"></i>
              <i class="icon iconfont icon-xiala" v-else></i>
              <span>{{item.label}}</span>
            </span>
            <ul class="data-child" ref="liCon">
              <li class="data-child-list" v-for="subItem in sublistsData" :key="subItem.id" :class="{'active':idx == subItem.id}" @click.stop="check(subItem.id)">
                <span class="data-parent-text">{{subItem.datasetname}}</span>
                <span class="data-parent-num">({{subItem.selecttablesnum}})</span>
                <span class="data-btn">
                  <i title='编辑' type='text' class="icon iconfont icon-bianji" @click.stop="edit(subItem.id)"></i>
                  <i title='删除' type='text' class="icon iconfont icon-shanchu" @click.stop="remove(subItem.id)"></i>
                </span>
              </li>
              <div class="data-list-search" v-if="!sublistsData.length">
                <p class='data-title' style='text-align:center'>暂无数据</p>
              </div>
            </ul>
          </li>
        </VueScroll>
      </ul>
    </div>
    <!-- 左侧数据列表 end -->

    <!-- 右侧form表单 start -->
    <div class="grid-content bg-purple-light">
      <div class="data-add" @click="add">
        <i class="icon iconfont icon-icon021"></i>
        <span>新建数据集</span>
      </div>
      <div class="data-form" v-show="dataShow">
        <div class="form-title">
          {{infor}}
        </div>
        <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm form-container">
          <el-form-item label="数据集名称" prop="datasetname">
            <el-input v-model="form.datasetname" :disabled="nameDisabled" placeholder="请输入数据集名称"></el-input>
          </el-form-item>
          <el-form-item label="数据源" prop="datasourcename">
            <el-select v-model="form.datasourcename" clearable placeholder="请选择数据源" style='width:100%' @change="selectChange" :disabled="sourceDisabled">
              <el-option v-for="item in options" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
          </el-form-item>

          <!-- 查看选择表 -->
          <el-form-item label="选择表" prop="checkSheet" v-show="tabShow">
            <template>
              <ul class="selectTable">
                <li class="selectTable-title">
                  <p>已选表</p>
                </li>
                <li class="selectTable-column">
                  <ul>
                    <li class="selectTable-column-list" v-for="item in checkTableData" :key="item.id">
                      <span class="check-select" v-if="checkTableData.selecttables != ''">
                        <i class=" icon iconfont icon-tubiao3 "></i>
                        <span>{{item}}</span>
                      </span>
                    </li>
                  </ul>
                </li>

              </ul>
            </template>
          </el-form-item>
          <!-- 编辑、新建选择表 -->
          <el-form-item label=" 选择表 " prop="dataSheet " v-show="editTabShow ">
            <template>
              <el-transfer v-model="form.dataSheet " :titles="[ '待选表', '已选表'] " :props="{ key: 'value', label: 'desc' } " :data="tableData ">
              </el-transfer>
            </template>
          </el-form-item>
          <el-form-item>
            <el-button type="primary " @click="submitAdd( 'ruleForm')" v-show="addShow" :disabled="addDisabled">立即创建</el-button>
            <el-button type="primary " @click="submitEdit( 'ruleForm')" v-show="editShow" :disabled="editDisabled">提交编辑</el-button>
            <el-button @click="cancelForm( 'ruleForm') " v-show="cancleShow ">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="data-null " v-show="dataNull ">
        <p>请选择数据集或者点击新建数据集按钮</p>
      </div>
    </div>
    <!-- 右侧form表单 end -->
  </div>
</template>

<script>
import VueScroll from "../../../components/VueScroll/VueScroll";
import Vue from "vue";
export default {
  name: "data-collection",
  data() {
    return {
      liConHeight: 0, //左侧列表收起时的高度
      showIndex: null,
      searchInput: "",
      // 左侧数据列表
      collecteData: [
        {
          id: "1",
          label: "数据集"
        },
        {
          id: "2",
          label: "数据集2"
        },
        {
          id: "3",
          label: "数据集3"
        }
      ],
      sublistsData: [
        {
          id: 1,
          datasetname: "hhh",
          selecttablesnum: "2"
        },
        {
          id: 2,
          datasetname: "pg",
          selecttablesnum: "6"
        },
        {
          id: 3,
          datasetname: "nice",
          selecttablesnum: "2"
        },
        {
          id: 4,
          datasetname: "sweet",
          selecttablesnum: "6"
        },
        {
          id: 5,
          datasetname: "apple",
          selecttablesnum: "2"
        },
        {
          id: 6,
          datasetname: "origang",
          selecttablesnum: "6"
        }
      ],
      show: true,
      // 右侧form表单数据参数
      form: {
        datasetname: "", //数据集名称
        datasourcename: "", //数据源名称
        dataSheet: []
      },

      // 表单数据校验规则
      rules: {
        datasetname: [
          { required: true, message: "请输入数据集名称", trigger: "blur" }
        ]
      },
      tableData: [], //穿梭框数据
      // 数据源下拉数据
      options: [],
      infor: "新建数据集", //表单标题参数
      // 表单禁用参数
      nameDisabled: true,
      sourceDisabled: true,
      sheetDisabled: true,
      // 表单&数据是否显示参数
      selectShow: true,
      selectShow1: false,
      addShow: true,
      editShow: true,
      cancleShow: true,
      dataShow: false,
      tabShow: false,
      editTabShow: true,
      dataNull: false,
      active: null, //左侧数据列表动态样式绑定参数
      idx: null, //左侧数据列表动态样式绑定参数
      activeTitle: null, //左侧分组名动态样式绑定参数
      idxTitle: null, //左侧分组名动态样式绑定参数
      checkTableData: [],
      noSelectArr: [],
      selectAllData: [],
      sourceId: null,
      datasetId: null,
      editNOselectData: [],
      // editSelectData: []
      addDisabled: false,
      editDisabled: false
    };
  },
  components: {
    VueScroll
  },
  watch: {
    searchInput() {
      if (this.searchInput !== "") {
        this.getSearch();
      } else {
        this.getData();
      }
    }
  },
  methods: {
    // 展开、收缩事件
    open(item, i) {
      const liCon = this.$refs.liCon[i];
      var height = liCon.offsetHeight;
      if (height === this.liConHeight) {
        // 展开
        liCon.style.height = "auto";
        height = liCon.offsetHeight;
        liCon.style.height = this.liConHeight + "px";
        var f = document.body.offsetHeight; // 必加
        liCon.style.height = height + "px";
      } else {
        // 收缩
        liCon.style.height = this.liConHeight + "px";
      }
      if (!item.openFlag) {
        Vue.set(item, "openFlag", true);
      } else {
        Vue.set(item, "openFlag", false);
      }
    },
    // 表单数据初始化
    resetForm() {
      this.form.datasetname = ""; //数据集名称
      this.form.datasourcename = ""; //数据源名称
      this.form.dataSheet = [];
      this.tableData = [];
    },
    // 新建按钮点击事件
    add() {
      this.infor = "新建数据集";
      this.nameDisabled = false;
      this.sourceDisabled = false;
      this.editShow = false;
      this.addShow = true;
      this.cancleShow = true;
      this.dataShow = true;
      this.editTabShow = true;
      this.tabShow = false;
      this.dataNull = false;
      this.getSource();
      this.resetForm();
    },

    //查看
    check(id) {
      this.infor = "查看数据集";
      this.nameDisabled = true;
      this.sourceDisabled = true;
      this.addShow = false;
      this.editShow = false;
      this.cancleShow = false;
      this.tabShow = true;
      this.editTabShow = false;
      this.dataShow = true;
      this.dataNull = false;
      this.idx = id;
      this.getcheckSetData(id);
    },
    // 编辑按钮点击事件
    edit(id) {
      this.infor = "编辑数据集";
      this.nameDisabled = false;
      this.sourceDisabled = false;
      this.addShow = false;
      this.editShow = true;
      this.cancleShow = true;
      this.tabShow = false;
      this.editTabShow = true;
      this.dataShow = true;
      this.dataNull = false;
      this.getSetData(id);
      this.getSource();
      this.datasetId = id;
    },
    // 获取左侧数据列表
    getData() {
      this.axios
        .post("/dataView-dataset/biDataset/listDataSet", {
          userId: "",
          dataSetName: ""
        })
        .then(res => {
          if (res.data.status == "SUCCESS") {
            this.sublistsData = res.data.data;
          } else {
            this.$message({
              message: res.data.info,
              type: "warning"
            });
          }
        });
    },
    // 获取编辑回显数据
    getSetData(id) {
      this.axios
        .post("/dataView-dataset/biDataset/getDataSetById", {
          // userId: "test001",
          id: id
        })
        .then(res => {
          if (res.data.status == "SUCCESS") {
            let formData = res.data.data;
            this.form.datasetname = formData.datasetname;
            this.form.datasourcename = formData.datasourcename;
            // 根据数据源名称是否为空来实现数据表的实时更新
            if (this.form.datasourcename == "") {
              this.form.dataSheet = [];
              this.tableData = [];
            } else {
              // 待选表数据回显
              if (formData.noSelecttables == null) {
                this.tableData = [];
              } else {
                const generateData = _ => {
                  const data = [];
                  for (
                    let i = 0;
                    i <= formData.noSelecttables.length - 1;
                    i++
                  ) {
                    data.push({
                      value: i,
                      desc: formData.noSelecttables[i]
                    });
                  }
                  return data;
                };
                this.editNOselectData = generateData();
                this.tableData = this.editNOselectData;
                if (formData.selecttables == null) {
                  this.form.dataSheet = [];
                } else {
                  // 已选数据回显
                  const dataTwo = [];
                  formData.noSelecttables.map((val, index) => {
                    formData.selecttables.map(sel => {
                      if (val === sel) {
                        dataTwo.push(index);
                      }
                    });
                  });
                  this.form.dataSheet = dataTwo;
                }
              }
              this.selectInit(formData.datasourcename);
            }
          } else {
            this.$message({
              message: res.data.info,
              type: "warning"
            });
          }
        });
    },
    //查看回显
    getcheckSetData(id) {
      this.axios
        .post("/dataView-dataset/biDataset/getDataSetById", {
          // userId: "test001",
          id: id
        })
        .then(res => {
          if (res.data.status == "SUCCESS") {
            let formData = res.data.data;
            this.form.datasetname = formData.datasetname;
            this.form.datasourcename = formData.datasourcename;
            // this.checkTableData = formData.selecttables; //查看-已选数据回显
            if (this.form.datasourcename == "") {
              this.checkTableData = [];
            } else {
              if (formData.selecttables == 0) {
                this.checkTableData = [];
              } else {
                this.checkTableData = formData.selecttables;
              }
              this.selectInit(formData.datasourcename);
            }
          } else {
            this.$message({
              message: res.data.info,
              type: "warning"
            });
          }
        });
    },
    // 删除
    remove(id) {
      this.$confirm("此操作不可撤销, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .post("/dataView-dataset/biDataset/deleteDataSetById", {
              id: id
            })
            .then(res => {
              if (res.data.status === "SUCCESS") {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.getData();
                this.dataShow = false;
                this.dataNull = true;
              } else {
                this.$confirm(res.data.info, "提示", {
                  confirmButtonText: "确定",
                  showCancelButton: false,
                  showClose: false,
                  type: "error"
                });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    /* 右侧表单部分事件*/

    // 获取数据源下拉数据
    getSource() {
      this.axios
        .post("/dataView-dataset//biDataset/selectAllDataSourceName", {})
        .then(res => {
          if (res.data.status == "SUCCESS") {
            this.options = res.data.data;
          } else {
            this.$message({
              message: res.data.info,
              type: "warning"
            });
          }
        });
    },
    // 根据数据源名称查询待选表表列表
    selectInit(key) {
      // 获取数据源id
      for (var i in this.options) {
        if (key === this.options[i]) {
          this.sourceId = i;
        }
      }
      let setId = key;
      this.axios
        .post("/dataView-dataset/biDataset/getListTables", {
          datasourceName: setId
        })
        .then(res => {
          if (res.data.status == "SUCCESS") {
            // 获取待选表数据
            const noSelect = res.data.data;
            this.selectAllData = res.data.data;
            const getNoSelectData = _ => {
              const data = [];
              for (let i = 0; i <= noSelect.length - 1; i++) {
                data.push({
                  value: i,
                  desc: noSelect[i]
                });
              }
              return data;
            };
            this.tableData = getNoSelectData();
            this.addDisabled = false;
            this.editDisabled = false;
          } else {
            this.$message({
              message: res.data.info,
              type: "warning"
            });
            this.addDisabled = true;
            this.editDisabled = true;
          }
        });
    },
    // 数据表初始化
    selectChange(key) {
      if (key != "") {
        this.tableData = [];
        this.form.dataSheet = [];
        this.selectInit(key);
      } else {
        this.tableData = [];
        this.form.dataSheet = [];
        this.addDisabled = false;
        this.editDisabled = false;
      }
    },
    // 新建表单提交
    submitAdd(formName) {
      // 已选表传参数据处理
      let selectArr = this.form.dataSheet;
      let choosed = [];
      selectArr.map(val => {
        choosed.push(this.selectAllData[val]);
      });
      // 待选表传参数据处理
      let noSelectArr = [];
      this.tableData.map(val => {
        noSelectArr.push(val.desc);
      });
      let numArr = selectArr.length;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios
            .post("/dataView-dataset/biDataset/addDset", {
              datasetname: this.form.datasetname, //数据集名称
              selecttablesnum: numArr, //数据集包含所选表数量
              noSelecttables: noSelectArr.toString(), //待选表
              selecttables: choosed.toString(), //已选表
              datasourceid: this.sourceId, //数据源id
              datasourcename: this.form.datasourcename //数据源名称
            })
            .then(res => {
              if (res.data.status === "SUCCESS") {
                this.$message({
                  message: res.data.info,
                  type: "success"
                });
                this.getData();
                this.dataShow = false;
                this.dataNull = true;
              } else {
                this.$message.error(res.data.info);
              }
            });
        } else {
          this.$message.error("您的输入有误,请重新输入后确定.");
          return false;
        }
      });
    },
    // 编辑表单提交
    submitEdit(formName) {
      // 待选表传参数据处理
      let noSelectArr = [];
      this.tableData.map(val => {
        noSelectArr.push(val.desc);
      });

      // 已选表传参数据处理
      let selectArr = this.form.dataSheet;
      let choosed = [];
      selectArr.map(val => {
        choosed.push(this.selectAllData[val]);
      });

      // let numArr = choosed.length;
      let numArr = null;
      if (
        choosed.length == 0 ||
        noSelectArr.length == 0 ||
        this.form.datasourcename == ""
      ) {
        numArr = 0;
      } else {
        numArr = choosed.length;
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios
            .post("/dataView-dataset/biDataset/updateDset", {
              id: this.datasetId,
              datasetname: this.form.datasetname, //数据集名称
              selecttablesnum: numArr, //数据集包含所选表数量
              noSelecttables: noSelectArr.toString(), //待选表
              selecttables: choosed.toString(), //已选表
              datasourceid: this.sourceId, //数据源id
              datasourcename: this.form.datasourcename //数据源名称
            })
            .then(res => {
              if (res.data.status === "SUCCESS") {
                this.$message(res.data.info);
                this.getData();
                this.dataShow = false;
                this.dataNull = true;
                this.$message({
                  message: res.data.info,
                  type: "success"
                });
              } else {
                this.$message.error(res.data.info);
              }
            });
        } else {
          this.$message.error("您的输入有误,请重新输入后确定.");
          return false;
        }
      });
    },
    // 返回
    cancelForm(formName) {
      this.dataShow = false;
      this.dataNull = true;
    },
    //  搜索
    getSearch() {
      this.axios
        .post("/dataView-dataset/biDataset/listDataSet", {
          // userId: null,
          dataSetName: this.searchInput
        })
        .then(res => {
          if (res.data.status == "SUCCESS") {
            this.sublistsData = res.data.data;
          } else {
            this.$message({
              message: res.data.info,
              type: "warning"
            });
          }
        });
    },
    // 分组名点击事件
    choosed(id) {
      this.idxTitle = id;
    }
    // 折叠
    // showHide(index) {
    //   let contant = document.getElementsByClassName("data-child")[index]; //这里我们通过参数index来让浏览器判断你点击的是哪一个列表
    //   let height = contant.getBoundingClientRect().height; //获取页面元素的当前高度
    //   document.getElementsByClassName("select-icon")[
    //     index
    //   ].style.transform = !!height ? "rotateX(180deg)" : "rotateX(0deg)";
    //   if (!!height) {
    //     contant.style.height = height + "px";
    //     let f = document.body.offsetHeight; //强制相应dom重绘，使最新的样式得到应用
    //     contant.style.height = "0px";
    //   } else {
    //     contant.style.height = "auto";
    //     height = contant.getBoundingClientRect().height;
    //     contant.style.height = "0";
    //     let f = document.body.offsetHeight;
    //     contant.style.height = height + "px";
    //   }
    // }
  },
  // computed: {
  //   ifTrue() {
  //     return this.ifShowArr;
  //   }
  // },
  mounted() {
    this.dataNull = true;
    this.getData();
  }
};
</script>

<style lang="less">
// @import "../assets/less/variable.less";
ul,
li {
  list-style: none;
}
.content {
  height: calc(100vh - 210px);
}
.data-collection {
  display: flex;
  width: 100%;
  border: 1px solid #ccc;
  height: calc(~"100% - 2px");
  background: #fff;
  .bg-purple {
    width: 24%;
    .data-list-search {
      position: relative;
      width: 100%;
      padding: 10px 0;
      margin-bottom: 20px;
      .data-title {
        font-size: 16px;
        text-align: center;
        color: #fff;
      }
      .data-search {
        width: 90%;
        margin-left: 5%;
        margin-top: 20px;
        height: 36px;
        line-height: 36px;
        input {
          color: #fff;
          height: 36px;
          line-height: 36px;
          font-size: 18px;
          padding-right: 40px;
        }
      }
      .search-icon {
        width: 36px;
        height: 36px;
        line-height: 36px;
        position: absolute;
        top: 39%;
        right: 15px;
        color: #ccc;
        text-align: center;
      }
      .iconfont {
        position: absolute;
        top: 30px;
        left: 85%;
        font-size: 20px;
        color: #fff;
      }
    }
    .data-parent {
      // overflow-y: auto;
      height: calc(~"100% - 96px");
      .data-parent-list {
        overflow: hidden;
        .data-parent-text {
          display: inline-block;
          padding: 0 20px 0 10px;
          width: 100%;
          height: 40px;
          line-height: 40px;
          font-size: 18px;
          font-family: MicrosoftYaHei;
          color: #838383;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          cursor: pointer;
          .select-icon i {
            transform: rotateX(0deg);
          }
          &:hover {
            background: #278df6;
            color: #fff;
          }
          .activeTitle {
            background: #278df6;
            color: #fff;
          }
        }

        .data-child {
          padding: 0;
          .data-child-list {
            padding: 13.5px 0;
            // height: 20px;
            display: flex;
            position: relative;
            .data-parent-text {
              width: 55%;
              padding: 0 0 0 30px;
              font-size: 18px;
              color: #a6a6a6;
            }
            .data-parent-num {
              line-height: 40px;
              color: #a6a6a6;
            }
            .data-btn {
              float: right;
              line-height: 40px;
              display: none;
              position: absolute;
              right: 16px;
              .icon {
                line-height: 28px;
                font-size: 18px;
                color: #278df6;
                margin-left: 8px;
              }
            }
            &:hover {
              background-color: #f5f7f8;
              cursor: pointer;
              .data-btn {
                display: block;
              }
            }
          }
          .active {
            background: #f5f7f8;
          }
        }
      }
    }
  }
  .bg-purple-light {
    width: calc(~"76% - 1px");
    border-left: 1px solid #ccc;
    .data-add {
      height: 60px;
      line-height: 40px;
      font-size: 18px;
      color: #a6a6a6;
      padding: 10px 10px 10px 20px;
      border-bottom: 1px solid #dcdfe6;
      .icon {
        cursor: pointer;
        font-size: 20px;
        color: #278df6;
        font-weight: 900;
      }
    }
    .data-form {
      height: calc(~"100% - 76px");
      overflow-y: scroll;
      .form-title {
        font-size: 16px;
        margin: 30px;
        color: #a6a6a6;
      }
      .form-container {
        margin-left: 6%;
        margin-right: 25%;
        .selectTable {
          width: 50%;
          border: 1px solid #ccc;
          .selectTable-title {
            height: 45px;
            line-height: 45px;
            background: #4b63a6;
            p {
              margin-left: 21px;
              color: #fff;
              font-size: 20px;
            }
          }
          .selectTable-column {
            max-height: 396px;
            overflow-y: scroll;
            .selectTable-column-list {
              height: 38px;
              line-height: 38px;
              // border-bottom: 1px solid #ccc;
              margin-left: 31px;
              font-size: 14px;
              color: #112331;
              .icon {
                width: 16px;
                height: 16px;
              }
              .check-select {
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
              }
            }
            p {
              text-align: center;
              font-size: 16px;
              color: #a6a6a6;
            }
          }
        }
      }
      .el-form-item__label {
        color: #a6a6a6;
      }
    }
    .data-null {
      position: relative;
      height: calc(100% - 61px);
      text-align: center;
      background-size: 100px 100px;
      background: url("../../../assets/img/数据集管理.png") no-repeat;
      background-position: center 35%;
      p {
        position: absolute;
        top: 50%;
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 20px;
        color: #a6a6a6;
      }
    }
  }
}
.el-transfer {
  display: flex;
  .el-transfer__buttons {
    position: relative;
    .el-transfer__button:nth-child(2),
    .el-transfer__button:first-child {
      position: absolute;
      right: 20%;
    }
    .el-transfer__button:nth-child(2) {
      top: 50%;
    }
    .el-transfer__button:first-child {
      top: 30%;
    }
  }
}
.el-transfer-panel .el-transfer-panel__header {
  background: #4b63a6 !important;
}
.el-transfer-panel .el-transfer-panel__header .el-checkbox .el-checkbox__label,
.el-transfer-panel
  .el-transfer-panel__header
  .el-checkbox
  .el-checkbox__label
  span {
  color: #fff !important;
}
</style>
