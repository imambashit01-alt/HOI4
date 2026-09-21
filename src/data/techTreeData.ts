import { TechItem, TechBranch } from '../types';

export interface TechBranchInfo {
  id: TechBranch;
  name: string;
  nameId: string;
  icon: string;
  description: string;
  color: string;
}

export const TECH_BRANCHES: TechBranchInfo[] = [
  {
    id: 'infantry',
    name: 'Infanteri & Senjata',
    nameId: 'Infanteri & Senjata',
    icon: 'Users',
    description: 'Senapan infantri, senjata anti-tank, artileri tarik, anti-udara, dan kompi pendukung elit.',
    color: '#3b82f6'
  },
  {
    id: 'armor',
    name: 'Armor & Ranpur',
    nameId: 'Armor & Ranpur',
    icon: 'Shield',
    description: 'Sasis tank ringan, menengah, berat, meriam tank, mekanis half-track, dan doktrin terobosan lapis baja.',
    color: '#f59e0b'
  },
  {
    id: 'air',
    name: 'Angkatan Udara',
    nameId: 'Angkatan Udara',
    icon: 'Plane',
    description: 'Rangka pesawat tempur kecil, CAS pengebom tukik, pembom taktis, pembom strategis, dan mesin jet.',
    color: '#06b6d4'
  },
  {
    id: 'naval',
    name: 'Angkatan Laut',
    nameId: 'Angkatan Laut',
    icon: 'Anchor',
    description: 'Kapal perusak ASW, penjelajah ringan/berat, kapal tempur, kapal induk, kapal selam, sonar, dan torpedo.',
    color: '#3b82f6'
  },
  {
    id: 'industry',
    name: 'Industri & Konstruksi',
    nameId: 'Industri & Konstruksi',
    icon: 'Factory',
    description: 'Perkakas mesin (Machine Tools), industri terkonsentrasi vs tersebar, konstruksi infrastruktur, dan kilang minyak sintetis.',
    color: '#10b981'
  },
  {
    id: 'engineering',
    name: 'Teknik, Radar & Nuklir',
    nameId: 'Teknik, Radar & Nuklir',
    icon: 'Cpu',
    description: 'Komputasi mekanik, dekripsi intelijen Enigma, stasiun radar pendeteksi, propulsi roket, dan bom atom.',
    color: '#ec4899'
  }
];

export const TECH_TREE_DATA: TechItem[] = [
  // ==================== INFANTERI & SENJATA ====================
  {
    id: 'tech-inf-1936',
    name: 'Senjata Infanteri I',
    originalName: 'Infantry Weapons I',
    branch: 'infantry',
    subCategory: 'Senjata Utama',
    year: 1936,
    baseDays: 140,
    iconType: 'rifle',
    tier: 1,
    prerequisites: [],
    leadsTo: ['tech-inf-1939', 'tech-weapons-improv'],
    description: 'Senapan bolt-action standar militer (seperti Kar98k, Lee-Enfield, Mosin-Nagant) dengan amunisi kaliber penuh.',
    historicalContext: 'Fondasi utama setiap tentara di awal Perang Dunia II. Memberikan reliabilitas tinggi di medan tempur.',
    bonuses: [
      { label: 'Soft Attack Infanteri', value: '+3.0', positive: true },
      { label: 'Defense Infanteri', value: '+5.0', positive: true },
      { label: 'Breakthrough', value: '+1.0', positive: true }
    ],
    unlocksEquipment: ['Infantry Equipment I'],
    mioSynergy: 'Mauser / Enfield Small Arms MIO'
  },
  {
    id: 'tech-inf-1939',
    name: 'Senjata Infanteri II',
    originalName: 'Infantry Weapons II',
    branch: 'infantry',
    subCategory: 'Senjata Utama',
    year: 1939,
    baseDays: 170,
    iconType: 'rifle',
    tier: 2,
    prerequisites: ['tech-inf-1936'],
    leadsTo: ['tech-inf-1942'],
    description: 'Pemberian senapan semi-otomatis standar (M1 Garand, SVT-40, Gewehr 41) dan senapan mesin ringan regu (MG34, Bren).',
    historicalContext: 'Memberikan keunggulan tembakan beruntun luar biasa pada pertempuran garis depan tahun 1939-1941.',
    bonuses: [
      { label: 'Soft Attack Infanteri', value: '+6.0', positive: true },
      { label: 'Defense Infanteri', value: '+8.0', positive: true },
      { label: 'Breakthrough', value: '+2.0', positive: true }
    ],
    unlocksEquipment: ['Infantry Equipment II'],
    mioSynergy: 'Springfield Armory / Tula Arsenal'
  },
  {
    id: 'tech-inf-1942',
    name: 'Senjata Infanteri III (Assault Rifle)',
    originalName: 'Infantry Weapons III',
    branch: 'infantry',
    subCategory: 'Senjata Utama',
    year: 1942,
    baseDays: 200,
    iconType: 'rifle',
    tier: 3,
    prerequisites: ['tech-inf-1939'],
    leadsTo: [],
    description: 'Revolusi senapan serbu modern pertama di dunia (StG 44, amunisi intermediet 7.92×33mm Kurz) yang memadukan daya jangkau dan tembakan otomatis penuh.',
    historicalContext: 'Diperkenalkan oleh Jerman di Front Timur, menjadi cikal bakal seluruh senapan serbu modern era modern (AK-47 / M16).',
    bonuses: [
      { label: 'Soft Attack Infanteri', value: '+12.0', positive: true },
      { label: 'Defense Infanteri', value: '+15.0', positive: true },
      { label: 'Hard Attack Infanteri', value: '+2.0', positive: true },
      { label: 'Breakthrough', value: '+5.0', positive: true }
    ],
    unlocksEquipment: ['Infantry Equipment III (StG 44)'],
    mioSynergy: 'Haenel / Walther MIO'
  },
  {
    id: 'tech-weapons-improv',
    name: 'Senjata Pendukung Regu I',
    originalName: 'Support Weapons I',
    branch: 'infantry',
    subCategory: 'Senjata Pendukung',
    year: 1936,
    baseDays: 130,
    iconType: 'mg',
    tier: 1,
    prerequisites: ['tech-inf-1936'],
    leadsTo: ['tech-weapons-improv-2'],
    description: 'Mortir ringan 50mm dan granat tangan terstandarisasi untuk memberikan daya hancur tambahan bagi regu infanteri.',
    bonuses: [
      { label: 'Infanteri Defense', value: '+5.0%', positive: true },
      { label: 'Infanteri Breakthrough', value: '+5.0%', positive: true }
    ]
  },
  {
    id: 'tech-weapons-improv-2',
    name: 'Senjata Pendukung Regu II',
    originalName: 'Support Weapons II',
    branch: 'infantry',
    subCategory: 'Senjata Pendukung',
    year: 1938,
    baseDays: 150,
    iconType: 'mg',
    tier: 2,
    prerequisites: ['tech-weapons-improv'],
    leadsTo: ['tech-weapons-improv-3'],
    description: 'Mortir menengah 81mm dan senapan mesin berat regu dengan tripod.',
    bonuses: [
      { label: 'Infanteri Defense', value: '+5.0%', positive: true },
      { label: 'Infanteri Breakthrough', value: '+5.0%', positive: true }
    ]
  },
  {
    id: 'tech-weapons-improv-3',
    name: 'Senjata Pendukung Regu III',
    originalName: 'Support Weapons III',
    branch: 'infantry',
    subCategory: 'Senjata Pendukung',
    year: 1940,
    baseDays: 170,
    iconType: 'mg',
    tier: 3,
    prerequisites: ['tech-weapons-improv-2'],
    leadsTo: [],
    description: 'Peluncur granat beruntun, senapan runduk optik terintegrasi, dan mortir berat 120mm.',
    bonuses: [
      { label: 'Infanteri Defense', value: '+5.0%', positive: true },
      { label: 'Infanteri Breakthrough', value: '+5.0%', positive: true }
    ]
  },
  {
    id: 'tech-artillery-1',
    name: 'Artileri Tarik I (105mm)',
    originalName: 'Towed Artillery I',
    branch: 'infantry',
    subCategory: 'Artileri',
    year: 1936,
    baseDays: 140,
    iconType: 'artillery',
    tier: 1,
    prerequisites: [],
    leadsTo: ['tech-artillery-2', 'tech-rocket-arty-1'],
    description: 'Howitzer tarik divisi standar kaliber 105mm (seperti 10.5cm leFH 18 atau M2A1 105mm). Memberikan daya Soft Attack masif.',
    bonuses: [
      { label: 'Artileri Soft Attack', value: '+25.0', positive: true },
      { label: 'Artileri Defense', value: '+10.0', positive: true }
    ],
    unlocksEquipment: ['Artillery I'],
    mioSynergy: 'Krupp / Schneider Artillery'
  },
  {
    id: 'tech-artillery-2',
    name: 'Artileri Tarik II (150mm)',
    originalName: 'Towed Artillery II',
    branch: 'infantry',
    subCategory: 'Artileri',
    year: 1939,
    baseDays: 170,
    iconType: 'artillery',
    tier: 2,
    prerequisites: ['tech-artillery-1'],
    leadsTo: ['tech-artillery-3'],
    description: 'Penyempurnaan mekanisme recoil dan amunisi berdaya ledak tinggi fragmentasi.',
    bonuses: [
      { label: 'Artileri Soft Attack', value: '+35.0', positive: true },
      { label: 'Artileri Defense', value: '+15.0', positive: true }
    ],
    unlocksEquipment: ['Artillery II']
  },
  {
    id: 'tech-artillery-3',
    name: 'Artileri Tarik III (Heavy Howitzer)',
    originalName: 'Towed Artillery III',
    branch: 'infantry',
    subCategory: 'Artileri',
    year: 1942,
    baseDays: 200,
    iconType: 'artillery',
    tier: 3,
    prerequisites: ['tech-artillery-2'],
    leadsTo: [],
    description: 'Artileri berat modern dengan pengukur jarak optik terkalibrasi radio untuk tembakan salvo terkonsentrasi.',
    bonuses: [
      { label: 'Artileri Soft Attack', value: '+45.0', positive: true },
      { label: 'Artileri Breakthrough', value: '+5.0', positive: true }
    ],
    unlocksEquipment: ['Artillery III']
  },
  {
    id: 'tech-anti-tank-1',
    name: 'Senjata Anti-Tank I (37mm)',
    originalName: 'Anti-Tank I',
    branch: 'infantry',
    subCategory: 'Anti-Tank',
    year: 1936,
    baseDays: 140,
    iconType: 'crosshair',
    tier: 1,
    prerequisites: [],
    leadsTo: ['tech-anti-tank-2'],
    description: 'Meriam anti-tank ringan seperti 3.7cm Pak 36 atau Ordnance QF 2-pounder. Mampu menembus semua tank ringan interwar.',
    bonuses: [
      { label: 'Piercing Batalion', value: '+35.0', positive: true },
      { label: 'Hard Attack', value: '+18.0', positive: true }
    ],
    unlocksEquipment: ['Anti-Tank I']
  },
  {
    id: 'tech-anti-tank-2',
    name: 'Senjata Anti-Tank II (50-57mm)',
    originalName: 'Anti-Tank II',
    branch: 'infantry',
    subCategory: 'Anti-Tank',
    year: 1940,
    baseDays: 170,
    iconType: 'crosshair',
    tier: 2,
    prerequisites: ['tech-anti-tank-1'],
    leadsTo: ['tech-anti-tank-3'],
    description: 'Meriam anti-tank menengah (Pak 38, 6-pounder, ZIS-2). Menembus frontal armor sebagian besar medium tank tahun 1940-1942.',
    bonuses: [
      { label: 'Piercing Batalion', value: '+75.0', positive: true },
      { label: 'Hard Attack', value: '+35.0', positive: true }
    ],
    unlocksEquipment: ['Anti-Tank II']
  },
  {
    id: 'tech-anti-tank-3',
    name: 'Senjata Anti-Tank III (75-88mm Pak 40)',
    originalName: 'Anti-Tank III',
    branch: 'infantry',
    subCategory: 'Anti-Tank',
    year: 1942,
    baseDays: 200,
    iconType: 'crosshair',
    tier: 3,
    prerequisites: ['tech-anti-tank-2'],
    leadsTo: [],
    description: 'Meriam berkecepatan laras sangat tinggi kaliber 75mm ke atas (Pak 40, 17-pounder Inggris). Menembus armor tank berat lawan.',
    bonuses: [
      { label: 'Piercing Batalion', value: '+120.0', positive: true },
      { label: 'Hard Attack', value: '+60.0', positive: true }
    ],
    unlocksEquipment: ['Anti-Tank III']
  },
  {
    id: 'tech-anti-air-1',
    name: 'Senjata Anti-Air Tarik I (20mm)',
    originalName: 'Anti-Air I',
    branch: 'infantry',
    subCategory: 'Anti-Air',
    year: 1936,
    baseDays: 140,
    iconType: 'shield',
    tier: 1,
    prerequisites: [],
    leadsTo: ['tech-anti-air-2'],
    description: 'Meriam otomatis anti-pesawat (Flak 30, Bofors 40mm). Menghancurkan CAS musuh dan mengurangi penalti superioritas udara lawan.',
    bonuses: [
      { label: 'Air Attack', value: '+16.0', positive: true },
      { label: 'Piercing Bonus', value: '+15.0', positive: true }
    ],
    unlocksEquipment: ['Anti-Air I']
  },
  {
    id: 'tech-anti-air-2',
    name: 'Senjata Anti-Air Tarik II (40-88mm)',
    originalName: 'Anti-Air II',
    branch: 'infantry',
    subCategory: 'Anti-Air',
    year: 1939,
    baseDays: 170,
    iconType: 'shield',
    tier: 2,
    prerequisites: ['tech-anti-air-1'],
    leadsTo: [],
    description: 'Meriam anti-udara modern berkaliber menengah-tinggi dengan sistem pengatur waktu detonasi amunisi.',
    bonuses: [
      { label: 'Air Attack', value: '+28.0', positive: true },
      { label: 'Enemy CAS Damage Red.', value: '-50%', positive: true }
    ],
    unlocksEquipment: ['Anti-Air II']
  },
  {
    id: 'tech-engineers-1',
    name: 'Kompi Zeni I (Engineers)',
    originalName: 'Engineers I',
    branch: 'infantry',
    subCategory: 'Kompi Bantuan',
    year: 1936,
    baseDays: 140,
    iconType: 'wrench',
    tier: 1,
    prerequisites: [],
    leadsTo: ['tech-engineers-2'],
    description: 'Unit perintis dengan peralatan pembuat parit, jembatan ponton darurat, dan pembersih ladang ranjau.',
    bonuses: [
      { label: 'Entrenchment Max', value: '+5.0', positive: true },
      { label: 'Penyeberangan Sungai', value: '+15% Attack', positive: true },
      { label: 'Pertahanan Benteng', value: '+10%', positive: true }
    ],
    unlocksEquipment: ['Engineer Support Company']
  },
  {
    id: 'tech-engineers-2',
    name: 'Kompi Zeni II (Peralatan Berat)',
    originalName: 'Engineers II',
    branch: 'infantry',
    subCategory: 'Kompi Bantuan',
    year: 1939,
    baseDays: 170,
    iconType: 'wrench',
    tier: 2,
    prerequisites: ['tech-engineers-1'],
    leadsTo: [],
    description: 'Bulldozer militer, kawat berduri berdaya tahan tinggi, dan bahan peledak terarah shaped-charge.',
    bonuses: [
      { label: 'Entrenchment Max', value: '+5.0 (Total +10)', positive: true },
      { label: 'Perang Hutan & Kota', value: '+10% Attack', positive: true }
    ]
  },
  {
    id: 'tech-logistics-1',
    name: 'Kompi Logistik I',
    originalName: 'Logistics Company I',
    branch: 'infantry',
    subCategory: 'Kompi Bantuan',
    year: 1936,
    baseDays: 160,
    iconType: 'truck',
    tier: 1,
    prerequisites: [],
    leadsTo: ['tech-logistics-2'],
    description: 'Perwira intendant khusus yang mengatur rotasi perbekalan, amunisi, dan ransum garis depan.',
    bonuses: [
      { label: 'Konsumsi Suplai Divisi', value: '-10.0%', positive: true },
      { label: 'Konsumsi Bahan Bakar', value: '-10.0%', positive: true }
    ]
  },
  {
    id: 'tech-logistics-2',
    name: 'Kompi Logistik II',
    originalName: 'Logistics Company II',
    branch: 'infantry',
    subCategory: 'Kompi Bantuan',
    year: 1940,
    baseDays: 190,
    iconType: 'truck',
    tier: 2,
    prerequisites: ['tech-logistics-1'],
    leadsTo: [],
    description: 'Manajemen suplai rel terdepan dan depot bahan bakar bergerak darurat.',
    bonuses: [
      { label: 'Konsumsi Suplai Divisi', value: '-10.0% (Total -20%)', positive: true },
      { label: 'Konsumsi Bahan Bakar', value: '-10.0% (Total -20%)', positive: true }
    ]
  },
  {
    id: 'tech-spec-forces-mountains',
    name: 'Infanteri Gunung (Gebirgsjäger)',
    originalName: 'Mountain Infantry I',
    branch: 'infantry',
    subCategory: 'Pasukan Khusus',
    year: 1936,
    baseDays: 140,
    iconType: 'mountain',
    tier: 1,
    prerequisites: ['tech-inf-1936'],
    leadsTo: [],
    description: 'Divisi terlatih khusus pertempuran medan tinggi, pegunungan es Alpen, Kaukasus, dan bukit terjal.',
    bonuses: [
      { label: 'Mountain Attack', value: '+20.0%', positive: true },
      { label: 'Mountain Defense', value: '+10.0%', positive: true },
      { label: 'Hill Movement', value: '+10.0%', positive: true }
    ],
    unlocksEquipment: ['Mountaineer Battalion']
  },
  {
    id: 'tech-spec-forces-paratroopers',
    name: 'Penerjun Payung (Fallschirmjäger)',
    originalName: 'Paratroopers I',
    branch: 'infantry',
    subCategory: 'Pasukan Khusus',
    year: 1936,
    baseDays: 150,
    iconType: 'plane',
    tier: 1,
    prerequisites: ['tech-inf-1936'],
    leadsTo: [],
    description: 'Pasukan lintas udara yang dapat dijatuhkan oleh pesawat angkut di belakang garis pertahanan musuh.',
    bonuses: [
      { label: 'Airborne Assault', value: 'Terbuka', positive: true },
      { label: 'Out of Supply Grace', value: '+72 Jam', positive: true }
    ],
    unlocksEquipment: ['Paratrooper Battalion']
  },

  // ==================== ARMOR & RANPUR ====================
  {
    id: 'tech-armor-interwar',
    name: 'Sasis Tank Antar Perang',
    originalName: 'Interwar Tank Chassis',
    branch: 'armor',
    subCategory: 'Sasis Tank',
    year: 1934,
    baseDays: 130,
    iconType: 'tank',
    tier: 1,
    prerequisites: [],
    leadsTo: ['tech-armor-light-1', 'tech-armor-medium-1'],
    description: 'Tank awal era PD I yang dimodernisasi (FT-17, Tankette CV-33, Panzer I). Lambat dan berzirah tipis.',
    bonuses: [
      { label: 'Armor Dasar', value: '15.0', positive: true },
      { label: 'Kecepatan Maksimal', value: '6.0 km/h', positive: true }
    ],
    unlocksEquipment: ['Interwar Light Tank Chassis']
  },
  {
    id: 'tech-armor-light-1',
    name: 'Sasis Tank Ringan 1936',
    originalName: 'Basic Light Tank Chassis',
    branch: 'armor',
    subCategory: 'Tank Ringan',
    year: 1936,
    baseDays: 150,
    iconType: 'tank',
    tier: 1,
    prerequisites: ['tech-armor-interwar'],
    leadsTo: ['tech-armor-light-2'],
    description: 'Tank ringan lincah seperti Panzer II, BT-7, Vickers 6-ton, M2 Light Tank. Sempurna untuk rekon dan divisi kavaleri cepat.',
    bonuses: [
      { label: 'Kecepatan Dasar', value: '8.0 km/h', positive: true },
      { label: 'Hardness', value: '60%', positive: true },
      { label: 'Biaya Produksi (IC)', value: 'Murah (7-9 IC)', positive: true }
    ],
    unlocksEquipment: ['Basic Light Tank Chassis', 'Flame Tank Support'],
    mioSynergy: 'MAN / Vickers Tank MIO'
  },
  {
    id: 'tech-armor-light-2',
    name: 'Sasis Tank Ringan Peningkatan 1940',
    originalName: 'Improved Light Tank Chassis',
    branch: 'armor',
    subCategory: 'Tank Ringan',
    year: 1940,
    baseDays: 170,
    iconType: 'tank',
    tier: 2,
    prerequisites: ['tech-armor-light-1'],
    leadsTo: [],
    description: 'Tank ringan modern dengan transmisi bertenaga dan suspensi torsi bar (M5 Stuart, Panzer 38(t) n.A.).',
    bonuses: [
      { label: 'Kecepatan Maksimal', value: '10.0+ km/h', positive: true },
      { label: 'Reliability', value: '+10%', positive: true }
    ],
    unlocksEquipment: ['Improved Light Tank Chassis']
  },
  {
    id: 'tech-armor-medium-1',
    name: 'Sasis Tank Menengah 1938 (Panzer III/IV)',
    originalName: 'Basic Medium Tank Chassis',
    branch: 'armor',
    subCategory: 'Tank Menengah (Meta)',
    year: 1938,
    baseDays: 170,
    iconType: 'tank',
    tier: 2,
    prerequisites: ['tech-armor-interwar'],
    leadsTo: ['tech-armor-medium-2'],
    description: 'Tulang punggung divisi lapis baja Perang Dunia II (Panzer III & IV, Chi-Ha). Keseimbangan sempurna antara armor, senjata, dan mobilitas.',
    historicalContext: 'Membuka era perang manuver Blitzkrieg di Eropa Barat 1940.',
    bonuses: [
      { label: 'Armor Rating', value: '45.0', positive: true },
      { label: 'Breakthrough', value: '35.0', positive: true },
      { label: 'Hardness', value: '80%', positive: true }
    ],
    unlocksEquipment: ['Basic Medium Tank Chassis'],
    mioSynergy: 'Daimler-Benz / Tankograd Medium MIO'
  },
  {
    id: 'tech-armor-medium-2',
    name: 'Sasis Tank Menengah Peningkatan 1940 (T-34 / Sherman)',
    originalName: 'Improved Medium Tank Chassis',
    branch: 'armor',
    subCategory: 'Tank Menengah (Meta)',
    year: 1940,
    baseDays: 190,
    iconType: 'tank',
    tier: 3,
    prerequisites: ['tech-armor-medium-1'],
    leadsTo: ['tech-armor-medium-3'],
    description: 'Desain legendaris Perang Dunia II (T-34/76 Soviet dengan armor miring sloped, M4 Sherman Amerika Serikat dengan girboks andal).',
    historicalContext: 'Diproduksi hingga puluhan ribu unit, memenangkan peperangan attrition melawan poros Axis.',
    bonuses: [
      { label: 'Armor Rating', value: '65.0', positive: true },
      { label: 'Breakthrough', value: '55.0', positive: true },
      { label: 'Reliability', value: '+15%', positive: true }
    ],
    unlocksEquipment: ['Improved Medium Tank Chassis (T-34 / Sherman)'],
    mioSynergy: 'Henschel / Detroit Arsenal'
  },
  {
    id: 'tech-armor-medium-3',
    name: 'Sasis Tank Menengah Lanjut 1943 (Panther / T-34-85)',
    originalName: 'Advanced Medium Tank Chassis',
    branch: 'armor',
    subCategory: 'Tank Menengah (Meta)',
    year: 1943,
    baseDays: 220,
    iconType: 'tank',
    tier: 4,
    prerequisites: ['tech-armor-medium-2'],
    leadsTo: ['tech-armor-modern'],
    description: 'Puncak evolusi tank perang dunia kedua (Panther Ausf. G, T-34-85, Centurion Mk I). Armor tebal dan meriam 75mm KwK 42 L/70 mematikan.',
    bonuses: [
      { label: 'Armor Rating', value: '90.0', positive: true },
      { label: 'Breakthrough', value: '75.0', positive: true },
      { label: 'Piercing', value: '85.0', positive: true }
    ],
    unlocksEquipment: ['Advanced Medium Tank Chassis (Panther / Centurion)']
  },
  {
    id: 'tech-armor-heavy-1',
    name: 'Sasis Tank Berat 1934 (Grosstraktor / T-35)',
    originalName: 'Basic Heavy Tank Chassis',
    branch: 'armor',
    subCategory: 'Tank Berat',
    year: 1934,
    baseDays: 160,
    iconType: 'shield',
    tier: 1,
    prerequisites: [],
    leadsTo: ['tech-armor-heavy-2'],
    description: 'Konsep tank multi-turret pra-perang dengan lambung raksasa untuk menghancurkan benteng parit musuh.',
    bonuses: [
      { label: 'Armor Rating', value: '60.0', positive: true },
      { label: 'Breakthrough', value: '45.0', positive: true },
      { label: 'Kecepatan', value: '4.5 km/h', positive: false }
    ],
    unlocksEquipment: ['Basic Heavy Tank Chassis']
  },
  {
    id: 'tech-armor-heavy-2',
    name: 'Sasis Tank Berat 1940 (Tiger I / KV-1)',
    originalName: 'Improved Heavy Tank Chassis',
    branch: 'armor',
    subCategory: 'Tank Berat',
    year: 1940,
    baseDays: 200,
    iconType: 'shield',
    tier: 3,
    prerequisites: ['tech-armor-heavy-1'],
    leadsTo: ['tech-armor-heavy-3'],
    description: 'Monster tempur berpelindung baja tebal (Panzer VI Tiger I, Kliment Voroshilov KV-1). Mampu menahan ratusan tembakan artileri anti-tank biasa.',
    historicalContext: 'Mengguncang psikologis tentara sekutu di Front Timur dan Afrika Utara.',
    bonuses: [
      { label: 'Armor Rating', value: '110.0', positive: true },
      { label: 'Breakthrough', value: '85.0', positive: true },
      { label: 'Hard Attack', value: '+40.0', positive: true },
      { label: 'Konsumsi Suplai', value: '+30%', positive: false }
    ],
    unlocksEquipment: ['Improved Heavy Tank Chassis (Tiger I / KV-1)'],
    mioSynergy: 'Porsche / Kirov Plant'
  },
  {
    id: 'tech-armor-heavy-3',
    name: 'Sasis Tank Berat 1943 (Tiger II King Tiger / IS-2)',
    originalName: 'Advanced Heavy Tank Chassis',
    branch: 'armor',
    subCategory: 'Tank Berat',
    year: 1943,
    baseDays: 230,
    iconType: 'shield',
    tier: 4,
    prerequisites: ['tech-armor-heavy-2'],
    leadsTo: [],
    description: 'Raksasa berlapis baja 150mm miring dengan meriam 88mm KwK 43 atau 122mm D-25T (Königstiger & Iosef Stalin IS-2).',
    bonuses: [
      { label: 'Armor Rating', value: '145.0', positive: true },
      { label: 'Hard Attack', value: '+75.0', positive: true },
      { label: 'Biaya IC & Chromium', value: 'Sangat Tinggi', positive: false }
    ],
    unlocksEquipment: ['Advanced Heavy Tank Chassis (King Tiger)']
  },
  {
    id: 'tech-armor-modern',
    name: 'Sasis Main Battle Tank (Modern Tank 1945)',
    originalName: 'Modern Tank Chassis',
    branch: 'armor',
    subCategory: 'Main Battle Tank',
    year: 1945,
    baseDays: 250,
    iconType: 'award',
    tier: 5,
    prerequisites: ['tech-armor-medium-3'],
    leadsTo: [],
    description: 'Konsep revolusioner Main Battle Tank (T-54, M26 Pershing, Centurion Mk III) yang menggabungkan kecepatan tank medium dengan zirah tank berat.',
    bonuses: [
      { label: 'Armor Rating', value: '130.0', positive: true },
      { label: 'Kecepatan', value: '10.5 km/h', positive: true },
      { label: 'Breakthrough', value: '100.0', positive: true },
      { label: 'Reliability', value: '85%', positive: true }
    ],
    unlocksEquipment: ['Modern Tank Chassis']
  },
  {
    id: 'tech-motorized-1',
    name: 'Truk Bermotor (Motorized)',
    originalName: 'Motorized',
    branch: 'armor',
    subCategory: 'Mobilitas Ranpur',
    year: 1936,
    baseDays: 140,
    iconType: 'truck',
    tier: 1,
    prerequisites: [],
    leadsTo: ['tech-mechanized-1'],
    description: 'Truk logistik dan pengangkut personel 4x4 & 6x6 (Opel Blitz, GMC CCKW 2.5-ton). Memberikan kecepatan 12 km/jam pada infanteri.',
    bonuses: [
      { label: 'Divisi Kecepatan Maks', value: '12.0 km/h', positive: true },
      { label: 'Motorisasi Logistik Hub', value: 'Jangkauan x2', positive: true }
    ],
    unlocksEquipment: ['Motorized Equipment I', 'Motorized Battalion']
  },
  {
    id: 'tech-mechanized-1',
    name: 'Kendaraan Mekanis I (Half-Track 1940)',
    originalName: 'Mechanized I',
    branch: 'armor',
    subCategory: 'Mobilitas Ranpur',
    year: 1940,
    baseDays: 180,
    iconType: 'truck',
    tier: 2,
    prerequisites: ['tech-motorized-1'],
    leadsTo: ['tech-mechanized-2'],
    description: 'Pengangkut personel lapis baja rantai setengah (Sd.Kfz. 251, M3 Half-track). Memberikan proteksi zirah dan hardness pada infanteri lapis baja.',
    bonuses: [
      { label: 'Hardness Batalion', value: '60%', positive: true },
      { label: 'Armor Batalion', value: '25.0', positive: true },
      { label: 'Defense & HP', value: 'Sangat Tinggi', positive: true }
    ],
    unlocksEquipment: ['Mechanized I Equipment']
  },
  {
    id: 'tech-mechanized-2',
    name: 'Kendaraan Mekanis II (1942)',
    originalName: 'Mechanized II',
    branch: 'armor',
    subCategory: 'Mobilitas Ranpur',
    year: 1942,
    baseDays: 200,
    iconType: 'truck',
    tier: 3,
    prerequisites: ['tech-mechanized-1'],
    leadsTo: [],
    description: 'Pengangkut personel roda rantai penuh dengan proteksi senapan mesin anti-pesawat.',
    bonuses: [
      { label: 'Hardness Batalion', value: '75%', positive: true },
      { label: 'Armor Batalion', value: '40.0', positive: true }
    ],
    unlocksEquipment: ['Mechanized II Equipment']
  },

  // ==================== ANGKATAN UDARA ====================
  {
    id: 'tech-air-small-1',
    name: 'Rangka Pesawat Tempur Kecil 1936',
    originalName: 'Basic Small Airframe',
    branch: 'air',
    subCategory: 'Fighter & CAS',
    year: 1936,
    baseDays: 150,
    iconType: 'plane',
    tier: 1,
    prerequisites: [],
    leadsTo: ['tech-air-small-2'],
    description: 'Monoplan sayap tunggal serbaguna (Bf 109 B/D, Hawker Hurricane, I-16 Polikarpov). Fondasi fighter dan CAS pengebom tukik Ju 87 Stuka.',
    bonuses: [
      { label: 'Kecepatan Maksimal', value: '520 km/h', positive: true },
      { label: 'Air Superiority Defense', value: '+15.0', positive: true }
    ],
    unlocksEquipment: ['Basic Small Airframe (Fighter & CAS)'],
    mioSynergy: 'Messerschmitt / Supermarine Aviation'
  },
  {
    id: 'tech-air-small-2',
    name: 'Rangka Pesawat Tempur Kecil 1940 (Meta Spitfire/Fw 190)',
    originalName: 'Improved Small Airframe',
    branch: 'air',
    subCategory: 'Fighter & CAS',
    year: 1940,
    baseDays: 180,
    iconType: 'plane',
    tier: 2,
    prerequisites: ['tech-air-small-1'],
    leadsTo: ['tech-air-small-3'],
    description: 'Pesawat tempur paling dominan di langit Eropa dan Pasifik (Supermarine Spitfire Mk V, Focke-Wulf Fw 190, P-51B Mustang, A6M Zero).',
    historicalContext: 'Mampu membawa persenjataan kanon 20mm ganda dan tangki bahan bakar self-sealing.',
    bonuses: [
      { label: 'Air Superiority Attack', value: '+45.0', positive: true },
      { label: 'Agility', value: '55.0', positive: true },
      { label: 'Jangkauan Operasi', value: '900 km', positive: true }
    ],
    unlocksEquipment: ['Improved Small Airframe'],
    mioSynergy: 'Focke-Wulf / North American Aviation'
  },
  {
    id: 'tech-air-small-3',
    name: 'Rangka Pesawat Tempur Lanjut 1944 (P-51D / Ta 152)',
    originalName: 'Advanced Small Airframe',
    branch: 'air',
    subCategory: 'Fighter & CAS',
    year: 1944,
    baseDays: 210,
    iconType: 'plane',
    tier: 3,
    prerequisites: ['tech-air-small-2'],
    leadsTo: ['tech-air-jet-1'],
    description: 'Fighter jarak jauh kawal pembom (P-51D Mustang dengan drop tank, Hawker Tempest). Menguasai penuh ruang udara langit lawan.',
    bonuses: [
      { label: 'Air Agility', value: '70.0', positive: true },
      { label: 'Kecepatan', value: '720 km/h', positive: true },
      { label: 'Jangkauan Kawal', value: '1,500 km', positive: true }
    ],
    unlocksEquipment: ['Advanced Small Airframe']
  },
  {
    id: 'tech-air-jet-1',
    name: 'Pesawat Tempur Mesin Jet 1945',
    originalName: 'Jet Fighter',
    branch: 'air',
    subCategory: 'Teknologi Jet',
    year: 1945,
    baseDays: 240,
    iconType: 'award',
    tier: 4,
    prerequisites: ['tech-air-small-3'],
    leadsTo: [],
    description: 'Pesawat bermesin turbin jet pertama di dunia (Messerschmitt Me 262 Schwalbe, Gloster Meteor). Menghancurkan pembom musuh dengan kecepatan tak tertandingi.',
    bonuses: [
      { label: 'Kecepatan Maksimal', value: '870+ km/h', positive: true },
      { label: 'Air Attack', value: '+80.0', positive: true },
      { label: 'Konsumsi Bahan Bakar', value: '+50%', positive: false }
    ],
    unlocksEquipment: ['Jet Airframe']
  },
  {
    id: 'tech-air-medium-1',
    name: 'Rangka Pesawat Menengah 1936 (Ju 88 / Blenheim)',
    originalName: 'Basic Medium Airframe',
    branch: 'air',
    subCategory: 'Pembom Taktis & Maritim',
    year: 1936,
    baseDays: 160,
    iconType: 'plane',
    tier: 1,
    prerequisites: [],
    leadsTo: ['tech-air-medium-2'],
    description: 'Pesawat mesin ganda untuk pengeboman taktis garis depan, patroli maritim, dan heavy fighter (Bf 110).',
    bonuses: [
      { label: 'Tactical Bombing', value: '+18.0', positive: true },
      { label: 'Jangkauan Operasi', value: '1,200 km', positive: true }
    ],
    unlocksEquipment: ['Basic Medium Airframe']
  },
  {
    id: 'tech-air-medium-2',
    name: 'Rangka Pesawat Menengah 1940 (Me 410 / Mosquito)',
    originalName: 'Improved Medium Airframe',
    branch: 'air',
    subCategory: 'Pembom Taktis & Maritim',
    year: 1940,
    baseDays: 190,
    iconType: 'plane',
    tier: 2,
    prerequisites: ['tech-air-medium-1'],
    leadsTo: [],
    description: 'Pembom cepat serbaguna legendaris (de Havilland Mosquito berbahan kayu balsa cepat, Ju 188).',
    bonuses: [
      { label: 'Tactical Bombing', value: '+30.0', positive: true },
      { label: 'Naval Strike', value: '+22.0', positive: true }
    ],
    unlocksEquipment: ['Improved Medium Airframe']
  },
  {
    id: 'tech-air-heavy-1',
    name: 'Rangka Pembom Strategis Berat (B-17 Flying Fortress)',
    originalName: 'Basic Heavy Airframe',
    branch: 'air',
    subCategory: 'Pembom Strategis',
    year: 1936,
    baseDays: 180,
    iconType: 'plane',
    tier: 1,
    prerequisites: [],
    leadsTo: ['tech-air-heavy-2'],
    description: 'Pesawat 4-mesin berjangkauan benua (Boeing B-17 Flying Fortress, Heinkel He 177). Menghancurkan pabrik sipil, rel kereta, dan benteng musuh dari ketinggian.',
    bonuses: [
      { label: 'Strategic Bombing', value: '+40.0', positive: true },
      { label: 'Jangkauan', value: '2,000 km', positive: true },
      { label: 'Daya Tahan Pertahanan', value: '+35.0', positive: true }
    ],
    unlocksEquipment: ['Basic Heavy Airframe (Strategic Bomber)'],
    mioSynergy: 'Boeing / Avro Bomber MIO'
  },
  {
    id: 'tech-air-heavy-2',
    name: 'Rangka Pembom Super Berat 1944 (B-29 Superfortress)',
    originalName: 'Advanced Heavy Airframe',
    branch: 'air',
    subCategory: 'Pembom Strategis & Nuklir',
    year: 1944,
    baseDays: 240,
    iconType: 'plane',
    tier: 3,
    prerequisites: ['tech-air-heavy-1'],
    leadsTo: [],
    description: 'Raksasa pembom kabin bertekanan dengan sistem kendali tembak jarak jauh (Boeing B-29 Superfortress). Satu-satunya pembom yang dapat membawa Bom Atom!',
    bonuses: [
      { label: 'Strategic Bombing', value: '+85.0', positive: true },
      { label: 'Jangkauan Operasi', value: '3,200 km', positive: true },
      { label: 'Syarat Jatuhkan Bom Atom', value: 'Terpenuhi', positive: true }
    ],
    unlocksEquipment: ['Advanced Heavy Airframe (Atomic Delivery)']
  },

  // ==================== ANGKATAN LAUT ====================
  {
    id: 'tech-naval-destroyer-1',
    name: 'Lambung Kapal Perusak 1936 (Early Destroyer)',
    originalName: 'Early Destroyer Hull',
    branch: 'naval',
    subCategory: 'Screening Ships',
    year: 1936,
    baseDays: 140,
    iconType: 'anchor',
    tier: 1,
    prerequisites: [],
    leadsTo: ['tech-naval-destroyer-2'],
    description: 'Kapal pengawal tabir armada (Fletcher, Type 1936, Tribal-class). Melindungi kapal induk dan kapal tempur dari serangan torpedo kapal selam.',
    bonuses: [
      { label: 'Screening Efficiency', value: '+100%', positive: true },
      { label: 'Anti-Submarine Warfare', value: '+20.0', positive: true },
      { label: 'Kecepatan Armada', value: '35 knot', positive: true }
    ],
    unlocksEquipment: ['Early Destroyer Hull'],
    mioSynergy: 'Blohm & Voss / Bath Iron Works'
  },
  {
    id: 'tech-naval-destroyer-2',
    name: 'Lambung Kapal Perusak Peningkatan 1940',
    originalName: '1940 Destroyer Hull',
    branch: 'naval',
    subCategory: 'Screening Ships',
    year: 1940,
    baseDays: 170,
    iconType: 'anchor',
    tier: 2,
    prerequisites: ['tech-naval-destroyer-1'],
    leadsTo: [],
    description: 'Penyempurnaan sonar ASDIC, peluncur depth charges kembang api Hedghog, dan radar maritim sentimeter.',
    bonuses: [
      { label: 'Sub Detection', value: '+35.0', positive: true },
      { label: 'Depth Charge Attack', value: '+25.0', positive: true }
    ],
    unlocksEquipment: ['1940 Destroyer Hull']
  },
  {
    id: 'tech-naval-cruiser-1',
    name: 'Lambung Kapal Penjelajah 1936 (Light/Heavy Cruiser)',
    originalName: 'Early Cruiser Hull',
    branch: 'naval',
    subCategory: 'Kapal Penjelajah',
    year: 1936,
    baseDays: 160,
    iconType: 'anchor',
    tier: 1,
    prerequisites: [],
    leadsTo: ['tech-naval-cruiser-2'],
    description: 'Kategori kapal paling fleksibel dalam meta HOI4. Dapat dikonfigurasi menjadi Light Cruiser bersenjata kanon 6-inci pemusnah destroyer, atau Heavy Cruiser bersenjata 8-inci.',
    bonuses: [
      { label: 'Light Attack Surface', value: '+30.0', positive: true },
      { label: 'Armor Tabir', value: '+20.0', positive: true }
    ],
    unlocksEquipment: ['Early Cruiser Hull']
  },
  {
    id: 'tech-naval-cruiser-2',
    name: 'Lambung Kapal Penjelajah 1940 (Brooklyn / Cleveland)',
    originalName: '1940 Cruiser Hull',
    branch: 'naval',
    subCategory: 'Kapal Penjelajah (Meta)',
    year: 1940,
    baseDays: 190,
    iconType: 'anchor',
    tier: 2,
    prerequisites: ['tech-naval-cruiser-1'],
    leadsTo: [],
    description: 'Raja pertempuran permukaan laut. Menghabisi screening screen musuh dalam hitungan jam sebelum torpedo torpedo kapal induk diluncurkan.',
    bonuses: [
      { label: 'Light Attack Surface', value: '+65.0', positive: true },
      { label: 'Anti-Air Fleet Defense', value: '+35.0', positive: true }
    ],
    unlocksEquipment: ['1940 Cruiser Hull']
  },
  {
    id: 'tech-naval-sub-1',
    name: 'Lambung Kapal Selam 1936 (U-Boat Type VII)',
    originalName: '1936 Submarine Hull',
    branch: 'naval',
    subCategory: 'Kapal Selam & Raiding',
    year: 1936,
    baseDays: 140,
    iconType: 'anchor',
    tier: 1,
    prerequisites: [],
    leadsTo: ['tech-naval-sub-2'],
    description: 'U-Boat andalan Kriegsmarine di Samudra Atlantik. Mampu menenggelamkan ribuan konvoi suplai musuh dalam taktik Wolfpack.',
    bonuses: [
      { label: 'Sub Visibility Rendah', value: '1.5', positive: true },
      { label: 'Torpedo Attack', value: '+40.0', positive: true }
    ],
    unlocksEquipment: ['1936 Submarine Hull'],
    mioSynergy: 'Germaniawerft Submarine MIO'
  },
  {
    id: 'tech-naval-sub-2',
    name: 'Lambung Kapal Selam 1940 (U-Boat Type IX)',
    originalName: '1940 Submarine Hull',
    branch: 'naval',
    subCategory: 'Kapal Selam & Raiding',
    year: 1940,
    baseDays: 170,
    iconType: 'anchor',
    tier: 2,
    prerequisites: ['tech-naval-sub-1'],
    leadsTo: ['tech-naval-sub-3'],
    description: 'Kapal selam jarak jauh untuk operasi samudra lepas hingga pesisir Amerika Serikat.',
    bonuses: [
      { label: 'Jangkauan Patroli', value: '4,500 km', positive: true },
      { label: 'Torpedo Attack', value: '+65.0', positive: true }
    ],
    unlocksEquipment: ['1940 Submarine Hull']
  },
  {
    id: 'tech-naval-sub-3',
    name: 'Elektroboot 1944 (Type XXI & Snorkel)',
    originalName: '1944 Submarine Hull',
    branch: 'naval',
    subCategory: 'Kapal Selam (Siluman)',
    year: 1944,
    baseDays: 220,
    iconType: 'anchor',
    tier: 3,
    prerequisites: ['tech-naval-sub-2'],
    leadsTo: [],
    description: 'Kapal selam revolusioner dengan kapasitas baterai raksasa dan snorkel untuk menyelam berminggu-minggu tanpa terdeteksi radar udara.',
    bonuses: [
      { label: 'Sub Visibility', value: '0.6 (Hampir Siluman)', positive: true },
      { label: 'Kecepatan Bawah Air', value: '17 knot', positive: true }
    ],
    unlocksEquipment: ['1944 Submarine Hull (Elektroboot)']
  },
  {
    id: 'tech-naval-battleship-1',
    name: 'Lambung Kapal Tempur 1936 (Battleship)',
    originalName: 'Early Battleship Hull',
    branch: 'naval',
    subCategory: 'Capital Ships',
    year: 1936,
    baseDays: 180,
    iconType: 'shield',
    tier: 1,
    prerequisites: [],
    leadsTo: ['tech-naval-battleship-2'],
    description: 'Benteng terapung baja bersenjata meriam 15-16 inci (Bismarck, King George V, Vittorio Veneto, Nagato).',
    bonuses: [
      { label: 'Heavy Attack', value: '+85.0', positive: true },
      { label: 'Armor Ketebalan', value: '+70.0', positive: true }
    ],
    unlocksEquipment: ['Early Battleship Hull']
  },
  {
    id: 'tech-naval-battleship-2',
    name: 'Kapal Tempur Super Berat (Yamato Class)',
    originalName: 'Super-Heavy Battleship',
    branch: 'naval',
    subCategory: 'Capital Ships',
    year: 1940,
    baseDays: 240,
    iconType: 'shield',
    tier: 2,
    prerequisites: ['tech-naval-battleship-1'],
    leadsTo: [],
    description: 'Kapal tempur terbesar dalam sejarah manusia dengan meriam 18.1 inci (460mm) dan pelindung baja seberat 20.000 ton.',
    bonuses: [
      { label: 'Heavy Attack', value: '+140.0', positive: true },
      { label: 'Shore Bombardment', value: '+50.0%', positive: true },
      { label: 'Biaya Dok & Waktu', value: 'Ekstrem (3-4 Tahun)', positive: false }
    ],
    unlocksEquipment: ['Super-Heavy Battleship Hull']
  },
  {
    id: 'tech-naval-carrier-1',
    name: 'Lambung Kapal Induk 1936 (Aircraft Carrier)',
    originalName: 'Early Carrier Hull',
    branch: 'naval',
    subCategory: 'Kapal Induk (Meta)',
    year: 1936,
    baseDays: 180,
    iconType: 'plane',
    tier: 1,
    prerequisites: [],
    leadsTo: ['tech-naval-carrier-2'],
    description: 'Pangkalan udara terapung (USS Yorktown, Ark Royal, Akagi). Menghancurkan armada musuh dari jarak ratusan mil laut di luar jangkauan meriam kapal tempur.',
    bonuses: [
      { label: 'Kapasitas Hanggar Dek', value: '60 Pesawat', positive: true },
      { label: 'Sortie Strike Efficiency', value: '+20%', positive: true }
    ],
    unlocksEquipment: ['Early Carrier Hull'],
    mioSynergy: 'Newport News Shipbuilding'
  },
  {
    id: 'tech-naval-carrier-2',
    name: 'Kapal Induk Armada Peningkatan 1940 (Essex Class)',
    originalName: '1940 Carrier Hull',
    branch: 'naval',
    subCategory: 'Kapal Induk (Meta)',
    year: 1940,
    baseDays: 220,
    iconType: 'plane',
    tier: 2,
    prerequisites: ['tech-naval-carrier-1'],
    leadsTo: [],
    description: 'Desain kapal induk armada legendaris (USS Essex, Taiho berdek baja lapis baja). Kapasitas hanggar lebih besar dan peluncur katapel modern.',
    bonuses: [
      { label: 'Kapasitas Hanggar Dek', value: '80 Pesawat', positive: true },
      { label: 'Dek Armor Ketahanan', value: '+40.0', positive: true }
    ],
    unlocksEquipment: ['1940 Carrier Hull (Essex Class)']
  },

  // ==================== INDUSTRI & KONSTRUKSI ====================
  {
    id: 'tech-ind-tools-1',
    name: 'Perkakas Mesin Dasar (Basic Machine Tools)',
    originalName: 'Basic Machine Tools',
    branch: 'industry',
    subCategory: 'Efisiensi Produksi',
    year: 1936,
    baseDays: 140,
    iconType: 'factory',
    tier: 1,
    prerequisites: [],
    leadsTo: ['tech-ind-tools-2', 'tech-ind-concentrated-1', 'tech-ind-dispersed-1'],
    description: 'Riset paling pertama dan wajib untuk semua negara di HOI4. Menaikkan batas efisiensi produksi pabrik militer sebesar +10%.',
    bonuses: [
      { label: 'Max Production Efficiency', value: '+10.0%', positive: true },
      { label: 'Production Efficiency Retention', value: '+10.0%', positive: true }
    ],
    mioSynergy: 'General Industrial Concern'
  },
  {
    id: 'tech-ind-tools-2',
    name: 'Perkakas Mesin Peningkatan (Improved Machine Tools)',
    originalName: 'Improved Machine Tools',
    branch: 'industry',
    subCategory: 'Efisiensi Produksi',
    year: 1937,
    baseDays: 160,
    iconType: 'factory',
    tier: 2,
    prerequisites: ['tech-ind-tools-1'],
    leadsTo: ['tech-ind-tools-3'],
    description: 'Standardisasi mur, baut, dan cetakan pengecoran logam untuk lini perakitan massal.',
    bonuses: [
      { label: 'Max Production Efficiency', value: '+10.0% (Total +20%)', positive: true },
      { label: 'Production Efficiency Retention', value: '+10.0%', positive: true }
    ]
  },
  {
    id: 'tech-ind-tools-3',
    name: 'Perkakas Mesin Lanjut (Advanced Machine Tools)',
    originalName: 'Advanced Machine Tools',
    branch: 'industry',
    subCategory: 'Efisiensi Produksi',
    year: 1939,
    baseDays: 180,
    iconType: 'factory',
    tier: 3,
    prerequisites: ['tech-ind-tools-2'],
    leadsTo: [],
    description: 'Sistem ban berjalan otomatis penuh Fordist untuk produksi ribuan tank dan senapan tanpa henti.',
    bonuses: [
      { label: 'Max Production Efficiency', value: '+10.0% (Total +30%)', positive: true },
      { label: 'Production Efficiency Cap', value: 'Bisa mencapai 80-90%', positive: true }
    ]
  },
  {
    id: 'tech-ind-concentrated-1',
    name: 'Industri Terkonsentrasi I (Concentrated Industry)',
    originalName: 'Concentrated Industry I',
    branch: 'industry',
    subCategory: 'Kapasitas Pabrik',
    year: 1936,
    baseDays: 140,
    iconType: 'factory',
    tier: 1,
    prerequisites: ['tech-ind-tools-1'],
    leadsTo: ['tech-ind-concentrated-2'],
    description: 'Mengumpulkan seluruh pabrik dalam kompleks raksasa di satu provinsi. Memberikan output produksi tertinggi (+15%), namun lebih rentan bom strategis musuh.',
    bonuses: [
      { label: 'Output Pabrik Militer', value: '+15.0%', positive: true },
      { label: 'Maks Pabrik per Provinsi', value: '+20.0%', positive: true }
    ]
  },
  {
    id: 'tech-ind-concentrated-2',
    name: 'Industri Terkonsentrasi II',
    originalName: 'Concentrated Industry II',
    branch: 'industry',
    subCategory: 'Kapasitas Pabrik',
    year: 1937,
    baseDays: 160,
    iconType: 'factory',
    tier: 2,
    prerequisites: ['tech-ind-concentrated-1'],
    leadsTo: [],
    description: 'Ekspansi vertikal tungku pembakaran baja dan peleburan aluminium berskala raksasa.',
    bonuses: [
      { label: 'Output Pabrik Militer', value: '+15.0% (Total +30%)', positive: true },
      { label: 'Maks Pabrik per Provinsi', value: '+20.0%', positive: true }
    ]
  },
  {
    id: 'tech-ind-dispersed-1',
    name: 'Industri Tersebar I (Dispersed Industry - Meta)',
    originalName: 'Dispersed Industry I',
    branch: 'industry',
    subCategory: 'Kapasitas Pabrik (Meta)',
    year: 1936,
    baseDays: 140,
    iconType: 'factory',
    tier: 1,
    prerequisites: ['tech-ind-tools-1'],
    leadsTo: ['tech-ind-dispersed-2'],
    description: 'Menyebarkan bengkel kerja di berbagai kota kecil dan gua bawah tanah. Memberikan retensi efisiensi produksi saat berganti varian senjata dan kebal pengeboman.',
    bonuses: [
      { label: 'Output Pabrik Militer', value: '+10.0%', positive: true },
      { label: 'Retensi Efisiensi Konversi', value: '+20.0%', positive: true },
      { label: 'Ketahanan Bombing Strategis', value: '+10.0%', positive: true }
    ]
  },
  {
    id: 'tech-ind-dispersed-2',
    name: 'Industri Tersebar II',
    originalName: 'Dispersed Industry II',
    branch: 'industry',
    subCategory: 'Kapasitas Pabrik (Meta)',
    year: 1937,
    baseDays: 160,
    iconType: 'factory',
    tier: 2,
    prerequisites: ['tech-ind-dispersed-1'],
    leadsTo: [],
    description: 'Desentralisasi produksi suku cadang independen antarkota.',
    bonuses: [
      { label: 'Output Pabrik Militer', value: '+10.0% (Total +20%)', positive: true },
      { label: 'Retensi Efisiensi Konversi', value: '+20.0%', positive: true },
      { label: 'Ketahanan Bombing Strategis', value: '+10.0%', positive: true }
    ]
  },
  {
    id: 'tech-ind-construction-1',
    name: 'Konstruksi I (Construction I)',
    originalName: 'Construction I',
    branch: 'industry',
    subCategory: 'Kecepatan Bangun',
    year: 1936,
    baseDays: 140,
    iconType: 'wrench',
    tier: 1,
    prerequisites: [],
    leadsTo: ['tech-ind-construction-2'],
    description: 'Penyempurnaan mesin pengaduk semen dan derek konstruksi. Mempercepat pembangunan seluruh pabrik, infrastruktur, pangkalan udara, dan rel kereta sebesar +10%.',
    bonuses: [
      { label: 'Kecepatan Konstruksi Pabrik', value: '+10.0%', positive: true },
      { label: 'Kecepatan Bangun Infrastruktur', value: '+10.0%', positive: true }
    ]
  },
  {
    id: 'tech-ind-construction-2',
    name: 'Konstruksi II',
    originalName: 'Construction II',
    branch: 'industry',
    subCategory: 'Kecepatan Bangun',
    year: 1937,
    baseDays: 160,
    iconType: 'wrench',
    tier: 2,
    prerequisites: ['tech-ind-construction-1'],
    leadsTo: ['tech-ind-construction-3'],
    description: 'Pondasi beton bertulang cepat kering untuk pembangunan pelabuhan dan supply hub.',
    bonuses: [
      { label: 'Kecepatan Konstruksi', value: '+10.0% (Total +20%)', positive: true }
    ]
  },
  {
    id: 'tech-ind-construction-3',
    name: 'Konstruksi III',
    originalName: 'Construction III',
    branch: 'industry',
    subCategory: 'Kecepatan Bangun',
    year: 1939,
    baseDays: 180,
    iconType: 'wrench',
    tier: 3,
    prerequisites: ['tech-ind-construction-2'],
    leadsTo: [],
    description: 'Prefabrikasi material bangunan skala nasional untuk akselerasi industri masa perang.',
    bonuses: [
      { label: 'Kecepatan Konstruksi', value: '+10.0% (Total +30%)', positive: true }
    ]
  },
  {
    id: 'tech-ind-synthetic-1',
    name: 'Kilang Minyak Sintetis I (Synthetic Refinery)',
    originalName: 'Synthetic Oil I',
    branch: 'industry',
    subCategory: 'Sumber Daya Buatan',
    year: 1936,
    baseDays: 150,
    iconType: 'fuel',
    tier: 1,
    prerequisites: [],
    leadsTo: ['tech-ind-synthetic-2'],
    description: 'Proses Fischer-Tropsch dan hidrogenasi batubara menjadi bahan bakar cair sintetik. Menghasilkan bahan bakar tanpa sumur minyak bumi!',
    historicalContext: 'Sangat krusial untuk Jerman dan Jepang yang menghadapi embargo minyak Sekutu.',
    bonuses: [
      { label: 'Produksi Minyak Sintetik', value: '+2 Minyak per Kilang', positive: true },
      { label: 'Bahan Bakar Harian', value: '+48 Bahan Bakar/hari', positive: true }
    ],
    unlocksEquipment: ['Synthetic Refinery Building']
  },
  {
    id: 'tech-ind-synthetic-2',
    name: 'Produksi Karet Sintetis (Buna Rubber)',
    originalName: 'Synthetic Rubber I',
    branch: 'industry',
    subCategory: 'Sumber Daya Buatan',
    year: 1939,
    baseDays: 170,
    iconType: 'fuel',
    tier: 2,
    prerequisites: ['tech-ind-synthetic-1'],
    leadsTo: [],
    description: 'Sintesis polimer butadiena (Buna-S). Menghasilkan karet untuk ban pesawat, truk, dan tank tanpa bergantung pada impor Malaya/Hindia Belanda.',
    bonuses: [
      { label: 'Produksi Karet Sintetik', value: '+2 Karet per Kilang', positive: true }
    ]
  },

  // ==================== TEKNIK, ELEKTRONIK & NUKLIR ====================
  {
    id: 'tech-eng-computing-1',
    name: 'Komputasi Mekanik (Mechanical Computing)',
    originalName: 'Mechanical Computing',
    branch: 'engineering',
    subCategory: 'Riset & Elektronik',
    year: 1936,
    baseDays: 140,
    iconType: 'cpu',
    tier: 1,
    prerequisites: [],
    leadsTo: ['tech-eng-computing-2'],
    description: 'Mesin hitung mekanik bertenaga listrik untuk mempercepat kalkulasi balistik dan riset ilmiah (+3% Kecepatan Riset).',
    bonuses: [
      { label: 'Kecepatan Riset Nasional', value: '+3.0%', positive: true }
    ],
    mioSynergy: 'Siemens / Turing Institute'
  },
  {
    id: 'tech-eng-computing-2',
    name: 'Mesin Komputasi Elektronik (Computing Machine)',
    originalName: 'Computing Machine',
    branch: 'engineering',
    subCategory: 'Riset & Elektronik',
    year: 1938,
    baseDays: 160,
    iconType: 'cpu',
    tier: 2,
    prerequisites: ['tech-eng-computing-1'],
    leadsTo: ['tech-eng-computing-3', 'tech-eng-encryption-1'],
    description: 'Mesin pemroses logika relai elektrik (Z3 Zuse, Bombe Turing). Mengakselerasi seluruh pohon riset negara.',
    bonuses: [
      { label: 'Kecepatan Riset Nasional', value: '+5.0% (Total +8%)', positive: true }
    ]
  },
  {
    id: 'tech-eng-computing-3',
    name: 'Komputer Tabung Hampa Udara 1940 (Vacuum Tubes)',
    originalName: 'Improved Computing Machine',
    branch: 'engineering',
    subCategory: 'Riset & Elektronik',
    year: 1940,
    baseDays: 190,
    iconType: 'cpu',
    tier: 3,
    prerequisites: ['tech-eng-computing-2'],
    leadsTo: [],
    description: 'Komputer elektronik pertama di dunia (Colossus). Menganalisis ribuan variabel taktis dalam hitungan detik.',
    bonuses: [
      { label: 'Kecepatan Riset Nasional', value: '+8.0% (Total +16%)', positive: true }
    ]
  },
  {
    id: 'tech-eng-radar-1',
    name: 'Stasiun Radar Eksperimental (Radio Detection)',
    originalName: 'Radio Detection',
    branch: 'engineering',
    subCategory: 'Deteksi Radar',
    year: 1936,
    baseDays: 150,
    iconType: 'radio',
    tier: 1,
    prerequisites: [],
    leadsTo: ['tech-eng-radar-2'],
    description: 'Pemancar gelombang elektromagnetik untuk mendeteksi formasi pesawat pengebom dan kapal perang di balik cakrawala.',
    bonuses: [
      { label: 'Deteksi Udara Wilayah', value: '+20.0%', positive: true },
      { label: 'Efisiensi Intersepsi Tempur', value: '+10.0%', positive: true }
    ],
    unlocksEquipment: ['Radar Station Level 1']
  },
  {
    id: 'tech-eng-radar-2',
    name: 'Radar Gelombang Sentimeter (Centimetric Radar 1939)',
    originalName: 'Centimetric Radar',
    branch: 'engineering',
    subCategory: 'Deteksi Radar',
    year: 1939,
    baseDays: 180,
    iconType: 'radio',
    tier: 2,
    prerequisites: ['tech-eng-radar-1'],
    leadsTo: ['tech-eng-radar-3'],
    description: 'Penggunaan tabung Cavity Magnetron untuk menghasilkan gelombang mikro beresolusi tajam. Memungkinkan deteksi periskop kapal selam di malam gulita.',
    bonuses: [
      { label: 'Deteksi Kapal Selam Maritim', value: '+35.0%', positive: true },
      { label: 'Jangkauan Radar Stasiun', value: '+50 km', positive: true }
    ],
    unlocksEquipment: ['Radar Station Level 3']
  },
  {
    id: 'tech-eng-radar-3',
    name: 'Radar Pemandu Udara Terpadu (Air Direction Radar 1941)',
    originalName: 'Advanced Radar',
    branch: 'engineering',
    subCategory: 'Deteksi Radar',
    year: 1941,
    baseDays: 210,
    iconType: 'radio',
    tier: 3,
    prerequisites: ['tech-eng-radar-2'],
    leadsTo: [],
    description: 'Jaringan radar pemandu tempur udara (Chain Home / Himmelbett). Memberikan keunggulan mutlak dalam pertempuran defensif udara.',
    bonuses: [
      { label: 'Deteksi Udara Maksimal', value: '+50.0%', positive: true },
      { label: 'Bantuan Tembakan Flak AA', value: '+20.0%', positive: true }
    ],
    unlocksEquipment: ['Radar Station Level 5']
  },
  {
    id: 'tech-eng-nuclear-1',
    name: 'Riset Fisika Atom (Atomic Research 1940)',
    originalName: 'Atomic Research',
    branch: 'engineering',
    subCategory: 'Proyek Senjata Nuklir',
    year: 1940,
    baseDays: 200,
    iconType: 'flame',
    tier: 1,
    prerequisites: ['tech-eng-computing-2'],
    leadsTo: ['tech-eng-nuclear-2'],
    description: 'Penelitian pembelahan inti atom uranium-235 dan reaksi berantai fisi nuklir oleh fisikawan teoretis.',
    bonuses: [
      { label: 'Membuka Pohon Proyek Nuklir', value: 'Aktif', positive: true }
    ]
  },
  {
    id: 'tech-eng-nuclear-2',
    name: 'Reaktor Nuklir Eksperimental (Nuclear Reactor 1943)',
    originalName: 'Nuclear Reactor',
    branch: 'engineering',
    subCategory: 'Proyek Senjata Nuklir',
    year: 1943,
    baseDays: 240,
    iconType: 'flame',
    tier: 2,
    prerequisites: ['tech-eng-nuclear-1'],
    leadsTo: ['tech-eng-nuclear-3'],
    description: 'Konstruksi reaktor grafit (Chicago Pile-1) untuk memproduksi plutonium senjata fissile.',
    bonuses: [
      { label: 'Pembangunan Reaktor Nuklir', value: 'Terbuka', positive: true },
      { label: 'Produksi Material Fisi Plutonium', value: 'Aktif', positive: true }
    ],
    unlocksEquipment: ['Nuclear Reactor Building']
  },
  {
    id: 'tech-eng-nuclear-3',
    name: 'Proyek Bom Atom (Manhattan Project 1945)',
    originalName: 'Nuclear Bomb',
    branch: 'engineering',
    subCategory: 'Proyek Senjata Nuklir',
    year: 1945,
    baseDays: 270,
    iconType: 'award',
    tier: 3,
    prerequisites: ['tech-eng-nuclear-2'],
    leadsTo: [],
    description: 'Penyelesaian perakitan hulu ledak senjata atom (Fat Man & Little Boy). Mampu menghancurkan divisi musuh, infrastruktur kota, dan meruntuhkan War Support musuh seketika.',
    historicalContext: 'Mengakhiri Perang Dunia II di Front Pasifik pada Agustus 1945.',
    bonuses: [
      { label: 'Dapat Menjatuhkan Bom Atom', value: 'TERSEDIA', positive: true },
      { label: 'Penurunan War Support Musuh', value: '-20% per Bom', positive: true },
      { label: 'Kerusakan Divisi Provinsi', value: 'Pemusnahan Instan', positive: true }
    ],
    unlocksEquipment: ['Nuclear Bomb Arsenal']
  },
  {
    id: 'tech-eng-rocket-1',
    name: 'Propulsi Roket Eksperimental (Experimental Rockets)',
    originalName: 'Experimental Rockets',
    branch: 'engineering',
    subCategory: 'Teknologi Roket',
    year: 1941,
    baseDays: 180,
    iconType: 'rocket',
    tier: 1,
    prerequisites: [],
    leadsTo: ['tech-eng-rocket-2'],
    description: 'Pusat riset roket berbahan bakar cair di Peenemünde / White Sands.',
    bonuses: [
      { label: 'Situs Peluncur Roket', value: 'Terbuka', positive: true }
    ]
  },
  {
    id: 'tech-eng-rocket-2',
    name: 'Rudal Balistik Antar-Benua (V-2 Rocket 1943)',
    originalName: 'Rocket Interceptor & V-2',
    branch: 'engineering',
    subCategory: 'Teknologi Roket',
    year: 1943,
    baseDays: 220,
    iconType: 'rocket',
    tier: 2,
    prerequisites: ['tech-eng-rocket-1'],
    leadsTo: [],
    description: 'Rudal balistik supersonik berpemandu gyroskop (Aggregat 4 / V-2). Tidak dapat diintersep oleh pesawat tempur apa pun di dunia!',
    bonuses: [
      { label: 'Pengeboman Strategis Jarak Jauh', value: 'Kebal Intersepsi Udara', positive: true }
    ],
    unlocksEquipment: ['Rocket Site & V-2 Guided Missile']
  }
];

export const HISTORICAL_TECH_PRESETS = [
  {
    id: 'preset-1936-major',
    name: 'Awal Kampanye 1936 (Standard Major)',
    year: 1936,
    description: 'Teknologi awal tipikal negara kuat (Jerman, Inggris, Soviet) pada tanggal 1 Januari 1936.',
    researchedIds: [
      'tech-inf-1936',
      'tech-artillery-1',
      'tech-engineers-1',
      'tech-armor-interwar',
      'tech-motorized-1',
      'tech-air-small-1',
      'tech-naval-destroyer-1',
      'tech-naval-sub-1',
      'tech-ind-tools-1',
      'tech-ind-construction-1',
      'tech-eng-computing-1'
    ]
  },
  {
    id: 'preset-1939-blitz',
    name: 'Blitzkrieg 1939 (Eropa Meletus)',
    year: 1939,
    description: 'Teknologi saat Perang Dunia II resmi meletus dengan invasi Polandia dan Prancis.',
    researchedIds: [
      'tech-inf-1936',
      'tech-inf-1939',
      'tech-weapons-improv',
      'tech-artillery-1',
      'tech-artillery-2',
      'tech-anti-tank-1',
      'tech-anti-air-1',
      'tech-engineers-1',
      'tech-logistics-1',
      'tech-armor-interwar',
      'tech-armor-light-1',
      'tech-armor-medium-1',
      'tech-motorized-1',
      'tech-air-small-1',
      'tech-air-medium-1',
      'tech-naval-destroyer-1',
      'tech-naval-sub-1',
      'tech-naval-cruiser-1',
      'tech-ind-tools-1',
      'tech-ind-tools-2',
      'tech-ind-concentrated-1',
      'tech-ind-construction-1',
      'tech-ind-construction-2',
      'tech-eng-computing-1',
      'tech-eng-computing-2',
      'tech-eng-radar-1'
    ]
  },
  {
    id: 'preset-1941-barbarossa',
    name: 'Operasi Barbarossa 1941 (Front Timur)',
    year: 1941,
    description: 'Teknologi saat invasi raksasa Front Timur Uni Soviet dimulai.',
    researchedIds: [
      'tech-inf-1936',
      'tech-inf-1939',
      'tech-weapons-improv',
      'tech-weapons-improv-2',
      'tech-artillery-1',
      'tech-artillery-2',
      'tech-anti-tank-1',
      'tech-anti-tank-2',
      'tech-anti-air-1',
      'tech-anti-air-2',
      'tech-engineers-1',
      'tech-engineers-2',
      'tech-logistics-1',
      'tech-logistics-2',
      'tech-armor-interwar',
      'tech-armor-light-1',
      'tech-armor-light-2',
      'tech-armor-medium-1',
      'tech-armor-medium-2',
      'tech-armor-heavy-1',
      'tech-armor-heavy-2',
      'tech-motorized-1',
      'tech-mechanized-1',
      'tech-air-small-1',
      'tech-air-small-2',
      'tech-air-medium-1',
      'tech-air-medium-2',
      'tech-air-heavy-1',
      'tech-naval-destroyer-1',
      'tech-naval-destroyer-2',
      'tech-naval-cruiser-1',
      'tech-naval-cruiser-2',
      'tech-naval-sub-1',
      'tech-naval-sub-2',
      'tech-ind-tools-1',
      'tech-ind-tools-2',
      'tech-ind-tools-3',
      'tech-ind-concentrated-1',
      'tech-ind-concentrated-2',
      'tech-ind-dispersed-1',
      'tech-ind-construction-1',
      'tech-ind-construction-2',
      'tech-ind-construction-3',
      'tech-ind-synthetic-1',
      'tech-ind-synthetic-2',
      'tech-eng-computing-1',
      'tech-eng-computing-2',
      'tech-eng-computing-3',
      'tech-eng-radar-1',
      'tech-eng-radar-2',
      'tech-eng-nuclear-1'
    ]
  }
];
