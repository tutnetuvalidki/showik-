import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import BiographyEpoch from './components/BiographyEpoch';
import CharactersSection from './components/CharactersSection';
import AphorismsExplorer from './components/AphorismsExplorer';
import ShairiLab from './components/ShairiLab';
import ManuscriptsGallery from './components/ManuscriptsGallery';
import QuizSection from './components/QuizSection';
import Footer from './components/Footer';
import PrologueModal from './components/PrologueModal';

export default function App() {
  const [isPrologueModalOpen, setIsPrologueModalOpen] = useState(false);

  const handleOpenPrologue = () => {
    setIsPrologueModalOpen(true);
  };

  const handleClosePrologue = () => {
    setIsPrologueModalOpen(false);
  };

  const handleJumpToAphorisms = () => {
    const el = document.getElementById('aphorisms');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreCharacters = () => {
    const el = document.getElementById('characters');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] selection:bg-[#B45309]/20 selection:text-[#881337] flex flex-col">
      {/* Top Bar Navigation */}
      <Header
        onOpenPrologue={handleOpenPrologue}
        onJumpToAphorisms={handleJumpToAphorisms}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenPrologue={handleOpenPrologue}
          onExploreCharacters={handleExploreCharacters}
        />

        {/* Biography & Golden Age Era */}
        <BiographyEpoch />

        {/* Characters & Symbolism */}
        <CharactersSection />

        {/* Aphorisms & Wisdom Explorer */}
        <AphorismsExplorer />

        {/* 16-Syllable Shairi Laboratory */}
        <ShairiLab />

        {/* Manuscripts, History & Global Translations */}
        <ManuscriptsGallery />

        {/* Interactive Knowledge Quiz */}
        <QuizSection />
      </main>

      {/* Editorial Footer */}
      <Footer />

      {/* Prologue Reading Modal */}
      <PrologueModal
        isOpen={isPrologueModalOpen}
        onClose={handleClosePrologue}
      />
    </div>
  );
}
