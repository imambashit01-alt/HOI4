import { NationalFocus, FocusPresetPath } from '../types';

export const MINOR_EUROPEAN_COUNTRIES_META = [
  { id: 'swe', tag: 'SWE', name: 'Kerajaan Swedia (Sweden)', flagSymbol: '⚔', flagColors: ['#1d4ed8', '#eab308'] },
  { id: 'nor', tag: 'NOR', name: 'Kerajaan Norwegia (Norway)', flagSymbol: '⚓', flagColors: ['#dc2626', '#1e3a8a'] },
  { id: 'gre', tag: 'GRE', name: 'Kerajaan Yunani (Greece)', flagSymbol: '🏛', flagColors: ['#2563eb', '#ffffff'] },
  { id: 'hol', tag: 'HOL', name: 'Kerajaan Belanda (Netherlands)', flagSymbol: '🌷', flagColors: ['#ea580c', '#1e3a8a'] },
  { id: 'bel', tag: 'BEL', name: 'Kerajaan Belgia (Belgium)', flagSymbol: '🦁', flagColors: ['#eab308', '#dc2626'] },
  { id: 'por', tag: 'POR', name: 'Republik Portugal', flagSymbol: '⛵', flagColors: ['#15803d', '#dc2626'] },
  { id: 'bul', tag: 'BUL', name: 'Kerajaan Bulgaria', flagSymbol: '🛡', flagColors: ['#15803d', '#dc2626'] },
  { id: 'den', tag: 'DEN', name: 'Kerajaan Denmark', flagSymbol: '👑', flagColors: ['#dc2626', '#ffffff'] },
  { id: 'swi', tag: 'SWI', name: 'Konfederasi Swiss (Switzerland)', flagSymbol: '🏔', flagColors: ['#dc2626', '#ffffff'] },
  { id: 'aus', tag: 'AUS', name: 'Republik Austria (Österreich)', flagSymbol: '🦅', flagColors: ['#dc2626', '#ffffff'] },
];

export const MINOR_EUROPEAN_FOCUSES_DATA: NationalFocus[] = [
  // =========================================================================
  // SWEDIA (SWE)
  // =========================================================================
  {
    id: 'swe-en-svensk-tiger',
    countryId: 'swe',
    name: 'En Svensk Tiger (Seekor Harimau Swedia)',
    originalName: 'En Svensk Tiger',
    iconType: 'military',
    branch: 'Pertahanan & Netralitas Bersenjata',
    days: 70,
    prerequisites: [],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      politicalPower: 120,
      stability: 10,
      warSupport: 5
    },
    pros: [
      '+10% Stabilitas nasional & +120 PP instan',
      'Bonus deteksi kontra-intelijen mata-mata musuh +20%',
      'Mengurangi efektivitas sabotase agen asing di tambang Kiruna'
    ],
    cons: [
      'Membutuhkan netralitas yang ketat di awal perang'
    ],
    keyEffectsSummary: 'Kampanye kerahasiaan nasional Swedia, memberikan +10% Stabilitas dan +120 PP.',
    recommendedTiming: '1936',
    historicalContext: 'Slogan dan poster ikonik Swedia untuk mengingatkan warga agar tidak membocorkan rahasia negara.'
  },
  {
    id: 'swe-kiruna-expansion',
    countryId: 'swe',
    name: 'Ekspansi Tambang Bijih Besi Kiruna',
    originalName: 'Kiruna Iron Ore Expansion',
    iconType: 'industry',
    branch: 'Ekonomi & Industri Tambang',
    days: 70,
    prerequisites: ['swe-en-svensk-tiger'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      civFactories: 2
    },
    pros: [
      '+35 Ekspor Baja Kiruna (sangat dibutuhkan Jerman dan Sekutu)',
      '+2 Pabrik Sipil dari hasil perdagangan ekspor logam mulia',
      'Meningkatkan hubungan diplomasi dengan mitra dagang utama'
    ],
    cons: [
      'Menjadikan Swedia target operasi intelijen dan rencana invasi Inggris/Jerman'
    ],
    keyEffectsSummary: 'Menambah +35 Baja Kiruna dan +2 Pabrik Sipil.',
    recommendedTiming: '1937',
    historicalContext: 'Tambang Kiruna memasok lebih dari 40% kebutuhan bijih besi industri baja Jerman selama PD II.'
  },
  {
    id: 'swe-bofors-contracts',
    countryId: 'swe',
    name: 'Kontrak Militer Bofors 40mm',
    originalName: 'Bofors Defense Contracts',
    iconType: 'military',
    branch: 'Pertahanan & Netralitas Bersenjata',
    days: 70,
    prerequisites: ['swe-kiruna-expansion'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      milFactories: 2,
      armyXP: 25,
      airXP: 10
    },
    pros: [
      '+2 Pabrik Militer khusus senjata artileri anti-udara (AA)',
      'Diskon riset meriam legendaris Bofors 40mm L/60',
      '+25 Army XP untuk kustomisasi divisi militer'
    ],
    cons: [
      'Membutuhkan alokasi 1 pabrik baja domestik'
    ],
    keyEffectsSummary: 'Memberikan +2 Pabrik Militer dan diskon riset Bofors 40mm.',
    recommendedTiming: '1938',
    historicalContext: 'Pabrik senjata Bofors di Karlskoga memproduksi meriam anti-udara otomatis paling terkenal di dunia.'
  },

  // =========================================================================
  // BELANDA (HOL)
  // =========================================================================
  {
    id: 'hol-zuiderzee-works',
    countryId: 'hol',
    name: 'Proyek Reklamasi Zuiderzee Works',
    originalName: 'Zuiderzee Works',
    iconType: 'industry',
    branch: 'Industri & Reklamasi Nasional',
    days: 70,
    prerequisites: [],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      civFactories: 3,
      stability: 5
    },
    pros: [
      '+3 Pabrik Sipil di provinsi polder yang baru dikeringkan',
      'Membuka slot bangunan pabrik tambahan di Holland',
      '+5% Stabilitas sosial masyarakat'
    ],
    cons: [
      'Biaya konsumsi barang di masa pengerjaan proyek'
    ],
    keyEffectsSummary: 'Membuka +3 Pabrik Sipil dan slot konstruksi di daratan polder baru.',
    recommendedTiming: 'Awal 1936',
    historicalContext: 'Mega proyek teknik hidraulik bendungan Afsluitdijk yang mengubah teluk laut menjadi danau air tawar dan lahan subur.'
  },
  {
    id: 'hol-gateway-indies',
    countryId: 'hol',
    name: 'Gerbang Pasifik: Jalur Logistik Hindia Belanda',
    originalName: 'Gateway to the East Indies',
    iconType: 'navy',
    branch: 'Kemaritiman & Koloni',
    days: 70,
    prerequisites: ['hol-zuiderzee-works'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      dockyards: 2
    },
    pros: [
      'Akses langsung ke pasokan raksasa Karet (+45) dan Minyak (+20) Sumatra & Jawa',
      '+2 Galangan Kapal di Rotterdam',
      'Dukungan armada KNIL dan kapal penjelajah De Ruyter'
    ],
    cons: [
      'Sangat rentan diputus oleh blokade kapal selam musuh jika jalur laut tidak dijaga'
    ],
    keyEffectsSummary: 'Mengamankan aliran minyak & karet Hindia Belanda dan +2 Galangan Kapal.',
    recommendedTiming: '1937',
    historicalContext: 'Hindia Belanda adalah penghasil karet dan minyak bumi terbesar di kawasan Pasifik yang menjadi incaran ekspansi Jepang.'
  },
  {
    id: 'hol-inundate-water-line',
    countryId: 'hol',
    name: 'Banjiri Garis Pertahanan Air (Holland Water Line)',
    originalName: 'Inundate the Water Lines',
    iconType: 'military',
    branch: 'Pertahanan Garis Air',
    days: 70,
    prerequisites: ['hol-zuiderzee-works'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      stability: -5,
      warSupport: 15
    },
    pros: [
      '+3 Benteng Darat (Forts) di sekitar Amsterdam, Rotterdam, & Utrecht',
      'Penalti gerakan tank musuh -70% di area rawa banjir buatan',
      '+15% War Support'
    ],
    cons: [
      '-5% Stabilitas karena merendam lahan pertanian warga'
    ],
    keyEffectsSummary: 'Membuka pertahanan benteng air yang melumpuhkan gerakan lapis baja penyerang.',
    recommendedTiming: '1939-1940',
    historicalContext: 'Doktrin pertahanan klasik Belanda dengan membuka pintu air kanal untuk menenggelamkan dataran rendah setinggi lutut manusia.'
  },

  // =========================================================================
  // BELGIA (BEL)
  // =========================================================================
  {
    id: 'bel-eben-emael',
    countryId: 'bel',
    name: 'Perkuat Benteng Raksasa Eben-Emael',
    originalName: 'Fort Eben-Emael Modernization',
    iconType: 'military',
    branch: 'Pertahanan Sungai Meuse',
    days: 70,
    prerequisites: [],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      warSupport: 10
    },
    pros: [
      '+4 Benteng Darat di provinsi Liege & Terusan Albert',
      'Bonus pertahanan divisi artileri kubah baja',
      'Menghambat serbuan blitzkrieg Jerman'
    ],
    cons: [
      'Rentan terhadap serangan pasukan terjun payung (glider paratrooper) musuh'
    ],
    keyEffectsSummary: 'Membangun benteng bawah tanah modern Level 4 di Liege.',
    recommendedTiming: '1936-1937',
    historicalContext: 'Benteng Eben-Emael dianggap sebagai benteng paling modern di dunia sebelum direbut oleh pasukan glider Jerman pada Mei 1940.'
  },
  {
    id: 'bel-congo-uranium',
    countryId: 'bel',
    name: 'Amankan Pasokan Bijih Uranium Kongo (Shinkolobwe)',
    originalName: 'Secure the Katanga & Congo Minerals',
    iconType: 'industry',
    branch: 'Ekonomi Kolonial Kongo',
    days: 70,
    prerequisites: ['bel-eben-emael'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      civFactories: 2
    },
    pros: [
      '+2 Pabrik Sipil dari ekspor mineral Katanga',
      '+20 Karet Afrika Tengah untuk pabrik pesawat tempur',
      'Menyediakan bahan baku Proyek Manhattan Sekutu'
    ],
    cons: [
      'Memerlukan pengawalan rute konvoi maritim'
    ],
    keyEffectsSummary: 'Memberikan +2 Pabrik Sipil dan +20 Karet dari tambang Shinkolobwe Kongo.',
    recommendedTiming: '1938',
    historicalContext: 'Tambang Shinkolobwe di Kongo Belgia memasok sebagian besar uranium kemurnian tinggi yang digunakan dalam bom atom pertama.'
  },

  // =========================================================================
  // YUNANI (GRE)
  // =========================================================================
  {
    id: 'gre-metaxas-line',
    countryId: 'gre',
    name: 'Garis Benteng Metaxas (Metaxas Line)',
    originalName: 'Metaxas Line Construction',
    iconType: 'military',
    branch: 'Pertahanan Nasional & Kemandirian',
    days: 70,
    prerequisites: [],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      warSupport: 15,
      stability: 5
    },
    pros: [
      '+4 Benteng Pegunungan di perbatasan Makedonia & Thrace',
      '+15% War Support',
      'Bonus pertahanan gunung +20% bagi divisi infantri Yunani'
    ],
    cons: [
      'Menghabiskan kapasitas konstruksi selama 70 hari'
    ],
    keyEffectsSummary: 'Membangun rantai benteng pertahanan pegunungan Level 4 di Makedonia.',
    recommendedTiming: '1936-1937',
    historicalContext: 'Dibangun di bawah Ioannis Metaxas, benteng ini berhasil mematahkan serbuan pasukan Poros di utara.'
  },
  {
    id: 'gre-ochi-day',
    countryId: 'gre',
    name: 'Hari "Ochi!" (Tolak Ultimatum Italia)',
    originalName: 'The "Ochi!" Ultimatum Rejection',
    iconType: 'expansion',
    branch: 'Pertahanan Nasional & Kemandirian',
    days: 70,
    prerequisites: ['gre-metaxas-line'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      armyXP: 30,
      stability: 10,
      warSupport: 20
    },
    pros: [
      '+20% War Support dan +10% Stabilitas instan',
      '+30 Army XP untuk kustomisasi doktrin pertahanan gunung',
      'Buff serangan balasan divisi Yunani di medan terjal Epirus'
    ],
    cons: [
      'Memicu perang langsung melawan Kerajaan Italia'
    ],
    keyEffectsSummary: 'Menolak kapitulasi kepada Fasis Italia, membangkitkan perlawanan total Yunani.',
    recommendedTiming: 'Oktober 1940',
    historicalContext: '28 Oktober 1940, Metaxas menjawab ultimatum Mussolini dengan kata singkat "Oxi" (Tidak!), memicu Perang Yunani-Italia.'
  },

  // =========================================================================
  // BULGARIA (BUL)
  // =========================================================================
  {
    id: 'bul-tsar-boris',
    countryId: 'bul',
    name: 'Konsolidasi Kekuasaan Tsar Boris III',
    originalName: 'Consolidate the Tsar\'s Rule',
    iconType: 'politics',
    branch: 'Monarki & Geopolitik Balkan',
    days: 70,
    prerequisites: [],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      politicalPower: 150,
      stability: 15
    },
    pros: [
      '+150 Political Power dan +15% Stabilitas',
      'Mengurangi pengaruh faksi militer radikal Zveno',
      'Membuka opsi negosiasi wilayah Dobrudja Selatan'
    ],
    cons: [
      'Memperkuat monarki otoriter'
    ],
    keyEffectsSummary: 'Menstabilkan politik dalam negeri Bulgaria dan memberi +150 PP.',
    recommendedTiming: '1936',
    historicalContext: 'Tsar Boris III memegang kendali penuh atas politik luar negeri Bulgaria yang berhati-hati di tengah pergolakan Eropa.'
  },
  {
    id: 'bul-dobrudja-reclaim',
    countryId: 'bul',
    name: 'Perjanjian Craiova: Rebut Kembali Dobrudja Selatan',
    originalName: 'Reclaim Southern Dobrudja',
    iconType: 'expansion',
    branch: 'Monarki & Geopolitik Balkan',
    days: 70,
    prerequisites: ['bul-tsar-boris'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      civFactories: 2
    },
    pros: [
      'Mengembalikan wilayah Dobrudja Selatan dari Rumania secara damai',
      '+2 Pabrik Sipil dan +10 Baja',
      '+10% War Support tanpa menimbulkan perang'
    ],
    cons: [
      'Mewajibkan hubungan bersahabat dengan blok Poros'
    ],
    keyEffectsSummary: 'Menganeksasi Dobrudja Selatan secara diplomatik melalui Perjanjian Craiova.',
    recommendedTiming: '1940',
    historicalContext: 'September 1940, Rumania menyerahkan kembali Dobrudja Selatan ke Bulgaria atas mediasi kekuatan besar.'
  },

  // =========================================================================
  // PORTUGAL (POR)
  // =========================================================================
  {
    id: 'por-salazar-estado-novo',
    countryId: 'por',
    name: 'Salazar: Kebijakan Negara Baru (Estado Novo)',
    originalName: 'Estado Novo Economic Discipline',
    iconType: 'politics',
    branch: 'Politik Kanan & Perdagangan Netral',
    days: 70,
    prerequisites: [],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      politicalPower: 140,
      stability: 15
    },
    pros: [
      '+140 PP dan +15% Stabilitas anggaran berimbang',
      'Mengeliminasi defisit anggaran dan inflasi pabrik',
      'Membuka monopoli ekspor Wolfram (Tungsten) Panas'
    ],
    cons: [
      'Penalti kecil pada kecepatan mobilisasi tenaga kerja tentara'
    ],
    keyEffectsSummary: 'Menerapkan kebijakan anggaran ketat Estado Novo dan stabilitas politik.',
    recommendedTiming: '1936',
    historicalContext: 'António de Oliveira Salazar memimpin Portugal dengan prinsip korporatis dan netralitas diplomasi yang lihai.'
  },
  {
    id: 'por-wolfram-monopoly',
    countryId: 'por',
    name: 'Monopoli Ekspor Wolfram (Tungsten War)',
    originalName: 'The Wolfram Concession War',
    iconType: 'industry',
    branch: 'Politik Kanan & Perdagangan Netral',
    days: 70,
    prerequisites: ['por-salazar-estado-novo'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      civFactories: 3
    },
    pros: [
      '+30 Pasokan Wolfram kualitas premium',
      '+3 Pabrik Sipil dari hasil penjualan logam mahal ke Sekutu dan Jerman',
      'Cadangan devisa emas nasional melesat naik'
    ],
    cons: [
      'Ditekan oleh kedua belah pihak yang bertikai di PD II'
    ],
    keyEffectsSummary: 'Menambah +30 Wolfram dan +3 Pabrik Sipil dari perdagangan netral.',
    recommendedTiming: '1938-1939',
    historicalContext: 'Portugal menjadi arena perebutan sengit pembelian tungsten antara agen intelijen Inggris dan Jerman.'
  },

  // =========================================================================
  // SWISS (SWI)
  // =========================================================================
  {
    id: 'swi-national-redoubt',
    countryId: 'swi',
    name: 'Rencana Benteng Nasional Alpen (National Redoubt)',
    originalName: 'The National Redoubt Strategy',
    iconType: 'military',
    branch: 'Pertahanan Alpen & Bank Sentral',
    days: 70,
    prerequisites: [],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      stability: 10,
      warSupport: 15
    },
    pros: [
      '+5 Benteng Pegunungan Alpen di terowongan Gotthard & St. Moritz',
      'Medan tempur Alpen mustahil ditembus oleh tank Jerman atau Italia',
      '+15% War Support kemandirian bangsa'
    ],
    cons: [
      'Meninggalkan pertahanan kota-kota dataran rendah Jenewa dan Zurich jika diserang'
    ],
    keyEffectsSummary: 'Membangun kubah benteng rahasia di jantung pegunungan Alpen (Level 5 Forts).',
    recommendedTiming: '1936-1938',
    historicalContext: 'Jenderal Henri Guisan merancang strategi untuk menarik seluruh tentara ke benteng gunung Alpen jika Jerman melancarkan Operasi Tannenbaum.'
  },

  // =========================================================================
  // AUSTRIA (AUS)
  // =========================================================================
  {
    id: 'aus-fatherland-front',
    countryId: 'aus',
    name: 'Pertahankan Kedaulatan: Tolak Anschluss',
    originalName: 'Preserve Austrian Sovereignty',
    iconType: 'politics',
    branch: 'Kemandirian Austria',
    days: 70,
    prerequisites: [],
    mutuallyExclusive: [],
    historical: false,
    statsDelta: {
      politicalPower: 120,
      stability: 10,
      warSupport: 15
    },
    pros: [
      '+120 PP dan +10% Stabilitas',
      'Membangun 2 Benteng perbatasan di Salzburg & Linz',
      'Peluang meminta jaminan kemerdekaan dari Kerajaan Italia atau Sekutu'
    ],
    cons: [
      'Memicu kemarahan Hitler dan risiko invasi militer Jerman'
    ],
    keyEffectsSummary: 'Menolak pencaplokan Jerman, mempertahankan kemerdekaan Austria.',
    recommendedTiming: '1936-1937',
    historicalContext: 'Kanselir Kurt Schuschnigg berupaya mengadakan referendum kemerdekaan sebelum diintimidasi oleh Berlin pada Maret 1938.'
  },
  {
    id: 'aus-alps-citadel',
    countryId: 'aus',
    name: 'Garis Benteng Alpen Kärnten & Linz',
    originalName: 'Alpine Fortifications of Linz and Kärnten',
    iconType: 'military',
    branch: 'Kemandirian Austria',
    days: 70,
    prerequisites: ['aus-fatherland-front'],
    mutuallyExclusive: [],
    historical: false,
    statsDelta: {
      warSupport: 15
    },
    pros: [
      '+4 Benteng Darat di perbatasan pegunungan Linz dan Kärnten',
      'Medan lembah Alpen memaksa tank musuh mengalami kemacetan parah',
      '+15% War Support mempertahankan tanah air'
    ],
    cons: [
      'Memerlukan waktu konstruksi 70 hari'
    ],
    keyEffectsSummary: 'Membangun benteng pertahanan alami di pegunungan Austria untuk menahan serbuan pasukan panzer.',
    recommendedTiming: '1937-1938',
    historicalContext: 'Strategi pertahanan darat pegunungan alternatif seandainya Austria memilih melawan invasi militer Jerman Reich.'
  },
  {
    id: 'aus-danube-confederation',
    countryId: 'aus',
    name: 'Restorasi Otto von Habsburg & Konfederasi Donau',
    originalName: 'Restore the Habsburg Monarchy',
    iconType: 'politics',
    branch: 'Kemandirian Austria',
    days: 70,
    prerequisites: ['aus-fatherland-front'],
    mutuallyExclusive: [],
    historical: false,
    statsDelta: {
      politicalPower: 150,
      stability: 15
    },
    pros: [
      '+150 Political Power dan +15% Stabilitas nasional',
      'Membuka opsi persekutuan restorasi monarki dengan Hungaria dan Cekoslowakia',
      'Mendapatkan legitimasi internasional dari negara-negara Katolik'
    ],
    cons: [
      'Ditentang keras oleh Jerman dan Uni Soviet'
    ],
    keyEffectsSummary: 'Mengembalikan takhta Dinasti Habsburg untuk memimpin konfederasi penyeimbang di Eropa Tengah.',
    recommendedTiming: '1938',
    historicalContext: 'Wacana pengembalian Putra Mahkota Otto von Habsburg untuk mencegah penyatuan Jerman-Austria (Anschluss).'
  },

  // =========================================================================
  // NORWEGIA (NOR)
  // =========================================================================
  {
    id: 'nor-heavy-water',
    countryId: 'nor',
    name: 'Pabrik Air Berat Vemork Rjukan (Norsk Hydro)',
    originalName: 'Vemork Heavy Water Facility',
    iconType: 'industry',
    branch: 'Industri Strategis & Sains',
    days: 70,
    prerequisites: [],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      civFactories: 2,
      researchSlots: 1,
      stability: 10
    },
    pros: [
      '+2 Pabrik Sipil berbasis pembangkit listrik tenaga air Rjukan',
      '+1 Slot Riset Fisika & Nuklir (Fasilitas produksi air berat deuterium terbesar dunia)',
      '+10% Stabilitas nasional'
    ],
    cons: [
      'Menjadi target nomor satu perebutan intelijen Sekutu dan Poros (Operasi Gunnerside)'
    ],
    keyEffectsSummary: 'Mengamankan pabrik air berat Norsk Hydro di Telemark yang sangat penting bagi perlombaan senjata atom.',
    recommendedTiming: '1936-1937',
    historicalContext: 'Pabrik Norsk Hydro di Vemork memproduksi air berat yang didambakan proyek bom atom Uranprojekt Jerman.'
  },
  {
    id: 'nor-merchant-fleet',
    countryId: 'nor',
    name: 'Nortraship: Mobilisasi Armada Dagang 1.000 Konvoi',
    originalName: 'Nortraship Merchant Fleet',
    iconType: 'navy',
    branch: 'Maritim & Konvoi Atlantik',
    days: 70,
    prerequisites: [],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      dockyards: 2,
      politicalPower: 100
    },
    pros: [
      '+50 Kapal Konvoi instan untuk memasok minyak dan gandum melintasi Samudra Atlantik',
      '+2 Galangan Kapal di Bergen dan Oslo',
      'Menyumbang devisa ekspor dan suplai vital bagi pertahanan Inggris Raya'
    ],
    cons: [
      'Rentan terhadap serangan kapal selam U-Boat Jerman di Atlantik Utara'
    ],
    keyEffectsSummary: 'Memobilisasi armada kapal dagang modern terbesar ke-4 di dunia untuk menjaga jalur pasokan maritim Sekutu.',
    recommendedTiming: '1938-1940',
    historicalContext: 'Nortraship mengoperasikan sekitar 1.000 kapal dagang dan 25.000 pelaut yang mengangkut sepertiga minyak ke Inggris selama perang.'
  },
  {
    id: 'nor-oskarborg-fortress',
    countryId: 'nor',
    name: 'Benteng Oscarsborg & Meriam Selat Drøbak',
    originalName: 'Oscarsborg Fortress Defenses',
    iconType: 'military',
    branch: 'Pertahanan Fjord & Pesisir',
    days: 70,
    prerequisites: ['nor-merchant-fleet'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      warSupport: 20
    },
    pros: [
      '+4 Benteng Pesisir di Selat Drøbak melindungi ibukota Oslo',
      'Baterai torpedo darat mampu menenggelamkan kapal penjelajah berat musuh (seperti kapal penjelajah Blücher)',
      '+20% War Support nasional'
    ],
    cons: [
      'Pertahanan terfokus di selat masuk selatan Oslofjord'
    ],
    keyEffectsSummary: 'Memperkuat meriam pantai Krupp 28cm di benteng Oscarsborg yang menunda invasi laut Jerman.',
    recommendedTiming: '1939-1940',
    historicalContext: 'Kolonel Birger Eriksen memberi perintah tembak yang menenggelamkan kapal Blücher pada 9 April 1940, menyelamatkan Raja Haakon VII.'
  },

  // =========================================================================
  // DENMARK (DEN)
  // =========================================================================
  {
    id: 'den-little-belt-bridge',
    countryId: 'den',
    name: 'Jembatan Sabuk Kecil (Lillebæltsbroen) & Rel Baltik',
    originalName: 'Little Belt Bridge Infrastructure',
    iconType: 'industry',
    branch: 'Infrastruktur & Transportasi',
    days: 70,
    prerequisites: [],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      civFactories: 2,
      stability: 10
    },
    pros: [
      '+2 Pabrik Sipil dan modernisasi jalur rel kereta antar-pulau Fyn dan Jutland',
      '+15% Kecepatan logistik suplai di daratan Denmark',
      '+10% Stabilitas domestik'
    ],
    cons: [
      'Menghubungkan langsung jalur invasi darat Wehrmacht dari selatan'
    ],
    keyEffectsSummary: 'Membangun jembatan modern Lillebæltsbroen untuk menyatukan jaringan logistik nasional.',
    recommendedTiming: '1936',
    historicalContext: 'Jembatan Lillebæltsbroen yang rampung tahun 1935 menjadi lambang modernisasi infrastruktur dan logistik Denmark.'
  },
  {
    id: 'den-agriculture-export',
    countryId: 'den',
    name: 'Koperasi Pertanian: Mentega & Pangan Skandinavia',
    originalName: 'Agricultural Cooperatives & Butter Export',
    iconType: 'industry',
    branch: 'Infrastruktur & Transportasi',
    days: 70,
    prerequisites: ['den-little-belt-bridge'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      civFactories: 1,
      politicalPower: 120
    },
    pros: [
      '+1 Pabrik Sipil dari surplus ekspor mentega Lurpak dan daging babi',
      '+120 Political Power untuk negosiasi perdagangan netral',
      'Mempertahankan pasokan kalori warga tetap tinggi selama krisis pangan Eropa'
    ],
    cons: [
      'Menjadi incaran blokade ekonomi negara agresor tetangga'
    ],
    keyEffectsSummary: 'Memanfaatkan sistem koperasi tani modern Denmark sebagai sumber devisa dan ketahanan pangan.',
    recommendedTiming: '1937',
    historicalContext: 'Denmark dijuluki sebagai "lumbung mentega Eropa" karena sistem pertanian dan peternakan modernnya yang efisien.'
  },
  {
    id: 'den-island-defense',
    countryId: 'den',
    name: 'Garnisun Selat Kattegat & Perahu Penyelamat Swedia',
    originalName: 'Kattegat Strait Patrol & Rescue Operations',
    iconType: 'military',
    branch: 'Pertahanan Selat & Perlawanan',
    days: 70,
    prerequisites: [],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      stability: 15,
      warSupport: 10,
      dockyards: 1
    },
    pros: [
      '+1 Galangan Kapal di Kopenhagen dan +3 Baterai Pertahanan Pantai di Selat Øresund',
      'Membuka jalur rahasia armada perahu nelayan mengevakuasi 99% populasi Yahudi Denmark ke Swedia secara heroik',
      '+15% Stabilitas nasional'
    ],
    cons: [
      'Tidak dapat menahan gempuran udara Luftwaffe Jerman dalam pertempuran terbuka'
    ],
    keyEffectsSummary: 'Mengorganisir armada maritim sipil dan benteng selat untuk operasi perlindungan warga.',
    recommendedTiming: '1938-1940',
    historicalContext: 'Oktober 1943, gerakan perlawanan dan nelayan Denmark berhasil menyeberangkan lebih dari 7.200 warga Yahudi ke Swedia yang netral.'
  },

  // =========================================================================
  // EKSPANSI TAMBAHAN UNTUK SWISS (SWI)
  // =========================================================================
  {
    id: 'swi-banking-neutrality',
    countryId: 'swi',
    name: 'Kerahasiaan Bank Swiss & Cadangan Emas Devisa',
    originalName: 'Swiss Banking Neutrality & Gold Reserves',
    iconType: 'industry',
    branch: 'Pertahanan & Netralitas Bersenjata',
    days: 70,
    prerequisites: ['swi-national-redoubt'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      civFactories: 2,
      politicalPower: 120
    },
    pros: [
      '+2 Pabrik Sipil devisa perbankan internasional di Zurich dan Jenewa',
      '+120 Political Power untuk manuver diplomasi independen',
      'Mata uang Franc Swiss menjadi aset safe-haven utama di benua Eropa'
    ],
    cons: [
      'Menerima tekanan moral dari negara-negara Sekutu'
    ],
    keyEffectsSummary: 'Mempertahankan sistem perbankan netral dan cadangan emas batangan internasional.',
    recommendedTiming: '1937-1939',
    historicalContext: 'Sistem perbankan Swiss dan stabilitas mata uangnya menjadikannya pusat kliring keuangan penting di tengah perang.'
  },
  {
    id: 'swi-militia-mobilization',
    countryId: 'swi',
    name: 'Sistem Milisi Setiap Warga Bersenjata',
    originalName: 'Armed Citizen Militia Mobilization',
    iconType: 'military',
    branch: 'Pertahanan & Netralitas Bersenjata',
    days: 70,
    prerequisites: ['swi-national-redoubt'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      manpowerBonus: '+80.000 Manpower',
      warSupport: 20
    },
    pros: [
      '+80.000 Manpower milisi pegunungan terlatih dengan senapan Schmidt-Rubin K31',
      '+20% War Support dan bonus pertahanan gerilya di terowongan pegunungan',
      'Jembatan dan terowongan rel dipasangi peledak siap hancur jika Jerman menyerbu'
    ],
    cons: [
      'Prajurit milisi tidak dirancang untuk operasi ofensif ke luar perbatasan'
    ],
    keyEffectsSummary: 'Menerapkan doktrin pertahanan rakyat semesta di mana setiap rumah warga menyimpan senjata dan amunisi.',
    recommendedTiming: '1939-1940',
    historicalContext: 'Swiss memobilisasi 430.000 prajurit milisi dalam waktu 48 jam pada September 1939 di bawah komando Jenderal Guisan.'
  },

  // =========================================================================
  // EKSPANSI TAMBAHAN BELGIA, YUNANI, BULGARIA, PORTUGAL
  // =========================================================================
  {
    id: 'bel-chasseurs-ardennais',
    countryId: 'bel',
    name: 'Batalion Elit Chasseurs Ardennais (Serigala Hutan)',
    originalName: 'Chasseurs Ardennais Elite Battalions',
    iconType: 'military',
    branch: 'Pertahanan Perbatasan & Netralitas',
    days: 70,
    prerequisites: ['bel-eben-emael'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      armyXP: 25,
      warSupport: 15
    },
    pros: [
      '+25 Army XP untuk merombak doktrin pertahanan hutan',
      '+20% Defense dan Attack infanteri di medan perbukitan dan hutan lebat Ardennes',
      'Membuka lencana kehormatan Babi Hutan (Sanglier des Ardennes)'
    ],
    cons: [
      'Kekuatan batalion terbatas tidak sebanding dengan korps panzer Wehrmacht yang membanjiri'
    ],
    keyEffectsSummary: 'Pasukan infanteri gunung elit Belgia yang bertempur gigih menahan gerak maju Divisi Panzer ke-7 Rommel.',
    recommendedTiming: '1939-1940',
    historicalContext: 'Chasseurs Ardennais terkenal karena kegigihannya di Bodange di mana satu kompi menahan seluruh korps panzer Jerman selama seharian.'
  },
  {
    id: 'gre-pindus-counteroffensive',
    countryId: 'gre',
    name: 'Serangan Balik Salju Gunung Pindus',
    originalName: 'Battle of Pindus Counter-Offensive',
    iconType: 'military',
    branch: 'Pertahanan Tanah Air & Kedaulatan',
    days: 70,
    prerequisites: ['gre-ochi-day'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      armyXP: 30,
      warSupport: 25
    },
    pros: [
      '+30 Army XP dan +25% War Support nasional',
      '+25% Combat Bonus di cuaca salju dan medan pegunungan Albania',
      'Mengusir Divisi Julia Alpini Italia kembali melintasi perbatasan dalam kemenangan darat pertama Sekutu'
    ],
    cons: [
      'Memicu intervensi langsung Adolf Hitler mengirim Wehrmacht ke Balkan (Operasi Marita)'
    ],
    keyEffectsSummary: 'Memukul mundur invasi Italia di pegunungan Pindus dan menduduki wilayah Epirus Utara.',
    recommendedTiming: 'November 1940',
    historicalContext: 'Kemenangan Yunani di Pindus merupakan kekalahan taktis pertama kekuatan Poros di daratan Eropa selama Perang Dunia II.'
  },
  {
    id: 'bul-axis-railway',
    countryId: 'bul',
    name: 'Jalur Kereta Orient Express & Koridor Laut Aegea',
    originalName: 'Trans-Balkan Railway & Aegean Access',
    iconType: 'industry',
    branch: 'Restorasi Teritorial & Diplomasi',
    days: 70,
    prerequisites: ['bul-dobrudja-reclaim'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      civFactories: 2,
      milFactories: 1
    },
    pros: [
      '+2 Pabrik Sipil dan +1 Pabrik Militer di Sofia dan Plovdiv',
      '+15% Throughput pasokan logistik kereta api di seluruh koridor Balkan',
      'Akses pelabuhan bebas di Thrace Barat menuju Laut Aegea'
    ],
    cons: [
      'Mengharuskan Bulgaria memberikan izin transit pasukan militer Jerman Reich'
    ],
    keyEffectsSummary: 'Menghubungkan jaringan rel kereta trans-Balkan dan membuka akses laut ke perairan Mediterania.',
    recommendedTiming: '1940-1941',
    historicalContext: 'Bulgaria bergabung dengan Pakta Tripartit pada Maret 1941 untuk mendapatkan akses ke Thrace dan Makedonia.'
  },
  {
    id: 'por-azores-airbase',
    countryId: 'por',
    name: 'Pangkalan Udara Lapangan Terbang Azores (Lajes Field)',
    originalName: 'Azores Airbase Agreement',
    iconType: 'navy',
    branch: 'Kebijakan Luar Negeri & Koloni',
    days: 70,
    prerequisites: ['por-wolfram-monopoly'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      politicalPower: 120,
      stability: 10
    },
    pros: [
      'Menyewakan pangkalan udara Azores kepada armada RAF Inggris dan US Navy',
      'Menutup celah udara Atlantik (Mid-Atlantic Air Gap) yang menjadi sarang U-Boat Jerman',
      '+120 Political Power dan jaminan kedaulatan atas koloni Angola dan Mozambik'
    ],
    cons: [
      'Memerlukan negosiasi diplomatik hati-hati agar tidak diserbu Poros'
    ],
    keyEffectsSummary: 'Menyediakan pangkalan patroli udara strategis di tengah Samudra Atlantik bagi pemburu kapal selam Sekutu.',
    recommendedTiming: '1942-1943',
    historicalContext: 'Perdana Menteri Salazar menyetujui pembukaan pangkalan udara di Azores pada 1943 berbasis Perjanjian Aliansi Anglo-Portugis 1373.'
  }
];

export const MINOR_EUROPEAN_PRESETS: FocusPresetPath[] = [
  {
    id: 'preset-swe-meta',
    countryId: 'swe',
    title: 'Meta Swedia: Harimau Skandinavia & Ekspor Kiruna',
    description: 'Amankan stabilitas politik dengan En Svensk Tiger, perluas tambang besi Kiruna, dan bangun meriam anti-udara Bofors 40mm.',
    type: 'meta_historical',
    focusIds: [
      'swe-en-svensk-tiger',
      'swe-kiruna-expansion',
      'swe-bofors-contracts'
    ]
  },
  {
    id: 'preset-nor-meta',
    countryId: 'nor',
    title: 'Meta Norwegia: Nortraship Konvoi & Sabotase Air Berat',
    description: 'Kendalikan armada dagang Nortraship 1.000 kapal, kuasai pabrik air berat Vemork, dan bentengi Oscarsborg.',
    type: 'meta_historical',
    focusIds: [
      'nor-heavy-water',
      'nor-merchant-fleet',
      'nor-oskarborg-fortress'
    ]
  },
  {
    id: 'preset-den-meta',
    countryId: 'den',
    title: 'Meta Denmark: Jembatan Lillebælt & Lumbung Pangan',
    description: 'Modernisasi transportasi lewat Jembatan Sabuk Kecil, maksimalkan devisa pangan mentega, dan amankan selat Kattegat.',
    type: 'meta_historical',
    focusIds: [
      'den-little-belt-bridge',
      'den-agriculture-export',
      'den-island-defense'
    ]
  },
  {
    id: 'preset-hol-meta',
    countryId: 'hol',
    title: 'Meta Belanda: Polder Zuiderzee & Logistik Pasifik',
    description: 'Bangun pabrik di lahan polder reklamasi Zuiderzee, amankan karet & minyak Hindia Belanda, serta genangi kanal air jika diserang.',
    type: 'meta_historical',
    focusIds: [
      'hol-zuiderzee-works',
      'hol-gateway-indies',
      'hol-inundate-water-line'
    ]
  },
  {
    id: 'preset-bel-meta',
    countryId: 'bel',
    title: 'Meta Belgia: Benteng Eben-Emael & Chasseurs Ardennais',
    description: 'Tingkatkan benteng Eben-Emael, kerahkan Chasseurs Ardennais di hutan belantara, dan manfaatkan uranium Kongo.',
    type: 'meta_historical',
    focusIds: [
      'bel-eben-emael',
      'bel-congo-uranium',
      'bel-chasseurs-ardennais'
    ]
  },
  {
    id: 'preset-gre-meta',
    countryId: 'gre',
    title: 'Meta Yunani: Garis Metaxas & Serangan Balik Pindus',
    description: 'Bentengi tebing Makedonia dengan Garis Metaxas, serukan penolakan Hari Ochi, dan pukul mundur musuh di salju Pindus.',
    type: 'meta_historical',
    focusIds: [
      'gre-metaxas-line',
      'gre-ochi-day',
      'gre-pindus-counteroffensive'
    ]
  },
  {
    id: 'preset-bul-meta',
    countryId: 'bul',
    title: 'Meta Bulgaria: Monarki Tsar Boris & Rel Orient Express',
    description: 'Konsolidasi kekuasaan Tsar Boris III, rebut kembali Dobrudja Selatan, dan buka koridor rel trans-Balkan.',
    type: 'meta_historical',
    focusIds: [
      'bul-tsar-boris',
      'bul-dobrudja-reclaim',
      'bul-axis-railway'
    ]
  },
  {
    id: 'preset-por-meta',
    countryId: 'por',
    title: 'Meta Portugal: Wolfram Monopoly & Pangkalan Azores',
    description: 'Jaga neraca anggaran Estado Novo Salazar, monopoli ekspor tungsten mahal, dan buka lapangan terbang Azores.',
    type: 'meta_historical',
    focusIds: [
      'por-salazar-estado-novo',
      'por-wolfram-monopoly',
      'por-azores-airbase'
    ]
  },
  {
    id: 'preset-swi-meta',
    countryId: 'swi',
    title: 'Meta Swiss: Benteng Redoubt & Bank Kerahasiaan',
    description: 'Bangun kubah benteng bawah tanah Level 5 di Alpen, kuasai cadangan devisa emas, dan mobilisasi milisi warga.',
    type: 'meta_historical',
    focusIds: [
      'swi-national-redoubt',
      'swi-banking-neutrality',
      'swi-militia-mobilization'
    ]
  },
  {
    id: 'preset-aus-meta',
    countryId: 'aus',
    title: 'Meta Austria: Tolak Anschluss & Benteng Alpen',
    description: 'Tolak pencaplokan Jerman, bangun benteng pertahanan Alpen Linz-Salzburg, dan wujudkan konfederasi monarki Habsburg.',
    type: 'alternative_history',
    focusIds: [
      'aus-fatherland-front',
      'aus-alps-citadel',
      'aus-danube-confederation'
    ]
  }
];
