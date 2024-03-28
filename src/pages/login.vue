<script setup lang="ts">
import { ElMessage, FormInstance } from "element-plus";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

// do not use same name with ref
const form = reactive({
  username: "",
  password: "",
  autoLogin: false,
  agree: false,
});
const validateAgree = (rule: any, value: any, callback: any) => {
  if (value) {
    callback();
  } else {
    ElMessage.error("请同意用户协议！");
    callback(new Error());
  }
};
const rules = {
  username: [{ required: true, message: "请输入用户名" }],
  password: [{ required: true, message: "请输入密码" }],
  agree: [{ validator: validateAgree }],
};
const loginForm = ref<FormInstance>();
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validateField("username");
  await formEl.validateField("password");
  await formEl.validateField("agree", (valid, fields) => {
    if (valid) {
      // 这里可以添加登录成功的逻辑代码
      // 如果 autoLogin 为 true，则可能需要将登录状态存储在 cookie 或 localStorage 中
      router.push("/");
    } else {
      console.log("验证失败！", fields);
      return false;
    }
  });
};

const forgotPassword = () => {
  // 这里可以跳转到找回密码页面或弹出找回密码的表单
  // 通常涉及到发送邮件或短信验证码等后端逻辑
  alert("点击了找回密码，将跳转到找回密码页面或弹出找回密码表单");
  // 使用 router.push 跳转到找回密码页面
  // this.$router.push('/forgot-password');
};

const handleContract = (e: Event) => {
  e.preventDefault();
  console.log("打开协议");
};
</script>
<template>
  <div class="login-wrap">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>会员登录</span>
          <span>
            立即注册
            <i>></i>
          </span>
        </div>
      </template>
      <el-form :model="form" ref="loginForm" :rules="rules">
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            placeholder="请输入用户名/邮箱/手机号"
            autofocus
            :validate-event="false"
          >
            <template #prepend>
              <el-icon><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            show-password
            :validate-event="false"
          >
            <template #prepend>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <div class="flex">
            <el-checkbox v-model="form.autoLogin">自动登录</el-checkbox>
            <a href="javascript:;">找回密码</a>
          </div>
        </el-form-item>
        <el-form-item>
          <div class="flex jcc">
            <el-button type="primary" @click="submitForm(loginForm)"
              >登录</el-button
            >
          </div>
        </el-form-item>
        <el-form-item prop="agree">
          <el-checkbox v-model="form.agree">
            登录即同意
            <span class="color-blue" @click.prevent="handleContract">
              XX网使用协议
            </span>
            、
            <span class="color-blue" @click.prevent="handleContract">
              隐私政策
            </span>
          </el-checkbox>
        </el-form-item>
      </el-form>
      <!-- <template #footer>Footer content</template> -->
    </el-card>
  </div>
</template>
<style lang="scss" scoped>
.login-wrap {
  width: 100vw;
  height: 100vh;
  background: url("~/assets/img/space.jpg") no-repeat;
  background-size: cover;
  position: relative;
  .el-card {
    --el-card-border-color: transparent;
    width: 360px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 200px;
    background: rgba($color: #fff, $alpha: 0.9);
    :deep(.el-card__body) {
      padding-top: 0;
    }
    .card-header {
      display: flex;
      justify-content: space-between;
      span:first-child {
        color: #333;
        font-size: 20px;
        font-weight: bold;
      }
      span:last-child {
        color: #dc143c;
        font-size: 14px;
        cursor: pointer;
        line-height: 26px;
        display: flex;
        align-items: center;
        i {
          font-style: normal;
          color: #fff;
          background-color: #dc143c;
          border-radius: 50%;
          display: inline-block;
          width: 16px;
          height: 16px;
          line-height: 16px;
          text-align: center;
          margin-left: 2px;
        }
      }
    }
    .flex {
      width: 100%;
      justify-content: space-between;
      &.jcc {
        justify-content: center;
      }
    }
    .color-blue {
      color: #3d6feb;
      cursor: pointer;
    }
  }
}
</style>
