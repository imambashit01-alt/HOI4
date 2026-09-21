export interface CountryStartingStats {
  id: string;
  tag: string;
  name: string;
  englishName: string;
  flagSymbol: string;
  flagColors: [string, string];
  leader: string;
  ideology: 'Fascism' | 'Communism' | 'Democratic' | 'Non-Aligned';
  faction: string;
  difficulty: 'Sangat Mudah' | 'Sedang' | 'Menantang' | 'Ahli';
  // Manpower Stats
  manpower: {
    availablePool: number; // e.g. 1250000 (1.25M)
    availablePoolDisplay: string;
    conscriptionLaw: string;
    conscriptionPercent: number; // e.g. 2.5%
    totalPopulation: string; // e.g. 67.5M
    monthlyGrowthDisplay: string;
    manpowerRating: 'Sangat Tinggi' | 'Tinggi' | 'Sedang' | 'Kritis';
  };
  // Factory Stats
  factories: {
    total: number;
    civilian: number;
    military: number;
    dockyards: number;
    consumerGoodsPercent: number; // e.g. 15% to 50%
    effectiveCivsForBuild: number;
    industrialStatus: string;
  };
  // Research Slots Stats
  researchSlots: {
    starting: number;
    maxExpandable: number;
    keyExpansions: string[];
    startingTechCount: number;
  };
  // Military & Strategic Starting Forces
  military: {
    startingDivisions: number;
    startingAirplanes: number;
    startingCapitalShips: number;
    startingScreenShips: number;
    startingSubmarines: number;
    recommendedDoctrine: string;
  };
  // Resources Balance
  resources: {
    surplus: string[];
    deficits: string[];
    oilStatus: 'Melimpah' | 'Cukup' | 'Kritis (Defisit Parah)';
    rubberStatus: 'Monopoli' | 'Cukup' | 'Kritis (Tergantung Sintetis)';
  };
  keyStrategicBrief: string;
}

export const MAJOR_NATIONS_STARTING_STATS: CountryStartingStats[] = [
  {
    id: 'ger',
    tag: 'GER',
    name: 'Jerman (German Reich)',
    englishName: 'German Reich',
    flagSymbol: '✠',
    flagColors: ['#1e293b', '#b91c1c'],
    leader: 'Adolf Hitler',
    ideology: 'Fascism',
    faction: 'Axis (Blok Poros)',
    difficulty: 'Sangat Mudah',
    manpower: {
      availablePool: 1250000,
      availablePoolDisplay: '1.25M',
      conscriptionLaw: 'Limited Conscription (2.5%)',
      conscriptionPercent: 2.5,
      totalPopulation: '67.5M',
      monthlyGrowthDisplay: '+14.5K / bulan',
      manpowerRating: 'Tinggi'
    },
    factories: {
      total: 69,
      civilian: 31,
      military: 28,
      dockyards: 10,
      consumerGoodsPercent: 15,
      effectiveCivsForBuild: 26,
      industrialStatus: 'Sangat Siap Perang (Rasio Pabrik Militer Tertinggi di Eropa)'
    },
    researchSlots: {
      starting: 4,
      maxExpandable: 6,
      keyExpansions: ['Extra Research Slot (via Air Innovations II)', 'Extra Research Slot II (50+ Pabrik)'],
      startingTechCount: 38
    },
    military: {
      startingDivisions: 30,
      startingAirplanes: 884,
      startingCapitalShips: 5,
      startingScreenShips: 30,
      startingSubmarines: 14,
      recommendedDoctrine: 'Mobile Warfare (Blitzkrieg)'
    },
    resources: {
      surplus: ['Baja (Steel) +++ (180+ unit)', 'Aluminium ++ (40 unit)'],
      deficits: ['Minyak (Defisit kronis)', 'Karet (Hampir 0 unit)', 'Tungsten'],
      oilStatus: 'Kritis (Defisit Parah)',
      rubberStatus: 'Kritis (Tergantung Sintetis)'
    },
    keyStrategicBrief: 'Kapasitas produksi senjata militer terbesar di awal 1936. Kelemahan fatal pada impor bahan bakar minyak dan karet yang rentan diblokade armada Sekutu.'
  },
  {
    id: 'sov',
    tag: 'SOV',
    name: 'Uni Soviet (USSR)',
    englishName: 'Soviet Union',
    flagSymbol: '☭',
    flagColors: ['#991b1b', '#d97706'],
    leader: 'Iosif Stalin',
    ideology: 'Communism',
    faction: 'Comintern',
    difficulty: 'Sedang',
    manpower: {
      availablePool: 3100000,
      availablePoolDisplay: '3.10M',
      conscriptionLaw: 'Limited Conscription (2.5%)',
      conscriptionPercent: 2.5,
      totalPopulation: '170.0M',
      monthlyGrowthDisplay: '+36.2K / bulan',
      manpowerRating: 'Sangat Tinggi'
    },
    factories: {
      total: 72,
      civilian: 42,
      military: 24,
      dockyards: 6,
      consumerGoodsPercent: 18,
      effectiveCivsForBuild: 34,
      industrialStatus: 'Raksasa Industri Terpendam (Basis Pabrik Sipil Kuat di Wilayah Pedalaman)'
    },
    researchSlots: {
      starting: 3,
      maxExpandable: 5,
      keyExpansions: ['Transpolar Flights (+1 Slot)', 'Academy of Sciences (+1 Slot)'],
      startingTechCount: 32
    },
    military: {
      startingDivisions: 138,
      startingAirplanes: 1200,
      startingCapitalShips: 3,
      startingScreenShips: 22,
      startingSubmarines: 68,
      recommendedDoctrine: 'Mass Assault (Deep Battle) / Superior Firepower'
    },
    resources: {
      surplus: ['Minyak (Kaukasus Baku +280)', 'Baja +++', 'Kromium +++', 'Aluminium'],
      deficits: ['Karet (Defisit impor dari Malaya)', 'Tungsten impor'],
      oilStatus: 'Melimpah',
      rubberStatus: 'Kritis (Tergantung Sintetis)'
    },
    keyStrategicBrief: 'Pasukan darat terbesar di dunia dengan 138 divisi awal dan pasokan minyak Baku raksasa. Terhambat slot riset awal hanya 3 dan debuff politik "Great Purge".'
  },
  {
    id: 'usa',
    tag: 'USA',
    name: 'Amerika Serikat (USA)',
    englishName: 'United States of America',
    flagSymbol: '★',
    flagColors: ['#1e3a8a', '#dc2626'],
    leader: 'Franklin D. Roosevelt',
    ideology: 'Democratic',
    faction: 'Allies (Sekutu)',
    difficulty: 'Sangat Mudah',
    manpower: {
      availablePool: 1850000,
      availablePoolDisplay: '1.85M',
      conscriptionLaw: 'Disarmed Nation (1.0%)',
      conscriptionPercent: 1.0,
      totalPopulation: '131.0M',
      monthlyGrowthDisplay: '+28.0K / bulan',
      manpowerRating: 'Sangat Tinggi'
    },
    factories: {
      total: 158,
      civilian: 126,
      military: 10,
      dockyards: 22,
      consumerGoodsPercent: 60,
      effectiveCivsForBuild: 38,
      industrialStatus: 'Potensi Raksasa Terbelenggu Great Depression & Neutrality Act'
    },
    researchSlots: {
      starting: 4,
      maxExpandable: 6,
      keyExpansions: ['Department of Agriculture (+1 Slot)', 'Scientific Research & Development (+1 Slot)'],
      startingTechCount: 42
    },
    military: {
      startingDivisions: 10,
      startingAirplanes: 915,
      startingCapitalShips: 18,
      startingScreenShips: 110,
      startingSubmarines: 52,
      recommendedDoctrine: 'Superior Firepower (Integrated Support) + Base Strike'
    },
    resources: {
      surplus: ['Minyak Dunia +550 (55% Minyak Bumi Global)', 'Baja ++++', 'Aluminium +++'],
      deficits: ['Karet (Perlu impor Malaya)', 'Kromium'],
      oilStatus: 'Melimpah',
      rubberStatus: 'Kritis (Tergantung Sintetis)'
    },
    keyStrategicBrief: 'Negara terkuat secara ekonomi dengan 158 total pabrik dan surplus minyak dunia. Dimulai dengan hanya 10 divisi darat karena undang-undang isolasionisme.'
  },
  {
    id: 'eng',
    tag: 'ENG',
    name: 'Inggris Raya (United Kingdom)',
    englishName: 'United Kingdom',
    flagSymbol: '♚',
    flagColors: ['#1e3a8a', '#991b1b'],
    leader: 'Neville Chamberlain / Winston Churchill',
    ideology: 'Democratic',
    faction: 'Allies (Pimpinan Sekutu)',
    difficulty: 'Sedang',
    manpower: {
      availablePool: 420000,
      availablePoolDisplay: '420K',
      conscriptionLaw: 'Volunteer Only (1.5%)',
      conscriptionPercent: 1.5,
      totalPopulation: '47.0M (Home Islands)',
      monthlyGrowthDisplay: '+10.1K / bulan',
      manpowerRating: 'Sedang'
    },
    factories: {
      total: 70,
      civilian: 35,
      military: 16,
      dockyards: 19,
      consumerGoodsPercent: 30,
      effectiveCivsForBuild: 24,
      industrialStatus: 'Pondasi Maritim Kuat dengan Galangan Kapal Terbesar di Eropa'
    },
    researchSlots: {
      starting: 4,
      maxExpandable: 5,
      keyExpansions: ['Tizard Mission (Kolaborasi Riset dengan Amerika Serikat)'],
      startingTechCount: 44
    },
    military: {
      startingDivisions: 36,
      startingAirplanes: 820,
      startingCapitalShips: 22,
      startingScreenShips: 160,
      startingSubmarines: 51,
      recommendedDoctrine: 'Grand Battleplan / Superior Firepower + Fleet in Being'
    },
    resources: {
      surplus: ['Baja ++', 'Akses Karet Monopoli Malaya (Raj/Malaya)', 'Minyak Irak/Timur Tengah'],
      deficits: ['Tungsten domestik', 'Aluminium'],
      oilStatus: 'Cukup',
      rubberStatus: 'Monopoli'
    },
    keyStrategicBrief: 'Penguasa samudra dengan Royal Navy terbesar (200+ kapal perang) dan akses monopoli karet Malaya. Kelemahan pada manpower pulau induk yang terbatas.'
  },
  {
    id: 'jap',
    tag: 'JAP',
    name: 'Kekaisaran Jepang (Empire of Japan)',
    englishName: 'Empire of Japan',
    flagSymbol: '☼',
    flagColors: ['#991b1b', '#f8fafc'],
    leader: 'Hirohito',
    ideology: 'Fascism',
    faction: 'Greater East Asia Co-Prosperity Sphere',
    difficulty: 'Menantang',
    manpower: {
      availablePool: 1450000,
      availablePoolDisplay: '1.45M',
      conscriptionLaw: 'Volunteer Only (1.5%)',
      conscriptionPercent: 1.5,
      totalPopulation: '70.5M',
      monthlyGrowthDisplay: '+15.2K / bulan',
      manpowerRating: 'Tinggi'
    },
    factories: {
      total: 62,
      civilian: 24,
      military: 20,
      dockyards: 18,
      consumerGoodsPercent: 25,
      effectiveCivsForBuild: 18,
      industrialStatus: 'Kapasitas Galangan Kapal Induk Tinggi tapi Industri Dasar Lemah'
    },
    researchSlots: {
      starting: 4,
      maxExpandable: 5,
      keyExpansions: ['Extra Research Slot (Pohon Riset Ilmiah Tokyo)'],
      startingTechCount: 36
    },
    military: {
      startingDivisions: 54,
      startingAirplanes: 750,
      startingCapitalShips: 15,
      startingScreenShips: 85,
      startingSubmarines: 61,
      recommendedDoctrine: 'Grand Battleplan / Mass Assault + Base Strike (Naval Aviation)'
    },
    resources: {
      surplus: ['Chromium (20 unit)', 'Sedikit Baja'],
      deficits: ['Minyak (Krisis Eksistensial - hanya cukup ~6 bulan operasi armada)', 'Karet', 'Aluminium'],
      oilStatus: 'Kritis (Defisit Parah)',
      rubberStatus: 'Kritis (Tergantung Sintetis)'
    },
    keyStrategicBrief: 'Armada kapal induk tangguh (Kidō Butai) dan 54 divisi infanteri terlatih. Menghadapi ancaman fatal embargo minyak AS yang memaksa ekspansi selatan ke Hindia Belanda.'
  },
  {
    id: 'ita',
    tag: 'ITA',
    name: 'Italia (Kingdom of Italy)',
    englishName: 'Kingdom of Italy',
    flagSymbol: '⚜',
    flagColors: ['#15803d', '#b91c1c'],
    leader: 'Benito Mussolini',
    ideology: 'Fascism',
    faction: 'Axis (Blok Poros)',
    difficulty: 'Sedang',
    manpower: {
      availablePool: 850000,
      availablePoolDisplay: '850K',
      conscriptionLaw: 'Limited Conscription (2.5%)',
      conscriptionPercent: 2.5,
      totalPopulation: '43.0M',
      monthlyGrowthDisplay: '+9.3K / bulan',
      manpowerRating: 'Sedang'
    },
    factories: {
      total: 51,
      civilian: 21,
      military: 19,
      dockyards: 11,
      consumerGoodsPercent: 20,
      effectiveCivsForBuild: 16,
      industrialStatus: 'Industri Menengah di Italia Utara; Selatan Kurang Terindustrialisasi'
    },
    researchSlots: {
      starting: 4,
      maxExpandable: 5,
      keyExpansions: ['Extra Research Slot (Servizio Informazioni Militare)'],
      startingTechCount: 34
    },
    military: {
      startingDivisions: 39,
      startingAirplanes: 560,
      startingCapitalShips: 6,
      startingScreenShips: 60,
      startingSubmarines: 50,
      recommendedDoctrine: 'Superior Firepower / Grand Battleplan + Fleet in Being'
    },
    resources: {
      surplus: ['Aluminium ++', 'Baja Sedang'],
      deficits: ['Minyak (Defisit parah)', 'Karet', 'Tungsten', 'Batu bara'],
      oilStatus: 'Kritis (Defisit Parah)',
      rubberStatus: 'Kritis (Tergantung Sintetis)'
    },
    keyStrategicBrief: 'Sedang bertempur aktif di Ethiopia pada awal 1936. Armada Regia Marina yang mumpuni di Mediterania tapi dibatasi bahan bakar dan kapasitas industri militer terbatas.'
  },
  {
    id: 'fra',
    tag: 'FRA',
    name: 'Prancis (French Republic)',
    englishName: 'French Republic',
    flagSymbol: '⚑',
    flagColors: ['#1d4ed8', '#dc2626'],
    leader: 'Édouard Daladier / Albert Lebrun',
    ideology: 'Democratic',
    faction: 'Allies (Sekutu)',
    difficulty: 'Ahli',
    manpower: {
      availablePool: 650000,
      availablePoolDisplay: '650K',
      conscriptionLaw: 'Limited Conscription (2.5% minus Protected Family)',
      conscriptionPercent: 2.0,
      totalPopulation: '41.8M (Metropolitan France)',
      monthlyGrowthDisplay: '+4.5K / bulan (Pertumbuhan Lambat)',
      manpowerRating: 'Sedang'
    },
    factories: {
      total: 51,
      civilian: 33,
      military: 8,
      dockyards: 10,
      consumerGoodsPercent: 35,
      effectiveCivsForBuild: 21,
      industrialStatus: 'Pabrik Militer Awal Sangat Rendah (Hanya 8 Mils aktif)'
    },
    researchSlots: {
      starting: 3,
      maxExpandable: 5,
      keyExpansions: ['Extra Research Slot (Pohon Industri)', 'CNRS Scientific Research (+1 Slot)'],
      startingTechCount: 35
    },
    military: {
      startingDivisions: 56,
      startingAirplanes: 600,
      startingCapitalShips: 8,
      startingScreenShips: 65,
      startingSubmarines: 72,
      recommendedDoctrine: 'Grand Battleplan (Entrenchment Maksimal)'
    },
    resources: {
      surplus: ['Baja +++ (140+ unit)', 'Aluminium ++'],
      deficits: ['Minyak (Impor 100%)', 'Karet', 'Tungsten'],
      oilStatus: 'Kritis (Defisit Parah)',
      rubberStatus: 'Kritis (Tergantung Sintetis)'
    },
    keyStrategicBrief: 'Garis Maginot benteng Level 10 tak tertembus di perbatasan Jerman. Terkekang oleh debuff "Disjointed Government" (-1 PP/hari) dan hanya 8 pabrik militer awal.'
  },
  {
    id: 'chi',
    tag: 'CHI',
    name: 'Tiongkok Nasionalis (Republic of China)',
    englishName: 'Republic of China',
    flagSymbol: '☀',
    flagColors: ['#1d4ed8', '#ffffff'],
    leader: 'Chiang Kai-shek',
    ideology: 'Non-Aligned',
    faction: 'Chinese United Front',
    difficulty: 'Menantang',
    manpower: {
      availablePool: 5800000,
      availablePoolDisplay: '5.80M',
      conscriptionLaw: 'Volunteer Only (1.5%)',
      conscriptionPercent: 1.5,
      totalPopulation: '210.0M+',
      monthlyGrowthDisplay: '+45.0K / bulan',
      manpowerRating: 'Sangat Tinggi'
    },
    factories: {
      total: 27,
      civilian: 16,
      military: 10,
      dockyards: 1,
      consumerGoodsPercent: 20,
      effectiveCivsForBuild: 12,
      industrialStatus: 'Industri Tertinggal tapi Memiliki Kolam Manpower Terbesar di Bumi'
    },
    researchSlots: {
      starting: 2,
      maxExpandable: 4,
      keyExpansions: ['Sino-German Industrial Cooperation (+1 Slot)', 'Foreign Investors (+1 Slot)'],
      startingTechCount: 14
    },
    military: {
      startingDivisions: 57,
      startingAirplanes: 120,
      startingCapitalShips: 0,
      startingScreenShips: 6,
      startingSubmarines: 0,
      recommendedDoctrine: 'Mass Assault (Mass Mobilization)'
    },
    resources: {
      surplus: ['Tungsten +++ (Cadangan Terbesar Dunia)', 'Baja Sedang'],
      deficits: ['Minyak (Nol)', 'Karet (Nol)', 'Aluminium Minim'],
      oilStatus: 'Kritis (Defisit Parah)',
      rubberStatus: 'Kritis (Tergantung Sintetis)'
    },
    keyStrategicBrief: 'Manpower cadangan tak terbatas yang mampu menahan invasi Jepang. Memulai permainan hanya dengan 2 slot riset dan teknologi militer yang sangat usang.'
  },
  {
    id: 'pol',
    tag: 'POL',
    name: 'Polandia (Republic of Poland)',
    englishName: 'Republic of Poland',
    flagSymbol: '🦅',
    flagColors: ['#dc2626', '#f8fafc'],
    leader: 'Ignacy Mościcki / Edward Rydz-Śmigły',
    ideology: 'Non-Aligned',
    faction: 'Miedzymorze / Mandiri',
    difficulty: 'Ahli',
    manpower: {
      availablePool: 620000,
      availablePoolDisplay: '620K',
      conscriptionLaw: 'Limited Conscription (2.5%)',
      conscriptionPercent: 2.5,
      totalPopulation: '34.5M',
      monthlyGrowthDisplay: '+7.4K / bulan',
      manpowerRating: 'Sedang'
    },
    factories: {
      total: 35,
      civilian: 21,
      military: 10,
      dockyards: 4,
      consumerGoodsPercent: 25,
      effectiveCivsForBuild: 15,
      industrialStatus: 'Basis Industri Menengah di Silesia & Segitiga Pusat COP'
    },
    researchSlots: {
      starting: 3,
      maxExpandable: 5,
      keyExpansions: ['COP Central Industrial Region (+1 Slot)', 'Polish Cybernetics & Cryptology (+1 Slot)'],
      startingTechCount: 26
    },
    military: {
      startingDivisions: 30,
      startingAirplanes: 310,
      startingCapitalShips: 0,
      startingScreenShips: 4,
      startingSubmarines: 5,
      recommendedDoctrine: 'Superior Firepower / Grand Battleplan'
    },
    resources: {
      surplus: ['Baja ++', 'Batu bara (Kaya di Katowice/Silesia)'],
      deficits: ['Minyak (Hanya sedikit di Galisia)', 'Karet', 'Aluminium'],
      oilStatus: 'Kritis (Defisit Parah)',
      rubberStatus: 'Kritis (Tergantung Sintetis)'
    },
    keyStrategicBrief: 'Posisi geopolitik paling berbahaya di Eropa, terjepit di antara ancaman ganda Jerman Reich di barat dan Uni Soviet di timur.'
  }
];
