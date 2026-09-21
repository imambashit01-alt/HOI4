import { NationalFocus, FocusPresetPath } from '../types';

export const EXPANDED_MAJOR_FOCUSES_DATA: NationalFocus[] = [
  // =========================================================================
  // 1. GERMANY (GER) - EXPANDED HISTORICAL & TACTICAL
  // =========================================================================
  {
    id: 'ger-army-innovations-1',
    countryId: 'ger',
    name: 'Inovasi Angkatan Darat I (Army Innovations I)',
    originalName: 'Army Innovations I',
    iconType: 'military',
    branch: 'Doktrin Darat & Tank',
    days: 70,
    prerequisites: ['ger-rhineland'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      armyXP: 25,
      researchSlots: 0
    },
    pros: [
      '+25 Army XP instan untuk mengedit template divisi',
      '2x 100% bonus riset untuk Doktrin Mobile Warfare',
      'Membuka akses ke Perjanjian Tank Kama dengan Uni Soviet'
    ],
    cons: [
      'Membutuhkan waktu 70 hari yang bersaing dengan fokus industri'
    ],
    keyEffectsSummary: 'Memberikan +25 Army XP dan 2x bonus riset doktrin darat Mobile Warfare.',
    recommendedTiming: 'Pertengahan 1936',
    historicalContext: 'Heer Jerman mengembangkan konsep perang manuver cepat (Bewegungskrieg) di bawah Jenderal Heinz Guderian.'
  },
  {
    id: 'ger-treaty-with-ussr',
    countryId: 'ger',
    name: 'Perjanjian Tank Kama dengan Uni Soviet',
    originalName: 'Treaty with the USSR',
    iconType: 'research',
    branch: 'Doktrin Darat & Tank',
    days: 70,
    prerequisites: ['ger-army-innovations-1'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      armyXP: 15
    },
    pros: [
      '2x 100% bonus percepatan riset Medium Tank (Panzer III & IV)',
      'Memungkinkan memproduksi Panzer IV pada tahun 1938 mendahului zaman',
      'Meningkatkan hubungan bilateral dengan Uni Soviet sementara waktu'
    ],
    cons: [
      'Uni Soviet juga mendapatkan bonus riset tank T-34',
      'Membayar 1 slot riset selama periode fokus'
    ],
    keyEffectsSummary: 'Membuka riset Medium Tank Panzer III & IV dua tahun lebih awal melalui kolaborasi rahasia.',
    recommendedTiming: 'Akhir 1936 - Awal 1937',
    historicalContext: 'Kerjasama rahasia Reichswehr dan Tentara Merah di sekolah tank Kama dekat Kazan sebelum Hitler berkuasa.'
  },
  {
    id: 'ger-westwall',
    countryId: 'ger',
    name: 'Benteng Tembok Barat (Westwall / Siegfried Line)',
    originalName: 'Westwall',
    iconType: 'military',
    branch: 'Politik Fasis & Ekspansi',
    days: 70,
    prerequisites: ['ger-rhineland'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      warSupport: 5
    },
    pros: [
      '+3 Benteng Darat di Rhineland, Moselland, dan Baden (total hingga 9 benteng)',
      'Menjamin perbatasan barat Jerman kebal dari serangan mendadak Prancis saat Wehrmacht menyerbu Polandia',
      '+5% War Support'
    ],
    cons: [
      'Mengurangi fokus pada perluasan pabrik industri sementara'
    ],
    keyEffectsSummary: 'Membangun kubah bunker beton Gigi Naga (Dragon\'s Teeth) di sepanjang perbatasan Prancis.',
    recommendedTiming: '1938 sebelum krisis Danzig',
    historicalContext: 'Fritz Todt memimpin 500.000 pekerja membangun garis bunker dan rintangan anti-tank Siegfried Line.'
  },
  {
    id: 'ger-synthetic-rubber',
    countryId: 'ger',
    name: 'Kilang Karet Sintetis Buna (Synthetic Rubber)',
    originalName: 'Synthetic Rubber',
    iconType: 'industry',
    branch: 'Industri Empat Tahun',
    days: 70,
    prerequisites: ['ger-autarky'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      civFactories: 1
    },
    pros: [
      '+2 Karet per kilang Synthetic Refinery yang ada',
      'Mengurangi ketergantungan Jerman dari impor karet laut Asia Tenggara hingga 100%',
      '+1 Pabrik Sipil gratis'
    ],
    cons: [
      'Kilang sintetis memakan slot bangunan konstruksi di Jerman barat'
    ],
    keyEffectsSummary: 'Meningkatkan output karet sintetis pabrik kimia IG Farben Buna.',
    recommendedTiming: '1937-1938',
    historicalContext: 'Kimiawan IG Farben mematenkan karet sintetis Buna-S untuk memasok ban truk dan paking mesin tank Wehrmacht.'
  },
  {
    id: 'ger-weserubung',
    countryId: 'ger',
    name: 'Operasi Weserübung (Invasi Denmark & Norwegia)',
    originalName: 'Operation Weserübung',
    iconType: 'expansion',
    branch: 'Politik Fasis & Ekspansi',
    days: 28,
    prerequisites: ['ger-around-maginot'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      worldTension: 6,
      warSupport: 5
    },
    pros: [
      'Alasan perang instan (War Goal) terhadap Denmark dan Norwegia hanya dalam 28 hari',
      'Mengamankan pelabuhan Narvik untuk rute ekspor bijih besi Swedia bebas es',
      'Membuka pangkalan kapal selam U-Boat di fjord Trondheim dan Bergen langsung ke Atlantik'
    ],
    cons: [
      'Risiko kehilangan kapal perang Kriegsmarine di fjord Norwegia melawan armada Inggris Royal Navy'
    ],
    keyEffectsSummary: 'Memberikan wargoal cepat terhadap Denmark dan Norwegia untuk mengamankan Narvik.',
    recommendedTiming: 'Musim Semi 1940',
    historicalContext: 'April 1940, Jerman melancarkan serangan kilat gabungan amfibi dan terjun payung merebut Denmark dan Norwegia.'
  },
  {
    id: 'ger-plan-z',
    countryId: 'ger',
    name: 'Rencana Z: Pembangunan Armada Samudra (Plan Z)',
    originalName: 'Plan Z',
    iconType: 'navy',
    branch: 'Kriegsmarine & Armada Samudra',
    days: 70,
    prerequisites: ['ger-rhineland'],
    mutuallyExclusive: ['ger-u-boat-effort'],
    historical: false,
    statsDelta: {
      dockyards: 4,
      navyXP: 25
    },
    pros: [
      '+4 Galangan Kapal Angkatan Laut (Dockyards) di Wilhelmshaven dan Kiel',
      '+25 Navy XP untuk mendesain super-battleship kelas H-39',
      'Bonus 100% percepatan riset Battleship & Carrier'
    ],
    cons: [
      'Sangat mahal dalam konsumsi baja dan mengalihkan pabrik dari produksi tank Panzer'
    ],
    keyEffectsSummary: 'Membangun 4 galangan kapal dan memfokuskan industri pada kapal perang permukaan raksasa.',
    recommendedTiming: '1937 jika ingin menantang Royal Navy',
    historicalContext: 'Rencana Laksamana Erich Raeder untuk membangun armada seimbang kapal perang raksasa hingga 1945.'
  },
  {
    id: 'ger-u-boat-effort',
    countryId: 'ger',
    name: 'Prioritas Armada Kapal Selam U-Boat',
    originalName: 'U-Boat Effort',
    iconType: 'navy',
    branch: 'Kriegsmarine & Armada Samudra',
    days: 70,
    prerequisites: ['ger-rhineland'],
    mutuallyExclusive: ['ger-plan-z'],
    historical: true,
    statsDelta: {
      dockyards: 2,
      navyXP: 15
    },
    pros: [
      '+2 Galangan Kapal Angkatan Laut khusus produksi kapal selam',
      '2x 100% bonus percepatan riset kapal selam Type VII dan Type IX',
      'Meningkatkan efektivitas serbuan konvoi taktik Wolfpack Karl Dönitz'
    ],
    cons: [
      'Mengorbankan kemampuan armada kapal perang permukaan'
    ],
    keyEffectsSummary: 'Memberikan diskon riset kapal selam Type VII dan memicu perang asimetris konvoi Atlantik.',
    recommendedTiming: '1937 (Meta Kompetitif)',
    historicalContext: 'Karl Dönitz meyakini 300 U-Boat cukup untuk membuat Inggris bertekuk lutut akibat kelaparan.'
  },
  {
    id: 'ger-wunderwaffe',
    countryId: 'ger',
    name: 'Senjata Rahasia Mukjizat (Wunderwaffe & Uranprojekt)',
    originalName: 'Wunderwaffe Effort',
    iconType: 'research',
    branch: 'Industri Empat Tahun',
    days: 70,
    prerequisites: ['ger-extra-tech-slot'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      researchSlots: 0,
      airXP: 15
    },
    pros: [
      'Bonus 2x 100% percepatan riset teknologi Nuklir dan Reaktor Atom',
      'Bonus 2x 100% percepatan riset Mesin Jet dan Roket Balistik V2 di Peenemünde',
      '+15 Air XP'
    ],
    cons: [
      'Membutuhkan waktu dan konsumsi sumber daya tinggi di akhir perang'
    ],
    keyEffectsSummary: 'Mempercepat riset jet Me 262, roket balistik V2, dan fisika atom.',
    recommendedTiming: '1942-1943',
    historicalContext: 'Pusat riset Peenemünde di Baltik mengembangkan roket V2 pertama di dunia di bawah Wernher von Braun.'
  },

  // =========================================================================
  // 2. SOVIET UNION (SOV) - EXPANDED HISTORICAL & TACTICAL
  // =========================================================================
  {
    id: 'sov-gosplan-industry',
    countryId: 'sov',
    name: 'Rencana Lima Tahun Ketiga Gosplan',
    originalName: 'The Third Five-Year Plan',
    iconType: 'industry',
    branch: 'Industrialisasi Sosialis & Ural',
    days: 70,
    prerequisites: ['sov-heavy-industry'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      civFactories: 3,
      milFactories: 2
    },
    pros: [
      '+3 Pabrik Sipil dan +2 Pabrik Militer di wilayah Moskow dan Gorky',
      'Meningkatkan batas kapasitas infrastruktur tambang batu bara Donbas',
      'Kecepatan konstruksi pabrik bertambah +10%'
    ],
    cons: [
      'Meningkatkan konsumsi barang konsumen rakyat sementara waktu'
    ],
    keyEffectsSummary: 'Membangun 5 pabrik baru di bawah arahan komite perencanaan pusat Gosplan.',
    recommendedTiming: '1937',
    historicalContext: 'Program industrialisasi massal Uni Soviet yang memprioritaskan industri berat dan baja.'
  },
  {
    id: 'sov-order-227',
    countryId: 'sov',
    name: 'Perintah No. 227: Pantang Mundur! (Ni Shagu Nazad)',
    originalName: 'Order No. 227',
    iconType: 'military',
    branch: 'Tentara Merah & Pertahanan Tanah Air',
    days: 35,
    prerequisites: ['sov-lessons-of-war'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      warSupport: 15,
      stability: -5
    },
    pros: [
      '+15% War Support',
      '+20% Defense saat bertempur di wilayah inti (core territory) Uni Soviet',
      'Mengurangi kecepatan divisi musuh melakukan terobosan sebesar -15%'
    ],
    cons: [
      '-5% Stabilitas karena diterapkannya detasemen penghalang NKVD di garis belakang'
    ],
    keyEffectsSummary: 'Memberikan bonus pertahanan masif +20% di tanah air dan +15% War Support.',
    recommendedTiming: 'Saat diserang Jerman (1941-1942)',
    historicalContext: 'Dikeluarkan Stalin pada 28 Juli 1942 di tengah pertempuran sengit mendekati Stalingrad.'
  },
  {
    id: 'sov-tankograd',
    countryId: 'sov',
    name: 'Evakuasi Pabrik ke Pegunungan Ural (Tankograd Chelyabinsk)',
    originalName: 'Relocate Industry to the Urals',
    iconType: 'industry',
    branch: 'Industrialisasi Sosialis & Ural',
    days: 70,
    prerequisites: ['sov-gosplan-industry'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      milFactories: 4
    },
    pros: [
      '+4 Pabrik Militer permanen di Chelyabinsk dan Sverdlovsk di balik pegunungan Ural',
      'Pabrik-pabrik ini 100% aman dari jangkauan pembom strategis Jerman dan serangan darat',
      'Diskon efisiensi produksi tank legendaris T-34 dan KV-1'
    ],
    cons: [
      'Membutuhkan alokasi kereta logistik untuk pemindahan mesin pabrik'
    ],
    keyEffectsSummary: 'Mendirikan kota raksasa industri tank Tankograd di Pegunungan Ural yang kebal serbuan musuh.',
    recommendedTiming: '1941',
    historicalContext: 'Lebih dari 1.500 pabrik Uni Soviet dibongkar dan diangkut ribuan gerbong kereta api ke Ural dan Siberia.'
  },
  {
    id: 'sov-claims-in-baltic',
    countryId: 'sov',
    name: 'Klaim Wilayah Baltik & Bessarabia',
    originalName: 'Claims on Baltic States',
    iconType: 'expansion',
    branch: 'Politik Luar Negeri & Ekspansi',
    days: 70,
    prerequisites: ['sov-the-great-purge'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      worldTension: 4,
      politicalPower: 80
    },
    pros: [
      'Mengirim ultimatum aneksasi damai kepada Estonia, Latvia, dan Lithuania',
      'Menuntut provinsi Bessarabia dari Rumania tanpa menimbulkan perang dunia',
      '+80 Political Power dan mengamankan jalur laut ke Leningrad'
    ],
    cons: [
      'Sedikit meningkatkan ketegangan dunia (+4% WT)'
    ],
    keyEffectsSummary: 'Menganeksasi Estonia, Latvia, Lithuania, dan Bessarabia secara diplomatik.',
    recommendedTiming: '1939-1940 setelah Pakta Molotov-Ribbentrop',
    historicalContext: 'Protokol rahasia Pakta Molotov-Ribbentrop membagi Eropa Timur ke dalam zona pengaruh Soviet.'
  },
  {
    id: 'sov-deep-battle',
    countryId: 'sov',
    name: 'Reorganisasi Doktrin Operasi Mendalam (Deep Battle)',
    originalName: 'Rehabilitate Deep Battle',
    iconType: 'military',
    branch: 'Tentara Merah & Pertahanan Tanah Air',
    days: 70,
    prerequisites: ['sov-lessons-of-war'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      armyXP: 35
    },
    pros: [
      '+35 Army XP untuk membuat korps mekanis tank ofensif',
      '2x 100% bonus riset untuk Doktrin Mass Assault cabang Deep Battle',
      'Meningkatkan kecepatan recovery organisasi seluruh divisi infanteri dan artileri'
    ],
    cons: [
      'Menghabiskan 70 hari waktu fokus'
    ],
    keyEffectsSummary: 'Mengembalikan doktrin ofensif Marshal Tukhachevsky dengan dukungan korps tank massal.',
    recommendedTiming: '1940-1941',
    historicalContext: 'Doktrin militer Soviet yang menggabungkan artileri berat, manuver tank di garis belakang musuh, dan serangan udara CAS.'
  },

  // =========================================================================
  // 3. UNITED STATES (USA) - EXPANDED HISTORICAL & TACTICAL
  // =========================================================================
  {
    id: 'usa-two-ocean-navy',
    countryId: 'usa',
    name: 'Undang-Undang Armada Dua Samudra (Two-Ocean Navy Act)',
    originalName: 'Two-Ocean Navy Act',
    iconType: 'navy',
    branch: 'Armada Angkatan Laut & Pasifik',
    days: 70,
    prerequisites: ['usa-arsenal-of-democracy'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      dockyards: 8,
      navyXP: 40
    },
    pros: [
      '+8 Galangan Kapal Angkatan Laut (Dockyards) instan di pesisir Atlantik dan Pasifik',
      '+40 Navy XP untuk kustomisasi kapal induk Essex dan kapal tempur Iowa',
      'Kapasitas produksi kapal perang AS melampaui gabungan seluruh dunia'
    ],
    cons: [
      'Membutuhkan War Support minimal 40% atau sedang dalam status perang'
    ],
    keyEffectsSummary: 'Membangun 8 galangan kapal sekaligus dan mempersiapkan armada raksasa dua samudra.',
    recommendedTiming: '1940',
    historicalContext: 'Undang-undang Vinson-Walsh 1940 menambah kekuatan Angkatan Laut AS sebesar 70% dalam tempo kilat.'
  },
  {
    id: 'usa-lend-lease',
    countryId: 'usa',
    name: 'Undang-Undang Pinjam-Sewa (Lend-Lease Act)',
    originalName: 'Lend-Lease Act',
    iconType: 'politics',
    branch: 'Ekonomi Masa Perang & New Deal',
    days: 70,
    prerequisites: ['usa-continue-new-deal'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      politicalPower: 120,
      worldTension: 5
    },
    pros: [
      'Membuka kemampuan mengirim ribuan senjata, truk, dan pesawat ke Inggris dan Uni Soviet',
      'Menerima sewa pangkalan angkatan laut di Karibia dan Atlantik Utara (Destroyers for Bases)',
      '+120 Political Power'
    ],
    cons: [
      '+5% World Tension'
    ],
    keyEffectsSummary: 'Memungkinkan Amerika menjadi lumbung perlengkapan perang sekutu demokrasi sebelum resmi terjun perang.',
    recommendedTiming: '1940-1941',
    historicalContext: 'FDR mengibaratkan Lend-Lease seperti meminjamkan selang air kepada tetangga yang rumahnya sedang terbakar.'
  },
  {
    id: 'usa-war-production-board',
    countryId: 'usa',
    name: 'Badan Produksi Perang (War Production Board)',
    originalName: 'War Production Board',
    iconType: 'industry',
    branch: 'Ekonomi Masa Perang & New Deal',
    days: 70,
    prerequisites: ['usa-arsenal-of-democracy'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      milFactories: 6,
      civFactories: 2
    },
    pros: [
      '+6 Pabrik Militer dan +2 Pabrik Sipil di kawasan Great Lakes dan Midwest',
      'Kecepatan konversi pabrik sipil menjadi pabrik militer bertambah +30%',
      'Penurunan penalti Consumer Goods hingga titik terendah'
    ],
    cons: [
      'Membutuhkan status perang penuh'
    ],
    keyEffectsSummary: 'Mobilisasi total industri otomotif Detroit untuk memproduksi ribuan tank Sherman dan pesawat B-24.',
    recommendedTiming: '1942 setelah Pearl Harbor',
    historicalContext: 'Donald M. Nelson memimpin badan yang mengubah industri sipil Amerika menjadi mesin pembuat senjata terbesar di bumi.'
  },
  {
    id: 'usa-manhattan-project',
    countryId: 'usa',
    name: 'Proyek Manhattan (The Manhattan Project)',
    originalName: 'The Manhattan Project',
    iconType: 'research',
    branch: 'Riset & Senjata Mukjizat',
    days: 70,
    prerequisites: ['usa-scientific-research'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      researchSlots: 0,
      politicalPower: 50
    },
    pros: [
      'Bonus 2x 100% percepatan riset teknologi Nuclear Reactor dan Nuclear Bomb',
      'Membuka slot pembangunan Reaktor Nuklir di Los Alamos dan Oak Ridge',
      'Memungkinkan menjatuhkan bom atom di tahun 1944-1945'
    ],
    cons: [
      'Menghabiskan biaya konstruksi pabrik yang sangat besar'
    ],
    keyEffectsSummary: 'Mempercepat riset dan pembangunan senjata nuklir pertama di laboratorium rahasia Los Alamos.',
    recommendedTiming: '1942-1943',
    historicalContext: 'Program rahasia di bawah arahan Robert Oppenheimer dan Jenderal Leslie Groves untuk menciptakan bom atom.'
  },
  {
    id: 'usa-b29-superfortress',
    countryId: 'usa',
    name: 'Pesawat Pembom Jarak Jauh B-29 Superfortress',
    originalName: 'Superfortress Effort',
    iconType: 'air',
    branch: 'Angkatan Udara Angkatan Darat (USAAF)',
    days: 70,
    prerequisites: ['usa-arsenal-of-democracy'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      airXP: 30
    },
    pros: [
      '2x 100% bonus riset untuk Strategic Bomber canggih',
      'Jangkauan terbang ekstrem yang memungkinkan membom pulau utama Jepang dari pangkalan Mariana',
      '+30 Air XP'
    ],
    cons: [
      'Pesawat B-29 membutuhkan biaya produksi IC dan aluminium tinggi'
    ],
    keyEffectsSummary: 'Membuka pembom strategis berkabin bertekanan B-29 untuk operasi pengeboman jarak jauh.',
    recommendedTiming: '1943',
    historicalContext: 'Boeing B-29 Superfortress adalah pesawat tempur termahal dan tercanggih yang dibuat AS dalam Perang Dunia II.'
  },

  // =========================================================================
  // 4. UNITED KINGDOM (ENG) - EXPANDED HISTORICAL & TACTICAL
  // =========================================================================
  {
    id: 'eng-reinforce-empire',
    countryId: 'eng',
    name: 'Perkuat Pertahanan Garis Kekaisaran (Suez & Singapura)',
    originalName: 'Reinforce the Empire',
    iconType: 'military',
    branch: 'Imperium Britania & Koloni',
    days: 70,
    prerequisites: ['eng-shadow-industry'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      dockyards: 2,
      warSupport: 5
    },
    pros: [
      '+2 Benteng Pesisir di Terusan Suez (Mesir) dan Pangkalan Laut Singapura',
      '+2 Galangan Kapal di Portsmouth',
      'Mengamankan rute perdagangan minyak Timur Tengah dan karet Malaya'
    ],
    cons: [
      'Membagi perhatian dari pertahanan pulau utama Inggris'
    ],
    keyEffectsSummary: 'Membentengi pos-pos kunci Terusan Suez, Gibraltar, dan benteng pulau Singapura.',
    recommendedTiming: '1937-1938',
    historicalContext: 'Inggris membangun strategi pertahanan terpadu "Singapore Strategy" dan mengamankan arteri Terusan Suez.'
  },
  {
    id: 'eng-churchill-blood-toil',
    countryId: 'eng',
    name: 'Darah, Keringat, dan Air Mata (Blood, Toil, Tears and Sweat)',
    originalName: 'No Concessions - Stand Firm',
    iconType: 'politics',
    branch: 'Kepemimpinan Perang Churchill',
    days: 35,
    prerequisites: ['eng-war-committee'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      warSupport: 20,
      stability: 10,
      politicalPower: 100
    },
    pros: [
      '+20% War Support dan +10% Stabilitas instan',
      '+100 Political Power untuk merekrut penasihat perang',
      'Mencegah kemungkinan kapitulasi bersyarat saat Prancis jatuh'
    ],
    cons: [
      'Menutup selamanya pintu negosiasi perdamaian dengan Jerman'
    ],
    keyEffectsSummary: 'Pidato bersejarah Winston Churchill yang membakar semangat rakyat Inggris untuk bertempur hingga titik darah penghabisan.',
    recommendedTiming: 'Mei 1940 saat Jerman menembus Ardennes',
    historicalContext: 'Pidato perdana Churchill sebagai Perdana Menteri di hadapan House of Commons pada 13 Mei 1940.'
  },
  {
    id: 'eng-home-defence',
    countryId: 'eng',
    name: 'Pertahanan Tanah Air & Milisi Sukarelawan (Home Guard)',
    originalName: 'Home Defence',
    iconType: 'military',
    branch: 'Pertahanan Tanah Air & Royal Navy',
    days: 70,
    prerequisites: ['eng-shadow-industry'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      armyXP: 20,
      warSupport: 5
    },
    pros: [
      'Membuka 6 divisi garnisun sukarelawan Home Guard di pantai selatan Inggris',
      '+3 Benteng Pesisir di Dover dan Portsmouth untuk menggagalkan Operasi Sealion Jerman',
      '+20 Army XP'
    ],
    cons: [
      'Divisi Home Guard hanya efektif untuk pertahanan lokal dan lambat bergerak'
    ],
    keyEffectsSummary: 'Membangun jaringan pertahanan pesisir anti-invasi dan milisi lokal Home Guard.',
    recommendedTiming: 'Musim Panas 1940',
    historicalContext: 'Lebih dari satu juta sukarelawan mendaftar menjadi Local Defence Volunteers untuk menjaga pantai dan langit Inggris.'
  },
  {
    id: 'eng-bletchley-park',
    countryId: 'eng',
    name: 'Bletchley Park & Dekripsi Sandi Ultra',
    originalName: 'Bletchley Park Cryptology',
    iconType: 'research',
    branch: 'Riset & Sains Radar',
    days: 70,
    prerequisites: ['eng-tizard-mission'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      politicalPower: 50
    },
    pros: [
      'Bonus pemecahan kode sandi musuh +30% (membongkar komunikasi radio Enigma Jerman)',
      'Bonus deteksi kapal selam di Samudra Atlantik +25%',
      'Intelijen militer superior atas pergerakan armada laut dan darat musuh'
    ],
    cons: [
      'Memerlukan investasi pabrik sipil agensi intelijen'
    ],
    keyEffectsSummary: 'Pusat pemecah kode rahasia Alan Turing yang memecahkan sandi mesin Enigma Poros.',
    recommendedTiming: '1939-1940',
    historicalContext: 'Pekerjaan intelijen di Bletchley Park diperkirakan memperpendek Perang Dunia II di Eropa hingga dua tahun.'
  },

  // =========================================================================
  // 5. IMPERIAL JAPAN (JAP) - EXPANDED HISTORICAL & TACTICAL
  // =========================================================================
  {
    id: 'jap-pearl-harbor',
    countryId: 'jap',
    name: 'Serangan Kejutan Pearl Harbor (Tora! Tora! Tora!)',
    originalName: 'Strike on the US Fleet',
    iconType: 'expansion',
    branch: 'Ekspansi Selatan & Armada Pasifik',
    days: 35,
    prerequisites: ['jap-southern-expansion'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      warSupport: 15,
      worldTension: 15,
      navyXP: 30
    },
    pros: [
      'Alasan perang instan (Surprise Attack Wargoal) terhadap Amerika Serikat',
      'Serangan udara pertama mendapatkan buff serangan torpedo laut +50% selama 30 hari pertama perang',
      '+30 Navy XP dan +15% War Support'
    ],
    cons: [
      'Menyeret Amerika Serikat ke dalam perang total dengan kapasitas industri raksasanya'
    ],
    keyEffectsSummary: 'Melancarkan serangan mendadak armada kapal induk Kido Butai ke pangkalan Armada Pasifik AS.',
    recommendedTiming: 'Desember 1941',
    historicalContext: '7 Desember 1941, armada kapal induk pimpinan Laksamana Nagumo melancarkan serangan udara mematikan ke Pearl Harbor.'
  },
  {
    id: 'jap-strike-south-oil',
    countryId: 'jap',
    name: 'Serbu Sumber Daya Hindia Belanda & Malaya (Nanshin-ron)',
    originalName: 'Secure the Southern Resources',
    iconType: 'expansion',
    branch: 'Ekspansi Selatan & Armada Pasifik',
    days: 70,
    prerequisites: ['jap-southern-expansion'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      civFactories: 2
    },
    pros: [
      'Wargoal instan terhadap Belanda dan Inggris untuk merebut ladang minyak Palembang dan Balikpapan',
      'Mengakhiri embargo minyak AS yang melumpuhkan armada kapal perang Kekaisaran',
      '+2 Pabrik Sipil dari penguasaan tambang timah dan karet'
    ],
    cons: [
      'Membutuhkan ratusan kapal konvoi angkut untuk mengirim minyak kembali ke kepulauan Jepang'
    ],
    keyEffectsSummary: 'Merebut lumbung minyak bumi dan karet di Asia Tenggara untuk memasok mesin perang Jepang.',
    recommendedTiming: 'Akhir 1941 - Awal 1942',
    historicalContext: 'Jepang kehabisan cadangan minyak akibat embargo Barat, mendorong keputusan menyerbu ladang minyak Hindia Belanda.'
  },
  {
    id: 'jap-super-battleship-yamato',
    countryId: 'jap',
    name: 'Kapal Tempur Terbesar di Dunia: Yamato & Musashi',
    originalName: 'The Yamato Class Battleships',
    iconType: 'navy',
    branch: 'Kekuatan Laut Gabungan (IJN)',
    days: 70,
    prerequisites: ['jap-southern-expansion'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      dockyards: 2,
      navyXP: 25
    },
    pros: [
      'Diskon riset Super-Heavy Battleship 1936/1940',
      'Meriam raksasa 460mm (18,1 inci) dengan jangkauan dan daya hancur terbesar di dunia',
      '+2 Galangan Kapal di Kure dan Nagasaki'
    ],
    cons: [
      'Konsumsi bahan bakar minyak sangat boros dan rentan diserang pesawat torpedo kapal induk'
    ],
    keyEffectsSummary: 'Membangun monster kapal tempur kelas Yamato dengan meriam 460mm.',
    recommendedTiming: '1937-1939',
    historicalContext: 'Kapal tempur berbobot 72.000 ton Yamato dan Musashi adalah kapal tempur terberat dan berlapis baja paling tebal yang pernah dibuat.'
  },
  {
    id: 'jap-kamikaze-effort',
    countryId: 'jap',
    name: 'Korps Serangan Khusus Kamikaze (Tokko-tai)',
    originalName: 'Special Attack Units (Kamikaze)',
    iconType: 'air',
    branch: 'Kekuatan Laut Gabungan (IJN)',
    days: 35,
    prerequisites: ['jap-southern-expansion'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      warSupport: 10,
      airXP: 20
    },
    pros: [
      'Membuka misi taktis Kamikaze Strike untuk pesawat tempur usang',
      'Kemungkinan menenggelamkan kapal induk dan kapal penjelajah musuh meningkat +200% dalam misi serangan bunuh diri',
      '+10% War Support semangat pantang menyerah'
    ],
    cons: [
      'Setiap serangan kamikaze yang diluncurkan mengorbankan 1 pesawat dan 1 pilot terlatih selamanya'
    ],
    keyEffectsSummary: 'Membuka misi penabrakan pesawat bunuh diri Kamikaze terhadap armada laut penyerang.',
    recommendedTiming: '1944 saat posisi terdesak',
    historicalContext: 'Oktober 1944 di Teluk Leyte, Laksamana Onishi membentuk unit serbuan khusus bunuh diri Kamikaze.'
  },

  // =========================================================================
  // 6. FRANCE (FRA) - EXPANDED HISTORICAL & TACTICAL
  // =========================================================================
  {
    id: 'fra-de-gaulle-tanks',
    countryId: 'fra',
    name: 'Divisi Lapis Baja Charles de Gaulle (Vers l\'armée de métier)',
    originalName: 'De Gaulle\'s Armored Division',
    iconType: 'military',
    branch: 'Reformasi Angkatan Darat',
    days: 70,
    prerequisites: ['fra-army-reform'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      armyXP: 30,
      milFactories: 2
    },
    pros: [
      '+30 Army XP untuk membuat template divisi lapis baja independen (Division Cuirassée de Réserve)',
      'Menghapus penalti doktrin doktriner kaku Prancis (Methodical Battle)',
      '+2 Pabrik Militer untuk tank berat Char B1 bis dan tank kavaleri Somua S35'
    ],
    cons: [
      'Berselisih dengan perwira konservatif jenderal tua Perang Dunia I'
    ],
    keyEffectsSummary: 'Membentuk divisi tank otonom modern ala Charles de Gaulle untuk mematahkan taktik blitzkrieg Jerman.',
    recommendedTiming: '1937-1938',
    historicalContext: 'Kolonel Charles de Gaulle menulis buku revolusioner tentang korps lapis baja profesional namun ditolak oleh jenderal senior seperti Pétain.'
  },
  {
    id: 'fra-alpine-line',
    countryId: 'fra',
    name: 'Garis Benteng Pegunungan Alpen (Ligne Alpine)',
    originalName: 'Fortify the Alpine Border',
    iconType: 'military',
    branch: 'Pertahanan Benteng & Perbatasan',
    days: 70,
    prerequisites: ['fra-extend-maginot-line'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      warSupport: 5
    },
    pros: [
      '+4 Benteng Darat di provinsi pegunungan Alpen perbatasan Italia (Nice, Savoy)',
      'Medan pegunungan Alpen berbenteng membuat serangan Italia menjadi bunuh diri massal',
      'Hanya membutuhkan 4-6 divisi infanteri untuk mengamankan seluruh front selatan'
    ],
    cons: [
      'Menghabiskan kapasitas konstruksi selama 70 hari'
    ],
    keyEffectsSummary: 'Membangun kubah benteng beton modern di lereng Alpen untuk membendung invasi Italia.',
    recommendedTiming: '1938-1939',
    historicalContext: 'Juni 1940, Angkatan Darat Alpen Prancis berhasil menahan serbuan 300.000 tentara Italia dengan kerugian minim berkat benteng ini.'
  },
  {
    id: 'fra-colonial-troops',
    countryId: 'fra',
    name: 'Mobilisasi Pasukan Kolonial Afrika & Légion Étrangère',
    originalName: 'Integrate the Colonial Army',
    iconType: 'military',
    branch: 'Pertahanan Benteng & Perbatasan',
    days: 70,
    prerequisites: ['fra-popular-front'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      manpowerBonus: '+150.000 Manpower',
      stability: 5
    },
    pros: [
      '+150.000 Rekrutan Manpower tentara dari Aljazair, Maroko, Senegal, dan Tunisia',
      'Membuka batalion elit infanteri gunung Tirailleurs dan Legiun Asing (Foreign Legion)',
      '+5% Stabilitas persemakmuran Prancis'
    ],
    cons: [
      'Membutuhkan konvoi laut untuk mengangkut pasukan melintasi Mediterania'
    ],
    keyEffectsSummary: 'Merekrut ratusan ribu prajurit tangguh dari Afrika Utara dan Afrika Barat untuk menutupi krisis manpower Prancis.',
    recommendedTiming: '1937',
    historicalContext: 'Prajurit kolonial (Tirailleurs dan Spahis) memainkan peran krusial dalam pertahanan dan pembebasan Prancis.'
  },

  // =========================================================================
  // 7. ITALY (ITA) - EXPANDED HISTORICAL & TACTICAL
  // =========================================================================
  {
    id: 'ita-mare-nostrum',
    countryId: 'ita',
    name: 'Kuasai Laut Tengah (Mare Nostrum)',
    originalName: 'Mare Nostrum Ambition',
    iconType: 'navy',
    branch: 'Kekaisaran Mediterania & Armada',
    days: 70,
    prerequisites: ['ita-naval-effort'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      dockyards: 3,
      navyXP: 25
    },
    pros: [
      '+3 Galangan Kapal di Taranto dan La Spezia',
      '+25 Navy XP untuk merancang kapal penjelajah cepat Regia Marina',
      'Bonus 15% Naval Superiority di seluruh zona laut Mediterania Timur dan Barat'
    ],
    cons: [
      'Menempatkan Italia pada jalur tabrakan langsung dengan Armada Mediterania Inggris'
    ],
    keyEffectsSummary: 'Menuntut dominasi mutlak di Laut Mediterania dan membangun 3 galangan kapal angkatan laut.',
    recommendedTiming: '1937',
    historicalContext: 'Mussolini memimpikan menghidupkan kembali kejayaan Kekaisaran Romawi Kuno dengan menguasai Laut Mediterania.'
  },
  {
    id: 'ita-annex-albania',
    countryId: 'ita',
    name: 'Pendudukan Kerajaan Albania',
    originalName: 'Subjugate Albania',
    iconType: 'expansion',
    branch: 'Politik Luar Negeri & Ekspansi',
    days: 35,
    prerequisites: ['ita-ethiopian-war-logistics'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      politicalPower: 80,
      worldTension: 3
    },
    pros: [
      'Menganeksasi Albania secara langsung dan damai tanpa memicu perang dunia',
      '+1 Pelabuhan laut dan batu pijakan strategis untuk menginvasi Yunani dan Yugoslavia',
      '+80 Political Power'
    ],
    cons: [
      'Memicu kecurigaan negara-negara Balkan dan Inggris'
    ],
    keyEffectsSummary: 'Menganeksasi Albania dan membuka pangkalan terdepan di Semenanjung Balkan.',
    recommendedTiming: 'Musim Semi 1939',
    historicalContext: 'April 1939, pasukan Italia mendarat di Durrës dan Raja Zog melarikan diri, menjadikan Albania protektorat Italia.'
  },
  {
    id: 'ita-pact-of-steel',
    countryId: 'ita',
    name: 'Pakta Baja dengan Jerman (Pact of Steel)',
    originalName: 'The Pact of Steel',
    iconType: 'politics',
    branch: 'Kekaisaran Mediterania & Armada',
    days: 70,
    prerequisites: ['ita-ethiopian-war-logistics'],
    mutuallyExclusive: ['ita-depose-mussolini'],
    historical: true,
    statsDelta: {
      warSupport: 10,
      stability: 5
    },
    pros: [
      'Aliansi militer resmi dengan Jerman (membentuk Poros Roma-Berlin)',
      'Akses ke cetak biru teknologi senjata canggih Jerman (lisensi tank dan pesawat)',
      '+10% War Support'
    ],
    cons: [
      'Menjadikan Italia terikat pada perang ofensif Hitler yang berbahaya'
    ],
    keyEffectsSummary: 'Menandatangani aliansi militer ofensif dan defensif penuh antara Hitler dan Mussolini.',
    recommendedTiming: 'Mei 1939',
    historicalContext: 'Pakta persahabatan dan aliansi militer resmi antara Kerajaan Italia dan Reich Jerman yang ditandatangani Ciano dan Ribbentrop.'
  },
  {
    id: 'ita-decima-mas',
    countryId: 'ita',
    name: 'Komando Katak Laut Elit (Decima Flottiglia MAS)',
    originalName: 'Decima Flottiglia MAS Commandos',
    iconType: 'navy',
    branch: 'Kekaisaran Mediterania & Armada',
    days: 70,
    prerequisites: ['ita-naval-effort'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      navyXP: 20
    },
    pros: [
      'Membuka taktik torpedo berawak Maiale (Human Torpedoes) untuk menyusup ke pelabuhan musuh',
      'Bonus serangan mendadak terhadap kapal perang musuh yang bersandar di Alexandria dan Gibraltar +50%',
      '+20 Navy XP'
    ],
    cons: [
      'Hanya efektif dalam pertempuran laut terbatas di pelabuhan'
    ],
    keyEffectsSummary: 'Pasukan khusus komando selam legendaris Italia yang melumpuhkan kapal perang Inggris di pelabuhan Alexandria.',
    recommendedTiming: '1940',
    historicalContext: 'Decima MAS pimpinan Borghese berhasil menyusup ke pelabuhan Alexandria pada 1941 dan melumpuhkan dua kapal tempur Inggris.'
  },

  // =========================================================================
  // 8. POLAND (POL) - EXPANDED HISTORICAL & TACTICAL
  // =========================================================================
  {
    id: 'pol-intermarium',
    countryId: 'pol',
    name: 'Federasi Antara Dua Laut (Międzymorze / Intermarium)',
    originalName: 'The Intermarium Coalition',
    iconType: 'politics',
    branch: 'Politik Luar Negeri & Faksi Mandiri',
    days: 70,
    prerequisites: ['pol-sanation-right'],
    mutuallyExclusive: [],
    historical: false,
    statsDelta: {
      politicalPower: 120,
      warSupport: 15
    },
    pros: [
      'Mendirikan faksi militer independen Intermarium yang membentang dari Laut Baltik ke Laut Hitam',
      'Dapat mengundang Lithuania, Latvia, Estonia, Rumania, dan Finlandia ke dalam aliansi',
      '+120 Political Power untuk memimpin blok Eropa Timur'
    ],
    cons: [
      'Dihimpit langsung oleh dua raksasa Jerman dan Uni Soviet secara bersamaan'
    ],
    keyEffectsSummary: 'Membentuk aliansi pertahanan bersama Eropa Timur untuk membendung imperialisme Soviet dan Jerman.',
    recommendedTiming: '1937-1938',
    historicalContext: 'Visi geopolitik Józef Piłsudski untuk membangun konfederasi negara-negara Eropa Tengah dan Timur.'
  },
  {
    id: 'pol-enigma-cipher',
    countryId: 'pol',
    name: 'Biro Sandi Enigma Polandia (Biuro Szyfrów)',
    originalName: 'Biuro Szyfrów Cipher Bureau',
    iconType: 'research',
    branch: 'Industri Sentral & Teknologi',
    days: 70,
    prerequisites: ['pol-central-industrial-district'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      politicalPower: 60
    },
    pros: [
      '+100% kecepatan dekripsi sandi militer Jerman',
      'Membagikan cetak biru replika mesin Enigma kepada intelijen Inggris dan Prancis sebelum Polandia jatuh',
      '+60 Political Power'
    ],
    cons: [
      'Membutuhkan slot riset aktif selama 70 hari'
    ],
    keyEffectsSummary: 'Matematikawan Marian Rejewski memecahkan mekanisme Enigma Jerman pertama kali di dunia.',
    recommendedTiming: '1936-1937',
    historicalContext: 'Tahun 1932, matematikawan Polandia Marian Rejewski, Jerzy Różycki, dan Henryk Zygalski memecahkan sandi militer Enigma.'
  },
  {
    id: 'pol-hel-fortress',
    countryId: 'pol',
    name: 'Kubah Benteng Semenanjung Hel & Westerplatte',
    originalName: 'Fortify Hel Peninsula',
    iconType: 'military',
    branch: 'Pertahanan Garis Depan & Benteng',
    days: 70,
    prerequisites: ['pol-fortify-warsaw'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      warSupport: 10
    },
    pros: [
      '+4 Benteng Pesisir dan Darat di Semenanjung Hel dan Westerplatte',
      'Baterai meriam kaliber berat pesisir menahan serbuan kapal perang dan marinir Kriegsmarine selama berminggu-minggu',
      '+10% War Support'
    ],
    cons: [
      'Mudah terkepung jika daratan utama Polandia runtuh'
    ],
    keyEffectsSummary: 'Membangun kubah pertahanan kokoh di Semenanjung Hel yang bertahan hingga hari-hari terakhir pertempuran 1939.',
    recommendedTiming: '1938-1939',
    historicalContext: 'Garnisun Hel bertahan selama 32 hari melawan pemboman darat, laut, dan udara Jerman pada September 1939.'
  },

  // =========================================================================
  // 9. CHINA (CHI) - EXPANDED HISTORICAL & TACTICAL
  // =========================================================================
  {
    id: 'chi-falkenhausen-mission',
    countryId: 'chi',
    name: 'Misi Militer Penasihat Jerman (Alexander von Falkenhausen)',
    originalName: 'German Military Mission',
    iconType: 'military',
    branch: 'Reformasi Angkatan Darat & Modernisasi',
    days: 70,
    prerequisites: ['chi-three-principles'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      armyXP: 35,
      milFactories: 2
    },
    pros: [
      '+35 Army XP instan untuk menyusun divisi infanteri modern 8-2 atau 9-1',
      '+2 Pabrik Militer yang memproduksi senapan Mauser Kar98k versi Tiongkok (Hanyang 88 / Chiang Kai-shek rifle)',
      '20% diskon riset untuk peralatan infanteri dan artileri'
    ],
    cons: [
      'Jerman akan menarik misinya saat Jepang menekan Hitler pada 1938'
    ],
    keyEffectsSummary: 'Modernisasi divisi elit NRA dengan helm baja Jerman dan taktik pertahanan parit modern.',
    recommendedTiming: '1936 (Fokus Awal Wajib)',
    historicalContext: 'Jenderal Alexander von Falkenhausen melatih divisi elit ke-87 dan ke-88 Tiongkok yang bertempur sengit di Shanghai.'
  },
  {
    id: 'chi-burma-road',
    countryId: 'chi',
    name: 'Jalan Burma & Pasukan Sukarelawan Harimau Terbang (Flying Tigers)',
    originalName: 'The Burma Road & Flying Tigers',
    iconType: 'industry',
    branch: 'Logistik Pedalaman & Bantuan Asing',
    days: 70,
    prerequisites: ['chi-relocate-chongqing'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      civFactories: 2,
      airXP: 25
    },
    pros: [
      '+2 Pabrik Sipil dari jalur perdagangan bebas blokade melalui Burma',
      'Menerima sayap pesawat tempur P-40 Warhawk pimpinan Claire Chennault',
      '+25 Air XP untuk membendung pembom udara Jepang di langit pedalaman'
    ],
    cons: [
      'Jalanan sempit rentan dipotong jika Burma diduduki Jepang'
    ],
    keyEffectsSummary: 'Membuka jalur pasokan suplai vital dari India dan Burma serta mendatangkan pilot Flying Tigers AS.',
    recommendedTiming: '1938-1939',
    historicalContext: 'Ratusan ribu buruh Tiongkok memotong pegunungan membangun Jalan Burma untuk memasok persenjataan ke pedalaman.'
  },
  {
    id: 'chi-subjugate-warlords',
    countryId: 'chi',
    name: 'Tundukkan Panglima Perang Warlord (Guangxi & Shanxi)',
    originalName: 'Subjugate the Warlords',
    iconType: 'expansion',
    branch: 'Unifikasi Nasional & Politik',
    days: 70,
    prerequisites: ['chi-three-principles'],
    mutuallyExclusive: [],
    historical: false,
    statsDelta: {
      politicalPower: 150,
      stability: 10
    },
    pros: [
      'Mengirim ultimatum penyerahan kekuasaan kepada Warlord Guangxi, Yunnan, Shanxi, dan Xibei San Ma',
      'Menyerap seluruh pabrik dan manpower tentara warlord ke dalam kendali langsung pemerintah pusat',
      '+150 Political Power dan +10% Stabilitas'
    ],
    cons: [
      'Warlord mungkin menolak dan memicu perang saudara singkat jika tidak didukung kekuatan militer memadai'
    ],
    keyEffectsSummary: 'Mengintegrasikan wilayah-wilayah warlord ke dalam pemerintahan nasionalis terpadu.',
    recommendedTiming: '1936-1937 sebelum agresi Jepang',
    historicalContext: 'Upaya Chiang Kai-shek menyatukan seluruh panglima militer regional ke bawah otoritas Kuomintang.'
  }
];

export const EXPANDED_MAJOR_PRESETS: FocusPresetPath[] = [
  {
    id: 'preset-ger-blitzkrieg-rush',
    countryId: 'ger',
    title: 'Meta Panzer Kilat & U-Boat Atlantik (Full Blitz)',
    description: 'Buka Panzer IV mendahului zaman lewat Perjanjian Kama, bangun benteng Westwall untuk amankan front barat, lalu luncurkan Weserübung dan serbuan wolfpack U-Boat.',
    type: 'meta_historical',
    focusIds: [
      'ger-rhineland',
      'ger-army-innovations-1',
      'ger-treaty-with-ussr',
      'ger-four-year-plan',
      'ger-synthetic-rubber',
      'ger-westwall',
      'ger-u-boat-effort',
      'ger-around-maginot',
      'ger-weserubung'
    ]
  },
  {
    id: 'preset-sov-tankograd-deepbattle',
    countryId: 'sov',
    title: 'Meta Benteng Ural & Ofensif Deep Battle Soviet',
    description: 'Percepat Rencana Lima Tahun Gosplan, evakuasi industri tank ke Pegunungan Ural (Tankograd), terapkan Perintah No. 227, lalu hancurkan Wehrmacht dengan doktrin Deep Battle.',
    type: 'meta_historical',
    focusIds: [
      'sov-path-marxism',
      'sov-the-center',
      'sov-heavy-industry',
      'sov-gosplan-industry',
      'sov-the-great-purge',
      'sov-claims-in-baltic',
      'sov-lessons-of-war',
      'sov-tankograd',
      'sov-order-227',
      'sov-deep-battle'
    ]
  },
  {
    id: 'preset-usa-arsenal-superfortress',
    countryId: 'usa',
    title: 'Meta Arsenal Demokrasi & Bom Atom Dua Samudra',
    description: 'Lanjutkan New Deal, loloskan Lend-Lease, bangun armada kapal raksasa Two-Ocean Navy Act, dan tuntaskan Proyek Manhattan serta armada pembom B-29 Superfortress.',
    type: 'meta_historical',
    focusIds: [
      'usa-continue-new-deal',
      'usa-lend-lease',
      'usa-scientific-research',
      'usa-arsenal-of-democracy',
      'usa-war-production-board',
      'usa-two-ocean-navy',
      'usa-b29-superfortress',
      'usa-manhattan-project'
    ]
  },
  {
    id: 'preset-eng-stand-firm-bletchley',
    countryId: 'eng',
    title: 'Meta Pertahanan Total Inggris: Bletchley Park & Churchill',
    description: 'Bentengi Terusan Suez dan Gibraltar, terapkan radar dan Shadow Industry, pecahkan sandi Enigma di Bletchley Park, dan kobarkan pidato pantang menyerah Blood Toil Tears.',
    type: 'meta_historical',
    focusIds: [
      'eng-revisit-colonial-policy',
      'eng-reinforce-empire',
      'eng-shadow-industry',
      'eng-radar-stations',
      'eng-tizard-mission',
      'eng-bletchley-park',
      'eng-war-committee',
      'eng-churchill-blood-toil',
      'eng-home-defence'
    ]
  },
  {
    id: 'preset-jap-yamato-pearlharbor',
    countryId: 'jap',
    title: 'Meta Tora! Tora! Tora! & Lumbung Minyak Selatan',
    description: 'Bersihkan Kodoha, bangun monster super-battleship Yamato, serang Pearl Harbor, lalu rebut ladang minyak raksasa Palembang dan Balikpapan sebelum kehabisan bahan bakar.',
    type: 'meta_historical',
    focusIds: [
      'jap-purge-kodoha',
      'jap-guide-zaibatsus',
      'jap-zero-fighter',
      'jap-southern-expansion',
      'jap-super-battleship-yamato',
      'jap-strike-south-oil',
      'jap-pearl-harbor'
    ]
  },
  {
    id: 'preset-fra-degaulle-maginot',
    countryId: 'fra',
    title: 'Meta Reformasi De Gaulle & Benteng Alpen Prancis',
    description: 'Bentuk Front Populer, perpanjang Maginot ke utara, bentengi pegunungan Alpen melawan Italia, dan bangun divisi lapis baja mandiri Charles de Gaulle.',
    type: 'meta_historical',
    focusIds: [
      'fra-devalue-franc',
      'fra-popular-front',
      'fra-colonial-troops',
      'fra-extend-maginot-line',
      'fra-alpine-line',
      'fra-army-reform',
      'fra-de-gaulle-tanks'
    ]
  },
  {
    id: 'preset-ita-marenostrum-steel',
    countryId: 'ita',
    title: 'Meta Mare Nostrum Romawi & Komando Selam Decima MAS',
    description: 'Tuntaskan logistik Abisinia, aneksasi Albania, bangun supremasi angkatan laut Mare Nostrum dengan komando Decima MAS, lalu tandatangani Pakta Baja.',
    type: 'meta_historical',
    focusIds: [
      'ita-ethiopian-war-logistics',
      'ita-annex-albania',
      'ita-naval-effort',
      'ita-mare-nostrum',
      'ita-decima-mas',
      'ita-pact-of-steel'
    ]
  },
  {
    id: 'preset-chi-falkenhausen-burma',
    countryId: 'chi',
    title: 'Meta Penasihat Jerman & Jalur Pasokan Jalan Burma',
    description: 'Gunakan penasihat militer Jerman Alexander von Falkenhausen untuk melatih infanteri elit, bentuk Front Persatuan, evakuasi industri ke Chongqing, dan buka Jalan Burma.',
    type: 'meta_historical',
    focusIds: [
      'chi-three-principles',
      'chi-falkenhausen-mission',
      'chi-united-front',
      'chi-army-reform',
      'chi-relocate-chongqing',
      'chi-burma-road'
    ]
  }
];
