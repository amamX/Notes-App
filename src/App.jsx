import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import ArchivePage from './pages/ArchivePage';
import DetailPage from './pages/DetailPage';
import AddPage from './pages/AddPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { getUserLogged, putAccessToken } from './utils/network-data';
import { ThemeProvider } from './contexts/ThemeContext';
import { LocaleProvider } from './contexts/LocaleContext';
import LoadingIndicator from './components/LoadingIndicator';
import { FiSun, FiMoon } from 'react-icons/fi';
import { MdLanguage } from 'react-icons/md';

function App() {
  const [authedUser, setAuthedUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [locale, setLocale] = useState(localStorage.getItem('locale') || 'id');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  const toggleLocale = () => {
    setLocale((prevLocale) => {
      const newLocale = prevLocale === 'id' ? 'en' : 'id';
      localStorage.setItem('locale', newLocale);
      return newLocale;
    });
  };

  const themeContextValue = useMemo(() => ({ theme, toggleTheme }), [theme]);
  const localeContextValue = useMemo(() => ({ locale, toggleLocale }), [locale]);

  useEffect(() => {
    getUserLogged().then(({ data }) => {
      setAuthedUser(data);
      setInitializing(false);
    });
  }, []);

  const onLoginSuccess = async ({ accessToken }) => {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    setAuthedUser(data);
  };

  const onLogout = () => {
    setAuthedUser(null);
    putAccessToken('');
  };

  if (initializing) {
    return <LoadingIndicator />;
  }

  if (authedUser === null) {
    return (
      <ThemeProvider value={themeContextValue}>
        <LocaleProvider value={localeContextValue}>
          <div className="app-container">
            <header className="app-header">
              <h1>Notes App</h1>
              <nav className="navigation">
                <button className="btn-icon" onClick={toggleLocale} title={locale === 'id' ? 'Translate' : 'Terjemahkan'}><MdLanguage /></button>
                <button className="btn-icon" onClick={toggleTheme} title={locale === 'id' ? 'Ubah Tema' : 'Toggle Theme'}>
                  {theme === 'dark' ? <FiSun /> : <FiMoon />}
                </button>
              </nav>
            </header>
            <main>
              <Routes>
                <Route path="/*" element={<LoginPage loginSuccess={onLoginSuccess} />} />
                <Route path="/register" element={<RegisterPage />} />
              </Routes>
            </main>
          </div>
        </LocaleProvider>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider value={themeContextValue}>
      <LocaleProvider value={localeContextValue}>
        <div className="app-container">
          <Navigation logout={onLogout} name={authedUser.name} />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/archives" element={<ArchivePage />} />
              <Route path="/notes/new" element={<AddPage />} />
              <Route path="/notes/:id" element={<DetailPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>
        </div>
      </LocaleProvider>
    </ThemeProvider>
  );
}

export default App;
