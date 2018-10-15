<template>
  <div class="">
    <!-- 使用树形穿梭框组件 -->
    <tree-transfer :title="title" :from_data='fromData' :to_data='toData' :defaultProps="{label:'label'}" @addBtn='add' @removeBtn='remove' :mode='mode' height='540px' filter openAll :render-content="renderContent">
    </tree-transfer>
  </div>
</template>

<script>
// import treeTransfer from "el-tree-transfer"; // 引入
import treeTransfer from "../../components/TransferTree/transfer-extend.vue"; // 引入
export default {
  name: "",
  components: { treeTransfer },
  data() {
    return {
      title: ["待选表", "已选表"],
      mode: "transfer", // transfer addressList
      // 待选表数据参数(父级id的值作为子级的parentId)
      fromData: [
        {
          id: "1",
          parentId: 0,
          label: "一级 1",
          children: [
            {
              id: "1-1",
              parentId: "1",
              label: "二级 1-1",
              children: []
            },
            {
              id: "1-2",
              parentId: "1",
              label: "二级 1-2",
              children: [
                {
                  id: "1-2-1",
                  parentId: "1-2",
                  children: [],
                  label: "三级 1-2-1"
                },
                {
                  id: "1-2-2",
                  parentId: "1-2",
                  children: [],
                  label: "三级 1-2-2"
                }
              ]
            }
          ]
        },
        {
          id: "2",
          parentId: 1,
          label: "一级 2",
          children: [
            {
              id: "2-1",
              parentId: "2",
              label: "二级 2-1",
              children: []
            },
            {
              id: "2-2",
              parentId: "2",
              label: "二级 2-2",
              children: [
                {
                  id: "2-2-1",
                  parentId: "2-2",
                  children: [],
                  label: "三级 2-2-1"
                },
                {
                  id: "2-2-2",
                  parentId: "2-2",
                  children: [],
                  label: "三级 2-2-2"
                }
              ]
            }
          ]
        },
        {
          id: "3",
          parentId: 2,
          label: "一级 3",
          children: [
            {
              id: "3-1",
              parentId: "3",
              label: "二级 3-1",
              children: []
            },
            {
              id: "3-2",
              parentId: "3",
              label: "二级 3-2",
              children: [
                {
                  id: "3-2-1",
                  parentId: "3-2",
                  children: [
                    {
                      id: "4-1",
                      parentId: "3-2-1",
                      children: [],
                      label: "四级 4-1"
                    },
                    {
                      id: "4-2",
                      parentId: "3-2-1",
                      children: [],
                      label: "四级 4-2"
                    }
                  ],
                  label: "三级 3-2-1"
                },
                {
                  id: "3-2-2",
                  parentId: "3-2",
                  children: [],
                  label: "三级 3-2-2"
                }
              ]
            }
          ]
        }
      ],
      toData: [] //已选表数据参数
    };
  },
  methods: {
    // 切换模式 现有树形穿梭框模式transfer 和通讯录模式addressList
    changeMode() {
      if (this.mode == "transfer") {
        this.mode = "addressList";
      } else {
        this.mode = "transfer";
      }
    },
    // 监听穿梭框组件添加
    add(fromData, toData, obj) {
      // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
      // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
      console.log("fromData:", fromData);
      console.log("toData:", toData);
      console.log("obj:", obj);
    },
    // 监听穿梭框组件移除
    remove(fromData, toData, obj) {
      // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
      // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
      console.log("fromData:", fromData);
      console.log("toData:", toData);
      console.log("obj:", obj);
    },
    // 树形结构自定义节点
    renderContent() {
      var createElement = arguments[0];
      var level = arguments[1].node.level;
      if (level == 1) {
        return createElement("span", [
          createElement("i", { attrs: { class: "el-icon-date" } }),
          createElement("span", "     "),
          createElement("span", arguments[1].node.label)
        ]);
      } else if (level == 2) {
        return createElement("span", [
          createElement("i", { attrs: { class: "el-icon-goods" } }),
          createElement("span", "     "),
          createElement("span", arguments[1].node.label)
        ]);
      } else if (level == 3) {
        return createElement("span", [
          createElement("i", { attrs: { class: "el-icon-edit-outline" } }),
          createElement("span", "     "),
          createElement("span", arguments[1].node.label)
        ]);
      } else {
        return createElement("span", [
          createElement("i", { attrs: { class: "el-icon-picture" } }),
          createElement("span", "     "),
          createElement("span", arguments[1].node.label)
        ]);
      }
    }
  },
  mounted() {
    console.log(this.fromData);
    console.log(this.toData);
    // this.add();
    // this.remove();
  }
};
</script>

<style  lang="less">
.transfer-left,
.transfer-right {
  border: 1px solid #ccc !important;
  width: 40%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 5px;
  vertical-align: middle;
  /* background: red; */
}
.el-tree-node__content:hover {
  /* background-color: #f5f7fa; */
  color: #278df6;
}
.el-tree-node:focus > .el-tree-node__content {
  background-color: #f5f7fa;
  color: #278df6;
}
.transfer-title {
  background: #4b63a6 !important;
  color: #fff !important;
}
</style>
