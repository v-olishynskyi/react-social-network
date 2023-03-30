import React from 'react';
import './styles.scss';
import { Password } from 'primereact/password';
import { Controller, useForm } from 'react-hook-form';
import { FormState } from './types';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './schema';
import { classNames } from 'primereact/utils';
import { Button } from 'primereact/button';
import { useChangePassword } from '@api/hooks/profile';

const initialState: FormState = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};

const PasswordSecurity: React.FC = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormState>({
    defaultValues: initialState,
    resolver: yupResolver(schema),
  });

  const { mutateAsync: changePassword, isLoading: isChangingPassword } =
    useChangePassword();

  const getFormErrorMessage = (name: keyof FormState) => {
    return errors[name] ? (
      <small className='p-error'>{errors[name]?.message}</small>
    ) : (
      <small className='p-error'>&nbsp;</small>
    );
  };

  const onSubmit = async (values: FormState) => {
    await changePassword(values.newPassword);
    reset();
  };

  return (
    <div className='change-password-wrapper'>
      <h3 className='title'>Змінити пароль</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name='currentPassword'
          control={control}
          render={({ field, fieldState }) => (
            <div className='p-fluid mb-4'>
              <label
                htmlFor={field.name}
                className={classNames({
                  'p-error': fieldState.error,
                })}
              />
              <span className='p-float-label'>
                <Password {...field} toggleMask feedback={false} />
                <label htmlFor={field.name}>Поточний пароль</label>
              </span>
              {getFormErrorMessage(field.name)}
            </div>
          )}
        />
        <Controller
          name='newPassword'
          control={control}
          render={({ field, fieldState }) => (
            <div className='p-fluid mb-4'>
              <label
                htmlFor={field.name}
                className={classNames({
                  'p-error': fieldState.error,
                })}
              />
              <span className='p-float-label'>
                <Password {...field} toggleMask feedback={false} />
                <label htmlFor={field.name}>Новий пароль</label>
              </span>
              {getFormErrorMessage(field.name)}
            </div>
          )}
        />
        <Controller
          name='confirmPassword'
          control={control}
          render={({ field, fieldState }) => (
            <div className='p-fluid mb-4'>
              <label
                htmlFor={field.name}
                className={classNames({
                  'p-error': fieldState.error,
                })}
              />
              <span className='p-float-label'>
                <Password {...field} toggleMask feedback={false} />
                <label htmlFor={field.name}>Підтвердіть пароль</label>
              </span>
              {getFormErrorMessage(field.name)}
            </div>
          )}
        />
        <Button
          type='submit'
          loading={isChangingPassword}
          disabled={isChangingPassword}>
          Зберегти
        </Button>
      </form>
    </div>
  );
};

export default PasswordSecurity;
