import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Verify = () => {
  const [followed, setFollowed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('raffleUser'));
    if (!user) {
      navigate('/');
    }
  }, [navigate]);

  const handleContinue = () => {
    if (followed) {
      navigate('/qr');
    }
  };

  return (
    <div className="container">
      <h1>Follow Our Instagram</h1>
      <p>Follow our Instagram pages to continue your raffle entry:</p>
      <div className="follow-links">
        <a href="https://instagram.com/coffeeShopMain" target="_blank">@coffeeShopMain</a>
        <a href="https://instagram.com/coffeeShopBranch" target="_blank">@coffeeShopBranch</a>
      </div>
      <div className="checkbox-container">
        <input type="checkbox" checked={followed} onChange={(e) => setFollowed(e.target.checked)} />
        <label>I have followed both Instagram accounts.</label>
      </div>
      <button onClick={handleContinue} disabled={!followed}>Continue</button>
    </div>
  );
};

export default Verify;