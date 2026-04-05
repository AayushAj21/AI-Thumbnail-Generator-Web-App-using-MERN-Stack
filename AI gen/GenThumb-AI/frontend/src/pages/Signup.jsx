import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data } = await api.post('/auth/signup', { name, email, password });
      login(data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-20 px-6 flex items-center justify-center">
      <div className="max-w-md w-full bg-dark-800 p-8 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden group">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 rounded-full bg-fuchsia-500/20 blur-2xl"></div>
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 rounded-full bg-brand-500/20 blur-2xl"></div>
        
        <div className="text-center mb-8 relative z-10">
          <h2 className="text-3xl font-extrabold text-white">Create Account</h2>
          <p className="text-gray-400 mt-2">Start generating 10x better thumbnails</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-500 text-sm flex items-center gap-2 animate-shake">
            <Icon icon="mdi:alert-circle-outline" className="text-lg flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={submitHandler} className="space-y-6 relative z-10">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon icon="mdi:account-outline" className="text-gray-500 text-lg" />
              </div>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-dark-900 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent transition outline-none" 
                placeholder="John Doe"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon icon="mdi:email-outline" className="text-gray-500 text-lg" />
              </div>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-dark-900 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent transition outline-none" 
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon icon="mdi:lock-outline" className="text-gray-500 text-lg" />
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-dark-900 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent transition outline-none" 
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-3 px-4 bg-gradient-to-r from-brand-600 to-fuchsia-600 hover:from-brand-500 hover:to-fuchsia-500 text-white font-bold rounded-xl shadow-lg shadow-brand-500/30 transition transform hover:-translate-y-0.5 flex items-center justify-center gap-3 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading && <Icon icon="line-md:loading-twotone-loop" className="text-xl" />}
            {loading ? 'Creating Account...' : 'Create Free Account'}
          </button>
        </form>

        <div className="mt-8 flex items-center justify-between">
          <span className="w-1/5 border-b border-gray-700"></span>
          <span className="text-xs text-gray-500 uppercase tracking-wider">or sign up with</span>
          <span className="w-1/5 border-b border-gray-700"></span>
        </div>

        <button className="mt-6 w-full py-3 px-4 bg-white text-gray-900 hover:bg-gray-100 font-bold rounded-xl flex items-center justify-center gap-2 transition">
          <Icon icon="flat-color-icons:google" className="text-xl" /> Google
        </button>

        <p className="mt-8 text-center text-gray-400 text-sm">
          Already have an account? <Link to="/login" className="text-brand-500 hover:text-brand-400 font-semibold transition">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
