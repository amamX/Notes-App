import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { login } from '../utils/network-data';
import useInput from '../hooks/useInput';
import LocaleContext from '../contexts/LocaleContext';

function LoginPage({ loginSuccess }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const { locale } = useContext(LocaleContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const { error, data } = await login({ email, password });
    if (!error) {
      loginSuccess(data);
    }
  };

  return (
    <section className="login-page">
      <h2>{locale === 'id' ? 'Yuk, login untuk menggunakan aplikasi.' : 'Login to use app, please.'}</h2>
      <form onSubmit={onSubmitHandler} className="input-login">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" value={email} onChange={onEmailChange} required />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" value={password} onChange={onPasswordChange} required />
        <button type="submit">{locale === 'id' ? 'Masuk' : 'Login'}</button>
      </form>
      <p>{locale === 'id' ? 'Belum punya akun?' : 'Don\'t have an account?'} <Link to="/register">{locale === 'id' ? 'Daftar di sini.' : 'Register here.'}</Link></p>
    </section>
  );
}

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;
