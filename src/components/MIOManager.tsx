import React, { useState } from 'react';
import {
  Factory, Award, Zap, Shield, Swords, TrendingUp, Settings2,
  CheckCircle2, ChevronRight, RotateCcw, Info, Sparkles, Sliders,
  Gauge, Anchor, Plane, Hammer
} from 'lucide-react';

export interface MIOTrait {
  id: string;
  name: string;
  tier: number;
  unlocked: boolean;
  costPoints: number;
  statsEffect: {
    softAttack?: number;
    hardAttack?: number;
    breakthrough?: number;
    armor?: number;
    maxSpeed?: number;
    reliability?: number;
    productionCostIC?: number;
    airAttack?: number;
    agility?: number;
  };
  description: string;
}

export interface MIOCompany {
  id: string;
  name: string;
  nation: string;
  type: 'tank' | 'infantry' | 'aircraft' | 'naval';
  icon: string;
  baseSpecialization: string;
  level: number;
  funds: number;
  traits: MIOTrait[];
}

export const MIO_COMPANIES: MIOCompany[] = [
  {
    id: 'porsche',
    name: 'Porsche (Panzer & Heavy Armor Specialist)',
    nation: 'Jerman (German Reich)',
    type: 'tank',
    icon: 'Shield',
    baseSpecialization: 'Heavy Armor & High Firepower Breakthrough',
    level: 3,
    funds: 450,
    traits: [
      {
        id: 'p_t1_armor',
        name: 'Plat Baja Muka Ditebalkan (Hardened Facings)',
        tier: 1,
        unlocked: true,
        costPoints: 100,
        statsEffect: { armor: 10, productionCostIC: 3 },
        description: '+10% Armor Plat Baja, +3% Biaya IC.'
      },
      {
        id: 'p_t2_gun',
        name: 'Dudukan Meriam Kaliber Berat (High-Velocity Mount)',
        tier: 2,
        unlocked: true,
        costPoints: 150,
        statsEffect: { hardAttack: 15, softAttack: 8, breakthrough: 12 },
        description: '+15% Serangan Keras, +12% Terobosan, +8% Serangan Lunak.'
      },
      {
        id: 'p_t3_engine',
        name: 'Transmisi Listrik Hibrida (Electric Drivetrain)',
        tier: 3,
        unlocked: false,
        costPoints: 200,
        statsEffect: { breakthrough: 18, reliability: -10, maxSpeed: 8 },
        description: '+18% Terobosan, +8% Kecepatan, -10% Keandalan (Reliability).'
      },
      {
        id: 'p_t4_sloped',
        name: 'Geometri Armor Miring Ekstrem (Sloped Front Plate)',
        tier: 4,
        unlocked: false,
        costPoints: 300,
        statsEffect: { armor: 20, breakthrough: 15 },
        description: '+20% Armor Total, +15% Breakthrough.'
      }
    ]
  },
  {
    id: 'tankograd',
    name: 'Tankograd / Factory No. 183 (Mass Armor)',
    nation: 'Uni Soviet (USSR)',
    type: 'tank',
    icon: 'Hammer',
    baseSpecialization: 'Mass Production & High Reliability (T-34 Meta)',
    level: 4,
    funds: 600,
    traits: [
      {
        id: 't_t1_mass',
        name: 'Konstruksi Cap Cetak Masal (Stamped Cast Hull)',
        tier: 1,
        unlocked: true,
        costPoints: 100,
        statsEffect: { productionCostIC: -12, reliability: 5 },
        description: '-12% Biaya IC Produksi, +5% Keandalan.'
      },
      {
        id: 't_t2_diesel',
        name: 'Mesin Diesel V-2 Kokoh (Heavy Diesel V-2)',
        tier: 2,
        unlocked: true,
        costPoints: 150,
        statsEffect: { maxSpeed: 10, reliability: 15 },
        description: '+10% Kecepatan Operasional, +15% Keandalan di lumpur rasputitsa.'
      },
      {
        id: 't_t3_assembly',
        name: 'Lini Perakitan Ban Berjalan Ekstrim (Conveyor Assembly)',
        tier: 3,
        unlocked: true,
        costPoints: 200,
        statsEffect: { productionCostIC: -10, softAttack: 5 },
        description: '-10% Biaya IC Tambahan, +5% Serangan Lunak.'
      },
      {
        id: 't_t4_gun',
        name: 'Meriam 85mm D-5T Anti-Panzer',
        tier: 4,
        unlocked: false,
        costPoints: 300,
        statsEffect: { hardAttack: 20, breakthrough: 10 },
        description: '+20% Serangan Keras, +10% Breakthrough.'
      }
    ]
  },
  {
    id: 'supermarine',
    name: 'Supermarine (Fighter Specialist)',
    nation: 'Inggris (United Kingdom)',
    type: 'aircraft',
    icon: 'Plane',
    baseSpecialization: 'High Agility & Speed (Spitfire Meta)',
    level: 2,
    funds: 350,
    traits: [
      {
        id: 's_t1_wing',
        name: 'Sayap Elips Aerodinamis (Elliptical Wing Design)',
        tier: 1,
        unlocked: true,
        costPoints: 100,
        statsEffect: { agility: 12, maxSpeed: 6 },
        description: '+12% Kelincahan (Agility Dogfight), +6% Kecepatan Maks.'
      },
      {
        id: 's_t2_merlin',
        name: 'Mesin Rolls-Royce Supercharged (Merlin Tune)',
        tier: 2,
        unlocked: false,
        costPoints: 150,
        statsEffect: { maxSpeed: 10, airAttack: 5 },
        description: '+10% Kecepatan Udara, +5% Serangan Udara.'
      },
      {
        id: 's_t3_guns',
        name: 'Kombinasi Kanon Hispano 20mm',
        tier: 3,
        unlocked: false,
        costPoints: 220,
        statsEffect: { airAttack: 18, agility: -4 },
        description: '+18% Daya Serang Udara, -4% Kelincahan beban kanon.'
      }
    ]
  },
  {
    id: 'vickers',
    name: 'Vickers-Armstrongs (Capital Ship Specialist)',
    nation: 'Inggris / Global',
    type: 'naval',
    icon: 'Anchor',
    baseSpecialization: 'Capital Battleship Armor & Long Range Shells',
    level: 2,
    funds: 280,
    traits: [
      {
        id: 'v_t1_belt',
        name: 'Sabuk Baja Komposit Krupp-Cemented',
        tier: 1,
        unlocked: true,
        costPoints: 100,
        statsEffect: { armor: 15, reliability: 8 },
        description: '+15% Armor Kapal Tempur, +8% Keandalan Salvo.'
      },
      {
        id: 'v_t2_firecontrol',
        name: 'Sistem Pengarah Tembakan Optik Presisi',
        tier: 2,
        unlocked: false,
        costPoints: 160,
        statsEffect: { hardAttack: 12, softAttack: 10 },
        description: '+12% Heavy Gun Attack, +10% Akurasi Tembakan.'
      }
    ]
  }
];

export const MIOManager: React.FC = () => {
  const [companies, setCompanies] = useState<MIOCompany[]>(MIO_COMPANIES);
  const [activeCompanyId, setActiveCompanyId] = useState<string>('porsche');

  const activeCompany = companies.find(c => c.id === activeCompanyId) || companies[0];

  const handleToggleTrait = (traitId: string) => {
    setCompanies(prev => prev.map(company => {
      if (company.id !== activeCompanyId) return company;

      const targetTrait = company.traits.find(t => t.id === traitId);
      if (!targetTrait) return company;

      if (!targetTrait.unlocked && company.funds < targetTrait.costPoints) {
        return company; // Not enough funds
      }

      const updatedTraits = company.traits.map(t => {
        if (t.id === traitId) {
          return { ...t, unlocked: !t.unlocked };
        }
        return t;
      });

      const fundsDelta = targetTrait.unlocked ? targetTrait.costPoints : -targetTrait.costPoints;

      return {
        ...company,
        funds: Math.max(0, company.funds + fundsDelta),
        traits: updatedTraits
      };
    }));
  };

  const handleAddFunds = (amount: number) => {
    setCompanies(prev => prev.map(company => {
      if (company.id === activeCompanyId) {
        return { ...company, funds: company.funds + amount };
      }
      return company;
    }));
  };

  // Cumulative Stats Modifiers for Active Company
  const cumulativeModifiers = activeCompany.traits
    .filter(t => t.unlocked)
    .reduce((acc, t) => {
      const e = t.statsEffect;
      return {
        softAttack: acc.softAttack + (e.softAttack || 0),
        hardAttack: acc.hardAttack + (e.hardAttack || 0),
        breakthrough: acc.breakthrough + (e.breakthrough || 0),
        armor: acc.armor + (e.armor || 0),
        maxSpeed: acc.maxSpeed + (e.maxSpeed || 0),
        reliability: acc.reliability + (e.reliability || 0),
        productionCostIC: acc.productionCostIC + (e.productionCostIC || 0),
        airAttack: acc.airAttack + (e.airAttack || 0),
        agility: acc.agility + (e.agility || 0),
      };
    }, {
      softAttack: 0,
      hardAttack: 0,
      breakthrough: 0,
      armor: 0,
      maxSpeed: 0,
      reliability: 0,
      productionCostIC: 0,
      airAttack: 0,
      agility: 0,
    });

  return (
    <div className="space-y-6 text-[#f1f5f9]">
      {/* Header Banner */}
      <div className="rounded-xl border border-emerald-500/40 bg-gradient-to-r from-[#0d1e14] via-[#0f241a] to-[#08150d] p-5 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 shadow-inner">
              <Factory className="h-7 w-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-serif text-xl sm:text-2xl font-black tracking-tight text-[#fef3c7] uppercase">
                  Manajer MIO (Military Industrial Organization)
                </h2>
                <span className="rounded bg-emerald-500/20 border border-emerald-500/40 px-2 py-0.5 text-[11px] font-mono text-emerald-300 font-bold">
                  DLC ARMS AGAINST TYRANNY SYSTEM
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#cbd5e1] mt-0.5">
                Pilih desainer industri militer (Porsche, Tankograd, Supermarine, Vickers), buka pohon peningkatan fasilitas senjata, dan tingkatkan statistik divisi dan armada tempur Anda.
              </p>
            </div>
          </div>

          {/* Quick Fund Granter */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleAddFunds(100)}
              className="px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30 text-xs font-mono font-bold transition-all shadow"
            >
              +100 Dana MIO (Production Funds)
            </button>
          </div>
        </div>
      </div>

      {/* MIO Selector Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {companies.map(comp => (
          <button
            key={comp.id}
            onClick={() => setActiveCompanyId(comp.id)}
            className={`p-3 rounded-xl border text-left transition-all ${
              activeCompanyId === comp.id
                ? 'border-emerald-500/80 bg-[#12281b] shadow-lg ring-1 ring-emerald-500/50'
                : 'border-[#1e3428] bg-[#0c1a12] text-[#94a3b8] hover:text-white hover:border-[#2a4a37]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-emerald-400 font-bold">Lv. {comp.level}</span>
              <span className="text-[10px] font-mono uppercase bg-[#173022] px-1.5 py-0.5 rounded text-[#cbd5e1]">
                {comp.type}
              </span>
            </div>
            <h4 className="font-bold text-white text-sm mt-1 truncate">{comp.name.split(' (')[0]}</h4>
            <span className="text-[11px] text-[#94a3b8] block truncate">{comp.nation}</span>
          </button>
        ))}
      </div>

      {/* Main Detail & Trait Tree Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Trait Progression Tree */}
        <div className="lg:col-span-8 space-y-4">
          <div className="rounded-xl border border-[#1e3428] bg-[#0b1710] p-4 sm:p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-[#172c1f] pb-3">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#fef3c7]">{activeCompany.name}</h3>
                <span className="text-xs text-[#94a3b8]">
                  Spesialisasi: <strong className="text-emerald-300">{activeCompany.baseSpecialization}</strong>
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-[#94a3b8] block font-mono">Saldo Dana MIO:</span>
                <span className="text-lg font-mono font-bold text-emerald-400">
                  {activeCompany.funds} Poin
                </span>
              </div>
            </div>

            {/* Trait Cards */}
            <div className="space-y-3">
              {activeCompany.traits.map(trait => {
                const canAfford = activeCompany.funds >= trait.costPoints;
                return (
                  <div
                    key={trait.id}
                    className={`p-3.5 rounded-xl border transition-all ${
                      trait.unlocked
                        ? 'border-emerald-500/60 bg-[#12281c]'
                        : 'border-[#172c1f] bg-[#0c1811] opacity-80 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#173022] border border-[#234d35] text-emerald-300">
                            Tier {trait.tier}
                          </span>
                          <h4 className="font-bold text-white text-sm">{trait.name}</h4>
                        </div>
                        <p className="text-xs text-[#cbd5e1] mt-1">{trait.description}</p>
                      </div>

                      <button
                        onClick={() => handleToggleTrait(trait.id)}
                        disabled={!trait.unlocked && !canAfford}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all shrink-0 ${
                          trait.unlocked
                            ? 'bg-red-500/20 text-red-300 border border-red-500/40 hover:bg-red-500/30'
                            : canAfford
                            ? 'bg-emerald-500 text-black hover:bg-emerald-400 shadow'
                            : 'bg-[#182a1f] text-[#64748b] cursor-not-allowed border border-[#223b2b]'
                        }`}
                      >
                        {trait.unlocked ? 'Batalkan' : `Buka (${trait.costPoints} Poin)`}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Live Cumulative Equipment Modifiers Preview */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-xl border border-[#1e3428] bg-[#0b1710] p-4 sm:p-5 shadow-lg space-y-4">
            <div className="border-b border-[#172c1f] pb-3">
              <h3 className="font-serif text-base font-bold text-[#fef3c7] flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-emerald-400" /> Total Bonus Modifikator Unit
              </h3>
              <p className="text-xs text-[#94a3b8] mt-0.5">
                Bonus langsung yang diterapkan pada lini produksi peralatan militer aktif Anda.
              </p>
            </div>

            <div className="space-y-2 text-xs font-mono">
              {cumulativeModifiers.softAttack !== 0 && (
                <div className="flex justify-between p-2 rounded bg-[#0e1f15] border border-[#1a3826]">
                  <span className="text-[#94a3b8]">Soft Attack (Serangan Lunak):</span>
                  <strong className="text-emerald-400">+{cumulativeModifiers.softAttack}%</strong>
                </div>
              )}
              {cumulativeModifiers.hardAttack !== 0 && (
                <div className="flex justify-between p-2 rounded bg-[#0e1f15] border border-[#1a3826]">
                  <span className="text-[#94a3b8]">Hard Attack (Serangan Keras):</span>
                  <strong className="text-emerald-400">+{cumulativeModifiers.hardAttack}%</strong>
                </div>
              )}
              {cumulativeModifiers.breakthrough !== 0 && (
                <div className="flex justify-between p-2 rounded bg-[#0e1f15] border border-[#1a3826]">
                  <span className="text-[#94a3b8]">Breakthrough (Terobosan):</span>
                  <strong className="text-emerald-400">+{cumulativeModifiers.breakthrough}%</strong>
                </div>
              )}
              {cumulativeModifiers.armor !== 0 && (
                <div className="flex justify-between p-2 rounded bg-[#0e1f15] border border-[#1a3826]">
                  <span className="text-[#94a3b8]">Armor Ketebalan Baja:</span>
                  <strong className="text-emerald-400">+{cumulativeModifiers.armor}%</strong>
                </div>
              )}
              {cumulativeModifiers.maxSpeed !== 0 && (
                <div className="flex justify-between p-2 rounded bg-[#0e1f15] border border-[#1a3826]">
                  <span className="text-[#94a3b8]">Kecepatan Operasional:</span>
                  <strong className="text-emerald-400">+{cumulativeModifiers.maxSpeed}%</strong>
                </div>
              )}
              {cumulativeModifiers.reliability !== 0 && (
                <div className="flex justify-between p-2 rounded bg-[#0e1f15] border border-[#1a3826]">
                  <span className="text-[#94a3b8]">Keandalan (Reliability):</span>
                  <strong className={cumulativeModifiers.reliability >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                    {cumulativeModifiers.reliability >= 0 ? `+${cumulativeModifiers.reliability}%` : `${cumulativeModifiers.reliability}%`}
                  </strong>
                </div>
              )}
              {cumulativeModifiers.productionCostIC !== 0 && (
                <div className="flex justify-between p-2 rounded bg-[#0e1f15] border border-[#1a3826]">
                  <span className="text-[#94a3b8]">Biaya Produksi Pabrik (IC):</span>
                  <strong className={cumulativeModifiers.productionCostIC <= 0 ? 'text-emerald-400' : 'text-amber-400'}>
                    {cumulativeModifiers.productionCostIC > 0 ? `+${cumulativeModifiers.productionCostIC}%` : `${cumulativeModifiers.productionCostIC}%`}
                  </strong>
                </div>
              )}
              {cumulativeModifiers.agility !== 0 && (
                <div className="flex justify-between p-2 rounded bg-[#0e1f15] border border-[#1a3826]">
                  <span className="text-[#94a3b8]">Kelincahan Pesawat (Agility):</span>
                  <strong className="text-emerald-400">+{cumulativeModifiers.agility}%</strong>
                </div>
              )}
              {cumulativeModifiers.airAttack !== 0 && (
                <div className="flex justify-between p-2 rounded bg-[#0e1f15] border border-[#1a3826]">
                  <span className="text-[#94a3b8]">Daya Serang Kanon Udara:</span>
                  <strong className="text-emerald-400">+{cumulativeModifiers.airAttack}%</strong>
                </div>
              )}
            </div>

            <div className="p-3 rounded-lg bg-[#0e1f15] border border-[#1a3826] text-xs space-y-1">
              <span className="font-bold text-emerald-300 text-[11px] font-mono flex items-center gap-1">
                <Info className="h-3.5 w-3.5 text-emerald-400" /> Pro-Tip Penggunaan MIO:
              </span>
              <p className="text-[11px] text-[#cbd5e1] leading-relaxed">
                Menugaskan MIO ke lini produksi tank atau pesawat Anda akan otomatis menaikkan level organisasi seiring volume produksi pabrik selesai dibangun.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
