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
  },
  {
    id: 'can',
    tag: 'CAN',
    name: 'Dominion Kanada (Canada)',
    englishName: 'Dominion of Canada',
    flagSymbol: '🍁',
    flagColors: ['#dc2626', '#ffffff'],
    leader: 'William Lyon Mackenzie King',
    ideology: 'Democratic',
    faction: 'Allies (Sekutu)',
    difficulty: 'Sedang',
    manpower: {
      availablePool: 95000,
      availablePoolDisplay: '95K',
      conscriptionLaw: 'Volunteer Only (1.5%)',
      conscriptionPercent: 1.5,
      totalPopulation: '11.2M',
      monthlyGrowthDisplay: '+2.1K / bulan',
      manpowerRating: 'Sedang'
    },
    factories: {
      total: 16,
      civilian: 13,
      military: 2,
      dockyards: 1,
      consumerGoodsPercent: 30,
      effectiveCivsForBuild: 9,
      industrialStatus: 'Potensi Industri Raksasa di Ontario & Quebec (Aerodrome of Democracy)'
    },
    researchSlots: {
      starting: 3,
      maxExpandable: 5,
      keyExpansions: ['National Research Council (+1 Slot)', 'Canadian Chemical Warfare / Polymer (+1 Slot)'],
      startingTechCount: 28
    },
    military: {
      startingDivisions: 1,
      startingAirplanes: 60,
      startingCapitalShips: 0,
      startingScreenShips: 6,
      startingSubmarines: 0,
      recommendedDoctrine: 'Superior Firepower'
    },
    resources: {
      surplus: ['Aluminium +++ (Cadangan Saguenay Arvida)', 'Baja Sedang', 'Nikel Ekstra'],
      deficits: ['Minyak (Minim)', 'Karet'],
      oilStatus: 'Cukup',
      rubberStatus: 'Kritis (Tergantung Sintetis)'
    },
    keyStrategicBrief: 'Terlindung aman di seberang samudra oleh AS dan lautan Atlantik. Fokus memproduksi armada korvet Flower-class pengawal konvoi dan melatih pilot BCATP.'
  },
  {
    id: 'raj',
    tag: 'RAJ',
    name: 'Raj Britania (British India)',
    englishName: 'British Raj',
    flagSymbol: '☸',
    flagColors: ['#ea580c', '#15803d'],
    leader: 'Lord Linlithgow (Viceroy of India)',
    ideology: 'Non-Aligned',
    faction: 'Allies (Dominion Britania)',
    difficulty: 'Menantang',
    manpower: {
      availablePool: 450000,
      availablePoolDisplay: '450K',
      conscriptionLaw: 'Volunteer Only (Agrarian Society -69% debuff)',
      conscriptionPercent: 1.0,
      totalPopulation: '378.0M',
      monthlyGrowthDisplay: '+45.0K / bulan',
      manpowerRating: 'Sangat Tinggi'
    },
    factories: {
      total: 16,
      civilian: 9,
      military: 5,
      dockyards: 2,
      consumerGoodsPercent: 35,
      effectiveCivsForBuild: 5,
      industrialStatus: 'Pabrik Senjata Ishapore & Kompleks Baja Raksasa Tata Jamshedpur'
    },
    researchSlots: {
      starting: 2,
      maxExpandable: 4,
      keyExpansions: ['Indian Institute of Science (+1 Slot)', 'Royal Commission on Education (+1 Slot)'],
      startingTechCount: 20
    },
    military: {
      startingDivisions: 16,
      startingAirplanes: 45,
      startingCapitalShips: 0,
      startingScreenShips: 5,
      startingSubmarines: 0,
      recommendedDoctrine: 'Grand Battleplan'
    },
    resources: {
      surplus: ['Baja +++', 'Chromium ++', 'Tungsten', 'Aluminium'],
      deficits: ['Minyak (Hanya sedikit di Assam Digboi)', 'Karet (Hanya di Kerala/Ceylon)'],
      oilStatus: 'Kritis (Defisit Parah)',
      rubberStatus: 'Cukup'
    },
    keyStrategicBrief: 'Potensi manpower sukarelawan terbesar di dunia (2,5 juta prajurit). Tantangan utama adalah menghapus debuff Agrarian Society dan menahan serbuan Jepang di hutan Burma.'
  },
  {
    id: 'ast',
    tag: 'AST',
    name: 'Persemakmuran Australia',
    englishName: 'Commonwealth of Australia',
    flagSymbol: '🦘',
    flagColors: ['#1e3a8a', '#dc2626'],
    leader: 'Joseph Lyons / John Curtin',
    ideology: 'Democratic',
    faction: 'Allies (Sekutu)',
    difficulty: 'Sedang',
    manpower: {
      availablePool: 78000,
      availablePoolDisplay: '78K',
      conscriptionLaw: 'Volunteer Only (1.5%)',
      conscriptionPercent: 1.5,
      totalPopulation: '6.9M',
      monthlyGrowthDisplay: '+1.4K / bulan',
      manpowerRating: 'Sedang'
    },
    factories: {
      total: 14,
      civilian: 10,
      military: 2,
      dockyards: 2,
      consumerGoodsPercent: 30,
      effectiveCivsForBuild: 7,
      industrialStatus: 'Kapasitas Manufaktur Berkembang (BHP Steel Newcastle & CAC Aviation)'
    },
    researchSlots: {
      starting: 3,
      maxExpandable: 5,
      keyExpansions: ['CSIR Scientific Research (+1 Slot)', 'Cockatoo Island Naval Dockyards (+1 Slot)'],
      startingTechCount: 27
    },
    military: {
      startingDivisions: 4,
      startingAirplanes: 80,
      startingCapitalShips: 0,
      startingScreenShips: 8,
      startingSubmarines: 0,
      recommendedDoctrine: 'Superior Firepower'
    },
    resources: {
      surplus: ['Tungsten ++', 'Baja ++', 'Aluminium'],
      deficits: ['Minyak (Impor dari Hindia Belanda)', 'Karet'],
      oilStatus: 'Kritis (Defisit Parah)',
      rubberStatus: 'Kritis (Tergantung Sintetis)'
    },
    keyStrategicBrief: 'Garis pertahanan pertama Pasifik Selatan. Berperan menahan serbuan Rommel di Tobruk dan bertempur sengit di Jalur Hutan Kokoda Papua Nugini.'
  },
  {
    id: 'rom',
    tag: 'ROM',
    name: 'Kerajaan Rumania (Romania)',
    englishName: 'Kingdom of Romania',
    flagSymbol: '👑',
    flagColors: ['#1d4ed8', '#eab308'],
    leader: 'Raja Carol II / Marsekal Ion Antonescu',
    ideology: 'Non-Aligned',
    faction: 'Netral / Pro-Poros (Axis)',
    difficulty: 'Sedang',
    manpower: {
      availablePool: 260000,
      availablePoolDisplay: '260K',
      conscriptionLaw: 'Limited Conscription (2.5%)',
      conscriptionPercent: 2.5,
      totalPopulation: '19.8M',
      monthlyGrowthDisplay: '+4.2K / bulan',
      manpowerRating: 'Tinggi'
    },
    factories: {
      total: 24,
      civilian: 15,
      military: 8,
      dockyards: 1,
      consumerGoodsPercent: 25,
      effectiveCivsForBuild: 11,
      industrialStatus: 'Kilang Minyak Raksasa Ploiești & Pabrik Senjata Malaxa / IAR Brașov'
    },
    researchSlots: {
      starting: 3,
      maxExpandable: 4,
      keyExpansions: ['University of Bucharest Labs (+1 Slot)'],
      startingTechCount: 25
    },
    military: {
      startingDivisions: 23,
      startingAirplanes: 160,
      startingCapitalShips: 0,
      startingScreenShips: 4,
      startingSubmarines: 1,
      recommendedDoctrine: 'Grand Battleplan / Superior Firepower'
    },
    resources: {
      surplus: ['Minyak ++++ (Ploiești Cadangan Terbesar Eropa)', 'Baja Sedang'],
      deficits: ['Karet', 'Tungsten', 'Aluminium Minim'],
      oilStatus: 'Melimpah',
      rubberStatus: 'Kritis (Tergantung Sintetis)'
    },
    keyStrategicBrief: 'Lumbung minyak bahan bakar utama Poros di Eropa Timur. Menghadapi tekanan tuntutan teritorial Uni Soviet atas Bessarabia dan Hungaria atas Transylvania.'
  },
  {
    id: 'yug',
    tag: 'YUG',
    name: 'Kerajaan Yugoslavia',
    englishName: 'Kingdom of Yugoslavia',
    flagSymbol: '⚔',
    flagColors: ['#2563eb', '#dc2626'],
    leader: 'Pangeran Pavle (Prince Regent Paul)',
    ideology: 'Non-Aligned',
    faction: 'Mandiri / Little Entente',
    difficulty: 'Menantang',
    manpower: {
      availablePool: 195000,
      availablePoolDisplay: '195K',
      conscriptionLaw: 'Limited Conscription (2.5%)',
      conscriptionPercent: 2.5,
      totalPopulation: '15.1M',
      monthlyGrowthDisplay: '+3.5K / bulan',
      manpowerRating: 'Sedang'
    },
    factories: {
      total: 20,
      civilian: 14,
      military: 5,
      dockyards: 1,
      consumerGoodsPercent: 30,
      effectiveCivsForBuild: 9,
      industrialStatus: 'Industri Tambang Mineral Kaya di Zenica & Pabrik Senjata Zastava Kragujevac'
    },
    researchSlots: {
      starting: 3,
      maxExpandable: 4,
      keyExpansions: ['Belgrade Institute of Technology (+1 Slot)'],
      startingTechCount: 22
    },
    military: {
      startingDivisions: 16,
      startingAirplanes: 120,
      startingCapitalShips: 0,
      startingScreenShips: 4,
      startingSubmarines: 2,
      recommendedDoctrine: 'Grand Battleplan'
    },
    resources: {
      surplus: ['Aluminium +++', 'Chromium ++', 'Baja Sedang'],
      deficits: ['Minyak', 'Karet'],
      oilStatus: 'Kritis (Defisit Parah)',
      rubberStatus: 'Kritis (Tergantung Sintetis)'
    },
    keyStrategicBrief: 'Kaya akan bauksit dan kromium, namun dikelilingi tetangga bermusuhan (Italia, Hungaria, Bulgaria) serta terbelenggu ketegangan etnis internal antara Serbia dan Kroasia.'
  },
  {
    id: 'hun',
    tag: 'HUN',
    name: 'Kerajaan Hungaria (Hungary)',
    englishName: 'Kingdom of Hungary',
    flagSymbol: '🛡',
    flagColors: ['#15803d', '#dc2626'],
    leader: 'Miklós Horthy (Regent tanpa Raja)',
    ideology: 'Non-Aligned',
    faction: 'Pro-Poros (Axis)',
    difficulty: 'Sedang',
    manpower: {
      availablePool: 110000,
      availablePoolDisplay: '110K',
      conscriptionLaw: 'Disarmed Nation (Perjanjian Trianon)',
      conscriptionPercent: 1.0,
      totalPopulation: '8.9M',
      monthlyGrowthDisplay: '+1.9K / bulan',
      manpowerRating: 'Sedang'
    },
    factories: {
      total: 17,
      civilian: 11,
      military: 5,
      dockyards: 1,
      consumerGoodsPercent: 25,
      effectiveCivsForBuild: 8,
      industrialStatus: 'Pabrik Baja Csepel Weiss Manfréd & Rekayasa Mesin Ganz Budapest'
    },
    researchSlots: {
      starting: 3,
      maxExpandable: 5,
      keyExpansions: ['Győr Program Expansion (+1 Slot)', 'Hungarian Academy of Sciences (+1 Slot)'],
      startingTechCount: 26
    },
    military: {
      startingDivisions: 12,
      startingAirplanes: 75,
      startingCapitalShips: 0,
      startingScreenShips: 0,
      startingSubmarines: 0,
      recommendedDoctrine: 'Superior Firepower / Mobile Warfare'
    },
    resources: {
      surplus: ['Aluminium ++++ (Lumbung Bauksit Terbesar Eropa)', 'Baja Sedang'],
      deficits: ['Minyak (Ladang Zala baru ditemukan 1937)', 'Karet'],
      oilStatus: 'Cukup',
      rubberStatus: 'Kritis (Tergantung Sintetis)'
    },
    keyStrategicBrief: 'Berusaha membatalkan Perjanjian Trianon lewat diplomasi Arbitrasi Wina untuk merebut kembali Transylvania Utara, Slovakia Selatan, dan Vojvodina.'
  },
  {
    id: 'cze',
    tag: 'CZE',
    name: 'Republik Cekoslowakia',
    englishName: 'Republic of Czechoslovakia',
    flagSymbol: '🏰',
    flagColors: ['#2563eb', '#dc2626'],
    leader: 'Edvard Beneš',
    ideology: 'Democratic',
    faction: 'Little Entente / Mandiri',
    difficulty: 'Ahli',
    manpower: {
      availablePool: 240000,
      availablePoolDisplay: '240K',
      conscriptionLaw: 'Limited Conscription (2.5%)',
      conscriptionPercent: 2.5,
      totalPopulation: '15.4M',
      monthlyGrowthDisplay: '+3.4K / bulan',
      manpowerRating: 'Sedang'
    },
    factories: {
      total: 30,
      civilian: 18,
      military: 11,
      dockyards: 1,
      consumerGoodsPercent: 25,
      effectiveCivsForBuild: 13,
      industrialStatus: 'Pabrik Senjata Legendaris Škoda Plzeň & ČKD Praha (Kapasitas Setara Inggris)'
    },
    researchSlots: {
      starting: 3,
      maxExpandable: 5,
      keyExpansions: ['Škoda Works Engineering (+1 Slot)', 'Charles University Research (+1 Slot)'],
      startingTechCount: 30
    },
    military: {
      startingDivisions: 21,
      startingAirplanes: 210,
      startingCapitalShips: 0,
      startingScreenShips: 0,
      startingSubmarines: 0,
      recommendedDoctrine: 'Grand Battleplan / Superior Firepower'
    },
    resources: {
      surplus: ['Baja +++', 'Tungsten'],
      deficits: ['Minyak', 'Karet', 'Aluminium'],
      oilStatus: 'Kritis (Defisit Parah)',
      rubberStatus: 'Kritis (Tergantung Sintetis)'
    },
    keyStrategicBrief: 'Negara industri termaju di Eropa Tengah. Garis benteng Sudetenland Beneš Line Level 7 mampu menangkis Panzer Wehrmacht jika memilih menolak Perjanjian Munich.'
  },
  {
    id: 'tur',
    tag: 'TUR',
    name: 'Republik Turki (Turkey)',
    englishName: 'Republic of Turkey',
    flagSymbol: '☪',
    flagColors: ['#dc2626', '#ffffff'],
    leader: 'Mustafa Kemal Atatürk / İsmet İnönü',
    ideology: 'Non-Aligned',
    faction: 'Netral (Balkan Entente & Saadabad)',
    difficulty: 'Sedang',
    manpower: {
      availablePool: 280000,
      availablePoolDisplay: '280K',
      conscriptionLaw: 'Limited Conscription (2.5%)',
      conscriptionPercent: 2.5,
      totalPopulation: '16.4M',
      monthlyGrowthDisplay: '+3.8K / bulan',
      manpowerRating: 'Tinggi'
    },
    factories: {
      total: 19,
      civilian: 13,
      military: 5,
      dockyards: 1,
      consumerGoodsPercent: 30,
      effectiveCivsForBuild: 8,
      industrialStatus: 'Peleburan Besi Karabük & Pabrik Tekstil Sumerbank Kayseri'
    },
    researchSlots: {
      starting: 3,
      maxExpandable: 5,
      keyExpansions: ['Istanbul University Faculty (+1 Slot)', 'Karabük Industrial Metallurgy (+1 Slot)'],
      startingTechCount: 22
    },
    military: {
      startingDivisions: 22,
      startingAirplanes: 110,
      startingCapitalShips: 1,
      startingScreenShips: 4,
      startingSubmarines: 4,
      recommendedDoctrine: 'Grand Battleplan'
    },
    resources: {
      surplus: ['Chromium ++++ (Eksportir Terbesar Dunia)', 'Baja Sedang'],
      deficits: ['Minyak', 'Karet'],
      oilStatus: 'Kritis (Defisit Parah)',
      rubberStatus: 'Kritis (Tergantung Sintetis)'
    },
    keyStrategicBrief: 'Menguasai Selat Bosporus dan Dardanelles yang menghubungkan Laut Hitam ke Mediterania. Monopoli kromium membuat Sekutu dan Poros berebut pengaruh di Ankara.'
  },
  {
    id: 'spa',
    tag: 'SPA',
    name: 'Spanyol (Spanish Republic)',
    englishName: 'Spanish Republic / Nationalist Spain',
    flagSymbol: '🐂',
    flagColors: ['#dc2626', '#eab308'],
    leader: 'Manuel Azaña / Francisco Franco',
    ideology: 'Democratic',
    faction: 'Mandiri / Perang Saudara Terpecah',
    difficulty: 'Ahli',
    manpower: {
      availablePool: 340000,
      availablePoolDisplay: '340K',
      conscriptionLaw: 'Limited Conscription (2.5%)',
      conscriptionPercent: 2.5,
      totalPopulation: '24.8M',
      monthlyGrowthDisplay: '+5.1K / bulan',
      manpowerRating: 'Tinggi'
    },
    factories: {
      total: 22,
      civilian: 14,
      military: 6,
      dockyards: 2,
      consumerGoodsPercent: 25,
      effectiveCivsForBuild: 10,
      industrialStatus: 'Baja Basque Bilbao & Manufaktur Katalonia Barcelona'
    },
    researchSlots: {
      starting: 3,
      maxExpandable: 4,
      keyExpansions: ['CSIC Scientific Research (+1 Slot)'],
      startingTechCount: 23
    },
    military: {
      startingDivisions: 25,
      startingAirplanes: 130,
      startingCapitalShips: 2,
      startingScreenShips: 14,
      startingSubmarines: 12,
      recommendedDoctrine: 'Superior Firepower'
    },
    resources: {
      surplus: ['Tungsten +++', 'Baja ++'],
      deficits: ['Minyak', 'Karet'],
      oilStatus: 'Kritis (Defisit Parah)',
      rubberStatus: 'Kritis (Tergantung Sintetis)'
    },
    keyStrategicBrief: 'Akan meletus dalam Perang Saudara Spanyol berdarah pada Juli 1936. Pemenang perang saudara dapat mengklaim Gibraltar dari Inggris atau mempertahankan netralitas Iberia.'
  },
  {
    id: 'fin',
    tag: 'FIN',
    name: 'Republik Finlandia (Finland)',
    englishName: 'Republic of Finland',
    flagSymbol: '❄',
    flagColors: ['#1d4ed8', '#f8fafc'],
    leader: 'Kyösti Kallio / Carl Gustaf Emil Mannerheim',
    ideology: 'Democratic',
    faction: 'Mandiri / Anti-Soviet',
    difficulty: 'Menantang',
    manpower: {
      availablePool: 62000,
      availablePoolDisplay: '62K',
      conscriptionLaw: 'Limited Conscription (2.5%)',
      conscriptionPercent: 2.5,
      totalPopulation: '3.7M',
      monthlyGrowthDisplay: '+800 / bulan',
      manpowerRating: 'Kritis'
    },
    factories: {
      total: 15,
      civilian: 11,
      military: 3,
      dockyards: 1,
      consumerGoodsPercent: 25,
      effectiveCivsForBuild: 8,
      industrialStatus: 'Industri Kayu & Tambang Nikel Terkaya Eropa di Petsamo Kolosjoki'
    },
    researchSlots: {
      starting: 3,
      maxExpandable: 4,
      keyExpansions: ['VTT Technical Research Centre (+1 Slot)'],
      startingTechCount: 24
    },
    military: {
      startingDivisions: 14,
      startingAirplanes: 60,
      startingCapitalShips: 2,
      startingScreenShips: 4,
      startingSubmarines: 5,
      recommendedDoctrine: 'Grand Battleplan / Superior Firepower'
    },
    resources: {
      surplus: ['Tungsten ++', 'Nikel (Petsamo)', 'Baja Sedang'],
      deficits: ['Minyak', 'Karet'],
      oilStatus: 'Kritis (Defisit Parah)',
      rubberStatus: 'Kritis (Tergantung Sintetis)'
    },
    keyStrategicBrief: 'Semangat Sisu legendaris dan taktik Motti di hutan salju memberikan rasio korban 1:5 melawan Tentara Merah di Garis Pertahanan Mannerheim.'
  },
  {
    id: 'man',
    tag: 'MAN',
    name: 'Kekaisaran Manchukuo',
    englishName: 'Empire of Manchukuo',
    flagSymbol: '🐉',
    flagColors: ['#eab308', '#dc2626'],
    leader: 'Kaisar Puyi (Aisin Gioro)',
    ideology: 'Fascism',
    faction: 'Axis (Boneka Kekaisaran Jepang)',
    difficulty: 'Ahli',
    manpower: {
      availablePool: 420000,
      availablePoolDisplay: '420K',
      conscriptionLaw: 'Volunteer Only (Low Legitimacy)',
      conscriptionPercent: 1.0,
      totalPopulation: '38.5M',
      monthlyGrowthDisplay: '+7.2K / bulan',
      manpowerRating: 'Tinggi'
    },
    factories: {
      total: 16,
      civilian: 10,
      military: 6,
      dockyards: 0,
      consumerGoodsPercent: 30,
      effectiveCivsForBuild: 7,
      industrialStatus: 'Pabrik Baja Showa Anshan & Tambang Batubara Terbuka Fushun'
    },
    researchSlots: {
      starting: 2,
      maxExpandable: 4,
      keyExpansions: ['Mangyo Heavy Industry Labs (+1 Slot)', 'Changchun Imperial University (+1 Slot)'],
      startingTechCount: 19
    },
    military: {
      startingDivisions: 15,
      startingAirplanes: 30,
      startingCapitalShips: 0,
      startingScreenShips: 0,
      startingSubmarines: 0,
      recommendedDoctrine: 'Superior Firepower / Mass Assault'
    },
    resources: {
      surplus: ['Baja +++', 'Aluminium', 'Batu Bara'],
      deficits: ['Minyak', 'Karet'],
      oilStatus: 'Kritis (Defisit Parah)',
      rubberStatus: 'Kritis (Tergantung Sintetis)'
    },
    keyStrategicBrief: 'Terikat sebagai protektorat Tentara Kwantung Jepang. Memiliki opsi jalur fokus alternatif untuk memberontak, merebut kembali Takhta Terlarang Beijing, dan merestorasi Dinasti Qing.'
  },
  {
    id: 'swe',
    tag: 'SWE',
    name: 'Kerajaan Swedia (Sweden)',
    englishName: 'Kingdom of Sweden',
    flagSymbol: '⚔',
    flagColors: ['#1d4ed8', '#eab308'],
    leader: 'Per Albin Hansson',
    ideology: 'Democratic',
    faction: 'Netral Bersenjata (Armed Neutrality)',
    difficulty: 'Sedang',
    manpower: {
      availablePool: 95000,
      availablePoolDisplay: '95K',
      conscriptionLaw: 'Limited Conscription (2.5%)',
      conscriptionPercent: 2.5,
      totalPopulation: '6.4M',
      monthlyGrowthDisplay: '+1.3K / bulan',
      manpowerRating: 'Sedang'
    },
    factories: {
      total: 26,
      civilian: 19,
      military: 5,
      dockyards: 2,
      consumerGoodsPercent: 25,
      effectiveCivsForBuild: 14,
      industrialStatus: 'Tambang Besi Kiruna & Raksasa Senjata Bofors / Galangan Götaverken'
    },
    researchSlots: {
      starting: 3,
      maxExpandable: 5,
      keyExpansions: ['Royal Institute of Technology KTH (+1 Slot)', 'Bofors Karlskoga R&D (+1 Slot)'],
      startingTechCount: 29
    },
    military: {
      startingDivisions: 12,
      startingAirplanes: 90,
      startingCapitalShips: 2,
      startingScreenShips: 12,
      startingSubmarines: 10,
      recommendedDoctrine: 'Superior Firepower'
    },
    resources: {
      surplus: ['Baja ++++ (Kiruna Besi Kualitas Tertinggi Dunia)', 'Tungsten ++'],
      deficits: ['Minyak', 'Karet'],
      oilStatus: 'Kritis (Defisit Parah)',
      rubberStatus: 'Kritis (Tergantung Sintetis)'
    },
    keyStrategicBrief: 'Kunci ekspor bijih besi Kiruna ke Jerman dan Sekutu. Doktrin "En Svensk Tiger" dan persenjataan Bofors 40mm menjaga kedaulatan Swedia tetap utuh sepanjang perang.'
  },
  {
    id: 'nor',
    tag: 'NOR',
    name: 'Kerajaan Norwegia (Norway)',
    englishName: 'Kingdom of Norway',
    flagSymbol: '⚓',
    flagColors: ['#dc2626', '#1e3a8a'],
    leader: 'Johan Nygaardsvold / Raja Haakon VII',
    ideology: 'Democratic',
    faction: 'Netral / Pro-Sekutu',
    difficulty: 'Ahli',
    manpower: {
      availablePool: 45000,
      availablePoolDisplay: '45K',
      conscriptionLaw: 'Volunteer Only (1.5%)',
      conscriptionPercent: 1.5,
      totalPopulation: '2.9M',
      monthlyGrowthDisplay: '+600 / bulan',
      manpowerRating: 'Kritis'
    },
    factories: {
      total: 13,
      civilian: 9,
      military: 2,
      dockyards: 2,
      consumerGoodsPercent: 30,
      effectiveCivsForBuild: 6,
      industrialStatus: 'Armada Dagang Raksasa Nortraship & Reaktor Air Berat Vemork Rjukan'
    },
    researchSlots: {
      starting: 3,
      maxExpandable: 4,
      keyExpansions: ['University of Oslo Nuclear & Hydro (+1 Slot)'],
      startingTechCount: 25
    },
    military: {
      startingDivisions: 6,
      startingAirplanes: 40,
      startingCapitalShips: 2,
      startingScreenShips: 6,
      startingSubmarines: 9,
      recommendedDoctrine: 'Grand Battleplan'
    },
    resources: {
      surplus: ['Aluminium ++', 'Air Berat (Deuterium Vemork)', 'Baja Sedang'],
      deficits: ['Minyak', 'Karet'],
      oilStatus: 'Kritis (Defisit Parah)',
      rubberStatus: 'Kritis (Tergantung Sintetis)'
    },
    keyStrategicBrief: 'Mengendalikan pelabuhan bebas es Narvik untuk ekspor besi Swedia dan cadangan air berat Vemork yang krusial bagi riset bom atom nuklir.'
  },
  {
    id: 'gre',
    tag: 'GRE',
    name: 'Kerajaan Yunani (Greece)',
    englishName: 'Kingdom of Greece',
    flagSymbol: '🏛',
    flagColors: ['#2563eb', '#ffffff'],
    leader: 'Ioannis Metaxas / Raja George II',
    ideology: 'Non-Aligned',
    faction: 'Netral / Pro-Sekutu',
    difficulty: 'Menantang',
    manpower: {
      availablePool: 110000,
      availablePoolDisplay: '110K',
      conscriptionLaw: 'Limited Conscription (2.5%)',
      conscriptionPercent: 2.5,
      totalPopulation: '7.2M',
      monthlyGrowthDisplay: '+1.5K / bulan',
      manpowerRating: 'Sedang'
    },
    factories: {
      total: 15,
      civilian: 10,
      military: 4,
      dockyards: 1,
      consumerGoodsPercent: 30,
      effectiveCivsForBuild: 6,
      industrialStatus: 'Pusat Logistik Maritim Piraeus & Tambang Mineral Mediterania'
    },
    researchSlots: {
      starting: 3,
      maxExpandable: 4,
      keyExpansions: ['National Technical University of Athens (+1 Slot)'],
      startingTechCount: 22
    },
    military: {
      startingDivisions: 14,
      startingAirplanes: 60,
      startingCapitalShips: 1,
      startingScreenShips: 10,
      startingSubmarines: 6,
      recommendedDoctrine: 'Grand Battleplan'
    },
    resources: {
      surplus: ['Chromium +++', 'Aluminium', 'Baja Sedang'],
      deficits: ['Minyak', 'Karet'],
      oilStatus: 'Kritis (Defisit Parah)',
      rubberStatus: 'Kritis (Tergantung Sintetis)'
    },
    keyStrategicBrief: 'Benteng Metaxas Line di perbatasan utara dan pertempuran salju pegunungan Pindus membendung invasi fasis Italia, mencatatkan Hari Penolakan "Ochi Day".'
  },
  {
    id: 'hol',
    tag: 'HOL',
    name: 'Kerajaan Belanda (Netherlands)',
    englishName: 'Kingdom of the Netherlands',
    flagSymbol: '🌷',
    flagColors: ['#ea580c', '#1e3a8a'],
    leader: 'Hendrikus Colijn / Ratu Wilhelmina',
    ideology: 'Democratic',
    faction: 'Netral / Allies (Sekutu)',
    difficulty: 'Sedang',
    manpower: {
      availablePool: 130000,
      availablePoolDisplay: '130K',
      conscriptionLaw: 'Volunteer Only (1.5%)',
      conscriptionPercent: 1.5,
      totalPopulation: '8.6M (+68M Koloni)',
      monthlyGrowthDisplay: '+1.8K / bulan',
      manpowerRating: 'Tinggi'
    },
    factories: {
      total: 28,
      civilian: 20,
      military: 5,
      dockyards: 3,
      consumerGoodsPercent: 25,
      effectiveCivsForBuild: 15,
      industrialStatus: 'Mega Reklamasi Zuiderzee & Raksasa Elektronik Philips Eindhoven'
    },
    researchSlots: {
      starting: 3,
      maxExpandable: 5,
      keyExpansions: ['Delft University of Technology (+1 Slot)', 'Colonial Rubber & Petrochem (+1 Slot)'],
      startingTechCount: 29
    },
    military: {
      startingDivisions: 10,
      startingAirplanes: 80,
      startingCapitalShips: 0,
      startingScreenShips: 8,
      startingSubmarines: 12,
      recommendedDoctrine: 'Grand Battleplan'
    },
    resources: {
      surplus: ['Karet +++++ (Monopoli Hindia Belanda)', 'Minyak +++ (Balikpapan & Palembang)'],
      deficits: ['Baja (Harus impor dari Ruhr/Inggris)'],
      oilStatus: 'Melimpah',
      rubberStatus: 'Monopoli'
    },
    keyStrategicBrief: 'Di Eropa daratan rentan serbuan Blitzkrieg Jerman, namun memiliki garis genangan air Waterlinie dan kekayaan karet/minyak tak tertandingi di koloni Hindia Belanda.'
  },
  {
    id: 'bel',
    tag: 'BEL',
    name: 'Kerajaan Belgia (Belgium)',
    englishName: 'Kingdom of Belgium',
    flagSymbol: '🦁',
    flagColors: ['#eab308', '#dc2626'],
    leader: 'Paul van Zeeland / Raja Leopold III',
    ideology: 'Democratic',
    faction: 'Netral / Allies (Sekutu)',
    difficulty: 'Menantang',
    manpower: {
      availablePool: 125000,
      availablePoolDisplay: '125K',
      conscriptionLaw: 'Limited Conscription (2.5%)',
      conscriptionPercent: 2.5,
      totalPopulation: '8.4M',
      monthlyGrowthDisplay: '+1.7K / bulan',
      manpowerRating: 'Sedang'
    },
    factories: {
      total: 22,
      civilian: 16,
      military: 5,
      dockyards: 1,
      consumerGoodsPercent: 25,
      effectiveCivsForBuild: 12,
      industrialStatus: 'Pusat Senjata FN Herstal Liège & Tambang Uranium Shinkolobwe Kongo'
    },
    researchSlots: {
      starting: 3,
      maxExpandable: 4,
      keyExpansions: ['Free University of Brussels (+1 Slot)'],
      startingTechCount: 28
    },
    military: {
      startingDivisions: 12,
      startingAirplanes: 70,
      startingCapitalShips: 0,
      startingScreenShips: 0,
      startingSubmarines: 0,
      recommendedDoctrine: 'Grand Battleplan / Superior Firepower'
    },
    resources: {
      surplus: ['Baja +++', 'Uranium (Kongo)', 'Karet (Kongo)'],
      deficits: ['Minyak'],
      oilStatus: 'Kritis (Defisit Parah)',
      rubberStatus: 'Cukup'
    },
    keyStrategicBrief: 'Benteng beton bawah tanah Eben-Emael dan divisi elit Chasseurs Ardennais menjaga celah perbatasan. Pasokan uranium dari tambang Shinkolobwe Kongo krusial bagi Manhattan Project.'
  },
  {
    id: 'por',
    tag: 'POR',
    name: 'Republik Portugal',
    englishName: 'Portuguese Republic',
    flagSymbol: '⛵',
    flagColors: ['#15803d', '#dc2626'],
    leader: 'António de Oliveira Salazar (Estado Novo)',
    ideology: 'Non-Aligned',
    faction: 'Netral (Aliansi Anglo-Portugis)',
    difficulty: 'Sedang',
    manpower: {
      availablePool: 110000,
      availablePoolDisplay: '110K',
      conscriptionLaw: 'Limited Conscription (2.5%)',
      conscriptionPercent: 2.5,
      totalPopulation: '7.4M',
      monthlyGrowthDisplay: '+1.6K / bulan',
      manpowerRating: 'Sedang'
    },
    factories: {
      total: 15,
      civilian: 11,
      military: 3,
      dockyards: 1,
      consumerGoodsPercent: 25,
      effectiveCivsForBuild: 8,
      industrialStatus: 'Pabrik Peleburan Wolfram Panasqueira & Pelabuhan Samudra Lisboa'
    },
    researchSlots: {
      starting: 3,
      maxExpandable: 4,
      keyExpansions: ['University of Coimbra Faculty (+1 Slot)'],
      startingTechCount: 23
    },
    military: {
      startingDivisions: 8,
      startingAirplanes: 40,
      startingCapitalShips: 0,
      startingScreenShips: 5,
      startingSubmarines: 3,
      recommendedDoctrine: 'Grand Battleplan'
    },
    resources: {
      surplus: ['Tungsten +++++ (Tambang Wolfram Terbesar Eropa)', 'Baja Sedang'],
      deficits: ['Minyak', 'Karet'],
      oilStatus: 'Kritis (Defisit Parah)',
      rubberStatus: 'Kritis (Tergantung Sintetis)'
    },
    keyStrategicBrief: 'Monopoli bijih tungsten (wolfram) untuk peluru penetrator tank Jerman dan Sekutu. Pangkalan udara Kepulauan Azores menutup celah patroli U-Boat di tengah Atlantik.'
  },
  {
    id: 'bul',
    tag: 'BUL',
    name: 'Kerajaan Bulgaria',
    englishName: 'Kingdom of Bulgaria',
    flagSymbol: '🛡',
    flagColors: ['#15803d', '#dc2626'],
    leader: 'Tsar Boris III',
    ideology: 'Non-Aligned',
    faction: 'Pro-Poros (Axis)',
    difficulty: 'Sedang',
    manpower: {
      availablePool: 90000,
      availablePoolDisplay: '90K',
      conscriptionLaw: 'Disarmed (Perjanjian Neuilly)',
      conscriptionPercent: 1.5,
      totalPopulation: '6.2M',
      monthlyGrowthDisplay: '+1.3K / bulan',
      manpowerRating: 'Sedang'
    },
    factories: {
      total: 14,
      civilian: 10,
      military: 3,
      dockyards: 1,
      consumerGoodsPercent: 25,
      effectiveCivsForBuild: 7,
      industrialStatus: 'Persimpangan Kereta Api Sofia & Tambang Bijih Besi Pernik'
    },
    researchSlots: {
      starting: 3,
      maxExpandable: 4,
      keyExpansions: ['Sofia University St. Kliment Ohridski (+1 Slot)'],
      startingTechCount: 23
    },
    military: {
      startingDivisions: 10,
      startingAirplanes: 50,
      startingCapitalShips: 0,
      startingScreenShips: 2,
      startingSubmarines: 0,
      recommendedDoctrine: 'Grand Battleplan'
    },
    resources: {
      surplus: ['Chromium ++', 'Baja Sedang', 'Aluminium'],
      deficits: ['Minyak', 'Karet'],
      oilStatus: 'Kritis (Defisit Parah)',
      rubberStatus: 'Kritis (Tergantung Sintetis)'
    },
    keyStrategicBrief: 'Dikenal sebagai "Prusia dari Balkan" dengan tradisi militer disiplin tinggi. Merebut kembali Dobrudja Selatan dari Rumania dan Thrace Barat tanpa pertumpahan darah.'
  },
  {
    id: 'den',
    tag: 'DEN',
    name: 'Kerajaan Denmark',
    englishName: 'Kingdom of Denmark',
    flagSymbol: '👑',
    flagColors: ['#dc2626', '#ffffff'],
    leader: 'Thorvald Stauning / Raja Christian X',
    ideology: 'Democratic',
    faction: 'Netral',
    difficulty: 'Ahli',
    manpower: {
      availablePool: 55000,
      availablePoolDisplay: '55K',
      conscriptionLaw: 'Volunteer Only (1.5%)',
      conscriptionPercent: 1.5,
      totalPopulation: '3.8M',
      monthlyGrowthDisplay: '+800 / bulan',
      manpowerRating: 'Kritis'
    },
    factories: {
      total: 12,
      civilian: 9,
      military: 2,
      dockyards: 1,
      consumerGoodsPercent: 30,
      effectiveCivsForBuild: 6,
      industrialStatus: 'Pusat Ekspor Pangan Pertanian & Galangan Kapal Burmeister & Wain'
    },
    researchSlots: {
      starting: 3,
      maxExpandable: 4,
      keyExpansions: ['Niels Bohr Institute of Physics (+1 Slot)'],
      startingTechCount: 26
    },
    military: {
      startingDivisions: 4,
      startingAirplanes: 30,
      startingCapitalShips: 1,
      startingScreenShips: 4,
      startingSubmarines: 8,
      recommendedDoctrine: 'Grand Battleplan'
    },
    resources: {
      surplus: ['Bahan Pangan (Surplus Besar)', 'Baja Ringan'],
      deficits: ['Minyak', 'Karet', 'Logam Berat'],
      oilStatus: 'Kritis (Defisit Parah)',
      rubberStatus: 'Kritis (Tergantung Sintetis)'
    },
    keyStrategicBrief: 'Menguasai Selat Denmark (Øresund dan Kattegat) gerbang keluar masuk Laut Baltik. Memiliki Institut Fisika Teoretis Niels Bohr yang ternama di Kopenhagen.'
  },
  {
    id: 'swi',
    tag: 'SWI',
    name: 'Konfederasi Swiss (Switzerland)',
    englishName: 'Swiss Confederation',
    flagSymbol: '🏔',
    flagColors: ['#dc2626', '#ffffff'],
    leader: 'Federal Council (Dewan Federal Swiss)',
    ideology: 'Democratic',
    faction: 'Netralitas Bersenjata Abadi',
    difficulty: 'Sedang',
    manpower: {
      availablePool: 125000,
      availablePoolDisplay: '125K',
      conscriptionLaw: 'Militia Conscription (Milisi Rakyat)',
      conscriptionPercent: 3.0,
      totalPopulation: '4.2M',
      monthlyGrowthDisplay: '+900 / bulan',
      manpowerRating: 'Tinggi'
    },
    factories: {
      total: 16,
      civilian: 12,
      military: 4,
      dockyards: 0,
      consumerGoodsPercent: 20,
      effectiveCivsForBuild: 9,
      industrialStatus: 'Pusat Perbankan Zurich & Pabrik Presisi Jam Mesin Oerlikon / SIG'
    },
    researchSlots: {
      starting: 3,
      maxExpandable: 5,
      keyExpansions: ['ETH Zurich Technical University (+1 Slot)', 'Oerlikon Armaments Engineering (+1 Slot)'],
      startingTechCount: 29
    },
    military: {
      startingDivisions: 8,
      startingAirplanes: 50,
      startingCapitalShips: 0,
      startingScreenShips: 0,
      startingSubmarines: 0,
      recommendedDoctrine: 'Grand Battleplan'
    },
    resources: {
      surplus: ['Aluminium ++', 'Presisi Logam', 'Baja Sedang'],
      deficits: ['Minyak', 'Karet'],
      oilStatus: 'Kritis (Defisit Parah)',
      rubberStatus: 'Kritis (Tergantung Sintetis)'
    },
    keyStrategicBrief: 'Benteng pertahanan terpadu Alpen "National Redoubt" dengan meriam anti-udara Oerlikon 20mm dan terowongan peledak rel membuat invasi Jerman (Operasi Tannenbaum) terlalu mahal.'
  },
  {
    id: 'aus',
    tag: 'AUS',
    name: 'Republik Austria (Österreich)',
    englishName: 'Republic of Austria',
    flagSymbol: '🦅',
    flagColors: ['#dc2626', '#ffffff'],
    leader: 'Kurt Schuschnigg (Fatherland Front)',
    ideology: 'Non-Aligned',
    faction: 'Mandiri / Target Anschluss',
    difficulty: 'Ahli',
    manpower: {
      availablePool: 90000,
      availablePoolDisplay: '90K',
      conscriptionLaw: 'Volunteer Only (1.5%)',
      conscriptionPercent: 1.5,
      totalPopulation: '6.8M',
      monthlyGrowthDisplay: '+1.4K / bulan',
      manpowerRating: 'Sedang'
    },
    factories: {
      total: 16,
      civilian: 11,
      military: 4,
      dockyards: 1,
      consumerGoodsPercent: 25,
      effectiveCivsForBuild: 8,
      industrialStatus: 'Pusat Mesin Steyr-Daimler-Puch & Tambang Besi Erzberg Styria'
    },
    researchSlots: {
      starting: 3,
      maxExpandable: 4,
      keyExpansions: ['University of Vienna Academic Research (+1 Slot)'],
      startingTechCount: 27
    },
    military: {
      startingDivisions: 8,
      startingAirplanes: 40,
      startingCapitalShips: 0,
      startingScreenShips: 0,
      startingSubmarines: 0,
      recommendedDoctrine: 'Grand Battleplan'
    },
    resources: {
      surplus: ['Baja +++', 'Aluminium', 'Minyak (Zistersdorf cadangan awal)'],
      deficits: ['Karet'],
      oilStatus: 'Cukup',
      rubberStatus: 'Kritis (Tergantung Sintetis)'
    },
    keyStrategicBrief: 'Menjadi sasaran utama pencaplokan damai Hitler (Anschluss Maret 1938). Pemain yang memilih melawan Jerman dapat membangun benteng Alpen dan menghidupkan kembali monarki Habsburg.'
  }
];
