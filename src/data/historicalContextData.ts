export interface HistoricalMilestone {
  year: string;
  title: string;
  description: string;
  strategicImpact: string;
}

export interface MajorHistoricalContext {
  id: string;
  tag: string;
  name: string;
  commonName: string;
  leader: string;
  ideology: string;
  rulingParty: string;
  flagColors: [string, string];
  flagSymbol: string;
  briefHistoricalBackground: string;
  primaryObjective: string;
  secondaryObjectives: string[];
  keyHistoricalMilestones: HistoricalMilestone[];
  fatalFlaw: string;
  historicSuperweapon: string;
  archRivals: string[];
  startingSituationSummary: {
    manpower: string;
    industry: string;
    navy: string;
    airForce: string;
  };
}

export const HISTORICAL_CONTEXT_DATA: MajorHistoricalContext[] = [
  {
    id: 'ger',
    tag: 'GER',
    name: 'Reich Jerman (Deutsches Reich)',
    commonName: 'Jerman',
    leader: 'Adolf Hitler',
    ideology: 'Fascism (National Socialism)',
    rulingParty: 'NSDAP',
    flagColors: ['#1e293b', '#b91c1c'],
    flagSymbol: '✠',
    briefHistoricalBackground:
      'Pasca kekalahan Perang Dunia I dan Perjanjian Versailles yang mencekik (hilangnya wilayah Alsace-Lorraine, pembatasan tentara ke 100.000 prajurit tanpa tank/AU, serta demiliterisasi Rhineland), Jerman mengalami krisis ekonomi dan hiperinflasi dahsyat di era Republik Weimar. Kenaikan Adolf Hitler pada 1933 mengubah Jerman menjadi negara totaliter yang terobsesi dengan pemulihan kehormatan bangsa, penolakan Versailles, dan pencarian "Lebensraum" (ruang hidup) di Eropa Timur. Pada Januari 1936, Jerman memiliki industri baja terkuat di benua Eropa, namun terikat hutang rahasia (MEFO Bills) yang menuntut ekspansi militer berkelanjutan agar terhindar dari kebangkrutan ekonomi.',
    primaryObjective:
      'Memperoleh "Lebensraum" di Timur dengan Menaklukkan Uni Soviet & Menegakkan Hegemoni Fasis di Seluruh Benua Eropa.',
    secondaryObjectives: [
      'Remiliterisasi Rhineland dan aneksasi bangsa berbahasa Jerman (Anschluss Austria & Sudetenland).',
      'Menundukkan Prancis dan mengusir Britania Raya dari daratan Eropa.',
      'Mengamankan pasokan minyak mentah Kaukasus dan gandum Ukraina untuk kemandirian autarki.',
      'Menghancurkan ideologi Komunisme (Bolshevisme) hingga ke Pegunungan Ural.'
    ],
    keyHistoricalMilestones: [
      {
        year: 'Maret 1936',
        title: 'Remiliterisasi Rhineland',
        description: 'Jerman mengirim batalion Wehrmacht ke zona terdemiliterisasi Rhineland, menguji nyali Prancis dan Inggris tanpa perlawanan.',
        strategicImpact: 'Membuka perbatasan barat dan memungkinkan pembangunan Tembok Barat (Siegfried Line).'
      },
      {
        year: 'Maret 1938',
        title: 'Anschluss Austria',
        description: 'Penggabungan Austria ke dalam Reich Jerman secara damai di bawah sorak-sorai rakyat Wina.',
        strategicImpact: 'Menyerap 100.000 tentara Austria dan belasan pabrik sipil secara gratis.'
      },
      {
        year: 'Oktober 1938',
        title: 'Perjanjian Munich & Sudetenland',
        description: 'Inggris dan Prancis menyetujui penyerahan Sudetenland Cekoslowakia demi kebijakan peredaan (Appeasement).',
        strategicImpact: 'Meruntuhkan benteng pertahanan Cekoslowakia dan membuka jalan aneksasi total pada Maret 1939.'
      },
      {
        year: 'September 1939',
        title: 'Invasi Polandia (Pecah PD II)',
        description: 'Operasi Fall Weiss melancarkan taktik Blitzkrieg pertama di dunia, membagi Polandia bersama Uni Soviet.',
        strategicImpact: 'Inggris dan Prancis menyatakan perang resmi terhadap Jerman.'
      },
      {
        year: 'Mei - Juni 1940',
        title: 'Pertempuran Prancis (Fall Gelb)',
        description: 'Wehrmacht melewati Garis Maginot melalui Hutan Ardennes di Belgia, mengepung Sekutu di Dunkirk dan merebut Paris dalam 6 pekan.',
        strategicImpact: 'Prancis kapitulasi; terbentuk rezim boneka Vichy dan Jerman menguasai seluruh pesisir Atlantik.'
      },
      {
        year: 'Juni 1941',
        title: 'Operasi Barbarossa (Invasi Uni Soviet)',
        description: 'Invasi militer terbesar dalam sejarah manusia dengan 3,8 juta tentara menyerang di sepanjang garis perbatasan 2.900 km.',
        strategicImpact: 'Menentukan nasib perang dunia dalam duel hidup-mati antara Fasisme dan Komunisme.'
      }
    ],
    fatalFlaw: 'Kekurangan kronis Minyak dan Karet alam. Begitu Sekutu memblokade lautan dan perang berubah menjadi perang atrisi multi-tahun, mesin perang Jerman kehabisan bahan bakar.',
    historicSuperweapon: 'Divisi Panzer terkoordinasi radio dan armada U-Boat Wolfpack yang hampir memotong urat nadi pasokan Inggris di Samudra Atlantik.',
    archRivals: ['Uni Soviet (SOV)', 'Britania Raya (ENG)', 'Amerika Serikat (USA)'],
    startingSituationSummary: {
      manpower: 'Tinggi (1,15 Juta aktif, batas konskripsi fleksibel)',
      industry: 'Sangat Kuat (31 Civs, 28 Mils, 10 Docks; boosted MEFO Bills)',
      navy: 'Kecil tapi Modern (Kriegsmarine bergantung pada U-boat & Pocket Battleship)',
      airForce: 'Unggul (Luftwaffe terlatih dengan doktrin CAS terdepan di dunia)'
    }
  },
  {
    id: 'sov',
    tag: 'SOV',
    name: 'Uni Soviet (SSSR)',
    commonName: 'Uni Soviet',
    leader: 'Iosif Stalin',
    ideology: 'Communism (Stalinism)',
    rulingParty: 'VKP(b) - Partai Komunis',
    flagColors: ['#991b1b', '#d97706'],
    flagSymbol: '☭',
    briefHistoricalBackground:
      'Lahir dari bara Revolusi Bolshevik 1917 dan Perang Saudara Rusia, Uni Soviet di bawah Josef Stalin menjalani program Rencana Lima Tahun (Five-Year Plans) yang memaksakan industrialisasi kilat dan kolektivisasi pertanian berdarah. Menjelang 1936, Uni Soviet telah menjelma menjadi raksasa industri baja dan traktor, namun dilanda ketakutan paranoia Stalin yang berujung pada Pembersihan Militer Besar-besaran (The Great Purge 1937-1938), di mana ribuan perwira tinggi dan marsekal Tentara Merah dieksekusi. Terjepit antara Poros Fasis di barat dan agresi Jepang di timur, Moskow bertekad membangun benteng sosialisme sembari menanti kapitalisme saling menghancurkan diri.',
    primaryObjective:
      'Mempertahankan Tanah Air Sosialis dari Ancaman Invasi Fasis & Memperluas Tirai Besi ke Seluruh Benua Eropa.',
    secondaryObjectives: [
      'Menuntaskan Great Purge tanpa meruntuhkan moral dan organisasi Tentara Merah.',
      'Mengamankan zona penyangga strategis di Finlandia (Karelia), Negara Baltik, dan Bessarabia.',
      'Memindahkan seluruh basis industri berat ke Pegunungan Ural dan Siberia saat invasi musuh meletus.',
      'Merebut Berlin dan mengibarkan bendera kemenangan di atas Reichstag.'
    ],
    keyHistoricalMilestones: [
      {
        year: '1936 - 1938',
        title: 'The Great Purge (Pembersihan Militer)',
        description: 'Stalin mengeksekusi 3 dari 5 Marsekal dan puluhan ribu komandan divisi karena tuduhan pengkhianatan Trotskis.',
        strategicImpact: 'Memberikan debuff "Officers Purged" yang melumpuhkan organisasi dan recovery Tentara Merah hingga 1941.'
      },
      {
        year: 'Agustus 1939',
        title: 'Pakta Molotov-Ribbentrop',
        description: 'Perjanjian non-agresi rahasia antara Soviet dan Jerman yang membagi Polandia, Baltik, dan Finlandia.',
        strategicImpact: 'Memberi waktu emas bagi Soviet untuk mempercepat produksi tank T-34 dan menunda perang.'
      },
      {
        year: 'November 1939',
        title: 'Perang Musim Dingin (Winter War) Finlandia',
        description: 'Tentara Merah menyerang Finlandia dan menderita kerugian korban 5x lipat akibat garis Mannerheim dan taktik gerilya Motti.',
        strategicImpact: 'Memperlihatkan kelemahan doktrin Soviet kepada Hitler, memicu keputusan invasi Barbarossa.'
      },
      {
        year: 'Oktober - Desember 1941',
        title: 'Pertempuran Mempertahankan Moskow',
        description: 'Wehrmacht berhasil didorong mundur di gerbang Moskow oleh divisi Siberia di tengah musim dingin beku -30°C.',
        strategicImpact: 'Pertama kalinya mitos tak terkalahkan Blitzkrieg Jerman berhasil dipatahkan.'
      },
      {
        year: 'November 1942 - Februari 1943',
        title: 'Pertempuran Stalingrad (Operasi Uranus)',
        description: 'Soviet mengepung dan memusnahkan seluruh Pasukan ke-6 Jerman (300.000 prajurit) di tepi Sungai Volga.',
        strategicImpact: 'Titik balik terbesar Perang Dunia II di Front Timur.'
      },
      {
        year: 'Mei 1945',
        title: 'Jatuhnya Berlin',
        description: 'Tentara Merah membombardir pusat komando Hitler dan mengakhiri Reich Ketiga di Eropa.',
        strategicImpact: 'Uni Soviet muncul sebagai negara adidaya nuklir penguasa separuh Eropa.'
      }
    ],
    fatalFlaw: 'Debuff organisasi militer parah di awal game (Officers Purged) serta infrastruktur rel kereta api yang rapuh di wilayah pedalaman luas.',
    historicSuperweapon: 'Volume produksi tak terbatas dari Tank Medium legendaris T-34 dan roket artileri Katyusha ("Stalin Organ").',
    archRivals: ['Reich Jerman (GER)', 'Kekaisaran Jepang (JAP)'],
    startingSituationSummary: {
      manpower: 'Terbesar di Bumi (Bisa memobilisasi 15+ juta jiwa tanpa penalti)',
      industry: 'Raksasa Potensial (36 Civs, 31 Mils, sumber daya tak terbatas di Ural)',
      navy: 'Terbatas (Armada laut terkurung di Laut Baltik, Laut Hitam, dan Vladivostok)',
      airForce: 'Besar tapi Usang (Ribuan I-16 butuh modernisasi cepat ke Yak-9 dan Il-2)'
    }
  },
  {
    id: 'usa',
    tag: 'USA',
    name: 'Amerika Serikat (United States of America)',
    commonName: 'Amerika Serikat',
    leader: 'Franklin D. Roosevelt',
    ideology: 'Democratic (Liberal Democracy)',
    rulingParty: 'Partai Demokrat',
    flagColors: ['#1e3a8a', '#b91c1c'],
    flagSymbol: '★',
    briefHistoricalBackground:
      'Dihantam keras oleh Depresi Besar (Great Depression 1929) yang membuat jutaan warganya menganggur, Amerika Serikat di tahun 1936 menerapkan kebijakan reformasi "New Deal" di bawah Presiden Franklin D. Roosevelt. Opini publik dan Kongres sangat isolasionis, didukung oleh rangkaian Undang-Undang Netralitas (Neutrality Acts) yang melarang keterlibatan militer dalam perselisihan luar negeri. Namun di balik kelemahan angkatan daratnya yang kecil (peringkat ke-18 di dunia, lebih kecil dari Portugal), AS menyimpan kapasitas industri baja, minyak mentah, dan otomotif terbesar di bumi yang hanya menunggu momentum untuk dibangunkan menjadi "Arsenal of Democracy".',
    primaryObjective:
      'Membangunkan Raksasa Industri "Arsenal of Democracy", Membebaskan Eropa Barat & Menghancurkan Kekaisaran Jepang di Pasifik.',
    secondaryObjectives: [
      'Menghapus sisa-sisa krisis Great Depression melalui reformasi ekonomi bertahap.',
      'Meloloskan undang-undang Lend-Lease untuk menyuplai Inggris, Soviet, dan Tiongkok dengan ribuan alutsista.',
      'Membangun Armada Dua Samudra (Two-Ocean Navy) dengan puluhan Kapal Induk kelas Essex.',
      'Memimpin Proyek Manhattan untuk menciptakan senjata nuklir pertama di dunia.'
    ],
    keyHistoricalMilestones: [
      {
        year: '1936 - 1938',
        title: 'Perjuangan Mengatasi Great Depression',
        description: 'FDR memperluas program New Deal di tengah penolakan Mahkamah Agung dan kubu isolasionis Amerika.',
        strategicImpact: 'Secara bertahap mengurangi penalti pabrik sipil dan pengangguran nasional.'
      },
      {
        year: 'Maret 1941',
        title: 'Pemberlakuan Lend-Lease Act',
        description: 'AS menyalurkan bantuan alutsista bernilai puluhan miliar dollar ke negara-negara yang melawan Poros.',
        strategicImpact: 'Inggris dan Uni Soviet berhasil bertahan hidup dari kebangkrutan logistik.'
      },
      {
        year: '7 Desember 1941',
        title: 'Serangan Pearl Harbor',
        description: 'Armada kapal induk Jepang menyerang pangkalan AL AS di Hawaii secara mendadak tanpa deklarasi perang.',
        strategicImpact: 'Isolasionisme lenyap seketika; AS secara resmi bergabung ke Blok Sekutu.'
      },
      {
        year: 'Juni 1942',
        title: 'Pertempuran Midway',
        description: 'Pesawat pembom tukik AS menenggelamkan 4 kapal induk armada utama Jepang dalam waktu 5 menit.',
        strategicImpact: 'Mematahkan inisiatif strategis Jepang di Samudra Pasifik secara permanen.'
      },
      {
        year: '6 Juni 1944',
        title: 'D-Day (Operasi Overlord Normandy)',
        description: 'Invasi amfibi Sekutu terbesar dalam sejarah melintasi Selat Inggris menuju pesisir Prancis.',
        strategicImpact: 'Membuka Front Barat kedua yang menjepit Jerman hingga kapitulasi.'
      },
      {
        year: 'Agustus 1945',
        title: 'Bom Atom Hiroshima & Nagasaki',
        description: 'Pembom B-29 Enola Gay menjatuhkan bom atom "Little Boy" dan "Fat Man" ke daratan Jepang.',
        strategicImpact: 'Jepang menyerah tanpa syarat; mengakhiri Perang Dunia II.'
      }
    ],
    fatalFlaw: 'Terkunci oleh penalti politik Great Depression (-50% Output) dan isolasionisme Kongres yang melarang mobilisasi perang hingga World Tension tinggi atau diserang.',
    historicSuperweapon: 'Pabrik perakitan tanpa batas (produksi ribuan kapal kargo Liberty Ships dan pembom strategis B-17/B-29 Flying Fortress) serta Bom Atom.',
    archRivals: ['Kekaisaran Jepang (JAP)', 'Reich Jerman (GER)'],
    startingSituationSummary: {
      manpower: 'Sangat Besar (Bisa dimobilisasi penuh begitu hukum Draft diloloskan)',
      industry: 'Raksasa Tertidur (125 Civs tapi 50% terkunci, potensi 350+ pabrik)',
      navy: 'Superpower Laut (Armada tempur Battleship dan Cruiser kelas dunia)',
      airForce: 'Kapasitas Riset dan Produksi Pembom Strategis tercanggih di dunia'
    }
  },
  {
    id: 'eng',
    tag: 'ENG',
    name: 'Britania Raya & Persemakmuran (United Kingdom)',
    commonName: 'Britania Raya / Inggris',
    leader: 'Neville Chamberlain / Winston Churchill',
    ideology: 'Democratic (Constitutional Monarchy)',
    rulingParty: 'Partai Konservatif',
    flagColors: ['#1e3a8a', '#dc2626'],
    flagSymbol: '♚',
    briefHistoricalBackground:
      'Menguasai seperempat daratan bumi dan seperempat populasi dunia melalui Kerajaan Britania Raya (British Empire), London di tahun 1936 masih terluka parah oleh pembantaian parit Perang Dunia I. Pemerintah di bawah Neville Chamberlain menempuh kebijakan "Appeasement" (peredaan), berusaha meredam tuntutan ekspansif Hitler demi menghindari pertumpahan darah baru. Garis pertahanan Inggris bertumpu pada superioritas armada laut Royal Navy dan jaringan dominasi pangkalan global di Gibraltar, Malta, Terusan Suez, dan Singapura. Namun, membentangnya kekaisaran di 5 benua membuat pasokan minyak dan karetnya sangat rentan terhadap perang kapal selam dan penaklukan pangkalan.',
    primaryObjective:
      'Menjaga Keutuhan Imperium Global, Memblokade Laut Poros & Menjadi Benteng Terakhir Demokrasi di Eropa Barat.',
    secondaryObjectives: [
      'Mempertahankan kendali atas chokepoints maritim vital dunia: Selat Gibraltar, Terusan Suez, dan Singapura.',
      'Memenangkan Pertempuran Britania di udara menggunakan radar terpadu dan pesawat tempur Spitfire.',
      'Menjaga jalur konvoi Samudra Atlantik dari sergapan kapal selam Jerman.',
      'Mengorkestrasi koalisi global Sekutu untuk membebaskan benua Eropa dari tirani Fasis.'
    ],
    keyHistoricalMilestones: [
      {
        year: '1936 - 1938',
        title: 'Era Kebijakan Appeasement',
        description: 'Chamberlain menolak konfrontasi militer dan menandatangani Perjanjian Munich dengan keyakinan "Peace for our time".',
        strategicImpact: 'Memberi waktu bagi industri Inggris mengembangkan pesawat tempur modern Supermarine Spitfire.'
      },
      {
        year: 'Mei 1940',
        title: 'Churchill Menjadi Perdana Menteri & Dunkirk',
        description: 'Winston Churchill naik memimpin dengan pidato "Blood, Toil, Tears and Sweat"; ratusan kapal sipil menyelamatkan 330.000 tentara di Dunkirk.',
        strategicImpact: 'Inggris menolak berdamai dengan Hitler dan memilih bertarung sendirian.'
      },
      {
        year: 'Juli - Oktober 1940',
        title: 'Pertempuran Britania (Battle of Britain)',
        description: 'Duel udara habis-habisan antara RAF dan Luftwaffe di atas langit Inggris; sistem radar Dowding membuktikan keunggulannya.',
        strategicImpact: 'Hitler membatalkan rencana invasi Operasi Singa Laut (Sealion).'
      },
      {
        year: '1940 - 1943',
        title: 'Pertempuran Atlantik',
        description: 'Pertempuran laut terpanjang dalam sejarah; pengawalan konvoi bahan makanan dan alutsista melawan U-boat Jerman.',
        strategicImpact: 'Penemuan mesin dekripsi enigma dan Sonar ASDIC memenangkan perang konvoi.'
      },
      {
        year: 'November 1942',
        title: 'Pertempuran El Alamein Kedua',
        description: 'Jenderal Montgomery mengalahkan Korps Afrika pimpinan Rommel di padang pasir Mesir.',
        strategicImpact: 'Mengamankan Terusan Suez dan ladang minyak Timur Tengah untuk Sekutu.'
      }
    ],
    fatalFlaw: 'Manpower domestik kepulauan Inggris sangat terbatas dan front perang terbentang terlalu luas dari Pasifik hingga Atlantik.',
    historicSuperweapon: 'Armada Royal Navy terluas di dunia, jaringan radar rantai Home Chain, serta pemecah sandi Enigma di Bletchley Park.',
    archRivals: ['Reich Jerman (GER)', 'Kerajaan Italia (ITA)', 'Kekaisaran Jepang (JAP)'],
    startingSituationSummary: {
      manpower: 'Sedang (Bergantung pada divisi dominion India, Kanada, dan Australia)',
      industry: 'Kuat & Mengakar (34 Civs, 19 Mils, 21 Docks + akses karet Malaya)',
      navy: 'Raja Lautan (Armada permukaan terbesar dengan puluhan Battleship & Carrier)',
      airForce: 'Teknologi Tinggi (RAF memiliki Spitfire, Hurricane, dan doktrin radar canggih)'
    }
  },
  {
    id: 'jap',
    tag: 'JAP',
    name: 'Kekaisaran Jepang (Dai Nippon Teikoku)',
    commonName: 'Jepang',
    leader: 'Hirohito / Hideki Tojo',
    ideology: 'Fascism (Militarism)',
    rulingParty: 'Taisei Yokusankai',
    flagColors: ['#ffffff', '#b91c1c'],
    flagSymbol: '☼',
    briefHistoricalBackground:
      'Dipimpin oleh Kaisar Hirohito yang diagungkan sebagai dewa hidup, Kekaisaran Jepang di dekade 1930-an dikendalikan oleh faksi militer radikal. Terbelah oleh perseteruan sengit antara Angkatan Darat (IJA - faksi Hokushin-ron yang ingin menyerang Soviet) dan Angkatan Laut (IJN - faksi Nanshin-ron yang ingin merebut minyak Asia Tenggara). Setelah menganeksasi Manchuria pada 1931, Jepang bernafsu membentuk "Kawasan Kemakmuran Bersama Asia Timur Raya" (Greater East Asia Co-Prosperity Sphere). Masalah eksistensial terbesar Tokyo adalah ketiadaan sumber daya minyak mentah dan baja domestik: 80% minyaknya diimpor dari Amerika Serikat. Jika keran minyak itu ditutup, armada perang Jepang akan lumpuh dalam tempo dua tahun.',
    primaryObjective:
      'Membentuk "Kawasan Kemakmuran Bersama Asia Timur Raya", Menaklukkan Tiongkok & Merebut Minyak Hindia Belanda.',
    secondaryObjectives: [
      'Menyelesaikan Perang Tiongkok-Jepang Kedua dan menundukkan rezim Chiang Kai-shek.',
      'Melumpuhkan armada Pasifik Amerika Serikat di Pearl Harbor melalui serangan udara mendadak.',
      'Menaklukkan benteng Inggris di Singapura dan merebut ladang minyak Palembang/Tarakan di Hindia Belanda.',
      'Membangun perimeter pertahanan kepulauan Pasifik yang tak tertembus kapal selam Sekutu.'
    ],
    keyHistoricalMilestones: [
      {
        year: 'Februari 1936',
        title: 'Insiden 26 Februari (Kudeta Militer Kodo-ha)',
        description: 'Perwira muda AD membunuh pejabat kabinet moderat di Tokyo; militer mengokohkan kontrol absolut atas kekaisaran.',
        strategicImpact: 'Menyingkirkan faksi moderat dan mempercepat persiapan perang ekspansi.'
      },
      {
        year: 'Juli 1937',
        title: 'Insiden Jembatan Marco Polo',
        description: 'Bentrokan bersenjata di dekat Beijing memicu perang skala penuh antara Jepang dan Tiongkok.',
        strategicImpact: 'Menyeret ratusan ribu tentara Jepang ke dalam kubangan perang atrisi tanpa akhir di daratan Tiongkok.'
      },
      {
        year: 'Mei - September 1939',
        title: 'Pertempuran Khalkhin Gol (Nomonhan)',
        description: 'Pertempuran tank dahsyat di perbatasan Mongolia di mana Jenderal Zhukov memukul telak pasukan Jepang.',
        strategicImpact: 'Menghancurkan faksi AD yang ingin menyerang Soviet; mengalihkan prioritas Jepang ke arah selatan (Asia Tenggara).'
      },
      {
        year: 'Juli 1941',
        title: 'Embargo Minyak Menyeluruh oleh AS',
        description: 'Presiden Roosevelt membekukan aset Jepang dan memutus 90% pasokan minyak setelah Jepang menduduki Indochina.',
        strategicImpact: 'Memaksa Jepang memilih antara menyerah secara diplomatis atau menyerang Sekutu.'
      },
      {
        year: 'Desember 1941',
        title: 'Serangan Pearl Harbor & Jatuhnya Singapura',
        description: 'Jepang membom pangkalan AL AS di Hawaii dan merebut benteng Singapura pimpinan Inggris hanya dalam 70 hari.',
        strategicImpact: 'Jepang menguasai seluruh ladang minyak, karet, dan timah di Asia Tenggara.'
      },
      {
        year: 'Juni 1942',
        title: 'Kekalahan di Pertempuran Midway',
        description: 'Kehilangan 4 kapal induk armada elit (Akagi, Kaga, Soryu, Hiryu) membalikkan arah perang Pasifik.',
        strategicImpact: 'Inisiatif udara-laut berpindah ke tangan Amerika Serikat.'
      }
    ],
    fatalFlaw: 'Ketergantungan absolut 100% pada impor Minyak, Karet, dan Baja mentah, serta persaingan destruktif tiada henti antara Angkatan Darat (IJA) dan Laut (IJN).',
    historicSuperweapon: 'Armada Kapal Induk Mobile Strike (Kido Butai), pesawat tempur legendaris A6M Zero, dan Torpedo Long Lance yang tak tertandingi dalam pertempuran malam.',
    archRivals: ['Amerika Serikat (USA)', 'Republik Tiongkok (CHI)', 'Britania Raya (ENG)'],
    startingSituationSummary: {
      manpower: 'Tinggi (Didukung doktrin kepatuhan mutlak Bushido)',
      industry: 'Kuat Maritim (25 Civs, 19 Mils, 22 Docks; galangan kapal kelas satu)',
      navy: 'Armada Kapal Induk Paling Mematikan di Pasifik pada 1936-1941',
      airForce: 'Pilot Elit (Zero memiliki mobilitas dogfight tertinggi di awal perang)'
    }
  },
  {
    id: 'ita',
    tag: 'ITA',
    name: 'Kerajaan Italia (Regno d\'Italia)',
    commonName: 'Italia',
    leader: 'Benito Mussolini',
    ideology: 'Fascism',
    rulingParty: 'Partito Nazionale Fascista (PNF)',
    flagColors: ['#16a34a', '#dc2626'],
    flagSymbol: '🦅',
    briefHistoricalBackground:
      'Sebagai pelopor ideologi Fasisme di bawah "Il Duce" Benito Mussolini sejak 1922, Italia merasa dicurangi oleh Sekutu dalam Perjanjian Perdamaian 1919 (dikenal sebagai "Kemenangan yang Dimutilasi" / Vittoria Mutilata). Mussolini berambisi membangkitkan kembali kejayaan Kekaisaran Romawi Kuno dengan mengubah Laut Mediterania menjadi "Mare Nostrum" (Laut Kita). Mengawali 1936 di tengah invasi kolonial berdarah ke Ethiopia, Italia memposisikan diri sebagai sekutu terdekat Jerman melalui pembentukan Poros Roma-Berlin. Namun, industri berat Italia sangat rapuh, minim bahan bakar dan baja, serta dipimpin oleh korps jenderal yang korup dan terpecah.',
    primaryObjective:
      'Menguasai Laut Mediterania ("Mare Nostrum"), Mengusir Inggris dari Terusan Suez & Merekonstruksi Imperium Romawi.',
    secondaryObjectives: [
      'Menuntaskan aneksasi Ethiopia dan mengamankan tanduk Afrika.',
      'Mengintervensi Perang Saudara Spanyol untuk memastikan kemenangan Nasionalis Franco.',
      'Mencaplok Albania, semenanjung Yunani, dan wilayah pantai Dalmatia Yugoslavia.',
      'Mengamankan pasokan minyak mentah Libya dan Timur Tengah.'
    ],
    keyHistoricalMilestones: [
      {
        year: 'Mei 1936',
        title: 'Penaklukan Addis Ababa (Ethiopia)',
        description: 'Italia memenangkan perang kolonial kedua melawan Kekaisaran Abyssinia menggunakan senjata kimia dan pemboman udara.',
        strategicImpact: 'Mussolini mendeklarasikan berdirinya Kekaisaran Italia Fasis.'
      },
      {
        year: '1936 - 1939',
        title: 'Intervensi Perang Saudara Spanyol',
        description: 'Italia mengirim 70.000 pasukan sukarelawan (Corpo Truppe Volontarie) dan ratusan pesawat untuk membantu Franco.',
        strategicImpact: 'Menguras kas devisa dan persediaan alutsista Italia menjelang PD II.'
      },
      {
        year: 'April 1939',
        title: 'Invasi Kilat Albania',
        description: 'Italia menduduki Albania dalam waktu 5 hari dan mengangkat Raja Victor Emmanuel III sebagai penguasa.',
        strategicImpact: 'Menciptakan batu loncatan strategis untuk invasi ke Yunani.'
      },
      {
        year: 'Juni 1940',
        title: 'Deklarasi Perang terhadap Prancis & Inggris',
        description: 'Mussolini menyerang Prancis yang sedang sekarat untuk mendapatkan jatah klaim wilayah di meja perundingan.',
        strategicImpact: 'Italia resmi memasuki Perang Dunia II di pihak Blok Poros.'
      },
      {
        year: '1940 - 1941',
        title: 'Bencana Perang di Yunani & Afrika Utara',
        description: 'Serangan Italia ke Yunani terpukul mundur dan Tentara ke-10 di Libya dihancurkan Inggris dalam Operasi Compass.',
        strategicImpact: 'Memaksa Jerman turun tangan mengirimkan Erwin Rommel dan Korps Afrika.'
      },
      {
        year: 'Juli 1943',
        title: 'Invasi Sekutu ke Sisilia & Kejatuhan Mussolini',
        description: 'Dewan Fasis Tertinggi menggulingkan Mussolini setelah pendaratan pasukan Sekutu di Italia selatan.',
        strategicImpact: 'Italia pecah menjadi dua: Republik Salo di utara dan pemerintah Sekutu di selatan.'
      }
    ],
    fatalFlaw: 'Basis industri berat sangat kecil (kekurangan baja dan batu bara), doktrin alutsista usang, serta moral pertempuran tentara yang rendah.',
    historicSuperweapon: 'Armada kapal selam mini dan pasukan katak komando (Decima MAS) yang berhasil melumpuhkan kapal perang Inggris di Alexandria.',
    archRivals: ['Britania Raya (ENG)', 'Prancis (FRA)'],
    startingSituationSummary: {
      manpower: 'Cukup Besar (Tradisi militer Mediterania kuat)',
      industry: 'Paling Lemah di antara 7 Majors (20 Civs, 19 Mils, 11 Docks)',
      navy: 'Modern tapi Takut Berlayar (Regia Marina memiliki kapal perang cepat tapi minim bahan bakar)',
      airForce: 'Banyak Pesawat Bersayap Ganda (Regia Aeronautica perlu modernisasi ke monoplane)'
    }
  },
  {
    id: 'fra',
    tag: 'FRA',
    name: 'Republik Prancis (République française)',
    commonName: 'Prancis',
    leader: 'Albert Lebrun / Édouard Daladier',
    ideology: 'Democratic',
    rulingParty: 'Parti Radical / Front Populaire',
    flagColors: ['#1e3a8a', '#dc2626'],
    flagSymbol: '⚜',
    briefHistoricalBackground:
      'Pemenang Perang Dunia I dengan korban paling berdarah (kehilangan 1,4 juta pemuda terbaiknya), Prancis pada 1936 dihantui trauma masa lalu dan penurunan angka kelahiran parah. Memiliki angkatan darat di atas kertas paling ditakuti di Eropa dengan ribuan tank dan benteng baja termodern di dunia: Garis Maginot (Ligne Maginot). Namun, secara internal Prancis lumpuh oleh polarisasi politik sengit antara sayap kiri Front Populaire dan faksi sayap kanan, yang mengakibatkan seringnya pergantian kabinet dan pemogokan industri. Doktrin militernya kaku dan defensif, berkeyakinan keliru bahwa perang masa depan akan berlangsung lambat seperti PD I.',
    primaryObjective:
      'Mempertahankan Keutuhan Kedaulatan Republik, Membendung Agresi Jerman di Garis Maginot & Menjaga Imperium Koloni Afrika.',
    secondaryObjectives: [
      'Menyelesaikan krisis stabilitas domestik dan perpecahan politik ("Disjointed Government").',
      'Memperpanjang jaringan benteng Maginot hingga ke pesisir Belgia dan Selat Inggris.',
      'Menjalin aliansi militer tak terpisahkan dengan Britania Raya dan negara-negara Cekoslowakia/Polandia.',
      'Memodernisasi doktrin tank dari infanteri pendukung lambat ke divisi lapis baja independen.'
    ],
    keyHistoricalMilestones: [
      {
        year: 'Mei 1936',
        title: 'Kemenangan Front Populaire Léon Blum',
        description: 'Koalisi sayap kiri memenangkan pemilu dan menandatangani Perjanjian Matignon (40 jam kerja sepekan).',
        strategicImpact: 'Memperbaiki hak buruh namun sempat memotong kapasitas produksi pabrik senjata Prancis.'
      },
      {
        year: 'September 1939',
        title: 'Deklarasi Perang & Serangan Saar Terbatas',
        description: 'Prancis menyatakan perang setelah invasi Polandia, namun hanya menyerang beberapa mil ke wilayah Jerman lalu mundur.',
        strategicImpact: 'Memasuki era "Perang Palsu" (Phoney War / Drôle de guerre) yang mengikis kewaspadaan moral.'
      },
      {
        year: 'Mei 1940',
        title: 'Bencana Terobosan Sedan & Ardennes',
        description: 'Jenderal Heinz Guderian menyeberangi Sungai Meuse di Sedan dengan divisi Panzer, memotong jalur pasukan utama Sekutu di Belgia.',
        strategicImpact: 'Komando tertinggi Prancis lumpuh oleh kepanikan komunikasi.'
      },
      {
        year: '14 Juni 1940',
        title: 'Kejatuhan Paris & Kapitulasi',
        description: 'Pasukan Wehrmacht berbaris di Champs-Élysées; Marsekal Pétain menandatangani gencatan senjata di gerbong Compiegne.',
        strategicImpact: 'Prancis terbelah menjadi Zona Pendudukan Jerman dan Rezim Vichy; Jenderal De Gaulle mendeklarasikan Prancis Merdeka (Free France).'
      },
      {
        year: 'Agustus 1944',
        title: 'Pembebasan Paris',
        description: 'Divisi Lapis Baja ke-2 pimpinan Jenderal Leclerc membebaskan Paris bersama pasukan pemberontak bawah tanah FFI.',
        strategicImpact: 'Republik Prancis bangkit kembali menduduki kursi anggota tetap Dewan Keamanan PBB.'
      }
    ],
    fatalFlaw: 'Debuff nasional mematikan: "Disjointed Government" (stabilitas sangat rendah dan PP gain -0.5/hari) serta doktrin militer pasif yang membenci manuver cepat.',
    historicSuperweapon: 'Sistem perbentengan baja terkuat di dunia (Garis Maginot Level 10) dan tank berat Char B1 bis yang tahan tembakan anti-tank standar 1940.',
    archRivals: ['Reich Jerman (GER)', 'Kerajaan Italia (ITA)'],
    startingSituationSummary: {
      manpower: 'Kritis (Penurunan demografi pemuda pasca PD I)',
      industry: 'Menengah ke Atas (33 Civs, 10 Mils, 13 Docks + cadangan baja melimpah)',
      navy: 'Kuat & Modern (Armada laut Marine Nationale terkuat ke-4 di dunia)',
      airForce: 'Tertinggal (Produksi pesawat lambat karena pemogokan industri di 1936-38)'
    }
  }
];

export const getMajorHistoricalContext = (idOrTag: string): MajorHistoricalContext => {
  const match = HISTORICAL_CONTEXT_DATA.find(
    c => c.id.toLowerCase() === idOrTag.toLowerCase() || c.tag.toUpperCase() === idOrTag.toUpperCase()
  );
  return match || HISTORICAL_CONTEXT_DATA[0];
};
