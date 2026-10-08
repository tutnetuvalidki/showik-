import { useState } from 'react';
import { QUIZ_QUESTIONS, QuizQuestion } from '../data/rustaveliData';
import { Award, CheckCircle, XCircle, RotateCcw, ArrowRight, HelpCircle } from 'lucide-react';
import { playPluckNote } from '../utils/audioSynth';

export default function QuizSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ: QuizQuestion = QUIZ_QUESTIONS[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
      playPluckNote(523.25, 0.4, 0.15); // High celebratory chime
    } else {
      playPluckNote(220, 0.4, 0.1); // Lower note
    }
  };

  const handleNext = () => {
    if (currentIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsCompleted(false);
  };

  return (
    <section id="quiz" className="py-20 border-b border-[#E8E2D8] bg-[#F7F4EE]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="text-xs uppercase tracking-widest text-[#881337] font-serif font-semibold">
            ინტერაქტიული ცოდნის გამოცდა
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C1917] tracking-tight">
            რამდენად კარგად იცნობთ რუსთაველსა და „ვეფხისტყაოსანს“?
          </h2>
          <p className="text-[#57534E] font-serif text-base max-w-2xl mx-auto">
            შეამოწმეთ თქვენი ცოდნა პოემის ისტორიის, გმირების, აფორიზმებისა და ოქროს ხანის შესახებ.
          </p>
        </div>

        {/* Quiz Body */}
        <div className="p-6 sm:p-10 rounded-2xl bg-[#FAF8F5] border border-[#DDD3C2] shadow-xs">
          
          {!isCompleted ? (
            <div className="space-y-6">
              
              {/* Question Index Progress */}
              <div className="flex items-center justify-between border-b border-[#E2D8C6] pb-4 text-xs font-mono text-[#78716C]">
                <span>შეკითხვა <strong className="text-[#881337] tabular-nums">{currentIndex + 1}</strong> / {QUIZ_QUESTIONS.length}</span>
                <span>ქულა: <strong className="text-[#1C1917] tabular-nums">{score}</strong></span>
              </div>

              {/* Question Text */}
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1C1917] leading-snug">
                {currentQ.question}
              </h3>

              {/* Options */}
              <div className="space-y-3 pt-2">
                {currentQ.options.map((opt, idx) => {
                  let optionStyle = 'bg-[#FAF8F5] border-[#DDD3C2] hover:bg-[#F2ECE1] text-[#292524]';

                  if (isAnswered) {
                    if (idx === currentQ.correctIndex) {
                      optionStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold';
                    } else if (idx === selectedOption) {
                      optionStyle = 'bg-red-50 border-red-400 text-red-950';
                    } else {
                      optionStyle = 'bg-[#FAF8F5] border-[#E5DAC8] text-[#78716C] opacity-70';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswered}
                      className={`w-full text-left p-4 rounded-xl border text-sm sm:text-base font-serif transition-all flex items-center justify-between cursor-pointer ${optionStyle}`}
                    >
                      <span>{opt}</span>
                      {isAnswered && idx === currentQ.correctIndex && (
                        <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 ml-3" />
                      )}
                      {isAnswered && idx === selectedOption && idx !== currentQ.correctIndex && (
                        <XCircle className="w-5 h-5 text-red-600 shrink-0 ml-3" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback and Explanation */}
              {isAnswered && (
                <div className="p-4 rounded-xl bg-[#F6F1E8] border border-[#DDD3C2] space-y-2 mt-4">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#881337]">
                    განმარტება
                  </div>
                  <p className="text-sm font-serif text-[#44403C] leading-relaxed">
                    {currentQ.explanation}
                  </p>
                  {currentQ.relatedQuote && (
                    <blockquote className="text-xs font-serif italic text-[#881337] pt-1">
                      {currentQ.relatedQuote}
                    </blockquote>
                  )}
                  
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={handleNext}
                      className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-[#881337] hover:bg-[#70102D] rounded-lg transition-colors cursor-pointer"
                    >
                      <span>{currentIndex < QUIZ_QUESTIONS.length - 1 ? 'შემდეგი შეკითხვა' : 'შედეგის ნახვა'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

            </div>
          ) : (
            /* Result Screen */
            <div className="text-center py-6 space-y-6">
              <Award className="w-16 h-16 text-[#B45309] mx-auto" />
              
              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1917]">
                  ვიქტორინა დასრულებულია!
                </h3>
                <p className="text-lg font-serif text-[#881337] font-semibold">
                  თქვენი შედეგი: {score} / {QUIZ_QUESTIONS.length}
                </p>
                <p className="text-sm text-[#57534E] font-serif max-w-md mx-auto">
                  {score >= 7
                    ? 'შესანიშნავია! თქვენ ნამდვილი რუსთველოლოგი და ქართული სიტყვიერების მოამაგე ბრძანდებით.'
                    : score >= 5
                    ? 'ძალიან კარგი შედეგია! თქვენ კარგად ერკვევით „ვეფხისტყაოსნის“ სამყაროში.'
                    : 'მადლობა მონაწილეობისთვის! გადახედეთ პორტალის მასალებს და კვლავ სცადეთ ბედი.'}
                </p>
              </div>

              <div>
                <button
                  onClick={handleRestart}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#881337] hover:bg-[#70102D] rounded-lg transition-colors cursor-pointer shadow-xs"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>ვიქტორინის თავიდან გავლა</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
