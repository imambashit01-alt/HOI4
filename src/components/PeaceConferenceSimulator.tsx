import React, { useState, useMemo } from 'react';
import {
  FileText, Globe, Award, Shield, Flag, CheckCircle2,
  AlertTriangle, RotateCcw, Swords, Landmark, Building2,
  Users, Fuel, Sparkles, ChevronRight, BarChart3, Plus, Trash2
} from 'lucide-react';

export interface TerritoryState {
  id: string;
  name: string;
  country: string;
  victoryPoints: number;
  civilianFactories: number;
  militaryFactories: number;
  dockyards: number;
  resources: string;
  baseAnnexCost: number;
  demandedBy?: 'player' | 'ally_ai' | null;
  demandType?: 'annex' | 'puppet' | 'liberate' | 'demilitarize' | 'reparations' | 'take_navy' | null;
}

export const INITIAL_CONFERENCE_STATES: TerritoryState[] = [
  {
    id: 'berlin',
    name: 'Brandenburg & Berlin',
    country: 'Jerman',
    victoryPoints: 50,
    civilianFactories: 12,
    militaryFactories: 16,
    dockyards: 0,
    resources: 'Baja (Steel): 68, Aluminium: 24',
    baseAnnexCost: 180,
    demandedBy: null,
    demandType: null
  },
  {
    id: 'rhineland',
    name: 'Rhineland & Ruhrgebiet',
    country: 'Jerman',
    victoryPoints: 35,
    civilianFactories: 18,
    militaryFactories: 22,
    dockyards: 0,
    resources: 'Baja (Steel): 140, Tungsten: 15',
    baseAnnexCost: 220,
    demandedBy: null,
    demandType: null
  },
  {
    id: 'bavaria',
    name: 'Bavaria (Bayern)',
    country: 'Jerman',
    victoryPoints: 20,
    civilianFactories: 8,
    militaryFactories: 10,
    dockyards: 0,
    resources: 'Aluminium: 35',
    baseAnnexCost: 110,
    demandedBy: null,
    demandType: null
  },
  {
    id: 'hanover_coast',
    name: 'Kiel, Hamburg & Weser-Ems',
    country: 'Jerman',
    victoryPoints: 30,
    civilianFactories: 10,
    militaryFactories: 8,
    dockyards: 14,
    resources: 'Baja (Steel): 30',
    baseAnnexCost: 150,
    demandedBy: null,
    demandType: null
  },
  {
    id: 'silesia',
    name: 'Upper Silesia (Schlesien)',
    country: 'Jerman',
    victoryPoints: 15,
    civilianFactories: 6,
    militaryFactories: 12,
    dockyards: 0,
    resources: 'Baja (Steel): 80',
    baseAnnexCost: 95,
    demandedBy: null,
    demandType: null
  },
  {
    id: 'east_prussia',
    name: 'East Prussia (Ostpreußen & Königsberg)',
    country: 'Jerman',
    victoryPoints: 15,
    civilianFactories: 4,
    militaryFactories: 4,
    dockyards: 4,
    resources: 'Baja: 10',
    baseAnnexCost: 80,
    demandedBy: null,
    demandType: null
  }
];

export const PeaceConferenceSimulator: React.FC = () => {
  // War Contribution Metrics (Player)
  const [casualtiesInflictedK, setCasualtiesInflictedK] = useState<number>(850); // in thousands
  const [casualtiesSufferedK, setCasualtiesSufferedK] = useState<number>(250);
  const [occupiedVictoryPoints, setOccupiedVictoryPoints] = useState<number>(110);
  const [strategicBombingDamage, setStrategicBombingDamage] = useState<number>(450);
  const [sunkShipsIC, setSunkShipsIC] = useState<number>(24000);

  // Allied AI Contribution Metrics
  const [alliedCasualtiesInflictedK, setAlliedCasualtiesInflictedK] = useState<number>(600);
  const [alliedOccupiedVP, setAlliedOccupiedVP] = useState<number>(60);

  // Territory demands state
  const [states, setStates] = useState<TerritoryState[]>(INITIAL_CONFERENCE_STATES);
  const [conferenceTurn, setConferenceTurn] = useState<number>(1);

  // Calculate War Score Points based on By Blood Alone (BBA) Peace Formula
  const warScore = useMemo(() => {
    // 1 point per 1k enemy killed
    const killScore = Math.round(casualtiesInflictedK * 1.0);
    // 1 point per 2k friendly casualties suffered
    const deathScore = Math.round(casualtiesSufferedK * 0.5);
    // 3 points per VP captured
    const vpScore = Math.round(occupiedVictoryPoints * 3.0);
    // 0.2 points per bombing damage
    const bombScore = Math.round(strategicBombingDamage * 0.2);
    // 1 point per 100 IC sunk ships
    const navalScore = Math.round(sunkShipsIC / 100);

    const playerTotalPoints = killScore + deathScore + vpScore + bombScore + navalScore;

    // AI score calculation
    const allyScore = Math.round((alliedCasualtiesInflictedK * 1.0) + (alliedOccupiedVP * 3.0) + 150);
    const combinedTotal = playerTotalPoints + allyScore;
    const playerSharePercent = combinedTotal > 0 ? Math.round((playerTotalPoints / combinedTotal) * 100) : 100;

    return {
      killScore,
      deathScore,
      vpScore,
      bombScore,
      navalScore,
      playerTotalPoints,
      allyScore,
      playerSharePercent
    };
  }, [
    casualtiesInflictedK, casualtiesSufferedK, occupiedVictoryPoints,
    strategicBombingDamage, sunkShipsIC, alliedCasualtiesInflictedK, alliedOccupiedVP
  ]);

  // Points spent
  const spentPoints = useMemo(() => {
    return states.reduce((sum, s) => {
      if (s.demandedBy === 'player') {
        const factor = s.demandType === 'annex' ? 1.0 : s.demandType === 'puppet' ? 0.7 : s.demandType === 'liberate' ? 0.4 : 0.3;
        return sum + Math.round(s.baseAnnexCost * factor);
      }
      return sum;
    }, 0);
  }, [states]);

  const remainingPlayerPoints = Math.max(0, warScore.playerTotalPoints - spentPoints);

  // Handle Player Demanding a territory
  const handleDemandTerritory = (stateId: string, demandType: 'annex' | 'puppet' | 'liberate' | 'reparations') => {
    setStates(prev => prev.map(s => {
      if (s.id === stateId) {
        // Toggle off if clicking same
        if (s.demandedBy === 'player' && s.demandType === demandType) {
          return { ...s, demandedBy: null, demandType: null };
        }
        return { ...s, demandedBy: 'player', demandType };
      }
      return s;
    }));
  };

  // AI Turn Simulation (Ally makes a bid)
  const handlePassTurn = () => {
    setConferenceTurn(prev => prev + 1);

    // AI claims an unclaimed territory with highest factory count
    const unclaimed = states.filter(s => !s.demandedBy);
    if (unclaimed.length > 0) {
      const target = unclaimed.sort((a, b) => (b.civilianFactories + b.militaryFactories) - (a.civilianFactories + a.militaryFactories))[0];
      setStates(prev => prev.map(s => {
        if (s.id === target.id) {
          return { ...s, demandedBy: 'ally_ai', demandType: 'puppet' };
        }
        return s;
      }));
    }
  };

  const handleResetConference = () => {
    setStates(INITIAL_CONFERENCE_STATES);
    setConferenceTurn(1);
  };

  return (
    <div className="space-y-6 text-[#f1f5f9]">
      {/* Header Banner */}
      <div className="rounded-xl border border-purple-500/40 bg-gradient-to-r from-[#170e24] via-[#1c122c] to-[#0f0917] p-5 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-400 shadow-inner">
              <Landmark className="h-7 w-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-serif text-xl sm:text-2xl font-black tracking-tight text-[#fef3c7] uppercase">
                  Kalkulator Konferensi Perdamaian &amp; Skor Perang
                </h2>
                <span className="rounded bg-purple-500/20 border border-purple-500/40 px-2 py-0.5 text-[11px] font-mono text-purple-300 font-bold">
                  SISTEM BBA PEACE CONFERENCE
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#cbd5e1] mt-0.5">
                Hitung skor partisipasi perang dari korban musuh, pendudukan wilayah, dan pengeboman. Tuntut pencaplokan wilayah (Annex), negara boneka (Puppet), atau reparasi ekonomi.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePassTurn}
              className="px-3.5 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-mono font-bold text-xs shadow flex items-center gap-1.5 transition-all"
            >
              <span>Giliran Berikutnya (Turn {conferenceTurn})</span>
              <ChevronRight className="h-4 w-4" />
            </button>
            <button
              onClick={handleResetConference}
              className="p-2 rounded-lg bg-[#191024] border border-[#2b1b3e] text-[#94a3b8] hover:text-white"
              title="Reset Konferensi"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* War Score Balance Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl border border-purple-500/40 bg-[#120a1c] shadow-lg">
          <span className="text-xs font-mono text-[#94a3b8] block">Total Skor Perang Anda:</span>
          <span className="text-2xl font-black font-mono text-purple-300 mt-1 block">
            {warScore.playerTotalPoints.toLocaleString()} Poin ({warScore.playerSharePercent}% Partisipasi)
          </span>
          <span className="text-[11px] text-[#cbd5e1]">Sekutu AI: {warScore.allyScore.toLocaleString()} Poin ({100 - warScore.playerSharePercent}%)</span>
        </div>

        <div className="p-4 rounded-xl border border-emerald-500/40 bg-[#0c1c14] shadow-lg">
          <span className="text-xs font-mono text-[#94a3b8] block">Sisa Poin Penawaran:</span>
          <span className="text-2xl font-black font-mono text-emerald-400 mt-1 block">
            {remainingPlayerPoints.toLocaleString()} Poin
          </span>
          <span className="text-[11px] text-[#cbd5e1]">Telah dialokasikan: {spentPoints.toLocaleString()} Poin</span>
        </div>

        <div className="p-4 rounded-xl border border-amber-500/40 bg-[#1e1509] shadow-lg">
          <span className="text-xs font-mono text-[#94a3b8] block">Status Meja Perundingan:</span>
          <span className="text-lg font-bold font-mono text-amber-400 mt-1 block">
            Putaran ke-{conferenceTurn} Berlangsung
          </span>
          <span className="text-[11px] text-[#cbd5e1]">Tuntutan yang tidak saling tumpang-tindih akan langsung disahkan.</span>
        </div>
      </div>

      {/* Main 2-Column: War Metric Inputs & Peace Bidding Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* War Score Contributors Config */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-xl border border-[#2b1b3e] bg-[#0e0717] p-4 sm:p-5 shadow-lg space-y-4">
            <div className="border-b border-[#211430] pb-3">
              <h3 className="font-serif text-base font-bold text-[#fef3c7]">
                Parameter Partisipasi Perang (War Participation)
              </h3>
              <p className="text-xs text-[#94a3b8] mt-0.5">
                Nilai riil kontribusi Anda dalam mengalahkan faksi musuh.
              </p>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div className="p-2.5 rounded bg-[#160d24] border border-[#26163b]">
                <div className="flex justify-between">
                  <span className="text-[#94a3b8]">Korban Musuh Yang Ditimbulkan:</span>
                  <strong className="text-red-400">+{warScore.killScore} Poin</strong>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <input
                    type="number"
                    value={casualtiesInflictedK}
                    onChange={(e) => setCasualtiesInflictedK(parseInt(e.target.value) || 0)}
                    className="w-full bg-transparent font-bold text-white outline-none"
                  />
                  <span className="text-[10px] text-[#94a3b8]">ribu jiwa</span>
                </div>
              </div>

              <div className="p-2.5 rounded bg-[#160d24] border border-[#26163b]">
                <div className="flex justify-between">
                  <span className="text-[#94a3b8]">Korban Pasukan Kawan Gugur:</span>
                  <strong className="text-amber-400">+{warScore.deathScore} Poin</strong>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <input
                    type="number"
                    value={casualtiesSufferedK}
                    onChange={(e) => setCasualtiesSufferedK(parseInt(e.target.value) || 0)}
                    className="w-full bg-transparent font-bold text-white outline-none"
                  />
                  <span className="text-[10px] text-[#94a3b8]">ribu jiwa</span>
                </div>
              </div>

              <div className="p-2.5 rounded bg-[#160d24] border border-[#26163b]">
                <div className="flex justify-between">
                  <span className="text-[#94a3b8]">Victory Points Wilayah Direbut:</span>
                  <strong className="text-emerald-400">+{warScore.vpScore} Poin</strong>
                </div>
                <input
                  type="number"
                  value={occupiedVictoryPoints}
                  onChange={(e) => setOccupiedVictoryPoints(parseInt(e.target.value) || 0)}
                  className="w-full bg-transparent font-bold text-white outline-none mt-1"
                />
              </div>

              <div className="p-2.5 rounded bg-[#160d24] border border-[#26163b]">
                <div className="flex justify-between">
                  <span className="text-[#94a3b8]">Kerusakan Bombardir Strategis:</span>
                  <strong className="text-purple-400">+{warScore.bombScore} Poin</strong>
                </div>
                <input
                  type="number"
                  value={strategicBombingDamage}
                  onChange={(e) => setStrategicBombingDamage(parseInt(e.target.value) || 0)}
                  className="w-full bg-transparent font-bold text-white outline-none mt-1"
                />
              </div>

              <div className="p-2.5 rounded bg-[#160d24] border border-[#26163b]">
                <div className="flex justify-between">
                  <span className="text-[#94a3b8]">Kapal Perang Musuh Ditenggelamkan:</span>
                  <strong className="text-sky-400">+{warScore.navalScore} Poin</strong>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <input
                    type="number"
                    value={sunkShipsIC}
                    onChange={(e) => setSunkShipsIC(parseInt(e.target.value) || 0)}
                    className="w-full bg-transparent font-bold text-white outline-none"
                  />
                  <span className="text-[10px] text-[#94a3b8]">IC</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Peace Conference State Bidding Table */}
        <div className="lg:col-span-8 space-y-4">
          <div className="rounded-xl border border-[#2b1b3e] bg-[#0e0717] p-4 sm:p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-[#211430] pb-3">
              <div>
                <h3 className="font-serif text-base font-bold text-[#fef3c7]">
                  Daftar Wilayah &amp; Tuntutan Perjanjian Perdamaian
                </h3>
                <p className="text-xs text-[#94a3b8]">
                  Pilih status tuntutan untuk setiap wilayah musuh yang kalah.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {states.map(state => {
                const annexCost = state.baseAnnexCost;
                const puppetCost = Math.round(state.baseAnnexCost * 0.7);
                const reparationsCost = Math.round(state.baseAnnexCost * 0.3);

                return (
                  <div
                    key={state.id}
                    className={`p-3.5 rounded-xl border transition-all ${
                      state.demandedBy === 'player'
                        ? 'border-purple-500/60 bg-[#1d112e]'
                        : state.demandedBy === 'ally_ai'
                        ? 'border-blue-500/50 bg-[#0d1627]'
                        : 'border-[#211430] bg-[#12091d]'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-white text-sm">{state.name}</h4>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#1f1330] border border-[#301d4a] text-purple-300">
                            {state.country} ({state.victoryPoints} VP)
                          </span>
                          {state.demandedBy === 'player' && (
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-500/30 text-purple-200 uppercase border border-purple-400">
                              TUNTUTAN: {state.demandType}
                            </span>
                          )}
                          {state.demandedBy === 'ally_ai' && (
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-500/30 text-blue-200 uppercase border border-blue-400">
                              DITUNTUT SEKUTU (AI)
                            </span>
                          )}
                        </div>

                        {/* Resource and Factory Mini Bar */}
                        <div className="flex items-center gap-3 text-[11px] font-mono text-[#cbd5e1] mt-1.5 flex-wrap">
                          <span>Pabrik Sipil: <strong className="text-sky-300">{state.civilianFactories}</strong></span>
                          <span>Pabrik Militer: <strong className="text-red-400">{state.militaryFactories}</strong></span>
                          <span>Galangan: <strong className="text-amber-400">{state.dockyards}</strong></span>
                          <span>{state.resources}</span>
                        </div>
                      </div>

                      {/* Demand Action Buttons */}
                      <div className="flex items-center gap-1.5 flex-wrap shrink-0">
                        <button
                          onClick={() => handleDemandTerritory(state.id, 'annex')}
                          className={`px-2.5 py-1 rounded text-xs font-mono transition-all ${
                            state.demandedBy === 'player' && state.demandType === 'annex'
                              ? 'bg-purple-600 text-white font-bold shadow ring-1 ring-purple-300'
                              : 'bg-[#1e122e] text-[#cbd5e1] hover:text-white border border-[#351e50]'
                          }`}
                        >
                          Caplok ({annexCost} Pts)
                        </button>
                        <button
                          onClick={() => handleDemandTerritory(state.id, 'puppet')}
                          className={`px-2.5 py-1 rounded text-xs font-mono transition-all ${
                            state.demandedBy === 'player' && state.demandType === 'puppet'
                              ? 'bg-emerald-600 text-white font-bold shadow'
                              : 'bg-[#1e122e] text-[#cbd5e1] hover:text-white border border-[#351e50]'
                          }`}
                        >
                          Boneka ({puppetCost} Pts)
                        </button>
                        <button
                          onClick={() => handleDemandTerritory(state.id, 'reparations')}
                          className={`px-2.5 py-1 rounded text-xs font-mono transition-all ${
                            state.demandedBy === 'player' && state.demandType === 'reparations'
                              ? 'bg-amber-600 text-white font-bold shadow'
                              : 'bg-[#1e122e] text-[#cbd5e1] hover:text-white border border-[#351e50]'
                          }`}
                        >
                          Reparasi ({reparationsCost} Pts)
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
