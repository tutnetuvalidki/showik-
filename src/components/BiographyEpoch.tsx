import { useState } from 'react';
import { BIOGRAPHY_TEXT, TIMELINE, TimelineEvent } from '../data/rustaveliData';
import { Calendar, Compass, Scroll, Award, ChevronRight } from 'lucide-react';

export default function BiographyEpoch() {
  const [activeTimelineIndex, setActiveTimelineIndex] = useState(0);
  const activeEvent: TimelineEvent = TIMELINE[activeTimelineIndex];

  return (
    <section id="biography" className="py-20 border-b border-[#E8E2D8] bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="text-xs uppercase tracking-widest text-[#881337] font-serif font-semibold">
            ისტორიული ნარკვევი
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C1917] tracking-tight">
            შოთა რუსთაველის ცხოვრება და ქართული ოქროს ხანა
          </h2>
          <p className="text-[#57534E] font-serif text-base leading-relaxed">
            XII–XIII საუკუნეების საქართველო — კულტურული და სამხედრო აყვავების მწვერვალი, სადაც ევროპულ რენესანსამდე ორი საუკუნით ადრე დაიბადა ადამიანის თავისუფლებისა და სიყვარულის ჰიმნი.
          </p>
        </div>

        {/* 2-Column Curatorial Narrative + Court Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main Essay Narrative with Editorial Drop Cap */}
          <div className="lg:col-span-7 space-y-6 text-[#292524] font-serif leading-relaxed text-base sm:text-lg">
            
            <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-[#881337] first-letter:float-left first-letter:mr-3 first-letter:mt-1 leading-relaxed">
              {BIOGRAPHY_TEXT.intro}
            </p>

            <p className="text-[#44403C]">
              {BIOGRAPHY_TEXT.goldenAge}
            </p>

            {/* Curatorial Callout on Jerusalem Fresco */}
            <div className="p-6 rounded-xl bg-[#F5EFE6] border-l-4 border-[#881337] border-y border-r border-[#E2D8C6] space-y-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#881337] font-semibold">
                <Scroll className="w-4 h-4" />
                <span>იერუსალიმის ჯვრის მონასტრის აღმოჩენა (1960 წ.)</span>
              </div>
              <p className="text-sm sm:text-base text-[#292524] italic">
                {BIOGRAPHY_TEXT.monasteryDiscovery}
              </p>
              <div className="text-xs text-[#78716C] pt-2 border-t border-[#DFD5C4]">
                წარწერა სვეტზე: „ამისა დამხატავსა შოთას შეუნდვენ ღმერთმან. ამინ. რუსთველი.“
              </div>
            </div>

            <p className="text-[#44403C]">
              რუსთაველის მსოფლმხედველობა აერთიანებს ქრისტიანულ მისტიკას, ნეოპლატონურ ფილოსოფიასა და აღმოსავლურ კულტურულ დიალოგს. პოემაში მოქმედება გაშლილია არაბეთში, ინდოეთსა და ზღვისპირა ქვეყნებში, რაც ხაზს უსვამს ავტორის კოსმოპოლიტურ და უნივერსალურ ჰუმანისტურ ხედვას.
            </p>
          </div>

          {/* Right Column: Court of Queen Tamar Artwork & Curatorial Plaque */}
          <div className="lg:col-span-5 space-y-4">
            <div className="overflow-hidden rounded-xl bg-[#EDE5D8] border border-[#D5CABB] shadow-md group">
              <img
                src="/src/assets/images/tamar_court_1791436339349.jpg"
                alt="თამარ მეფის სამეფო კარი XII საუკუნის საქართველოში"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover aspect-[16/9] group-hover:scale-102 transition-transform duration-700"
              />
              <div className="p-5 bg-[#FAF8F5] border-t border-[#E2D8C6] space-y-2">
                <div className="flex items-center justify-between text-xs text-[#78716C]">
                  <span>სასახლის კარიბჭე</span>
                  <span className="font-mono tabular-nums">1184–1213 წწ.</span>
                </div>
                <h3 className="font-serif font-bold text-base text-[#1C1917]">
                  თამარ მეფე და კულტურული რენესანსი
                </h3>
                <p className="text-xs text-[#57534E] leading-relaxed">
                  თამარის ეპოქაში საქართველო იყო კავკასიისა და მახლობელი აღმოსავლეთის უძლიერესი სახელმწიფო. სამეფო კარზე მოღვაწეობდნენ უდიდესი ფილოსოფოსები, მთარგმნელები და პოეტები.
                </p>
              </div>
            </div>

            {/* Quick Historical Facts List */}
            <div className="p-5 rounded-xl bg-[#F7F3EB] border border-[#E4DCCA] space-y-3">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-[#881337] font-serif">
                საკვანძო ისტორიული ასპექტები
              </h4>
              <ul className="text-xs sm:text-sm text-[#44403C] space-y-2 font-serif">
                <li className="flex items-start gap-2">
                  <span className="text-[#B45309] font-bold">·</span>
                  <span><strong>მეჭურჭლეთუხუცესი:</strong> უმაღლესი სახელმწიფო მოხელე, რომელსაც ებარა სამეფო ხაზინა და ეკონომიკა.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#B45309] font-bold">·</span>
                  <span><strong>აკადემიური ცენტრები:</strong> გელათისა და იყალთოს აკადემიები, სადაც სწავლობდნენ ანტიკურ რიტორიკასა და მეცნიერებებს.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#B45309] font-bold">·</span>
                  <span><strong>ქალის მმართველობა:</strong> თამარი იწოდებოდა „მეფედ“ და არა „დედოფლად“, რაც ქალის პოლიტიკურ სიდიადეს ადასტურებდა.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* Interactive Chronological Timeline Rail */}
        <div className="pt-8 border-t border-[#E8E2D8] space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-xl font-serif font-bold text-[#1C1917]">
                ქრონოლოგიური გზამკვლევი
              </h3>
              <p className="text-xs text-[#78716C] mt-0.5">
                აირჩიეთ ეპოქალური ეტაპი დეტალების სანახავად
              </p>
            </div>
            
            <div className="text-xs font-mono tabular-nums text-[#78716C]">
              ეტაპი {activeTimelineIndex + 1} / {TIMELINE.length}
            </div>
          </div>

          {/* Timeline Step Buttons (Zero-Pill, Clean Segmented Timeline Rail) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {TIMELINE.map((item, index) => {
              const isActive = index === activeTimelineIndex;
              return (
                <button
                  key={item.year}
                  onClick={() => setActiveTimelineIndex(index)}
                  className={`text-left p-3.5 rounded-lg border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#1C1917] text-[#FAF8F5] border-[#1C1917] shadow-sm'
                      : 'bg-[#F5EFE6] text-[#44403C] border-[#DDD3C2] hover:bg-[#EDE5D8]'
                  }`}
                >
                  <p className={`text-xs font-mono font-bold tabular-nums ${isActive ? 'text-[#D4AF37]' : 'text-[#881337]'}`}>
                    {item.year}
                  </p>
                  <p className="text-xs font-serif font-medium mt-1 truncate">
                    {item.title}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Active Event Focused Card */}
          <div className="p-6 sm:p-8 rounded-xl bg-[#F6F1E8] border border-[#DDD3C2] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E2D8C6] pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-[#881337] tracking-wider uppercase">
                  წელი: {activeEvent.year}
                </span>
                <h4 className="text-2xl font-serif font-bold text-[#1C1917] mt-1">
                  {activeEvent.title}
                </h4>
              </div>
              <div className="text-xs font-serif text-[#78716C] italic bg-[#EDE5D8] px-3 py-1.5 rounded-md self-start sm:self-auto border border-[#DDD3C2]">
                {activeEvent.importance}
              </div>
            </div>

            <p className="text-base text-[#44403C] font-serif leading-relaxed max-w-4xl">
              {activeEvent.description}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
