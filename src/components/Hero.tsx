import { useState } from 'react';
import { Volume2, Sparkles, ArrowRight, Quote, Check } from 'lucide-react';
import { playPluckNote, playShairiCadence } from '../utils/audioSynth';

interface HeroProps {
  onOpenPrologue: () => void;
  onExploreCharacters: () => void;
}

export default function Hero({ onOpenPrologue, onExploreCharacters }: HeroProps) {
  const [isPlayingMelody, setIsPlayingMelody] = useState(false);
  const [copiedQuote, setCopiedQuote] = useState(false);

  const heroQuote = `ვის ჰშვენის, — ლომსა, — ხმარება შუბისა, ფარ-შიმშერისა,
მეფისა მზის-მზე თამარის, ღაწვ-ბალახშ, თმა-გიშერისა,
თამარ შევამკოთ შეხმობით, გულითა მეტად მხნითა-რე,
მელნად ვიხმარე შავ-შავი, კალმად კი ხეშეში ლერწამი...`;

  const handlePlayCadence = () => {
    setIsPlayingMelody(true);
    let step = 0;
    const interval = setInterval(() => {
      playShairiCadence(step);
      step++;
      if (step >= 8) {
        clearInterval(interval);
        setTimeout(() => setIsPlayingMelody(false), 500);
      }
    }, 280);
  };

  const handleCopyQuote = () => {
    navigator.clipboard.writeText(heroQuote);
    setCopiedQuote(true);
    playPluckNote(523.25, 0.4, 0.1);
    setTimeout(() => setCopiedQuote(false), 2000);
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 border-b border-[#E8E2D8] bg-gradient-to-b from-[#FAF8F5] via-[#F6F2EB] to-[#FAF8F5]">
      {/* Subtle illuminated ornament watermark line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#B45309]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Editorial Text */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Editorial Metadata Kicker - Strict Zero-Pill Unboxed */}
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#78716C] font-serif">
              <span>XII საუკუნე</span>
              <span aria-hidden="true" className="text-[#B45309]">·</span>
              <span>ქართული ოქროს ხანა</span>
              <span aria-hidden="true" className="text-[#B45309]">·</span>
              <span>თამარ მეფის ეპოქა</span>
              <span aria-hidden="true" className="text-[#B45309]">·</span>
              <span>იუნესკოს რეესტრი</span>
            </div>

            {/* Dominant Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#1C1917] tracking-tight leading-[1.15]" style={{ textWrap: 'balance' }}>
              შოთა რუსთაველი და უკვდავი <span className="text-[#881337] italic">„ვეფხისტყაოსანი“</span>
            </h1>

            {/* Subtitle / Deck */}
            <p className="text-base sm:text-lg text-[#57534E] leading-relaxed max-w-2xl font-serif">
              მსოფლიო ჰუმანიზმის უბადლო შედევრი, რომელმაც ევროპულ რენესანსს საუკუნეებით გაუსწრო.
              პოემა სიყვარულის, უანგარო ძმობის, თავისუფლებისა და ქალ-ვაჟის თანასწორობის უზენაესობაზე.
            </p>

            {/* Featured Prologue Excerpt Card */}
            <div className="p-5 sm:p-6 rounded-xl bg-[#F4EFE6] border border-[#DDD3C2] relative">
              <div className="flex items-center justify-between pb-3 border-b border-[#E2D8C6] text-xs text-[#78716C]">
                <span className="font-serif italic font-semibold text-[#881337]">პროლოგიდან · თამარ მეფის ქება</span>
                <button
                  onClick={handleCopyQuote}
                  className="flex items-center gap-1 hover:text-[#1C1917] transition-colors cursor-pointer"
                  title="სტროფის კოპირება"
                >
                  {copiedQuote ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Quote className="w-3.5 h-3.5" />}
                  <span>{copiedQuote ? 'დაკოპირდა' : 'კოპირება'}</span>
                </button>
              </div>
              
              <blockquote className="mt-3 font-serif italic text-sm sm:text-base text-[#292524] leading-relaxed">
                „ვის ჰშვენის, — ლომსა, — ხმარება შუბისა, ფარ-შიმშერისა,<br />
                მეფისა მზის-მზე თამარის, ღაწვ-ბალახშ, თმა-გიშერისა,<br />
                თამარ შევამკოთ შეხმობით, გულითა მეტად მხნითა-რე,<br />
                მელნად ვიხმარე შავ-შავი, კალმად კი ხეშეში ლერწამი...“
              </blockquote>
            </div>

            {/* Interactive Primary Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenPrologue}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#881337] hover:bg-[#70102D] rounded-lg transition-all shadow-xs cursor-pointer"
              >
                <span>პროლოგის წაკითხვა</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handlePlayCadence}
                disabled={isPlayingMelody}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-[#1C1917] bg-[#FAF8F5] border border-[#D6CEBE] hover:border-[#B45309] hover:bg-[#F2ECE1] rounded-lg transition-colors cursor-pointer"
              >
                <Volume2 className={`w-4 h-4 text-[#B45309] ${isPlayingMelody ? 'animate-pulse' : ''}`} />
                <span>{isPlayingMelody ? 'ჟღერს შაირის კადენცია...' : 'მოუსმინე შაირის ჰარმონიას'}</span>
              </button>

              <button
                onClick={onExploreCharacters}
                className="text-sm font-medium text-[#57534E] hover:text-[#881337] underline underline-offset-4 transition-colors"
              >
                გმირების გაცნობა →
              </button>
            </div>

            {/* Quantitative Heritage Proof Strip - strict tabular figures */}
            <div className="pt-6 border-t border-[#E8E2D8] grid grid-cols-2 sm:grid-cols-4 gap-4 text-[#44403C]">
              <div>
                <p className="text-2xl font-serif font-bold text-[#1C1917] tabular-nums">1667</p>
                <p className="text-xs text-[#78716C] mt-0.5">უკვდავი სტროფი</p>
              </div>
              <div>
                <p className="text-2xl font-serif font-bold text-[#1C1917] tabular-nums">16</p>
                <p className="text-xs text-[#78716C] mt-0.5">მარცვლიანი შაირი</p>
              </div>
              <div>
                <p className="text-2xl font-serif font-bold text-[#1C1917] tabular-nums">50+</p>
                <p className="text-xs text-[#78716C] mt-0.5">მსოფლიო ენაზე თარგმანი</p>
              </div>
              <div>
                <p className="text-2xl font-serif font-bold text-[#1C1917] tabular-nums">1960</p>
                <p className="text-xs text-[#78716C] mt-0.5">ჯვრის მონასტრის ფრესკა</p>
              </div>
            </div>

          </div>

          {/* Right Column: High-Fidelity Editorial Portrait */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Decorative gilded corner accents */}
              <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-[#B45309]" />
              <div className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-[#B45309]" />
              <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-[#B45309]" />
              <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-[#B45309]" />

              <div className="overflow-hidden rounded-lg bg-[#EFE9DF] shadow-md border border-[#D5CABB]">
                <img
                  src="/src/assets/images/rustaveli_portrait_1791436313808.jpg"
                  alt="შოთა რუსთაველის პორტრეტი იერუსალიმის ჯვრის მონასტრის ფრესკის მოტივებით"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover aspect-[3/4] hover:scale-102 transition-transform duration-700"
                />
              </div>

              {/* Museum Figure Caption */}
              <div className="mt-3 text-center">
                <p className="text-xs font-serif italic text-[#78716C]">
                  შოთა რუსთაველი — მეჭურჭლეთუხუცესი და პოეტი (იერუსალიმის ჯვრის მონასტრის ფრესკის მხატვრული რეპრეზენტაცია)
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
