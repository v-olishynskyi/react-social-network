import * as yup from 'yup';

// const nameRegexp = /^[a-zA-Zа-яА-Я ]*$/;

const errors = {
  first_name: {
    match: 'Введіть коректне імʼя',
    required: 'Поле обовʼязкове',
  },
  last_name: {
    match: 'Введіть коректне прізвище',
    required: 'Поле обовʼязкове',
  },
  email: {
    required: 'Поле обовʼязкове',
    match: 'Не валідний e-mail',
  },
  password: {
    required: 'Поле обовʼязкове',
  },
  confirm_password: {
    required: 'Поле обовʼязкове',
    match: 'Паролі не співпадають',
  },
};

const schema = yup.object().shape({
  first_name: yup.string().required(errors.first_name.required),
  // .matches(nameRegexp, errors.first_name.match)
  last_name: yup.string().required(errors.last_name.required),
  // .matches(nameRegexp, errors.last_name.match)
  email: yup.string().email(errors.email.match).required(errors.email.required),
  password: yup.string().required(errors.password.required),
  confirm_password: yup
    .string()
    .required(errors.confirm_password.required)
    .oneOf([yup.ref('password')], errors.confirm_password.match),
});

export default schema;
