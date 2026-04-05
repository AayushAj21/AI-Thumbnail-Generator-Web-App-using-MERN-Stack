import { Icon } from '@iconify/react';

const About = () => {
  return (
    <div className="min-h-screen bg-dark-900 text-white pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-16">
        
        {/* Top Text Content */}
        <div className="w-full text-center space-y-6 animate-fade-in-up">
          <div className="inline-block border border-brand-900 bg-brand-900/20 text-brand-500 text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-2">
            Our Mission
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-4xl mx-auto">
            Making professional thumbnails <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-600">effortless for every creator.</span>
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
            When you finish recording and editing a video, the last thing you want is to spend another three hours fighting with complex design software. GenThumb AI handles the heavy graphic lifting so you can focus on creating more content.
          </p>
        </div>
        
        {/* Middle Content - Use Cases */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 relative">
          
          <div className="bg-dark-800 border border-dark-border rounded-3xl p-10 flex flex-col gap-6 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-48 h-48 bg-brand-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
             <Icon icon="mdi:clock-fast" className="text-5xl text-brand-500 relative z-10" />
             <div className="relative z-10 space-y-3">
               <h3 className="text-2xl font-bold">Reclaim Your Time</h3>
               <p className="text-gray-400 leading-relaxed">
                 You shouldn't have to study a 4-year degree in graphic design just to upload to YouTube. With true text-to-thumbnail AI generation, you can compress an entire afternoon of dragging layers into a single 5-second sentence prompt. 
               </p>
             </div>
          </div>

          <div className="bg-dark-800 border border-dark-border rounded-3xl p-10 flex flex-col gap-6 relative overflow-hidden">
             <div className="absolute bottom-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl -mr-10 -mb-10"></div>
             <Icon icon="mdi:target-arrow" className="text-5xl text-blue-500 relative z-10" />
             <div className="relative z-10 space-y-3">
               <h3 className="text-2xl font-bold">Destroy the Algorithm</h3>
               <p className="text-gray-400 leading-relaxed">
                 Getting views on YouTube is almost entirely dependent on your Click-Through Rate. GenThumb doesn't just generate images—it analyzes their color psychology, contrast, and layout complexity to predict the CTR before you ever hit publish.
               </p>
             </div>
          </div>

          <div className="bg-dark-800 border border-dark-border rounded-3xl p-10 flex flex-col gap-6 relative overflow-hidden md:col-span-2">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-32 bg-brand-600/5 rounded-full blur-[100px] -z-10 bg-gradient-to-r from-brand-600 to-purple-600"></div>
             <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
               <div className="flex-1 space-y-4">
                 <Icon icon="mdi:palette-swatch" className="text-5xl text-purple-400" />
                 <h3 className="text-2xl font-bold">Total Creative Control</h3>
                 <p className="text-gray-400 leading-relaxed">
                   AI imagery is great, but YouTube thumbnails almost always need massive, legible text overlays and reaction faces. Instead of generating a flat image and exporting it to another software, GenThumb natively provides you with an easy web-based canvas timeline. Add gigantic font outlines, drop shadows, arrows, and your own transparent PNGs all in one seamless workflow.
                 </p>
               </div>
               <div className="flex-1 w-full bg-dark-900 rounded-xl border border-dark-border p-6 shadow-2xl relative">
                 <div className="w-full h-8 bg-dark-800 rounded mb-4 flex gap-2 items-center px-4">
                    <span className="w-3 h-3 rounded-full bg-red-500"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                 </div>
                 <div className="w-full aspect-video bg-gray-800 border border-dashed border-brand-500/50 rounded flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/40 to-black"></div>
                    <span className="text-4xl font-black text-white px-6 py-2 border-4 border-white transform -rotate-3 uppercase bg-red-600 drop-shadow-[0_10px_0_rgba(0,0,0,1)] z-10 tracking-wider">
                      5 SECONDS
                    </span>
                 </div>
               </div>
             </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default About;
