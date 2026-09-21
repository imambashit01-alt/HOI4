import { NationalFocus, FocusPresetPath } from '../types';
import {
  MINOR_EUROPEAN_COUNTRIES_META,
  MINOR_EUROPEAN_FOCUSES_DATA,
  MINOR_EUROPEAN_PRESETS
} from './minorEuropeanFocusesData';
import {
  EXPANDED_MAJOR_FOCUSES_DATA,
  EXPANDED_MAJOR_PRESETS
} from './expandedMajorFocusesData';
import {
  REGIONAL_POWERS_FOCUSES_DATA,
  REGIONAL_POWERS_PRESETS
} from './regionalPowersFocusesData';

export const MAJOR_COUNTRIES_FOCUS = [
  { id: 'ger', tag: 'GER', name: 'Jerman (German Reich)', flagSymbol: '✠', flagColors: ['#1e293b', '#b91c1c'] },
  { id: 'sov', tag: 'SOV', name: 'Uni Soviet (USSR)', flagSymbol: '☭', flagColors: ['#991b1b', '#d97706'] },
  { id: 'usa', tag: 'USA', name: 'Amerika Serikat (USA)', flagSymbol: '★', flagColors: ['#1e3a8a', '#dc2626'] },
  { id: 'eng', tag: 'ENG', name: 'Inggris Raya (United Kingdom)', flagSymbol: '♚', flagColors: ['#1e3a8a', '#991b1b'] },
  { id: 'jap', tag: 'JAP', name: 'Kekaisaran Jepang (Japan)', flagSymbol: '☼', flagColors: ['#991b1b', '#f8fafc'] },
  { id: 'ita', tag: 'ITA', name: 'Italia (Kingdom of Italy)', flagSymbol: '⚜', flagColors: ['#15803d', '#b91c1c'] },
  { id: 'fra', tag: 'FRA', name: 'Prancis (French Republic)', flagSymbol: '⚑', flagColors: ['#1d4ed8', '#dc2626'] },
  { id: 'chi', tag: 'CHI', name: 'Tiongkok Nasionalis (ROC)', flagSymbol: '☀', flagColors: ['#1d4ed8', '#ffffff'] },
  { id: 'pol', tag: 'POL', name: 'Polandia (Poland)', flagSymbol: '🦅', flagColors: ['#dc2626', '#f8fafc'] },
  { id: 'can', tag: 'CAN', name: 'Dominion Kanada (Canada)', flagSymbol: '🍁', flagColors: ['#dc2626', '#ffffff'] },
  { id: 'raj', tag: 'RAJ', name: 'Raj Britania (India)', flagSymbol: '☸', flagColors: ['#ea580c', '#15803d'] },
  { id: 'ast', tag: 'AST', name: 'Persemakmuran Australia', flagSymbol: '🦘', flagColors: ['#1e3a8a', '#dc2626'] },
  { id: 'rom', tag: 'ROM', name: 'Kerajaan Rumania (Romania)', flagSymbol: '👑', flagColors: ['#1d4ed8', '#eab308'] },
  { id: 'yug', tag: 'YUG', name: 'Kerajaan Yugoslavia', flagSymbol: '⚔', flagColors: ['#2563eb', '#dc2626'] },
  { id: 'hun', tag: 'HUN', name: 'Kerajaan Hungaria (Hungary)', flagSymbol: '🛡', flagColors: ['#15803d', '#dc2626'] },
  { id: 'cze', tag: 'CZE', name: 'Republik Cekoslowakia', flagSymbol: '🏰', flagColors: ['#2563eb', '#dc2626'] },
  { id: 'tur', tag: 'TUR', name: 'Republik Turki (Turkey)', flagSymbol: '☪', flagColors: ['#dc2626', '#ffffff'] },
  { id: 'spa', tag: 'SPA', name: 'Spanyol (Spain)', flagSymbol: '🐂', flagColors: ['#dc2626', '#eab308'] },
  { id: 'fin', tag: 'FIN', name: 'Republik Finlandia (Finland)', flagSymbol: '❄', flagColors: ['#1d4ed8', '#f8fafc'] },
  { id: 'man', tag: 'MAN', name: 'Kekaisaran Manchukuo', flagSymbol: '🐉', flagColors: ['#eab308', '#dc2626'] },
  ...MINOR_EUROPEAN_COUNTRIES_META
];

const BASE_NATIONAL_FOCUSES_DATA: NationalFocus[] = [
  // =========================================================================
  // 1. JERMAN (GERMAN REICH - GER)
  // =========================================================================
  {
    id: 'ger-rhineland',
    countryId: 'ger',
    name: 'Rhineland (Remiliterisasi Rhineland)',
    originalName: 'Rhineland',
    iconType: 'expansion',
    branch: 'Politik Fasis & Ekspansi',
    days: 70,
    prerequisites: [],
    mutuallyExclusive: ['ger-oppose-hitler'],
    historical: true,
    statsDelta: {
      politicalPower: 120,
      worldTension: 5,
      armyXP: 5,
      stability: 5
    },
    pros: [
      '+120 Political Power instan (bisa langsung rekrut Martin Bormann / Free Trade)',
      'Menghapus zona demiliterisasi di perbatasan Prancis & Belgia',
      '+5 Army XP awal untuk modifikasi template divisi awal',
      'Membuka akses ke seluruh cabang ekspansi Anschluss, Sudetenland, & Danzig'
    ],
    cons: [
      '+5% World Tension (Sekutu mulai waspada)',
      'Mengunci selamanya cabang alternatif "Oppose Hitler" (Kekaisaran Kaiser / Demokrat)',
      'Risiko kecil Prancis intervensi jika pemain Prancis adalah manusia di Multiplayer'
    ],
    keyEffectsSummary: 'Menghapus demiliterisasi Rhineland, memberi +120 PP dan +5 WT.',
    recommendedTiming: 'Maret 1936 (Fokus Pertama Game)',
    historicalContext: 'Maret 1936, Hitler mengirim Wehrmacht masuk ke wilayah Rhineland yang didemiliterisasi oleh Perjanjian Versailles.'
  },
  {
    id: 'ger-oppose-hitler',
    countryId: 'ger',
    name: 'Oppose Hitler (Kudeta Militer Wehrmacht)',
    originalName: 'Oppose Hitler',
    iconType: 'politics',
    branch: 'Politik Alternatif (Monarki / Demokrasi)',
    days: 70,
    prerequisites: [],
    mutuallyExclusive: ['ger-rhineland'],
    historical: false,
    statsDelta: {
      politicalPower: -50,
      stability: -20,
      warSupport: 15,
      worldTension: 2
    },
    pros: [
      'Memicu perang saudara melawan NSDAP untuk mengembalikan Kekaisaran Jerman (Kaiser) atau Demokrasi',
      'Mendapatkan jenderal terbaik Von Mackensen dan merekrut kembali Kaiser Wilhelm II / Wilhelm III',
      'Membuka aliansi "Central Powers" bersama Austria-Hungaria atau "Alliance with the Shade" dengan Inggris',
      'Menghilangkan stigma fasis dan permusuhan langsung dengan negara-negara demokrasi Barat'
    ],
    cons: [
      'Perang Saudara Jerman (Civil War) meletus: infrastruktur dan pabrik hancur sebagian',
      'Kehilangan Adolf Hitler, Martin Bormann, dan menteri fasis berefek ekonomi kuat',
      'Mengunci fokus ekspansi cepat Anschluss dan Sudetenland',
      'Kehilangan tempo ekspansi militer 1936-1937'
    ],
    keyEffectsSummary: 'Memicu perang saudara Wehrmacht vs Fasis. Mengunci selamanya cabang Rhineland.',
    recommendedTiming: 'Maret 1936 jika berniat bermain Monarkis / Demokrat',
    historicalContext: 'Plot militer konservatif Wehrmacht pimpinan Ludwig Beck & Von Mackensen untuk menggulingkan rezim Nazi.'
  },
  {
    id: 'ger-four-year-plan',
    countryId: 'ger',
    name: 'Four Year Plan (Rencana 4 Tahun Industri)',
    originalName: 'Four Year Plan',
    iconType: 'industry',
    branch: 'Ekonomi & Industri',
    days: 70,
    prerequisites: ['ger-rhineland'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      politicalPower: 0,
      civFactories: 0,
      stability: 0
    },
    pros: [
      '2x 100% Research Bonus untuk riset Industri (Basic Machine Tools / Construction)',
      'Membuka Hjalmar Schacht sebagai Menteri Ekonomi (+10% Kecepatan Konstruksi Civs)',
      'Prasyarat wajib menuju Autarky dan Hermann Göring-Werke'
    ],
    cons: [
      'Tidak memberikan pabrik instan di awal (hanya riset speed dan pembuka jalur)',
      'Memerlukan alokasi slot riset untuk memaksimalkan bonus 100%'
    ],
    keyEffectsSummary: 'Memberi 2x 100% bonus riset industri dan membuka Hermann Göring-Werke.',
    recommendedTiming: 'Mei 1936 (Fokus Kedua)',
    historicalContext: 'Rencana ekonomi yang dipimpin Hermann Göring untuk mencapai kemandirian industri perang Jerman dalam 4 tahun.'
  },
  {
    id: 'ger-autarky',
    countryId: 'ger',
    name: 'Autarky (Kemandirian Sumber Daya & Pabrik)',
    originalName: 'Autarky',
    iconType: 'industry',
    branch: 'Ekonomi & Industri',
    days: 70,
    prerequisites: ['ger-four-year-plan'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      civFactories: 0,
      stability: 0
    },
    pros: [
      'Menaikkan Construction Speed untuk Civilian Factory, Infrastructure, dan Synthetic Refinery hingga +10%',
      '3x 100% Research Bonus untuk teknologi Industri / Resource Extraction',
      'Mempersiapkan Jerman memproduksi Karet & Minyak sintetis sendiri saat blokade laut Sekutu'
    ],
    cons: [
      'Menghabiskan 70 hari waktu fokus tanpa tambahan pabrik fisik langsung di peta'
    ],
    keyEffectsSummary: 'Memberikan buff kecepatan konstruksi sipil dan riset ekstraksi sumber daya.',
    recommendedTiming: 'Juli 1936 (Fokus Ketiga)',
    historicalContext: 'Doktrin ekonomi autarki Jerman untuk bertahan tanpa impor dari luar negeri.'
  },
  {
    id: 'ger-goring-werke',
    countryId: 'ger',
    name: 'Hermann Göring-Werke (Pabrik Sipil Gratis)',
    originalName: 'Hermann Göring-Werke',
    iconType: 'industry',
    branch: 'Ekonomi & Industri',
    days: 70,
    prerequisites: ['ger-autarky'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      civFactories: 2,
      stability: 0
    },
    pros: [
      '+2 Civilian Factories permanen langsung dibangun di Hannover & Thüringen',
      'Menambah kapasitas total pabrik sipil untuk mempercepat konstruksi pabrik berikutnya',
      'Membuka akses ke KdF-Wagen (+2 Civs tambahan)'
    ],
    cons: [
      'Pabrik dibangun di wilayah tengah yang rentan bom strategis Sekutu jika garis udara jebol'
    ],
    keyEffectsSummary: '+2 Pabrik Sipil gratis langsung aktif di Hannover & Thüringen.',
    recommendedTiming: 'Oktober 1936 (Fokus Keempat)',
    historicalContext: 'Konglomerat industri peleburan baja milik negara Jerman di Salzgitter.'
  },
  {
    id: 'ger-kdf-wagen',
    countryId: 'ger',
    name: 'KdF-Wagen (Pabrik Mobil Rakyat & Sipil)',
    originalName: 'KdF-Wagen',
    iconType: 'industry',
    branch: 'Ekonomi & Industri',
    days: 70,
    prerequisites: ['ger-goring-werke'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      civFactories: 2,
      stability: 5
    },
    pros: [
      '+2 Civilian Factories gratis tambahan di peta',
      '+5% Stabilitas Nasional (moral rakyat meningkat)',
      'Prasyarat mutlak menuju "Extra Research Slot" (Slot Riset Ke-5 Jerman)'
    ],
    cons: [
      'Menunda fokus militer langsung ke tank/infanteri hingga akhir 1936'
    ],
    keyEffectsSummary: '+2 Pabrik Sipil gratis dan +5% Stabilitas. Syarat menuju Slot Riset ke-5.',
    recommendedTiming: 'Desember 1936 (Fokus Kelima)',
    historicalContext: 'Program mobil rakyat (Volkswagen Beetle) bersubsidi untuk masyarakat Jerman.'
  },
  {
    id: 'ger-extra-tech-slot',
    countryId: 'ger',
    name: 'Extra Research Slot (Slot Riset Ke-5 Jerman)',
    originalName: 'Extra Research Slot',
    iconType: 'research',
    branch: 'Ekonomi & Industri',
    days: 70,
    prerequisites: ['ger-kdf-wagen'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      researchSlots: 1
    },
    pros: [
      '+1 Slot Riset Permanen (Total menjadi 5 Slot Riset)',
      'Mempercepat riset Medium Tank 1939, Pesawat Tempur Fighter II, dan Doktrin Darat secara simultan',
      'Investasi teknologi jangka panjang terbaik di game'
    ],
    cons: [
      'Memerlukan prasyarat 4 fokus industri sebelumnya (total 280 hari)'
    ],
    keyEffectsSummary: '+1 Slot Riset Permanen (Jerman mencapai 5 Research Slot di awal 1937).',
    recommendedTiming: 'Februari 1937 (Fokus Keenam - Wajib Rush)',
    historicalContext: 'Perluasan akademi riset militer dan teknologi tinggi di Berlin, Göttingen, dan Munich.'
  },
  {
    id: 'ger-anschluss',
    countryId: 'ger',
    name: 'Anschluss (Pencaplokan Damai Austria)',
    originalName: 'Anschluss',
    iconType: 'expansion',
    branch: 'Politik Fasis & Ekspansi',
    days: 70,
    prerequisites: ['ger-rhineland'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      politicalPower: 75,
      civFactories: 4,
      milFactories: 3,
      worldTension: 10,
      stability: 10,
      warSupport: 10,
      manpowerBonus: '+150.000 Manpower & 7 Divisi Tentara Austria'
    },
    annexationOrClaim: 'Anekasasi Austria (Wilayah Core Jerman)',
    pros: [
      'Mencaplok seluruh Austria secara damai tanpa setetes darah pun',
      '+4 Pabrik Sipil & +3 Pabrik Militer Austria langsung menjadi milik Jerman',
      'Seluruh wilayah Austria menjadi Core Territory (100% Manpower & Pabrik penuh)',
      '+150.000 Manpower instan dan mewarisi seluruh divisi tentara Austria',
      '+10% Stabilitas dan +10% War Support'
    ],
    cons: [
      'Memerlukan syarat: Minimal 550.000 Manpower aktif di lapangan (deploy infanteri sebelum klik)',
      '+10% World Tension (Sekutu mulai mempercepat rearmament militer mereka)'
    ],
    keyEffectsSummary: 'Aneksasi Austria damai, +4 Civs, +3 Mils, +150k Manpower, wilayah jadi core penuh.',
    recommendedTiming: 'Maret 1938 (Setelah 550k prajurit di lapangan)',
    historicalContext: '12 Maret 1938, Wehrmacht melintasi perbatasan Austria disambut sorak penduduk Wina.'
  },
  {
    id: 'ger-demand-sudetenland',
    countryId: 'ger',
    name: 'Demand Sudetenland (Tuntutan Sudetenland Ceko)',
    originalName: 'Demand Sudetenland',
    iconType: 'expansion',
    branch: 'Politik Fasis & Ekspansi',
    days: 70,
    prerequisites: ['ger-anschluss'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      politicalPower: 50,
      civFactories: 2,
      milFactories: 2,
      worldTension: 7,
      stability: 5
    },
    annexationOrClaim: 'Sudetenland (Benteng Cekoslowakia runtuh)',
    pros: [
      'Memaksa Cekoslowakia menyerahkan Sudetenland via Perjanjian Munich (Sekutu menolak membela Ceko)',
      'Menghancurkan seluruh benteng perbatasan Cekoslowakia (Fortress Level 7 Ceko dinonaktifkan)',
      '+2 Pabrik Sipil dan +2 Pabrik Militer tambahan',
      'Membuka jalan empuk untuk menelan sisa Cekoslowakia tanpa perang'
    ],
    cons: [
      'Syarat: Minimal 750.000 Manpower aktif di divisi darat',
      '+7% World Tension',
      'Inggris dan Prancis mulai menandatangani aliansi jaminan perang'
    ],
    keyEffectsSummary: 'Cekoslowakia menyerahkan Sudetenland; benteng batas mereka hilang tanpa perang.',
    recommendedTiming: 'September 1938 (Pasca Konferensi Munich)',
    historicalContext: 'Konferensi Munich 1938 antara Chamberlain, Daladier, Mussolini, dan Hitler.'
  },
  {
    id: 'ger-fate-of-czechoslovakia',
    countryId: 'ger',
    name: 'Fate of Czechoslovakia (Bagi Habis Cekoslowakia)',
    originalName: 'Fate of Czechoslovakia',
    iconType: 'expansion',
    branch: 'Politik Fasis & Ekspansi',
    days: 70,
    prerequisites: ['ger-demand-sudetenland'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      politicalPower: 50,
      civFactories: 4,
      milFactories: 5,
      worldTension: 10,
      stability: 5
    },
    annexationOrClaim: 'Bohemia-Moravia (Protektorat Jerman) & Boneka Slowakia',
    pros: [
      'Menelan Bohemia & Moravia langsung ke Jerman: +4 Civs, +5 Mils, stok senjata Ceko melimpah',
      'Mendapatkan boneka Slowakia sebagai pelindung sayap selatan Polandia',
      'Pabrik persenjataan Škoda Works yang legendaris menjadi milik Jerman'
    ],
    cons: [
      '+10% World Tension',
      'Inggris menghentikan kebijakan politik damai (Appeasement) dan mulai menjamin kemerdekaan Polandia'
    ],
    keyEffectsSummary: 'Aneksasi Bohemia-Moravia, bentuk boneka Slowakia, raih 9+ pabrik dan senjata gratis.',
    recommendedTiming: 'Maret 1939',
    historicalContext: 'Maret 1939, Hitler menduduki Praha melanggar kesepakatan Munich.'
  },
  {
    id: 'ger-molotov-ribbentrop',
    countryId: 'ger',
    name: 'Molotov-Ribbentrop Pact (Pakta Non-Agresi Soviet)',
    originalName: 'Molotov-Ribbentrop Pact',
    iconType: 'expansion',
    branch: 'Politik Fasis & Ekspansi',
    days: 70,
    prerequisites: ['ger-rhineland'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      politicalPower: 50,
      worldTension: 5,
      stability: 5
    },
    pros: [
      'Pakta Non-Agresi dengan Uni Soviet selama perang melawan Polandia, Prancis, dan Inggris berlangsung',
      'Mencegah Jerman terjebak dalam perang dua front mematikan di 1939-1940',
      'Membagi wilayah Polandia dan negara Baltik dengan Uni Soviet secara diplomatik',
      'Perdagangan sumber daya minyak dan gandum dari Soviet mengalir lancar'
    ],
    cons: [
      'Menyerahkan Polandia Timur, Bessarabia, dan negara Baltik ke dalam pengaruh Soviet',
      'Hanya menunda perang Soviet hingga musim panas 1941'
    ],
    keyEffectsSummary: 'Pakta Non-Agresi dengan Uni Soviet; mengamankan front timur saat menyerang Prancis.',
    recommendedTiming: 'Juli - Agustus 1939 (Tepat sebelum serang Polandia)',
    historicalContext: 'Pakta non-agresi Moskow 23 Agustus 1939 antara Joachim von Ribbentrop dan Vyacheslav Molotov.'
  },
  {
    id: 'ger-danzig-or-war',
    countryId: 'ger',
    name: 'Danzig or War (Pecah Perang Dunia II)',
    originalName: 'Danzig or War',
    iconType: 'military',
    branch: 'Politik Fasis & Ekspansi',
    days: 70,
    prerequisites: ['ger-fate-of-czechoslovakia'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      politicalPower: 25,
      worldTension: 25,
      warSupport: 15
    },
    annexationOrClaim: 'War Goal (Taklukkan Polandia & Rebut Danzig)',
    pros: [
      'Memberikan War Goal invasi langsung ke Polandia',
      '+15% War Support instan (memungkinkan undang-undang ekonomi Total Mobilization / War Economy)',
      'Menghubungkan kembali Prusia Timur dengan daratan utama Jerman setelah Polandia ditaklukkan'
    ],
    cons: [
      'Memicu perang resmi melawan Aliansi Sekutu (Inggris dan Prancis bergabung)',
      '+25% World Tension masif (seluruh dunia masuk ke status waspada perang penuh)'
    ],
    keyEffectsSummary: 'Deklarasi perang terhadap Polandia; memicu Perang Dunia II melawan Inggris & Prancis.',
    recommendedTiming: 'Agustus - September 1939',
    historicalContext: '1 September 1939, Wehrmacht menginvasi Polandia memicu PD II di Eropa.'
  },
  {
    id: 'ger-around-maginot',
    countryId: 'ger',
    name: 'Around Maginot (Invasi Kilat Belanda & Belgia)',
    originalName: 'Around Maginot',
    iconType: 'military',
    branch: 'Militer & Angkatan Darat',
    days: 28,
    prerequisites: ['ger-danzig-or-war'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      worldTension: 10,
      warSupport: 10
    },
    annexationOrClaim: 'War Goal: Belanda, Belgia, Luksemburg',
    pros: [
      'Hanya butuh 28 hari pengerjaan (fokus kilat)',
      'Memberikan War Goal langsung ke Belgia, Belanda, dan Luksemburg',
      'Mengitari benteng Garis Maginot Prancis yang tebal untuk menusuk Paris via dataran rendah datar'
    ],
    cons: [
      'Harus siap menyerang dalam tempo cepat sebelum tentara Prancis memperkuat perbatasan Belgia',
      'Menambah 3 negara baru ke dalam aliansi Sekutu'
    ],
    keyEffectsSummary: 'War Goal instan ke Belanda, Belgia, dan Luksemburg dalam 28 hari untuk tembus ke Paris.',
    recommendedTiming: 'Musim Semi 1940 (Setelah Polandia menyerah)',
    historicalContext: 'Operasi Fall Gelb Mei 1940 mengitari Maginot Line melalui Hutan Ardennes.'
  },
  {
    id: 'ger-operation-barbarossa',
    countryId: 'ger',
    name: 'Operation Barbarossa (Invasi ke Uni Soviet)',
    originalName: 'Operation Barbarossa',
    iconType: 'military',
    branch: 'Militer & Angkatan Darat',
    days: 70,
    prerequisites: ['ger-danzig-or-war'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      warSupport: 15,
      armyXP: 25,
      worldTension: 15
    },
    annexationOrClaim: 'War Goal: Uni Soviet',
    pros: [
      'Memberikan War Goal invasi ke seluruh Uni Soviet',
      'Buff serangan terhadap Uni Soviet selama 180 hari (+15% Attack)',
      '+25 Army XP untuk menyempurnakan doktrin perang lapis baja Blitzkrieg'
    ],
    cons: [
      'Membuka front perang darat terbesar dalam sejarah umat manusia (ribuan kilometer)',
      'Bahaya atrisi musim dingin dan lumpur rawa Soviet jika perang berlarut-larut hingga 1942',
      'Memerlukan minimal 120-150 divisi siap tempur dan logistik kereta api yang kokoh'
    ],
    keyEffectsSummary: 'War Goal ke Uni Soviet dengan buff ofensif 180 hari untuk menduduki Moskow.',
    recommendedTiming: 'Mei - Juni 1941 (Hindari menyerang di musim hujan/lumpur)',
    historicalContext: '22 Juni 1941, Jerman melancarkan Operasi Barbarossa dengan 3 juta tentara ke Soviet.'
  },

  // =========================================================================
  // 2. UNI SOVIET (USSR - SOV)
  // =========================================================================
  {
    id: 'sov-path-marxism',
    countryId: 'sov',
    name: 'The Path of Marxism-Leninism',
    originalName: 'The Path of Marxism-Leninism',
    iconType: 'politics',
    branch: 'Politik & Ideologi',
    days: 70,
    prerequisites: [],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      politicalPower: 120,
      stability: 5
    },
    pros: [
      '+120 Political Power awal untuk merekrut menteri industri dan undang-undang',
      'Membuka cabang ideologi Stalinis (The Center) maupun oposisi',
      '+5% Stabilitas Nasional awal'
    ],
    cons: [
      'Mengaktifkan mekanik Stalin Paranoia meter (harus dikelola agar jenderal tidak dibunuh acak)'
    ],
    keyEffectsSummary: 'Fokus politik pembuka Uni Soviet; memberi +120 PP dan membuka cabang kepemimpinan.',
    recommendedTiming: 'Januari 1936 (Fokus Pertama)',
    historicalContext: 'Konsolidasi ideologi Marxisme-Leninisme di bawah kepemimpinan Partai Komunis Uni Soviet.'
  },
  {
    id: 'sov-the-center',
    countryId: 'sov',
    name: 'The Center (Faksi Stalin & Agitprop)',
    originalName: 'The Center',
    iconType: 'politics',
    branch: 'Politik Stalinis',
    days: 70,
    prerequisites: ['sov-path-marxism'],
    mutuallyExclusive: ['sov-left-opposition', 'sov-right-opposition'],
    historical: true,
    statsDelta: {
      politicalPower: 75,
      stability: 5
    },
    pros: [
      'Mempertahankan Iosif Stalin dengan buff industri dan kontrol total politik',
      'Membuka sistem propaganda Agitprop (poster propaganda dengan buff tempur/produksi masif)',
      'Jalur paling stabil dan teruji untuk mengalahkan invasi Jerman di 1941'
    ],
    cons: [
      'Wajib menjalani The Great Purge untuk membersihkan paranoia',
      'Mengunci faksi Trotsky (Revolusi Permanen) dan faksi Bukharin (NEP)'
    ],
    keyEffectsSummary: 'Memilih kepemimpinan Stalin, membuka poster Agitprop, prasyarat Five Year Plan.',
    recommendedTiming: 'Maret 1936 (Fokus Kedua)',
    historicalContext: 'Faksi Stalinis memegang kendali penuh Politbiro Soviet melawan oposisi kiri dan kanan.'
  },
  {
    id: 'sov-left-opposition',
    countryId: 'sov',
    name: 'Left Opposition (Leon Trotsky & Revolusi Permanen)',
    originalName: 'Left Opposition',
    iconType: 'politics',
    branch: 'Politik Alternatif',
    days: 70,
    prerequisites: ['sov-path-marxism'],
    mutuallyExclusive: ['sov-the-center', 'sov-right-opposition'],
    historical: false,
    statsDelta: {
      stability: -25,
      warSupport: 20,
      worldTension: 5
    },
    pros: [
      'Membawa pulang Leon Trotsky dari pengasingan Meksiko untuk memimpin Uni Soviet',
      'Buff "Permanent Revolution": Mengurangi drastis justifikasi perang dan mempercepat kudeta komunis dunia',
      'Menyelamatkan komandan brilian Mikhail Tukhachevsky dari eksekusi mati'
    ],
    cons: [
      'Perang Saudara Soviet Kedua meletus dengan kehancuran industri masif',
      'Penalti stabilitas parah dan kerentanan diserang Jerman selagi internal belum pulih'
    ],
    keyEffectsSummary: 'Trotsky kembali, perang saudara Soviet kedua, doktrin Revolusi Permanen dunia aktif.',
    recommendedTiming: '1936 jika berniat bermain jalur Trotsky',
    historicalContext: 'Oposisi Kiri yang dipimpin Leon Trotsky menentang konsep "Sosialisme di Satu Negara".'
  },
  {
    id: 'sov-heavy-industry',
    countryId: 'sov',
    name: 'Heavy Industry (Industri Berat Ural & Donbas)',
    originalName: 'Heavy Industry',
    iconType: 'industry',
    branch: 'Ekonomi & Industri',
    days: 70,
    prerequisites: ['sov-the-center'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      civFactories: 2,
      milFactories: 2
    },
    pros: [
      '+2 Pabrik Sipil & +2 Pabrik Militer langsung di wilayah pedalaman aman',
      'Membuka keputusan relokasi industri ke Pegunungan Ural',
      'Prasyarat menuju Third Five-Year Plan dan Slot Riset'
    ],
    cons: [
      'Menghabiskan waktu fokus di saat Paranoia Stalin terus merayap naik'
    ],
    keyEffectsSummary: '+2 Civs dan +2 Mils di pedalaman; membuka industrialisasi Soviet.',
    recommendedTiming: 'Mei 1936',
    historicalContext: 'Pembangunan pabrik peleburan baja raksasa di Magnitogorsk dan cekungan Donbas.'
  },
  {
    id: 'sov-the-great-purge',
    countryId: 'sov',
    name: 'The Great Purge (Pembersihan Militer Besar-besaran)',
    originalName: 'The Great Purge / The Zinovyevite Terrorist Center',
    iconType: 'politics',
    branch: 'Politik Stalinis',
    days: 70,
    prerequisites: ['sov-the-center'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      politicalPower: 50,
      stability: -10,
      warSupport: -10
    },
    pros: [
      'Menghapus ancaman kudeta internal dan menghentikan Paranoia Stalin secara permanen',
      'Menghilangkan risiko jenderal memberontak saat perang melawan Poros meletus'
    ],
    cons: [
      'Debuff fatal "Officers Purged": -20% Organization divisi militer, -50% Reinforce Rate',
      'Kehilangan sejumlah marsekal dan jenderal berbakat',
      'Membutuhkan fokus "Lessons of War" untuk menghapus penalti mematikan ini'
    ],
    keyEffectsSummary: 'Membersihkan Paranoia Stalin permanen, namun memberikan debuff militer berat (-20% Org).',
    recommendedTiming: 'Selesaikan sebelum akhir 1937 / awal 1938',
    historicalContext: 'Pembersihan besar-besaran terhadap perwira Tentara Merah dan anggota Politbiro (1936-1938).'
  },
  {
    id: 'sov-lessons-of-war',
    countryId: 'sov',
    name: 'Lessons of War (Pelajaran Perang & Hapus Debuff Purge)',
    originalName: 'Lessons of War',
    iconType: 'military',
    branch: 'Militer & Angkatan Darat',
    days: 70,
    prerequisites: ['sov-the-great-purge'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      armyXP: 50,
      warSupport: 10,
      researchSlots: 1
    },
    pros: [
      'MENGHAPUS TOTAL debuff "Officers Purged" yang melumpuhkan tentara Soviet',
      '+1 Slot Riset Permanen (Tambahan Slot Riset Ke-5 Soviet)',
      '+50 Army XP untuk doktrin Deep Battle / Mass Assault',
      'Mengembalikan organisasi tempur penuh Tentara Merah sebelum invasi Jerman 1941'
    ],
    cons: [
      'Hanya bisa diambil setelah Uni Soviet terlibat perang nyata (misal: Perang Musim Dingin Finlandia 1939)'
    ],
    keyEffectsSummary: 'Hapus debuff Purge secara tuntas, beri +1 Slot Riset dan +50 Army XP.',
    recommendedTiming: 'Awal 1940 (Segera setelah perang Finlandia selesai)',
    historicalContext: 'Reformasi radikal Tentara Merah di bawah Semjon Timoshenko pasca evaluasi Perang Musim Dingin.'
  },
  {
    id: 'sov-transpolar-flights',
    countryId: 'sov',
    name: 'Transpolar Flights (+1 Research Slot & Air Heroism)',
    originalName: 'Transpolar Flights',
    iconType: 'research',
    branch: 'Ekonomi & Industri',
    days: 70,
    prerequisites: ['sov-the-center'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      researchSlots: 1,
      airXP: 25,
      stability: 5
    },
    pros: [
      '+1 Slot Riset Permanen tambahan lebih awal',
      '+25 Air XP untuk modifikasi pesawat tempur Yakovlev / Ilyushin',
      '+5% Stabilitas Nasional lewat propaganda pahlawan penerbang Soviet (Valery Chkalov)'
    ],
    cons: [
      'Membutuhkan prasyarat fokus penerbangan kutub dan pembangunan infrastruktur utara'
    ],
    keyEffectsSummary: '+1 Slot Riset Permanen, +25 Air XP, dan +5% Stabilitas lewat pahlawan penerbangan kutub.',
    recommendedTiming: 'Pertengahan 1937',
    historicalContext: 'Penerbangan legendaris non-stop Moskow melintasi Kutub Utara ke Amerika Serikat pada 1937.'
  },
  {
    id: 'sov-war-with-germany',
    countryId: 'sov',
    name: 'War with Germany (Perang Patriotik Raya / GPW)',
    originalName: 'The Great Patriotic War',
    iconType: 'military',
    branch: 'Militer & Angkatan Darat',
    days: 70,
    prerequisites: ['sov-lessons-of-war'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      warSupport: 25,
      stability: 15,
      armyXP: 50,
      manpowerBonus: '+1.500.000 Cadangan Manpower & Hukum Desperate Defense'
    },
    pros: [
      'Mengaktifkan status "The Great Patriotic War": +25% War Support & +15% Stabilitas',
      '+1.500.000 Manpower cadangan instan',
      '+15% Kecepatan Konstruksi Pabrik Militer di balik Pegunungan Ural',
      'Menghancurkan moral invasi Poros saat musim dingin tiba'
    ],
    cons: [
      'Hanya aktif jika Jerman atau negara Poros sudah menyerang dan menguasai sebagian wilayah Soviet'
    ],
    keyEffectsSummary: 'Buff pertahanan total tanah air, +25% War Support, jutaan manpower saat Jerman menyerang.',
    recommendedTiming: 'Juni 1941 (Saat Operasi Barbarossa pecah)',
    historicalContext: 'Seruan Stalin untuk Perang Patriotik Raya membela ibu pertiwi dari fasisme.'
  },

  // =========================================================================
  // 3. AMERIKA SERIKAT (USA)
  // =========================================================================
  {
    id: 'usa-continue-new-deal',
    countryId: 'usa',
    name: 'Continue the New Deal (Jalur Demokrat FDR)',
    originalName: 'Continue the New Deal',
    iconType: 'politics',
    branch: 'Politik Demokrat & New Deal',
    days: 70,
    prerequisites: [],
    mutuallyExclusive: ['usa-re-establish-gold-standard'],
    historical: true,
    statsDelta: {
      politicalPower: 150,
      stability: 5
    },
    pros: [
      '+150 Political Power awal untuk mengamankan mayoritas Kongres (Senat & House)',
      'Membuka WPA dan rangkaian fokus penghapus depresi ekonomi "Great Depression"',
      'Mempertahankan Franklin D. Roosevelt dan kebijakan intervensi progresif'
    ],
    cons: [
      'Mengunci jalur Partai Republik Alf Landon (Re-establish Gold Standard)',
      'Memerlukan persetujuan Kongres untuk setiap undang-undang besar'
    ],
    keyEffectsSummary: 'Lanjutkan New Deal FDR, raih +150 PP, dan buka jalur penghapusan Great Depression.',
    recommendedTiming: 'Januari 1936 (Fokus Pertama)',
    historicalContext: 'Program reformasi ekonomi New Deal jilid kedua Presiden Franklin Delano Roosevelt.'
  },
  {
    id: 'usa-re-establish-gold-standard',
    countryId: 'usa',
    name: 'Re-establish Gold Standard (Partai Republik Alf Landon)',
    originalName: 'Re-establish the Gold Standard',
    iconType: 'politics',
    branch: 'Politik Alternatif (Republikan)',
    days: 70,
    prerequisites: [],
    mutuallyExclusive: ['usa-continue-new-deal'],
    historical: false,
    statsDelta: {
      civFactories: 2,
      stability: -5
    },
    pros: [
      'Memilih Alf Landon di Pemilu 1936; mencabut program sosial New Deal yang boros',
      'Membuka aliansi dengan kelompok bisnis swasta dan mencabut pembatasan moneter',
      'Dapat bersekutu dengan faksi non-demokratis atau isolasionisme ekstrem "America First"'
    ],
    cons: [
      'Penyelesaian Great Depression memakan waktu lebih rumit',
      'Kehilangan buff unik Arsenal of Democracy FDR',
      'Mengunci selamanya cabang New Deal'
    ],
    keyEffectsSummary: 'Jalur Partai Republik Alf Landon, cabut New Deal, dan pilih isolasionisme moneter.',
    recommendedTiming: '1936 jika berniat bermain Republikan',
    historicalContext: 'Kampanye kandidat Republik Alf Landon tahun 1936 yang menentang defisit anggaran New Deal.'
  },
  {
    id: 'usa-wpa',
    countryId: 'usa',
    name: 'WPA (Works Progress Administration)',
    originalName: 'WPA',
    iconType: 'industry',
    branch: 'Ekonomi & Industri',
    days: 70,
    prerequisites: ['usa-continue-new-deal'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      civFactories: 3,
      researchSlots: 1
    },
    pros: [
      '+3 Pabrik Sipil gratis langsung aktif di negara bagian AS',
      '+1 Slot Riset Permanen instan (AS memiliki 4 Research Slot sangat awal)',
      'Membuka lapangan kerja bagi jutaan warga Amerika yang menganggur'
    ],
    cons: [
      'Belum menghapus debuff "Great Depression" (hanya meringankan)'
    ],
    keyEffectsSummary: '+3 Pabrik Sipil dan +1 Slot Riset Permanen langsung di tahun 1936.',
    recommendedTiming: 'Maret 1936 (Fokus Kedua - Sangat Kuat)',
    historicalContext: 'Badan federal bentukan FDR yang mempekerjakan jutaan pengangguran untuk proyek infrastruktur.'
  },
  {
    id: 'usa-arsenal-of-democracy',
    countryId: 'usa',
    name: 'Arsenal of Democracy (Gudang Senjata Demokrasi)',
    originalName: 'Arsenal of Democracy',
    iconType: 'industry',
    branch: 'Ekonomi & Industri',
    days: 70,
    prerequisites: ['usa-wpa'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      civFactories: 3,
      milFactories: 3,
      warSupport: 10
    },
    pros: [
      '+3 Pabrik Sipil dan +3 Pabrik Militer gratis',
      '+20% Efisiensi Lend-Lease pengiriman senjata ke Inggris, Soviet, dan Tiongkok',
      'Mempersiapkan AS menjadi produsen mesin perang nomor satu di dunia'
    ],
    cons: [
      'Memerlukan World Tension di atas 20% atau kondisi perang aktif'
    ],
    keyEffectsSummary: '+3 Civs, +3 Mils, dan buff pengiriman senjata Lend-Lease ke sekutu demokrasi.',
    recommendedTiming: '1938-1939 saat World Tension mulai panas',
    historicalContext: 'Pidato radio FDR 1940 yang menyerukan Amerika menjadi "Arsenal of Democracy".'
  },
  {
    id: 'usa-the-giant-wakes',
    countryId: 'usa',
    name: 'The Giant Wakes (Raksasa Tertidur Bangkit)',
    originalName: 'The Giant Wakes',
    iconType: 'industry',
    branch: 'Ekonomi & Industri',
    days: 70,
    prerequisites: ['usa-wpa'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      politicalPower: 100,
      civFactories: 5,
      warSupport: 15
    },
    pros: [
      'MENGHAPUS TOTAL sisa debuff "Great Depression" yang memangkas kapasitas industri AS',
      'Mengubah undang-undang ekonomi menjadi War Economy atau Early Mobilization',
      'Membuka potensi 100+ pabrik sipil AS untuk membangun pabrik militer dengan kecepatan kilat'
    ],
    cons: [
      'Syarat ketat: World Tension minimal 30% atau AS dalam keadaan diserang perang'
    ],
    keyEffectsSummary: 'Menghapus Great Depression total, mengaktifkan War Economy dan potensi industri raksasa AS.',
    recommendedTiming: '1939 pasca pecah perang Polandia',
    historicalContext: 'Kebangkitan penuh kapasitas industri militer AS menjelang dan selama Perang Dunia II.'
  },
  {
    id: 'usa-two-ocean-navy-act',
    countryId: 'usa',
    name: 'Two-Ocean Navy Act (Armada Dua Samudra Atlantik & Pasifik)',
    originalName: 'Two-Ocean Navy Act',
    iconType: 'navy',
    branch: 'Angkatan Laut',
    days: 70,
    prerequisites: ['usa-the-giant-wakes'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      dockyards: 10,
      navyXP: 50
    },
    pros: [
      '+10 Galangan Kapal (Dockyards) gratis langsung aktif di pesisir Timur dan Barat AS',
      '+50 Navy XP untuk merancang Kapal Induk Essex-class dan Kapal Tempur Iowa-class',
      'Memungkinkan pembangunan armada kapal perang terbesar dalam sejarah dunia secara simultan di 2 samudra'
    ],
    cons: [
      'Konsumsi baja (steel) yang sangat besar untuk jalur produksi kapal raksasa'
    ],
    keyEffectsSummary: '+10 Galangan Kapal gratis dan +50 Navy XP untuk mendominasi Atlantik dan Pasifik.',
    recommendedTiming: '1940 (Sebelum Pearl Harbor)',
    historicalContext: 'Undang-Undang Vinson-Walsh 1940 untuk melipatgandakan kekuatan Angkatan Laut AS di dua samudra.'
  },
  {
    id: 'usa-manhattan-project',
    countryId: 'usa',
    name: 'The Manhattan Project (Bom Atom)',
    originalName: 'The Manhattan Project',
    iconType: 'research',
    branch: 'Riset & Teknologi Rahasia',
    days: 70,
    prerequisites: ['usa-the-giant-wakes'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      researchSlots: 0
    },
    pros: [
      '2x 100% Research Bonus untuk riset Teknologi Nuklir & Reaktor Atom',
      'Memungkinkan produksi bom nuklir pertama di dunia mendahului Jerman dan Soviet',
      'Membuka kemampuan menekan Jepang untuk menyerah tanpa invasi berdarah ke pulau utama'
    ],
    cons: [
      'Biaya pembangunan reaktor nuklir memakan banyak pabrik sipil (civs)'
    ],
    keyEffectsSummary: '2x 100% bonus riset nuklir untuk menjadi negara pertama pemilik bom atom.',
    recommendedTiming: '1942-1943',
    historicalContext: 'Proyek rahasia Los Alamos pimpinan J. Robert Oppenheimer untuk mengembangkan senjata nuklir.'
  },

  // =========================================================================
  // 4. INGGRIS RAYA (UNITED KINGDOM - ENG)
  // =========================================================================
  {
    id: 'eng-limited-rearmament',
    countryId: 'eng',
    name: 'Limited Rearmament (Persenjataan Kembali Terbatas)',
    originalName: 'Limited Rearmament',
    iconType: 'industry',
    branch: 'Industri & Pertahanan',
    days: 70,
    prerequisites: [],
    mutuallyExclusive: ['eng-change-of-course'],
    historical: true,
    statsDelta: {
      civFactories: 2,
      warSupport: 5
    },
    pros: [
      '+2 Pabrik Sipil dan pelonggaran awal undang-undang mobilisasi militer',
      'Membuka cabang Shadow Industry dan riset Radar Dover',
      'Mempertahankan aliansi Persemakmuran (Kanada, Australia, India, Selandia Baru, Afsel)'
    ],
    cons: [
      'Masih terikat debuff "The Ten Year Rule" dan kepemimpinan pasif Neville Chamberlain',
      'Mengunci jalur monarki absolut "King\'s Party" Edward VIII'
    ],
    keyEffectsSummary: 'Langkah awal persenjataan Inggris; membuka Shadow Industry dan sistem Radar.',
    recommendedTiming: 'Januari 1936 (Fokus Pertama)',
    historicalContext: 'Program rearmament Inggris secara bertahap merespons kebangkitan militer Jerman dan Italia.'
  },
  {
    id: 'eng-shadow-industry',
    countryId: 'eng',
    name: 'Shadow Industry (Pabrik Militer Bayangan)',
    originalName: 'Shadow Industry Scheme',
    iconType: 'industry',
    branch: 'Industri & Pertahanan',
    days: 70,
    prerequisites: ['eng-limited-rearmament'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      civFactories: 2,
      milFactories: 2
    },
    pros: [
      '+2 Pabrik Sipil dan +2 Pabrik Militer gratis tersembunyi di daratan Inggris',
      'Mempersiapkan pabrik otomotif sipil agar bisa dikonversi menjadi perakitan pesawat tempur Spitfire',
      'Prasyarat menuju General Rearmament'
    ],
    cons: [
      'Kapasitas manpower pulau utama Inggris masih belum tersentuh'
    ],
    keyEffectsSummary: '+2 Civs dan +2 Mils di Inggris; konversi industri sipil ke manufaktur pesawat perang.',
    recommendedTiming: 'Maret 1936 (Fokus Kedua)',
    historicalContext: 'Skema pabrik bayangan Lord Weir untuk memproduksi mesin pesawat di bengkel otomotif swasta.'
  },
  {
    id: 'eng-radar-stations',
    countryId: 'eng',
    name: 'Radar Stations (Jaringan Radar Chain Home)',
    originalName: 'Radar Stations',
    iconType: 'research',
    branch: 'Angkatan Udara & Radar',
    days: 70,
    prerequisites: ['eng-limited-rearmament'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      airXP: 25
    },
    pros: [
      '2x Radar Station Level 1 gratis langsung terpasang di Dover & Sussex (Pesisir Selatan)',
      '+100% Research Bonus untuk teknologi Radar dan Elektronika Komunikasi',
      'Kunci memenangkan "Battle of Britain" (Deteksi dini bomber Luftwaffe Jerman melintasi Selat Inggris)'
    ],
    cons: [
      'Tidak menambah jumlah pabrik fisik langsung'
    ],
    keyEffectsSummary: '2 Radar gratis di Dover & +100% riset radar; kunci menang perang udara Battle of Britain.',
    recommendedTiming: 'Pertengahan 1937',
    historicalContext: 'Pembangunan rantai stasiun radar Chain Home pimpinan Robert Watson-Watt.'
  },
  {
    id: 'eng-tizard-mission',
    countryId: 'eng',
    name: 'Tizard Mission (Kolaborasi Riset Ilmiah dengan AS)',
    originalName: 'Tizard Mission',
    iconType: 'research',
    branch: 'Riset & Diplomasi',
    days: 70,
    prerequisites: ['eng-radar-stations'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      researchSlots: 1,
      politicalPower: 25
    },
    pros: [
      '+1 Slot Riset Permanen (Inggris meraih Slot Riset Ke-5)',
      'Berbagi rahasia radar Magnetron, proyektil berjarak dekat, dan desain jet dengan Amerika Serikat',
      'Meningkatkan opini diplomatik dan aliansi erat dengan AS'
    ],
    cons: [
      'Memerlukan hubungan baik dengan AS dan status perang aktif atau ancaman tinggi'
    ],
    keyEffectsSummary: '+1 Slot Riset Permanen dan aliansi pertukaran rahasia sains militer dengan AS.',
    recommendedTiming: '1939-1940',
    historicalContext: 'Misi rahasia Sir Henry Tizard 1940 membawa koper rahasia teknologi militer Inggris ke AS.'
  },
  {
    id: 'eng-war-committee',
    countryId: 'eng',
    name: 'War Committee (Winston Churchill Memimpin)',
    originalName: 'A Change in Leadership / War Committee',
    iconType: 'politics',
    branch: 'Politik & Kepemimpinan',
    days: 70,
    prerequisites: ['eng-limited-rearmament'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      politicalPower: 100,
      stability: 15,
      warSupport: 20
    },
    pros: [
      'Mengangkat Winston Churchill sebagai Perdana Menteri dengan buff "We Shall Never Surrender"',
      '+15% Stabilitas Nasional dan +20% War Support instan',
      'Kebal dari tekanan perdamaian kondisional Jerman meski daratan Eropa sudah jatuh'
    ],
    cons: [
      'Kehilangan Neville Chamberlain (yang memiliki buff biaya diplomasi damai murah)'
    ],
    keyEffectsSummary: 'Winston Churchill memimpin, raih +15% Stabilitas, +20% War Support, tolak menyerah.',
    recommendedTiming: 'Mei 1940 (Saat Prancis diserbu Jerman)',
    historicalContext: 'Pengunduran diri Neville Chamberlain dan naiknya Winston Churchill sebagai PM Inggris Mei 1940.'
  },

  // =========================================================================
  // 5. KEKAISARAN JEPANG (EMPIRE OF JAPAN - JAP)
  // =========================================================================
  {
    id: 'jap-purge-kodoha',
    countryId: 'jap',
    name: 'Purge the Kodoha Faction (Faksi Toseiha & Militer Modern)',
    originalName: 'Purge the Kodoha Faction',
    iconType: 'politics',
    branch: 'Politik Militer Fasis',
    days: 70,
    prerequisites: [],
    mutuallyExclusive: ['jap-support-kodoha'],
    historical: true,
    statsDelta: {
      politicalPower: 100,
      stability: 10
    },
    pros: [
      'Membersihkan elemen radikal Kodoha pasca Insiden 26 Februari 1936',
      '+10% Stabilitas Nasional dan +100 Political Power',
      'Membuka kerja sama erat dengan konglomerat industri Zaibatsu',
      'Prasyarat historis menuju invasi Tiongkok dan ekspansi ke selatan (Southern Expansion)'
    ],
    cons: [
      'Mengunci cabang perang melawan Uni Soviet (Strike North Doctrine)',
      'Memfokuskan militer pada ketergantungan sumber daya laut selatan'
    ],
    keyEffectsSummary: 'Pembersihan faksi ekstremis Kodoha; stabilkan politik dalam negeri dan rangkul Zaibatsu.',
    recommendedTiming: 'Januari 1936 (Fokus Pertama Wajib)',
    historicalContext: 'Pembersihan faksi Faksi Jalan Kekaisaran (Kodoha) menyusul kegagalan kudeta 26 Februari 1936.'
  },
  {
    id: 'jap-support-kodoha',
    countryId: 'jap',
    name: 'Support the Kodoha Faction (Serang Uni Soviet di Utara)',
    originalName: 'Support the Kodoha Faction',
    iconType: 'politics',
    branch: 'Politik Alternatif (Hokushin-ron)',
    days: 70,
    prerequisites: [],
    mutuallyExclusive: ['jap-purge-kodoha'],
    historical: false,
    statsDelta: {
      warSupport: 15,
      stability: -10
    },
    pros: [
      'Doktrin Hokushin-ron: Mempersiapkan invasi militer darat besar ke Siberia & Uni Soviet',
      'Menghindari benturan dini dengan Amerika Serikat dan armada laut Sekutu di Pasifik',
      'Berkoordinasi dengan Jerman untuk menjepit Uni Soviet dari dua sisi'
    ],
    cons: [
      'Siberia miskin karet dan minyak; krisis bahan bakar Jepang tidak terselesaikan',
      'Menghadapi divisi lapis baja Soviet pimpinan Georgy Zhukov di perbatasan Manchuria'
    ],
    keyEffectsSummary: 'Pilih serang Uni Soviet di utara; hindari perang dengan AS tapi kekurangan minyak.',
    recommendedTiming: '1936 jika berniat menyerang Uni Soviet',
    historicalContext: 'Doktrin Angkatan Darat Kekaisaran Jepang (Hokushin-ron) untuk menginvasi Timur Jauh Soviet.'
  },
  {
    id: 'jap-guide-zaibatsus',
    countryId: 'jap',
    name: 'Guide the Zaibatsus (Kerja Sama Konglomerat Industri)',
    originalName: 'Guide the Zaibatsus',
    iconType: 'industry',
    branch: 'Ekonomi & Industri',
    days: 70,
    prerequisites: ['jap-purge-kodoha'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      civFactories: 2,
      milFactories: 2
    },
    pros: [
      '+2 Pabrik Sipil dan +2 Pabrik Militer langsung aktif di pulau Honshu',
      'Meringankan penalti debuff monopoli Zaibatsu terhadap efisiensi produksi',
      'Membuka fokus National Mobilization Law'
    ],
    cons: [
      'Memerlukan Political Power untuk menyelaraskan kepentingan konglomerat Mitsubishi & Mitsui'
    ],
    keyEffectsSummary: '+2 Civs, +2 Mils; kurangi penalti monopoli industri Zaibatsu.',
    recommendedTiming: 'Maret 1936 (Fokus Kedua)',
    historicalContext: 'Mobilisasi konglomerat industri Zaibatsu untuk memasok persenjataan modern Kekaisaran Jepang.'
  },
  {
    id: 'jap-marco-polo-bridge',
    countryId: 'jap',
    name: 'Marco Polo Bridge Incident (Perang Melawan Tiongkok)',
    originalName: 'Marco Polo Bridge Incident',
    iconType: 'military',
    branch: 'Militer & Ekspansi',
    days: 70,
    prerequisites: ['jap-guide-zaibatsus'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      worldTension: 15,
      warSupport: 15
    },
    annexationOrClaim: 'War Goal: Republik Tiongkok (Chiang Kai-shek)',
    pros: [
      'Memberikan War Goal invasi langsung ke Republik Tiongkok (Nationalist China)',
      '+15% War Support (memungkinkan undang-undang ekonomi War Economy lebih awal)',
      'Akses menaklukkan kota-kota pesisir kaya industri Shanghai, Nanjing, dan Canton'
    ],
    cons: [
      'Debuff awal "Marco Polo Bridge Penalty": -50% Soft Attack di wilayah Tiongkok',
      'Harus menghapus debuff lewat keputusan "Escalate the War in China" (butuh banyak PP)',
      '+15% World Tension yang memicu kecurigaan Amerika Serikat'
    ],
    keyEffectsSummary: 'Deklarasi perang terhadap Tiongkok; memicu perang panjang di Asia Timur.',
    recommendedTiming: 'Pertengahan 1937 (Juli 1937)',
    historicalContext: 'Insiden Jembatan Marco Polo Juli 1937 menandai pecahnya Perang Tiongkok-Jepang Kedua.'
  },
  {
    id: 'jap-southern-expansion',
    countryId: 'jap',
    name: 'Strike South Doctrine (Rebut Minyak & Karet Hindia Belanda)',
    originalName: 'Strike South Doctrine',
    iconType: 'expansion',
    branch: 'Militer & Ekspansi',
    days: 70,
    prerequisites: ['jap-purge-kodoha'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      dockyards: 4,
      navyXP: 25,
      worldTension: 10
    },
    annexationOrClaim: 'Klaim Sumber Daya Hindia Belanda (Indonesia) & Malaya',
    pros: [
      'Memberikan klaim dan War Goal ke Hindia Belanda (Minyak Sumatra & Tarakan) dan Malaya (Karet)',
      'Menyelesaikan krisis fatal cadangan bahan bakar armada Kekaisaran Jepang',
      '+4 Galangan Kapal dan +25 Navy XP'
    ],
    cons: [
      'Pasti memicu embargo total dan perang terbuka melawan Amerika Serikat (Pearl Harbor / Pasifik)',
      'Menghadapi perang maritim raksasa melawan Angkatan Laut AS di samudra terbuka'
    ],
    keyEffectsSummary: 'War Goal ke Indonesia & Malaya untuk merebut minyak & karet; picu perang Pasifik dengan AS.',
    recommendedTiming: '1940-1941 setelah Prancis dan Belanda jatuh di Eropa',
    historicalContext: 'Keputusan ekspansi ke selatan (Nanshin-ron) untuk mengamankan sumber daya minyak Asia Tenggara.'
  },
  {
    id: 'jap-zero-fighter',
    countryId: 'jap',
    name: 'Zero Fighter Program (Pesawat Tempur A6M Zero)',
    originalName: 'Zero Fighter Program',
    iconType: 'air',
    branch: 'Angkatan Udara & Laut',
    days: 70,
    prerequisites: ['jap-guide-zaibatsus'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      airXP: 50
    },
    pros: [
      '+100% Research Bonus untuk Carrier Fighter II (Mitsubishi A6M Zero)',
      '+50 Air XP untuk merancang varian pesawat lincah berdaya jelajah tinggi',
      'Memberikan keunggulan mutlak superioritas udara di atas kepulauan Pasifik pada awal perang'
    ],
    cons: [
      'Armor pesawat tipis sehingga rentan di akhir perang saat teknologi Sekutu menyusul'
    ],
    keyEffectsSummary: '+100% riset Carrier Fighter II Zero dan +50 Air XP untuk mendominasi langit Pasifik.',
    recommendedTiming: '1938-1939',
    historicalContext: 'Pengembangan pesawat tempur legendaris Mitsubishi A6M Zero yang mendominasi awal PD II Pasifik.'
  },

  // =========================================================================
  // 6. ITALIA (KINGDOM OF ITALY - ITA)
  // =========================================================================
  {
    id: 'ita-triumph-in-africa',
    countryId: 'ita',
    name: 'Triumph in Africa (Kemenangan Perang Ethiopia)',
    originalName: 'Triumph in Africa',
    iconType: 'military',
    branch: 'Politik Fasis & Afrika',
    days: 70,
    prerequisites: [],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      politicalPower: 120,
      stability: 10,
      warSupport: 10
    },
    annexationOrClaim: 'Aneksasi Kekaisaran Ethiopia',
    pros: [
      'Menyelesaikan perang Ethiopia secara resmi dan mencaplok seluruh wilayahnya',
      '+120 Political Power instan dan +10% Stabilitas',
      'Membuka seluruh cabang industrialisasi Italia dan klaim Mediterania',
      'Menghilangkan tekanan sanksi Liga Bangsa-Bangsa'
    ],
    cons: [
      'Syarat mutlak: Ethiopia harus menyerah total (kalahkan Addis Ababa secepatnya di awal 1936)',
      'Garnisun Ethiopia memerlukan suplai dan manpower untuk menekan perlawanan gerilya'
    ],
    keyEffectsSummary: 'Menangkan perang Ethiopia, aneksasi penuh, raih +120 PP dan +10% Stabilitas.',
    recommendedTiming: 'Maret 1936 (Segera setelah Ethiopia menyerah)',
    historicalContext: 'Proklamasi kemenangan Mussolini dalam Perang Italo-Ethiopia Kedua Mei 1936.'
  },
  {
    id: 'ita-industrial-development',
    countryId: 'ita',
    name: 'Industrial Development (Industrialisasi Lembah Po)',
    originalName: 'Industrial Development',
    iconType: 'industry',
    branch: 'Ekonomi & Industri',
    days: 70,
    prerequisites: ['ita-triumph-in-africa'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      civFactories: 2,
      milFactories: 2
    },
    pros: [
      '+2 Pabrik Sipil dan +2 Pabrik Militer di wilayah Italia Utara (Milan & Turin)',
      'Mempercepat pembangunan pabrik senjata murah untuk infanteri Italia',
      'Prasyarat menuju perluasan armada Regia Marina'
    ],
    cons: [
      'Italia tetap kekurangan sumber daya mentah minyak dan karet'
    ],
    keyEffectsSummary: '+2 Civs dan +2 Mils di Italia Utara; memperkuat fondasi industri sebelum perang Eropa.',
    recommendedTiming: 'Mei 1936 (Fokus Kedua)',
    historicalContext: 'Program industrialisasi fasis di kawasan industri maju Italia Utara.'
  },
  {
    id: 'ita-mare-nostrum',
    countryId: 'ita',
    name: 'Mare Nostrum (Klaim Laut Mediterania Kita)',
    originalName: 'Mare Nostrum',
    iconType: 'expansion',
    branch: 'Ekspansi & Angkatan Laut',
    days: 70,
    prerequisites: ['ita-triumph-in-africa'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      dockyards: 4,
      navyXP: 30,
      warSupport: 10
    },
    annexationOrClaim: 'Klaim Terusan Suez, Malta, Gibraltar, dan pesisir Mediterania',
    pros: [
      'Klaim atas posisi strategis laut: Terusan Suez, Malta, dan Gibraltar',
      '+4 Galangan Kapal gratis di Genoa dan Taranto',
      'Buff serangan armada laut di wilayah perairan Laut Mediterania',
      'Tujuan strategis untuk memutus jalur logistik kekaisaran Inggris ke India'
    ],
    cons: [
      'Menjadikan armada Regia Marina target utama pemboman kapal induk Royal Navy Inggris'
    ],
    keyEffectsSummary: '+4 Dockyards dan klaim penguasaan penuh Laut Mediterania (Suez, Malta, Gibraltar).',
    recommendedTiming: '1938-1939',
    historicalContext: 'Konsep Romawi Kuno "Laut Kita" yang dihidupkan Mussolini untuk menghegemoni Mediterania.'
  },
  {
    id: 'ita-pact-of-steel',
    countryId: 'ita',
    name: 'Pact of Steel (Pakta Baja Aliansi Jerman)',
    originalName: 'Pact of Steel',
    iconType: 'politics',
    branch: 'Diplomasi Fasis',
    days: 70,
    prerequisites: ['ita-industrial-development'],
    mutuallyExclusive: ['ita-depose-mussolini'],
    historical: true,
    statsDelta: {
      politicalPower: 75,
      worldTension: 5
    },
    pros: [
      'Aliansi militer resmi Poros (Axis) bersama Jerman',
      'Akses teknologi militer Jerman (lisensi sasis tank Panzer dan mesin pesawat)',
      'Jaminan perlindungan perbatasan utara di Pegunungan Alpen'
    ],
    cons: [
      'Italia terikat dalam perang global Hitler melawan Inggris, Prancis, dan Uni Soviet',
      'Membuka risiko runtuhnya rezim Mussolini jika wilayah Italia daratan diduduki Sekutu'
    ],
    keyEffectsSummary: 'Aliansi resmi dengan Jerman dalam Poros (Axis); lisensi teknologi militer Jerman.',
    recommendedTiming: 'Mei 1939',
    historicalContext: 'Pakta Baja militer ofensif dan defensif Berlin-Roma ditandatangani 22 Mei 1939.'
  },
  {
    id: 'ita-depose-mussolini',
    countryId: 'ita',
    name: 'Depose Mussolini (Jatuhkan Mussolini & Pulihkan Monarki)',
    originalName: 'Depose Mussolini',
    iconType: 'politics',
    branch: 'Politik Alternatif (Monarkis / Paus)',
    days: 70,
    prerequisites: [],
    mutuallyExclusive: ['ita-pact-of-steel'],
    historical: false,
    statsDelta: {
      politicalPower: -50,
      stability: 15
    },
    pros: [
      'Menggulingkan rezim fasis Mussolini dan mengembalikan Raja Vittorio Emanuele III / Dewan Kepausan',
      'Dapat keluar dari aliansi Poros dan bergabung dengan Sekutu atau blok netral',
      '+15% Stabilitas Nasional dan menghapus mekanik Dewan Fasis yang berbahaya'
    ],
    cons: [
      'Jerman bisa melancarkan Operasi Achse untuk menginvasi Italia utara sebagai balasan',
      'Kehilangan buff militer agresif fasis'
    ],
    keyEffectsSummary: 'Gulingkan Mussolini, pulihkan monarki/demokrasi, dan hindari kehancuran perang poros.',
    recommendedTiming: '1936-1937 jika bermain jalur monarki Italia',
    historicalContext: 'Kudeta Raja Vittorio Emanuele III dan Marsekal Badoglio menjatuhkan Mussolini pada Juli 1943.'
  },

  // =========================================================================
  // 7. PRANCIS (FRENCH REPUBLIC - FRA)
  // =========================================================================
  {
    id: 'fra-devalue-franc',
    countryId: 'fra',
    name: 'Devalue the Franc (Devaluasi Mata Uang Franc)',
    originalName: 'Devalue the Franc',
    iconType: 'industry',
    branch: 'Ekonomi & Industri',
    days: 70,
    prerequisites: [],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      civFactories: 2,
      stability: -5
    },
    pros: [
      '+2 Pabrik Sipil dan pelonggaran likuiditas anggaran belanja negara',
      'Membuka seluruh cabang industrialisasi Prancis dan reformasi pabrik senjata',
      'Langkah pertama membangkitkan ekonomi Prancis dari stagnasi'
    ],
    cons: [
      '-5% Stabilitas Nasional (kelompok pekerja dan buruh protes inflasi)',
      'Belum menghapus debuff "Disjointed Government" (-1 PP per hari)'
    ],
    keyEffectsSummary: '+2 Civs awal untuk memulai industrialisasi Prancis, mengorbankan 5% Stabilitas.',
    recommendedTiming: 'Januari 1936 (Fokus Pertama Wajib)',
    historicalContext: 'Devaluasi mata uang Franc Prancis 1936 di bawah Perdana Menteri Léon Blum.'
  },
  {
    id: 'fra-popular-front',
    countryId: 'fra',
    name: 'Form the Popular Front (Front Populer Kiri-Tengah)',
    originalName: 'Form the Popular Front',
    iconType: 'politics',
    branch: 'Politik Historis (Demokrat Kiri)',
    days: 70,
    prerequisites: ['fra-devalue-franc'],
    mutuallyExclusive: ['fra-revive-national-bloc'],
    historical: true,
    statsDelta: {
      stability: 10,
      politicalPower: 50
    },
    pros: [
      'Menenangkan demonstrasi buruh dan menghentikan pemogokan massal pabrik Prancis',
      '+10% Stabilitas Nasional dan +50 PP',
      'Membuka kesepakatan Matignon (Reformasi sosial & hak buruh)',
      'Prasyarat menuju penghapusan debuff Disjointed Government'
    ],
    cons: [
      'Mengurangi kecepatan konstruksi pabrik sementara sebesar -5% karena jam kerja 40 jam buruh',
      'Mengunci cabang sayap kanan Revive the National Bloc'
    ],
    keyEffectsSummary: 'Bentuk koalisi Front Populer; raih +10% Stabilitas dan cegah pemogokan buruh.',
    recommendedTiming: 'Maret 1936 (Fokus Kedua)',
    historicalContext: 'Koalisi Front Populaire pimpinan Léon Blum memenangkan pemilu Prancis Mei 1936.'
  },
  {
    id: 'fra-revive-national-bloc',
    countryId: 'fra',
    name: 'Revive the National Bloc (Blok Nasional Kanan & Militer)',
    originalName: 'Revive the National Bloc',
    iconType: 'politics',
    branch: 'Politik Alternatif (Konservatif / Otoriter)',
    days: 70,
    prerequisites: ['fra-devalue-franc'],
    mutuallyExclusive: ['fra-popular-front'],
    historical: false,
    statsDelta: {
      warSupport: 15,
      civFactories: 2
    },
    pros: [
      'Fokus ketat pada persenjataan militer dan disiplin buruh pabrik (tanpa jam kerja pendek 40 jam)',
      '+15% War Support dan +2 Pabrik Militer',
      'Membuka opsi monarkis Bourbon / Bonaparte atau Fasis Prancis'
    ],
    cons: [
      'Ketegangan sosial dengan serikat buruh sayap kiri',
      'Mengunci selamanya cabang Popular Front'
    ],
    keyEffectsSummary: 'Jalur sayap kanan Prancis; prioritaskan produksi militer tanpa kompromi hak buruh.',
    recommendedTiming: '1936 jika bermain jalur kanan / monarkis Prancis',
    historicalContext: 'Koalisi konservatif Blok Nasional yang berakar dari pasca PD I Prancis.'
  },
  {
    id: 'fra-extend-maginot-line',
    countryId: 'fra',
    name: 'Extend the Maginot Line (Perpanjang Benteng ke Belgia)',
    originalName: 'Extend the Maginot Line',
    iconType: 'military',
    branch: 'Pertahanan & Benteng',
    days: 70,
    prerequisites: ['fra-devalue-franc'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      milFactories: 0,
      warSupport: 5
    },
    pros: [
      'Membangun Benteng Darat Level 2-4 di sepanjang perbatasan Belgia (Lille & Dunkirk)',
      'Mencegah tank Jerman melakukan manuver "Around Maginot" secara gratis',
      'Kombinasi sempurna dengan doktrin Grand Battleplan (Entrenchment 40+)'
    ],
    cons: [
      'Hubungan diplomatik dengan Belgia memburuk (Belgia merasa dijadikan umpan bumper perang)',
      'Hutan Ardennes masih menjadi celah sempit yang harus dijaga divisi kuat'
    ],
    keyEffectsSummary: 'Bangun benteng beton di perbatasan Belgia untuk menutup celah invasi Jerman.',
    recommendedTiming: '1937-1938 sebelum krisis Cekoslowakia',
    historicalContext: 'Rencana Prancis memperpanjang garis benteng Maginot hingga ke pantai Laut Utara.'
  },
  {
    id: 'fra-army-reform',
    countryId: 'fra',
    name: 'Army Reform (Reformasi Tentara & Hapus Debuff PD I)',
    originalName: 'Army Reform',
    iconType: 'military',
    branch: 'Militer & Angkatan Darat',
    days: 70,
    prerequisites: ['fra-popular-front'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      armyXP: 30
    },
    pros: [
      'MENGHAPUS TOTAL debuff "Victors of the Great War" (-75% penalti riset doktrin darat)',
      '+30 Army XP untuk menyesuaikan template infanteri dan tank',
      'Memungkinkan riset doktrin modern setara dengan Wehrmacht Jerman'
    ],
    cons: [
      'Memerlukan prasyarat beberapa fokus militer dan waktu pengerjaan 70 hari'
    ],
    keyEffectsSummary: 'Hapus debuff "Victors of the Great War"; tentara Prancis bisa meriset doktrin militer normal.',
    recommendedTiming: '1938 (Wajib sebelum perang 1939)',
    historicalContext: 'Modernisasi doktrin kaku warisan Jenderal Pétain menuju perang mekanis modern.'
  },

  // =========================================================================
  // 8. TIONGKOK NASIONALIS (REPUBLIC OF CHINA - CHI)
  // =========================================================================
  {
    id: 'chi-three-principles',
    countryId: 'chi',
    name: 'Three Principles of the People (Tiga Prinsip Rakyat Sun Yat-sen)',
    originalName: 'Three Principles of the People',
    iconType: 'politics',
    branch: 'Politik Kuomintang',
    days: 70,
    prerequisites: [],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      politicalPower: 120,
      stability: 10
    },
    pros: [
      '+120 Political Power awal untuk konsolidasi pemerintah Nanjing',
      '+10% Stabilitas Nasional (moral persatuan rakyat Tiongkok)',
      'Membuka reformasi birokrasi dan jalur penaklukan panglima perang (Warlords)'
    ],
    cons: [
      'Belum menyelesaikan ancaman pemberontakan Komunis di Yan\'an'
    ],
    keyEffectsSummary: '+120 PP dan +10% Stabilitas; membuka reformasi administrasi Republik Tiongkok.',
    recommendedTiming: 'Januari 1936 (Fokus Pertama Wajib)',
    historicalContext: 'Ajaran San Min Chu-i (Nasionalisme, Demokrasi, Kesejahteraan Rakyat) dr. Sun Yat-sen.'
  },
  {
    id: 'chi-united-front',
    countryId: 'chi',
    name: 'United Front against Japan (Front Persatuan Anti-Jepang)',
    originalName: 'United Front',
    iconType: 'politics',
    branch: 'Diplomasi & Aliansi',
    days: 70,
    prerequisites: ['chi-three-principles'],
    mutuallyExclusive: ['chi-pacification'],
    historical: true,
    statsDelta: {
      warSupport: 20,
      stability: 10
    },
    pros: [
      'Membentuk aliansi resmi Chinese United Front menyatukan Kuomintang, Komunis (Mao), dan Warlords',
      '+20% War Support dan +10% Stabilitas',
      'Ratusan divisi milisi dari seluruh Tiongkok bergabung untuk melawan agresi Kekaisaran Jepang',
      'Mencegah perang saudara internal selagi Jepang menyerbu dari utara'
    ],
    cons: [
      'Mengakui kekuasaan Partai Komunis Tiongkok di basis Shanxi/Yan\'an',
      'Setelah Jepang kalah, perang saudara Kuomintang vs Komunis akan pecah kembali'
    ],
    keyEffectsSummary: 'Bentuk Front Persatuan seluruh Tiongkok melawan invasi Jepang; +20% War Support.',
    recommendedTiming: 'Pertengahan 1937 (Pasca Insiden Xi\'an)',
    historicalContext: 'Front Persatuan Kedua Kuomintang-PKT dibentuk setelah Insiden Xi\'an Desember 1936.'
  },
  {
    id: 'chi-army-reform',
    countryId: 'chi',
    name: 'Army Reform (Reformasi Tentara & Hapus Korupsi Perwira)',
    originalName: 'Army Reform',
    iconType: 'military',
    branch: 'Militer & Angkatan Darat',
    days: 70,
    prerequisites: ['chi-three-principles'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      armyXP: 40
    },
    pros: [
      'Membuka keputusan mengurangi level debuff fatal "Incompetent Officers" (-50% Attack/Org tentara Tiongkok)',
      'Setiap level reformasi menambah daya serang dan organisasi pasukan secara bertahap',
      'Mengubah tentara Tiongkok dari milisi rapuh menjadi divisi tangguh penahan serbuan Jepang'
    ],
    cons: [
      'Memerlukan pengeluaran Army XP bertahap untuk menyelesaikan seluruh tingkatan reformasi'
    ],
    keyEffectsSummary: 'Membuka keputusan penghapusan debuff perwira korup; tentara Tiongkok siap memukul balik Jepang.',
    recommendedTiming: '1937-1938 secepatnya',
    historicalContext: 'Misi Penasihat Militer Jerman pimpinan Alexander von Falkenhausen melatih divisi精英 Tiongkok.'
  },
  {
    id: 'chi-relocate-chongqing',
    countryId: 'chi',
    name: 'Relocate Industry to Chongqing (Pindahkan Pabrik ke Pedalaman)',
    originalName: 'Relocate Industry',
    iconType: 'industry',
    branch: 'Ekonomi & Pertahanan',
    days: 70,
    prerequisites: ['chi-three-principles'],
    mutuallyExclusive: [],
    historical: true,
    statsDelta: {
      civFactories: 2,
      milFactories: 2
    },
    pros: [
      'Menyelamatkan pabrik dari pesisir timur yang rentan diduduki amfibi Jepang',
      '+2 Pabrik Sipil dan +2 Pabrik Militer aman di pedalaman Sichuan & Chongqing yang bergunung-gunung',
      'Strategi ruang tukar waktu (Trading Space for Time) menghabiskan suplai musuh'
    ],
    cons: [
      'Pesisir Shanghai dan Nanjing tetap berisiko jatuh ke tangan marinir Jepang'
    ],
    keyEffectsSummary: 'Pindahkan industri ke pedalaman aman Chongqing; amankan pabrik dari serbuan laut Jepang.',
    recommendedTiming: 'Akhir 1937 setelah perang Tiongkok-Jepang meletus',
    historicalContext: 'Pemindahan modal industri dan ibukota darurat perang Tiongkok ke pedalaman Chongqing.'
  }
];

export const NATIONAL_FOCUSES_DATA: NationalFocus[] = [
  ...BASE_NATIONAL_FOCUSES_DATA,
  ...EXPANDED_MAJOR_FOCUSES_DATA,
  ...REGIONAL_POWERS_FOCUSES_DATA,
  ...MINOR_EUROPEAN_FOCUSES_DATA
];

const BASE_FOCUS_PRESETS_DATA: FocusPresetPath[] = [
  // JERMAN PRESETS
  {
    id: 'preset-ger-meta',
    countryId: 'ger',
    title: 'Meta Kompetitif PD II (Historis Optimal)',
    description: 'Jalur standar turnamen multiplayer dan kampanye singleplayer tersukses: maksimalkan industri sipil dan slot riset ke-5 sebelum 1937, lalu serap Austria dan Ceko secara damai tanpa perang dini.',
    type: 'meta_historical',
    focusIds: [
      'ger-rhineland',
      'ger-four-year-plan',
      'ger-autarky',
      'ger-goring-werke',
      'ger-kdf-wagen',
      'ger-extra-tech-slot',
      'ger-anschluss',
      'ger-demand-sudetenland',
      'ger-fate-of-czechoslovakia',
      'ger-molotov-ribbentrop',
      'ger-danzig-or-war',
      'ger-around-maginot',
      'ger-operation-barbarossa'
    ]
  },
  {
    id: 'preset-ger-industry-rush',
    countryId: 'ger',
    title: 'Rush Industri & Riset Ekstra 1936-1937',
    description: 'Prioritas mutlak memacu pembangunan pabrik sipil gratis dan slot riset ke-5 Jerman paling awal untuk riset tank medium 1939 sebelum World Tension naik.',
    type: 'rush_industry',
    focusIds: [
      'ger-rhineland',
      'ger-four-year-plan',
      'ger-autarky',
      'ger-goring-werke',
      'ger-kdf-wagen',
      'ger-extra-tech-slot'
    ]
  },
  {
    id: 'preset-ger-kaiser',
    countryId: 'ger',
    title: 'Jalur Alternatif: Kekaisaran Jerman (Oppose Hitler)',
    description: 'Gulingkan rezim Nazi, pulihkan Kekaisaran Jerman (Kaiserreich), rekrut kembali Von Mackensen dan bersekutu dengan Inggris melawan tirani Komunisme.',
    type: 'alternative_history',
    focusIds: [
      'ger-oppose-hitler',
      'ger-four-year-plan',
      'ger-autarky',
      'ger-goring-werke',
      'ger-kdf-wagen',
      'ger-extra-tech-slot'
    ]
  },

  // SOVIET PRESETS
  {
    id: 'preset-sov-meta',
    countryId: 'sov',
    title: 'Meta Stalinis: Benteng Besi & Great Patriotic War',
    description: 'Jalur resmi mempertahankan kepemimpinan Stalin, selesaikan Purge sedini mungkin, manfaatkan perang Finlandia untuk hapus debuff Purge, lalu bangun benteng industri di balik Ural.',
    type: 'meta_historical',
    focusIds: [
      'sov-path-marxism',
      'sov-the-center',
      'sov-heavy-industry',
      'sov-transpolar-flights',
      'sov-the-great-purge',
      'sov-lessons-of-war',
      'sov-war-with-germany'
    ]
  },
  {
    id: 'preset-sov-trotsky',
    countryId: 'sov',
    title: 'Jalur Alternatif: Revolusi Permanen Leon Trotsky',
    description: 'Bawa pulang Leon Trotsky dari pengasingan Meksiko, hidupkan kembali Revolusi Komunis Dunia, dan kobarkan perang terhadap seluruh faksi kapitalis dan fasis.',
    type: 'alternative_history',
    focusIds: [
      'sov-path-marxism',
      'sov-left-opposition',
      'sov-heavy-industry'
    ]
  },

  // USA PRESETS
  {
    id: 'preset-usa-meta',
    countryId: 'usa',
    title: 'Meta Historis FDR: New Deal & Arsenal of Democracy',
    description: 'Lanjutkan New Deal Presiden Franklin D. Roosevelt, bangun WPA, pulihkan ekonomi dari Great Depression, lalu bangun armada dua samudra dan bom atom.',
    type: 'meta_historical',
    focusIds: [
      'usa-continue-new-deal',
      'usa-wpa',
      'usa-the-giant-wakes',
      'usa-arsenal-of-democracy',
      'usa-two-ocean-navy-act',
      'usa-manhattan-project'
    ]
  },
  {
    id: 'preset-usa-gold',
    countryId: 'usa',
    title: 'Jalur Alternatif: Republikan Alf Landon & Gold Standard',
    description: 'Pilih Alf Landon di 1936, cabut regulasi ekonomi New Deal, kembalikan standar emas dan isolasionisme ketat America First.',
    type: 'alternative_history',
    focusIds: [
      'usa-re-establish-gold-standard',
      'usa-wpa',
      'usa-the-giant-wakes'
    ]
  },

  // UK PRESETS
  {
    id: 'preset-eng-meta',
    countryId: 'eng',
    title: 'Meta Pertahanan Britannia & Kepemimpinan Churchill',
    description: 'Bangun pabrik militer bayangan, pasang radar Chain Home di Dover, kolaborasi teknologi Tizard dengan AS, dan angkat Winston Churchill memimpin aliansi Sekutu.',
    type: 'meta_historical',
    focusIds: [
      'eng-limited-rearmament',
      'eng-shadow-industry',
      'eng-radar-stations',
      'eng-tizard-mission',
      'eng-war-committee'
    ]
  },

  // JAPAN PRESETS
  {
    id: 'preset-jap-meta',
    countryId: 'jap',
    title: 'Meta Historis: Perang Tiongkok & Southern Expansion',
    description: 'Bersihkan faksi Kodoha, gandeng Zaibatsu, taklukkan Tiongkok lewat Marco Polo Bridge, kembangkan Zero Fighter, lalu serbu wilayah kaya minyak Hindia Belanda.',
    type: 'meta_historical',
    focusIds: [
      'jap-purge-kodoha',
      'jap-guide-zaibatsus',
      'jap-zero-fighter',
      'jap-marco-polo-bridge',
      'jap-southern-expansion'
    ]
  },
  {
    id: 'preset-jap-north',
    countryId: 'jap',
    title: 'Jalur Alternatif: Hokushin-ron (Serang Soviet di Utara)',
    description: 'Dukung faksi Kodoha, abaikan perairan selatan, fokuskan seluruh kekuatan infanteri darat untuk menyerbu Vladivostok dan Siberia Uni Soviet bersama Jerman.',
    type: 'alternative_history',
    focusIds: [
      'jap-support-kodoha',
      'jap-guide-zaibatsus'
    ]
  },

  // ITALY PRESETS
  {
    id: 'preset-ita-meta',
    countryId: 'ita',
    title: 'Meta Historis Mussolini: Mare Nostrum & Pakta Baja',
    description: 'Selesaikan perang Ethiopia dalam hitungan minggu, bangun industri Italia Utara, klaim kendali Laut Mediterania (Mare Nostrum), dan bentuk Pakta Baja dengan Hitler.',
    type: 'meta_historical',
    focusIds: [
      'ita-triumph-in-africa',
      'ita-industrial-development',
      'ita-mare-nostrum',
      'ita-pact-of-steel'
    ]
  },
  {
    id: 'preset-ita-depose',
    countryId: 'ita',
    title: 'Jalur Alternatif: Gulingkan Mussolini & Netral Monarki',
    description: 'Turunkan Benito Mussolini, serahkan kekuasaan kembali ke Raja Vittorio Emanuele III, hindari perang berdarah melawan Sekutu dan jalin aliansi independen.',
    type: 'alternative_history',
    focusIds: [
      'ita-triumph-in-africa',
      'ita-industrial-development',
      'ita-depose-mussolini'
    ]
  },

  // FRANCE PRESETS
  {
    id: 'preset-fra-meta',
    countryId: 'fra',
    title: 'Meta Pertahanan Prancis: Maginot & Reformasi Militer',
    description: 'Devaluasi Franc, bentuk Front Populer untuk stabilkan buruh, perpanjang benteng Maginot ke Belgia, dan tuntaskan Army Reform sebelum Wehrmacht menyerang.',
    type: 'meta_historical',
    focusIds: [
      'fra-devalue-franc',
      'fra-popular-front',
      'fra-extend-maginot-line',
      'fra-army-reform'
    ]
  },
  {
    id: 'preset-fra-national',
    countryId: 'fra',
    title: 'Jalur Alternatif: Blok Nasional Kanan & Militer Kuat',
    description: 'Pilih sayap kanan Blok Nasional, tolak konsesi jam kerja buruh, prioritaskan persenjataan keras dan aliansi agresif Little Entente.',
    type: 'alternative_history',
    focusIds: [
      'fra-devalue-franc',
      'fra-revive-national-bloc',
      'fra-extend-maginot-line'
    ]
  },

  // CHINA PRESETS
  {
    id: 'preset-chi-meta',
    countryId: 'chi',
    title: 'Meta Perang Ketahanan Total Tiongkok (United Front)',
    description: 'Terapkan Tiga Prinsip Rakyat, bentuk Front Persatuan Anti-Jepang bersama Mao dan warlords, reformasi perwira korup, dan amankan pabrik ke pedalaman Chongqing.',
    type: 'meta_historical',
    focusIds: [
      'chi-three-principles',
      'chi-united-front',
      'chi-army-reform',
      'chi-relocate-chongqing'
    ]
  }
];

export const FOCUS_PRESETS_DATA: FocusPresetPath[] = [
  ...BASE_FOCUS_PRESETS_DATA,
  ...EXPANDED_MAJOR_PRESETS,
  ...REGIONAL_POWERS_PRESETS,
  ...MINOR_EUROPEAN_PRESETS
];

