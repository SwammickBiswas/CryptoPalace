import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/Api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await API.post('/api/user/login', { email, password });
      localStorage.setItem('token', data.token);
      setMsg('✅ Logged in successfully!');
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (err) {
      setMsg(`❌ ${err.response?.data?.message || 'Login failed'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1589652717521-10c0d092dea9?fit=crop&w=1740&q=80)' }}
    >
      <div className="backdrop-blur-md bg-white/30 p-8 rounded-xl shadow-2xl w-96 border border-white/40 transform transition hover:scale-105">
        <h2 className="text-2xl font-bold text-center text-white mb-4">Welcome Back</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            className="border border-white/50 bg-white/20 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-white"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            className="border border-white/50 bg-white/20 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-white"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded text-white font-bold transition ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        {msg && <p className="text-center mt-4 text-white text-sm">{msg}</p>}
      </div>
    </div>
  );
};

export default Login;
