import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import NoteList from '../components/NoteList';
import SearchBar from '../components/SearchBar';
import { getArchivedNotes } from '../utils/network-data';
import LocaleContext from '../contexts/LocaleContext';
import LoadingIndicator from '../components/LoadingIndicator';

function ArchivePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { locale } = useContext(LocaleContext);
  const keyword = searchParams.get('keyword') || '';

  useEffect(() => {
    getArchivedNotes().then(({ data }) => {
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
    <section className="archives-page">
      <h2>{locale === 'id' ? 'Catatan Arsip' : 'Archived Notes'}</h2>
      <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} locale={locale} />
      <NoteList notes={filteredNotes} locale={locale} />
    </section>
  );
}

export default ArchivePage;
