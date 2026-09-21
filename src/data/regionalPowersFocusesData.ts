import { NationalFocus, FocusPresetPath } from '../types';

export const REGIONAL_POWERS_FOCUSES_DATA: NationalFocus[] = [
  // =========================================================================
  // ROMANIA (ROM)
  // =========================================================================
  {
    id: 'rom-ploiesti-oil',
    countryId: 'rom',
    name: 'Bentengi & Modernisasi Kilang Minyak Ploiești',
    originalName: 'Fortify Ploiești Oilfields',
    iconType: 'industry',
    branch: 'Industri & Minyak Nasional',
    days: 70,
    prerequisites: [],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      civFactories: 2,
      warSupport: 10
    },
    pros: [
      '+50 Pasokan Minyak Mentah Ploiești (Lumbung minyak utama Eropa)',
      '+2 Pabrik Sipil dari hasil devisa ekspor minyak ke Poros atau Sekutu',
      '+4 Baterai Meriam Anti-Udara (Flak) melindungi kilang dari pengeboman Sekutu'
    ],
    cons: [
      'Menjadi target utama pengeboman udara jarak jauh Sekutu (Operasi Tidal Wave)'
    ],
    keyEffectsSummary: 'Meningkatkan pasokan minyak Ploiești dan memasang pertahanan anti-udara berat.',
    recommendedTiming: '1936-1937',
    historicalContext: 'Ladang minyak Ploiești menyumbang lebih dari 60% kebutuhan bahan bakar minyak Jerman selama Perang Dunia II.'
  },
  {
    id: 'rom-royal-dictatorship',
    countryId: 'rom',
    name: 'Diktatur Kerajaan Raja Carol II',
    originalName: 'Institute Royal Dictatorship',
    iconType: 'politics',
    branch: 'Politik Monarki & Pengaruh Istana',
    days: 70,
    prerequisites: [],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      politicalPower: 150,
      stability: 10
    },
    pros: [
      '+150 Political Power dan +10% Stabilitas',
      'Membubarkan partai-partai politik korup dan menekan milisi ekstremis Iron Guard',
      'Membuka penasihat industri Camarilla'
    ],
    cons: [
      'Gaya hidup mewah Raja Carol memicu kecemburuan perwira militer'
    ],
    keyEffectsSummary: 'Mengokohkan kekuasaan otoriter monarki Raja Carol II dan stabilitas domestik.',
    recommendedTiming: '1937-1938',
    historicalContext: 'Konstitusi 1938 membubarkan parlementerisme dan membentuk kekuasaan eksekutif di bawah Raja Carol II.'
  },
  {
    id: 'rom-transylvania-compromise',
    countryId: 'rom',
    name: 'Hadapi Diktat Wina & Kudeta Raja Michael',
    originalName: 'Vienna Award Crisis & Royal Coup',
    iconType: 'politics',
    branch: 'Politik Monarki & Pengaruh Istana',
    days: 70,
    prerequisites: ['rom-royal-dictatorship'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      warSupport: 15,
      armyXP: 25
    },
    pros: [
      'Menggulingkan rezim korup dan menyerahkan mandat kepada Marsekal Ion Antonescu / Raja Michael',
      '+25 Army XP untuk mereorganisasi Tentara Kerajaan Rumania',
      '+15% War Support untuk membebaskan kembali Bessarabia dari Uni Soviet'
    ],
    cons: [
      'Kehilangan Transylvania Utara ke Hungaria sementara waktu akibat Diktat Wina'
    ],
    keyEffectsSummary: 'Merespons krisis teritorial 1940 dan memobilisasi pasukan untuk Operasi Barbarossa.',
    recommendedTiming: '1940',
    historicalContext: 'Setelah kehilangan Transylvania dan Bessarabia, Antonescu mengambil alih kekuasaan dan bergabung dengan Poros.'
  },

  // =========================================================================
  // YUGOSLAVIA (YUG)
  // =========================================================================
  {
    id: 'yug-rupnik-line',
    countryId: 'yug',
    name: 'Garis Benteng Alpen Rupnik (Rupnik Line)',
    originalName: 'Construct the Rupnik Line',
    iconType: 'military',
    branch: 'Pertahanan Perbatasan & Gunung',
    days: 70,
    prerequisites: [],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      warSupport: 10
    },
    pros: [
      '+4 Benteng Darat di perbatasan Slovenia menghadap Italia dan Austria',
      'Medan pegunungan Slovenia menjadi benteng alami anti-tank',
      '+10% War Support'
    ],
    cons: [
      'Menghabiskan kapasitas konstruksi selama 70 hari'
    ],
    keyEffectsSummary: 'Membangun garis bunker pegunungan Rupnik Line untuk menahan serbuan pasukan Italia dan Jerman.',
    recommendedTiming: '1937-1938',
    historicalContext: 'Jenderal Leon Rupnik merancang benteng garis pertahanan sepanjang perbatasan barat Yugoslavia.'
  },
  {
    id: 'yug-banovina-croatia',
    countryId: 'yug',
    name: 'Perjanjian Cvetković–Maček: Otonomi Banovina Kroasia',
    originalName: 'Devolve the Banovina of Croatia',
    iconType: 'politics',
    branch: 'Kesatuan Nasional & Etnis',
    days: 70,
    prerequisites: [],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      stability: 15,
      politicalPower: 100
    },
    pros: [
      '+15% Stabilitas nasional dengan meredakan ketegangan etnis Kroasia-Serbia',
      'Menghapus ancaman pemberontakan milisi separatis Ustaše di Zagreb',
      '+100 Political Power'
    ],
    cons: [
      'Menimbulkan keberatan dari kaum nasionalis garis keras di Beograd'
    ],
    keyEffectsSummary: 'Mencapai rekonsiliasi etnis melalui pembentukan wilayah otonom Banovina Kroasia.',
    recommendedTiming: '1939',
    historicalContext: 'Agustus 1939, pemerintah Yugoslavia memberikan otonomi khusus kepada Kroasia demi mencegah perang saudara.'
  },
  {
    id: 'yug-belgrade-coup',
    countryId: 'yug',
    name: 'Kudeta Beograd 1941: Lebih Baik Perang daripada Menyerah!',
    originalName: 'The Belgrade Coup (Bolje rat nego pakt!)',
    iconType: 'expansion',
    branch: 'Kesatuan Nasional & Etnis',
    days: 35,
    prerequisites: ['yug-banovina-croatia'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      warSupport: 25,
      stability: -10
    },
    pros: [
      '+25% War Support nasional',
      'Membatalkan penandatanganan Pakta Tripartit Poros secara heroik',
      'Menerima jaminan keamanan dan suplai senjata udara dari Inggris Raya'
    ],
    cons: [
      'Membuat Hitler murka dan melancarkan invasi blitzkrieg hukuman (Operasi 25) dalam hitungan minggu'
    ],
    keyEffectsSummary: 'Kudeta militer patriotik pro-Sekutu pimpinan Jenderal Simović menolak tunduk pada Jerman.',
    recommendedTiming: 'Maret 1941',
    historicalContext: '27 Maret 1941, rakyat Beograd turun ke jalan meneriakkan slogan "Bolje grob nego rob, bolje rat nego pakt!"'
  },

  // =========================================================================
  // HUNGARY (HUN)
  // =========================================================================
  {
    id: 'hun-gyor-program',
    countryId: 'hun',
    name: 'Program Persenjataan Kembali Győr 1938',
    originalName: 'The Győr Rearmament Programme',
    iconType: 'industry',
    branch: 'Modernisasi Militer & Industri Honvéd',
    days: 70,
    prerequisites: [],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      milFactories: 3,
      civFactories: 2,
      armyXP: 20
    },
    pros: [
      '+3 Pabrik Militer di Győr dan Budapest untuk memproduksi amunisi dan senjata',
      '+2 Pabrik Sipil dan +20 Army XP',
      'Mengakhiri pembatasan militer sepihak yang dipaksakan Perjanjian Trianon'
    ],
    cons: [
      'Meningkatkan kewaspadaan aliansi Little Entente di sekitar Hungaria'
    ],
    keyEffectsSummary: 'Mega proyek industri militer 1 miliar pengő untuk membangun kembali angkatan darat Honvéd.',
    recommendedTiming: '1938',
    historicalContext: 'Diumumkan Perdana Menteri Kálmán Darányi di kota Győr pada Maret 1938 untuk memodernisasi militer Hungaria.'
  },
  {
    id: 'hun-vienna-awards',
    countryId: 'hun',
    name: 'Diktat Wina: Rebut Kembali Slovakia Selatan & Transylvania',
    originalName: 'The Vienna Arbitrations',
    iconType: 'expansion',
    branch: 'Revanchisme Trianon & Restorasi',
    days: 70,
    prerequisites: ['hun-gyor-program'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      civFactories: 3,
      politicalPower: 120,
      stability: 15
    },
    pros: [
      'Mendapatkan wilayah Slovakia Selatan, Ruthenia Karpatia, dan Transylvania Utara secara damai',
      '+3 Pabrik Sipil dan jutaan populasi warga etnis Magyar',
      '+120 Political Power dan +15% Stabilitas'
    ],
    cons: [
      'Menjadikan Hungaria terikat secara diplomatik dan militer kepada Adolf Hitler'
    ],
    keyEffectsSummary: 'Memulihkan sebagian besar wilayah bersejarah Mahkota Santo Stefanus lewat arbitrasi diplomatik.',
    recommendedTiming: '1938-1940',
    historicalContext: 'Arbitrasi Wina Pertama (1938) dan Kedua (1940) mengembalikan wilayah berpenduduk Hungaria tanpa perang terbuka.'
  },
  {
    id: 'hun-turan-tank',
    countryId: 'hun',
    name: 'Pengembangan Tank Medium 40M Turán & Zrínyi',
    originalName: 'Turán and Zrínyi Armored Vehicles',
    iconType: 'military',
    branch: 'Modernisasi Militer & Industri Honvéd',
    days: 70,
    prerequisites: ['hun-gyor-program'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      milFactories: 2,
      armyXP: 25
    },
    pros: [
      'Diskon riset tank medium domestik Turán I/II dan meriam serbu Zrínyi',
      '+2 Pabrik Militer di pabrik mesin Weiss Manfréd di Csepel',
      '+25 Army XP untuk membentuk Divisi Lapis Baja ke-1 dan ke-2 Honvéd'
    ],
    cons: [
      'Armor tank Turán masih kalah tebal dibanding T-34 Soviet di front timur'
    ],
    keyEffectsSummary: 'Memproduksi tank medium buatan dalam negeri berbasis lisensi Škoda T-21.',
    recommendedTiming: '1940-1941',
    historicalContext: 'Pabrik Weiss Manfréd dan Ganz memproduksi tank Turán yang menjadi tulang punggung divisi lapis baja Hungaria.'
  },

  // =========================================================================
  // CZECHOSLOVAKIA (CZE)
  // =========================================================================
  {
    id: 'cze-benes-line',
    countryId: 'cze',
    name: 'Garis Benteng Perbatasan Beneš (Beneš Wall)',
    originalName: 'Complete the Border Fortifications',
    iconType: 'military',
    branch: 'Pertahanan Benteng Sudetenland',
    days: 70,
    prerequisites: [],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      warSupport: 15
    },
    pros: [
      '+5 hingga +7 Benteng Darat di Sudetenland (Benteng terkuat di Eropa Tengah)',
      'Medan perbukitan dan bunker lapis baja ganda membuat serbuan tank Jerman gagal total',
      '+15% War Support'
    ],
    cons: [
      'Bila wilayah Sudetenland diserahkan lewat diplomasi, benteng ini jatuh ke tangan musuh tanpa pertempuran'
    ],
    keyEffectsSummary: 'Membangun kubah bunker beton Level 7 di perbatasan Sudetenland yang setara dengan Garis Maginot.',
    recommendedTiming: '1936-1937',
    historicalContext: 'Terinspirasi oleh Garis Maginot Prancis, Cekoslowakia membangun jaringan benteng modern terpadu di pegunungan Sudeten.'
  },
  {
    id: 'cze-skoda-works',
    countryId: 'cze',
    name: 'Pabrik Senjata Raksasa Škoda & ČKD',
    originalName: 'Škoda Works Arsenal of Central Europe',
    iconType: 'industry',
    branch: 'Industri Manufaktur Plzeň',
    days: 70,
    prerequisites: [],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      milFactories: 4,
      civFactories: 2
    },
    pros: [
      '+4 Pabrik Militer di Plzeň dan Brno',
      '+2 Pabrik Sipil dan bonus produksi senapan mesin legendaris ZB vz. 26 (cikal bakal Bren Gun Inggris)',
      'Diskon riset tank ringan LT vz. 35 dan LT vz. 38 (Panzer 38t)'
    ],
    cons: [
      'Pabrik ini sangat didambakan Jerman untuk memperkuat Wehrmacht'
    ],
    keyEffectsSummary: 'Menjadikan Cekoslowakia eksportir senjata dan tank nomor satu di Eropa Tengah.',
    recommendedTiming: '1936',
    historicalContext: 'Pabrik Škoda di Plzeň adalah kompleks manufaktur senjata terbesar kedua di Eropa setelah Krupp Jerman.'
  },
  {
    id: 'cze-fight-alone',
    countryId: 'cze',
    name: 'Tolak Perjanjian Munich: Kami Akan Bertempur Sendiri!',
    originalName: 'Reject the Munich Diktat',
    iconType: 'military',
    branch: 'Pertahanan Benteng Sudetenland',
    days: 35,
    prerequisites: ['cze-benes-line'],
    mutuallyExclusive: [],
    historical: false,
    statsDelta: {
      warSupport: 30,
      stability: 15
    },
    pros: [
      'Menolak kapitulasi kepada ultimatum Hitler dan pengkhianatan Chamberlain di Munich',
      '+30% War Support dan +15% Stabilitas',
      'Divisi Cekoslowakia bertahan kokoh di benteng Beneš Line dan menimbulkan korban massal bagi Wehrmacht'
    ],
    cons: [
      'Memulai perang langsung melawan Jerman Reich tanpa bantuan Sekutu Barat'
    ],
    keyEffectsSummary: 'Mempertahankan kedaulatan bangsa dan menolak menyerahkan Sudetenland di Munich.',
    recommendedTiming: 'September 1938 saat Konferensi Munich',
    historicalContext: 'Skenario alternatif heroik di mana Presiden Edvard Beneš memutuskan memobilisasi 1,5 juta tentara Ceko daripada menyerah.'
  },

  // =========================================================================
  // TURKEY (TUR)
  // =========================================================================
  {
    id: 'tur-montreux-convention',
    countryId: 'tur',
    name: 'Konvensi Montreux 1936: Remiliterisasi Selat Turki',
    originalName: 'The Montreux Convention',
    iconType: 'navy',
    branch: 'Kedaulatan Maritim & Selat',
    days: 70,
    prerequisites: [],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      politicalPower: 120,
      stability: 10,
      dockyards: 2
    },
    pros: [
      'Kedaulatan penuh atas Selat Bosporus dan Dardanela diakui komunitas internasional',
      '+2 Benteng Pesisir dan +2 Galangan Kapal di Istanbul',
      'Dapat menutup selat terhadap kapal perang musuh di masa perang'
    ],
    cons: [
      'Menimbulkan gesekan diplomatik dengan Uni Soviet yang menginginkan akses bebas ke Laut Tengah'
    ],
    keyEffectsSummary: 'Merestorasi hak Turki menempatkan meriam dan garnisun di Selat Bosporus dan Dardanela.',
    recommendedTiming: '1936',
    historicalContext: 'Konvensi Montreux 1936 memberikan Turki kendali penuh atas navigasi militer di Selat Turki hingga hari ini.'
  },
  {
    id: 'tur-hatay-annexation',
    countryId: 'tur',
    name: 'Negosiasi Diplomasi Aneksasi Damai Hatay',
    originalName: 'Peaceful Annexation of Hatay',
    iconType: 'expansion',
    branch: 'Kebijakan Luar Negeri Atatürk & İnönü',
    days: 70,
    prerequisites: ['tur-montreux-convention'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      politicalPower: 100,
      stability: 5
    },
    pros: [
      'Menganeksasi Republik Hatay (Iskenderun) dari mandat Prancis secara damai lewat referendum',
      '+1 Pabrik Sipil dan penambahan populasi warga',
      '+100 Political Power dan mengamankan perbatasan selatan'
    ],
    cons: [
      'Memerlukan hubungan baik dengan Prancis'
    ],
    keyEffectsSummary: 'Mengintegrasikan Hatay ke dalam Republik Turki melalui jalur diplomasi elegan.',
    recommendedTiming: '1938-1939',
    historicalContext: 'Keinginan terakhir Mustafa Kemal Atatürk yang terwujud pada Juli 1939 saat Hatay resmi bergabung dengan Turki.'
  },
  {
    id: 'tur-peace-at-home',
    countryId: 'tur',
    name: 'Prinsip Atatürk: Damai di Rumah, Damai di Dunia',
    originalName: 'Peace at Home, Peace in the World',
    iconType: 'politics',
    branch: 'Kebijakan Luar Negeri Atatürk & İnönü',
    days: 70,
    prerequisites: [],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      stability: 20,
      politicalPower: 140
    },
    pros: [
      '+20% Stabilitas nasional dan +140 Political Power',
      'Mempertahankan netralitas bersenjata aktif selama Perang Dunia II di bawah Presiden İsmet İnönü',
      'Memperdagangkan kromium secara menguntungkan kepada kedua belah pihak'
    ],
    cons: [
      'Membatasi ambisi ekspansi teritorial'
    ],
    keyEffectsSummary: 'Menjaga Turki tetap makmur dan damai terhindar dari kehancuran Perang Dunia II.',
    recommendedTiming: '1937-1939',
    historicalContext: 'Semboyan legendaris "Yurtta sulh, cihanda sulh" menjadi pedoman politik luar negeri Turki untuk tidak terseret kancah perang.'
  },

  // =========================================================================
  // SPAIN (SPA)
  // =========================================================================
  {
    id: 'spa-recover-civil-war',
    countryId: 'spa',
    name: 'Rekonstruksi Pasca Perang Saudara Spanyol',
    originalName: 'Recover from the Civil War',
    iconType: 'industry',
    branch: 'Rekonstruksi & Konsolidasi Nasional',
    days: 70,
    prerequisites: [],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      civFactories: 3,
      stability: 15
    },
    pros: [
      'Menghapus debuff penalti kehancuran ekonomi "Recovering from Civil War"',
      '+3 Pabrik Sipil di Madrid, Barcelona, dan Valencia',
      '+15% Stabilitas sosial masyarakat'
    ],
    cons: [
      'Memerlukan waktu panjang setelah perang saudara usai'
    ],
    keyEffectsSummary: 'Memperbaiki jembatan, rel kereta api, dan industri yang hancur selama Perang Saudara 1936-1939.',
    recommendedTiming: '1939 setelah perang saudara selesai',
    historicalContext: 'Spanyol kehilangan lebih dari 500.000 jiwa dan ekonominya luluh lantak sebelum rekonstruksi dimulai.'
  },
  {
    id: 'spa-claim-gibraltar',
    countryId: 'spa',
    name: 'Operasi Felix: Rebut Kembali Gibraltar',
    originalName: 'Operation Felix & Claim Gibraltar',
    iconType: 'expansion',
    branch: 'Rekonstruksi & Konsolidasi Nasional',
    days: 70,
    prerequisites: ['spa-recover-civil-war'],
    mutuallyExclusive: [],
    historical: false,
    statsDelta: {
      warSupport: 20,
      armyXP: 25
    },
    pros: [
      'Alasan perang dan rencana penyerbuan ke Benteng Batu Gibraltar (The Rock)',
      'Menutup pintu masuk Laut Mediterania Barat bagi seluruh armada Inggris Royal Navy',
      '+20% War Support dan +25 Army XP'
    ],
    cons: [
      'Memicu perang langsung melawan Kerajaan Inggris dan Sekutu'
    ],
    keyEffectsSummary: 'Menutup Selat Gibraltar dan mengusir kekuasaan kolonial Inggris dari semenanjung Iberia.',
    recommendedTiming: '1940-1941 jika memilih bergabung dengan Poros',
    historicalContext: 'Jerman dan Spanyol merencanakan Operasi Felix untuk merebut Gibraltar namun gagal disepakati di pertemuan Hendaye.'
  },

  // =========================================================================
  // FINLAND (FIN)
  // =========================================================================
  {
    id: 'fin-mannerheim-line',
    countryId: 'fin',
    name: 'Garis Benteng Mannerheim di Tanah Genting Karelia',
    originalName: 'Enhance the Mannerheim Line',
    iconType: 'military',
    branch: 'Pertahanan Tanah Air & Musim Dingin',
    days: 70,
    prerequisites: [],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      warSupport: 15
    },
    pros: [
      '+5 Benteng Darat di Viipuri dan Tanah Genting Karelia',
      'Medan danau beku dan hutan pinus memberikan penalti serangan ekstrem bagi tank Uni Soviet',
      '+15% War Support'
    ],
    cons: [
      'Konsentrasi pertahanan hanya terpusat di selatan'
    ],
    keyEffectsSummary: 'Membangun kubah benteng legendaris Mannerheim Line yang menahan jutaan tentara Soviet dalam Perang Musim Dingin.',
    recommendedTiming: '1936-1938',
    historicalContext: 'Marsekal Carl Gustaf Emil Mannerheim memimpin pembangunan benteng terpadu yang mematahkan serbuan awal Tentara Merah pada 1939.'
  },
  {
    id: 'fin-sisu-spirit',
    countryId: 'fin',
    name: 'Semangat Sisu & Taktik Penyergapan Motti',
    originalName: 'The Spirit of Sisu & Motti Tactics',
    iconType: 'military',
    branch: 'Pertahanan Tanah Air & Musim Dingin',
    days: 70,
    prerequisites: ['fin-mannerheim-line'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      armyXP: 30,
      warSupport: 20
    },
    pros: [
      '+25% Attack dan Defense divisi ski Finlandia di cuaca beku salju ekstrem',
      'Membuka taktik Motti (mengepung dan mencincang konvoi tank musuh yang memanjang di jalan hutan)',
      'Penembak runduk legendaris White Death (Simo Häyhä) memberikan penalti moral musuh'
    ],
    cons: [
      'Jumlah manpower tentara Finlandia terbatas'
    ],
    keyEffectsSummary: 'Memberikan kemampuan tempur musim dingin tak tertandingi kepada prajurit Finlandia.',
    recommendedTiming: '1939 sebelum Perang Musim Dingin (Talvisota)',
    historicalContext: 'Konsep filosofi bangsa Finlandia "Sisu" (ketabahan luar biasa menghadapi rintangan mustahil) dalam Perang Musim Dingin 1939-1940.'
  },

  // =========================================================================
  // CANADA (CAN)
  // =========================================================================
  {
    id: 'can-send-in-zombies',
    countryId: 'can',
    name: 'Mobilisasi Wajib Militer Luar Negeri (The Zombies)',
    originalName: 'Send in the "Zombies"',
    iconType: 'military',
    branch: 'Mobilisasi Tenaga Kerja & Front Eropa',
    days: 70,
    prerequisites: [],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      manpowerBonus: '+200.000 Manpower',
      warSupport: 10
    },
    pros: [
      '+200.000 Manpower tentara siap tempur untuk dikirim ke front Eropa',
      'Membuka korps lapis baja Kanada di Normandia (Juno Beach)',
      '+10% War Support'
    ],
    cons: [
      'Sedikit menurunkan stabilitas di provinsi Quebec yang berbahasa Prancis'
    ],
    keyEffectsSummary: 'Menerapkan wajib militer untuk mengirim pasukan darat ke Eropa membebaskan Prancis dan Belanda.',
    recommendedTiming: '1942-1943',
    historicalContext: 'Istilah populer untuk tentara wajib militer Kanada yang awalnya hanya bertugas di dalam negeri sebelum dikirim ke front depan.'
  },

  // =========================================================================
  // BRITISH RAJ / INDIA (RAJ)
  // =========================================================================
  {
    id: 'raj-two-million-volunteers',
    countryId: 'raj',
    name: 'Mobilisasi 2,5 Juta Prajurit Sukarelawan India',
    originalName: 'Two and a Half Million Volunteers',
    iconType: 'military',
    branch: 'Tentara Darat India & Pertahanan Burma',
    days: 70,
    prerequisites: [],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      manpowerBonus: '+1.500.000 Manpower',
      armyXP: 30
    },
    pros: [
      '+1.500.000 Manpower sukarelawan terlatih (Tentara sukarelawan terbesar dalam sejarah)',
      'Divisi Gurkha elit dengan bonus pertempuran hutan dan bukit Kohima-Imphal',
      '+30 Army XP'
    ],
    cons: [
      'Membutuhkan produksi senapan dan perlengkapan infanteri dalam jumlah kolosal'
    ],
    keyEffectsSummary: 'Merekrut jutaan prajurit sukarelawan India untuk bertempur di Afrika Utara, Italia, dan hutan Burma.',
    recommendedTiming: '1940-1941',
    historicalContext: 'Tentara India Britania bertambah dari 200.000 orang menjadi 2,5 juta orang secara sukarela selama Perang Dunia II.'
  },

  // =========================================================================
  // AUSTRALIA (AST)
  // =========================================================================
  {
    id: 'ast-rats-of-tobruk',
    countryId: 'ast',
    name: 'Tikus Tobruk: Pertahanan Gurun Afrika Utara (Rats of Tobruk)',
    originalName: 'The Rats of Tobruk',
    iconType: 'military',
    branch: 'Pasukan Ekspedisi Australia (AIF)',
    days: 70,
    prerequisites: [],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      armyXP: 35,
      warSupport: 15
    },
    pros: [
      '+35 Army XP untuk mendesain divisi infanteri mekanis gurun',
      '+20% Entrenchment dan Defense di medan gurun terbuka',
      'Membendung gerak maju Korps Afrika Erwin Rommel selama 8 bulan pengepungan'
    ],
    cons: [
      'Pasukan berada jauh di belahan bumi utara saat ancaman Jepang mendekati Australia'
    ],
    keyEffectsSummary: 'Divisi ke-9 Australia mempertahankan benteng pelabuhan Tobruk dari gempuran tank panzer Jerman.',
    recommendedTiming: '1941',
    historicalContext: 'Pemberitaan radio Jerman mencemooh mereka terperangkap seperti tikus, yang kemudian diadopsi dengan bangga sebagai julukan "Rats of Tobruk".'
  },

  // =========================================================================
  // MANCHUKUO (MAN)
  // =========================================================================
  {
    id: 'man-assert-independence',
    countryId: 'man',
    name: 'Kembalikan Takhta Dinasti Qing & Lepaskan Belenggu Kwantung',
    originalName: 'Reclaim the Dragon Throne',
    iconType: 'politics',
    branch: 'Restorasi Kekaisaran Qing',
    days: 70,
    prerequisites: [],
    mutuallyExclusive: [],
    historical: false,
    statsDelta: {
      politicalPower: 150,
      stability: 15,
      warSupport: 20
    },
    pros: [
      'Menyatakan kemerdekaan penuh dari kendali Tentara Kwantung Kekaisaran Jepang',
      'Klaim sah atas seluruh daratan Tiongkok sebagai Kaisar Dinasti Qing (Puyi)',
      '+150 Political Power dan +15% Stabilitas'
    ],
    cons: [
      'Memicu perang langsung melawan Kekaisaran Jepang jika tidak dipersiapkan dengan matang'
    ],
    keyEffectsSummary: 'Kaisar Puyi menegakkan kedaulatan independen Dinasti Qing dan mengusir penjajahan Jepang.',
    recommendedTiming: '1939-1940 saat Jepang sibuk di selatan',
    historicalContext: 'Aspirasi rahasia loyalis monarki Qing di Changchun untuk mendirikan kembali kekaisaran tanpa campur tangan Tokyo.'
  },
  {
    id: 'man-showa-steel',
    countryId: 'man',
    name: 'Pabrik Baja Raksasa Showa Anshan (Shōwa Seikōsho)',
    originalName: 'Shōwa Steel Works Expansion',
    iconType: 'industry',
    branch: 'Industri Berat Manchuria (Mangyō)',
    days: 70,
    prerequisites: [],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      milFactories: 3,
      civFactories: 2
    },
    pros: [
      '+3 Pabrik Militer dan +2 Pabrik Sipil di Anshan dan Mukden',
      '+40 Pasokan Sumber Daya Besi & Baja',
      'Menjadikan Manchuria lumbung industri berat termaju di Asia Timur'
    ],
    cons: [
      'Menjadi target utama serangan pembom jarak jauh B-29 Sekutu dari pangkalan Chengdu'
    ],
    keyEffectsSummary: 'Membangun kompleks peleburan baja raksasa Showa Steel Works di Anshan.',
    recommendedTiming: '1936-1937',
    historicalContext: 'Kompleks industri Anshan memproduksi lebih dari 1 juta ton baja per tahun untuk mesin perang Kekaisaran.'
  },
  {
    id: 'man-five-peoples',
    countryId: 'man',
    name: 'Koncordia Lima Bangsa & Restorasi Takhta Terlarang',
    originalName: 'Concordia Association & Imperial Mandate',
    iconType: 'politics',
    branch: 'Restorasi Kekaisaran Qing',
    days: 70,
    prerequisites: ['man-assert-independence'],
    mutuallyExclusive: [],
    historical: false,
    statsDelta: {
      politicalPower: 120,
      stability: 15
    },
    pros: [
      '+120 Political Power dan +15% Stabilitas nasional',
      'Merekrut milisi bendera Delapan Panji (Eight Banners) dari etnis Manchu dan Mongol',
      'Membuka integrasi teritorial seluruh provinsi Tiongkok utara'
    ],
    cons: [
      'Menimbulkan penolakan dari kaum nasionalis Kuomintang dan komunis'
    ],
    keyEffectsSummary: 'Menyatukan rakyat di bawah panji Dinasti Qing dan memobilisasi pasukan restorasi.',
    recommendedTiming: '1940-1941',
    historicalContext: 'Ideologi Concordia Association mempromosikan harmoni suku bangsa Manchu, Mongol, Han, Jepang, dan Korea.'
  },

  // =========================================================================
  // EKSPANSI TAMBAHAN CANADA (CAN)
  // =========================================================================
  {
    id: 'can-bcatp',
    countryId: 'can',
    name: 'Rencana Pelatihan Udara Persemakmuran (BCATP)',
    originalName: 'British Commonwealth Air Training Plan',
    iconType: 'air',
    branch: 'Industri Dirgantara & Latihan Pilot',
    days: 70,
    prerequisites: [],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      airXP: 50,
      civFactories: 1
    },
    pros: [
      '+50 Air XP untuk riset pesawat tempur dan doktrin superioritas udara',
      'Melatih 130.000 pilot dan awak pesawat tempur Sekutu di langit Kanada yang luas dan aman dari pengeboman',
      '+15% Efisiensi pengalaman pilot pesawat terbang'
    ],
    cons: [
      'Memerlukan alokasi bahan bakar minyak untuk armada pesawat latih'
    ],
    keyEffectsSummary: 'Kanada menjadi "Aerodrome of Democracy", melatih pilot tempur terbaik Sekutu.',
    recommendedTiming: '1939-1940',
    historicalContext: 'BCATP melatih hampir separuh dari seluruh pilot tempur dan pembom Angkatan Udara Persemakmuran selama PD II.'
  },
  {
    id: 'can-corvette-fleet',
    countryId: 'can',
    name: 'Armada Kapal Korvet Flower-class Pengawal Atlantik',
    originalName: 'Royal Canadian Navy Corvette Fleet',
    iconType: 'navy',
    branch: 'Pertempuran Samudra Atlantik (Battle of the Atlantic)',
    days: 70,
    prerequisites: [],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      dockyards: 3,
      navyXP: 25
    },
    pros: [
      '+3 Galangan Kapal di Halifax dan Vancouver',
      '+40 Kapal Konvoi dan bonus deteksi sonar anti-kapal selam U-Boat',
      '+25 Navy XP untuk taktik pengawalan konvoi Halifax-Liverpool'
    ],
    cons: [
      'Kapal korvet berukuran kecil dan berlayar di laut Atlantik Utara yang ganas'
    ],
    keyEffectsSummary: 'Membangun armada kapal pengawal korvet anti-kapal selam terbesar ketiga di dunia.',
    recommendedTiming: '1940-1941',
    historicalContext: 'RCN Kanada berkembang dari belasan kapal menjadi armada raksasa lebih dari 400 kapal perang yang mengamankan rute konvoi Atlantik.'
  },

  // =========================================================================
  // EKSPANSI TAMBAHAN BRITISH RAJ / INDIA (RAJ)
  // =========================================================================
  {
    id: 'raj-tata-steel',
    countryId: 'raj',
    name: 'Mega Pabrik Baja Tata Jamshedpur',
    originalName: 'Tata Iron and Steel Expansion',
    iconType: 'industry',
    branch: 'Industri Berat & Persenjataan Ishapore',
    days: 70,
    prerequisites: [],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      milFactories: 3,
      civFactories: 2
    },
    pros: [
      '+3 Pabrik Militer dan +2 Pabrik Sipil di Bengal dan Bihar',
      '+50 Pasokan Baja Domestik (Pabrik baja tunggal terbesar di Imperium Britania)',
      'Produksi massal kendaraan lapis baja Tatanagar dan senapan Enfield di pabrik Ishapore'
    ],
    cons: [
      'Menuntut stabilitas buruh di tengah gejolak politik gerakan kemerdekaan India'
    ],
    keyEffectsSummary: 'Memperluas kompleks peleburan baja Tata di Jamshedpur untuk memasok teater perang Timur Tengah dan Asia.',
    recommendedTiming: '1937-1939',
    historicalContext: 'Pabrik Tata Steel memproduksi rel kereta api, pelat baja tank, dan jutaan butir peluru untuk Sekutu.'
  },
  {
    id: 'raj-burma-frontier',
    countryId: 'raj',
    name: 'Benteng Garis Depan Kohima-Imphal & Pasukan Chindit',
    originalName: 'Kohima-Imphal Defense & Chindits',
    iconType: 'military',
    branch: 'Tentara Darat India & Pertahanan Burma',
    days: 70,
    prerequisites: ['raj-two-million-volunteers'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      armyXP: 35,
      warSupport: 20
    },
    pros: [
      '+3 Benteng Darat di perbukitan Kohima dan lembah Imphal',
      '+35 Army XP dan formasi gerilya hutan Chindits pimpinan Orde Wingate',
      '+25% Combat Bonus di medan hutan lebat melawan Tentara ke-15 Jepang'
    ],
    cons: [
      'Rantai suplai logistik di pegunungan Assam rawan terputus saat musim hujan monsun'
    ],
    keyEffectsSummary: 'Mempertahankan pintu gerbang India di Kohima-Imphal dan melancarkan serangan penetrasi jarak jauh.',
    recommendedTiming: '1943-1944',
    historicalContext: 'Pertempuran Kohima dan Imphal (1944) adalah kekalahan darat terbesar Kekaisaran Jepang dalam Perang Dunia II.'
  },

  // =========================================================================
  // EKSPANSI TAMBAHAN AUSTRALIA (AST)
  // =========================================================================
  {
    id: 'ast-kokoda-track',
    countryId: 'ast',
    name: 'Pertahanan Rimba Jalur Kokoda Track (Nugini)',
    originalName: 'Kokoda Track Jungle Defense',
    iconType: 'military',
    branch: 'Pertahanan Tanah Air & Pasifik',
    days: 70,
    prerequisites: [],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      armyXP: 30,
      warSupport: 20
    },
    pros: [
      '+30 Army XP untuk doktrin perang hutan tropis',
      '+25% Defense dan Attack infanteri di medan pegunungan hutan tropis Owen Stanley',
      'Membendung gerak maju Jepang menuju Port Moresby dan mencegah invasi ke daratan Australia'
    ],
    cons: [
      'Penyakit malaria dan medan lumpur curam menguras suplai prajurit milisi Maroubra Force'
    ],
    keyEffectsSummary: 'Batalion ke-39 milisi Australia bertempur gigih di Jalur Kokoda menyelamatkan Australia dari ancaman Jepang.',
    recommendedTiming: '1942',
    historicalContext: 'Kampanye Jalur Kokoda (1942) menjadi legenda militer terpenting dalam sejarah Australia modern.'
  },
  {
    id: 'ast-cac-boomerang',
    countryId: 'ast',
    name: 'Pesawat Tempur Domestik CAC Boomerang & Pabrik Melbourne',
    originalName: 'Commonwealth Aircraft Corporation Boomerang',
    iconType: 'air',
    branch: 'Industri Dirgantara & Manufaktur',
    days: 70,
    prerequisites: [],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      milFactories: 2,
      airXP: 20
    },
    pros: [
      '+2 Pabrik Militer di Fishermans Bend Melbourne',
      'Diskon riset pesawat tempur udara taktis CAC Boomerang dan pembom torpedo Beaufort',
      '+20 Air XP untuk perlindungan wilayah udara pantai utara Australia (Darwin)'
    ],
    cons: [
      'Kapasitas produksi pesawat terbatas dibanding pabrik raksasa Amerika Serikat'
    ],
    keyEffectsSummary: 'Mendesain dan memproduksi pesawat tempur darurat pertama buatan dalam negeri Australia.',
    recommendedTiming: '1941-1942',
    historicalContext: 'CAC Boomerang dirancang dan diterbangkan hanya dalam waktu 14 minggu setelah serangan Pearl Harbor.'
  },

  // =========================================================================
  // EKSPANSI TAMBAHAN SPANYOL (SPA) & FINLANDIA (FIN)
  // =========================================================================
  {
    id: 'spa-blue-division',
    countryId: 'spa',
    name: 'Kirim Divisi Biru (División Azul) ke Front Timur',
    originalName: 'Send the Blue Division to the Eastern Front',
    iconType: 'military',
    branch: 'Rekonstruksi & Konsolidasi Nasional',
    days: 70,
    prerequisites: ['spa-recover-civil-war'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      armyXP: 35,
      warSupport: 15
    },
    pros: [
      '+35 Army XP dari pengalaman tempur 45.000 sukarelawan Spanyol di Pengepungan Leningrad',
      'Memperoleh konsesi teknologi militer dan persenjataan modern dari Jerman tanpa harus ikut perang resmi',
      '+15% War Support nasional'
    ],
    cons: [
      'Menimbulkan gesekan diplomatik dengan Inggris dan Amerika Serikat'
    ],
    keyEffectsSummary: 'Mengirim divisi sukarelawan Spanyol bertempur melawan Uni Soviet di Front Timur.',
    recommendedTiming: '1941 setelah Operasi Barbarossa',
    historicalContext: 'Divisi Infanteri ke-250 Wehrmacht (División Azul) bertempur heroik di Danau Ilmen dan Krasny Bor.'
  },
  {
    id: 'fin-continuation-war',
    countryId: 'fin',
    name: 'Perang Kelanjutan: Rebut Kembali Viipuri & Danau Ladoga',
    originalName: 'The Continuation War (Jatkosota)',
    iconType: 'expansion',
    branch: 'Pertahanan Tanah Air & Musim Dingin',
    days: 70,
    prerequisites: ['fin-sisu-spirit'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      warSupport: 25,
      armyXP: 25
    },
    pros: [
      'Klaim sah merebut kembali provinsi Karelia dan Viipuri yang dirampas Soviet',
      '+25% War Support dan +25 Army XP',
      'Menerima bantuan meriam serbu StuG III (Sturmi) dan pesawat tempur Messerschmitt dari Jerman'
    ],
    cons: [
      'Menghadapi gempuran serangan balasan raksasa Tentara Merah Soviet pada 1944'
    ],
    keyEffectsSummary: 'Memanfaatkan Operasi Barbarossa untuk memulihkan perbatasan Finlandia yang hilang.',
    recommendedTiming: 'Juni 1941',
    historicalContext: 'Perang Kelanjutan (1941-1944) melihat Finlandia merebut kembali tanah airnya sebelum menyepakati gencatan senjata Moskow.'
  },

  // =========================================================================
  // EKSPANSI TAMBAHAN POLANDIA (POL)
  // =========================================================================
  {
    id: 'pol-sanacja-regime',
    countryId: 'pol',
    name: 'Konsolidasi Rezim Sanacja & Kastil Kerajaan Warsawa',
    originalName: 'Sanacja Government & Castle Castle Faction',
    iconType: 'politics',
    branch: 'Kedaulatan & Diplomasi Sanacja',
    days: 70,
    prerequisites: [],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      politicalPower: 120,
      stability: 10
    },
    pros: [
      '+120 Political Power dan +10% Stabilitas domestik',
      'Menyatukan faksi Kolonel pimpinan Edward Rydz-Śmigły dan Presiden Ignacy Mościcki',
      'Membuka penasihat militer veteran Perang Polandia-Soviet 1920'
    ],
    cons: [
      'Menimbulkan gesekan dengan partai-partai oposisi sayap kiri'
    ],
    keyEffectsSummary: 'Mengokohkan kepemimpinan otoriter patriotik Sanacja demi menjaga persatuan bangsa.',
    recommendedTiming: '1936',
    historicalContext: 'Gerakan Sanacja didirikan oleh Marsekal Józef Piłsudski untuk "menyembuhkan" moral politik Polandia.'
  },
  {
    id: 'pol-cop-triangle',
    countryId: 'pol',
    name: 'Segitiga Industri Pusat COP (Centralny Okręg Przemysłowy)',
    originalName: 'Central Industrial Region (COP)',
    iconType: 'industry',
    branch: 'Ekonomi & Industri COP',
    days: 70,
    prerequisites: ['pol-sanacja-regime'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      milFactories: 3,
      civFactories: 2
    },
    pros: [
      '+3 Pabrik Militer di Stalowa Wola, Radom, dan Rzeszów (jauh dari perbatasan Jerman dan Soviet)',
      '+2 Pabrik Sipil dan produksi senapan Vis vz. 35 serta meriam anti-tank Bofors 37mm',
      'Pembangunan pembangkit listrik tenaga air di Sungai San'
    ],
    cons: [
      'Membutuhkan alokasi modal investasi besar sebelum perang pecah'
    ],
    keyEffectsSummary: 'Mega proyek kawasan industri strategis di pedalaman Polandia aman dari serbuan kilat musuh.',
    recommendedTiming: '1937-1938',
    historicalContext: 'Menteri Keuangan Eugeniusz Kwiatkowski merancang proyek COP untuk memodernisasi persenjataan Polandia.'
  }
];

export const REGIONAL_POWERS_PRESETS: FocusPresetPath[] = [
  {
    id: 'preset-pol-meta',
    countryId: 'pol',
    title: 'Meta Polandia: Industri COP & Benteng Hel',
    description: 'Konsolidasi Sanacja, bangun segitiga industri COP di pedalaman, dan pertahankan semenanjung Hel dari serbuan ganda.',
    type: 'meta_historical',
    focusIds: [
      'pol-sanacja-regime',
      'pol-cop-triangle',
      'pol-fortify-hel'
    ]
  },
  {
    id: 'preset-can-meta',
    countryId: 'can',
    title: 'Meta Kanada: Pilot BCATP & Korvet Pengawal Atlantik',
    description: 'Latih ribuan pilot tempur lewat BCATP, kawal konvoi laut dengan kapal korvet, dan mobilisasi tentara pembebas Eropa.',
    type: 'meta_historical',
    focusIds: [
      'can-bcatp',
      'can-corvette-fleet',
      'can-send-in-zombies'
    ]
  },
  {
    id: 'preset-raj-meta',
    countryId: 'raj',
    title: 'Meta British Raj: 2,5 Juta Sukarelawan & Baja Tata',
    description: 'Mobilisasi tentara sukarelawan terbesar dalam sejarah, genjot produksi baja raksasa Tata, dan bentengi garis Burma.',
    type: 'meta_historical',
    focusIds: [
      'raj-tata-steel',
      'raj-two-million-volunteers',
      'raj-burma-frontier'
    ]
  },
  {
    id: 'preset-ast-meta',
    countryId: 'ast',
    title: 'Meta Australia: Rimba Kokoda & Tikus Tobruk',
    description: 'Bendung gerak maju Rommel di Tobruk, habisi pasukan penyerbu Jepang di jalur Kokoda, dan buat pesawat Boomerang.',
    type: 'meta_historical',
    focusIds: [
      'ast-rats-of-tobruk',
      'ast-kokoda-track',
      'ast-cac-boomerang'
    ]
  },
  {
    id: 'preset-spa-meta',
    countryId: 'spa',
    title: 'Meta Spanyol: Rekonstruksi & División Azul',
    description: 'Pulihkan kehancuran pasca perang saudara, kirim sukarelawan División Azul ke front timur, dan klaim kembali Gibraltar.',
    type: 'meta_historical',
    focusIds: [
      'spa-recover-civil-war',
      'spa-blue-division',
      'spa-claim-gibraltar'
    ]
  },
  {
    id: 'preset-man-meta',
    countryId: 'man',
    title: 'Meta Manchukuo: Baja Showa & Restorasi Takhta Qing',
    description: 'Genjot pabrik baja Showa Anshan, galang aliansi Concordia, dan deklarasikan kemerdekaan penuh Dinasti Qing.',
    type: 'alternative_history',
    focusIds: [
      'man-showa-steel',
      'man-assert-independence',
      'man-five-peoples'
    ]
  },
  {
    id: 'preset-rom-oil-meta',
    countryId: 'rom',
    title: 'Meta Rumania: Benteng Minyak Ploiești & Rekonsiliasi Transylvania',
    description: 'Amankan pasokan minyak mentah Ploiești untuk Poros, bentuk kepemimpinan kuat, dan tuntaskan krisis perbatasan.',
    type: 'meta_historical',
    focusIds: [
      'rom-ploiesti-oil',
      'rom-royal-dictatorship',
      'rom-transylvania-compromise'
    ]
  },
  {
    id: 'preset-yug-balkan-meta',
    countryId: 'yug',
    title: 'Meta Yugoslavia: Benteng Rupnik & Kesatuan Banovina',
    description: 'Bangun benteng pegunungan Rupnik Line, redam ketegangan etnis lewat Banovina Kroasia, dan pertahankan martabat bangsa.',
    type: 'meta_historical',
    focusIds: [
      'yug-rupnik-line',
      'yug-banovina-croatia',
      'yug-belgrade-coup'
    ]
  },
  {
    id: 'preset-hun-trianon-meta',
    countryId: 'hun',
    title: 'Meta Hungaria: Program Győr & Arbitrasi Diktat Wina',
    description: 'Persenjatai kembali angkatan darat Honvéd lewat Program Győr, raih kembali tanah leluhur lewat Diktat Wina, dan buat tank Turán.',
    type: 'meta_historical',
    focusIds: [
      'hun-gyor-program',
      'hun-vienna-awards',
      'hun-turan-tank'
    ]
  },
  {
    id: 'preset-cze-fortress-meta',
    countryId: 'cze',
    title: 'Meta Cekoslowakia: Benteng Tembok Beneš & Pabrik Škoda',
    description: 'Maksimalkan industri persenjataan raksasa Škoda dan bangun kubah benteng Sudetenland Level 7 untuk melawan invasi Hitler.',
    type: 'meta_historical',
    focusIds: [
      'cze-skoda-works',
      'cze-benes-line',
      'cze-fight-alone'
    ]
  },
  {
    id: 'preset-tur-montreux-meta',
    countryId: 'tur',
    title: 'Meta Turki: Kedaulatan Selat Montreux & Damai Dunia',
    description: 'Remiliterisasi Selat Bosporus lewat Konvensi Montreux, aneksasi Hatay secara damai, dan jaga stabilitas diplomasi Atatürk.',
    type: 'meta_historical',
    focusIds: [
      'tur-montreux-convention',
      'tur-hatay-annexation',
      'tur-peace-at-home'
    ]
  },
  {
    id: 'preset-fin-sisu-meta',
    countryId: 'fin',
    title: 'Meta Finlandia: Benteng Mannerheim & Taktik Motti Salju',
    description: 'Bangun pertahanan Garis Mannerheim di Karelia dan habisi konvoi musuh di hutan salju dengan semangat Sisu tak terkalahkan.',
    type: 'meta_historical',
    focusIds: [
      'fin-mannerheim-line',
      'fin-sisu-spirit',
      'fin-continuation-war'
    ]
  }
];
