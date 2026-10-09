import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import parser from 'html-react-parser';
import { format } from 'date-fns';
import { id, enUS } from 'date-fns/locale';

function NoteItem({ note, locale }) {
  const formattedDate = format(new Date(note.createdAt), 'dd MMMM yyyy', {
    locale: locale === 'id' ? id : enUS
  });

  return (
    <article className="note-item">
      <h3 className="note-item__title">
        <Link to={`/notes/${note.id}`}>{note.title}</Link>
      </h3>
      <p className="note-item__createdAt">{formattedDate}</p>
      <div className="note-item__body">{parser(note.body)}</div>
    </article>
  );
}

NoteItem.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  locale: PropTypes.string.isRequired,
};

export default NoteItem;
