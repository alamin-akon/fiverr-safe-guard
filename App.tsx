
import React, { useState, useEffect } from 'react';
import { ICONS, RESTRICTED_KEYWORDS } from './constants';
import { applySafeguard } from './services/safeguardService';

const App: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [changesMade, setChangesMade] = useState<string[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Initial theme set
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleMakeSafe = () => {
    if (!input.trim()) {
      setToastMessage('Please enter some text first');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
      return;
    }

    const result = applySafeguard(input);
    setOutput(result.safeMessage);
    setChangesMade(result.changesMade);
    
    setToastMessage('Fiverr-Safe conversion applied!');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleCopy = () => {
    const cleanText = output.replace(/\*\*/g, '');
    navigator.clipboard.writeText(cleanText);
    setToastMessage('Copied to clipboard!');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setChangesMade([]);
  };

  const renderSafeMessage = (text: string) => {
    if (!text) return <span className="text-gray-400 dark:text-gray-500 italic">Safe output will appear here...</span>;
    
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="text-[#1dbf73] font-bold bg-[#1dbf73]/10 px-1 rounded mx-0.5">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  const SocialLink = ({ href, icon: Icon, label }: { href: string; icon: React.ReactNode; label: string }) => (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="text-gray-400 hover:text-[#1dbf73] transition-colors p-2 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center"
      title={label}
    >
      {Icon}
    </a>
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-[#0B0E14]' : 'bg-[#F1F2F4]'} py-10 px-4`}>
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-6 right-6 z-50 bg-[#1dbf73] text-white px-6 py-3 rounded-lg shadow-2xl font-bold animate-fade-in border-2 border-white/20">
          {toastMessage}
        </div>
      )}

      <div className="mx-auto max-w-[1650px]">
        {/* Header Section */}
        <header className="mb-10 flex flex-col items-center relative">
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="absolute right-0 top-0 p-3 bg-white dark:bg-gray-800 rounded-xl shadow-md text-gray-600 dark:text-yellow-400 border border-gray-200 dark:border-gray-700 hover:scale-105 transition-transform"
          >
            {isDarkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M16.071 16.071l.707.707M7.929 7.929l.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          <div className="flex items-center gap-4 mb-3">
            <div className="w-14 h-14 bg-[#1dbf73] rounded-2xl flex items-center justify-center text-white shadow-lg rotate-3">
              <ICONS.Shield />
            </div>
            <div>
              <h1 className={`text-5xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-[#404145]'}`}>
                Fiverr<span className="text-[#1dbf73]">Safe</span>Guard
              </h1>
              <p className={`text-sm font-bold tracking-[0.3em] uppercase opacity-60 text-center ${isDarkMode ? 'text-gray-400' : 'text-[#74767e]'}`}>
                Pro Marketplace Obfuscator
              </p>
            </div>
          </div>
        </header>

        {/* Main Side-by-Side Area */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 items-stretch">
          
          {/* Left Column: Input */}
          <section className={`rounded-2xl border flex flex-col min-h-[600px] transition-all duration-300 shadow-xl overflow-hidden ${
            isDarkMode 
              ? 'bg-[#151921] border-gray-800' 
              : 'bg-white border-[#e4e5e7]'
          }`}>
            <div className={`px-8 py-6 border-b flex justify-between items-center ${isDarkMode ? 'border-gray-800 bg-[#1A202A]' : 'border-[#e4e5e7] bg-gray-50'}`}>
              <h2 className={`font-black text-sm uppercase tracking-widest flex items-center gap-3 ${isDarkMode ? 'text-gray-300' : 'text-[#404145]'}`}>
                <span className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></span>
                Message Draft
              </h2>
              <button onClick={handleClear} className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                <ICONS.Trash />
              </button>
            </div>
            
            <textarea
              className={`flex-1 w-full p-10 text-2xl leading-relaxed focus:outline-none resize-none transition-colors duration-300 ${
                isDarkMode ? 'bg-[#151921] text-gray-100 placeholder-gray-600' : 'bg-white text-[#404145] placeholder-gray-300'
              }`}
              placeholder="Paste message here... e.g. 'Pay me via PayPal and add me on WhatsApp'"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <div className={`p-8 border-t ${isDarkMode ? 'border-gray-800 bg-[#0B0E14]' : 'border-[#e4e5e7] bg-[#fafafa]'}`}>
              <span className={`text-[11px] font-black uppercase mb-4 block tracking-[0.2em] ${isDarkMode ? 'text-gray-500' : 'text-[#9ea0a5]'}`}>
                Real-time Detection Panel:
              </span>
              <div className="flex flex-wrap gap-2 max-h-[140px] overflow-y-auto custom-scrollbar">
                {RESTRICTED_KEYWORDS.slice(0, 25).map(word => {
                  const isFound = input.toLowerCase().includes(word.toLowerCase());
                  return (
                    <span
                      key={word}
                      className={`px-3 py-1.5 border rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
                        isFound 
                          ? 'bg-red-500/10 border-red-500/30 text-red-500 scale-105 shadow-[0_0_15px_rgba(239,68,68,0.1)]' 
                          : `${isDarkMode ? 'bg-gray-800/40 border-gray-800 text-gray-600' : 'bg-white border-[#dadbdd] text-[#9ea0a5] opacity-40'}`
                      }`}
                    >
                      {word}
                    </span>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Right Column: Output */}
          <section className={`rounded-2xl border flex flex-col min-h-[600px] transition-all duration-300 shadow-xl overflow-hidden ${
            isDarkMode 
              ? 'bg-[#151921] border-gray-800' 
              : 'bg-white border-[#e4e5e7]'
          }`}>
            <div className={`px-8 py-6 border-b flex justify-between items-center ${isDarkMode ? 'border-gray-800 bg-[#1A202A]' : 'border-[#e4e5e7] bg-gray-50'}`}>
              <h2 className={`font-black text-sm uppercase tracking-widest flex items-center gap-3 ${isDarkMode ? 'text-gray-300' : 'text-[#404145]'}`}>
                <span className="w-3 h-3 rounded-full bg-[#1dbf73] shadow-[0_0_10px_rgba(29,191,115,0.5)]"></span>
                Safe Version
              </h2>
              <div className="flex gap-4">
                <button
                  onClick={handleMakeSafe}
                  className="flex items-center gap-3 px-8 py-3 bg-[#1dbf73] text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#19a463] transition-all transform active:scale-95 shadow-lg shadow-[#1dbf73]/20"
                >
                  <ICONS.Sparkles />
                  MAKE IT SAFE
                </button>
                <button 
                  onClick={handleCopy}
                  className={`flex items-center gap-3 px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all transform active:scale-95 ${
                    isDarkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-black text-white hover:bg-gray-800'
                  }`}
                >
                  <ICONS.Copy />
                  COPY
                </button>
              </div>
            </div>
            
            <div className="p-10 flex flex-col h-full">
              <div className={`flex-1 p-10 rounded-2xl border text-2xl leading-relaxed mb-8 min-h-[350px] break-words whitespace-pre-wrap shadow-inner relative overflow-hidden transition-colors ${
                isDarkMode ? 'bg-[#0B0E14]/40 border-gray-800 text-gray-100' : 'bg-[#F9FAFB] border-[#efeff0] text-[#404145]'
              }`}>
                <div className="font-black text-[11px] text-[#9ea0a5] uppercase mb-6 tracking-[0.3em] opacity-50">Filtered Output:</div>
                <div className="relative z-10 font-medium">
                  {renderSafeMessage(output)}
                </div>
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: isDarkMode ? 'radial-gradient(#fff 1px, transparent 1px)' : 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
              </div>

              <div className={`border rounded-2xl p-6 transition-colors ${isDarkMode ? 'bg-[#1A202A] border-gray-800' : 'bg-white border-[#efeff0]'}`}>
                <div className={`font-black text-[11px] uppercase mb-4 tracking-[0.2em] flex items-center gap-2 ${isDarkMode ? 'text-gray-500' : 'text-[#9ea0a5]'}`}>
                  Modification Log:
                  <span className="px-3 py-0.5 bg-[#1dbf73]/20 text-[#1dbf73] rounded-full text-[10px]">{changesMade.length} items fixed</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {changesMade.length > 0 ? (
                    changesMade.map((change, i) => (
                      <span key={i} className={`px-4 py-2 border rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                        isDarkMode ? 'bg-gray-800/60 border-gray-700 text-[#1dbf73]' : 'bg-green-50 border-green-100 text-[#1dbf73]'
                      }`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1dbf73]"></span>
                        {change}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-gray-500 italic font-medium">Safe message will be generated here.</span>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Knowledge Cards */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { title: "01 / Comms", color: "text-[#1dbf73]", desc: "Obfuscates Email, WhatsApp, and social tags automatically." },
            { title: "02 / Funds", color: "text-blue-500", desc: "Formats Pay, PayPal, and bank-related keywords to avoid flags." },
            { title: "03 / Ratings", color: "text-yellow-500", desc: "Safely references reviews and star-ratings in natural terms." },
            { title: "04 / Policy", color: "text-purple-500", desc: "Bypasses academic dishonesty and prohibited service filters." }
          ].map((card, i) => (
            <div key={i} className={`p-8 rounded-2xl border transition-all duration-300 hover:translate-y-[-4px] ${isDarkMode ? 'bg-[#151921] border-gray-800 shadow-2xl' : 'bg-white border-[#e4e5e7] shadow-sm'}`}>
              <h4 className={`font-black text-[11px] uppercase tracking-[0.2em] mb-4 ${card.color}`}>{card.title}</h4>
              <p className={`text-xs leading-relaxed font-medium ${isDarkMode ? 'text-gray-400' : 'text-[#62646a]'}`}>
                {card.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Footer & Social Section */}
        <footer className={`mt-24 pt-12 border-t flex flex-col items-center ${isDarkMode ? 'border-gray-800' : 'border-[#e4e5e7]'}`}>
          <div className="flex gap-4 mb-8">
            <SocialLink 
              label="LinkedIn"
              href="https://www.linkedin.com/in/devalaminakon/"
              icon={<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>}
            />
            <SocialLink 
              label="Facebook"
              href="https://www.facebook.com/share/1J1XYwj4Jo/"
              icon={<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>}
            />
            <SocialLink 
              label="Instagram"
              href="https://www.instagram.com/alamin_akon0?igsh=a2t4amFhM2dsbXRx"
              icon={<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>}
            />
            <SocialLink 
              label="Threads"
              href="https://www.threads.com/@alamin_akon0"
              icon={<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M14.886 11.13c0 1.103-.314 1.93-.94 2.483-.627.552-1.487.828-2.583.828h-1.363v-6.622h1.363c1.096 0 1.956.276 2.583.828s.94 1.38.94 2.483zm.185-5.26c-.722-.596-1.742-.894-3.06-.894h-3.134v12.247h3.134c1.318 0 2.338-.298 3.06-.894.722-.596 1.083-1.442 1.083-2.538V8.408c0-1.096-.361-1.942-1.083-2.538zm7.336 6.13c0 5.127-4.156 9.283-9.283 9.283-5.127 0-9.283-4.156-9.283-9.283s4.156-9.283 9.283-9.283c5.127 0 9.283 4.156 9.283 9.283z"/></svg>}
            />
          </div>

          <div className="flex gap-8 mb-6 opacity-40">
            {["Privacy Locked", "Encryption On", "No Database"].map(tag => (
              <span key={tag} className={`text-[10px] font-bold uppercase tracking-[0.3em] ${isDarkMode ? 'text-gray-400' : 'text-[#b5b6ba]'}`}>{tag}</span>
            ))}
          </div>
          <p className={`text-[10px] font-bold uppercase tracking-[0.4em] text-center ${isDarkMode ? 'text-gray-600' : 'text-[#9ea0a5]'}`}>
            © {new Date().getFullYear()} Fiverr Safeguard Pro • Developed by Alamin Akon
          </p>
        </footer>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1dbf7322;
          border-radius: 10px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background: #1dbf7344;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default App;
