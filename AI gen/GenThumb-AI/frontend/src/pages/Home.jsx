import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

const Home = () => {
  return (
    <div className="font-sans">
      
      {/* 1. Hero Section (Original GenThumb Design) */}
      <section id="home" className="w-full max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left Content */}
        <div className="flex-1 space-y-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 text-brand-500 font-semibold text-sm border border-brand-500/20">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-500"></span>
            </span>
            GenThumb AI v1.0 is Live
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">
            Design <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-600">Viral</span> Thumbnails in Seconds.
          </h1>
          
          <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
            Stop struggling with Photoshop. Use the power of Google Gemini AI to generate, edit, and predict the CTR of highly engaging YouTube thumbnails instantly.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4">
            <Link 
              to="/signup" 
              className="px-8 py-4 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white font-bold rounded-xl text-lg flex items-center gap-2 transition-all transform hover:scale-105 shadow-xl shadow-brand-500/20"
            >
              Start Generating <Icon icon="mdi:arrow-right" className="text-xl" />
            </Link>
            <Link 
              to="/login" 
              className="px-8 py-4 bg-dark-800 hover:bg-gray-800 border border-gray-700 text-white font-bold rounded-xl text-lg flex items-center gap-2 transition duration-300"
            >
              <Icon icon="mdi:play-circle-outline" className="text-xl" /> View Demo
            </Link>
          </div>
        </div>

        {/* Right Hero Image/Mockup */}
        <div className="flex-1 relative w-full flex justify-center mt-10 md:mt-0">
          <div className="absolute inset-0 bg-brand-500/20 blur-[100px] rounded-full -z-10"></div>
          <div className="relative bg-dark-800 border border-dark-border rounded-2xl shadow-2xl p-4 transform rotate-2 hover:rotate-0 transition duration-500 w-full max-w-lg z-10">
            {/* Mock Editor UI Image */}
            <div className="w-full h-64 bg-gray-900 rounded-xl overflow-hidden relative flex items-center justify-center border border-dark-border">
               <div className="absolute top-4 left-4 bg-black/60 backdrop-blur px-3 py-1 rounded text-xs font-bold text-green-400 border border-green-500/30 object-cover z-20">
                 Predicted CTR: 9.8%
               </div>
               <img 
                 src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop" 
                 alt="Thumbnail Example" 
                 className="w-full h-full object-cover opacity-80"
               />
               <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-dark-900 to-transparent p-4 z-20">
                 <h3 className="text-2xl font-black text-white italic drop-shadow-md tracking-wider uppercase">ULTIMATE GAMING SETUP</h3>
               </div>
            </div>
            {/* Mock tools */}
            <div className="flex justify-between items-center mt-4">
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded bg-gray-700 flex items-center justify-center text-gray-300"><Icon icon="mdi:format-text" /></div>
                <div className="w-8 h-8 rounded bg-gray-700 flex items-center justify-center text-gray-300"><Icon icon="mdi:palette-outline" /></div>
                <div className="w-8 h-8 rounded bg-gray-700 flex items-center justify-center text-gray-300"><Icon icon="mdi:emoticon-outline" /></div>
              </div>
              <div className="px-4 py-2 bg-brand-600 rounded font-bold text-sm">Download HD</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Features Section */}
      <section id="features" className="py-24 px-4 bg-dark-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-block border border-brand-900 bg-brand-900/20 text-brand-500 text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-4">
              Features
            </div>
            <h2 className="text-4xl font-bold">Why GenThumb AI?</h2>
            <p className="text-gray-400">Everything you need to create thumbnails that actually get clicked.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-dark-800 border border-dark-border p-8 rounded-2xl flex flex-col items-start gap-4 hover:border-gray-600 transition duration-300">
              <Icon icon="mdi:robot-auto" className="text-4xl text-brand-500 mb-2" />
              <h3 className="text-xl font-bold">Gemini Prompt AI</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Enter a basic idea and our AI engineers it into a highly detailed image generation prompt automatically.</p>
            </div>
            
            {/* Active/Highlighted Feature Card */}
            <div className="bg-dark-800 border border-brand-500/50 glow-pink p-8 rounded-2xl flex flex-col items-start gap-4 transform md:-translate-y-2 transition duration-300 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
              <Icon icon="mdi:chart-line" className="text-4xl text-brand-400 mb-2 relative z-10" />
              <h3 className="text-xl font-bold relative z-10">CTR Prediction</h3>
              <p className="text-gray-300 text-sm leading-relaxed relative z-10">Our advanced analysis algorithm predicts the Click-Through Rate before you even upload the video to YouTube.</p>
            </div>

            <div className="bg-dark-800 border border-dark-border p-8 rounded-2xl flex flex-col items-start gap-4 hover:border-gray-600 transition duration-300">
              <Icon icon="mdi:pencil-ruler" className="text-4xl text-brand-500 mb-2" />
              <h3 className="text-xl font-bold">Pro Editor Canvas</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Customize your AI-generated thumbnail with robust web canvas tools for text, emojis, and exact color branding.</p>
            </div>

            {/* Added Features */}
            <div className="bg-dark-800 border border-dark-border p-8 rounded-2xl flex flex-col items-start gap-4 hover:border-gray-600 transition duration-300">
              <Icon icon="mdi:cloud-upload" className="text-4xl text-brand-500 mb-2" />
              <h3 className="text-xl font-bold">Cloudinary Storage</h3>
              <p className="text-gray-400 text-sm leading-relaxed">All your generated and edited thumbnails are securely backed up in the cloud for easy access anywhere.</p>
            </div>

            <div className="bg-dark-800 border border-dark-border p-8 rounded-2xl flex flex-col items-start gap-4 hover:border-gray-600 transition duration-300">
              <Icon icon="mdi:lock-check" className="text-4xl text-brand-500 mb-2" />
              <h3 className="text-xl font-bold">Secure Auth & History</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Robust JWT and Google OAuth authentication keeping your personal generation history totally private.</p>
            </div>

            <div className="bg-dark-800 border border-dark-border p-8 rounded-2xl flex flex-col items-start gap-4 hover:border-gray-600 transition duration-300">
              <Icon icon="mdi:lightning-bolt" className="text-4xl text-brand-500 mb-2" />
              <h3 className="text-xl font-bold">1080p Ultra-HD Export</h3>
              <p className="text-gray-400 text-sm leading-relaxed">No watermarks. Export your final composite design natively in maximum resolution for YouTube.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2.5. How It Works Section */}
      <section className="py-24 px-4 bg-dark-800 border-y border-dark-border relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-900/10 rounded-full blur-[100px] -z-10"></div>
        
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl font-bold">How it Works</h2>
            <p className="text-gray-400">Four simple steps from idea to viral thumbnail.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connecting Line (Desktop Only) */}
            <div className="hidden md:block absolute top-[28%] left-[12%] right-[12%] h-[2px] bg-brand-900/50 -z-10"></div>

            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-dark-900 border-2 border-brand-500 rounded-full flex items-center justify-center text-2xl font-bold text-brand-400 shadow-[0_0_20px_rgba(236,72,153,0.3)]">1</div>
              <h3 className="text-xl font-bold">Enter Concept</h3>
              <p className="text-sm text-gray-400">Type a brief sentence about your video's core topic.</p>
            </div>

            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-dark-900 border-2 border-brand-500 rounded-full flex items-center justify-center text-2xl font-bold text-brand-400 shadow-[0_0_20px_rgba(236,72,153,0.3)]">2</div>
              <h3 className="text-xl font-bold">AI Enhancement</h3>
              <p className="text-sm text-gray-400">Google Gemini expands your prompt for optimal lighting and contrast.</p>
            </div>

            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-dark-900 border-2 border-brand-500 rounded-full flex items-center justify-center text-2xl font-bold text-brand-400 shadow-[0_0_20px_rgba(236,72,153,0.3)]">3</div>
              <h3 className="text-xl font-bold">Generation & CTR</h3>
              <p className="text-sm text-gray-400">The thumbnail is rendered and pre-scored for click-through rate.</p>
            </div>

            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-brand-500 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-[0_0_30px_rgba(236,72,153,0.6)]">4</div>
              <h3 className="text-xl font-bold">Edit & Export</h3>
              <p className="text-sm text-gray-400">Add custom text or emojis in the canvas, then download HD.</p>
            </div>
          </div>
        </div>
      </section>



      {/* 3. Pricing Section */}
      <section id="pricing" className="py-24 px-4 bg-dark-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-block border border-brand-900 bg-brand-900/20 text-brand-500 text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-4">
              Pricing
            </div>
            <h2 className="text-4xl font-bold">Our Pricing Plans</h2>
            <p className="text-gray-400 max-w-xl mx-auto">Flexible pricing options designed to meet your needs — whether you're just getting started or scaling up.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            
            {/* Basic Plan */}
            <div className="bg-dark-800 border border-dark-border p-8 rounded-3xl flex flex-col items-center mt-8">
              <h3 className="font-bold text-lg mb-2">Basic</h3>
              <div className="flex items-end gap-1 mb-8">
                <span className="text-4xl font-bold">$29</span>
                <span className="text-gray-500 text-sm mb-1">/month</span>
              </div>
              <ul className="w-full space-y-4 mb-8">
                <li className="flex items-center gap-3 text-sm text-gray-300"><Icon icon="mdi:check" className="text-brand-500 text-lg shrink-0" /> Access to all basic courses</li>
                <li className="flex items-center gap-3 text-sm text-gray-300"><Icon icon="mdi:check" className="text-brand-500 text-lg shrink-0" /> Community support</li>
                <li className="flex items-center gap-3 text-sm text-gray-300"><Icon icon="mdi:check" className="text-brand-500 text-lg shrink-0" /> 10 practice projects</li>
                <li className="flex items-center gap-3 text-sm text-gray-300"><Icon icon="mdi:check" className="text-brand-500 text-lg shrink-0" /> Course completion certificate</li>
                <li className="flex items-center gap-3 text-sm text-gray-300"><Icon icon="mdi:check" className="text-brand-500 text-lg shrink-0" /> Basic code review</li>
              </ul>
              <button className="w-full py-3 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-xl mt-auto transition">
                Get Started
              </button>
            </div>

            {/* Pro Plan (Highlighted) */}
            <div className="bg-brand-900 border border-brand-500/30 p-8 rounded-3xl flex flex-col items-center relative shadow-2xl shadow-brand-900/50">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-400 text-white text-xs font-bold px-4 py-1.5 rounded-full">
                Most Popular
              </div>
              <h3 className="font-bold text-lg mb-2 mt-4 text-white">Pro</h3>
              <div className="flex items-end gap-1 mb-8">
                <span className="text-4xl font-bold text-white">$79</span>
                <span className="text-brand-200 text-sm mb-1">/month</span>
              </div>
              <ul className="w-full space-y-4 mb-8">
                <li className="flex items-center gap-3 text-sm text-white"><Icon icon="mdi:check" className="text-brand-400 text-lg shrink-0" /> Access to all Pro courses</li>
                <li className="flex items-center gap-3 text-sm text-white"><Icon icon="mdi:check" className="text-brand-400 text-lg shrink-0" /> Priority community support</li>
                <li className="flex items-center gap-3 text-sm text-white"><Icon icon="mdi:check" className="text-brand-400 text-lg shrink-0" /> 30 practice projects</li>
                <li className="flex items-center gap-3 text-sm text-white"><Icon icon="mdi:check" className="text-brand-400 text-lg shrink-0" /> Course completion certificate</li>
                <li className="flex items-center gap-3 text-sm text-white"><Icon icon="mdi:check" className="text-brand-400 text-lg shrink-0" /> Advance code review</li>
                <li className="flex items-center gap-3 text-sm text-white"><Icon icon="mdi:check" className="text-brand-400 text-lg shrink-0" /> 1-on-1 mentoring sessions</li>
                <li className="flex items-center gap-3 text-sm text-white"><Icon icon="mdi:check" className="text-brand-400 text-lg shrink-0" /> Job assistance</li>
              </ul>
              <button className="w-full py-3 bg-white hover:bg-gray-100 text-brand-900 font-bold rounded-xl mt-auto transition">
                Get Started
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-dark-800 border border-dark-border p-8 rounded-3xl flex flex-col items-center mt-8">
              <h3 className="font-bold text-lg mb-2">Enterprise</h3>
              <div className="flex items-end gap-1 mb-8">
                <span className="text-4xl font-bold">$199</span>
                <span className="text-gray-500 text-sm mb-1">/month</span>
              </div>
              <ul className="w-full space-y-4 mb-8">
                <li className="flex items-center gap-3 text-sm text-gray-300"><Icon icon="mdi:check" className="text-brand-500 text-lg shrink-0" /> Access to all courses</li>
                <li className="flex items-center gap-3 text-sm text-gray-300"><Icon icon="mdi:check" className="text-brand-500 text-lg shrink-0" /> Dedicated support</li>
                <li className="flex items-center gap-3 text-sm text-gray-300"><Icon icon="mdi:check" className="text-brand-500 text-lg shrink-0" /> Unlimited projects</li>
                <li className="flex items-center gap-3 text-sm text-gray-300"><Icon icon="mdi:check" className="text-brand-500 text-lg shrink-0" /> Course completion certificate</li>
                <li className="flex items-center gap-3 text-sm text-gray-300"><Icon icon="mdi:check" className="text-brand-500 text-lg shrink-0" /> Premium code review</li>
              </ul>
              <button className="w-full py-3 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-xl mt-auto transition">
                Get Started
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 4. CTA Block */}
      <section className="py-24 px-4 bg-dark-900">
        <div className="max-w-5xl mx-auto bg-[#6b1e42] rounded-3xl p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          {/* Subtle gradient overlay to match reference */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#7a224a] to-[#4d132d] z-0"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Ready to try-out this app?</h2>
            <p className="text-lg text-brand-100">Your next favourite tool is just one click away.</p>
          </div>
          
          <div className="relative z-10">
            <Link 
              to="/signup" 
              className="bg-white hover:bg-gray-100 text-[#6b1e42] px-8 py-4 rounded-full font-bold transition whitespace-nowrap shadow-lg"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Footer */}
      <footer className="bg-dark-900 border-t border-dark-border py-16 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-12">
          
          {/* Footer Logo */}
          <div className="flex-1">
             <div className="flex justify-start">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#a1a1aa"/>
                  <path d="M2 17L12 22L22 17" stroke="#71717a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="#52525b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
             </div>
          </div>

          {/* Links Grid */}
          <div className="flex-1 grid grid-cols-3 gap-8 text-sm">
            <div className="space-y-4">
              <h4 className="font-bold text-white">Product</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Support</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Affiliate</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-white">Resources</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Company</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Blogs</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Community</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">About</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-white">Legal</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Terms</a></li>
              </ul>
            </div>
          </div>

          {/* Right Text / Socials */}
          <div className="flex-1 text-right flex flex-col justify-between items-end gap-8">
            <p className="text-gray-400 text-sm max-w-[200px]">
              Making every customer feel valued—no matter the size of your audience.
            </p>
            <div>
              <div className="flex gap-4 justify-end mb-4 text-gray-400">
                <a href="#" className="hover:text-white transition"><Icon icon="mdi:web" className="text-xl" /></a>
                <a href="#" className="hover:text-white transition"><Icon icon="mdi:linkedin" className="text-xl" /></a>
                <a href="#" className="hover:text-white transition"><Icon icon="mdi:twitter" className="text-xl" /></a>
                <a href="#" className="hover:text-white transition"><Icon icon="mdi:youtube" className="text-xl" /></a>
              </div>
              <p className="text-gray-500 text-xs text-right">© 2026 PrebuiltUI</p>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
};

export default Home;
