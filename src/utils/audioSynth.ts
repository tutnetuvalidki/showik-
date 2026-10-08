/**
 * Synthesizes traditional Georgian folk chonguri / panduri acoustic harmonics
 * using the Web Audio API for poetic rhythm recitation.
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playPluckNote(frequency: number = 330, duration: number = 1.2, volume: number = 0.15) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const subOsc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    // Warm string tone
    osc.type = 'triangle';
    subOsc.type = 'sine';

    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    subOsc.frequency.setValueAtTime(frequency * 2, ctx.currentTime);

    // Warm resonant acoustic filter
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(350, ctx.currentTime + duration);

    // Pluck decay envelope
    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(filter);
    subOsc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    subOsc.start();
    osc.stop(ctx.currentTime + duration);
    subOsc.stop(ctx.currentTime + duration);
  } catch {
    // Graceful fallback if audio is restricted
  }
}

// 16-beat shairi melodic rhythm
const SHAIRI_CHORDS = [220, 261.6, 293.7, 329.6, 392.0, 440];

export function playShairiCadence(step: number = 0) {
  const note = SHAIRI_CHORDS[step % SHAIRI_CHORDS.length];
  playPluckNote(note, 0.8, 0.12);
}
