import { useState } from 'react';
import { CHARACTERS, Character } from '../data/rustaveliData';
import { Shield, Sparkles, Heart, Quote, ArrowRight, Swords, Check } from 'lucide-react';

export default function CharactersSection() {
  const [selectedCharId, setSelectedCharId] = useState<string>('tariel');
  const [copiedQuote, setCopiedQuote] = useState(false);

  const activeChar = CHARACTERS.find((c) => c.id === selectedCharId) || CHARACTERS[0];

  const handleCopyQuote = (quoteText: string) => {
    navigator.clipboard.writeText(quoteText);
    setCopiedQuote(true);
    setTimeout(() => setCopiedQuote(false), 2000);
  };

  return (
    <section id="characters" className="py-20 border-b border-[#E8E2D8] bg-[#F7F4EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="text-xs uppercase tracking-widest text-[#881337] font-serif font-semibold">
              პერსონაჟთა გალერეა
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C1917] tracking-tight">
              „ვეფხისტყაოსნის“ გმირები და მათი სიმბოლიკა
            </h2>
            <p className="text-[#57534E] font-serif text-base leading-relaxed">
              რუსთაველის პერსონაჟები არ არიან მხოლოდ ლიტერატურული ფიგურები — ისინი განასახიერებენ ადამიანური სულის უმაღლეს იდეალებს: მეგობრობას, თავგანწირვას, ერთგულებასა და გონიერებას.
            </p>
          </div>

          {/* Epic scene preview: Kajeti Fortress */}
          <div className="hidden lg:flex items-center gap-3 p-3 bg-[#EDE6DA] rounded-lg border border-[#DDD3C2] max-w-sm">
            <img
              src="/src/assets/images/kajeti_fortress_1791436348525.jpg"
              alt="ქაჯეთის ციხის აღება სამი რაინდის მიერ"
              referrerPolicy="no-referrer"
              className="w-16 h-16 rounded object-cover shrink-0"
            />
            <div className="text-xs space-y-0.5">
              <p className="font-serif font-bold text-[#1C1917]">ქაჯეთის ციხის აღება</p>
              <p className="text-[#78716C] line-clamp-2">სამი ძმადნაფიცის მიერ ნესტან-დარეჯანის გამოხსნა.</p>
            </div>
          </div>
        </div>

        {/* Character Selection Tabs - Functional interactive segmented control */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-[#E2D8C6]">
          {CHARACTERS.map((char) => {
            const isSelected = char.id === selectedCharId;
            return (
              <button
                key={char.id}
                onClick={() => setSelectedCharId(char.id)}
                className={`px-4 py-2.5 text-sm font-medium rounded-t-lg transition-all whitespace-nowrap cursor-pointer border-t border-x ${
                  isSelected
                    ? 'bg-[#FAF8F5] text-[#881337] font-serif font-bold border-[#DDD3C2] shadow-xs'
                    : 'bg-[#F2ECE1] text-[#57534E] border-transparent hover:text-[#1C1917] hover:bg-[#EAE2D3]'
                }`}
              >
                {char.name}
              </button>
            );
          })}
        </div>

        {/* Selected Character Deep Dive Card */}
        <div className="p-6 sm:p-10 rounded-2xl bg-[#FAF8F5] border border-[#DDD3C2] shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Artwork / Visual Card */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative rounded-xl overflow-hidden bg-[#EAE2D3] border border-[#D5CABB] shadow-sm">
                <img
                  src={
                    activeChar.id === 'tariel'
                      ? '/src/assets/images/tariel_knight_1791436329163.jpg'
                      : activeChar.id === 'nestan' || activeChar.id === 'pridon'
                      ? '/src/assets/images/kajeti_fortress_1791436348525.jpg'
                      : '/src/assets/images/tamar_court_1791436339349.jpg'
                  }
                  alt={activeChar.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover aspect-[4/3] hover:scale-102 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                  <div className="text-white">
                    <p className="text-xs uppercase tracking-wider text-amber-200 font-mono">{activeChar.kingdom}</p>
                    <p className="text-lg font-serif font-bold">{activeChar.name}</p>
                  </div>
                </div>
              </div>

              {/* Trait Tags - Clean typography, no candy pills */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#57534E]">
                <span className="font-semibold text-[#881337]">თვისებები:</span>
                {activeChar.attributes.map((attr, idx) => (
                  <span key={attr} className="flex items-center gap-1.5">
                    {idx > 0 && <span aria-hidden="true" className="text-[#C4B5A5]">/</span>}
                    <span>{attr}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Character Story & Symbolism */}
            <div className="lg:col-span-7 space-y-6">
              
              <div>
                <div className="text-xs uppercase tracking-wider text-[#78716C] font-mono">
                  {activeChar.role}
                </div>
                <h3 className="text-3xl font-serif font-bold text-[#1C1917] mt-1">
                  {activeChar.name}
                </h3>
              </div>

              <p className="text-base sm:text-lg text-[#44403C] font-serif leading-relaxed">
                {activeChar.description}
              </p>

              {/* Symbolism Block */}
              <div className="p-4 rounded-xl bg-[#F4EFE6] border border-[#E0D5C3] space-y-1">
                <span className="text-xs uppercase tracking-wider text-[#881337] font-semibold">
                  ფილოსოფიური სიმბოლიკა
                </span>
                <p className="text-sm text-[#292524] font-serif">
                  {activeChar.symbolism}
                </p>
              </div>

              {/* Key Character Quote */}
              <div className="p-5 rounded-xl bg-[#FAF8F5] border border-[#DDD3C2] relative space-y-2">
                <div className="flex items-center justify-between text-xs text-[#78716C]">
                  <span className="font-serif italic">{activeChar.quoteSource}</span>
                  <button
                    onClick={() => handleCopyQuote(activeChar.quote)}
                    className="flex items-center gap-1 hover:text-[#1C1917] transition-colors cursor-pointer"
                  >
                    {copiedQuote ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Quote className="w-3.5 h-3.5" />}
                    <span>{copiedQuote ? 'დაკოპირდა' : 'კოპირება'}</span>
                  </button>
                </div>
                <p className="text-base sm:text-lg font-serif italic font-semibold text-[#881337]">
                  {activeChar.quote}
                </p>
              </div>

            </div>

          </div>
        </div>

        {/* The Trio of Sworn Brothers Narrative Bar */}
        <div className="p-6 sm:p-8 rounded-xl bg-[#EDE5D8] border border-[#D5CABB] grid grid-cols-1 md:grid-cols-3 gap-6 text-[#292524]">
          <div className="space-y-1">
            <h4 className="font-serif font-bold text-lg text-[#1C1917]">ტარიელი</h4>
            <p className="text-xs text-[#78716C]">უმაღლესი მიჯნური</p>
            <p className="text-xs sm:text-sm text-[#44403C] font-serif leading-relaxed mt-2">
              გამოსახავს ემოციურ უკიდურესობასა და სიყვარულის უკომპრომისო მსხვერპლშეწირვას.
            </p>
          </div>

          <div className="space-y-1 md:border-x md:border-[#DDD3C2] md:px-6">
            <h4 className="font-serif font-bold text-lg text-[#1C1917]">ავთანდილი</h4>
            <p className="text-xs text-[#78716C]">სიბრძნე და მოვალეობა</p>
            <p className="text-xs sm:text-sm text-[#44403C] font-serif leading-relaxed mt-2">
              განასახიერებს პრაქტიკულ გონიერებას, დიპლომატიასა და შეუდრეკელ ერთგულებას.
            </p>
          </div>

          <div className="space-y-1">
            <h4 className="font-serif font-bold text-lg text-[#1C1917]">ნურადინ-ფრიდონი</h4>
            <p className="text-xs text-[#78716C]">სიცოცხლის ხალისი</p>
            <p className="text-xs sm:text-sm text-[#44403C] font-serif leading-relaxed mt-2">
              წარმოადგენს უშრეტ ოპტიმიზმს, რაინდულ სოლიდარობასა და საზღვაო ძლიერებას.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
