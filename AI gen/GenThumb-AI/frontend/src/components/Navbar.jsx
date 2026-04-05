import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Determine if we are in the "App" context vs "Landing" context
  const isAppPage = ['/dashboard', '/generate', '/editor'].includes(location.pathname);

  return (
    <nav className="bg-dark-900/80 backdrop-blur-md border-b border-white/5 py-4 px-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to={user ? "/dashboard" : "/"} className="flex items-center gap-2 text-2xl font-bold text-white hover:opacity-80 transition">
          <div className="flex shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#db2777"/>
              <path d="M2 17L12 22L22 17" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="#f472b6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">GenThumb</span>
        </Link>

        {/* Desktop Links - Only show landing links if not on an app page */}
        {!isAppPage && (
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium text-white hover:text-brand-400 transition">Home</Link>
            <a href="/#features" className="text-sm font-medium text-gray-300 hover:text-brand-400 transition">Features</a>
            <Link to="/about" className="text-sm font-medium text-gray-300 hover:text-brand-400 transition">About</Link>
          </div>
        )}

        {/* CTA Button / User Profile */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3 md:gap-6">
              {!isAppPage && (
                <Link to="/dashboard" className="text-sm font-medium text-gray-300 hover:text-brand-400 transition hidden md:block">Dashboard</Link>
              )}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-500/20 border border-brand-500/50 flex items-center justify-center text-brand-400 text-xs font-bold uppercase">
                  {user.name?.charAt(0)}
                </div>
                <span className="text-sm font-medium text-gray-300 hidden sm:block">Hi, {user.name}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="bg-white/5 border border-white/10 hover:bg-white/10 text-white px-5 py-2 rounded-full text-sm font-semibold transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link 
                to="/login" 
                className="text-sm font-bold text-gray-300 hover:text-white transition hidden sm:block"
              >
                Log in
              </Link>
              <Link 
                to="/signup" 
                className="bg-brand-500 hover:bg-brand-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition shadow-lg shadow-brand-500/20"
              >
                Start free
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
