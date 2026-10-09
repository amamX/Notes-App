import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import parser from 'html-react-parser';
import { format } from 'date-fns';
import { id, enUS } from 'date-fns/locale';
import { FiTrash2, FiArchive, FiInbox } from 'react-icons/fi';
import { getNote, deleteNote, archiveNote, unarchiveNote } from '../utils/network-data';
import LocaleContext from '../contexts/LocaleContext';
import LoadingIndicator from '../components/LoadingIndicator';

function DetailPage() {
  const { id: noteId } = useParams();
  const navigate = useNavigate();
  const { locale } = useContext(LocaleContext);
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNote(noteId).then(({ data }) => {
      setNote(data);
      setLoading(false);
    });
  }, [noteId]);

  if (loading) return <LoadingIndicator />;
  if (!note) return <p className="notes-list__empty-message">{locale === 'id' ? 'Catatan tidak ditemukan' : 'Note not found'}</p>;

  const formattedDate = format(new Date(note.createdAt), 'dd MMMM yyyy', {
    locale: locale === 'id' ? id : enUS
  });

  const onDelete = async () => {
    await deleteNote(noteId);
    navigate('/');
  };

  const onArchive = async () => {
    if (note.archived) {
      await unarchiveNote(noteId);
    } else {
      await archiveNote(noteId);
    }
    navigate('/');
  };

  return (
    <section className="detail-page">
      <h3 className="detail-page__title">{note.title}</h3>
      <p className="detail-page__createdAt">{formattedDate}</p>
      <div className="detail-page__body">{parser(note.body)}</div>
      <div className="detail-page__action">
        <button className="action" onClick={onArchive} title={note.archived ? (locale === 'id' ? 'Aktifkan' : 'Unarchive') : (locale === 'id' ? 'Arsipkan' : 'Archive')}>
          {note.archived ? <FiInbox /> : <FiArchive />}
        </button>
        <button className="action" onClick={onDelete} title={locale === 'id' ? 'Hapus' : 'Delete'}>
          <FiTrash2 />
        </button>
      </div>
    </section>
  );
}

export default DetailPage;
