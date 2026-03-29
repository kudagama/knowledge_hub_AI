import { useState, useEffect, useRef } from 'react';

const mockData = {
  react: "React is a JavaScript library for building user interfaces. It is maintained by Meta and a community of developers. React can be used as a base in the development of single-page or mobile applications.",
  tailwind: "Tailwind CSS is a utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup.",
  ai: "Artificial Intelligence (AI) refers to the simulation of human intelligence in machines that are programmed to think like humans and mimic their actions. The term may also be applied to any machine that exhibits traits associated with a human mind such as learning and problem-solving.",
  vite: "Vite is a modern frontend build tool that provides an extremely fast development environment and bundles your code for production. It uses native ES modules to serve code instantly, regardless of the app size.",
  javascript: "JavaScript is a high-level, often just-in-time compiled language that conforms to the ECMAScript standard. It has dynamic typing, prototype-based object-orientation, and first-class functions.",
  sltmobitel: "SLTMOBITEL is the national telecommunications services provider in Sri Lanka and one of the country's largest companies. It provides fixed voice, broadband, mobile, and enterprise solutions.",
  megaline: "SLT Megaline provides unlimited home broadband, fixed voice, and PeoTV services through wired ADSL and VDSL connections.",
  "slt fibre": "SLT Fibre is the premier fiber-to-the-home (FTTH) service in Sri Lanka, offering ultra-fast internet connectivity for seamless streaming, gaming, and downloads."
};

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchTerm.trim().toLowerCase();
    
    if (!query) return;

    // Clear previous interval if any
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    setDisplayedText('');
    setIsTyping(true);
    setHasSearched(true);
    
    const resultText = mockData[query];
    
    if (resultText) {
      const words = resultText.split(' ');
      let currentWordIndex = 0;
      
      timerRef.current = setInterval(() => {
        if (currentWordIndex < words.length) {
          const word = words[currentWordIndex];
          setDisplayedText(prev => prev ? prev + ' ' + word : word);
          currentWordIndex++;
        } else {
          clearInterval(timerRef.current);
          setIsTyping(false);
        }
      }, 50);
    } else {
      setIsTyping(false);
      setDisplayedText("Sorry, no internal knowledge found for this topic.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-slt-green/30">
      
      {/* Top Brand Bar */}
      <div className="h-1 bg-gradient-to-r from-slt-blue via-slt-grad-start to-slt-grad-end w-full"></div>
      
      <div className="max-w-3xl mx-auto px-4 py-8 flex flex-col min-h-screen">
        
        {/* Header */}
        <header className="flex flex-col items-center justify-center mb-10 mt-6 animate-fade-in">
          <div className="w-16 h-16 bg-gradient-to-tr from-slt-grad-start to-slt-grad-end rounded-2xl flex items-center justify-center shadow-lg shadow-slt-grad-start/20 mb-6 group hover:scale-105 transition-transform duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white drop-shadow-sm group-hover:animate-pulse">
              <path d="M12 2v20"></path>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slt-blue mb-2">
            Knowledge Hub AI
          </h1>
          <p className="text-slate-500 text-sm font-medium">Ask anything from your internal knowledge base.</p>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col w-full">
          
          {/* Search Area */}
          <form onSubmit={handleSearch} className="mb-10 relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-slt-grad-start/10 to-slt-blue/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-50"></div>
            <div className="relative flex items-center bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-xl overflow-hidden focus-within:border-slt-blue focus-within:ring-2 focus-within:ring-slt-blue/20 transition-all">
              <div className="pl-6 py-4 flex items-center justify-center text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search knowledge... (e.g. sltmobitel, megaline, fibre)"
                className="flex-1 bg-transparent border-none text-slate-800 px-4 py-5 outline-none placeholder:text-slate-400 text-lg w-full"
                autoComplete="off"
              />
              <div className="pr-3">
                <button 
                  type="submit" 
                  disabled={isTyping}
                  className="bg-slt-blue hover:bg-slt-dark-blue active:bg-slt-dark-blue text-white px-6 py-3 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 group-focus-within:bg-slt-green group-focus-within:hover:opacity-90 group-focus-within:text-white shadow-md shadow-slt-blue/20"
                >
                  Search
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-90">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          </form>

          {/* Result Area */}
          <div className="relative">
            {/* AI Avatar Indicator */}
            {hasSearched && (
              <div className="absolute -left-12 top-6 w-8 h-8 bg-gradient-to-tr from-slt-grad-start to-slt-grad-end rounded-full flex items-center justify-center shadow-md hidden sm:flex">
                 <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M12 2v20"></path>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
            )}
            
            <div className={`
              min-h-[220px] p-8 rounded-2xl bg-white/80 border border-slate-200/60 shadow-sm backdrop-blur-sm
              transition-all duration-500 ${hasSearched ? 'opacity-100 translate-y-0' : 'opacity-80 translate-y-2'}
            `}>
              {!hasSearched ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 pt-8 pb-4">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 text-slate-500">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </div>
                  <p className="text-lg font-medium text-slate-500">Your knowledge results will appear here</p>
                  <p className="text-sm mt-2 opacity-80 text-center max-w-sm">Try searching for keywords like "SLTMOBITEL", "Megaline", or "SLT Fibre".</p>
                </div>
              ) : (
                <div className="prose prose-slate max-w-none">
                  <p className="text-lg leading-relaxed text-slate-700 font-medium" style={{ whiteSpace: 'pre-wrap' }}>
                    {displayedText}
                    {isTyping && (
                      <span className="inline-block w-2.5 h-5 ml-1.5 align-middle bg-slt-green animate-pulse rounded-sm"></span>
                    )}
                  </p>
                </div>
              )}
            </div>
          </div>
          
        </main>
      </div>
    </div>
  );
}

export default App;
