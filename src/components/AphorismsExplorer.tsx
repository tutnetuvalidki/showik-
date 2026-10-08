import { useState, useMemo } from 'react';
import { APHORISMS, Aphorism } from '../data/rustaveliData';
import { Search, Quote, Check, Sparkles, Filter, Shuffle } from 'lucide-react';
import { playPluckNote } from '../utils/audioSynth';

export default function AphorismsExplorer() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTheme, setSelectedTheme] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [randomFeaturedAphorism, setRandomFeaturedAphorism] = useState<Aphorism>(APHORISMS[0]);

  const themes = [
    { key: 'all', label: 'ყველა თემა' },
    { key: 'equality', label: 'თანასწორობა' },
    { key: 'good_evil', label: 'სიკეთე და ბოროტება' },
    { key: 'friendship', label: 'მეგობრობა' },
    { key: 'wisdom', label: 'სიბრძნე' },
    { key: 'valour', label: 'ვაჟკაცობა' },
    { key: 'love', label: 'სიყვარული' },
  ];

  const filteredAphorisms = useMemo(() => {
    return APHORISMS.filter((aph) => {
      const matchesTheme = selectedTheme === 'all' || aph.theme === selectedTheme;
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesTheme;

      const textMatches = aph.text.some((line) => line.toLowerCase().includes(query));
      const expMatches = aph.explanation.toLowerCase().includes(query);
      const themeMatches = aph.themeKa.toLowerCase().includes(query);
      return matchesTheme && (textMatches || expMatches || themeMatches);
    });
  }, [searchQuery, selectedTheme]);

  const handleCopy = (aph: Aphorism) => {
    const fullText = aph.text.join('\n') + `\n— შოთა რუსთაველი (${aph.context})`;
    navigator.clipboard.writeText(fullText);
    setCopiedId(aph.id);
    playPluckNote(440, 0.4, 0.1);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleRandomWisdom = () => {
    const remaining = APHORISMS.filter((a) => a.id !== randomFeaturedAphorism.id);
    const randomPick = remaining[Math.floor(Math.random() * remaining.length)] || APHORISMS[0];
    setRandomFeaturedAphorism(randomPick);
    playPluckNote(523.25, 0.5, 0.12);
  };

  return (
    <section id="aphorisms" className="py-20 border-b border-[#E8E2D8] bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="text-xs uppercase tracking-widest text-[#881337] font-serif font-semibold">
            ხალხური და ფილოსოფიური საგანძური
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C1917] tracking-tight">
            რუსთაველის უკვდავი აფორიზმები
          </h2>
          <p className="text-[#57534E] font-serif text-base leading-relaxed">
            „ვეფხისტყაოსნის“ აფორიზმები საუკუნეების მანძილზე იქცა ქართველი ერის მორალურ კოდექსად და ანდაზებად. გაეცანით თითოეული სტროფის ღრმა ჰუმანისტურ არსს.
          </p>
        </div>

        {/* Featured Daily Wisdom Box with Shuffle Action */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#F4EFE6] border border-[#DDD3C2] relative shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2D8C6]">
            <div className="flex items-center gap-2 text-xs font-serif text-[#881337] font-semibold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#B45309]" />
              <span>დღის რჩეული სიბრძნე · {randomFeaturedAphorism.themeKa}</span>
            </div>
            
            <button
              onClick={handleRandomWisdom}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-[#1C1917] bg-[#FAF8F5] hover:bg-[#EFE9DF] border border-[#DDD3C2] rounded-lg transition-colors cursor-pointer self-start sm:self-auto"
            >
              <Shuffle className="w-3.5 h-3.5 text-[#B45309]" />
              <span>სხვა სიბრძნის ნახვა</span>
            </button>
          </div>

          <div className="mt-5 space-y-3">
            <blockquote className="text-xl sm:text-2xl font-serif font-bold text-[#1C1917] leading-relaxed italic">
              {randomFeaturedAphorism.text.map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </blockquote>
            
            <p className="text-sm sm:text-base text-[#44403C] font-serif leading-relaxed pt-2">
              {randomFeaturedAphorism.explanation}
            </p>

            <div className="flex items-center justify-between pt-3 text-xs text-[#78716C] border-t border-[#E5DAC8]">
              <span>{randomFeaturedAphorism.context}</span>
              <button
                onClick={() => handleCopy(randomFeaturedAphorism)}
                className="hover:text-[#1C1917] flex items-center gap-1 transition-colors cursor-pointer"
              >
                {copiedId === randomFeaturedAphorism.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">დაკოპირდა</span>
                  </>
                ) : (
                  <>
                    <Quote className="w-3.5 h-3.5" />
                    <span>ტექსტის კოპირება</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar Controls */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#78716C]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="მოძებნეთ აფორიზმი (მაგ: ლეკვი, ბოროტსა, გასცემ...)"
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg bg-[#FAF8F5] border border-[#DDD3C2] focus:outline-none focus:border-[#881337] focus:ring-1 focus:ring-[#881337] transition-all text-[#1C1917]"
              />
            </div>

            {/* Result count indicator */}
            <div className="text-xs text-[#78716C] font-mono tabular-nums">
              ნაპოვნია: {filteredAphorisms.length} აფორიზმი
            </div>
          </div>

          {/* Theme Filters (Segmented Controls) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {themes.map((theme) => {
              const isActive = selectedTheme === theme.key;
              return (
                <button
                  key={theme.key}
                  onClick={() => setSelectedTheme(theme.key)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#1C1917] text-[#FAF8F5] shadow-xs'
                      : 'bg-[#F2ECE1] text-[#57534E] hover:text-[#1C1917] hover:bg-[#E8E0D2]'
                  }`}
                >
                  {theme.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Aphorisms Grid */}
        {filteredAphorisms.length === 0 ? (
          <div className="p-12 text-center rounded-xl bg-[#F6F1E8] border border-[#DDD3C2] text-[#78716C] font-serif">
            <p className="text-base">მითითებული საძიებო სიტყვით აფორიზმი ვერ მოიძებნა.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedTheme('all'); }}
              className="mt-3 text-xs text-[#881337] underline font-medium cursor-pointer"
            >
              ფილტრების გასუფთავება
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredAphorisms.map((aph) => {
              const isCopied = copiedId === aph.id;
              return (
                <article
                  key={aph.id}
                  className="p-6 rounded-xl bg-[#FAF8F5] border border-[#DDD3C2] hover:border-[#C9BBA7] transition-all flex flex-col justify-between shadow-xs space-y-4"
                >
                  <div className="space-y-3">
                    {/* Clean unboxed metadata kicker */}
                    <div className="flex items-center justify-between text-xs text-[#78716C]">
                      <span className="font-serif font-semibold text-[#881337]">{aph.themeKa}</span>
                      <span className="font-mono tabular-nums">{aph.context}</span>
                    </div>

                    {/* Verse Lines */}
                    <blockquote className="font-serif text-lg font-bold text-[#1C1917] leading-snug italic border-l-2 border-[#B45309] pl-3.5 my-2">
                      {aph.text.map((line, idx) => (
                        <div key={idx}>{line}</div>
                      ))}
                    </blockquote>

                    {/* Explanation */}
                    <p className="text-xs sm:text-sm text-[#44403C] font-serif leading-relaxed">
                      {aph.explanation}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#EDE5D8] flex items-center justify-between text-xs text-[#78716C]">
                    <span className="font-serif italic text-[11px]">„ვეფხისტყაოსანი“</span>
                    <button
                      onClick={() => handleCopy(aph)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#F4EFE6] hover:bg-[#EAE2D3] text-[#292524] transition-colors cursor-pointer"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">დაკოპირდა</span>
                        </>
                      ) : (
                        <>
                          <Quote className="w-3.5 h-3.5 text-[#B45309]" />
                          <span>კოპირება</span>
                        </>
                      )}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
