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

  if (isAuthenticated) return <Navigate to={state?.from ?? '/'} />;

  return (
    <div className='auth-container auth'>
      <div className='auth-inputs-container'>
        <Card title='Авторизація'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='auth-input'>
              <div className='auth-input'>
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
                      <Password {...field} feedback={false} />
                      <label htmlFor={field.name}>Password</label>
                    </span>
                    {getFormErrorMessage(field.name)}
                  </div>
                )}
              />
            </div>
            {/* <div className='auth-input w-100'>
              <Checkbox
                id='rememberMe'
                checked={isRememberMe}
                onChange={toggleIsRememberMe}
              />
              <label htmlFor='rememberMe' className='ml-2 '>
                Запамʼятати мене
              </label>
            </div> */}
            <Button type='submit' disabled={isLoading} loading={isLoading}>
              Увійти
            </Button>
          </form>
          <Button
            label='Ще не маєте аккаунту? Зареєструватися'
            link
            onClick={goToRegistration}
          />
        </Card>
      </div>
    </div>
  );
};

export default Login;
