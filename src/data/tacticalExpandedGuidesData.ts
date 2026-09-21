import { GuideSection } from '../types';

export const TACTICAL_EXPANDED_GUIDES_DATA: GuideSection[] = [
  // =========================================================================
  // 1. NAVAL INVASIONS & D-DAY
  // =========================================================================
  {
    id: 'g-exp-1',
    level: 'menengah',
    title: 'Panduan Lengkap Invasi Amfibi (Naval Invasions & D-Day)',
    subtitle: 'Kuasai syarat supremasi laut 50%+, kapasitas divisi laut, floating harbor, dan mengepung pelabuhan.',
    iconName: 'Anchor',
    category: 'Angkatan Laut',
    readTimeMinutes: 6,
    relatedCommand: 'transport 50',
    relatedDivisionSearch: 'marine',
    overview: 'Invasi amfibi adalah operasi militer paling berisiko sekaligus paling menentukan di HOI4. Menyerang langsung pelabuhan berbenteng sering kali berakhir bencana bantai; pemain ahli mendaratkan pasukan di samping pelabuhan lalu mengepungnya dari darat.',
    keyPoints: [
      {
        heading: 'Prasyarat Wajib Invasi Laut',
        description: 'Untuk meluncurkan invasi amfibi, kamu membutuhkan: 1) Riset teknologi Landing Craft (Naval Transport I/II/III); 2) Konvoi kapal angkut yang cukup di stockpile; 3) Keunggulan Laut (Naval Superiority) minimal 50% di SETIAP zona laut yang dilewati rute invasi.',
        proTip: 'Tugaskan armada kapal dengan misi "Naval Invasion Support" atau "Strike Force" di setiap zona laut untuk mendongkrak supremasi laut hingga 100%.',
        tags: ['Invasi Laut', 'Naval Superiority', 'Konvoi'],
        steps: [
          'Riset Transport I di pohon Naval (membuka batas 10 divisi invasi simultan).',
          'Pilih tentara, klik ikon perintah jangkar (Naval Invasion Order).',
          'Klik kiri pelabuhan keberangkatan (Harbor), lalu klik kanan provinsi pantai target pendaratan.',
          'Tunggu durasi persiapan (misal 7 hari per divisi di Transport I).',
          'Pastikan supremasi laut hijau (50%+) lalu tekan tombol panah eksekusi rencana.'
        ]
      },
      {
        heading: 'Taktik Pendaratan Pincer (Pincer Landing): Jangan Menabrak Pelabuhan Langsung!',
        description: 'Pelabuhan musuh (seperti Cherbourg atau Dover) hampir pasti dijaga oleh divisi infanteri berbenteng pesisir (Coastal Fort Level 3-5) yang memberikan penalti serangan amfibi -70%.',
        warning: 'Mendarat tepat di atas pelabuhan yang dijaga musuh berisiko membuat divisimu musnah tenggelam sebelum menembus pantai!',
        steps: [
          'Daratkan 2-3 divisi Marinir di ubin pantai kosong di sisi kiri dan kanan pelabuhan.',
          'Begitu mendarat, segera serang pelabuhan dari dua arah daratan (mengabaikan benteng pantai).',
          'Jika memiliki DLC No Step Back / Man the Guns, bawa "Floating Harbor" (Mulberry Harbor) yang memberikan suplai darurat selama 30 hari pertama sebelum pelabuhan permanen direbut.'
        ],
        tags: ['Pincer Landing', 'Floating Harbor']
      },
      {
        heading: 'Dukungan Tembakan Meriam Kapal (Shore Bombardment)',
        description: 'Tempatkan Battleship (BB) dan Heavy Cruiser (CA) di zona laut pesisir pendaratan. Meriam kaliber berat kapal perang memberikan debuff masif hingga -25% defense dan -25% attack kepada musuh yang bertahan di pantai.',
        tags: ['Shore Bombardment', 'Battleship']
      }
    ],
    summaryTips: [
      'Selalu gunakan divisi Marinir khusus (Marine Template dengan Engineer + Support Artillery) untuk gelombang pendaratan pertama.',
      'Segera setelah pelabuhan direbut, kirim 24 divisi reguler (Infanteri & Tank) melalui jalur laut biasa ke pelabuhan tersebut untuk memperluas kantong pantai.'
    ]
  },

  // =========================================================================
  // 2. STRATEGIC RESOURCES OF EUROPE
  // =========================================================================
  {
    id: 'g-exp-2',
    level: 'ahli',
    title: 'Peta Geopolitik Sumber Daya Eropa: Minyak Ploiesti & Besi Kiruna',
    subtitle: 'Analisis mendalam lokasi cadangan minyak, baja, aluminium, dan wolfram serta cara mengamankannya.',
    iconName: 'Flame',
    category: 'Ekonomi & Industri',
    readTimeMinutes: 5,
    relatedCommand: 'add_latest_equipment 5000',
    overview: 'Kekurangan bahan baku strategis adalah alasan utama keruntuhan Poros secara historis. Di HOI4, menguasai titik-titik tambang kritis di Eropa menentukan apakah pabrik senjatamu beroperasi 100% atau mandek karena kekurangan suplai.',
    keyPoints: [
      {
        heading: 'Minyak Ploiesti (Rumania) & Ladang Minyak Kaukasus (Baku)',
        description: 'Darat Eropa hampir tidak memiliki minyak bumi kecuali di Ploiesti (Rumania, ~80 minyak) dan Wina (Austria, ~6 minyak). Uni Soviet menguasai ladang minyak raksasa di Kaukasus (Baku & Grozny, 200+ minyak).',
        proTip: 'Sebagai Jerman, kamu WAJIB mengajak Rumania bergabung ke Poros sebelum 1940 atau menginvasi mereka. Tanpa minyak Rumania dan Synthetic Refineries, kapal selam dan tankmu akan kehabisan bahan bakar dalam waktu 60 hari perang!',
        tags: ['Minyak', 'Ploiesti', 'Baku']
      },
      {
        heading: 'Bijih Besi Kiruna (Swedia) & Rute Narvik',
        description: 'Swedia memiliki tambang bijih besi berkadar tinggi terkaya di Eropa utara (~125 Baja). Pada musim dingin, pelabuhan Teluk Bothnia membeku, sehingga Swedia mengekspor bijih besi melalui pelabuhan Narvik di Norwegia.',
        warning: 'Inilah alasan Jerman historis menginvasi Norwegia (Operasi Weserübung) untuk mencegah Inggris memblokade rute bijih besi Swedia.',
        tags: ['Baja', 'Kiruna', 'Narvik']
      },
      {
        heading: 'Aluminium Hungaria & Prancis Selatan vs Karet Asia Tenggara',
        description: 'Aluminium adalah nyawa industri dirgantara. Prancis menguasai deposit bauksit terbesar di Provence (~68 Aluminium) dan Hungaria (~58 Aluminium). Sementara karet (Rubber) 90% berasal dari Malaya dan Hindia Belanda.',
        steps: [
          'Bangun 8-12 Synthetic Refineries di Jerman Barat sejak 1937 untuk memproduksi Karet Sintetis.',
          'Riset teknologi Synthetic Rubber I-IV untuk melipatgandakan output karet per kilang.',
          'Jika bermain Poros, invasi Prancis Selatan sesegera mungkin untuk mengamankan bauksit Provence.'
        ],
        tags: ['Aluminium', 'Bauksit', 'Karet Sintetis']
      },
      {
        heading: 'Monopoli Wolfram di Semenanjung Iberia (Spanyol & Portugal)',
        description: 'Spanyol dan Portugal menguasai 80% cadangan Wolfram (Tungsten) Eropa. Logam ini sangat dibutuhkan untuk memproduksi amunisi penembus baja (AP) artileri dan tank menengah.',
        tags: ['Tungsten', 'Spanyol', 'Portugal']
      }
    ],
    summaryTips: [
      'Gunakan hukum perdagangan "Free Trade" di masa damai untuk mendapatkan buff kecepatan riset +10% dan output pabrik +15%.',
      'Saat perang meletus, segera ubah hukum ke "Export Focus" atau "Limited Exports" jika negaramu kehabisan sumber daya penting.'
    ]
  },

  // =========================================================================
  // 3. ARMORED TRAINS & ADVANCED LOGISTICS
  // =========================================================================
  {
    id: 'g-exp-3',
    level: 'menengah',
    title: 'Kereta Api Lapis Baja & Logistik Garis Depan (Armored Trains & Supply)',
    subtitle: 'Mengapa Supply Hub mahal, cara menyambung rel kereta api, dan fungsi kereta lapis baja anti-CAS.',
    iconName: 'Fuel',
    category: 'Logistik & Suplai',
    readTimeMinutes: 5,
    relatedCommand: 'ic',
    overview: 'Sistem logistik pasca DLC No Step Back bertumpu pada jaringan rel kereta api (Railways) dan Pusat Suplai (Supply Hubs). Tanpa rel yang tersambung dari ibu kota, divisimu di garis depan akan kelaparan, kehilangan perlengkapan, dan hancur tanpa sempat melawan.',
    keyPoints: [
      {
        heading: 'Misteri Mahalnya Supply Hub (20.000 IC)',
        description: 'Membangun satu Supply Hub baru memakan 20.000 IC (setara membangun 2.7 pabrik militer!). Oleh karena itu, JANGAN sering-sering membangun Supply Hub dari nol.',
        proTip: 'Lebih efektif merebut Supply Hub musuh yang sudah ada atau membangun jalur rel kereta api level 1-2 ke pelabuhan terdekat.',
        tags: ['Supply Hub', 'Railways', 'Biaya IC']
      },
      {
        heading: 'Kereta Api Biasa vs Kereta Api Lapis Baja (Armored Trains)',
        description: 'Kereta api biasa sangat rentan terhadap serangan misi Logistical Strike pesawat musuh (CAS/Tactical Bomber). Setiap kereta yang hancur memutus suplai ke beberapa divisi sekaligus.',
        warning: 'Jika musuh memiliki keunggulan udara di front, produksi minimal 10-20 Kereta Api Lapis Baja (Armored Trains) yang memiliki pertahanan anti-udara bawaan untuk menembak jatuh pesawat musuh.',
        tags: ['Armored Trains', 'Logistical Strike']
      },
      {
        heading: 'Tingkat Motorisasi Suplai (Horse vs Truck Motorization)',
        description: 'Secara default, Supply Hub mendistribusikan suplai menggunakan kuda dengan radius pendek. Klik ikon kuda pada komandan tentara atau Supply Hub dan ubah menjadi ikon Dua Truk (Motorized Level 2).',
        steps: [
          'Pilih markas tentara (Army Group).',
          'Klik ikon kuda di samping potret komandan hingga berubah menjadi dua truk.',
          'Radius distribusi suplai dari Supply Hub akan meningkat 200%, menjangkau 5-7 ubin provinsi lebih jauh!',
          'Pastikan memiliki cadangan 300-500 truk di gudang logistik nasional.'
        ],
        tags: ['Motorisasi Suplai', 'Truk']
      }
    ],
    summaryTips: [
      'Saat menginvasi Uni Soviet, rel kereta api Soviet memiliki lebar sepur (rail gauge) berbeda. Butuh beberapa hari bagi insinyur untuk mengonversi rel; tunggu sampai rel biru selesai tersambung sebelum melanjutkan ofensif tank.',
      'Selalu bangun rel kereta api minimal Level 2 untuk menghubungkan pelabuhan utama dengan pangkalan udara garis depan.'
    ]
  },

  // =========================================================================
  // 4. ATOMIC BOMBS & MANHATTAN PROJECT
  // =========================================================================
  {
    id: 'g-exp-4',
    level: 'ahli',
    title: 'Proyek Manhattan & Bom Atom (Nuclear Weapons & Reactors)',
    subtitle: 'Riset nuklir 1940-1945, percepatan produksi enriched uranium, dan meluncurkan bom atom taktis.',
    iconName: 'Zap',
    category: 'Intelijen & Politik',
    readTimeMinutes: 5,
    relatedCommand: 'nukes 10',
    overview: 'Senjata nuklir di HOI4 bukanlah tombol kiamat instan pembasmi dunia, melainkan pemecah kebuntuan medan tempur paling dahsyat. Menjatuhkan bom atom pada benteng level 10 atau ubin dengan 40 divisi musuh akan melenyapkan seluruh organisasi dan perlengkapan mereka seketika.',
    keyPoints: [
      {
        heading: 'Jalur Riset Teknologi Nuklir',
        description: 'Pohon riset Engineering memiliki cabang nuklir: Atomic Research (1940), Nuclear Reactor (1943), dan Nuclear Bomb (1945). Membutuhkan menteri "Nuclear Scientist" dan fokus nasional (seperti Proyek Manhattan AS atau Uranprojekt Jerman) untuk mempercepat riset.',
        tags: ['Riset Nuklir', 'Proyek Manhattan']
      },
      {
        heading: 'Kapasitas Reaktor & Akumulasi Bom Nuklir',
        description: 'Setelah meriset Nuclear Reactor, bangun bangunan Nuclear Reactor di provinsimu. Setiap reaktor menghasilkan enriched material. Semakin banyak reaktor yang aktif (misal 5-10 reaktor), semakin cepat persediaan bom nuklir terisi (bisa 1 bom per bulan).',
        tags: ['Reaktor Nuklir', 'Produksi Bom']
      },
      {
        heading: 'Syarat Meluncurkan Bom Atom',
        description: 'Untuk menjatuhkan bom atom di suatu provinsi musuh, kamu WAJIB memenuhi 3 syarat mutlak: 1) Memiliki minimal 1 stok bom atom; 2) Memiliki Strategic Bomber yang beroperasi di wilayah udara tersebut; 3) Menguasai minimal 75% Air Superiority di zona udara tersebut.',
        steps: [
          'Tugaskan sayap Strategic Bomber (pesawat pembom strategis) ke zona udara target.',
          'Pastikan pesawat tempurmu (Fighters) mendominasi udara hingga rasio mencapai 75%+ hijau.',
          'Klik provinsi musuh yang ingin dibom (misal Berlin, London, atau Moskow).',
          'Klik ikon jamur nuklir kecil di jendela informasi provinsi.',
          'Saksikan ledakan atom membakar seluruh instalasi militer!'
        ],
        tags: ['Syarat Drop Nuklir', 'Strategic Bomber']
      },
      {
        heading: 'Efek Nyata Bom Atom di HOI4',
        description: 'Bom atom menghancurkan 100% benteng (Forts), pangkalan udara, dan infrastruktur di provinsi tersebut. Seluruh divisi musuh yang berada di ubin tersebut kehilangan 100% Organization dan 50-80% HP perlengkapan. Selain itu, War Support dan Stabilitas negara musuh anjlok drastis!',
        proTip: 'Jika kamu menjatuhkan 2 bom atom di Jepang dan menguasai wilayah laut sekitarnya, Jepang akan memicu keputusan menyerah tanpa syarat (Unconditional Surrender) secara otomatis!',
        tags: ['Efek Ledakan', 'Kapitulasi Musuh']
      }
    ],
    summaryTips: [
      'Gunakan bom nuklir untuk menghancurkan ubin pegunungan atau rawa yang dipenuhi puluhan divisi musuh yang mustahil ditembus oleh tank biasa.',
      'Jangan tempatkan reaktor nuklir di dekat garis depan karena rentan direbut musuh.'
    ]
  },

  // =========================================================================
  // 5. PARATROOPERS & AIRBORNE OPERATIONS
  // =========================================================================
  {
    id: 'g-exp-5',
    level: 'menengah',
    title: 'Pasukan Terjun Payung (Paratroopers Meta): Merebut Pelabuhan Instan',
    subtitle: 'Kuasai Transport Planes, syarat Air Superiority 70%, dan strategi menjatuhkan Malta & Inggris.',
    iconName: 'Plane',
    category: 'Udara & CAS',
    readTimeMinutes: 4,
    relatedCommand: 'air_superiority',
    relatedDivisionSearch: 'airborne',
    overview: 'Paratroopers adalah unit komando paling mematikan untuk memotong garis suplai atau merebut pelabuhan laut musuh sebelum armada laut mereka sempat bereaksi.',
    keyPoints: [
      {
        heading: 'Syarat Eksekusi Penerjunan Payung',
        description: 'Divisi Paratroopers hanya dapat diterjunkan jika: 1) Pesawat Transport Plane ditempatkan di pangkalan udara yang sama dengan divisi; 2) Memiliki keunggulan udara (Air Superiority) minimal 70% di seluruh zona udara rute penerbangan; 3) Berat total divisi tidak melebihi kapasitas angkut pesawat.',
        proTip: 'Dibutuhkan setidaknya 50-100 Transport Planes untuk menerjunkan 8-12 divisi paratrooper sekaligus.',
        tags: ['Transport Plane', 'Air Superiority 70%']
      },
      {
        heading: 'Desain Template Paratrooper Ringan',
        description: 'Pasukan payung tidak boleh membawa tank atau artileri berat biasa. Gunakan template 10 Combat Width (5 Batalion Paratroopers) dengan Support Artillery, Support Anti-Air, dan Engineer Company.',
        warning: 'Paratroopers hanya membawa suplai bawaan untuk 72 jam pertama! Jika dalam 3 hari kamu gagal merebut kota atau pelabuhan, mereka akan kehabisan amunisi dan hancur.',
        tags: ['Template Payung', 'Suplai Darurat']
      },
      {
        heading: 'Operasi Sealion Kilat: Menjatuhkan Dover Tanpa Melawan Royal Navy',
        description: 'Royal Navy Inggris adalah momok bagi armada laut Jerman. Namun, Inggris sering kali menyisakan sedikit pasukan di pulau utama pada 1940.',
        steps: [
          'Kumpulkan 1.000 Fighter di Selat Inggris dan Inggris Selatan untuk meraih 70%+ Air Superiority.',
          'Tempatkan 10 divisi Paratroopers di pangkalan udara Calais / Cherbourg.',
          'Terjunkan pasukan payung langsung ke pelabuhan Dover dan ubin sekitarnya.',
          'Begitu pelabuhan Dover jatuh ke tangan Paratroopers, segera perintahkan 24 divisi Panzer Jerman berlayar dari Prancis masuk ke pelabuhan Dover!',
          'Inggris Raya akan menyerah dalam 1-2 pekan.'
        ],
        tags: ['Operasi Sealion', 'Dover']
      }
    ],
    summaryTips: [
      'Riset doktrin Special Forces cabang Airborne untuk mendapatkan buff Organization recovery dan combat drop bonus.',
      'Gunakan Paratroopers untuk menjatuhkan pulau benteng Malta di Mediterania agar suplai Inggris terputus total.'
    ]
  },

  // =========================================================================
  // 6. MILITARY INDUSTRIAL ORGANIZATIONS (MIO)
  // =========================================================================
  {
    id: 'g-exp-6',
    level: 'ahli',
    title: 'Organisasi Industri Militer (MIO): Krupp, Porsche & Tankograd',
    subtitle: 'Maksimalkan sistem MIO dari DLC Arms Against Tyranny: trait pohon talenta dan penugasan jalur perakitan.',
    iconName: 'Factory',
    category: 'Ekonomi & Industri',
    readTimeMinutes: 5,
    relatedCommand: 'ic',
    overview: 'Sistem MIO (Military Industrial Organizations) menggantikan desainer lama dengan pohon talenta dinamis. Setiap kali pabrikmu memproduksi perlengkapan di bawah naungan MIO, organisasi tersebut mendapatkan XP dan naik level, membuka buff permanen pada statistik senjata!',
    keyPoints: [
      {
        heading: 'Cara Kerja Leveling MIO',
        description: 'MIO memperoleh dana dan XP dari dua sumber: 1) Jumlah pabrik yang aktif memproduksi peralatan yang dirancang oleh MIO tersebut; 2) Riset teknologi yang relevan dengan spesialisasi MIO (misal riset tank memberikan XP pada Krupp/Porsche).',
        tags: ['Leveling MIO', 'XP MIO']
      },
      {
        heading: 'Pilihan Trait Spesialisasi: Armor vs Speed vs Production Cost',
        description: 'Saat MIO naik level, kamu mendapatkan Policy & Trait Points. Untuk Medium Tank, prioritaskan trait yang menambah Soft Attack (+10%), Max Speed (+5%), dan menurunkan Production Cost (-5%).',
        proTip: 'Jangan memilih trait yang memberikan penalti Reliability berlebihan kecuali kamu mengimbanginya dengan modul Wet Ammo Storage pada tank designer.',
        tags: ['Pohon Trait', 'Soft Attack']
      },
      {
        heading: 'Memperbarui Varian Produksi (Equipment Variant Update)',
        description: 'Ketika MIO-mu membuka trait baru yang hebat, peralatan yang sedang diproduksi di pabrik TIDAK otomatis mendapatkan buff tersebut.',
        steps: [
          'Buka menu Tank / Plane Designer.',
          'Klik tombol Update MIO Policy.',
          'Simpan varian baru (misal Panzer IV Ausf. G).',
          'Alihkan jalur pabrik ke varian baru tersebut. Efisiensi produksi hanya akan turun sedikit (sekitar 10%) namun perlengkapan barumu akan jauh lebih superior di medan tempur!'
        ],
        tags: ['Varian Baru', 'Efisiensi Pabrik']
      }
    ],
    summaryTips: [
      'Gunakan Political Power (PP) untuk merekrut MIO Funds sejak awal 1936 agar organisasi naik level sebelum perang dunia 1939.',
      'Untuk negara minor tanpa MIO kustom, gunakan Universal MIO yang memberikan buff serbaguna pada perlengkapan infanteri.'
    ]
  },

  // =========================================================================
  // 7. PEACE CONFERENCES & BORDER MANAGEMENT
  // =========================================================================
  {
    id: 'g-exp-7',
    level: 'menengah',
    title: 'Konferensi Perdamaian (Peace Conference Meta 100%): Mencegah Border Gore',
    subtitle: 'Cara menghitung skor perang, tuntutan armada laut (Take Navy), puppet resource rights, dan demiliterisasi.',
    iconName: 'Award',
    category: 'Intelijen & Politik',
    readTimeMinutes: 6,
    relatedCommand: 'annex',
    overview: 'Konferensi perdamaian di HOI4 menggunakan sistem giliran berbasis skor partisipasi perang (War Participation Score). Jika kamu tidak paham mekanismenya, AI sekutumu akan mengambil provinsi secara acak dan menciptakan "border gore" yang jelek serta merugikan industrimu.',
    keyPoints: [
      {
        heading: 'Cara Mengumpulkan War Participation Score Tertinggi',
        description: 'Skor perang dihitung dari: 1) Jumlah korban jiwa musuh yang kamu bunuh (Casualties inflicted); 2) Pendudukan provinsi musuh (Occupation score); 3) Pemboman strategis ke pabrik musuh (Strategic bombing); 4) Kerugian kapal perang musuh yang ditenggelamkan.',
        proTip: 'Melakukan pemboman strategis (Strategic Bombing) ke kota-kota musuh memberikan poin konferensi perdamaian yang sangat besar dengan risiko kehilangan pasukan yang minim!',
        tags: ['War Participation', 'Strategic Bombing']
      },
      {
        heading: 'Opsi Tuntutan Terbaik di Konferensi Perdamaian',
        description: 'Alih-alih menganeksasi seluruh wilayah secara langsung (yang membutuhkan banyak garrison polisi dan menimbulkan resistance), gunakan opsi strategis berikut:',
        steps: [
          'Take Navy (Rebut Kapal Perang): Tuntut seluruh armada kapal perang musuh (Cruisers, Battleships, Carriers) untuk langsung masuk ke armada lautmu!',
          'Puppet (Negara Boneka): Buat negara boneka. Negara boneka mempertahankan manpower asli mereka yang bisa kamu gunakan untuk merekrut divisi boneka.',
          'Resource Rights: Tuntut hak atas seluruh sumber daya minyak/baja negara boneka hanya dengan biaya 1 pabrik sipil!',
          'Demilitarized Zone: Demiliterisasi provinsi perbatasan untuk mencegah serangan balasan di masa depan.'
        ],
        tags: ['Take Navy', 'Puppet State', 'Resource Rights']
      },
      {
        heading: 'Trik Melewati Giliran (Pass Turn) untuk Menambah Poin',
        description: 'Jika pada giliran pertama kamu kekurangan skor untuk menganeksasi wilayah incaran, klik tombol "Pass" (Lewati Giliran). Setiap kali melewati giliran, poin partisipasimu akan bertambah +20-30% untuk giliran berikutnya!',
        warning: 'Hati-hati! Jika negaramu melewati giliran saat AI sekutu memiliki banyak poin, AI mungkin akan merebut provinsi tersebut mendahuluimu.',
        tags: ['Pass Turn', 'Trik Poin']
      }
    ],
    summaryTips: [
      'Selalu utamakan mengambil wilayah dengan cadangan minyak dan pabrik sipil padat terlebih dahulu.',
      'Jika bermain Poros, pastikan mengambil seluruh armada Royal Navy Inggris dan armada Prancis agar lautan dunia sepenuhnya berada di bawah kendalimu.'
    ]
  },

  // =========================================================================
  // 8. ANTI-SUBMARINE WARFARE (ASW)
  // =========================================================================
  {
    id: 'g-exp-8',
    level: 'menengah',
    title: 'Perang Anti-Kapal Selam (ASW): Memburu Wolfpack Kapal Selam Jerman',
    subtitle: 'Rancang Destroyer pemburu U-Boat dengan Sonar II, Depth Charges, dan radar laut untuk menjaga Atlantik.',
    iconName: 'Shield',
    category: 'Angkatan Laut',
    readTimeMinutes: 5,
    relatedCommand: 'research_on_icon_click',
    relatedDivisionSearch: 'destroyer',
    overview: 'Wolfpack kapal selam Jerman dapat menenggelamkan ratusan kapal konvoi Sekutu setiap bulan, memotong suplai logam dari koloni dan menenggelamkan divisi tentara yang berlayar melintasi samudra.',
    keyPoints: [
      {
        heading: 'Desain Khusus Destroyer Pemburu Kapal Selam (ASW Destroyer)',
        description: 'Kapal perusak biasa dengan meriam kecil tidak efektif membunuh kapal selam karena nilai Sub Detection yang rendah. Rancang Destroyer khusus berbiaya murah (800-1000 IC):',
        steps: [
          'Gunakan Sasis Destroyer 1936 atau 1940.',
          'Pasang modul Sonar II (menaikkan Sub Detection +24).',
          'Pasang modul Depth Charge Thrower II atau III (Sub Attack 30+).',
          'Pasang Radar Laut (Surface & Air Detection).',
          'Gunakan mesin dasar agar biaya produksi tetap murah untuk diproduksi massal.'
        ],
        tags: ['ASW Destroyer', 'Sonar II', 'Depth Charges']
      },
      {
        heading: 'Struktur Task Force Pemburu Kapal Selam',
        description: 'Bentuk Task Force berisi 6-8 Destroyer ASW per armada. Tugaskan misi "Convoy Escort" di sepanjang rute laut konvoi atau "Patrol" di selat sempit tempat kapal selam biasa berkumpul.',
        proTip: 'Tambahkan 1 Light Cruiser dengan modul Catapult Plane (pesawat intai ketapel) pada setiap armada patroli untuk mendongkrak deteksi laut hingga +30%.',
        tags: ['Convoy Escort', 'Task Force ASW']
      },
      {
        heading: 'Dukungan Udara Anti-Kapal Selam (Naval Bombers & Maritime Patrol)',
        description: 'Tempatkan pesawat Naval Bomber atau Maritime Patrol Bomber di pangkalan udara pesisir. Berikan misi "Naval Strike" di zona laut Atlantik. Pesawat pembom laut akan menyerang U-Boat saat kapal selam tersebut muncul ke permukaan untuk mengisi ulang baterai!',
        tags: ['Naval Bomber', 'Maritime Patrol']
      }
    ],
    summaryTips: [
      'Jangan pernah membiarkan divisi tentara darat berlayar di laut tanpa pengawalan armada kapal perusak.',
      'Klik jendela rute laut dan tutup zona laut berbahaya (misal Bay of Biscay) dengan status "Sea Zone Prohibited" agar kapal konvoimu berlayar memutar di rute yang lebih aman.'
    ]
  },

  // =========================================================================
  // 9. RADAR STATIONS & AIR DETECTION
  // =========================================================================
  {
    id: 'g-exp-9',
    level: 'pemula',
    title: 'Jaringan Radar & Deteksi Udara: Kunci Kemenangan Battle of Britain',
    subtitle: 'Cara kerja stasiun radar (Level 1-6), efisiensi intersepsi, dan mengungkap pergerakan armada laut musuh.',
    iconName: 'Zap',
    category: 'Udara & CAS',
    readTimeMinutes: 4,
    relatedCommand: 'ic',
    overview: 'Radar Station sering diabaikan oleh pemain pemula karena tidak menghasilkan pabrik atau senjata langsung. Faktanya, stasiun radar adalah pengganda kekuatan (force multiplier) paling dahsyat dalam pertempuran udara dan laut.',
    keyPoints: [
      {
        heading: 'Manfaat Stasiun Radar bagi Pesawat Tempur',
        description: 'Radar memancarkan gelombang deteksi yang menutupi seluruh zona udara di sekitarnya. Di zona yang tercover radar: 1) Pesawat tempurmu mendapatkan bonus Air Detection hingga +25%; 2) Pesawat pencegat (Interceptors) dapat menyergap pembom musuh bahkan di malam hari atau dalam cuaca badai kabut tebal!',
        tags: ['Radar Udara', 'Air Detection']
      },
      {
        heading: 'Radar Maritim: Mengungkap Armada Laut dan Kapal Selam Musuh',
        description: 'Stasiun radar pesisir (Level 3+) mendeteksi posisi kapal perang dan konvoi musuh di laut sekitar. Tanpa radar, kapal perangmu sering kali berlayar berhari-hari tanpa bisa menemukan posisi armada musuh.',
        proTip: 'Bangun radar level maksimal di Dover (Inggris), Brest (Prancis), dan Sisilia (Italia) untuk mengunci seluruh lalu lintas laut di selat sempit.',
        tags: ['Radar Maritim', 'Deteksi Armada']
      },
      {
        heading: 'Pengurangan Penalti Dekripsi Musuh',
        description: 'Jaringan radar terhubung dengan agensi intelijen; semakin padat stasiun radarmu di perbatasan, semakin sedikit intelijen militer yang dapat dicuri oleh mata-mata musuh.',
        tags: ['Kontra Intelijen', 'Radar Perbatasan']
      }
    ],
    summaryTips: [
      'Upgrade stasiun radar di ibu kota dan pusat industri penting untuk melindungi pabrik dari pemboman strategis musuh.',
      'Radar Level 6 di tahun 1944 memiliki radius jangkauan raksasa yang menutupi hampir sepertiga benua Eropa!'
    ]
  },

  // =========================================================================
  // 10. ESPIONAGE & COLLABORATION GOVERNMENT
  // =========================================================================
  {
    id: 'g-exp-10',
    level: 'ahli',
    title: 'Mata-Mata La Résistance: Kriptografi & Misi Collaboration Government',
    subtitle: 'Cara menaklukkan Uni Soviet atau Prancis dengan capitulation threshold instan dan memecahkan sandi Enigma.',
    iconName: 'Shield',
    category: 'Intelijen & Politik',
    readTimeMinutes: 6,
    relatedCommand: 'agency.autocomplete',
    overview: 'DLC La Résistance memperkenalkan agensi intelijen (Intelligence Agency). Taktik paling kuat di seluruh HOI4 adalah misi Collaboration Government: dengan 3 kali operasi mata-mata, kamu bisa memaksa Uni Soviet menyerah saat kamu baru merebut Moskow dan Stalingrad!',
    keyPoints: [
      {
        heading: 'Mendirikan Agensi Intelijen di 1936',
        description: 'Klik tab Agensi Intelijen (biaya 5 pabrik sipil selama 30 hari). Rekrut agen mata-mata pertama dan segera bangun upgrade departemen berikut: Cryptology Department, Form Department, dan Local Training Centers.',
        tags: ['Agensi Intelijen', 'Upgrade Agensi']
      },
      {
        heading: 'Misi Rahasia: Collaboration Government (Paling Wajib!)',
        description: 'Secara default, Uni Soviet hanya akan menyerah jika kamu merebut 90-95% poin kemenangan (Victory Points) mereka, yang mengharuskanmu berbaris ribuan kilometer hingga ke Vladivostok di timur jauh Siberia.',
        proTip: 'Jalankan misi "Prepare Collaboration Government" sebanyak 2-3 kali sebelum menyerang Soviet! Setiap misi sukses menambah +30-40% kepatuhan (compliance). Dengan 100% collaboration, Soviet akan menyerah seketika saat garis Leningrad-Moskow-Stalingrad jatuh!',
        steps: [
          'Tempatkan 2 mata-mata di Moskow untuk membangun Spy Network hingga mencapai 50%+ kekuatan jaringan.',
          'Pilih operasi "Prepare Collaboration Government" di jendela agensi.',
          'Kumpulkan perlengkapan yang diminta (Support Equipment + Truk sipil).',
          'Luncurkan operasi hingga selesai (memakan waktu ~90 hari per misi).',
          'Ulangi hingga tingkat kolaborasi mencapai 80-100%.'
        ],
        tags: ['Collaboration Government', 'Capitulation Threshold']
      },
      {
        heading: 'Departemen Kriptografi: Memecahkan Sandi Musuh (Cryptology)',
        description: 'Tugaskan kriptografer untuk memecahkan sandi enkripsi musuh (seperti Enigma Jerman). Begitu sandi selesai dipecahkan, simpan tombol "Reveal Cipher" hingga pertempuran besar dimulai!',
        warning: 'Mengaktifkan sandi yang terpecahkan memberi pasukanmu buff masif +15% Breakthrough, +15% Defense, dan +50% Naval Invasions planning speed selama 30 hari!',
        tags: ['Kriptografi', 'Pecah Sandi']
      }
    ],
    summaryTips: [
      'Negara yang ditaklukkan dengan 100% Collaboration Government memberikan 100% pabrik dan sumber daya mereka ke tanganmu tanpa resistensi gerilya!',
      'Gunakan mata-mata dengan trait "Illusionist" atau "Safe Cracker" untuk meningkatkan peluang keberhasilan misi tanpa tertangkap polisi rahasia musuh.'
    ]
  },

  // =========================================================================
  // 11. JET AIRCRAFT & V1/V2 ROCKETS
  // =========================================================================
  {
    id: 'g-exp-11',
    level: 'ahli',
    title: 'Senjata Rahasia PD II: Jet Fighter & Roket Balistik V1/V2',
    subtitle: 'Riset mesin jet ganda Me 262, roket peluncur berpemandu, dan melumpuhkan industri musuh tanpa pilot.',
    iconName: 'Flame',
    category: 'Udara & CAS',
    readTimeMinutes: 5,
    relatedCommand: 'research all',
    relatedDivisionSearch: 'jet',
    overview: 'Di tahun 1944-1945, era baling-baling piston mulai digantikan oleh mesin jet reaksi dan roket balistik berpemandu. Pesawat tempur jet memiliki kecepatan terbang luar biasa yang membuat pesawat baling-baling musuh mustahil mengejarnya.',
    keyPoints: [
      {
        heading: 'Pesawat Tempur Jet (Jet Fighter 1944/1945)',
        description: 'Dirancang menggunakan sasis Small Airframe modern yang dipasangkan dengan mesin Jet Engine ganda. Kecepatan terbangnya mencapai 900+ km/jam dengan Air Defense tinggi, membantai kawanan pembom musuh tanpa bisa ditembak balik.',
        tags: ['Jet Fighter', 'Me 262', 'Kecepatan 900 km/h']
      },
      {
        heading: 'Situs Peluncuran Roket (Rocket Sites) & V1/V2',
        description: 'Bangunan Rocket Site dibangun di peta layaknya pabrik. Setelah meriset Rocket Artillery dan Guided Missiles, situs roket ini secara otomatis memproduksi dan menembakkan roket balistik V2 ke kota-kota dan pabrik musuh di zona udara target.',
        proTip: 'Roket V2 tidak membutuhkan pilot dan TIDAK BISA ditembak jatuh oleh pesawat tempur atau anti-udara musuh! Kerusakan pemboman yang dihasilkan adalah 100% terjamin!',
        tags: ['Rocket Site', 'Roket V2', 'Anti-Intersepsi']
      }
    ],
    summaryTips: [
      'Mesin jet membutuhkan konsumsi minyak dan tungsten yang tinggi; pastikan pasokan sumber dayamu stabil sebelum mengalihkan seluruh pabrik ke jet.',
      'Gunakan roket V2 untuk menghancurkan pangkalan udara dan stasiun radar musuh sebelum meluncurkan invasi darat.'
    ]
  },

  // =========================================================================
  // 12. MAGINOT LINE & FORTRESS DEFENSE
  // =========================================================================
  {
    id: 'g-exp-12',
    level: 'menengah',
    title: 'Pertahanan Benteng Gali: Garis Maginot & Stalin Line',
    subtitle: 'Entrenchment 50+, Engineer Company, benteng Fort Level 7-10, dan cara menghancurkan benteng musuh.',
    iconName: 'Shield',
    category: 'Militer Darat',
    readTimeMinutes: 5,
    relatedCommand: 'foc',
    relatedDivisionSearch: 'infantry',
    overview: 'Benteng darat (Land Forts) di HOI4 mengurangi daya serang musuh sebesar -15% per level benteng (hingga maksimal penalti -99% pada Benteng Level 10). Mengetahui cara mempertahankan benteng dan cara meremukkannya adalah keahlian taktis tingkat tinggi.',
    keyPoints: [
      {
        heading: 'Mekanisme Entrenchment Maksimal',
        description: 'Setiap hari sebuah divisi berdiam di posisi tanpa bergerak, mereka menggali parit pertahanan (Entrenchment). Setiap poin entrenchment memberikan bonus +1% soft attack dan +1% defense saat diserang.',
        steps: [
          'Pasang Engineer Company (Insinyur Benteng) untuk menambah batas maksimal entrenchment +5 hingga +11 poin.',
          'Pilih jenderal dengan trait "Ambush Specialist" (+5 max entrenchment).',
          'Pilih doktrin Grand Battleplan (+10 max entrenchment).',
          'Hasil akhir: Entrenchment 45-55, melipatgandakan kekuatan tempur infanterimu hingga +55% saat bertahan!'
        ],
        tags: ['Entrenchment 50+', 'Engineer Company']
      },
      {
        heading: 'Mengapa Garis Maginot Nyaris Mustahil Ditembus?',
        description: 'Garis Maginot Prancis di perbatasan Alsace-Lorraine memiliki Land Fort Level 10. Pasukan Jerman yang menyerang langsung Maginot akan mengalami penalti serangan -99%, membuat jutaan prajurit tewas tanpa menghasilkan goresan pada defender Prancis.',
        warning: 'Itulah sebabnya doktrin blitzkrieg Jerman mengharuskan taktik "Around Maginot": menyerang Belgia dan Belanda untuk mengitari benteng tersebut melalui dataran rendah terbuka.',
        tags: ['Garis Maginot', 'Fort Level 10']
      },
      {
        heading: 'Cara Menembus Benteng Level Tinggi (Fort Breakers)',
        description: 'Jika kamu terpaksa harus menyerbu benteng tebal (seperti Sevastopol atau Siegfried Line):',
        steps: [
          'Gunakan Heavy Tank atau Heavy Tank Destroyer yang dilengkapi modul Dozer Blade.',
          'Sertakan Siege Artillery dan penasihat militer dengan trait "Fortress Buster".',
          'Kirim ratusan Strategic Bombers dan TAC Bombers dengan misi "Logistical / Strategic Strike" menargetkan Forts untuk merusak level benteng dari 10 turun ke 0.',
          'Serang benteng dari 3 atau 4 arah ubin provinsi berbeda secara simultan untuk mengurangi efektivitas benteng.'
        ],
        tags: ['Fortress Buster', 'Penghancur Benteng']
      }
    ],
    summaryTips: [
      'Jangan membangun benteng di atas Level 5 di garis depan yang dinamis; musuh akan memilih mengitari benteng tersebut daripada menyerangnya.',
      'Sungai lebar + Benteng Level 3 + Pegunungan adalah kombinasi pertahanan paling hemat biaya untuk membendung Uni Soviet atau Jerman.'
    ]
  },

  // =========================================================================
  // 13. TOTAL MOBILIZATION & WOMEN IN WORKFORCE
  // =========================================================================
  {
    id: 'g-exp-13',
    level: 'menengah',
    title: 'Ekonomi Perang Total (Total Mobilization) & Women in the Work Force',
    subtitle: 'Kombinasi hukum ekonomi meta: potong Consumer Goods hingga 10% tanpa kehilangan tenaga kerja militer.',
    iconName: 'Factory',
    category: 'Ekonomi & Industri',
    readTimeMinutes: 4,
    relatedCommand: 'manpower 500000',
    overview: 'Hukum ekonomi menentukan berapa persen pabrik sipilmu yang disita untuk kebutuhan rakyat (Consumer Goods Factories). Total Mobilization memotong Consumer Goods hingga hanya 10%, namun memiliki efek samping berbahaya: memotong populasi rekrutan tentara sebesar -3%!',
    keyPoints: [
      {
        heading: 'Keunggulan Brutal Total Mobilization',
        description: 'Dibandingkan War Economy (20% Consumer Goods), Total Mobilization hanya menyisakan 10% Consumer Goods serta memberikan buff kecepatan konstruksi pabrik militer +30% dan kecepatan konversi pabrik +30%. Ini membebaskan puluhan pabrik sipil untuk proyek konstruksi raksasa.',
        tags: ['Total Mobilization', 'Consumer Goods 10%']
      },
      {
        heading: 'Trik Menetralkan Debuff Manpower: Women in the Work Force',
        description: 'Penalti -3% Recruitable Population dari Total Mobilization dapat menghabiskan seluruh cadangan manpower negara minor atau Jerman.',
        proTip: 'Segera setelah kamu mengaktifkan Total Mobilization, buka tab Keputusan (Decisions) dan ambil keputusan "Women in the Work Force" (biaya 100 PP dan 5% Stabilitas). Keputusan ini memberikan kembali +3% Recruitable Population, sepenuhnya menetralkan penalti tersebut!',
        tags: ['Women in Workforce', 'Trik Manpower']
      }
    ],
    summaryTips: [
      'Pastikan War Support negaramu mencapai minimal 80% sebelum dapat memilih Total Mobilization.',
      'Untuk negara dengan manpower raksasa seperti Uni Soviet dan AS, Total Mobilization adalah hukum ekonomi wajib nomor satu.'
    ]
  },

  // =========================================================================
  // 14. SPECIAL FORCES (MARINES & MOUNTAINEERS)
  // =========================================================================
  {
    id: 'g-exp-14',
    level: 'menengah',
    title: 'Doktrin Pasukan Khusus: Marinir Amfibi & Komando Gunung',
    subtitle: 'Rancang Amtracs & Amphibious Tanks untuk Pasifik, dan Mountaineers pack artillery untuk Alpen & Kaukasus.',
    iconName: 'Shield',
    category: 'Militer Darat',
    readTimeMinutes: 5,
    relatedCommand: 'xp 500',
    relatedDivisionSearch: 'marine',
    overview: 'Pasukan Khusus (Special Forces) dibatasi oleh kuota maksimal (Special Forces Cap, ~5-10% dari total angkatan bersenjata). Namun dengan doktrin Special Forces baru di DLC AAT, pasukan khususmu dapat di-upgrade menjadi mesin tempur elit yang kebal terhadap penalti medan ganas.',
    keyPoints: [
      {
        heading: 'Marinir Modern: Amtracs & Amphibious Tanks',
        description: 'Marinir biasa yang hanya membawa senapan infanteri masih rentan terhadap tembakan artileri pantai. Gantikan batalion Marinir dengan Amtracs (traktor amfibi lapis baja) dan Amphibious Tanks.',
        proTip: 'Divisi Amtrac memiliki 0% penalti serangan saat melintasi sungai lebar atau mendarat dari laut, sekaligus memiliki nilai Armor dan Hardness tinggi yang membuat infanteri defender tak berdaya!',
        tags: ['Amtracs', 'Amphibious Tank', 'Marinir']
      },
      {
        heading: 'Mountaineers: Raja Pegunungan Alpen, Norwegia & Kaukasus',
        description: 'Medan pegunungan (Mountain) memberikan penalti serangan -50% dan penalti kecepatan -40% bagi infanteri biasa. Divisi Mountaineers yang dipersenjatai dengan Pack Artillery justru mendapatkan bonus serangan +35% di bukit dan gunung!',
        tags: ['Mountaineers', 'Pegunungan']
      }
    ],
    summaryTips: [
      'Gunakan Army XP untuk mengambil doktrin Special Forces sedini mungkin.',
      'Tempatkan 12 divisi Mountaineers di front Alpen Italia-Prancis untuk memblokade pasukan musuh dengan perbandingan korban 1:10.'
    ]
  },

  // =========================================================================
  // 15. CHINA SURVIVAL & UNITED FRONT STRATEGY
  // =========================================================================
  {
    id: 'g-exp-15',
    level: 'ahli',
    title: 'Strategi Khusus Tiongkok: Mematahkan Invasi Jepang 1937',
    subtitle: 'Bentuk United Front, evakuasi industri ke Chongqing, ledakkan tanggul Sungai Kuning, dan atrisi Jepang.',
    iconName: 'Award',
    category: 'Intelijen & Politik',
    readTimeMinutes: 6,
    relatedCommand: 'pp 500',
    relatedDivisionSearch: 'infantry',
    overview: 'Bermain sebagai Tiongkok Nasionalis (Chiang Kai-shek) adalah salah satu tantangan paling intens di HOI4. Kamu tertinggal puluhan tahun secara teknologi, dihambat oleh warlord korup, dan diserang oleh militer modern Jepang pada pertengahan 1937.',
    keyPoints: [
      {
        heading: 'Fokus Utama 1936: Bentuk Chinese United Front',
        description: 'Selesaikan fokus "United Front" untuk mengajak Partai Komunis Tiongkok (Mao Zedong), Shanxi, Guangxi, dan warlord lainnya bersatu dalam satu faksi anti-Jepang. Semua pasukan warlord akan tunduk di bawah koordinasimu.',
        tags: ['United Front', 'Tiongkok vs Jepang']
      },
      {
        heading: 'Strategi Pertahanan Sungai Kuning (Yellow River Defense)',
        description: 'Jangan bertempur di dataran terbuka Beijing atau pantai Shanghai di mana meriam laut dan pesawat Zero Jepang berkuasa bebas. Tarik pasukanmu ke balik Sungai Kuning yang lebar.',
        steps: [
          'Tempatkan 48 divisi infanteri berbaris di sepanjang tepi selatan Sungai Kuning.',
          'Penalti menyeberangi sungai (-50% serangan Jepang) akan menggagalkan seluruh serangan divisi lapis baja Jepang.',
          'Jika posisi terancam, gunakan keputusan "Blow Yellow River Dikes" untuk membanjiri provinsi utara, menenggelamkan ribuan tentara Jepang dan melumpuhkan logistik mereka!'
        ],
        tags: ['Sungai Kuning', 'Tanggul Banjir']
      },
      {
        heading: 'Evakuasi Industri ke Pegunungan Chongqing',
        description: 'Pindahkan ibu kota dari Nanjing ke Chongqing. Wilayah Sichuan berpegunungan tinggi dan memiliki sungai deras yang mustahil ditembus oleh tentara darat Jepang. Bangun pabrik senapan dasar di pedalaman.',
        tags: ['Chongqing', 'Evakuasi Pabrik']
      }
    ],
    summaryTips: [
      'Gunakan doktrin Mass Assault (Mass Mobilization) untuk mendapatkan bonus +5% recruitable population dan kecepatan recovery organisasi yang kilat.',
      'Gunakan 50 divisi milisi murah tanpa artileri murni untuk menjaga seluruh garis pantai dari ancaman invasi laut amfibi marinir Jepang.'
    ]
  },

  // =========================================================================
  // 16. DIPLOMACY & VOLUNTEERS
  // =========================================================================
  {
    id: 'g-exp-16',
    level: 'pemula',
    title: 'Diplomasi & Mengirim Relawan (Send Volunteers & Air Attache)',
    subtitle: 'Kumpulkan ribuan Army & Air XP sejak 1936 di Perang Saudara Spanyol tanpa terlibat perang dunia langsung.',
    iconName: 'Globe',
    category: 'Intelijen & Politik',
    readTimeMinutes: 4,
    relatedCommand: 'xp 200',
    overview: 'Pemain pemula sering menghabiskan tahun 1936-1939 hanya menonton waktu berjalan. Pemain pro memanfaatkan konflik lokal (seperti Perang Saudara Spanyol dan Perang Tiongkok-Jepang) untuk mengirim pasukan sukarelawan (Volunteers) dan Atase Militer guna mengumpulkan ratusan Army XP dan Air XP.',
    keyPoints: [
      {
        heading: 'Mengirim Divisi Relawan (Send Volunteers)',
        description: 'Saat Perang Saudara Spanyol meletus (Juli 1936), klik kanan Spanyol Nasionalis (jika kamu Poros) atau Spanyol Republikan (jika kamu Soviet/Demokratis), lalu pilih "Send Volunteers".',
        proTip: 'Kirim divisi Tank terbaikmu (misal 2 divisi Panzer Jerman atau 2 divisi T-26 Soviet). Kendarai tank tersebut secara manual untuk memotong garis depan dan melatih komandan perangmu hingga mencapai Level 6!',
        tags: ['Send Volunteers', 'Spanyol 1936']
      },
      {
        heading: 'Kirim Relawan Udara (Air Volunteers) & Military Attache',
        description: 'Selain pasukan darat, kamu dapat mengirim 100-200 pesawat tempur (Air Volunteers) untuk mendapatkan Air XP gratis setiap hari.',
        steps: [
          'Kirim Military Attache ke negara yang sedang berperang (biaya 100 PP).',
          'Attache memberikan +10% dari seluruh Army XP yang diperoleh negara tersebut kepadamu!',
          'Attache juga mendongkrak War Support negaramu sebesar +10%, memungkinkanmu menaikkan hukum ekonomi ke War Economy lebih cepat!'
        ],
        tags: ['Military Attache', 'Air XP Gratis']
      }
    ],
    summaryTips: [
      'Army XP yang kamu kumpulkan di Spanyol dapat langsung digunakan untuk mendesain template 30w Medium Tank sebelum 1938.',
      'Latih jenderalmu hingga mendapatkan trait "Panzer Leader" dan "Trickster" di medan tempur Spanyol.'
    ]
  }
];
