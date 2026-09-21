import React, { useState, useMemo } from 'react';
import {
  Boxes, Users, Fuel, Factory, Shield, Plus, Trash2,
  Copy, Check, AlertTriangle, TrendingUp, Sparkles,
  RotateCcw, Sliders, DollarSign, Train, Anchor, Info,
  CheckCircle2, Flame
} from 'lucide-react';
import { DIVISION_PRESETS } from '../data/divisionData';

interface ArmyOrderItem {
  id: string;
  presetId: string;
  count: number;
}

export const ArmyLogisticsCalculator: React.FC = () => {
  // Initial Army composition
  const [armyOrders, setArmyOrders] = useState<ArmyOrderItem[]>([
    { id: 'order-1', presetId: 'inf-9-1', count: 24 }, // 24x 18w Frontline Infantry
    { id: 'order-2', presetId: 'armor-spearhead-30w', count: 6 }, // 6x 30w Medium Tank Spearhead
    { id: 'order-3', presetId: 'garrison-port-10w', count: 12 } // 12x Port Garrison
  ]);

  // Operational Conditions
  const [attritionRate, setAttritionRate] = useState<number>(2); // 2% combat attrition
  const [combatActivityPercent, setCombatActivityPercent] = useState<number>(60); // 60% active combat/moving
  const [availableMils, setAvailableMils] = useState<number>(45); // Military factories available
  const [isOverseas, setIsOverseas] = useState<boolean>(false);
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);

  // Quick army templates
  const PRESET_ARMIES = [
    {
      name: '1 Korps Infanteri Standar (24 Divisi)',
      orders: [{ id: 'po-1', presetId: 'inf-9-1', count: 24 }]
    },
    {
      name: '1 Korps Lapis Baja Serbu (18 Inf + 6 Tank)',
      orders: [
        { id: 'po-1', presetId: 'inf-9-1', count: 18 },
        { id: 'po-2', presetId: 'armor-spearhead-30w', count: 6 }
      ]
    },
    {
      name: '1 Tentara Lapangan Campuran (48 Divisi)',
      orders: [
        { id: 'po-1', presetId: 'inf-9-1', count: 32 },
        { id: 'po-2', presetId: 'armor-spearhead-30w', count: 8 },
        { id: 'po-3', presetId: 'special-mountaineer-18w', count: 4 },
        { id: 'po-4', presetId: 'special-marine-24w', count: 4 }
      ]
    },
    {
      name: 'Grup Angkatan Darat Barbarossa (120 Divisi)',
      orders: [
        { id: 'po-1', presetId: 'inf-9-1', count: 72 },
        { id: 'po-2', presetId: 'armor-spearhead-30w', count: 16 },
        { id: 'po-3', presetId: 'inf-artillery-shock-27w', count: 12 },
        { id: 'po-4', presetId: 'garrison-port-10w', count: 20 }
      ]
    }
  ];

  // Helper to get preset details
  const getPreset = (presetId: string) => {
    return DIVISION_PRESETS.find(p => p.id === presetId) || DIVISION_PRESETS[0];
  };

  // Add order row
  const handleAddOrder = () => {
    const newId = `order-${Date.now()}`;
    setArmyOrders(prev => [...prev, { id: newId, presetId: 'inf-9-1', count: 6 }]);
  };

  // Remove order row
  const handleRemoveOrder = (id: string) => {
    if (armyOrders.length <= 1) return;
    setArmyOrders(prev => prev.filter(o => o.id !== id));
  };

  // Update order count
  const handleUpdateCount = (id: string, count: number) => {
    setArmyOrders(prev => prev.map(o => o.id === id ? { ...o, count: Math.max(1, count) } : o));
  };

  // Update order template
  const handleUpdateTemplate = (id: string, presetId: string) => {
    setArmyOrders(prev => prev.map(o => o.id === id ? { ...o, presetId } : o));
  };

  // Load preset army
  const handleLoadPresetArmy = (orders: { id: string; presetId: string; count: number }[]) => {
    setArmyOrders(orders.map((o, i) => ({ id: `order-${Date.now()}-${i}`, presetId: o.presetId, count: o.count })));
  };

  // Calculations
  const calculations = useMemo(() => {
    let totalDivisions = 0;
    let totalActiveManpower = 0;
    let totalIC = 0;
    let totalDailySupply = 0;
    let totalBaseFuelConsumption = 0; // liters per day
    let totalTrainsNeeded = 0;
    let totalConvoysNeeded = 0;

    // Equipment aggregated map
    const equipmentMap: { [key: string]: { name: string; count: number; icTotal: number; icon: string } } = {
      'Infantry Equipment': { name: 'Infantry Equipment (Senapan)', count: 0, icTotal: 0, icon: '🔫' },
      'Artillery Equipment': { name: 'Artillery Equipment (Meriam)', count: 0, icTotal: 0, icon: '💣' },
      'Support Equipment': { name: 'Support Equipment (Peralatan)', count: 0, icTotal: 0, icon: '📦' },
      'Motorized Trucks': { name: 'Truk Bermotor (Trucks)', count: 0, icTotal: 0, icon: '🚚' },
      'Tanks': { name: 'Tank & Lapis Baja', count: 0, icTotal: 0, icon: '🛡️' },
      'Anti-Air Equipment': { name: 'Anti-Air (Meriam Penangkis Udara)', count: 0, icTotal: 0, icon: '🎯' },
      'Anti-Tank Equipment': { name: 'Anti-Tank Guns', count: 0, icTotal: 0, icon: '🚀' }
    };

    armyOrders.forEach(order => {
      const preset = getPreset(order.presetId);
      const divCount = order.count;
      totalDivisions += divCount;

      // Manpower per division
      const divManpower = preset.battalions.reduce((acc, b) => acc + (b.count * (b.iconType === 'infantry' ? 1000 : 500)), 0) + (preset.supportCompanies.length * 300);
      totalActiveManpower += divManpower * divCount;

      // IC
      const divIC = parseInt(preset.stats.costIC.replace(/,/g, ''), 10) || 750;
      totalIC += divIC * divCount;

      // Supply
      const divSupply = parseFloat(preset.stats.supplyUse) || 0.8;
      totalDailySupply += divSupply * divCount;

      // Fuel consumption estimate
      const hasTanks = preset.battalions.some(b => b.name.toLowerCase().includes('tank') || b.iconType === 'armor');
      const hasMotorized = preset.battalions.some(b => b.name.toLowerCase().includes('motor') || b.iconType === 'motorized');
      if (hasTanks) {
        totalBaseFuelConsumption += 2800 * divCount; // 2800L fuel/day per tank division
      } else if (hasMotorized) {
        totalBaseFuelConsumption += 1200 * divCount; // 1200L fuel/day per motorized division
      }

      // Equipment distribution
      if (hasTanks) {
        equipmentMap['Tanks'].count += 350 * divCount;
        equipmentMap['Tanks'].icTotal += 350 * 12 * divCount;
        equipmentMap['Motorized Trucks'].count += 100 * divCount;
        equipmentMap['Motorized Trucks'].icTotal += 100 * 2.5 * divCount;
      }
      if (hasMotorized && !hasTanks) {
        equipmentMap['Motorized Trucks'].count += 220 * divCount;
        equipmentMap['Motorized Trucks'].icTotal += 220 * 2.5 * divCount;
      }

      // General equipment
      const infantryRifles = preset.battalions.reduce((acc, b) => acc + (b.iconType === 'infantry' ? b.count * 100 : 30), 0);
      equipmentMap['Infantry Equipment'].count += infantryRifles * divCount;
      equipmentMap['Infantry Equipment'].icTotal += Math.round(infantryRifles * 0.45 * divCount);

      const artyPieces = preset.battalions.reduce((acc, b) => acc + (b.name.toLowerCase().includes('artillery') ? b.count * 36 : 0), 0) + (preset.supportCompanies.some(s => s.includes('Artillery')) ? 24 : 0);
      equipmentMap['Artillery Equipment'].count += artyPieces * divCount;
      equipmentMap['Artillery Equipment'].icTotal += Math.round(artyPieces * 3.88 * divCount);

      const supportItems = preset.supportCompanies.length * 30;
      equipmentMap['Support Equipment'].count += supportItems * divCount;
      equipmentMap['Support Equipment'].icTotal += Math.round(supportItems * 4.0 * divCount);

      if (preset.supportCompanies.some(s => s.includes('Anti-Air'))) {
        equipmentMap['Anti-Air Equipment'].count += 20 * divCount;
        equipmentMap['Anti-Air Equipment'].icTotal += 20 * 3.33 * divCount;
      }

      if (preset.supportCompanies.some(s => s.includes('Anti-Tank'))) {
        equipmentMap['Anti-Tank Equipment'].count += 24 * divCount;
        equipmentMap['Anti-Tank Equipment'].icTotal += 24 * 5.0 * divCount;
      }
    });

    // Logistics requirements
    // 1 Train transports ~15-20 supply points
    totalTrainsNeeded = Math.max(5, Math.ceil(totalDailySupply / 12));
    // Convoys: ~5 convoys per infantry division, ~15 per tank division for overseas
    totalConvoysNeeded = Math.ceil(totalDivisions * 7.5);

    // Fuel under combat vs stationary
    const combatMultiplier = 0.2 + (0.8 * (combatActivityPercent / 100));
    const effectiveDailyFuelLiters = Math.round(totalBaseFuelConsumption * combatMultiplier);
    const dailyFuelBarrels = (effectiveDailyFuelLiters / 159).toFixed(0);

    // Monthly Attrition & Losses
    const monthlyManpowerLoss = Math.round(totalActiveManpower * (attritionRate / 100) * 0.4);
    const monthlyICLoss = Math.round(totalIC * (attritionRate / 100) * 0.35);

    // RAW STRATEGIC RESOURCES NEEDED FOR MILITARY FACTORIES
    // Steel (Baja): Senapan, Artileri, Tank, Truk
    const steelNeeded = Math.ceil(
      (equipmentMap['Infantry Equipment'].count * 0.00035) +
      (equipmentMap['Artillery Equipment'].count * 0.015) +
      (equipmentMap['Tanks'].count * 0.02) +
      (equipmentMap['Motorized Trucks'].count * 0.008) +
      (availableMils * 0.5)
    );

    // Tungsten: Artileri & Tank
    const tungstenNeeded = Math.ceil(
      (equipmentMap['Artillery Equipment'].count * 0.008) +
      (equipmentMap['Tanks'].count * 0.012) +
      (availableMils * 0.2)
    );

    // Aluminium: Support equipment & Radio
    const aluminiumNeeded = Math.ceil(
      (equipmentMap['Support Equipment'].count * 0.006) +
      (availableMils * 0.15)
    );

    // Rubber (Karet): Truk bermotor, tank, support
    const rubberNeeded = Math.ceil(
      (equipmentMap['Motorized Trucks'].count * 0.009) +
      (equipmentMap['Tanks'].count * 0.005) +
      (availableMils * 0.12)
    );

    // Chromium: Heavy armor plating
    const chromiumNeeded = Math.ceil(equipmentMap['Tanks'].count * 0.004);

    // Civ factories to import if resource deficient
    const totalResourceUnits = steelNeeded + tungstenNeeded + aluminiumNeeded + rubberNeeded + chromiumNeeded;
    const estimatedCivsForTrade = Math.ceil(totalResourceUnits / 8);

    // Military factories needed to sustain replacement
    const baseOutputPerFactoryPerDay = 4.5;
    const monthlyICProductionPerMil = baseOutputPerFactoryPerDay * 30 * 0.5; // at 50% efficiency
    const milsNeededForReplacement = Math.max(1, Math.ceil(monthlyICLoss / monthlyICProductionPerMil));

    return {
      totalDivisions,
      totalActiveManpower,
      recommendedReserveManpower: Math.round(totalActiveManpower * 0.15),
      totalIC,
      totalDailySupply: totalDailySupply.toFixed(1),
      effectiveDailyFuelLiters: effectiveDailyFuelLiters.toLocaleString(),
      dailyFuelBarrels,
      totalTrainsNeeded,
      totalConvoysNeeded,
      monthlyManpowerLoss,
      monthlyICLoss,
      equipmentList: Object.values(equipmentMap).filter(eq => eq.count > 0),
      resources: {
        steel: Math.max(8, steelNeeded),
        tungsten: Math.max(4, tungstenNeeded),
        aluminium: Math.max(2, aluminiumNeeded),
        rubber: Math.max(2, rubberNeeded),
        chromium: Math.max(0, chromiumNeeded),
        estimatedCivsForTrade
      },
      milsNeededForReplacement
    };
  }, [armyOrders, attritionRate, combatActivityPercent, availableMils, isOverseas]);

  // Copy full summary
  const handleCopySummary = () => {
    const text = `[HOI4 KALKULATOR LOGISTIK & KONSUMSI SUMBER DAYA ANGKATAN DARAT]
Komposisi Pasukan: ${calculations.totalDivisions} Divisi
${armyOrders.map(o => `• ${o.count}x ${getPreset(o.presetId).name}`).join('\n')}

👥 KEBUTUHAN MANPOWER:
• Prajurit Aktif di Garis Depan: ${calculations.totalActiveManpower.toLocaleString()} orang
• Cadangan Korban Jiwa Disarankan (+15%): ${calculations.recommendedReserveManpower.toLocaleString()} orang
• Estimasi Gugur Akibat Atrisi Bulanan (${attritionRate}%): ~${calculations.monthlyManpowerLoss.toLocaleString()} orang/bulan

📦 KEBUTUHAN INVENTARIS PERALATAN (TOTAL STOK):
${calculations.equipmentList.map(eq => `• ${eq.name}: ${eq.count.toLocaleString()} unit (${eq.icTotal.toLocaleString()} IC)`).join('\n')}

⛏️ KONSUMSI BAHAN BAKU STRATEGIS UNTUK PABRIK:
• Baja (Steel): ${calculations.resources.steel} unit
• Tungsten: ${calculations.resources.tungsten} unit
• Aluminium: ${calculations.resources.aluminium} unit
• Karet (Rubber): ${calculations.resources.rubber} unit
• Chromium: ${calculations.resources.chromium} unit
• Estimasi Pabrik Sipil (Civs) untuk Impor Dagang: ~${calculations.resources.estimatedCivsForTrade} Civs

🚚 LOGISTIK & TRANSPORTASI:
• Konsumsi Suplai Harian: ${calculations.totalDailySupply} poin suplai/hari
• Konsumsi Bahan Bakar Harian: ${calculations.effectiveDailyFuelLiters} Liter (${calculations.dailyFuelBarrels} barel/hari)
• Kereta Api Suplai Dibutuhkan: ${calculations.totalTrainsNeeded} Kereta Api
• Konvoi Kapal Dibutuhkan: ${calculations.totalConvoysNeeded} Konvoi Kapal
• Pabrik Militer Minimum untuk Menambal Kerugian Perang: ${calculations.milsNeededForReplacement} Mils`;

    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="rounded-xl border border-[#223344] bg-[#111923] p-4 shadow-xl shadow-black/40">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2">
            <Boxes className="h-5 w-5 text-[#f59e0b]" />
            <div>
              <h2 className="text-base sm:text-lg font-black text-[#f8fafc] tracking-tight">
                Kalkulator Logistik &amp; Konsumsi Sumber Daya Angkatan Darat
              </h2>
              <p className="text-xs text-[#94a3b8]">
                Hitung kebutuhan Manpower, konsumsi bahan bakar, kereta suplai, dan bahan baku strategis (Baja, Tungsten, Karet) untuk seluruh korps atau tentara lapangan Anda.
              </p>
            </div>
          </div>

          <button
            onClick={handleCopySummary}
            className="self-start sm:self-center flex items-center gap-1.5 rounded-lg border border-[#334155] bg-[#0c141d] px-3 py-1.5 text-xs font-semibold text-[#cbd5e1] hover:border-[#10b981] hover:text-[#f8fafc] transition-all shadow-sm"
          >
            {copiedSummary ? <Check className="h-3.5 w-3.5 text-[#22c55e]" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copiedSummary ? 'Tersalin!' : 'Salin Laporan Logistik'}</span>
          </button>
        </div>

        {/* Quick Army Presets */}
        <div className="mt-4 pt-4 border-t border-[#1e2a38] flex items-center gap-2 flex-wrap">
          <span className="font-mono text-xs font-bold uppercase text-[#64748b] flex items-center gap-1">
            <Sparkles className="h-3.5 w-3.5 text-[#fbbf24]" />
            Preset Komposisi Pasukan:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {PRESET_ARMIES.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => handleLoadPresetArmy(preset.orders)}
                className="rounded-lg border border-[#1e2a38] bg-[#0c141d] px-2.5 py-1 text-xs text-[#cbd5e1] hover:border-[#f59e0b] hover:text-[#f8fafc] transition-colors"
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Army Composition Builder (Left) & Live Logistics HUD (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Army Composition Builder & Conditions (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Composition Table Card */}
          <div className="rounded-xl border border-[#223344] bg-[#111923] p-4 space-y-4 shadow-xl shadow-black/40">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#64748b] flex items-center gap-1.5">
                <Users className="h-4 w-4 text-[#38bdf8]" />
                Daftar Divisi Pasukan ({calculations.totalDivisions} Divisi Terpasang)
              </span>

              <button
                onClick={handleAddOrder}
                className="flex items-center gap-1 rounded-lg border border-[#38bdf8]/40 bg-[#0c2438] px-2.5 py-1 text-xs font-semibold text-[#7dd3fc] hover:bg-[#10314c] transition-colors"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Tambah Tipe Divisi</span>
              </button>
            </div>

            {/* Division Rows */}
            <div className="space-y-2.5">
              {armyOrders.map((order, idx) => {
                const currentPreset = getPreset(order.presetId);
                const divManpower = currentPreset.battalions.reduce((acc, b) => acc + (b.count * (b.iconType === 'infantry' ? 1000 : 500)), 0) + (currentPreset.supportCompanies.length * 300);

                return (
                  <div
                    key={order.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-lg border border-[#1e2a38] bg-[#0c141d] p-3 hover:border-[#33465b] transition-colors"
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1e2a38] font-mono text-[10px] font-bold text-[#94a3b8]">
                        {idx + 1}
                      </span>

                      <div className="flex-1 min-w-0">
                        <select
                          value={order.presetId}
                          onChange={e => handleUpdateTemplate(order.id, e.target.value)}
                          className="w-full rounded border border-[#223344] bg-[#111923] py-1.5 px-2 text-xs font-bold text-[#f8fafc] outline-none focus:border-[#f59e0b]"
                        >
                          {DIVISION_PRESETS.map(p => (
                            <option key={p.id} value={p.id}>
                              {p.name} ({p.combatWidth}w • {p.role})
                            </option>
                          ))}
                        </select>
                        <div className="text-[11px] text-[#64748b] font-mono mt-0.5 flex gap-2">
                          <span>{currentPreset.stats.costIC} IC</span>
                          <span>•</span>
                          <span>{divManpower.toLocaleString()} Manpower</span>
                          <span>•</span>
                          <span>{currentPreset.stats.supplyUse} Suplai</span>
                        </div>
                      </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      <div className="flex items-center gap-1">
                        <label className="text-[11px] font-mono text-[#94a3b8]">Jumlah:</label>
                        <input
                          type="number"
                          min={1}
                          max={200}
                          value={order.count}
                          onChange={e => handleUpdateCount(order.id, parseInt(e.target.value) || 1)}
                          className="w-16 rounded border border-[#223344] bg-[#111923] py-1 px-2 text-center text-xs font-mono font-bold text-[#f8fafc] outline-none focus:border-[#f59e0b]"
                        />
                        <span className="text-[11px] font-mono text-[#64748b]">div</span>
                      </div>

                      <button
                        onClick={() => handleRemoveOrder(order.id)}
                        disabled={armyOrders.length <= 1}
                        className="rounded p-1 text-[#64748b] hover:bg-[#2b1216] hover:text-[#ef4444] disabled:opacity-30 transition-colors"
                        title="Hapus baris ini"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Operational Environment & Attrition Factors */}
          <div className="rounded-xl border border-[#223344] bg-[#111923] p-4 space-y-4 shadow-xl shadow-black/40">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#64748b] flex items-center gap-1.5">
              <Sliders className="h-4 w-4 text-[#ec4899]" />
              Parameter Kondisi Operasional &amp; Teater Tempur
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              {/* Combat Attrition Slider */}
              <div className="space-y-1.5 rounded-lg border border-[#1e2a38] bg-[#0c141d] p-3">
                <div className="flex justify-between items-center text-[#cbd5e1]">
                  <span>Tingkat Atrisi Medan:</span>
                  <span className="font-bold text-[#f87171]">{attritionRate}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={10}
                  step={0.5}
                  value={attritionRate}
                  onChange={e => setAttritionRate(parseFloat(e.target.value))}
                  className="w-full accent-[#ef4444] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#64748b]">
                  <span>0% (Damai/Siaga)</span>
                  <span>2% (Standar)</span>
                  <span>5% (Lumpur/Gurun)</span>
                  <span>10% (Terkepung)</span>
                </div>
              </div>

              {/* Combat Activity (Fuel burn) Slider */}
              <div className="space-y-1.5 rounded-lg border border-[#1e2a38] bg-[#0c141d] p-3">
                <div className="flex justify-between items-center text-[#cbd5e1]">
                  <span>Aktivitas Manuver Tempur:</span>
                  <span className="font-bold text-[#fde047]">{combatActivityPercent}%</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={100}
                  step={5}
                  value={combatActivityPercent}
                  onChange={e => setCombatActivityPercent(parseInt(e.target.value))}
                  className="w-full accent-[#eab308] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#64748b]">
                  <span>10% (Stasioner)</span>
                  <span>60% (Ofensif Parsial)</span>
                  <span>100% (Blitzkrieg Penuh)</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              {/* Military Factories Available */}
              <div className="space-y-1.5 rounded-lg border border-[#1e2a38] bg-[#0c141d] p-3">
                <div className="flex justify-between items-center text-[#cbd5e1]">
                  <span>Pabrik Militer (Mils) Aktif:</span>
                  <span className="font-bold text-[#4ade80]">{availableMils} Mils</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={120}
                  step={5}
                  value={availableMils}
                  onChange={e => setAvailableMils(parseInt(e.target.value))}
                  className="w-full accent-[#22c55e] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#64748b]">
                  <span>10 Mils</span>
                  <span>45 Mils</span>
                  <span>120 Mils</span>
                </div>
              </div>

              {/* Overseas Transport Toggle */}
              <div className="rounded-lg border border-[#1e2a38] bg-[#0c141d] p-3 flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#cbd5e1] flex items-center gap-1.5">
                    <Anchor className="h-4 w-4 text-[#38bdf8]" />
                    <span>Teater Seberang Laut</span>
                  </div>
                  <div className="text-[10px] text-[#64748b] mt-0.5">
                    Membutuhkan konvoi kapal untuk suplai &amp; rotasi
                  </div>
                </div>

                <button
                  onClick={() => setIsOverseas(!isOverseas)}
                  className={`rounded-lg px-3 py-1.5 font-bold transition-all ${
                    isOverseas
                      ? 'border border-[#38bdf8] bg-[#0c2438] text-[#7dd3fc]'
                      : 'border border-[#334155] bg-[#111923] text-[#64748b]'
                  }`}
                >
                  {isOverseas ? 'Aktif' : 'Darat Saja'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Calculated Logistics HUD (5 cols) */}
        <div className="lg:col-span-5 space-y-4 sticky top-4">
          {/* Main Aggregate Stats Card */}
          <div className="rounded-xl border border-[#223344] bg-[#111923] shadow-xl shadow-black/50 overflow-hidden">
            <div className="border-b border-[#1f2d3d] bg-gradient-to-r from-[#172230] to-[#121a24] p-4">
              <div className="flex items-center gap-2">
                <Factory className="h-5 w-5 text-[#f59e0b]" />
                <h3 className="font-bold text-sm sm:text-base text-[#f8fafc] tracking-tight">
                  Neraca Logistik &amp; Kebutuhan Sumber Daya
                </h3>
              </div>
              <p className="text-xs text-[#94a3b8]">
                Berdasarkan total <strong>{calculations.totalDivisions} divisi</strong> dalam angkatan darat Anda.
              </p>
            </div>

            <div className="p-4 space-y-4 text-xs font-mono">
              {/* Manpower Breakdown Box */}
              <div className="rounded-lg border border-[#38bdf8]/40 bg-[#0d2133] p-3 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-[#7dd3fc]">
                  <span className="flex items-center gap-1.5">
                    <Users className="h-4 w-4" />
                    Manpower di Lapangan:
                  </span>
                  <span className="text-sm font-black text-[#e0f2fe]">
                    {calculations.totalActiveManpower.toLocaleString()} Orang
                  </span>
                </div>

                <div className="pt-2 border-t border-[#1e3a54] space-y-1 text-[11px]">
                  <div className="flex justify-between text-[#94a3b8]">
                    <span>Cadangan Pengganti (+15%):</span>
                    <span className="text-[#38bdf8]">+{calculations.recommendedReserveManpower.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[#94a3b8]">
                    <span>Gugur Akibat Atrisi ({attritionRate}%):</span>
                    <span className="text-[#f87171]">~{calculations.monthlyManpowerLoss.toLocaleString()} /bulan</span>
                  </div>
                </div>
              </div>

              {/* Fuel and Supply Demands */}
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="rounded-lg border border-[#f59e0b]/40 bg-[#261e12] p-2.5">
                  <div className="text-[10px] uppercase font-bold text-[#fde047] flex items-center justify-center gap-1">
                    <Fuel className="h-3 w-3" />
                    Bahan Bakar
                  </div>
                  <div className="text-sm font-black text-[#fef08a] mt-0.5">
                    {calculations.dailyFuelBarrels}
                  </div>
                  <div className="text-[9px] text-[#94a3b8]">Barel/Hari ({calculations.effectiveDailyFuelLiters} L)</div>
                </div>

                <div className="rounded-lg border border-[#10b981]/40 bg-[#0f291e] p-2.5">
                  <div className="text-[10px] uppercase font-bold text-[#86efac] flex items-center justify-center gap-1">
                    <Boxes className="h-3 w-3" />
                    Suplai Hub
                  </div>
                  <div className="text-sm font-black text-[#bbf7d0] mt-0.5">
                    {calculations.totalDailySupply}
                  </div>
                  <div className="text-[9px] text-[#94a3b8]">Poin Suplai / Hari</div>
                </div>
              </div>

              {/* Transportation Network Needs */}
              <div className="rounded-lg border border-[#1e2a38] bg-[#0c141d] p-3 space-y-1.5 text-[11px]">
                <div className="flex items-center justify-between">
                  <span className="text-[#94a3b8] flex items-center gap-1">
                    <Train className="h-3.5 w-3.5 text-[#cbd5e1]" />
                    Kereta Api Suplai:
                  </span>
                  <span className="font-bold text-[#f8fafc]">{calculations.totalTrainsNeeded} Kereta Api</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#94a3b8] flex items-center gap-1">
                    <Anchor className="h-3.5 w-3.5 text-[#38bdf8]" />
                    Konvoi Transportasi:
                  </span>
                  <span className="font-bold text-[#38bdf8]">{calculations.totalConvoysNeeded} Kapal Konvoi</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#94a3b8] flex items-center gap-1">
                    <Factory className="h-3.5 w-3.5 text-[#4ade80]" />
                    Mils untuk Menambal Atrisi:
                  </span>
                  <span className="font-bold text-[#4ade80]">~{calculations.milsNeededForReplacement} Pabrik Militer</span>
                </div>
              </div>

              {/* RAW STRATEGIC RESOURCES GRID */}
              <div className="space-y-2">
                <span className="font-bold uppercase tracking-wider text-[#64748b] text-[11px] block">
                  Kebutuhan Bahan Baku Pabrik (Raw Resources):
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-center text-[11px]">
                  <div className="rounded border border-[#1e293b] bg-[#0c141d] p-2">
                    <div className="text-[#94a3b8] font-bold">Baja (Steel)</div>
                    <div className="text-sm font-black text-[#e2e8f0] mt-0.5">{calculations.resources.steel}</div>
                    <div className="text-[9px] text-[#64748b]">Senapan &amp; Tank</div>
                  </div>

                  <div className="rounded border border-[#1e293b] bg-[#0c141d] p-2">
                    <div className="text-[#fbbf24] font-bold">Tungsten</div>
                    <div className="text-sm font-black text-[#fef08a] mt-0.5">{calculations.resources.tungsten}</div>
                    <div className="text-[9px] text-[#64748b]">Artileri &amp; Amunisi</div>
                  </div>

                  <div className="rounded border border-[#1e293b] bg-[#0c141d] p-2">
                    <div className="text-[#60a5fa] font-bold">Aluminium</div>
                    <div className="text-sm font-black text-[#bfdbfe] mt-0.5">{calculations.resources.aluminium}</div>
                    <div className="text-[9px] text-[#64748b]">Support Equipment</div>
                  </div>

                  <div className="rounded border border-[#1e293b] bg-[#0c141d] p-2">
                    <div className="text-[#34d399] font-bold">Karet (Rubber)</div>
                    <div className="text-sm font-black text-[#a7f3d0] mt-0.5">{calculations.resources.rubber}</div>
                    <div className="text-[9px] text-[#64748b]">Ban Truk &amp; Suspensi</div>
                  </div>

                  <div className="rounded border border-[#1e293b] bg-[#0c141d] p-2">
                    <div className="text-[#c084fc] font-bold">Chromium</div>
                    <div className="text-sm font-black text-[#e9d5ff] mt-0.5">{calculations.resources.chromium}</div>
                    <div className="text-[9px] text-[#64748b]">Pelat Zirah Berat</div>
                  </div>

                  <div className="rounded border border-[#d97706]/40 bg-[#261a0f] p-2">
                    <div className="text-[#f59e0b] font-bold">Impor Pabrik</div>
                    <div className="text-sm font-black text-[#fde68a] mt-0.5">~{calculations.resources.estimatedCivsForTrade} Civs</div>
                    <div className="text-[9px] text-[#f59e0b]/80">Jika Tidak Tambang Sendiri</div>
                  </div>
                </div>
              </div>

              {/* EQUIPMENT STOCKS TABLE */}
              <div className="space-y-2 pt-2 border-t border-[#1e2a38]">
                <span className="font-bold uppercase tracking-wider text-[#64748b] text-[11px] block">
                  Total Peralatan yang Harus Diproduksi:
                </span>

                <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                  {calculations.equipmentList.map((eq, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded border border-[#1e293b] bg-[#0a121a] px-2.5 py-1.5 text-[11px]"
                    >
                      <div className="flex items-center gap-1.5 truncate">
                        <span>{eq.icon}</span>
                        <span className="text-[#cbd5e1] truncate">{eq.name}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="font-bold text-[#f8fafc]">{eq.count.toLocaleString()} unit</span>
                        <span className="text-[10px] text-[#64748b]">({eq.icTotal.toLocaleString()} IC)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
