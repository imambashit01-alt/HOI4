import React, { useState, useMemo } from 'react';
import {
  Shield, Plus, Trash2, Copy, Check, Star, RefreshCw,
  Zap, Info, Target, AlertCircle, Factory, Wrench,
  ChevronRight, BarChart3, BookOpen, Layers, Flame,
  Award, Sliders, TrendingUp, Fuel, Boxes, ArrowLeftRight, Swords
} from 'lucide-react';
import { DivisionPreset } from '../types';
import {
  DIVISION_PRESETS,
  BATTALION_CATALOGUE,
  SUPPORT_COMPANIES_DATA,
  PRODUCTION_RULES_DATA,
  BattalionOption
} from '../data/divisionData';
import { DivisionSplitCompare } from './DivisionSplitCompare';
import { ArmyLogisticsCalculator } from './ArmyLogisticsCalculator';
import { BattleResultEstimator } from './BattleResultEstimator';
import { LogisticsCalculator } from './LogisticsCalculator';

interface DivisionViewerProps {
  searchQuery: string;
  isFavorite: (id: string) => boolean;
  toggleFavorite: (item: { id: string; type: 'division'; title: string; subtitle: string; tag: string }) => void;
}

export const DivisionViewer: React.FC<DivisionViewerProps> = ({
  searchQuery,
  isFavorite,
  toggleFavorite
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'presets' | 'calculator' | 'battle_estimator' | 'split_compare' | 'army_logistics' | 'nsb_logistics' | 'production' | 'production_guide'>('presets');
  const [selectedRole, setSelectedRole] = useState<string>('Semua');
  const [selectedWidthFilter, setSelectedWidthFilter] = useState<string>('Semua');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Calculator State
  const [selectedBattalions, setSelectedBattalions] = useState<{ battalionId: string; count: number }[]>([
    { battalionId: 'infantry', count: 9 },
    { battalionId: 'line_artillery', count: 1 }
  ]);
  const [selectedSupport, setSelectedSupport] = useState<string[]>([
    'engineer',
    'support_arty',
    'support_aa'
  ]);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('Semua');

  // Production Planner State
  const [selectedTemplateForProd, setSelectedTemplateForProd] = useState<string>(DIVISION_PRESETS[0].id);
  const [targetDivisionCount, setTargetDivisionCount] = useState<number>(24);
  const [productionEfficiency, setProductionEfficiency] = useState<number>(50); // in percent
  const [targetDays, setTargetDays] = useState<number>(180); // days to complete deployment
  const [availableMils, setAvailableMils] = useState<number>(30); // military factories available

  const roles = [
    'Semua',
    'Frontline Defense',
    'Offensive Infantry',
    'Armor Spearhead',
    'Special Forces',
    'Garrison / Suppress'
  ];

  const widthFilters = ['Semua', '12-15w (Garrison/Port)', '18-21w (Standard Inf)', '24-27w (Shock Inf)', '30-36w (Armor/Spearhead)'];

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filter Presets
  const filteredPresets = useMemo(() => {
    return DIVISION_PRESETS.filter(p => {
      if (selectedRole !== 'Semua' && p.role !== selectedRole) {
        return false;
      }
      if (selectedWidthFilter !== 'Semua') {
        if (selectedWidthFilter.startsWith('12-15w') && (p.combatWidth < 12 || p.combatWidth > 15)) return false;
        if (selectedWidthFilter.startsWith('18-21w') && (p.combatWidth < 18 || p.combatWidth > 21)) return false;
        if (selectedWidthFilter.startsWith('24-27w') && (p.combatWidth < 24 || p.combatWidth > 27)) return false;
        if (selectedWidthFilter.startsWith('30-36w') && p.combatWidth < 30) return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.role.toLowerCase().includes(q) ||
          p.doctrineSynergy.toLowerCase().includes(q) ||
          p.tacticalUsage.toLowerCase().includes(q) ||
          p.recommendedFor.some(c => c.toLowerCase().includes(q)) ||
          p.strengths.some(s => s.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [selectedRole, selectedWidthFilter, searchQuery]);

  // Calculate live stats for interactive calculator
  const liveStats = useMemo(() => {
    let totalWidth = 0;
    let totalSoftAttack = 0;
    let totalHardAttack = 0;
    let totalDefense = 0;
    let totalBreakthrough = 0;
    let totalSupply = 0;
    let totalIC = 0;
    let totalManpower = 0;
    let totalHP = 0;
    let weightedOrg = 0;
    let totalBattalionCount = 0;
    let maxArmor = 0;
    let maxPiercing = 0;

    // Equipment accumulator for custom calculator
    const equipmentMap: { [key: string]: { name: string; count: number; icTotal: number; resources: string } } = {};

    selectedBattalions.forEach(item => {
      const bat = BATTALION_CATALOGUE.find(b => b.id === item.battalionId);
      if (!bat) return;

      const count = item.count;
      totalBattalionCount += count;
      totalWidth += bat.combatWidth * count;
      totalSoftAttack += bat.softAttack * count;
      totalHardAttack += bat.hardAttack * count;
      totalDefense += bat.defense * count;
      totalBreakthrough += bat.breakthrough * count;
      totalSupply += bat.supplyUse * count;
      totalIC += bat.icCost * count;
      totalManpower += bat.manpower * count;
      totalHP += bat.hp * count;
      weightedOrg += bat.organization * count;

      if (bat.armor > maxArmor) maxArmor = bat.armor;
      if (bat.piercing > maxPiercing) maxPiercing = bat.piercing;

      bat.equipmentRequirements.forEach(req => {
        const totalReq = req.count * count;
        const totalReqIC = Math.round(totalReq * req.icCostPerUnit);
        if (!equipmentMap[req.name]) {
          equipmentMap[req.name] = { name: req.name, count: totalReq, icTotal: totalReqIC, resources: req.resources };
        } else {
          equipmentMap[req.name].count += totalReq;
          equipmentMap[req.name].icTotal += totalReqIC;
        }
      });
    });

    // Support companies adjustments
    selectedSupport.forEach(supId => {
      totalIC += 85;
      totalManpower += 300;
      totalSupply += 0.05;

      if (supId === 'support_arty') {
        totalSoftAttack += 32;
        if (!equipmentMap['Support Artillery']) equipmentMap['Support Artillery'] = { name: 'Support Artillery', count: 24, icTotal: 93, resources: '2 Baja, 1 Tungsten' };
      } else if (supId === 'support_aa') {
        totalHardAttack += 8;
        totalSoftAttack += 5;
        if (maxPiercing < 28) maxPiercing = 28;
        if (!equipmentMap['Support Anti-Air']) equipmentMap['Support Anti-Air'] = { name: 'Support Anti-Air', count: 20, icTotal: 67, resources: '1 Baja' };
      } else if (supId === 'support_at') {
        totalHardAttack += 45;
        if (maxPiercing < 68) maxPiercing = 68;
        if (!equipmentMap['Support Anti-Tank']) equipmentMap['Support Anti-Tank'] = { name: 'Support Anti-Tank', count: 24, icTotal: 120, resources: '2 Tungsten, 1 Baja' };
      } else if (supId === 'support_rocket') {
        totalSoftAttack += 34;
        totalBreakthrough += 12;
      } else if (supId === 'engineer') {
        totalDefense += 25;
        if (!equipmentMap['Support Equipment']) equipmentMap['Support Equipment'] = { name: 'Support Equipment', count: 30, icTotal: 120, resources: '2 Baja, 1 Aluminium' };
      } else if (supId === 'armored_recon') {
        totalBreakthrough += 14;
        totalSoftAttack += 10;
        if (maxArmor < 15) maxArmor = 15;
      } else if (supId === 'flame_tank_recon') {
        totalSoftAttack += 25;
        totalBreakthrough += 30;
        if (maxArmor < 25) maxArmor = 25;
      } else if (supId === 'logistics') {
        totalSupply = totalSupply * 0.8;
      } else if (supId === 'maintenance') {
        // Increases reliability
      }
    });

    const averageOrg = totalBattalionCount > 0 ? Math.round(weightedOrg / totalBattalionCount) : 0;
    // HOI4 Armor formula: 40% highest battalion + 60% average
    const finalArmor = Math.round(maxArmor * 0.7);
    const finalPiercing = Math.round(maxPiercing * 0.8);

    // Terrain compatibility check
    const terrainFit = [
      { name: 'Plains (70w)', maxFit: 70, penalty: totalWidth > 0 && 70 % totalWidth > totalWidth * 0.4 ? 'Penalti Kecil' : 'Optimal' },
      { name: 'Forest (60w)', maxFit: 60, penalty: totalWidth > 0 && 60 % totalWidth > totalWidth * 0.4 ? 'Penalti Sedang' : 'Optimal' },
      { name: 'Hills (70w)', maxFit: 70, penalty: totalWidth > 0 && 70 % totalWidth > totalWidth * 0.4 ? 'Penalti Kecil' : 'Optimal' },
      { name: 'Mountain (50w)', maxFit: 50, penalty: totalWidth > 25 ? 'Penalti Besar' : 'Optimal' },
      { name: 'Urban (80w)', maxFit: 80, penalty: totalWidth > 0 && 80 % totalWidth > totalWidth * 0.4 ? 'Penalti Kecil' : 'Optimal' }
    ];

    const isSpaceMarine = selectedBattalions.some(b => b.battalionId === 'infantry') &&
      selectedBattalions.some(b => ['heavy_tank', 'medium_td'].includes(b.battalionId));

    return {
      combatWidth: totalWidth,
      softAttack: Math.round(totalSoftAttack),
      hardAttack: Math.round(totalHardAttack),
      defense: Math.round(totalDefense),
      breakthrough: Math.round(totalBreakthrough),
      organization: averageOrg,
      armor: finalArmor,
      piercing: finalPiercing,
      hp: Math.round(totalHP),
      supplyUse: totalSupply.toFixed(2),
      icCost: Math.round(totalIC),
      manpower: totalManpower,
      battalionCount: totalBattalionCount,
      equipmentList: Object.values(equipmentMap),
      terrainFit,
      isSpaceMarine
    };
  }, [selectedBattalions, selectedSupport]);

  // Production calculation for chosen template & target count
  const productionAnalysis = useMemo(() => {
    // Determine which template is selected in production tab
    let templateName = '';
    let icPerDiv = 0;
    let manpowerPerDiv = 0;
    let eqList: { name: string; count: number; icTotal: number }[] = [];

    if (selectedTemplateForProd === 'custom') {
      templateName = 'Desain Kustom (Live Calculator)';
      icPerDiv = liveStats.icCost;
      manpowerPerDiv = liveStats.manpower;
      eqList = liveStats.equipmentList.map(e => ({ name: e.name, count: e.count, icTotal: e.icTotal }));
    } else {
      const p = DIVISION_PRESETS.find(item => item.id === selectedTemplateForProd) || DIVISION_PRESETS[0];
      templateName = p.name;
      icPerDiv = parseInt(p.stats.costIC.replace(/,/g, ''), 10) || 750;
      manpowerPerDiv = p.battalions.reduce((acc, b) => acc + (b.count * (b.iconType === 'infantry' ? 1000 : 500)), 0) + (p.supportCompanies.length * 300);
      eqList = p.equipmentSummary || [
        { name: 'Infantry Equipment', count: 900, icTotal: 405 },
        { name: 'Artillery Equipment', count: 60, icTotal: 233 },
        { name: 'Support Equipment', count: 30, icTotal: 120 }
      ];
    }

    const totalICTarget = icPerDiv * targetDivisionCount;
    const totalManpowerTarget = manpowerPerDiv * targetDivisionCount;

    // HOI4 factory output calculation:
    // Base IC per factory per day = 4.50
    // Actual IC per factory per day = 4.50 * (productionEfficiency / 100)
    const baseOutputPerFactoryPerDay = 4.50;
    const effectiveOutputPerFactoryPerDay = baseOutputPerFactoryPerDay * (productionEfficiency / 100);

    // Days needed with current available military factories
    const totalDailyICWithMils = availableMils * effectiveOutputPerFactoryPerDay;
    const estimatedDaysNeeded = totalDailyICWithMils > 0 ? Math.ceil(totalICTarget / totalDailyICWithMils) : 999;

    // Factories needed to meet target days
    const totalICPerDayNeededForTargetDays = totalICTarget / Math.max(1, targetDays);
    const milsNeededForTargetDays = Math.ceil(totalICPerDayNeededForTargetDays / effectiveOutputPerFactoryPerDay);

    // Equipment breakdown for whole army
    const fullArmyEquipment = eqList.map(eq => {
      const totalCount = eq.count * targetDivisionCount;
      const totalICForLine = eq.icTotal * targetDivisionCount;
      const recommendedMils = Math.max(1, Math.round((totalICForLine / totalICTarget) * availableMils));
      const dailyAttritionEstimated = Math.ceil(totalCount * 0.005); // 0.5% attrition estimate

      return {
        name: eq.name,
        countPerDiv: eq.count,
        totalArmyCount: totalCount,
        totalICForLine,
        recommendedMils,
        dailyAttritionEstimated
      };
    });

    // Resource estimate
    let steelNeeded = Math.ceil((availableMils * 0.4) * 2 + (availableMils * 0.3) * 3);
    let tungstenNeeded = Math.ceil((availableMils * 0.2) * 2);
    let rubberNeeded = Math.ceil((availableMils * 0.15) * 1);
    let oilFuelNeeded = (targetDivisionCount * 28).toFixed(0);

    return {
      templateName,
      icPerDiv,
      manpowerPerDiv,
      totalICTarget,
      totalManpowerTarget,
      effectiveOutputPerFactoryPerDay: effectiveOutputPerFactoryPerDay.toFixed(2),
      estimatedDaysNeeded,
      milsNeededForTargetDays,
      fullArmyEquipment,
      resources: {
        steel: steelNeeded,
        tungsten: tungstenNeeded,
        rubber: rubberNeeded,
        oilPerDay: oilFuelNeeded
      }
    };
  }, [selectedTemplateForProd, targetDivisionCount, productionEfficiency, targetDays, availableMils, liveStats]);

  const addBattalion = (bat: BattalionOption) => {
    setSelectedBattalions(prev => {
      const existing = prev.find(p => p.battalionId === bat.id);
      if (existing) {
        return prev.map(p => p.battalionId === bat.id ? { ...p, count: p.count + 1 } : p);
      }
      return [...prev, { battalionId: bat.id, count: 1 }];
    });
  };

  const removeBattalion = (batId: string) => {
    setSelectedBattalions(prev => {
      const existing = prev.find(p => p.battalionId === batId);
      if (!existing) return prev;
      if (existing.count > 1) {
        return prev.map(p => p.battalionId === batId ? { ...p, count: p.count - 1 } : p);
      }
      return prev.filter(p => p.battalionId !== batId);
    });
  };

  const toggleSupportCompany = (supId: string) => {
    setSelectedSupport(prev => {
      if (prev.includes(supId)) {
        return prev.filter(s => s !== supId);
      }
      if (prev.length >= 5) {
        return prev;
      }
      return [...prev, supId];
    });
  };

  const resetCalculator = () => {
    setSelectedBattalions([
      { battalionId: 'infantry', count: 9 },
      { battalionId: 'line_artillery', count: 1 }
    ]);
    setSelectedSupport(['engineer', 'support_arty', 'support_aa']);
  };

  const loadPresetToCalculator = (preset: DivisionPreset) => {
    const newBats: { battalionId: string; count: number }[] = [];
    preset.battalions.forEach(b => {
      const match = BATTALION_CATALOGUE.find(c => c.id === b.iconType) || BATTALION_CATALOGUE[0];
      newBats.push({ battalionId: match.id, count: b.count });
    });
    setSelectedBattalions(newBats);

    const newSup: string[] = [];
    if (preset.supportCompanies.some(s => s.includes('Engineer'))) newSup.push('engineer');
    if (preset.supportCompanies.some(s => s.includes('Artillery'))) newSup.push('support_arty');
    if (preset.supportCompanies.some(s => s.includes('Anti-Air'))) newSup.push('support_aa');
    if (preset.supportCompanies.some(s => s.includes('Anti-Tank'))) newSup.push('support_at');
    if (preset.supportCompanies.some(s => s.includes('Recon'))) newSup.push('armored_recon');
    if (preset.supportCompanies.some(s => s.includes('Flame'))) newSup.push('flame_tank_recon');
    if (preset.supportCompanies.some(s => s.includes('Logistics'))) newSup.push('logistics');
    if (preset.supportCompanies.some(s => s.includes('Maintenance'))) newSup.push('maintenance');
    if (preset.supportCompanies.some(s => s.includes('Hospital'))) newSup.push('field_hospital');
    if (preset.supportCompanies.some(s => s.includes('Signal'))) newSup.push('signal_company');
    if (preset.supportCompanies.some(s => s.includes('Police') || s.includes('MP'))) newSup.push('military_police');

    setSelectedSupport(newSup.slice(0, 5));
    setActiveSubTab('calculator');
  };

  const sendToProductionPlanner = (templateId: string) => {
    setSelectedTemplateForProd(templateId);
    setActiveSubTab('production');
  };

  const generateCopySummary = (preset: DivisionPreset) => {
    return `[HOI4 META TEMPLATE: ${preset.name}]
Lebar Tempur: ${preset.combatWidth} Width | Peran: ${preset.role}
Batalion: ${preset.battalions.map(b => `${b.count}x ${b.name}`).join(', ')}
Support: ${preset.supportCompanies.join(', ')}
Statistik: Org ${preset.stats.organization} | Soft Atk ${preset.stats.softAttack} | Defense ${preset.stats.defense} | Breakthrough ${preset.stats.breakthrough} | IC ${preset.stats.costIC}
Penggunaan Taktis: ${preset.tacticalUsage}
Tips Produksi: ${preset.productionTip || 'Prioritaskan alokasi pabrik senapan dan artileri secara seimbang.'}`;
  };

  const filteredBattalions = useMemo(() => {
    if (activeCategoryFilter === 'Semua') return BATTALION_CATALOGUE;
    return BATTALION_CATALOGUE.filter(b => b.category === activeCategoryFilter);
  }, [activeCategoryFilter]);

  return (
    <div className="space-y-6">
      {/* Top Main Navigation Tabs */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b border-[#22303c] pb-4">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-thin">
          <button
            id="tab-division-presets"
            onClick={() => setActiveSubTab('presets')}
            className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeSubTab === 'presets'
                ? 'border border-[#38bdf8]/60 bg-[#15273d] text-[#38bdf8] shadow-md shadow-black/40'
                : 'border border-[#1e2a36] bg-[#0f1721] text-[#94a3b8] hover:text-[#f8fafc]'
            }`}
          >
            <Shield className="h-4 w-4 text-[#38bdf8]" />
            <span>Katalog Template Meta ({DIVISION_PRESETS.length})</span>
          </button>

          <button
            id="tab-division-calculator"
            onClick={() => setActiveSubTab('calculator')}
            className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeSubTab === 'calculator'
                ? 'border border-[#eab308]/60 bg-[#282110] text-[#facc15] shadow-md shadow-black/40'
                : 'border border-[#1e2a36] bg-[#0f1721] text-[#94a3b8] hover:text-[#f8fafc]'
            }`}
          >
            <Zap className="h-4 w-4 text-[#eab308]" />
            <span>Kalkulator Desainer 5x5</span>
          </button>

          <button
            id="tab-division-battle-estimator"
            onClick={() => setActiveSubTab('battle_estimator')}
            className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeSubTab === 'battle_estimator'
                ? 'border border-[#ef4444]/60 bg-[#2d1212] text-[#fca5a5] shadow-md shadow-black/40'
                : 'border border-[#1e2a36] bg-[#0f1721] text-[#94a3b8] hover:text-[#f8fafc]'
            }`}
          >
            <Swords className="h-4 w-4 text-[#ef4444]" />
            <span>Kalkulator Perang &amp; Tempur</span>
          </button>

          <button
            id="tab-division-split-compare"
            onClick={() => setActiveSubTab('split_compare')}
            className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeSubTab === 'split_compare'
                ? 'border border-[#38bdf8]/60 bg-[#0c2438] text-[#7dd3fc] shadow-md shadow-black/40'
                : 'border border-[#1e2a36] bg-[#0f1721] text-[#94a3b8] hover:text-[#f8fafc]'
            }`}
          >
            <ArrowLeftRight className="h-4 w-4 text-[#38bdf8]" />
            <span>Bandingkan Split-View</span>
          </button>

          <button
            id="tab-division-army-logistics"
            onClick={() => setActiveSubTab('army_logistics')}
            className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeSubTab === 'army_logistics'
                ? 'border border-[#f59e0b]/60 bg-[#2b1e10] text-[#fde047] shadow-md shadow-black/40'
                : 'border border-[#1e2a36] bg-[#0f1721] text-[#94a3b8] hover:text-[#f8fafc]'
            }`}
          >
            <Boxes className="h-4 w-4 text-[#f59e0b]" />
            <span>Logistik Makro Tentara</span>
          </button>

          <button
            id="tab-division-nsb-logistics"
            onClick={() => setActiveSubTab('nsb_logistics')}
            className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeSubTab === 'nsb_logistics'
                ? 'border border-[#38bdf8]/60 bg-[#0c2438] text-[#7dd3fc] shadow-md shadow-black/40'
                : 'border border-[#1e2a36] bg-[#0f1721] text-[#94a3b8] hover:text-[#f8fafc]'
            }`}
          >
            <Fuel className="h-4 w-4 text-[#38bdf8]" />
            <span>Kalkulator Bahan Bakar &amp; Hub (NSB)</span>
          </button>

          <button
            id="tab-division-production"
            onClick={() => setActiveSubTab('production')}
            className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeSubTab === 'production'
                ? 'border border-[#10b981]/60 bg-[#11291f] text-[#34d399] shadow-md shadow-black/40'
                : 'border border-[#1e2a36] bg-[#0f1721] text-[#94a3b8] hover:text-[#f8fafc]'
            }`}
          >
            <Factory className="h-4 w-4 text-[#10b981]" />
            <span>Kalkulator Pabrik & IC</span>
          </button>

          <button
            id="tab-production-guide"
            onClick={() => setActiveSubTab('production_guide')}
            className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeSubTab === 'production_guide'
                ? 'border border-[#a855f7]/60 bg-[#241334] text-[#c084fc] shadow-md shadow-black/40'
                : 'border border-[#1e2a36] bg-[#0f1721] text-[#94a3b8] hover:text-[#f8fafc]'
            }`}
          >
            <BookOpen className="h-4 w-4 text-[#a855f7]" />
            <span>Panduan Produksi Bagus</span>
          </button>
        </div>

        {/* Secondary Filters for Presets View */}
        {activeSubTab === 'presets' && (
          <div className="flex items-center gap-2 overflow-x-auto text-xs scrollbar-thin">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="rounded-lg border border-[#22303c] bg-[#111923] px-2.5 py-1.5 text-xs text-[#cbd5e1] focus:border-[#38bdf8] focus:outline-none"
            >
              {roles.map(r => (
                <option key={r} value={r}>Peran: {r}</option>
              ))}
            </select>

            <select
              value={selectedWidthFilter}
              onChange={(e) => setSelectedWidthFilter(e.target.value)}
              className="rounded-lg border border-[#22303c] bg-[#111923] px-2.5 py-1.5 text-xs text-[#cbd5e1] focus:border-[#38bdf8] focus:outline-none"
            >
              {widthFilters.map(w => (
                <option key={w} value={w}>Lebar: {w}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: PRESETS CATALOGUE (16+ TEMPLATES) */}
      {/* ========================================================================= */}
      {activeSubTab === 'presets' && (
        <div className="space-y-6">
          <div className="rounded-xl border border-[#1e2a36] bg-[#0d1622] p-4 text-xs text-[#94a3b8] flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-[#38bdf8]" />
              <span>
                Menampilkan <strong className="text-[#f8fafc]">{filteredPresets.length}</strong> template teruji untuk Patch No Step Back, By Blood Alone, Arms Against Tyranny, dan Gotterdammerung.
              </span>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-mono text-[#64748b]">
              <span>Optimal Width: 15w, 18w, 21w, 30w, 35w</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredPresets.map(preset => {
              const isFav = isFavorite(preset.id);
              const isCopied = copiedId === preset.id;

              return (
                <div
                  key={preset.id}
                  id={`preset-card-${preset.id}`}
                  className="rounded-xl border border-[#223344] bg-[#111a24] shadow-lg shadow-black/50 overflow-hidden flex flex-col justify-between hover:border-[#38bdf8]/50 transition-all"
                >
                  {/* Card Header */}
                  <div className="p-5 border-b border-[#1b2a38] bg-gradient-to-r from-[#14202e] to-[#0f1822]">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap mb-1.5">
                          <span className="rounded border border-[#38bdf8]/40 bg-[#0c2438] px-2 py-0.5 text-xs font-mono font-bold text-[#38bdf8]">
                            {preset.combatWidth} Width
                          </span>
                          <span className="rounded border border-[#1e293b] bg-[#0f172a] px-2 py-0.5 text-[11px] font-mono text-[#94a3b8]">
                            {preset.role}
                          </span>
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-[#f8fafc] tracking-tight">
                          {preset.name}
                        </h3>
                        <p className="text-xs text-[#94a3b8] mt-0.5 font-mono">
                          Sinergi Doktrin: <span className="text-[#cbd5e1]">{preset.doctrineSynergy}</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => toggleFavorite({
                            id: preset.id,
                            type: 'division',
                            title: preset.name,
                            subtitle: `${preset.combatWidth}W • ${preset.role}`,
                            tag: 'Template'
                          })}
                          className={`rounded-lg border p-2 text-xs transition-colors ${
                            isFav
                              ? 'border-[#eab308]/60 bg-[#2b2512] text-[#facc15]'
                              : 'border-[#22303c] bg-[#131b24] text-[#64748b] hover:text-[#f8fafc]'
                          }`}
                          title={isFav ? 'Hapus dari Favorit' : 'Simpan ke Favorit'}
                        >
                          <Star className={`h-4 w-4 ${isFav ? 'fill-current' : ''}`} />
                        </button>

                        <button
                          onClick={() => handleCopy(preset.id, generateCopySummary(preset))}
                          className={`rounded-lg border p-2 text-xs transition-colors ${
                            isCopied
                              ? 'border-[#22c55e]/60 bg-[#143324] text-[#4ade80]'
                              : 'border-[#22303c] bg-[#131b24] text-[#94a3b8] hover:text-[#f8fafc]'
                          }`}
                          title="Salin Komposisi"
                        >
                          {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Core stats scoreboard */}
                    <div className="mt-4 grid grid-cols-4 gap-2 text-center font-mono">
                      <div className="rounded border border-[#1e2c3a] bg-[#0c141c] p-2">
                        <div className="text-[10px] text-[#64748b] uppercase">Org</div>
                        <div className="text-sm font-bold text-[#38bdf8]">{preset.stats.organization}</div>
                      </div>
                      <div className="rounded border border-[#1e2c3a] bg-[#0c141c] p-2">
                        <div className="text-[10px] text-[#64748b] uppercase">Soft Atk</div>
                        <div className="text-sm font-bold text-[#f59e0b]">{preset.stats.softAttack}</div>
                      </div>
                      <div className="rounded border border-[#1e2c3a] bg-[#0c141c] p-2">
                        <div className="text-[10px] text-[#64748b] uppercase">Defense</div>
                        <div className="text-sm font-bold text-[#10b981]">{preset.stats.defense}</div>
                      </div>
                      <div className="rounded border border-[#1e2c3a] bg-[#0c141c] p-2">
                        <div className="text-[10px] text-[#64748b] uppercase">Breakthr.</div>
                        <div className="text-sm font-bold text-[#ec4899]">{preset.stats.breakthrough}</div>
                      </div>
                    </div>

                    <div className="mt-2 grid grid-cols-4 gap-2 text-center font-mono text-[11px]">
                      <div className="rounded border border-[#1e2c3a] bg-[#0c141c] py-1 px-1 text-[#94a3b8]">
                        Hard: <span className="text-[#f1f5f9] font-semibold">{preset.stats.hardAttack}</span>
                      </div>
                      <div className="rounded border border-[#1e2c3a] bg-[#0c141c] py-1 px-1 text-[#94a3b8]">
                        Armor: <span className="text-[#f1f5f9] font-semibold">{preset.stats.armor}</span>
                      </div>
                      <div className="rounded border border-[#1e2c3a] bg-[#0c141c] py-1 px-1 text-[#94a3b8]">
                        Pierce: <span className="text-[#f1f5f9] font-semibold">{preset.stats.piercing}</span>
                      </div>
                      <div className="rounded border border-[#1e2c3a] bg-[#0c141c] py-1 px-1 text-[#94a3b8]">
                        IC: <span className="text-[#a78bfa] font-semibold">{preset.stats.costIC}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 space-y-4 text-xs">
                    {/* Battalion breakdown */}
                    <div>
                      <span className="font-mono text-[11px] font-semibold text-[#64748b] uppercase tracking-wider block mb-1.5">
                        Komposisi Batalion Tempur:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {preset.battalions.map((bat, bIdx) => (
                          <span
                            key={bIdx}
                            className="rounded border border-[#27384a] bg-[#162330] px-2.5 py-1 font-mono font-medium text-[#e2e8f0]"
                          >
                            <strong className="text-[#38bdf8] mr-1">{bat.count}x</strong>
                            {bat.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Support companies */}
                    <div>
                      <span className="font-mono text-[11px] font-semibold text-[#64748b] uppercase tracking-wider block mb-1.5">
                        Perusahaan Bantuan (Support Companies):
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {preset.supportCompanies.map((sup, sIdx) => (
                          <span
                            key={sIdx}
                            className="rounded border border-[#2e3e2c] bg-[#132216] px-2 py-0.5 font-mono text-[#86efac]"
                          >
                            + {sup}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Equipment summary preview */}
                    {preset.equipmentSummary && (
                      <div className="rounded-lg border border-[#1e2a38] bg-[#0e1620] p-3">
                        <span className="text-[11px] font-mono font-bold text-[#94a3b8] uppercase block mb-1.5 flex items-center gap-1.5">
                          <Boxes className="h-3.5 w-3.5 text-[#38bdf8]" />
                          Kebutuhan Perlengkapan per 1 Divisi:
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-[11px]">
                          {preset.equipmentSummary.map((eq, eIdx) => (
                            <div key={eIdx} className="rounded bg-[#121d2a] px-2 py-1 border border-[#1a2938]">
                              <span className="text-[#64748b] block truncate">{eq.name}</span>
                              <span className="text-[#f1f5f9] font-bold">{eq.count.toLocaleString()} unit</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Terrain suitability badges */}
                    {preset.terrainFit && (
                      <div>
                        <span className="font-mono text-[11px] font-semibold text-[#64748b] uppercase tracking-wider block mb-1.5">
                          Kecocokan Medan Pertempuran:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {preset.terrainFit.map((t, tIdx) => (
                            <span
                              key={tIdx}
                              className={`rounded px-2 py-0.5 font-mono text-[10px] border ${
                                t.score === 'Optimal'
                                  ? 'border-[#22c55e]/40 bg-[#132d1d] text-[#86efac]'
                                  : t.score === 'Bagus'
                                  ? 'border-[#38bdf8]/40 bg-[#0c2438] text-[#7dd3fc]'
                                  : 'border-[#f59e0b]/40 bg-[#2d1e0d] text-[#fde047]'
                              }`}
                              title={t.note}
                            >
                              {t.terrain}: {t.score}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tactical usage & Production Tip */}
                    <div className="rounded-lg border border-[#1c2937] bg-[#0c141e] p-3 space-y-2">
                      <p className="text-[#cbd5e1] leading-relaxed">
                        <strong className="text-[#f8fafc]">Penggunaan Taktis: </strong>
                        {preset.tacticalUsage}
                      </p>
                      {preset.productionTip && (
                        <div className="pt-2 border-t border-[#1a2533] text-[11px] text-[#fbbf24] flex items-start gap-1.5">
                          <Factory className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                          <span><strong>Cara Produksi: </strong>{preset.productionTip}</span>
                        </div>
                      )}
                      <div className="pt-2 border-t border-[#1a2533] flex items-center justify-between flex-wrap gap-2 text-[11px] text-[#64748b] font-mono">
                        <span>Negara Disarankan: <strong className="text-[#94a3b8]">{preset.recommendedFor.join(', ')}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Buttons */}
                  <div className="p-4 border-t border-[#1b2a38] bg-[#0d151f] flex items-center justify-between gap-2 flex-wrap">
                    <button
                      onClick={() => loadPresetToCalculator(preset)}
                      className="flex items-center gap-1.5 text-xs font-semibold text-[#38bdf8] hover:text-[#7dd3fc] transition-colors"
                    >
                      <Zap className="h-3.5 w-3.5" />
                      Muat ke Kalkulator Custom
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => sendToProductionPlanner(preset.id)}
                        className="rounded border border-[#10b981]/50 bg-[#12281c] px-2.5 py-1.5 text-xs font-medium text-[#6ee7b7] hover:bg-[#1a3a28] transition-colors flex items-center gap-1"
                        title="Hitung kebutuhan pabrik dan hari pembuatan"
                      >
                        <Factory className="h-3 w-3" />
                        Hitung Pabrik
                      </button>

                      <button
                        onClick={() => handleCopy(preset.id, generateCopySummary(preset))}
                        className="rounded border border-[#22303c] bg-[#121a22] px-2.5 py-1.5 text-xs font-medium text-[#cbd5e1] hover:border-[#38bdf8] hover:text-[#f8fafc] transition-colors flex items-center gap-1"
                      >
                        {isCopied ? <Check className="h-3 w-3 text-[#22c55e]" /> : <Copy className="h-3 w-3" />}
                        <span>{isCopied ? 'Tersalin' : 'Salin'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: INTERACTIVE 5x5 BATTALION DESIGNER CALCULATOR */}
      {/* ========================================================================= */}
      {activeSubTab === 'calculator' && (
        <div className="space-y-6">
          {/* Header Dashboard with Quick Load */}
          <div className="rounded-xl border border-[#3b82f6]/40 bg-gradient-to-r from-[#132236] to-[#0f1824] p-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-[#f8fafc] flex items-center gap-2">
                  <Shield className="h-5 w-5 text-[#38bdf8]" />
                  Simulator Perancang Divisi 5x5 (Live Division Builder)
                </h3>
                <p className="text-xs text-[#94a3b8] mt-1">
                  Tambahkan batalion tempur dan support company untuk menghitung Combat Width, Soft/Hard Attack, Breakthrough, Armor vs Piercing, serta penalti medan secara real-time.
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={resetCalculator}
                  className="flex items-center gap-1.5 rounded-lg border border-[#334155] bg-[#1e293b] px-3 py-1.5 text-xs font-medium text-[#cbd5e1] hover:text-[#f8fafc] transition-colors"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  Reset 9/1
                </button>

                <button
                  onClick={() => sendToProductionPlanner('custom')}
                  className="flex items-center gap-1.5 rounded-lg border border-[#10b981]/50 bg-[#143324] px-3 py-1.5 text-xs font-semibold text-[#6ee7b7] hover:bg-[#1c4832] transition-colors"
                >
                  <Factory className="h-3.5 w-3.5" />
                  Kirim ke Kalkulator Pabrik
                </button>

                <button
                  onClick={() => handleCopy('calc-summary', `[CUSTOM HOI4 DIVISION]
Lebar Tempur: ${liveStats.combatWidth} Width | Batalion: ${liveStats.battalionCount} unit
Stats: Org ${liveStats.organization} | Soft Attack ${liveStats.softAttack} | Defense ${liveStats.defense} | Breakthrough ${liveStats.breakthrough} | Armor ${liveStats.armor} | Piercing ${liveStats.piercing} | IC Cost ${liveStats.icCost}`)}
                  className="flex items-center gap-1.5 rounded-lg border border-[#3b82f6]/50 bg-[#2563eb] px-3.5 py-1.5 text-xs font-semibold text-white shadow-md hover:bg-[#1d4ed8] transition-colors"
                >
                  {copiedId === 'calc-summary' ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copiedId === 'calc-summary' ? 'Tersalin!' : 'Salin Hasil'}
                </button>
              </div>
            </div>

            {/* Status alerts */}
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              {liveStats.isSpaceMarine && (
                <div className="rounded-lg border border-[#eab308]/50 bg-[#282010] px-3 py-1 text-[#fde047] flex items-center gap-1.5">
                  <Flame className="h-3.5 w-3.5 text-[#eab308]" />
                  <span><strong>Status Space Marine Aktif:</strong> Divisi membagikan nilai Armor tank ke batalion infanteri (Kebal tembakan senapan infanteri AI biasa).</span>
                </div>
              )}
              {liveStats.organization < 30 && liveStats.battalionCount > 0 && (
                <div className="rounded-lg border border-[#ef4444]/50 bg-[#2c1315] px-3 py-1 text-[#fca5a5] flex items-center gap-1.5">
                  <AlertCircle className="h-3.5 w-3.5 text-[#ef4444]" />
                  <span><strong>Peringatan Organisasi:</strong> Org di bawah 30 membuat divisi cepat kabur dari medan tempur. Tambahkan infanteri atau motorized!</span>
                </div>
              )}
            </div>

            {/* Scoreboard */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 text-center font-mono">
              <div className={`rounded-lg border p-2.5 ${
                [15, 18, 20, 21, 24, 25, 27, 30, 32, 35, 36].includes(liveStats.combatWidth)
                  ? 'border-[#22c55e]/50 bg-[#143324]'
                  : 'border-[#f59e0b]/50 bg-[#3b2b13]'
              }`}>
                <div className="text-[10px] text-[#94a3b8] uppercase font-bold">Combat Width</div>
                <div className={`text-lg font-black ${
                  [15, 18, 20, 21, 24, 25, 27, 30, 32, 35, 36].includes(liveStats.combatWidth)
                    ? 'text-[#4ade80]'
                    : 'text-[#fde047]'
                }`}>
                  {liveStats.combatWidth}w
                </div>
                <div className="text-[9px] text-[#cbd5e1] truncate">
                  {[15, 18, 20, 21, 24, 25, 27, 30, 32, 35, 36].includes(liveStats.combatWidth) ? 'Optimal Meta' : 'Non-Optimal'}
                </div>
              </div>

              <div className="rounded-lg border border-[#1e2d3d] bg-[#0c151e] p-2.5">
                <div className="text-[10px] text-[#64748b] uppercase font-bold">Organization</div>
                <div className={`text-lg font-black ${liveStats.organization >= 30 ? 'text-[#38bdf8]' : 'text-[#f87171]'}`}>
                  {liveStats.organization}
                </div>
                <div className="text-[9px] text-[#94a3b8]">{liveStats.organization >= 30 ? 'Sehat' : 'Kritis (<30)'}</div>
              </div>

              <div className="rounded-lg border border-[#1e2d3d] bg-[#0c151e] p-2.5">
                <div className="text-[10px] text-[#64748b] uppercase font-bold">Soft Attack</div>
                <div className="text-lg font-black text-[#f59e0b]">{liveStats.softAttack}</div>
                <div className="text-[9px] text-[#94a3b8]">vs Infanteri</div>
              </div>

              <div className="rounded-lg border border-[#1e2d3d] bg-[#0c151e] p-2.5">
                <div className="text-[10px] text-[#64748b] uppercase font-bold">Defense</div>
                <div className="text-lg font-black text-[#10b981]">{liveStats.defense}</div>
                <div className="text-[9px] text-[#94a3b8]">Pertahanan</div>
              </div>

              <div className="rounded-lg border border-[#1e2d3d] bg-[#0c151e] p-2.5">
                <div className="text-[10px] text-[#64748b] uppercase font-bold">Breakthrough</div>
                <div className="text-lg font-black text-[#ec4899]">{liveStats.breakthrough}</div>
                <div className="text-[9px] text-[#94a3b8]">Penetrasi Serang</div>
              </div>

              <div className="rounded-lg border border-[#1e2d3d] bg-[#0c151e] p-2.5">
                <div className="text-[10px] text-[#64748b] uppercase font-bold">Armor / Pierce</div>
                <div className="text-sm font-black text-[#e2e8f0] mt-1">{liveStats.armor} / {liveStats.piercing}</div>
                <div className="text-[9px] text-[#94a3b8]">Lapis Baja</div>
              </div>

              <div className="rounded-lg border border-[#1e2d3d] bg-[#0c151e] p-2.5">
                <div className="text-[10px] text-[#64748b] uppercase font-bold">Supply / Hari</div>
                <div className="text-lg font-black text-[#fb923c]">{liveStats.supplyUse}</div>
                <div className="text-[9px] text-[#94a3b8]">Beban Suplai</div>
              </div>

              <div className="rounded-lg border border-[#1e2d3d] bg-[#0c151e] p-2.5">
                <div className="text-[10px] text-[#64748b] uppercase font-bold">Biaya IC</div>
                <div className="text-lg font-black text-[#a78bfa]">{liveStats.icCost}</div>
                <div className="text-[9px] text-[#94a3b8]">{liveStats.manpower.toLocaleString()} Manpower</div>
              </div>
            </div>

            {/* Terrain combat width compatibility bar */}
            <div className="mt-4 pt-3 border-t border-[#1e2d3d] flex items-center justify-between flex-wrap gap-2 text-xs font-mono">
              <span className="text-[#94a3b8]">Analisis Penalti Medan Tempur:</span>
              <div className="flex flex-wrap gap-2">
                {liveStats.terrainFit.map((t, idx) => (
                  <span
                    key={idx}
                    className={`rounded px-2 py-0.5 text-[10px] ${
                      t.penalty === 'Optimal'
                        ? 'bg-[#143324] text-[#86efac] border border-[#22c55e]/40'
                        : 'bg-[#3b2512] text-[#fde047] border border-[#f59e0b]/40'
                    }`}
                  >
                    {t.name}: {t.penalty}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Active Battalions & Support (5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              <div className="rounded-xl border border-[#22303c] bg-[#111923] p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-[#1b2835] pb-3">
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#f1f5f9] flex items-center gap-2">
                    <Target className="h-4 w-4 text-[#38bdf8]" />
                    Batalion Tempur Terpasang ({liveStats.battalionCount} Unit)
                  </h4>
                  <span className="text-xs font-mono text-[#64748b]">{liveStats.combatWidth} Width</span>
                </div>

                {selectedBattalions.length === 0 ? (
                  <div className="rounded-lg border border-dashed border-[#22303c] p-6 text-center text-xs text-[#64748b]">
                    Belum ada batalion tempur. Pilih batalion dari panel sebelah kanan.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {selectedBattalions.map(item => {
                      const bat = BATTALION_CATALOGUE.find(b => b.id === item.battalionId);
                      if (!bat) return null;

                      return (
                        <div
                          key={item.battalionId}
                          className="flex items-center justify-between rounded-lg border border-[#1e2b38] bg-[#141f2a] p-3 text-xs"
                        >
                          <div>
                            <div className="font-semibold text-[#f8fafc]">{bat.name}</div>
                            <div className="font-mono text-[11px] text-[#94a3b8]">
                              {bat.combatWidth}w • Soft Atk {bat.softAttack} • Def {bat.defense} • IC {bat.icCost}
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => removeBattalion(item.battalionId)}
                              className="flex h-7 w-7 items-center justify-center rounded border border-[#334155] bg-[#1e293b] text-[#cbd5e1] hover:bg-[#334155] hover:text-[#f8fafc]"
                            >
                              -
                            </button>
                            <span className="w-6 text-center font-mono font-bold text-sm text-[#38bdf8]">
                              {item.count}
                            </span>
                            <button
                              onClick={() => addBattalion(bat)}
                              className="flex h-7 w-7 items-center justify-center rounded border border-[#334155] bg-[#1e293b] text-[#cbd5e1] hover:bg-[#334155] hover:text-[#f8fafc]"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Support Companies Selection (Up to 5) */}
                <div className="border-t border-[#1b2835] pt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#f1f5f9]">
                      Support Companies ({selectedSupport.length}/5)
                    </span>
                    <span className="text-[11px] font-mono text-[#64748b]">Maksimal 5</span>
                  </div>

                  <div className="grid grid-cols-1 gap-1.5">
                    {SUPPORT_COMPANIES_DATA.map(sup => {
                      const isSelected = selectedSupport.includes(sup.id);

                      return (
                        <button
                          key={sup.id}
                          onClick={() => toggleSupportCompany(sup.id)}
                          className={`flex items-start justify-between rounded-lg border p-2.5 text-left text-xs transition-all ${
                            isSelected
                              ? 'border-[#22c55e]/50 bg-[#13281c] text-[#dcfce7]'
                              : 'border-[#1e2938] bg-[#0f1720] text-[#94a3b8] hover:border-[#2f3f50]'
                          }`}
                        >
                          <div>
                            <div className="font-semibold text-sm flex items-center gap-1.5">
                              <span className={`h-2 w-2 rounded-full ${isSelected ? 'bg-[#22c55e]' : 'bg-[#475569]'}`} />
                              {sup.name}
                            </div>
                            <div className="text-[11px] text-[#94a3b8] mt-0.5">{sup.bonus}</div>
                            <div className="text-[10px] text-[#64748b] font-mono mt-0.5">{sup.cost}</div>
                          </div>
                          <span className="font-mono text-[10px] text-[#475569]">{isSelected ? 'Aktif' : '+ Pasang'}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Equipment breakdown preview for custom design */}
                {liveStats.equipmentList.length > 0 && (
                  <div className="border-t border-[#1b2835] pt-4">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#f1f5f9] block mb-2">
                      Rincian Perlengkapan Divisi Kustom:
                    </span>
                    <div className="space-y-1 font-mono text-xs">
                      {liveStats.equipmentList.map((eq, eIdx) => (
                        <div key={eIdx} className="flex items-center justify-between rounded bg-[#0d1622] p-2 border border-[#1a2938]">
                          <span className="text-[#cbd5e1]">{eq.name}</span>
                          <span className="text-[#38bdf8] font-bold">{eq.count} unit ({eq.icTotal} IC)</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Catalogue of Battalions to Add (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="rounded-xl border border-[#22303c] bg-[#111923] p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#1b2835] pb-3">
                  <div>
                    <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#f1f5f9]">
                      Katalog Batalion Tempur
                    </h4>
                    <p className="text-xs text-[#94a3b8] mt-0.5">
                      Klik tombol Tambah untuk memasukkan batalion ke dalam struktur pertempuranmu.
                    </p>
                  </div>

                  <div className="flex items-center gap-1 overflow-x-auto text-xs scrollbar-thin">
                    {['Semua', 'Infanteri', 'Mobil / Bermotor', 'Lapis Baja (Tank)', 'Pasukan Khusus'].map(cat => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategoryFilter(cat)}
                        className={`rounded px-2.5 py-1 font-medium transition-colors whitespace-nowrap ${
                          activeCategoryFilter === cat
                            ? 'bg-[#1e2e42] text-[#38bdf8] font-bold'
                            : 'text-[#94a3b8] hover:text-[#f8fafc]'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {filteredBattalions.map(bat => {
                    const currentCount = selectedBattalions.find(b => b.battalionId === bat.id)?.count || 0;

                    return (
                      <div
                        key={bat.id}
                        className="rounded-lg border border-[#1e2c3a] bg-[#141f2b] p-3 flex flex-col justify-between hover:border-[#38bdf8]/60 transition-all"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-sm text-[#f8fafc]">{bat.name}</span>
                            <span className="rounded bg-[#0f172a] px-1.5 py-0.5 font-mono text-[11px] text-[#38bdf8] font-bold">
                              {bat.combatWidth}w
                            </span>
                          </div>
                          <div className="grid grid-cols-3 gap-1 font-mono text-[10px] text-[#94a3b8] mb-2">
                            <div>Soft: <span className="text-[#f1f5f9] font-bold">{bat.softAttack}</span></div>
                            <div>Def: <span className="text-[#f1f5f9] font-bold">{bat.defense}</span></div>
                            <div>Org: <span className="text-[#f1f5f9] font-bold">{bat.organization}</span></div>
                            <div>Break: <span className="text-[#f1f5f9] font-bold">{bat.breakthrough}</span></div>
                            <div>Armor: <span className="text-[#f1f5f9] font-bold">{bat.armor}</span></div>
                            <div>IC: <span className="text-[#f1f5f9] font-bold">{bat.icCost}</span></div>
                          </div>
                          <div className="text-[10px] font-mono text-[#64748b]">
                            Peralatan: {bat.equipmentRequirements.map(r => `${r.count}x ${r.name}`).join(', ')}
                          </div>
                        </div>

                        <div className="flex items-center justify-between border-t border-[#1a2533] pt-2 mt-2">
                          <span className="text-[11px] font-mono text-[#64748b]">
                            Di Desain: <strong className="text-[#38bdf8]">{currentCount}x</strong>
                          </span>
                          <button
                            onClick={() => addBattalion(bat)}
                            className="flex items-center gap-1 rounded bg-[#2563eb] px-2.5 py-1 text-xs font-semibold text-white hover:bg-[#1d4ed8] transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                            Tambah
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: PRODUCTION & FACTORY ALLOCATION CALCULATOR */}
      {/* ========================================================================= */}
      {activeSubTab === 'production' && (
        <div className="space-y-6">
          <div className="rounded-xl border border-[#10b981]/40 bg-gradient-to-r from-[#0d2217] to-[#0f1b26] p-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-[#f8fafc] flex items-center gap-2">
                  <Factory className="h-5 w-5 text-[#34d399]" />
                  Kalkulator Alokasi Pabrik Militer & Kebutuhan Perlengkapan
                </h3>
                <p className="text-xs text-[#94a3b8] mt-1">
                  Hitung berapa pabrik militer yang harus kamu tugaskan ke masing-masing lini produksi (Senapan, Artileri, Tank, Truk) agar seluruh armadamu siap tempur tepat waktu.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy('prod-calc-copy', `[HOI4 PRODUCTION PLAN: ${productionAnalysis.templateName}]
Target: ${targetDivisionCount} Divisi | Total IC: ${productionAnalysis.totalICTarget.toLocaleString()} | Manpower: ${productionAnalysis.totalManpowerTarget.toLocaleString()}
Pabrik Tersedia: ${availableMils} Pabrik Militer | Estimasi Waktu Selesai: ${productionAnalysis.estimatedDaysNeeded} Hari
Alokasi Pabrik:
${productionAnalysis.fullArmyEquipment.map(e => `- ${e.name}: ${e.recommendedMils} Mils (Total: ${e.totalArmyCount.toLocaleString()} unit)`).join('\n')}`)}
                  className="flex items-center gap-1.5 rounded-lg border border-[#10b981]/50 bg-[#163a28] px-3.5 py-1.5 text-xs font-semibold text-[#86efac] hover:bg-[#1e4d36] transition-colors"
                >
                  {copiedId === 'prod-calc-copy' ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedId === 'prod-calc-copy' ? 'Tersalin!' : 'Salin Rencana Produksi'}</span>
                </button>
              </div>
            </div>

            {/* Input Controls Grid */}
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-xl border border-[#1c382b] bg-[#0c1815]">
              {/* Template selector */}
              <div>
                <label className="text-[11px] font-mono font-bold text-[#94a3b8] uppercase block mb-1">
                  Pilih Template Divisi
                </label>
                <select
                  value={selectedTemplateForProd}
                  onChange={(e) => setSelectedTemplateForProd(e.target.value)}
                  className="w-full rounded-lg border border-[#22303c] bg-[#111c24] p-2 text-xs text-[#f8fafc] focus:border-[#34d399] focus:outline-none font-semibold"
                >
                  <option value="custom">⚡ Desain Kustom (Live Calculator Saat Ini)</option>
                  {DIVISION_PRESETS.map(p => (
                    <option key={p.id} value={p.id}>{p.name} ({p.combatWidth}w)</option>
                  ))}
                </select>
              </div>

              {/* Target division count */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-mono font-bold text-[#94a3b8] uppercase">
                    Target Divisi
                  </label>
                  <span className="text-xs font-mono font-bold text-[#34d399]">{targetDivisionCount} Divisi</span>
                </div>
                <div className="flex items-center gap-1.5 mb-1.5">
                  {[6, 12, 24, 48, 72].map(cnt => (
                    <button
                      key={cnt}
                      onClick={() => setTargetDivisionCount(cnt)}
                      className={`rounded px-2 py-0.5 text-[10px] font-mono font-semibold transition-colors ${
                        targetDivisionCount === cnt ? 'bg-[#34d399] text-[#062014]' : 'bg-[#162720] text-[#cbd5e1] hover:bg-[#20362c]'
                      }`}
                    >
                      {cnt}
                    </button>
                  ))}
                </div>
                <input
                  type="range"
                  min="1"
                  max="120"
                  value={targetDivisionCount}
                  onChange={(e) => setTargetDivisionCount(parseInt(e.target.value, 10))}
                  className="w-full accent-[#34d399]"
                />
              </div>

              {/* Available Military Factories */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-mono font-bold text-[#94a3b8] uppercase">
                    Pabrik Militer Kamu
                  </label>
                  <span className="text-xs font-mono font-bold text-[#38bdf8]">{availableMils} Mils</span>
                </div>
                <div className="flex items-center gap-1.5 mb-1.5">
                  {[10, 25, 50, 100].map(cnt => (
                    <button
                      key={cnt}
                      onClick={() => setAvailableMils(cnt)}
                      className={`rounded px-2 py-0.5 text-[10px] font-mono font-semibold transition-colors ${
                        availableMils === cnt ? 'bg-[#38bdf8] text-[#081e2e]' : 'bg-[#132433] text-[#cbd5e1] hover:bg-[#1a3247]'
                      }`}
                    >
                      {cnt}
                    </button>
                  ))}
                </div>
                <input
                  type="range"
                  min="5"
                  max="150"
                  value={availableMils}
                  onChange={(e) => setAvailableMils(parseInt(e.target.value, 10))}
                  className="w-full accent-[#38bdf8]"
                />
              </div>

              {/* Production Efficiency */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-mono font-bold text-[#94a3b8] uppercase">
                    Efisiensi Rata-rata
                  </label>
                  <span className="text-xs font-mono font-bold text-[#facc15]">{productionEfficiency}%</span>
                </div>
                <div className="flex items-center gap-1.5 mb-1.5">
                  {[{ l: 'Awal (25%)', v: 25 }, { l: 'Norm (50%)', v: 50 }, { l: 'Disp (80%)', v: 80 }].map(item => (
                    <button
                      key={item.v}
                      onClick={() => setProductionEfficiency(item.v)}
                      className={`rounded px-1.5 py-0.5 text-[10px] font-mono font-semibold transition-colors ${
                        productionEfficiency === item.v ? 'bg-[#facc15] text-[#2c1d04]' : 'bg-[#2b2512] text-[#cbd5e1] hover:bg-[#3d3318]'
                      }`}
                    >
                      {item.l}
                    </button>
                  ))}
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={productionEfficiency}
                  onChange={(e) => setProductionEfficiency(parseInt(e.target.value, 10))}
                  className="w-full accent-[#facc15]"
                />
              </div>
            </div>

            {/* Live Result Scoreboard */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono">
              <div className="rounded-xl border border-[#1e3b2e] bg-[#0c1a14] p-3">
                <div className="text-[10px] text-[#94a3b8] uppercase">Total Biaya IC</div>
                <div className="text-xl font-bold text-[#34d399] mt-0.5">
                  {productionAnalysis.totalICTarget.toLocaleString()}
                </div>
                <div className="text-[10px] text-[#64748b]">({productionAnalysis.icPerDiv} IC / divisi)</div>
              </div>

              <div className="rounded-xl border border-[#1e3b2e] bg-[#0c1a14] p-3">
                <div className="text-[10px] text-[#94a3b8] uppercase">Total Manpower</div>
                <div className="text-xl font-bold text-[#38bdf8] mt-0.5">
                  {productionAnalysis.totalManpowerTarget.toLocaleString()}
                </div>
                <div className="text-[10px] text-[#64748b]">Tenaga Manusia</div>
              </div>

              <div className="rounded-xl border border-[#1e3b2e] bg-[#0c1a14] p-3">
                <div className="text-[10px] text-[#94a3b8] uppercase">Waktu Selesai Produksi</div>
                <div className="text-xl font-bold text-[#facc15] mt-0.5">
                  ~{productionAnalysis.estimatedDaysNeeded} Hari
                </div>
                <div className="text-[10px] text-[#64748b]">({(productionAnalysis.estimatedDaysNeeded / 30).toFixed(1)} Bulan)</div>
              </div>

              <div className="rounded-xl border border-[#1e3b2e] bg-[#0c1a14] p-3">
                <div className="text-[10px] text-[#94a3b8] uppercase">Output IC Harian</div>
                <div className="text-xl font-bold text-[#ec4899] mt-0.5">
                  {(availableMils * parseFloat(productionAnalysis.effectiveOutputPerFactoryPerDay)).toFixed(1)} IC/Hari
                </div>
                <div className="text-[10px] text-[#64748b]">({productionAnalysis.effectiveOutputPerFactoryPerDay} IC/pabrik)</div>
              </div>
            </div>
          </div>

          {/* Allocation Table & Resource Needs */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Recommended Factory Allocation Table (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              <div className="rounded-xl border border-[#22303c] bg-[#111923] p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-[#1b2835] pb-3">
                  <div>
                    <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#f1f5f9] flex items-center gap-2">
                      <Sliders className="h-4 w-4 text-[#34d399]" />
                      Rekomendasi Alokasi Garis Pabrik ({availableMils} Pabrik Militer)
                    </h4>
                    <p className="text-xs text-[#94a3b8] mt-0.5">
                      Rasio alokasi dihitung otomatis berdasarkan proporsi nilai IC masing-masing senjata agar semua kebutuhan selesai serempak.
                    </p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="border-b border-[#1e2a38] text-[#64748b] uppercase text-[10px]">
                      <tr>
                        <th className="pb-2">Jenis Perlengkapan</th>
                        <th className="pb-2 text-right">Per Divisi</th>
                        <th className="pb-2 text-right">Total {targetDivisionCount} Div</th>
                        <th className="pb-2 text-right">Alokasi Pabrik</th>
                        <th className="pb-2 text-right">Est. Atrisi/Hari</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1a2533]">
                      {productionAnalysis.fullArmyEquipment.map((item, idx) => (
                        <tr key={idx} className="hover:bg-[#141f2b] transition-colors">
                          <td className="py-2.5 font-sans font-semibold text-[#f8fafc]">
                            {item.name}
                          </td>
                          <td className="py-2.5 text-right text-[#94a3b8]">
                            {item.countPerDiv.toLocaleString()}
                          </td>
                          <td className="py-2.5 text-right font-bold text-[#38bdf8]">
                            {item.totalArmyCount.toLocaleString()} unit
                          </td>
                          <td className="py-2.5 text-right">
                            <span className="rounded bg-[#132a1e] border border-[#22c55e]/50 px-2 py-0.5 font-bold text-[#4ade80]">
                              {item.recommendedMils} Mils
                            </span>
                          </td>
                          <td className="py-2.5 text-right text-[#f87171]">
                            ~{item.dailyAttritionEstimated} unit
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="rounded-lg border border-[#1e2a38] bg-[#0d1622] p-3 text-xs text-[#94a3b8] flex items-center justify-between">
                  <span>💡 <strong>Tips Efisiensi:</strong> Jika sedang perang aktif, alokasikan +20% pabrik ekstra ke Senapan dan Truk untuk menutup kerugian atrisi medan perang.</span>
                </div>
              </div>
            </div>

            {/* Right: Resource Demands & Civilian Trade (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="rounded-xl border border-[#22303c] bg-[#111923] p-5 space-y-4">
                <div className="border-b border-[#1b2835] pb-3">
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#f1f5f9] flex items-center gap-2">
                    <Fuel className="h-4 w-4 text-[#fb923c]" />
                    Kebutuhan Bahan Mentah & Impor
                  </h4>
                  <p className="text-xs text-[#94a3b8] mt-0.5">
                    Estimasi pasokan sumber daya yang harus dipenuhi agar tidak terkena penalti efisiensi pabrik.
                  </p>
                </div>

                <div className="space-y-2.5 font-mono text-xs">
                  <div className="flex items-center justify-between rounded-lg border border-[#1e2a38] bg-[#141f2b] p-2.5">
                    <span className="text-[#cbd5e1] flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#94a3b8]" />
                      Baja (Steel)
                    </span>
                    <span className="font-bold text-[#f8fafc]">{productionAnalysis.resources.steel} unit</span>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border border-[#1e2a38] bg-[#141f2b] p-2.5">
                    <span className="text-[#cbd5e1] flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]" />
                      Tungsten
                    </span>
                    <span className="font-bold text-[#f8fafc]">{productionAnalysis.resources.tungsten} unit</span>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border border-[#1e2a38] bg-[#141f2b] p-2.5">
                    <span className="text-[#cbd5e1] flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#38bdf8]" />
                      Karet (Rubber)
                    </span>
                    <span className="font-bold text-[#f8fafc]">{productionAnalysis.resources.rubber} unit</span>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border border-[#1e2a38] bg-[#141f2b] p-2.5">
                    <span className="text-[#cbd5e1] flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#10b981]" />
                      Bahan Bakar Minyak
                    </span>
                    <span className="font-bold text-[#f8fafc]">~{productionAnalysis.resources.oilPerDay} galon/hari</span>
                  </div>
                </div>

                <div className="border-t border-[#1b2835] pt-3">
                  <span className="text-[11px] font-mono text-[#64748b] block mb-1">
                    Estimasi Beban Pabrik Sipil (Civs):
                  </span>
                  <div className="rounded-lg border border-[#3b2b13] bg-[#22180a] p-3 text-xs text-[#fde047]">
                    Jika semua sumber daya di atas harus diimpor dari luar negeri, kamu memerlukan sekitar{' '}
                    <strong>{Math.ceil((productionAnalysis.resources.steel + productionAnalysis.resources.tungsten + productionAnalysis.resources.rubber) / 8)} Pabrik Sipil</strong> (1 Civ = 8 Sumber Daya).
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: PRODUCTION MASTERCLASS GUIDES ("Cara Production yang Bagus") */}
      {/* ========================================================================= */}
      {activeSubTab === 'production_guide' && (
        <div className="space-y-6">
          <div className="rounded-xl border border-[#a855f7]/40 bg-gradient-to-r from-[#1d102b] to-[#121926] p-5">
            <h3 className="text-lg font-bold text-[#f8fafc] flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-[#c084fc]" />
              Masterclass Cara Produksi yang Bagus di Hearts of Iron IV
            </h3>
            <p className="text-xs text-[#94a3b8] mt-1">
              Panduan mendalam tentang alokasi pabrik militer yang benar, trik retensi efisiensi produksi, pencegahan defisit bahan mentah, dan konversi sasis usang dari gudang persediaan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PRODUCTION_RULES_DATA.map(rule => (
              <div
                key={rule.id}
                className="rounded-xl border border-[#233140] bg-[#111a24] p-5 flex flex-col justify-between hover:border-[#a855f7]/50 transition-all shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="rounded border border-[#a855f7]/50 bg-[#25123a] px-2.5 py-0.5 text-xs font-mono font-bold text-[#d8b4fe]">
                      {rule.badge}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-[#f8fafc] mb-2">
                    {rule.title}
                  </h4>

                  <p className="text-xs text-[#cbd5e1] leading-relaxed mb-3">
                    {rule.summary}
                  </p>

                  <div className="space-y-2 border-t border-[#1b2835] pt-3">
                    <span className="text-[11px] font-mono font-semibold text-[#64748b] uppercase">Poin Kunci:</span>
                    <ul className="space-y-1.5 text-xs text-[#94a3b8]">
                      {rule.keyPoints.map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2">
                          <span className="text-[#a855f7] font-bold">•</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {rule.formula && (
                    <div className="mt-3 rounded-lg border border-[#1e2a38] bg-[#0c151e] p-2.5 font-mono text-xs text-[#38bdf8]">
                      <span className="text-[10px] text-[#64748b] block uppercase font-bold">Rumus Hitungan:</span>
                      {rule.formula}
                    </div>
                  )}
                </div>

                <div className="mt-4 rounded-lg border border-[#2d2013] bg-[#1c1409] p-3 text-xs text-[#fde047]">
                  <strong>Saran Praktis: </strong>{rule.recommendation}
                </div>
              </div>
            ))}
          </div>

          {/* Golden Timeline Infographic Card */}
          <div className="rounded-xl border border-[#22303c] bg-[#111923] p-6 space-y-4">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#f1f5f9] flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-[#38bdf8]" />
              Garis Waktu Alokasi Pabrik Militer Rekomendasi Meta (1936 - 1945)
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              <div className="rounded-lg border border-[#1e2a38] bg-[#0f1722] p-4 space-y-2">
                <span className="text-sm font-bold text-[#38bdf8]">Tahun 1936 - 1938</span>
                <p className="text-[11px] text-[#94a3b8] font-sans">
                  Fase Pembangunan Fondasi Dasar: Fokus 100% pada stok amunisi dan perlengkapan infanteri.
                </p>
                <div className="space-y-1 text-[11px] pt-2 border-t border-[#1a2533]">
                  <div className="flex justify-between"><span>Senapan Infanteri:</span><strong className="text-[#f1f5f9]">60%</strong></div>
                  <div className="flex justify-between"><span>Support Equipment:</span><strong className="text-[#f1f5f9]">20%</strong></div>
                  <div className="flex justify-between"><span>Artileri Lapangan:</span><strong className="text-[#f1f5f9]">15%</strong></div>
                  <div className="flex justify-between"><span>Truk Bermotor:</span><strong className="text-[#f1f5f9]">5%</strong></div>
                </div>
              </div>

              <div className="rounded-lg border border-[#1e2a38] bg-[#0f1722] p-4 space-y-2">
                <span className="text-sm font-bold text-[#f59e0b]">Tahun 1939 - 1941</span>
                <p className="text-[11px] text-[#94a3b8] font-sans">
                  Fase Pecah Perang Dunia II: Mulai memproduksi armada tank medium dan pesawat tempur CAS.
                </p>
                <div className="space-y-1 text-[11px] pt-2 border-t border-[#1a2533]">
                  <div className="flex justify-between"><span>Tank Medium:</span><strong className="text-[#f59e0b]">30%</strong></div>
                  <div className="flex justify-between"><span>Senapan Infanteri:</span><strong className="text-[#f1f5f9]">25%</strong></div>
                  <div className="flex justify-between"><span>Pesawat Tempur / CAS:</span><strong className="text-[#38bdf8]">25%</strong></div>
                  <div className="flex justify-between"><span>Artileri & AA:</span><strong className="text-[#f1f5f9]">12%</strong></div>
                  <div className="flex justify-between"><span>Truk & Support:</span><strong className="text-[#f1f5f9]">8%</strong></div>
                </div>
              </div>

              <div className="rounded-lg border border-[#1e2a38] bg-[#0f1722] p-4 space-y-2">
                <span className="text-sm font-bold text-[#10b981]">Tahun 1942 - 1945+</span>
                <p className="text-[11px] text-[#94a3b8] font-sans">
                  Fase Perang Total & Supremasi: Mekanisasi penuh dan transisi ke tank modern serta jet.
                </p>
                <div className="space-y-1 text-[11px] pt-2 border-t border-[#1a2533]">
                  <div className="flex justify-between"><span>Modern / Heavy Tanks:</span><strong className="text-[#10b981]">35%</strong></div>
                  <div className="flex justify-between"><span>Pesawat Tempur Lanjutan:</span><strong className="text-[#38bdf8]">30%</strong></div>
                  <div className="flex justify-between"><span>Infanteri Mekanis (APC):</span><strong className="text-[#f1f5f9]">15%</strong></div>
                  <div className="flex justify-between"><span>Senapan & Perlengkapan:</span><strong className="text-[#f1f5f9]">15%</strong></div>
                  <div className="flex justify-between"><span>Roket & Khusus:</span><strong className="text-[#f1f5f9]">5%</strong></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 5: SPLIT-VIEW COMPARATOR */}
      {activeSubTab === 'split_compare' && (
        <DivisionSplitCompare customStats={liveStats} />
      )}

      {/* VIEW 6: ARMY LOGISTICS & CONSUMPTION CALCULATOR */}
      {activeSubTab === 'army_logistics' && (
        <ArmyLogisticsCalculator />
      )}

      {/* VIEW 6B: NSB LOGISTICS, SPEED & FUEL THROUGHPUT CALCULATOR */}
      {activeSubTab === 'nsb_logistics' && (
        <LogisticsCalculator />
      )}

      {/* VIEW 7: WAR & BATTLE SIMULATOR ESTIMATOR */}
      {activeSubTab === 'battle_estimator' && (
        <BattleResultEstimator />
      )}
    </div>
  );
};
