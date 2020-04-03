export function validateMobileMail(rule, value, callback) {
  if (!value || !/^(\w+@\w+.\w+)|(1[0-9]{10})$/g.test(value)) {
    callback(new Error('请输入正确的邮箱或手机号'))
  }
  callback()
}

export function validateMobile(rule, value, callback) {
  if (!value || !/^(1[0-9]{10})$/g.test(value)) {
    callback(new Error('请输入11位手机号'))
  }
  callback()
}

export function validateMail(rule, value, callback) {
  if (!value || !/^(\w+@\w+.\w+)$/g.test(value)) {
    callback(new Error('请输入正确的邮箱'))
  }
  callback()
}

export function validatePassword(rule, value, callback) {
  if (!value || !/^[a-zA-Z\d]{6,15}$/g.test(value)) {
    callback(new Error('请输入6到15位的数字或字母组成的密码'))
  }
  callback()
}

export function validateCaptcha(rule, value, callback) {
  if (!value || !/^\d{6}$/g.test(value)) {
    callback(new Error('请输入6位验证码'))
  }
}
