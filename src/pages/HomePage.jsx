import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import NoteList from '../components/NoteList';
import SearchBar from '../components/SearchBar';
import { getActiveNotes } from '../utils/network-data';
import LocaleContext from '../contexts/LocaleContext';
import LoadingIndicator from '../components/LoadingIndicator';
import { FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { locale } = useContext(LocaleContext);
  const keyword = searchParams.get('keyword') || '';

  useEffect(() => {
    getActiveNotes().then(({ data }) => {
      setNotes(data);
      setLoading(false);
    });
  }, []);

  const onKeywordChangeHandler = (keyword) => {
    setSearchParams({ keyword });
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(keyword.toLowerCase())
  );

  if (loading) return <LoadingIndicator />;

  return (
    <section className="homepage">
      <h2>{locale === 'id' ? 'Catatan Aktif' : 'Active Notes'}</h2>
      <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} locale={locale} />
      <NoteList notes={filteredNotes} locale={locale} />
      <div className="homepage__action">
        <Link to="/notes/new" className="action" title={locale === 'id' ? 'Tambah' : 'Add'}><FiPlus /></Link>
      </div>
    </section>
  );
}

export default HomePage;
