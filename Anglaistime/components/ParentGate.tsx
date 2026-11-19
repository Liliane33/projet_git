import React, { useState, useEffect } from 'react';

interface ParentGateProps {
  onUnlock: () => void;
  onCancel: () => void;
}

export const ParentGate: React.FC<ParentGateProps> = ({ onUnlock, onCancel }) => {
  const [question, setQuestion] = useState({ q: '', a: 0 });
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    const num1 = Math.floor(Math.random() * 5) + 1; // 1-5
    const num2 = Math.floor(Math.random() * 4) + 1; // 1-4
    setQuestion({ q: `${num1} + ${num2}`, a: num1 + num2 });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(input) === question.a) {
      onUnlock();
    } else {
      setError(true);
      setInput('');
      setTimeout(() => setError(false), 1000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center border-4 border-gray-800">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Réservé aux Parents</h2>
        <p className="text-gray-500 mb-6">Combien font :</p>
        
        <div className="text-4xl font-bold text-kid-purple mb-6 font-sans">
            {question.q} = ?
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
            <input 
                type="number" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full text-center text-3xl p-4 border-2 border-gray-300 rounded-xl focus:border-kid-blue outline-none"
                placeholder="?"
                autoFocus
            />
            {error && <p className="text-red-500 font-bold animate-bounce">Essaie encore !</p>}
            
            <div className="flex gap-4">
                <button type="button" onClick={onCancel} className="flex-1 py-3 text-gray-500 font-bold hover:bg-gray-100 rounded-xl">
                    Retour
                </button>
                <button type="submit" className="flex-1 py-3 bg-kid-blue text-white font-bold rounded-xl shadow-lg hover:bg-blue-400">
                    Entrer
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};
