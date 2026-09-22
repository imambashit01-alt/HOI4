import { CountryStrategy } from '../types';

export const MAJOR_COUNTRY_STRATEGIES: CountryStrategy[] = [
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
    leaderTitle: 'Führer und Reichskanzler',
    portraitUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Hitler_portrait_crop.jpg/300px-Hitler_portrait_crop.jpg',
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
    proTips: 'Jalankan misi Collaboration Government di Uni Soviet 2-3 kali sebelum Operasi Barbarossa 1941 agar Soviet langsung menyerah saat Moskow, Leningrad, dan Stalingrad jatuh!',
    geopoliticalContext: 'Jerman mengawali tahun 1936 terkekang oleh Perjanjian Versailles dengan zona Rhineland yang terdemiliterisasi. Namun dengan basis industri baja terbaik di Eropa dan kepemimpinan militer terpadu, Jerman adalah motor penggerak Perang Dunia II. Posisi geopolitik diapit Prancis/Inggris di barat dan raksasa Uni Soviet di timur menuntut strategi perang kilat (Blitzkrieg) sebelum musuh sempat memobilisasi kekuatan penuh.',
    howToGetRich: {
      civSnowball: 'Manfaatkan MEFO Bills yang memberi +25% kecepatan konstruksi pabrik militer & infrastruktur. Bangun Pabrik Sipil di Rheinland, Moselland, dan Silesia (Infra Lv.5) hingga Juni 1937. Caplok Austria (Anschluss) dan Cekoslowakia (Sudetenland & Fate of Czechoslovakia) untuk mendapatkan 30+ pabrik gratis tanpa menembakkan satu peluru pun!',
      resourceStrategy: 'Jerman kebanjiran Baja dan Aluminium, tetapi 100% defisit Karet dan Minyak. Wajib bangun 6-10 Synthetic Refineries di pedalaman Jerman dan impor minyak dari Rumania lewat rel darat agar tidak bisa diblokade Sekutu.',
      tradePolicy: 'Gunakan Free Trade di tahun 1936-1937 untuk menggenjot riset dan output pabrik, lalu ubah ke Limited Exports menjelang pecah perang pada 1939 agar bajamu tidak tersedot keluar.',
      warPlunder: 'Jalankan 3x Collaboration Government di Uni Soviet dan Prancis. Saat Prancis kapitulasi, sita seluruh armada laut dan cadangan emas mereka. Di Soviet, kamu akan menyerap jutaan barel minyak Kaukasus dan ratusan pabrik di Donbass.'
    },
    howToWinWar: {
      recommendedDoctrine: 'Mobile Warfare (Cabang Kanan: Blitzkrieg). Memberi bonus terobosan tank, kecepatan gerak +15%, dan pemulihan organisasi luar biasa.',
      recommendedTemplate: 'Spearhead: 8 Medium Tank + 7 Motorized (30w) dengan Support Flame Tank, Artileri, Engineer, dan Logistics. Dinding Parit: 9 Infanteri (18w) dengan Support AA & Artileri.',
      theaterStrategy: 'Polandia (Sep 1939): Sapu bersih dalam 14 hari. Front Barat (Mei 1940): Lewati Garis Maginot via Belgia dan Luksemburg, potong jalur Sekutu menuju Dunkirk dan masuki Paris. Front Timur (Juni 1941): Eksekusi 3 pincer raksasa di Bialystok, Kiev, dan Smolensk untuk memusnahkan 100 divisi Tentara Merah di tahun pertama.',
      navalAirAdvice: 'Di udara, produksi 1.500 Me-109 (Fighter) dan 800 Ju-87 Stuka (CAS). Di laut, jangan buang sumber daya membuat Battleship mahal; produksi 50 U-boat Tipe VII dengan Snorkel untuk memburu konvoi suplai Inggris di Atlantik.'
    },
    howToMasterPolitics: {
      topAdvisors: ['Martin Bormann (Silent Workhorse +15% PP)', 'Hjalmar Schacht (Captain of Industry +10% Civs & Infra)', 'Heinz Guderian (Pakar Tank +10% Speed & Attack)', 'Ferdinand Schörner (Infantry Genius)'],
      stabilityWarSupport: 'Remiliterisasi Rhineland langsung memberi +5% War Support. Stabilitas Jerman sangat tinggi (85-90%), maksimalkan dengan fokus politik Partai Fasis.',
      debuffHandling: 'MEFO Bills akan meledak jika Jerman tidak berperang pada 1939. Jangan menunda perang; agresi terencana adalah satu-satunya cara melunasi utang MEFO Bills tanpa kebangkrutan.',
      recommendedFocusOrder: ['Rhineland', 'Four Year Plan', 'Autarky', 'Hermann Göring-Werke', 'KdF-Wagen', 'Extra Research Slot', 'Anschluss', 'Reassert Eastern Claims', 'Demand Sudetenland']
    },
    stepByStepGameplan: {
      phase1: '1936-1937: Remiliterisasi Rhineland, manfaatkan MEFO Bills untuk membanjiri Jerman dengan Pabrik Sipil di zona infrastruktur level 5. Riset Industri dan Komputasi tanpa henti.',
      phase2: '1938-1939: Caplok Austria dan Cekoslowakia. Alihkan 100% produksi ke Medium Tank Pz.IV dan Fighter Bf 109. Invasi Polandia September 1939.',
      phase3: '1940-1942: Taklukkan Prancis lewat Ardennes dalam 3 pekan. Siapkan 3x Collaboration Government di Soviet, lalu luncurkan Operasi Barbarossa dengan 120 divisi infanteri dan 8 divisi Medium Tank.',
      phase4: '1943-1945: Rebut Moskow, Stalingrad, dan ladang minyak Baku. Lakukan Operasi Singa Laut (Sealion) menyeberangi Selat Dover untuk mengkapitulasi Inggris Raya dan mendominasi Eropa.'
    },
    startingForces: {
      divisions: 30,
      airplanes: 864,
      ships: 36,
      manpowerPool: '1.24 Juta'
    },
    vitalResources: {
      surplus: ['Baja (Steel)', 'Aluminium'],
      deficits: ['Minyak (Oil)', 'Karet (Rubber)', 'Tungsten'],
      oilStatus: 'Kritis (Defisit Parah) - Bergantung pada impor Rumania & Kilang Sintetis',
      rubberStatus: 'Nol (Wajib Sintetis Karet Katalis Batubara)'
    }
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
    leaderTitle: 'Sekretaris Jenderal Partai Komunis & Vozhd',
    portraitUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Joseph_Stalin_in_July_1941.jpg/300px-Joseph_Stalin_in_July_1941.jpg',
    startingCivilianFactories: 42,
    startingMilitaryFactories: 24,
    startingDockyards: 6,
    doctrineRecommendation: 'Mass Assault (Deep Battle) atau Superior Firepower',
    focusPath1936: [
      'The Path of Marxism-Leninism (Jalur Utama)',
      'The Center (Jalur Stalin)',
      'Securing the Administration (Konsolidasi)',
      'The Great Purge (Pembersihan Militer)',
      'Found the PCDI (Pabrik Sipil Tambahan)',
      'Expand the Agitprop (Bonus War Support & Stabilitas)',
      'Third Five Year Plan (Industrialisasi Soviet)'
    ],
    industryStrategy: 'Soviet memiliki ruang tanpa batas di balik Pegunungan Ural. Bangun 100% Pabrik Sipil di Moskow, Gorky, dan Ural hingga pertengahan 1938. Ambil fokus "Relocate Industry to the Urals" jika garis depan terancam mundur.',
    militaryStrategy: 'Pertahankan Garis Sungai Stalin (Daugava - Dnieper) atau Garis Perbatasan Polandia. Latih 150-200 divisi Infanteri murah untuk menyerap pukulan tank Jerman, lalu hantam balik dengan gelombang T-34 Medium Tank dan peluncur roket Katyusha.',
    keyChallenges: [
      'Debuff melumpuhkan dari The Great Purge (-50% Org militer jika tidak diselesaikan tepat waktu)',
      'Gelombang serangan Blitzkrieg Jerman pada Juni 1941',
      'Infrastruktur luas dan berlumpur (Rasputitsa) yang menyiksa logistik'
    ],
    proTips: 'Pindahkan pabrik ke Ural melalui keputusan evakuasi pabrik jika kota-kota barat terancam jatuh. Waktu adalah sekutu terbaik Soviet!',
    geopoliticalContext: 'Negara terluas di dunia dengan cadangan tenaga manusia (manpower) dan sumber daya tak terhingga. Namun, Soviet pada tahun 1936 tercekik oleh paranoia politik Stalin dan keterbelakangan teknologi. Mengelola waktu Pembersihan Besar-Besaran (The Great Purge) dan membangun benteng industri di timur adalah kunci mempertahankan tanah air dari ancaman Fasis.',
    howToGetRich: {
      civSnowball: 'Soviet memiliki 42 Civs awal. Bangun Civs di Moskow, Leningrad, Yaroslavl, dan Pegunungan Ural (Infra Lv.4-5) hingga akhir 1938. Selesaikan Rencana Lima Tahun Ketiga (Third Five Year Plan) untuk membuka lusinan slot pabrik gratis.',
      resourceStrategy: 'Soviet memiliki cadangan Minyak terbesar di Eropa (Baku & Kaukasus), kromium melimpah, dan baja masif. Hanya kekurangan sedikit Karet dan Tungsten yang bisa diimpor dari Asia Tenggara.',
      tradePolicy: 'Gunakan Export Focus untuk mengalirkan PP dan riset sambil tetap mempertahankan 50% sumber daya mentah untuk industri pertahanan dalam negeri.',
      warPlunder: 'Setelah mengalahkan Jerman, Soviet berhak atas seluruh Jerman Timur, Polandia, Hungaria, Rumania, dan Cekoslowakia di Konferensi Perdamaian. Bentuk Blok Pakta Warsawa untuk menguasai 300+ pabrik Eropa Timur.'
    },
    howToWinWar: {
      recommendedDoctrine: 'Mass Assault (Deep Battle): Memberi reinforcement rate masif, pengurangan supply consumption, dan recovery rate tertinggi di game.',
      recommendedTemplate: 'Dinding Dnieper: 9 Infanteri + 1 Artileri (20w) dengan Support AA, Engineer, & Recon. Pemukul T-34: 8 Medium Tank + 7 Motorized dengan Support Flame Tank & Logistics.',
      theaterStrategy: 'Buat garis pertahanan sekunder di sepanjang Sungai Dnieper dan Daugava. Biarkan tentara Jerman kehabisan bensin dan pasokan di lumpur musim gugur (Rasputitsa) dan musim dingin Soviet (-40°C), lalu luncurkan Operasi Uranus untuk mengepung 6. Armee musuh.',
      navalAirAdvice: 'Abaikan angkatan laut besar; cukup bangun kapal selam di Laut Baltik dan Laut Hitam. Fokuskan 80% industri udara ke Fighter Yak-9 dan pesawat serbu darat Il-2 Sturmovik (CAS).'
    },
    howToMasterPolitics: {
      topAdvisors: ['Vyacheslav Molotov (Silent Workhorse +15% PP)', 'Lazar Kaganovich (Captain of Industry)', 'Georgy Zhukov (Military Genius +15% Soft Attack)', 'Konstantin Rokossovsky (Armor Specialist)'],
      stabilityWarSupport: 'Gunakan sistem Agitprop untuk memasang poster propaganda yang memberi +10% Stabilitas, +10% War Support, dan bonus produksi senjata harian.',
      debuffHandling: 'Selesaikan "The Great Purge" sebelum 1938 agar penalti militer selesai sebelum Operasi Barbarossa. Lakukan fokus "Lessons of War" segera setelah Perang Musim Dingin melawan Finlandia untuk menghapus seluruh penalti Purge.',
      recommendedFocusOrder: ['The Path of Marxism-Leninism', 'The Center', 'The Great Purge', 'Found the PCDI', 'Expand the Agitprop', 'Third Five Year Plan', 'Lessons of War', 'Reorganize the Red Army']
    },
    stepByStepGameplan: {
      phase1: '1936-1937: Eksekusi The Great Purge untuk membersihkan pengkhianat politik. Bangun pabrik sipil di Moskow dan Ural. Kirim relawan dan tank ke Perang Saudara Spanyol untuk mengumpulkan Army XP.',
      phase2: '1938-1939: Beralih ke produksi massal Pabrik Militer, Senapan SVT-40, dan Artileri. Tundukkan Finlandia dalam Perang Musim Dingin dan caplok negara-negara Baltik serta Bessarabia.',
      phase3: '1940-1942: Hadapi serbuan Barbarossa Jerman. Tahan di garis sungai Dnieper. Manfaatkan atrisi lumpur dan musim dingin untuk mengikis tank Jerman.',
      phase4: '1943-1945: Luncurkan Operasi Bagration. Dorong jutaan prajurit Tentara Merah dan ratusan tank T-34 hingga menembus Warsawa dan mengibarkan bendera merah di atas Reichstag Berlin.'
    },
    startingForces: {
      divisions: 138,
      airplanes: 1200,
      ships: 55,
      manpowerPool: '2.80 Juta'
    },
    vitalResources: {
      surplus: ['Minyak (Baku)', 'Baja', 'Kromium'],
      deficits: ['Karet', 'Tungsten'],
      oilStatus: 'Sangat Mandiri (Raksasa Minyak Dunia)',
      rubberStatus: 'Defisit Ringan'
    }
  },
  {
    id: 'usa',
    tag: 'USA',
    name: 'Amerika Serikat (USA)',
    faction: 'Allies (Sekutu)',
    difficulty: 'Sangat Mudah',
    flagColors: ['#1e3a8a', '#b91c1c'],
    flagSymbol: '★',
    ideology: 'Democratic',
    leader: 'Franklin D. Roosevelt',
    leaderTitle: 'Presiden ke-32 Amerika Serikat',
    portraitUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/FDR_1944_Color_Portrait.jpg/300px-FDR_1944_Color_Portrait.jpg',
    startingCivilianFactories: 128,
    startingMilitaryFactories: 10,
    startingDockyards: 22,
    doctrineRecommendation: 'Superior Firepower (Integrated Support) & Base Strike (Laut)',
    focusPath1936: [
      'Continue the New Deal (Lanjutkan New Deal)',
      'WPA (Pekerjaan Umum)',
      'Agricultural Adjustment Act',
      'Federal Housing Act',
      'Fair Labour Standards Act',
      'Department of Defense',
      'Arsenal of Democracy'
    ],
    industryStrategy: 'Raksasa yang tertidur. Hapus Great Depression secepat mungkin via fokus New Deal. Mulai 1938-1939 saat World Tension naik, ubah ekonomi ke Giant Wakes dan Arsenal of Democracy untuk memproduksi 300+ pabrik militer.',
    militaryStrategy: 'Manfaatkan keunggulan udara mutlak dan angkatan laut modern. Produksi ribuan Strategic Bomber untuk meratakan industri Poros dari udara, serta 8-12 armada kapal induk untuk mendominasi Samudra Pasifik.',
    keyChallenges: [
      'Debuff dahsyat Great Depression (-50% Factory Output, -35% Civs)',
      'Isolasionisme politik ketat yang membatasi intervensi luar negeri',
      'Perang di dua samudra sekaligus (Atlantik dan Pasifik)'
    ],
    proTips: 'Gunakan pangkalan udara di Inggris untuk meluncurkan ribuan Strategic Bomber membombardir pabrik Jerman tanpa risiko kehilangan pasukan darat!',
    geopoliticalContext: 'Kekuatan ekonomi nomor satu di dunia yang terkurung oleh samudra dan sentimen isolasionisme rakyatnya. Mengawali tahun 1936 dengan luka Great Depression dan Neutrality Act, Amerika Serikat adalah raksasa tertidur yang jika berhasil bangun akan memiliki kapasitas industri yang mampu menenggelamkan gabungan seluruh kekuatan Poros.',
    howToGetRich: {
      civSnowball: 'AS memiliki 128 Pabrik Sipil awal, namun sebagian besar terkunci oleh Great Depression. Selesaikan fokus New Deal dan Department of Defense. Saat World Tension melewati batas 20-30%, ambil fokus "The Giant Wakes" untuk membuka seluruh kapasitas pabrik sipil dan melipatgandakan kecepatan konstruksi hingga batas tak tertandingi.',
      resourceStrategy: 'AS adalah produsen Minyak, Baja, dan Aluminium terbesar di bumi. Cadangan minyak Texas dan California mencukupi seluruh kebutuhan kapal dan pesawat Sekutu. Hanya kekurangan Karet yang bisa diamankan dari Amerika Selatan atau Asia.',
      tradePolicy: 'Pertahankan Free Trade sepanjang permainan. Seluruh dunia akan membeli minyak dan bajamu, memberimu puluhan pabrik sipil ekstra setiap hari secara cuma-cuma.',
      warPlunder: 'AS tidak memerlukan rampasan perang; kapasitas industrimu sendiri dapat mencapai 450+ pabrik pada tahun 1943, cukup untuk mendanai militer seluruh blok Sekutu via Lend-Lease.'
    },
    howToWinWar: {
      recommendedDoctrine: 'Superior Firepower: Cabang Integrated Support + Air-Land Battle. Memaksimalkan Soft Attack infanteri dan keunggulan udara mutlak.',
      recommendedTemplate: 'US Marine Corps: 10 Marine + 4 Marine Artillery (Combat Width 28-30) untuk invasi amfibi kepulauan Pasifik. US Army: 9 Infanteri + 2 Artileri + Support Medis & AA. Sherman Spearhead: 8 Medium Tank + 7 Mechanized.',
      theaterStrategy: 'Pasifik: Island-Hopping dari Pearl Harbor ke Marshall Islands, Mariana, Iwo Jima, hingga ke pulau utama Jepang. Eropa: Lakukan invasi Operasi Torch di Afrika Utara, lalu Operasi Husky di Sisilia, dan Operasi Overlord (D-Day) di Normandia.',
      navalAirAdvice: 'Laut: Bentuk 4 Armada Task Force dengan masing-masing 4 Aircraft Carrier (Fleet Carriers) + 4 Battleship + 20 Destroyer. Udara: Produksi 3.000 B-17/B-29 Flying Fortress untuk menghancurkan infrastruktur Poros hingga rata dengan tanah.'
    },
    howToMasterPolitics: {
      topAdvisors: ['Harold Ickes (Silent Workhorse +15% PP)', 'Harry Hopkins (Civilian Industry Specialist)', 'Dwight D. Eisenhower (Army Chief of Staff)', 'Chester W. Nimitz (Naval Genius)'],
      stabilityWarSupport: 'War Support awal AS sangat rendah karena Neutrality Acts. Rebut momentum saat insiden USS Panay terjadi di Tiongkok dan saat pengeboman Pearl Harbor oleh Jepang untuk langsung mengaktifkan hukum militer tertinggi.',
      debuffHandling: 'Hapus Great Depression lewat jalur New Deal dengan mengambil fokus Federal Housing Act dan Fair Labor Standards Act. Jangan biarkan Senat dan Kongres menghalangi undang-undang darurat.',
      recommendedFocusOrder: ['Continue the New Deal', 'WPA', 'Agricultural Adjustment Act', 'Federal Housing Act', 'Fair Labour Standards Act', 'Department of Defense', 'Two Ocean Navy Act', 'The Giant Wakes']
    },
    stepByStepGameplan: {
      phase1: '1936-1937: Fokus hapus Great Depression. Bangun pabrik sipil dan perluas galangan kapal di pesisir Pasifik dan Atlantik.',
      phase2: '1938-1939: Selesaikan Two Ocean Navy Act. Mulai produksi kapal induk kelas Essex dan kapal tempur kelas Iowa. Kirim bantuan senjata Lend-Lease ke Inggris dan Tiongkok.',
      phase3: '1940-1942: Bangun The Giant Wakes setelah Pearl Harbor. Mobilisasi 100 divisi tempur. Lakukan serangan udara masif dan kalahkan armada gabungan Jepang di Pertempuran Midway.',
      phase4: '1943-1945: D-Day di Normandia membebaskan Paris. Buka Proyek Manhattan, riset bom atom, dan jatuhkan nuklir di Hiroshima dan Nagasaki untuk mengakhiri perang seketika.'
    },
    startingForces: {
      divisions: 36,
      airplanes: 915,
      ships: 220,
      manpowerPool: '1.45 Juta'
    },
    vitalResources: {
      surplus: ['Minyak (Terbesar di Bumi)', 'Baja', 'Aluminium'],
      deficits: ['Karet', 'Kromium'],
      oilStatus: 'Cadangan Terbesar di Dunia (Eksportir Utama Global)',
      rubberStatus: 'Defisit Ringan'
    }
  },
  {
    id: 'eng',
    tag: 'ENG',
    name: 'Inggris Raya (United Kingdom)',
    faction: 'Allies (Sekutu)',
    difficulty: 'Sedang',
    flagColors: ['#1e3a8a', '#dc2626'],
    flagSymbol: '♚',
    ideology: 'Democratic',
    leader: 'Neville Chamberlain / Winston Churchill',
    leaderTitle: 'Perdana Menteri Inggris & Menteri Pertahanan',
    portraitUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Sir_Winston_Churchill_-_1941%2C_by_Yousuf_Karsh.jpg/300px-Sir_Winston_Churchill_-_1941%2C_by_Yousuf_Karsh.jpg',
    startingCivilianFactories: 35,
    startingMilitaryFactories: 19,
    startingDockyards: 24,
    doctrineRecommendation: 'Grand Battleplan atau Superior Firepower & Fleet in Being (Laut)',
    focusPath1936: [
      'Reinforce the Empire (Perkuat Kerajaan)',
      'Shadow Scheme (Pabrik Militer Tersembunyi)',
      'Tizard Mission (Kolaborasi Riset Sekutu)',
      'Radar Stations (Jaringan Pertahanan Udara)',
      'Fighter Command (Spitfire Interceptor)',
      'Steady as She Goes (Stabilitas Politik)',
      'General Rearmament (Persenjataan Penuh)'
    ],
    industryStrategy: 'Maksimalkan fokus "Shadow Scheme" untuk mendapatkan pabrik militer gratis. Manfaatkan sumber daya tak terbatas dari Dominion dan koloni (Karet Malaya, Minyak Timur Tengah, Baja Raj India).',
    militaryStrategy: 'Jaga keunggulan laut mutlak dengan Royal Navy agar wilayah kepulauan Inggris kebal invasi laut. Menangkan Pertempuran Britania di udara dengan pesawat tempur Spitfire dan jaringan Radar Channel, lalu serang Afrika Utara untuk mengamankan Terusan Suez.',
    keyChallenges: [
      'Garis pasokan maritim yang rentan diserang kawanan kapal selam (Wolfpacks) U-Boat Jerman',
      'Wilayah jajahan yang tersebar di 5 benua yang sulit dijaga secara serentak',
      'Kapasitas manpower pulau utama yang terbatas'
    ],
    proTips: 'Bangun jaringan Radar di sepanjang Selat Dover dan pantai selatan Inggris untuk memberi Fighter-mu buff deteksi dan efektivitas tempur +25%!',
    geopoliticalContext: 'Kekaisaran maritim terluas di dunia dengan garis depan di setiap samudra. Meski angkatan daratnya kecil pada 1936, Inggris dilindungi oleh benteng parit alami (Selat Inggris) dan armada Royal Navy yang mendominasi lautan. Kunci kemenangan Inggris adalah memblokade ekonomi Jerman dan menjaga jalur suplai koloni tetap terbuka.',
    howToGetRich: {
      civSnowball: 'Fokuskan pembangunan Pabrik Sipil di Inggris Tengah dan Skotlandia. Ambil fokus "Shadow Scheme" yang memberikan pabrik militer ekstra saat ancaman perang meningkat. Manfaatkan perdagangan Commonwealth untuk mengumpulkan civs devisa.',
      resourceStrategy: 'Kekaisaran Inggris mengontrol 80% Karet dunia di Malaya dan Sri Lanka, serta pasokan Minyak di Persia/Irak dan Aluminium di Karibia. Pertahankan kendali Terusan Suez agar sumber daya ini bisa mengalir lancar ke London.',
      tradePolicy: 'Terapkan Free Trade di awal untuk riset teknologi Spitfire dan Radar, lalu ubah ke Export Focus saat perang pecah.',
      warPlunder: 'Gunakan blokade laut di Laut Utara dan Selat Gibraltar untuk mencekik impor bahan mentah Poros, membuat pabrik musuh mati kelaparan sumber daya.'
    },
    howToWinWar: {
      recommendedDoctrine: 'Grand Battleplan (Infanteri pertahanan dengan Max Planning +30%) atau Superior Firepower. Di laut: Fleet in Being untuk dominasi Battleship dan Carrier.',
      recommendedTemplate: 'Home Guard: 9 Infanteri + Support AA, AT, & Artileri. Desert Rats (Afrika): 6 Motorized + 2 Tank Ringan/Medium dengan Logistics Company.',
      theaterStrategy: 'Afrika Utara: Dorong pasukan Italia keluar dari Libya dan amankan Alexandria/Suez. Laut Tengah: Tenggelamkan armada Regia Marina Italia di Taranto. Pertempuran Britania: Tempatkan 1.000 Fighter Spitfire di Southern England untuk membantai bomber Luftwaffe.',
      navalAirAdvice: 'Bagi Royal Navy menjadi Home Fleet (patroli Laut Utara), Mediterranean Fleet (Alexandria & Gibraltar), dan Force Z di Singapura. Pasang Radar di pantai Kent dan Sussex.'
    },
    howToMasterPolitics: {
      topAdvisors: ['Stanley Baldwin / Winston Churchill (War Leader +15% War Support & Attack)', 'John Maynard Keynes (Financial Expert)', 'Bernard Montgomery (Armor Specialist)', 'Hugh Dowding (Air Superiority Genius)'],
      stabilityWarSupport: 'Inggris memiliki stabilitas sangat tinggi (85%+). Ganti Neville Chamberlain dengan Winston Churchill setelah Prancis jatuh untuk mendapatkan buff War Support dan resistensi invasi tak tergoyahkan.',
      debuffHandling: 'Atasi krisis Raja Edward VIII (Abdication Crisis) dengan cepat: dukung pernikahan morganatik atau paksa turun tahta agar Raja George VI naik tanpa perang saudara.',
      recommendedFocusOrder: ['Reinforce the Empire', 'Shadow Scheme', 'Tizard Mission', 'Radar Stations', 'Fighter Command', 'General Rearmament', 'Air Defense', 'War with Germany']
    },
    stepByStepGameplan: {
      phase1: '1936-1937: Atasi krisis suksesi tahta. Bangun pabrik sipil dan kembangkan riset Spitfire serta teknologi Radar pertama di dunia.',
      phase2: '1938-1939: Selesaikan Shadow Scheme. Bangun kapal pengawal Destroyer untuk berburu kapal selam. Jamin kemerdekaan Polandia untuk memicu blokade Sekutu.',
      phase3: '1940-1942: Menangkan Battle of Britain di atas langit Selat Dover. Hancurkan tentara Italia di Afrika Utara dan amankan Terusan Suez dan ladang minyak Irak.',
      phase4: '1943-1945: Bersama Amerika Serikat luncurkan invasi amfibi ke Sisilia dan Normandia. Bebaskan Prancis, Belgia, dan Belanda, lalu duduki Jerman Barat.'
    },
    startingForces: {
      divisions: 40,
      airplanes: 880,
      ships: 284,
      manpowerPool: '850 Ribu'
    },
    vitalResources: {
      surplus: ['Baja', 'Karet (Malaya)', 'Aluminium'],
      deficits: ['Minyak (Impor dari Koloni Timur Tengah)'],
      oilStatus: 'Tergantung Jalur Konvoi Suez & Irak',
      rubberStatus: 'Monopoli Dunia (Karet Malaya Melimpah)'
    }
  },
  {
    id: 'jap',
    tag: 'JAP',
    name: 'Kekaisaran Jepang (Empire of Japan)',
    faction: 'Greater East Asia Co-Prosperity Sphere',
    difficulty: 'Menantang',
    flagColors: ['#dc2626', '#f8fafc'],
    flagSymbol: '☀',
    ideology: 'Fascism',
    leader: 'Kaisar Hirohito (Shōwa) / Hideki Tojo',
    leaderTitle: 'Kaisar ke-124 Jepang (Tenno)',
    portraitUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Emperor_Hirohito_in_dress_uniform.jpg/300px-Emperor_Hirohito_in_dress_uniform.jpg',
    startingCivilianFactories: 24,
    startingMilitaryFactories: 20,
    startingDockyards: 18,
    doctrineRecommendation: 'Grand Battleplan (Infiltrasi) atau Superior Firepower & Base Strike (Laut)',
    focusPath1936: [
      'Purge the Kodoha Faction (Hapus Faksi Kodoha)',
      'Guide the Zaibatsus (Kendalikan Konglomerat)',
      'National Mobilization Law (Mobilisasi Total)',
      'Spiritual Mobilization',
      'Marco Polo Bridge Incident (Invasi Tiongkok)',
      'Establish the Manchurian Project',
      'Strike South Doctrine (Ekspansi ke Selatan)'
    ],
    industryStrategy: 'Jepang terbelenggu kelangkaan sumber daya domestik. Kendalikan konglomerat Zaibatsu untuk memperluas pabrik militer. Rebut wilayah kaya Tiongkok utara dan ladang karet/minyak Hindia Belanda (Indonesia) dan Malaya untuk bahan bakar armada.',
    militaryStrategy: 'Taklukkan Tiongkok secepat mungkin (1937-1939) sebelum Sekutu terbangun. Gunakan invasi laut di Shanghai, Qingdao, dan Guangzhou untuk mengepung ibukota Nanjing. Di laut, gunakan armada kapal induk gabungan (Kido Butai) untuk melumpuhkan armada Pasifik musuh.',
    keyChallenges: [
      'Kekurangan total Minyak, Karet, dan Baja di kepulauan utama Jepang',
      'Perang berlarut-larut di pedalaman Tiongkok yang memakan manpower',
      'Embargo minyak dari Amerika Serikat yang melumpuhkan armada jika tidak merebut Hindia Belanda'
    ],
    proTips: 'Jalankan misi kolaborasi di Tiongkok agar setelah kapitulasi, kamu bisa mengeruk jutaan manpower dan pabrik mereka untuk persiapan menghadapi Amerika Serikat!',
    geopoliticalContext: 'Kekaisaran maritim militeristik di Asia Timur dengan ambisi membentuk "Lingkungan Kemakmuran Bersama Asia Timur Raya". Kepulauan utama Jepang miskin sumber daya alam, memicu doktrin ekspansi militer ke Tiongkok dan ke kepulauan kaya minyak di Asia Tenggara (Hindia Belanda dan Malaya).',
    howToGetRich: {
      civSnowball: 'Bangun Pabrik Sipil di Tokyo, Osaka, dan Kanto (Infra Lv.5). Selesaikan fokus "Guide the Zaibatsus" untuk membuka bonus pabrik dan menghapus debuff korupsi industri.',
      resourceStrategy: 'Jepang hanya memiliki cadangan minyak untuk berlayar selama 1-2 tahun. Sasaran mutlak adalah menguasai Hindia Belanda (Palembang & Tarakan) yang menyimpan minyak terkaya di Asia Tenggara, serta Malaya untuk karet dan tungsten.',
      tradePolicy: 'Gunakan Export Focus di awal untuk devisa, lalu ganti ke Closed Economy jika perang dengan Sekutu pecah.',
      warPlunder: 'Kapitulasi Tiongkok memberikan puluhan pabrik sipil dan jutaan tenaga kerja cadangan. Bentuk Collaboration Government di Tiongkok untuk mengeksploitasi industrinya.'
    },
    howToWinWar: {
      recommendedDoctrine: 'Grand Battleplan (Cabang Kiri: Infiltration). Sangat mematikan di medan perbukitan Tiongkok karena memberikan Night Attack +25% dan Supply Consumption -10%.',
      recommendedTemplate: 'IJA Divisi Standar: 9 Infanteri + 2 Artileri (Combat Width 22) + Support Artileri, Recon, & Engineer. Amfibi SNLF: 8 Marine + Support Artileri untuk serbuan pantai.',
      theaterStrategy: 'Tiongkok: Jangan hanya serang dari utara (Beijing)! Lakukan 3 invasi amfibi serentak di Shanghai, Shandong, dan Kanton untuk memecah tentara Tiongkok menjadi beberapa kantong.',
      navalAirAdvice: 'Bentuk Kido Butai dengan 6 Kapal Induk (Akagi, Kaga, Soryu, Hiryu, Shokaku, Zuikaku) dikawal Cruiser dan Destroyer. Produksi pesawat tempur legendaris A6M Zero dengan jangkauan tempur terjauh di Pasifik.'
    },
    howToMasterPolitics: {
      topAdvisors: ['Kōki Hirota (Silent Workhorse)', 'Ginjiro Fujiwara (Captain of Industry)', 'Tomoyuki Yamashita (Infantry Genius)', 'Isoroku Yamamoto (Naval Genius)'],
      stabilityWarSupport: 'Fokus "Spiritual Mobilization" dan "State Shintoism" memberikan Stabilitas 100% dan War Support 100% yang kebal terhadap pemboman udara Sekutu.',
      debuffHandling: 'Hapus faksi Kodoha di awal agar militer bersatu di bawah faksi Toseiha. Hindari perang dengan Uni Soviet di perbatasan Khalkhin Gol agar fokus militer tidak terpecah.',
      recommendedFocusOrder: ['Purge the Kodoha Faction', 'Guide the Zaibatsus', 'National Mobilization Law', 'Spiritual Mobilization', 'Marco Polo Bridge Incident', 'Secure the North', 'Strike South Doctrine']
    },
    stepByStepGameplan: {
      phase1: '1936-1937: Selesaikan sengketa militer internal. Bangun pabrik dan galangan kapal. Luncurkan insiden Jembatan Marco Polo di pertengahan 1937.',
      phase2: '1938-1939: Eksekusi invasi laut ke Shanghai dan Nanjing. Taklukkan Tiongkok dan bentuk pemerintahan kolaborasi di bawah Wang Jingwei.',
      phase3: '1940-1941: Saat Prancis dan Belanda jatuh di Eropa, tuntut Indochina Prancis dan serbu Hindia Belanda (Indonesia) serta Singapura untuk mengamankan 100% minyak dan karet.',
      phase4: '1942-1945: Luncurkan serangan kejutan ke Pearl Harbor dan Filipina. Rebut seluruh kepulauan Pasifik dan pertahankan cincin pertahanan luar dari serangan balik Sekutu.'
    },
    startingForces: {
      divisions: 60,
      airplanes: 750,
      ships: 190,
      manpowerPool: '1.15 Juta'
    },
    vitalResources: {
      surplus: ['Kromium'],
      deficits: ['Minyak (Kritis Parah)', 'Karet', 'Baja', 'Aluminium'],
      oilStatus: 'Kritis Parah (Wajib Serbu Hindia Belanda/Sumatera)',
      rubberStatus: 'Nol (Wajib Rebut Malaya & Hindia Belanda)'
    }
  },
  {
    id: 'ita',
    tag: 'ITA',
    name: 'Italia (Kingdom of Italy)',
    faction: 'Axis (Blok Poros)',
    difficulty: 'Sedang',
    flagColors: ['#15803d', '#dc2626'],
    flagSymbol: '👑',
    ideology: 'Fascism',
    leader: 'Benito Mussolini',
    leaderTitle: 'Il Duce del Fascismo & Perdana Menteri',
    portraitUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Benito_Mussolini_in_Yugoslavia.jpg/300px-Benito_Mussolini_in_Yugoslavia.jpg',
    startingCivilianFactories: 20,
    startingMilitaryFactories: 19,
    startingDockyards: 11,
    doctrineRecommendation: 'Superior Firepower atau Grand Battleplan & Fleet in Being',
    focusPath1936: [
      'Ethiopian War Logistics (Menangkan Abisinia)',
      'Triumph in Africa (Klaim Kejayaan)',
      'Italian Highways (Infrastruktur Super)',
      'Modernize the Regio Esercito',
      'Extra Research Slot',
      'Pact of Steel (Aliansi Poros)',
      'Mare Nostrum (Kuasai Laut Tengah)'
    ],
    industryStrategy: 'Selesaikan perang Ethiopia dalam waktu 3 bulan untuk mendapatkan bonus stabilitas dan XP. Bangun infrastruktur dan pabrik sipil di wilayah industri Milan, Turin, dan Genoa (Italia Utara) sebelum beralih ke alutsista.',
    militaryStrategy: 'Kuasai Laut Tengah (Mare Nostrum). Tutup Selat Gibraltar dan Terusan Suez agar armada Sekutu terperangkap atau tidak bisa masuk ke Laut Tengah, mengubah Mediterania menjadi danau pribadi Poros.',
    keyChallenges: [
      'Basis industri baja dan minyak yang sangat rapuh dibanding negara besar lainnya',
      'Garis pantai semenanjung yang sangat panjang dan rawan pendaratan amfibi Sekutu',
      'Debuff kepemimpinan militer yang tidak kompeten di awal game'
    ],
    proTips: 'Jika berhasil merebut Terusan Suez dan Gibraltar, seluruh armada Inggris di Laut Tengah akan kelaparan suplai dan mudah ditenggelamkan!',
    geopoliticalContext: 'Negara pelopor ideologi Fasis di Eropa di bawah Benito Mussolini yang berambisi membangkitkan kembali Kejayaan Kekaisaran Romawi. Terletak strategis di jantung Laut Tengah, Italia mengawali tahun 1936 dengan perang aktif di Ethiopia. Meskipun memiliki armada laut besar, basis industrinya paling lemah di antara negara-negara Major.',
    howToGetRich: {
      civSnowball: 'Fokuskan pembangunan pabrik sipil di Piemonte dan Lombardia (Italia Utara) yang memiliki infra level 4-5. Fokus "Italian Highways" memberikan infrastruktur gratis yang mendongkrak kecepatan pembangunan.',
      resourceStrategy: 'Italia kaya akan Aluminium (bahan pesawat) tetapi sangat minim Baja dan Minyak. Impor baja dari Jerman dan minyak dari Rumania lewat rute darat bebas blokade Sekutu.',
      tradePolicy: 'Gunakan Export Focus di awal untuk mengakselerasi riset dan mendapatkan civs dari pembeli aluminium asing.',
      warPlunder: 'Caplok Yugoslavia, Yunani, dan wilayah Prancis Selatan (Nice, Savoie, Corsica). Menguasai tambang bauksit Yugoslavia akan melipatgandakan produksi pesawat tempurmu.'
    },
    howToWinWar: {
      recommendedDoctrine: 'Superior Firepower (Integrated Support) untuk mendongkrak soft attack infanteri gunung (Alpini) Italia.',
      recommendedTemplate: 'Alpini Legiun: 8 Gunung + 2 Artileri + Support Engineer & Artileri. Garis Parit: 9 Infanteri + Support AA & Artileri.',
      theaterStrategy: 'Tutup dua pintu gerbang Laut Tengah: serbu Terusan Suez dari Libya di timur, dan bantu Spanyol merebut Gibraltar di barat. Setelah kedua pintu terkunci, armada Inggris di Mediterania hancur total.',
      navalAirAdvice: 'Regia Marina memiliki 4 Battleship modern (Littorio class). Taruh pesawat pembom torpedo darat (Naval Bombers) di pulau Sisilia, Sardinia, dan Kreta untuk menghujani kapal Inggris yang lewat.'
    },
    howToMasterPolitics: {
      topAdvisors: ['Giacomo Acerbo (Silent Workhorse +15% PP)', 'Alberto Pirelli (Captain of Industry)', 'Rodolfo Graziani (Army Specialist)', 'Inigo Campioni (Naval Specialist)'],
      stabilityWarSupport: 'Kemenangan cepat di Ethiopia memicu peristiwa "Triumph in Africa" yang melambungkan War Support dan Stabilitas hingga 85%+.',
      debuffHandling: 'Hati-hati dengan sistem Grand Council of Fascism: jika Italia kehilangan wilayah inti (misal Sisilia jatuh ke Sekutu), Mussolini bisa dikudeta oleh Pietro Badoglio dan memicu perang saudara!',
      recommendedFocusOrder: ['Ethiopian War Logistics', 'Triumph in Africa', 'Italian Highways', 'Industrial Modernization', 'Extra Research Slot', 'Claims on Yugoslavia', 'Mare Nostrum']
    },
    stepByStepGameplan: {
      phase1: '1936-1937: Tuntaskan perang Ethiopia dalam 90 hari. Bangun industri di Italia Utara dan rekrut penasihat industri.',
      phase2: '1938-1939: Caplok Albania tanpa perlawanan. Siapkan pasukan di perbatasan Yunani dan Yugoslavia.',
      phase3: '1940-1942: Masuk perang bersama Jerman. Tembus perbatasan Mesir dan rebut Kairo serta Terusan Suez.',
      phase4: '1943-1945: Bentuk Imperium Romanum. Rebut seluruh pantai Laut Tengah dan dominasi Timur Tengah.'
    },
    startingForces: {
      divisions: 45,
      airplanes: 600,
      ships: 115,
      manpowerPool: '980 Ribu'
    },
    vitalResources: {
      surplus: ['Aluminium'],
      deficits: ['Minyak', 'Baja', 'Karet', 'Tungsten'],
      oilStatus: 'Defisit Berat (Wajib Impor Rumania / Rebut Timur Tengah)',
      rubberStatus: 'Nol (Wajib Kilang Sintetis)'
    }
  },
  {
    id: 'fra',
    tag: 'FRA',
    name: 'Prancis (French Republic)',
    faction: 'Allies (Sekutu)',
    difficulty: 'Menantang',
    flagColors: ['#1e3a8a', '#dc2626'],
    flagSymbol: '⚜',
    ideology: 'Democratic',
    leader: 'Albert Lebrun / Édouard Daladier',
    leaderTitle: 'Président du Conseil / Pemimpin Free France',
    portraitUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/%C3%89douard_Daladier_1938.jpg/300px-%C3%89douard_Daladier_1938.jpg',
    startingCivilianFactories: 34,
    startingMilitaryFactories: 10,
    startingDockyards: 10,
    doctrineRecommendation: 'Grand Battleplan (Entrenchment) atau Superior Firepower',
    focusPath1936: [
      'Revive the National Bloc',
      'Strengthen the Government',
      'Industrial Expansion',
      'Extend the Maginot Line (Perpanjang Garis Maginot)',
      'Defensive Focus',
      'Army Reform (Hapus Debuff Militer)',
      'Form the Popular Front'
    ],
    industryStrategy: 'Prancis terhambat debuff ekonomi dan kekacauan politik. Hapus debuff "Disjointed Government" secepat mungkin untuk mencegah kapitulasi dini saat stabilitas turun. Bangun pabrik sipil di wilayah selatan dan koloni Aljazair.',
    militaryStrategy: 'Pertahanan mutlak! Perpanjang Garis Benteng Maginot ke arah utara sepanjang perbatasan Belgia (Garis Gamelin). Pasang meriam Anti-Air di setiap divisi untuk menetralkan pesawat CAS Jerman.',
    keyChallenges: [
      'Debuff "Disjointed Government" yang memotong batas kapitulasi hingga -50% (Paris jatuh = langsung kalah)',
      'Kekurangan manpower akibat trauma Perang Dunia I',
      'Industri militer awal yang sangat kecil dibanding Jerman'
    ],
    proTips: 'Jika kamu memperpanjang benteng Maginot hingga ke pantai Selat Inggris (Level 6-7 di perbatasan Belgia), tank Jerman tidak akan pernah bisa menembus wilayah Prancis!',
    geopoliticalContext: 'Pemenang Perang Dunia I yang mengalami trauma fisik dan psikologis mendalam. Di tahun 1936, Prancis memiliki angkatan darat besar di atas kertas dan Garis Maginot yang perkasa, namun dilumpuhkan oleh polarisasi politik internal yang parah, keraguan moral rakyat, dan krisis demografi.',
    howToGetRich: {
      civSnowball: 'Prancis memiliki 34 Civs awal tetapi terhambat undang-undang perburuhan sayap kiri. Bangun Civs di wilayah selatan (Rhône, Aquitaine) yang aman dari serbuan Jerman. Selesaikan fokus Industrial Expansion untuk membuka slot pabrik ekstra.',
      resourceStrategy: 'Prancis memiliki cadangan Baja dan Aluminium terkaya di Eropa Barat. Karet dan minyak dapat didatangkan dari koloni Indochina dan perdagangan laut Sekutu.',
      tradePolicy: 'Gunakan Export Focus untuk mengalirkan PP dan menyerap civs dari Inggris.',
      warPlunder: 'Jika berhasil menahan dan memukul balik Jerman, Prancis dapat menduduki wilayah kaya industri Ruhr dan Rheinland untuk menyerap 60+ pabrik Jerman.'
    },
    howToWinWar: {
      recommendedDoctrine: 'Grand Battleplan: Cabang Kanan (Entrenchment). Memaksimalkan bonus benteng dan entrenchment parit hingga +40% Defense.',
      recommendedTemplate: 'Chasseurs Dinding: 9 Infanteri + 1 Artileri + Support Engineer, Support AA, & Support Recon. Pasang minimal 1 batalion Heavy Tank di beberapa divisi kunci untuk armor bonus.',
      theaterStrategy: 'Tahan di Garis Maginot dan perpanjang benteng di sepanjang sungai Meuse dan perbatasan Belgia. Jangan biarkan Jerman melakukan manuver di Hutan Ardennes!',
      navalAirAdvice: 'Armada Marine Nationale Prancis cukup kuat untuk mengunci Italia di Laut Tengah. Di udara, fokuskan 90% pabrik pesawat ke Fighter Dewoitine D.520 untuk menjaga langit Paris.'
    },
    howToMasterPolitics: {
      topAdvisors: ['Vincent Auriol (Silent Workhorse)', 'Paul Baudouin (Captain of Industry)', 'Philippe Pétain / Charles de Gaulle (Army Theorist)', 'Maxime Weygand (Defense Specialist)'],
      stabilityWarSupport: 'Debuff Disjointed Government adalah momok terbesar. Jangan menyerah pada peristiwa demonstrasi politik; selesaikan fokus "Strengthen the Government" untuk menghapus debuff ini.',
      debuffHandling: 'Hapus penalti militer "Full Employment" dan "Protected Mobilization" secepat mungkin untuk membuka keran manpower pemuda Prancis.',
      recommendedFocusOrder: ['Revive the National Bloc', 'Strengthen the Government', 'Form the Popular Front', 'Industrial Expansion', 'Extend the Maginot Line', 'Army Reform', 'Devolve Defense']
    },
    stepByStepGameplan: {
      phase1: '1936-1937: Atasi ketidakstabilan politik. Bangun pabrik dan mulailah memperkuat pertahanan perbatasan utara.',
      phase2: '1938-1939: Selesaikan fokus Extend the Maginot Line. Bangun benteng level 5-7 di perbatasan Belgia dan Swiss. Lengkapi semua divisi dengan Support Anti-Air.',
      phase3: '1940-1942: Tahan serbuan Blitzkrieg Jerman di balik tembok benteng. Jerman akan kehabisan manpower membentur bentengmu.',
      phase4: '1943-1945: Bersama Inggris dan Uni Soviet, luncurkan serangan balik terkoordinasi menyeberangi Sungai Rhine dan duduki Berlin.'
    },
    startingForces: {
      divisions: 74,
      airplanes: 700,
      ships: 108,
      manpowerPool: '720 Ribu'
    },
    vitalResources: {
      surplus: ['Baja', 'Aluminium'],
      deficits: ['Minyak', 'Karet'],
      oilStatus: 'Tergantung Konvoi Laut dari AS/Timur Tengah',
      rubberStatus: 'Aman dari Koloni Indochina'
    }
  },
  {
    id: 'chi',
    tag: 'CHI',
    name: 'Tiongkok Nasionalis (Republic of China)',
    faction: 'United Front (Front Bersatu)',
    difficulty: 'Ahli',
    flagColors: ['#1e3a8a', '#dc2626'],
    flagSymbol: '☼',
    ideology: 'Non-Aligned',
    leader: 'Chiang Kai-shek',
    startingCivilianFactories: 14,
    startingMilitaryFactories: 9,
    startingDockyards: 1,
    doctrineRecommendation: 'Mass Assault (Mass Mobilization) atau Superior Firepower',
    focusPath1936: [
      'Northern Expedition (Selesaikan Penyatuan)',
      'Subdue the Warlords (Tundukkan Panglima Perang)',
      'United Front (Bentuk Front Bersatu Melawan Jepang)',
      'Army Reform (Hapus Korupsi Militer)',
      'Financial Reform (Reformasi Moneter)',
      'Industrial Foundation',
      'Invite Foreign Investors'
    ],
    industryStrategy: 'Tiongkok memiliki potensi manpower terbesar di dunia (puluhan juta orang), namun industrinya sangat primitif. Bangun pabrik militer murni sejak awal untuk memproduksi senapan infanteri dasar. Pindahkan industri ke pedalaman Sichuan (Chongqing) jika pantai jatuh.',
    militaryStrategy: 'Gunakan taktik bumi hangus dan kedalaman wilayah (Defense in Depth). Jangan bertarung di dataran terbuka melawan artileri Jepang! Tarik pasukan mundur ke perbukitan dan sungai, lalu kurung tentara Jepang dalam perang gerilya berdarah.',
    keyChallenges: [
      'Invasi brutal Jepang pada pertengahan 1937',
      'Debuff dahsyat korupsi militer "Army Incompetence" yang memotong attack dan defense hingga -40%',
      'Kekurangan total pabrik senjata untuk mempersenjatai jutaan tentara'
    ],
    proTips: 'Gunakan Army XP yang didapat dari pertempuran awal untuk segera mengeklik tombol keputusan "Army Reform" beberapa kali hingga debuff korupsi tentara hilang total!',
    geopoliticalContext: 'Raksasa Asia yang terpecah belah oleh perang saudara dan panglima perang feodal (Warlords). Di bawah kepemimpinan Generalissimo Chiang Kai-shek di Nanjing, Tiongkok harus berkejaran dengan waktu untuk menyatukan faksi internal sebelum Kekaisaran Jepang melancarkan invasi habis-habisan.',
    howToGetRich: {
      civSnowball: 'Tiongkok hanya memiliki 14 Civs awal. Bangun pabrik hanya di wilayah pedalaman aman seperti Sichuan, Yunnan, dan Guizhou. Fokus "Invite Foreign Investors" dan "Financial Reform" memberikan devisa modal asing.',
      resourceStrategy: 'Tiongkok memiliki monopoli cadangan Tungsten terbesar di dunia (sangat dicari oleh Jerman dan AS). Ekspor tungsten ini untuk mendapatkan civs gratis setiap bulan!',
      tradePolicy: 'Gunakan Free Trade agar negaramu kebanjiran civs dari negara-negara Eropa yang berebut membeli tungsten untuk produksi tank mereka.',
      warPlunder: 'Kemenangan atas Jepang memungkinkanmu mencaplok Manchukuo (wilayah industri terkaya di Asia timur laut), Korea, dan Taiwan.'
    },
    howToWinWar: {
      recommendedDoctrine: 'Mass Assault (Mass Mobilization): Memberi bonus kecepatan rekrutmen, combat width reduction (-0.4 per batalion), dan suplai tak terbatas.',
      recommendedTemplate: 'Massa Infanteri: 10 Infanteri (20w) dengan Support Engineer & Artileri. Jangan buat tank dulu; fokus 100% senapan dan artileri!',
      theaterStrategy: 'Tahan di Sungai Kuning (Yellow River) dan Pegunungan Taihang. Ledakkan tanggul Sungai Kuning jika Jepang mendekat untuk memperlambat laju mereka.',
      navalAirAdvice: 'Abaikan angkatan laut dan udara di tahun-tahun pertama; beli senapan dan pesawat dari Uni Soviet dan AS melalui Jalur Burma (Burma Road).'
    },
    howToMasterPolitics: {
      topAdvisors: ['Soong Tse-ven (Silent Workhorse +15% PP)', 'Weng Wenhao (Captain of Industry)', 'Alexander von Falkenhausen (German Military Advisor)', 'Bai Chongxi (Infantry Genius)'],
      stabilityWarSupport: 'Bentuk Front Bersatu (Chinese United Front) bersama Komunis Mao Zedong dan Warlords untuk mendapatkan integrasi tentara nasional.',
      debuffHandling: 'Hapus debuff korupsi tentara via keputusan "Army Reform" dengan mengumpulkan 100 Army XP. Setiap reformasi menghapus penalti mematikan.',
      recommendedFocusOrder: ['Subdue the Warlords', 'United Front', 'Army Reform', 'Financial Reform', 'Prioritize the Interior', 'Expand the Academies', 'Forge United Front']
    },
    stepByStepGameplan: {
      phase1: '1936-1937: Tundukkan panglima perang barat daya. Bentuk aliansi Front Bersatu dengan Mao Zedong. Kumpulkan Army XP dari latihan.',
      phase2: '1937-1939: Hadapi serbuan Jepang di Beijing dan Shanghai. Tahan di garis Sungai Kuning dan hindari pertempuran terbuka di pantai.',
      phase3: '1940-1942: Hapus debuff korupsi militer lewat Army Reform. Buka Jalur Burma untuk menerima bantuan senjata Amerika Serikat.',
      phase4: '1943-1945: Luncurkan serangan balasan serentak dengan 200 divisi infanteri terlatih. Tendang seluruh tentara Jepang keluar dari daratan Asia.'
    },
    startingForces: {
      divisions: 57,
      airplanes: 150,
      ships: 10,
      manpowerPool: '3.50 Juta'
    },
    vitalResources: {
      surplus: ['Tungsten (Monopoli Terbesar Dunia)', 'Baja'],
      deficits: ['Minyak', 'Karet', 'Aluminium'],
      oilStatus: 'Nol (Tergantung Bantuan Luar Negeri)',
      rubberStatus: 'Nol'
    }
  }
];
