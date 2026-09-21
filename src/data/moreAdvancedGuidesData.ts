import { GuideSection } from '../types';

export const MORE_ADVANCED_GUIDES_DATA: GuideSection[] = [
  {
    id: 'g-adv-1',
    level: 'menengah',
    title: 'Konversi Pabrik Sipil ke Militer: Kapan Waktu Tepatnya?',
    subtitle: 'Maksimalkan pabrik sipil di 1936-1938 lalu konversi kilat di awal 1939 menjelang perang.',
    iconName: 'Factory',
    category: 'Ekonomi & Industri',
    readTimeMinutes: 4,
    overview: 'Membangun pabrik militer langsung dari tahun 1936 memperlambat efek bola salju (snowball effect) ekonomi. Trik pemain veteran adalah membangun civs hingga batas tertentu lalu melakukan konversi kilat.',
    keyPoints: [
      {
        heading: 'Waktu Ideal Konversi',
        description: 'Untuk Jerman dan Uni Soviet, pertengahan 1938 hingga awal 1939 adalah waktu terbaik untuk mengonversi 10-15 pabrik sipil menjadi militer. Konversi hanya memakan 4.000 IC dibanding membangun pabrik militer baru dari nol yang memakan 7.200 IC!',
        proTip: 'Riset teknologi Dispersed Industry atau Concentrated Industry yang memberikan diskon biaya konversi hingga -20%.',
        tags: ['Konversi Pabrik', 'Makro Ekonomi']
      },
      {
        heading: 'Jangan Mengonversi Terlalu Banyak',
        description: 'Sisakan minimal 30-40 pabrik sipil agar Anda tetap memiliki kapasitas perdagangan mengimpor karet, minyak, dan baja tanpa menghabiskan seluruh kapasitas konstruksi.',
        tags: ['Pabrik Sipil', 'Impor']
      }
    ],
    summaryTips: [
      'Gunakan menteri War Industrialist untuk mempercepat pembangunan pabrik militer sebesar +10%.',
      'Negara dengan slot provinsi penuh sangat diuntungkan oleh taktik konversi pabrik ini.'
    ]
  },
  {
    id: 'g-adv-2',
    level: 'pemula',
    title: 'Manajemen Cadangan Bahan Bakar (Fuel Silos & Logistics)',
    subtitle: 'Bangun tangki penyimpanan bahan bakar agar armada kapal dan tank tidak macet di tengah operasi.',
    iconName: 'Fuel',
    category: 'Logistik & Suplai',
    readTimeMinutes: 3,
    overview: 'Bahan Bakar (Fuel) disimpan dalam tangki nasional. Jika tangki habis, kapal perang tidak bisa keluar dermaga dan pesawat tempur tidak bisa menjalankan misi.',
    keyPoints: [
      {
        heading: 'Kapasitas Tangki Silo (Fuel Silo)',
        description: 'Setiap bangunan Fuel Silo yang Anda bangun menambah kapasitas cadangan bahan bakar nasional sebesar +100k barel. Bangun 3-5 Silo sebelum perang dunia meletus agar memiliki cadangan untuk 6 bulan operasi perang tanpa henti.',
        tags: ['Fuel Silo', 'Cadangan Minyak']
      },
      {
        heading: 'Impor Minyak di Masa Damai',
        description: 'Saat fase damai 1936-1939, gunakan 1 pabrik sipil untuk mengimpor minyak dari Amerika Serikat atau Venezuela guna mengisi penuh seluruh tangki bahan bakar Anda.',
        proTip: 'Ubah prioritas bahan bakar: prioritaskan Angkatan Udara dan Divisi Lapis Baja daripada armada latihan laut saat perang.',
        tags: ['Impor Minyak', 'Prioritas']
      }
    ],
    summaryTips: [
      'Kapal selam mengonsumsi bahan bakar sangat sedikit dibandingkan kapal tempur raksasa.',
      'Periksa indikator hari bahan bakar di bilah atas sebelum meluncurkan ofensif lapis baja skala besar.'
    ]
  },
  {
    id: 'g-adv-3',
    level: 'ahli',
    title: 'Doktrin Land: Superior Firepower vs Mobile Warfare',
    subtitle: 'Bedah komparasi mendalam antara daya hancur artileri dan terobosan kecepatan tank.',
    iconName: 'Swords',
    category: 'Militer Darat',
    readTimeMinutes: 6,
    overview: 'Dua doktrin darat paling populer di HOI4. Mengetahui kelemahan dan kelebihan masing-masing doktrin menentukan komposisi divisi dan arah riset teknologi Anda.',
    keyPoints: [
      {
        heading: 'Superior Firepower (SFP): Raja Soft Attack Universal',
        description: 'Memberikan bonus Soft Attack masif (+20% ke semua infanteri dan artileri). Sangat mudah dimainkan karena tidak memerlukan ratusan ribu tank; divisi infanteri biasa dengan artileri sudah cukup untuk meratakan musuh.',
        tags: ['Superior Firepower', 'Artileri']
      },
      {
        heading: 'Mobile Warfare (MW): Blitzkrieg & Kecepatan Mutlak',
        description: 'Memberikan kecepatan terobosan tank tertinggi, bonus organization divisi lapis baja terbesar, dan recovery rate luar biasa. Sangat mematikan di tangan pemain yang mahir melakukan micro-management manuver capit kepiting.',
        proTip: 'Jika basis industrimu kuat memproduksi ribuan tank per tahun, pilih Mobile Warfare. Jika industrimu terbatas, Superior Firepower selalu lebih aman.',
        tags: ['Mobile Warfare', 'Blitzkrieg']
      }
    ],
    summaryTips: [
      'Di doktrin SFP, cabang kanan (Air Superiority) memberikan bonus serangan darat terbesar jika Anda menguasai langit.',
      'Di doktrin MW, cabang kanan (Desperate Defense) memberikan +5% recruitable population untuk manpower cadangan darurat.'
    ]
  },
  {
    id: 'g-adv-4',
    level: 'ahli',
    title: 'Doktrin Grand Battleplan: Rahasia Planning Bonus +60%',
    subtitle: 'Trik ofensif satu pukulan (One-Shot Breakthrough) yang menghancurkan benteng garis musuh.',
    iconName: 'Shield',
    category: 'Militer Darat',
    readTimeMinutes: 5,
    overview: 'Sering diremehkan oleh pemain pemula, Grand Battleplan (GBP) sebenarnya adalah doktrin darat dengan batas daya serang tertinggi dalam pertempuran terencana.',
    keyPoints: [
      {
        heading: 'Mekanik Planning Bonus Maksimal',
        description: 'Dengan mengambil GBP cabang kiri (Assault) dan menugaskan jenderal dengan sifat Thorough Planner, divisi Anda dapat mengumpulkan Planning Bonus hingga +60-70%! Ini berarti divisi Anda menyerang dengan stat serangan hampir dua kali lipat lebih kuat saat perintah serang pertama kali dieksekusi.',
        tags: ['Grand Battleplan', 'Planning Bonus']
      },
      {
        heading: 'Kelemahan & Cara Mengatasinya',
        description: 'Kelemahannya adalah planning bonus berkurang setiap hari saat divisi bergerak maju. Untuk mengatasinya, gunakan perwira staf "Staff Office Work" untuk mengisi ulang perencanaan saat divisi berhenti di garis tujuan tahap satu.',
        tags: ['Manajemen Perencanaan', 'Ofensif']
      }
    ],
    summaryTips: [
      'GBP memberikan bonus Entrenchment tertinggi (+10 parit), menjadikannya doktrin pertahanan terbaik untuk Prancis atau Inggris.',
      'Sangat efektif untuk menghancurkan benteng kuat seperti Garis Maginot atau Garis Stalin.'
    ]
  },
  {
    id: 'g-adv-5',
    level: 'ahli',
    title: 'Doktrin Mass Assault (Deep Battle): Pasukan Tanpa Batas',
    subtitle: 'Kuasai pengurangan Combat Width infanteri dan pemulihan organisasi kilat khas Uni Soviet.',
    iconName: 'Users',
    category: 'Militer Darat',
    readTimeMinutes: 5,
    recommendedForTag: 'SOV',
    overview: 'Doktrin Mass Assault cabang kanan (Deep Battle) merefleksikan doktrin militer legendaris Marsekal Zhukov: memukul musuh terus-menerus tanpa memberikan kesempatan bernapas.',
    keyPoints: [
      {
        heading: 'Pengurangan Combat Width Infanteri (-0.4 per Batalion)',
        description: 'Batalion infanteri Anda hanya memakan 1.6 width (dari normalnya 2.0). Ini memungkinkan Anda menjejalkan lebih banyak batalion infanteri ke dalam satu petak pertempuran, menghasilkan pertahanan dan HP yang mustahil ditembus tank musuh!',
        tags: ['Mass Assault', 'Combat Width']
      },
      {
        heading: 'Out of Supply Penalti Minimal',
        description: 'Divisi di bawah doktrin ini menderita penalti kekurangan suplai jauh lebih kecil dan pulih 30% lebih cepat saat rotasi pertempuran berlangsung.',
        tags: ['Suplai', 'Ketahanan']
      }
    ],
    summaryTips: [
      'Gunakan doktrin ini jika Anda memainkan Uni Soviet atau Tiongkok yang memiliki manpower berlimpah.',
      'Taktik Deep Battle menggunakan gelombang pertama infanteri murah untuk menguras organisasi musuh, lalu gelombang kedua tank T-34 menembus garis belakang.'
    ]
  },
  {
    id: 'g-adv-6',
    level: 'menengah',
    title: 'Menguasai 5 Selat Strategis Maritim Dunia',
    subtitle: 'Kuasai Gibraltar, Terusan Suez, Bosporus, Selat Malaka, dan Skagerrak untuk mengurung armada laut musuh.',
    iconName: 'Globe',
    category: 'Angkatan Laut',
    readTimeMinutes: 4,
    overview: 'Di HOI4, kapal perang dan konvoi tidak dapat melintasi selat maritim jika kedua sisi selat tersebut dikuasai oleh negara musuh.',
    keyPoints: [
      {
        heading: 'Gibraltar & Suez: Mengunci Laut Mediterania',
        description: 'Jika Poros (Axis) merebut Gibraltar dari Inggris dan menduduki Terusan Suez di Mesir, seluruh Laut Mediterania menjadi danau tertutup Poros. Seluruh armada laut Sekutu di dalamnya akan terperangkap dan kelaparan suplai!',
        tags: ['Gibraltar', 'Terusan Suez']
      },
      {
        heading: 'Selat Malaka & Selat Denmark',
        description: 'Menguasai Singapura memotong jalur pasokan Sekutu antara Samudra Hindia dan Pasifik. Menguasai Kopenhagen (Denmark) memblokir seluruh armada Inggris memasuki Laut Baltik.',
        tags: ['Selat Malaka', 'Chokepoints']
      }
    ],
    summaryTips: [
      'Rencanakan perebutan Gibraltar sedini mungkin menggunakan divisi gunung atau parasut.',
      'Armada kapal yang terperangkap di laut tertutup tidak bisa menerima perbaikan di galangan kapal luar.'
    ]
  },
  {
    id: 'g-adv-7',
    level: 'ahli',
    title: 'Perekrutan Divisi Kolonial (Puppet Division Recruitment)',
    subtitle: 'Trik mencuri jutaan manpower dari negara boneka seperti India atau Indonesia tanpa kehilangan rakyat sendiri.',
    iconName: 'Users',
    category: 'Militer Darat',
    readTimeMinutes: 4,
    overview: 'Negara dengan populasi kecil (seperti Inggris atau Belanda) dapat membiayai perang dunia dengan memanfaatkan manpower negara boneka jajahannya.',
    keyPoints: [
      {
        heading: 'Cara Menyalin Template Kolonial',
        description: 'Buka menu divisi, klik tombol salin template negara boneka (misal British Raj atau Hindia Belanda). Buat template baru berdasarkan template kolonial tersebut.',
        tags: ['Puppet Manpower', 'Divisi Kolonial']
      },
      {
        heading: 'Rasio Penggunaan Manpower (90% Kolonial vs 10% Induk)',
        description: 'Divisi kolonial menggunakan 90% hingga 100% manpower dari negara boneka, sementara peralatannya (senapan, tank) disediakan oleh pabrik Anda. Ini memungkinkan Inggris mengerahkan 200 divisi infanteri penuh tanpa mengurangi 1 orang pun warga asli kepulauan Inggris!',
        proTip: 'Melatih banyak divisi kolonial menurunkan otonomi negara boneka tersebut, mempermudah aneksasi permanen di kemudian hari.',
        tags: ['Efisiensi Manpower', 'Otonomi']
      }
    ],
    summaryTips: [
      'Gunakan trik ini untuk merebut manpower raksasa India, Tiongkok, atau Indonesia.',
      'Pastikan Anda memiliki persediaan senapan yang cukup di gudang logistik sebelum melatih 20 divisi sekaligus.'
    ]
  },
  {
    id: 'g-adv-8',
    level: 'menengah',
    title: 'Kereta Lapis Baja (Armored Trains): Mengamankan Jalur Rel',
    subtitle: 'Cegah pengeboman udara musuh merusak jalur kereta api logistik garis depan.',
    iconName: 'Truck',
    category: 'Logistik & Suplai',
    readTimeMinutes: 3,
    overview: 'Pengebom taktis musuh sering kali menghancurkan lokomotif kereta api biasa, menyebabkan penalti logistik merah di seluruh garis depan.',
    keyPoints: [
      {
        heading: 'Keunggulan Armored Trains',
        description: 'Kereta lapis baja memiliki pertahanan lapis baja dan meriam anti-pesawat terintegrasi. Mereka kebal terhadap pengeboman serangan darat ringan dan dapat menembak jatuh CAS musuh yang mencoba menyerang jalur rel.',
        tags: ['Armored Trains', 'Proteksi Rel']
      },
      {
        heading: 'Biaya Produksi Terjangkau',
        description: 'Hanya butuh 1-2 pabrik militer untuk memproduksi armada kereta lapis baja yang cukup untuk seluruh jaringan rel nasional.',
        tags: ['Produksi', 'Logistik']
      }
    ],
    summaryTips: [
      'Riset teknologi Armored Train di cabang Armor atau Artileri begitu tahun 1939 tiba.',
      'Sangat penting saat bertempur di padang rumput Front Timur yang panjang dan terbuka terhadap serangan udara.'
    ]
  },
  {
    id: 'g-adv-9',
    level: 'ahli',
    title: 'Ranpur Amfibi (Amtrac & Amphibious Tank Meta)',
    subtitle: 'Kombinasi ranpur amfibi terbaik untuk menembus pantai Normandia dan melintasi sungai lebar.',
    iconName: 'Shield',
    category: 'Militer Darat',
    readTimeMinutes: 5,
    overview: 'Menyerang melintasi sungai besar (seperti Sungai Dnieper atau Rhine) memberikan penalti serangan hingga -60%. Amtrac dan Tank Amfibi menghapus penalti tersebut menjadi 0%.',
    keyPoints: [
      {
        heading: 'Amtrac (Amphibious Tractor) vs Mechanized Biasa',
        description: 'Amtrac memiliki semua stat pertahanan dan hardness kendaraan mekanis, namun memberikan bonus serangan amfibi dan penyeberangan sungai +50%.',
        tags: ['Amtrac', 'Ranpur Amfibi']
      },
      {
        heading: 'Template Pasukan Serbu Sungai & Pantai (36 Width)',
        description: 'Kombinasikan 8 Batalion Tank Amfibi Medium + 8 Batalion Amtrac + Kompi Support Engineer & Support Artileri. Divisi ini akan melindas pertahanan pantai musuh tanpa kehilangan momentum.',
        proTip: 'Sangat ideal untuk invasi D-Day Amerika Serikat atau operasi penyeberangan sungai Volga Uni Soviet.',
        tags: ['Invasi Pantai', 'D-Day']
      }
    ],
    summaryTips: [
      'Amtrac memerlukan pabrik militer dan riset teknologi khusus di tab Pasukan Khusus.',
      'Gunakan kompi Flame Tank untuk memaksimalkan daya tembus bunker pantai.'
    ]
  },
  {
    id: 'g-adv-10',
    level: 'menengah',
    title: 'Menghindari Zona Laut Berbahaya (Convoy Avoidance Settings)',
    subtitle: 'Blokir zona laut merah agar kapal dagang dan divisi tentara tidak tenggelam disergap musuh.',
    iconName: 'Anchor',
    category: 'Angkatan Laut',
    readTimeMinutes: 3,
    overview: 'Pemain sering kali mendapati pasukannya tiba-tiba musnah di laut saat diangkut karena melewati Selat Inggris atau Samudra Atlantik yang dipenuhi kapal selam musuh.',
    keyPoints: [
      {
        heading: 'Mengatur Akses Zona Laut (Sea Zone Access)',
        description: 'Klik zona laut di peta air (misal English Channel). Di pojok kiri bawah, ada tombol akses zona laut: Hijau (Bebas), Kuning (Hindari jika ada alternatif), dan Merah (Terlarang / Access Blocked).',
        tags: ['Akses Laut', 'Proteksi Konvoi']
      },
      {
        heading: 'Ubah Menjadi Zona Merah',
        description: 'Ubah zona laut berbahaya menjadi MERAH. Semua konvoi perdagangan dan transportasi tentara Anda akan otomatis memutar lewat rute yang lebih aman, menyelamatkan puluhan ribu prajurit dari tenggelam.',
        tags: ['Zona Merah', 'Navigasi']
      }
    ],
    summaryTips: [
      'Sebagai Jerman, selalu blokir English Channel menjadi Merah sejak hari pertama perang meletus.',
      'Sebagai Inggris, blokir pesisir Prancis barat jika kapal selam Jerman aktif beroperasi di sana.'
    ]
  },
  {
    id: 'g-adv-11',
    level: 'pemula',
    title: 'Hukum Ekonomi: War Economy vs Total Mobilization',
    subtitle: 'Pahami keuntungan Consumer Goods terendah dan cara mengimbangi penalti manpower -3%.',
    iconName: 'Factory',
    category: 'Ekonomi & Industri',
    readTimeMinutes: 4,
    overview: 'Hukum ekonomi menentukan berapa persentase pabrik sipil yang disita untuk kebutuhan rakyat sipil (Consumer Goods Factories).',
    keyPoints: [
      {
        heading: 'War Economy (Standar Emas Perang)',
        description: 'Memotong Consumer Goods menjadi hanya 15-20%, mempercepat pembangunan pabrik militer dan konversi pabrik sebesar +20%. Capai hukum ini secepat mungkin saat War Support mencapai 50%.',
        tags: ['War Economy', 'Hukum Ekonomi']
      },
      {
        heading: 'Total Mobilization & Keputusan "Women in the Workforce"',
        description: 'Total Mobilization memotong consumer goods menjadi hanya 10% (paling hemat di seluruh game), tetapi memotong Recruitable Population sebesar -3%. Untuk negara berpopulasi kecil, ini bisa menghabiskan seluruh manpower!',
        warning: 'Jika mengambil Total Mobilization, segera aktifkan keputusan "Women in the Workforce" (+5% manpower) untuk menetralkan penalti tersebut.',
        tags: ['Total Mobilization', 'Manpower']
      }
    ],
    summaryTips: [
      'Jangan mengambil Total Mobilization jika negaramu tidak memiliki Political Power untuk mengaktifkan Women in the Workforce.',
      'Negara Fasis dan Komunis dapat mencapai War Economy jauh lebih awal di tahun 1936-1937 dibanding negara Demokratis.'
    ]
  },
  {
    id: 'g-adv-12',
    level: 'menengah',
    title: 'Manajemen Cuaca Ekstrem: Musim Hujan Lumpur & Musim Dingin Beku',
    subtitle: 'Ketahui bahaya Rasputitsa lumpur di Front Timur dan cara bertahan dari attrition cuaca dingin.',
    iconName: 'CloudRain',
    category: 'Logistik & Suplai',
    readTimeMinutes: 4,
    overview: 'Jenderal Musim Dingin dan Musim Lumpur (Rasputitsa) menelan lebih banyak tank dan nyawa daripada peluru musuh di Front Timur.',
    keyPoints: [
      {
        heading: 'Musim Lumpur Rasputitsa (Musim Gugur & Musim Semi)',
        description: 'Hujan deras mengubah tanah Soviet menjadi lumpur pekat. Kecepatan divisi tank berkurang hingga -50% dan attrition meningkat +30%. JANGAN PERNAH melancarkan serangan besar saat ikon lumpur muncul di peta!',
        tags: ['Rasputitsa', 'Lumpur']
      },
      {
        heading: 'Musim Dingin Beku (Deep Freeze)',
        description: 'Suhu beku mengurangi keandalan peralatan dan membekukan mesin truk. Berikan jenderal Anda sifat Winter Specialist dan riset peralatan pakaian musim dingin untuk mengurangi korban frostbite.',
        proTip: 'Hentikan ofensif di bulan November dan bangun garis parit pertahanan hingga musim semi berikutnya tiba.',
        tags: ['Musim Dingin', 'Winter Specialist']
      }
    ],
    summaryTips: [
      'Pantau ikon cuaca di jendela peta provinsi sebelum menekan tombol eksekusi rencana tempur.',
      'Sertakan kompi Maintenance Company di divisi Anda untuk mengurangi kehilangan peralatan akibat cuaca buruk.'
    ]
  },
  {
    id: 'g-adv-13',
    level: 'ahli',
    title: 'Reinforce Rate: Mengapa Cadangan Sering Terlambat Masuk Tempur',
    subtitle: 'Trik radio signal company dan doktrin agar garis pertahanan tidak jebol saat over-stacking.',
    iconName: 'Zap',
    category: 'Militer Darat',
    readTimeMinutes: 5,
    overview: 'Pernahkah Anda melihat 10 divisi Anda di satu provinsi kalah mundur padahal hanya 1 divisi yang bertempur sementara 9 lainnya hanya menonton di kotak cadangan? Itu adalah masalah Reinforce Rate.',
    keyPoints: [
      {
        heading: 'Peluang Masuk Tempur Tiap Jam (Reinforce Rate)',
        description: 'Secara default, peluang divisi di kotak cadangan (Reserves) untuk masuk menggantikan divisi yang mundur hanya sekitar 2-5% per jam. Jika divisi yang sedang bertempur pecah sebelum divisi cadangan masuk, seluruh provinsi akan jatuh ke tangan musuh!',
        tags: ['Reinforce Rate', 'Mekanik Tempur']
      },
      {
        heading: 'Solusi: Kompi Sinyal Radio (Signal Company)',
        description: 'Memasang Signal Company pada divisi meningkatkan Initiative dan menambah +5% hingga +12% peluang reinforce per jam. Doktrin militer tertentu juga memberikan bonus reinforce rate +5%.',
        proTip: 'Pastikan selalu meriset Radio (1936) untuk membuka bonus komunikasi tempur ini.',
        tags: ['Signal Company', 'Radio']
      }
    ],
    summaryTips: [
      'Gunakan jenderal dengan sifat Trickster atau Brilliant Strategist untuk meningkatkan koordinasi tempur.',
      'Jangan menumpuk terlalu banyak divisi di satu petak melebihi Combat Width jika reinforce rate Anda masih rendah.'
    ]
  },
  {
    id: 'g-adv-14',
    level: 'menengah',
    title: 'Kompi Pemeliharaan (Maintenance Company): Pabrik Senjata Bergerak',
    subtitle: 'Tingkatkan Equipment Capture Ratio untuk mencuri ribuan tank dan artileri musuh.',
    iconName: 'Wrench',
    category: 'Militer Darat',
    readTimeMinutes: 4,
    overview: 'Maintenance Company tidak hanya meningkatkan keandalan peralatan divisi Anda, tetapi juga memiliki mekanik rahasia mencuri persenjataan musuh di medan tempur.',
    keyPoints: [
      {
        heading: 'Rasio Pencurian Peralatan (Equipment Capture Ratio)',
        description: 'Maintenance Company level 2-4 memberikan bonus Equipment Capture hingga +10-15%. Setiap kali musuh kehilangan divisi atau mundur, persentase senjata mereka langsung masuk ke gudang logistik Anda!',
        tags: ['Maintenance', 'Pencurian Senjata']
      },
      {
        heading: 'Bermain Tanpa Memproduksi Tank Sendiri',
        description: 'Negara kecil dengan doktrin defensif dapat mengumpulkan ratusan tank medium musuh secara gratis hanya dengan bertahan di balik benteng parit dengan kompi ini.',
        proTip: 'Sangat cocok untuk Tiongkok atau Finlandia untuk melengkapi tentara dengan senjata modern rampasan perang.',
        tags: ['Negara Minor', 'Rampasan Perang']
      }
    ],
    summaryTips: [
      'Maintenance company menaikkan Reliability divisi sebesar +10-25%, sangat berguna untuk divisi tank mahal.',
      'Hemat jutaan IC industri dengan memanfaatkan senjata musuh yang disita.'
    ]
  },
  {
    id: 'g-adv-15',
    level: 'menengah',
    title: 'Kompi Rumah Sakit Lapangan (Field Hospital): Menjaga Status Veteran',
    subtitle: 'Pertahankan pengalaman divisi level 3 (Veteran) dan selamatkan 30-50% korban tewas.',
    iconName: 'Shield',
    category: 'Militer Darat',
    readTimeMinutes: 4,
    overview: 'Ketika prajurit tewas dan digantikan oleh rekrutan baru yang belum terlatih, level pengalaman (Experience) divisi Anda akan turun, menghilangkan bonus serangan +25% status Veteran.',
    keyPoints: [
      {
        heading: 'Retensi Pengalaman Divisi (XP Retention)',
        description: 'Field Hospital menyelamatkan tentara terluka dan mengembalikan mereka ke barisan tanpa menurunkan status pengalaman divisi. Divisi elit Anda akan tetap berada di level Veteran atau Seasoned walau bertempur berbulan-bulan.',
        tags: ['Field Hospital', 'Veteran XP']
      },
      {
        heading: 'Pengembalian Manpower (Casualty Trickleback)',
        description: 'Mengembalikan 20% hingga 50% korban luka kembali ke manpower nasional. Sangat krusial untuk negara dengan populasi kecil seperti Kanada, Australia, atau Swedia.',
        tags: ['Trickleback', 'Manpower']
      }
    ],
    summaryTips: [
      'Pasang Field Hospital pada divisi infanteri elit atau divisi lapis baja penembus garis depan.',
      'Tidak dianjurkan untuk negara berpopulasi raksasa seperti Uni Soviet atau Tiongkok yang tidak kekurangan manpower.'
    ]
  },
  {
    id: 'g-adv-16',
    level: 'ahli',
    title: 'Strategi Negara Minor: Yugoslavia (Menyatukan Balkan vs Poros)',
    subtitle: 'Navigasi perpecahan etnis internal, bentuk Pakta Balkan, dan kalahkan invasi Italia di Alpen.',
    iconName: 'Globe',
    category: 'Intelijen & Politik',
    recommendedForTag: 'YUG',
    readTimeMinutes: 5,
    overview: 'Yugoslavia memulai permainan dengan penalti stabilitas internal etnis Kroasia/Slovenia yang parah dan dikelilingi oleh tetangga agresif (Italia, Jerman, Hungaria, Bulgaria).',
    keyPoints: [
      {
        heading: 'Menyelesaikan Perpecahan Etnis',
        description: 'Pilih jalur fokus "Devolve Power" (membentuk federasi otonom) atau "Western Focus" untuk menghapus spirit nasional perpecahan etnis sebelum tahun 1938.',
        tags: ['Yugoslavia', 'Stabilitas Etnis']
      },
      {
        heading: 'Pertahanan Garis Pegunungan Alpen Slovenia',
        description: 'Pertahankan perbatasan barat melawan Italia di pegunungan Slovenia. Medan pegunungan yang sempit membuat tank Italia tidak berkutik dan mudah dihancurkan oleh divisi infanteri gunung Anda.',
        tags: ['Pertahanan Gunung', 'Italia']
      }
    ],
    summaryTips: [
      'Bentuk aliansi regional dengan Yunani dan Turki untuk menjamin kemerdekaan bersama.',
      'Manfaatkan cadangan aluminium dan kromium Yugoslavia untuk barter peralatan militer modern.'
    ]
  },
  {
    id: 'g-adv-17',
    level: 'menengah',
    title: 'Strategi Negara Minor: Rumania (Raja Minyak Eropa & Berganti Sisi 1944)',
    subtitle: 'Manfaatkan ladang minyak Ploesti, pertahankan Bessarabia, atau lakukan kudeta monarki Raja Michael.',
    iconName: 'Fuel',
    category: 'Ekonomi & Industri',
    recommendedForTag: 'ROM',
    readTimeMinutes: 5,
    overview: 'Rumania adalah produsen minyak terbesar di daratan Eropa. Posisi strategisnya membuatnya menjadi incaran diplomatik Poros maupun Uni Soviet.',
    keyPoints: [
      {
        heading: 'Monopoli Minyak Ploesti',
        description: 'Tingkatkan infrastruktur di wilayah Ploesti hingga level 5 untuk memaksimalkan ekspor minyak. Gunakan pabrik sipil hasil barter minyak untuk membangun industri militer yang mandiri.',
        tags: ['Rumania', 'Minyak Ploesti']
      },
      {
        heading: 'Kudeta Bersejarah 1944 (King Michael Coup)',
        description: 'Pohon fokus Rumania memungkinkan Anda bergabung dengan Poros di awal untuk merebut kembali Bessarabia dari Soviet, lalu berganti pihak memihak Sekutu di akhir perang saat tentara Jerman mulai terdesak!',
        proTip: 'Fleksibilitas diplomatik ini memastikan Rumania selalu berada di pihak pemenang perang.',
        tags: ['Diplomasi Fleksibel', 'Kudeta']
      }
    ],
    summaryTips: [
      'Beli lisensi produksi pesawat tempur dan tank dari Jerman untuk menghemat biaya riset Anda sendiri.',
      'Amankan perbatasan barat dari ancaman revanchisme Hungaria dan Bulgaria.'
    ]
  },
  {
    id: 'g-adv-18',
    level: 'ahli',
    title: 'Strategi Negara Minor: Brasil & Amerika Selatan (Monopoli Benua)',
    subtitle: 'Kuasai seluruh Amerika Latin sebelum Amerika Serikat mengaktifkan Pax Americana.',
    iconName: 'Globe',
    category: 'Intelijen & Politik',
    recommendedForTag: 'BRA',
    readTimeMinutes: 5,
    overview: 'DLC Trial of Allegiance memberikan pohon fokus raksasa untuk Brasil, memungkinkan pembentukan Kekaisaran Brasil atau negara adidaya sosialis di belahan bumi selatan.',
    keyPoints: [
      {
        heading: 'Manfaatkan Garis Waktu Sebelum AS Turun Tangan',
        description: 'Di awal permainan, jaminan kemerdekaan Pax Americana Amerika Serikat melindungi negara Amerika Latin hanya dari agresi negara EROPA, bukan agresi antarsesama negara Amerika Latin!',
        tags: ['Brasil', 'Amerika Latin']
      },
      {
        heading: 'Pertahanan Hutan Amazon & Impor Karet',
        description: 'Kuasai Uruguay, Paraguay, dan Bolivia untuk mengamankan sumber daya baja dan tungsten sebelum melancarkan ofensif ke Argentina.',
        tags: ['Hutan Tropis', 'Ekspansi']
      }
    ],
    summaryTips: [
      'Gunakan divisi marinir dan infanteri ringan untuk bertempur di hutan Amazon yang minim infrastruktur.',
      'Brasil dapat membangun industri baja mandiri terkuat di belahan bumi selatan.'
    ]
  },
  {
    id: 'g-adv-19',
    level: 'menengah',
    title: 'Manajemen Emisi Infanteri Bermotor vs Bersepeda (Bicycle & Camels)',
    subtitle: 'Kelebihan unit khusus sepeda Jepang/Belanda dan kavaleri unta Timur Tengah.',
    iconName: 'Truck',
    category: 'Militer Darat',
    readTimeMinutes: 3,
    overview: 'Selain infanteri standar dan motorized, terdapat batalion infanteri khusus unik yang sangat efektif pada teater pertempuran tertentu.',
    keyPoints: [
      {
        heading: 'Batalion Bersepeda (Bicycle Battalions)',
        description: 'Bisa dibuka oleh Jepang, Belanda, dan Italia. Memiliki kecepatan 6.4 km/jam (jauh lebih cepat dari infanteri jalan kaki 4.0 km/jam) tanpa memakan satu tetes pun bahan bakar minyak atau biaya truk!',
        tags: ['Bicycle Battalion', 'Kecepatan']
      },
      {
        heading: 'Kavaleri Unta (Camel Corps)',
        description: 'Unit unik Afrika Utara dan Timur Tengah. Memiliki penekanan resistensi (suppression) tinggi dan kebal terhadap penalti cuaca panas gurun ekstrem.',
        tags: ['Camel Corps', 'Gurun']
      }
    ],
    summaryTips: [
      'Gunakan divisi sepeda untuk manuver capit kilat di kepulauan Hindia Belanda atau semenanjung Malaya.',
      'Sangat hemat biaya bagi negara yang kekurangan bahan bakar minyak.'
    ]
  },
  {
    id: 'g-adv-20',
    level: 'ahli',
    title: 'Taktik Pertahanan Pesisir & Pulau Pasifik (Island Hopping Defense)',
    subtitle: 'Benteng pantai level 5, garrison pulau kecil, dan perang atrisi laut terbuka.',
    iconName: 'Anchor',
    category: 'Angkatan Laut',
    readTimeMinutes: 5,
    overview: 'Pertempuran di Pasifik (Iwo Jima, Tarawa, Guadalcanal, Okinawa) adalah perang pulau-pulau kecil di mana suplai dibatasi oleh kapasitas pangkalan angkatan laut.',
    keyPoints: [
      {
        heading: 'Benteng Pantai (Coastal Forts) Level 5+',
        description: 'Setiap level benteng pantai mengurangi serangan pendaratan amfibi musuh sebesar -15%. Pada level 5, musuh menderita penalti serangan -75%, membuat pendaratan amfibi tanpa bantuan battleship mustahil berhasil.',
        tags: ['Benteng Pantai', 'Pasifik']
      },
      {
        heading: 'Template Garrison Pulau Pasifik',
        description: 'Tempatkan 1 divisi infanteri 15 width dengan kompi Engineer dan Anti-Air di setiap atol pulau. Jangan menempatkan lebih dari 2 divisi di pulau kecil karena kapasitas suplai akan terlampaui.',
        tags: ['Garrison Atol', 'Logistik Pulau']
      }
    ],
    summaryTips: [
      'Bangun pangkalan udara di pulau-pulau strategis untuk menempatkan Naval Bomber penenggelam armada invasi musuh.',
      'Putuskan jalur suplai pulau musuh menggunakan kapal selam daripada menyerangnya secara langsung.'
    ]
  },
  {
    id: 'g-adv-21',
    level: 'pemula',
    title: 'Cara Mengatur Formasi Angkatan Darat: Army & Army Group',
    subtitle: 'Hierarki komando: 24 divisi per Jenderal, 5 Jenderal per Field Marshal.',
    iconName: 'Shield',
    category: 'Militer Darat',
    readTimeMinutes: 3,
    overview: 'Banyak pemain pemula membiarkan divisi mereka tanpa jenderal atau melebihi kapasitas komando 24 divisi, menderita penalti efektivitas tempur yang parah.',
    keyPoints: [
      {
        heading: 'Batas Komando Jenderal (24 Divisi)',
        description: 'Seorang Jenderal dapat memimpin maksimal 24 divisi (atau 30 divisi jika memiliki sifat Skilled Staffer). Jika melebihi batas, jenderal tersebut kehilangan seluruh bonus stat dan sifat taktisnya.',
        tags: ['Hierarki Komando', 'Jenderal']
      },
      {
        heading: 'Field Marshal (Army Group)',
        description: 'Kelompokkan hingga 5 tentara (maksimal 120 divisi) di bawah satu Field Marshal. Field Marshal memberikan separuh dari bonus sifat kepemimpinannya ke SEMUA 120 divisi di bawah komandonya!',
        tags: ['Field Marshal', 'Army Group']
      }
    ],
    summaryTips: [
      'Beri warna berbeda pada setiap tentara di peta untuk mempermudah identifikasi garis depan.',
      'Gunakan garis depan Field Marshal (tekan Shift + klik garis depan) untuk membagi divisi secara otomatis dan merata di sepanjang perbatasan.'
    ]
  },
  {
    id: 'g-adv-22',
    level: 'menengah',
    title: 'Operasi Penipuan Militer (Deception & Decoy Troops)',
    subtitle: 'Buat divisi boneka murah untuk mengecoh intelijen musuh dan mengancam garis pantai lain.',
    iconName: 'Terminal',
    category: 'Intelijen & Politik',
    readTimeMinutes: 4,
    overview: 'Taktik Operasi Fortitude bersejarah: membodohi jenderal intelijen musuh dengan formasi tentara tipuan untuk membelokkan konsentrasi pertahanan mereka.',
    keyPoints: [
      {
        heading: 'Divisi Boneka (Dummy Divisions)',
        description: 'Buat template divisi yang hanya berisi 1 batalion kavaleri atau infanteri tanpa senjata pendukung. Latih 50 divisi ini dan tempatkan di pelabuhan pesisir menghadap musuh.',
        tags: ['Divisi Boneka', 'Deception']
      },
      {
        heading: 'Efek Terhadap AI dan Pemain Lawan',
        description: 'AI dan pemain lawan akan melihat tumpukan puluhan divisi siap menyerang dan terpaksa memindahkan tentara elit terbaik mereka dari garis depan utama untuk menjaga garis pantai tersebut.',
        proTip: 'Gunakan rencana invasi tipuan (Fake Naval Invasion plan) untuk membunyikan alarm sirene pertahanan musuh.',
        tags: ['Operasi Taktis', 'Psikologis']
      }
    ],
    summaryTips: [
      'Gunakan siaran radio palsu dari agensi intelijen untuk melipatgandakan estimasi jumlah tentara Anda.',
      'Sangat efektif untuk mengalihkan perhatian tentara Jerman dari Normandia menuju Pas-de-Calais.'
    ]
  },
  {
    id: 'g-adv-23',
    level: 'ahli',
    title: 'Manajemen Kerusakan Relatif (Soft Attack vs Hard Attack & Hardness)',
    subtitle: 'Formula matematika matematis cara game membagi tembakan senjata ke divisi musuh.',
    iconName: 'Activity',
    category: 'Militer Darat',
    readTimeMinutes: 5,
    overview: 'Memahami bagaimana nilai Hardness (% lapis baja) menentukan berapa persen Soft Attack dan Hard Attack yang diterima divisi Anda adalah rahasia kemenangan pertempuran tank.',
    keyPoints: [
      {
        heading: 'Formula Hardness Persentase',
        description: 'Jika divisi musuh memiliki 60% Hardness (contoh divisi Medium Panzer): Divisi tersebut hanya menerima 40% dari total Soft Attack Anda, dan menerima 60% dari total Hard Attack Anda!',
        tags: ['Hardness', 'Formula Tempur']
      },
      {
        heading: 'Mengapa Hard Attack Penting Melawan Tank',
        description: 'Menembakkan 500 Soft Attack ke divisi tank dengan 80% Hardness hanya menghasilkan 100 hit efektif. Tetapi 200 Hard Attack akan menghasilkan 160 hit efektif berdaya hancur tinggi!',
        tags: ['Soft vs Hard', 'Penetrasi']
      }
    ],
    summaryTips: [
      'Infanteri biasa memiliki 0% Hardness (menerima 100% Soft Attack).',
      'Mechanized dan Tank menaikkan rata-rata Hardness divisi secara drastis, membuat tembakan senapan dan artileri biasa menjadi tidak efektif.'
    ]
  },
  {
    id: 'g-adv-24',
    level: 'menengah',
    title: 'Pencegahan Kudeta Internal & Perang Saudara (Civil War Prevention)',
    subtitle: 'Cara meredam kenaikan ideologi lawan dan mempertahankan kendali stabilitas politik.',
    iconName: 'AlertTriangle',
    category: 'Intelijen & Politik',
    readTimeMinutes: 4,
    overview: 'Jika popularitas ideologi oposisi (Fasis, Komunis, atau Demokratis) melonjak di atas 50% saat stabilitas rendah, negara Anda dapat meletus menjadi perang saudara berdarah.',
    keyPoints: [
      {
        heading: 'Mendeteksi Ancaman Subversi',
        description: 'Pantau popularitas ideologi di jendela politik. Jika ada kenaikan harian tanpa penjelasan, kemungkinan besar ada mata-mata negara lawan yang sedang menjalankan misi "Boost Ideology" di negaramu.',
        tags: ['Subversi', 'Perang Saudara']
      },
      {
        heading: 'Tindakan Balasan Cepat',
        description: 'Pasang mata-mata Anda sendiri pada misi "Counter-Intelligence" di ibukota. Rekrut menteri ideologi yang memperkuat partai penguasa, dan aktifkan keputusan melarang partai oposisi (Raid Opponent Meetings).',
        tags: ['Counter-Intel', 'Stabilitas']
      }
    ],
    summaryTips: [
      'Gunakan perang saudara sengaja jika Anda ingin mengganti ideologi negara tanpa menunggu pemilu pemilu resmi.',
      'Perang saudara membagi pabrik, armada laut, dan tentara menjadi dua; persiapkan pasukan di provinsi ibukota terlebih dahulu.'
    ]
  },
  {
    id: 'g-adv-25',
    level: 'ahli',
    title: 'Manual Lengkap Komandan Tertinggi: Ringkasan Doktrin Kemenangan PD II',
    subtitle: 'Daftar periksa 10 poin wajib sebelum Anda menekan tombol deklarasi perang dunia.',
    iconName: 'Award',
    category: 'Militer Darat',
    readTimeMinutes: 6,
    overview: 'Katalog ringkasan komprehensif bagi setiap jenderal untuk memastikan kesiapan 100% sebelum memulai perang terbuka di Hearts of Iron IV.',
    keyPoints: [
      {
        heading: 'Checklist Kesiapan Logistik & Industri',
        description: '(1) Surplus senapan, artileri, dan truk di gudang logistik positif. (2) Cadangan bahan bakar minyak minimal untuk 180 hari. (3) Jalur rel kereta api dari ibukota ke supply hub garis depan sudah di-upgrade minimal ke level 2 atau 3.',
        tags: ['Checklist', 'Kesiapan Logistik']
      },
      {
        heading: 'Checklist Kesiapan Tempur & Udara',
        description: '(4) Superioritas udara dipersiapkan dengan minimal 1.000 pesawat tempur di zona tempur utama. (5) Planning bonus divisi garis depan terisi penuh. (6) Seluruh divisi sudah terlatih ke level Regular (Level 3). (7) Pelabuhan pesisir dijaga garrison anti-amfibi.',
        proTip: 'Jangan pernah menyerang saat defisit peralatan berada di angka merah ribuan unit.',
        tags: ['Kesiapan Tempur', 'Ofensif']
      }
    ],
    summaryTips: [
      'Periksa apakah sekutu faksi Anda siap sebelum memanggil mereka masuk ke dalam perang (Call Allies).',
      'Kemenangan di Hearts of Iron IV ditentukan 80% oleh persiapan logistik dan perancangan divisi di masa damai, dan 20% oleh micro-management di medan laga.'
    ]
  }
];
