export type GuideLevel = 'all' | 'pemula' | 'menengah' | 'ahli';

export type MainTab =
  | 'guides'
  | 'combat_calculator'
  | 'training_simulator'
  | 'logistics_calculator'
  | 'intelligence_agency'
  | 'global_war_tracker'
  | 'naval_designer'
  | 'air_calculator'
  | 'mio_manager'
  | 'peace_conference'
  | 'division'
  | 'focus_tree'
  | 'tech_tree'
  | 'battle_planner'
  | 'war_room'
  | 'commands'
  | 'favorites';

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
  readTimeMinutes?: number;
  relatedCommand?: string;
  relatedDivisionSearch?: string;
  recommendedForTag?: string;
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

export interface EquipmentRequirement {
  id: string;
  name: string;
  category: 'infantry_eq' | 'artillery_eq' | 'anti_air_eq' | 'anti_tank_eq' | 'support_eq' | 'motorized_eq' | 'mechanized_eq' | 'tank_eq';
  countPerDivision: number;
  baseIC: number;
  steelCost: number;
  tungstenCost: number;
  rubberCost: number;
  oilCost: number;
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
  equipmentSummary?: { name: string; count: number; icTotal: number }[];
  terrainFit?: { terrain: string; score: 'Optimal' | 'Bagus' | 'Penalti'; note: string }[];
  productionTip?: string;
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
  type: 'guide' | 'command' | 'division' | 'country' | 'focus' | 'tech' | 'plan';
  title: string;
  subtitle: string;
  tag?: string;
  addedAt: number;
}

export interface NationalFocus {
  id: string;
  countryId: string;
  name: string;
  originalName?: string;
  iconType: 'politics' | 'industry' | 'military' | 'navy' | 'air' | 'expansion' | 'research';
  branch: string;
  days: number;
  prerequisites: string[];
  mutuallyExclusive: string[];
  historical: boolean;
  statsDelta: {
    politicalPower?: number;
    civFactories?: number;
    milFactories?: number;
    dockyards?: number;
    stability?: number;
    warSupport?: number;
    worldTension?: number;
    researchSlots?: number;
    armyXP?: number;
    navyXP?: number;
    airXP?: number;
    manpowerBonus?: string;
  };
  pros: string[];
  cons: string[];
  keyEffectsSummary: string;
  recommendedTiming: string;
  historicalContext?: string;
  annexationOrClaim?: string;
}

export interface FocusPresetPath {
  id: string;
  countryId: string;
  title: string;
  description: string;
  type: 'meta_historical' | 'rush_industry' | 'alternative_history';
  focusIds: string[];
}

export interface ArmyCompositionItem {
  id: string;
  templateId: string;
  customName?: string;
  count: number;
}

export interface BattleSimParticipant {
  name: string;
  templateId: string;
  divisionCount: number;
  softAttack: number;
  hardAttack: number;
  defense: number;
  breakthrough: number;
  organization: number;
  armor: number;
  piercing: number;
  combatWidth: number;
  hp: number;
  hardness: number; // in percentage 0 - 100
}

export interface BattleSimEnvironment {
  terrain: 'plains' | 'forest' | 'hills' | 'mountain' | 'urban' | 'marsh' | 'desert';
  riverCrossing: 'none' | 'small' | 'large';
  fortLevel: number; // 0 to 10
  entrenchment: number; // 0 to 25
  airSuperiority: 'none' | 'attacker' | 'defender';
  casGroundDamage: number; // 0 to 100
  attackerPlanningBonus: number; // 0 to 60%
  attackerFlanks: number; // 1, 2, or 3
  weather: 'clear' | 'mud' | 'night' | 'snow';
}

// ==================== TECH TREE TYPES ====================
export type TechBranch = 'infantry' | 'armor' | 'air' | 'naval' | 'industry' | 'engineering';

export interface TechItem {
  id: string;
  name: string;
  originalName?: string;
  branch: TechBranch;
  subCategory: string;
  year: number;
  baseDays: number;
  iconType: string;
  tier: number; // 1 to 5
  prerequisites: string[]; // ids of required prior tech
  leadsTo?: string[];
  description: string;
  historicalContext?: string;
  bonuses: { label: string; value: string; positive?: boolean }[];
  unlocksEquipment?: string[];
  aheadOfTimePenaltyYear?: number;
  mioSynergy?: string;
}

export type TechStatus = 'not_researched' | 'in_progress' | 'researched';

export interface ResearchSlotAssignment {
  slotIndex: number;
  techId: string | null;
  startedAtDay?: number;
  progressPercent: number; // 0 - 100%
  mioBonusPercent?: number;
}

export interface TechProgressState {
  researchedTechIds: string[];
  currentYear: number; // 1936 to 1945
  researchSlots: ResearchSlotAssignment[];
  customNotes?: Record<string, string>;
}

// ==================== BATTLE PLANNER TYPES ====================
export type TacticalToolType =
  | 'frontline'
  | 'offensive_arrow'
  | 'spearhead'
  | 'fallback'
  | 'encirclement'
  | 'air_corridor'
  | 'freehand'
  | 'text_label';

export interface TacticalPoint {
  x: number;
  y: number;
}

export interface TacticalElement {
  id: string;
  type: TacticalToolType;
  color: string;
  points: TacticalPoint[];
  label?: string;
  strokeWidth?: number;
  style?: 'solid' | 'dashed' | 'pincer';
}

export interface TacticalDivisionMarker {
  id: string;
  x: number;
  y: number;
  name: string;
  symbol: 'infantry' | 'armor' | 'motorized' | 'artillery' | 'paratrooper' | 'marine' | 'hq';
  side: 'friendly' | 'hostile';
  count: number;
  org: number;
}

export interface BattlePlanPreset {
  id: string;
  name: string;
  theater: string;
  year: number;
  historicalName: string;
  description: string;
  mapBackdrop: 'barbarossa' | 'western_front' | 'north_africa' | 'topographic_grid';
  elements: TacticalElement[];
  markers: TacticalDivisionMarker[];
  tacticalNotes: string[];
  estimatedBonus: number;
  encirclementPotential: number;
}

// ==================== APP BACKUP & CONFIG EXPORT/IMPORT ====================
export interface StrategicResourceBreakdown {
  oil: number;
  steel: number;
  aluminium: number;
  tungsten: number;
  chromium: number;
  rubber: number;
}

export interface EuropeMapCountry {
  id: string; // matches countryId in MAJOR_COUNTRIES_FOCUS (e.g. 'ger', 'sov', 'fra', 'eng', 'ita', 'pol', 'rom', 'yug', 'hun', 'cze', 'tur', 'spa', 'fin', 'swe')
  tag: string;
  name: string;
  nativeName: string;
  capital: string;
  faction: 'Axis' | 'Allies' | 'Comintern' | 'Neutral';
  ideology: 'Fascism' | 'Democratic' | 'Communism' | 'Non-Aligned';
  flagSymbol: string;
  flagColors: [string, string];
  pathD: string; // SVG path data
  secondaryPathsD?: string[]; // islands or enclaves (e.g. East Prussia, Sicily, Corsica)
  labelPos: { x: number; y: number };
  capitalPos: { x: number; y: number };
  resources: StrategicResourceBreakdown;
  startingFactories: { civs: number; mils: number; docks: number };
  keyFocusSummary: string;
  majorFocusPaths: string[];
  historicalEvents1936_1945: string[];
  claimsOrExpansionVectors?: { toId: string; label: string; x1: number; y1: number; x2: number; y2: number }[];
}

export interface WarRoomBackupConfig {
  appVersion: string;
  exportDate: string;
  exportTimestamp: number;
  favorites: FavoriteItem[];
  researchProgress?: {
    researchedTechIds: string[];
    currentYear: number;
    slots: { slotIndex: number; techId: string | null; progressPercent: number }[];
  };
  customBattlePlans?: BattlePlanPreset[];
  divisionBuilderState?: {
    selectedBattalions: { battalionId: string; count: number }[];
    selectedSupport: string[];
  };
  warRoomPreferences?: {
    selectedCountryId?: string;
    vintageThemePreferred?: boolean;
  };
}


