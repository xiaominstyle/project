<template>
  <div class="tree-two">
    <div class="btn-list">
      <el-button type="primary" size="small" @click="RenderTree">render-content</el-button>
      <el-button type="primary" size="small" @click="SlotTree">scoped slot</el-button>
    </div>
    <RenderTree ref=" RenderTree " v-if="renderShow "></RenderTree>
    <SlotTree ref="SlotTree " v-if="slotShow "></SlotTree>
  </div>

</template>

<script >
import RenderTree from "./treeRender/tree.vue";
import SlotTree from "./slot_tree.vue";

export default {
  name: "",
  data() {
    return {
      renderShow: true,
      slotShow: false
    };
  },
  components: {
    RenderTree,
    SlotTree
  },
  methods: {
    RenderTree(RenderTree) {
      // this.$router.push({ name });
      this.renderShow = true;
      this.slotShow = false;
    },
    SlotTree(SlotTree) {
      // this.$router.push({ name });
      this.renderShow = false;
      this.slotShow = true;
    }
  }
};
</script>

<style scoped lang="less">
.tree-two {
  height: 100%;
}
</style>
