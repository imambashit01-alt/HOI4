export type DoctrineCategory = 'land' | 'naval' | 'air';

export interface DoctrineNode {
  id: string;
  name: string;
  sub: string;
  tier: number;
  column: number; // 0, 1, 2 for branch positioning
  branchName?: string;
  mutuallyExclusiveWith?: string; // ID of counterpart
  effects: string[];
  description: string;
  iconType: string;
}

export interface DoctrineStatProfile {
  name: string;
  score: number; // 0 to 100
  label: string;
}

export interface DoctrineData {
  id: string;
  category: DoctrineCategory;
  name: string;
  nameIndo: string;
  tagline: string;
  description: string;
  recommendedNations: { name: string; tag: string; flag: string }[];
  primaryColor: string;
  secondaryColor: string;
  accentGlow: string;
  badgeBorder: string;
  emblemType: 'tanks_blitz' | 'crossed_cannons' | 'fortified_bunker' | 'mass_red_star' | 'battleship_anchor' | 'submarine_wolfpack' | 'carrier_strike' | 'strategic_bomber' | 'cas_dive_bomber' | 'tactical_dogfight';
  keyModifiers: { label: string; value: string; positive: boolean }[];
  statProfile: DoctrineStatProfile[];
  branchSummary: {
    leftBranchName: string;
    leftDescription: string;
    rightBranchName: string;
    rightDescription: string;
  };
  treeNodes: DoctrineNode[];
}

export const ALL_DOCTRINES: DoctrineData[] = [
  // ==================== LAND DOCTRINES (4) ====================
  {
    id: 'mobile_warfare',
    category: 'land',
    name: 'Mobile Warfare',
    nameIndo: 'Peperangan Manuver & Lapis Baja (Blitzkrieg)',
    tagline: 'Kecepatan, Penetrasi Tank & Pengepungan Kilat',
    description: 'Doktrin ofensif agresif yang memprioritaskan mobilitas unit mekanis dan divisi lapis baja. Sangat mengandalkan manuver taktis untuk menembus garis musuh dan menciptakan kantung pengepungan (encirclement) sebelum musuh sempat mundur.',
    recommendedNations: [
      { name: 'Jerman', tag: 'GER', flag: '✠' },
      { name: 'Italia', tag: 'ITA', flag: '🇮🇹' },
      { name: 'Uni Soviet Alternatif', tag: 'SOV', flag: '☭' }
    ],
    primaryColor: '#e11d48',
    secondaryColor: '#881337',
    accentGlow: 'rgba(225, 29, 72, 0.4)',
    badgeBorder: '#f43f5e',
    emblemType: 'tanks_blitz',
    keyModifiers: [
      { label: 'Kecepatan Divisi Lapis Baja / Motorized', value: '+20%', positive: true },
      { label: 'Organization Batalion Tank', value: '+15', positive: true },
      { label: 'Breakthrough Batalion Tank', value: '+20%', positive: true },
      { label: 'Max Planning Bonus', value: '+40%', positive: true },
      { label: 'Recruitable Population (Desperate Defense)', value: '+5.0%', positive: true }
    ],
    statProfile: [
      { name: 'Kecepatan', score: 95, label: 'Tinggi (+20%)' },
      { name: 'Breakthrough', score: 92, label: 'Superior' },
      { name: 'Tank Org', score: 90, label: '+15 Org' },
      { name: 'Inf Pertahanan', score: 60, label: 'Moderat' },
      { name: 'Kebutuhan IC/BBM', score: 95, label: 'Sangat Boros' },
      { name: 'Soft Attack', score: 70, label: 'Standar' }
    ],
    branchSummary: {
      leftBranchName: 'Blitzkrieg (Armoured Spearhead)',
      leftDescription: 'Fokus murni ke tank, breakthrough, dan kecepatan penetrasi kendaraan lapis baja.',
      rightBranchName: 'Mobile Infantry (Kampfgruppe)',
      rightDescription: 'Fokus ke infanteri bermotor (Motorized/Mechanized) dan regenerasi organisasi cepat.'
    },
    treeNodes: [
      {
        id: 'mw_1',
        name: 'Mobile Warfare',
        sub: 'Pondasi Doktrin',
        tier: 1,
        column: 1,
        effects: ['Breakthrough +20% untuk Tank & Motorized', 'Max Speed +10%'],
        description: 'Menempatkan doktrin kecepatan dan inisiatif sebagai prioritas komando medan.',
        iconType: 'Zap'
      },
      {
        id: 'mw_2',
        name: 'Delay & Elastic Defence',
        sub: 'Pertahanan Fleksibel',
        tier: 2,
        column: 1,
        effects: ['Organization Tank +5', 'Reinforce Rate +2%'],
        description: 'Taktik pertahanan mundur strategis yang mengulur waktu dan menjebak musuh.',
        iconType: 'Shield'
      },
      // Split 1
      {
        id: 'mw_3a',
        name: 'Armoured Spearhead (Blitzkrieg)',
        sub: 'Cabang Kiri: Ujung Tombak Tank',
        tier: 3,
        column: 0,
        branchName: 'Blitzkrieg',
        mutuallyExclusiveWith: 'mw_3b',
        effects: ['Armor Breakthrough +20%', 'Planning Speed +50%', 'Taktik Blitzkrieg Terbuka'],
        description: 'Mengkonsentrasikan seluruh armada tank di satu titik sempit untuk membelah garis lawan.',
        iconType: 'Flame'
      },
      {
        id: 'mw_3b',
        name: 'Mobile Infantry',
        sub: 'Cabang Kanan: Infanteri Cepat',
        tier: 3,
        column: 2,
        branchName: 'Mobile Infantry',
        mutuallyExclusiveWith: 'mw_3a',
        effects: ['Motorized Org +15', 'Leg Infantry Org +10', 'Recovery Rate +0.2'],
        description: 'Mempersenjatai infanteri dengan truk dan pengangkut lapis baja berkecepatan tinggi.',
        iconType: 'Truck'
      },
      {
        id: 'mw_4a',
        name: 'Schwerpunkt',
        sub: 'Fokus Penetrasi',
        tier: 4,
        column: 0,
        branchName: 'Blitzkrieg',
        effects: ['Tank Org +5', 'Tactics: Breakthrough Unlocked'],
        description: 'Taktik Schwerpunk menitikberatkan daya hancur gravitasi taktis komandan.',
        iconType: 'Target'
      },
      {
        id: 'mw_4b',
        name: 'Kampfgruppe',
        sub: 'Gugus Tempur Gabungan',
        tier: 4,
        column: 2,
        branchName: 'Mobile Infantry',
        effects: ['Mechanized Org +10', 'Motorized Defense +15%'],
        description: 'Gugus tempur ad-hoc independen yang mampu bergerak otonom tanpa menunggu suplai pusat.',
        iconType: 'Users'
      },
      // Split 2
      {
        id: 'mw_5a',
        name: 'Modern Blitzkrieg',
        sub: 'Cabang Kiri: Serangan Lapis Baja Total',
        tier: 5,
        column: 0,
        branchName: 'Modern Blitzkrieg',
        mutuallyExclusiveWith: 'mw_5b',
        effects: ['Tank Org +10', 'Tank Breakthrough +20%', 'Armor Recovery Rate +0.3'],
        description: 'Penguasaan puncak doktrin ofensif gabungan tank modern dan CAS udara.',
        iconType: 'Award'
      },
      {
        id: 'mw_5b',
        name: 'Desperate Defence (Volkssturm)',
        sub: 'Cabang Kanan: Pertahanan Putus Asa',
        tier: 5,
        column: 2,
        branchName: 'Desperate Defence',
        mutuallyExclusiveWith: 'mw_5a',
        effects: ['Recruitable Population +5.0%', 'Core Territory Defense +15%', 'Taktik Guerilla'],
        description: 'Mobilisasi total rakyat sipil dan milisi cadangan saat wilayah tanah air terancam runtuh.',
        iconType: 'Users'
      }
    ]
  },

  {
    id: 'superior_firepower',
    category: 'land',
    name: 'Superior Firepower',
    nameIndo: 'Daya Tembak Unggul (Artillery Supremacy)',
    tagline: 'Bombardir Artileri Berat & Soft Attack Brutal',
    description: 'Doktrin paling populer dan fleksibel di meta HOI4. Berprinsip bahwa peluru dan cangkang meriam artileri jauh lebih murah daripada darah prajurit. Menghancurkan organisasi musuh lewat rentetan tembakan artileri masif.',
    recommendedNations: [
      { name: 'Amerika Serikat', tag: 'USA', flag: '🇺🇸' },
      { name: 'Kekuatan Menengah (Spanyol/Turki)', tag: 'MINOR', flag: '🌍' },
      { name: 'Semua Negara Pemula', tag: 'META', flag: '⭐' }
    ],
    primaryColor: '#f59e0b',
    secondaryColor: '#78350f',
    accentGlow: 'rgba(245, 158, 11, 0.4)',
    badgeBorder: '#fbbf24',
    emblemType: 'crossed_cannons',
    keyModifiers: [
      { label: 'Soft Attack Seluruh Batalion Infanteri', value: '+20%', positive: true },
      { label: 'Soft Attack Support Company (Integrated Support)', value: '+50%', positive: true },
      { label: 'Hard Attack Artileri', value: '+10%', positive: true },
      { label: 'Air Superiority Tempur Darat', value: '+20%', positive: true },
      { label: 'Defense & Breakthrough Infanteri', value: '+15%', positive: true }
    ],
    statProfile: [
      { name: 'Soft Attack', score: 98, label: 'Maksimum (+50%)' },
      { name: 'Fleksibilitas', score: 95, label: 'Sangat Mudah' },
      { name: 'Support Power', score: 92, label: 'Terkuat' },
      { name: 'Defense', score: 80, label: 'Tinggi' },
      { name: 'Breakthrough', score: 75, label: 'Menengah' },
      { name: 'Kecepatan', score: 65, label: 'Standar' }
    ],
    branchSummary: {
      leftBranchName: 'Integrated Support (Meta Pilihan #1)',
      leftDescription: 'Memberi bonus soft attack fantastis (+50%) ke seluruh Support Companies (Artileri, Roket, Engineer).',
      rightBranchName: 'Dispersed Support',
      rightDescription: 'Fokus meningkatkan unit artileri lini tempur (Line Artillery).'
    },
    treeNodes: [
      {
        id: 'sf_1',
        name: 'Superior Firepower',
        sub: 'Pondasi Doktrin',
        tier: 1,
        column: 1,
        effects: ['Infanteri & Motorized Soft Attack +10%', 'Organization +5'],
        description: 'Memprioritaskan senjata berat dan koordinasi tembakan mortir serta meriam.',
        iconType: 'Zap'
      },
      {
        id: 'sf_2',
        name: 'Delay',
        sub: 'Penundaan Taktis',
        tier: 2,
        column: 1,
        effects: ['Entrenchment +2', 'Reinforce Rate +2%'],
        description: 'Melambatkan laju musuh dengan barikade dan tembakan artileri terkoordinasi.',
        iconType: 'Shield'
      },
      // Split 1
      {
        id: 'sf_3a',
        name: 'Integrated Support',
        sub: 'Cabang Kiri: META Support Company',
        tier: 3,
        column: 0,
        branchName: 'Integrated Support',
        mutuallyExclusiveWith: 'sf_3b',
        effects: ['Support Companies Soft Attack +50%', 'Support Org +10', 'Paling Efisien IC'],
        description: 'Mengintegrasikan kompi artileri langsung ke level regu tanpa memakan lebar medan tempur.',
        iconType: 'Target'
      },
      {
        id: 'sf_3b',
        name: 'Dispersed Support',
        sub: 'Cabang Kanan: Line Artillery',
        tier: 3,
        column: 2,
        branchName: 'Dispersed Support',
        mutuallyExclusiveWith: 'sf_3a',
        effects: ['Line Artillery Soft Attack +10%', 'Line Artillery Org +10'],
        description: 'Menebalkan batalion artileri mandiri di barisan tempur reguler.',
        iconType: 'Layers'
      },
      {
        id: 'sf_4',
        name: 'Centralized Fire Control',
        sub: 'Pusat Kendali Tembak',
        tier: 4,
        column: 1,
        effects: ['Hard Attack +10%', 'Planning Bonus +10%'],
        description: 'Pusat radio tembakan baterai meriam menyasar koordinat musuh secara serempak.',
        iconType: 'Radio'
      },
      // Split 2
      {
        id: 'sf_5a',
        name: 'Airland Battle',
        sub: 'Cabang Kiri: Sinergi Udara & Tank',
        tier: 5,
        column: 0,
        branchName: 'Airland Battle',
        mutuallyExclusiveWith: 'sf_5b',
        effects: ['Air Superiority Bonus +20%', 'Hard Attack +15%', 'Tank Org +10'],
        description: 'Integrasi sempurna antara armada pengebom tukik CAS dan tembakan lapis baja.',
        iconType: 'Plane'
      },
      {
        id: 'sf_5b',
        name: 'Shock & Awe',
        sub: 'Cabang Kanan: Kejutan Tembakan Infanteri',
        tier: 5,
        column: 2,
        branchName: 'Shock & Awe',
        mutuallyExclusiveWith: 'sf_5a',
        effects: ['Inf Soft Attack +15%', 'Inf Organization +10', 'Recovery Rate +0.2'],
        description: 'Hujan mortir bertubi-tubi yang meremukkan moral infanteri musuh dalam sekejap.',
        iconType: 'Flame'
      }
    ]
  },

  {
    id: 'grand_battleplan',
    category: 'land',
    name: 'Grand Battleplan',
    nameIndo: 'Rencana Pertempuran Akbar (Defensive Bulwark)',
    tagline: 'Benteng Entrenchment & Bonus Perencanaan Raksasa',
    description: 'Doktrin pertahanan metodis klasik era Perang Dunia I yang disempurnakan. Memberikan poin entrenchment tertinggi untuk menahan gempuran musuh di garis benteng atau sungai, disusul serangan balasan terencana berdaya hancur tinggi berkat planning bonus hingga +60%.',
    recommendedNations: [
      { name: 'Inggris Raya', tag: 'ENG', flag: '🇬🇧' },
      { name: 'Prancis', tag: 'FRA', flag: '🇫🇷' },
      { name: 'Jepang', tag: 'JAP', flag: '🇯🇵' }
    ],
    primaryColor: '#0284c7',
    secondaryColor: '#075985',
    accentGlow: 'rgba(2, 132, 199, 0.4)',
    badgeBorder: '#38bdf8',
    emblemType: 'fortified_bunker',
    keyModifiers: [
      { label: 'Max Planning Bonus', value: '+60%', positive: true },
      { label: 'Maksimum Entrenchment', value: '+10 Poin', positive: true },
      { label: 'Pertahanan (Defense) di Parit Benteng', value: '+30%', positive: true },
      { label: 'Serangan Malam (Night Attack Infiltration)', value: '+25%', positive: true },
      { label: 'Pengurangan Penalti Kehabisan Suplai', value: '-20%', positive: true }
    ],
    statProfile: [
      { name: 'Entrenchment', score: 100, label: 'Puncak (+10 Poin)' },
      { name: 'Planning Bonus', score: 95, label: '+60% Maksimum' },
      { name: 'Defense', score: 95, label: 'Benteng Baja' },
      { name: 'Infiltrasi Malam', score: 85, label: 'Tinggi' },
      { name: 'Fleksibilitas', score: 55, label: 'Kaku' },
      { name: 'Kecepatan Serang', score: 60, label: 'Butuh Prep' }
    ],
    branchSummary: {
      leftBranchName: 'Assault (Serangan Frontal Terencana)',
      leftDescription: 'Memaksimalkan planning bonus, breakthrough, dan serbuan tank gabungan.',
      rightBranchName: 'Infiltration (Taktik Infiltrasi Gerilya)',
      rightDescription: 'Memberikan buff serangan malam (+25%), pengintaian recon, dan resistensi suplai (sangat kuat untuk Jepang di Asia).'
    },
    treeNodes: [
      {
        id: 'gb_1',
        name: 'Grand Battle Plan',
        sub: 'Pondasi Doktrin',
        tier: 1,
        column: 1,
        effects: ['Max Planning Bonus +10%', 'Entrenchment +5'],
        description: 'Perencanaan operasional kaku dan penyiapan logistik sebelum peluru pertama ditembakkan.',
        iconType: 'BookOpen'
      },
      {
        id: 'gb_2',
        name: 'Trench Warfare',
        sub: 'Perang Parit',
        tier: 2,
        column: 1,
        effects: ['Entrenchment +10 Poin', 'Inf Defense +10%'],
        description: 'Pembangunan jaringan parit beton dan benteng pertahanan tanah yang kokoh.',
        iconType: 'Shield'
      },
      // Split
      {
        id: 'gb_3a',
        name: 'Grand Assault',
        sub: 'Cabang Kiri: Ofensif Masif Terkoordinasi',
        tier: 3,
        column: 0,
        branchName: 'Assault',
        mutuallyExclusiveWith: 'gb_3b',
        effects: ['Max Planning +30%', 'Armor Breakthrough +15%', 'Planning Speed +20%'],
        description: 'Serangan ofensif komprehensif yang telah dipetakan hingga tingkat koordinat terkecil.',
        iconType: 'Flame'
      },
      {
        id: 'gb_3b',
        name: 'Infiltration',
        sub: 'Cabang Kanan: Penyusupan Senyap',
        tier: 3,
        column: 2,
        branchName: 'Infiltration',
        mutuallyExclusiveWith: 'gb_3a',
        effects: ['Night Attack +25%', 'Out of Supply Penalty -20%', 'Reconnaissance +1'],
        description: 'Menyusup melalui celah formasi musuh di kegelapan malam tanpa suara.',
        iconType: 'Eye'
      },
      {
        id: 'gb_4a',
        name: 'Centralized Execution',
        sub: 'Eksekusi Terpusat',
        tier: 4,
        column: 0,
        branchName: 'Assault',
        effects: ['Command Power Cost -25%', 'Inf Organization +10'],
        description: 'Komando terpusat dari jenderal markas besar memastikan eksekusi serentak.',
        iconType: 'Award'
      },
      {
        id: 'gb_4b',
        name: 'Infiltration Assault',
        sub: 'Serbuan Titik Lemah',
        tier: 4,
        column: 2,
        branchName: 'Infiltration',
        effects: ['Inf Recovery Rate +0.2', 'Land Night Combat +15%'],
        description: 'Serangan mendadak di garis logistik belakang musuh melumpuhkan moral pertahanan.',
        iconType: 'Zap'
      }
    ]
  },

  {
    id: 'mass_assault',
    category: 'land',
    name: 'Mass Assault',
    nameIndo: 'Serbuan Massal & Perang Mendalam (Deep Battle)',
    tagline: 'Lautan Prajurit, Pemulihan Kilat & Atrisi Brutal',
    description: 'Doktrin perang atrisi yang memanfaatkan kedalaman geografis luas dan sumber daya manusia melimpah. Memungkinkan penempatan lebih banyak batalion infanteri dalam satu medan tempur karena pengurangan combat width khusus.',
    recommendedNations: [
      { name: 'Uni Soviet', tag: 'SOV', flag: '☭' },
      { name: 'Tiongkok Nasionalis / Komunis', tag: 'CHI', flag: '🇨🇳' },
      { name: 'Negara Manpower Tinggi', tag: 'HUMAN', flag: '👥' }
    ],
    primaryColor: '#dc2626',
    secondaryColor: '#991b1b',
    accentGlow: 'rgba(220, 38, 38, 0.4)',
    badgeBorder: '#ef4444',
    emblemType: 'mass_red_star',
    keyModifiers: [
      { label: 'Pengurangan Combat Width Infanteri', value: '-0.4w per Batalion', positive: true },
      { label: 'Reinforce Rate Garis Depan', value: '+5.0%', positive: true },
      { label: 'Recruitable Population (Mass Mobilization)', value: '+5.0%', positive: true },
      { label: 'Penalti Suplai Wilayah Sendiri (Bumi Hangus)', value: '-20%', positive: true },
      { label: 'Tingkat Pemulihan Organisasi (Recovery)', value: '+0.3/jam', positive: true }
    ],
    statProfile: [
      { name: 'Manpower / Draf', score: 100, label: 'Tertinggi (+5%)' },
      { name: 'Combat Width', score: 98, label: 'Spesial (-0.4w)' },
      { name: 'Reinforce Rate', score: 95, label: '+5% Cepat' },
      { name: 'Efisiensi Suplai', score: 90, label: 'Bumi Hangus' },
      { name: 'Breakthrough Awal', score: 60, label: 'Rendah' },
      { name: 'Hard Attack', score: 65, label: 'Moderat' }
    ],
    branchSummary: {
      leftBranchName: 'Deep Battle (Doktrin Soviet Resmi)',
      leftDescription: 'Memadukan tank medium/berat, artileri, dan pengurangan suplai untuk manuver strategis berskala besar.',
      rightBranchName: 'Mass Mobilization (Tiongkok / Gerilya Rakyat)',
      rightDescription: 'Memangkas lebar combat width infanteri menjadi 1.6w dan menambah +5% populasi wajib militer.'
    },
    treeNodes: [
      {
        id: 'ma_1',
        name: 'Mass Assault',
        sub: 'Pondasi Doktrin',
        tier: 1,
        column: 1,
        effects: ['Reinforce Rate +2%', 'Minim Penalti Atrisi Cuaca'],
        description: 'Menerima kenyataan perang skala total yang menuntut pengorbanan massal.',
        iconType: 'Users'
      },
      {
        id: 'ma_2',
        name: 'Pocket Defence',
        sub: 'Pertahanan Kantung',
        tier: 2,
        column: 1,
        effects: ['Entrenchment +3', 'Out of Supply Defense +10%'],
        description: 'Unit yang terisolasi tetap bertahan di kantung-kantung pertahanan lokal.',
        iconType: 'Shield'
      },
      // Split
      {
        id: 'ma_3a',
        name: 'Deep Battle',
        sub: 'Cabang Kiri: Operasi Kedalaman Strategis (Soviet)',
        tier: 3,
        column: 0,
        branchName: 'Deep Battle',
        mutuallyExclusiveWith: 'ma_3b',
        effects: ['Supply Consumption -20%', 'Armor Org +5', 'Operational Planning +15%'],
        description: 'Serangan bergelombang yang menerobos lini depan dan menghantam cadangan musuh di kedalaman 100 km.',
        iconType: 'Target'
      },
      {
        id: 'ma_3b',
        name: 'Mass Mobilization',
        sub: 'Cabang Kanan: Mobilisasi Rakyat Semesta (Tiongkok)',
        tier: 3,
        column: 2,
        branchName: 'Mass Mobilization',
        mutuallyExclusiveWith: 'ma_3a',
        effects: ['Inf Combat Width -0.4w', 'Recruitable Pop +5.0%', 'Taktik Guerilla'],
        description: 'Menyeru seluruh rakyat mengangkat senjata demi mempertahankan kedaulatan tanah air.',
        iconType: 'Users'
      },
      {
        id: 'ma_4a',
        name: 'Vast Offensives',
        sub: 'Ofensif Raksasa',
        tier: 4,
        column: 0,
        branchName: 'Deep Battle',
        effects: ['Tank Breakthrough +15%', 'Infantry Org +10'],
        description: 'Penggelaran serentak puluhan korps tentara di sepanjang front ribuan kilometer.',
        iconType: 'Flame'
      },
      {
        id: 'ma_4b',
        name: 'Human Wave Offensive',
        sub: 'Gelombang Manusia Tak Terbendung',
        tier: 4,
        column: 2,
        branchName: 'Mass Mobilization',
        effects: ['Reinforce Rate +3%', 'Recovery Rate +0.3', 'Inf Defense +10%'],
        description: 'Menerjang posisi musuh dengan gelombang infanteri tiada henti hingga amunisi lawan terkuras.',
        iconType: 'Award'
      }
    ]
  },

  // ==================== NAVAL DOCTRINES (3) ====================
  {
    id: 'fleet_in_being',
    category: 'naval',
    name: 'Fleet in Being',
    nameIndo: 'Armada Siap Tempur (Battleship & Capital Dominance)',
    tagline: 'Kekuasaan Mutlak Kapal Tempur Raksasa & Pengawalan Konvoi',
    description: 'Doktrin angkatan laut konvensional yang berpusat pada kapal tempur berat (Battleship, Battlecruiser) yang dikawal oleh perusak (Destroyer) dan penjelajah (Cruiser). Mengamankan jalur laut utama dan menghancurkan armada musuh dalam pertempuran laut terbuka.',
    recommendedNations: [
      { name: 'Inggris Raya', tag: 'ENG', flag: '🇬🇧' },
      { name: 'Italia', tag: 'ITA', flag: '🇮🇹' },
      { name: 'Prancis', tag: 'FRA', flag: '🇫🇷' }
    ],
    primaryColor: '#0284c7',
    secondaryColor: '#0c4a6e',
    accentGlow: 'rgba(2, 132, 199, 0.4)',
    badgeBorder: '#0ea5e9',
    emblemType: 'battleship_anchor',
    keyModifiers: [
      { label: 'Armor & Health Battleship/Battlecruiser', value: '+15%', positive: true },
      { label: 'Heavy Gun Attack Capital Ships', value: '+10%', positive: true },
      { label: 'Submarine Detection Perusak (ASW)', value: '+20%', positive: true },
      { label: 'Efisiensi Pengawalan Konvoi (Convoy Escort)', value: '+30%', positive: true },
      { label: 'Naval Superiority Presence', value: '+15%', positive: true }
    ],
    statProfile: [
      { name: 'Battleship Power', score: 98, label: 'Maksimum (+15%)' },
      { name: 'Convoy Escort', score: 95, label: 'Sangat Aman' },
      { name: 'Anti-Submarine', score: 90, label: 'Deteksi +20%' },
      { name: 'Naval Superiority', score: 92, label: 'Kuat di Laut' },
      { name: 'Carrier Strike', score: 65, label: 'Sekunder' },
      { name: 'Submarine Raid', score: 50, label: 'Bukan Fokus' }
    ],
    branchSummary: {
      leftBranchName: 'Capital Ship Fleet Operations',
      leftDescription: 'Meningkatkan daya tembak meriam kaliber berat kapal perang utama.',
      rightBranchName: 'Escort & Trade Lane Defense',
      rightDescription: 'Memperkuat sonar deteksi kapal selam dan perlindungan armada logistik konvoi.'
    },
    treeNodes: [
      {
        id: 'fib_1',
        name: 'Fleet in Being',
        sub: 'Pondasi Doktrin Laut',
        tier: 1,
        column: 1,
        effects: ['Battleship Org +10', 'Capital Ship Armor +10%'],
        description: 'Keberadaan armada kapal tempur di pelabuhan sudah cukup menekan manuver musuh.',
        iconType: 'Anchor'
      },
      {
        id: 'fib_2',
        name: 'Battlefleet Concentration',
        sub: 'Konsentrasi Armada',
        tier: 2,
        column: 1,
        effects: ['Heavy Gun Attack +10%', 'Screening Efficiency +10%'],
        description: 'Menyusun formasi barisan pertempuran rapat untuk memusatkan daya tembak salvo meriam.',
        iconType: 'Shield'
      },
      {
        id: 'fib_3a',
        name: 'Capital Ship Dominance',
        sub: 'Cabang Kiri: Meriam Raksasa',
        tier: 3,
        column: 0,
        branchName: 'Capital Ships',
        effects: ['Battleship Penetration +15%', 'Critical Hit Chance +10%'],
        description: 'Salvo peluru kaliber 380mm-460mm menembus lambung baja kapal musuh.',
        iconType: 'Crosshair'
      },
      {
        id: 'fib_3b',
        name: 'Anti-Submarine Defense (ASW)',
        sub: 'Cabang Kanan: Pemburu Kapal Selam',
        tier: 3,
        column: 2,
        branchName: 'Convoy Escort',
        effects: ['Submarine Detection +25%', 'Depth Charge Damage +20%'],
        description: 'Penggunaan radar sonar Asdic dan bom laut (depth charge) untuk membasmi U-boat.',
        iconType: 'Target'
      }
    ]
  },

  {
    id: 'trade_interdiction',
    category: 'naval',
    name: 'Trade Interdiction',
    nameIndo: 'Penghancuran Jalur Dagang (Submarine Wolfpack)',
    tagline: 'Perang Kapal Selam Senyap & Pembantaian Konvoi',
    description: 'Doktrin asimetris laut yang berfokus mencekik ekonomi negara maritim melalui serangan kapal selam (Wolfpack) dan kapal penjelajah siluman. Menenggelamkan ribuan kapal konvoi suplai musuh tanpa perlu bertarung melawan kapal tempur utama.',
    recommendedNations: [
      { name: 'Jerman', tag: 'GER', flag: '✠' },
      { name: 'Uni Soviet', tag: 'SOV', flag: '☭' },
      { name: 'Negara dengan Dockyard Terbatas', tag: 'RAID', flag: '🌊' }
    ],
    primaryColor: '#0d9488',
    secondaryColor: '#115e59',
    accentGlow: 'rgba(13, 148, 136, 0.4)',
    badgeBorder: '#14b8a6',
    emblemType: 'submarine_wolfpack',
    keyModifiers: [
      { label: 'Submarine Torpedo Attack', value: '+20%', positive: true },
      { label: 'Visibilitas Kapal Selam (Stealth Siluman)', value: '-20%', positive: true },
      { label: 'Efisiensi Penenggelaman Konvoi (Raiding)', value: '+40%', positive: true },
      { label: 'Kecepatan Mundur dari Pertarungan Laut', value: '+25%', positive: true },
      { label: 'Surface Raider Concealment', value: '+15%', positive: true }
    ],
    statProfile: [
      { name: 'Submarine Wolfpack', score: 100, label: 'Puncak Senyap' },
      { name: 'Convoy Raiding', score: 98, label: 'Mencekik Musuh' },
      { name: 'Stealth / Siluman', score: 95, label: '-20% Terdeteksi' },
      { name: 'Efisiensi Biaya IC', score: 95, label: 'Murah Meriah' },
      { name: 'Surface Combat', score: 50, label: 'Rendah' },
      { name: 'Carrier Support', score: 40, label: 'Minimal' }
    ],
    branchSummary: {
      leftBranchName: 'Wolfpacks (Kapal Selam Berkelompok)',
      leftDescription: 'Maksimalisasi serangan torpedo salvo kelompok U-boat di samudra terbuka.',
      rightBranchName: 'Surface Raiders (Penjelajah Korsir)',
      rightDescription: 'Kapal penjelajah berkecepatan tinggi menyerang dan melarikan diri sebelum bala bantuan tiba.'
    },
    treeNodes: [
      {
        id: 'ti_1',
        name: 'Trade Interdiction',
        sub: 'Pondasi Doktrin Pembajakan Dagang',
        tier: 1,
        column: 1,
        effects: ['Submarine Detection -10%', 'Raiding Efficiency +20%'],
        description: 'Mengincar urat nadi perdagangan maritim musuh daripada armadanya.',
        iconType: 'Eye'
      },
      {
        id: 'ti_2',
        name: 'Unrestricted Submarine Warfare',
        sub: 'Perang Selam Tanpa Batas',
        tier: 2,
        column: 1,
        effects: ['Torpedo Hit Chance +15%', 'Convoy Sinking Org +10'],
        description: 'Tenggelamkan setiap kapal dagang musuh yang melintasi zona perang Atlantik.',
        iconType: 'Target'
      },
      {
        id: 'ti_3a',
        name: 'Wolfpacks',
        sub: 'Cabang Kiri: Taktik Kawanan Serigala',
        tier: 3,
        column: 0,
        branchName: 'Wolfpacks',
        effects: ['Submarine Org +15', 'Submarine Coordination +20%'],
        description: 'Mengkoordinasikan serangan torpedo simultan dari berbagai arah mata angin di malam hari.',
        iconType: 'Flame'
      },
      {
        id: 'ti_3b',
        name: 'Surface Raiders',
        sub: 'Cabang Kanan: Penjelajah Korsir Cepat',
        tier: 3,
        column: 2,
        branchName: 'Surface Raiders',
        effects: ['Cruiser Speed +10%', 'Surface Detection +15%'],
        description: 'Kapal penjelajah seperti Admiral Graf Spee mengintai rute dagang samudra selatan.',
        iconType: 'Zap'
      }
    ]
  },

  {
    id: 'base_strike',
    category: 'naval',
    name: 'Base Strike',
    nameIndo: 'Serangan Pangkalan (Carrier Task Force)',
    tagline: 'Dominasi Udara Laut & Sayap Tempur Kapal Induk',
    description: 'Doktrin modern masa depan peperangan laut yang menjadikan Kapal Induk (Aircraft Carrier) sebagai pusat kekuatan utama. Pesawat tempur laut, pengebom torpedo, dan pengebom tukik menyerang armada musuh dari jarak ratusan mil sebelum meriam kapal perang sempat membidik.',
    recommendedNations: [
      { name: 'Amerika Serikat', tag: 'USA', flag: '🇺🇸' },
      { name: 'Kekaisaran Jepang', tag: 'JAP', flag: '🇯🇵' },
      { name: 'Inggris Raya', tag: 'ENG', flag: '🇬🇧' }
    ],
    primaryColor: '#8b5cf6',
    secondaryColor: '#5b21b6',
    accentGlow: 'rgba(139, 92, 246, 0.4)',
    badgeBorder: '#a78bfa',
    emblemType: 'carrier_strike',
    keyModifiers: [
      { label: 'Efisiensi Sortie Pesawat Kapal Induk', value: '+30%', positive: true },
      { label: 'Naval Strike Attack Pesawat Carrier', value: '+20%', positive: true },
      { label: 'Port Strike (Serangan Pangkalan Pearl Harbor)', value: '+25%', positive: true },
      { label: 'Organisasi Armada Gugus Tempur Carrier', value: '+15', positive: true },
      { label: 'Screening Carrier Protection', value: '+20%', positive: true }
    ],
    statProfile: [
      { name: 'Carrier Power', score: 100, label: 'Penguasa Samudra' },
      { name: 'Naval Strike Udara', score: 98, label: 'Lethal +20%' },
      { name: 'Port Strike', score: 92, label: 'Serangan Pelabuhan' },
      { name: 'Jarak Jangkau', score: 95, label: 'Ratusan Mil' },
      { name: 'Biaya Dok & Pabrik', score: 90, label: 'Sangat Mahal' },
      { name: 'Gun Battleship', score: 60, label: 'Hanya Pengawal' }
    ],
    branchSummary: {
      leftBranchName: 'Carrier Task Force (Gugus Tempur Kapal Induk)',
      leftDescription: 'Maksimalisasi jumlah sortie pesawat tempur dan serangan torpedo laut presisi.',
      rightBranchName: 'Screening & Multi-Carrier Coordination',
      rightDescription: 'Melindungi kapal induk dari serbuan torpedo kapal selam dan perusak musuh.'
    },
    treeNodes: [
      {
        id: 'bs_1',
        name: 'Base Strike',
        sub: 'Pondasi Doktrin Kapal Induk',
        tier: 1,
        column: 1,
        effects: ['Carrier Org +10', 'Carrier Sortie Efficiency +15%'],
        description: 'Mengakui bahwa sayap udara laut adalah masa depan kejayaan supremasi samudra.',
        iconType: 'Plane'
      },
      {
        id: 'bs_2',
        name: 'Carrier Task Force',
        sub: 'Gugus Tempur Terpadu',
        tier: 2,
        column: 1,
        effects: ['Naval Targeting +15%', 'Carrier Air Wing Capacity +10%'],
        description: 'Mengelompokkan kapal induk dengan formasi perusak cincin pertahanan anti-udara.',
        iconType: 'Shield'
      },
      {
        id: 'bs_3a',
        name: 'Massed Strike Tactics',
        sub: 'Cabang Kiri: Gelombang Serangan Sayap Udara',
        tier: 3,
        column: 0,
        branchName: 'Mass Strikes',
        effects: ['Naval Strike Damage +20%', 'Port Strike +25%'],
        description: 'Ratusan pesawat lepas landas serentak menghujani kapal perang musuh dengan torpedo.',
        iconType: 'Flame'
      },
      {
        id: 'bs_3b',
        name: 'Combat Air Patrol (CAP)',
        sub: 'Cabang Kanan: Payung Udara Pertahanan',
        tier: 3,
        column: 2,
        branchName: 'Air Patrol',
        effects: ['Air Superiority Laut +20%', 'Kamikaze / Anti-Air Intercept +15%'],
        description: 'Pesawat tempur berpatroli tanpa henti di atas kapal induk untuk mencegat pengebom musuh.',
        iconType: 'Award'
      }
    ]
  },

  // ==================== AIR DOCTRINES (3) ====================
  {
    id: 'strategic_destruction',
    category: 'air',
    name: 'Strategic Destruction',
    nameIndo: 'Penghancuran Strategis (Heavy Strategic Bombing)',
    tagline: 'Meratakan Pabrik, Infrastruktur & Kilang Musuh dari Angkasa',
    description: 'Doktrin perang udara total yang bertujuan menghancurkan kapasitas industri dan fasilitas perang musuh jauh di garis belakang. Mengandalkan armada pesawat pengebom strategis berat (Strategic Bombers) berjarak jangkau jauh yang dikawal oleh pesawat tempur berat.',
    recommendedNations: [
      { name: 'Amerika Serikat', tag: 'USA', flag: '🇺🇸' },
      { name: 'Inggris Raya', tag: 'ENG', flag: '🇬🇧' },
      { name: 'Negara Industri Raksasa', tag: 'IND', flag: '🏭' }
    ],
    primaryColor: '#ea580c',
    secondaryColor: '#9a3412',
    accentGlow: 'rgba(234, 88, 12, 0.4)',
    badgeBorder: '#f97316',
    emblemType: 'strategic_bomber',
    keyModifiers: [
      { label: 'Strategic Bombing Damage (Pabrik & Rel)', value: '+40%', positive: true },
      { label: 'Escort Fighter Efficiency (Pengawalan)', value: '+25%', positive: true },
      { label: 'Day / Night Bombing Accuracy', value: '+20%', positive: true },
      { label: 'Penghancuran Infrastruktur Logistik', value: '+30%', positive: true },
      { label: 'Disrupsi Produksi Pabrik Musuh', value: 'Maksimum', positive: true }
    ],
    statProfile: [
      { name: 'Strat Bombing', score: 100, label: 'Luluh Lantak (+40%)' },
      { name: 'Pencekik Industri', score: 98, label: 'Hancurkan Pabrik' },
      { name: 'Fighter Escort', score: 90, label: 'Pengawal Handal' },
      { name: 'Jarak Jangkau', score: 95, label: 'Ribuan Kilometer' },
      { name: 'CAS Dukungan Darat', score: 55, label: 'Minim' },
      { name: 'Biaya Produksi', score: 92, label: 'Sangat Boros IC' }
    ],
    branchSummary: {
      leftBranchName: 'Day Bombing & Fighter Sweeps',
      leftDescription: 'Pengeboman presisi siang hari dikawal oleh pesawat tempur superioritas udara.',
      rightBranchName: 'Night Bombing & Radar Disruption',
      rightDescription: 'Pengeboman area karpet malam hari menghindari baterai meriam anti-udara darat.'
    },
    treeNodes: [
      {
        id: 'sd_1',
        name: 'Strategic Destruction',
        sub: 'Pondasi Doktrin Udara Strategis',
        tier: 1,
        column: 1,
        effects: ['Strategic Bombing +20%', 'Air Superiority +10%'],
        description: 'Menyerang akar ekonomi perang musuh sebelum pasukan mereka sempat sampai di front.',
        iconType: 'Flame'
      },
      {
        id: 'sd_2',
        name: 'Fighter Sweep',
        sub: 'Sapu Bersih Udara',
        tier: 2,
        column: 1,
        effects: ['Fighter Mission Efficiency +15%', 'Air Detection +10%'],
        description: 'Membersihkan langit dari pesawat pencegat musuh untuk membuka koridor pengeboman aman.',
        iconType: 'Zap'
      },
      {
        id: 'sd_3a',
        name: 'Daylight Precision Bombing',
        sub: 'Cabang Kiri: Pengeboman Presisi Siang',
        tier: 3,
        column: 0,
        branchName: 'Day Bombing',
        effects: ['Factory Damage +25%', 'Infrastructure Damage +25%'],
        description: 'Mengincar generator listrik, rel kereta api, dan bengkel perakitan tank secara presisi.',
        iconType: 'Target'
      },
      {
        id: 'sd_3b',
        name: 'Night Bombing Carpet',
        sub: 'Cabang Kanan: Pengeboman Area Malam Hari',
        tier: 3,
        column: 2,
        branchName: 'Night Bombing',
        effects: ['Night Bombing Penalty -50%', 'Bomber Defense +20%'],
        description: 'Hujan bom di malam hari melenyapkan pusat logistik kota musuh dalam kegelapan.',
        iconType: 'Shield'
      }
    ]
  },

  {
    id: 'battlefield_support',
    category: 'air',
    name: 'Battlefield Support',
    nameIndo: 'Dukungan Medan Tempur (Close Air Support - CAS)',
    tagline: 'Pengebom Tukik, Payung Udara Frontline & Hancurkan Organisasi Darat',
    description: 'Doktrin udara paling mematikan dan populer untuk pertempuran darat di HOI4. Menyelaraskan armada pesawat tempur ringan dan pengebom tukik (CAS) langsung dengan manuver divisi tentara darat. Menghancurkan organisasi dan perlengkapan musuh secara langsung di medan tempur aktif.',
    recommendedNations: [
      { name: 'Jerman (Stuka)', tag: 'GER', flag: '✠' },
      { name: 'Uni Soviet (Il-2)', tag: 'SOV', flag: '☭' },
      { name: 'Semua Pertempuran Darat Aktif', tag: 'META', flag: '⭐' }
    ],
    primaryColor: '#10b981',
    secondaryColor: '#064e3b',
    accentGlow: 'rgba(16, 185, 129, 0.4)',
    badgeBorder: '#34d399',
    emblemType: 'cas_dive_bomber',
    keyModifiers: [
      { label: 'Ground Support Damage (Kerusakan CAS)', value: '+20%', positive: true },
      { label: 'Ground Support Organization Damage', value: '+20%', positive: true },
      { label: 'Air Superiority Combat Factor Darat', value: '+20%', positive: true },
      { label: 'Efisiensi Misi CAS di Frontline', value: '+25%', positive: true },
      { label: 'Penghancuran Batalion Musuh Tanpa Korban Infanteri', value: 'Sangat Tinggi', positive: true }
    ],
    statProfile: [
      { name: 'CAS Ground Attack', score: 100, label: 'Lethal (+20%)' },
      { name: 'Sinergi Tentara Darat', score: 98, label: 'Paling Sinergis' },
      { name: 'Air Superiority Front', score: 92, label: 'Payung Udara' },
      { name: 'Biaya IC Efisien', score: 90, label: 'Sangat Efisien' },
      { name: 'Strat Bombing', score: 40, label: 'Tidak Fokus' },
      { name: 'Naval Port Strike', score: 60, label: 'Moderat' }
    ],
    branchSummary: {
      leftBranchName: 'Formation Flying & Direct Support',
      leftDescription: 'Memaksimalkan koordinasi radio antara pilot CAS dan komandan tank di darat.',
      rightBranchName: 'Dive Bombing & Air Defense Suppression',
      rightDescription: 'Pengeboman menukik menghantam baterai artileri dan posisi senapan mesin musuh.'
    },
    treeNodes: [
      {
        id: 'bs_air_1',
        name: 'Battlefield Support',
        sub: 'Pondasi Doktrin CAS',
        tier: 1,
        column: 1,
        effects: ['CAS Ground Support +15%', 'Air Superiority +10%'],
        description: 'Pesawat tempur adalah artileri terbang jarak jauh pelindung infanteri.',
        iconType: 'Plane'
      },
      {
        id: 'bs_air_2',
        name: 'Formation Flying',
        sub: 'Terbang Formasi Terkoordinasi',
        tier: 2,
        column: 1,
        effects: ['Ground Support Org Damage +15%', 'Fighter Interception +10%'],
        description: 'Skuadron terbang melingkar di atas zona perang siap menukik saat diminta perwira darat.',
        iconType: 'Shield'
      },
      {
        id: 'bs_air_3a',
        name: 'Dive Bombing (Stuka)',
        sub: 'Cabang Kiri: Pengeboman Menukik Akurat',
        tier: 3,
        column: 0,
        branchName: 'Dive Bombing',
        effects: ['CAS Ground Attack Damage +20%', 'Direct Vehicle Hit +15%'],
        description: 'Menukik dengan sudut tajam untuk menjatuhkan bom 250kg tepat di atas atap tank musuh.',
        iconType: 'Target'
      },
      {
        id: 'bs_air_3b',
        name: 'Direct Ground Support',
        sub: 'Cabang Kanan: Tembakan Berondongan Senapan Mesin',
        tier: 3,
        column: 2,
        branchName: 'Direct Support',
        effects: ['Air Superiority Combat Effect +15%', 'Enemy Ground Movement -15%'],
        description: 'Membombardir barisan mundur musuh dengan meriam 20mm hingga formasi lawan tercerai berai.',
        iconType: 'Flame'
      }
    ]
  },

  {
    id: 'operational_integrity',
    category: 'air',
    name: 'Operational Integrity',
    nameIndo: 'Integritas Operasional (Tactical Bombers & Dogfight Agility)',
    tagline: 'Pesawat Tempur Taktis Serbaguna & Keunggulan Duel Dogfight',
    description: 'Doktrin pertahanan dan fleksibilitas udara yang memaksimalkan peran pesawat pengebom taktis (Tactical Bombers) dan pesawat tempur pencegat (Interceptors). Memberikan bonus kelincahan tempur (agility) dan efisiensi pengawalan tinggi untuk menangkis invasi udara musuh.',
    recommendedNations: [
      { name: 'Kekaisaran Jepang', tag: 'JAP', flag: '🇯🇵' },
      { name: 'Inggris Raya (Battle of Britain)', tag: 'ENG', flag: '🇬🇧' },
      { name: 'Prancis / Italia', tag: 'FRA', flag: '🇫🇷' }
    ],
    primaryColor: '#06b6d4',
    secondaryColor: '#0e7490',
    accentGlow: 'rgba(6, 182, 212, 0.4)',
    badgeBorder: '#22d3ee',
    emblemType: 'tactical_dogfight',
    keyModifiers: [
      { label: 'Fighter Agility & Dogfight Bonus', value: '+20%', positive: true },
      { label: 'Tactical Bomber Fleksibilitas Misi', value: '+25%', positive: true },
      { label: 'Interception Mission Efficiency', value: '+30%', positive: true },
      { label: 'Air Detection & Radar Tracking', value: '+20%', positive: true },
      { label: 'Escort Efficiency Pesawat Pengawal', value: '+20%', positive: true }
    ],
    statProfile: [
      { name: 'Dogfight Agility', score: 98, label: 'Lincah (+20%)' },
      { name: 'Interception Pertahanan', score: 95, label: 'Cegat Efisien' },
      { name: 'Tactical Bomber', score: 92, label: 'Serbaguna' },
      { name: 'Fleksibilitas Misi', score: 90, label: 'Adaptif' },
      { name: 'CAS Darat Khusus', score: 70, label: 'Menengah' },
      { name: 'Strat Bombing', score: 65, label: 'Menengah' }
    ],
    branchSummary: {
      leftBranchName: 'Tactical Bombing Coordination',
      leftDescription: 'Menggunakan pesawat bermesin ganda untuk fleksibilitas pemboman darat, laut, dan instalasi radar.',
      rightBranchName: 'Fighter Interception & Dogfighting',
      rightDescription: 'Mempertahankan ruang udara tanah air dari serbuan skuadron pengebom musuh (Taktik Battle of Britain).'
    },
    treeNodes: [
      {
        id: 'oi_1',
        name: 'Operational Integrity',
        sub: 'Pondasi Integritas Udara',
        tier: 1,
        column: 1,
        effects: ['Air Superiority +10%', 'Tactical Bomber Org +10'],
        description: 'Keseimbangan taktis antara duel udara dan misi pengeboman jarak menengah serbaguna.',
        iconType: 'Shield'
      },
      {
        id: 'oi_2',
        name: 'Force Substitution',
        sub: 'Substitusi Kekuatan',
        tier: 2,
        column: 1,
        effects: ['Fighter Agility +10%', 'Interception Efficiency +15%'],
        description: 'Mendayagunakan pesawat taktis untuk mengisi berbagai spektrum misi sesuai dinamika garis perang.',
        iconType: 'Zap'
      },
      {
        id: 'oi_3a',
        name: 'Tactical Destruction',
        sub: 'Cabang Kiri: Pengeboman Taktis Fleksibel',
        tier: 3,
        column: 0,
        branchName: 'Tactical Bombing',
        effects: ['Tactical Bomber Damage +20%', 'Bridge & Depot Destruction +20%'],
        description: 'Memutus jalur suplai jembatan dan depo kereta api musuh sebelum konvoi tiba di front.',
        iconType: 'Flame'
      },
      {
        id: 'oi_3b',
        name: 'Air Defence (Dogfight Ace)',
        sub: 'Cabang Kanan: Superioritas Duel Udara',
        tier: 3,
        column: 2,
        branchName: 'Dogfight Defense',
        effects: ['Fighter Dogfight Hit +20%', 'Ace Pilot Generation +25%'],
        description: 'Pilot-pilot pesawat tempur unggulan (Aces) membantai pengebom musuh dengan manuver udara akrobatik.',
        iconType: 'Award'
      }
    ]
  }
];
