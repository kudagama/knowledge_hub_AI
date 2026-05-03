import { useState, useEffect, useRef } from 'react';
import Fuse from 'fuse.js';

const knowledgeBase = [
  {
    keywords: ["main mediums", "connections", "technology", "fiber", "4g", "adsl", "internet types"],
    answer: "ප්රධාන SLT සේවාවන් මෙන්න:\n\n🚀 Fiber (FTTx): 1 Gbps දක්වා speed. වේගවත්ම connection එක.\n\n📱 4G/LTE: Wireless broadband සහ calls. හොඳ coverage එකක් තියෙනවා.\n\n☎️ Copper (ADSL): Telephone line එකෙන් දෙන basic internet සේවාව."
  },
  {
    keywords: ["megaline wisthara", "copper packages", "megaline details", "megaline single play", "megaline double play", "megaline triple play"],
    answer: "☎️ Megaline (Copper) Packages:\n\n🔹 Single Play: Voice only.\n🔹 Double Play: Two services only (Voice + BB හෝ Voice + PeoTV. BB හෝ PeoTV පමණක් වෙනම දෙන්නේ නෑ).\n🔹 Triple Play: Services 3ම දෙනවා (Voice + BB + PeoTV)."
  },
  {
    keywords: ["fibre wisthara", "fiber packages", "fibre details", "fibre single play", "fibre double play", "fibre triple play", "fttx packages"],
    answer: "🚀 Fibre Packages:\n\n🔹 Single Play: Voice only.\n🔹 Double Play: Two services only (Voice + BB හෝ Voice + PeoTV. BB සහ PeoTV පමණක් වෙනම දෙන්නේ නෑ).\n🔹 Triple Play: Services 3ම දෙනවා (Voice + BB + PeoTV)."
  },
  {
    keywords: ["4g wisthara", "4g packages", "lte details", "4g single play", "4g double play", "4g triple play"],
    answer: "📱 4G Packages:\n\n🔹 Single Play: Voice සහ Broadband දෙකම තියෙනවා. වෙන වෙනම ගන්නත් පුළුවන්.\n🔹 Double Play: '4G Double Play' කියලා වෙනම ජාතියක් නෑ. Voice & BB විතරයි තියෙන්නේ. PeoTV දෙන්නේ නෑ.\n🔹 Triple Play: 4G වලට Triple play එකක් නෑ. (PeoTV දෙන්නේ නැති නිසා)."
  },
  {
    keywords: ["new connection", "aluth connection", "documents needed", "new line", "connection ganna", "requirements"],
    answer: "🆕 New Connection එකක් ගන්න අවශ්‍ය දේවල්:\n\n📄 NIC එකේ Copy එකක්.\n🏠 Address එක Prove කරන්න Document එකක් හෝ Request Letter එකක්.\n💰 Advance Payment එකක් ගෙවන්න ඕනේ."
  },
  {
    keywords: ["peo tv", "peotv", "peo tv packages", "peo tv wisthara", "peo tv channels", "peo tv channels list"],
    answer: "📺 PeoTV Packages:\n\n🔹 PeoTV වලට වෙනම Connection එකක් දෙන්නේ නෑ. (Megaline හෝ Fibre Double Play/Triple Play එකක් එක්ක තමයි දෙන්නේ).\n🔹 PeoTV එකක් ගත්තම, ඒකේ තියෙන Channel List එක වෙනස් වෙන්නේ නෑ. (ඒකේ තියෙන Channel List එක වෙනස් වෙන්නේ නෑ).\n🔹 PeoTV එකේ තියෙන Channel List එක වෙනස් වෙන්නේ නෑ. (ඒකේ තියෙන Channel List එක වෙනස් වෙන්නේ නෑ)."
  },
  {
    keywords: ["terminate", "disconnect", "cancel", "ain karanna", "connection terminate", "disconnect karanna", "remove connection"],
    answer: "❌ Connection එකක් Terminate (අයින්) කරනකොට:\n\n📝 Legal owner ගේ Requesting Letter එකක් ඕනේ.\n🔌 Customer අයින් කරන Router එක (සහ අදාළ උපකරණ) ආපහු දෙන්න ඕනේ.\n💰 Due payments (හිඟ මුදල්) ඔක්කොම ගෙවන්න ඕනේ.\n\n⚠️ (සැලකිය යුතුයි: Megaline, Fiber, 4G සඳහා සාමාන්‍යයෙන් 1 Year commitment period එකක් අදාළ වේ)."
  },
  {
    keywords: ["consumer customers", "customer categories", "residential", "business", "religious", "customer types", "pawaribhogika kotas", "customers la"],
    answer: "👥 Consumer Customers ප්‍රධාන කොටස් 3යි:\n\n🏠 Residential: ගෘහස්ථ පාරිභෝගිකයින් (ගෙවල් වලට).\n🏢 Business: ව්‍යාපාරික පාරිභෝගිකයින් (කඩ සහ ආයතන).\n🕌 Religious: ආගමික ස්ථාන (පන්සල්, පල්ලි, කෝවිල්)."
  },
  {
    keywords: ["cpe", "equipment", "router", "ont", "adsl router", "peotv box", "setup box", "devices", "customer premises equipment", "4g router warranty", "voice phone", "stb"],
    answer: "📦 Customer Premises Equipments (CPE) විස්තර:\n\n☎️ Megaline: පාවිච්චි කරන්නේ ADSL Router එක. (දැන් SLT එකෙන් ADSL Routers දෙන්නේ නෑ, Customer වෙනම ගන්න ඕනේ).\n🚀 Fiber: Router එකට කියන්නේ ONT කියලා. (ONT එක SLT එකෙන් දෙනවා, හැබැයි Voice Phone එක Customer ගන්න ඕනේ).\n📱 4G: පාවිච්චි කරන්නේ 4G LTE Router එක. (2024 අගෝස්තු 1 ට කලින් ගත්ත එකක් නම්, ඒකේ වගකීම SLT එක විසින් දරනු ඇත).\n📺 PeoTV: Set-top Box සහ Remote එක දෙනවා."
  }
];

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

  const handleSearch = async (e) => {
    e.preventDefault();
    const query = searchTerm.trim();
    
    if (!query) return;

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    setDisplayedText('');
    setIsTyping(true);
    setHasSearched(true);
    
    try {
      // Python Backend එකෙන් Data ගන්නවා
      const response = await fetch(`http://127.0.0.1:8000/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      
      const resultText = data.answer;
      
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
      }
    } catch (error) {
      console.error("Error fetching from backend:", error);
      setDisplayedText("Backend එකට සම්බන්ධ වීමේ දෝෂයක්. කරුණාකර Backend සර්වර් එක Run වෙනවාදැයි බලන්න.");
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-slt-green/30">
      
      {/* Top Brand Bar */}
      <div className="h-1 bg-gradient-to-r from-slt-blue via-slt-grad-start to-slt-grad-end w-full"></div>
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 sm:py-8 flex flex-col min-h-screen">
        
        {/* Header */}
        <header className="flex flex-col items-center justify-center mb-6 sm:mb-10 mt-2 sm:mt-6 animate-fade-in">
          <div className="w-16 h-16 bg-gradient-to-tr from-slt-grad-start to-slt-grad-end rounded-2xl flex items-center justify-center shadow-lg shadow-slt-grad-start/20 mb-6 group hover:scale-105 transition-transform duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white drop-shadow-sm group-hover:animate-pulse">
              <path d="M12 2v20"></path>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slt-blue mb-2 text-center">
            Telecom Smart Hub AI
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm font-medium text-center">Highly responsive, AI-searchable repository for contact center agents.</p>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col w-full">
          
          {/* Search Area */}
          <form onSubmit={handleSearch} className="mb-10 relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-slt-grad-start/10 to-slt-blue/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-50"></div>
            <div className="relative flex flex-col sm:flex-row bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-xl overflow-hidden focus-within:border-slt-blue focus-within:ring-2 focus-within:ring-slt-blue/20 transition-all">
              <div className="flex flex-1 items-center">
                <div className="pl-4 sm:pl-6 py-3 sm:py-4 flex items-center justify-center text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search knowledge... (e.g. fibre wisthara)"
                  className="flex-1 bg-transparent border-none text-slate-800 px-3 sm:px-4 py-4 sm:py-5 outline-none placeholder:text-slate-400 text-base sm:text-lg w-full"
                  autoComplete="off"
                />
              </div>
              <div className="px-3 pb-3 sm:pb-0 sm:py-2 flex items-center justify-end sm:pr-3">
                <button 
                  type="submit" 
                  disabled={isTyping}
                  className="w-full sm:w-auto bg-slt-blue hover:bg-slt-dark-blue active:bg-slt-dark-blue text-white px-5 sm:px-6 py-3 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group-focus-within:bg-slt-green group-focus-within:hover:opacity-90 group-focus-within:text-white shadow-md shadow-slt-blue/20"
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
              min-h-[220px] p-5 sm:p-8 rounded-2xl bg-white/80 border border-slate-200/60 shadow-sm backdrop-blur-sm
              transition-all duration-500 ${hasSearched ? 'opacity-100 translate-y-0' : 'opacity-80 translate-y-2'}
            `}>
              {!hasSearched ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 pt-8 pb-4">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 text-slate-500">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </div>
                  <p className="text-base sm:text-lg font-medium text-slate-500">Your knowledge results will appear here</p>
                  <p className="text-xs sm:text-sm mt-2 opacity-80 text-center max-w-sm">Try searching for queries like "megaline triple play".</p>
                </div>
              ) : (
                <div className="max-w-none">
                  <p className="text-base sm:text-lg leading-relaxed text-slate-700 font-medium whitespace-pre-wrap">
                    {displayedText}
                    {isTyping && (
                      <span className="inline-block w-2 sm:w-2.5 h-4 sm:h-5 ml-1 sm:ml-1.5 align-middle bg-slt-green animate-pulse rounded-sm"></span>
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
