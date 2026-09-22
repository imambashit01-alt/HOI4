import { CountryStrategy } from '../types';

export const MINOR_COUNTRY_STRATEGIES: CountryStrategy[] = [
  {
    id: 'pol',
    tag: 'POL',
    name: 'Polandia (Republic of Poland)',
    faction: 'Allies / Miedzymorze (Intermarium)',
    difficulty: 'Ahli',
    flagColors: ['#dc2626', '#f8fafc'],
    flagSymbol: '🦅',
    ideology: 'Non-Aligned',
    leader: 'Ignacy Mościcki',
    startingCivilianFactories: 19,
    startingMilitaryFactories: 9,
    startingDockyards: 0,
    doctrineRecommendation: 'Superior Firepower atau Grand Battleplan',
    focusPath1936: [
      'The Four Year Plan (Rencana 4 Tahun)',
      'Central Industrial Region (COP)',
      'Expand the COP (Kawasan Industri Pusat)',
      'Fill the Railway Gaps',
      'Agrarian Reform',
      'The Sanation Government',
      'Between the Seas (Miedzymorze)'
    ],
    industryStrategy: 'Fokuskan pembangunan industri di Kawasan Industri Pusat (COP/Central Industrial Region) di wilayah pedalaman selatan yang berjarak dari perbatasan Jerman dan Soviet.',
    militaryStrategy: 'Pertahankan garis sungai Vistula, Narew, dan San. Siapkan benteng parit dan unit kavaleri cepat untuk menutup celah terobosan Jerman.',
    keyChallenges: [
      'Terjepit di antara dua monster militer: Jerman Reich dan Uni Soviet',
      'Garis perbatasan yang sangat panjang dan sulit dijaga secara merata',
      'Industri awal yang terbatas untuk menyaingi kecepatan produksi tank Jerman'
    ],
    proTips: 'Bentuk aliansi Intermarium (Miedzymorze) bersama negara-negara Baltik, Rumania, dan Cekoslowakia untuk membagi front pertempuran!',
    geopoliticalContext: 'Polandia berada di titik paling berbahaya di seluruh peta dunia: tepat di antara ambisi ekspansi Jerman Hitler dan Uni Soviet Stalin. Mengawali tahun 1936 di bawah rezim Sanacja pasca wafatnya Marsekal Józef Piłsudski, Polandia harus memilih antara mengikat diri ke Sekutu Barat, membentuk benteng pertahanan Intermarium, atau tunduk pada salah satu raksasa tetangga.',
    howToGetRich: {
      civSnowball: 'Manfaatkan fokus Central Industrial Region (COP) yang memberikan puluhan pabrik sipil gratis dan infrastruktur di provinsi Kielce, Lublin, dan Krakow. Bangun Civs di pedalaman selatan agar tidak langsung jatuh ke tangan musuh.',
      resourceStrategy: 'Polandia memiliki tambang Baja dan Batubara yang cukup di Silesia, namun kekurangan Minyak dan Karet. Ladang minyak Galicia (Lwów) adalah urat nadi bahan bakar utama yang wajib dipertahankan.',
      tradePolicy: 'Gunakan Export Focus untuk menggenjot riset senjata infanteri dan kavaleri.',
      warPlunder: 'Jika mampu memukul balik Jerman, Polandia berhak atas Prusia Timur (Königsberg), Danzig, dan kawasan industri Silesia Jerman.'
    },
    howToWinWar: {
      recommendedDoctrine: 'Superior Firepower (Integrated Support) untuk memaksimalkan daya tembak artileri infanteri bertahan.',
      recommendedTemplate: 'Dinding Vistula: 9 Infanteri + Support Artileri, AA, & Engineer. Anti-Tank adalah wajib untuk melumpuhkan Panzer ringan Jerman.',
      theaterStrategy: 'Tinggalkan wilayah barat yang datar! Tarik seluruh pasukan ke balik garis Sungai Vistula dan benteng Warsawa. Manfaatkan rawa Pripet di timur untuk menahan pasukan Soviet.',
      navalAirAdvice: 'Abaikan angkatan laut; fokuskan seluruh kapasitas pabrik pada pesawat tempur PZL P.24/P.37 untuk melindungi Warsawa dari pemboman Luftwaffe.'
    },
    howToMasterPolitics: {
      topAdvisors: ['Eugeniusz Kwiatkowski (Captain of Industry +10% Civs)', 'Władysław Sikorski (Infantry Specialist)', 'Edward Rydz-Śmigły (Army Chief)'],
      stabilityWarSupport: 'Pilih faksi Sanacja Kanan atau Kiri untuk menyatukan parlemen dan mengaktifkan mobilisasi darurat.',
      debuffHandling: 'Atasi krisis Danzig dengan menolak ultimatum Hitler dan bersiap bertahan di bawah perlindungan jaminan Sekutu.',
      recommendedFocusOrder: ['The Four Year Plan', 'Central Industrial Region', 'Expand the COP', 'Fill the Railway Gaps', 'The Sanation Government', 'National Defense Fund', 'Between the Seas']
    },
    stepByStepGameplan: {
      phase1: '1936-1937: Bangun Kawasan Industri Pusat (COP) di pedalaman selatan. Kembangkan riset senapan dan artileri parit.',
      phase2: '1938-1939: Bangun benteng pertahanan di sepanjang Sungai Vistula dan Modlin. Tolak penyerahan Danzig ke Jerman.',
      phase3: '1939-1941: Tahan serbuan ganda Jerman dan Soviet di kantong pertahanan Vistula. Tunggu bantuan serangan udara Sekutu di barat.',
      phase4: '1942-1945: Luncurkan serangan balik saat Jerman mulai kehabisan tenaga, bebaskan Prusia Timur, dan amankan perbatasan Eropa Timur.'
    },
    startingForces: {
      divisions: 37,
      airplanes: 240,
      ships: 4,
      manpowerPool: '800 Ribu'
    },
    vitalResources: {
      surplus: ['Baja (Silesia)', 'Aluminium'],
      deficits: ['Minyak', 'Karet'],
      oilStatus: 'Minim (Bergantung Ladang Minyak Galicia)',
      rubberStatus: 'Nol'
    }
  },
  {
    id: 'can',
    tag: 'CAN',
    name: 'Dominion Kanada (Canada)',
    faction: 'Allies (Sekutu)',
    difficulty: 'Sedang',
    flagColors: ['#dc2626', '#f8fafc'],
    flagSymbol: '🍁',
    ideology: 'Democratic',
    leader: 'Mackenzie King',
    startingCivilianFactories: 14,
    startingMilitaryFactories: 2,
    startingDockyards: 1,
    doctrineRecommendation: 'Superior Firepower atau Mobile Warfare',
    focusPath1936: [
      'Commit to the War Effort',
      'Bank of Canada',
      'Industrial Expansion',
      'Send in the Zombies (Wajib Militer Penuh)',
      'CBC (Canadian Broadcasting)',
      'Corvette Escorts (Pemburu U-Boat)',
      'National Housing Act'
    ],
    industryStrategy: 'Kanada aman dari serangan darat musuh. Bangun industri militer modern dan manfaatkan sumber daya mineral melimpah (Aluminium, Baja, Tungsten) untuk memasok Sekutu.',
    militaryStrategy: 'Bentuk korps lapis baja atau marinir berkualitas tinggi. Kirim divisi tank Kanada untuk memimpin pembebasan Italia dan Normandia, serta bangun armada kapal pengawal korvet untuk memburu U-Boat Jerman di Atlantik.',
    keyChallenges: [
      'Populasi dan manpower awal yang sangat kecil',
      'Krisis wajib militer (Conscription Crisis) akibat resistensi warga Quebec berbahasa Prancis',
      'Industri militer awal yang minim'
    ],
    proTips: 'Gunakan fokus "Send in the Zombies" untuk mengatasi penalti manpower tanpa memicu kerusuhan di Quebec!',
    geopoliticalContext: 'Dominion utama dalam Persemakmuran Inggris yang terlindung oleh dua samudra luas dan berbatasan damai dengan Amerika Serikat. Posisi geografis yang kebal invasi ini membuat Kanada menjadi tempat pelatihan ideal bagi pilot Sekutu (BCATP) dan lumbung alutsista modern.',
    howToGetRich: {
      civSnowball: 'Fokuskan pembangunan pabrik di Ontario dan Quebec (Infra Lv.4-5). Manfaatkan bantuan ekonomi dari fokus Bank of Canada dan Industrial Expansion.',
      resourceStrategy: 'Kanada memiliki cadangan Aluminium, Baja, dan Nikel melimpah. Ekspor sumber daya ini ke Inggris dan AS untuk devisa pabrik sipil.',
      tradePolicy: 'Terapkan Free Trade untuk menarik investasi pabrik dari seluruh dunia.',
      warPlunder: 'Sebagai negara Sekutu, Kanada mendapatkan porsi besar alokasi industri di konferensi perdamaian pasca perang.'
    },
    howToWinWar: {
      recommendedDoctrine: 'Mobile Warfare atau Superior Firepower untuk memaksimalkan keunggulan divisi tank modern Ram dan Sherman Firefly.',
      recommendedTemplate: 'Canadian Armored: 8 Medium Tank + 7 Motorized (30w) dengan Logistics dan Support AA. Korvet Laut: Destroyer Patroli pemburu kapal selam.',
      theaterStrategy: 'Fokuskan pasukan pada pendaratan amfibi di Sisilia dan Normandia (Juno Beach). Di laut, pimpin konvoi perlindungan Atlantik.',
      navalAirAdvice: 'Bangun 40-50 Destroyer kawal berperlengkapan Sonar dan Depth Charge untuk membersihkan rute laut Atlantik Utara.'
    },
    howToMasterPolitics: {
      topAdvisors: ['C.D. Howe (Minister of Everything +10% Mils & Civs)', 'Mackenzie King (Compromise Leader)', 'Guy Simonds (Tank Commander)'],
      stabilityWarSupport: 'Jaga harmoni dengan warga Quebec; jangan buru-buru menaikkan wajib militer sebelum krisis Eropa memuncak.',
      debuffHandling: 'Hapus debuff Great Depression dan Conscription Crisis lewat jalur fokus nasional kompromi politik.',
      recommendedFocusOrder: ['Commit to the War Effort', 'Bank of Canada', 'Industrial Expansion', 'National Housing Act', 'Send in the Zombies', 'Halifax Shipyards', 'Patrol the Atlantic']
    },
    stepByStepGameplan: {
      phase1: '1936-1937: Atasi krisis ekonomi, kembangkan tambang aluminium di Quebec, dan bangun galangan kapal Halifax.',
      phase2: '1938-1939: Masuk perang bersama Inggris. Mulai produksi massal tank dan pesawat tempur Hurricane.',
      phase3: '1940-1942: Amankan rute konvoi Atlantik dari serangan serigala laut U-Boat Jerman. Bantu Inggris mempertahankan Timur Tengah.',
      phase4: '1943-1945: Pimpin serbuan pantai Juno Beach di Normandia, bebaskan pelabuhan Antwerp di Belgia, dan masuki wilayah Jerman Barat.'
    },
    startingForces: {
      divisions: 6,
      airplanes: 80,
      ships: 12,
      manpowerPool: '350 Ribu'
    },
    vitalResources: {
      surplus: ['Aluminium', 'Baja', 'Nikel'],
      deficits: ['Minyak', 'Karet'],
      oilStatus: 'Impor dari Amerika Serikat Bebas Hambatan',
      rubberStatus: 'Impor Sekutu'
    }
  },
  {
    id: 'raj',
    tag: 'RAJ',
    name: 'Raj Britania (British India)',
    faction: 'Allies (Sekutu)',
    difficulty: 'Sedang',
    flagColors: ['#f97316', '#15803d'],
    flagSymbol: '☸',
    ideology: 'Non-Aligned',
    leader: 'Lord Linlithgow',
    startingCivilianFactories: 10,
    startingMilitaryFactories: 5,
    startingDockyards: 1,
    doctrineRecommendation: 'Mass Assault atau Grand Battleplan',
    focusPath1936: [
      'Provincial Elections',
      'The Lions of the Great War',
      'Indianization of the Army',
      'Tata Steel Works (Raksasa Baja)',
      'Expand the Railways',
      'Form the Gurkha Regiments',
      'Quit India Movement (Kelola Kemerdekaan)'
    ],
    industryStrategy: 'Kembangkan Tata Steel Works di Bihar dan Bengal untuk memperbanyak pabrik militer. Bangun infrastruktur rel kereta api yang menghubungkan Bombay, Delhi, dan Calcutta.',
    militaryStrategy: 'Manfaatkan ratusan juta populasi India untuk melatih 100+ divisi infanteri. Pertahankan Jalur Burma dari serbuan Jepang di timur, dan kirim divisi Gurkha legendaris untuk membersihkan Afrika Utara.',
    keyChallenges: [
      'Debuff Agrarian Society yang membatasi hukum wajib militer',
      'Tuntutan kemerdekaan keras dari Kongres Nasional India (Mahatma Gandhi & Nehru)',
      'Ancaman invasi darat dan laut oleh Kekaisaran Jepang di perbatasan timur (Burma)'
    ],
    proTips: 'Latih Resimen Gurkha: mereka memiliki bonus serangan gunung dan hutan yang luar biasa untuk membantai tentara Jepang di hutan Burma!',
    geopoliticalContext: 'Permata Mahkota Kemaharajaan Inggris (Jewel in the Crown) dengan populasi manusia terbesar kedua di dunia. Namun, Raj India terkunci dalam dinamika kolonial yang rumit, di mana rakyat menuntut kemerdekaan sementara ancaman Fasisme dan invasi Jepang mengancam di perbatasan timur.',
    howToGetRich: {
      civSnowball: 'Fokuskan pembangunan di Bombay dan Bengal. Kembangkan Tata Steel Works untuk melipatgandakan produksi baja dan industri militer domestik.',
      resourceStrategy: 'India kaya akan Baja, Aluminium, dan Tungsten. Cadangan karet dapat diimpor dengan mudah dari Ceylon (Sri Lanka) dan Malaya.',
      tradePolicy: 'Gunakan Export Focus untuk mengumpulkan civs dari Inggris.',
      warPlunder: 'Kemenangan Sekutu atas Jepang membuka jalan bagi kemerdekaan penuh India sebagai kekuatan adidaya Asia Selatan.'
    },
    howToWinWar: {
      recommendedDoctrine: 'Grand Battleplan atau Mass Assault untuk memaksimalkan daya tahan jutaan pasukan infanteri di medan berhutan.',
      recommendedTemplate: 'Divisi Gurkha: 8 Gunung + 2 Artileri + Support Engineer & Recon. Divisi Frontline: 9 Infanteri + Support Artileri & AA.',
      theaterStrategy: 'Burma: Buat benteng pertahanan parit di Kohima dan Imphal untuk menghentikan laju tentara Jepang. Afrika: Bantu pasukan Inggris memukul mundur Italia dari El Alamein.',
      navalAirAdvice: 'Bantu armada Inggris dengan pesawat tempur darat untuk mempertahankan Teluk Benggala dan Samudra Hindia.'
    },
    howToMasterPolitics: {
      topAdvisors: ['Lord Linlithgow (British Viceroy)', 'Jawaharlal Nehru / Subhas Chandra Bose', 'Claude Auchinleck (Army Commander)'],
      stabilityWarSupport: 'Kelola pergerakan "Quit India" dengan bijak; berikan janji status Dominion pasca perang untuk menjaga stabilitas.',
      debuffHandling: 'Hapus debuff Agrarian Society lewat fokus "Industrialization" untuk membuka keran puluhan juta manpower.',
      recommendedFocusOrder: ['Provincial Elections', 'Indianization of the Army', 'The Lions of the Great War', 'Tata Steel Works', 'Expand the Railways', 'Gurkha Recruitment', 'Toward Swaraj']
    },
    stepByStepGameplan: {
      phase1: '1936-1937: Gelar pemilu provinsi, bangun infrastruktur rel kereta, dan perkuat pabrik baja Tata.',
      phase2: '1938-1939: Buka pelatihan Resimen Gurkha. Kirim divisi tentara India untuk memperkuat benteng Singapura dan Mesir.',
      phase3: '1940-1942: Tahan serbuan Jepang di hutan Burma (Pertempuran Kohima-Imphal). Hancurkan pasukan Jepang di rawa-rawa.',
      phase4: '1943-1945: Luncurkan serangan balik ke Malaya dan Indochina, lalu menangkan kemerdekaan penuh bagi rakyat India.'
    },
    startingForces: {
      divisions: 18,
      airplanes: 40,
      ships: 5,
      manpowerPool: '2.10 Juta'
    },
    vitalResources: {
      surplus: ['Baja (Tata)', 'Aluminium', 'Tungsten'],
      deficits: ['Minyak', 'Karet'],
      oilStatus: 'Impor Bebas dari Persia / Irak',
      rubberStatus: 'Aman dari Koloni Tetangga (Ceylon/Malaya)'
    }
  },
  {
    id: 'ast',
    tag: 'AST',
    name: 'Persemakmuran Australia (Australia)',
    faction: 'Allies (Sekutu)',
    difficulty: 'Sedang',
    flagColors: ['#1e3a8a', '#dc2626'],
    flagSymbol: '★',
    ideology: 'Democratic',
    leader: 'John Curtin',
    startingCivilianFactories: 10,
    startingMilitaryFactories: 4,
    startingDockyards: 2,
    doctrineRecommendation: 'Superior Firepower atau Grand Battleplan',
    focusPath1936: [
      'Support the Policy of Appeasement',
      'Establish the CAC (Commonwealth Aircraft)',
      'Cockatoo Island Dockyard',
      'The Broken Hill Proprietary (BHP)',
      'Protect the Homeland',
      'Rats of Tobruk (Infanteri Elit)',
      'South West Pacific Command'
    ],
    industryStrategy: 'Kembangkan tambang besi BHP (Broken Hill Proprietary) di New South Wales. Bangun industri pesawat CAC (Commonwealth Aircraft Corporation) di Melbourne untuk mempersenjatai angkatan udara.',
    militaryStrategy: 'Jaga pulau utama dari ancaman invasi Jepang dengan benteng pantai. Bentuk divisi infanteri elit (Rats of Tobruk) dan kapal selam patroli untuk memotong armada invasi musuh di laut Karang.',
    keyChallenges: [
      'Garis pantai benua yang teramat panjang dengan populasi terkonsentrasi di pesisir tenggara',
      'Jatuhnya pangkalan Singapura yang memutus perlindungan langsung armada Royal Navy Inggris',
      'Ancaman serangan udara dan laut Jepang di Darwin dan Papua Nugini'
    ],
    proTips: 'Pertahankan Port Moresby di Papua Nugini dengan segenap tenaga; ini adalah pintu gerbang terakhir sebelum Jepang dapat mendarat di daratan Australia!',
    geopoliticalContext: 'Benteng pertahanan terdepan Sekutu di belahan bumi selatan. Ketika benteng Singapura jatuh ke tangan Jepang pada 1942, Australia mendapati dirinya terisolasi dan berada di garis bidik invasi militer Kekaisaran Jepang.',
    howToGetRich: {
      civSnowball: 'Bangun industri di Sydney, Melbourne, dan Brisbane. Manfaatkan tambang bijih besi Broken Hill Proprietary (BHP) untuk mendongkrak kapasitas pabrik sipil.',
      resourceStrategy: 'Australia memiliki kekayaan Kromium, Aluminium, dan Baja yang melimpah. Impor minyak dari Amerika Serikat atau Timur Tengah.',
      tradePolicy: 'Terapkan Free Trade di awal untuk memacu riset pesawat tempur Boomerang.',
      warPlunder: 'Australia mendapatkan alokasi wilayah mandat pasifik dan kendali atas wilayah kepulauan bekas mandat Jerman/Jepang pasca perang.'
    },
    howToWinWar: {
      recommendedDoctrine: 'Superior Firepower: Maksimalkan daya tahan pertahanan infanteri di medan hutan rimba Papua.',
      recommendedTemplate: 'Diggers: 9 Infanteri + 2 Artileri + Support Engineer & Recon. Rats of Tobruk: Pasukan komando bertahan.',
      theaterStrategy: 'Kirim pasukan ke Kokoda Track di Papua Nugini untuk menghadang gerak maju tentara Jepang. Di laut, bergabunglah dengan armada US Navy di Pertempuran Laut Karang.',
      navalAirAdvice: 'Produksi pesawat tempur CAC Boomerang dan pembom laut Beaufort untuk menghalau armada pendarat Jepang.'
    },
    howToMasterPolitics: {
      topAdvisors: ['John Curtin (Wartime Prime Minister)', 'Essington Lewis (Director of Munitions)', 'Thomas Blamey (Commander in Chief)'],
      stabilityWarSupport: 'Peralihan kepemimpinan ke John Curtin mempercepat mobilisasi nasional dan mempererat kerjasama pertahanan dengan AS.',
      debuffHandling: 'Hapus penalti wajib militer terbatas lewat fokus "Curtin Speech" saat ancaman Jepang mendekati Darwin.',
      recommendedFocusOrder: ['Support the Policy', 'Establish the CAC', 'BHP Expansion', 'Protect the Homeland', 'Rats of Tobruk', 'South West Pacific Command', 'National Security Act']
    },
    stepByStepGameplan: {
      phase1: '1936-1937: Modernisasi industri tambang BHP dan bangun galangan kapal Cockatoo Island di Sydney.',
      phase2: '1938-1939: Buka pabrik pesawat CAC dan kirim relawan pilot Australia ke Eropa untuk membantu Inggris.',
      phase3: '1940-1942: Saat Singapura jatuh, panggil pulang pasukan ke Pasifik. Hentikan invasi Jepang di Jalur Kokoda Papua Nugini.',
      phase4: '1943-1945: Bersama Jenderal Douglas MacArthur luncurkan serangan balik amfibi membebaskan Filipina dan Hindia Belanda.'
    },
    startingForces: {
      divisions: 8,
      airplanes: 90,
      ships: 16,
      manpowerPool: '280 Ribu'
    },
    vitalResources: {
      surplus: ['Kromium', 'Baja', 'Aluminium'],
      deficits: ['Minyak', 'Karet'],
      oilStatus: 'Impor Jalur Pasifik dari AS',
      rubberStatus: 'Impor Sekutu'
    }
  },
  {
    id: 'rom',
    tag: 'ROM',
    name: 'Kerajaan Rumania (Romania)',
    faction: 'Axis (Blok Poros)',
    difficulty: 'Sedang',
    flagColors: ['#1e3a8a', '#eab308'],
    flagSymbol: '👑',
    ideology: 'Fascism / Non-Aligned',
    leader: 'Carol II / Ion Antonescu',
    startingCivilianFactories: 16,
    startingMilitaryFactories: 6,
    startingDockyards: 1,
    doctrineRecommendation: 'Superior Firepower atau Mobile Warfare',
    focusPath1936: [
      'Institute Royal Dictatorship (Kediktatoran Raja)',
      'Ploiești Oil Fields (Lumbung Minyak)',
      'Malaxa Works (Pabrik Lokomotif & Tank)',
      'Expand the Air Force (IAR 80)',
      'Preserve Greater Romania (Jaga Perbatasan)',
      'Join the Axis (Gabung Poros)',
      'Reclaim Bessarabia (Rebut Kembali Bessarabia)'
    ],
    industryStrategy: 'Kuasai ladang minyak Ploiești: ini adalah sumber daya paling diperebutkan di seluruh Eropa! Ekspor minyak ke Jerman untuk mendapatkan puluhan pabrik sipil devisa setiap hari.',
    militaryStrategy: 'Bentuk korps kavaleri dan divisi infanteri gunung (Vânători de Munte) untuk bertempur di front selatan Uni Soviet (Odessa, Krimea, dan Kaukasus).',
    keyChallenges: [
      'Tuntutan teritorial agresif: Soviet menuntut Bessarabia, Hungaria menuntut Transilvania, Bulgaria menuntut Dobruja',
      'Skandal korupsi Raja Carol II yang menguras stabilitas',
      'Menjadi sasaran empuk serangan bom strategis Sekutu pada ladang minyak Ploiești'
    ],
    proTips: 'Pasang meriam Anti-Air level maksimal (Level 5) di wilayah Ploiești untuk melindungi ladang minyakmu dari serangan Strategic Bomber musuh!',
    geopoliticalContext: 'Kunci bahan bakar Eropa. Ladang minyak Ploiești di Rumania adalah satu-satunya sumber minyak alami skala raksasa yang menopang seluruh mesin perang Poros di bawah Hitler. Tanpa minyak Rumania, tank dan pesawat Jerman akan lumpuh total.',
    howToGetRich: {
      civSnowball: 'Rumania kebanjiran civs gratis dari Jerman, Italia, dan seluruh Eropa yang membeli minyak Ploiești. Gunakan devisa civs ini untuk membangun pabrik militer Malaxa di Muntenia.',
      resourceStrategy: 'Monopoli Minyak bumi terkaya di daratan Eropa. Ekspor sebagian besar minyak dengan kebijakan Free Trade untuk mendapatkan riset dan bonus pabrik super cepat.',
      tradePolicy: 'Gunakan Free Trade di tahun-tahun awal untuk memanen pabrik gratis dari negara pengimpor minyak.',
      warPlunder: 'Saat ikut menginvasi Uni Soviet bersama Jerman, tuntut wilayah Transnistria, pelabuhan Odessa, dan semenanjung Krimea di Konferensi Perdamaian.'
    },
    howToWinWar: {
      recommendedDoctrine: 'Superior Firepower (Integrated Support) untuk mendongkrak daya tembak infanteri gunung Vânători de Munte.',
      recommendedTemplate: 'Vânători de Munte: 8 Gunung + 2 Artileri + Support Engineer & AA. Dinding Dniester: 9 Infanteri + Support Artileri.',
      theaterStrategy: 'Serang ke arah Odessa dan seberangi Sungai Dnieper menuju Krimea. Bantu tentara Jerman mengunci Sevastopol dan menembus ladang minyak Kaukasus.',
      navalAirAdvice: 'Produksi pesawat tempur kebanggaan nasional IAR 80 untuk menjaga langit kilang minyak Ploiești dari armada pembom B-24 Liberator Sekutu.'
    },
    howToMasterPolitics: {
      topAdvisors: ['Nicolae Titulescu / Ion Antonescu (Iron Marshal)', 'Gheorghe Tătărescu (Captain of Industry)', 'Petre Dumitrescu (Army Specialist)'],
      stabilityWarSupport: 'Paksa Raja Carol II turun tahta dan serahkan kepemimpinan pada Jenderal Ion Antonescu untuk menyatukan militer dan mengamankan aliansi Poros.',
      debuffHandling: 'Kelola keputusan ultimatum Vienna Award: pertahankan wilayah Transilvania atau serahkan sebagian ke Hungaria demi menghindari perang saudara Poros.',
      recommendedFocusOrder: ['Institute Royal Dictatorship', 'Ploiești Oil Fields', 'Malaxa Works', 'Preserve Greater Romania', 'Join the Axis', 'Appoint Ion Antonescu', 'War for Bessarabia']
    },
    stepByStepGameplan: {
      phase1: '1936-1937: Modernisasi kilang minyak Ploiești dan bangun pabrik lokomotif serta alutsista di Bukares.',
      phase2: '1938-1939: Atasi krisis politik istana, amankan aliansi dengan Jerman, dan siapkan divisi gunung untuk perang di timur.',
      phase3: '1940-1942: Masuk perang bersama Poros melawan Uni Soviet. Rebut kembali Bessarabia dan taklukkan benteng pelabuhan Odessa.',
      phase4: '1943-1945: Tembus Pegunungan Kaukasus hingga ke Baku. Bentuk Rumania Raya (Greater Romania) yang makmur dan berdaulat.'
    },
    startingForces: {
      divisions: 25,
      airplanes: 180,
      ships: 6,
      manpowerPool: '620 Ribu'
    },
    vitalResources: {
      surplus: ['Minyak (Lumbung Minyak Eropa)', 'Aluminium'],
      deficits: ['Baja', 'Karet', 'Tungsten'],
      oilStatus: 'Terbesar di Daratan Eropa (Ploiești Melimpah)',
      rubberStatus: 'Nol'
    }
  },
  {
    id: 'yug',
    tag: 'YUG',
    name: 'Kerajaan Yugoslavia',
    faction: 'Netral / Allies',
    difficulty: 'Menantang',
    flagColors: ['#1e3a8a', '#dc2626'],
    flagSymbol: '👑',
    ideology: 'Non-Aligned',
    leader: 'Prince Regent Paul / Peter II',
    startingCivilianFactories: 14,
    startingMilitaryFactories: 3,
    startingDockyards: 1,
    doctrineRecommendation: 'Grand Battleplan atau Superior Firepower',
    focusPath1936: [
      'Western Focus (Hubungan dengan Sekutu)',
      'Attract Foreign Capital',
      'Industrial Expansion',
      'Develop the Chromium Mines',
      'Evolution of the Kingdom (Desentralisasi)',
      'The Concordat (Atasi Gesekan Agama)',
      'United Yugoslavia (Yugoslavia Bersatu)'
    ],
    industryStrategy: 'Yugoslavia memiliki tambang Bauksit (Aluminium) dan Kromium yang sangat kaya di Bosnia dan Serbia. Bangun industri pertambangan dan pabrik militer di pedalaman Pegunungan Dinarik.',
    militaryStrategy: 'Medan Yugoslavia adalah surga pertempuran gerilya pegunungan. Bangun divisi infanteri gunung elit dan manfaatkan parit alami tebing karst untuk membantai tank Italia dan Jerman.',
    keyChallenges: [
      'Ketegangan etnis mematikan antara Serbia, Kroasia, dan Slovenia',
      'Dikelilingi oleh tetangga Poros yang rakus wilayah (Italia, Jerman, Hungaria, Bulgaria)',
      'Ancaman kudeta militer jika mendekat ke Jerman'
    ],
    proTips: 'Selesaikan fokus "Evolution of the Kingdom" untuk menghapus debuff separatisme Kroasia agar negaramu tidak pecah saat diserang musuh!',
    geopoliticalContext: 'Negara multietnis yang rapuh di Semenanjung Balkan yang didirikan pasca runtuhnya Kekaisaran Austro-Hungaria. Dikelilingi oleh musuh-musuh revisionis yang menuntut teritorialnya, Yugoslavia harus meredakan bara perpecahan internal di bawah kepemimpinan Pangeran Paul.',
    howToGetRich: {
      civSnowball: 'Fokuskan pembangunan pabrik di Belgrade dan Zagreb. Kembangkan tambang Kromium dan Bauksit di Bosnia untuk menarik modal asing.',
      resourceStrategy: 'Kromium dan Aluminium melimpah. Ekspor mineral berharga ini ke Inggris dan Prancis untuk mengumpulkan pabrik sipil devisa.',
      tradePolicy: 'Gunakan Export Focus untuk mengalirkan devisa dan riset alutsista.',
      warPlunder: 'Kemenangan atas Italia memungkinkan Yugoslavia mencaplok Istria, Trieste, dan Zara di pesisir Adriatik.'
    },
    howToWinWar: {
      recommendedDoctrine: 'Grand Battleplan untuk bonus pertahanan di pegunungan karst Dinarik.',
      recommendedTemplate: 'Partisan Dinarik: 8 Gunung + 2 Artileri + Support Engineer & Recon. Sangat mematikan dalam perang gerilya pegunungan.',
      theaterStrategy: 'Tinggalkan dataran terbuka Vojvodina; tarik seluruh garis pertahanan ke balik Pegunungan Dinarik dan Sungai Sava/Danube. Biarkan pasukan musuh terperangkap dalam perang gerilya berkepanjangan.',
      navalAirAdvice: 'Gunakan kapal torpedo ringan dan ranjau laut untuk melindungi garis pantai Adriatik dari invasi Regia Marina Italia.'
    },
    howToMasterPolitics: {
      topAdvisors: ['Milan Stojadinović (Economic Reformer)', 'Prince Paul (Diplomat)', 'Draža Mihailović (Guerrilla Genius)'],
      stabilityWarSupport: 'Atasi separatisme Kroasia lewat perjanjian Cvetković-Maček Agreement untuk mendongkrak stabilitas nasional.',
      debuffHandling: 'Hati-hati dengan kudeta anti-Fasis saat menandatangani Pakta Tripartit; pilih jalur aliansi yang didukung oleh militer.',
      recommendedFocusOrder: ['Western Focus', 'Attract Foreign Capital', 'Develop the Chromium Mines', 'Evolution of the Kingdom', 'The Concordat', 'United Yugoslavia', 'Strengthen the Mountain Forts']
    },
    stepByStepGameplan: {
      phase1: '1936-1937: Atasi perpecahan politik antara Belgrade dan Zagreb. Kembangkan tambang kromium di Bosnia.',
      phase2: '1938-1939: Bangun benteng pertahanan di perbatasan Italia dan Austria. Latih divisi infanteri gunung elit.',
      phase3: '1940-1942: Pertahankan benteng pegunungan Dinarik dari serbuan Poros. Kobarkan perang gerilya yang menguras tentara pendudukan musuh.',
      phase4: '1943-1945: Bersama Tentara Merah dan Sekutu, bebaskan seluruh Balkan dan satukan federasi Yugoslavia yang kokoh.'
    },
    startingForces: {
      divisions: 22,
      airplanes: 120,
      ships: 4,
      manpowerPool: '450 Ribu'
    },
    vitalResources: {
      surplus: ['Kromium (Sangat Kaya)', 'Aluminium'],
      deficits: ['Minyak', 'Karet', 'Baja'],
      oilStatus: 'Defisit Berat (Wajib Impor Rumania)',
      rubberStatus: 'Nol'
    }
  },
  {
    id: 'hun',
    tag: 'HUN',
    name: 'Kerajaan Hungaria (Hungary)',
    faction: 'Axis (Blok Poros)',
    difficulty: 'Sedang',
    flagColors: ['#dc2626', '#15803d'],
    flagSymbol: '👑',
    ideology: 'Fascism / Non-Aligned',
    leader: 'Miklós Horthy',
    startingCivilianFactories: 10,
    startingMilitaryFactories: 3,
    startingDockyards: 0,
    doctrineRecommendation: 'Mobile Warfare atau Superior Firepower',
    focusPath1936: [
      'Strengthen the Fascists / Restore the Habsburgs',
      'Győr Program (Industrialisasi Masif)',
      'Bled Agreement (Hapus Pembatasan Trianon)',
      'Reintegrate the Railways',
      'First Vienna Award (Caplok Slowakia Selatan)',
      'Secret Rearmament',
      'Proclaim the Greater Kingdom'
    ],
    industryStrategy: 'Aktifkan program Győr (Győr Program) yang menyuntikkan puluhan pabrik sipil dan infrastruktur. Manfaatkan tambang Bauksit terkaya di Eropa Tengah untuk membangun industri pesawat dan tank.',
    militaryStrategy: 'Hapus pembatasan Perjanjian Trianon secepat mungkin via Bled Agreement. Bentuk divisi kavaleri cepat dan tank Zrinyi/Toldi untuk mendukung sayap tentara Jerman di Front Timur.',
    keyChallenges: [
      'Tercekik pembatasan militer Perjanjian Trianon (Trianon Treaty: dilarang punya angkatan udara, tank, dan wajib militer)',
      'Dikelilingi oleh aliansi Little Entente (Cekoslowakia, Rumania, Yugoslavia) yang memusuhinya',
      'Basis industri awal yang sangat kecil'
    ],
    proTips: 'Kamu bisa memilih jalur Monarki untuk memulihkan Kekaisaran Austro-Hungaria (Restore Austria-Hungary) dan mengklaim Austria, Cekoslowakia, serta sebagian Italia!',
    geopoliticalContext: 'Kerajaan tanpa raja yang dipimpin oleh seorang laksamana tanpa laut (Regent Miklós Horthy). Hungaria menderita luka mendalam akibat Perjanjian Trianon 1920 yang merenggut dua pertiga wilayah historisnya. Ambisi merebut kembali tanah air leluhur membawa Hungaria merapat ke Blok Poros Jerman.',
    howToGetRich: {
      civSnowball: 'Fokuskan pembangunan di Budapest dan Transdanubia. Luncurkan Győr Program yang mengalirkan miliaran Pengő untuk pembangunan pabrik.',
      resourceStrategy: 'Hungaria memiliki cadangan Bauksit (Aluminium) terbesar di kawasan Balkan. Ekspor aluminium ke Jerman untuk menyerap pabrik sipil ekstra.',
      tradePolicy: 'Gunakan Export Focus di awal untuk mengakselerasi riset teknologi alutsista.',
      warPlunder: 'Caplok Slowakia Selatan, Ruthenia Karpatia, dan Transilvania Utara melalui keputusan Vienna Awards tanpa menumpahkan darah prajurit.'
    },
    howToWinWar: {
      recommendedDoctrine: 'Mobile Warfare: Manfaatkan kecepatan divisi lapis baja Toldi dan Turan di dataran luas Puszta.',
      recommendedTemplate: 'Hussar Motorized: 6 Motorized + 2 Tank Ringan/Medium + Support Artileri. Dinding Parit: 9 Infanteri + Support AA.',
      theaterStrategy: 'Kirim pasukan lapis baja untuk mengamankan sayap tentara Poros di Ukraina dan sungai Don. Lindungi jalur suplai minyak dari serangan gerilya.',
      navalAirAdvice: 'Produksi pesawat tempur darat MÁVAG Héja untuk menjaga wilayah udara Lembah Karpatia dari serangan Sekutu.'
    },
    howToMasterPolitics: {
      topAdvisors: ['Béla Imrédy (Economic Reformer)', 'Vilmos Rőder (Army Chief)', 'Jenő Rátz (Chief of Staff)'],
      stabilityWarSupport: 'Pencaplokan damai wilayah Transilvania dan Slowakia mendongkrak Stabilitas dan War Support rakyat Hungaria hingga 90%+.',
      debuffHandling: 'Hapus pembatasan Perjanjian Trianon dengan menegosiasikan "Bled Agreement" atau mengambil fokus "Secret Rearmament".',
      recommendedFocusOrder: ['Győr Program', 'Secret Rearmament', 'Bled Agreement', 'First Vienna Award', 'Second Vienna Award', 'Reintegrate the Banat', 'Proclaim Greater Hungary']
    },
    stepByStepGameplan: {
      phase1: '1936-1937: Luncurkan Győr Program, bangun pabrik alutsista di Budapest, dan hapus pembatasan militer Trianon.',
      phase2: '1938-1939: Rebut kembali Slowakia Selatan dan Ruthenia Karpatia lewat First Vienna Award bersama Hitler.',
      phase3: '1940-1942: Caplok Transilvania Utara dari Rumania. Kirim Korps Cepat (Gyorshadtest) Hungaria ke Front Timur melawan Soviet.',
      phase4: '1943-1945: Bangkitkan kembali kejayaan Kekaisaran Austro-Hungaria atau pertahankan garis benteng Budapest dari serbuan Tentara Merah.'
    },
    startingForces: {
      divisions: 14,
      airplanes: 0,
      ships: 0,
      manpowerPool: '310 Ribu'
    },
    vitalResources: {
      surplus: ['Aluminium (Bauksit Melimpah)'],
      deficits: ['Minyak', 'Baja', 'Karet', 'Tungsten'],
      oilStatus: 'Minim (Bergantung Pasokan Poros)',
      rubberStatus: 'Nol'
    }
  },
  {
    id: 'cze',
    tag: 'CZE',
    name: 'Republik Cekoslowakia (Czechoslovakia)',
    faction: 'Netral / Little Entente / Allies',
    difficulty: 'Ahli',
    flagColors: ['#1e3a8a', '#dc2626'],
    flagSymbol: '🦁',
    ideology: 'Democratic',
    leader: 'Edvard Beneš',
    startingCivilianFactories: 18,
    startingMilitaryFactories: 10,
    startingDockyards: 0,
    doctrineRecommendation: 'Grand Battleplan (Entrenchment)',
    focusPath1936: [
      'Fortification Focus (Benteng Sudetenland)',
      'Skoda Works (Raksasa Senjata Eropa)',
      'Zbrojovka Brno (Senapan Mesin Bren)',
      'Modernize the Army',
      'Industrial Powerhouse',
      'Trust the West / Entente Cordiale',
      'No Retreat (Tolak Ultimatum Munich)'
    ],
    industryStrategy: 'Pabrik senjata Skoda Works di Plzeň dan Zbrojovka di Brno adalah salah satu kompleks industri senjata terbaik di dunia. Bangun pabrik militer di Bohemia dan Moravia.',
    militaryStrategy: 'Bangun benteng beton bertulang (Fortresses) Level 7-10 di sepanjang Pegunungan Sudetenland. Dinding benteng ini tidak bisa ditembus oleh tank Jerman!',
    keyChallenges: [
      'Dikhianati oleh sekutu barat (Inggris dan Prancis) dalam Perjanjian Munich 1938',
      'Wilayah Bohemia dikepung dari 3 sisi oleh wilayah Jerman dan Austria',
      'Separatisme warga minoritas Jerman di Sudetenland dan nasionalis Slowakia'
    ],
    proTips: 'Jika menolak Perjanjian Munich (Tolak Penyerahan Sudetenland), benteng Level 7+ milikmu akan membantai tentara Jerman yang mencoba menyerang langsung!',
    geopoliticalContext: 'Negara demokrasi industri maju di jantung Eropa Tengah. Cekoslowakia memiliki angkatan darat modern dan pabrik senjata legendaris (Skoda), namun nasibnya dipertaruhkan di meja diplomasi para pemimpin besar Eropa di Munich 1938.',
    howToGetRich: {
      civSnowball: 'Manfaatkan pabrik raksasa Skoda Works. Bangun pabrik di Praha dan Moravia. Cekoslowakia memiliki 28 pabrik awal—sangat besar untuk negara seukurannya.',
      resourceStrategy: 'Baja melimpah di Silesia dan Bohemia. Impor minyak dan karet dari luar negeri.',
      tradePolicy: 'Gunakan Export Focus untuk mengalirkan PP dan menjual senjata ke seluruh dunia.',
      warPlunder: 'Kemenangan atas Jerman memungkinkan Cekoslowakia merebut Silesia Jerman, Dresden, dan Bavaria.'
    },
    howToWinWar: {
      recommendedDoctrine: 'Grand Battleplan: Memaksimalkan bonus benteng beton Sudetenland hingga +50% defense.',
      recommendedTemplate: 'Benteng Sudeten: 9 Infanteri + 2 Artileri + Support Engineer & Anti-Tank. Tank Ringan LT-35/LT-38 untuk counter-attack.',
      theaterStrategy: 'Jangan pernah meninggalkan benteng Sudetenland! Tahan di balik parit beton dan biarkan tank Jerman membentur dinding baja hingga hancur.',
      navalAirAdvice: 'Produksi pesawat tempur Avia B.534 untuk menghalau serangan pembom Luftwaffe di atas Praha.'
    },
    howToMasterPolitics: {
      topAdvisors: ['Edvard Beneš (Democratic President)', 'Jan Syrový (General & Hero)', 'Alois Eliáš (Defense Specialist)'],
      stabilityWarSupport: 'Tolak Perjanjian Munich: keputusan ini akan melambungkan War Support rakyat Ceko hingga 100% demi membela tanah air.',
      debuffHandling: 'Atasi provokasi partai Henlein di Sudetenland dengan memberlakukan darurat militer terarah.',
      recommendedFocusOrder: ['Fortification Focus', 'Skoda Works', 'Strengthen the Border', 'Zbrojovka Brno', 'No Retreat', 'Reject Munich', 'Mobilize the Nation']
    },
    stepByStepGameplan: {
      phase1: '1936-1937: Bangun benteng perbatasan Sudetenland hingga Level 7 di seluruh sektor pegunungan.',
      phase2: '1938: Tolak mentah-mentah Perjanjian Munich! Mobilisasi 40 divisi infanteri di benteng.',
      phase3: '1938-1941: Tahan serbuan pasukan Jerman Hitler di tembok benteng Sudeten. Jerman akan menderita ratusan ribu korban jiwa.',
      phase4: '1942-1945: Saat Jerman kehabisan manpower dan diserang Sekutu di barat, terobos keluar dari benteng dan rebut Berlin.'
    },
    startingForces: {
      divisions: 24,
      airplanes: 160,
      ships: 0,
      manpowerPool: '410 Ribu'
    },
    vitalResources: {
      surplus: ['Baja (Skoda)'],
      deficits: ['Minyak', 'Karet', 'Aluminium'],
      oilStatus: 'Defisit Berat',
      rubberStatus: 'Nol'
    }
  },
  {
    id: 'tur',
    tag: 'TUR',
    name: 'Republik Turki (Turkey)',
    faction: 'Netral / Allies / Axis',
    difficulty: 'Menantang',
    flagColors: ['#dc2626', '#f8fafc'],
    flagSymbol: '☾★',
    ideology: 'Non-Aligned',
    leader: 'Mustafa Kemal Atatürk / İsmet İnönü',
    startingCivilianFactories: 15,
    startingMilitaryFactories: 4,
    startingDockyards: 1,
    doctrineRecommendation: 'Grand Battleplan atau Superior Firepower',
    focusPath1936: [
      'Montreux Convention (Kuasai Selat Bosporus)',
      'Peace at Home, Peace in the World',
      'Etibank & Sümerbank (Industrialisasi Kemalis)',
      'Modernize the Armed Forces',
      'Reintegrate Hatay (Caplok Hatay Damai)',
      'Treaty of Saadabad (Aliansi Timur Tengah)',
      'Balkan Pact (Pakta Balkan)'
    ],
    industryStrategy: 'Monopoli cadangan Kromium terbesar di dunia! Seluruh negara adidaya (Jerman, Soviet, AS) sangat membutuhkan kromium untuk memproduksi tank dan kapal perang. Jual kromiummu untuk mendapatkan puluhan pabrik sipil gratis.',
    militaryStrategy: 'Kuasai Selat Bosporus dan Dardanella (Montreux Convention). Siapa pun yang ingin melewati Laut Hitam harus meminta izinmu! Bentuk pasukan infanteri tangguh penjaga celah pegunungan Anatolia.',
    keyChallenges: [
      'Kesehatan Atatürk yang memburuk (wafat pada akhir 1938) memicu transisi kepemimpinan',
      'Pemberontakan separatis suku di Anatolia timur (Dersim)',
      'Tekanan diplomatik gila-gilaan dari Blok Poros dan Sekutu untuk ikut berperang'
    ],
    proTips: 'Gunakan kebijakan Free Trade untuk mengekspor 80% Kromiummu: kamu akan kebanjiran civs dari Jerman dan Inggris secara bersamaan!',
    geopoliticalContext: 'Jembatan strategis antara benua Eropa dan Asia yang mengendalikan pintu masuk Selat Bosporus dan Dardanella. Di bawah kepemimpinan agung Mustafa Kemal Atatürk, Turki menjalankan prinsip diplomasi netral aktif: "Damai di Rumah, Damai di Dunia" (Yurtta Barış, Dünyada Barış).',
    howToGetRich: {
      civSnowball: 'Fokuskan pembangunan di Ankara, Istanbul, dan Izmir. Manfaatkan bank industri negara Etibank dan Sümerbank untuk mendanai pabrik tekstil dan baja.',
      resourceStrategy: 'Turki adalah raksasa Kromium dunia. Kromium ini adalah bahan baku mutlak tank berat dan kapal tempur dunia.',
      tradePolicy: 'Free Trade adalah tambang emas Turki; kamu bisa mendapatkan 15-20 pabrik sipil devisa hanya dari penjualan kromium.',
      warPlunder: 'Jika memilih jalur ekspansi, Turki dapat membangkitkan kembali wilayah Kekaisaran Utsmaniyah (Neo-Ottoman Empire) di Levant dan Irak.'
    },
    howToWinWar: {
      recommendedDoctrine: 'Grand Battleplan untuk bonus pertahanan pegunungan Anatolia.',
      recommendedTemplate: 'Mehmetçik: 9 Infanteri + 2 Artileri + Support Engineer & AA. Pertahanan luar biasa di selat dan pegunungan.',
      theaterStrategy: 'Tutup Selat Bosporus dengan benteng pantai dan ranjau laut. Tahan musuh di tebing curam Pegunungan Taurus.',
      navalAirAdvice: 'Beli pesawat dari luar negeri dan bangun kapal perusak untuk mengamankan Laut Aegea.'
    },
    howToMasterPolitics: {
      topAdvisors: ['İsmet İnönü (Diplomatic Mastermind)', 'Fevzi Çakmak (Chief of General Staff)', 'Celal Bayar (Economic Guru)'],
      stabilityWarSupport: 'Atasi transisi suksesi kepemimpinan pasca wafatnya Atatürk dengan mengangkat İsmet İnönü secara damai.',
      debuffHandling: 'Redam pemberontakan Dersim lewat rekonsiliasi dan investasi pembangunan di Anatolia Timur.',
      recommendedFocusOrder: ['Montreux Convention', 'Etibank & Sümerbank', 'Reintegrate Hatay', 'Peace at Home', 'Modernize the Army', 'Treaty of Saadabad', 'The Balkan Entente']
    },
    stepByStepGameplan: {
      phase1: '1936-1937: Remiliterisasi Selat Bosporus via Konvensi Montreux. Kembangkan tambang kromium Etibank.',
      phase2: '1938-1939: Atasi wafatnya Atatürk dengan tertib. Caplok provinsi Hatay dari mandat Suriah Prancis secara damai.',
      phase3: '1940-1942: Pertahankan netralitas bersenjata sambil menjual kromium ke kedua belah pihak dengan harga mahal.',
      phase4: '1943-1945: Masuk perang di saat yang tepat di pihak pemenang, atau bangkitkan kembali Kekaisaran Utsmaniyah di Timur Tengah.'
    },
    startingForces: {
      divisions: 28,
      airplanes: 130,
      ships: 15,
      manpowerPool: '750 Ribu'
    },
    vitalResources: {
      surplus: ['Kromium (Raksasa Dunia)', 'Baja'],
      deficits: ['Minyak', 'Karet', 'Aluminium'],
      oilStatus: 'Minim (Bisa Amankan Minyak Mosul/Irak di Selatan)',
      rubberStatus: 'Nol'
    }
  },
  {
    id: 'spa',
    tag: 'SPA',
    name: 'Spanyol (Spanish Republic / Nationalist)',
    faction: 'Netral / Axis / Comintern',
    difficulty: 'Ahli',
    flagColors: ['#dc2626', '#eab308'],
    flagSymbol: '⚔',
    ideology: 'Fascism / Communism / Democratic',
    leader: 'Francisco Franco / Manuel Azaña',
    startingCivilianFactories: 12,
    startingMilitaryFactories: 4,
    startingDockyards: 2,
    doctrineRecommendation: 'Superior Firepower atau Grand Battleplan',
    focusPath1936: [
      'The Spanish Civil War (Perang Saudara Spanyol)',
      'Unify the Nationalist Front / Popular Front',
      'Consolidate the North',
      'The Battle of the Ebro',
      'Reconstruction (Pemulihan Pasca Perang)',
      'Gibraltar Claim (Tuntutan Selat Gibraltar)',
      'Recover the Gold Reserves'
    ],
    industryStrategy: 'Menangkan Perang Saudara Spanyol secepat mungkin! Setelah perang selesai pada 1937-1938, fokuskan 100% pada keputusan rekonstruksi (Rebuilding the Nation) untuk menghapus debuff kehancuran perang.',
    militaryStrategy: 'Gunakan divisi kavaleri dan bantuan relawan tank asing (Jerman/Soviet) untuk memotong wilayah musuh menjadi beberapa kantong. Rebut Selat Gibraltar untuk mengunci Laut Tengah.',
    keyChallenges: [
      'Perang Saudara Spanyol yang brutal dan meletus pada Juli 1936',
      'Debuff kehancuran total pasca perang (Recovering from Civil War: memotong pembangunan hingga -50%)',
      'Cadangan emas negara (Gold Reserves) yang terancam dikirim ke Moskow oleh Republik'
    ],
    proTips: 'Jika bermain Nasionalis Franco, bergabunglah dengan Poros dan rebut Gibraltar dari Inggris: jalur suplai Sekutu ke Laut Tengah akan langsung terputus total!',
    geopoliticalContext: 'Negara yang tercabik oleh perang saudara ideologis pada Juli 1936 antara kubu Nasionalis Fasis (Franco didukung Hitler & Mussolini) dan kubu Republik Kiri (didukung Uni Soviet). Pemenang perang saudara mewarisi negara yang hancur namun mengendalikan pintu gerbang paling strategis di Eropa: Selat Gibraltar.',
    howToGetRich: {
      civSnowball: 'Fokuskan pada rekonstruksi kota-kota yang hancur pasca perang saudara. Tambang Tungsten di Galicia adalah aset ekonomi paling berharga.',
      resourceStrategy: 'Spanyol kaya akan Tungsten dan Baja. Ekspor tungsten ke Jerman untuk menyerap pabrik sipil dalam jumlah besar.',
      tradePolicy: 'Gunakan Free Trade pasca perang untuk memulihkan kas negara dan membiayai rekonstruksi pabrik.',
      warPlunder: 'Rebut koloni Prancis di Afrika Utara (Maroko dan Aljazair) serta pangkalan armada Gibraltar milik Inggris.'
    },
    howToWinWar: {
      recommendedDoctrine: 'Superior Firepower untuk mendongkrak soft attack infanteri di medan berbatu semenanjung Iberia.',
      recommendedTemplate: 'Legión Española: 9 Infanteri + 2 Artileri + Support Engineer & AA. Divisi Gunung untuk perbatasan Pyrenees.',
      theaterStrategy: 'Perang Saudara: Potong Spanyol Republik menjadi dua di Madrid dan Valencia. Perang Dunia: Serang benteng Gibraltar dengan artileri berat.',
      navalAirAdvice: 'Amankan perairan Selat Gibraltar dengan armada kapal selam dan pesawat tempur darat.'
    },
    howToMasterPolitics: {
      topAdvisors: ['Francisco Franco (Caudillo)', 'Ramon Serrano Suñer (Diplomat)', 'Emilio Mola / Juan Yagüe (Generals)'],
      stabilityWarSupport: 'Satukan faksi Carlis dan Falangis di bawah kepemimpinan tunggal FET y de las JONS untuk mencegah perang saudara sekunder.',
      debuffHandling: 'Hapus debuff "Recovering from Civil War" dengan menyelesaikan fokus-fokus rekonstruksi ekonomi nasional.',
      recommendedFocusOrder: ['Unify the Front', 'Consolidate the North', 'Battle of the Ebro', 'End the War', 'Reconstruct the Nation', 'Claim Gibraltar', 'Join the Axis']
    },
    stepByStepGameplan: {
      phase1: '1936-1937: Menangkan Perang Saudara Spanyol dengan manuver pincer di Madrid dan utara.',
      phase2: '1938-1939: Jalankan program rekonstruksi ekonomi nasional dan bangun kembali industri di Madrid dan Barcelona.',
      phase3: '1940-1942: Masuk perang bersama Blok Poros. Serbu dan rebut benteng Gibraltar dari tangan Inggris untuk mengunci Laut Tengah.',
      phase4: '1943-1945: Perluas kekuasaan ke Afrika Barat Laut dan bentuk imperium Hispanik modern.'
    },
    startingForces: {
      divisions: 20,
      airplanes: 100,
      ships: 18,
      manpowerPool: '480 Ribu'
    },
    vitalResources: {
      surplus: ['Tungsten (Sangat Kaya)', 'Baja'],
      deficits: ['Minyak', 'Karet', 'Aluminium'],
      oilStatus: 'Defisit Total (Wajib Impor)',
      rubberStatus: 'Nol'
    }
  },
  {
    id: 'fin',
    tag: 'FIN',
    name: 'Republik Finlandia (Finland)',
    faction: 'Netral / Axis (Perang Kelanjutan)',
    difficulty: 'Ahli',
    flagColors: ['#1e3a8a', '#f8fafc'],
    flagSymbol: '❄',
    ideology: 'Democratic / Non-Aligned',
    leader: 'Kyösti Kallio / Carl Gustaf Mannerheim',
    startingCivilianFactories: 10,
    startingMilitaryFactories: 3,
    startingDockyards: 1,
    doctrineRecommendation: 'Grand Battleplan atau Mass Assault (Guerilla)',
    focusPath1936: [
      'The Mannerheim Line (Garis Benteng Mannerheim)',
      'Suojeluskunta (Milisi Sukarela)',
      'Motti Tactics (Taktik Motti Salju)',
      'White Death (Simo Häyhä Penembak Jitu)',
      'Industrial Modernization',
      'The Winter War (Perang Musim Dingin)',
      'Greater Finland (Finlandia Raya)'
    ],
    industryStrategy: 'Industri Finlandia sangat kecil namun efisien. Kembangkan tambang Nikel di Petsamo (Kutub Utara) yang sangat dicari oleh Jerman. Bangun pabrik senjata Suomi KP/-31 di Helsinki.',
    militaryStrategy: 'Taktik Motti di salju beku! Manfaatkan debuff cuaca dingin ekstrem (-40°C) dan rawa-rawa Karelia untuk menjebak divisi tank raksasa Uni Soviet. Pasukan ski Finlandia kebal terhadap atrisi salju.',
    keyChallenges: [
      'Invasi raksasa Tentara Merah Soviet pada Perang Musim Dingin (Winter War akhir 1939)',
      'Populasi dan manpower yang sangat minim (hanya beberapa ratus ribu pria)',
      'Garis perbatasan hutan belantara yang teramat luas dengan Soviet'
    ],
    proTips: 'Aktifkan keputusan "Motti Tactics": tentaramu akan mendapatkan bonus serangan dan pertahanan di hutan salju hingga +35%, sanggup membantai divisi Soviet dengan rasio korban 1:20!',
    geopoliticalContext: 'Bangsa pemberani di utara beku yang berhadapan langsung dengan raksasa Uni Soviet. Dipimpin oleh Marsekal Carl Gustaf Emil Mannerheim dan dinaungi oleh semangat pantang menyerah "Sisu", Finlandia membuktikan kepada dunia bahwa strategi pertahanan salju dapat mempermalukan jutaan tentara adidaya.',
    howToGetRich: {
      civSnowball: 'Fokuskan pembangunan di Helsinki dan Turku. Kembangkan tambang Nikel Petsamo di utara dan kayu hutan untuk industri kertas/selulosa.',
      resourceStrategy: 'Tambang Nikel Petsamo adalah komoditas bernilai tinggi yang diekspor ke Jerman untuk mendapatkan pabrik alutsista.',
      tradePolicy: 'Gunakan Export Focus untuk menggenjot riset senjata senapan dan senapan mesin ringan Suomi.',
      warPlunder: 'Dalam Perang Kelanjutan (Continuation War), Finlandia dapat merebut seluruh Karelia Timur, Danau Onega, dan Semenanjung Kola untuk mewujudkan cita-cita Finlandia Raya (Greater Finland).'
    },
    howToWinWar: {
      recommendedDoctrine: 'Grand Battleplan atau Mass Assault: Maksimalkan bonus pertahanan parit dan gerilya salju.',
      recommendedTemplate: 'Sissi Salju: 8 Infanteri + Support Recon Ski, Support Engineer, & Artileri. Penembak jitu dan taktik Motti mematikan.',
      theaterStrategy: 'Tahan di Garis Benteng Mannerheim di Tanah Genting Karelia. Di utara (Ladoga), biarkan divisi Soviet masuk ke hutan lalu potong logistik mereka dengan taktik Motti.',
      navalAirAdvice: 'Gunakan kapal pertahanan pantai (Ilmarinen dan Väinämöinen) untuk melindungi Teluk Finlandia dari pendaratan amfibi armada Baltik Soviet.'
    },
    howToMasterPolitics: {
      topAdvisors: ['Carl Gustaf Emil Mannerheim (Field Marshal & National Hero)', 'Risto Ryti (Prime Minister)', 'A.K. Cajander (Politician)'],
      stabilityWarSupport: 'Semangat "Sisu" memberi Finlandia Stabilitas 100% dan War Support 100% yang kebal terhadap keputusasaan perang.',
      debuffHandling: 'Hadapi ultimatum Soviet atas Karelia dengan tegas; bersiaplah menyambut Perang Musim Dingin dengan benteng kokoh.',
      recommendedFocusOrder: ['The Mannerheim Line', 'Suojeluskunta', 'Motti Tactics', 'Industrial Modernization', 'The Winter War', 'Arms from the West', 'Greater Finland']
    },
    stepByStepGameplan: {
      phase1: '1936-1937: Bangun Garis Benteng Mannerheim hingga Level 6-8 di Tanah Genting Karelia. Latih milisi Suojeluskunta.',
      phase2: '1938-1939: Lengkapi seluruh divisi dengan Support Recon Ski dan senapan mesin Suomi. Tolak tuntutan wilayah Stalin.',
      phase3: '1939-1940: Menangkan Perang Musim Dingin! Bantai ratusan ribu tentara Soviet di salju Karelia dengan taktik Motti.',
      phase4: '1941-1944: Bergabung dengan Poros dalam Perang Kelanjutan. Rebut kembali Karelia dan bebaskan wilayah Kola hingga Danau Onega.'
    },
    startingForces: {
      divisions: 15,
      airplanes: 70,
      ships: 5,
      manpowerPool: '210 Ribu'
    },
    vitalResources: {
      surplus: ['Aluminium', 'Baja', 'Nikel (Petsamo)'],
      deficits: ['Minyak', 'Karet'],
      oilStatus: 'Nol (Wajib Impor)',
      rubberStatus: 'Nol'
    }
  },
  {
    id: 'man',
    tag: 'MAN',
    name: 'Kekaisaran Manchukuo (Qing Restoration)',
    faction: 'Co-Prosperity Sphere / Mandiri',
    difficulty: 'Ahli',
    flagColors: ['#eab308', '#dc2626'],
    flagSymbol: '🐉',
    ideology: 'Fascism / Non-Aligned',
    leader: 'Kaisar Puyi',
    startingCivilianFactories: 10,
    startingMilitaryFactories: 3,
    startingDockyards: 0,
    doctrineRecommendation: 'Mass Assault atau Superior Firepower',
    focusPath1936: [
      'Pacify the Countryside (Tumpas Bandit)',
      'The Five Year Plan (Industrialisasi Manchuria)',
      'Invite Foreign Capital',
      'Assert Assertiveness / Obedience',
      'Claim the Mandate of Heaven (Rebut Mandat Langit)',
      'Dragon Returns (Kebangkitan Dinasti Qing)',
      'Imperial Army Expansion'
    ],
    industryStrategy: 'Manchuria menyimpan cadangan Batubara dan Bijih Besi terkaya di Asia Timur. Bangun kawasan industri Anshan dan Mukden untuk mendirikan basis militer mandiri.',
    militaryStrategy: 'Latih tentara kekaisaran secara diam-diam. Saat Jepang terjebak dalam perang berlarut-larut melawan Tiongkok Nasionalis di selatan, tusuk Jepang dari belakang (Rebellion) dan usir seluruh tentara Kwantung!',
    keyChallenges: [
      'Status sebagai negara boneka (Puppet) Kekaisaran Jepang yang tidak berdaulat',
      'Pemberontakan bandit dan gerilyawan anti-Jepang di pedesaan',
      'Perbatasan utara yang berhadapan langsung dengan divisi lapis baja Uni Soviet di Amur'
    ],
    proTips: 'Pilih jalur fokus "Assert Assertiveness" -> "Claim the Mandate of Heaven" untuk membebaskan diri dari perbudakan Jepang dan merestorasi Dinasti Qing di Beijing!',
    geopoliticalContext: 'Negara boneka yang didirikan oleh Jepang di Manchuria dengan menempatkan Kaisar Terakhir Tiongkok, Aisin Gioro Puyi. Terjepit antara kendali ketat Tentara Kwantung Jepang dan ancaman Uni Soviet di utara, Manchukuo menyimpan ambisi tersembunyi untuk merebut kembali tahta naga di Kota Terlarang Beijing.',
    howToGetRich: {
      civSnowball: 'Fokuskan pembangunan di Mukden, Harbin, dan Anshan. Kembangkan Rencana Lima Tahun Manchuria untuk membanjiri negara dengan pabrik baja dan senjata.',
      resourceStrategy: 'Manchuria kaya akan Baja dan Aluminium. Ekspor mineral ke Jepang untuk mendapatkan pabrik sipil devisa.',
      tradePolicy: 'Gunakan Export Focus di awal untuk mengakselerasi kemandirian industri alutsista.',
      warPlunder: 'Setelah mengusir Jepang, kamu berhak merebut seluruh daratan Tiongkok dan Korea, menyerap ratusan pabrik dan puluhan juta manpower.'
    },
    howToWinWar: {
      recommendedDoctrine: 'Mass Assault (Mass Mobilization) untuk melipatgandakan rekrutmen manpower rakyat Tiongkok.',
      recommendedTemplate: 'Banners Kekaisaran: 9 Infanteri + 2 Artileri + Support Engineer & Recon.',
      theaterStrategy: 'Tunggu tentara Jepang masuk jauh ke selatan Tiongkok. Begitu pasukan Jepang terpencar, umumkan perang kemerdekaan, rebut pelabuhan Dalian dan Semenanjung Korea untuk memutus suplai tentara Jepang di daratan Asia.',
      navalAirAdvice: 'Gunakan pesawat darat untuk mengebom pangkalan armada Jepang di Laut Kuning.'
    },
    howToMasterPolitics: {
      topAdvisors: ['Kaisar Puyi (Dragon Emperor)', 'Zhang Jinghui (Prime Minister)', 'Toru Takeuchi (Military Reformer)'],
      stabilityWarSupport: 'Fokus "Claim the Mandate of Heaven" memberikan legitimasi dinasti kekaisaran yang mendongkrak War Support hingga 100%.',
      debuffHandling: 'Tumpas bandit di pedesaan pada tahun 1936 untuk menghapus penalti produksi dan stabilitas lokal.',
      recommendedFocusOrder: ['Pacify the Countryside', 'Five Year Plan', 'Expand Anshan Steel', 'Assert Assertiveness', 'Claim the Mandate of Heaven', 'The Dragon Returns', 'Reclaim the Empire']
    },
    stepByStepGameplan: {
      phase1: '1936-1937: Tumpas bandit di pedesaan, kembangkan kompleks baja Anshan, dan bangun pabrik senjata secara diam-diam.',
      phase2: '1938-1939: Bangun tentara kekaisaran. Saat Jepang sibuk bertempur di Tiongkok tengah, siapkan fokus pemberontakan kemerdekaan.',
      phase3: '1940-1942: Nyatakan perang terhadap Jepang! Sapu bersih tentara Kwantung di Dalian dan Korea, lalu serbu Beijing.',
      phase4: '1943-1945: Taklukkan Tiongkok Nasionalis dan Komunis, satukan seluruh daratan Asia di bawah panji Dinasti Qing yang agung.'
    },
    startingForces: {
      divisions: 12,
      airplanes: 30,
      ships: 0,
      manpowerPool: '540 Ribu'
    },
    vitalResources: {
      surplus: ['Baja (Anshan)', 'Aluminium'],
      deficits: ['Minyak', 'Karet', 'Kromium'],
      oilStatus: 'Nol (Tergantung Kilang Sintetis Minyak)',
      rubberStatus: 'Nol'
    }
  }
];
