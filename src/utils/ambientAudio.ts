// Web Audio API Procedural Synthesizer for Authentic WWII Command Center Environments
// Simulates underground bunkers, cipher rooms, naval command posts, and frontline headquarters.

export type AmbientSoundMode =
  | 'bunker'
  | 'signals_room'
  | 'naval_admiralty'
  | 'frontline_hq'
  | 'churchill_war_room'
  | 'radio_static'
  | 'telegraph';

export interface AmbientMixerLevels {
  master: number;      // 0.0 - 1.0
  radio: number;       // 0.0 - 1.0 (static, carrier, heterodyne)
  telegraph: number;   // 0.0 - 1.0 (Morse code traffic)
  artillery: number;   // 0.0 - 1.0 (distant bombardment)
  ambience: number;    // 0.0 - 1.0 (generator, fans, clocks, hull hum)
  effects: number;     // 0.0 - 1.0 (telephones, typewriters, sonar pings)
}

export interface SoundEnvironmentPreset {
  id: AmbientSoundMode;
  name: string;
  subtitle: string;
  icon: string;
  description: string;
  levels: AmbientMixerLevels;
}

export const SOUND_PRESETS: Record<AmbientSoundMode, SoundEnvironmentPreset> = {
  bunker: {
    id: 'bunker',
    name: 'Bunker Komando Bawah Tanah',
    subtitle: 'Underground Command Bunker',
    icon: '🏛️',
    description: 'Dengung generator listrik 50Hz, ventilasi udara beton tebal, gemuruh artileri jarak jauh, dan kresek radio perwira staf.',
    levels: { master: 0.35, radio: 0.45, telegraph: 0.4, artillery: 0.6, ambience: 0.65, effects: 0.4 }
  },
  signals_room: {
    id: 'signals_room',
    name: 'Ruang Sandi & Telegraf Enigma',
    subtitle: 'Signals & Cipher Intelligence Room',
    icon: '📻',
    description: 'Sinyal morse frekuensi tinggi padat, siulan gelombang radio heterodyne, kresek tabung vakum, dan ketukan mesin teleprinter.',
    levels: { master: 0.35, radio: 0.7, telegraph: 0.8, artillery: 0.15, ambience: 0.35, effects: 0.6 }
  },
  naval_admiralty: {
    id: 'naval_admiralty',
    name: 'Pusat Komando Maritim & Sonar',
    subtitle: 'Naval Operations & ASDIC Post',
    icon: '⚓',
    description: 'Dengung lambung kapal baja berat, gema pantulan ping sonar ASDIC bawah air, radio maritim gelombang pendek, dan gemercik ombak.',
    levels: { master: 0.35, radio: 0.5, telegraph: 0.45, artillery: 0.2, ambience: 0.75, effects: 0.7 }
  },
  frontline_hq: {
    id: 'frontline_hq',
    name: 'Pos Komando Garis Depan',
    subtitle: 'Frontline Tactical Field HQ',
    icon: '🪖',
    description: 'Dentuman artileri medan 105mm/150mm intens, desisan radio walkie-talkie taktis lapangan, hujan di tenda, dan ketukan telegraf darurat.',
    levels: { master: 0.4, radio: 0.6, telegraph: 0.55, artillery: 0.85, ambience: 0.45, effects: 0.5 }
  },
  churchill_war_room: {
    id: 'churchill_war_room',
    name: 'Ruang Meja Peta Kabinet Perang',
    subtitle: 'Churchill Cabinet War Rooms',
    icon: '🗺️',
    description: 'Detak jam mekanis dinding kuno, dering bel telepon rotary magneto staf umum, ketukan mesin tik telegram, dan transmisi radio BBC.',
    levels: { master: 0.3, radio: 0.4, telegraph: 0.3, artillery: 0.3, ambience: 0.55, effects: 0.65 }
  },
  radio_static: {
    id: 'radio_static',
    name: 'Radio Gelombang Pendek Murni',
    subtitle: 'Pure Shortwave Radio Static',
    icon: '📡',
    description: 'Atmosfer kresek murni penerima radio tabung 1930-an tanpa efek latar belakang lainnya.',
    levels: { master: 0.35, radio: 0.9, telegraph: 0.0, artillery: 0.0, ambience: 0.15, effects: 0.0 }
  },
  telegraph: {
    id: 'telegraph',
    name: 'Stasiun Telegraf Lapangan Murni',
    subtitle: 'Field Telegraph Station',
    icon: '⚡',
    description: 'Transmisi ketukan kode morse berkelanjutan dengan nada murni telegraf lapangan militer.',
    levels: { master: 0.35, radio: 0.2, telegraph: 0.9, artillery: 0.0, ambience: 0.1, effects: 0.0 }
  }
};

export interface AudioStatus {
  isPlaying: boolean;
  mode: AmbientSoundMode;
  mixer: AmbientMixerLevels;
  currentMorseText: string;
}

type AudioListener = (status: AudioStatus) => void;

class AmbientAudioManager {
  private ctx: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private isPlaying: boolean = false;
  private currentMode: AmbientSoundMode = 'bunker';
  private currentMorseText: string = '';

  // Mixer Gain Nodes
  private masterGain: GainNode | null = null;
  private radioGain: GainNode | null = null;
  private telegraphGain: GainNode | null = null;
  private artilleryGain: GainNode | null = null;
  private ambienceGain: GainNode | null = null;
  private effectsGain: GainNode | null = null;

  // Active audio generators / sources
  private staticNoiseSource: AudioBufferSourceNode | null = null;
  private tubeHumOsc: OscillatorNode | null = null;
  private generatorOsc1: OscillatorNode | null = null;
  private generatorOsc2: OscillatorNode | null = null;
  private heterodyneOsc: OscillatorNode | null = null;
  private heterodyneLfo: OscillatorNode | null = null;

  // Timers
  private telegraphTimer: number | null = null;
  private artilleryTimer: number | null = null;
  private clockTimer: number | null = null;
  private typewriterTimer: number | null = null;
  private sonarTimer: number | null = null;
  private squelchTimer: number | null = null;

  // Current volume levels
  private levels: AmbientMixerLevels = {
    master: 0.35,
    radio: 0.5,
    telegraph: 0.45,
    artillery: 0.6,
    ambience: 0.65,
    effects: 0.5
  };

  private listeners: Set<AudioListener> = new Set();

  constructor() {
    // Load persisted volume if available
    try {
      const saved = localStorage.getItem('hoi4_war_room_ambient_mixer');
      if (saved) {
        this.levels = { ...this.levels, ...JSON.parse(saved) };
      }
      const savedMode = localStorage.getItem('hoi4_war_room_ambient_mode');
      if (savedMode && (savedMode in SOUND_PRESETS)) {
        this.currentMode = savedMode as AmbientSoundMode;
      }
    } catch {
      // Ignore local storage error
    }
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public subscribe(fn: AudioListener) {
    this.listeners.add(fn);
    fn(this.getStatus());
    return () => {
      this.listeners.delete(fn);
    };
  }

  private notify() {
    const status = this.getStatus();
    this.listeners.forEach(fn => fn(status));
  }

  public getStatus(): AudioStatus {
    return {
      isPlaying: this.isPlaying,
      mode: this.currentMode,
      mixer: { ...this.levels },
      currentMorseText: this.currentMorseText
    };
  }

  public getAnalyser(): AnalyserNode | null {
    return this.analyser;
  }

  public setMasterVolume(vol: number) {
    this.setMixerLevel('master', vol);
  }

  public setMixerLevel(channel: keyof AmbientMixerLevels, val: number) {
    const clamped = Math.max(0, Math.min(1, val));
    this.levels[channel] = clamped;

    if (this.ctx) {
      const now = this.ctx.currentTime;
      switch (channel) {
        case 'master':
          if (this.masterGain) this.masterGain.gain.setTargetAtTime(clamped, now, 0.05);
          break;
        case 'radio':
          if (this.radioGain) this.radioGain.gain.setTargetAtTime(clamped, now, 0.05);
          break;
        case 'telegraph':
          if (this.telegraphGain) this.telegraphGain.gain.setTargetAtTime(clamped, now, 0.05);
          break;
        case 'artillery':
          if (this.artilleryGain) this.artilleryGain.gain.setTargetAtTime(clamped, now, 0.05);
          break;
        case 'ambience':
          if (this.ambienceGain) this.ambienceGain.gain.setTargetAtTime(clamped, now, 0.05);
          break;
        case 'effects':
          if (this.effectsGain) this.effectsGain.gain.setTargetAtTime(clamped, now, 0.05);
          break;
      }
    }

    try {
      localStorage.setItem('hoi4_war_room_ambient_mixer', JSON.stringify(this.levels));
    } catch {
      // Ignore
    }

    this.notify();
  }

  public setMode(mode: AmbientSoundMode) {
    this.currentMode = mode;
    const preset = SOUND_PRESETS[mode];
    if (preset) {
      this.levels = { ...preset.levels };
    }

    try {
      localStorage.setItem('hoi4_war_room_ambient_mode', mode);
      localStorage.setItem('hoi4_war_room_ambient_mixer', JSON.stringify(this.levels));
    } catch {
      // Ignore
    }

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

      const now = this.ctx.currentTime;

      // 1. Analyser Node for visualizer oscilloscope
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 512;
      this.analyser.smoothingTimeConstant = 0.8;

      // 2. Master Gain Node
      const master = this.ctx.createGain();
      master.gain.setValueAtTime(this.levels.master, now);
      master.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
      this.masterGain = master;

      // 3. Sub-mixer Channel Gain Nodes
      const radioG = this.ctx.createGain();
      radioG.gain.setValueAtTime(this.levels.radio, now);
      radioG.connect(master);
      this.radioGain = radioG;

      const telegraphG = this.ctx.createGain();
      telegraphG.gain.setValueAtTime(this.levels.telegraph, now);
      telegraphG.connect(master);
      this.telegraphGain = telegraphG;

      const artilleryG = this.ctx.createGain();
      artilleryG.gain.setValueAtTime(this.levels.artillery, now);
      artilleryG.connect(master);
      this.artilleryGain = artilleryG;

      const ambienceG = this.ctx.createGain();
      ambienceG.gain.setValueAtTime(this.levels.ambience, now);
      ambienceG.connect(master);
      this.ambienceGain = ambienceG;

      const effectsG = this.ctx.createGain();
      effectsG.gain.setValueAtTime(this.levels.effects, now);
      effectsG.connect(master);
      this.effectsGain = effectsG;

      // 4. Start sound generators based on mode
      this.startRadioStatic(radioG);
      this.startAmbienceHum(ambienceG, mode);

      if (this.levels.telegraph > 0) {
        this.startTelegraphLoop(telegraphG);
      }

      if (this.levels.artillery > 0 && mode !== 'radio_static' && mode !== 'telegraph') {
        this.startArtilleryLoop(artilleryG);
      }

      if (mode === 'churchill_war_room') {
        this.startClockTicker(ambienceG);
      }

      if (mode === 'signals_room' || mode === 'churchill_war_room') {
        this.startTypewriterLoop(effectsG);
      }

      if (mode === 'naval_admiralty') {
        this.startSonarLoop(effectsG);
      }

      if (mode === 'frontline_hq' || mode === 'bunker') {
        this.startSquelchLoop(effectsG);
      }

      this.isPlaying = true;
      this.notify();
    } catch (err) {
      console.warn('Unable to start WW2 War Room audio:', err);
    }
  }

  public stop() {
    this.stopAudioNodes();
    this.isPlaying = false;
    this.currentMorseText = '';
    this.notify();
  }

  private stopAudioNodes() {
    // Clear all interval timers
    if (this.telegraphTimer) { window.clearTimeout(this.telegraphTimer); this.telegraphTimer = null; }
    if (this.artilleryTimer) { window.clearTimeout(this.artilleryTimer); this.artilleryTimer = null; }
    if (this.clockTimer) { window.clearInterval(this.clockTimer); this.clockTimer = null; }
    if (this.typewriterTimer) { window.clearTimeout(this.typewriterTimer); this.typewriterTimer = null; }
    if (this.sonarTimer) { window.clearTimeout(this.sonarTimer); this.sonarTimer = null; }
    if (this.squelchTimer) { window.clearTimeout(this.squelchTimer); this.squelchTimer = null; }

    const stopNode = (node: AudioBufferSourceNode | OscillatorNode | null) => {
      if (!node) return;
      try {
        node.stop();
        node.disconnect();
      } catch {
        // Already stopped
      }
    };

    stopNode(this.staticNoiseSource); this.staticNoiseSource = null;
    stopNode(this.tubeHumOsc); this.tubeHumOsc = null;
    stopNode(this.generatorOsc1); this.generatorOsc1 = null;
    stopNode(this.generatorOsc2); this.generatorOsc2 = null;
    stopNode(this.heterodyneOsc); this.heterodyneOsc = null;
    stopNode(this.heterodyneLfo); this.heterodyneLfo = null;

    if (this.masterGain) {
      try { this.masterGain.disconnect(); } catch { /* ignore */ }
      this.masterGain = null;
    }
    this.radioGain = null;
    this.telegraphGain = null;
    this.artilleryGain = null;
    this.ambienceGain = null;
    this.effectsGain = null;
  }

  // ==========================================
  // PROCEDURAL SOUND GENERATORS
  // ==========================================

  // 1. Vintage Radio Static & Atmospheric Crackle
  private startRadioStatic(destination: GainNode) {
    if (!this.ctx) return;

    const sampleRate = this.ctx.sampleRate;
    const duration = 4; // 4 seconds loop
    const bufferSize = sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, sampleRate);
    const data = buffer.getChannelData(0);

    // Generate textured vintage static with occasional soft crackle bursts
    let last = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = (Math.random() * 2 - 1) * 0.25;
      // Pink-ish filtering
      last = (last * 0.92) + (white * 0.08);
      // Random crackle pop impulse (dust on tube needle)
      const pop = Math.random() < 0.0006 ? (Math.random() * 2 - 1) * 0.5 : 0;
      data[i] = last + pop;
    }

    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    // Vintage radio bandpass filter (simulating 1940s 1200Hz tuner band)
    const bandpass = this.ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.setValueAtTime(1350, this.ctx.currentTime);
    bandpass.Q.setValueAtTime(1.9, this.ctx.currentTime);

    // Warm high-shelf rolloff
    const highshelf = this.ctx.createBiquadFilter();
    highshelf.type = 'highshelf';
    highshelf.frequency.setValueAtTime(3400, this.ctx.currentTime);
    highshelf.gain.setValueAtTime(-12, this.ctx.currentTime);

    const staticGain = this.ctx.createGain();
    staticGain.gain.setValueAtTime(0.35, this.ctx.currentTime);

    source.connect(bandpass);
    bandpass.connect(highshelf);
    highshelf.connect(staticGain);
    staticGain.connect(destination);

    source.start();
    this.staticNoiseSource = source;

    // Faint 50Hz vacuum tube electric transformer hum
    const hum = this.ctx.createOscillator();
    hum.type = 'sine';
    hum.frequency.setValueAtTime(50, this.ctx.currentTime);

    const humGain = this.ctx.createGain();
    humGain.gain.setValueAtTime(0.045, this.ctx.currentTime);

    hum.connect(humGain);
    humGain.connect(destination);
    hum.start();
    this.tubeHumOsc = hum;

    // Heterodyne carrier whistle (slowly drifting frequency)
    if (this.currentMode === 'signals_room' || this.currentMode === 'radio_static') {
      const whistle = this.ctx.createOscillator();
      whistle.type = 'sine';
      whistle.frequency.setValueAtTime(920, this.ctx.currentTime);

      const whistleGain = this.ctx.createGain();
      whistleGain.gain.setValueAtTime(0.015, this.ctx.currentTime);

      // Subtle LFO drift
      const lfo = this.ctx.createOscillator();
      lfo.frequency.setValueAtTime(0.15, this.ctx.currentTime); // 0.15Hz drift
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.setValueAtTime(35, this.ctx.currentTime); // +/- 35Hz modulation

      lfo.connect(lfoGain);
      lfoGain.connect(whistle.frequency);

      whistle.connect(whistleGain);
      whistleGain.connect(destination);

      whistle.start();
      lfo.start();
      this.heterodyneOsc = whistle;
      this.heterodyneLfo = lfo;
    }
  }

  // 2. Background Hum & Ventilation Drone
  private startAmbienceHum(destination: GainNode, mode: AmbientSoundMode) {
    if (!this.ctx) return;

    const baseFreq = mode === 'naval_admiralty' ? 38 : mode === 'bunker' ? 48 : 55;

    // Oscillator 1: Fundamental generator hum
    const osc1 = this.ctx.createOscillator();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(baseFreq, this.ctx.currentTime);

    // Oscillator 2: Sub-harmonic throb
    const osc2 = this.ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(baseFreq * 2.02, this.ctx.currentTime);

    const lowpass = this.ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.setValueAtTime(160, this.ctx.currentTime);

    const droneGain = this.ctx.createGain();
    droneGain.gain.setValueAtTime(0.12, this.ctx.currentTime);

    osc1.connect(lowpass);
    osc2.connect(lowpass);
    lowpass.connect(droneGain);
    droneGain.connect(destination);

    osc1.start();
    osc2.start();
    this.generatorOsc1 = osc1;
    this.generatorOsc2 = osc2;
  }

  // 3. Realistic Morse Code Telegraph Loop
  private startTelegraphLoop(destination: GainNode) {
    const messages = [
      { text: 'DE HQ ORDERS: OPERATION BLITZKRIEG GREEN', code: '-.. . / .... --.- / --- .-. -.. . .-. ...' },
      { text: 'GRID 44 RECON REPORT: ENEMY FLEET APPROACHING', code: '--. .-. .. -.. / ....- ....-' },
      { text: 'SOS EMERGENCY SQUAWK: ALLIED AIR INTERCEPT', code: '... --- ...' },
      { text: 'ENIGMA ENCRYPT: 884 109 BLETCHLEY INTERCEPT', code: '--- -.- / .--. .- -. --.. . .-.' },
      { text: 'COMMAND TRANSMISSION: HOLD LINE ON DNIEPER', code: '.... --- .-.. -.. / .-.. .. -. .' },
      { text: 'URGENT: SUPPLY CONVOY REACHED PORTSMOUTH', code: '... ..- .--. .--. .-.. -.--' }
    ];

    const playNext = () => {
      if (!this.isPlaying || !this.ctx) return;

      const item = messages[Math.floor(Math.random() * messages.length)];
      this.currentMorseText = item.text;
      this.notify();

      // Convert morse dots and dashes to tone durations
      const dotMs = 75;
      const dashMs = 210;
      const elementGapMs = 60;
      const letterGapMs = 180;
      const wordGapMs = 360;

      let timeOffset = 0;
      const pitch = 750 + (Math.random() * 50 - 25);

      for (let i = 0; i < item.code.length; i++) {
        const char = item.code[i];
        if (char === '.') {
          this.scheduleBeep(destination, timeOffset, dotMs, pitch);
          timeOffset += dotMs + elementGapMs;
        } else if (char === '-') {
          this.scheduleBeep(destination, timeOffset, dashMs, pitch);
          timeOffset += dashMs + elementGapMs;
        } else if (char === ' ') {
          timeOffset += letterGapMs;
        } else if (char === '/') {
          timeOffset += wordGapMs;
        }
      }

      // Clear text shortly after message concludes
      window.setTimeout(() => {
        if (this.currentMorseText === item.text) {
          this.currentMorseText = '';
          this.notify();
        }
      }, timeOffset + 800);

      // Realistic operator pause between transmissions (4.5s to 9s)
      const nextDelay = timeOffset + 4500 + Math.random() * 4500;
      this.telegraphTimer = window.setTimeout(playNext, nextDelay);
    };

    this.telegraphTimer = window.setTimeout(playNext, 1500);
  }

  private scheduleBeep(destination: AudioNode, delayMs: number, durationMs: number, freq: number) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime + (delayMs / 1000);
    const durSec = durationMs / 1000;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      // Soft envelope to prevent transient click
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.22, now + 0.008);
      gain.gain.setValueAtTime(0.22, now + durSec - 0.008);
      gain.gain.linearRampToValueAtTime(0.0001, now + durSec);

      osc.connect(gain);
      gain.connect(destination);

      osc.start(now);
      osc.stop(now + durSec + 0.02);
    } catch {
      // Audio node scheduling exception safeguard
    }
  }

  // 4. Distant Artillery & Bombardment Barrage Loop
  private startArtilleryLoop(destination: GainNode) {
    const playArtillerySalvo = () => {
      if (!this.isPlaying || !this.ctx) return;

      this.triggerArtillerySalvo(destination);

      // Interval between distant artillery rumbles (7 to 15 seconds)
      const nextDelay = 7000 + Math.random() * 8000;
      this.artilleryTimer = window.setTimeout(playArtillerySalvo, nextDelay);
    };

    this.artilleryTimer = window.setTimeout(playArtillerySalvo, 3000);
  }

  // 5. Grandfather Clock Mechanical Tick (Churchill Room)
  private startClockTicker(destination: GainNode) {
    let tick = true;
    this.clockTimer = window.setInterval(() => {
      if (!this.isPlaying || !this.ctx) return;
      this.playClockTick(destination, tick);
      tick = !tick;
    }, 1000);
  }

  private playClockTick(destination: GainNode, isTick: boolean) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(isTick ? 460 : 380, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.06, now + 0.003);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

    osc.connect(gain);
    gain.connect(destination);

    osc.start(now);
    osc.stop(now + 0.05);
  }

  // 6. Mechanical Typewriter / Teleprinter Loop
  private startTypewriterLoop(destination: GainNode) {
    const burst = () => {
      if (!this.isPlaying || !this.ctx) return;
      this.triggerTypewriterBurst(destination);

      const nextDelay = 6000 + Math.random() * 10000;
      this.typewriterTimer = window.setTimeout(burst, nextDelay);
    };
    this.typewriterTimer = window.setTimeout(burst, 4000);
  }

  // 7. Sonar Ping Loop (Naval Admiralty)
  private startSonarLoop(destination: GainNode) {
    const ping = () => {
      if (!this.isPlaying || !this.ctx) return;
      this.triggerSonarPing(destination);

      const nextDelay = 9000 + Math.random() * 6000;
      this.sonarTimer = window.setTimeout(ping, nextDelay);
    };
    this.sonarTimer = window.setTimeout(ping, 2500);
  }

  // 8. Walkie-Talkie Push-to-Talk Squelch Loop
  private startSquelchLoop(destination: GainNode) {
    const squelch = () => {
      if (!this.isPlaying || !this.ctx) return;
      this.triggerRadioSquelch(destination);

      const nextDelay = 12000 + Math.random() * 15000;
      this.squelchTimer = window.setTimeout(squelch, nextDelay);
    };
    this.squelchTimer = window.setTimeout(squelch, 8000);
  }

  // ==========================================
  // MANUAL TACTICAL SOUND EFFECT TRIGGERS
  // ==========================================

  // Trigger: Distant Artillery Thud & Rumble
  public triggerArtillerySalvo(customDest?: AudioNode) {
    this.initContext();
    if (!this.ctx) return;
    const destination = customDest || this.artilleryGain || this.masterGain || this.ctx.destination;

    const now = this.ctx.currentTime;
    const dur = 2.8 + Math.random() * 1.2;

    // Filtered noise explosion burst
    const sampleRate = this.ctx.sampleRate;
    const bufferSize = sampleRate * Math.floor(dur);
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, sampleRate);
    const output = noiseBuffer.getChannelData(0);

    let lastVal = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = (Math.random() * 2 - 1);
      lastVal = (lastVal * 0.95) + (white * 0.05); // Brown noise for deep rumble
      output[i] = lastVal;
    }

    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    // Resonant lowpass filter to simulate bunker concrete damping
    const lowpass = this.ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.setValueAtTime(65 + Math.random() * 25, now);
    lowpass.Q.setValueAtTime(3.2, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.45, now + 0.06); // Fast impact attack
    gain.gain.exponentialRampToValueAtTime(0.0001, now + dur); // Long reverberation decay

    noiseSource.connect(lowpass);
    lowpass.connect(gain);
    gain.connect(destination);

    noiseSource.start(now);
    noiseSource.stop(now + dur + 0.1);
  }

  // Trigger: Field Telephone Magneto Bell Ring
  public triggerFieldPhone() {
    this.initContext();
    if (!this.ctx) return;
    const destination = this.effectsGain || this.masterGain || this.ctx.destination;

    // Ring-ring cadence (Ring 1: 0s-0.5s, Pause: 0.5s-0.7s, Ring 2: 0.7s-1.2s)
    const playRingBurst = (startOffsetSec: number, durationSec: number) => {
      if (!this.ctx) return;
      const start = this.ctx.currentTime + startOffsetSec;

      // Vintage telephone bell dual gongs: 440Hz + 480Hz modulated at 20Hz hammer
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const bellGain = this.ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(440, start);
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(480, start);

      // Tremolo hammer modulation
      const hammer = this.ctx.createOscillator();
      hammer.frequency.setValueAtTime(20, start); // 20Hz striker
      const hammerGain = this.ctx.createGain();
      hammerGain.gain.setValueAtTime(0.12, start);

      hammer.connect(hammerGain);
      hammerGain.connect(bellGain.gain);

      bellGain.gain.setValueAtTime(0.15, start);
      bellGain.gain.setValueAtTime(0.15, start + durationSec - 0.05);
      bellGain.gain.linearRampToValueAtTime(0.0001, start + durationSec);

      osc1.connect(bellGain);
      osc2.connect(bellGain);
      bellGain.connect(destination);

      osc1.start(start);
      osc2.start(start);
      hammer.start(start);

      osc1.stop(start + durationSec + 0.05);
      osc2.stop(start + durationSec + 0.05);
      hammer.stop(start + durationSec + 0.05);
    };

    playRingBurst(0.0, 0.45);
    playRingBurst(0.6, 0.45);
  }

  // Trigger: ASDIC / Sonar Ping (Maritime Post)
  public triggerSonarPing(customDest?: AudioNode) {
    this.initContext();
    if (!this.ctx) return;
    const destination = customDest || this.effectsGain || this.masterGain || this.ctx.destination;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sine';
    // Gentle downward pitch sweep (1480Hz down to 1420Hz)
    osc.frequency.setValueAtTime(1480, now);
    osc.frequency.exponentialRampToValueAtTime(1420, now + 1.8);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1450, now);
    filter.Q.setValueAtTime(12, now); // High Q metallic underwater ringing

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.35, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(destination);

    osc.start(now);
    osc.stop(now + 2.3);
  }

  // Trigger: Walkie-Talkie Radio Squelch Burst
  public triggerRadioSquelch(customDest?: AudioNode) {
    this.initContext();
    if (!this.ctx) return;
    const destination = customDest || this.effectsGain || this.masterGain || this.ctx.destination;

    const now = this.ctx.currentTime;
    const dur = 0.16; // 160ms burst

    const bufferSize = this.ctx.sampleRate * dur;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.4;
    }

    const source = this.ctx.createBufferSource();
    source.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1800, now);
    filter.Q.setValueAtTime(2.5, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.35, now + 0.01);
    gain.gain.setValueAtTime(0.35, now + dur - 0.02);
    gain.gain.linearRampToValueAtTime(0.0001, now + dur);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(destination);

    source.start(now);
  }

  // Trigger: Fast Typewriter Telegram Burst
  public triggerTypewriterBurst(customDest?: AudioNode) {
    this.initContext();
    if (!this.ctx) return;
    const destination = customDest || this.effectsGain || this.masterGain || this.ctx.destination;

    const numKeys = 5 + Math.floor(Math.random() * 7);
    let timeOffset = 0;

    for (let i = 0; i < numKeys; i++) {
      const strikeDelay = timeOffset;
      setTimeout(() => {
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1200 + Math.random() * 400, now);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(0.08, now + 0.002);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.028);

        osc.connect(gain);
        gain.connect(destination);

        osc.start(now);
        osc.stop(now + 0.03);
      }, strikeDelay);

      timeOffset += 90 + Math.random() * 110;
    }
  }

  // Trigger: Emergency Tactical Morse Broadcast
  public triggerMorseBroadcast(text: string = 'SOS DEFCON 1') {
    this.initContext();
    if (!this.ctx) return;
    const destination = this.telegraphGain || this.masterGain || this.ctx.destination;

    this.currentMorseText = text;
    this.notify();

    const dotMs = 70;
    const dashMs = 210;
    const gapMs = 65;

    // Simple SOS code
    const pattern = [dotMs, dotMs, dotMs, 180, dashMs, dashMs, dashMs, 180, dotMs, dotMs, dotMs];
    let offset = 0;

    pattern.forEach((d) => {
      this.scheduleBeep(destination, offset, d, 840);
      offset += d + gapMs;
    });

    setTimeout(() => {
      this.currentMorseText = '';
      this.notify();
    }, offset + 600);
  }
}

export const ambientAudio = new AmbientAudioManager();
