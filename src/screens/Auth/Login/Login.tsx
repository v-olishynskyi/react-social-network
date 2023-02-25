import React from 'react';
import './styles.scss';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { useLogin } from '@api/hooks/auth';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormStateType } from './types';
import schema from './schema';
import { classNames } from 'primereact/utils';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isAuthenticatedSelector } from '@store/auth';
import { Logo } from '@components';

const Login = () => {
  const navigate = useNavigate();

  const isAuthenticated = useRecoilValue(isAuthenticatedSelector);
  const location = useLocation();
  const state = location.state as { from: string } | null;

  const { mutateAsync, isLoading } = useLogin();

  const [isRememberMe, setIsRememberMe] = React.useState(false);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormStateType>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const toggleIsRememberMe = () => setIsRememberMe(prev => !prev);

  const onSubmit = async ({ email, password }: FormStateType) => {
    const params = {
      email,
      password,
      isRememberMe,
    };
    await mutateAsync(params);

    reset();
  };

  const getFormErrorMessage = (name: keyof FormStateType) => {
    return errors[name] ? (
      <small className='p-error'>{errors[name]?.message}</small>
    ) : (
      <small className='p-error'>&nbsp;</small>
    );
  };

  const goToRegistration = () => navigate('/registration');
  const goToForgotPassword = () => navigate('/forgot-password');

  if (isAuthenticated) return <Navigate to={state?.from ?? '/'} />;

  return (
    <div className='auth-wrapper auth'>
      <header className='auth-header'>
        <Logo />
      </header>
      <main className='auth-main'>
        <h1 className='title'>Авторизація</h1>
        <div className='auth-form-wrapper'>
          <Card>
            <div className='social-auth-wrapper'>
              <Button
                disabled
                label='Log in with Google'
                severity='secondary'
                icon='pi pi-google'
              />
              <Button
                disabled
                label='Log in with Apple'
                severity='secondary'
                icon='pi pi-apple'
              />
            </div>
            <div className='or-divider'>
              <div className='divider' />
              <span>OR</span>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name='email'
                control={control}
                render={({ field, fieldState }) => (
                  <div className='p-fluid input'>
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
              <Controller
                name='password'
                control={control}
                render={({ field, fieldState }) => (
                  <div className='p-fluid '>
                    <label
                      htmlFor={field.name}
                      className={classNames({
                        'p-error': fieldState.error,
                      })}
                    />
                    <span className='p-float-label'>
                      <Password {...field} toggleMask feedback={false} />
                      <label htmlFor={field.name}>Password</label>
                    </span>
                    {getFormErrorMessage(field.name)}
                  </div>
                )}
              />
              <div className='form-remember-wrapper'>
                <div>
                  <Checkbox
                    inputId='rememberMe'
                    checked={isRememberMe}
                    onChange={toggleIsRememberMe}
                  />
                  <label htmlFor='rememberMe' className='ml-2 '>
                    Запамʼятати мене
                  </label>
                </div>
                <div>
                  <Button
                    label='Забули пароль?'
                    link
                    type='button'
                    onClick={goToForgotPassword}
                  />
                </div>
              </div>
              <div className='button-wrapper'>
                <Button
                  type='submit'
                  icon='pi pi-check'
                  disabled={isLoading}
                  loading={isLoading}>
                  Увійти
                </Button>
              </div>
            </form>
            <div className='button-wrapper'>
              <Button
                label={`Ще не маєте аккаунту?\nЗареєструватися`}
                link
                type='button'
                onClick={goToRegistration}
              />
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Login;
