import React, { useState, useMemo } from 'react';
import {
  Eye, Shield, Skull, FileText, Sparkles, AlertTriangle,
  CheckCircle2, Swords, Key, Lock, Radio, Sliders, Play,
  HelpCircle, Monitor, Laptop, Terminal, ExternalLink, RefreshCw,
  Users, Globe, Search, BookOpen, Award, Check
} from 'lucide-react';

export interface AgencyUpgrade {
  id: string;
  name: string;
  category: 'operations' | 'training' | 'defense' | 'crypto';
  costDays: number;
  description: string;
  effect: string;
}

export const AGENCY_UPGRADES: AgencyUpgrade[] = [
  {
    id: 'invisible_ink',
    name: 'Tinta Tak Kasat Mata (Invisible Ink)',
    category: 'operations',
    costDays: 30,
    description: 'Bahan kimia rahasia untuk menyembunyikan korespondensi kurir dan dokumen intelijen.',
    effect: '+10% Efisiensi Pencurian Dokumen & Operasi Spionase'
  },
  {
    id: 'plastic_explosives',
    name: 'Bahan Peledak Plastik (Plastic Explosives)',
    category: 'operations',
    costDays: 30,
    description: 'Bahan peledak peleton yang mudah disamarkan untuk operasi sabotase rel dan pabrik.',
    effect: '+25% Efektivitas Sabotase Industri & Infrastruktur'
  },
  {
    id: 'suicide_pills',
    name: 'Pil Sianida Rahasia (Suicide Pills / L-Pill)',
    category: 'operations',
    costDays: 30,
    description: 'Kapsul racun darurat jika tertangkap agen rahasia musuh (Gestapo / NKVD).',
    effect: 'Mencegah kebocoran sandi & melindungi jaringan agen dari pembongkaran'
  },
  {
    id: 'portable_radios',
    name: 'Pemancar Radio Miniatur Portabel (Portable Radios)',
    category: 'operations',
    costDays: 30,
    description: 'Radio gelombang pendek untuk transmisi data cepat di garis belakang musuh.',
    effect: '+25% Kecepatan Pembangunan Jaringan Spionase'
  },
  {
    id: 'commando_training',
    name: 'Pelatihan Pasukan Khusus Komando (Commando Training)',
    category: 'training',
    costDays: 30,
    description: 'Pelatihan infiltrasi malam hari, taktik gerilya, dan pembunuhan target bernilai tinggi.',
    effect: '-40% Risiko Tertangkap pada Operasi Sabotase & Infiltrasi'
  },
  {
    id: 'diplomatic_training',
    name: 'Pelatihan Diplomasi & Subversif (Diplomatic Training)',
    category: 'training',
    costDays: 30,
    description: 'Keahlian berbaur di kalangan elit politik, propaganda surat kabar, dan hasutan kudeta.',
    effect: '+30% Probabilitas Keberhasilan Kudeta & Propaganda'
  },
  {
    id: 'passive_defense_1',
    name: 'Pertahanan Kontra-Intelijen Pasif I (Passive Defense I)',
    category: 'defense',
    costDays: 30,
    description: 'Pemeriksaan identitas ketat di stasiun kereta dan pelabuhan dalam negeri.',
    effect: '+1 Level Pertahanan Kontra-Intelijen Dalam Negeri'
  },
  {
    id: 'passive_defense_2',
    name: 'Pertahanan Kontra-Intelijen Pasif II (Passive Defense II)',
    category: 'defense',
    costDays: 30,
    description: 'Pengawasan telepon kantor pemerintahan dan patroli rahasia polisi militer.',
    effect: '+1 Level Tambahan Pertahanan Kontra-Intelijen'
  },
  {
    id: 'crypto_department',
    name: 'Mesin Komputasi Kriptologi (Cryptology Department)',
    category: 'crypto',
    costDays: 30,
    description: 'Fasilitas pemecah kode sandi mesin cipher militer (seperti Enigma atau Ultra).',
    effect: '+35% Kecepatan Pemecahan Sandi & Pengungkapan Rahasia Musuh'
  }
];

export interface TargetNationProfile {
  id: string;
  name: string;
  agencyName: string;
  baseCounterIntel: number; // 0 to 5
  stability: number; // in %
  warSupport: number; // in %
  ideologyPopularity: number; // friendly ideology %
  description: string;
}

export const TARGET_NATIONS: TargetNationProfile[] = [
  {
    id: 'soviet',
    name: 'Uni Soviet (USSR)',
    agencyName: 'NKVD',
    baseCounterIntel: 4,
    stability: 78,
    warSupport: 85,
    ideologyPopularity: 15,
    description: 'Pertahanan kontra-intelijen sangat brutal dengan aparat komisaris politik dan hukum keamanan ketat.'
  },
  {
    id: 'germany',
    name: 'Jerman (German Reich)',
    agencyName: 'Abwehr & Gestapo',
    baseCounterIntel: 3,
    stability: 82,
    warSupport: 80,
    ideologyPopularity: 20,
    description: 'Aparat keamanan dalam negeri disiplin tinggi dengan pengawasan industri ketat.'
  },
  {
    id: 'uk',
    name: 'Inggris Raya (United Kingdom)',
    agencyName: 'MI5 / MI6 & SOE',
    baseCounterIntel: 3,
    stability: 85,
    warSupport: 75,
    ideologyPopularity: 35,
    description: 'Kriptologi Bletchley Park yang sangat maju dan jaringan kontra-spionase efektif.'
  },
  {
    id: 'usa',
    name: 'Amerika Serikat (USA)',
    agencyName: 'OSS (Office of Strategic Services)',
    baseCounterIntel: 2,
    stability: 88,
    warSupport: 65,
    ideologyPopularity: 40,
    description: 'Negara terbuka dengan stabilitas tinggi, namun pertahanan kontra-intelijen awal masih berkembang.'
  },
  {
    id: 'japan',
    name: 'Kekaisaran Jepang (Empire of Japan)',
    agencyName: 'Kempeitai & Tokko',
    baseCounterIntel: 3,
    stability: 80,
    warSupport: 90,
    ideologyPopularity: 10,
    description: 'Polisi rahasia militer fanatik dengan perlawanan keras terhadap propaganda asing.'
  },
  {
    id: 'france',
    name: 'Prancis (French Republic)',
    agencyName: 'Deuxième Bureau',
    baseCounterIntel: 2,
    stability: 48,
    warSupport: 45,
    ideologyPopularity: 45,
    description: 'Stabilitas politik rentan dan perpecahan faksi memudahkan operasi subversif dan kudeta.'
  }
];

export type OperationType = 'coup' | 'propaganda' | 'theft' | 'collaboration' | 'sabotage' | 'rescue';

export const IntelligenceAgency: React.FC = () => {
  // Selected Agency / Nation
  const [playerAgency, setPlayerAgency] = useState<string>('Abwehr (Jerman)');
  const [selectedTargetId, setSelectedTargetId] = useState<string>('soviet');

  // Agency Upgrades State (Array of unlocked upgrade IDs)
  const [unlockedUpgrades, setUnlockedUpgrades] = useState<string[]>([
    'invisible_ink',
    'suicide_pills',
    'portable_radios'
  ]);

  // Operational Conditions
  const [spyNetworkStrength, setSpyNetworkStrength] = useState<number>(65); // 0-100%
  const [assignedSpies, setAssignedSpies] = useState<number>(2); // 1-3
  const [hasInfiltrationToken, setHasInfiltrationToken] = useState<boolean>(true);
  const [selectedOperation, setSelectedOperation] = useState<OperationType>('theft');

  // Simulation Roll State
  const [simulationLog, setSimulationLog] = useState<{
    rolled: boolean;
    success: boolean;
    outcomeTitle: string;
    narrative: string;
    capturedSpy: boolean;
    gain: string;
  } | null>(null);

  // Show Executable Desktop Instructions Modal
  const [showExeGuide, setShowExeGuide] = useState<boolean>(false);

  // Active Target Profile
  const target = TARGET_NATIONS.find(t => t.id === selectedTargetId) || TARGET_NATIONS[0];

  // Toggle Upgrade
  const handleToggleUpgrade = (id: string) => {
    setUnlockedUpgrades(prev =>
      prev.includes(id) ? prev.filter(uId => uId !== id) : [...prev, id]
    );
  };

  // Check if upgrade active
  const hasUpgrade = (id: string) => unlockedUpgrades.includes(id);

  // Probability Calculator Core Engine based on HOI4 La Résistance Formulas
  const calculation = useMemo(() => {
    let baseSuccess = 50;
    let baseRiskOfCapture = 30;
    let operationDays = 60;
    let minNetworkRequired = 50;

    // Operation specific base values
    switch (selectedOperation) {
      case 'coup':
        baseSuccess = 30; // Very difficult
        baseRiskOfCapture = 45;
        operationDays = 120;
        minNetworkRequired = 70;
        // Target stability factor: low stability boosts coup
        const stabilityFactor = (100 - target.stability) * 0.5; // up to +45%
        const ideologyFactor = target.ideologyPopularity * 0.4; // up to +40%
        baseSuccess += stabilityFactor + ideologyFactor;
        if (hasUpgrade('diplomatic_training')) baseSuccess += 30;
        break;

      case 'theft':
        baseSuccess = 55;
        baseRiskOfCapture = 25;
        operationDays = 75;
        minNetworkRequired = 50;
        if (hasUpgrade('invisible_ink')) baseSuccess += 15;
        if (hasInfiltrationToken) baseSuccess += 25;
        break;

      case 'propaganda':
        baseSuccess = 65;
        baseRiskOfCapture = 20;
        operationDays = 45;
        minNetworkRequired = 40;
        if (hasUpgrade('diplomatic_training')) baseSuccess += 25;
        if (hasUpgrade('portable_radios')) baseSuccess += 10;
        break;

      case 'collaboration':
        baseSuccess = 60;
        baseRiskOfCapture = 30;
        operationDays = 90;
        minNetworkRequired = 50;
        if (hasUpgrade('diplomatic_training')) baseSuccess += 20;
        break;

      case 'sabotage':
        baseSuccess = 50;
        baseRiskOfCapture = 40;
        operationDays = 60;
        minNetworkRequired = 45;
        if (hasUpgrade('plastic_explosives')) baseSuccess += 25;
        if (hasUpgrade('commando_training')) {
          baseSuccess += 15;
          baseRiskOfCapture -= 25;
        }
        break;

      case 'rescue':
        baseSuccess = 50;
        baseRiskOfCapture = 50;
        operationDays = 40;
        minNetworkRequired = 40;
        if (hasUpgrade('commando_training')) {
          baseSuccess += 30;
          baseRiskOfCapture -= 30;
        }
        break;
    }

    // Network strength bonus/penalty
    const networkDiff = spyNetworkStrength - minNetworkRequired;
    const networkModifier = Math.round(networkDiff * 0.6); // +/- bonus
    baseSuccess += networkModifier;

    // Assigned Spies bonus (+10% per extra spy)
    baseSuccess += (assignedSpies - 1) * 10;
    baseRiskOfCapture -= (assignedSpies - 1) * 5;

    // Target Counter-Intelligence Penalty (-10% per counter-intel level)
    baseSuccess -= target.baseCounterIntel * 10;
    baseRiskOfCapture += target.baseCounterIntel * 8;

    // Commando training general risk reduction
    if (hasUpgrade('commando_training')) {
      baseRiskOfCapture -= 15;
    }

    // Suicide pill protects captured agents from revealing whole ring
    const finalRisk = Math.max(5, Math.min(85, Math.round(baseRiskOfCapture)));
    const finalSuccess = Math.max(5, Math.min(95, Math.round(baseSuccess)));

    const networkSufficient = spyNetworkStrength >= minNetworkRequired;

    return {
      successRate: networkSufficient ? finalSuccess : Math.round(finalSuccess * 0.3),
      riskRate: finalRisk,
      operationDays,
      minNetworkRequired,
      networkSufficient
    };
  }, [selectedOperation, target, unlockedUpgrades, spyNetworkStrength, assignedSpies, hasInfiltrationToken]);

  // Execute Simulation Dice Roll
  const handleRunSimulation = () => {
    const roll = Math.random() * 100;
    const captureRoll = Math.random() * 100;
    const isSuccess = roll <= calculation.successRate;
    const isCaptured = captureRoll <= calculation.riskRate;

    let title = '';
    let narrative = '';
    let gain = '';

    if (isSuccess && !isCaptured) {
      title = 'OPERASI SUKSES SEMPURNA (PERFECT EXECUTION)';
      narrative = `Agen rahasia berhasil menyusup tanpa jejak ke markas target di ${target.name}. Informasi & sasaran berhasil diamankan sepenuhnya.`;
      gain = selectedOperation === 'theft'
        ? 'Mendapatkan 1x Bonus Riset Teknologi 100% + Cetak Biru Rahasia Lawan'
        : selectedOperation === 'coup'
        ? `Perang Saudara meletus di ${target.name}! Pemerintahan boneka baru berdiri.`
        : selectedOperation === 'collaboration'
        ? `Pemerintahan Kolaborasi terbentuk: Menurunkan batas menyerah ${target.name} sebesar -30%!`
        : selectedOperation === 'sabotage'
        ? '5 Pabrik Militer & Rel Kereta Api musuh hancur diledakkan.'
        : 'Stabilitas & Dukungan Perang target anjlok -15%.';
    } else if (isSuccess && isCaptured) {
      title = 'SUKSES DENGAN KORBAN (PYRRHIC SUCCESS)';
      narrative = `Operasi berhasil mencapai sasaran, namun 1 agen rahasia Anda tertangkap oleh aparat ${target.agencyName}. ${
        hasUpgrade('suicide_pills')
          ? 'Untungnya, Pil Sianida digunakan tepat waktu sehingga sandi rahasia tidak bocor!'
          : 'Peringatan: Sandi rahasia Anda berisiko dibongkar musuh dalam 30 hari!'
      }`;
      gain = 'Tujuan misi tercapai, namun butuh operasi penyelamatan agen.';
    } else {
      title = 'OPERASI GAGAL TOTAL (MISSION COMPROMISED)';
      narrative = `Operasi terendus oleh kontra-intelijen ${target.agencyName}. Tim agen terpaksa mundur atau ditangkap saat mendekati perimeter sasaran.`;
      gain = 'Tidak ada keuntungan didapat. Jaringan spionase kehilangan 25% kekuatan.';
    }

    setSimulationLog({
      rolled: true,
      success: isSuccess,
      outcomeTitle: title,
      narrative,
      capturedSpy: isCaptured,
      gain
    });
  };

  return (
    <div className="space-y-6 text-[#f1f5f9]">
      {/* Header Banner */}
      <div className="rounded-xl border border-indigo-500/40 bg-gradient-to-r from-[#0d1326] via-[#111933] to-[#080d1a] p-5 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 shadow-inner">
              <Eye className="h-7 w-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-serif text-xl sm:text-2xl font-black tracking-tight text-[#fef3c7] uppercase">
                  Badan Intelijen &amp; Operasi Spionase
                </h2>
                <span className="rounded bg-indigo-500/20 border border-indigo-500/40 px-2 py-0.5 text-[11px] font-mono text-indigo-300 font-bold">
                  SISTEM LA RÉSISTANCE DLC
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#cbd5e1] mt-0.5">
                Pilih badan intelijen, buka upgrade fasilitas spionase, dan hitung probabilitas keberhasilan operasi kudeta (coup), pencurian cetak biru teknologi (theft), sabotase, dan propaganda.
              </p>
            </div>
          </div>

          {/* Windows Desktop Executable Guide Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowExeGuide(true)}
              className="px-3.5 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-mono font-bold text-xs shadow-lg flex items-center gap-2 transition-all ring-1 ring-blue-400/40"
            >
              <Monitor className="h-4 w-4" />
              <span>Cara Buat Jadi .EXE di PC Windows 10/11</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main KPI Status Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* KPI 1: Success Probability */}
        <div className="p-4 rounded-xl border border-indigo-500/40 bg-[#0d1326] shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#cbd5e1]">Probabilitas Keberhasilan</span>
            <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${
              calculation.successRate >= 70 ? 'bg-emerald-500/20 text-emerald-300' : calculation.successRate >= 45 ? 'bg-amber-500/20 text-amber-300' : 'bg-red-500/20 text-red-300'
            }`}>
              {calculation.successRate >= 70 ? 'TINGGI' : calculation.successRate >= 45 ? 'SEDANG' : 'BERISIKO'}
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className={`text-3xl font-black font-mono ${
              calculation.successRate >= 70 ? 'text-emerald-400' : calculation.successRate >= 45 ? 'text-amber-400' : 'text-red-400'
            }`}>
              {calculation.successRate}%
            </span>
            <span className="text-xs text-[#94a3b8]">Tingkat Sukses</span>
          </div>
          <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden mt-2">
            <div
              className={`h-full transition-all ${
                calculation.successRate >= 70 ? 'bg-emerald-400' : calculation.successRate >= 45 ? 'bg-amber-400' : 'bg-red-500'
              }`}
              style={{ width: `${calculation.successRate}%` }}
            />
          </div>
        </div>

        {/* KPI 2: Risk of Capture */}
        <div className="p-4 rounded-xl border border-red-500/40 bg-[#1c0d12] shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#cbd5e1]">Risiko Agen Tertangkap</span>
            <Skull className="h-4 w-4 text-red-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black font-mono text-red-400">
              {calculation.riskRate}%
            </span>
            <span className="text-xs text-[#94a3b8]">Bahaya Sergapan</span>
          </div>
          <p className="text-[11px] text-[#cbd5e1] mt-1">
            {hasUpgrade('suicide_pills') ? 'Dilindungi Pil Sianida (Sandi Aman)' : 'Tanpa Pil Sianida (Rawan Bocor)'}
          </p>
        </div>

        {/* KPI 3: Operation Duration & Manpower */}
        <div className="p-4 rounded-xl border border-[#273256] bg-[#0c1224] shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#cbd5e1]">Durasi &amp; Persiapan</span>
            <FileText className="h-4 w-4 text-sky-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black font-mono text-sky-300">
              {calculation.operationDays}
            </span>
            <span className="text-xs text-[#94a3b8]">Hari Operasi</span>
          </div>
          <p className="text-[11px] text-[#cbd5e1] mt-1">
            Dibutuhkan: <strong className="text-white">{assignedSpies} Agen Rahasia</strong>
          </p>
        </div>

        {/* KPI 4: Target Counter-Intel Defense */}
        <div className="p-4 rounded-xl border border-[#273256] bg-[#0c1224] shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#cbd5e1]">Kontra-Intel Target</span>
            <Shield className="h-4 w-4 text-amber-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black font-mono text-amber-300">
              Lv. {target.baseCounterIntel}
            </span>
            <span className="text-xs text-[#94a3b8]">{target.agencyName}</span>
          </div>
          <p className="text-[11px] text-[#cbd5e1] mt-1">
            Stabilitas Target: <strong className="text-white">{target.stability}%</strong>
          </p>
        </div>
      </div>

      {/* Network Requirement Warning Banner */}
      {!calculation.networkSufficient && (
        <div className="p-3.5 rounded-xl border border-amber-500/60 bg-amber-950/40 flex items-center gap-3 text-xs font-mono text-amber-200">
          <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0" />
          <div>
            <strong>Peringatan Jaringan Spionase Belum Cukup:</strong> Operasi ini memerlukan minimal{' '}
            <strong className="text-white">{calculation.minNetworkRequired}%</strong> kekuatan jaringan, saat ini baru{' '}
            <strong className="text-red-300">{spyNetworkStrength}%</strong>. Efisiensi operasi terpangkas drastis!
          </div>
        </div>
      )}

      {/* Main 3-Column Interactive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Column 1: Operation Selection & Target Nation (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-xl border border-[#273256] bg-[#090e1c] p-4 sm:p-5 shadow-lg space-y-4">
            <div className="border-b border-[#1b2542] pb-3">
              <h3 className="font-serif text-base font-bold text-[#fef3c7] flex items-center gap-2">
                <Swords className="h-5 w-5 text-indigo-400" /> Pilih Jenis Misi Operasi
              </h3>
              <p className="text-xs text-[#94a3b8] mt-0.5">
                Tentukan target subversif atau sasaran intelijen di negara lawan.
              </p>
            </div>

            {/* Operation Type Selector */}
            <div className="space-y-2">
              {[
                { id: 'theft', label: 'Curi Cetak Biru (Steal Blueprints)', desc: 'Curi riset tank, pesawat, atau doktrin militer.' },
                { id: 'coup', label: 'Lakukan Kudeta (Stage a Coup)', desc: 'Memicu perang saudara dan mengganti rezim musuh.' },
                { id: 'collaboration', label: 'Bentuk Kolaborasi (Collab Govt)', desc: 'Menurunkan batas menyerah hingga -30% capitulation.' },
                { id: 'propaganda', label: 'Propaganda & Gejolak (Sow Discontent)', desc: 'Mengurangi stabilitas dan dukungan perang musuh.' },
                { id: 'sabotage', label: 'Sabotase Fasilitas Industri', desc: 'Meledakkan pabrik militer & rel kereta api garis belakang.' },
                { id: 'rescue', label: 'Bebaskan Agen (Rescue Operative)', desc: 'Menyelamatkan mata-mata yang tertangkap Gestapo/NKVD.' }
              ].map(op => (
                <button
                  key={op.id}
                  onClick={() => setSelectedOperation(op.id as OperationType)}
                  className={`w-full p-2.5 rounded-lg border text-left transition-all ${
                    selectedOperation === op.id
                      ? 'border-indigo-500 bg-indigo-950/70 text-indigo-100 shadow ring-1 ring-indigo-400/50'
                      : 'border-[#1b2542] bg-[#0d1326] text-[#94a3b8] hover:text-white'
                  }`}
                >
                  <div className="font-bold text-xs text-white flex items-center justify-between">
                    <span>{op.label}</span>
                    {selectedOperation === op.id && <CheckCircle2 className="h-3.5 w-3.5 text-indigo-400" />}
                  </div>
                  <span className="text-[10px] text-[#cbd5e1] block mt-0.5">{op.desc}</span>
                </button>
              ))}
            </div>

            {/* Target Nation Selector */}
            <div className="pt-3 border-t border-[#1b2542] space-y-2">
              <label className="text-xs font-mono text-[#94a3b8] block">Negara Sasaran (Target Nation):</label>
              <select
                value={selectedTargetId}
                onChange={(e) => setSelectedTargetId(e.target.value)}
                className="w-full rounded-lg border border-[#1b2542] bg-[#0d1326] p-2 text-xs font-bold text-white outline-none focus:border-indigo-500"
              >
                {TARGET_NATIONS.map(n => (
                  <option key={n.id} value={n.id} className="bg-[#090e1c] text-white">
                    {n.name} (Badan: {n.agencyName})
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-[#cbd5e1] leading-relaxed italic">
                {target.description}
              </p>
            </div>
          </div>
        </div>

        {/* Column 2: Infiltration Network & Spy Setup (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-xl border border-[#273256] bg-[#090e1c] p-4 sm:p-5 shadow-lg space-y-4">
            <div className="border-b border-[#1b2542] pb-3">
              <h3 className="font-serif text-base font-bold text-[#fef3c7] flex items-center gap-2">
                <Radio className="h-5 w-5 text-indigo-400" /> Jaringan &amp; Agen Spionase
              </h3>
              <p className="text-xs text-[#94a3b8] mt-0.5">
                Konfigurasi kekuatan mata-mata di wilayah musuh.
              </p>
            </div>

            {/* Spy Network Strength Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#94a3b8]">Kekuatan Jaringan Spionase:</span>
                <strong className="text-indigo-300">{spyNetworkStrength}% Jaringan</strong>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={spyNetworkStrength}
                onChange={(e) => setSpyNetworkStrength(parseInt(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#64748b] font-mono">
                <span>10% (Lemah)</span>
                <span>50% (Standar)</span>
                <span>100% (Penuh)</span>
              </div>
            </div>

            {/* Number of Operatives on Mission */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#94a3b8] block">
                Jumlah Agen Ditugaskan:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3].map(count => (
                  <button
                    key={count}
                    onClick={() => setAssignedSpies(count)}
                    className={`py-2 rounded-lg border text-xs font-mono text-center transition-all ${
                      assignedSpies === count
                        ? 'border-indigo-500 bg-indigo-500/20 text-indigo-200 font-bold'
                        : 'border-[#1b2542] bg-[#0d1326] text-[#94a3b8]'
                    }`}
                  >
                    {count} Agen {count > 1 ? `(+${(count - 1) * 10}%)` : ''}
                  </button>
                ))}
              </div>
            </div>

            {/* Infiltration Token Checkbox */}
            <div className="p-3 rounded-lg border border-[#1b2542] bg-[#0d1326] space-y-1">
              <label className="text-xs font-mono text-[#cbd5e1] cursor-pointer flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={hasInfiltrationToken}
                  onChange={(e) => setHasInfiltrationToken(e.target.checked)}
                  className="accent-indigo-500 rounded"
                />
                <span>Memiliki Token Infiltrasi Cabang Militer</span>
              </label>
              <p className="text-[10px] text-[#94a3b8]">
                Memberikan bonus +25% probabilitas keberhasilan untuk pencurian cetak biru teknologi.
              </p>
            </div>

            {/* Simulation Action Button */}
            <div className="pt-2">
              <button
                onClick={handleRunSimulation}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 text-white font-mono font-bold text-sm shadow-xl flex items-center justify-center gap-2 transition-all transform active:scale-98"
              >
                <Play className="h-4 w-4 fill-white" />
                <span>Simulasikan Jalankan Operasi (Roll)</span>
              </button>
            </div>

            {/* Simulation Output Card */}
            {simulationLog && (
              <div className={`p-3.5 rounded-xl border text-xs space-y-1.5 transition-all ${
                simulationLog.success
                  ? 'border-emerald-500/60 bg-emerald-950/40 text-emerald-200'
                  : 'border-red-500/60 bg-red-950/40 text-red-200'
              }`}>
                <div className="flex items-center gap-1.5 font-bold font-mono">
                  {simulationLog.success ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : <AlertTriangle className="h-4 w-4 text-red-400" />}
                  <span>{simulationLog.outcomeTitle}</span>
                </div>
                <p className="text-[11px] text-[#cbd5e1] leading-relaxed">
                  {simulationLog.narrative}
                </p>
                <div className="pt-1 border-t border-white/10 text-[11px] font-mono">
                  Hasil: <strong className="text-white">{simulationLog.gain}</strong>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Column 3: Agency Facility Upgrades (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-xl border border-[#273256] bg-[#090e1c] p-4 sm:p-5 shadow-lg space-y-4">
            <div className="border-b border-[#1b2542] pb-3 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-base font-bold text-[#fef3c7] flex items-center gap-2">
                  <Key className="h-5 w-5 text-indigo-400" /> Peningkatan Fasilitas Badan
                </h3>
                <p className="text-xs text-[#94a3b8] mt-0.5">
                  Klik untuk mengaktifkan upgrade departemen intelijen.
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-indigo-300">
                {unlockedUpgrades.length}/{AGENCY_UPGRADES.length} Aktif
              </span>
            </div>

            {/* Upgrade Cards List */}
            <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
              {AGENCY_UPGRADES.map(upgrade => {
                const active = hasUpgrade(upgrade.id);
                return (
                  <div
                    key={upgrade.id}
                    onClick={() => handleToggleUpgrade(upgrade.id)}
                    className={`p-2.5 rounded-lg border cursor-pointer transition-all ${
                      active
                        ? 'border-indigo-500/80 bg-indigo-950/60 ring-1 ring-indigo-400/40'
                        : 'border-[#1b2542] bg-[#0d1326] opacity-75 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h5 className="font-bold text-xs text-white flex items-center gap-1.5">
                          <span>{upgrade.name}</span>
                        </h5>
                        <p className="text-[10px] text-[#cbd5e1] mt-0.5 leading-snug">
                          {upgrade.description}
                        </p>
                        <span className="inline-block text-[9px] font-mono text-emerald-300 mt-1 font-bold">
                          {upgrade.effect}
                        </span>
                      </div>
                      <div className={`h-4 w-4 rounded shrink-0 flex items-center justify-center border ${
                        active ? 'bg-indigo-600 border-indigo-400 text-white' : 'border-[#2d3b63] bg-[#121a30]'
                      }`}>
                        {active && <Check className="h-3 w-3 stroke-[3]" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Windows 10 & 11 Executable Desktop Conversion Guide Modal */}
      {showExeGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="max-w-3xl w-full rounded-2xl border border-blue-500/50 bg-[#0c1424] p-6 shadow-2xl text-[#f1f5f9] max-h-[90vh] overflow-y-auto space-y-5">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#1e2d4a] pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/40">
                  <Laptop className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-serif text-lg md:text-xl font-bold text-white">
                    Panduan Membuat File Executable (.EXE) untuk Windows 10 &amp; 11
                  </h3>
                  <p className="text-xs text-[#94a3b8]">
                    Langkah mudah mengubah web app ini menjadi aplikasi desktop offline mandiri di komputer Anda.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowExeGuide(false)}
                className="p-1.5 rounded-lg text-[#94a3b8] hover:text-white hover:bg-white/10"
              >
                ✕
              </button>
            </div>

            {/* Methods Explanation */}
            <div className="space-y-4 text-xs font-mono">
              {/* Method 1: Tauri / Electron (Standard Production Packaging) */}
              <div className="p-4 rounded-xl border border-blue-500/40 bg-[#101b33] space-y-2">
                <div className="flex items-center gap-2 text-blue-300 font-bold text-sm">
                  <Terminal className="h-4 w-4" />
                  <span>Metode 1: Menggunakan Electron / Electron-Builder (Paling Populer &amp; Stabil)</span>
                </div>
                <p className="text-[11px] text-[#cbd5e1] leading-relaxed">
                  Metode ini membungkus aplikasi React + Vite Anda ke dalam Chromium desktop runtime mandiri (.exe installer &amp; portable).
                </p>

                <div className="space-y-1.5 pt-2">
                  <span className="text-[#94a3b8] block">Langkah 1: Download project (ZIP atau Git clone) ke PC Windows Anda.</span>
                  <span className="text-[#94a3b8] block">Langkah 2: Buka Command Prompt / PowerShell di folder project, lalu instal electron:</span>
                  <div className="p-2.5 rounded bg-black/60 border border-[#233559] text-emerald-400 select-all font-mono">
                    npm install --save-dev electron electron-builder wait-on concurrently
                  </div>

                  <span className="text-[#94a3b8] block pt-1">Langkah 3: Buat file <code>main.cjs</code> di root folder project:</span>
                  <div className="p-2.5 rounded bg-black/60 border border-[#233559] text-sky-300 select-all font-mono text-[10px] leading-relaxed">
                    {`const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1366,
    height: 768,
    icon: path.join(__dirname, 'public/icon.png'),
    webPreferences: { nodeIntegration: true }
  });
  // Load build output
  win.loadFile(path.join(__dirname, 'dist/index.html'));
}

app.whenReady().then(createWindow);`}
                  </div>

                  <span className="text-[#94a3b8] block pt-1">Langkah 4: Tambahkan script di <code>package.json</code>:</span>
                  <div className="p-2.5 rounded bg-black/60 border border-[#233559] text-amber-300 select-all font-mono text-[10px]">
                    {`"main": "main.cjs",
"scripts": {
  "build": "vite build",
  "dist:win": "npm run build && electron-builder --win portable"
}`}
                  </div>

                  <span className="text-[#94a3b8] block pt-1">Langkah 5: Jalankan perintah build untuk menghasilkan file .exe:</span>
                  <div className="p-2.5 rounded bg-black/60 border border-[#233559] text-emerald-400 select-all font-mono">
                    npm run dist:win
                  </div>
                  <p className="text-[10px] text-emerald-300">
                    File executable mandiri (.exe) akan langsung muncul di dalam folder <code>/dist/</code> siap dijalankan di Windows 10 &amp; Windows 11 tanpa butuh browser!
                  </p>
                </div>
              </div>

              {/* Method 2: Nativefier (Cara Paling Cepat 1 Menit) */}
              <div className="p-4 rounded-xl border border-purple-500/40 bg-[#18112c] space-y-2">
                <div className="flex items-center gap-2 text-purple-300 font-bold text-sm">
                  <Sparkles className="h-4 w-4" />
                  <span>Metode 2: Menggunakan Nativefier (Instan 1 Baris Command)</span>
                </div>
                <p className="text-[11px] text-[#cbd5e1] leading-relaxed">
                  Jika aplikasi sudah di-deploy atau berjalan di localhost, cukup jalankan satu perintah ini di PowerShell Windows:
                </p>
                <div className="p-2.5 rounded bg-black/60 border border-[#3b2361] text-purple-300 select-all font-mono">
                  npx nativefier --name "HOI4-Tactical-Command" "https://ais-dev-ftgcfmfwj3wshzsqcm72p6-615703771911.asia-southeast1.run.app"
                </div>
                <p className="text-[10px] text-[#cbd5e1]">
                  Nativefier akan otomatis membuat folder berisi <code>HOI4-Tactical-Command.exe</code> yang langsung bisa di-klik ganda di Windows 10 / 11.
                </p>
              </div>

              {/* Method 3: Edge / Chrome PWA Install (Tanpa Compile) */}
              <div className="p-4 rounded-xl border border-emerald-500/40 bg-[#0e1d17] space-y-2">
                <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Metode 3: Pasang Langsung Sebagai Desktop App (PWA di Windows)</span>
                </div>
                <p className="text-[11px] text-[#cbd5e1] leading-relaxed">
                  Buka aplikasi di Microsoft Edge atau Google Chrome pada Windows 10/11:
                </p>
                <ol className="list-decimal pl-5 space-y-1 text-[11px] text-[#cbd5e1]">
                  <li>Klik tombol ikon <strong>"Install App"</strong> di bilah alamat browser (URL bar).</li>
                  <li>Atau klik titik tiga kanan atas browser &gt; pilih <strong>"Apps" (Aplikasi)</strong> &gt; <strong>"Install this site as an app"</strong>.</li>
                  <li>Aplikasi akan otomatis muncul di Start Menu, Desktop Shortcut, dan Taskbar Windows sebagai aplikasi native!</li>
                </ol>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowExeGuide(false)}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono font-bold text-xs shadow transition-all"
              >
                Mengerti &amp; Tutup Panduan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
