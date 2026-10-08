import { useState } from 'react';
import { MANUSCRIPTS, ManuscriptItem } from '../data/rustaveliData';
import { Globe, BookMarked, Landmark, Sparkles, ExternalLink } from 'lucide-react';

export default function ManuscriptsGallery() {
  const [selectedManuscriptIndex, setSelectedManuscriptIndex] = useState(0);
  const activeItem = MANUSCRIPTS[selectedManuscriptIndex];

  const globalTranslators = [
    { lang: 'ინგლისური (English)', translator: 'მარჯორი უორდროპი (Marjory Wardrop, 1912)', note: 'პირველი სრული პროზაული ინგლისური თარგმანი ბოდლის ბიბლიოთეკაში' },
    { lang: 'ინგლისური (English - Poetic)', translator: 'კეტრინ ვივიანი & ვენერა ურუშაძე', note: 'პოეტური თარგმანები' },
    { lang: 'ფრანგული (Français)', translator: 'მარი ბროსე & გასტონ ბუაჩიძე', note: 'აკადემიური და პოეტური ვერსიები' },
    { lang: 'გერმანული (Deutsch)', translator: 'არტურ ლაისტი (Arthur Leist, 1889)', note: 'პირველი გერმანული თარგმანი ილია ჭავჭავაძის მეგობრის მიერ' },
    { lang: 'რუსული (Русский)', translator: 'კონსტანტინ ბალმონტი, ნიკოლაი ზაბოლოცკი', note: 'კლასიკური პოეტური ოსტატობა' },
    { lang: 'იაპონური & ჩინური', translator: 'აღმოსავლური აკადემიური თარგმანები', note: 'ტოკიოსა და პეკინის უნივერსიტეტების გამოცემები' },
  ];

  return (
    <section id="manuscripts" className="py-20 border-b border-[#E8E2D8] bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="text-xs uppercase tracking-widest text-[#881337] font-serif font-semibold">
            ხელნაწერთა საგანძური და მსოფლიო აღიარება
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C1917] tracking-tight">
            ხელნაწერები, გამოცემები და თარგმანები
          </h2>
          <p className="text-[#57534E] font-serif text-base leading-relaxed">
            საუკუნეების განმავლობაში „ვეფხისტყაოსანი“ გადაიცემოდა ძვირფასი ხელით გადაწერილი ნუსხებით. 2013 წელს „ვეფხისტყაოსნის“ ხელნაწერთა კოლექცია შევიდა იუნესკოს „მსოფლიო მეხსიერების“ (UNESCO Memory of the World) რეესტრში.
          </p>
        </div>

        {/* Manuscripts Interactive Selector & Viewer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Manuscript Catalog List */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs uppercase tracking-wider text-[#78716C] font-mono">
              ისტორიული ნუსხები და ეტაპები
            </h3>

            <div className="space-y-2">
              {MANUSCRIPTS.map((ms, idx) => {
                const isActive = idx === selectedManuscriptIndex;
                return (
                  <button
                    key={ms.year}
                    onClick={() => setSelectedManuscriptIndex(idx)}
                    className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#F4EFE6] border-[#881337] shadow-xs'
                        : 'bg-[#FAF8F5] border-[#DDD3C2] hover:bg-[#F7F3EB]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold tabular-nums text-[#881337]">
                        {ms.year} წელი
                      </span>
                      <span className="text-[11px] text-[#78716C] font-mono truncate max-w-[150px]">
                        {ms.authorOrLocation}
                      </span>
                    </div>
                    <h4 className="text-sm font-serif font-bold text-[#1C1917] mt-1">
                      {ms.title}
                    </h4>
                    <p className="text-xs text-[#57534E] font-serif mt-1 line-clamp-1">
                      {ms.significance}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Detailed Curatorial Accession Display */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#F6F1E8] border border-[#DDD3C2] shadow-xs space-y-6">
            
            <div className="border-b border-[#E2D8C6] pb-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[#881337]">
                <BookMarked className="w-4 h-4" />
                <span>არქივი · {activeItem.year}</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#1C1917] mt-1">
                {activeItem.title}
              </h3>
              <p className="text-xs text-[#78716C] mt-1 font-mono">
                ადგილმდებარეობა: {activeItem.authorOrLocation}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-xs font-semibold text-[#881337] uppercase tracking-wider">
                  ისტორიული აღწერა
                </span>
                <p className="text-base text-[#292524] font-serif leading-relaxed mt-1">
                  {activeItem.description}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E0D5C3]">
                <span className="text-xs font-semibold text-[#B45309] uppercase tracking-wider">
                  კულტურული მნიშვნელობა
                </span>
                <p className="text-sm text-[#44403C] font-serif mt-0.5">
                  {activeItem.significance}
                </p>
              </div>
            </div>

            <div className="pt-2 text-xs text-[#78716C] font-serif italic">
              დაცულია საქართველოს ხელნაწერთა ეროვნულ ცენტრში, თბილისი.
            </div>

          </div>

        </div>

        {/* Global Translations Strip */}
        <div className="p-8 rounded-2xl bg-[#EDE5D8] border border-[#D5CABB] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DDD3C2]">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-serif font-semibold text-[#881337] uppercase tracking-wider">
                <Globe className="w-4 h-4 text-[#881337]" />
                <span>მსოფლიო აღიარება · 50-ზე მეტი ენა</span>
              </div>
              <h3 className="text-xl font-serif font-bold text-[#1C1917]">
                „ვეფხისტყაოსნის“ გლობალური თარგმანები
              </h3>
            </div>
            
            <div className="text-xs text-[#44403C] font-serif max-w-sm">
              რუსთაველის ჰუმანიზმმა გადალახა ეროვნული საზღვრები და მსოფლიო კულტურის საერთო საკუთრებად იქცა.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {globalTranslators.map((t) => (
              <div key={t.lang} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DDD3C2] space-y-1">
                <p className="text-xs font-mono font-bold text-[#881337]">{t.lang}</p>
                <p className="text-sm font-serif font-bold text-[#1C1917]">{t.translator}</p>
                <p className="text-xs text-[#57534E] font-serif">{t.note}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
