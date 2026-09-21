import { EuropeMapCountry } from '../types';

export interface ResourceInfo {
  key: 'oil' | 'steel' | 'aluminium' | 'tungsten' | 'chromium' | 'rubber';
  name: string;
  unit: string;
  color: string;
  icon: string;
  description: string;
  militaryImportance: string;
}

export const STRATEGIC_RESOURCES_INFO: Record<string, ResourceInfo> = {
  oil: {
    key: 'oil',
    name: 'Minyak (Oil & Fuel)',
    unit: 'Barel / Hari',
    color: '#eab308',
    icon: '🛢️',
    description: 'Bahan baku utama produksi Bahan Bakar (Fuel) untuk tank, pesawat udara, truk logistik, dan kapal perang.',
    militaryImportance: 'Kritis! Tanpa minyak, mesin tempur lapis baja kehilangan 90% kecepatan dan efektivitas tembakan.'
  },
  steel: {
    key: 'steel',
    name: 'Baja (Steel)',
    unit: 'Ton',
    color: '#94a3b8',
    icon: '⚙️',
    description: 'Bahan paling krusial dalam HOI4, dibutuhkan untuk senapan, artileri, tank, kapal, dan kereta api.',
    militaryImportance: 'Tanpa baja cukup, pabrik militer mengalami penalti kecepatan produksi drastis hingga -75%.'
  },
  aluminium: {
    key: 'aluminium',
    name: 'Aluminium (Bauxite)',
    unit: 'Ton',
    color: '#38bdf8',
    icon: '✈️',
    description: 'Bahan dasar perakitan seluruh jenis pesawat terbang: Fighter, CAS, Nav Bomber, dan Transport Planes.',
    militaryImportance: 'Vital bagi supremasi udara (Air Superiority). Jerman dan Sekutu bersaing memperebutkan bauksit Prancis & Hungaria.'
  },
  tungsten: {
    key: 'tungsten',
    name: 'Wolfram (Tungsten)',
    unit: 'Ton',
    color: '#f97316',
    icon: '🔩',
    description: 'Logam sangat keras untuk amunisi penetrasi penembus lapis baja (AP), artileri medan, dan tank menengah/berat.',
    militaryImportance: 'Diperlukan untuk memproduksi peluru kanon tank dan meriam artileri agar mampu menembus armor musuh.'
  },
  chromium: {
    key: 'chromium',
    name: 'Kromium (Chromium)',
    unit: 'Ton',
    color: '#a855f7',
    icon: '💎',
    description: 'Logam tahan karat untuk lambung kapal perang besar (Battleships/Cruisers) dan sasis tank modern berat.',
    militaryImportance: 'Turki adalah pemasok kromium terbesar di Eropa; menjadi incaran diplomasi Poros dan Sekutu.'
  },
  rubber: {
    key: 'rubber',
    name: 'Karet (Rubber)',
    unit: 'Ton',
    color: '#22c55e',
    icon: '🌿',
    description: 'Bahan pembuatan ban truk motorized, roda pendarat pesawat terbang, dan traktor artileri.',
    militaryImportance: 'Eropa tidak memiliki cadangan karet alam. Jerman wajib membangun Synthetic Refineries atau mengimpor dari Asia Tenggara.'
  }
};

export const EUROPE_MAP_COUNTRIES: EuropeMapCountry[] = [
  // 1. JERMAN (GERMAN REICH)
  {
    id: 'ger',
    tag: 'GER',
    name: 'Jerman (German Reich)',
    nativeName: 'Deutsches Reich',
    capital: 'Berlin',
    faction: 'Axis',
    ideology: 'Fascism',
    flagSymbol: '✠',
    flagColors: ['#1e293b', '#b91c1c'],
    // Germany mainland polygon
    pathD: 'M 400 280 L 440 250 L 475 255 L 485 270 L 515 275 L 535 295 L 525 325 L 505 345 L 475 350 L 460 375 L 435 375 L 415 365 L 400 370 L 385 345 L 390 310 Z',
    // East Prussia (Ostpreußen) detached exclave
    secondaryPathsD: [
      'M 565 245 L 610 240 L 615 265 L 580 275 L 565 255 Z'
    ],
    labelPos: { x: 450, y: 310 },
    capitalPos: { x: 470, y: 295 },
    resources: { oil: 12, steel: 198, aluminium: 42, tungsten: 18, chromium: 8, rubber: 0 },
    startingFactories: { civs: 31, mils: 28, docks: 10 },
    keyFocusSummary: 'Ekspansi Kilat Rhineland -> Anschluss -> Sudetenland -> Danzig or War, didukung Rencana Empat Tahun.',
    majorFocusPaths: [
      'Fasis Historis: Rhineland -> Anschluss -> Reassert Eastern Claims -> Danzig or War',
      'Ekonomi Autarki: Four Year Plan -> Autarky -> Hermann Göring-Werke -> Extra Research Slot',
      'Alternatif Monarki: Oppose Hitler -> Revive the Kaiserreich -> Central Powers Aliansi'
    ],
    historicalEvents1936_1945: [
      '1936: Remiliterisasi Rhineland tanpa perlawanan Sekutu.',
      '1938: Anschluss aneksasi Austria damai & Perjanjian Munich (Sudetenland).',
      '1939: Invasi Polandia (1 September) memicu meletusnya Perang Dunia II.',
      '1940: Fall Gelb melumpuhkan Prancis dalam 6 pekan melalui Ardennes.',
      '1941: Operasi Barbarossa menyerbu Uni Soviet dengan 3 juta tentara Poros.'
    ],
    claimsOrExpansionVectors: [
      { toId: 'aus', label: 'Anschluss (1938)', x1: 460, y1: 360, x2: 465, y2: 395 },
      { toId: 'cze', label: 'Sudetenland (1938)', x1: 490, y1: 335, x2: 520, y2: 345 },
      { toId: 'pol', label: 'Danzig or War (1939)', x1: 520, y1: 290, x2: 560, y2: 300 },
      { toId: 'fra', label: 'Around Maginot (1940)', x1: 395, y1: 320, x2: 350, y2: 350 },
      { toId: 'sov', label: 'Op. Barbarossa (1941)', x1: 535, y1: 295, x2: 670, y2: 290 }
    ]
  },

  // 2. UNI SOVIET (USSR)
  {
    id: 'sov',
    tag: 'SOV',
    name: 'Uni Soviet (USSR)',
    nativeName: 'SSSR / Soviet Union',
    capital: 'Moskow',
    faction: 'Comintern',
    ideology: 'Communism',
    flagSymbol: '☭',
    flagColors: ['#991b1b', '#d97706'],
    // Expansive Eastern European / Eurasian flank
    pathD: 'M 640 130 L 685 100 L 750 90 L 830 80 L 920 85 L 940 180 L 960 290 L 950 410 L 880 440 L 840 430 L 820 460 L 760 445 L 725 450 L 720 420 L 670 410 L 640 375 L 635 340 L 645 285 L 630 240 L 620 180 Z',
    // Crimea peninsula
    secondaryPathsD: [
      'M 715 448 L 735 448 L 740 468 L 720 472 Z'
    ],
    labelPos: { x: 770, y: 240 },
    capitalPos: { x: 760, y: 220 },
    resources: { oil: 240, steel: 165, aluminium: 78, tungsten: 36, chromium: 95, rubber: 0 },
    startingFactories: { civs: 42, mils: 24, docks: 6 },
    keyFocusSummary: 'Pembersihan Internal Stalin (The Great Purge) -> Rencana Lima Tahun -> Perang Patriotik Akbar.',
    majorFocusPaths: [
      'Marxisme-Leninisme: The Center (Stalin) -> The Great Purge -> Lessons of War',
      'Industri Berat: Heavy Industry -> Shift Work -> Relocate Industry to the Urals',
      'Ekspansi Militer: Claims on Poland -> Secure the Baltic -> Claims on Bessarabia'
    ],
    historicalEvents1936_1945: [
      '1936-1938: The Great Purge membersihkan ratusan perwira tinggi militer.',
      '1939: Pakta Molotov-Ribbentrop membagi Polandia; Perang Musim Dingin Finlandia.',
      '1940: Aneksasi Estonia, Latvia, Lithuania, dan Bessarabia Rumania.',
      '1941: Bertahan hidup dari Operasi Barbarossa Jerman; Pertempuran Moskow.',
      '1942-1943: Kemenangan Stalingrad dan Kursk membalikkan arus perang.'
    ],
    claimsOrExpansionVectors: [
      { toId: 'fin', label: 'Winter War (1939)', x1: 640, y1: 170, x2: 620, y2: 150 },
      { toId: 'pol', label: 'Eastern Poland (1939)', x1: 640, y1: 310, x2: 590, y2: 315 },
      { toId: 'rom', label: 'Bessarabia (1940)', x1: 670, y1: 410, x2: 635, y2: 420 }
    ]
  },

  // 3. INGGRIS RAYA (UNITED KINGDOM)
  {
    id: 'eng',
    tag: 'ENG',
    name: 'Inggris Raya (United Kingdom)',
    nativeName: 'Great Britain',
    capital: 'London',
    faction: 'Allies',
    ideology: 'Democratic',
    flagSymbol: '♚',
    flagColors: ['#1e3a8a', '#991b1b'],
    // Great Britain Island (Scotland, England, Wales)
    pathD: 'M 295 140 L 320 160 L 330 200 L 315 220 L 335 250 L 350 280 L 330 295 L 290 290 L 285 270 L 305 240 L 280 200 L 285 160 Z',
    // Northern Ireland
    secondaryPathsD: [
      'M 255 195 L 275 195 L 270 215 L 250 210 Z'
    ],
    labelPos: { x: 315, y: 235 },
    capitalPos: { x: 332, y: 278 },
    resources: { oil: 8, steel: 85, aluminium: 24, tungsten: 6, chromium: 0, rubber: 4 },
    startingFactories: { civs: 35, mils: 16, docks: 19 },
    keyFocusSummary: 'Persenjataan Ulang (Rearmament) -> Pertahanan Udara Radar -> Koalisi Churchill -> Amankan Koloni Samudra.',
    majorFocusPaths: [
      'Persenjataan Ulang: Limited Rearmament -> Shadow Industry -> General Rearmament',
      'Pertahanan Udara & Radar: Air Defense -> Radar Stations -> Spitfire Production',
      'Aliansi Persemakmuran: Empire Defense -> Tizard Mission -> War Committee'
    ],
    historicalEvents1936_1945: [
      '1936: Krisis Turun Takhta Raja Edward VIII digantikan George VI.',
      '1938: Deklarasi "Peace for our time" oleh Chamberlain di Munich.',
      '1940: Winston Churchill menjadi Perdana Menteri; Pertempuran Britania (Battle of Britain).',
      '1940-1944: Kampanye Afrika Utara memotong jalur Axis ke Terusan Suez.',
      '1944: Peluncuran Operasi Overlord (D-Day) di pantai Normandia bersama Sekutu.'
    ],
    claimsOrExpansionVectors: [
      { toId: 'fra', label: 'BEF Expeditionary (1939)', x1: 330, y1: 290, x2: 330, y2: 340 }
    ]
  },

  // 4. PRANCIS (FRENCH REPUBLIC)
  {
    id: 'fra',
    tag: 'FRA',
    name: 'Prancis (French Republic)',
    nativeName: 'République Française',
    capital: 'Paris',
    faction: 'Allies',
    ideology: 'Democratic',
    flagSymbol: '⚑',
    flagColors: ['#1d4ed8', '#dc2626'],
    // France mainland hex-like polygon
    pathD: 'M 315 320 L 355 315 L 385 345 L 400 370 L 385 415 L 390 445 L 340 455 L 295 440 L 290 390 L 305 350 Z',
    // Corsica
    secondaryPathsD: [
      'M 425 455 L 435 455 L 433 480 L 423 480 Z'
    ],
    labelPos: { x: 345, y: 380 },
    capitalPos: { x: 345, y: 350 },
    resources: { oil: 2, steel: 110, aluminium: 68, tungsten: 8, chromium: 4, rubber: 0 },
    startingFactories: { civs: 33, mils: 8, docks: 10 },
    keyFocusSummary: 'Revitalisasi Politik (Front Populaire) -> Reformasi Militer -> Perpanjang Garis Maginot -> Little Entente.',
    majorFocusPaths: [
      'Politik Demokratik: Devalue the Franc -> Form Popular Front -> Strengthen Government',
      'Pertahanan Benteng: Extend the Maginot Line -> Alpine Forts -> Defensive Focus',
      'Alternatif Aliansi: Little Entente (Bersama Ceko, Yugoslavia & Rumania)'
    ],
    historicalEvents1936_1945: [
      '1936: Kemenangan Front Populaire Léon Blum; undang-undang kerja 40 jam.',
      '1938: Terikat garansi kemerdekaan Cekoslowakia tapi terpaksa tunduk di Munich.',
      '1940: Garis Maginot dilewati Jerman melalui Hutan Ardennes; jatuhnya Paris; lahirnya Prancis Vichy.',
      '1944: Pembebasan Paris oleh Pasukan Prancis Merdeka (De Gaulle) dan Sekutu.'
    ],
    claimsOrExpansionVectors: [
      { toId: 'bel', label: 'Maginot Extension', x1: 360, y1: 330, x2: 375, y2: 320 }
    ]
  },

  // 5. ITALIA (KINGDOM OF ITALY)
  {
    id: 'ita',
    tag: 'ITA',
    name: 'Italia (Kingdom of Italy)',
    nativeName: 'Regno d\'Italia',
    capital: 'Roma',
    faction: 'Axis',
    ideology: 'Fascism',
    flagSymbol: '⚜',
    flagColors: ['#15803d', '#b91c1c'],
    // Boot shape mainland
    pathD: 'M 390 410 L 435 395 L 465 410 L 450 435 L 470 470 L 490 495 L 515 505 L 500 525 L 470 505 L 450 480 L 430 450 L 410 435 Z',
    // Sicily & Sardinia
    secondaryPathsD: [
      // Sicily
      'M 470 535 L 495 530 L 490 550 L 465 545 Z',
      // Sardinia
      'M 405 465 L 418 465 L 415 495 L 402 495 Z'
    ],
    labelPos: { x: 450, y: 460 },
    capitalPos: { x: 448, y: 465 },
    resources: { oil: 1, steel: 48, aluminium: 32, tungsten: 2, chromium: 6, rubber: 0 },
    startingFactories: { civs: 21, mils: 19, docks: 11 },
    keyFocusSummary: 'Kemenangan di Afrika -> Pakta Baja (Pact of Steel) -> Mare Nostrum (Kuasai Laut Tengah).',
    majorFocusPaths: [
      'Ekspansi Fasis: Triumph in Africa -> Pact of Steel -> Claims on Yugoslavia -> Mare Nostrum',
      'Modernisasi Industri: Industrial Development -> Highway of the Sun -> Regia Aeronautica',
      'Alternatif Monarki: Depose Mussolini -> Restore King Victor Emmanuel -> Stresa Front'
    ],
    historicalEvents1936_1945: [
      '1936: Aneksasi Kekaisaran Ethiopia (Perang Abisinia Kedua).',
      '1939: Aneksasi Albania tanpa perlawanan; penandatanganan Pakta Baja dengan Jerman.',
      '1940: Deklarasi perang melawan Sekutu; invasi gagal ke Yunani dan Mesir.',
      '1943: Invasi Sisilia oleh Sekutu; Grand Council of Fascism menggulingkan Mussolini.'
    ],
    claimsOrExpansionVectors: [
      { toId: 'alb', label: 'Annex Albania (1939)', x1: 490, y1: 490, x2: 540, y2: 505 },
      { toId: 'gre', label: 'War with Greece (1940)', x1: 505, y1: 515, x2: 575, y2: 545 }
    ]
  },

  // 6. POLANDIA (POLAND)
  {
    id: 'pol',
    tag: 'POL',
    name: 'Polandia (Republic of Poland)',
    nativeName: 'Rzeczpospolita Polska',
    capital: 'Warsawa',
    faction: 'Neutral',
    ideology: 'Non-Aligned',
    flagSymbol: '🦅',
    flagColors: ['#dc2626', '#f8fafc'],
    pathD: 'M 525 295 L 565 275 L 610 270 L 635 285 L 640 335 L 605 355 L 555 355 L 530 330 Z',
    labelPos: { x: 575, y: 315 },
    capitalPos: { x: 580, y: 305 },
    resources: { oil: 4, steel: 46, aluminium: 14, tungsten: 0, chromium: 2, rubber: 0 },
    startingFactories: { civs: 15, mils: 9, docks: 2 },
    keyFocusSummary: 'Sanacja Bersatu -> Centralny Okręg Przemysłowy (Industri COP) -> Benteng Antara Dua Raksasa.',
    majorFocusPaths: [
      'Sanacja Pemerintahan: Four Year Plan -> COP Development -> Defend the Fatherland',
      'Alternatif Miedzymorze: Seek Allies -> Baltic Alliance -> Form Intermarium (Aliansi Laut Hitam-Baltik)',
      'Konsesi Wilayah: Cede Danzig to Avoid War vs Fight to the Death'
    ],
    historicalEvents1936_1945: [
      '1936-1938: Pembangunan Zona Industri Pusat (COP) untuk mengamankan pabrik senjata.',
      '1939 (Maret): Inggris dan Prancis memberikan jaminan kemerdekaan militer.',
      '1939 (1 Sept): Diserang Wehrmacht Jerman dari barat dan Tentara Merah Soviet dari timur.'
    ]
  },

  // 7. RUMANIA (KINGDOM OF ROMANIA)
  {
    id: 'rom',
    tag: 'ROM',
    name: 'Rumania (Kingdom of Romania)',
    nativeName: 'Regatul României',
    capital: 'Bukares',
    faction: 'Neutral',
    ideology: 'Non-Aligned',
    flagSymbol: '👑',
    flagColors: ['#1d4ed8', '#eab308'],
    pathD: 'M 590 395 L 640 390 L 675 410 L 670 445 L 640 450 L 605 440 L 590 415 Z',
    labelPos: { x: 630, y: 420 },
    capitalPos: { x: 635, y: 430 },
    // Rich Oil hub (Ploiesti Oilfields)
    resources: { oil: 82, steel: 22, aluminium: 16, tungsten: 4, chromium: 12, rubber: 0 },
    startingFactories: { civs: 14, mils: 7, docks: 1 },
    keyFocusSummary: 'Emas Hitam Ladang Minyak Ploiesti -> Pilihan Poros / Little Entente -> Pertahankan Transilvania.',
    majorFocusPaths: [
      'Kemitraan Poros: Join the Axis -> Oil Concessions for German Arms -> Anti-Soviet Crusade',
      'King Carol II: Flexible Foreign Policy -> Expand Ploiesti Oilfields -> Preserve Greater Romania'
    ],
    historicalEvents1936_1945: [
      'Ploiesti adalah ladang minyak terbesar di daratan Eropa yang menyuplai 60%+ bahan bakar Wehrmacht.',
      '1940: Dipaksa menyerahkan Bessarabia ke Uni Soviet dan Transilvania Utara ke Hungaria.',
      '1941: Jenderal Ion Antonescu memimpin pasukan Rumania menyerbu Soviet bersama Axis.'
    ]
  },

  // 8. SPANYOL (SPAIN)
  {
    id: 'spa',
    tag: 'SPA',
    name: 'Spanyol (Spain)',
    nativeName: 'España',
    capital: 'Madrid',
    faction: 'Neutral',
    ideology: 'Non-Aligned',
    flagSymbol: '🐂',
    flagColors: ['#dc2626', '#eab308'],
    pathD: 'M 175 470 L 225 460 L 285 455 L 295 480 L 285 545 L 245 570 L 195 565 L 180 520 L 165 490 Z',
    labelPos: { x: 230, y: 510 },
    capitalPos: { x: 235, y: 505 },
    // Wolfram rich
    resources: { oil: 0, steel: 36, aluminium: 8, tungsten: 34, chromium: 6, rubber: 0 },
    startingFactories: { civs: 14, mils: 6, docks: 3 },
    keyFocusSummary: 'Perang Saudara Spanyol 1936 (Nasionalis Franco vs Republikan) -> Pemulihan & Ekspor Wolfram.',
    majorFocusPaths: [
      'Nasionalis Franco: Save the Republic -> Falangism -> Join the Axis / Stay Neutral',
      'Republikan Komunis: Anti-Fascist Workers -> Soviet Aid -> Expand Popular Front'
    ],
    historicalEvents1936_1945: [
      '1936 (Juli): Kudeta militer meletuskan Perang Saudara Spanyol berdarah.',
      'Menjadi panggung uji coba doktrin tank dan pesawat Jerman (Legion Condor) & Soviet.',
      '1939: Jenderal Franco memenangkan perang dan memilih netral di PD II sambil mengekspor wolfram ke Poros.'
    ]
  },

  // 9. SWEDIA (SWEDEN)
  {
    id: 'swe',
    tag: 'SWE',
    name: 'Swedia (Sweden)',
    nativeName: 'Sverige',
    capital: 'Stockholm',
    faction: 'Neutral',
    ideology: 'Democratic',
    flagSymbol: '⚔',
    flagColors: ['#1d4ed8', '#eab308'],
    pathD: 'M 505 105 L 530 85 L 545 125 L 555 170 L 535 225 L 505 235 L 490 200 L 515 150 Z',
    labelPos: { x: 525, y: 160 },
    capitalPos: { x: 535, y: 195 },
    // Iron ore rich (Kiruna Mines)
    resources: { oil: 0, steel: 125, aluminium: 10, tungsten: 22, chromium: 8, rubber: 0 },
    startingFactories: { civs: 16, mils: 5, docks: 3 },
    keyFocusSummary: 'Netralitas Bersenjata -> Tambang Besi Kiruna -> Ekspor Baja ke Jerman & Sekutu.',
    majorFocusPaths: [
      'Netralitas Demokratik: Folkhemmet -> Armed Neutrality -> Bofors & Scania Industrialization',
      'Intervensi Nordik: Help Finland in Winter War -> Nordic Defense Council'
    ],
    historicalEvents1936_1945: [
      'Bijih besi Kiruna di Swedia utara sangat penting bagi pabrik senjata Krupp di Jerman.',
      'Menjaga status netral bersenjata dan menjadi jalur pengungsian bagi ribuan orang dari Denmark & Norwegia.'
    ]
  },

  // 10. TURKI (TURKEY)
  {
    id: 'tur',
    tag: 'TUR',
    name: 'Turki (Republic of Turkey)',
    nativeName: 'Türkiye Cumhuriyeti',
    capital: 'Ankara',
    faction: 'Neutral',
    ideology: 'Non-Aligned',
    flagSymbol: '☪',
    flagColors: ['#dc2626', '#ffffff'],
    pathD: 'M 685 470 L 740 460 L 830 465 L 850 510 L 800 535 L 720 530 L 685 500 Z',
    labelPos: { x: 760, y: 495 },
    capitalPos: { x: 765, y: 485 },
    // World Chromium capital
    resources: { oil: 1, steel: 18, aluminium: 6, tungsten: 4, chromium: 88, rubber: 0 },
    startingFactories: { civs: 13, mils: 5, docks: 2 },
    keyFocusSummary: 'Warisan Atatürk & İnönü -> Kendalikan Selat Bosphorus -> Monopoli Ekspor Kromium.',
    majorFocusPaths: [
      'Kemalisme: Montreux Convention -> Five Year Plan -> Balance Poros & Allies Diplomacy',
      'Utsmaniyah Alternatif: Pivot to the Past -> Revive the Sultanate -> Reclaim Middle East'
    ],
    historicalEvents1936_1945: [
      '1936: Konvensi Montreux mengembalikan kendali militer Selat Dardanella dan Bosphorus ke Turki.',
      '1938: Wafatnya Mustafa Kemal Atatürk digantikan oleh İsmet İnönü.',
      'Mempertahankan netralitas ketat sambil menjual kromium ke kedua pihak yang berperang.'
    ]
  },

  // 11. YUGOSLAVIA
  {
    id: 'yug',
    tag: 'YUG',
    name: 'Kerajaan Yugoslavia',
    nativeName: 'Kraljevina Jugoslavija',
    capital: 'Beograd',
    faction: 'Neutral',
    ideology: 'Non-Aligned',
    flagSymbol: '⚔',
    flagColors: ['#2563eb', '#dc2626'],
    pathD: 'M 495 425 L 540 415 L 580 435 L 570 480 L 535 485 L 500 455 Z',
    labelPos: { x: 535, y: 450 },
    capitalPos: { x: 545, y: 440 },
    resources: { oil: 1, steel: 28, aluminium: 44, tungsten: 0, chromium: 26, rubber: 0 },
    startingFactories: { civs: 13, mils: 6, docks: 1 },
    keyFocusSummary: 'Kekacauan Multietnis -> Evolusi Industri -> Kudeta Militer Anti-Axis 1941.',
    majorFocusPaths: [
      'Stabilitas Kerajaan: Western Focus / Axis Alignment -> Industrial Development',
      'Gerakan Partisan: Tito\'s Partisans vs Draža Mihailović Chetniks'
    ],
    historicalEvents1936_1945: [
      '1941: Kudeta militer menggulingkan pangeran Paul setelah menandatangani Pakta Poros.',
      'Invasi Operasi 25 Jerman dan Italia menaklukkan Yugoslavia dalam 11 hari.',
      'Partisan komunis Josip Broz Tito mengobarkan perang gerilya paling sukses di Eropa.'
    ]
  },

  // 12. CEKOSLOWAKIA (CZECHOSLOVAKIA)
  {
    id: 'cze',
    tag: 'CZE',
    name: 'Republik Cekoslowakia',
    nativeName: 'Československá republika',
    capital: 'Praha',
    faction: 'Neutral',
    ideology: 'Democratic',
    flagSymbol: '🏰',
    flagColors: ['#2563eb', '#dc2626'],
    pathD: 'M 485 345 L 535 330 L 585 345 L 580 370 L 535 365 L 485 365 Z',
    labelPos: { x: 535, y: 350 },
    capitalPos: { x: 505, y: 350 },
    resources: { oil: 0, steel: 38, aluminium: 12, tungsten: 6, chromium: 2, rubber: 0 },
    startingFactories: { civs: 14, mils: 11, docks: 0 },
    keyFocusSummary: 'Benteng Perbatasan Sudetenland (Level 7) -> Pabrik Senjata Škoda -> Bertahan atau Pasrah.',
    majorFocusPaths: [
      'Benteng Tak Tertembus: Sudeten Fortifications -> Škoda Works Expansion -> Trust in the West',
      'Aliansi Mandiri: Little Entente -> Defend Bohemia to the Last Man'
    ],
    historicalEvents1936_1945: [
      'Memiliki benteng perbatasan terkuat di Eropa dan persenjataan paling modern (pabrik senjata Škoda).',
      '1938: Dikhianati Sekutu dalam Perjanjian Munich dan dipaksa menyerahkan Sudetenland ke Jerman.',
      '1939: Dinamai Protektorat Bohemia dan Moravia di bawah pendudukan Wehrmacht.'
    ]
  },

  // 13. HUNGARIA (HUNGARY)
  {
    id: 'hun',
    tag: 'HUN',
    name: 'Kerajaan Hungaria (Hungary)',
    nativeName: 'Magyar Királyság',
    capital: 'Budapest',
    faction: 'Neutral',
    ideology: 'Non-Aligned',
    flagSymbol: '🛡',
    flagColors: ['#15803d', '#dc2626'],
    pathD: 'M 535 375 L 580 375 L 585 410 L 535 415 Z',
    labelPos: { x: 560, y: 395 },
    capitalPos: { x: 555, y: 390 },
    // Bauxite rich
    resources: { oil: 6, steel: 16, aluminium: 58, tungsten: 0, chromium: 0, rubber: 0 },
    startingFactories: { civs: 10, mils: 5, docks: 0 },
    keyFocusSummary: 'Perjanjian Bled -> Klaim Revisi Wilayah Trianon -> Restorasi Habsburg atau Aliansi Poros.',
    majorFocusPaths: [
      'Aliansi Poros: Join the Axis -> First Vienna Award (Slovakia Selatan) -> Second Vienna Award (Transilvania)',
      'Restorasi Austro-Hungaria: Elect a King -> Restore the Austro-Hungarian Empire (Otto von Habsburg)'
    ],
    historicalEvents1936_1945: [
      'Dipimpin oleh Laksamana Miklós Horthy sebagai bupati kerajaan tanpa raja.',
      'Memiliki cadangan bauksit (aluminium) melimpah untuk industri dirgantara pesawat terbang.'
    ]
  },

  // 14. FINLANDIA (FINLAND)
  {
    id: 'fin',
    tag: 'FIN',
    name: 'Republik Finlandia (Finland)',
    nativeName: 'Suomi',
    capital: 'Helsinki',
    faction: 'Neutral',
    ideology: 'Democratic',
    flagSymbol: '❄',
    flagColors: ['#1d4ed8', '#f8fafc'],
    pathD: 'M 585 75 L 635 60 L 640 140 L 625 185 L 595 180 L 585 130 Z',
    labelPos: { x: 610, y: 125 },
    capitalPos: { x: 605, y: 175 },
    resources: { oil: 0, steel: 14, aluminium: 6, tungsten: 8, chromium: 14, rubber: 0 },
    startingFactories: { civs: 8, mils: 4, docks: 1 },
    keyFocusSummary: 'Semangat Sisu -> Garis Pertahanan Mannerheim -> Perang Musim Dingin (Talvisota).',
    majorFocusPaths: [
      'Pertahanan Mandiri: Enhance Mannerheim Line -> The Spirit of Winter War -> Sisu buff',
      'Perang Kelanjutan: Continuation War with Germany to Reclaim Karelia'
    ],
    historicalEvents1936_1945: [
      '1939-1940: Perang Musim Dingin (Winter War) melawan invasi Tentara Merah Soviet.',
      'Menerapkan taktik Motti dan pasukan ski bersenjata senapan Suomi KP/-31 membantai divisi Soviet.'
    ]
  },

  // 15. NORWEGIA (NORWAY)
  {
    id: 'nor',
    tag: 'NOR',
    name: 'Kerajaan Norwegia (Norway)',
    nativeName: 'Norge',
    capital: 'Oslo',
    faction: 'Neutral',
    ideology: 'Democratic',
    flagSymbol: '⚓',
    flagColors: ['#dc2626', '#1d4ed8'],
    pathD: 'M 455 70 L 495 50 L 525 80 L 500 135 L 485 190 L 460 160 L 450 110 Z',
    labelPos: { x: 475, y: 120 },
    capitalPos: { x: 478, y: 175 },
    resources: { oil: 0, steel: 12, aluminium: 22, tungsten: 6, chromium: 8, rubber: 0 },
    startingFactories: { civs: 9, mils: 2, docks: 2 },
    keyFocusSummary: 'Pabrik Air Berat (Heavy Water Vemork) -> Pelabuhan Narvik untuk Bijih Besi Swedia.',
    majorFocusPaths: [
      'Netralitas Pertahanan: Coastal Defense -> Broken Gun Policy Reform -> Stand with the King',
      'Pemerintahan di Pengasingan: Escape to London with Royal Navy & Merchant Fleet'
    ],
    historicalEvents1936_1945: [
      '1940: Diserang Jerman dalam Operasi Weserübung untuk mengamankan rute bijih besi Narvik.',
      'Pabrik Norsk Hydro di Vemork memproduksi air berat (heavy water) untuk program nuklir Jerman.'
    ]
  },

  // 16. BELANDA & BELGIA (LOW COUNTRIES)
  {
    id: 'bel',
    tag: 'BEL',
    name: 'Belgia & Belanda (Low Countries)',
    nativeName: 'België & Nederland',
    capital: 'Brussel & Amsterdam',
    faction: 'Neutral',
    ideology: 'Democratic',
    flagSymbol: '🦁',
    flagColors: ['#ea580c', '#1e293b'],
    pathD: 'M 355 275 L 390 265 L 400 290 L 375 325 L 350 315 Z',
    labelPos: { x: 375, y: 295 },
    capitalPos: { x: 370, y: 300 },
    resources: { oil: 1, steel: 26, aluminium: 14, tungsten: 0, chromium: 0, rubber: 0 },
    startingFactories: { civs: 18, mils: 6, docks: 4 },
    keyFocusSummary: 'Benteng Eben-Emael & Garis Air Belanda -> Melindungi Koloni Kaya Karet Hindia Belanda.',
    majorFocusPaths: [
      'Garis Pertahanan: Fort Eben-Emael -> Inundate the Waterlines -> Evacuate Government to Colonies',
      'Federasi Benelux: Unify the Low Countries -> Stronger Together'
    ],
    historicalEvents1936_1945: [
      '1940: Diserbu kilat dalam Fall Gelb; pasukan payung Jerman merebut benteng Eben-Emael.',
      'Pemerintahan Belanda mengendalikan cadangan minyak dan karet raksasa di Hindia Belanda (Indonesia).'
    ]
  },

  // 17. SWISS (SWITZERLAND)
  {
    id: 'swi',
    tag: 'SWI',
    name: 'Konfederasi Swiss (Switzerland)',
    nativeName: 'Schweiz / Suisse',
    capital: 'Bern',
    faction: 'Neutral',
    ideology: 'Democratic',
    flagSymbol: '➕',
    flagColors: ['#dc2626', '#ffffff'],
    pathD: 'M 390 395 L 430 385 L 440 405 L 400 415 Z',
    labelPos: { x: 415, y: 402 },
    capitalPos: { x: 410, y: 400 },
    resources: { oil: 0, steel: 8, aluminium: 10, tungsten: 0, chromium: 0, rubber: 0 },
    startingFactories: { civs: 11, mils: 3, docks: 0 },
    keyFocusSummary: 'Reduit Nasional di Pegunungan Alpen -> Netralitas Mutlak -> Bank Emas Internasional.',
    majorFocusPaths: [
      'Netralitas Aktif: Alpine Redoubt -> Gold Reserves -> Armed Deterrence Against Operation Tannenbaum'
    ],
    historicalEvents1936_1945: [
      'Jerman merencanakan Operasi Tannenbaum untuk menyerbu Swiss namun urung dilaksanakan karena biaya atrisi Alpen yang terlampau tinggi.'
    ]
  },

  // 18. AUSTRIA
  {
    id: 'aus',
    tag: 'AUS',
    name: 'Austria (Federal State of Austria)',
    nativeName: 'Österreich',
    capital: 'Wina',
    faction: 'Neutral',
    ideology: 'Non-Aligned',
    flagSymbol: '🇦🇹',
    flagColors: ['#dc2626', '#ffffff'],
    pathD: 'M 435 375 L 485 368 L 495 405 L 445 405 Z',
    labelPos: { x: 465, y: 388 },
    capitalPos: { x: 475, y: 385 },
    resources: { oil: 6, steel: 18, aluminium: 12, tungsten: 2, chromium: 0, rubber: 0 },
    startingFactories: { civs: 8, mils: 4, docks: 0 },
    keyFocusSummary: 'Target Pertama Ekspansi Anschluss Jerman -> Restorasi Habsburg atau Integrasi Axis.',
    majorFocusPaths: [
      'Anschluss Target: Menjadi provinsi Ostmark Jerman Reich di 1938 (+12 civs gratis untuk Jerman)'
    ],
    historicalEvents1936_1945: [
      '1938 (Maret): Pasukan Wehrmacht memasuki Austria tanpa perlawanan dalam Anschluss; disahkan melalui referendum.'
    ]
  },

  // 19. YUNANI (GREECE)
  {
    id: 'gre',
    tag: 'GRE',
    name: 'Kerajaan Yunani (Greece)',
    nativeName: 'Vasileion tis Ellados',
    capital: 'Athena',
    faction: 'Neutral',
    ideology: 'Non-Aligned',
    flagSymbol: '🇬🇷',
    flagColors: ['#1d4ed8', '#ffffff'],
    pathD: 'M 565 510 L 600 500 L 620 525 L 590 580 L 565 570 L 555 530 Z',
    // Crete
    secondaryPathsD: [
      'M 605 595 L 640 590 L 635 605 L 605 605 Z'
    ],
    labelPos: { x: 585, y: 540 },
    capitalPos: { x: 590, y: 550 },
    resources: { oil: 0, steel: 10, aluminium: 24, tungsten: 0, chromium: 38, rubber: 0 },
    startingFactories: { civs: 9, mils: 3, docks: 1 },
    keyFocusSummary: 'Garis Pertahanan Metaxas -> Kemenangan Oxi Day Lawan Italia -> Pertempuran Kreta (Merkur).',
    majorFocusPaths: [
      'Rezim 4 Agustus (Metaxas): Metaxas Line -> Oxi Day Defense -> Seek British Support'
    ],
    historicalEvents1936_1945: [
      '1940: Menolak ultimatum Mussolini ("Oxi!") dan memukul mundur tentara Italia ke Albania.',
      '1941: Jerman terpaksa turun tangan dalam Operasi Marita dan Operasi Merkur (invasi payung Kreta).'
    ]
  },

  // 20. PORTUGAL
  {
    id: 'por',
    tag: 'POR',
    name: 'Republik Portugal',
    nativeName: 'República Portuguesa',
    capital: 'Lisbon',
    faction: 'Neutral',
    ideology: 'Non-Aligned',
    flagSymbol: '⚓',
    flagColors: ['#15803d', '#dc2626'],
    pathD: 'M 140 475 L 175 470 L 170 545 L 145 545 Z',
    labelPos: { x: 155, y: 505 },
    capitalPos: { x: 148, y: 515 },
    // Major Tungsten exporter
    resources: { oil: 0, steel: 4, aluminium: 2, tungsten: 48, chromium: 2, rubber: 0 },
    startingFactories: { civs: 10, mils: 3, docks: 2 },
    keyFocusSummary: 'Estado Novo António de Oliveira Salazar -> Monopoli Tambang Wolfram Panasqueira.',
    majorFocusPaths: [
      'Estado Novo: Industrialize Panasqueira -> Supply Wolfram to Axis & Allies -> Guard Azores Islands'
    ],
    historicalEvents1936_1945: [
      'Tambang Panasqueira menyuplai wolfram kritis untuk amunisi tank Sekutu maupun Poros.',
      'Menjaga pangkalan udara Kepulauan Azores yang sangat penting untuk patroli kapal selam Atlantik Sekutu.'
    ]
  }
];

export const NON_EUROPEAN_MAJORS = [
  { id: 'usa', tag: 'USA', name: 'Amerika Serikat', flagSymbol: '★', flagColors: ['#1e3a8a', '#dc2626'], continent: 'Amerika Utara' },
  { id: 'jap', tag: 'JAP', name: 'Kekaisaran Jepang', flagSymbol: '☼', flagColors: ['#991b1b', '#f8fafc'], continent: 'Asia Pasifik' },
  { id: 'chi', tag: 'CHI', name: 'Tiongkok Nasionalis', flagSymbol: '☀', flagColors: ['#1d4ed8', '#ffffff'], continent: 'Asia Timur' },
  { id: 'can', tag: 'CAN', name: 'Kanada', flagSymbol: '🍁', flagColors: ['#dc2626', '#ffffff'], continent: 'Amerika Utara' },
  { id: 'raj', tag: 'RAJ', name: 'Raj Britania (India)', flagSymbol: '☸', flagColors: ['#ea580c', '#15803d'], continent: 'Asia Selatan' },
  { id: 'ast', tag: 'AST', name: 'Australia', flagSymbol: '🦘', flagColors: ['#1e3a8a', '#dc2626'], continent: 'Oseania' },
];
