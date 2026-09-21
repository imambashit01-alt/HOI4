import { GuideSection } from '../types';

export const GUIDES_DATA: GuideSection[] = [
  // ==================== PEMULA (RECRUIT) ====================
  {
    id: 'g-pemula-1',
    level: 'pemula',
    title: 'Dasar Antarmuka, Siklus Waktu & Pause',
    subtitle: 'Kuasai kontrol waktu, tombol spasi, dan membaca indikator utama di bilah atas.',
    iconName: 'Clock',
    category: 'Intelijen & Politik',
    overview: 'Hearts of Iron IV adalah grand strategy real-time yang didesain untuk dimainkan dengan sering melakukan PAUSE (jeda). Mengendalikan waktu adalah kunci agar tidak panik saat perang dunia meletus.',
    keyPoints: [
      {
        heading: 'Kunci Tombol Spasi (Spacebar) & Kontrol Kecepatan',
        description: 'Gunakan kecepatan 4 atau 5 saat fase damai (1936-1939) membangun industri, lalu segera turunkan ke kecepatan 2 atau 3 saat pertempuran aktif dimulai. Selalu tekan Spacebar untuk jeda setiap kali mengambil keputusan penting.',
        proTip: 'Gunakan tombol shortcut keypad + dan - untuk menaikkan/menurunkan kecepatan tanpa menggeser kursor mouse.',
        tags: ['Dasar UI', 'Kontrol Waktu']
      },
      {
        heading: 'Membaca Bilah Status Atas (Top Bar)',
        description: 'Top bar menunjukkan sumber daya vital negaramu: Political Power (PP), Stabilitas, War Support, Manpower, Pabrik (Civs/Mils/Dockyards), Bahan Bakar (Fuel), serta Logistik Defisit.',
        warning: 'Jika persediaan Bahan Bakar (Fuel) habis (0 hari tersisa), semua tank, truk suplai, pesawat terbang, dan kapal perang akan lumpuh dan kehilangan 90% efektivitas tempurnya.',
        tags: ['Indikator', 'Sumber Daya']
      },
      {
        heading: 'Tingkat Ketegangan Dunia (World Tension)',
        description: 'Bola dunia di pojok kanan atas menunjukkan persentase World Tension. Angka ini naik saat negara fasis menyerang/mencaplok wilayah. Negara demokratis (seperti AS dan Inggris) terikat aturan: mereka tidak bisa mengerahkan wajib militer atau menjamin kemerdekaan negara lain sebelum World Tension mencapai batas tertentu (misal 25% atau 50%).',
        tags: ['Geopolitik', 'World Tension']
      }
    ],
    summaryTips: [
      'Jangan pernah membiarkan waktu berjalan di Speed 5 saat tentaramu sedang bertempur.',
      'Periksa notifikasi pop-up merah di bilah atas; pop-up merah menandakan pabrik menganggur, divisi tidak terlatih, atau riset kosong.'
    ]
  },
  {
    id: 'g-pemula-2',
    level: 'pemula',
    title: 'Manajemen Pabrik: Sipil, Militer & Galangan',
    subtitle: 'Pahami rasio pembangunan Pabrik Sipil (Civs) vs Militer (Mils) dan Consumer Goods.',
    iconName: 'Factory',
    category: 'Ekonomi & Industri',
    overview: 'Kekuatan sebuah negara di HOI4 ditentukan oleh basis industrinya. Tanpa pabrik sipil yang cukup di awal, kamu tidak akan bisa memproduksi ribuan senapan, artileri, dan tank saat 1939 tiba.',
    keyPoints: [
      {
        heading: 'Aturan Emas 1936-1938: Bangun Pabrik Sipil (Civs) Terlebih Dahulu',
        description: 'Pabrik Sipil (warna oranye) digunakan untuk membangun pabrik lain, infrastruktur, radar, dan mengimpor sumber daya. Selama tahun 1936 hingga akhir 1937 atau pertengahan 1938, fokuslah 80-100% membangun Pabrik Sipil.',
        proTip: 'Semakin tinggi infrastruktur di suatu provinsi (maks level 5), semakin cepat pembangunan pabrik di provinsi tersebut berkat bonus efisiensi konstruksi.',
        tags: ['Konstruksi', 'Civs']
      },
      {
        heading: 'Peralihan ke Pabrik Militer (Mils) Menjelang Perang',
        description: 'Mulai akhir 1938 atau 1939, alihkan semua antrean konstruksi ke Pabrik Militer (warna hijau). Pabrik militer langsung memproduksi senjata, artileri, tank, dan pesawat.',
        tags: ['Peralatan', 'Mils']
      },
      {
        heading: 'Memahami Pajak Consumer Goods (Barang Konsumsi)',
        description: 'Sebagian pabrik sipilmu akan disita oleh populasi untuk kebutuhan sipil. Persentase ini ditentukan oleh Hukum Ekonomi (Economic Law). Di bawah Civilian Economy, hingga 35-40% pabrik terkunci, sedangkan di War Economy hanya 15-20%, dan Totale Mobilization hanya 10%.',
        warning: 'Ubah Hukum Ekonomimu ke Early Mobilization -> Partial Mobilization -> War Economy sesegera mungkin menggunakan Political Power saat syarat terpenuhi.',
        tags: ['Hukum Ekonomi', 'Consumer Goods']
      }
    ],
    summaryTips: [
      'Jangan buru-buru membangun Pabrik Militer di Januari 1936; ini akan membatasi kapasitas pertumbuhan industrimu di masa depan.',
      'Jika kekurangan baja, tungsten, atau karet, impor dengan menukar 1 Pabrik Sipil untuk 8 unit sumber daya di tab Perdagangan (Trade).'
    ]
  },
  {
    id: 'g-pemula-3',
    level: 'pemula',
    title: 'Politik, Stabilitas & Rekrutmen Penasihat',
    subtitle: 'Manfaatkan Political Power (PP), jaga Stabilitas di atas 50%, dan rekrut kabinet terbaik.',
    iconName: 'Landmark',
    category: 'Intelijen & Politik',
    overview: 'Political Power (PP) terakumulasi setiap hari (biasanya +1.00 hingga +2.00 per hari). PP adalah mata uang politik untuk merekrut menteri, mengganti doktrin hukum, dan membenahi stabilitas bangsa.',
    keyPoints: [
      {
        heading: 'Penasihat Prioritas: "Silent Workhorse"',
        description: 'Jika negaramu memiliki penasihat politik bertipe "Silent Workhorse" (misal Martin Bormann untuk Jerman), rekrutlah dia sebagai menteri pertamamu (150 PP). Dia memberikan +15% perolehan PP per hari yang akan mempercepat semua rekrutmen berikutnya.',
        proTip: 'Jangan hamburkan PP di awal untuk mengganti jenderal atau klaim diplomasi yang belum perlu.',
        tags: ['Political Power', 'Penasihat']
      },
      {
        heading: 'Pentingnya Menjaga Stabilitas di Atas 50%',
        description: 'Stabilitas di bawah 50% memberikan penalti berat: pengurangan kecepatan pembangunan pabrik, berkurangnya output pabrik militer, dan potensi terjadinya mogok kerja (strikes) serta pemberontakan sipil.',
        tags: ['Stabilitas', 'Efisiensi']
      },
      {
        heading: 'Hukum Wajib Militer (Conscription Laws)',
        description: 'Mulai dari Volunteer Only (1.5% populasi) hingga Limited Conscription (2.5%), Extensive Conscription (5%), dan Service by Requirement (10%). Jangan menaikkan hukum wajib militer jika manpower masih mencukupi, karena hukum di atas Extensive memberikan penalti waktu pelatihan dan output pabrik.',
        warning: 'Jangan pernah memilih All Adults Serve atau Scraping the Barrel kecuali kamu berada di ambang kehancuran total.',
        tags: ['Manpower', 'Wajib Militer']
      }
    ],
    summaryTips: [
      'Selalu simpan setidaknya 100-150 PP cadangan saat ketegangan perang meningkat untuk merespons event tak terduga.',
      'Gunakan keputusan "Improve Worker Conditions" jika Stabilitas negaramu merosot di bawah 60%.'
    ]
  },
  {
    id: 'g-pemula-4',
    level: 'pemula',
    title: 'Perintah Garis Depan (Frontline) & Rencana Serang',
    subtitle: 'Cara mengorganisir tentara, menetapkan Jenderal & Marsekal, serta memanfaatkan Planning Bonus.',
    iconName: 'ShieldAlert',
    category: 'Militer Darat',
    overview: 'Menggerakkan puluhan divisi satu per satu dengan klik manual sangat lambat. HOI4 menggunakan sistem Battleplan untuk mengotomatisasi pergerakan garis depan sembari memberikan bonus serangan hingga +30% atau +50% berkat akumulasi planning.',
    keyPoints: [
      {
        heading: 'Hierarki Komando: Divisi -> Jenderal (24 Divisi) -> Marsekal Lapangan (5 Jenderal)',
        description: 'Pilih divisi tempurmu, klik tanda plus hijau di bawah untuk membuat Army di bawah Jenderal (kapasitas 24 divisi). Kemudian kelompokkan tentara ke dalam Army Group di bawah Marsekal Lapangan (Field Marshal) yang menampung hingga 120 divisi.',
        tags: ['Komando', 'Jenderal']
      },
      {
        heading: 'Menetapkan Garis Depan (Frontline - Shortcut Z)',
        description: 'Pilih Army-mu, klik ikon Garis Depan (atau tekan Z), lalu klik pada perbatasan negara musuh. Divisimu akan otomatis berjalan dan berbaris rapi di sepanjang perbatasan tersebut.',
        tags: ['Frontline', 'Perbatasan']
      },
      {
        heading: 'Garis Serangan (Offensive Line - Shortcut X) & Planning Bonus',
        description: 'Setelah garis depan terbentuk, klik Garis Serangan (X), lalu tarik garis panah menembus wilayah musuh menuju sasaran (misal ibu kota atau kota industri). Divisi yang diam di perbatasan akan mengumpulkan Planning Bonus setiap hari.',
        proTip: 'Jangan langsung mengaktifkan tombol panah serang hijau sebelum bilah planning bar penuh. Menyerang dengan bonus planning penuh melipatgandakan peluang menembus pertahanan lawan.',
        tags: ['Planning Bonus', 'Serangan']
      }
    ],
    summaryTips: [
      'Gunakan perintah Fallback Line jika kamu ingin menarik pasukan ke garis sungai atau benteng pertahanan alami.',
      'Gunakan Garrison Order untuk menugaskan pasukan murah menjaga pelabuhan dan garis pantai agar tidak terkena invasi laut dadakan.'
    ]
  },
  {
    id: 'g-pemula-5',
    level: 'pemula',
    title: 'Prioritas Riset Teknologi 1936-1937',
    subtitle: 'Slot riset teknologi sangat berharga: apa saja yang WAJIB diambil terlebih dahulu?',
    iconName: 'Cpu',
    category: 'Ekonomi & Industri',
    overview: 'Banyak pemula salah meriset tank canggih atau kapal perang di hari pertama yang terkena penalti tahun riset (Ahead of Time penalty). Pilihan teknologi 1936 harus fokus mempercepat mesin riset dan produksi negaramu.',
    keyPoints: [
      {
        heading: 'Wajib Hari Pertama: Electronic Mechanical Engineering',
        description: 'Teknologi ini memberikan +3% atau +4% kecepatan riset untuk SEMUA riset teknologi berikutnya sepanjang permainan. Ini harus selalu menjadi riset pertama di slot pertama.',
        tags: ['Elektronik', 'Kecepatan Riset']
      },
      {
        heading: 'Slot Kedua & Ketiga: Basic Machine Tools & Construction I',
        description: 'Basic Machine Tools meningkatkan batas efisiensi produksi pabrik militer (Production Efficiency Cap), sedangkan Construction I meningkatkan kecepatan pembangunan pabrik hingga +10%.',
        tags: ['Industri', 'Konstruksi']
      },
      {
        heading: 'Slot Keempat: Perlengkapan Infanteri & Artileri',
        description: 'Perbarui Weapons I (senapan) dan Interwar Artillery jika belum terbuka. Jangan meriset teknologi dengan penalti Ahead of Time lebih dari 1 tahun kecuali kamu memiliki bonus fokus nasional (Research Boost 50% atau 100%).',
        warning: 'Meriset teknologi 2 tahun lebih awal tanpa bonus akan membuang ratusan hari riset yang berharga.',
        tags: ['Senjata', 'Artileri']
      }
    ],
    summaryTips: [
      'Fokus nasional yang memberikan "+1 Research Slot" harus diprioritaskan di tahun 1936-1937.',
      'Dispersed Industry vs Concentrated Industry: pilih Dispersed jika kamu sering mengganti lini produksi senjata atau sering dibom musuh; pilih Concentrated jika industrimu aman dan memproduksi peralatan yang stabil.'
    ]
  },

  // ==================== MENENGAH (REGULAR) ====================
  {
    id: 'g-menengah-1',
    level: 'menengah',
    title: 'Logistik & Suplai: Menghindari Attrition Mematikan',
    subtitle: 'Pahami Supply Hubs, jalur kereta api (Railways), motorisasi suplai, dan pelabuhan.',
    iconName: 'Truck',
    category: 'Logistik & Suplai',
    overview: 'Penyebab nomor satu kekalahan pemain di Rusia, Afrika, atau pedalaman Tiongkok adalah KELAPARAN LOGISTIK (Attrition). Divisi tanpa suplai kehilangan organisasi, senjata hancur sendiri, dan mudah dihancurkan meski jumlah pasukannya lebih banyak.',
    keyPoints: [
      {
        heading: 'Bagaimana Suplai Mengalir di Peta',
        description: 'Suplai mengalir dari Ibu Kota -> Jaringan Rel Kereta Api (Railways) -> Supply Hub atau Pelabuhan Laut -> Divisi Tempur di medan laga. Jika rel kereta terputus atau tidak terhubung ke ibukota, Supply Hub akan mati total.',
        tags: ['Supply Hub', 'Railways']
      },
      {
        heading: 'Trik Motorisasi Suplai (Mengubah Kuda Menjadi Truk)',
        description: 'Secara default, pasokan dari Supply Hub diantar menggunakan kuda (jarak jangkau pendek). Klik Jenderal atau klik ikon Supply Hub di peta, lalu ubah ikon kuda menjadi ikon "Dua Truk" (Motorization Priority). Ini melipatgandakan radius jangkauan suplai secara dramatis!',
        proTip: 'Pastikan pabrik militermu memproduksi setidaknya 2-3 pabrik truk bermotor (Trucks/Motorized) dan kereta api (Trains) agar persediaan truk logistik tidak minus.',
        tags: ['Motorisasi', 'Radius Suplai']
      },
      {
        heading: 'Membangun dan Meng-upgrade Level Rel Kereta',
        description: 'Rel Kereta Api Level 1 memiliki kapasitas bottleneck rendah. Jika kamu menumpuk 30 divisi di satu hub, perbesar rel dari ibukota ke hub tersebut menjadi Level 2 atau Level 3 (sangat cepat dibangun dibanding membuat Supply Hub baru).',
        warning: 'Membangun Supply Hub baru memakan waktu sangat lama (20.000 IC). Lebih baik merebut Supply Hub musuh atau membangun jalur rel ke hub terdekat.',
        tags: ['Bottleneck', 'Kapasitas']
      }
    ],
    summaryTips: [
      'Buka mode peta F4 (Supply Mapmode) sebelum melancarkan serangan besar.',
      'Jika unitmu memunculkan ikon peti merah berkedip, segera tarik sebagian divisi keluar dari zona tersebut agar suplai pulih.'
    ]
  },
  {
    id: 'g-menengah-2',
    level: 'menengah',
    title: 'Meta Combat Width (Lebar Tempur)',
    subtitle: 'Memahami batasan lebar tempur di berbagai medan: Plains, Forest, Mountain, dan Urban.',
    iconName: 'Maximize2',
    category: 'Militer Darat',
    overview: 'Combat Width menentukan berapa banyak batalion yang bisa bertempur bersamaan di satu medan tanpa terkena penalti overcrowding. Sejak update sistem pertempuran modern, medan menentukan lebar tempur dasar.',
    keyPoints: [
      {
        heading: 'Lebar Tempur Berdasarkan Medan Terkini',
        description: 'Dataran Rendah (Plains): 70w (+35w per arah serangan tambahan). Hutan (Forest): 60w (+30w). Bukit (Hills): 70w (+35w). Gunung (Mountains): 50w (+25w). Kota (Urban): 80w (+40w). Rawa (Marshes): 50w (+25w).',
        tags: ['Medan', 'Lebar Tempur']
      },
      {
        heading: 'Ukuran Meta Paling Fleksibel: 18w, 21w, dan 30w/35w',
        description: 'Untuk infanteri bertahan garis depan: 15 Width (5-6 Infanteri) atau 18 Width (9 Infanteri) atau 21 Width (9 Infanteri + 1 Artileri). Untuk divisi penyerang tank/motorized: 30 Width atau 35-36 Width sangat cocok untuk mengisi medan pertempuran tanpa penalti berlebih.',
        proTip: 'Template 21w (9 Inf + 1 Arty) dengan Support Artillery dan Engineer adalah salah satu template pertahanan & serang balik paling seimbang di seluruh dunia.',
        tags: ['Template', '21 Width']
      },
      {
        heading: 'Menyerang dari Berbagai Arah (Flanking Attack)',
        description: 'Jika kamu menyerang dari 1 provinsi, lebar tempur hanya 70w. Namun jika kamu menyerang provinsi musuh dari 3 sisi sekaligus (Multi-direction attack), lebar tempur melonjak menjadi 70 + 35 + 35 = 140w! Ini memungkinkan 2-3x lipat divisimu menembak musuh secara bersamaan.',
        tags: ['Flanking', 'Taktik Pengepungan']
      }
    ],
    summaryTips: [
      'Jangan pernah membuat divisi dengan combat width di atas 42w karena akan sulit masuk ke pertempuran gunung atau rawa.',
      'Tambahkan Reconnaissance company untuk membantu jenderalamu memilih taktik tempur terbaik di medan laga.'
    ]
  },
  {
    id: 'g-menengah-3',
    level: 'menengah',
    title: 'Superioritas Udara & Close Air Support (CAS)',
    subtitle: 'Mengapa "Green Air" memenangkan perang dan bagaimana merancang pesawat pengebom mematikan.',
    iconName: 'Plane',
    category: 'Udara & CAS',
    overview: 'Dalam HOI4 modern, siapa yang menguasai langit memenangkan pertempuran darat. Jika kamu memiliki "Green Air" (Superioritas Udara di atas 70%) dan puluhan pesawat Close Air Support (CAS), infanteri musuh akan hancur lebur bahkan sebelum tankmu tiba.',
    keyPoints: [
      {
        heading: 'Dua Pilar Angkatan Udara: Fighter vs CAS',
        description: 'Fighter (Pesawat Tempur) bertugas memburu pesawat musuh untuk mengamankan Green Air. CAS (Close Air Support) bertugas menjatuhkan bom langsung ke divisi musuh di darat, memberikan Organization Damage dan HP Damage masif yang mengabaikan armor!',
        tags: ['Fighter', 'CAS']
      },
      {
        heading: 'Desain Fighter Efisien di Aircraft Designer',
        description: 'Gunakan Small Airframe -> Pasang Heavy Machine Guns (4x atau 8x) atau Cannons -> Mesin Engine II atau Engine III terbaik -> Drop Tanks (untuk jangkauan misi) -> Armor Plates (menambah daya tahan).',
        proTip: 'Statistik terpenting untuk Fighter adalah Air Defense dan Air Attack, disusul oleh Agility dan Speed.',
        tags: ['Airframe', 'Desain Pesawat']
      },
      {
        heading: 'Misi Logistical Strike (Hancurkan Kereta Api Musuh)',
        description: 'Tugaskan sebagian pembom taktis atau CAS ke misi "Logistical Strike" di wilayah musuh. Pesawatmu akan membom lokomotif kereta api dan rel musuh. Dalam beberapa minggu, suplai musuh akan lumpuh total tanpa kamu harus menembak satu peluru pun!',
        tags: ['Logistical Strike', 'Interdiksi']
      }
    ],
    summaryTips: [
      'Selalu bangun pangkalan udara (Airbase) di dekat garis depan dan pastikan tidak melebihi kapasitas (overcrowded airbase memberi penalti -50% misi).',
      'Jika negaramu kekurangan industri untuk membuat ribuan pesawat, pasang Support Anti-Air di setiap template divisimu untuk mengurangi efektivitas CAS musuh hingga 75%.'
    ]
  },
  {
    id: 'g-menengah-4',
    level: 'menengah',
    title: 'Tank Designer & MIO: Spesifikasi Mesin Penembus',
    subtitle: 'Rancang Medium Tank ideal: keseimbangan Soft Attack, Breakthrough, Armor, dan Reliability.',
    iconName: 'Shield',
    category: 'Militer Darat',
    overview: 'Merancang tank di Tank Designer membutuhkan pertimbangan biaya produksi (IC cost) vs performa tempur. Tank yang terlalu mahal akan membuatmu kekurangan jumlah batalion, sedangkan tank yang terlalu murah tidak bisa menembus benteng musuh.',
    keyPoints: [
      {
        heading: 'Medium Tank: Pilihan Terbaik Sepanjang Zaman',
        description: 'Light Tank cepat kehilangan relevansi di 1940 karena armor tipis, sedangkan Heavy Tank terlalu mahal dan boros suplai. Medium Tank adalah standar emas: mobilitas tinggi, armor cukup untuk menolak tembakan infanteri, dan daya tembak tinggi.',
        tags: ['Medium Tank', 'Standar Emas']
      },
      {
        heading: 'Komponen Wajib Medium Tank 1939-1941',
        description: 'Chassis: Improved Medium Tank Chassis. Main Armament: Medium Howitzer (untuk Soft Attack monster) atau High Velocity Cannon (jika musuh banyak tank). Turret: Three-man Turret (memberikan Breakthrough maksimal). Suspension: Christie Suspension atau Bogie. Radio: Radio 2 atau 3 (sangat penting untuk Defense dan Breakthrough).',
        proTip: 'Infanteri musuh 85-95% adalah "Soft Target". Menggunakan Medium Howitzer memberikan Soft Attack luar biasa tinggi yang memusnahkan divisi infanteri lawan dengan sangat cepat!',
        tags: ['Howitzer', 'Breakthrough']
      },
      {
        heading: 'Menjaga Keandalan (Reliability) di Atas 80%',
        description: 'Jangan menaikkan poin Armor dan Engine terlalu tinggi jika membuat Reliability turun di bawah 80%. Tank dengan reliability rendah akan meledak sendiri saat melewati gurun, lumpur, atau musim dingin Rusia karena breakdown mekanis.',
        warning: 'Pasang modul Wet Ammunition Storage atau Maintenance Company jika reliability tankmu jatuh di bawah 80%.',
        tags: ['Reliability', 'Kerusakan']
      }
    ],
    summaryTips: [
      'Sesuaikan kecepatan tankmu dengan kecepatan truk infanteri pendukungnya (sekitar 8.0 - 10.0 km/jam).',
      'Pilih MIO (Military Industrial Organization) yang fokus pada peningkatan Soft Attack atau Armor produksi massal.'
    ]
  },
  {
    id: 'g-menengah-5',
    level: 'menengah',
    title: 'Memilih Doktrin Militer Darat yang Tepat',
    subtitle: 'Perbandingan Mobile Warfare, Superior Firepower, Grand Battleplan, dan Mass Assault.',
    iconName: 'BookOpen',
    category: 'Militer Darat',
    overview: 'Doktrin darat menentukan gaya bermain dan bonus komparatif militermu. Mengubah doktrin di tengah jalan membutuhkan banyak Army XP, jadi tentukan doktrinmu sejak 1936.',
    keyPoints: [
      {
        heading: 'Mobile Warfare: Kecepatan Kilat & Tank (Jerman / Poros)',
        description: 'Memberikan kecepatan gerak tank ekstrem, organisasi tank tinggi, dan breakthrough masif. Sangat cocok untuk taktik Blitzkrieg, pengepungan cepat, dan pemain yang suka melakukan micro-management tank.',
        tags: ['Mobile Warfare', 'Blitzkrieg']
      },
      {
        heading: 'Superior Firepower: Soft Attack Brutal & Artileri (AS / Minor)',
        description: 'Doktrin paling serbaguna dan ramah pemula. Memberikan bonus Soft Attack besar pada infanteri, artileri pendukung, dan tank. Sangat efektif untuk menghancurkan musuh dalam pertempuran frontal yang berdarah.',
        proTip: 'Ambil cabang Integrated Support di sisi kanan untuk memperkuat Support Company seperti Artileri, Roket, dan Anti-Air.',
        tags: ['Superior Firepower', 'Soft Attack']
      },
      {
        heading: 'Grand Battleplan: Benteng Entrenchment & Max Planning (Inggris / Prancis / Jepang)',
        description: 'Memberikan nilai Entrenchment (pertahanan benteng gali) tertinggi di game dan Planning Bonus hingga +50-60%. Luar biasa kuat untuk bertahan dan melancarkan serangan terencana satu kali hantam.',
        tags: ['Grand Battleplan', 'Entrenchment']
      },
      {
        heading: 'Mass Assault: Manpower Melimpah & Pemulihan Cepat (Soviet / Tiongkok)',
        description: 'Mengurangi combat width infanteri dari 2.0 menjadi 1.6 (Deep Battle), memungkinkan kamu menumpuk lebih banyak prajurit di satu medan. Sangat tangguh saat mundur di wilayah sendiri berkat bonus pasokan dan gerilya pertahanan.',
        tags: ['Mass Assault', 'Manpower']
      }
    ],
    summaryTips: [
      'Gunakan Army XP dari latihan militer (Shift + K) untuk membuka node doktrin lebih awal.',
      'Jika ragu dengan negaramu, Superior Firepower selalu menjadi pilihan aman yang tidak pernah salah.'
    ]
  },

  // ==================== AHLI (VETERAN) ====================
  {
    id: 'g-ahli-1',
    level: 'ahli',
    title: 'Pertempuran Angkatan Laut & Meta Komposisi Armada',
    subtitle: 'Rasio screening mutlak, desain Light Cruiser pemusnah, dan taktik kapal selam wolfpack.',
    iconName: 'Anchor',
    category: 'Angkatan Laut',
    overview: 'Banyak pemain mengabaikan laut karena rumit, padahal menguasai laut memungkinkanmu memblokade seluruh benua, melumpuhkan impor lawan, dan melancarkan invasi amfibi ke pulau Inggris atau Jepang.',
    keyPoints: [
      {
        heading: 'Aturan Mutlak Screening Ratio (Rasio Tirai Pelindung: 4 ke 1)',
        description: 'Setiap 1 Kapal Induk (Carrier) atau Kapal Tempur (Battleship) WAJIB dilindungi oleh setidaknya 3-4 Screen Ships (Destroyer atau Light Cruiser). Jika rasio screening turun di bawah 100%, torpedo kapal selam musuh akan langsung menembus dan menenggelamkan Battleship bernilai ribuan IC dalam hitungan detik!',
        warning: 'Jangan pernah mengirim armada kapal besar berlayar sendirian tanpa kawalan puluhan kapal Destroyer.',
        tags: ['Screening Ratio', 'Armada']
      },
      {
        heading: 'Meta Light Cruiser Pembersih Tirai (Screen Killer CL)',
        description: 'Light Cruiser yang dipersenjatai dengan Light Cruiser Batteries terbanyak di Ship Designer adalah pembunuh paling mematikan di laut. Mereka memiliki Light Attack tinggi yang membantai Destroyer musuh. Begitu Destroyer musuh lenyap, Carrier dan Battleship musuh terbuka untuk dibantai oleh torpedo.',
        proTip: 'Pasang Catapult Airplane Launcher pada Light Cruiser patroli untuk meningkatkan nilai Surface Detection hingga maksimal.',
        tags: ['Light Cruiser', 'Screen Killer']
      },
      {
        heading: 'Taktik Kapal Selam Wolfpack (Submarine Raiding)',
        description: 'Bagi kapal selam menjadi grup kecil beranggotakan 10-12 kapal selam di bawah laksamana berkeahlian "Sea Wolf". Atur misinya ke "Convoy Raiding" dengan aturan engagement "Do Not Engage" atau "Medium Risk". Mereka akan menenggelamkan ribuan konvoi minyak dan pasukan musuh yang sedang berlayar.',
        tags: ['Submarine', 'Wolfpack']
      }
    ],
    summaryTips: [
      'Gunakan Carrier dengan rasio 50% Fighter Laut dan 50% Naval Bomber Laut.',
      'Batasi jumlah Carrier di satu pertempuran laut maksimal 4 buah untuk menghindari penalti overcrowding Carrier (-20% efektivitas per Carrier lebih).'
    ]
  },
  {
    id: 'g-ahli-2',
    level: 'ahli',
    title: 'Spionase La Résistance: 100% Collaboration Government',
    subtitle: 'Trik melumpuhkan Uni Soviet dan Prancis secara instan tanpa harus mengejar ke Vladivostok.',
    iconName: 'Eye',
    category: 'Intelijen & Politik',
    overview: 'Agen mata-mata dari DLC La Résistance bukan sekadar kosmetik. Misi Collaboration Government adalah strategi tingkat tinggi paling kuat di game untuk memenangkan perang besar dalam hitungan minggu.',
    keyPoints: [
      {
        heading: 'Mendirikan Badan Intelijen Sejak Awal (Agency Setup)',
        description: 'Gunakan 5 pabrik sipil selama 30 hari untuk membuka Agency. Buka upgrade "Invisible Ink", "Economy/Civilian", dan tingkatkan menjadi 5 agen dengan merekrut Illusive Gentleman di kabinet.',
        tags: ['Agency', 'Mata-Mata']
      },
      {
        heading: 'Misi Kolaborasi Pemerintah (Collaboration Government)',
        description: 'Bangun jaringan intelijen 50% di ibukota musuh (misal Moskow atau Paris). Jalankan operasi "Prepare Collaboration Government" sebanyak 2-3 kali sebelum perang meletus. Setiap misi berhasil memberikan +30% kolaborasi kepatuhan.',
        proTip: 'Jika kamu mencapai 100% Collaboration Government di Uni Soviet, mereka akan menyerah (Capitulate) begitu kamu merebut Moskow, Leningrad, dan Stalingrad—tanpa kamu perlu berjalan ribuan kilometer ke pegunungan Ural atau Vladivostok!',
        tags: ['Kolaborasi', 'Kapitulasi Cepat']
      },
      {
        heading: 'Dekripsi Sandi Musuh (Cryptology Department)',
        description: 'Pecahkan kode militer lawan di tab Cryptology. Saat perang meletus, tekan tombol "Reveal Active Cipher" untuk mendapatkan bonus gila selama 30 hari: +15% Breakthrough serangan darat, +50% deteksi armada laut musuh, dan penalti pertahanan musuh!',
        tags: ['Kriptologi', 'Cipher']
      }
    ],
    summaryTips: [
      'Gunakan agen lokal dengan kewarganegaraan target agar peluang tertangkap menurun drastis.',
      'Tugaskan agen di wilayah pendudukan untuk misi "Root Out Resistance" guna menekan pembangkangan tanpa membuang manpower garrison.'
    ]
  },
  {
    id: 'g-ahli-3',
    level: 'ahli',
    title: 'Taktik Micro-Management Pengepungan (Encirclement)',
    subtitle: 'Pin-and-flank, memutus arteri rel kereta api, dan membentuk kantung pemusnahan (Kessel).',
    iconName: 'Crosshair',
    category: 'Militer Darat',
    overview: 'Menghancurkan musuh dengan mendorong garis depan secara frontal menghabiskan jutaan manpower. Kunci kemenangan telak pemain ahli adalah Micro Pengepungan: menjebak 20-50 divisi musuh di satu kantung tanpa suplai lalu melenyapkannya.',
    keyPoints: [
      {
        heading: 'Taktik Penjepit (Pincer Movement)',
        description: 'Kumpulkan 4-6 divisi tank terbaikmu di dua titik terpisah (sayap kiri dan sayap kanan). Serang menembus satu provinsi tipis musuh, lalu arahkan kedua ujung tombak tank untuk bertemu di satu titik di belakang garis musuh (biasanya di Supply Hub musuh).',
        tags: ['Pincer', 'Sayap']
      },
      {
        heading: 'Teknik "Pinning" (Mengunci Divisi Musuh)',
        description: 'Saat tankmu melaju di belakang musuh, serang musuh di garis depan menggunakan infanteri biasa secara serentak. Ini dinamakan "Pinning attack"—musuh yang sedang diserang tidak bisa bergerak mundur atau memotong jalur tankmu karena terkunci dalam pertempuran.',
        proTip: 'Segera bawa motorized infantry di belakang tank untuk menutup koridor agar tankmu tidak balik terkepung oleh serangan balik musuh.',
        tags: ['Pinning', 'Taktik']
      },
      {
        heading: 'Menghancurkan Kantung (Kessel Destruction)',
        description: 'Begitu kantung tertutup dan suplai musuh terputus dari ibukota, tunggu 2-3 hari hingga stok amunisi dan suplai mereka 0. Setelah itu, serang dari semua arah dengan infanteri. Divisi musuh akan langsung hancur menjadi debu (Overrun / Destroyed) dan peralatannya disita menjadi milikmu.',
        tags: ['Kessel', 'Overrun']
      }
    ],
    summaryTips: [
      'Prioritaskan selalu merebut rel kereta api yang melintasi belakang garis depan musuh.',
      'Perhatikan pergerakan divisi musuh: jika mereka mulai mundur, klik provinsi yang mereka tuju dengan tankmu untuk melakukan "Overrun" sebelum mereka sempat tiba.'
    ]
  },
  {
    id: 'g-ahli-4',
    level: 'ahli',
    title: 'Operasi Amfibi & Pasukan Khusus Elit',
    subtitle: 'Naval Invasion D-Day yang sukses, drop lintas udara paratrooper, dan pohon doktrin khusus.',
    iconName: 'Compass',
    category: 'Militer Darat',
    overview: 'Menembus perbatasan yang penuh benteng beton (seperti Garis Maginot atau Selat Inggris) membutuhkan unit khusus: Marinir Amfibi atau Divisi Terjun Payung Paratroopers.',
    keyPoints: [
      {
        heading: 'Syarat Mutlak Invasi Laut (Naval Invasion)',
        description: 'Untuk melancarkan invasi amfibi, kamu membutuhkan: 1) Riset teknologi Landing Craft di tab laut, 2) Superioritas laut di atas 50% di SEMUA zona laut yang dilintasi konvoi, 3) Jumlah konvoi kapal angkut yang cukup, dan 4) Waktu persiapan (planning days) di pelabuhan asal.',
        tags: ['Invasi Laut', 'D-Day']
      },
      {
        heading: 'Trik Mendarat di Kiri-Kanan Pelabuhan',
        description: 'Menyerang pelabuhan musuh secara frontal biasanya gagal karena pelabuhan dijaga benteng pesisir (Coastal Forts). Daratkan pasukan utama di provinsi pantai sebelah kiri dan kanan pelabuhan, lalu jepit pelabuhan dari daratan!',
        proTip: 'Gunakan Shore Bombardment dari Battleship yang bersandar di pesisir untuk memberikan penalti -25% pertahanan bagi garnisun musuh.',
        tags: ['Pantai', 'Shore Bombardment']
      },
      {
        heading: 'Serangan Terjun Payung Paratrooper (Airborne Drop)',
        description: 'Paratrooper membutuhkan Transport Planes (pesawat angkut) dan Superioritas Udara 70% di atas zona udara terkait. Terjunkan paratrooper langsung ke Supply Hub di belakang musuh atau ke kota-kota penting untuk memotong rute pelarian.',
        warning: 'Paratrooper hanya membawa suplai darurat untuk 72 jam; pastikan pasukan daratmu segera menyusul sebelum mereka kehabisan peluru.',
        tags: ['Paratrooper', 'Lintas Udara']
      }
    ],
    summaryTips: [
      'Gunakan Doktrin Pasukan Khusus (Special Forces Doctrine Tree) yang baru untuk membuka kemampuan amfibi dan komando gerilya.',
      'Sertakan Support Armored Recon atau Flame Tank di template marinir untuk bonus serangan amfibi tambahan.'
    ]
  },
  {
    id: 'g-ahli-5',
    level: 'ahli',
    title: 'Optimasi Efisiensi Produksi & Perdagangan Sumber Daya',
    subtitle: 'Cara mempertahankan retensi efisiensi saat ganti model senjata dan mengatasi embargo.',
    iconName: 'Flame',
    category: 'Ekonomi & Industri',
    overview: 'Pabrik militer tidak langsung berproduksi 100% saat membuat model senjata baru; mereka mulai dari Production Efficiency rendah dan naik perlahan. Pemain ahli tahu kapan harus mengganti lini dan bagaimana mengamankan rantai pasok global.',
    keyPoints: [
      {
        heading: 'Production Efficiency Retention (Retensi Efisiensi)',
        description: 'Saat mengganti produksi dari Senapan I ke Senapan II, jangan hapus lini produksi lalu buat baru. Klik ikon model dan ubah ke model baru. Dengan teknologi Machine Tools, pabrikmu akan mempertahankan hingga 50-70% efisiensi lama alih-alih mulai dari nol.',
        tags: ['Efisiensi', 'Lini Produksi']
      },
      {
        heading: 'Manajemen Kilang Sintetis Minyak & Karet (Synthetic Refineries)',
        description: 'Jerman dan Poros sering kali diblokade laut oleh Sekutu sehingga tidak bisa mengimpor Karet (Rubber) dari Malaya atau Minyak dari Karibia. Bangun Kilang Sintetis (Synthetic Refineries) di provinsi berinfrastruktur tinggi dan riset teknologi pengolahan batu bara menjadi bensin.',
        proTip: 'Tanpa Karet, produksi pesawat tempur dan truk logistikmu akan melambat hingga 90%!',
        tags: ['Karet', 'Kilang Sintetis']
      },
      {
        heading: 'Sistem Lisensi & Military Industrial Organizations (MIO)',
        description: 'Tugaskan MIO yang tepat untuk setiap peralatan. MIO mendapatkan dana dan level seiring banyaknya unit yang kamu produksi, memberikan buff seperti +10% Reliabilitas tank, +5% Kecepatan pesawat, atau -5% Biaya material baja.',
        tags: ['MIO', 'Upgrade Peralatan']
      }
    ],
    summaryTips: [
      'Jika kamu kekurangan 2-3 unit baja, abaikan impor jika pabrik sipilmu terbatas; penalti defisit kecil hanya mengurangi kecepatan produksi sedikit.',
      'Simpan stok peralatan surplus di stockpile logistik sebelum menyatakan perang dunia.'
    ]
  }
];
