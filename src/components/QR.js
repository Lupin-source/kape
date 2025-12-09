import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QRious from 'qrious';

const QR = () => {
  const [fullName, setFullName] = useState('');
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('raffleUser'));
    if (!user) {
      navigate('/');
      return;
    }

    setFullName(user.fullName);

    new QRious({
      element: canvasRef.current,
      value: JSON.stringify(user),
      size: 200
    });
  }, [navigate]);

  return (
    <div className="container">
      <h1>Your QR Code</h1>
      <p>Full Name: {fullName}</p>
      <div className="qr-container">
        <canvas ref={canvasRef}></canvas>
      </div>
      <p>Show this QR at the coffee shop counter to complete your raffle entry.</p>
    </div>
  );
};

export default QR;