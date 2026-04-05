import { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import api from "../services/api";

const GenerateThumbnail = () => {
  const { refreshProfile } = useAuth();
  const { addToast } = useToast();

  const [prompt, setPrompt] = useState("");
  const [step, setStep] = useState(null);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!prompt) return;

    setStep("enhancing");
    setError(null);
    setResults([]);

    try {
      // Step 1: Simulate prompt enhancement (optional step, backend also does it)
      await new Promise((r) => setTimeout(r, 800));

      setStep("rendering");

      // Call backend
      const { data } = await api.post("/thumbnail/generate", {
        prompt,
      });

      // Prepare results (data is now an array from backend)
      const resultsData = data.map(variant => ({
        _id: variant._id,
        imageUrl: variant.imageUrl,
        enhancedPrompt: variant.enhancedPrompt,
        style: variant.style,
        ctrPrediction: variant.ctrPrediction,
      }));

      setStep("saving");
      setResults(resultsData);

      addToast(`${resultsData.length} thumbnails generated and saved!`);
      refreshProfile();
    } catch (err) {
      console.error("Generation error:", err);
      setError("Failed to create thumbnails. Please try again.");
      addToast("Generation failed.", "error");
    } finally {
      setStep(null);
    }
  };

  return (
    <div className="py-12 px-6 md:px-12 animate-fade-in">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-extrabold uppercase tracking-tighter italic">Generate <span className="text-brand-500">Thumbnails</span></h1>
          <p className="text-gray-400 mt-2">
            Describe what you want to see. We'll generate 4 unique variations for you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Input */}
          <div className="lg:col-span-4 space-y-6 bg-dark-800 p-6 rounded-2xl border border-gray-700 h-fit sticky top-24">
            <form onSubmit={handleGenerate}>
              <div className="space-y-4">

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2 uppercase tracking-widest text-[10px] font-black">
                    Generation Prompt
                  </label>

                  <textarea
                    rows="6"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., Mr Beast shocked face, glowing treasure chest, neon background, viral youtube thumbnail"
                    className="w-full p-5 bg-black/40 border border-white/5 rounded-2xl text-white focus:ring-2 focus:ring-brand-500 outline-none resize-none placeholder:text-gray-600 transition-all"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={!!step || !prompt}
                  className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 transition-all ${
                    step
                      ? "bg-white/5 text-brand-400 border border-brand-500/20"
                      : "bg-brand-500 hover:bg-brand-600 text-white shadow-xl shadow-brand-500/20 hover:-translate-y-1 active:scale-95"
                  }`}
                >
                  {step === "enhancing" ? (
                    <>
                      <Icon icon="line-md:loading-loop" className="text-lg" /> AI Enhancing...
                    </>
                  ) : step === "rendering" ? (
                    <>
                      <Icon icon="line-md:loading-loop" className="text-lg" /> Rendering Variations...
                    </>
                  ) : step === "saving" ? (
                    <>
                      <Icon icon="line-md:loading-loop" className="text-lg" /> Finalizing...
                    </>
                  ) : (
                    <>
                      <Icon icon="mdi:magic" className="text-lg" /> Ignite Generation
                    </>
                  )}
                </button>

                {error && (
                  <p className="text-red-400 text-xs font-bold text-center bg-red-400/10 p-3 rounded-xl border border-red-400/20">{error}</p>
                )}

              </div>
            </form>
          </div>

          {/* Result Grid */}
          <div className="lg:col-span-8">

            {results.length > 0 ? (

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {results.map((res, index) => (
                  <div key={res._id || index} className="group glass-card rounded-2xl overflow-hidden border border-white/5 hover:border-brand-500/40 transition-all duration-500">
                    
                    {/* Image Container */}
                    <div className="aspect-video w-full bg-black relative overflow-hidden">
                      <img
                        src={res.imageUrl}
                        alt={`Variation ${index + 1}`}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 scale-105 group-hover:scale-100"
                      />

                      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg flex items-center gap-2 border border-white/10">
                        <Icon icon="mdi:bullseye-arrow" className="text-green-400" />
                        <span className="text-green-400 font-black text-xs">
                          {res.ctrPrediction}% <span className="text-[10px] opacity-70">CTR</span>
                        </span>
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                        <Link 
                           to={`/editor?id=${res._id}`}
                           className="w-full py-3 bg-white text-black rounded-xl font-black text-[10px] uppercase flex items-center justify-center gap-2 hover:bg-gray-200 transition active:scale-95"
                         >
                           <Icon icon="mdi:pencil" className="text-lg" /> Open in Editor
                        </Link>
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="p-4 bg-dark-900/50">
                       <div className="flex justify-between items-center text-[9px] uppercase font-black tracking-widest text-gray-500">
                          <span>Variation #{index + 1}</span>
                          <span className="text-brand-500">{res.style}</span>
                       </div>
                    </div>

                  </div>
                ))}
              </div>

            ) : !step && (

              <div className="h-full min-h-[400px] border-2 border-dashed border-gray-800 rounded-3xl flex flex-col items-center justify-center text-gray-600 bg-white/[0.01]">
                <Icon icon="mdi:image-multiple-outline" className="text-7xl mb-6 opacity-20" />
                <p className="font-bold uppercase tracking-widest text-xs opacity-40">Your generated variations will appear here</p>
              </div>

            )}

            {/* Loading States (Enhanced) */}
            {step && results.length === 0 && (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="glass-card rounded-2xl aspect-video animate-pulse flex flex-col items-center justify-center gap-4 border border-white/5">
                        <Icon icon="line-md:loading-loop" className="text-3xl text-brand-500/20" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/10">Rendering...</span>
                    </div>
                  ))}
               </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};

export default GenerateThumbnail;