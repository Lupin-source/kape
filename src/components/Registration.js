import React, { useState } from 'react';
import { db, serverTimestamp } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const [form, setForm] = useState({ fullName: '', contactNumber: '', instagram: '', confirm: false });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.fullName || !form.contactNumber || !form.instagram || !form.confirm) {
      setError('All fields are required.');
      return;
    }

    if (!/^09\d{9}$/.test(form.contactNumber)) {
      setError('Contact number must be in format 09xxxxxxxxx.');
      return;
    }

    if (form.instagram.includes(' ')) {
      setError('Instagram username must not contain spaces.');
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'raffle_entries'), {
        fullName: form.fullName,
        contactNumber: form.contactNumber,
        instagram: form.instagram,
        timestamp: serverTimestamp()
      });

      localStorage.setItem('raffleUser', JSON.stringify({
        fullName: form.fullName,
        contactNumber: form.contactNumber,
        instagram: form.instagram,
        docId: docRef.id
      }));

      navigate('/verify');
    } catch (err) {
      setError('Error submitting registration. Please try again.');
    }
  };

  return (
    <div className="container">
      <h1>Join the Raffle</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} required />
        <input type="tel" name="contactNumber" placeholder="Contact Number (09xxxxxxxxx)" value={form.contactNumber} onChange={handleChange} required />
        <input type="text" name="instagram" placeholder="Instagram Username" value={form.instagram} onChange={handleChange} required />
        <div className="checkbox-container">
          <input type="checkbox" name="confirm" checked={form.confirm} onChange={handleChange} required />
          <label>I confirm I want to join the raffle.</label>
        </div>
        <button type="submit">Submit Registration</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default Registration;