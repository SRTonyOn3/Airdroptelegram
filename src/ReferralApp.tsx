import React, { useState, useEffect } from 'react';
import './index.css';
import { bear, coin, trophy } from './images';
import Arrow from './icons/Arrow';

interface Referral {
  id: string;
  name: string;
  points: number;
}

const ReferralApp: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [totalPoints, setTotalPoints] = useState(0);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [referralLink, setReferralLink] = useState('');

  useEffect(() => {
    // Aquí deberías hacer una llamada a tu API para obtener el link de referido real
    setReferralLink('https://t.me/YourBot?start=' + generateUniqueCode());
    
    // Aquí deberías hacer una llamada a tu API para obtener la lista real de referidos
    fetchReferrals();
  }, []);

  useEffect(() => {
    const newTotalPoints = referrals.reduce((sum, referral) => sum + referral.points, 0);
    setTotalPoints(newTotalPoints);
  }, [referrals]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    alert('Link de referido copiado al portapapeles!');
  };

  // Función para generar un código único (esto debería hacerse en el backend)
  const generateUniqueCode = () => {
    return Math.random().toString(36).substring(2, 15);
  };

  // Función para obtener referidos (simulada, debería ser una llamada a API real)
  const fetchReferrals = () => {
    // Simula una llamada a API
    setTimeout(() => {
      // Por ahora, dejamos la lista vacía
      setReferrals([]);
    }, 1000);
  };

  return (
    <div className="bg-gradient-main min-h-screen px-4 flex flex-col items-center text-white font-sans">
      <div className="absolute inset-0 h-1/2 bg-gradient-overlay z-0"></div>
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <div className="radial-gradient-overlay"></div>
      </div>

      <div className="w-full max-w-md mt-8 z-10">
        <button onClick={onBack} className="absolute top-4 left-4 bg-[#f9c035] text-black px-4 py-2 rounded-md flex items-center">
          <Arrow size={18} className="mr-2 transform rotate-180" /> Volver
        </button>

        <div className="bg-black bg-opacity-50 text-center py-4 rounded-xl mb-8 mt-16">
          <h1 className="text-2xl font-bold">Sistema de Referidos</h1>
        </div>
        
        <div className="mb-8 text-center">
          <div className="text-5xl font-bold flex items-center justify-center">
            <img src={coin} width={44} height={44} alt="Coin" />
            <span className="ml-2">{totalPoints.toLocaleString()}</span>
          </div>
          <div className="text-base mt-2 flex items-center justify-center">
            <img src={trophy} width={24} height={24} alt="Trophy" />
            <span className="ml-1">Puntos Totales de Referidos</span>
          </div>
        </div>

        <div className="bg-black bg-opacity-50 p-4 rounded-xl mb-8">
          <h2 className="text-xl font-bold mb-2">Tu Link de Referido:</h2>
          <div className="flex">
            <input 
              type="text" 
              value={referralLink} 
              readOnly 
              className="flex-grow bg-white bg-opacity-10 text-white p-2 rounded-l-md"
            />
            <button 
              onClick={handleCopyLink}
              className="bg-[#f9c035] text-black px-4 rounded-r-md hover:bg-[#fad258]"
            >
              Copiar
            </button>
          </div>
        </div>

        <div className="bg-black bg-opacity-50 p-4 rounded-xl">
          <h2 className="text-xl font-bold mb-4">Tus Referidos:</h2>
          {referrals.length === 0 ? (
            <p className="text-center text-gray-400">Aún no tienes referidos. ¡Comparte tu link para comenzar!</p>
          ) : (
            referrals.map((referral) => (
              <div key={referral.id} className="flex justify-between items-center mb-2 p-2 bg-white bg-opacity-10 rounded">
                <div className="flex items-center">
                  <img src={bear} width={32} height={32} alt="Bear" className="mr-2" />
                  <span>{referral.name}</span>
                </div>
                <div className="flex items-center">
                  <img src={coin} width={24} height={24} alt="Coin" className="mr-1" />
                  <span>{referral.points}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ReferralApp;