import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import Toast from './Toast';

const Admin = () => {
  const [entries, setEntries] = useState([]);
  const [winner, setWinner] = useState(null);
  const [modal, setModal] = useState({
    isOpen: false,
    type: 'info',
    title: '',
    message: '',
    confirmText: '',
    onConfirm: null
  });
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('adminLoggedIn')) {
      navigate('/admin-login');
      return;
    }

    const fetchEntries = async () => {
      const querySnapshot = await getDocs(collection(db, 'raffle_entries'));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEntries(data);
    };

    fetchEntries();
  }, [navigate]);

  const handleDelete = async (id) => {
    setModal({
      isOpen: true,
      type: 'danger',
      title: 'Delete Entry',
      message: 'Are you sure you want to delete this entry? This action cannot be undone.',
      confirmText: 'Delete',
      onConfirm: async () => {
        try {
          await deleteDoc(doc(db, 'raffle_entries', id));
          setEntries(entries.filter(entry => entry.id !== id));
          if (winner && winner.id === id) {
            setWinner(null); // Reset winner if deleted
          }
        } catch (error) {
          console.error('Error deleting entry:', error);
          setToast({
            message: 'Error deleting entry. Please try again.',
            type: 'error'
          });
        }
      }
    });
  };

  const drawWinner = () => {
    if (entries.length === 0) {
      setModal({
        isOpen: true,
        type: 'warning',
        title: 'No Entries',
        message: 'No entries available to draw from.',
        confirmText: 'OK'
      });
      return;
    }
    const randomIndex = Math.floor(Math.random() * entries.length);
    const drawnWinner = entries[randomIndex];
    setWinner(drawnWinner);
    setToast({
      message: `Winner drawn: ${drawnWinner.fullName}!`,
      type: 'success'
    });
  };

  return (
    <div className="admin-container">
      <h1>Admin - Raffle Entries</h1>
      <button onClick={drawWinner} className="draw-btn">Draw Winner</button>
      {winner && (
        <div className="winner-section">
          <h2>Winner!</h2>
          <div className="winner-card">
            <h3>{winner.fullName}</h3>
            <p><strong>Contact:</strong> {winner.contactNumber}</p>
            <p><strong>Instagram:</strong> {winner.instagram}</p>
          </div>
        </div>
      )}
      {/* Table for desktop */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Contact Number</th>
              <th>Instagram</th>
              <th>Timestamp</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {entries.map(entry => (
              <tr key={entry.id}>
                <td>{entry.fullName}</td>
                <td>{entry.contactNumber}</td>
                <td>{entry.instagram}</td>
                <td>{entry.timestamp?.toDate().toString()}</td>
                <td>
                  <button onClick={() => handleDelete(entry.id)} className="delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Cards for mobile */}
      <div className="cards-container">
        {entries.map(entry => (
          <div key={entry.id} className="entry-card">
            <h3>{entry.fullName}</h3>
            <p><strong>Contact:</strong> {entry.contactNumber}</p>
            <p><strong>Instagram:</strong> {entry.instagram}</p>
            <p><strong>Timestamp:</strong> {entry.timestamp?.toDate().toString()}</p>
            <button onClick={() => handleDelete(entry.id)} className="delete-btn">Delete</button>
          </div>
        ))}
      </div>
      
      <Modal
        isOpen={modal.isOpen}
        onClose={() => setModal({ ...modal, isOpen: false })}
        onConfirm={modal.onConfirm}
        title={modal.title}
        message={modal.message}
        confirmText={modal.confirmText}
        type={modal.type}
      />
      
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default Admin;