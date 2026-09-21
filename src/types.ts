export type GuideLevel = 'all' | 'pemula' | 'menengah' | 'ahli';

export type MainTab = 'guides' | 'division' | 'war_room' | 'commands' | 'favorites';

export interface GuideSection {
  id: string;
  level: 'pemula' | 'menengah' | 'ahli';
  title: string;
  subtitle: string;
  iconName: string;
  category: 'Ekonomi & Industri' | 'Militer Darat' | 'Udara & CAS' | 'Angkatan Laut' | 'Logistik & Suplai' | 'Intelijen & Politik';
  overview: string;
  keyPoints: {
    heading: string;
    description: string;
    tags?: string[];
    warning?: string;
    proTip?: string;
    steps?: string[];
  }[];
  summaryTips: string[];
}

export interface CommandItem {
  id: string;
  title: string;
  code: string;
  description: string;
  category: 'Politik & Stabilitas' | 'Militer & Manpower' | 'Riset & Produksi' | 'Peta & Diplomasi' | 'Debug & Khusus';
  parameterTemplate?: string;
  warning?: string;
  quickArgs?: { label: string; defaultVal: string; placeholder: string }[];
  popular?: boolean;
}

export interface CommandCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
  commands: CommandItem[];
}

export interface SupportCompany {
  id: string;
  name: string;
  role: string;
  bonus: string;
  cost: string;
}

export interface DivisionPreset {
  id: string;
  name: string;
  role: 'Frontline Defense' | 'Offensive Infantry' | 'Armor Spearhead' | 'Special Forces' | 'Garrison / Suppress';
  doctrineSynergy: string;
  combatWidth: number;
  battalions: { name: string; count: number; iconType: string }[];
  supportCompanies: string[];
  stats: {
    organization: number;
    softAttack: number;
    hardAttack: number;
    defense: number;
    breakthrough: number;
    armor: number;
    piercing: number;
    supplyUse: string;
    costIC: string;
  };
  strengths: string[];
  weaknesses: string[];
  tacticalUsage: string;
  recommendedFor: string[];
}

export interface CountryStrategy {
  id: string;
  tag: string;
  name: string;
  faction: string;
  difficulty: 'Sangat Mudah' | 'Sedang' | 'Menantang' | 'Ahli';
  flagColors: [string, string];
  flagSymbol: string;
  ideology: 'Fascism' | 'Communism' | 'Democratic' | 'Non-Aligned';
  leader: string;
  startingCivilianFactories: number;
  startingMilitaryFactories: number;
  startingDockyards: number;
  doctrineRecommendation: string;
  focusPath1936: string[];
  industryStrategy: string;
  militaryStrategy: string;
  keyChallenges: string[];
  proTips: string;
}

export interface FavoriteItem {
  id: string;
  type: 'guide' | 'command' | 'division' | 'country';
  title: string;
  subtitle: string;
  tag?: string;
  addedAt: number;
}
