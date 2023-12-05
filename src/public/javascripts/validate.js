export default options => {
  const form = document.querySelector(options.form);
  const parent = (input, option) => input.closest(options.group).classList[option](options.color);
  const loop = callback => options.rules.forEach(rule => {
    const input = form.querySelectorAll(rule.selector);
    Array.from(input).forEach(input => {
      const error = input.closest(options.group).querySelector(options.error)
      callback(rule, input, error);
    })
  })
  let blockRule = {}, isError, isCheckbox, isRadio, isr;
  const validate = (input, rule, error) => {
    let errorMess;
    const rules = blockRule[rule.selector];
    for (let value of rules) {
      switch (input.type) {
        case 'radio':
          input.checked && (isr = true)
          isr ? errorMess = value(input.value) : errorMess = value('');
          break;
        case 'checkbox':
          input.checked && (isError = true)
          isError ? errorMess = value(input.value) : errorMess = value('');
          break;
        default: errorMess = value(input.value);
      } if (errorMess) break;
    }
    errorMess ? (error.innerText = errorMess) & parent(input, 'add') : oninput(input, error);
    return !errorMess;
  }
  const oninput = (input, error) => parent(input, 'remove') & (error.innerText = '');
  const getData = {
    radio: (values, input) => {
      input.checked ? isRadio = true ? (values[input.name] = input.value) : '' : ''
      isRadio || (values[input.name] = '')
    }, checkbox: (values, input) => {
      input.checked && (isCheckbox = true);
      isCheckbox ? input.checked &&= Array.isArray(values[input.name]) ? values[input.name].push(input.value) : values[input.name] = [input.value] : (values[input.name] = '');
    }, file: (values, input) => values[input.name] = input.files
  }
  if (form) {
    form.onsubmit = e => {
      e.preventDefault();
      let isForm = true;
      loop((rule, input, error) => validate(input, rule, error) || (isForm = false));
      if (isForm) if (typeof options.onSubmit === 'function') {
        let input = form.querySelectorAll('input[type]');
        const obj = Array.from(input).reduce((values, input) => {
          getData[input.type] ? getData[input.type](values, input) : values[input.name] = input.value;
          return values;
        }, {});
        options.onSubmit(obj);
      } else form.submit();
    }
    loop((rule, input, error) => {
      Array.isArray(blockRule[rule.selector]) ? blockRule[rule.selector].push(rule.handle) : blockRule[rule.selector] = [rule.handle];
      input.onblur = () => validate(input, rule, error)
      input.oninput = () => oninput(input, error);
    });
  }
}
export const requied = (selector, mess) => {
  return { selector, handle: value => value.trim() ? undefined : mess || 'Vui lòng nhập trường này' };
}
export const email = (selector, mess) => {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return { selector, handle: value => value.match(regex) ? undefined : mess || 'Trường này phải là email' };
}
export const password = (selector, min, mess) => {
  return { selector, handle: value => value.length >= min ? undefined : mess || `Vui lòng nhập tối thiểu ${min} kí tự` };
}
export const confirmPassword = (selector, getPassword, mess) => {
  const password = document.querySelector(getPassword)
  return { selector, handle: value => value === password.value ? undefined : mess || 'Giá trị nhập vào không chính xác' }
}
/**
 * -----------HOW TO USING
 * import ...,{requied, email, password, confirmPassword} from ...
 *      ...({
 *          form:'selector',
 *          group:'selector',
 *          error:'selector',
 *          color:'class',
 *          rules:[
 *              requied('selector', 'mess'),
 *              email('selector','mess'),
 *              password('selector',min,'mess'),
 *              confirmPassword('selector','selector Password','mess')
 *          ],
 *          onsubmit(data) {
 *              CALL API   
 *          }
 *      })
 */