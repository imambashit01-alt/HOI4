import { CountryStrategy } from '../types';

export const NORDIC_AND_BALKAN_STRATEGIES: CountryStrategy[] = [
  {
    id: 'swe',
    tag: 'SWE',
    name: 'Kerajaan Swedia (Sweden)',
    faction: 'Netral / Nordic League',
    difficulty: 'Sedang',
    flagColors: ['#1e3a8a', '#eab308'],
    flagSymbol: '👑',
    ideology: 'Democratic',
    leader: 'Per Albin Hansson',
    startingCivilianFactories: 16,
    startingMilitaryFactories: 4,
    startingDockyards: 3,
    doctrineRecommendation: 'Superior Firepower atau Grand Battleplan',
    focusPath1936: [
      'The People’s Home (Folkhemmet)',
      'Kiruna Iron Ore (Monopoli Bijih Besi)',
      'Bofors 40mm (Raksasa Meriam AA)',
      'Scania-Vabis & Volvo (Motorisasi Truk)',
      'Armed Neutrality (Netralitas Bersenjata)',
      'Nordic Cooperation (Kooperasi Nordik)',
      'Protect the Baltic'
    ],
    industryStrategy: 'Kuasai tambang bijih besi Kiruna di utara! Jerman dan Sekutu berebut membeli bijih besimu. Manfaatkan perusahaan senjata legendaris Bofors untuk mengekspor meriam Anti-Air ke seluruh penjuru dunia demi mendapatkan puluhan pabrik sipil devisa.',
    militaryStrategy: 'Pertahankan "Armed Neutrality" (Netralitas Bersenjata). Bangun korps pertahanan salju berteknologi tinggi dengan meriam Bofors 40mm dan tank ringan Stridsvagn. Jika ingin berekspansi, satukan Skandinavia di bawah panji Kalmar Union!',
    keyChallenges: [
      'Jerman membutuhkan bijih besi Kiruna dan siap menginvasi jika pasokan dihentikan',
      'Uni Soviet mengancam Laut Baltik setelah menguasai Finlandia',
      'Kapasitas manpower terbatas'
    ],
    proTips: 'Meriam Bofors 40mm adalah salah satu alutsista terbaik di game. Lengkapi setiap divisi dengan Support AA Bofors untuk menembus tank ringan Jerman dan menjatuhkan pesawat Sekutu!',
    geopoliticalContext: 'Negara netral paling makmur dan berteknologi tinggi di Eropa Utara. Tambang bijih besi Kiruna adalah urat nadi produksi baja Jerman. Swedia mempertahankan netralitasnya dengan prinsip "siap tempur sampai titik darah penghabisan jika kedaulatan dilanggar".',
    howToGetRich: {
      civSnowball: 'Fokuskan pembangunan di Stockholm dan Gothenburg. Monopoli bijih besi Kiruna memberimu puluhan civs gratis dari perdagangan Jerman dan Inggris.',
      resourceStrategy: 'Swedia adalah eksportir Bijih Besi dan Tungsten terkaya di Skandinavia. Ekspor dengan Free Trade untuk mendongkrak riset teknologi.',
      tradePolicy: 'Free Trade adalah kunci kekayaan Swedia; kamu akan kebanjiran civs devisa asing tanpa perlu berperang.',
      warPlunder: 'Jika menyatukan Skandinavia (Nordic League), kamu menyerap industri dan sumber daya Norwegia, Denmark, dan Finlandia.'
    },
    howToWinWar: {
      recommendedDoctrine: 'Superior Firepower (Integrated Support) untuk memaksimalkan daya hancur artileri dan AA Bofors.',
      recommendedTemplate: 'Skåne Elit: 9 Infanteri + 2 Artileri + Support Bofors AA, Engineer, & Recon.',
      theaterStrategy: 'Tahan di perbatasan Skåne dan benteng pantai Laut Baltik. Gunakan ranjau laut di Selat Kattegat untuk menenggelamkan kapal musuh.',
      navalAirAdvice: 'Bofors dan Saab memproduksi pesawat tempur tangguh untuk menjaga langit Stockholm.'
    },
    howToMasterPolitics: {
      topAdvisors: ['Per Albin Hansson (Folkhemmet Architect)', 'Axel Pehrsson-Bramstorp (Agrarian Leader)', 'Olof Thörnell (Supreme Commander)'],
      stabilityWarSupport: 'Konsep "Folkhemmet" (Rumah Rakyat) memberikan Stabilitas 95%+ dan produktivitas buruh tertinggi di Eropa.',
      debuffHandling: 'Jaga keseimbangan diplomasi dengan Jerman dan Inggris agar tidak memicu embargo atau invasi darurat.',
      recommendedFocusOrder: ['The People’s Home', 'Kiruna Iron Ore', 'Bofors 40mm', 'Armed Neutrality', 'Scania Industrial Works', 'Nordic Cooperation', 'Form the Nordic Union']
    },
    stepByStepGameplan: {
      phase1: '1936-1937: Terapkan Folkhemmet, bangun industri Bofors dan Volvo, dan ekspor bijih besi Kiruna.',
      phase2: '1938-1939: Bangun angkatan udara Saab dan perkuat pertahanan benteng pantai di Gothenburg.',
      phase3: '1940-1942: Lindungi netralitas saat Norwegia dan Denmark diserang. Tampung pengungsi dan kirim relawan ke Finlandia.',
      phase4: '1943-1945: Bentuk Federasi Skandinavia Raya (Nordic Union) yang mandiri dan berdaulat di Eropa Utara.'
    },
    startingForces: {
      divisions: 12,
      airplanes: 90,
      ships: 14,
      manpowerPool: '310 Ribu'
    },
    vitalResources: {
      surplus: ['Baja (Kiruna Melimpah)', 'Tungsten'],
      deficits: ['Minyak', 'Karet'],
      oilStatus: 'Nol (Wajib Impor)',
      rubberStatus: 'Nol'
    }
  },
  {
    id: 'nor',
    tag: 'NOR',
    name: 'Kerajaan Norwegia (Norway)',
    faction: 'Netral / Allies',
    difficulty: 'Menantang',
    flagColors: ['#dc2626', '#1e3a8a'],
    flagSymbol: '👑',
    ideology: 'Democratic',
    leader: 'Johan Nygaardsvold / Haakon VII',
    startingCivilianFactories: 10,
    startingMilitaryFactories: 2,
    startingDockyards: 1,
    doctrineRecommendation: 'Grand Battleplan atau Superior Firepower',
    focusPath1936: [
      'The Broken Rifle Policy (Atasi Pasifisme)',
      'Norsk Hydro & Heavy Water (Air Berat Nuklir)',
      'Expand the Merchant Marine (Nortraship)',
      'Coastal Fortifications (Benteng Fjord)',
      'Kongsberg Arms Factory',
      'Reject the Quisling Coup',
      'The King’s Choice (Pilihan Raja)'
    ],
    industryStrategy: 'Kembangkan pabrik Norsk Hydro di Rjukan yang memproduksi "Heavy Water" (Air Berat)—komponen kunci riset bom atom pertama di dunia! Manfaatkan armada kapal dagang raksasa Nortraship untuk memasok Sekutu.',
    militaryStrategy: 'Medan Norwegia dipenuhi oleh Fjord curam dan pegunungan salju. Pasang benteng pantai di Narvik dan Oslofjord (Benteng Oscarsborg) untuk menenggelamkan armada invasi Jerman (Operasi Weserübung).',
    keyChallenges: [
      'Politik pasifisme militer "Broken Rifle" yang memangkas kesiapan tempur tentara',
      'Kudeta pengkhianat Fasis Vidkun Quisling saat Jerman menginvasi',
      'Pelabuhan Narvik yang menjadi incaran utama Jerman untuk pengapalan bijih besi'
    ],
    proTips: 'Di Benteng Oscarsborg, gunakan meriam pantai dan torpedo untuk menenggelamkan kapal penjelajah Jerman Blücher seperti dalam peristiwa sejarah nyata!',
    geopoliticalContext: 'Kerajaan maritim di barat Skandinavia dengan garis pantai fjord terpanjang di Eropa. Pelabuhan Narvik yang bebas es di utara adalah jalur utama pengiriman bijih besi Swedia ke Jerman pada musim dingin, menjadikannya target strategis nomor satu Hitler pada April 1940.',
    howToGetRich: {
      civSnowball: 'Fokuskan pembangunan di Oslo dan Bergen. Manfaatkan Nortraship (armada dagang terbesar ke-4 di dunia) untuk mengumpulkan devisa pabrik dari Inggris.',
      resourceStrategy: 'Norwegia kaya akan Aluminium dan tenaga air terjun hidroelektrik (Norsk Hydro).',
      tradePolicy: 'Gunakan Export Focus untuk mengalirkan devisa dan teknologi sekutu.',
      warPlunder: 'Pasca kemenangan Sekutu, Norwegia mendapatkan ganti rugi armada dan pangkalan laut utara.'
    },
    howToWinWar: {
      recommendedDoctrine: 'Grand Battleplan untuk bonus pertahanan fjord dan pegunungan.',
      recommendedTemplate: 'Jeger Fjord: 8 Gunung + 2 Artileri + Support Engineer & Anti-Ship.',
      theaterStrategy: 'Tahan di Narvik dan pegunungan pedalaman. Biarkan pasukan pendarat Jerman kehabisan pasokan suplai di fjord sempit.',
      navalAirAdvice: 'Bekerja sama dengan Royal Navy Inggris untuk memblokade rute laut menuju Narvik.'
    },
    howToMasterPolitics: {
      topAdvisors: ['Johan Nygaardsvold (Prime Minister)', 'Raja Haakon VII (Simbol Persatuan)', 'Carl Gustav Fleischer (Hero of Narvik)'],
      stabilityWarSupport: 'Fokus "The King’s Choice" (Alt for Norge) melambungkan Stabilitas hingga 100% dan menyatukan seluruh rakyat melawan Fasis.',
      debuffHandling: 'Hapus kebijakan pasifisme "Broken Rifle" secepat mungkin untuk membuka hukum wajib militer.',
      recommendedFocusOrder: ['The Broken Rifle', 'Norsk Hydro', 'Nortraship Expansion', 'Kongsberg Arms', 'Coastal Defense', 'The King’s Choice', 'Stand with Allies']
    },
    stepByStepGameplan: {
      phase1: '1936-1937: Atasi pasifisme militer, kembangkan fasilitas air berat Norsk Hydro, dan modernisasi pabrik senjata Kongsberg.',
      phase2: '1938-1939: Bangun benteng pertahanan pantai di Oscarsborg dan pelabuhan Narvik.',
      phase3: '1940-1942: Gagalkan Operasi Weserübung Jerman! Tenggelamkan kapal penjelajah Blücher dan pertahankan Narvik.',
      phase4: '1943-1945: Bebaskan seluruh Norwegia bersama pasukan Sekutu dan amankan teknologi air berat untuk Proyek Manhattan.'
    },
    startingForces: {
      divisions: 6,
      airplanes: 40,
      ships: 8,
      manpowerPool: '190 Ribu'
    },
    vitalResources: {
      surplus: ['Aluminium (Hidroelektrik Melimpah)'],
      deficits: ['Minyak', 'Baja', 'Karet'],
      oilStatus: 'Nol (Wajib Impor)',
      rubberStatus: 'Nol'
    }
  },
  {
    id: 'gre',
    tag: 'GRE',
    name: 'Kerajaan Yunani (Greece)',
    faction: 'Netral / Allies',
    difficulty: 'Menantang',
    flagColors: ['#1e3a8a', '#f8fafc'],
    flagSymbol: '⚔',
    ideology: 'Non-Aligned / Fascism',
    leader: 'Ioannis Metaxas',
    startingCivilianFactories: 10,
    startingMilitaryFactories: 3,
    startingDockyards: 1,
    doctrineRecommendation: 'Grand Battleplan (Entrenchment)',
    focusPath1936: [
      'The Metaxas Regime (Rezim Metaxas)',
      'The Metaxas Line (Garis Benteng Metaxas)',
      'Expand the Merchant Marine',
      'The OXI Day (Hari Penolakan "TIDAK!")',
      'Modernize the Hellenic Army',
      'Reintegrate the Anatolian Coast (Megali Idea)',
      'Bedrock of the Mediterranean'
    ],
    industryStrategy: 'Kembangkan tambang Bauksit dan Nikel di Makedonia dan Thessaly. Bangun benteng industri di Athena dan Salonika.',
    militaryStrategy: 'Bangun Garis Benteng Metaxas (Metaxas Line) di perbatasan Bulgaria dan Albania. Saat Italia Mussolini menginvasi dari Albania pada Oktober 1940, katakan "OXI!" (TIDAK!) dan pukul balik tentara Italia kembali ke laut!',
    keyChallenges: [
      'Invasi agresif dari Italia Fasis pada Oktober 1940',
      'Ancaman intervensi darat Jerman Reich melalui Bulgaria',
      'Krisis utang luar negeri IFC (International Financial Commission)'
    ],
    proTips: 'Garis Benteng Metaxas di perbatasan Albania-Epirus sangat kuat; tentara Italia akan hancur lebur jika mencoba menyerang benteng ini!',
    geopoliticalContext: 'Negara bersejarah di ujung selatan Balkan di bawah kepemimpinan kediktatoran Ioannis Metaxas (Rezim 4 Agustus). Yunani terkenal dengan peristiwa bersejarah "Oxi Day" (Hari Penolakan) ketika Metaxas menolak mentah-mentah ultimatum Mussolini, memicu kemenangan pertama Sekutu atas kekuatan Poros di darat.',
    howToGetRich: {
      civSnowball: 'Fokuskan pembangunan di Attica dan Makedonia Tengah. Manfaatkan armada dagang Yunani untuk mengumpulkan devisa.',
      resourceStrategy: 'Yunani memiliki tambang Aluminium (Bauksit) dan Kromium yang bernilai tinggi.',
      tradePolicy: 'Gunakan Export Focus untuk mengalirkan dana pelunasan utang IFC.',
      warPlunder: 'Jika berhasil memukul balik Poros, Yunani dapat mewujudkan cita-cita "Megali Idea" merebut Konstantinopel (Istanbul), Smyrna, dan pulau Siprus.'
    },
    howToWinWar: {
      recommendedDoctrine: 'Grand Battleplan: Memaksimalkan bonus pertahanan benteng Metaxas di medan pegunungan Pindus.',
      recommendedTemplate: 'Evzones Elit: 8 Gunung + 2 Artileri + Support Engineer & Anti-Tank. Penjaga gunung legendaris.',
      theaterStrategy: 'Tahan serbuan Italia di Epirus, lalu serang balik ke Albania (Tirana & Vlorë). Amankan pelabuhan untuk pendaratan armada Sekutu.',
      navalAirAdvice: 'Bekerja sama dengan armada Royal Navy di Mediterania untuk menjaga kepulauan Aegea.'
    },
    howToMasterPolitics: {
      topAdvisors: ['Ioannis Metaxas (Leader & General)', 'Alexandros Papagos (Army Chief)', 'Konstantinos Kotzias (Minister)'],
      stabilityWarSupport: 'Deklarasi "OXI Day" melambungkan War Support rakyat Yunani hingga 100% demi membela kehormatan bangsa.',
      debuffHandling: 'Hapus utang International Financial Commission lewat negosiasi fokus ekonomi nasional.',
      recommendedFocusOrder: ['The Metaxas Regime', 'The Metaxas Line', 'Expand Merchant Fleet', 'OXI Day', 'Hellenic Rearmament', 'The Pindus Defense', 'Megali Ambition']
    },
    stepByStepGameplan: {
      phase1: '1936-1937: Bangun Garis Benteng Metaxas di perbatasan utara dan kembangkan tambang bauksit.',
      phase2: '1938-1939: Lengkapi resimen Evzones dengan artileri gunung dan selesaikan utang IFC.',
      phase3: '1940: Ucapkan "OXI!" pada ultimatum Mussolini. Bantai tentara Italia di pegunungan Epirus dan duduki Albania selatan.',
      phase4: '1941-1945: Tahan serbuan Jerman di celah Thermopylae bersama pasukan Persemakmuran Inggris hingga kemenangan Sekutu.'
    },
    startingForces: {
      divisions: 13,
      airplanes: 50,
      ships: 10,
      manpowerPool: '270 Ribu'
    },
    vitalResources: {
      surplus: ['Aluminium', 'Kromium'],
      deficits: ['Minyak', 'Baja', 'Karet'],
      oilStatus: 'Nol (Wajib Impor)',
      rubberStatus: 'Nol'
    }
  },
  {
    id: 'hol',
    tag: 'HOL',
    name: 'Kerajaan Belanda (Netherlands & Dutch East Indies)',
    faction: 'Allies (Sekutu)',
    difficulty: 'Menantang',
    flagColors: ['#dc2626', '#1e3a8a'],
    flagSymbol: '👑',
    ideology: 'Democratic',
    leader: 'Hendrikus Colijn / Ratu Wilhelmina',
    startingCivilianFactories: 16,
    startingMilitaryFactories: 3,
    startingDockyards: 3,
    doctrineRecommendation: 'Grand Battleplan atau Superior Firepower',
    focusPath1936: [
      'De Zeven Provinciën (Modernisasi AL)',
      'Zuiderzee Works (Reklamasi Tanah)',
      'Fortress Holland (Benteng Garis Air Belanda)',
      'Defend the East Indies (Hindia Belanda)',
      'Inundation Lines (Banjiri Tanggul Pertahanan)',
      'Relocate the Government to Batavia',
      'The Queen’s Speech'
    ],
    industryStrategy: 'Belanda mengontrol koloni terkaya di dunia: Hindia Belanda (Indonesia)! Cadangan Minyak di Palembang dan Karet di Sumatera/Jawa adalah tambang emas tak tertandingi. Manfaatkan perdagangan sumber daya koloni untuk mendanai pertahanan ibu kota.',
    militaryStrategy: 'Aktifkan "Inundation Lines" (Jalur Genangan Air): jebol tanggul laut Zuiderzee untuk membanjiri dataran rendah Belanda! Air bah akan melumpuhkan gerak laju divisi tank Jerman menuju Amsterdam.',
    keyChallenges: [
      'Berbatasan langsung dengan kekuatan Blitzkrieg Jerman Reich tanpa benteng alami',
      'Hindia Belanda terancam invasi total oleh Kekaisaran Jepang di Pasifik',
      'Politik pasifisme koalisi Colijn yang menghambat militerisasi dini'
    ],
    proTips: 'Jika pulau utama Belanda di Eropa jatuh ke tangan Jerman, kamu bisa memindahkan pemerintahan ke Batavia (Jakarta) dan terus berperang menggunakan industri Hindia Belanda!',
    geopoliticalContext: 'Negara kecil berbentang alam dataran rendah di Eropa Barat yang memiliki imperium kolonial raksasa di Asia Tenggara (Hindia Belanda / Indonesia). Minyak bumi Sumatera dan karet Jawa menjadikannya sasaran empuk agresi Poros: Jerman di barat dan Jepang di timur.',
    howToGetRich: {
      civSnowball: 'Fokuskan pembangunan di Holland dan Hindia Belanda. Reklamasi tanah Zuiderzee Works membuka slot pabrik baru di tanah air.',
      resourceStrategy: 'Monopoli Karet dan Minyak bumi bumi di Hindia Belanda (Indonesia). Seluruh dunia harus membayar civs untuk membeli karetmu.',
      tradePolicy: 'Free Trade menjadikan Belanda salah satu negara terkaya di dunia berkat ekspor karet dan minyak koloni.',
      warPlunder: 'Pertahankan kemerdekaan koloni dan sita pangkalan musuh di Asia Pasifik.'
    },
    howToWinWar: {
      recommendedDoctrine: 'Grand Battleplan: Memaksimalkan pertahanan parit air dan tanggul.',
      recommendedTemplate: 'Garis Air: 9 Infanteri + Support Engineer & Anti-Air. KNIL Hindia Belanda untuk pertahanan pulau.',
      theaterStrategy: 'Eropa: Tahan di Fortress Holland (Amsterdam-Rotterdam-Den Haag) di balik genangan air. Asia: Buat benteng pertahanan di pelabuhan Surabaya dan ladang minyak Palembang.',
      navalAirAdvice: 'Bentuk armada kapal penjelajah ringan (De Ruyter) dan kapal selam patroli untuk menjaga Laut Jawa.'
    },
    howToMasterPolitics: {
      topAdvisors: ['Hendrikus Colijn (Prime Minister)', 'Ratu Wilhelmina (Simbol Perlawanan)', 'Conrad Helfrich (Naval Genius)'],
      stabilityWarSupport: 'Pidato Ratu Wilhelmina dari pengasingan di London (Radio Oranje) menyalakan api perlawanan gerilyawan bawah tanah.',
      debuffHandling: 'Hapus pasifisme koalisi lewat fokus Abandon Gold Standard dan persiapkan persenjataan penuh.',
      recommendedFocusOrder: ['De Zeven Provinciën', 'Zuiderzee Works', 'Fortress Holland', 'Inundation Lines', 'Defend the East Indies', 'The Queen’s Speech', 'Allied Collaboration']
    },
    stepByStepGameplan: {
      phase1: '1936-1937: Selesaikan reklamasi Zuiderzee Works dan kembangkan ladang minyak dan karet di Sumatera dan Jawa.',
      phase2: '1938-1939: Bangun sistem tanggul air Fortress Holland dan kirim alutsista ke pangkalan militer KNIL di Hindia Belanda.',
      phase3: '1940: Banjiri tanggul Zuiderzee saat Jerman menyerbu! Tahan ibu kota selama mungkin atau pindahkan kabinet ke Batavia.',
      phase4: '1941-1945: Bersama Sekutu pertahankan Hindia Belanda dari serbuan Jepang, lalu bebaskan tanah air Belanda di Eropa.'
    },
    startingForces: {
      divisions: 10,
      airplanes: 60,
      ships: 22,
      manpowerPool: '240 Ribu'
    },
    vitalResources: {
      surplus: ['Karet (Hindia Belanda Melimpah)', 'Minyak (Sumatera/Borneo)'],
      deficits: ['Baja', 'Aluminium'],
      oilStatus: 'Raksasa Asia (Ladang Minyak Palembang & Balikpapan)',
      rubberStatus: 'Monopoli Terbesar Dunia (Indonesia/Malaya)'
    }
  },
  {
    id: 'bel',
    tag: 'BEL',
    name: 'Kerajaan Belgia (Belgium)',
    faction: 'Netral / Allies',
    difficulty: 'Ahli',
    flagColors: ['#eab308', '#dc2626'],
    flagSymbol: '👑',
    ideology: 'Democratic',
    leader: 'Hubert Pierlot / Raja Leopold III',
    startingCivilianFactories: 14,
    startingMilitaryFactories: 3,
    startingDockyards: 0,
    doctrineRecommendation: 'Grand Battleplan (Entrenchment)',
    focusPath1936: [
      'The National Policy of Neutrality',
      'Fort Eben-Emael (Benteng Terkuat Dunia)',
      'Albert Canal Defense (Kanal Albert)',
      'Union Minière du Haut-Katanga (Uranium Kongo)',
      'Modernize the FN Herstal (Pabrik Senjata FN)',
      'Defend the Ardennes',
      'Allied Coalition'
    ],
    industryStrategy: 'Kembangkan pabrik senjata legendaris FN Herstal (Fabrique Nationale) di Liège! Manfaatkan kekayaan mineral koloni Kongo Belgia: tambang Shinkolobwe menyimpan bijih Uranium murni terkaya di bumi—bahan baku utama bom atom pertama dunia!',
    militaryStrategy: 'Pertahankan Benteng Eben-Emael dan garis Kanal Albert. Jangan biarkan pasukan lintas udara (Fallschirmjäger) Jerman merebut atap benteng! Tahan musuh di celah Hutan Ardennes.',
    keyChallenges: [
      'Rute utama invasi Schlieffen/Manstein Jerman menuju Prancis',
      'Benteng Eben-Emael rentan diserang pasukan terjun payung Jerman dari atap benteng',
      'Perpecahan politik antara komunitas Flandria (Belanda) dan Wallonia (Prancis)'
    ],
    proTips: 'Pasang meriam Anti-Air level tinggi di atas Benteng Eben-Emael untuk mencegah pasukan payung Jerman mendarat!',
    geopoliticalContext: 'Pintu gerbang invasi Eropa Barat. Karena Garis Maginot Prancis berhenti di perbatasan Belgia, Jerman Reich tak terhindarkan akan menyerbu Belgia untuk menerobos ke Paris. Namun dengan Benteng Eben-Emael dan tambang Uranium Kongo di Afrika, Belgia memegang kunci masa depan perang.',
    howToGetRich: {
      civSnowball: 'Fokuskan pembangunan di Flanders dan Wallonia. Manfaatkan tambang Shinkolobwe di Kongo untuk memasok uranium ke Amerika Serikat demi mendapatkan jutaan dollar devisa.',
      resourceStrategy: 'Kongo Belgia memiliki kekayaan Karet, Tembaga, dan Uranium terbesar di Afrika.',
      tradePolicy: 'Gunakan Export Focus untuk mengalirkan devisa dan teknologi sekutu.',
      warPlunder: 'Pasca kemenangan Sekutu, Belgia mendapatkan kendali atas kawasan industri Aachen Jerman dan ganti rugi perang.'
    },
    howToWinWar: {
      recommendedDoctrine: 'Grand Battleplan untuk bonus pertahanan Kanal Albert dan benteng Liège.',
      recommendedTemplate: 'Chasseurs Ardennais: 8 Infanteri + 2 Artileri + Support Engineer & Anti-Tank. Penjaga hutan Ardennes yang legendaris.',
      theaterStrategy: 'Tahan di sepanjang Kanal Albert dan Sungai Meuse. Tutup celah Hutan Ardennes dengan Chasseurs Ardennais agar tank Guderian tidak bisa lewat.',
      navalAirAdvice: 'Bekerja sama dengan Royal Air Force Inggris untuk melindungi langit Brussels.'
    },
    howToMasterPolitics: {
      topAdvisors: ['Hubert Pierlot (Prime Minister)', 'Paul-Henri Spaak (Diplomat)', 'Raja Leopold III (Commander)'],
      stabilityWarSupport: 'Satukan faksi Flandria dan Wallonia di bawah panji persatuan nasional membela tanah air.',
      debuffHandling: 'Hapus ilusi netralitas pasif dan undang tentara Sekutu masuk ke garis pertahanan sebelum Jerman menyerbu.',
      recommendedFocusOrder: ['National Neutrality', 'Fort Eben-Emael', 'Albert Canal Defense', 'Modernize FN Herstal', 'Uranium of Katanga', 'Chasseurs Ardennais', 'Stand with France']
    },
    stepByStepGameplan: {
      phase1: '1936-1937: Perkuat Benteng Eben-Emael, bangun benteng pertahanan di Kanal Albert, dan modernisasi pabrik senjata FN.',
      phase2: '1938-1939: Pasang meriam Anti-Air di seluruh perbatasan timur dan kembangkan tambang uranium Katanga di Kongo.',
      phase3: '1940: Tahan serbuan pasukan lapis baja Jerman di Kanal Albert dan Hutan Ardennes. Hancurkan pasukan payung musuh.',
      phase4: '1941-1945: Bebaskan pelabuhan Antwerp dan pasok bahan uranium untuk penyelesaian bom atom Sekutu.'
    },
    startingForces: {
      divisions: 11,
      airplanes: 50,
      ships: 0,
      manpowerPool: '230 Ribu'
    },
    vitalResources: {
      surplus: ['Baja', 'Uranium (Kongo)', 'Karet (Kongo)'],
      deficits: ['Minyak', 'Aluminium'],
      oilStatus: 'Nol (Wajib Impor)',
      rubberStatus: 'Aman dari Koloni Kongo'
    }
  },
  {
    id: 'por',
    tag: 'POR',
    name: 'Republik Portugal',
    faction: 'Netral / Allies',
    difficulty: 'Sedang',
    flagColors: ['#15803d', '#dc2626'],
    flagSymbol: '⚓',
    ideology: 'Non-Aligned',
    leader: 'António de Oliveira Salazar',
    startingCivilianFactories: 12,
    startingMilitaryFactories: 2,
    startingDockyards: 1,
    doctrineRecommendation: 'Grand Battleplan atau Superior Firepower',
    focusPath1936: [
      'Estado Novo (Negara Baru Salazar)',
      'Panasqueira Tungsten (Lumbung Tungsten Eropa)',
      'Reorganize the Army',
      'The Iberian Pact (Pakta Iberia Damai)',
      'Empire of Portugal (Angola & Mozambik)',
      'Azores Air Base (Pangkalan Udara Atlantik)',
      'Industrial Rejuvenation'
    ],
    industryStrategy: 'Tambang Tungsten Panasqueira di Portugal adalah cadangan tungsten terbesar di Eropa Barat! Jerman dan Sekutu berebut membeli tungsten untuk alutsista baja mereka. Ekspor mineral ini untuk mengumpulkan puluhan pabrik sipil tanpa menembakkan peluru.',
    militaryStrategy: 'Pertahankan netralitas bersenjata lewat Pakta Iberia dengan Spanyol Franco. Sediakan pangkalan laut dan udara Kepulauan Azores untuk pesawat patroli Sekutu guna menutup "Celah Atlantik" (Mid-Atlantic Gap) dari U-Boat Jerman.',
    keyChallenges: [
      'Perang Saudara Spanyol di perbatasan timur yang mengancam stabilitas',
      'Koloni seberang laut (Angola, Mozambik, Timor, Makau) yang luas dan terisolasi',
      'Basis industri domestik awal yang terbatas'
    ],
    proTips: 'Jual Tungsten ke Jerman dan sewakan pangkalan Azores ke Sekutu: kamu bisa memeras keuntungan ekonomi maksimal dari kedua kubu yang sedang berperang!',
    geopoliticalContext: 'Negara pelopor navigasi maritim dunia di ujung barat semenanjung Iberia di bawah rezim korporatis "Estado Novo" António de Oliveira Salazar. Portugal mengontrol pangkalan paling strategis di Samudra Atlantik (Kepulauan Azores) dan cadangan tambang Tungsten terkaya di Eropa.',
    howToGetRich: {
      civSnowball: 'Fokuskan pembangunan di Lisbon dan Porto. Monopoli tambang Tungsten Panasqueira menghasilkan aliran civs devisa luar biasa.',
      resourceStrategy: 'Tungsten melimpah ruah. Karet dan minyak dapat didatangkan dari koloni Angola dan Mozambik.',
      tradePolicy: 'Free Trade adalah mesin pencetak kekayaan Portugal sepanjang Perang Dunia II.',
      warPlunder: 'Pasca perang, Portugal memperkokoh kendali atas koloni Afrika dan Asia serta mendapatkan hibah modal Marshall Plan.'
    },
    howToWinWar: {
      recommendedDoctrine: 'Grand Battleplan: Memaksimalkan pertahanan teritorial dan garis pantai.',
      recommendedTemplate: 'Batalhão de Caçadores: 9 Infanteri + Support Artileri, Engineer, & AA.',
      theaterStrategy: 'Tandatangani Pakta Iberia dengan Franco agar perbatasan Spanyol aman. Fokuskan armada pada pengawalan rute konvoi Atlantik.',
      navalAirAdvice: 'Bekerja sama dengan armada Sekutu di pangkalan udara Lajes (Azores) untuk memburu kapal selam Jerman.'
    },
    howToMasterPolitics: {
      topAdvisors: ['António de Oliveira Salazar (Dictator & Economist)', 'Manuel Gonçalves Cerejeira', 'Santos Costa (Army Chief)'],
      stabilityWarSupport: 'Kebijakan "Estado Novo" memberikan Stabilitas 90%+ yang menjaga ketenangan bangsa di tengah badai perang.',
      debuffHandling: 'Redam pengaruh Komunis dan anarkis selama Perang Saudara Spanyol berlangsung di perbatasan.',
      recommendedFocusOrder: ['Estado Novo', 'Panasqueira Tungsten', 'Iberian Pact', 'Empire of Portugal', 'Azores Concession', 'Armed Neutrality', 'Industrial Rejuvenation']
    },
    stepByStepGameplan: {
      phase1: '1936-1937: Terapkan Estado Novo, kembangkan tambang tungsten Panasqueira, dan amankan perbatasan dari Perang Saudara Spanyol.',
      phase2: '1938-1939: Tandatangani Pakta Iberia dengan Spanyol untuk menjamin perdamaian di Semenanjung Iberia.',
      phase3: '1940-1943: Jual tungsten ke Jerman dan Inggris dengan harga premium. Buka pangkalan Azores untuk Sekutu pada 1943.',
      phase4: '1944-1945: Bangun perekonomian modern pasca perang dan kokohkan kedaulatan imperium seberang laut Portugal.'
    },
    startingForces: {
      divisions: 8,
      airplanes: 30,
      ships: 7,
      manpowerPool: '250 Ribu'
    },
    vitalResources: {
      surplus: ['Tungsten (Panasqueira Melimpah)'],
      deficits: ['Minyak', 'Baja', 'Aluminium'],
      oilStatus: 'Nol (Wajib Impor)',
      rubberStatus: 'Aman dari Koloni Angola'
    }
  },
  {
    id: 'bul',
    tag: 'BUL',
    name: 'Kerajaan Bulgaria',
    faction: 'Axis (Blok Poros)',
    difficulty: 'Sedang',
    flagColors: ['#15803d', '#dc2626'],
    flagSymbol: '🦁',
    ideology: 'Fascism / Non-Aligned',
    leader: 'Tsar Boris III',
    startingCivilianFactories: 10,
    startingMilitaryFactories: 2,
    startingDockyards: 0,
    doctrineRecommendation: 'Superior Firepower atau Grand Battleplan',
    focusPath1936: [
      'The Tsar’s Rule (Pemerintahan Tsar Boris)',
      'Condemn the Treaty of Neuilly (Hapus Pembatasan Militer)',
      'Treaty of Craiova (Caplok Dobruja Damai)',
      'Expand the Pernik Coal Mines',
      'The IMRO Question (Selesaikan Isu Makedonia)',
      'Join the Tripartite Pact',
      'Fate of the Balkans'
    ],
    industryStrategy: 'Kembangkan tambang batubara Pernik dan tembaga di Thrace. Bangun pabrik alutsista di Sofia dan Plovdiv.',
    militaryStrategy: 'Hapus pembatasan Perjanjian Neuilly secepat mungkin. Bergabunglah dengan Blok Poros dan caplok kembali wilayah historis Dobruja Selatan, Makedonia Vardar, dan Thrace Barat untuk mewujudkan cita-cita "Bulgaria Raya" (San Stefano Bulgaria).',
    keyChallenges: [
      'Pembatasan militer Perjanjian Neuilly 1919 (dilarang wajib militer dan senjata berat)',
      'Aktivitas teroris dan gerilyawan IMRO di perbatasan Makedonia',
      'Tekanan berat dari Uni Soviet untuk memihak Komunisme'
    ],
    proTips: 'Gunakan diplomasi Perjanjian Craiova (Treaty of Craiova) untuk mencaplok Dobruja Selatan dari Rumania secara damai tanpa perang!',
    geopoliticalContext: 'Kerajaan tangguh di Semenanjung Balkan yang dikenal sebagai "Prusia dari Balkan" karena keberanian militernya di Perang Balkan dan PD I. Dipimpin oleh Tsar Boris III yang cerdik, Bulgaria berusaha memulihkan luka kekalahan masa lalu dan menyatukan seluruh bangsa Bulgaria.',
    howToGetRich: {
      civSnowball: 'Fokuskan pembangunan di Sofia dan Plovdiv. Tambang batubara Pernik mendongkrak kapasitas energi industri.',
      resourceStrategy: 'Bulgaria kaya akan Aluminium dan Kromium. Ekspor mineral ke Jerman untuk menyerap alutsista modern.',
      tradePolicy: 'Gunakan Export Focus untuk menggenjot riset dan modernisasi tentara.',
      warPlunder: 'Caplok Dobruja Selatan, Makedonia, dan Thrace (akses ke Laut Aegea) saat Poros menaklukkan Yugoslavia dan Yunani.'
    },
    howToWinWar: {
      recommendedDoctrine: 'Superior Firepower untuk memaksimalkan daya tembak infanteri tangguh Balkan.',
      recommendedTemplate: 'Grenadier Bulgaria: 9 Infanteri + 2 Artileri + Support Engineer & Recon.',
      theaterStrategy: 'Garnisun wilayah pendudukan di Makedonia dan Thrace. Jaga pantai Laut Hitam (Varna & Burgas) dari pendaratan amfibi Soviet.',
      navalAirAdvice: 'Beli pesawat tempur Messerschmitt dari Jerman untuk menjaga wilayah udara Sofia.'
    },
    howToMasterPolitics: {
      topAdvisors: ['Tsar Boris III (Beloved Monarch)', 'Bogdan Filov (Prime Minister)', 'Nikola Mihov (War Minister)'],
      stabilityWarSupport: 'Pencaplokan damai Dobruja dan Makedonia melambungkan Stabilitas rakyat Bulgaria hingga 95%.',
      debuffHandling: 'Selesaikan sengketa organisasi revolusioner IMRO lewat integrasi politik atau pembubaran terarah.',
      recommendedFocusOrder: ['The Tsar’s Rule', 'Overturn Neuilly', 'Treaty of Craiova', 'Pernik Coal Mines', 'Resolve the IMRO', 'Tripartite Pact', 'San Stefano Bulgaria']
    },
    stepByStepGameplan: {
      phase1: '1936-1937: Perkuat kekuasaan Tsar Boris III, hapus pembatasan militer Neuilly, dan modernisasi industri Pernik.',
      phase2: '1938-1939: Tuntut kembali Dobruja Selatan dari Rumania via Perjanjian Craiova.',
      phase3: '1940-1942: Bergabung dengan Poros. Duduki wilayah Makedonia dan Thrace untuk membuka akses pelabuhan ke Laut Aegea.',
      phase4: '1943-1945: Tolak mengirim tentara ke Front Timur melawan Soviet; pertahankan kedaulatan Bulgaria Raya yang bersatu.'
    },
    startingForces: {
      divisions: 14,
      airplanes: 40,
      ships: 0,
      manpowerPool: '290 Ribu'
    },
    vitalResources: {
      surplus: ['Aluminium', 'Kromium'],
      deficits: ['Minyak', 'Baja', 'Karet'],
      oilStatus: 'Minim (Wajib Impor Rumania)',
      rubberStatus: 'Nol'
    }
  },
  {
    id: 'den',
    tag: 'DEN',
    name: 'Kerajaan Denmark',
    faction: 'Netral / Allies',
    difficulty: 'Ahli',
    flagColors: ['#dc2626', '#f8fafc'],
    flagSymbol: '👑',
    ideology: 'Democratic',
    leader: 'Thorvald Stauning / Raja Christian X',
    startingCivilianFactories: 10,
    startingMilitaryFactories: 1,
    startingDockyards: 1,
    doctrineRecommendation: 'Grand Battleplan atau Superior Firepower',
    focusPath1936: [
      'The Disarmament Legacy (Atasi Pelucutan Senjata)',
      'The Little Belt Bridge (Jembatan Sabuk Kecil)',
      'Danish Agricultural Export (Ekspor Pertanian)',
      'Madsen Machine Gun (Senapan Mesin Madsen)',
      'Fortify the Jutland Border',
      'Greenland & Faroe Defense',
      'The King on Horseback'
    ],
    industryStrategy: 'Kembangkan industri pertanian dan perkapalan Copenhagen. Pabrik senjata DISA memproduksi senapan mesin ringan Madsen yang legendaris dan diekspor ke puluhan negara.',
    militaryStrategy: 'Medan Denmark sangat datar dan berbatasan langsung dengan tank Jerman Reich. Bangun benteng parit di Jutlandia Selatan dan pasang meriam pantai di Selat Oresund untuk mengunci pintu masuk ke Laut Baltik.',
    keyChallenges: [
      'Garis perbatasan darat dengan Jerman di Jutlandia tanpa benteng alami gunung atau sungai besar',
      'Invasi kilat Jerman pada 9 April 1940 (Operasi Weserübung)',
      'Kebijakan perlucutan senjata pasca PD I yang menyisakan militer sangat kecil'
    ],
    proTips: 'Jika berhasil menahan gerak maju Jerman di garis Jutlandia Selatan selama beberapa minggu, Sekutu dapat mengirim armada Royal Navy untuk mengamankan Copenhagen!',
    geopoliticalContext: 'Kerajaan maritim kuno yang mengendalikan Selat Denmark (Danish Straits)—pintu gerbang tunggal antara Laut Utara dan Laut Baltik. Dipimpin oleh Perdana Menteri Thorvald Stauning dan Raja Christian X yang dicintai rakyat, Denmark menghadapi ancaman langsung dari Jerman Reich di selatannya.',
    howToGetRich: {
      civSnowball: 'Fokuskan pembangunan di Sjælland (Copenhagen) dan Jutlandia. Bangun Jembatan Sabuk Kecil untuk memperlancar arus logistik.',
      resourceStrategy: 'Denmark kaya akan produk pertanian dan memiliki akses ke tambang kriolit di Greenland.',
      tradePolicy: 'Gunakan Export Focus untuk mengalirkan dana devisa pabrik dari Inggris dan Jerman.',
      warPlunder: 'Pasca kemenangan Sekutu, Denmark dapat menuntut wilayah Schleswig Selatan dari Jerman.'
    },
    howToWinWar: {
      recommendedDoctrine: 'Grand Battleplan untuk bonus pertahanan parit di leher semenanjung Jutlandia.',
      recommendedTemplate: 'Livgarden: 9 Infanteri + Support Artileri, Engineer, & Anti-Tank.',
      theaterStrategy: 'Tahan di leher sempit semenanjung Jutlandia (Garis Dannevirke modern) dengan benteng parit beton.',
      navalAirAdvice: 'Tutup Selat Oresund dengan ranjau laut untuk mencegah armada Kriegsmarine Jerman masuk ke perairan kepulauan.'
    },
    howToMasterPolitics: {
      topAdvisors: ['Thorvald Stauning (Prime Minister)', 'Raja Christian X (Simbol Keberanian)', 'Erik Scavenius (Foreign Minister)'],
      stabilityWarSupport: 'Aksi Raja Christian X yang menunggang kuda setiap hari di jalanan Copenhagen membakar semangat perlawanan rakyat hingga Stabilitas 100%.',
      debuffHandling: 'Hapus warisan perlucutan senjata militer (Disarmament) dengan meluncurkan program persenjataan kembali darurat.',
      recommendedFocusOrder: ['Disarmament Legacy', 'Little Belt Bridge', 'Madsen Expansion', 'Danish Rearmament', 'Fortify Jutland', 'The King on Horseback', 'Allied Coalition']
    },
    stepByStepGameplan: {
      phase1: '1936-1937: Bangun Jembatan Sabuk Kecil, hapus pembatasan militer, dan modernisasi pabrik senjata Madsen.',
      phase2: '1938-1939: Bangun benteng pertahanan parit di perbatasan Jutlandia Selatan dan pasang ranjau di Selat Oresund.',
      phase3: '1940: Hadapi Operasi Weserübung Jerman! Tahan serbuan tank Jerman di garis Jutlandia dan amankan Copenhagen.',
      phase4: '1941-1945: Bersama armada Sekutu bebaskan seluruh perairan Skandinavia dan amankan jalur perdagangan Baltik.'
    },
    startingForces: {
      divisions: 4,
      airplanes: 30,
      ships: 4,
      manpowerPool: '160 Ribu'
    },
    vitalResources: {
      surplus: ['Kriolit (Greenland)'],
      deficits: ['Minyak', 'Baja', 'Karet', 'Aluminium'],
      oilStatus: 'Nol (Wajib Impor)',
      rubberStatus: 'Nol'
    }
  },
  {
    id: 'swi',
    tag: 'SWI',
    name: 'Konfederasi Swiss (Switzerland)',
    faction: 'Netral Abadi',
    difficulty: 'Sedang',
    flagColors: ['#dc2626', '#f8fafc'],
    flagSymbol: '✚',
    ideology: 'Democratic',
    leader: 'Federal Council / Henri Guisan',
    startingCivilianFactories: 14,
    startingMilitaryFactories: 3,
    startingDockyards: 0,
    doctrineRecommendation: 'Grand Battleplan (National Redoubt)',
    focusPath1936: [
      'Armed Neutrality (Netralitas Bersenjata)',
      'The National Redoubt (Benteng Reduit Alpen)',
      'Gotthard Tunnel Mining (Pasang Peledak Terowongan)',
      'Oerlikon 20mm (Meriam Anti-Pesawat Elit)',
      'Citizen Soldiers (Milisi Rakyat)',
      'Swiss Banking Secrecy (Kerahasiaan Bank)',
      'Fortress Helvetia'
    ],
    industryStrategy: 'Jadikan Swiss sebagai benteng finansial dunia! Manfaatkan kerahasiaan bank Swiss untuk menyimpan emas dan devisa dari kedua belah pihak yang berperang. Pabrik senjata Oerlikon memproduksi meriam anti-pesawat terbaik di dunia.',
    militaryStrategy: 'Doktrin Pertahanan Reduit Nasional (National Redoubt)! Jika wilayah dataran diserbu, tarik seluruh rakyat dan tentara ke dalam benteng bawah tanah di Pegunungan Alpen. Pasang dinamit di Terowongan Gotthard untuk memutus jalur transportasi Poros!',
    keyChallenges: [
      'Dikelilingi 100% oleh kekuatan Blok Poros (Jerman di utara, Italia di selatan, Prancis Vichy di barat, Austria di timur)',
      'Rencana invasi Operasi Tannenbaum oleh Nazi Jerman',
      'Ketergantungan total pada impor pangan dan batubara'
    ],
    proTips: 'Benteng Reduit di Pegunungan Alpen memiliki bonus pertahanan +100%: tank Jerman tidak akan pernah bisa mendaki tebing curam bersalju Alpen!',
    geopoliticalContext: 'Negara netral abadi di jantung Pegunungan Alpen Eropa. Dikelilingi total oleh kekuatan Blok Poros pasca jatuhnya Prancis pada tahun 1940, Swiss di bawah Jenderal Henri Guisan mempersiapkan strategi pertahanan total "National Redoubt" yang siap meledakkan seluruh terowongan kereta api Alpen jika Hitler berani melangkah masuk.',
    howToGetRich: {
      civSnowball: 'Fokuskan pembangunan di Zurich, Bern, dan Basel. Manfaatkan sistem perbankan Swiss untuk menarik investasi modal asing.',
      resourceStrategy: 'Swiss kaya akan Aluminium dan energi hidroelektrik Alpen.',
      tradePolicy: 'Pertahankan Free Trade untuk menjadi perantara perdagangan emas dan devisa global.',
      warPlunder: 'Swiss mempertahankan netralitas dan mengumpulkan kekayaan devisa terbesar di Eropa pasca perang.'
    },
    howToWinWar: {
      recommendedDoctrine: 'Grand Battleplan: Memaksimalkan bonus benteng gunung Alpen hingga batas absolut.',
      recommendedTemplate: 'Gebirgsjäger Alpen: 8 Gunung + 2 Artileri + Support Oerlikon AA, Engineer, & Recon.',
      theaterStrategy: 'Tinggalkan dataran terbuka Mittelland; kumpulkan seluruh divisi di Benteng Reduit Alpen (Sargans, St. Gotthard, dan Saint-Maurice).',
      navalAirAdvice: 'Produksi pesawat tempur darat Messerschmitt Bf 109 lisensi Swiss untuk mencegat pesawat asing yang melanggar wilayah udara.'
    },
    howToMasterPolitics: {
      topAdvisors: ['Jenderal Henri Guisan (National Hero)', 'Philipp Etter (Federal Councilor)', 'Marcel Pilet-Golaz (Diplomat)'],
      stabilityWarSupport: 'Sumpah Rütli yang dipimpin Jenderal Guisan melambungkan tekad membela tanah air hingga Stabilitas 100%.',
      debuffHandling: 'Seimbangkan diplomasi perdagangan dengan Jerman agar terhindar dari invasi Operasi Tannenbaum.',
      recommendedFocusOrder: ['Armed Neutrality', 'National Redoubt', 'Oerlikon Expansion', 'Gotthard Mining', 'Citizen Soldiers', 'Swiss Banking', 'Fortress Helvetia']
    },
    stepByStepGameplan: {
      phase1: '1936-1937: Bangun benteng bawah tanah Reduit Alpen dan modernisasi industri meriam Oerlikon.',
      phase2: '1938-1939: Pasang bahan peledak di Terowongan Gotthard dan latih milisi rakyat Alpen.',
      phase3: '1940-1942: Saat dikepung Poros, kumpulkan pasukan di benteng Reduit Alpen. Tembak jatuh semua pesawat yang melanggar kedaulatan.',
      phase4: '1943-1945: Pertahankan netralitas bersenjata hingga perang usai, menjadi pulau kedamaian dan kemakmuran di Eropa.'
    },
    startingForces: {
      divisions: 8,
      airplanes: 50,
      ships: 0,
      manpowerPool: '200 Ribu'
    },
    vitalResources: {
      surplus: ['Aluminium (Hidroelektrik Melimpah)'],
      deficits: ['Minyak', 'Baja', 'Karet', 'Tungsten'],
      oilStatus: 'Nol (Wajib Impor)',
      rubberStatus: 'Nol'
    }
  },
  {
    id: 'aus',
    tag: 'AUS',
    name: 'Republik Austria (Österreich)',
    faction: 'Netral / Austro-Fascist',
    difficulty: 'Ahli',
    flagColors: ['#dc2626', '#f8fafc'],
    flagSymbol: '🦅',
    ideology: 'Fascism / Non-Aligned',
    leader: 'Kurt Schuschnigg',
    startingCivilianFactories: 10,
    startingMilitaryFactories: 2,
    startingDockyards: 0,
    doctrineRecommendation: 'Grand Battleplan atau Superior Firepower',
    focusPath1936: [
      'Fatherland Front (Front Tanah Air)',
      'Alpine Defense (Benteng Pegunungan Alpen)',
      'Steyr-Daimler-Puch (Raksasa Alutsista)',
      'Reject the Anschluss (Tolak Pencaplokan Jerman)',
      'Seek Italian Guarantee (Perlindungan Mussolini)',
      'Habsburg Restoration (Restorasi Dinasti Habsburg)',
      'Österreich Über Alles'
    ],
    industryStrategy: 'Kembangkan kompleks industri senjata dan otomotif Steyr-Daimler-Puch di Steyr dan Graz. Manfaatkan tambang bijih besi Erzberg di Styria untuk basis produksi senjata mandiri.',
    militaryStrategy: 'Pertahanan Alpen! Bangun benteng di sepanjang Sungai Inn dan perbatasan Bavaria. Jika menolak pencaplokan Jerman (Reject Anschluss), minta bantuan perlindungan militer dari Kerajaan Italia (Mussolini) untuk menghalau Hitler!',
    keyChallenges: [
      'Tekanan mutlak Nazi Jerman untuk melakukan Anschluss (Penyatuan damai atau invasi paksa)',
      'Konspirasi dan infiltrasi Nazi Austria di dalam kepolisian dan birokrasi',
      'Kapasitas militer awal yang jauh lebih kecil dibanding Jerman'
    ],
    proTips: 'Jika kamu menolak Anschluss dan berhasil mengamankan jaminan militer dari Italia dan Cekoslowakia, kamu bisa membalikkan keadaan dan mengalahkan Hitler di tahun 1938!',
    geopoliticalContext: 'Tanah kelahiran Adolf Hitler yang menjadi sasaran ekspansi pertama Jerman Nazi. Di bawah Kanselir Kurt Schuschnigg dan Front Tanah Air (Vaterländische Front), Austria berjuang mempertahankan kemerdekaan budayanya dari gelombang aneksasi Pan-Jermanik.',
    howToGetRich: {
      civSnowball: 'Fokuskan pembangunan di Wina, Linz, dan Graz. Kembangkan tambang bijih besi Erzberg di Styria.',
      resourceStrategy: 'Austria kaya akan Bijih Besi dan Aluminium Alpen.',
      tradePolicy: 'Gunakan Export Focus untuk mengalirkan dana devisa pabrik.',
      warPlunder: 'Jika berhasil mengalahkan Jerman atau memulihkan Dinasti Habsburg, Austria dapat menyatukan kembali Mahkota Kekaisaran Austro-Hungaria.'
    },
    howToWinWar: {
      recommendedDoctrine: 'Grand Battleplan: Memaksimalkan pertahanan parit di lereng curam Alpen.',
      recommendedTemplate: 'Tiroler Schützen: 8 Gunung + 2 Artileri + Support Engineer & Anti-Tank.',
      theaterStrategy: 'Tahan serbuan tentara Jerman di celah Salzburg dan Linz. Manfaatkan Pegunungan Alpen untuk memotong mobilitas divisi Panzer Jerman.',
      navalAirAdvice: 'Beli pesawat tempur dari Italia untuk melindungi wilayah udara Wina.'
    },
    howToMasterPolitics: {
      topAdvisors: ['Kurt Schuschnigg (Chancellor)', 'Arthur Seyss-Inquart (Hati-hati: Pengkhianat Nazi!)', 'Prince Starhemberg (Heimwehr Leader)'],
      stabilityWarSupport: 'Gelar Referendum Kemerdekaan Austria pada Maret 1938 untuk menyatukan rakyat menolak penaklukan Nazi Jerman.',
      debuffHandling: 'Pecat simpatisan Nazi Seyss-Inquart dari kementerian dalam negeri untuk mencegah pengkhianatan gerbang ibukota.',
      recommendedFocusOrder: ['Fatherland Front', 'Alpine Defense', 'Steyr Expansion', 'Seek Italian Protection', 'Reject Anschluss', 'Declare Independence', 'Imperial Restoration']
    },
    stepByStepGameplan: {
      phase1: '1936-1937: Konsolidasi kekuasaan Front Tanah Air, kembangkan pabrik senjata Steyr, dan bangun benteng Alpen.',
      phase2: '1938: Gelar referendum kemerdekaan! Tolak ultimatum Anschluss Hitler dan minta bantuan intervensi Italia.',
      phase3: '1938-1941: Tahan serbuan pasukan Wehrmacht di Pegunungan Alpen bersama sekutu regional.',
      phase4: '1942-1945: Bangkitkan kembali kedaulatan Austria Raya yang merdeka dan bermartabat di jantung Eropa Tengah.'
    },
    startingForces: {
      divisions: 7,
      airplanes: 30,
      ships: 0,
      manpowerPool: '180 Ribu'
    },
    vitalResources: {
      surplus: ['Baja (Erzberg)', 'Aluminium'],
      deficits: ['Minyak', 'Karet'],
      oilStatus: 'Nol (Wajib Impor)',
      rubberStatus: 'Nol'
    }
  }
];
