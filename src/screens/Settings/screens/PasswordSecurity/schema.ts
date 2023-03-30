import * as Yup from 'yup';

const errors = {
  password: {
    required: 'Поле обовʼязкове',
  },
  confirm_password: {
    required: 'Поле обовʼязкове',
    match: 'Паролі не співпадають',
  },
};

export const schema = Yup.object().shape({
  currentPassword: Yup.string().required(errors.password.required),
  newPassword: Yup.string().required(errors.password.required),
  confirmPassword: Yup.string()
    .required(errors.password.required)
    .oneOf([Yup.ref('newPassword')], errors.confirm_password.match),
});
