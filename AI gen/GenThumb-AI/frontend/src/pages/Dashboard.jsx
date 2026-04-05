import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const Dashboard = () => {
  const { user, refreshProfile } = useAuth();
  const { addToast } = useToast();
  const [thumbnails, setThumbnails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchThumbnails = async () => {
      try {
        const { data } = await api.get('/thumbnail/history');
        setThumbnails(data);
      } catch (err) {
        console.error("Error fetching thumbnails:", err);
        addToast("Failed to load your history.", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchThumbnails();
    refreshProfile(); // Sync credits on mount
  }, [addToast, refreshProfile]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this thumbnail?")) return;
    try {
      await api.delete(`/thumbnail/${id}`);
      setThumbnails(thumbnails.filter(t => t._id !== id));
      addToast("Thumbnail deleted successfully!");
    } catch (err) {
      addToast("Failed to delete thumbnail.", "error");
    }
  };

  return (
    <div className="py-8 px-6 md:px-12 animate-fade-in">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 glass-card p-10 rounded-3xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500/10 rounded-full blur-[100px] -mr-40 -mt-40 animate-pulse"></div>
          <div className="relative z-10">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight italic">
              WELCOME BACK, <span className="text-gradient uppercase">{user?.name}</span>! 🚀
            </h1>
            <p className="text-gray-400 mt-3 flex items-center gap-3 font-medium">
              Ready to create? <span className="text-white/80 px-3 py-1 bg-white/5 rounded-full border border-white/10">{user?.credits || 0} credits</span> available
            </p>
          </div>
          <Link 
            to="/generate" 
            className="px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white font-black rounded-2xl shadow-2xl shadow-brand-500/40 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center gap-2 uppercase tracking-widest text-sm"
          >
            <Icon icon="mdi:magic" className="text-xl" /> Generate New
          </Link>
        </div>

        {/* Analytics Overview Mini-Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-2xl flex items-center gap-4 hover:bg-white/[0.07] transition cursor-default">
            <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-xl flex items-center justify-center text-2xl border border-blue-500/20">
              <Icon icon="mdi:image-multiple" />
            </div>
            <div>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black">History</p>
              <h3 className="text-2xl font-black">{thumbnails.length}</h3>
            </div>
          </div>
          <div className="glass-card p-6 rounded-2xl flex items-center gap-4 hover:bg-white/[0.07] transition cursor-default">
            <div className="w-12 h-12 bg-green-500/10 text-green-400 rounded-xl flex items-center justify-center text-2xl border border-green-500/20">
              <Icon icon="mdi:chart-line" />
            </div>
            <div>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Success Rate</p>
              <h3 className="text-2xl font-black">88%</h3>
            </div>
          </div>
          <div className="glass-card p-6 rounded-2xl flex items-center gap-4 hover:bg-white/[0.07] transition cursor-default">
            <div className="w-12 h-12 bg-brand-500/10 text-brand-400 rounded-xl flex items-center justify-center text-2xl border border-brand-500/20">
              <Icon icon="mdi:star-face" />
            </div>
            <div>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Tier</p>
              <h3 className="text-2xl font-black uppercase">Creator</h3>
            </div>
          </div>
        </div>

        {/* History Grid */}
        <div className="pt-4">
          <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
            <h2 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3 italic">
              Your Library
              <span className="text-[10px] font-black text-brand-400 bg-brand-500/10 border border-brand-500/20 px-2 py-1 rounded-full uppercase tracking-widest not-italic">
                {thumbnails.length} Records
              </span>
            </h2>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="glass-card rounded-2xl h-72 animate-pulse flex flex-col p-4 gap-4">
                  <div className="aspect-video w-full bg-white/5 rounded-xl"></div>
                  <div className="h-4 w-3/4 bg-white/5 rounded"></div>
                  <div className="h-3 w-1/2 bg-white/5 rounded"></div>
                </div>
              ))}
            </div>
          ) : thumbnails.length === 0 ? (
            <div className="text-center py-24 glass-card rounded-[32px] border-dashed border-white/10">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon icon="mdi:image-off-outline" className="text-4xl text-white/20" />
              </div>
              <h3 className="text-xl font-bold text-white/50">Your library is empty</h3>
              <p className="text-white/30 mt-2 mb-8 text-sm">Every masterpiece starts with a single prompt.</p>
              <Link to="/generate" className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-full text-brand-400 text-sm font-bold transition border border-white/5">
                Generate First Thumbnail <Icon icon="mdi:arrow-right" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {thumbnails.map((thumb) => (
                <div key={thumb._id} className="glass-card rounded-2xl overflow-hidden hover:border-brand-500/40 transition-all duration-500 group relative flex flex-col hover:-translate-y-1">
                  <div className="aspect-video w-full bg-black relative overflow-hidden">
                    <img src={thumb.imageUrl} alt={thumb.prompt} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 scale-105 group-hover:scale-100" loading="lazy" />
                    
                    {/* Potential Badge */}
                    <div className="absolute top-4 left-4 flex gap-2">
                       <span className="px-2 py-1 rounded-md text-[9px] font-black backdrop-blur-md bg-green-500/20 text-green-400 border border-green-500/30 uppercase tracking-widest shadow-xl">
                          High CTR
                       </span>
                    </div>

                    {/* Hover Actions */}
                    <div className="absolute inset-x-4 bottom-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-3">
                      <Link 
                        to={`/editor?id=${thumb._id}`}
                        className="flex-1 h-12 rounded-xl bg-white text-black font-black text-xs uppercase flex items-center justify-center gap-2 shadow-2xl hover:bg-gray-200 transition active:scale-95"
                      >
                        <Icon icon="mdi:pencil" className="text-lg" /> Refine
                      </Link>
                      <button 
                        onClick={() => handleDelete(thumb._id)}
                        className="w-12 h-12 rounded-xl bg-black/80 backdrop-blur-md text-red-500 flex items-center justify-center shadow-2xl hover:bg-red-500 hover:text-white transition active:scale-95 border border-white/10"
                        title="Delete Permanently"
                      >
                        <Icon icon="mdi:delete" className="text-lg" />
                      </button>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col gap-4">
                    <p className="text-sm text-white/70 font-medium line-clamp-2 leading-relaxed h-10 group-hover:text-white transition-colors">{thumb.prompt}</p>
                    <div className="pt-4 border-t border-white/5 flex justify-between items-center text-[9px] uppercase tracking-[0.2em] text-white/20 font-black group-hover:text-white/40 transition-colors">
                      <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-brand-500"></span> {thumb.style || 'Studio'}</span>
                      <span>{new Date(thumb.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
