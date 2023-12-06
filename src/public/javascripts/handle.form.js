import validate, { requied, email, password, confirmPassword } from './validate.js';
validate({
  form: '#form-login',
  group: '.form-group',
  error: '.form-message',
  color: 'invalid',
  rules: [
    requied('.user__input-name'),
    requied('.user__input-email'),
    requied('.user__input-pass'),
    email('.user__input-email'),
    password('.user__input-pass', 6),
  ]
})
validate({
  form: '#form-signup',
  group: '.form-group',
  error: '.form-message',
  color: 'invalid',
  rules: [
    requied('.user__input-name'),
    email('.user__input-email'),
    requied('.user__input-conf'),
    requied('.user__input-email'),
    password('.user__input-pass', 6),
    confirmPassword('.user__input-conf', '.user__input-pass', 'mật khẩu không trùng khớp')
  ]
})
validate({
  form: '#form-profile',
  group: '.form-group',
  error: '.form-message',
  color: 'invalid',
  rules: [
    requied('.profile-username'),
    requied('.profile-email'),
    email('.profile-email'),
  ]
})
// form checkout
validate({
  form: '#form-checkout',
  group: '.form-group',
  error: '.form-message',
  color: 'invalid',
  rules: [
    requied('.user__input-name'),
  ]
})