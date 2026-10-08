import { useState, useId } from 'react';
import { SHAIRI_SAMPLES } from '../data/rustaveliData';
import { Play, Pause, Music, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { playPluckNote, playShairiCadence } from '../utils/audioSynth';

export default function ShairiLab() {
  const [activeSampleIndex, setActiveSampleIndex] = useState(0);
  const [isPlayingBeat, setIsPlayingBeat] = useState(false);
  const [currentBeatStep, setCurrentBeatStep] = useState<number | null>(null);
  
  // Custom verse analyzer state
  const [customVerse, setCustomVerse] = useState('ლეკვი ლომისა სწორია, ძუ იყოს, თუმცა ხვადია');

  const selectedSample = SHAIRI_SAMPLES[activeSampleIndex];

  // Georgian vowel counter for syllable count
  const countGeorgianSyllables = (text: string) => {
    const vowels = /[აეიოუ]/g;
    const matches = text.match(vowels);
    return matches ? matches.length : 0;
  };

  const customSyllableCount = countGeorgianSyllables(customVerse);
  const isExactShairi = customSyllableCount === 16;

  const handlePlayRhythm = () => {
    if (isPlayingBeat) return;
    setIsPlayingBeat(true);

    let step = 0;
    const interval = setInterval(() => {
      setCurrentBeatStep(step);
      playShairiCadence(step);
      step++;

      if (step >= 16) {
        clearInterval(interval);
        setTimeout(() => {
          setIsPlayingBeat(false);
          setCurrentBeatStep(null);
        }, 300);
      }
    }, 220);
  };

  return (
    <section id="shairi" className="py-20 border-b border-[#E8E2D8] bg-[#F7F4EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="text-xs uppercase tracking-widest text-[#881337] font-serif font-semibold">
            პოეტური მეტრიკა და რიტმი
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C1917] tracking-tight">
            რუსთველური 16-მარცვლიანი შაირის ლაბორატორია
          </h2>
          <p className="text-[#57534E] font-serif text-base leading-relaxed">
            რუსთაველმა ქართული ლექსთწყობა უმაღლეს მუსიკალურ კანონად აქცია. „ვეფხისტყაოსანი“ დაწერილია მკაცრი 16-მარცვლიანი შაირით, რომელიც ორ მთავარ ფორმად — მაღალ და დაბალ შაირად იყოფა.
          </p>
        </div>

        {/* Shairi Forms Switcher */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Interactive Metric Showcase */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="flex items-center gap-2 p-1.5 bg-[#EAE2D3] rounded-xl border border-[#D5CABB]">
              {SHAIRI_SAMPLES.map((sample, idx) => {
                const isActive = idx === activeSampleIndex;
                return (
                  <button
                    key={sample.type}
                    onClick={() => setActiveSampleIndex(idx)}
                    className={`flex-1 py-2.5 px-4 text-xs sm:text-sm font-serif font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'bg-[#FAF8F5] text-[#881337] shadow-xs'
                        : 'text-[#57534E] hover:text-[#1C1917]'
                    }`}
                  >
                    {sample.type}
                  </button>
                );
              })}
            </div>

            {/* Metric Blueprint Box */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#FAF8F5] border border-[#DDD3C2] shadow-xs space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#E2D8C6]">
                <div>
                  <span className="text-xs font-mono font-bold text-[#881337] uppercase">სტრუქტურული წესი:</span>
                  <p className="text-sm font-serif font-medium text-[#1C1917] mt-0.5">{selectedSample.rule}</p>
                </div>
                <div className="text-xs text-[#78716C] font-mono">
                  რითმა: {selectedSample.rhyme}
                </div>
              </div>

              {/* Verses with Syllabic Breakdowns */}
              <div className="space-y-4 font-serif">
                {selectedSample.verses.map((v, i) => (
                  <div key={i} className="p-4 rounded-lg bg-[#F8F5EE] border border-[#E5DAC8] space-y-1.5">
                    <p className="text-base sm:text-lg font-bold text-[#1C1917]">
                      {v.text}
                    </p>
                    <p className="text-xs font-mono text-[#881337] tracking-wide">
                      {v.syllables}
                    </p>
                  </div>
                ))}
              </div>

              {/* Audio Playback of 16-Beat Rhythm */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <button
                  onClick={handlePlayRhythm}
                  disabled={isPlayingBeat}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#881337] hover:bg-[#70102D] rounded-lg transition-colors cursor-pointer shadow-xs"
                >
                  <Music className="w-4 h-4" />
                  <span>{isPlayingBeat ? 'ჟღერს 16-მარცვლიანი ტაქტი...' : 'მოისმინე 16 მარცვლის რიტმი'}</span>
                </button>

                {/* 16-Beat Visualizer */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: 16 }).map((_, stepIdx) => (
                    <div
                      key={stepIdx}
                      className={`w-2.5 sm:w-3 h-5 rounded-xs transition-all ${
                        currentBeatStep === stepIdx
                          ? 'bg-[#B45309] scale-y-125'
                          : stepIdx === 7
                          ? 'bg-[#881337]/50' // Halfway Caesura indicator
                          : 'bg-[#DDD3C2]'
                      }`}
                      title={`მარცვალი ${stepIdx + 1}${stepIdx === 7 ? ' (ცეზურა)' : ''}`}
                    />
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* Right: Live Syllable Analyzer (Test your own verse) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#F4EFE6] border border-[#DDD3C2] space-y-5">
              
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-lg text-[#1C1917]">
                  სტრიქონის რიტმული ანალიზატორი
                </h3>
                <p className="text-xs text-[#57534E] leading-relaxed">
                  ჩაწერეთ ან ჩასვით ქართული ტაეპი მარცვლებისა და რუსთველური შაირის შესამოწმებლად.
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-serif font-semibold text-[#78716C]">
                  სატესტო ტაეპი (სტრიქონი):
                </label>
                <textarea
                  rows={2}
                  value={customVerse}
                  onChange={(e) => setCustomVerse(e.target.value)}
                  className="w-full p-3 text-sm rounded-lg bg-[#FAF8F5] border border-[#DDD3C2] focus:outline-none focus:border-[#881337] focus:ring-1 focus:ring-[#881337] font-serif text-[#1C1917]"
                  placeholder="ჩაწერეთ ტაეპი..."
                />
              </div>

              {/* Syllable Counter Box */}
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E0D5C3] flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#78716C] font-mono">მარცვლების რაოდენობა:</p>
                  <p className="text-2xl font-mono font-bold tabular-nums text-[#1C1917]">
                    {customSyllableCount} <span className="text-xs text-[#78716C] font-normal font-sans">მარცვალი</span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {isExactShairi ? (
                    <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-serif font-semibold bg-emerald-50 px-3 py-1.5 rounded-md border border-emerald-200">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>ზუსტი 16-მარცვლიანი შაირი!</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-[#B45309] text-xs font-serif bg-amber-50 px-3 py-1.5 rounded-md border border-amber-200">
                      <AlertCircle className="w-4 h-4" />
                      <span>{customSyllableCount < 16 ? `აკლია ${16 - customSyllableCount}` : `მეტია ${customSyllableCount - 16}-ით`}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Preset Quick Test Buttons */}
              <div className="space-y-1.5">
                <span className="text-xs font-serif text-[#78716C]">სწრაფი ნიმუშები:</span>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setCustomVerse('რომელმან შექმნა სამყარო, ძალითა მით ძლიერითა')}
                    className="px-2.5 py-1 text-xs rounded bg-[#FAF8F5] hover:bg-[#EAE2D3] border border-[#DDD3C2] text-[#44403C] transition-colors cursor-pointer"
                  >
                    პროლოგის დასაწყისი (16)
                  </button>
                  <button
                    onClick={() => setCustomVerse('სჯობს სიცოცხლესა ნაზრახსა სიკვდილი სახელოვანი')}
                    className="px-2.5 py-1 text-xs rounded bg-[#FAF8F5] hover:bg-[#EAE2D3] border border-[#DDD3C2] text-[#44403C] transition-colors cursor-pointer"
                  >
                    ავთანდილის ანდერძი (16)
                  </button>
                  <button
                    onClick={() => setCustomVerse('რასაცა გასცემ შენია, რაც არა დაკარგულია')}
                    className="px-2.5 py-1 text-xs rounded bg-[#FAF8F5] hover:bg-[#EAE2D3] border border-[#DDD3C2] text-[#44403C] transition-colors cursor-pointer"
                  >
                    გაცემის სიბრძნე (16)
                  </button>
                </div>
              </div>

              {/* Informational Callout on Caesura */}
              <div className="text-xs text-[#57534E] leading-relaxed font-serif border-t border-[#DFD5C4] pt-3">
                <strong>ცეზურა:</strong> შაირის მუსიკალური პაუზა სტრიქონის შუაში, რომელიც მკითხველს სუნთქვის საშუალებას აძლევს და რიტმს მონუმენტურობას ანიჭებს.
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
