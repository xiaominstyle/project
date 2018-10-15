/***动态生成表单 */
<template>
  <div class="form">
    <form-create ref="fc" :rule="rule" :option="option"></form-create>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      formData: {},

      // rule: mock,
      option: {
        //显示表单重置按钮
        resetBtn: true,
        //表单提交事件
        onSubmit: function(formData) {
          alert(JSON.stringify(formData));
          //按钮进入提交状态
          $f.btn.loading();
          //重置按钮禁用
          $f.resetBtn.disabled();
          //按钮进入可点击状态
          //                    $f.btn.finish();
          //创建第二个表单
          // $f = that.$formCreate(mock, root);
        }
      }
    };
  },
  components: {},
  watch: {
    "formData.address": {
      handler: function(n) {
        console.log(n);
      },
      deep: true
    }
  },
  mounted: function() {
    $f = this.$refs.fc.$f;
  }
};
</script>

<style scoped lang="less">
</style>
