import { useState } from 'react';
import { Volume2, BookOpen, Menu, X } from 'lucide-react';

interface HeaderProps {
  onOpenPrologue: () => void;
  onJumpToAphorisms: () => void;
}

export default function Header({ onOpenPrologue, onJumpToAphorisms }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Brand title, single element */}
        <a 
          href="#" 
          className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-[#1C1917] hover:text-[#881337] transition-colors whitespace-nowrap"
        >
          შოთა რუსთაველი
        </a>

        {/* Zone 2: 4-6 text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#44403C]">
          <a href="#biography" className="hover:text-[#881337] hover:underline underline-offset-8 transition-colors whitespace-nowrap">
            ბიოგრაფია
          </a>
          <a href="#characters" className="hover:text-[#881337] hover:underline underline-offset-8 transition-colors whitespace-nowrap">
            გმირები
          </a>
          <a href="#aphorisms" className="hover:text-[#881337] hover:underline underline-offset-8 transition-colors whitespace-nowrap">
            აფორიზმები
          </a>
          <a href="#shairi" className="hover:text-[#881337] hover:underline underline-offset-8 transition-colors whitespace-nowrap">
            შაირის მეტრიკა
          </a>
          <a href="#manuscripts" className="hover:text-[#881337] hover:underline underline-offset-8 transition-colors whitespace-nowrap">
            ხელნაწერები
          </a>
          <a href="#quiz" className="hover:text-[#881337] hover:underline underline-offset-8 transition-colors whitespace-nowrap">
            ვიქტორინა
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenPrologue}
            className="flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-medium text-[#1C1917] bg-[#F3ECE2] border border-[#DCD3C5] hover:border-[#B45309] hover:bg-[#EAE1D2] rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            <BookOpen className="w-4 h-4 text-[#881337]" />
            <span className="hidden sm:inline">პროლოგის წაკითხვა</span>
            <span className="sm:hidden">პროლოგი</span>
          </button>

          <button
            onClick={onJumpToAphorisms}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium text-white bg-[#881337] hover:bg-[#70102D] rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-xs"
          >
            <span>სიბრძნის საგანძური</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#44403C] hover:text-[#1C1917] rounded-lg"
            aria-label="მენიუს გახსნა"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E8E2D8] bg-[#FAF8F5] px-6 py-4 space-y-3">
          <a
            href="#biography"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-[#44403C] hover:text-[#881337]"
          >
            ბიოგრაფია და ეპოქა
          </a>
          <a
            href="#characters"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-[#44403C] hover:text-[#881337]"
          >
            პოემის გმირები
          </a>
          <a
            href="#aphorisms"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-[#44403C] hover:text-[#881337]"
          >
            აფორიზმები და სიბრძნე
          </a>
          <a
            href="#shairi"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-[#44403C] hover:text-[#881337]"
          >
            შაირის მეტრიკა
          </a>
          <a
            href="#manuscripts"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-[#44403C] hover:text-[#881337]"
          >
            ხელნაწერები და ისტორია
          </a>
          <a
            href="#quiz"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-[#44403C] hover:text-[#881337]"
          >
            ვიქტორინა
          </a>
        </div>
      )}
    </header>
  );
}
