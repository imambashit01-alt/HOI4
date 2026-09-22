export type PlaybookPillar =
  | 'rich'
  | 'war'
  | 'politics'
  | 'world_domination'
  | 'navy'
  | 'logistics'
  | 'espionage'
  | 'wunderwaffe';

export interface PlaybookSection {
  id: string;
  pillar: PlaybookPillar;
  title: string;
  subtitle: string;
  badge: string;
  icon: string;
  readingTime: string;
  summary: string;
  coreFormulas: {
    label: string;
    value: string;
    description: string;
  }[];
  stepByStepGuide: {
    step: number;
    title: string;
    timing: string;
    details: string;
    proTip?: string;
    warning?: string;
  }[];
  dosAndDonts: {
    dos: string[];
    donts: string[];
  };
  metaChecklist: string[];
}

export const MASTER_PLAYBOOK_DATA: PlaybookSection[] = [
  // 1. CARA MENJADI KAYA
  {
    id: 'playbook-rich',
    pillar: 'rich',
    title: 'CARA MENJADI KAYA: Industri Snowball, Efisiensi Pabrik & Rampasan Perang',
    subtitle: 'Kuasai transisi Civs ke Mils, tekan Consumer Goods hingga <10%, dan lipat gandakan kapasitas pabrik tanpa batas.',
    badge: 'Ekonomi Snowball Tier S',
    icon: 'Factory',
    readingTime: '6 Menit Baca',
    summary: 'Ekonomi di HOI4 adalah perlombaan eksponensial. Siapa yang memiliki Pabrik Sipil (Civs) terbanyak di tahun 1938 akan mampu membangun 100+ Pabrik Militer (Mils) dalam sekejap pada tahun 1939. Kunci utamanya adalah memanfaatkan efisiensi infrastruktur dan menekan barang konsumsi.',
    coreFormulas: [
      {
        label: 'Bonus Infrastruktur',
        value: '+20% / Level',
        description: 'Membangun di provinsi Infra Lv.5 memberi +100% kecepatan bangun pabrik (2x lebih cepat dibanding Infra Lv.0).'
      },
      {
        label: 'Pajak Consumer Goods',
        value: 'Turun ke 10-15%',
        description: 'Civilian Economy menyita 35% pabrik. War Economy hanya 20%, dan Total Mobilization hanya 10%.'
      },
      {
        label: 'Rasio Snowball 1936-39',
        value: '1936-37 Civs -> 1938 Pivot -> 1939 Mils',
        description: 'Jangan bangun Mils di 1936 karena alutsista 1936 akan usang, sedangkan Civs melipatgandakan output masa depan.'
      },
      {
        label: 'Free Trade Bonus',
        value: '+15% Riset & +10% Output',
        description: 'Kebijakan Free Trade memberikan boost riset dan pabrik terbesar, serta menarik devisa civs dari negara pengimpor.'
      }
    ],
    stepByStepGuide: [
      {
        step: 1,
        title: 'Fase Fondasi Sipil (Januari 1936 - Pertengahan 1937)',
        timing: 'Hari ke-1 s/d Hari ke-500',
        details: 'Urutkan antrean konstruksi: HANYA bangun Pabrik Sipil (Civs). Pilih negara bagian (states) dengan slot bangunan tertinggi dan infrastruktur minimal Level 4 atau Level 5. Jangan pernah membangun pabrik di provinsi dengan infra rendah.',
        proTip: 'Jika ada provinsi dengan slot kosong banyak tapi infra baru Lv.2-3, upgrade infra dulu ke Lv.4-5 baru pasang deretan pabrik.'
      },
      {
        step: 2,
        title: 'Penekanan Consumer Goods & Pergantian Hukum Ekonomi',
        timing: '150 Political Power Pertama',
        details: 'Begitu World Tension mencapai syarat atau kamu punya fokus perang, langsung ubah hukum ekonomi dari Civilian Economy -> Early Mobilization -> Partial Mobilization -> War Economy. Di War Economy, puluhan pabrik sipil yang tadinya terkunci langsung terbuka untuk konstruksi.',
        warning: 'Total Mobilization memotong 3% Manpower. Jangan aktifkan jika manpower negaramu kritis, KECUALI kamu bisa mengambil keputusan "Women in the Workforce" yang mengembalikan +3% manpower.'
      },
      {
        step: 3,
        title: 'Pivot ke Pabrik Militer & Kilang Sintetis (1938 - 1939)',
        timing: '18 Bulan Sebelum Perang',
        details: 'Pabrik Militer membutuhkan 6-12 bulan untuk mengakumulasi "Production Efficiency" hingga 100%. Oleh karena itu, di pertengahan 1938 ubah 100% antrean ke Pabrik Militer, Senapan Infanteri 1939, Artileri II, dan Pesawat Tempur 1940.',
        proTip: 'Jika bermain Jerman atau Jepang yang rentan diblokade laut Sekutu, bangun 4-8 Synthetic Refineries dan riset teknologi katalis batubara untuk mandiri Karet & Minyak.'
      },
      {
        step: 4,
        title: 'Eksploitasi 100% Rampasan Perang via Collaboration Government',
        timing: 'Masa Perang & Pendudukan',
        details: 'Gunakan Badan Intelijen (Spy Agency) untuk menjalankan misi "Prepare Collaboration Government" 2 hingga 3 kali di negara target sebelum kamu invasi (misal Jerman ke Uni Soviet, atau Jepang ke Tiongkok). Saat musuh kapitulasi, kamu langsung mendapatkan 90-100% Compliance!',
        proTip: 'Compliance 100% berarti kamu menyerap 100% pabrik dan 100% sumber daya negara jajahan tanpa perlawanan gerilyawan partisan dan tanpa membuang manpower untuk garnisun.'
      }
    ],
    dosAndDonts: {
      dos: [
        'Selalu tempatkan menteri "Captain of Industry" (+10% Construction Speed) secepatnya.',
        'Aktifkan Free Trade jika kamu punya surplus sumber daya untuk mendapatkan pabrik gratis dari pembeli asing.',
        'Di Konferensi Perdamaian, ambil "War Reparations" dan "Resource Rights" untuk memeras ekonomi lawan.',
        'Bangun Fuel Silo jika negaramu surplus minyak agar cadangan bahan bakar tidak tumpah sia-sia.'
      ],
      donts: [
        'JANGAN bangun Pabrik Militer di Januari 1936; ini membatasi kapasitas industri masa depanmu.',
        'JANGAN mengimpor sumber daya berlebihan (1 civ ditukar 8 unit bahan mentah; pastikan pabrik benar-benar butuh).',
        'JANGAN biarkan stabilitas negaramu anjlok di bawah 50%, karena stabilitas rendah memberi penalti Consumer Goods hingga +10-20%.',
        'JANGAN gunakan hukum ekonomi Civilian Economy lebih lama dari yang diwajibkan game.'
      ]
    },
    metaChecklist: [
      'Pabrik sipil dibangun hanya di infrastruktur Level 4-5',
      'Hukum ekonomi dinaikkan ke War Economy / Total Mobilization',
      'Penasihat Captain of Industry aktif di kabinet',
      'Misi Collaboration Government selesai sebelum kapitulasi target perang',
      'Pabrik militer mulai diproduksi massal 18 bulan sebelum letusan perang'
    ]
  },

  // 2. CARA MEMENANGKAN PERANG DARAT & UDARA
  {
    id: 'playbook-war',
    pillar: 'war',
    title: 'CARA MEMENANGKAN PERANG: Doktrin, Divisi Meta, Langit CAS & Encirclement',
    subtitle: 'Hancurkan ratusan divisi musuh dengan rasio korban 1:10 melalui kombinasi parit infanteri, pincer tank, dan Close Air Support.',
    badge: 'Taktik Tempur Darat & Udara',
    icon: 'Swords',
    readingTime: '7 Menit Baca',
    summary: 'Perang di HOI4 bukan adu dorong garis lurus. Dorong garis lurus (frontline battleplan) hanya akan membakar manpower dan peralatanmu. Kemenangan mutlak diraih dengan mengunci musuh di parit pertahanan murah, sementara 4-6 divisi tank menusuk celah dataran untuk melingkari (encircle) dan memotong logistik musuh di bawah naungan payung udara CAS.',
    coreFormulas: [
      {
        label: 'Meta Combat Width',
        value: '15w-18w Def / 30w-35w Off',
        description: 'Lebar tempur 15w-18w ideal untuk bertahan di hutan/pegunungan. 30w-35w ideal untuk Panzer Spearhead di dataran.'
      },
      {
        label: 'Dampak Superioritas Udara',
        value: '-35% Defense Musuh',
        description: 'Memegang superioritas udara hijau memotong defense dan movement speed musuh hingga sepertiga.'
      },
      {
        label: 'Damage CAS ke Organisasi',
        value: 'Bypass Armor & Forts',
        description: 'Serangan CAS menghantam langsung organisasi dan HP musuh tanpa terpengaruh oleh benteng Level 10 sekalipun.'
      },
      {
        label: 'Encirclement Penalty',
        value: '-30% Org & Attrition',
        description: 'Divisi yang terkepung tanpa pasokan suplai kehilangan seluruh org dan langsung terhapus saat kalah pertempuran.'
      }
    ],
    stepByStepGuide: [
      {
        step: 1,
        title: 'Siapkan Divisi Garis Depan Murah (Tembok Parit)',
        timing: 'Sebelum Perang Dimulai',
        details: 'Gunakan template 9 Infanteri (18w) atau 8 Infanteri (16w) dengan Support Company: Engineer (Entrenchment), Support Artillery (Soft Attack), dan Support Anti-Air. Anti-Air adalah kunci rahasia: meriam AA memotong damage CAS musuh hingga 75% dan memberi piercing cukup untuk menembus tank ringan lawan.',
        proTip: 'Divisi ini tidak untuk menyerang! Tugas mereka hanya menahan garis dan menyerap serangan lawan dengan bonus benteng tanah entrenchment.'
      },
      {
        step: 2,
        title: 'Bentuk Pasukan Pemukul Khusus (Tank Spearhead 30-35w)',
        timing: 'Produksi 4 hingga 8 Divisi',
        details: 'Jangan sebarkan tankmu ke seluruh garis depan! Kumpulkan semua tank ke dalam satu korps (4-6 divisi). Gunakan template 8 Medium Tank + 7 Motorized/Mechanized (Combat Width 30-34) dengan Support Flame Tank, Support Artillery, dan Logistics Company. Hasilkan Soft Attack > 450 dan Breakthrough > 400.',
        warning: 'Pastikan rasio Organization tank spearhead minimal 30. Jika org di bawah 30, tambahkan batalion Motorized/Mechanized.'
      },
      {
        step: 3,
        title: 'Raja Langit: Desain Fighter Meta & Hujan Bom CAS',
        timing: 'Riset Airframe 1940',
        details: 'Di udara, buat Small Airframe 1940 dengan Engine 3, pasang 2x Heavy Machine Gun (4x) untuk daya tembak udara tertinggi, serta Armor Plate dan Drop Tanks. Buat CAS dengan Bomb Locks. Taruh 500-1000 Fighter untuk merebut udara hijau, lalu terbangkan 500 CAS untuk membantai musuh di darat.',
        proTip: 'CAS yang terbang di atas pertempuran darat memberikan damage harian langsung ke HP musuh tanpa mempedulikan seberapa tebal baja mereka.'
      },
      {
        step: 4,
        title: 'Taktik Menjepit (Pincer Movement) & Kantong Kematian',
        timing: 'Eksekusi Serangan',
        details: 'Pilih 2 titik serangan yang berupa medan Dataran (Plains) dan tidak melewati sungai besar. Konsentrasikan tank spearheadmu di dua titik ini. Serang manual (Micro-management), tembus garis musuh, lalu arahkan kedua ujung tombak untuk bertemu di Supply Hub musuh di belakang garis depan.',
        proTip: 'Saat 20-50 divisi musuh terjebak dalam kantong tanpa suplai, tunggu 3-5 hari hingga organisasi mereka jatuh ke 0, lalu perintahkan infanteri membersihkan kantong tersebut. Seluruh pasukan musuh hancur total!'
      }
    ],
    dosAndDonts: {
      dos: [
        'Selalu ubah motorisasi Supply Hub di garis depan ke Truk Tingkat Tiga (3 Truk) untuk suplai maksimal.',
        'Gunakan perintah Spearhead (anak panah ganda) alih-alih Offensive Line biasa saat merencanakan terobosan.',
        'Sertakan Support Anti-Air di setiap template divisi untuk melindungi prajurit dari serangan CAS musuh.',
        'Kuasai pelabuhan musuh terlebih dahulu jika melakukan invasi laut (Naval Invasion).'
      ],
      donts: [
        'JANGAN pernah menyerang jika indikator suplai berwarna merah (atrisi logistik akan menghancurkan 50% tankmu sendiri).',
        'JANGAN menyerang melewati sungai besar atau ke pegunungan tinggi menggunakan divisi tank.',
        'JANGAN tekan tombol aktifkan rencana tempur (Battle Plan Execution) membabi-buta di sepanjang garis perbatasan.',
        'JANGAN biarkan armada kapal indukmu berlayar tanpa kapal pengawal destroyer (wajib rasio 4 screen per 1 capital).'
      ]
    },
    metaChecklist: [
      'Infanteri 16w-18w dengan Support AA & Engineer menjaga perbatasan',
      'Korps Tank 30w-35w terkonsentrasi di satu sektor sempit dataran',
      'Superioritas udara hijau di zona pertempuran aktif',
      'Supply Hub garis depan disetel ke motorisasi penuh 3 truk',
      'Target serangan difokuskan memotong jalur rel kereta api dan pelabuhan lawan'
    ]
  },

  // 3. CARA MENGUASAI POLITIK & STABILITAS
  {
    id: 'playbook-politics',
    pillar: 'politics',
    title: 'CARA MENGUASAI POLITIK: Political Power, Kabinet S-Tier & Stabilitas 90%+',
    subtitle: 'Manajemen PP optimal, pertahankan stabilitas 80%+, dan kelola hukum wajib militer tanpa merusak industri.',
    badge: 'Politik & Stabilitas Absolut',
    icon: 'Landmark',
    readingTime: '5 Menit Baca',
    summary: 'Political Power (PP) adalah urat nadi negara. Membuang PP untuk keputusan yang salah di 100 hari pertama akan melumpuhkan ekspansi negaramu. Pahami hierarki pengeluaran PP, cara menjaga stabilitas di atas 80% untuk bonus industri raksasa, dan bagaimana agen rahasia dapat menaklukkan musuh dari dalam.',
    coreFormulas: [
      {
        label: 'Prioritas PP Pertama',
        value: 'Silent Workhorse (+15%)',
        description: 'Penasihat PP gain harus diambil pertama kali agar menghasilkan ratusan bonus PP sepanjang permainan.'
      },
      {
        label: 'Stabilitas > 80%',
        value: '+20% Pabrik & +10% PP',
        description: 'Stabilitas tinggi memberikan output pabrik terbesar dan mencegah pemogokan buruh (Strikes).'
      },
      {
        label: 'War Support > 80%',
        value: '+Mobilization Speed',
        description: 'War Support tinggi membuka hukum wajib militer agresif dan meningkatkan batas surrender limit negaramu.'
      },
      {
        label: 'Konskripsi Optimal',
        value: 'Extensive (5% Pop)',
        description: 'Extensive Conscription memberikan jumlah tentara masif tanpa penalti kecepatan pabrik atau efisiensi produksi.'
      }
    ],
    stepByStepGuide: [
      {
        step: 1,
        title: 'Urutan Belanja 150 Political Power Pertama',
        timing: 'Tahun 1936',
        details: 'Jangan boros PP untuk hubungan diplomatik yang tidak penting! Ikuti urutan mutlak ini: 1) Penasihat "Silent Workhorse" (+15% PP gain), 2) Ubah Hukum Ekonomi ke War Economy (saat syarat terpenuhi), 3) Ubah Hukum Perdagangan ke Free Trade, 4) Rekrut Penasihat Industri "Captain of Industry".',
        proTip: 'Jika memainkan negara demokrasi yang ingin beralih ke Fasis/Komunis, rekrut Fascist Demagogue / Communist Revolutionary pada slot pertama.'
      },
      {
        step: 2,
        title: 'Menjaga Stabilitas di Atas 80% Sepanjang Perang',
        timing: 'Selalu Aktif',
        details: 'Stabilitas adalah jantung efisiensi. Jika stabilitas jatuh di bawah 50%, peristiwa "Draft Dodging" dan "Strikes" akan mematikan 50% pabrikmu. Gunakan keputusan "Improve Worker Conditions" (+100 hari untuk +12% stabilitas permanen) dan lakukan propaganda secara berkala.',
        warning: 'Jangan ganti hukum wajib militer ke Service by Requirement jika tidak terdesak, karena akan memotong -10% stabilitas dan -10% factory output!'
      },
      {
        step: 3,
        title: 'Mendongkrak War Support via Atase Militer',
        timing: 'Juli 1936 & Juli 1937',
        details: 'Negara demokratis dan netral sering terkunci karena War Support rendah. Kirim Atase Militer ke Spanyol saat Perang Saudara Spanyol meletus (biaya 100 PP + 50 Command Power). Kamu akan mendapatkan +10% War Support instan, +10% Stabilitas, dan aliran Army XP gratis setiap hari!',
        proTip: 'Lakukan hal yang sama saat Jepang menyerang Tiongkok di pertengahan 1937 untuk aliran Army XP tanpa henti.'
      },
      {
        step: 4,
        title: 'Manajemen Hukum Wajib Militer (Konskripsi)',
        timing: 'Sesuai Kebutuhan Manpower',
        details: 'Mulai dari Volunteer Only -> Limited Conscription (2.5%) -> Extensive Conscription (5%). Jangan pernah melompat ke Service by Requirement (10%) kecuali jika cadangan manpower benar-benar di bawah 100.000 jiwa, karena penalti konstruksi -10% sangat merugikan.',
        proTip: 'Jika kamu menganeksasi wilayah musuh berpopulasi tinggi, bentuk divisi colonial template atau buat puppet agar bisa merekrut manpower mereka tanpa batas.'
      }
    ],
    dosAndDonts: {
      dos: [
        'Ambil menteri Silent Workhorse di awal untuk mengakselerasi perolehan PP tahun-tahun berikutnya.',
        'Jaga War Support di atas 80% agar tidak terkena debuff keputusasaan perang (War Weariness).',
        'Gunakan keputusan Improve Worker Conditions di tahun 1936 saat game masih damai.',
        'Manfaatkan jaminan kemerdekaan (Guarantees) secara taktis untuk mengendalikan World Tension.'
      ],
      donts: [
        'JANGAN habiskan PP untuk memengaruhi ideologi negara kecil yang tidak strategis.',
        'JANGAN menaikkan hukum wajib militer melampaui Extensive Conscription kecuali kolam manpower benar-benar kosong.',
        'JANGAN abaikan ancaman pemogokan buruh saat stabilitas turun; segera jalankan keputusan darurat pemulihan stabilitas.',
        'JANGAN biarkan slot riset kosong atau pabrik menganggur saat melakukan manuver politik.'
      ]
    },
    metaChecklist: [
      'Penasihat Silent Workhorse direkrut pada 150 PP pertama',
      'Stabilitas terjaga di atas 80% melalui Improve Worker Conditions',
      'Atase Militer terkirim ke Spanyol / Tiongkok untuk War Support & Army XP',
      'Hukum wajib militer tidak dinaikkan secara berlebihan tanpa kebutuhan mendesak',
      'Partai berkuasa memiliki popularitas > 70% untuk bonus stabilitas'
    ]
  },

  // 4. DOMINASI DUNIA & RENCANA TAKLUKKAN PLANET
  {
    id: 'playbook-world-domination',
    pillar: 'world_domination',
    title: 'DOMINASI DUNIA: Grand Strategy, Menghancurkan 3 Faksi & Kuasai Chokepoints',
    subtitle: 'Rencana induk menundukkan Sekutu, Poros, dan Komintern serta menguasai seluruh perlintasan laut bumi.',
    badge: 'Grand Strategy Penaklukan Global',
    icon: 'Globe',
    readingTime: '8 Menit Baca',
    summary: 'Dominasi dunia menuntut visi geopolitik menyeluruh. Kemenangan bukan hanya menaklukkan negara tetangga, melainkan memotong jalur hidup kekaisaran lawan dengan menguasai 4 chokepoints maritim dunia (Suez, Gibraltar, Panama, Singapura), memecah faksi raksasa menjadi negara boneka, dan mengeksekusi invasi samudra sebelum musuh sempat membangun benteng nuklir.',
    coreFormulas: [
      {
        label: '4 Gerbang Maritim Dunia',
        value: 'Suez, Gibraltar, Panama, Malaka',
        description: 'Menguasai keempat titik ini memotong 80% pergerakan armada laut dan suplai minyak Sekutu.'
      },
      {
        label: 'Puppet vs Annexation',
        value: 'Puppet Fleet & Manpower',
        description: 'Jadikan negara bertentara besar (seperti Hindia Belanda atau Tiongkok) sebagai Puppet untuk menyedot jutaan prajurit mereka.'
      },
      {
        label: 'Jendela Waktu Invasi AS',
        value: 'Sebelum Akhir 1941',
        description: 'Invasi Amerika Serikat sebelum mereka keluar dari Great Depression untuk kemenangan mudah tanpa duel nuklir.'
      },
      {
        label: 'Mekanisme War Score',
        value: 'Bombing & Casualties Taken',
        description: 'Beri damage bombing dan serahkan divisi penyerbu untuk meraup 60%+ poin di Konferensi Perdamaian.'
      }
    ],
    stepByStepGuide: [
      {
        step: 1,
        title: 'Tahap 1: Eliminasi Poros atau Sekutu di Daratan Eropa',
        timing: '1939 - 1941',
        details: 'Jika bermain Poros, habisi Prancis dalam hitungan minggu, lalu langsung siapkan Operasi Singa Laut (Sealion) menyeberang ke Dover sebelum armada AS datang. Jika bermain Sekutu, tahan Jerman di sungai dan habisi Italia terlebih dahulu dari Mediterania.',
        proTip: 'Jika Inggris kapitulasi pada 1940, seluruh Kerajaan Britania Raya beserta Malaya, Kanada, dan Australia akan menjadi rampasan perangmu di meja damai!'
      },
      {
        step: 2,
        title: 'Tahap 2: Penguncian Titik Cekik (Chokepoints) Maritim',
        timing: 'Pasca Kemenangan Eropa Barat',
        details: 'Rebut Terusan Suez dan Gibraltar. Dengan dua gerbang ini tertutup, Laut Mediterania menjadi danau tertutup milikmu. Semua armada kapal Sekutu di Laut Tengah akan kehabisan bahan bakar dan tenggelam.',
        warning: 'Jangan biarkan Singapura dan Selat Malaka jatuh ke tangan musuh jika kamu bermain di Asia Pasifik.'
      },
      {
        step: 3,
        title: 'Tahap 3: Menaklukkan Raksasa Benua (Soviet & Tiongkok)',
        timing: '1941 - 1943',
        details: 'Invasi Uni Soviet menuntut strategi 3 poros (Leningrad di utara, Moskow di tengah, Kaukasus di selatan). Gunakan tank untuk memotong ladang minyak Baku. Begitu cadangan bahan bakar Soviet habis, tank dan pesawat mereka berhenti bergerak.',
        proTip: 'Bentuk Collaboration Government hingga 90% sebelum Moskow jatuh agar kamu tidak perlu berurusan dengan pemberontakan partisan di Siberia.'
      },
      {
        step: 4,
        title: 'Tahap 4: Invasi Benua Amerika (Island Hopping Atlantik/Pasifik)',
        timing: '1943 - 1945',
        details: 'Gunakan Greenland -> Islandia -> Labrador (Kanada) sebagai batu loncatan pangkalan udara dan pelabuhan untuk menembus pantai timur Amerika Serikat. Bangun pangkalan udara Lv.10 di Nova Scotia dan terbangkan 2.000 pembom sebelum mendaratkan korps Panzer.',
        proTip: 'Gunakan Nuklir di Washington DC dan New York untuk meruntuhkan batas penyerahan AS dalam tempo 48 jam!'
      }
    ],
    dosAndDonts: {
      dos: [
        'Selalu aneksasi wilayah kaya industri (Civs/Mils) dan jadikan wilayah berpopulasi tinggi sebagai boneka (Puppet) untuk manpower.',
        'Kuasai pulau-pulau kecil strategis (Bermuda, Azores, Hawaii) untuk jangkauan pelayaran armada.',
        'Buat perjanjian non-agresi dengan salah satu faksi raksasa sebelum kamu siap bertarung di dua front.',
        'Sita seluruh armada laut musuh (Take Enemy Navy) di konferensi damai untuk memperkuat armada globalmu secara cuma-cuma.'
      ],
      donts: [
        'JANGAN biarkan perang berlarut-larut melewati tahun 1945 tanpa membendung produksi industri raksasa Amerika Serikat.',
        'JANGAN aneksasi 100% wilayah tanpa memeriksa kapasitas manpower garnisunmu (pemberontakan bisa menguras 1 juta manpower).',
        'JANGAN tinggalkan pantai tanpa garnisun divisi penjaga pelabuhan (Port Guard).',
        'JANGAN buka front perang baru jika logistik di front lama masih defisit.'
      ]
    },
    metaChecklist: [
      'Inggris atau Prancis ditaklukkan sebelum 1941',
      'Selat Gibraltar dan Terusan Suez dikendalikan penuh',
      'Armada kapal musuh disita pada konferensi perdamaian pertama',
      'Jalur invasi amfibi ke daratan Amerika Serikat telah disiapkan',
      'Seluruh front perang memiliki persediaan bahan bakar minimal 6 bulan'
    ]
  },

  // 5. DOMINASI LAUT & PERANG KONVOI
  {
    id: 'playbook-navy',
    pillar: 'navy',
    title: 'DOMINASI SAMUDRA: Komposisi Armada Meta 4:1, Carrier Strike & Wolfpack',
    subtitle: 'Kuasai matematika Naval Superiority, tenggelamkan armada induk musuh, dan cekik pasokan konvoi global.',
    badge: 'Doktrin & Desain Angkatan Laut',
    icon: 'Anchor',
    readingTime: '6 Menit Baca',
    summary: 'Pertempuran laut di HOI4 bukanlah misteri jika kamu memahami rasio "Screening". Kapal induk (Carrier) dan kapal perang berat (Battleship) akan langsung tenggelam jika tidak dilindungi oleh kapal perusak (Destroyer/Cruiser) dengan rasio minimal 4 kapal pengawal per 1 kapal utama. Pelajari formula armada strike force tak terkalahkan dan perang kapal selam mematikan.',
    coreFormulas: [
      {
        label: 'Rasio Mutlak Screening',
        value: 'Minimal 4 Screen : 1 Capital',
        description: 'Kurang dari rasio 4:1 membuat torpedo musuh lolos dan langsung menenggelamkan Kapal Induk dan Battleship milikmu.'
      },
      {
        label: 'Optimal Carrier Stacking',
        value: 'Maksimal 4 Carrier / Armada',
        description: 'Membawa lebih dari 4 Kapal Induk dalam satu pertempuran memberi penalti penumpukan (overstacking) hingga -80% sorti pesawat.'
      },
      {
        label: 'Naval Superiority Formula',
        value: 'Manpower Kapal + IC Kapal + Udara',
        description: 'Untuk meluncurkan Naval Invasion, kamu wajib memiliki >50% Naval Superiority di seluruh zona laut lintasan.'
      },
      {
        label: 'Rasio Pesawat Carrier',
        value: '2/3 Naval Bomber + 1/3 Fighter',
        description: 'Naval Bomber di atas carrier memberikan critical strike berlipat ganda dibanding pembom darat biasa.'
      }
    ],
    stepByStepGuide: [
      {
        step: 1,
        title: 'Desain Destroyer Screening Murah & Efektif',
        timing: 'Awal 1936',
        details: 'Gunakan lambung Destroyer 1936 atau 1940. Pasang 1 meriam ringan termurah, Engine terbaik, 1 Depth Charge (anti-kapal selam), dan Sonar. Jangan beri torpedo atau armor mahal! Tugas kapal ini hanya menjadi umpan dan perisai torpedo bagi armada utamamu.',
        proTip: 'Produksi massal 30-50 Destroyer murah ini dengan 5-10 galangan kapal tanpa henti.'
      },
      {
        step: 2,
        title: 'Bentuk Task Force Pemukul Utama (Strike Force Meta)',
        timing: 'Sebelum Pertempuran Laut Besar',
        details: 'Susun armada pamungkas dengan rumus: 4 Aircraft Carrier + 4 Heavy Cruiser/Battleship + 8 Light Cruiser (fokus Anti-Air & Light Gun) + 32 Destroyer. Tempatkan armada ini di pelabuhan terdekat dengan mode "Strike Force" dan "Always Engage".',
        warning: 'Jangan biarkan Strike Force berpatroli keliling samudra! Mereka akan menghabiskan seluruh cadangan minyakmu dalam 2 pekan.'
      },
      {
        step: 3,
        title: 'Pasukan Patroli Cepat (Patrol Fleets)',
        timing: 'Masa Perang Laut',
        details: 'Bentuk 4-6 skuadron patroli kecil berisi 1 Light Cruiser dengan Catapult Plane + Radar + Sonar dan 3 Destroyer cepat. Setel ke mode "Patrol" dan "Do Not Engage". Tugas mereka hanya mendeteksi keberadaan armada musuh, lalu Strike Force-mu akan keluar otomatis dari pelabuhan untuk menghancurkannya.',
        proTip: 'Light Cruiser dengan radar tingkat tinggi memiliki Surface Detection tertinggi di dalam game.'
      },
      {
        step: 4,
        title: 'Strategi Wolfpack: Mencekik Jalur Suplai Musuh',
        timing: 'Perang Atrisi Laut',
        details: 'Bagi 60-100 Kapal Selam (Submarine 1940 dengan Snorkel) ke dalam grup-grup kecil berisi 8-10 kapal selam di bawah pimpinan Laksamana ber-trait "Wolfpack". Sebarkan di rute dagang samudra terbuka dalam mode "Convoy Raiding".',
        proTip: 'Menenggelamkan konvoi suplai musuh akan membuat divisi musuh di seberang pulau mati kelaparan dan kehabisan amunisi!'
      }
    ],
    dosAndDonts: {
      dos: [
        'Selalu pertahankan rasio screening minimal 4 kapal Destroyer/Light Cruiser untuk tiap 1 Kapal Induk/Battleship.',
        'Pasang modul Snorkel pada semua kapal selam untuk mengurangi visibilitas hingga ke level tak terdeteksi.',
        'Bangun Pangkalan Laut (Naval Base) level 10 di kepulauan terdepan untuk jangkauan perbaikan kapal yang cepat.',
        'Terbangkan pesawat Naval Bomber berbasis darat di atas perairan dangkal untuk membantu pertempuran laut.'
      ],
      donts: [
        'JANGAN gabungkan lebih dari 4 Aircraft Carrier dalam satu gugus tugas pertempuran.',
        'JANGAN biarkan armada besarmu berpatroli tanpa target; minyakmu akan langsung kering dalam sekejap.',
        'JANGAN pernah berlayar di perairan dangkal (Shallow Seas seperti Selat Dover) menggunakan Battleship raksasa.',
        'JANGAN abaikan perbaikan kapal; selalu setel batas perbaikan armada ke "Split off for repair" agar kapal rusak tidak memperlambat seluruh armada.'
      ]
    },
    metaChecklist: [
      'Setiap gugus armada Strike Force memiliki rasio screening minimal 4:1',
      'Maksimal 4 Aircraft Carrier per gugus tugas untuk menghindari penalti overstacking',
      'Kapal selam dilengkapi modul Snorkel dan beroperasi di samudra dalam',
      'Skuadron patroli terpisah disetel ke perintah "Do Not Engage"',
      'Superioritas udara laut didukung oleh Naval Bomber dan Fighter darat'
    ]
  },

  // 6. JALUR REL & LOGISTIK GARIS DEPAN
  {
    id: 'playbook-logistics',
    pillar: 'logistics',
    title: 'LOGISTIK & KERETA API: Arteri Kemenangan, Supply Hubs & Bebas Atrisi',
    subtitle: 'Pahami sistem suplai No Step Back: bangun jalur rel kereta api, motorisasi truk level 3, dan cegah atrisi pembunuh divisi.',
    badge: 'Master Logistik & Rantai Suplai',
    icon: 'Truck',
    readingTime: '6 Menit Baca',
    summary: 'Sebanyak 80% kekalahan perang di HOI4 bukan karena alutsista yang buruk, melainkan matinya rantai logistik. Di dataran Rusia, padang pasir Afrika, atau rimba Tiongkok, divisi tanpa pasokan suplai akan kehilangan 90% pertahanan dan tank-tank akan ditinggalkan begitu saja karena mogok kehabisan solar. Kuasai mekanisme jaringan rel kereta api dan motorisasi Supply Hub.',
    coreFormulas: [
      {
        label: 'Kapasitas Jalur Rel',
        value: 'Level 1: 15 / Level 5: 35 Suplai',
        description: 'Jalur rel kereta api dari ibukota menentukan batas maksimum pasokan yang dapat dikirimkan ke garis depan.'
      },
      {
        label: 'Jangkauan Motorisasi Truk',
        value: 'Kuda (1x) -> Truk (3x)',
        description: 'Mengubah Supply Hub ke motorisasi 3 Truk melipatgandakan radius jangkauan suplai hingga 3 provinsi lebih jauh.'
      },
      {
        label: 'Atrisi Logistik Merah',
        value: '-50% Attack & -30% Org Recovery',
        description: 'Bertempur di zona suplai merah menghancurkan tank dan peralatanmu 5x lebih cepat dibanding pertempuran aktif.'
      },
      {
        label: 'Efisiensi Logistics Company',
        value: '-20% hingga -30% Supply Use',
        description: 'Support company logistik wajib dipasang pada semua divisi tank dan infanteri berukuran 30w+.'
      }
    ],
    stepByStepGuide: [
      {
        step: 1,
        title: 'Audit Jalur Kereta Api dari Ibukota ke Garis Depan',
        timing: 'Sebelum Operasi Dimulai',
        details: 'Tekan tombol F4 (Peta Suplai). Periksa garis rel kereta api yang menghubungkan ibukotamu dengan Supply Hub di perbatasan. Jika ada satu segmen rel yang masih Level 1 di tengah rute, kapasitas seluruh jalur tersebut akan tercekik di Level 1 (Bottleneck).',
        proTip: 'Klik tombol "Upgrade Bottle-necks" pada rute rel untuk secara otomatis mengantrekan perbaikan rel ke level tertinggi.'
      },
      {
        step: 2,
        title: 'Motorisasi Penuh Seluruh Supply Hub Garis Depan',
        timing: 'Hari Pertama Perang',
        details: 'Klik setiap Supply Hub yang berada di dekat garis pertempuran, ubah ikon kuda default menjadi 3 Truk (Motorized Level 3). Ini membutuhkan sekitar 50-100 truk tambahan dalam cadangan logistikmu, tetapi memperluas jangkauan kotak suplai hijau secara dramatis.',
        warning: 'Pastikan pabrikmu memproduksi minimal 3-5 pabrik militer truk sejak awal agar persediaan truk tidak defisit saat perang meletus.'
      },
      {
        step: 3,
        title: 'Pembangunan Kereta Lapis Baja & Perlindungan Jalur Rel',
        timing: 'Perang Berkepanjangan',
        details: 'Pesawat CAS dan Tactical Bomber musuh dapat menjalankan misi "Logistics Strike" untuk meledakkan kereta api dan memutus rel. Produksi "Armored Trains" (Kereta Lapis Baja) yang memiliki pertahanan anti-udara tinggi untuk mencegah terputusnya pasokan logistik.',
        proTip: 'Tempatkan 1 skuadron Fighter di zona pertempuran untuk menembak jatuh pesawat musuh yang mencoba membom rel keretamu.'
      },
      {
        step: 4,
        title: 'Strategi Memotong Hub Musuh (Deprivation Tactic)',
        timing: 'Masa Serangan Terobosan',
        details: 'Alih-alih menyerang kota besar berbenteng, arahkan ujung tombak divisi tankmu langsung ke Supply Hub terdekat musuh. Begitu kamu menginjak dan merebut Supply Hub tersebut, seluruh divisi musuh di sekitar area itu akan langsung kehilangan pasokan suplai dan mengalami kepanikan massal.',
        proTip: 'Ingat bahwa Supply Hub yang baru direbut membutuhkan waktu 7-14 hari untuk terhubung kembali ke jaringan relmu (konversi gauge rel).'
      }
    ],
    dosAndDonts: {
      dos: [
        'Selalu pasang Support Logistics Company pada korps tank spearhead berbobot besar.',
        'Gunakan pelabuhan (Naval Base) sebagai Supply Hub darurat saat melakukan invasi laut.',
        'Bangun jalur rel kereta api baru paralel dengan gerak maju pasukanmu di wilayah pedalaman Siberia atau Afrika.',
        'Simpan cadangan minimal 500 truk dan 100 lokomotif kereta api di gudang logistik.'
      ],
      donts: [
        'JANGAN menumpuk 30 divisi di satu provinsi sempit yang hanya memiliki 1 Supply Hub berkapasitas rendah.',
        'JANGAN pernah menyerang musuh saat indikator kotak suplai negaramu berkedip merah dengan tanda peti mati.',
        'JANGAN biarkan musuh mendominasi udara di atas jalur kereta api logistik utamamu.',
        'JANGAN bangun Supply Hub baru di tengah pertempuran sengit kecuali terpaksa (membangun 1 Supply Hub butuh 20.000 IC, setara 2 Pabrik Sipil).'
      ]
    },
    metaChecklist: [
      'Jalur rel utama dari ibukota ke perbatasan di-upgrade ke Level 3-5',
      'Seluruh Supply Hub terdepan disetel ke motorisasi 3 Truk',
      'Cadangan minimal 500 truk dan 50 kereta api lapis baja tersedia di stockpile',
      'Divisi tank berat dan medium dilengkapi Support Logistics Company',
      'Setiap titik penerjunan amfibi memiliki pelabuhan yang berfungsi penuh'
    ]
  },

  // 7. SPIONASE, KRIPTOLOGI & PERANG BAWAH TANAH
  {
    id: 'playbook-espionage',
    pillar: 'espionage',
    title: 'SPIONASE & SUBVERSI: Kriptologi, Infiltrasi Rahasia & Kapitulasi Kilat',
    subtitle: 'Kuasai ekspansi La Résistance: 100% Collaboration Government, pemecahan sandi Cipher, dan pencurian cetak biru alutsista.',
    badge: 'Intelijen & Operasi Terselubung',
    icon: 'Eye',
    readingTime: '5 Menit Baca',
    summary: 'Badan intelijen (Intelligence Agency) adalah pengganda kekuatan paling mematikan di HOI4. Dengan investasi hanya 5 Pabrik Sipil, kamu bisa memecahkan sandi komunikasi musuh untuk buff serangan +15%, mencuri teknologi tank musuh 2 tahun lebih cepat, dan yang terpenting: menjalankan operasi Collaboration Government agar musuh langsung menyerah saat ibukotanya jatuh tanpa perlu berburu divisi di pedalaman.',
    coreFormulas: [
      {
        label: 'Collaboration Government',
        value: 'Maksimal 100% Compliance',
        description: 'Tiap operasi sukses memberi +30-45% compliance awal. 100% compliance memberi 100% pabrik & sumber daya musuh pasca-kapitulasi.'
      },
      {
        label: 'Aktivasi Cipher Terpecahkan',
        value: '+15% Attack & +15% Breakthrough',
        description: 'Mengaktifkan sandi yang telah dipecahkan memberi bonus tempur masif selama 30 hari di seluruh medan laga.'
      },
      {
        label: 'Infiltrasi Angkatan Darat',
        value: '100% Army Intel Visibility',
        description: 'Melihat seluruh posisi divisi musuh, jumlah alutsista di garis depan, dan rencana serangan musuh di peta.'
      },
      {
        label: 'Pencurian Cetak Biru',
        value: 'Bonus Riset 100-300 Hari',
        description: 'Misi Steal Blueprint dapat mencuri teknologi industri atau senjata yang belum kamu teliti dari musuh adidaya.'
      }
    ],
    stepByStepGuide: [
      {
        step: 1,
        title: 'Mendirikan Badan Intelijen & Rekrut Illusive Gentleman',
        timing: 'Awal 1937',
        details: 'Gunakan 5 Pabrik Sipil selama 30 hari untuk mendirikan Spy Agency. Rekrut penasihat politik "Illusive Gentleman" untuk mendapatkan +1 slot mata-mata ekstra. Upgrade 5 cabang awal: Invisible Ink, Suicide Pills, Economy/Army Department, dan Cryptology.',
        proTip: 'Jika kamu memimpin faksi dengan banyak anggota (seperti Sekutu), kamu akan mendapatkan slot agen tambahan hingga 5-8 mata-mata secara gratis!'
      },
      {
        step: 2,
        title: 'Operasi Mutlak: Prepare Collaboration Government',
        timing: '12-18 Bulan Sebelum Menyerang Target Raksasa',
        details: 'Kirim 2 mata-mata untuk membangun Intelligence Network 50%+ di ibukota negara target (misal Prancis, Uni Soviet, atau Tiongkok). Luncurkan operasi "Prepare Collaboration Government". Ulangi operasi ini 2 hingga 3 kali hingga akumulasi kolaborasi mencapai 80-100%.',
        proTip: 'Dengan kolaborasi 100%, Uni Soviet akan menyerah seketika hanya dengan merebut Moskow, Leningrad, dan Stalingrad; kamu tidak perlu berjalan kaki ke Vladivostok!'
      },
      {
        step: 3,
        title: 'Memecahkan Sandi Musuh & Kunci Kemenangan Serangan',
        timing: 'Masa Damai Menjelang Perang',
        details: 'Tugaskan departemen Kriptologi untuk memecahkan sandi negara musuh utamamu. Begitu sandi selesai dipecahkan 100%, JANGAN langsung klik aktifkan! Simpan sandi tersebut dalam status siap aktif. Tunggu hari di mana kamu meluncurkan serangan darat besar-besaran, baru klik "Activate Cipher".',
        warning: 'Bonus cipher hanya berlangsung selama 30 hari; manfaatkan momentum ini untuk menjebol garis pertahanan musuh yang paling kokoh.'
      },
      {
        step: 4,
        title: 'Pemberantasan Mata-Mata Lawan (Counter-Espionage)',
        timing: 'Di Wilayah Sendiri',
        details: 'Tempatkan 1 agen dengan trait "Counter-Operative" di ibukotamu sendiri. Ini akan menangkap mata-mata musuh yang berusaha menyabotase pabrikmu atau mencuri riset negaramu, sekaligus melindungi stabilitas nasional dari propaganda asing.',
        proTip: 'Tingkatkan upgrade "Passive Defense" di badan intelijen hingga level 4 untuk membuat negaramu kebal terhadap spionase musuh.'
      }
    ],
    dosAndDonts: {
      dos: [
        'Selalu jalankan operasi Collaboration Government pada negara raksasa dengan wilayah luas (Soviet, AS, Tiongkok).',
        'Pecahkan sandi musuh sebelum perang dan simpan untuk diaktifkan di hari pertama operasi terobosan.',
        'Rekrut mata-mata lokal dengan kewarganegaraan negara target agar jaringan intelijen tidak mudah tertangkap.',
        'Tingkatkan Passive Defense ke Level 4 untuk menangkap agen musuh secara otomatis.'
      ],
      donts: [
        'JANGAN gunakan mata-mata untuk misi yang tidak strategis seperti propaganda di negara netral kecil.',
        'JANGAN aktifkan sandi musuh saat negaramu sedang dalam posisi bertahan pasif tanpa rencana serangan.',
        'JANGAN biarkan agen tertangkap tanpa menyelamatkannya jika ia memegang rahasia intelijen penting negaramu.',
        'JANGAN abaikan garnisun di wilayah jajahan; gunakan template Cavalry + MP untuk menekan gerilyawan dengan efisien.'
      ]
    },
    metaChecklist: [
      'Badan intelijen aktif dan departemen Kriptologi ter-upgrade maksimal',
      'Penasihat Illusive Gentleman aktif di kabinet politik',
      'Misi Collaboration Government selesai minimal 2x pada negara target utama',
      'Sandi musuh utama telah dipecahkan 100% dan siap diaktifkan saat perang',
      'Satu agen aktif ditempatkan pada misi Counter-Espionage di ibukota'
    ]
  },

  // 8. SENJATA PAMUNGKAS & PROYEK AKHIR ZAMAN
  {
    id: 'playbook-wunderwaffe',
    pillar: 'wunderwaffe',
    title: 'WUNDERWAFFE & NUKLIR: Pesawat Jet, Roket Balistik V-2 & Kemenangan Atom',
    subtitle: 'Riset Ahead-of-Time, asah Military Industrial Organization (MIO), dan tuntaskan perang dengan bom nuklir.',
    badge: 'Teknologi Pamungkas & Late Game',
    icon: 'Zap',
    readingTime: '6 Menit Baca',
    summary: 'Kemenangan di fase akhir permainan (1943-1945) ditentukan oleh superioritas teknologi tinggi dan senjata pemusnah massal. Mempelajari cara mencurangi penalti waktu riset, memaksimalkan level Military Industrial Organization (MIO), memproduksi pesawat jet tempur tak tertandingi, dan menjatuhkan bom atom beruntun akan menghentikan raksasa adidaya musuh dalam hitungan detik.',
    coreFormulas: [
      {
        label: 'Trik Riset Ahead-of-Time',
        value: '100% Focus Bonus Stacking',
        description: 'Gunakan bonus fokus nasional untuk meneliti Tank atau Pesawat generasi berikutnya 2 tahun lebih awal tanpa penalti.'
      },
      {
        label: 'Stat Multiplier MIO Max',
        value: '+25% hingga +35% Stat',
        description: 'MIO level 10 memberikan buff armor, kecepatan, keandalan, dan soft attack permanen pada alutsista massal.'
      },
      {
        label: 'Syarat Mutlak Serangan Nuklir',
        value: '75% Air Superiority + Strat Bomber',
        description: 'Menjatuhkan nuklir di ibukota musuh memotong War Support lawan hingga -20% dan melenyapkan seluruh divisi di provinsi itu.'
      },
      {
        label: 'Superioritas Pesawat Jet',
        value: '+200 km/jam Kecepatan Udara',
        description: 'Pesawat tempur mesin jet mendominasi langit dan membantai pesawat baling-baling konvensional dengan rasio 5:1.'
      }
    ],
    stepByStepGuide: [
      {
        step: 1,
        title: 'Trik Lompatan Riset (Ahead-of-Time Leap)',
        timing: '1937 - 1939',
        details: 'Cari fokus nasional yang memberi "Ahead of Time Penalty Reduction" atau bonus 100% riset. Jangan gunakan bonus ini untuk teknologi tahun berjalan! Tahan bonus tersebut, lalu gunakan tepat saat teknologi generasi masa depan (misal Medium Tank 1940 di awal 1938, atau Advanced Airframe 1944 di 1942) terbuka.',
        proTip: 'Memiliki divisi Medium Tank 1940 di tahun 1938 membuat divisimu kebal terhadap seluruh tembakan anti-tank musuh di awal perang.'
      },
      {
        step: 2,
        title: 'Mengasah Military Industrial Organization (MIO) ke Level Maksimal',
        timing: 'Seluruh Fase Permainan',
        details: 'Setiap lini produksi alutsista wajib dihubungkan ke desainer MIO yang tepat. Setiap alutsista yang selesai dirakit menyumbang poin pengalaman MIO. Pilih trait yang meningkatkan Soft Attack, Speed, dan Reliability.',
        warning: 'Jangan pernah mengganti perusahaan MIO di tengah jalan karena seluruh akumulasi level dan trait yang sudah terbuka akan hilang.'
      },
      {
        step: 3,
        title: 'Pengembangan Rudal Balistik V-2 & Silo Peluncuran',
        timing: '1942 - 1944',
        details: 'Riset cabang Experimental Rocketry di tab Engineering. Bangun Rocket Site di wilayah pesisir terdekat dengan musuh. Produksi roket balistik V-2: senjata ini tidak bisa dicegat oleh pesawat tempur musuh dan secara otomatis membombardir pabrik serta pangkalan udara lawan 24 jam sehari.',
        proTip: 'Rudal balistik tingkat lanjut juga dapat dipasangi hulu ledak nuklir di fase akhir permainan!'
      },
      {
        step: 4,
        title: 'Proyek Manhattan & Doktrin Pengeboman Nuklir Beruntun',
        timing: '1944 - 1945',
        details: 'Buka teknologi Atomic Research dan bangun 2-4 Reaktor Nuklir di provinsi pedalaman yang aman. Kumpulkan minimal 2 hulu ledak bom atom. Terbangkan 1 Strategic Bomber dan 1.000 Fighter untuk mengunci 75% Superioritas Udara di atas ibukota musuh, lalu jatuhkan bom atom.',
        proTip: 'Menjatuhkan nuklir kedua dalam kurun waktu 7 hari setelah bom pertama di ibukota musuh akan memicu peristiwa kapitulasi instan bagi sebagian besar negara di HOI4!'
      }
    ],
    dosAndDonts: {
      dos: [
        'Selalu pertahankan Reliability alutsista tank dan jet minimal di angka 80%.',
        'Bangun Reaktor Nuklir hanya di provinsi pedalaman dengan infrastruktur tinggi.',
        'Gunakan pesawat jet untuk merebut kembali superioritas udara jika musuh membanjiri langit dengan ribuan pesawat biasa.',
        'Gunakan bom nuklir secara taktis untuk melenyapkan konsentrasi 30 divisi musuh yang bertahan di benteng pegunungan.'
      ],
      donts: [
        'JANGAN meneliti teknologi yang 3-4 tahun mendahului zaman tanpa bantuan bonus fokus nasional.',
        'JANGAN buat tank berbiaya IC terlalu mahal (>18 IC per unit) jika industrimu belum mencapai 100 pabrik militer.',
        'JANGAN jatuhkan nuklir di provinsi yang supply hub-nya ingin segera kamu gunakan sendiri dalam hitungan jam.',
        'JANGAN tinggalkan pangkalan udara tempat pesawat pembom nuklirmu terparkir tanpa perlindungan anti-udara.'
      ]
    },
    metaChecklist: [
      'Computing Machine dan Industrial Tech selalu diriset tepat waktu',
      'MIO terhubung ke setiap lini pabrik alutsista utama dan terus naik level',
      'Reaktor Nuklir dibangun menjelang akhir 1943 di wilayah pedalaman',
      'Armada Strategic Bomber siap beroperasi dengan jangkauan ke ibukota musuh',
      'Superioritas udara 75%+ berhasil dicapai di zona sasaran pengeboman nuklir'
    ]
  }
];

export const getPlaybookSectionByPillar = (pillar: PlaybookPillar): PlaybookSection => {
  const found = MASTER_PLAYBOOK_DATA.find(s => s.pillar === pillar);
  return found || MASTER_PLAYBOOK_DATA[0];
};
