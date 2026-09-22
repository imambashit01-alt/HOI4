import React, { useState, useMemo, useEffect } from 'react';
import {
  Globe, Shield, Swords, Skull, Flag, TrendingUp, TrendingDown,
  AlertTriangle, CheckCircle2, Flame, RefreshCw, BarChart3,
  Sliders, Award, Radio, Info, Eye, Layers, Percent, Activity,
  Crosshair, ShieldAlert, Zap, BookOpen, Clock, HeartHandshake,
  Compass, MapPin
} from 'lucide-react';
import { WW2RealMapTimeline } from './WW2RealMapTimeline';
import { HOI4LeaderPortrait } from './HOI4LeaderPortrait';
import { HOI4LeaderDossierModal } from './HOI4LeaderDossierModal';
import { hoi4LeaderService } from '../services/hoi4LeaderService';

export interface MajorNationWarData {
  tag: string;
  name: string;
  flag: string;
  faction: 'Axis' | 'Allies' | 'Comintern' | 'Co-Prosperity' | 'Neutral';
  factionColor: string;
  stability: number; // in %
  warSupport: number; // in %
  casualtiesSuffered: number; // in millions
  casualtiesInflicted: number; // in millions
  surrenderProgress: number; // 0 to 100%
  surrenderLimit: number; // e.g. 80% (surrenders if surrenderProgress >= surrenderLimit)
  activeDivisions: number;
  militaryFactories: number;
  civilianFactories: number;
  dockyards: number;
  equipmentLost: {
    infantryEquip: number; // in thousands
    tanks: number;
    planes: number;
    shipsSunk: number;
    convoysLost: number;
  };
  nationalSpirits: string[];
  vulnerabilities: string;
}

export interface WarScenario {
  id: string;
  title: string;
  year: string;
  worldTension: number;
  description: string;
  belligerents: {
    sideA: string; // e.g. "Poros (Axis)"
    sideB: string; // e.g. "Sekutu & Komintern (Allies & Comintern)"
  };
  totalWorldCasualties: number; // in millions
  nations: MajorNationWarData[];
}

export const WAR_SCENARIOS: WarScenario[] = [
  {
    id: 'ww2_climax_1943',
    title: 'Perang Total: Titik Balik Stalingrad & Kursk (1943)',
    year: '1943',
    worldTension: 100,
    description: 'Front Timur membara dalam pertempuran tank terbesar sepanjang sejarah di Kursk. Sekutu mendarat di Sisilia, menekan Italia ke ambang keruntuhan faksi.',
    belligerents: {
      sideA: 'Blok Poros (Axis Powers)',
      sideB: 'Sekutu Barat & Uni Soviet'
    },
    totalWorldCasualties: 24.8,
    nations: [
      {
        tag: 'GER',
        name: 'Jerman (German Reich)',
        flag: '🇩🇪',
        faction: 'Axis',
        factionColor: '#ef4444',
        stability: 78,
        warSupport: 88,
        casualtiesSuffered: 4.2,
        casualtiesInflicted: 7.8,
        surrenderProgress: 12,
        surrenderLimit: 85,
        activeDivisions: 340,
        militaryFactories: 185,
        civilianFactories: 95,
        dockyards: 45,
        equipmentLost: {
          infantryEquip: 1250,
          tanks: 8400,
          planes: 12300,
          shipsSunk: 18,
          convoysLost: 420
        },
        nationalSpirits: ['Total War', 'General Staff', 'Bitter Loser'],
        vulnerabilities: 'Kelangkaan minyak mentah sintetik dan ancaman pembukaan front kedua di Prancis barat.'
      },
      {
        tag: 'SOV',
        name: 'Uni Soviet (USSR)',
        flag: '☭',
        faction: 'Comintern',
        factionColor: '#dc2626',
        stability: 72,
        warSupport: 95,
        casualtiesSuffered: 8.9,
        casualtiesInflicted: 5.1,
        surrenderProgress: 35,
        surrenderLimit: 80,
        activeDivisions: 480,
        militaryFactories: 210,
        civilianFactories: 80,
        dockyards: 20,
        equipmentLost: {
          infantryEquip: 2900,
          tanks: 14500,
          planes: 16800,
          shipsSunk: 24,
          convoysLost: 180
        },
        nationalSpirits: ['The Great Patriotic War', 'Order No. 227 (Ni Shagu Nazad!)', 'Lend-Lease Recipient'],
        vulnerabilities: 'Kerugian manpower usia kerja masif dan kerusakan berat pada pusat industri barat.'
      },
      {
        tag: 'USA',
        name: 'Amerika Serikat (USA)',
        flag: '🇺🇸',
        faction: 'Allies',
        factionColor: '#3b82f6',
        stability: 92,
        warSupport: 84,
        casualtiesSuffered: 0.35,
        casualtiesInflicted: 1.6,
        surrenderProgress: 0,
        surrenderLimit: 80,
        activeDivisions: 125,
        militaryFactories: 290,
        civilianFactories: 220,
        dockyards: 140,
        equipmentLost: {
          infantryEquip: 180,
          tanks: 1100,
          planes: 3400,
          shipsSunk: 32,
          convoysLost: 310
        },
        nationalSpirits: ['Arsenal of Democracy', 'War Bonds Campaigns', 'Giant Wakes'],
        vulnerabilities: 'Dukungan perang rentan turun jika terjadi pembantaian massal saat invasi amfibi.'
      },
      {
        tag: 'ENG',
        name: 'Inggris Raya (United Kingdom)',
        flag: '🇬🇧',
        faction: 'Allies',
        factionColor: '#3b82f6',
        stability: 86,
        warSupport: 82,
        casualtiesSuffered: 0.72,
        casualtiesInflicted: 1.9,
        surrenderProgress: 8,
        surrenderLimit: 75,
        activeDivisions: 110,
        militaryFactories: 120,
        civilianFactories: 110,
        dockyards: 85,
        equipmentLost: {
          infantryEquip: 480,
          tanks: 2400,
          planes: 7900,
          shipsSunk: 68,
          convoysLost: 1450
        },
        nationalSpirits: ['Their Finest Hour', 'King and Country', 'Bletchley Park Cryptology'],
        vulnerabilities: 'Ketergantungan fatal pada konvoi suplai samudra Atlantik dari serangan U-Boat.'
      },
      {
        tag: 'JAP',
        name: 'Kekaisaran Jepang (Empire of Japan)',
        flag: '🇯🇵',
        faction: 'Co-Prosperity',
        factionColor: '#f59e0b',
        stability: 84,
        warSupport: 92,
        casualtiesSuffered: 1.8,
        casualtiesInflicted: 3.4,
        surrenderProgress: 14,
        surrenderLimit: 90,
        activeDivisions: 190,
        militaryFactories: 95,
        civilianFactories: 70,
        dockyards: 65,
        equipmentLost: {
          infantryEquip: 580,
          tanks: 950,
          planes: 5600,
          shipsSunk: 55,
          convoysLost: 890
        },
        nationalSpirits: ['State Shintoism', 'Warrior Traditions', 'Inter-Service Rivalry'],
        vulnerabilities: 'Cadangan minyak menipis drastis dan pertahanan pulau terpencar rentan dilompati (*Island Hopping*).'
      },
      {
        tag: 'ITA',
        name: 'Kerajaan Italia (Kingdom of Italy)',
        flag: '🇮🇹',
        faction: 'Axis',
        factionColor: '#ef4444',
        stability: 42,
        warSupport: 48,
        casualtiesSuffered: 1.1,
        casualtiesInflicted: 0.8,
        surrenderProgress: 68,
        surrenderLimit: 70,
        activeDivisions: 78,
        militaryFactories: 48,
        civilianFactories: 40,
        dockyards: 32,
        equipmentLost: {
          infantryEquip: 520,
          tanks: 1400,
          planes: 2800,
          shipsSunk: 48,
          convoysLost: 580
        },
        nationalSpirits: ['Vittoria Mutilata', 'Grand Council of Fascism', 'Inefficient Industry'],
        vulnerabilities: 'Stabilitas & Dukungan Perang di bawah 50%: Dewan Fasis akan menggulingkan Mussolini jika Sekutu merebut Roma!'
      },
      {
        tag: 'FRA',
        name: 'Republik Prancis (Free France & Vichy)',
        flag: '🇫🇷',
        faction: 'Allies',
        factionColor: '#3b82f6',
        stability: 56,
        warSupport: 68,
        casualtiesSuffered: 1.45,
        casualtiesInflicted: 1.1,
        surrenderProgress: 88,
        surrenderLimit: 70,
        activeDivisions: 45,
        militaryFactories: 22,
        civilianFactories: 28,
        dockyards: 18,
        equipmentLost: {
          infantryEquip: 740,
          tanks: 1900,
          planes: 2100,
          shipsSunk: 38,
          convoysLost: 310
        },
        nationalSpirits: ['Free French Resistance', 'Victors of the Great War (Overcome)'],
        vulnerabilities: 'Daratan metropolitan masih diduduki Jerman; mengandalkan koloni Afrika dan bantuan Sekutu.'
      }
    ]
  },
  {
    id: 'barbarossa_1941',
    title: 'Operasi Barbarossa: Invasi Garis Molotov (1941)',
    year: '1941',
    worldTension: 95,
    description: 'Tiga kelompok tentara Wehrmacht (Heeresgruppe Nord, Mitte, Süd) merangsek masuk ke Uni Soviet, memicu perang atrisi brutal.',
    belligerents: {
      sideA: 'Jerman & Poros Eropa',
      sideB: 'Uni Soviet & Inggris Raya'
    },
    totalWorldCasualties: 8.5,
    nations: [
      {
        tag: 'GER',
        name: 'Jerman (German Reich)',
        flag: '🇩🇪',
        faction: 'Axis',
        factionColor: '#ef4444',
        stability: 85,
        warSupport: 92,
        casualtiesSuffered: 0.85,
        casualtiesInflicted: 3.6,
        surrenderProgress: 0,
        surrenderLimit: 85,
        activeDivisions: 280,
        militaryFactories: 160,
        civilianFactories: 105,
        dockyards: 40,
        equipmentLost: { infantryEquip: 320, tanks: 2100, planes: 4100, shipsSunk: 8, convoysLost: 150 },
        nationalSpirits: ['Blitzkrieg Doctrine', 'General Staff'],
        vulnerabilities: 'Jalur logistik terlalu panjang dan lumpur Rasputitsa musim gugur mengintai.'
      },
      {
        tag: 'SOV',
        name: 'Uni Soviet (USSR)',
        flag: '☭',
        faction: 'Comintern',
        factionColor: '#dc2626',
        stability: 70,
        warSupport: 88,
        casualtiesSuffered: 4.1,
        casualtiesInflicted: 0.95,
        surrenderProgress: 42,
        surrenderLimit: 80,
        activeDivisions: 360,
        militaryFactories: 140,
        civilianFactories: 95,
        dockyards: 18,
        equipmentLost: { infantryEquip: 1800, tanks: 9800, planes: 8900, shipsSunk: 12, convoysLost: 60 },
        nationalSpirits: ['Officer Purge Penalties', 'Relocation of Industry to Urals'],
        vulnerabilities: 'Penalti pembersihan perwira Red Army dan pengepungan kantong Kiev/Minsk.'
      },
      {
        tag: 'USA',
        name: 'Amerika Serikat (USA)',
        flag: '🇺🇸',
        faction: 'Allies',
        factionColor: '#3b82f6',
        stability: 86,
        warSupport: 52,
        casualtiesSuffered: 0.01,
        casualtiesInflicted: 0.05,
        surrenderProgress: 0,
        surrenderLimit: 80,
        activeDivisions: 48,
        militaryFactories: 110,
        civilianFactories: 190,
        dockyards: 90,
        equipmentLost: { infantryEquip: 10, tanks: 50, planes: 180, shipsSunk: 4, convoysLost: 45 },
        nationalSpirits: ['Great Depression Recovery', 'Neutrality Acts Pending'],
        vulnerabilities: 'Dukungan perang belum cukup untuk Deklarasi Perang Total sebelum Pearl Harbor.'
      },
      {
        tag: 'ENG',
        name: 'Inggris Raya (United Kingdom)',
        flag: '🇬🇧',
        faction: 'Allies',
        factionColor: '#3b82f6',
        stability: 84,
        warSupport: 86,
        casualtiesSuffered: 0.45,
        casualtiesInflicted: 0.9,
        surrenderProgress: 6,
        surrenderLimit: 75,
        activeDivisions: 88,
        militaryFactories: 98,
        civilianFactories: 95,
        dockyards: 75,
        equipmentLost: { infantryEquip: 290, tanks: 1200, planes: 4800, shipsSunk: 42, convoysLost: 890 },
        nationalSpirits: ['Battle of Britain Victors', 'Fortress Island'],
        vulnerabilities: 'Pengeboman kota London (The Blitz) dan ancaman Rommel di Tobruk.'
      },
      {
        tag: 'JAP',
        name: 'Kekaisaran Jepang (Empire of Japan)',
        flag: '🇯🇵',
        faction: 'Co-Prosperity',
        factionColor: '#f59e0b',
        stability: 82,
        warSupport: 88,
        casualtiesSuffered: 0.95,
        casualtiesInflicted: 2.1,
        surrenderProgress: 5,
        surrenderLimit: 90,
        activeDivisions: 145,
        militaryFactories: 75,
        civilianFactories: 60,
        dockyards: 55,
        equipmentLost: { infantryEquip: 240, tanks: 380, planes: 1800, shipsSunk: 18, convoysLost: 240 },
        nationalSpirits: ['Strike South Decision', 'Chinese Meat Grinder'],
        vulnerabilities: 'Embargo minyak Amerika Serikat menuntut ekspansi mendesak ke Hindia Belanda.'
      },
      {
        tag: 'ITA',
        name: 'Kerajaan Italia (Kingdom of Italy)',
        flag: '🇮🇹',
        faction: 'Axis',
        factionColor: '#ef4444',
        stability: 58,
        warSupport: 62,
        casualtiesSuffered: 0.48,
        casualtiesInflicted: 0.4,
        surrenderProgress: 25,
        surrenderLimit: 70,
        activeDivisions: 70,
        militaryFactories: 40,
        civilianFactories: 38,
        dockyards: 28,
        equipmentLost: { infantryEquip: 210, tanks: 680, planes: 1200, shipsSunk: 25, convoysLost: 310 },
        nationalSpirits: ['Mare Nostrum Ambition', 'Supply Bottlenecks in Libya'],
        vulnerabilities: 'Armada laut menderita kekalahan di Taranto dan Matapan.'
      },
      {
        tag: 'FRA',
        name: 'Republik Prancis (Vichy / Free France)',
        flag: '🇫🇷',
        faction: 'Allies',
        factionColor: '#3b82f6',
        stability: 45,
        warSupport: 50,
        casualtiesSuffered: 1.25,
        casualtiesInflicted: 0.9,
        surrenderProgress: 90,
        surrenderLimit: 70,
        activeDivisions: 30,
        militaryFactories: 18,
        civilianFactories: 25,
        dockyards: 15,
        equipmentLost: { infantryEquip: 650, tanks: 1600, planes: 1800, shipsSunk: 30, convoysLost: 200 },
        nationalSpirits: ['Capitulated Metropolitan', 'Colonial Remnants'],
        vulnerabilities: 'Ibukota Paris jatuh di 1940; terbelah antara Vichy kolaborator dan De Gaulle.'
      }
    ]
  },
  {
    id: 'outbreak_1939',
    title: 'Pecahnya Perang: Invasi Polandia (September 1939)',
    year: '1939',
    worldTension: 68,
    description: 'Blitzkrieg melibas Polandia dalam hitungan minggu. Inggris dan Prancis menyatakan perang terhadap Reich Jerman, memulai Perang Dunia Kedua.',
    belligerents: {
      sideA: 'Jerman & Faksi Poros',
      sideB: 'Polandia, Inggris & Prancis'
    },
    totalWorldCasualties: 0.35,
    nations: [
      {
        tag: 'GER',
        name: 'Jerman (German Reich)',
        flag: '🇩🇪',
        faction: 'Axis',
        factionColor: '#ef4444',
        stability: 88,
        warSupport: 85,
        casualtiesSuffered: 0.05,
        casualtiesInflicted: 0.28,
        surrenderProgress: 0,
        surrenderLimit: 85,
        activeDivisions: 140,
        militaryFactories: 115,
        civilianFactories: 90,
        dockyards: 32,
        equipmentLost: { infantryEquip: 40, tanks: 280, planes: 550, shipsSunk: 2, convoysLost: 35 },
        nationalSpirits: ['MEFO Bills', 'Reoccupation of Rhineland'],
        vulnerabilities: 'Kekurangan cadangan karet alam dan pasokan bijih besi dari Swedia.'
      },
      {
        tag: 'SOV',
        name: 'Uni Soviet (USSR)',
        flag: '☭',
        faction: 'Comintern',
        factionColor: '#dc2626',
        stability: 75,
        warSupport: 65,
        casualtiesSuffered: 0.02,
        casualtiesInflicted: 0.04,
        surrenderProgress: 0,
        surrenderLimit: 80,
        activeDivisions: 220,
        militaryFactories: 85,
        civilianFactories: 80,
        dockyards: 15,
        equipmentLost: { infantryEquip: 25, tanks: 120, planes: 140, shipsSunk: 1, convoysLost: 10 },
        nationalSpirits: ['Molotov-Ribbentrop Pact', 'Lessons of Winter War'],
        vulnerabilities: 'Kekacauan komando militer pasca-Pembersihan Stalin (Great Purge).'
      },
      {
        tag: 'USA',
        name: 'Amerika Serikat (USA)',
        flag: '🇺🇸',
        faction: 'Allies',
        factionColor: '#3b82f6',
        stability: 85,
        warSupport: 30,
        casualtiesSuffered: 0.0,
        casualtiesInflicted: 0.0,
        surrenderProgress: 0,
        surrenderLimit: 80,
        activeDivisions: 36,
        militaryFactories: 42,
        civilianFactories: 145,
        dockyards: 48,
        equipmentLost: { infantryEquip: 0, tanks: 0, planes: 0, shipsSunk: 0, convoysLost: 0 },
        nationalSpirits: ['Isolationist Public', 'Civilian Economy'],
        vulnerabilities: 'Sentimen isolasionis rakyat melarang keterlibatan militer luar negeri.'
      },
      {
        tag: 'ENG',
        name: 'Inggris Raya (United Kingdom)',
        flag: '🇬🇧',
        faction: 'Allies',
        factionColor: '#3b82f6',
        stability: 85,
        warSupport: 72,
        casualtiesSuffered: 0.02,
        casualtiesInflicted: 0.04,
        surrenderProgress: 0,
        surrenderLimit: 75,
        activeDivisions: 55,
        militaryFactories: 65,
        civilianFactories: 80,
        dockyards: 60,
        equipmentLost: { infantryEquip: 15, tanks: 80, planes: 210, shipsSunk: 6, convoysLost: 85 },
        nationalSpirits: ['Guarantee of Polish Independence', 'British Expeditionary Force'],
        vulnerabilities: 'Mobilisasi industri perang baru tahap awal (Early Mobilization).'
      },
      {
        tag: 'JAP',
        name: 'Kekaisaran Jepang (Empire of Japan)',
        flag: '🇯🇵',
        faction: 'Co-Prosperity',
        factionColor: '#f59e0b',
        stability: 80,
        warSupport: 84,
        casualtiesSuffered: 0.45,
        casualtiesInflicted: 1.1,
        surrenderProgress: 0,
        surrenderLimit: 90,
        activeDivisions: 110,
        militaryFactories: 58,
        civilianFactories: 52,
        dockyards: 45,
        equipmentLost: { infantryEquip: 110, tanks: 180, planes: 750, shipsSunk: 5, convoysLost: 90 },
        nationalSpirits: ['Marco Polo Bridge Incident', 'Escalation in China'],
        vulnerabilities: 'Pasukan terjebak dalam pertempuran atrisi luas di pedalaman daratan Tiongkok.'
      },
      {
        tag: 'ITA',
        name: 'Kerajaan Italia (Kingdom of Italy)',
        flag: '🇮🇹',
        faction: 'Axis',
        factionColor: '#ef4444',
        stability: 68,
        warSupport: 55,
        casualtiesSuffered: 0.02,
        casualtiesInflicted: 0.03,
        surrenderProgress: 0,
        surrenderLimit: 70,
        activeDivisions: 55,
        militaryFactories: 32,
        civilianFactories: 35,
        dockyards: 22,
        equipmentLost: { infantryEquip: 10, tanks: 40, planes: 80, shipsSunk: 2, convoysLost: 25 },
        nationalSpirits: ['Pact of Steel', 'Non-Belligerent Temporary'],
        vulnerabilities: 'Tentara belum siap untuk perang modern skala besar melawan kekuatan adidaya.'
      },
      {
        tag: 'FRA',
        name: 'Republik Prancis (French Republic)',
        flag: '🇫🇷',
        faction: 'Allies',
        factionColor: '#3b82f6',
        stability: 50,
        warSupport: 52,
        casualtiesSuffered: 0.03,
        casualtiesInflicted: 0.05,
        surrenderProgress: 0,
        surrenderLimit: 65,
        activeDivisions: 80,
        militaryFactories: 52,
        civilianFactories: 58,
        dockyards: 28,
        equipmentLost: { infantryEquip: 20, tanks: 110, planes: 190, shipsSunk: 3, convoysLost: 35 },
        nationalSpirits: ['Victors of the Great War', 'Disjointed Government', 'Protected by Maginot Line'],
        vulnerabilities: 'Doktrin perang statis bergantung pada Garis Maginot dan kelemahan di Ardennes.'
      }
    ]
  }
];

export const GlobalWarTracker: React.FC = () => {
  // Scenario Selection
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('ww2_climax_1943');
  const [filterFaction, setFilterFaction] = useState<string>('all');
  const [selectedNationTag, setSelectedNationTag] = useState<string>('GER');

  // Tab Switcher between Timeline Real Map and 7 Majors Simulator
  const [trackerTab, setTrackerTab] = useState<'timeline_map' | 'majors_simulator' | 'all'>('timeline_map');
  const [syncToastMessage, setSyncToastMessage] = useState<string | null>(null);

  // Leader Dossier Modal state
  const [isDossierOpen, setIsDossierOpen] = useState<boolean>(false);
  const [selectedDossierTag, setSelectedDossierTag] = useState<string>('GER');

  // Preload all 7 major nation portraits in background
  useEffect(() => {
    hoi4LeaderService.preloadAllMajors();
  }, []);

  const handleSyncWithSimulation = (scenarioId: string, year: number) => {
    const targetScenario = WAR_SCENARIOS.find(s => s.id === scenarioId);
    if (targetScenario) {
      setSelectedScenarioId(scenarioId);
      setSyncToastMessage(`Data simulasi berhasil disinkronkan dengan Linimasa Sejarah: [Tahun ${targetScenario.year}] ${targetScenario.title}`);
      setTimeout(() => setSyncToastMessage(null), 6000);
    }
  };

  // Dynamic War Modifiers (Playthrough interactive state)
  const [strategicBombingTarget, setStrategicBombingTarget] = useState<boolean>(false);
  const [convoyRaidingSevere, setConvoyRaidingSevere] = useState<boolean>(false);
  const [heroPropagandaActive, setHeroPropagandaActive] = useState<boolean>(false);
  const [capitalThreatened, setCapitalThreatened] = useState<boolean>(false);

  // Active Scenario
  const scenario = useMemo(() => {
    return WAR_SCENARIOS.find(s => s.id === selectedScenarioId) || WAR_SCENARIOS[0];
  }, [selectedScenarioId]);

  // Selected Nation object
  const activeNation = useMemo(() => {
    return scenario.nations.find(n => n.tag === selectedNationTag) || scenario.nations[0];
  }, [scenario, selectedNationTag]);

  // Calculate dynamic war support and surrender threshold based on modifiers
  const dynamicStats = useMemo(() => {
    let ws = activeNation.warSupport;
    let stab = activeNation.stability;
    let surrenderProg = activeNation.surrenderProgress;

    // Apply interactive modifiers
    if (strategicBombingTarget) {
      ws = Math.max(5, ws - 12);
      stab = Math.max(5, stab - 8);
    }
    if (convoyRaidingSevere) {
      ws = Math.max(5, ws - 10);
    }
    if (heroPropagandaActive) {
      ws = Math.min(100, ws + 10);
      stab = Math.min(100, stab + 5);
    }
    if (capitalThreatened) {
      surrenderProg = Math.min(100, surrenderProg + 35);
      ws = Math.max(5, ws - 15);
    }

    // Kill / Loss Ratio
    const killLossRatio = activeNation.casualtiesSuffered > 0
      ? (activeNation.casualtiesInflicted / activeNation.casualtiesSuffered).toFixed(2)
      : '∞';

    // Casualty War Support Impact:
    // In HOI4: When casualties exceed 1M or 5% of manpower, war support suffers up to -30%
    const casualtyPenalty = activeNation.casualtiesSuffered >= 3.0 ? 30 : Math.round(activeNation.casualtiesSuffered * 10);

    // Surrender risk evaluation
    const isAtRiskOfCapitulation = surrenderProg >= activeNation.surrenderLimit;
    const isNearCapitulation = surrenderProg >= activeNation.surrenderLimit - 15;

    return {
      currentWarSupport: ws,
      currentStability: stab,
      currentSurrenderProgress: surrenderProg,
      killLossRatio,
      casualtyPenalty,
      isAtRiskOfCapitulation,
      isNearCapitulation
    };
  }, [activeNation, strategicBombingTarget, convoyRaidingSevere, heroPropagandaActive, capitalThreatened]);

  // Filtered Nations List
  const displayNations = useMemo(() => {
    if (filterFaction === 'all') return scenario.nations;
    return scenario.nations.filter(n => n.faction.toLowerCase() === filterFaction.toLowerCase());
  }, [scenario, filterFaction]);

  return (
    <div className="space-y-6 text-[#f1f5f9]">
      {/* Top Banner & Scenario Switcher */}
      <div className="rounded-xl border border-red-500/40 bg-gradient-to-r from-[#1f0a0d] via-[#140b17] to-[#0d0f1f] p-5 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-400 shadow-inner">
              <Globe className="h-7 w-7 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-serif text-xl sm:text-2xl font-black tracking-tight text-[#fef3c7] uppercase">
                  Pelacak Perang Global (Global War Tracker)
                </h2>
                <span className="rounded bg-red-500/25 border border-red-500/50 px-2 py-0.5 text-[11px] font-mono text-red-300 font-bold">
                  7 KEKUATAN UTAMA (MAJORS)
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#cbd5e1] mt-0.5 max-w-3xl">
                Pantau status aktif peperangan global, rasio korban militer (Kill/Loss), tingkat Stabilitas, dan Dukungan Perang (War Support) dari tujuh adidaya Perang Dunia II.
              </p>
            </div>
          </div>

          {/* Scenario Selector Dropdown */}
          <div className="flex items-center gap-2 self-start lg:self-auto">
            <div className="text-right hidden sm:block">
              <span className="text-[10px] font-mono text-[#94a3b8] uppercase tracking-wider block">Skenario Perang:</span>
              <span className="text-xs font-mono font-bold text-amber-300">{scenario.year} Snapshot</span>
            </div>
            <select
              value={selectedScenarioId}
              onChange={(e) => setSelectedScenarioId(e.target.value)}
              className="rounded-lg border border-red-500/40 bg-[#160b10] px-3 py-2 text-xs font-mono font-bold text-white outline-none focus:border-red-400"
            >
              {WAR_SCENARIOS.map(s => (
                <option key={s.id} value={s.id} className="bg-[#120a10] text-white">
                  [{s.year}] {s.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* World Tension & Conflict Overview Bar */}
        <div className="mt-4 pt-4 border-t border-red-500/20 grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
          {/* World Tension Gauge */}
          <div className="p-3 rounded-lg bg-black/40 border border-white/10">
            <div className="flex justify-between items-center text-[#94a3b8]">
              <span>Ketegangan Dunia (World Tension):</span>
              <span className="font-bold text-red-400">{scenario.worldTension}%</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-1.5">
              <div
                className="h-full bg-gradient-to-r from-yellow-500 via-orange-500 to-red-600 transition-all duration-500"
                style={{ width: `${scenario.worldTension}%` }}
              />
            </div>
            <span className="text-[10px] text-amber-300 mt-1 block">
              {scenario.worldTension >= 100
                ? 'Perang Total: Pembatasan pakta & jaminan kemerdekaan terbuka penuh'
                : scenario.worldTension >= 50
                ? 'Eskalasi Besar: Pengiriman korps sukarelawan & bantuan sewa-guna (Lend-Lease)'
                : 'Fase Persiapan Awal: Dunia masih enggan terlibat konflik militer langsung'}
            </span>
          </div>

          {/* Total World Casualties */}
          <div className="p-3 rounded-lg bg-black/40 border border-white/10">
            <span className="text-[#94a3b8] block">Total Korban Jiwa Global:</span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-xl font-bold font-mono text-red-400">
                {scenario.totalWorldCasualties} Juta
              </span>
              <span className="text-[10px] text-[#94a3b8]">Gugur di Medan Perang</span>
            </div>
            <span className="text-[10px] text-[#cbd5e1] mt-1 block truncate">
              {scenario.belligerents.sideA} vs {scenario.belligerents.sideB}
            </span>
          </div>

          {/* Active Frontlines */}
          <div className="p-3 rounded-lg bg-black/40 border border-white/10">
            <span className="text-[#94a3b8] block">Status Front Pertempuran:</span>
            <div className="flex items-center gap-1.5 text-emerald-300 font-bold mt-0.5">
              <Activity className="h-4 w-4 text-emerald-400 shrink-0" />
              <span className="truncate">Front Timur, Pasifik, Atlantik</span>
            </div>
            <span className="text-[10px] text-[#94a3b8] mt-1 block">
              7 Negara Adidaya dalam Mobilisasi Penuh
            </span>
          </div>

          {/* Faction Filter Buttons */}
          <div className="p-3 rounded-lg bg-black/40 border border-white/10 flex flex-col justify-between">
            <span className="text-[#94a3b8] block">Filter Blok Faksi:</span>
            <div className="flex items-center gap-1 mt-1">
              {[
                { id: 'all', label: 'Semua' },
                { id: 'Axis', label: 'Poros' },
                { id: 'Allies', label: 'Sekutu' },
                { id: 'Comintern', label: 'Komintern' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setFilterFaction(f.id)}
                  className={`px-2 py-1 rounded text-[10px] font-bold font-mono transition-all ${
                    filterFaction === f.id
                      ? 'bg-red-600 text-white shadow'
                      : 'bg-white/5 text-[#94a3b8] hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sync Notification Toast Banner */}
      {syncToastMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-200 text-xs font-mono flex items-center justify-between shadow-lg animate-fade-in">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
            <span className="font-semibold">{syncToastMessage}</span>
          </div>
          <button
            onClick={() => setSyncToastMessage(null)}
            className="text-emerald-400 hover:text-white px-2 py-0.5 rounded hover:bg-emerald-900/40 text-xs"
          >
            ✕ Tutup
          </button>
        </div>
      )}

      {/* Sub-Navigation: Timeline & Real Map vs 7 Majors Simulator */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0a0f1d] p-2 rounded-xl border border-[#273256] shadow-lg">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setTrackerTab('timeline_map')}
            className={`px-4 py-2 rounded-lg font-mono text-xs font-bold flex items-center gap-2 transition-all ${
              trackerTab === 'timeline_map'
                ? 'bg-gradient-to-r from-amber-600 to-red-600 text-white shadow-lg shadow-amber-900/40 border border-amber-400/40'
                : 'bg-white/5 text-[#94a3b8] hover:text-white hover:bg-white/10'
            }`}
          >
            <Compass className="h-4 w-4 text-amber-300" />
            <span>Peta Realistis PD II & Linimasa Sejarah</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-400/30 text-amber-200 border border-amber-400/40 font-black">
              REAL MAP WW2
            </span>
          </button>

          <button
            onClick={() => setTrackerTab('majors_simulator')}
            className={`px-4 py-2 rounded-lg font-mono text-xs font-bold flex items-center gap-2 transition-all ${
              trackerTab === 'majors_simulator'
                ? 'bg-gradient-to-r from-red-600 to-rose-700 text-white shadow-lg shadow-red-900/40 border border-red-400/40'
                : 'bg-white/5 text-[#94a3b8] hover:text-white hover:bg-white/10'
            }`}
          >
            <Flag className="h-4 w-4 text-red-300" />
            <span>Matriks 7 Negara Adidaya & Simulator Modifikator</span>
          </button>

          <button
            onClick={() => setTrackerTab('all')}
            className={`px-3.5 py-2 rounded-lg font-mono text-xs font-medium flex items-center gap-1.5 transition-all ${
              trackerTab === 'all'
                ? 'bg-blue-600 text-white shadow border border-blue-400/40'
                : 'bg-white/5 text-[#94a3b8] hover:text-white hover:bg-white/10'
            }`}
          >
            <Layers className="h-4 w-4" />
            <span className="hidden sm:inline">Tampilan Terpadu (Keduanya)</span>
          </button>
        </div>

        <div className="text-[11px] font-mono text-slate-400 px-2 flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5 text-amber-400" />
          <span>Skenario: <strong className="text-white">[{scenario.year}] {scenario.title.split(':')[0]}</strong></span>
        </div>
      </div>

      {/* 1. Real WWII Map & Historical Timeline View */}
      {(trackerTab === 'timeline_map' || trackerTab === 'all') && (
        <WW2RealMapTimeline onSyncWithSimulation={handleSyncWithSimulation} />
      )}

      {/* 2. Seven Majors Cards Grid & Simulator View */}
      {(trackerTab === 'majors_simulator' || trackerTab === 'all') && (
        <div className="space-y-6">
          {/* Seven Majors Cards Grid */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <Flag className="h-5 w-5 text-red-400" />
                <h3 className="font-serif text-base font-bold text-[#fef3c7]">
                  Ringkasan 7 Negara Utama (The Seven Majors)
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setSelectedDossierTag(selectedNationTag);
                    setIsDossierOpen(true);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-600/30 to-amber-700/30 hover:from-amber-600/50 hover:to-amber-700/50 border border-amber-500/50 text-amber-200 font-mono text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
                  title="Buka galeri portret resmi dan sifat pemimpin 7 negara adidaya"
                >
                  <Award className="h-4 w-4 text-amber-400" />
                  <span>Portret Pemimpin HOI4 (7 Majors)</span>
                </button>
                <span className="text-xs font-mono text-[#94a3b8] hidden sm:inline">
                  Klik kartu untuk inspeksi taktis
                </span>
              </div>
            </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
          {displayNations.map((nation) => {
            const isSelected = selectedNationTag === nation.tag;
            const ratio = nation.casualtiesSuffered > 0
              ? (nation.casualtiesInflicted / nation.casualtiesSuffered).toFixed(2)
              : '∞';

            return (
              <div
                key={nation.tag}
                onClick={() => setSelectedNationTag(nation.tag)}
                className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-amber-500 bg-gradient-to-b from-[#2a1b10] to-[#120a10] shadow-lg ring-2 ring-amber-500/50 transform -translate-y-0.5'
                    : 'border-[#273256] bg-[#0c1224] hover:border-slate-500 hover:bg-[#111933]'
                }`}
              >
                {/* Nation Leader Portrait & Flag Badge */}
                <div>
                  <div className="flex items-start justify-between gap-1 mb-2">
                    <HOI4LeaderPortrait
                      tag={nation.tag}
                      size="sm"
                      showNameplate={false}
                      showTraitsOnHover={true}
                      showStatusLamp={true}
                      showIdeologyBadge={true}
                      interactive={true}
                      onClick={() => {
                        setSelectedDossierTag(nation.tag);
                        setIsDossierOpen(true);
                      }}
                    />
                    <div className="flex flex-col items-end">
                      <span className="text-xl" title={nation.name}>{nation.flag}</span>
                      <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-bold uppercase mt-1 ${
                        nation.faction === 'Axis' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
                        nation.faction === 'Allies' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                        nation.faction === 'Comintern' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                        'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}>
                        {nation.tag}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDossierTag(nation.tag);
                          setIsDossierOpen(true);
                        }}
                        className="mt-1 text-[9px] font-mono text-amber-400 hover:text-amber-200 underline"
                        title="Buka Dokumen Pemimpin"
                      >
                        Dokumen ↗
                      </button>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-xs text-white truncate">{nation.name.split(' ')[0]}</h4>
                    <span className="text-[10px] font-mono text-[#94a3b8]">{nation.faction}</span>
                  </div>
                </div>

                {/* War Support & Stability Mini Meters */}
                <div className="mt-3 space-y-1.5 text-[10px] font-mono">
                  <div>
                    <div className="flex justify-between text-[#cbd5e1]">
                      <span>War Support:</span>
                      <strong className={nation.warSupport >= 70 ? 'text-emerald-400' : 'text-amber-400'}>
                        {nation.warSupport}%
                      </strong>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-0.5">
                      <div
                        className="h-full bg-red-500"
                        style={{ width: `${nation.warSupport}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[#cbd5e1]">
                      <span>Stabilitas:</span>
                      <strong className={nation.stability >= 70 ? 'text-emerald-400' : 'text-red-400'}>
                        {nation.stability}%
                      </strong>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-0.5">
                      <div
                        className="h-full bg-blue-500"
                        style={{ width: `${nation.stability}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Casualties & Kill Ratio */}
                <div className="mt-3 pt-2 border-t border-white/10 text-[10px] font-mono">
                  <div className="flex justify-between text-[#94a3b8]">
                    <span>Korban:</span>
                    <strong className="text-red-300">{nation.casualtiesSuffered}M</strong>
                  </div>
                  <div className="flex justify-between text-[#94a3b8]">
                    <span>K/L Ratio:</span>
                    <strong className="text-emerald-300">{ratio}x</strong>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* In-Depth Inspector: Selected Major Nation Snapshot & Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Column 1: Deep Nation Analysis & Equipment Losses (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-xl border border-[#273256] bg-[#090e1c] p-5 shadow-lg space-y-5">
            {/* Header info with HOI4 Leader Portrait */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#1b2542] pb-4 gap-4">
              <div className="flex items-center gap-3.5">
                <HOI4LeaderPortrait
                  tag={activeNation.tag}
                  size="md"
                  showNameplate={true}
                  showTraitsOnHover={true}
                  showStatusLamp={true}
                  showIdeologyBadge={true}
                  interactive={true}
                  onClick={() => {
                    setSelectedDossierTag(activeNation.tag);
                    setIsDossierOpen(true);
                  }}
                />
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-serif text-lg font-bold text-[#fef3c7]">{activeNation.name}</h3>
                    <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-white/10 text-white">
                      Tag: {activeNation.tag}
                    </span>
                    <span className="text-xl">{activeNation.flag}</span>
                  </div>
                  <p className="text-xs text-[#94a3b8] mt-0.5">
                    Blok Faksi: <strong className="text-white">{activeNation.faction}</strong> | Divisi Aktif:{' '}
                    <strong className="text-emerald-300">{activeNation.activeDivisions} Divisi</strong>
                  </p>
                  <button
                    onClick={() => {
                      setSelectedDossierTag(activeNation.tag);
                      setIsDossierOpen(true);
                    }}
                    className="mt-2 text-xs font-mono font-bold text-amber-300 hover:text-amber-200 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 px-2.5 py-1 rounded-md flex items-center gap-1.5 transition-all w-fit shadow-sm"
                  >
                    <Award className="h-3.5 w-3.5 text-amber-400" />
                    <span>Buka Dokumen Pemimpin & Sifat HOI4</span>
                  </button>
                </div>
              </div>

              {/* Status Alert Badge */}
              <div className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-bold ${
                dynamicStats.isAtRiskOfCapitulation
                  ? 'bg-red-500/20 border-red-500 text-red-300 animate-pulse'
                  : dynamicStats.isNearCapitulation
                  ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                  : 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
              }`}>
                {dynamicStats.isAtRiskOfCapitulation
                  ? '⚠️ KAPITULASI TERCAPAI'
                  : dynamicStats.isNearCapitulation
                  ? '⚠️ BAHAYA KAPITULASI'
                  : 'STATUS PERANG STABIL'}
              </div>
            </div>

            {/* Core Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-3 rounded-lg border border-[#1b2542] bg-[#0d1326]">
                <span className="text-[#94a3b8] block">Dukungan Perang:</span>
                <span className="text-xl font-bold text-red-400">{dynamicStats.currentWarSupport}%</span>
                <span className="text-[10px] text-[#64748b] block mt-0.5">
                  Basis: {activeNation.warSupport}% (Penalti: -{dynamicStats.casualtyPenalty}%)
                </span>
              </div>

              <div className="p-3 rounded-lg border border-[#1b2542] bg-[#0d1326]">
                <span className="text-[#94a3b8] block">Stabilitas Politik:</span>
                <span className="text-xl font-bold text-blue-400">{dynamicStats.currentStability}%</span>
                <span className="text-[10px] text-[#64748b] block mt-0.5">
                  Batas Mogok: {dynamicStats.currentStability < 50 ? 'Bahaya Strikes!' : 'Aman'}
                </span>
              </div>

              <div className="p-3 rounded-lg border border-[#1b2542] bg-[#0d1326]">
                <span className="text-[#94a3b8] block">Korban Diderita:</span>
                <span className="text-xl font-bold text-red-300">{activeNation.casualtiesSuffered} Juta</span>
                <span className="text-[10px] text-[#64748b] block mt-0.5">
                  Menewaskan: {activeNation.casualtiesInflicted}M Musuh
                </span>
              </div>

              <div className="p-3 rounded-lg border border-[#1b2542] bg-[#0d1326]">
                <span className="text-[#94a3b8] block">Kill/Loss Ratio:</span>
                <span className="text-xl font-bold text-emerald-400">{dynamicStats.killLossRatio}x</span>
                <span className="text-[10px] text-[#64748b] block mt-0.5">Efisiensi Pasukan</span>
              </div>
            </div>

            {/* Surrender Progress Meter */}
            <div className="p-3.5 rounded-xl border border-[#1b2542] bg-[#0d1326] space-y-1.5">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-[#cbd5e1] font-bold">Progres Menuju Kapitulasi (Surrender Progress):</span>
                <span className="text-amber-300 font-bold">
                  {dynamicStats.currentSurrenderProgress}% / Ambang Batas: {activeNation.surrenderLimit}%
                </span>
              </div>
              <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden relative">
                {/* Surrender Limit Mark */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-red-400 z-10"
                  style={{ left: `${activeNation.surrenderLimit}%` }}
                  title={`Batas Menyerah: ${activeNation.surrenderLimit}%`}
                />
                <div
                  className={`h-full transition-all duration-300 ${
                    dynamicStats.currentSurrenderProgress >= activeNation.surrenderLimit ? 'bg-red-600' : 'bg-amber-500'
                  }`}
                  style={{ width: `${dynamicStats.currentSurrenderProgress}%` }}
                />
              </div>
              <p className="text-[10px] text-[#94a3b8] font-mono">
                Garis merah vertikal menandai titik serah terima kekuasaan ({activeNation.surrenderLimit}%). Jika poin kemenangan (*Victory Points*) direbut melebihi garis tersebut, pemerintah negara akan menyerah tanpa syarat.
              </p>
            </div>

            {/* Equipment Losses Breakdown */}
            <div className="space-y-2">
              <h4 className="font-serif text-xs font-bold text-[#fef3c7] uppercase tracking-wider">
                Kerugian Materiel &amp; Peralatan Tempur Hilang:
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-black/40 border border-[#1b2542]">
                  <span className="text-[#94a3b8] block text-[10px]">Senapan &amp; Infanteri:</span>
                  <strong className="text-white text-sm">
                    {activeNation.equipmentLost.infantryEquip.toLocaleString()}k
                  </strong>
                </div>
                <div className="p-2.5 rounded-lg bg-black/40 border border-[#1b2542]">
                  <span className="text-[#94a3b8] block text-[10px]">Tank / Panzer:</span>
                  <strong className="text-amber-300 text-sm">
                    {activeNation.equipmentLost.tanks.toLocaleString()} unit
                  </strong>
                </div>
                <div className="p-2.5 rounded-lg bg-black/40 border border-[#1b2542]">
                  <span className="text-[#94a3b8] block text-[10px]">Pesawat Terbang:</span>
                  <strong className="text-sky-300 text-sm">
                    {activeNation.equipmentLost.planes.toLocaleString()} unit
                  </strong>
                </div>
                <div className="p-2.5 rounded-lg bg-black/40 border border-[#1b2542]">
                  <span className="text-[#94a3b8] block text-[10px]">Kapal Perang:</span>
                  <strong className="text-blue-300 text-sm">
                    {activeNation.equipmentLost.shipsSunk} kapal
                  </strong>
                </div>
                <div className="p-2.5 rounded-lg bg-black/40 border border-[#1b2542]">
                  <span className="text-[#94a3b8] block text-[10px]">Konvoi Dagang:</span>
                  <strong className="text-red-300 text-sm">
                    {activeNation.equipmentLost.convoysLost} kapal
                  </strong>
                </div>
              </div>
            </div>

            {/* National Spirits & Vulnerability */}
            <div className="pt-2 border-t border-[#1b2542] space-y-2 text-xs">
              <div>
                <span className="text-[#94a3b8] font-mono text-[11px] block">Semangat Nasional Aktif (*National Spirits*):</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {activeNation.nationalSpirits.map((spirit, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 font-mono text-[11px]"
                    >
                      {spirit}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-red-950/20 border border-red-500/30 text-[11px] text-red-200 leading-relaxed font-mono">
                <strong>Titik Lemah Taktis (*Vulnerability*):</strong> {activeNation.vulnerabilities}
              </div>
            </div>
          </div>
        </div>

        {/* Column 2: Interactive Playthrough Event Simulator (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-xl border border-[#273256] bg-[#090e1c] p-5 shadow-lg space-y-4">
            <div className="border-b border-[#1b2542] pb-3">
              <h3 className="font-serif text-base font-bold text-[#fef3c7] flex items-center gap-2">
                <Sliders className="h-5 w-5 text-amber-400" /> Simulator Event Perang (Playthrough Modifiers)
              </h3>
              <p className="text-xs text-[#94a3b8] mt-0.5">
                Aktifkan peristiwa kampanye untuk melihat dampaknya secara langsung pada Stabilitas dan Ambang Kapitulasi {activeNation.name}.
              </p>
            </div>

            {/* Event Toggles */}
            <div className="space-y-3 text-xs font-mono">
              {/* Event 1: Strategic Bombing */}
              <label className="p-3 rounded-lg border border-[#1b2542] bg-[#0d1326] flex items-start gap-3 cursor-pointer hover:border-slate-500 transition-all">
                <input
                  type="checkbox"
                  checked={strategicBombingTarget}
                  onChange={(e) => setStrategicBombingTarget(e.target.checked)}
                  className="mt-0.5 accent-red-500 rounded"
                />
                <div>
                  <strong className="text-white block">Pengeboman Strategis Pabrik Sekutu (Strategic Bombing)</strong>
                  <span className="text-[11px] text-[#cbd5e1] block mt-0.5">
                    Pabrik dibom pesawat B-17/Lancaster. Mengurangi Dukungan Perang sebesar <strong>-12%</strong> dan Stabilitas <strong>-8%</strong>.
                  </span>
                </div>
              </label>

              {/* Event 2: Convoy Raiding */}
              <label className="p-3 rounded-lg border border-[#1b2542] bg-[#0d1326] flex items-start gap-3 cursor-pointer hover:border-slate-500 transition-all">
                <input
                  type="checkbox"
                  checked={convoyRaidingSevere}
                  onChange={(e) => setConvoyRaidingSevere(e.target.checked)}
                  className="mt-0.5 accent-red-500 rounded"
                />
                <div>
                  <strong className="text-white block">Blokade Total &amp; Penenggelaman Konvoi Dagang</strong>
                  <span className="text-[11px] text-[#cbd5e1] block mt-0.5">
                    Kapal selam U-Boat atau kapal perang memotong jalur logistik impor. Memotong Dukungan Perang sebesar <strong>-10%</strong>.
                  </span>
                </div>
              </label>

              {/* Event 3: Hero of Nation Propaganda */}
              <label className="p-3 rounded-lg border border-[#1b2542] bg-[#0d1326] flex items-start gap-3 cursor-pointer hover:border-slate-500 transition-all">
                <input
                  type="checkbox"
                  checked={heroPropagandaActive}
                  onChange={(e) => setHeroPropagandaActive(e.target.checked)}
                  className="mt-0.5 accent-red-500 rounded"
                />
                <div>
                  <strong className="text-white block">Pidato Semangat / Pahlawan Perang (Hero Propaganda)</strong>
                  <span className="text-[11px] text-[#cbd5e1] block mt-0.5">
                    Keputusan propaganda radio nasional (Churchill / Stalin / Goebbels). Menaikkan Dukungan Perang <strong>+10%</strong> dan Stabilitas <strong>+5%</strong>.
                  </span>
                </div>
              </label>

              {/* Event 4: Capital Threatened */}
              <label className="p-3 rounded-lg border border-[#1b2542] bg-[#0d1326] flex items-start gap-3 cursor-pointer hover:border-slate-500 transition-all">
                <input
                  type="checkbox"
                  checked={capitalThreatened}
                  onChange={(e) => setCapitalThreatened(e.target.checked)}
                  className="mt-0.5 accent-red-500 rounded"
                />
                <div>
                  <strong className="text-white block">Ibukota Terancam / Jatuh ke Tangan Musuh</strong>
                  <span className="text-[11px] text-[#cbd5e1] block mt-0.5">
                    Pasukan musuh telah merebut ibukota atau pusat industri utama. Menambah Progres Kapitulasi <strong>+35%</strong> dan -15% WS.
                  </span>
                </div>
              </label>
            </div>

            {/* Reset Modifiers Button */}
            <div className="pt-2">
              <button
                onClick={() => {
                  setStrategicBombingTarget(false);
                  setConvoyRaidingSevere(false);
                  setHeroPropagandaActive(false);
                  setCapitalThreatened(false);
                }}
                className="w-full py-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#94a3b8] hover:text-white font-mono text-xs flex items-center justify-center gap-1.5 transition-all"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Reset Semua Modifikator Simulasi</span>
              </button>
            </div>

            {/* Tactical Advice Card */}
            <div className="p-3.5 rounded-xl border border-indigo-500/30 bg-indigo-950/20 text-xs space-y-1.5">
              <div className="flex items-center gap-2 font-serif font-bold text-[#fef3c7]">
                <BookOpen className="h-4 w-4 text-indigo-400" />
                <span>Aturan Mekanisme Hearts of Iron IV:</span>
              </div>
              <ul className="list-disc pl-4 space-y-1 text-[11px] text-[#cbd5e1] font-mono leading-relaxed">
                <li>
                  <strong>War Support &lt; 50%:</strong> Memicu peristiwa *Draft Dodging* (pengurangan manpower) dan penalti pemulihan organisasi divisi militer.
                </li>
                <li>
                  <strong>Stability &lt; 50%:</strong> Pabrik militer dan sipil terkena mogok kerja buruh (*Strikes*) sebesar -20% output produksi.
                </li>
                <li>
                  <strong>Korban Jiwa:</strong> Mengurangi War Support hingga -30%. Gunakan keputusan propaganda perang (*War Propaganda*) untuk memitigasi penurunan.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
        </div>
      )}

      {/* HOI4 Leader Dossier Modal */}
      <HOI4LeaderDossierModal
        isOpen={isDossierOpen}
        initialTag={selectedDossierTag}
        onClose={() => setIsDossierOpen(false)}
        onSelectNation={(tag) => setSelectedNationTag(tag)}
      />
    </div>
  );
};
