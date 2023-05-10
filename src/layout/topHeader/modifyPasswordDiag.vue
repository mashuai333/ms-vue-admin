<template>
  <el-dialog
    v-model="visibleDiag"
    title="修改密码"
    :before-close="closeDialog"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    width="400px">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="state.rules"
      label-position="right"
      label-width="90px"
      hide-required-asterisk>
      <el-form-item label="原密码" prop="password">
        <el-input
          v-model.trim="ruleForm.password"
          type="password"
          show-password
          autocomplete="off" />
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input
          v-model.trim="ruleForm.newPassword"
          type="password"
          show-password
          autocomplete="off" />
      </el-form-item>
      <el-form-item label="确认新密码" prop="affirmPassword">
        <el-input
          v-model.trim="ruleForm.affirmPassword"
          type="password"
          show-password
          autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" :loading="sureLoading" @click="submitForm(ruleFormRef)"
          >确定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { updatePassword } from '@/api/login'
import { ElMessage } from 'element-plus'
import { validatePass } from '@/utils/validate'

const validateNewPass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码！'))
  } else {
    if (ruleForm.value.affirmPassword !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('affirmPassword', () => null)
    }
    callback()
  }
}

const validateAffirmPass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入密码！'))
  } else if (value !== ruleForm.value.newPassword) {
    callback(new Error('两遍输入密码不一致！'))
  } else {
    callback()
  }
}

const ruleFormRef = ref(null)
const sureLoading = ref(false)
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})
const visibleDiag = computed(() => props.visible)

const ruleForm = ref({
  password: '',
  newPassword: '',
  affirmPassword: ''
})

const state = reactive({
  rules: {
    password: [{ validator: validatePass, trigger: 'blur' }],
    newPassword: [{ validator: validateNewPass, trigger: 'blur' }],
    affirmPassword: [{ validator: validateAffirmPass, trigger: 'blur' }]
  }
})
// 关闭弹框
const closeDialog = () => {
  ruleFormRef.value.resetFields()
  emit('update:visible', false)
}

// 修改密码提交
const submitForm = formEl => {
  if (!formEl) return
  formEl.validate(valid => {
    if (valid) {
      const param = {
        oldPassword: ruleForm.value.password,
        newPassword: ruleForm.value.newPassword
      }
      sureLoading.value = true
      updatePassword(param)
        .then(() => {
          ElMessage.success('修改成功')
          emit('submitForm')
          emit('update:visible', false)
          sureLoading.value = false
        })
        .catch(() => {
          sureLoading.value = false
        })
    } else {
      return false
    }
  })
}

const emit = defineEmits(['submitForm', 'update:visible'])
</script>
