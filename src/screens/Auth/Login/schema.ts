import * as yup from 'yup';

const errors = {
  email: {
    required: 'Поле обовʼязкове',
    match: 'Не валідний e-mail',
  },
  password: {
    required: 'Поле обовʼязкове',
  },
};

const schema = yup.object().shape({
  email: yup.string().email(errors.email.match).required(errors.email.required),
  password: yup.string().required(errors.password.required),
});

export default schema;
