import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validDomains = [
    'gmail.com',
    'outlook.com',
    'yahoo.com',
    'icloud.com',
    'protonmail.com',
    'hotmail.com',
    'live.com',
    'msn.com',
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const domain = email.split('@')[1];

    if (!domain || !validDomains.includes(domain.toLowerCase())) {
      setError('❌ Please use a valid email (e.g. Gmail, Outlook, Yahoo).');
      return;
    }

    localStorage.setItem('futureflow-user', JSON.stringify({ email }));
    navigate('/planner');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center px-4 py-10">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-md rounded-3xl p-10 border border-white/20 shadow-2xl text-white">
        <div className="text-center mb-8">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc7jSabbD25622W9cNNBZWeG3HZFm8Gt48tw"
            alt="FutureFlow Logo"
            className="mx-auto w-16 h-16 rounded shadow-md border border-white"
          />
          <h1 className="text-3xl font-extrabold mt-4 tracking-wide">Sign In to FutureFlow</h1>
          <p className="text-sm text-gray-200 mt-1">Visualize your financial future</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-300"
              placeholder="you@gmail.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-300"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400 text-center -mt-2">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-yellow-400 text-gray-900 font-semibold hover:bg-yellow-300 transition-all shadow-md"
          >
            🚀 Continue to Planner
          </button>
        </form>

        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/')}
            className="text-sm text-blue-300 hover:underline"
          >
            ⬅️ Launch Dashboard
          </button>
        </div>

        <p className="text-xs text-center text-gray-300 mt-4">
          We only support sign-in with major email providers. 🔒
        </p>
      </div>
    </div>
  );
}
