import { DivisionPreset, SupportCompany } from '../types';

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
    manpower: 1000
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
    manpower: 500
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
    manpower: 300
  },
  {
    id: 'line_at',
    name: 'Anti-Tank Garis (Line AT)',
    category: 'Infanteri',
    combatWidth: 1,
    hp: 0.6,
    organization: 0,
    softAttack: 4,
    hardAttack: 32,
    defense: 25,
    breakthrough: 3,
    armor: 0,
    piercing: 75,
    supplyUse: 0.1,
    icCost: 120,
    manpower: 400
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
    piercing: 5,
    supplyUse: 0.12,
    icCost: 110,
    manpower: 1200
  },
  {
    id: 'mechanized',
    name: 'Infanteri Mekanis (Mechanized)',
    category: 'Mobil / Bermotor',
    combatWidth: 2,
    hp: 30,
    organization: 45,
    softAttack: 16,
    hardAttack: 10,
    defense: 75,
    breakthrough: 18,
    armor: 30,
    piercing: 20,
    supplyUse: 0.16,
    icCost: 260,
    manpower: 1200
  },
  {
    id: 'medium_tank',
    name: 'Tank Medium (Medium Tank)',
    category: 'Lapis Baja (Tank)',
    combatWidth: 2,
    hp: 2,
    organization: 10,
    softAttack: 62,
    hardAttack: 28,
    defense: 22,
    breakthrough: 68,
    armor: 65,
    piercing: 55,
    supplyUse: 0.28,
    icCost: 450,
    manpower: 500
  },
  {
    id: 'heavy_tank',
    name: 'Tank Berat (Heavy Tank)',
    category: 'Lapis Baja (Tank)',
    combatWidth: 2,
    hp: 3,
    organization: 8,
    softAttack: 78,
    hardAttack: 45,
    defense: 30,
    breakthrough: 85,
    armor: 110,
    piercing: 90,
    supplyUse: 0.38,
    icCost: 750,
    manpower: 500
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
    manpower: 500
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
    manpower: 1000
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
    manpower: 1000
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
    manpower: 1000
  }
];

export const SUPPORT_COMPANIES_DATA: SupportCompany[] = [
  {
    id: 'engineer',
    name: 'Engineer Company (Zeni)',
    role: 'Pertahanan & Mobilitas Medan',
    bonus: '+5 Entrenchment benteng, bonus menyeberang sungai, hutan, dan benteng beton.',
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
    bonus: '-75% penalti CAS musuh, menembak jatuh pembom, dan memberi piercing darat.',
    cost: '20 Anti-Air Eq + 300 Manpower'
  },
  {
    id: 'support_at',
    name: 'Support Anti-Tank',
    role: 'Penembus Lapis Baja Tank',
    bonus: '+45 Hard Attack dan nilai Piercing tinggi untuk mematahkan armor divisi tank.',
    cost: '24 Anti-Tank Eq + 300 Manpower'
  },
  {
    id: 'armored_recon',
    name: 'Armored / Motor Recon',
    role: 'Inisiatif Taktik & Kecepatan',
    bonus: '+Kecepatan gerak, menambah inisiatif komando, dan sedikit hardness armor.',
    cost: '24 Light Tank / Trucks + 300 Manpower'
  },
  {
    id: 'logistics',
    name: 'Logistics Company',
    role: 'Hemat Suplai & Bahan Bakar',
    bonus: '-20% konsumsi suplai dan -15% konsumsi bahan bakar (wajib untuk front timur Rusia).',
    cost: '20 Support Eq + 20 Trucks'
  },
  {
    id: 'signal',
    name: 'Signal Company (Komunikasi)',
    role: 'Kecepatan Koordinasi & Reinforce Rate',
    bonus: '+Reinforce rate tempur dan mempercepat eksekusi bonus perencanaan (Planning).',
    cost: '30 Support Eq + 10 Trucks'
  },
  {
    id: 'maintenance',
    name: 'Maintenance Company (Pemeliharaan)',
    role: 'Reliabilitas & Merebut Senjata Musuh',
    bonus: '+15% Reliabilitas peralatan (mencegah tank mogok) dan menyita peralatan musuh.',
    cost: '25 Support Eq + 300 Manpower'
  },
  {
    id: 'field_hospital',
    name: 'Field Hospital (Rumah Sakit)',
    role: 'Penghemat Tenaga Manusia (Manpower)',
    bonus: 'Mengembalikan 20-40% prajurit yang terluka ke manpower pool dan menjaga veterancy XP.',
    cost: '30 Support Eq + 20 Trucks'
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
      piercing: 12,
      supplyUse: '0.85',
      costIC: '680'
    },
    strengths: [
      'Sangat hemat biaya industri pabrik militer',
      'Nilai pertahanan (Defense) tinggi di atas 400',
      'Pas di lebar tempur hutan, bukit, dan dataran tanpa penalti',
      'Dilengkapi Support AA untuk menetralkan CAS pembom musuh'
    ],
    weaknesses: [
      'Breakthrough rendah; tidak disarankan untuk menyerang benteng secara frontal',
      'Kecepatan lambat (hanya 4.0 km/jam)'
    ],
    tacticalUsage: 'Tempatkan 120-200 divisi ini di sepanjang seluruh garis perbatasan (frontline). Mereka akan menahan gempuran musuh dengan kokoh tanpa mundur seinci pun sembari kamu menyiapkan serangan tank.',
    recommendedFor: ['Jerman', 'Uni Soviet', 'Prancis', 'Italia', 'Polandia']
  },
  {
    id: 'div-meta-30w-tank',
    name: '30 Width Medium Tank Spearhead',
    role: 'Armor Spearhead',
    doctrineSynergy: 'Mobile Warfare / Superior Firepower',
    combatWidth: 30,
    battalions: [
      { name: 'Tank Medium', count: 8, iconType: 'medium_tank' },
      { name: 'Infanteri Bermotor / Mekanis', count: 7, iconType: 'mechanized' }
    ],
    supportCompanies: ['Engineer Company', 'Support Artillery', 'Armored Recon', 'Logistics Company', 'Maintenance Company'],
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
      'Armor tebal yang kebal dari tembakan senapan dan artileri infanteri standar',
      'Kecepatan jelajah tinggi (8.5 - 10.0 km/jam) untuk manuver pengepungan kilat'
    ],
    weaknesses: [
      'Biaya pabrik sangat mahal dan membutuhkan pasokan baja, tungsten, serta karet',
      'Konsumsi bahan bakar dan suplai tinggi; butuh perlindungan rantai logistik'
    ],
    tacticalUsage: 'Kumpulkan 4 hingga 8 divisi ini di satu titik sempit. Terobos satu provinsi musuh dengan sekali hantam, lalu melaju kencang ke belakang untuk memotong jalur rel kereta dan membentuk kantung pemusnahan (Kessel).',
    recommendedFor: ['Jerman', 'Uni Soviet', 'Amerika Serikat', 'Inggris Raya']
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
      'Paling murah di dunia; hanya membutuhkan pabrik senapan dasar',
      'Organisasi sangat tinggi (58), mampu bertahan lama dalam pertempuran atrisi',
      'Konsumsi suplai sangat minim, cocok untuk medan perang Afrika, Tiongkok, atau Siberia'
    ],
    weaknesses: [
      'Daya serang rendah',
      'Rentan jika dihajar divisi tank modern musuh'
    ],
    tacticalUsage: 'Standar emas untuk negara dengan kapasitas industri terbatas atau negara raksasa seperti Uni Soviet dan Tiongkok yang perlu memproduksi ratusan divisi dalam waktu singkat.',
    recommendedFor: ['Tiongkok Nasionalis', 'Uni Soviet', 'Turki', 'Spanyol', 'Finlandia']
  },
  {
    id: 'div-meta-15w-portguard',
    name: '15 Width Penjaga Pantai & Pelabuhan (Port Guard)',
    role: 'Garrison / Suppress',
    doctrineSynergy: 'Semua Doktrin',
    combatWidth: 15,
    battalions: [
      { name: 'Infanteri Kaki', count: 5, iconType: 'infantry' }
    ],
    supportCompanies: ['Engineer Company', 'Support Artillery'],
    stats: {
      organization: 50,
      softAttack: 85,
      hardAttack: 9,
      defense: 250,
      breakthrough: 25,
      armor: 0,
      piercing: 6,
      supplyUse: '0.40',
      costIC: '320'
    },
    strengths: [
      'Sangat murah dan hemat manpower',
      'Cukup tangguh untuk menahan pendaratan amfibi musuh di dermaga sampai bala bantuan tiba'
    ],
    weaknesses: [
      'Tidak bisa digunakan untuk pertempuran garis depan terbuka'
    ],
    tacticalUsage: 'Gunakan perintah Area Defense (Garrison) hanya pada ikon Pelabuhan (Naval Bases) dan Pesisir Pantai di Prancis, Italia, atau pulau Pasifik agar Sekutu tidak bisa melancarkan D-Day gratis.',
    recommendedFor: ['Jerman (Tembok Atlantik)', 'Italia', 'Jepang', 'Inggris Raya']
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
      piercing: 18,
      supplyUse: '1.45',
      costIC: '1,450'
    },
    strengths: [
      '+50% bonus serangan pendaratan amfibi dan penyeberangan sungai besar',
      'Soft Attack dahsyat untuk memukul mundur garnisun pantai musuh dalam hitungan jam'
    ],
    weaknesses: [
      'Terbatas oleh batas Special Forces Cap negaramu',
      'Membutuhkan konvoi angkut dan armada superioritas laut'
    ],
    tacticalUsage: 'Dipakai khusus untuk Operasi D-Day menyeberang Selat Inggris, Operasi Torch di Afrika Utara, atau loncat pulau (Island Hopping) di Samudra Pasifik.',
    recommendedFor: ['Amerika Serikat', 'Inggris Raya', 'Jepang']
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
      'Infanteri musuh tanpa senjata anti-tank khusus akan kehilangan 50% efektivitas serangan terhadap divisi ini'
    ],
    weaknesses: [
      'Dilarang di sebagian besar turnamen multiplayer kompetitif karena terlalu kuat (Overpowered)'
    ],
    tacticalUsage: 'Sangat mematikan di mode Singleplayer melawan AI. Divisi ini bisa memukul mundur AI di sepanjang garis depan tanpa perlu divisi tank terpisah.',
    recommendedFor: ['Swedia', 'Kanada', 'Hungaria', 'Rumania', 'Uni Soviet']
  }
];
