import { useState } from 'react';
import { X, Volume2, BookOpen, Quote, Check, Type } from 'lucide-react';
import { playPluckNote, playShairiCadence } from '../utils/audioSynth';

interface PrologueModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PROLOGUE_STANZAS = [
  {
    num: 1,
    title: 'შესავალი — შესაქმე',
    lines: [
      'რომელმან შექმნა სამყარო ძალითა მით ძლიერითა,',
      'ზეგარდმო არსნი სულითა ყვნა ზეცით მონაბერითა,',
      'ჩვენ, კაცთა, მოგვცა ქვეყანა, გვაქვს უთვალავი ფერითა,',
      'მისგან არს ყოვლი ხელმწიფე სახითა მისმიერითა.'
    ]
  },
  {
    num: 2,
    title: 'ღვთიური შემწეობა',
    lines: [
      'ჰე, ღმერთო ერთო, შენ შეჰქმენ სახე ყოვლისა ტანისა,',
      'შენ დამიფარე, ძლევა მეც დათრგუნვად მე სატანისა,',
      'მომეც მიჯნურთა სურვილი, სიკვდიდმდე გასატანისა,',
      'ცოდვათა შემსუბუქება მუნ თანა წასატანისა.'
    ]
  },
  {
    num: 3,
    title: 'თამარ მეფის ქება',
    lines: [
      'ვის ჰშვენის, — ლომსა, — ხმარება შუბისა, ფარ-შიმშერისა,',
      'მეფისა მზის-მზე თამარის, ღაწვ-ბალახშ, თმა-გიშერისა,',
      'თამარ შევამკოთ შეხმობით, გულითა მეტად მხნითა-რე,',
      'მელნად ვიხმარე შავ-შავი, კალმად კი ხეშეში ლერწამი.'
    ]
  },
  {
    num: 4,
    title: 'პოეტის აღსარება',
    lines: [
      'თამარს ვაქებდეთ მეფესა სისხლისა ცრემლ-დათხეული,',
      'ვთქვენი ქებანი მე მისნი, არ-ავად გამორჩეული;',
      'მელნად ვიხმარე გიშრის ტბა და კალმად ტრედის ფრთა-მჩატე,',
      'ვინცა ისმენდეს, დაესვას ლახვარი გულსა ხეული.'
    ]
  },
  {
    num: 5,
    title: 'ავტორის ვინაობა',
    lines: [
      'მე, რუსთველი, ხელობითა ვიქმ საქმესა ამა დარი:',
      'ვისთვის ვკვდები, მას არ ესმის ჩემი გულის ნაამბარი,',
      'მისი სახე განმანათლებს, ვითა მთვარე ან ცის კარი,',
      'მისთვის ვმღერი ამა ლექსსა, ვითა ბულბულს ყვავილნარი.'
    ]
  },
  {
    num: 6,
    title: 'შაირობის ხელოვნება',
    lines: [
      'შაირობა პირველადვე სიბრძნისაა ერთი დარგი,',
      'საღმრთო, საღმრთოდ გასაგონი, მსმენელთათვის დიდი კარგი,',
      'კვლა აქაურსაცა ეამების, თუ კაცია ზედ-მიმდგარი,',
      'გრძელი სიტყვა მოკლედ ითქმის, შაირია ამად კარგი.'
    ]
  },
  {
    num: 7,
    title: 'მიჯნურობის არსი',
    lines: [
      'მიჯნურობა არის ტურფა, საცოდნელად ძნელი გვარი;',
      'მიჯნურობა სხვა რამეა, არ სიძვისა დასადარი:',
      'იგი სხვაა, სიძვა სხვაა, შუა უზის დიდი ზღვარი,',
      'ნუ აურევთ ერთმანეთსა! გესმით ჩემი ნაუბარი?!'
    ]
  }
];

export default function PrologueModal({ isOpen, onClose }: PrologueModalProps) {
  const [fontSizeClass, setFontSizeClass] = useState<'text-base' | 'text-lg' | 'text-xl'>('text-lg');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleCopyStrophe = (idx: number, lines: string[]) => {
    navigator.clipboard.writeText(lines.join('\n'));
    setCopiedIndex(idx);
    playPluckNote(440, 0.4, 0.1);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="bg-[#FAF8F5] rounded-2xl border border-[#D5CABB] max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in duration-200">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#E2D8C6] flex items-center justify-between bg-[#F4EFE6]">
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-[#881337]" />
            <div>
              <h2 className="text-xl font-serif font-bold text-[#1C1917]">
                „ვეფხისტყაოსნის“ პროლოგი
              </h2>
              <p className="text-xs text-[#78716C] font-mono">
                შოთა რუსთაველი · კლასიკური ტექსტი
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Font size toggle */}
            <div className="hidden sm:flex items-center gap-1 bg-[#FAF8F5] p-1 rounded-md border border-[#DDD3C2] text-xs">
              <button
                onClick={() => setFontSizeClass('text-base')}
                className={`px-2 py-1 rounded cursor-pointer ${fontSizeClass === 'text-base' ? 'bg-[#1C1917] text-white' : 'text-[#57534E]'}`}
                title="ნორმალური შრიფტი"
              >
                A
              </button>
              <button
                onClick={() => setFontSizeClass('text-lg')}
                className={`px-2 py-1 rounded cursor-pointer ${fontSizeClass === 'text-lg' ? 'bg-[#1C1917] text-white' : 'text-[#57534E]'}`}
                title="საშუალო შრიფტი"
              >
                A+
              </button>
              <button
                onClick={() => setFontSizeClass('text-xl')}
                className={`px-2 py-1 rounded cursor-pointer ${fontSizeClass === 'text-xl' ? 'bg-[#1C1917] text-white' : 'text-[#57534E]'}`}
                title="დიდი შრიფტი"
              >
                A++
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-[#78716C] hover:text-[#1C1917] rounded-lg hover:bg-[#EAE2D3] transition-colors cursor-pointer"
              aria-label="დახურვა"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Reader Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 divide-y divide-[#EAE2D3]">
          {PROLOGUE_STANZAS.map((stanza, idx) => (
            <div key={stanza.num} className={`pt-6 first:pt-0 space-y-3 font-serif`}>
              <div className="flex items-center justify-between text-xs text-[#78716C]">
                <span className="font-mono text-[#881337] font-bold">სტროფი {stanza.num} · {stanza.title}</span>
                <button
                  onClick={() => handleCopyStrophe(idx, stanza.lines)}
                  className="hover:text-[#1C1917] flex items-center gap-1 transition-colors cursor-pointer"
                >
                  {copiedIndex === idx ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">დაკოპირდა</span>
                    </>
                  ) : (
                    <>
                      <Quote className="w-3.5 h-3.5" />
                      <span>კოპირება</span>
                    </>
                  )}
                </button>
              </div>

              <blockquote className={`${fontSizeClass} font-bold text-[#1C1917] leading-relaxed italic pl-4 border-l-2 border-[#881337]/50`}>
                {stanza.lines.map((line, lineIdx) => (
                  <div key={lineIdx}>{line}</div>
                ))}
              </blockquote>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#E2D8C6] bg-[#F7F3EB] flex items-center justify-between text-xs text-[#78716C]">
          <span>სულ 1667 სტროფიდან პირველი 7 საკვანძო ტაეპი</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#1C1917] hover:bg-[#292524] text-white rounded-lg transition-colors cursor-pointer"
          >
            დახურვა
          </button>
        </div>

      </div>
    </div>
  );
}
