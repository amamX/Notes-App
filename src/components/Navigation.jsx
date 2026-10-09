import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FiHome, FiArchive, FiLogOut, FiSun, FiMoon } from 'react-icons/fi';
import { MdLanguage } from 'react-icons/md';
import ThemeContext from '../contexts/ThemeContext';
import LocaleContext from '../contexts/LocaleContext';

function Navigation({ logout, name }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { locale, toggleLocale } = useContext(LocaleContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="app-header">
      <h1><Link to="/">Notes App</Link></h1>
      <nav className="navigation">
        <ul>
          <li><Link to="/" title={locale === 'id' ? 'Beranda' : 'Home'}><FiHome /></Link></li>
          <li><Link to="/archives" title={locale === 'id' ? 'Arsip' : 'Archives'}><FiArchive /></Link></li>
        </ul>
        <button className="btn-icon" onClick={toggleLocale} title={locale === 'id' ? 'Translate' : 'Terjemahkan'}>
          <MdLanguage />
        </button>
        <button className="btn-icon" onClick={toggleTheme} title={locale === 'id' ? 'Ubah Tema' : 'Toggle Theme'}>
          {theme === 'dark' ? <FiSun /> : <FiMoon />}
        </button>
        <button className="btn-icon" onClick={handleLogout} title={locale === 'id' ? 'Keluar' : 'Logout'}>
          <FiLogOut /> {name}
        </button>
      </nav>
    </header>
  );
}

Navigation.propTypes = {
  logout: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default Navigation;
