import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ThankYou = () => {
  const [fullName, setFullName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('raffleUser'));
    if (!user) {
      navigate('/');
      return;
    }

    setFullName(user.fullName);
  }, [navigate]);

  return (
    <div className="container">
      <h1>Thank You, {fullName}!</h1>
      <div className="success-message">
        <div className="success-icon">✓</div>
        <p className="success-text">
          Your raffle entry has been successfully submitted!
        </p>
        <p className="night-message">
          🎉 Enjoy the night! 🎉
        </p>
        <p className="details-text">
          We'll notify you if you win. Keep an eye on our Instagram for updates!
        </p>
      </div>
      <div className="follow-links">
        <a href="https://www.instagram.com/4025kind/" target="_blank">@4025kind</a>
        <a href="https://www.instagram.com/kultura_konekta/" target="_blank">@kultura_konekta</a>
      </div>
    </div>
  );
};

export default ThankYou;