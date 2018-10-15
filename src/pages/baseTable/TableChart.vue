<template>
  <div style="padding:20px;" id="app">
    <div class="panel panel-primary">
      <el-button type="primary" icon="search" @click="selected">选中</el-button>
      <Table ref="table" :user="users"></Table>
      <div class="panel-heading">用户管理</div>
      <table border="1" class="table table-bordered table-striped text-center">
        <thead>
          <tr>
            <th v-for="(head,index) in heads" :key="index"></th>
            <!-- <th>用户名</th>
            <th>年龄</th>
            <th>毕业学校</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user,index) in users" :key="index">
            <td>{{index+1}}</td>
            <td>{{user.name}}</td>
            <td>{{user.age}}</td>
            <td>{{user.school}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Table from "./baseTable.vue";
export default {
  name: "",
  data() {
    return {
      heads: { name: "姓名", age: "年龄" },
      user: { name: "", age: "", school: "" },
      users: [
        { name: "李磊", date: "25", address: "洛阳理工" },
        { name: "张成", date: "23", address: "桂林电子科技" },
        { name: "炼心", date: "22", address: "江西电子科技" }
      ]
    };
  },
  components: {
    Table
  },
  methods: {
    selected() {
      this.$refs.table.search();
    }
  }
};
</script>

<style scoped lang="less">
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
tr,
th {
  text-align: center;
}
.panel-primary {
  width: 100%;
}
.table {
  width: 100%;
}
</style>
