import { DivisionPreset, SupportCompany } from '../types';

export interface EquipmentRequirementItem {
  name: string;
  count: number;
  icCostPerUnit: number;
  resources: string;
}

export interface BattalionOption {
  id: string;
  name: string;
  category: 'Infanteri' | 'Mobil / Bermotor' | 'Lapis Baja (Tank)' | 'Pasukan Khusus';
  combatWidth: number;
  hp: number;
  organization: number;
  softAttack: number;
  hardAttack: number;
  defense: number;
  breakthrough: number;
  armor: number;
  piercing: number;
  supplyUse: number;
  icCost: number;
  manpower: number;
  equipmentRequirements: EquipmentRequirementItem[];
}

export const BATTALION_CATALOGUE: BattalionOption[] = [
  {
    id: 'infantry',
    name: 'Infanteri Kaki (Infantry)',
    category: 'Infanteri',
    combatWidth: 2,
    hp: 25,
    organization: 50,
    softAttack: 12,
    hardAttack: 1.5,
    defense: 45,
    breakthrough: 5,
    armor: 0,
    piercing: 4,
    supplyUse: 0.07,
    icCost: 45,
    manpower: 1000,
    equipmentRequirements: [
      { name: 'Infantry Equipment (Senapan)', count: 100, icCostPerUnit: 0.45, resources: '2 Baja' }
    ]
  },
  {
    id: 'line_artillery',
    name: 'Artileri Garis (Line Arty)',
    category: 'Infanteri',
    combatWidth: 3,
    hp: 0.6,
    organization: 0,
    softAttack: 48,
    hardAttack: 3,
    defense: 18,
    breakthrough: 12,
    armor: 0,
    piercing: 6,
    supplyUse: 0.22,
    icCost: 140,
    manpower: 500,
    equipmentRequirements: [
      { name: 'Artillery Equipment', count: 36, icCostPerUnit: 3.88, resources: '2 Baja, 1 Tungsten' }
    ]
  },
  {
    id: 'line_aa',
    name: 'Anti-Air Garis (Line AA)',
    category: 'Infanteri',
    combatWidth: 1,
    hp: 0.6,
    organization: 0,
    softAttack: 6,
    hardAttack: 9,
    defense: 12,
    breakthrough: 4,
    armor: 0,
    piercing: 35,
    supplyUse: 0.1,
    icCost: 100,
    manpower: 300,
    equipmentRequirements: [
      { name: 'Anti-Air Equipment', count: 30, icCostPerUnit: 3.33, resources: '1 Baja' }
    ]
  },
  {
    id: 'line_at',
    name: 'Anti-Tank Garis (Line AT)',
    category: 'Infanteri',
    combatWidth: 1,
    hp: 0.6,
    organization: 0,
    softAttack: 4,
    hardAttack: 36,
    defense: 25,
    breakthrough: 3,
    armor: 0,
    piercing: 80,
    supplyUse: 0.1,
    icCost: 120,
    manpower: 400,
    equipmentRequirements: [
      { name: 'Anti-Tank Equipment', count: 24, icCostPerUnit: 5.0, resources: '2 Tungsten, 1 Baja' }
    ]
  },
  {
    id: 'line_rocket_arty',
    name: 'Artileri Roket Garis (Rocket Arty)',
    category: 'Infanteri',
    combatWidth: 3,
    hp: 0.6,
    organization: 0,
    softAttack: 52,
    hardAttack: 2,
    defense: 16,
    breakthrough: 15,
    armor: 0,
    piercing: 5,
    supplyUse: 0.24,
    icCost: 150,
    manpower: 500,
    equipmentRequirements: [
      { name: 'Rocket Artillery', count: 36, icCostPerUnit: 4.16, resources: '2 Baja, 1 Tungsten' }
    ]
  },
  {
    id: 'cavalry',
    name: 'Kavaleri Kuda (Cavalry)',
    category: 'Infanteri',
    combatWidth: 2,
    hp: 25,
    organization: 50,
    softAttack: 12,
    hardAttack: 1.5,
    defense: 45,
    breakthrough: 6,
    armor: 0,
    piercing: 4,
    supplyUse: 0.09,
    icCost: 55,
    manpower: 1000,
    equipmentRequirements: [
      { name: 'Infantry Equipment (Senapan)', count: 120, icCostPerUnit: 0.45, resources: '2 Baja' }
    ]
  },
  {
    id: 'motorized',
    name: 'Infanteri Bermotor (Motorized)',
    category: 'Mobil / Bermotor',
    combatWidth: 2,
    hp: 25,
    organization: 50,
    softAttack: 12,
    hardAttack: 2,
    defense: 48,
    breakthrough: 9,
    armor: 0,
    piercing: 4,
    supplyUse: 0.14,
    icCost: 165,
    manpower: 1000,
    equipmentRequirements: [
      { name: 'Infantry Equipment', count: 100, icCostPerUnit: 0.45, resources: '2 Baja' },
      { name: 'Motorized Truck', count: 50, icCostPerUnit: 2.4, resources: '1 Baja, 1 Karet' }
    ]
  },
  {
    id: 'mechanized',
    name: 'Infanteri Mekanis (Mechanized APC)',
    category: 'Mobil / Bermotor',
    combatWidth: 2,
    hp: 30,
    organization: 45,
    softAttack: 15,
    hardAttack: 8,
    defense: 85,
    breakthrough: 18,
    armor: 22,
    piercing: 20,
    supplyUse: 0.16,
    icCost: 420,
    manpower: 1000,
    equipmentRequirements: [
      { name: 'Infantry Equipment', count: 100, icCostPerUnit: 0.45, resources: '2 Baja' },
      { name: 'Mechanized Equipment', count: 50, icCostPerUnit: 7.5, resources: '3 Baja, 1 Karet' }
    ]
  },
  {
    id: 'mot_rocket',
    name: 'Artileri Roket Bermotor (Katyusha)',
    category: 'Mobil / Bermotor',
    combatWidth: 3,
    hp: 0.8,
    organization: 0,
    softAttack: 62,
    hardAttack: 3,
    defense: 20,
    breakthrough: 22,
    armor: 0,
    piercing: 6,
    supplyUse: 0.28,
    icCost: 290,
    manpower: 500,
    equipmentRequirements: [
      { name: 'Motorized Rocket Arty', count: 36, icCostPerUnit: 8.05, resources: '2 Baja, 1 Karet, 1 Tungsten' }
    ]
  },
  {
    id: 'light_tank',
    name: 'Tank Ringan (Light Tank)',
    category: 'Lapis Baja (Tank)',
    combatWidth: 2,
    hp: 2,
    organization: 12,
    softAttack: 34,
    hardAttack: 14,
    defense: 16,
    breakthrough: 42,
    armor: 35,
    piercing: 30,
    supplyUse: 0.18,
    icCost: 280,
    manpower: 500,
    equipmentRequirements: [
      { name: 'Light Tank Chassis', count: 60, icCostPerUnit: 4.66, resources: '2 Baja, 1 Minyak' }
    ]
  },
  {
    id: 'medium_tank',
    name: 'Tank Medium (Medium Tank)',
    category: 'Lapis Baja (Tank)',
    combatWidth: 2,
    hp: 2,
    organization: 10,
    softAttack: 58,
    hardAttack: 26,
    defense: 22,
    breakthrough: 68,
    armor: 75,
    piercing: 65,
    supplyUse: 0.24,
    icCost: 480,
    manpower: 500,
    equipmentRequirements: [
      { name: 'Medium Tank Chassis', count: 50, icCostPerUnit: 9.6, resources: '3 Baja, 1 Tungsten' }
    ]
  },
  {
    id: 'heavy_tank',
    name: 'Tank Berat (Heavy Tank / Tiger)',
    category: 'Lapis Baja (Tank)',
    combatWidth: 2,
    hp: 3,
    organization: 8,
    softAttack: 65,
    hardAttack: 38,
    defense: 30,
    breakthrough: 85,
    armor: 110,
    piercing: 90,
    supplyUse: 0.38,
    icCost: 750,
    manpower: 500,
    equipmentRequirements: [
      { name: 'Heavy Tank Chassis', count: 40, icCostPerUnit: 18.75, resources: '3 Baja, 2 Kromium' }
    ]
  },
  {
    id: 'modern_tank',
    name: 'Tank Modern (Modern Tank - 1943+)',
    category: 'Lapis Baja (Tank)',
    combatWidth: 2,
    hp: 3,
    organization: 15,
    softAttack: 82,
    hardAttack: 48,
    defense: 40,
    breakthrough: 110,
    armor: 130,
    piercing: 115,
    supplyUse: 0.32,
    icCost: 820,
    manpower: 500,
    equipmentRequirements: [
      { name: 'Modern Tank Chassis', count: 50, icCostPerUnit: 16.4, resources: '4 Baja, 2 Kromium, 1 Karet' }
    ]
  },
  {
    id: 'medium_td',
    name: 'Penghancur Tank Medium (Tank Destroyer)',
    category: 'Lapis Baja (Tank)',
    combatWidth: 2,
    hp: 1.8,
    organization: 10,
    softAttack: 18,
    hardAttack: 58,
    defense: 24,
    breakthrough: 40,
    armor: 80,
    piercing: 105,
    supplyUse: 0.22,
    icCost: 460,
    manpower: 500,
    equipmentRequirements: [
      { name: 'Medium Tank Destroyer', count: 40, icCostPerUnit: 11.5, resources: '3 Baja, 2 Tungsten' }
    ]
  },
  {
    id: 'medium_spg',
    name: 'Artileri Mandiri Medium (SPG Arty)',
    category: 'Lapis Baja (Tank)',
    combatWidth: 3,
    hp: 1.5,
    organization: 8,
    softAttack: 78,
    hardAttack: 8,
    defense: 18,
    breakthrough: 35,
    armor: 55,
    piercing: 25,
    supplyUse: 0.30,
    icCost: 470,
    manpower: 500,
    equipmentRequirements: [
      { name: 'Medium SP Artillery', count: 36, icCostPerUnit: 13.0, resources: '3 Baja, 1 Tungsten' }
    ]
  },
  {
    id: 'mountaineer',
    name: 'Infanteri Gunung (Mountaineer)',
    category: 'Pasukan Khusus',
    combatWidth: 2,
    hp: 25,
    organization: 55,
    softAttack: 15,
    hardAttack: 2,
    defense: 50,
    breakthrough: 8,
    armor: 0,
    piercing: 4,
    supplyUse: 0.08,
    icCost: 55,
    manpower: 1000,
    equipmentRequirements: [
      { name: 'Infantry Equipment', count: 110, icCostPerUnit: 0.5, resources: '2 Baja' }
    ]
  },
  {
    id: 'marine',
    name: 'Marinir Pendarat (Marines)',
    category: 'Pasukan Khusus',
    combatWidth: 2,
    hp: 25,
    organization: 50,
    softAttack: 14,
    hardAttack: 2,
    defense: 45,
    breakthrough: 9,
    armor: 0,
    piercing: 4,
    supplyUse: 0.08,
    icCost: 55,
    manpower: 1000,
    equipmentRequirements: [
      { name: 'Infantry Equipment', count: 110, icCostPerUnit: 0.5, resources: '2 Baja' }
    ]
  },
  {
    id: 'paratrooper',
    name: 'Pasukan Terjun Payung (Paratrooper)',
    category: 'Pasukan Khusus',
    combatWidth: 2,
    hp: 25,
    organization: 50,
    softAttack: 13,
    hardAttack: 1.5,
    defense: 42,
    breakthrough: 7,
    armor: 0,
    piercing: 4,
    supplyUse: 0.08,
    icCost: 60,
    manpower: 1000,
    equipmentRequirements: [
      { name: 'Infantry Equipment', count: 100, icCostPerUnit: 0.6, resources: '2 Baja' }
    ]
  }
];

export const SUPPORT_COMPANIES_DATA: SupportCompany[] = [
  {
    id: 'engineer',
    name: 'Engineer Company (Zeni)',
    role: 'Pertahanan & Mobilitas Medan',
    bonus: '+5 Entrenchment benteng, bonus menyeberang sungai (+25%), hutan, dan benteng beton.',
    cost: '30 Support Eq + 300 Manpower'
  },
  {
    id: 'support_arty',
    name: 'Support Artillery',
    role: 'Soft Attack Hemat Lebar Tempur',
    bonus: '+32 Soft Attack tanpa menambah combat width divisi!',
    cost: '24 Artillery Eq + 300 Manpower'
  },
  {
    id: 'support_aa',
    name: 'Support Anti-Air',
    role: 'Penangkal Serangan Udara & Piercing',
    bonus: '-75% penalti CAS pembom musuh, menembak jatuh pesawat tempur taktis, dan memberi piercing darat (25+).',
    cost: '20 Anti-Air Eq + 300 Manpower'
  },
  {
    id: 'support_at',
    name: 'Support Anti-Tank',
    role: 'Piercing Ekstra & Hard Attack',
    bonus: '+45 Hard Attack dan piercing tinggi (65+) untuk menembus divisi tank musuh tanpa mengubah lebar tempur.',
    cost: '24 Anti-Tank Eq + 300 Manpower'
  },
  {
    id: 'support_rocket',
    name: 'Support Rocket Artillery',
    role: 'Soft Attack Tambahan',
    bonus: '+34 Soft Attack & bonus breakthrough tambahan di pertempuran darat.',
    cost: '24 Rocket Arty + 300 Manpower'
  },
  {
    id: 'armored_recon',
    name: 'Armored Recon / Light Tank Recon',
    role: 'Reconnaissance & Sedikit Armor',
    bonus: '+10% Reconnaissance, memilih taktik lebih unggul di combat, dan menambahkan sedikit armor divisi.',
    cost: '24 Light Tanks + 300 Manpower'
  },
  {
    id: 'flame_tank_recon',
    name: 'Support Flame Tank (Meta S-Tier)',
    role: 'Monster Buff Medan Tempur',
    bonus: '+15% Serangan di Hutan, Kota, Benteng, dan Perbukitan! Wajib untuk divisi spearhead serang.',
    cost: '15 Flame Tank Chassis + 250 Manpower'
  },
  {
    id: 'logistics',
    name: 'Logistics Company (Logistik)',
    role: 'Efisiensi Suplai & Bahan Bakar',
    bonus: '-20% Konsumsi Suplai dan -20% Bahan Bakar. Mencegah atrisi di medan gurun, rawa, dan Siberia.',
    cost: '30 Support Eq + 20 Truk'
  },
  {
    id: 'maintenance',
    name: 'Maintenance Company (Pemeliharaan)',
    role: 'Reliabilitas & Merebut Senjata Musuh',
    bonus: '+15% Reliabilitas peralatan (mencegah tank mogok saat atrisi) dan mencuri 5-10% peralatan musuh.',
    cost: '25 Support Eq + 300 Manpower'
  },
  {
    id: 'field_hospital',
    name: 'Field Hospital (Rumah Sakit Lapangan)',
    role: 'Penghemat Tenaga Manusia (Manpower)',
    bonus: 'Mengembalikan 20-40% prajurit terluka ke pool manpower dan mempertahankan veterancy divisi (XP prajurit).',
    cost: '30 Support Eq + 20 Truk'
  },
  {
    id: 'signal_company',
    name: 'Signal Company (Komunikasi Radio)',
    role: 'Inisiatif & Kecepatan Penguatan Tempur',
    bonus: '+20% Inisiatif; divisi cadangan masuk ke pertempuran aktif jauh lebih cepat (Combat Reinforce Rate).',
    cost: '30 Support Eq + 20 Truk'
  },
  {
    id: 'military_police',
    name: 'Military Police (MP)',
    role: 'Supresi Partisan & Garnisun',
    bonus: '+20% Supresi; menghemat manpower dan senjata saat dipakai bersama 1 unit Kavaleri untuk menjaga kota taklukan.',
    cost: '20 Support Eq + 200 Manpower'
  }
];

export const DIVISION_PRESETS: DivisionPreset[] = [
  {
    id: 'div-meta-21w',
    name: '9/1 Infanteri Garis Depan (21 Width)',
    role: 'Frontline Defense',
    doctrineSynergy: 'Superior Firepower / Grand Battleplan',
    combatWidth: 21,
    battalions: [
      { name: 'Infanteri Kaki', count: 9, iconType: 'infantry' },
      { name: 'Artileri Garis', count: 1, iconType: 'line_artillery' }
    ],
    supportCompanies: ['Engineer Company', 'Support Artillery', 'Support Anti-Air'],
    stats: {
      organization: 52,
      softAttack: 168,
      hardAttack: 18,
      defense: 410,
      breakthrough: 54,
      armor: 0,
      piercing: 28,
      supplyUse: '0.85',
      costIC: '680'
    },
    strengths: [
      'Sangat hemat biaya industri pabrik militer (hanya butuh ~680 IC)',
      'Nilai pertahanan (Defense) tinggi di atas 400',
      'Pas di lebar tempur hutan, bukit, dan dataran tanpa penalti besar',
      'Dilengkapi Support AA untuk menetralkan 75% penalti CAS pembom musuh'
    ],
    weaknesses: [
      'Breakthrough rendah; jangan serang benteng beton secara frontal',
      'Kecepatan lambat (4.0 km/jam)'
    ],
    tacticalUsage: 'Tempatkan 120-200 divisi ini di sepanjang seluruh garis perbatasan (frontline). Mereka akan menahan gempuran musuh dengan kokoh tanpa mundur seinci pun sembari kamu menyiapkan serangan tank.',
    recommendedFor: ['Jerman', 'Uni Soviet', 'Prancis', 'Italia', 'Polandia'],
    equipmentSummary: [
      { name: 'Infantry Equipment', count: 900, icTotal: 405 },
      { name: 'Artillery Equipment', count: 60, icTotal: 233 },
      { name: 'Support Equipment', count: 30, icTotal: 120 },
      { name: 'Anti-Air Equipment', count: 20, icTotal: 67 }
    ],
    terrainFit: [
      { terrain: 'Plains (Dataran)', score: 'Optimal', note: 'Kerapatan lebar tempur 21w sangat pas di battle width 70w (3 divisi)' },
      { terrain: 'Forest (Hutan)', score: 'Optimal', note: 'Muat rapi di 60w tanpa penalti over-width' },
      { terrain: 'Hills (Perbukitan)', score: 'Bagus', note: 'Defense solid di atas 450 saat entrenchment' }
    ],
    productionTip: 'Untuk memasok 24 divisi (1 Army 9/1), alokasikan 10 Pabrik Militer ke Senapan, 3 Pabrik ke Artileri, 2 ke Support Eq, dan 1 ke Anti-Air.'
  },
  {
    id: 'div-meta-18w-classic',
    name: '9/0 Infanteri Murni Dinding Beton (18 Width)',
    role: 'Frontline Defense',
    doctrineSynergy: 'Grand Battleplan / Mass Assault',
    combatWidth: 18,
    battalions: [
      { name: 'Infanteri Kaki', count: 9, iconType: 'infantry' }
    ],
    supportCompanies: ['Engineer Company', 'Support Artillery'],
    stats: {
      organization: 58,
      softAttack: 125,
      hardAttack: 14,
      defense: 395,
      breakthrough: 44,
      armor: 0,
      piercing: 8,
      supplyUse: '0.65',
      costIC: '495'
    },
    strengths: [
      'Paling murah di dunia; hanya butuh senapan dan sedikit artileri support',
      'Organisasi sangat tinggi (58), sanggup menahan atrisi berbulan-bulan',
      'Konsumsi suplai sangat minim, cocok untuk medan perang Tiongkok atau Siberia'
    ],
    weaknesses: [
      'Daya serang rendah',
      'Rentan jika dihantam divisi tank berat terfokus'
    ],
    tacticalUsage: 'Standar emas untuk negara dengan kapasitas industri terbatas atau negara raksasa seperti Uni Soviet dan Tiongkok yang perlu memproduksi ratusan divisi dalam tempo singkat.',
    recommendedFor: ['Tiongkok Nasionalis', 'Uni Soviet', 'Turki', 'Spanyol', 'Finlandia'],
    equipmentSummary: [
      { name: 'Infantry Equipment', count: 900, icTotal: 405 },
      { name: 'Support Equipment', count: 30, icTotal: 120 },
      { name: 'Artillery Equipment', count: 24, icTotal: 93 }
    ],
    terrainFit: [
      { terrain: 'Hutan & Rawa', score: 'Optimal', note: 'Konsumsi suplai rendah menjaga divisi dari bahaya kelaparan suplai' },
      { terrain: 'Dataran Terbuka', score: 'Bagus', note: 'Tahan gempuran infanteri biasa dengan entrenchment maksimal' }
    ],
    productionTip: 'Sangat ideal untuk early-game: 8 Pabrik Senapan dan 2 Pabrik Support Equipment sudah cukup untuk deployment massal 48 divisi.'
  },
  {
    id: 'div-meta-30w-tank',
    name: '30 Width Medium Tank Spearhead (Meta Blitzkrieg)',
    role: 'Armor Spearhead',
    doctrineSynergy: 'Mobile Warfare / Superior Firepower',
    combatWidth: 30,
    battalions: [
      { name: 'Tank Medium', count: 8, iconType: 'medium_tank' },
      { name: 'Infanteri Bermotor / Mekanis', count: 7, iconType: 'mechanized' }
    ],
    supportCompanies: ['Engineer Company', 'Support Artillery', 'Flame Tank Recon', 'Logistics Company', 'Maintenance Company'],
    stats: {
      organization: 34,
      softAttack: 580,
      hardAttack: 240,
      defense: 360,
      breakthrough: 620,
      armor: 72,
      piercing: 68,
      supplyUse: '2.40',
      costIC: '5,200'
    },
    strengths: [
      'Breakthrough monster (620+) yang menghancurkan garis pertahanan musuh',
      'Soft Attack dahsyat melebihi 550, memusnahkan organisasi infanteri musuh seketika',
      'Armor tebal (72) yang kebal dari tembakan senapan dan artileri standar',
      'Kecepatan jelajah tinggi (8.5 - 10.0 km/jam) untuk manuver pengepungan kilat'
    ],
    weaknesses: [
      'Biaya pabrik sangat mahal dan membutuhkan pasokan baja, tungsten, serta karet',
      'Konsumsi bahan bakar dan suplai tinggi; butuh perlindungan rantai logistik'
    ],
    tacticalUsage: 'Kumpulkan 4 hingga 8 divisi ini di satu titik sempit. Terobos satu provinsi musuh dengan sekali hantam, lalu melaju kencang ke belakang untuk memotong jalur rel kereta dan membentuk kantung pemusnahan (Kessel).',
    recommendedFor: ['Jerman', 'Uni Soviet', 'Amerika Serikat', 'Inggris Raya'],
    equipmentSummary: [
      { name: 'Medium Tank Chassis', count: 400, icTotal: 3840 },
      { name: 'Mechanized Equipment / Trucks', count: 350, icTotal: 1050 },
      { name: 'Support & Flame Tanks', count: 65, icTotal: 310 }
    ],
    terrainFit: [
      { terrain: 'Plains (Dataran)', score: 'Optimal', note: 'Maksimum kecepatan dan bonus terobosan' },
      { terrain: 'Desert (Gurun)', score: 'Optimal', note: 'Dapat melaju kencang tanpa hambatan vegetasi' },
      { terrain: 'Mountains (Pegunungan)', score: 'Penalti', note: 'Hindari pertempuran tank di pegunungan, atrisi dan penalti serang -60%' }
    ],
    productionTip: 'Prioritaskan 25-35 Pabrik Militer ke Tank Medium, 8 Pabrik ke Truk/Mekanis, dan 5 Pabrik ke Support Equipment & Flame Tank.'
  },
  {
    id: 'div-meta-35w-heavy-tank',
    name: '35 Width Heavy Tank Fortress Breaker',
    role: 'Armor Spearhead',
    doctrineSynergy: 'Mobile Warfare / Superior Firepower',
    combatWidth: 35,
    battalions: [
      { name: 'Tank Berat', count: 9, iconType: 'heavy_tank' },
      { name: 'Infanteri Mekanis', count: 8, iconType: 'mechanized' }
    ],
    supportCompanies: ['Engineer Company', 'Support Artillery', 'Flame Tank Recon', 'Logistics Company', 'Maintenance Company'],
    stats: {
      organization: 32,
      softAttack: 640,
      hardAttack: 360,
      defense: 420,
      breakthrough: 780,
      armor: 110,
      piercing: 95,
      supplyUse: '3.10',
      costIC: '8,400'
    },
    strengths: [
      'Armor 110: Hampir mustahil ditembus oleh AI musuh hingga akhir 1944',
      'Breakthrough 780 menembus benteng beton Level 10 (Garis Maginot / Garis Stalin)',
      'Kerugian peralatan minim berkat armor tinggi dan Maintenance Company'
    ],
    weaknesses: [
      'Sangat mahal dan boros bahan bakar serta kromium',
      'Kecepatan relatif lambat (~6.0 km/jam)'
    ],
    tacticalUsage: 'Gunakan sebagai ujung tombak pemecah garis pertahanan terkuat. Cukup buat 2-4 divisi ini untuk menembus titik paling mustahil di Eropa.',
    recommendedFor: ['Jerman', 'Uni Soviet', 'Amerika Serikat'],
    equipmentSummary: [
      { name: 'Heavy Tank Chassis', count: 360, icTotal: 6750 },
      { name: 'Mechanized Equipment', count: 400, icTotal: 1500 },
      { name: 'Support Equipment', count: 80, icTotal: 320 }
    ],
    terrainFit: [
      { terrain: 'Forts (Benteng)', score: 'Optimal', note: 'Mampu melindas benteng beton dengan kerugian minimal' },
      { terrain: 'Urban (Perkotaan)', score: 'Bagus', note: 'Armor tebal menahan pertempuran jalanan kota' }
    ],
    productionTip: 'Jalankan 15-20 pabrik untuk Heavy Tanks sejak 1938 agar siap menembus Prancis atau Uni Soviet pada 1941.'
  },
  {
    id: 'div-meta-30w-modern-tank',
    name: '30 Width Modern Armor Super Spearhead (1943+)',
    role: 'Armor Spearhead',
    doctrineSynergy: 'Mobile Warfare / Superior Firepower',
    combatWidth: 30,
    battalions: [
      { name: 'Tank Modern', count: 8, iconType: 'modern_tank' },
      { name: 'Infanteri Mekanis', count: 7, iconType: 'mechanized' }
    ],
    supportCompanies: ['Engineer Company', 'Support Artillery', 'Flame Tank Recon', 'Logistics Company', 'Signal Company'],
    stats: {
      organization: 38,
      softAttack: 720,
      hardAttack: 410,
      defense: 490,
      breakthrough: 920,
      armor: 130,
      piercing: 120,
      supplyUse: '2.70',
      costIC: '7,800'
    },
    strengths: [
      'Puncak kehebatan militer darat HOI4: Statistik serang di atas 700 Soft Attack',
      'Breakthrough 920+ melindas apapun yang berdiri di depannya dalam hitungan jam',
      'Organisasi tinggi (38) untuk divisi lapis baja berkat sasis modern serba guna'
    ],
    weaknesses: [
      'Teknologi late-game (baru terbuka akhir 1943)',
      'Membutuhkan konversi jalur produksi pabrik'
    ],
    tacticalUsage: 'Kunci kemenangan akhir perang melawan koalisi superpower. Sangat cepat (10-12 km/jam) dan tak terbendung.',
    recommendedFor: ['Amerika Serikat', 'Jerman', 'Uni Soviet', 'Inggris Raya'],
    equipmentSummary: [
      { name: 'Modern Tank Chassis', count: 400, icTotal: 6560 },
      { name: 'Mechanized Equipment', count: 350, icTotal: 1050 }
    ],
    terrainFit: [
      { terrain: 'Semua Medan Darat', score: 'Optimal', note: 'Statistik overpowered mengatasi sebagian besar penalti medan' }
    ],
    productionTip: 'Saat riset Modern Tank selesai, konversi 30 Pabrik Medium Tank langsung ke Modern Tank. Manfaatkan retensi efisiensi Dispersed Industry.'
  },
  {
    id: 'div-meta-20w-light-blitz',
    name: '20 Width Light Tank Recon Blitz (Awal Perang 1936-1939)',
    role: 'Armor Spearhead',
    doctrineSynergy: 'Mobile Warfare',
    combatWidth: 20,
    battalions: [
      { name: 'Tank Ringan', count: 6, iconType: 'light_tank' },
      { name: 'Infanteri Bermotor', count: 4, iconType: 'motorized' }
    ],
    supportCompanies: ['Engineer Company', 'Support Artillery', 'Armored Recon'],
    stats: {
      organization: 36,
      softAttack: 260,
      hardAttack: 95,
      defense: 210,
      breakthrough: 280,
      armor: 35,
      piercing: 32,
      supplyUse: '1.40',
      costIC: '2,200'
    },
    strengths: [
      'Sangat cepat (12.0 km/jam), mampu merebut Victory Point musuh sebelum AI bereaksi',
      'Murah dan mudah diproduksi massal sejak hari pertama 1936',
      'Cukup untuk melindas Polandia, Prancis 1940, dan perang saudara Spanyol'
    ],
    weaknesses: [
      'Armor 35 mulai kalah efektif melawan Anti-Tank 1941+',
      'Mudah ditembus oleh divisi tank medium musuh'
    ],
    tacticalUsage: 'Jangan serang langsung infanteri yang ter-entrench di sungai. Cari celah kosong atau provinsi dataran terbuka, terobos, dan langsung balapan menuju ibu kota musuh.',
    recommendedFor: ['Jerman', 'Italia', 'Prancis', 'Uni Soviet'],
    equipmentSummary: [
      { name: 'Light Tank Chassis', count: 360, icTotal: 1677 },
      { name: 'Motorized Trucks', count: 200, icTotal: 480 }
    ],
    terrainFit: [
      { terrain: 'Plains (Dataran)', score: 'Optimal', note: 'Kecepatan penuh 12 km/jam mengunci kemenangan kilat' }
    ],
    productionTip: 'Cukup 8-10 Pabrik Militer untuk memproduksi 6 divisi Light Tank sebelum Invasi Polandia September 1939.'
  },
  {
    id: 'div-meta-30w-motorized',
    name: '30 Width Motorized / Mechanized Shock Division',
    role: 'Offensive Infantry',
    doctrineSynergy: 'Mobile Warfare / Superior Firepower',
    combatWidth: 30,
    battalions: [
      { name: 'Infanteri Bermotor', count: 12, iconType: 'motorized' },
      { name: 'Artileri Bermotor (Katyusha/SPG)', count: 2, iconType: 'mot_rocket' }
    ],
    supportCompanies: ['Engineer Company', 'Support Artillery', 'Support Anti-Air', 'Logistics Company', 'Flame Tank Recon'],
    stats: {
      organization: 48,
      softAttack: 390,
      hardAttack: 65,
      defense: 580,
      breakthrough: 210,
      armor: 12,
      piercing: 30,
      supplyUse: '1.95',
      costIC: '2,800'
    },
    strengths: [
      'Kecepatan 10-12 km/jam seirama dengan divisi tank',
      'Organisasi tinggi (48) dan Defense luar biasa (580)',
      'Sempurna untuk mengunci koridor samping (flank) saat tank menusuk jauh ke belakang musuh'
    ],
    weaknesses: [
      'Boros bahan bakar dan konsumsi truk',
      'Tidak memiliki armor tebal seperti tank sejati'
    ],
    tacticalUsage: 'Jalankan divisi ini tepat di belakang divisi tank spearhead. Saat tank membuat kantong pengepungan, divisi bermotor ini yang bertugas mengunci perimeter agar musuh tidak bisa kabur.',
    recommendedFor: ['Jerman', 'Uni Soviet', 'Amerika Serikat', 'Inggris Raya'],
    equipmentSummary: [
      { name: 'Motorized Trucks', count: 600, icTotal: 1440 },
      { name: 'Infantry Equipment', count: 1200, icTotal: 540 },
      { name: 'Rocket Arty / Support', count: 96, icTotal: 480 }
    ],
    terrainFit: [
      { terrain: 'Dataran & Gurun', score: 'Optimal', note: 'Kecepatan melaju menjaga keutuhan garis pengepungan' }
    ],
    productionTip: 'Alokasikan 10 Pabrik ke Truk dan 8 Pabrik ke Senapan untuk mendukung armada divisi bermotor pengawal tank.'
  },
  {
    id: 'div-meta-36w-marines',
    name: '36 Width Marinir Amfibi D-Day Spearhead',
    role: 'Special Forces',
    doctrineSynergy: 'Grand Battleplan / Special Forces Doctrine',
    combatWidth: 36,
    battalions: [
      { name: 'Marinir Pendarat', count: 12, iconType: 'marine' },
      { name: 'Artileri Garis', count: 4, iconType: 'line_artillery' }
    ],
    supportCompanies: ['Engineer Company', 'Support Artillery', 'Support Anti-Air', 'Armored Recon', 'Logistics Company'],
    stats: {
      organization: 46,
      softAttack: 380,
      hardAttack: 32,
      defense: 490,
      breakthrough: 195,
      armor: 0,
      piercing: 28,
      supplyUse: '1.45',
      costIC: '1,450'
    },
    strengths: [
      '+50% bonus serangan pendaratan amfibi dan penyeberangan sungai besar',
      'Soft Attack dahsyat untuk memukul mundur garnisun pantai musuh dalam hitungan jam',
      'Organisasi kokoh untuk mempertahankan dermaga pantai sampai bala bantuan datang'
    ],
    weaknesses: [
      'Terbatas oleh batas Special Forces Cap negaramu',
      'Membutuhkan armada konvoi angkut dan superioritas laut total'
    ],
    tacticalUsage: 'Dipakai khusus untuk Operasi D-Day menyeberang Selat Inggris, Operasi Torch di Afrika Utara, atau loncat pulau (Island Hopping) di Samudra Pasifik.',
    recommendedFor: ['Amerika Serikat', 'Inggris Raya', 'Jepang'],
    equipmentSummary: [
      { name: 'Infantry Equipment', count: 1320, icTotal: 660 },
      { name: 'Artillery Equipment', count: 168, icTotal: 652 },
      { name: 'Support Equipment', count: 30, icTotal: 120 }
    ],
    terrainFit: [
      { terrain: 'Amphibious (Pantai)', score: 'Optimal', note: '+50% serangan amfibi dan mengabaikan penalti pendaratan' },
      { terrain: 'River Crossing', score: 'Optimal', note: '+40% serangan menyeberang sungai' }
    ],
    productionTip: 'Karena dibatasi Special Forces Cap (biasanya hanya 8-12 divisi), cukup 4 Pabrik Militer senapan dan 3 Pabrik artileri untuk mensuplai seluruh korps marinir.'
  },
  {
    id: 'div-meta-25w-mountaineer',
    name: '25 Width Infanteri Gunung Alpen & Kaukasus',
    role: 'Special Forces',
    doctrineSynergy: 'Grand Battleplan / Mass Assault',
    combatWidth: 25,
    battalions: [
      { name: 'Infanteri Gunung', count: 11, iconType: 'mountaineer' },
      { name: 'Artileri Garis', count: 1, iconType: 'line_artillery' }
    ],
    supportCompanies: ['Engineer Company', 'Support Artillery', 'Support Anti-Air', 'Logistics Company', 'Flame Tank Recon'],
    stats: {
      organization: 54,
      softAttack: 215,
      hardAttack: 24,
      defense: 560,
      breakthrough: 98,
      armor: 0,
      piercing: 28,
      supplyUse: '0.98',
      costIC: '820'
    },
    strengths: [
      '+40% serangan dan +35% pertahanan di medan Gunung dan Bukit',
      '+25% kecepatan gerak di tebing terjal saat unit lain merayap',
      'Defense 560 di gunung membuat divisi ini mustahil digusur'
    ],
    weaknesses: [
      'Terikat batas kuota pasukan khusus'
    ],
    tacticalUsage: 'Gunakan di Front Alpen (Italia vs Prancis/Swiss), Pegunungan Kaukasus (Baku), Norwegia, dan Balkan untuk mengamankan dataran tinggi strategis.',
    recommendedFor: ['Italia', 'Jerman', 'Uni Soviet', 'Prancis', 'Yunani', 'Austria'],
    equipmentSummary: [
      { name: 'Infantry Equipment', count: 1210, icTotal: 605 },
      { name: 'Artillery Equipment', count: 60, icTotal: 233 },
      { name: 'Support Equipment', count: 30, icTotal: 120 }
    ],
    terrainFit: [
      { terrain: 'Mountain (Pegunungan)', score: 'Optimal', note: 'Raja pegunungan tanpa penalti atrisi lereng' },
      { terrain: 'Hills (Perbukitan)', score: 'Optimal', note: 'Bonus mobilitas dan defense masif' }
    ],
    productionTip: 'Tambahkan Logistics Company karena suplai di pegunungan selalu tipis.'
  },
  {
    id: 'div-meta-12w-paratrooper',
    name: '12 Width Pasukan Terjun Payung Siluman (Airborne Snatcher)',
    role: 'Special Forces',
    doctrineSynergy: 'Battlefield Support / Grand Battleplan',
    combatWidth: 12,
    battalions: [
      { name: 'Pasukan Terjun Payung', count: 6, iconType: 'paratrooper' }
    ],
    supportCompanies: ['Engineer Company', 'Support Artillery'],
    stats: {
      organization: 50,
      softAttack: 110,
      hardAttack: 10,
      defense: 280,
      breakthrough: 42,
      armor: 0,
      piercing: 8,
      supplyUse: '0.48',
      costIC: '440'
    },
    strengths: [
      'Bisa dijatuhkan dari pesawat transport ke belakang garis musuh (hingga 800 km)',
      'Bobot sangat ringan; membutuhkan sedikit pesawat angkut (Transport Planes)',
      'Mampu merebut pelabuhan dan supply hub musuh tanpa perlu kontak darat'
    ],
    weaknesses: [
      'Tidak bisa membawa batalion artileri berat atau tank',
      'Akan musnah jika suplai tidak tersambung dalam 72 jam'
    ],
    tacticalUsage: 'Terjunkan tepat di atas pelabuhan musuh di Inggris (Dover/Hull) atau di belakang garis sungai musuh untuk mengacaukan jalur suplai AI.',
    recommendedFor: ['Jerman (Operasi Sealion)', 'Amerika Serikat', 'Inggris Raya'],
    equipmentSummary: [
      { name: 'Infantry Equipment', count: 600, icTotal: 360 },
      { name: 'Support Equipment', count: 30, icTotal: 120 },
      { name: 'Artillery Equipment', count: 24, icTotal: 93 }
    ],
    terrainFit: [
      { terrain: 'Belakang Garis Musuh', score: 'Optimal', note: 'Rebut pelabuhan kosong dan langsung hubungkan supply hub' }
    ],
    productionTip: 'Jangan lupa bangun 50-100 Transport Planes (Pesawat Angkut) dan pastikan superioritas udara 70%+ di wilayah tujuan terjun.'
  },
  {
    id: 'div-meta-spacemarine',
    name: 'Space Marine Eksploiter (9 Inf + 1 TD / Heavy Tank)',
    role: 'Offensive Infantry',
    doctrineSynergy: 'Superior Firepower',
    combatWidth: 20,
    battalions: [
      { name: 'Infanteri Kaki', count: 9, iconType: 'infantry' },
      { name: 'Tank Berat / Penghancur Tank', count: 1, iconType: 'heavy_tank' }
    ],
    supportCompanies: ['Engineer Company', 'Support Artillery', 'Support Anti-Air', 'Flame Tank Recon'],
    stats: {
      organization: 49,
      softAttack: 220,
      hardAttack: 58,
      defense: 440,
      breakthrough: 135,
      armor: 38,
      piercing: 45,
      supplyUse: '0.98',
      costIC: '1,320'
    },
    strengths: [
      'Trik "Armor Rule": 1 batalion tank berat membagikan nilai armor ke seluruh 9 batalion infanteri!',
      'Infanteri musuh tanpa senjata anti-tank khusus akan kehilangan 50% efektivitas serangan terhadap divisi ini',
      'Breakthrough 135 memungkinkan infanteri untuk menyerang maju tanpa kehilangan banyak prajurit'
    ],
    weaknesses: [
      'Dilarang di sebagian besar turnamen multiplayer kompetitif karena terlalu kuat (Overpowered)',
      'Memerlukan jalur produksi sasis tank berat'
    ],
    tacticalUsage: 'Sangat mematikan di mode Singleplayer melawan AI. Divisi ini bisa memukul mundur AI di sepanjang garis depan tanpa perlu divisi tank terpisah.',
    recommendedFor: ['Swedia', 'Kanada', 'Hungaria', 'Rumania', 'Uni Soviet'],
    equipmentSummary: [
      { name: 'Infantry Equipment', count: 900, icTotal: 405 },
      { name: 'Heavy Tank Chassis', count: 40, icTotal: 750 },
      { name: 'Artillery & Support', count: 44, icTotal: 160 }
    ],
    terrainFit: [
      { terrain: 'Semua Medan', score: 'Optimal', note: 'Status unpierced membuat AI menerima penalti damage ganda' }
    ],
    productionTip: 'Buat desain Tank Berat paling murah yang bisa didesain: prioritaskan Armor maksimal di Tank Designer, senjata meriam biasa, dan reliabilitas 80%+.'
  },
  {
    id: 'div-meta-27w-flame-pusher',
    name: '27 Width Flame Push Infanteri (9 Inf + 3 Line Arty)',
    role: 'Offensive Infantry',
    doctrineSynergy: 'Superior Firepower (Integrated Support)',
    combatWidth: 27,
    battalions: [
      { name: 'Infanteri Kaki', count: 9, iconType: 'infantry' },
      { name: 'Artileri Garis', count: 3, iconType: 'line_artillery' }
    ],
    supportCompanies: ['Engineer Company', 'Support Artillery', 'Support Anti-Air', 'Flame Tank Recon'],
    stats: {
      organization: 42,
      softAttack: 320,
      hardAttack: 28,
      defense: 430,
      breakthrough: 92,
      armor: 8,
      piercing: 30,
      supplyUse: '1.28',
      costIC: '1,120'
    },
    strengths: [
      'Soft Attack dahsyat (320+) membakar habis divisi pertahanan infanteri musuh',
      'Kombinasi 3 Line Arty + Flame Tank Recon melipatgandakan daya hancur di perkotaan dan benteng',
      'Jauh lebih murah daripada divisi tank penuh'
    ],
    weaknesses: [
      'Konsumsi amunisi dan artileri cukup tinggi',
      'Breakthrough moderat; tetap membutuhkan bantuan udara (CAS)'
    ],
    tacticalUsage: 'Pakai jika kamu bermain negara tanpa minyak seperti Prancis atau Polandia yang ingin mendobrak garis pertahanan lawan dengan kekuatan artileri murni.',
    recommendedFor: ['Polandia', 'Prancis', 'Cekoslowakia', 'Yugoslavia'],
    equipmentSummary: [
      { name: 'Infantry Equipment', count: 900, icTotal: 405 },
      { name: 'Artillery Equipment', count: 132, icTotal: 512 },
      { name: 'Flame Tank & Support', count: 45, icTotal: 203 }
    ],
    terrainFit: [
      { terrain: 'Forest & Hills', score: 'Optimal', note: 'Bonus +15% dari Support Flame Tank menetralkan penalti hutan' }
    ],
    productionTip: 'Alokasikan 8 Pabrik ke Senapan, 8 Pabrik ke Artileri, dan 2 Pabrik ke Support Equipment.'
  },
  {
    id: 'div-meta-30w-panzerjager',
    name: '30 Width Tank Destroyer Hunter (Pembantai Panzer Musuh)',
    role: 'Armor Spearhead',
    doctrineSynergy: 'Superior Firepower / Mobile Warfare',
    combatWidth: 30,
    battalions: [
      { name: 'Penghancur Tank (TD)', count: 4, iconType: 'medium_td' },
      { name: 'Tank Medium', count: 4, iconType: 'medium_tank' },
      { name: 'Infanteri Mekanis', count: 7, iconType: 'mechanized' }
    ],
    supportCompanies: ['Engineer Company', 'Support Anti-Air', 'Support Anti-Tank', 'Logistics Company', 'Maintenance Company'],
    stats: {
      organization: 35,
      softAttack: 410,
      hardAttack: 480,
      defense: 410,
      breakthrough: 510,
      armor: 78,
      piercing: 110,
      supplyUse: '2.25',
      costIC: '5,400'
    },
    strengths: [
      'Hard Attack 480 dan Piercing 110: Membakar habis tank Tiger, IS-2, atau tank musuh apapun dalam 1 ronde',
      'Armor 78 memastikan divisi ini tidak bisa ditembus balik oleh tank medium biasa',
      'Maintenance Company menyita tank canggih musuh yang kamu hancurkan'
    ],
    weaknesses: [
      'Soft attack sedikit lebih rendah dibandingkan divisi tank all-out',
      'Biaya pabrik tinggi'
    ],
    tacticalUsage: 'Tempatkan tepat di jalur di mana kamu memperkirakan tank Jerman atau Soviet akan menyerang. Jadikan pembantai serangan balik (counter-puncher).',
    recommendedFor: ['Uni Soviet (Kursk)', 'Inggris Raya', 'Amerika Serikat'],
    equipmentSummary: [
      { name: 'Medium Tank Destroyer', count: 160, icTotal: 1840 },
      { name: 'Medium Tanks', count: 200, icTotal: 1920 },
      { name: 'Mechanized Equipment', count: 350, icTotal: 1050 }
    ],
    terrainFit: [
      { terrain: 'Plains & Hills', score: 'Optimal', note: 'Jarak tembak kanon anti-tank maksimal di medan terbuka' }
    ],
    productionTip: 'Pasang kanon Heavy High-Velocity Gun di sasis Medium Tank pada menu Tank Designer untuk mendongkrak Piercing di atas 110.'
  },
  {
    id: 'div-meta-15w-portguard',
    name: '15 Width Penjaga Pantai & Pelabuhan (Port Guard)',
    role: 'Garrison / Suppress',
    doctrineSynergy: 'Semua Doktrin',
    combatWidth: 15,
    battalions: [
      { name: 'Infanteri Kaki', count: 5, iconType: 'infantry' },
      { name: 'Artileri Garis', count: 1, iconType: 'line_artillery' }
    ],
    supportCompanies: ['Engineer Company', 'Support Artillery'],
    stats: {
      organization: 45,
      softAttack: 112,
      hardAttack: 11,
      defense: 275,
      breakthrough: 32,
      armor: 0,
      piercing: 8,
      supplyUse: '0.45',
      costIC: '410'
    },
    strengths: [
      'Sangat murah dan hemat manpower (hanya butuh 5,500 prajurit)',
      'Cukup tangguh untuk menahan pendaratan amfibi musuh di pelabuhan sampai bala bantuan tiba',
      'Entrenchment zeni zeni menahan tembakan meriam kapal perang musuh'
    ],
    weaknesses: [
      'Jangan gunakan untuk manuver serangan terbuka'
    ],
    tacticalUsage: 'Gunakan perintah Area Defense (Garrison) hanya pada ikon Pelabuhan (Naval Bases) dan Pesisir Pantai di Prancis, Italia, atau pulau Pasifik agar Sekutu tidak bisa melancarkan D-Day gratis.',
    recommendedFor: ['Jerman (Tembok Atlantik)', 'Italia', 'Jepang', 'Inggris Raya'],
    equipmentSummary: [
      { name: 'Infantry Equipment', count: 500, icTotal: 225 },
      { name: 'Artillery Equipment', count: 60, icTotal: 233 },
      { name: 'Support Equipment', count: 30, icTotal: 120 }
    ],
    terrainFit: [
      { terrain: 'Pelabuhan & Pesisir', score: 'Optimal', note: 'Mencegah musuh mendapatkan suplai dermaga saat mendarat' }
    ],
    productionTip: 'Cukup 4-5 Pabrik Militer untuk menjaga 50 pelabuhan di seluruh wilayah taklukan Eropa Barat.'
  },
  {
    id: 'div-meta-6w-cavalry-garrison',
    name: '6/0 Garrison Anti-Partisan Kavaleri (12 Width)',
    role: 'Garrison / Suppress',
    doctrineSynergy: 'Semua Doktrin',
    combatWidth: 12,
    battalions: [
      { name: 'Kavaleri Kuda', count: 6, iconType: 'cavalry' }
    ],
    supportCompanies: ['Military Police (MP)'],
    stats: {
      organization: 50,
      softAttack: 72,
      hardAttack: 9,
      defense: 270,
      breakthrough: 36,
      armor: 0,
      piercing: 4,
      supplyUse: '0.54',
      costIC: '360'
    },
    strengths: [
      'Nilai Supresi per Manpower tertinggi di HOI4 berkat rasio Kavaleri + Military Police',
      'Menekan pemberontakan partisan di wilayah pendudukan tanpa memakan banyak senapan',
      'Otomatis dipanggil oleh sistem Occupied Territories tanpa perlu ditaruh di map'
    ],
    weaknesses: [
      'Hanya untuk fungsi hukum darurat militer (Occupied Territories Garrison)'
    ],
    tacticalUsage: 'Buka menu Occupied Territories, pilih template ini sebagai template Garnisun Nasional, dan atur hukum pendudukan ke "Local Police Force" atau "Secret Police".',
    recommendedFor: ['Jerman', 'Jepang', 'Uni Soviet', 'Italia'],
    equipmentSummary: [
      { name: 'Infantry Equipment', count: 720, icTotal: 324 },
      { name: 'Support Equipment', count: 20, icTotal: 80 }
    ],
    terrainFit: [
      { terrain: 'Wilayah Pendudukan', score: 'Optimal', note: 'Menekan kerugian pabrik dan rel akibat sabotase partisan musuh' }
    ],
    productionTip: 'Menghemat hingga 40,000 manpower garnisun jika kamu menaklukkan seluruh Eropa atau Tiongkok.'
  },
  {
    id: 'div-meta-24w-colonial-budget',
    name: '24 Width Kolonial & Minor Budget Force (10 Inf + 1 Arty + 1 AA)',
    role: 'Frontline Defense',
    doctrineSynergy: 'Grand Battleplan / Superior Firepower',
    combatWidth: 24,
    battalions: [
      { name: 'Infanteri Kaki', count: 10, iconType: 'infantry' },
      { name: 'Artileri Garis', count: 1, iconType: 'line_artillery' },
      { name: 'Anti-Air Garis', count: 1, iconType: 'line_aa' }
    ],
    supportCompanies: ['Engineer Company', 'Support Artillery'],
    stats: {
      organization: 52,
      softAttack: 175,
      hardAttack: 22,
      defense: 450,
      breakthrough: 58,
      armor: 0,
      piercing: 32,
      supplyUse: '0.92',
      costIC: '740'
    },
    strengths: [
      'Anti-Air garis bawaan melindungi divisi minor tanpa memerlukan armada pesawat tempur mahal',
      'Pertahanan kokoh (450) sanggup menahan gempuran negara major',
      'Bagus untuk lebar tempur 70w/80w'
    ],
    weaknesses: [
      'Membutuhkan produksi terpisah untuk Anti-Air dan Artileri'
    ],
    tacticalUsage: 'Pilihan utama jika kamu bermain negara minor seperti Belanda, Belgia, Yugoslavia, atau Brazil yang tidak memiliki kapasitas industri untuk membangun angkatan udara kompetitif.',
    recommendedFor: ['Belanda', 'Belgia', 'Yugoslavia', 'Rumania', 'Brazil', 'Meksiko'],
    equipmentSummary: [
      { name: 'Infantry Equipment', count: 1000, icTotal: 450 },
      { name: 'Artillery Equipment', count: 60, icTotal: 233 },
      { name: 'Anti-Air Equipment', count: 30, icTotal: 100 }
    ],
    terrainFit: [
      { terrain: 'Plains & Forest', score: 'Optimal', note: 'Menahan agresi musuh dengan perlindungan AA mandiri' }
    ],
    productionTip: 'Alokasikan 7 Pabrik Senapan, 3 Pabrik Artileri, 2 Pabrik Anti-Air, dan 2 Pabrik Support Equipment.'
  }
];

export interface ProductionRuleItem {
  id: string;
  title: string;
  badge: string;
  summary: string;
  keyPoints: string[];
  formula?: string;
  recommendation: string;
}

export const PRODUCTION_RULES_DATA: ProductionRuleItem[] = [
  {
    id: 'golden_ratio',
    title: 'Rasio Emas Alokasi Pabrik Militer (The Golden Ratio)',
    badge: 'Aturan Fondasi',
    summary: 'Kesalahan paling fatal pemain pemula adalah menaruh 15 pabrik ke tank tapi hanya 5 pabrik ke senapan, sehingga divisinya kelaparan senjata dasar saat perang pecah.',
    keyPoints: [
      'Tahap 1936-1938: 60% Senapan (Infantry Eq), 20% Support Equipment, 15% Artileri, 5% Truk.',
      'Tahap 1939-1941: 35% Senapan, 15% Artileri & AA, 10% Truk, 25% Tank Medium, 15% Pesawat Tempur (Fighter/CAS).',
      'Tahap 1942+: 25% Senapan, 35% Tank & Mekanis, 25% Angkatan Udara, 15% Perlengkapan Khusus.'
    ],
    formula: 'Alokasi Minimum: 1 Pabrik Senapan per 2 Divisi Infanteri Aktif di Garis Depan.',
    recommendation: 'Sebelum mengklik tombol perang, pastikan gudang persediaan (Stockpile) memiliki cadangan surplus minimal +5,000 Senapan dan +500 Artileri untuk mengantisipasi atrisi awal.'
  },
  {
    id: 'efficiency_retention',
    title: 'Manajemen Retensi Efisiensi Produksi (Production Efficiency Retention)',
    badge: 'Mekanik Tersembunyi',
    summary: 'Setiap kali kamu mengganti model senjata (misal dari Inf Eq 1 ke Inf Eq 2, atau Panzer III ke Panzer IV), garis produksi akan kehilangan efisiensi pabrik.',
    keyPoints: [
      'Dispersed Industry memberikan retensi efisiensi jauh lebih tinggi saat ganti model dibanding Concentrated Industry.',
      'Jika mengganti ke model satu keluarga (cth: Tank Medium 1939 ke Tank Medium 1941), kamu mempertahankan hingga 50-70% efisiensi.',
      'Trik Pro: Jangan ganti semua 15 baris pabrik sekaligus! Biarkan baris lama tetap berjalan, buat baris baru 5 pabrik untuk model baru sampai efisiensinya naik.'
    ],
    formula: 'Output Harian = Base IC (4.50) * Jumlah Pabrik * Efisiensi Saat Ini (%) * Bonus Output Teknologi',
    recommendation: 'Selalu pilih Dispersed Industry di tab riset jika kamu berencana sering meng-upgrade tank, pesawat, dan senjata infantry.'
  },
  {
    id: 'resource_deficit_penalties',
    title: 'Hukuman Defisit Sumber Daya (Baja, Tungsten, Karet, Minyak)',
    badge: 'Logistik & Impor',
    summary: 'Kekurangan bahan mentah akan menghancurkan efisiensi pabrik secara drastis hingga -100% output.',
    keyPoints: [
      'Penalti Output: Setiap 1 unit sumber daya yang kurang memberikan penalti -5% hingga -15% kecepatan produksi pada lini tersebut.',
      'Jika defisit lebih dari 8 unit, pabrik militer tersebut praktis menjadi pajangan tak berguna!',
      'Gunakan 1 Pabrik Sipil (Civ) untuk mengimpor 8 unit sumber daya dari negara sekutu via jalur darat atau laut yang aman dari kapal selam.'
    ],
    formula: '1 Civilian Factory = 8 Unit Sumber Daya Impor',
    recommendation: 'Prioritaskan Baja (Steel) untuk senjata dan tank, Tungsten untuk amunisi artileri berat, serta Karet (Rubber) untuk truk dan pesawat tempur.'
  },
  {
    id: 'tank_conversion_trick',
    title: 'Trik Konversi Sasis Tank dari Stockpile Gudang',
    badge: 'Trik Veteran',
    summary: 'Daripada membangun Tank Destroyer (TD) atau SPG dari nol yang memakan banyak IC, kamu bisa mengubah sasis tank ringan atau medium usang yang menumpuk di gudang.',
    keyPoints: [
      'Centang opsi "Convert from Stockpile" di menu jalur produksi Tank.',
      'Biaya produksi IC turun hingga 60-75% dan waktu pengerjaan menjadi 3x lebih cepat.',
      'Sangat efektif untuk Uni Soviet dan Jerman yang memiliki ribuan sasis Panzer lama setelah kampanye militer selesai.'
    ],
    recommendation: 'Jadikan tank usang tahun 1936 menjadi SPG Artileri atau Flame Tank pendukung untuk menghemat ribuan IC industri berharga.'
  }
];
