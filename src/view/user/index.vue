<template>
  <div>
    <el-button size="mini" @click="dealDetail('new')">新增</el-button>
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
      <el-table-column prop="name" label="用户名"></el-table-column>
      <el-table-column prop="nick" label="昵称"></el-table-column>
      <el-table-column prop="" label="角色">
        <template slot-scope="scope">{{scope.row.role.join(',')}}</template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          {{['禁用', '正常'][scope.row.status]}}
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="180px">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="dealDetail('edit', scope.$index, scope.row)"
          >编辑</el-button
          >
          <el-button size="mini" type="info" @click="dealDetail('check', scope.$index, scope.row)"
          >查看</el-button
          >
          <el-button size="mini" @click="dealMenu('show', scope.$index, scope.row)"
          >角色管理</el-button
          >
          <el-popconfirm
                  confirm-button-text="删除"
                  cancel-button-text="取消"
                  icon="el-icon-info"
                  icon-color="red"
                  title="请谨慎删除用户"
                  style="margin-left: 10px;"
                  @onConfirm="dealDetail('delete', scope.$index, scope.row)"
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
            :title="detail.types[detail.type]"
            :visible.sync="detail.show"
            :close-on-click-modal="false"
    >
      <el-form :model="detail.form" :rules="rules" ref="ruleForm">
        <el-form-item label="用户名" prop="name">
          <el-input
                  v-model="detail.form.name"
                  :disabled="['check'].indexOf(detail.type) >= 0"
          ></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nick">
          <el-input
                  v-model="detail.form.nick"
                  :disabled="['check'].indexOf(detail.type) >= 0"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="roleIds">
          <el-checkbox-group v-model="detail.form.roleIds">
            <template v-for="item in roleList">
              <el-checkbox :label="item.id">{{item.name}}</el-checkbox>
            </template>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="detail.form.status" :disabled="['check'].indexOf(detail.type) >= 0">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="detail.show = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="dealDetail('submit')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    name: 'page-user',
    data() {
      return {
        list: [],
        detail: {
          types: { new: "用户新增", edit: "用户编辑", check: "用户查看" },
          type: "new",
          show: false,
          form: {
            id: "",
            name: "",
            nick: "",
            roleIds: [],
            status: 1,
          },
        },
        roleList: [],
        rules: {
          name: [{ required: true, message: '请输入 用户名', trigger: 'blur' },],
          nick: [{ required: true, message: '请输入 昵称', trigger: 'blur' },],
          roleIds: [{ required: true, message: '请选择 角色', trigger: 'blur' },],
          status: [{ required: true, message: '请选择 状态', trigger: 'blur' },],
        }
      };
    },
    async created() {
      await this.getUserList();
      await this.getRoleList();
    },
    mounted() {},
    methods: {
      async dealDetail(flag, index, row) {
        switch (flag) {
          case "check":
          case "edit":
            this.detail.type = flag;
            var res = await this.$api.getUserInfo(row.id);
            this.detail.form = { ...res };
            this.detail.show = true;
            break;
          case "new":
            this.detail.type = flag;
            this.detail.show = true;
            break;
          case "cancel":
            for (let key in this.detail.form) {
              this.detail.form[key] = "";
            }
            this.detail.show = false;
            break;
          case "submit":
            this.$refs['ruleForm'].validate(async (valid) => {
              if (valid) {
                if (this.detail.type === "new") {
                  var res = await this.$api.addUser({
                    name: this.detail.form.name,
                    nick: this.detail.form.nick,
                    roleIds: this.detail.form.roleIds,
                    status: this.detail.form.status,
                  });
                  this.$message.success("添加角色成功");
                } else if (this.detail.type === "edit") {
                  var res = await this.$api.editUser({
                    id: this.detail.form.id,
                    name: this.detail.form.name,
                    nick: this.detail.form.nick,
                    roleIds: this.detail.form.roleIds,
                    status: this.detail.form.status,
                  });
                  this.$message.success("编辑角色成功");
                }
                for (let key in this.detail.form) {
                  this.detail.form.id = ""
                  this.detail.form.name = ""
                  this.detail.form.nick = ""
                  this.detail.form.roleIds = []
                  this.detail.form.status = 1
                }
                this.detail.show = false;
                await this.getUserList();
              } else {
                console.log('error submit!!');
                return false;
              }
            });
            break;
          case "delete":
            var res = await this.$api.deleteRole(row.id);
            this.$message.success("删除用户成功");
            await this.getUserList();
            break;
        }
      },
      async getUserList() {
        let res = await this.$api.getUserList();
        this.list = res.rows;
      },
      async getRoleList() {
        let res = await this.$api.getRoleList();
        this.roleList = res.rows;
      },
    },
  };
</script>
