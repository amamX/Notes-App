import React from 'react';
import PropTypes from 'prop-types';
import NoteItem from './NoteItem';

function NoteList({ notes, locale }) {
  if (!notes.length) {
    return <p className="notes-list__empty-message">{locale === 'id' ? 'Tidak ada catatan' : 'No notes found'}</p>;
  }

  return (
    <div className="notes-list">
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} locale={locale} />
      ))}
    </div>
  );
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  locale: PropTypes.string.isRequired,
};

export default NoteList;
