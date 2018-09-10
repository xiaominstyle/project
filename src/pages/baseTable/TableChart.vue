<template>
  <div style="padding:20px;" id="app">
    <div class="panel panel-primary">
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
export default {
  name: "",
  data() {
    return {
      heads: { name: "姓名", age: "年龄" },
      user: { name: "", age: "", school: "" },
      users: [
        { name: "李磊", age: "25", school: "洛阳理工" },
        { name: "张成", age: "23", school: "桂林电子科技" },
        { name: "炼心", age: "22", school: "江西电子科技" }
      ]
    };
  },
  components: {},
  methods: {}
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
