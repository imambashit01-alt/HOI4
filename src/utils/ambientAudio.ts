// Web Audio API generator for authentic WW2-era military radio atmospheric sounds
// Generates vintage radio receiver static, shortwave carrier hum, and field telegraph Morse pulses.

export type AmbientSoundMode = 'bunker' | 'radio_static' | 'telegraph';

class AmbientAudioManager {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private currentMode: AmbientSoundMode = 'bunker';
  private masterGain: GainNode | null = null;
  private noiseSource: AudioBufferSourceNode | null = null;
  private humOsc: OscillatorNode | null = null;
  private telegraphTimer: number | null = null;
  private volume: number = 0.25; // Default subtle atmospheric volume
  private listeners: Set<(playing: boolean, mode: AmbientSoundMode, volume: number) => void> = new Set();

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public subscribe(fn: (playing: boolean, mode: AmbientSoundMode, volume: number) => void) {
    this.listeners.add(fn);
    fn(this.isPlaying, this.currentMode, this.volume);
    return () => {
      this.listeners.delete(fn);
    };
  }

  private notify() {
    this.listeners.forEach(fn => fn(this.isPlaying, this.currentMode, this.volume));
  }

  public getStatus() {
    return {
      isPlaying: this.isPlaying,
      mode: this.currentMode,
      volume: this.volume
    };
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
    this.notify();
  }

  public setMode(mode: AmbientSoundMode) {
    this.currentMode = mode;
    if (this.isPlaying) {
      this.stop();
      this.start(mode);
    } else {
      this.notify();
    }
  }

  public toggle(preferredMode?: AmbientSoundMode) {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.start(preferredMode || this.currentMode);
    }
  }

  public start(mode: AmbientSoundMode = this.currentMode) {
    try {
      this.initContext();
      if (!this.ctx) return;

      this.currentMode = mode;
      this.stopAudioNodes();

      // Master Gain
      const master = this.ctx.createGain();
      master.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      master.connect(this.ctx.destination);
      this.masterGain = master;

      if (mode === 'radio_static' || mode === 'bunker') {
        this.startRadioStatic(master, mode === 'bunker' ? 0.6 : 0.9);
      }

      if (mode === 'telegraph' || mode === 'bunker') {
        this.startTelegraphScheduler(master, mode === 'bunker' ? 0.35 : 0.7);
      }

      this.isPlaying = true;
      this.notify();
    } catch (err) {
      console.warn('Unable to start WW2 ambient sound:', err);
    }
  }

  public stop() {
    this.stopAudioNodes();
    this.isPlaying = false;
    this.notify();
  }

  private stopAudioNodes() {
    if (this.telegraphTimer) {
      window.clearTimeout(this.telegraphTimer);
      this.telegraphTimer = null;
    }
    if (this.noiseSource) {
      try {
        this.noiseSource.stop();
        this.noiseSource.disconnect();
      } catch {
        // ignore already stopped
      }
      this.noiseSource = null;
    }
    if (this.humOsc) {
      try {
        this.humOsc.stop();
        this.humOsc.disconnect();
      } catch {
        // ignore
      }
      this.humOsc = null;
    }
    if (this.masterGain) {
      this.masterGain.disconnect();
      this.masterGain = null;
    }
  }

  private startRadioStatic(destination: GainNode, gainMultiplier: number) {
    if (!this.ctx) return;

    // 1. Generate 4 seconds of white noise buffer
    const bufferSize = this.ctx.sampleRate * 4;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * 0.4;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // 2. Bandpass filter to simulate 1930-40s shortwave radio tuner
    const bandpass = this.ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.setValueAtTime(1400, this.ctx.currentTime);
    bandpass.Q.setValueAtTime(1.8, this.ctx.currentTime);

    // 3. High shelf filter to soften harsh treble
    const highShelf = this.ctx.createBiquadFilter();
    highShelf.type = 'highshelf';
    highShelf.frequency.setValueAtTime(3200, this.ctx.currentTime);
    highShelf.gain.setValueAtTime(-14, this.ctx.currentTime);

    // 4. Subtle volume gain node for static
    const staticGain = this.ctx.createGain();
    staticGain.gain.setValueAtTime(0.18 * gainMultiplier, this.ctx.currentTime);

    whiteNoise.connect(bandpass);
    bandpass.connect(highShelf);
    highShelf.connect(staticGain);
    staticGain.connect(destination);

    whiteNoise.start();
    this.noiseSource = whiteNoise;

    // 5. Add 55Hz tube hum (faint vintage electric receiver hum)
    const hum = this.ctx.createOscillator();
    hum.type = 'sine';
    hum.frequency.setValueAtTime(55, this.ctx.currentTime);

    const humGain = this.ctx.createGain();
    humGain.gain.setValueAtTime(0.04 * gainMultiplier, this.ctx.currentTime);

    hum.connect(humGain);
    humGain.connect(destination);
    hum.start();
    this.humOsc = hum;
  }

  // Plays a single Morse code tone pulse
  private playMorseBeep(destination: GainNode, durationMs: number, freq: number = 760, volumeMult: number = 0.5) {
    if (!this.ctx || !this.isPlaying) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      const now = this.ctx.currentTime;
      const durationSec = durationMs / 1000;

      // Soft envelope to avoid harsh clicking on sine wave start/stop
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.15 * volumeMult, now + 0.008);
      gain.gain.setValueAtTime(0.15 * volumeMult, now + durationSec - 0.008);
      gain.gain.linearRampToValueAtTime(0.0001, now + durationSec);

      osc.connect(gain);
      gain.connect(destination);

      osc.start(now);
      osc.stop(now + durationSec + 0.01);
    } catch {
      // Audio node error handling
    }
  }

  // Schedules periodic realistic WW2 field telegraph sequences
  private startTelegraphScheduler(destination: GainNode, volumeMult: number) {
    // Sequences of dot (80ms), dash (220ms), gap (80ms), letter gap (240ms)
    const sequences = [
      // HQ callsign "... --- ..." (SOS)
      [80, 80, 80, 240, 220, 220, 220, 240, 80, 80, 80],
      // OK "-.- .-" (KA)
      [220, 80, 220, 240, 80, 220],
      // "--- .-. -.. . .-." (ORDER)
      [220, 220, 220, 240, 80, 220, 80, 240, 220, 80, 80],
      // Coordinates "... .--. . .- .-." (SPEAR)
      [80, 80, 80, 240, 80, 220, 220, 80, 240, 80, 240, 80, 220, 80]
    ];

    const playSequence = () => {
      if (!this.isPlaying || !this.ctx) return;

      const seq = sequences[Math.floor(Math.random() * sequences.length)];
      const pitch = 740 + (Math.random() * 60 - 30); // slight variance in telegraph tone
      let cumulativeTime = 0;

      seq.forEach((duration) => {
        setTimeout(() => {
          if (this.isPlaying && this.ctx) {
            this.playMorseBeep(destination, duration, pitch, volumeMult);
          }
        }, cumulativeTime);
        cumulativeTime += duration + 70; // duration + element spacing
      });

      // Schedule next sequence with realistic human operator pause (2.5 to 6 seconds)
      const nextDelay = cumulativeTime + 2500 + Math.random() * 3500;
      this.telegraphTimer = window.setTimeout(playSequence, nextDelay);
    };

    // First sequence starts after a short 1-second pause
    this.telegraphTimer = window.setTimeout(playSequence, 1200);
  }
}

export const ambientAudio = new AmbientAudioManager();
