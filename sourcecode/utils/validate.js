export const isValid = function (types, value) {
  let valid = true;
  for (const type of types.split(',')) {
    switch (type) {

      case 'required':
        valid = (Boolean(value)) ? valid : false;
        break;

      case 'email':
        value = value.replace(/\s/g, '');
        const emailRegexp = `^([\\w-]+(?:\\.[\\w-]+)*)@((?:[\\w-]+\\.)*\\w[\\w-]
        {0,66})\\.([a-z]{2,6}(?:\\.[a-z]{2})?)$`.replace(/\s/g, '');
        const emailPattern = new RegExp(emailRegexp, 'i');

        valid = (emailPattern.test(value)) ? valid : false;
        break;

      case 'phone':
        value = value.replace(/\s/g, '');
        const phonePattern = new RegExp(`^$|[^0-9-+().]+`, 'i');

        valid = (!phonePattern.test(value)) ? valid : false;
        break;
    }
  }
  return valid;
};
