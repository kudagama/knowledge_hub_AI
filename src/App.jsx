import { useState, useEffect, useRef } from 'react';

const mockData = {
  react: "React is a JavaScript library for building user interfaces. It is maintained by Meta and a community of developers. React can be used as a base in the development of single-page or mobile applications.",
  tailwind: "Tailwind CSS is a utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup.",
  ai: "Artificial Intelligence (AI) refers to the simulation of human intelligence in machines that are programmed to think like humans and mimic their actions. The term may also be applied to any machine that exhibits traits associated with a human mind such as learning and problem-solving.",
  vite: "Vite is a modern frontend build tool that provides an extremely fast development environment and bundles your code for production. It uses native ES modules to serve code instantly, regardless of the app size.",
  javascript: "JavaScript is a high-level, often just-in-time compiled language that conforms to the ECMAScript standard. It has dynamic typing, prototype-based object-orientation, and first-class functions."
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
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-purple-500/30">
      <div className="max-w-3xl mx-auto px-4 py-12 flex flex-col min-h-screen">
        
        {/* Header */}
        <header className="flex flex-col items-center justify-center mb-12 mt-8 animate-fade-in">
          <div className="w-16 h-16 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/20 mb-6 group hover:scale-105 transition-transform duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white drop-shadow-sm group-hover:animate-pulse">
              <path d="M12 2v20"></path>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-100 to-slate-400 mb-2">
            Knowledge Hub AI
          </h1>
          <p className="text-slate-400 text-sm">Ask anything from your internal knowledge base.</p>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col w-full">
          
          {/* Search Area */}
          <form onSubmit={handleSearch} className="mb-10 relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-50"></div>
            <div className="relative flex items-center bg-slate-800/80 backdrop-blur-md rounded-2xl border border-slate-700/50 shadow-xl overflow-hidden focus-within:border-purple-500/50 focus-within:shadow-purple-500/10 transition-colors">
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
                placeholder="Search your internal knowledge... (e.g. react, tailwind, ai)"
                className="flex-1 bg-transparent border-none text-slate-100 px-4 py-5 outline-none placeholder:text-slate-500 text-lg w-full"
                autoComplete="off"
              />
              <div className="pr-3">
                <button 
                  type="submit" 
                  disabled={isTyping}
                  className="bg-slate-700 hover:bg-slate-600 active:bg-slate-800 text-slate-200 px-6 py-3 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 group-focus-within:bg-purple-600 group-focus-within:hover:bg-purple-500 group-focus-within:text-white"
                >
                  Search
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
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
              <div className="absolute -left-12 top-6 w-8 h-8 bg-gradient-to-tr from-purple-500 to-blue-500 rounded-full flex items-center justify-center opacity-80 mt-1 hidden sm:flex">
                 <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M12 2v20"></path>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
            )}
            
            <div className={`
              min-h-[200px] p-8 rounded-2xl bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm
              transition-all duration-500 ${hasSearched ? 'opacity-100 translate-y-0' : 'opacity-80 translate-y-2'}
            `}>
              {!hasSearched ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-500 pt-8 pb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4 opacity-30">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                  <p className="text-lg">Your knowledge results will appear here...</p>
                  <p className="text-sm mt-2 opacity-60">Try searching for keywords like "react", "tailwind", or "ai".</p>
                </div>
              ) : (
                <div className="prose prose-invert max-w-none">
                  <p className="text-lg leading-relaxed text-slate-200" style={{ whiteSpace: 'pre-wrap' }}>
                    {displayedText}
                    {isTyping && (
                      <span className="inline-block w-2 h-5 ml-1 align-middle bg-purple-500 animate-pulse rounded-sm"></span>
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
