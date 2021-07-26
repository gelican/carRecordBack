<template>
  <div>
    <el-button size="mini" @click="deal('new')">新增</el-button>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      :border="false"
    >
      <el-table-column
        type="index"
        label="序号"
        min-width="120"
      ></el-table-column>
      <el-table-column prop="name" label="角色"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column label="操作" min-width="120px">
        <template slot-scope="scope">
          <el-button size="mini" @click="deal('edit', scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button size="mini" @click="deal('check', scope.$index, scope.row)"
            >查看</el-button
          >
          <el-popconfirm
            confirm-button-text="删除"
            cancel-button-text="取消"
            icon="el-icon-info"
            icon-color="red"
            title="删除后对应角色的用户会受影响，请谨慎处理"
            style="margin-left: 10px;"
            @onConfirm="deal('delete', scope.$index, scope.row)"
          >
            <el-button slot="reference" size="mini" type="danger"
              >删除</el-button
            >
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "role",
  data() {
    return {};
  },
  async created() {},
  mounted() {},
  methods: {
    async deal(flag, index, row) {
      console.log(flag, index, row);
      switch (flag) {
        case "check":
        case "edit":
          break;
        case "new":
          break;
        case "delete":
          var res = await this.$api.deleteMenu(row.id);
          this.$message.success("删除菜单成功");
          this.reloadSystem();
          break;
      }
    },
    async getMenuList() {
      let res = await this.$api.getMenuList();
      this.menuList = menuDeal(res);
      console.log(this.menuList);
      window.localStorage.setItem("menuList", JSON.stringify(this.menuList));
    },
  },
};
</script>
