type Callback = (error?: string | Error | undefined) => void
interface LengthRange {
  min: number
  max: number
  message: string
}

// 判断路径是不是带协议的外链
export const isExternal = (path: string): boolean => {
  return /^(http(s)?:|mailto:|tel:)/.test(path)
}

// 校验账号
export const validateUsername = (rule, value, callback: Callback) => {
  if (value === '') {
    callback(new Error('请输入账号'))
  } else {
    callback()
  }
}
// 校验密码
export const validatePassword = (rule, value, callback) => {
  // const reg = /^(?![a-zA-Z]+$)(?![0-9]+$)[a-zA-Z0-9]{8,}$/;
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    callback()
  }
  // else if (!reg.test(value)) {
  //   callback(new Error("密码必须大于8位，且包含英文数字，不能出现空格!"));
  // }
}

// 校验密码
export const validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入原密码'))
  } else {
    callback()
  }
}

// 校验新密码
export const validateNewPass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入新密码'))
  } else {
    callback()
  }
}

// 校验手机号
export const checkPhone = (rule, value, callback) => {
  if (!value) {
    callback()
  } else if (value && !/^1[0-9]{10}$/.test(value)) {
    callback(new Error('请输入正确的手机号码'))
  } else {
    callback()
  }
}

// 以/开头，非空格 非必填
//value.indexOf(' ') !== -1 空格校验
export const isValidateTxtNonSpec = (rule, value, callback) => {
  const reg = /^[/][\w]{0}/ //以 / 开头
  if (value != null && value !== '') {
    if (!reg.test(value) || value.indexOf(' ') !== -1) {
      callback(new Error('不能有空格且以/开始'))
    } else {
      callback()
    }
  } else {
    callback()
  }
}
// 匹配非空字符串
export const noEmptySpace = (rule, value, callback) => {
  const reg = /^\S+$/
  if (value != null && value !== '') {
    if (!reg.test(value)) {
      callback(new Error('不能有空格'))
    } else {
      callback()
    }
  } else {
    callback()
  }
}

// 校验 包含小数的数字 5位正数 3位的小数
export const numberPointFiveThree = (rule, value, callback) => {
  const reg = /^(([1-9]{1}\d{0,4})|(0))(\.\d{1,3})?$/g
  if (value === '') {
    callback()
  } else if (!reg.test(value)) {
    callback(new Error('请输入正数,有效三位小数'))
  } else {
    callback()
  }
}

// 校验 大小写字母
export const validateAlphabets = (rule, value, callback) => {
  const reg = /^[A-Za-z]+$/
  if (value === '') {
    callback()
  } else if (!reg.test(value)) {
    callback(new Error('请输入英文字母'))
  } else {
    callback()
  }
}

// 校验 是否是数字 可以有小数点 小数点后三位
export const validateNumberPointThree = (rule, value, callback) => {
  const reg = /^[0-9]+([.]{1}[0-9]{1,3}){0,1}$/
  if (value === '' || value === null) {
    callback()
  } else if (!reg.test(value)) {
    callback(new Error('请输入数字,有效三位小数'))
  } else {
    callback()
  }
}

export const useValidator = () => {
  const required = (message?: string) => {
    return {
      required: true,
      message: message || '该项为必填项'
    }
  }

  const lengthRange = (val: any, callback: Callback, options: LengthRange) => {
    const { min, max, message } = options
    if (val.length < min || val.length > max) {
      callback(new Error(message))
    } else {
      callback()
    }
  }

  const notSpace = (val: any, callback: Callback, message: string) => {
    // 用户名不能有空格
    if (val.indexOf(' ') !== -1) {
      callback(new Error(message))
    } else {
      callback()
    }
  }

  const notSpecialCharacters = (val: any, callback: Callback, message: string) => {
    // 密码不能是特殊字符
    if (/[`~!@#$%^&*()_+<>?:"{},.\\/;'[\]]/gi.test(val)) {
      callback(new Error(message))
    } else {
      callback()
    }
  }

  // 两个字符串是否想等
  const isEqual = (val1: string, val2: string, callback: Callback, message: string) => {
    if (val1 === val2) {
      callback()
    } else {
      callback(new Error(message))
    }
  }

  return {
    required,
    lengthRange,
    notSpace,
    notSpecialCharacters,
    isEqual
  }
}
