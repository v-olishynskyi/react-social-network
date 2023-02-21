import React from 'react';
import './styles.scss';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isAuthenticatedSelector } from '@store/auth';
import { Card } from 'primereact/card';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from './schema';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { RegistrationParams } from '@api/services/Auth';
import { useRegistration } from '@api/hooks/auth';

const Registration: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { from: string } | null;

  const isAuthenticated = useRecoilValue(isAuthenticatedSelector);

  const { isLoading, mutateAsync: registration } = useRegistration();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<RegistrationParams>({
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirm_password: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: RegistrationParams) => {
    await registration(data);
  };

  const goToLogin = () => navigate('/login');

  const getFormErrorMessage = (name: keyof RegistrationParams) => {
    return errors[name] ? (
      <small className='p-error'>{errors[name]?.message}</small>
    ) : (
      <small className='p-error'>&nbsp;</small>
    );
  };

  if (isAuthenticated) return <Navigate to={state?.from ?? '/'} />;

  return (
    <div className='registration-container auth'>
      <div className='registration-inputs-container'>
        <Card title='Реєстрація'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='registration-input'>
              <div className='registration-input'>
                <Controller
                  name='first_name'
                  control={control}
                  render={({ field, fieldState }) => (
                    <div className='p-fluid'>
                      <label
                        htmlFor={field.name}
                        className={classNames({
                          'p-error': fieldState.error,
                        })}
                      />
                      <span className='p-float-label'>
                        <InputText
                          {...field}
                          className={classNames({
                            'p-invalid': fieldState.error,
                          })}
                        />
                        <label htmlFor={field.name}>Імʼя</label>
                      </span>
                      {getFormErrorMessage(field.name)}
                    </div>
                  )}
                />
              </div>
              <div className='registration-input'>
                <Controller
                  name='last_name'
                  control={control}
                  render={({ field, fieldState }) => (
                    <div className='p-fluid'>
                      <label
                        htmlFor={field.name}
                        className={classNames({
                          'p-error': fieldState.error,
                        })}
                      />
                      <span className='p-float-label'>
                        <InputText
                          {...field}
                          className={classNames({
                            'p-invalid': fieldState.error,
                          })}
                        />
                        <label htmlFor={field.name}>Прізвище</label>
                      </span>
                      {getFormErrorMessage(field.name)}
                    </div>
                  )}
                />
              </div>
              <div className='registration-input'>
                <Controller
                  name='email'
                  control={control}
                  render={({ field, fieldState }) => (
                    <div className='p-fluid'>
                      <label
                        htmlFor={field.name}
                        className={classNames({
                          'p-error': fieldState.error,
                        })}
                      />
                      <span className='p-float-label'>
                        <InputText
                          {...field}
                          className={classNames({
                            'p-invalid': fieldState.error,
                          })}
                        />
                        <label htmlFor={field.name}>E-mail</label>
                      </span>
                      {getFormErrorMessage(field.name)}
                    </div>
                  )}
                />
              </div>
              <div className='registration-input'>
                <Controller
                  name='password'
                  control={control}
                  render={({ field, fieldState }) => (
                    <div className='p-fluid'>
                      <label
                        htmlFor={field.name}
                        className={classNames({
                          'p-error': fieldState.error,
                        })}
                      />
                      <span className='p-float-label'>
                        <Password
                          {...field}
                          feedback={false}
                          className={classNames({
                            'p-invalid': fieldState.error,
                          })}
                        />
                        <label htmlFor={field.name}>Пароль</label>
                      </span>
                      {getFormErrorMessage(field.name)}
                    </div>
                  )}
                />
              </div>
              <Controller
                name='confirm_password'
                control={control}
                render={({ field, fieldState }) => (
                  <div className='p-fluid'>
                    <label
                      htmlFor={field.name}
                      className={classNames({
                        'p-error': fieldState.error,
                      })}
                    />
                    <span className='p-float-label'>
                      <Password
                        {...field}
                        feedback={false}
                        className={classNames({
                          'p-invalid': fieldState.error,
                        })}
                      />
                      <label htmlFor={field.name}>Підтвердження паролю</label>
                    </span>
                    {getFormErrorMessage(field.name)}
                  </div>
                )}
              />
            </div>

            <Button type='submit' disabled={isLoading} loading={isLoading}>
              Підтвердити
            </Button>
          </form>

          <Button label='Вже маєте аккаунт? Увійти' link onClick={goToLogin} />
        </Card>
      </div>
    </div>
  );
};

export default Registration;
