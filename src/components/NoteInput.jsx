import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { FiCheck } from 'react-icons/fi';
import LocaleContext from '../contexts/LocaleContext';

function NoteInput({ addNote }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const { locale } = useContext(LocaleContext);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (title.trim() && body.trim()) {
      addNote({ title, body });
    }
  };

  return (
    <form className="note-input" onSubmit={onSubmitHandler}>
      <input
        type="text"
        placeholder={locale === 'id' ? 'Judul Catatan' : 'Note Title'}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <div
        className="note-input__body"
        contentEditable
        data-placeholder={locale === 'id' ? 'Tuliskan catatanmu di sini...' : 'Write your note here...'}
        onInput={(e) => setBody(e.target.innerHTML)}
      />
      <div className="add-new-page__action">
        <button className="action" type="submit" title={locale === 'id' ? 'Simpan' : 'Save'}><FiCheck /></button>
      </div>
    </form>
  );
}

NoteInput.propTypes = {
  addNote: PropTypes.func.isRequired,
};

export default NoteInput;
