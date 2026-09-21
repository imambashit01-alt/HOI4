import { CountryStrategy } from '../types';

export const COUNTRIES_STRATEGY_DATA: CountryStrategy[] = [
  {
    id: 'ger',
    tag: 'GER',
    name: 'Jerman (German Reich)',
    faction: 'Axis (Blok Poros)',
    difficulty: 'Sangat Mudah',
    flagColors: ['#1e293b', '#b91c1c'],
    flagSymbol: '✠',
    ideology: 'Fascism',
    leader: 'Adolf Hitler',
    startingCivilianFactories: 31,
    startingMilitaryFactories: 28,
    startingDockyards: 10,
    doctrineRecommendation: 'Mobile Warfare (Blitzkrieg) -> Blitzkrieg -> Modern Blitzkrieg',
    focusPath1936: [
      'Rhineland (Remiliterisasi)',
      'Four Year Plan (Rencana 4 Tahun)',
      'Autarky (Kemandirian Industri)',
      'Hermann Göring-Werke (Pabrik Sipil Gratis)',
      'KdF-Wagen (Pabrik Sipil Ekstra)',
      'Extra Research Slot (Slot Riset Ke-5)',
      'Anschluss (Caplok Austria Damai)'
    ],
    industryStrategy: 'Bangun Pabrik Sipil (Civs) murni di wilayah dengan infrastruktur 80%+ hingga pertengahan 1937, lalu alihkan total ke Pabrik Militer (Mils) dan Kilang Sintetis Minyak/Karet (Synthetic Refineries) untuk persiapan perang 1939.',
    militaryStrategy: 'Bentuk 4-6 divisi 30w Medium Tank kualitas tinggi. Serang Polandia dalam 2 pekan (September 1939), lalu lakukan "Around Maginot" menembus Belgia dan Belanda untuk melumpuhkan Prancis dalam hitungan minggu sebelum musim dingin 1940.',
    keyChallenges: [
      'Kekurangan kronis Minyak dan Karet begitu Sekutu memblokade lautan',
      'Perang dua front mematikan melawan Uni Soviet di timur dan invasi D-Day Sekutu di barat',
      'Kekuatan armada laut Royal Navy Inggris yang jauh lebih besar'
    ],
    proTips: 'Jalankan misi Collaboration Government di Uni Soviet 2-3 kali sebelum Operasi Barbarossa 1941 agar Soviet langsung menyerah saat Moskow, Leningrad, dan Stalingrad jatuh!'
  },
  {
    id: 'sov',
    tag: 'SOV',
    name: 'Uni Soviet (USSR)',
    faction: 'Comintern',
    difficulty: 'Sedang',
    flagColors: ['#991b1b', '#d97706'],
    flagSymbol: '☭',
    ideology: 'Communism',
    leader: 'Iosif Stalin',
    startingCivilianFactories: 42,
    startingMilitaryFactories: 24,
    startingDockyards: 6,
    doctrineRecommendation: 'Mass Assault (Deep Battle) atau Superior Firepower',
    focusPath1936: [
      'The Path of Marxism-Leninism',
      'The Center (Stalin)',
      'Heavy Industry / Five-Year Plan',
      'The Great Purge (Selesaikan sebelum 1938)',
      'Expand the Red Air Force',
      'Lessons of War (Hapus debuff Purge setelah Perang Musim Dingin Finlandia)',
      'Transpolar Flights (+1 Research Slot)'
    ],
    industryStrategy: 'Uni Soviet adalah raksasa industri terpendam. Bangun Pabrik Sipil murni di Moskow, Leningrad, dan wilayah pedalaman hingga pertengahan 1938. Saat Jerman menyerang, gunakan keputusan "Evacuate Industry to the Urals" untuk memindahkan pabrik ke balik pegunungan Ural.',
    militaryStrategy: 'Banjiri garis pertahanan dengan 150-200 divisi 18w / 21w Infanteri berdinding baja. Jangan serang Jerman di 1941 saat buff Barbarossa Jerman masih aktif; biarkan tentara Jerman mati atrisi di rawa Pripet dan musim salju, lalu lancarkan serangan balik tank raksasa di 1942/1943.',
    keyChallenges: [
      'Debuff "Officers Purged" yang memberikan penalti fatal pada organisasi tentara (-20% org)',
      'Paranoia Stalin yang bisa mengeksekusi jenderal terbaik jika tidak dikontrol dengan baik',
      'Jarak logistik yang sangat luas di Siberia dan front barat'
    ],
    proTips: 'Bangun benteng Level 2-3 di sepanjang Sungai Dnieper (Stalin Line). Sungai + Entrenchment + Artileri akan membantai jutaan tentara Poros.'
  },
  {
    id: 'usa',
    tag: 'USA',
    name: 'Amerika Serikat (USA)',
    faction: 'Allies (Sekutu)',
    difficulty: 'Sangat Mudah',
    flagColors: ['#1e3a8a', '#dc2626'],
    flagSymbol: '★',
    ideology: 'Democratic',
    leader: 'Franklin D. Roosevelt',
    startingCivilianFactories: 126,
    startingMilitaryFactories: 10,
    startingDockyards: 22,
    doctrineRecommendation: 'Superior Firepower (Integrated Support) + Fleet in Being / Base Strike',
    focusPath1936: [
      'Continue the New Deal',
      'WPA (Works Progress Administration)',
      'Agricultural Adjustment Act',
      'Federal Housing Act',
      'Fair Labor Standards Act',
      'Arsenal of Democracy',
      'Two-Ocean Navy Act (Bangun armada monster)'
    ],
    industryStrategy: 'Di 1936 industrimu terbelenggu Great Depression (-50% civs) dan Neutrality Act. Lewati New Deal untuk menghapus depresi. Begitu perang dunia pecah dan World Tension naik, kamu bisa membangun 200+ pabrik militer dan ratusan galangan kapal tanpa tanding!',
    militaryStrategy: 'Fokus pada kekuatan udara mutlak (Fighter + CAS + Strat Bombers) dan kapal induk (Carriers). Rancang divisi infanteri bermotor dan tank lapis baja modern. Pasukan AS kaya sumber daya minyak dan baja tak terbatas.',
    keyChallenges: [
      'Isolasionisme politik dan Senat/Kongres yang menolak intervensi perang sebelum 1939/1940',
      'Beban logistik melintasi dua samudra besar (Atlantik dan Pasifik)'
    ],
    proTips: 'Kirim Atase Militer ke Tiongkok dan Spanyol di 1937 untuk mendapatkan Army XP gratis dan menaikkan War Support tanpa melanggar undang-undang netralitas.'
  },
  {
    id: 'eng',
    tag: 'ENG',
    name: 'Inggris Raya (United Kingdom)',
    faction: 'Allies (Pimpinan Sekutu)',
    difficulty: 'Sedang',
    flagColors: ['#1e3a8a', '#991b1b'],
    flagSymbol: '♚',
    ideology: 'Democratic',
    leader: 'Neville Chamberlain / Winston Churchill',
    startingCivilianFactories: 35,
    startingMilitaryFactories: 16,
    startingDockyards: 19,
    doctrineRecommendation: 'Grand Battleplan atau Superior Firepower + Fleet in Being',
    focusPath1936: [
      'Limited Rearmament',
      'Shadow Industry',
      'Air Defense',
      'Radar Stations',
      'General Rearmament',
      'Tizard Mission (Kolaborasi riset dengan AS)',
      'War Committee (Churchill)'
    ],
    industryStrategy: 'Manfaatkan sumber daya persemakmuran (Karet Malaya, Minyak Timur Tengah, Logam Kanada/India). Bangun radar di pesisir Dover dan pangkalan udara tempur di selatan Inggris.',
    militaryStrategy: 'Kuasai laut Mediterania untuk memotong suplai Italia di Afrika Utara. Lindungi rute konvoi Atlantik dari kapal selam Jerman menggunakan armada Destroyer pemburu. Jadikan pulau Inggris benteng udara anti-bomber tak tertembus.',
    keyChallenges: [
      'Wilayah koloni yang tersebar di seluruh dunia rentan diserang secara simultan oleh Jerman, Italia, dan Jepang',
      'Manpower pulau utama Inggris terbatas'
    ],
    proTips: 'Jangan biarkan Italia menguasai Terusan Suez atau Gibraltar; siapa yang menguasai Suez mengendalikan jalur minyak Timur Tengah dan pasokan ke India!'
  },
  {
    id: 'jap',
    tag: 'JAP',
    name: 'Kekaisaran Jepang (Empire of Japan)',
    faction: 'Greater East Asia Co-Prosperity Sphere',
    difficulty: 'Menantang',
    flagColors: ['#991b1b', '#f8fafc'],
    flagSymbol: '☼',
    ideology: 'Fascism',
    leader: 'Hirohito',
    startingCivilianFactories: 24,
    startingMilitaryFactories: 20,
    startingDockyards: 18,
    doctrineRecommendation: 'Grand Battleplan / Mass Assault + Base Strike (Naval Aviation)',
    focusPath1936: [
      'Purge the Kodoha Faction',
      'Guide the Zaibatsus',
      'National Mobilization Law',
      'Marco Polo Bridge Incident (Perang melawan Tiongkok)',
      'Spiritual Mobilization',
      'Southern Expansion (Rebut Karet & Minyak Hindia Belanda)'
    ],
    industryStrategy: 'Jepang memiliki pasokan minyak sangat minim (hanya cukup untuk beberapa bulan operasi armada). Bangun industri militer dan segera siapkan rencana invasi ke wilayah kaya minyak di Hindia Belanda (Indonesia/Sumatra) dan Malaya.',
    militaryStrategy: 'Taklukkan pesisir Tiongkok dengan invasi laut amfibi kilat di 1937 untuk mengitari pertahanan darat Chiang Kai-shek. Di laut, gunakan armada Kapal Induk (Carriers) untuk menghancurkan pangkalan Armada Pasifik AS di Pearl Harbor/Filipina.',
    keyChallenges: [
      'Debuff perang Tiongkok (Marco Polo Bridge penalty) yang membatasi daya serang di awal perang',
      'Krisis bahan bakar ekstrem jika terkena embargo minyak Amerika Serikat'
    ],
    proTips: 'Gunakan keputusan "Escalate the War in China" secara bertahap untuk menghapus penalti serangan debuff Marco Polo Bridge.'
  },
  {
    id: 'ita',
    tag: 'ITA',
    name: 'Italia (Kingdom of Italy)',
    faction: 'Axis (Blok Poros)',
    difficulty: 'Sedang',
    flagColors: ['#15803d', '#b91c1c'],
    flagSymbol: '⚜',
    ideology: 'Fascism',
    leader: 'Benito Mussolini',
    startingCivilianFactories: 21,
    startingMilitaryFactories: 19,
    startingDockyards: 11,
    doctrineRecommendation: 'Superior Firepower atau Grand Battleplan + Fleet in Being',
    focusPath1936: [
      'Triumph in Africa (Selesaikan perang Ethiopia secepatnya)',
      'Industrial Development',
      'Albanian Subjugation',
      'Pact of Steel (Aliansi Jerman)',
      'Mare Nostrum (Klaim Laut Mediterania)'
    ],
    industryStrategy: 'Pabrik awal Italia terbatas. Fokuskan produksi pada senapan infanteri, artileri murah, dan perbarui kapal perang Regia Marina untuk menghadapi armada Inggris di Mediterania.',
    militaryStrategy: 'Selesaikan perang Ethiopia sebelum Maret 1936. Perkuat front Libya dan Mesir untuk merebut Terusan Suez. Amankan perbatasan pegunungan Alpen melawan Prancis dengan divisi Mountaineers.',
    keyChallenges: [
      'Mekanisme Dewan Fasis (Grand Council of Fascism): jika Italia kehilangan wilayah, Mussolini bisa dikudeta oleh rajanya sendiri',
      'Kekurangan cadangan minyak untuk armada laut'
    ],
    proTips: 'Jatuhkan Malta sejak dini menggunakan pasukan terjun payung (Paratroopers) agar armada laut Inggris di Mediterania kehilangan pangkalan radar dan logistik.'
  },
  {
    id: 'fra',
    tag: 'FRA',
    name: 'Prancis (French Republic)',
    faction: 'Allies',
    difficulty: 'Ahli',
    flagColors: ['#1d4ed8', '#dc2626'],
    flagSymbol: '⚑',
    ideology: 'Democratic',
    leader: 'Édouard Daladier',
    startingCivilianFactories: 33,
    startingMilitaryFactories: 8,
    startingDockyards: 10,
    doctrineRecommendation: 'Grand Battleplan (Entrenchment Maksimal)',
    focusPath1936: [
      'Devalue the Franc',
      'Popular Front / Revive the National Bloc',
      'Form the Popular Front',
      'Strengthen Government',
      'Extend the Maginot Line (Perpanjang benteng ke perbatasan Belgia)',
      'Army Reform (Hapus debuff Disjointed Government)'
    ],
    industryStrategy: 'Prancis terbelenggu oleh "Disjointed Government" (-1 PP per hari) dan perpecahan politik. Prioritaskan fokus politik untuk menstabilkan negara, lalu bangun benteng Level 4-6 di sepanjang perbatasan Belgia dan Italia.',
    militaryStrategy: 'Jangan biarkan tank Jerman masuk melalui Hutan Ardennes. Perpanjang Garis Maginot hingga ke pantai Selat Inggris di Dunkirk. Tempatkan divisi infanteri 21w dengan insinyur benteng gali (Engineer Entrenchment 40+).',
    keyChallenges: [
      'Stabilitas sangat rapuh dan penalti Political Power yang parah',
      'Debuff "Victors of the Great War" yang memperlambat perolehan doktrin militer darat hingga 75%'
    ],
    proTips: 'Beli lisensi senjata dari Inggris atau bangun aliansi Little Entente (bersama Cekoslowakia, Yugoslavia, Rumania) untuk menjepit Jerman dari dua sisi sejak 1938!'
  }
];
