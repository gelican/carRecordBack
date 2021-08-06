<template>
  <div>
    <el-button size="mini" @click="deal('new')">新增</el-button>
    <el-table
      :data="menuList"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      :border="false"
      stripe
    >
      <el-table-column prop="title" label="菜单名"></el-table-column>
      <el-table-column prop="parentTitle" label="上级菜单">
        <template slot-scope="scope">
          {{ scope.row.parent && scope.row.parent.title }}
        </template>
      </el-table-column>
      <el-table-column prop="path" label="路径"></el-table-column>
      <el-table-column prop="sort" label="排序"></el-table-column>
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
            title="有子级菜单请先删除子级菜单，请谨慎操作"
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
    <el-dialog
      :modal-append-to-body="false"
      :title="types[dialogType]"
      :visible.sync="dialogShow"
      :close-on-click-modal="false"
    >
      <el-form :model="form">
        <el-form-item label="上级菜单">
          <el-cascader
            v-model="form.parentId"
            :options="menuList"
            placeholder="上级菜单(不选为一级菜单)"
            style="width: 100%;"
            :disabled="['check'].indexOf(dialogType) >= 0"
            :props="{
              expandTrigger: 'hover',
              value: 'id',
              label: 'title',
              checkStrictly: true,
            }"
            clearable
          ></el-cascader>
        </el-form-item>
        <el-form-item label="菜单名">
          <el-input
            v-model="form.title"
            :disabled="['check'].indexOf(dialogType) >= 0"
          ></el-input>
        </el-form-item>
        <el-form-item label="路径">
          <el-input
            v-model="form.path"
            :disabled="['check'].indexOf(dialogType) >= 0"
          ></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input
            v-model="form.sort"
            :disabled="['check'].indexOf(dialogType) >= 0"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogShow = false">取 消</el-button>
        <el-button type="primary" @click="deal('submit')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import menuDeal from "@/public/menuDeal";
export default {
  name: "page-menu",
  data() {
    return {
      menuList: [],
      types: { new: "菜单新增", edit: "菜单编辑", check: "菜单查看" },
      dialogType: "new",
      dialogShow: false,
      form: {
        id: "",
        title: "",
        path: "",
        sort: "",
        parentId: 0,
      },
    };
  },
  async created() {
    await this.getMenuList();
  },
  mounted() {
    this.menuList = JSON.parse(window.localStorage.getItem("menuList"));
  },
  methods: {
    async reloadSystem() {
      await this.getMenuList();
      window.location.reload();
    },
    async deal(flag, index, row) {
      console.log(flag, index, row);
      switch (flag) {
        case "check":
        case "edit":
          this.dialogType = flag;
          var res = await this.$api.getMenuInfo(row.id);
          this.form = { ...res };
          this.dialogShow = true;
          break;
        case "new":
          this.dialogType = flag;
          this.dialogShow = true;
          break;
        case "cancel":
          for (let key in this.form) {
            this.form[key] = "";
          }
          this.dialogShow = false;
          break;
        case "submit":
          if (this.dialogType === "new") {
            var res = await this.$api.addMenu({
              parentId:
                this.form.parentId === 0
                  ? 0
                  : this.form.parentId[this.form.parentId.length - 1],
              path: this.form.path,
              sort: this.form.sort,
              title: this.form.title,
            });
            this.$message.success("添加菜单成功");
          } else if (this.dialogType === "edit") {
            var res = await this.$api.editMenu({
              parentId:
                this.form.parentId === 0
                  ? 0
                  : this.form.parentId[this.form.parentId.length - 1],
              id: this.form.id,
              path: this.form.path,
              sort: this.form.sort,
              title: this.form.title,
            });
            this.$message.success("编辑菜单成功");
          }
          for (let key in this.form) {
            this.form[key] = "";
          }
          this.dialogShow = false;
          this.reloadSystem();
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
