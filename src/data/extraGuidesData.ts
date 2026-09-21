import { GuideSection } from '../types';

export const EXTRA_GUIDES_DATA: GuideSection[] = [
  // ==================== TANK DESIGNER & ARMOR ====================
  {
    id: 'g-extra-1',
    level: 'menengah',
    title: 'Perancang Tank (Tank Designer): Meta Medium Tank 1940',
    subtitle: 'Kombinasi sasis, turet tiga awak, meriam howitzer vs kanon, dan radio III terbaik.',
    iconName: 'Shield',
    category: 'Militer Darat',
    readTimeMinutes: 5,
    relatedCommand: 'research all',
    relatedDivisionSearch: 'armor',
    overview: 'Dalam DLC No Step Back dan patch modern HOI4, Medium Tank 1940 (sasis T-34 / Panzer IV / Sherman) adalah tulang punggung ofensif paling cost-effective di seluruh game.',
    keyPoints: [
      {
        heading: 'Pilihan Senjata Utama: Medium Howitzer vs Medium Cannon II',
        description: 'Jika bermain Singleplayer (SP) melawan AI yang 90% divisinya adalah infanteri, pasang Medium Howitzer I atau II untuk Soft Attack maksimum (60-70+ soft attack per tank). Di Multiplayer (MP), gunakan Medium Cannon II atau High Velocity Cannon untuk piercing dan hard attack melawan tank musuh.',
        proTip: 'Howitzer memberikan Soft Attack tertinggi dengan biaya IC yang relatif murah, membantai infanteri AI dalam hitungan jam.',
        tags: ['Tank Designer', 'Medium Tank']
      },
      {
        heading: 'Turet & Modul Tambahan Wajib',
        description: 'Selalu gunakan Three-Man Turret untuk menghindari penalti breakthrough. Tambahkan Radio III (+45% breakthrough dan +15% defense), Easy Maintenance (-5% production cost), dan Wet Ammo Storage (+15% reliability).',
        warning: 'Pertahankan Reliability tank di atas 80% agar tidak banyak tank rusak mogok di jalan saat melintasi rawa atau cuaca buruk.',
        tags: ['Modul Ranpur', 'Reliability']
      },
      {
        heading: 'Optimasi Armor & Mesin (Armor vs Speed)',
        description: 'Tingkatkan poin mesin hingga kecepatan mencapai minimal 8.0 km/jam agar dapat mengimbangi truk Motorized, atau 10.0-12.0 km/jam jika dipadukan dengan Mechanized. Jangan buang poin armor berlebihan di SP karena AI jarang membuat senjata anti-tank berat.',
        steps: [
          'Pilih Sasis Medium Tank 1940.',
          'Pasang Three-Man Turret + Medium Howitzer / Medium Cannon II.',
          'Pasang Modul: Radio III, Extra Ammo / Wet Ammo Storage, Easy Maintenance.',
          'Atur Engine points hingga kecepatan pas 8.0 km/jam.',
          'Pastikan Reliability akhir berada di rentang 80% - 90%.'
        ]
      }
    ],
    summaryTips: [
      'Jangan gunakan turet satu awak (One-man turret) pada tank tempur karena penalti breakthrough -50%.',
      'Medium tank dengan biaya 12-14 IC adalah titik manis produksi massal untuk negara major.'
    ]
  },
  {
    id: 'g-extra-2',
    level: 'ahli',
    title: 'Kompi Bantuan Flame Tank: Modifikator Medan Tempur Rahasia',
    subtitle: 'Manfaatkan Medium Flame Tank untuk menghapus penalti serangan di hutan, benteng, dan kota.',
    iconName: 'Flame',
    category: 'Militer Darat',
    readTimeMinutes: 4,
    relatedDivisionSearch: 'special',
    overview: 'Flame Support Tank Company adalah salah satu kompi pendukung paling overpowered dalam game. Menambahkan flame tank memberikan buff serangan langsung pada hampir semua medan sulit.',
    keyPoints: [
      {
        heading: 'Bonus Penetrasi Medan Ekstrem',
        description: 'Flame tank memberikan bonus +15% attack di hutan, +20% di kota, +25% saat menembus benteng (forts), dan +15% di perbukitan. Ini membalikkan penalti medan terburuk sekalipun.',
        tags: ['Flame Tank', 'Modifikator Medan']
      },
      {
        heading: 'Desain Termurah (Budget Design)',
        description: 'Karena flame tank hanya berfungsi sebagai kompi pendukung (support company), Anda tidak membutuhkan armor tebal. Buat sasis Medium Tank tertua (1938), pasang Flamethrower, turet murah, tanpa armor klik tambahan, sehingga biayanya hanya sekitar 5-6 IC per tank.',
        proTip: 'Satu pabrik militer yang ditugaskan membuat flame tank murah sudah cukup untuk mensuplai seluruh divisi infanteri elit Anda.',
        tags: ['Efisiensi IC', 'Kompi Pendukung']
      }
    ],
    summaryTips: [
      'Gunakan Medium Flame Tank daripada Light Flame Tank karena bonus serangannya jauh lebih tinggi.',
      'Pasang flame tank pada divisi infanteri pendobrak atau divisi marinir untuk pendaratan amfibi.'
    ]
  },
  {
    id: 'g-extra-3',
    level: 'menengah',
    title: 'Perancang Pesawat (Aircraft Designer): Meta CAS 1940',
    subtitle: 'Panduan merancang Close Air Support pembunuh divisi darat paling mematikan.',
    iconName: 'Plane',
    category: 'Udara & CAS',
    readTimeMinutes: 4,
    relatedCommand: 'ai_air',
    overview: 'Close Air Support (CAS) adalah pemenang pertempuran darat sesungguhnya di HOI4. CAS menghajar Organization dan Strength divisi musuh secara langsung tanpa terpengaruh pertahanan parit.',
    keyPoints: [
      {
        heading: 'Rangka dan Persenjataan Utama CAS',
        description: 'Gunakan Small Airframe 1940 (Improved Small Airframe). Pasang Small Bomb Bays atau Bomb Locks untuk memaksimalkan Ground Attack. Jangan memasang kanon udara pada CAS murni karena menambah berat dan mengurangi agilitas.',
        tags: ['Aircraft Designer', 'CAS']
      },
      {
        heading: 'Modul Bertahan Hidup',
        description: 'Selalu pasang Self-Sealing Fuel Tanks (menghindari kebakaran saat tertembak AA) dan Armor Plates (+Defense). Jika memiliki surplus mesin, tambahkan Dive Brakes (+Naval Strike & CAS hit rate).',
        warning: 'Tanpa Self-Sealing Fuel Tanks, CAS Anda akan rontok cepat saat berhadapan dengan divisi musuh yang membawa Support Anti-Air.',
        tags: ['Pertahanan Udara', 'Survivability']
      }
    ],
    summaryTips: [
      'Pastikan CAS hanya diterbangkan di zona udara di mana Anda sudah memiliki minimal 70% Air Superiority.',
      'Kombinasi 3 Small Bomb Bays menghasilkan 24-28 Ground Attack per pesawat, mampu melenyapkan divisi musuh dalam beberapa hari.'
    ]
  },
  {
    id: 'g-extra-4',
    level: 'ahli',
    title: 'Meta Fighter Pesawat Tempur Udara 1940',
    subtitle: 'Konfigurasi kanon 20mm vs HMG spam dan maksimalkan perbandingan Agility/Speed.',
    iconName: 'Plane',
    category: 'Udara & CAS',
    readTimeMinutes: 5,
    overview: 'Menguasai langit adalah syarat mutlak untuk menang perang. Tanpa air superiority, divisi darat Anda menderita penalti kecepatan gerak -50% dan penalti defense hingga -35%.',
    keyPoints: [
      {
        heading: 'Debat Persenjataan: Heavy Machine Gun (HMG) vs Cannons',
        description: 'Meta saat ini sangat memfavoritkan spam 3x 4x Heavy Machine Guns (HMG). HMG memberikan Air Attack tinggi dengan berat minimal dan penalti Agility terendah dibandingkan Kanon 20mm yang berat.',
        proTip: 'Fighter dengan Agility lebih tinggi selalu menembak jatuh lebih banyak pesawat musuh pada rasio pertukaran (kill ratio) 5 banding 1.',
        tags: ['Fighter Meta', 'Air Combat']
      },
      {
        heading: 'Pemilihan Mesin: Engine III Single',
        description: 'Gunakan mesin Single Engine level tertinggi yang tersedia. Pasang Drop Tanks jika beroperasi di wilayah luas seperti Uni Soviet atau Pasifik untuk memperluas jangkauan radar operasi.',
        tags: ['Jangkauan Operasi', 'Mesin Pesawat']
      }
    ],
    summaryTips: [
      'Jangan pernah memproduksi fighter dengan interwar airframe setelah tahun 1938.',
      'Latih sayap pesawat (Air Wing Training) hingga level Regular (+25% efektivitas tempur) sebelum perang meletus.'
    ]
  },
  {
    id: 'g-extra-5',
    level: 'menengah',
    title: 'Pendaratan Amfibi & Marinir: Invasi Tanpa Kelaparan Suplai',
    subtitle: 'Cara merencanakan invasi maritim, menghitung waktu persiapan, dan merebut pelabuhan.',
    iconName: 'Anchor',
    category: 'Angkatan Laut',
    readTimeMinutes: 5,
    relatedDivisionSearch: 'special',
    overview: 'Pendaratan amfibi sering kali gagal total dan berakhir dengan seluruh pasukan terbantai jika komandan tidak memahami mekanik pelabuhan, Mulberry Harbors, dan keunggulan laut.',
    keyPoints: [
      {
        heading: 'Aturan 1: Jangan Mendarat Tepat di Pelabuhan Bertahan Kuat',
        description: 'Pelabuhan utama biasanya dijaga garrison divisi musuh dengan benteng pantai. Daratkan pasukan marinir utama di provinsi KIRI dan KANAN pelabuhan, lalu serang pelabuhan tersebut dari darat dengan serangan pincer penjepit.',
        tags: ['Amfibi', 'Taktik Pendaratan']
      },
      {
        heading: 'Mulberry Harbors (Pelabuhan Apung Sementara)',
        description: 'Jika menyerang wilayah terpencil atau pantai berbenteng, bangun Mulberry Harbor di menu produksi. Saat divisi mendarat, Mulberry Harbor menyediakan suplai instan selama 30 hari hingga pelabuhan permanen direbut.',
        proTip: 'Dukung invasi dengan misi Shore Bombardment dari armada Battleship untuk memberikan penalti defense -25% pada musuh di pesisir.',
        tags: ['Mulberry Harbor', 'Shore Bombardment']
      }
    ],
    summaryTips: [
      'Anda membutuhkan minimal 50% Naval Superiority di SEMUA zona laut yang dilalui konvoi invasi.',
      'Gunakan template marinir dengan Combat Width 36 atau 18 yang dipadukan dengan kompi Engineer dan Artileri.'
    ]
  },
  {
    id: 'g-extra-6',
    level: 'ahli',
    title: 'Operasi Penerjun Lintas Udara (Paratroopers Drop)',
    subtitle: 'Kuasai syarat mutlak 70% air superiority dan taktik merebut victory points seketika.',
    iconName: 'Plane',
    category: 'Militer Darat',
    readTimeMinutes: 4,
    relatedCommand: 'transport 100',
    overview: 'Pasukan penerjun payung (Fallschirmjäger / Airborne) dapat mengakhiri perang melawan negara seperti Prancis atau Inggris hanya dalam beberapa hari jika diterjunkan langsung ke kota-kota penting.',
    keyPoints: [
      {
        heading: 'Persyaratan Ketat Drop Udara',
        description: 'Untuk meluncurkan para drop: (1) Minimal 70% Air Superiority di zona udara pangkalan, rute terbang, dan zona target. (2) Pesawat Transport Planes yang mencukupi di pangkalan awal. (3) Divisi paratrooper murni tanpa tank atau artileri berat yang tidak bisa diangkut parasut.',
        warning: 'Jika superioritas udara drop di bawah 70% walau hanya 1 detik, misi akan tertunda dan batal terbang.',
        tags: ['Paratroopers', 'Air Superiority']
      },
      {
        heading: 'Taktik Cheese Victory Point',
        description: 'Alih-alih menjatuhkan semua paratrooper ke satu titik, sebar 10 divisi paratrooper tunggal (Combat Width 4 atau 10) ke 10 titik berbeda: Paris, Reims, Sedan, Lyon, dll. Negara yang stabilitasnya goyah akan langsung kapitulasi seketika.',
        tags: ['Capitulation', 'Blitzkrieg']
      }
    ],
    summaryTips: [
      'Lengkapi paratrooper dengan kompi Support Artillery dan Support Anti-Air untuk daya tahan mandiri.',
      'Paratrooper memiliki out of supply grace 72 jam; segera sambungkan jalur darat atau rebut lapangan terbang terdekat.'
    ]
  },
  {
    id: 'g-extra-7',
    level: 'menengah',
    title: 'Sistem Suplai Jalur Kereta Api & Upgrade Bottleneck',
    subtitle: 'Tingkatkan rel dari level 1 ke level 5 dan pahami alur logistik dari ibukota.',
    iconName: 'Truck',
    category: 'Logistik & Suplai',
    readTimeMinutes: 4,
    overview: 'Di HOI4, semua perbekalan militer (peluru, makanan, bahan bakar) mengalir dari IBUKOTA negaramu melalui rel kereta api menuju Supply Hub terdekat.',
    keyPoints: [
      {
        heading: 'Mendeteksi Bottleneck (Penyempitan Jalur Rel)',
        description: 'Buka peta suplai (tekan F4). Garis rel yang berwarna oranye atau merah menandakan bottleneck. Jika rel dari ibukota melewati satu petak rel level 1, kapasitas seluruh jalur ke garis depan akan terkunci pada kapasitas level 1.',
        proTip: 'Klik Supply Hub garis depan, lalu tekan tombol ikon gerbong kereta bertanda panah ke atas untuk otomatis meng-upgrade seluruh jalur rel dari ibukota ke hub tersebut.',
        tags: ['Rel Kereta Api', 'Bottleneck']
      },
      {
        heading: 'Motorisasi Depot Suplai (Horse to Trucks)',
        description: 'Secara default, Supply Hub mengantar barang ke divisi menggunakan kereta kuda dengan jangkauan pendek. Klik supply hub dan ubah ikon kuda menjadi 2 Truk (Motorized Supply Hub). Ini melipatgandakan radius jangkauan suplai hingga 3 provinsi lebih jauh!',
        warning: 'Memerlukan persediaan truk bermotor di logistik nasional; pastikan surplus truk Anda minimal +500 unit.',
        tags: ['Motorisasi', 'Radius Suplai']
      }
    ],
    summaryTips: [
      'Membangun Supply Hub baru memakan 20.000 IC (sangat lama). Alternatif terbaik: bangun Pelabuhan Level 1 di pesisir yang hanya memakan 3.000 IC dan berfungsi ganda sebagai Supply Hub instan!',
      'Gunakan kereta lapis baja (Armored Trains) untuk mencegah pengeboman udara musuh merusak rel logistik.'
    ]
  },
  {
    id: 'g-extra-8',
    level: 'ahli',
    title: 'Agensi Intelijen (La Resistance): 5 Upgrade Wajib 1936',
    subtitle: 'Cara mencuri cetak biru riset 2 tahun lebih awal dan menghapus fog of war musuh.',
    iconName: 'Terminal',
    category: 'Intelijen & Politik',
    readTimeMinutes: 5,
    relatedCommand: 'agency.autocomplete',
    overview: 'Agensi mata-mata bukan sekadar fitur kosmetik. Jaringan intelijen 100% di negara lawan memberikan bonus +15% damage divisi darat dan menghapus bonus perencanaan musuh.',
    keyPoints: [
      {
        heading: 'Urutan 5 Upgrade Agensi Terbaik',
        description: 'Segera bangun Department of Intelligence di tahun 1936. Prioritaskan: (1) Invisible Ink, (2) Suicide Pills, (3) Department of Cryptology (Radio Enigma), (4) Steal Blueprints (Army/Air), (5) Local Police Force.',
        tags: ['Spionase', 'Upgrade Agensi']
      },
      {
        heading: 'Misi Mencuri Cetak Biru (Steal Blueprints)',
        description: 'Tempatkan 2 mata-mata di negara maju (misal Uni Soviet menempatkan mata-mata di Jerman). Saat jaringan mencapai 50%, jalankan operasi Steal Army Blueprint. Ini memberikan bonus riset 300% atau teknologi tank/senjata instan 2 tahun lebih cepat!',
        proTip: 'Negara kecil dapat melompati riset tank 1940 di tahun 1937 dengan trik mencuri cetak biru ini.',
        tags: ['Steal Blueprint', 'Riset Cepat']
      }
    ],
    summaryTips: [
      'Gunakan dekripsi sandi militer sebelum menyerang; mengaktifkan sandi yang terpecahkan memberi +15% attack selama 30 hari.',
      'Operasi Kolaborasi Pemerintah (Collaboration Government) menurunkan batas kapitulasi Prancis atau Soviet secara drastis.'
    ]
  },
  {
    id: 'g-extra-9',
    level: 'menengah',
    title: 'Operasi Kolaborasi (Collaboration Government): Menaklukkan Soviet Cepat',
    subtitle: 'Capai 100% kolaborasi agar USSR kapitulasi di Moskow tanpa perlu berbaris ke Vladivostok.',
    iconName: 'Globe',
    category: 'Intelijen & Politik',
    readTimeMinutes: 4,
    overview: 'Menaklukkan Uni Soviet sering kali membuat pemain frustrasi karena harus berbaris ribuan kilometer menembus pegunungan Ural. Kolaborasi pemerintah adalah solusi taktisnya.',
    keyPoints: [
      {
        heading: 'Mekanik Ambang Batas Kapitulasi (Surrender Limit)',
        description: 'Secara normal, Soviet baru menyerah saat kehilangan 80-90% victory points (sampai ke Siberia). Dengan menjalankan misi Kolaborasi 3 kali (mencapai 80-100%), Soviet akan langsung menyerah saat Anda merebut Leningrad, Moskow, dan Stalingrad!',
        tags: ['Kolaborasi', 'Uni Soviet']
      },
      {
        heading: 'Akses Pabrik & Manpower Instan',
        description: 'Wilayah yang memiliki tingkat kolaborasi tinggi saat dianeksasi langsung memberikan 75% pabrik sipil & militer serta 100% kepatuhan (compliance), menghilangkan masalah resistensi partisan selamanya.',
        tags: ['Compliance', 'Industri']
      }
    ],
    summaryTips: [
      'Mulai jalankan operasi kolaborasi sejak tahun 1939 saat agensi intelijen sudah memiliki 3 mata-mata aktif.',
      'Sangat dianjurkan untuk Jerman, Jepang, dan negara Axis mana pun yang ingin menaklukkan Uni Soviet.'
    ]
  },
  {
    id: 'g-extra-10',
    level: 'ahli',
    title: 'Combat Width Meta Terkini: Analisis Lebar 15, 18, 21, 30, 35',
    subtitle: 'Penyesuaian lebar tempur terhadap medan Plains, Forest, Hills, Mountain, dan Urban.',
    iconName: 'Shield',
    category: 'Militer Darat',
    readTimeMinutes: 6,
    relatedDivisionSearch: 'width',
    overview: 'Sistem Combat Width tidak lagi menggunakan sistem 20/40 width seragam. Setiap jenis medan kini memiliki batas lebar tempur unik yang harus disesuaikan agar tidak terkena penalti overcrowding.',
    keyPoints: [
      {
        heading: 'Tabel Lebar Medan Tempur',
        description: 'Plains: 70 width (+35 per sayap tambahan). Hills: 70 width (+35). Forest: 60 width (+30). Mountain: 50 width (+25). Urban: 80 width (+40). Marsh: 50 width (+25).',
        tags: ['Combat Width', 'Medan']
      },
      {
        heading: 'Template Universal Paling Efisien',
        description: '15-18 Width: Sangat optimal untuk divisi infanteri defensif massal di hutan dan pegunungan. 21 Width (9 Inf + 1 Arty): Keseimbangan terbaik infanteri garis depan di dataran Eropa. 30-35 Width: Lebar emas untuk divisi ofensif lapis baja (Panzer Division).',
        proTip: 'Hindari Combat Width ganjil yang tidak bisa dibagi habis oleh 60, 70, atau 80 seperti 27 atau 33 width.',
        tags: ['Optimal Width', 'Divisi']
      }
    ],
    summaryTips: [
      'Gunakan 18 width untuk infanteri bertahan dan 30 width untuk divisi tank penyerang utama.',
      'Periksa apakah petak medan diserang dari lebih dari satu arah (multi-axis attack) untuk membuka lebar tempur ekstra.'
    ]
  },
  {
    id: 'g-extra-11',
    level: 'menengah',
    title: 'Garrison & Hukum Pendudukan: Mencegah Sabotase Pabrik',
    subtitle: 'Template Kavaleri + Polisi Militer (MP) dan pemilihan hukum Civilian vs Martial Law.',
    iconName: 'Shield',
    category: 'Logistik & Suplai',
    readTimeMinutes: 4,
    overview: 'Resistensi partisan di wilayah taklukan dapat meledakkan pabrik, merusak rel kereta, dan menguras jutaan manpower cadangan Anda jika tidak dikelola dengan benar.',
    keyPoints: [
      {
        heading: 'Template Garrison Terbaik: Full Cavalry + MP',
        description: 'Kavaleri memiliki stat suppression 2 poin per batalion (dua kali lipat infanteri biasa) dan tidak mengonsumsi bahan bakar. Buat template khusus berisi 25 batalion Kavaleri + Kompi Military Police (MP) untuk efisiensi manpower dan senapan maksimal.',
        proTip: 'Hanya satu batalion kavaleri di dalam template suppression akan menghasilkan nilai penekanan yang sama dengan rasio manpower terendah.',
        tags: ['Garrison', 'Kavaleri MP']
      },
      {
        heading: 'Pilihan Hukum Pendudukan (Occupation Laws)',
        description: 'Gunakan Local Police Force untuk wilayah biasa. Jika resistensi di atas 40%, naikkan ke Martial Law atau Secret Police. Jangan gunakan No Garrison kecuali di wilayah inti nasional Anda.',
        tags: ['Occupation Laws', 'Resistensi']
      }
    ],
    summaryTips: [
      'Mobil Lapis Baja (Armored Cars) memiliki suppression terbaik dan ketahanan tinggi, namun memakan biaya pabrik militer lebih mahal.',
      'Kepatuhan (Compliance) yang tinggi seiring waktu akan membuka 100% pabrik dan sumber daya wilayah taklukan.'
    ]
  },
  {
    id: 'g-extra-12',
    level: 'ahli',
    title: 'Officer Corps & Roh Militer (Military Spirits): Doktrin & CP',
    subtitle: 'Maksimalkan Command Power, Spirit of the Army, dan kustomisasi jenderal staf.',
    iconName: 'Award',
    category: 'Militer Darat',
    readTimeMinutes: 4,
    overview: 'Fitur Officer Corps memungkinkan Anda menyewa perwira tinggi dan memilih doktrin filosofi militer yang memberikan buff masif di seluruh angkatan bersenjata.',
    keyPoints: [
      {
        heading: 'Spirit of the Army Paling Berharga',
        description: 'Pilih "Professional Officer Corps" untuk diskon biaya XP doktrin militer sebesar -20%, atau "State-Serving Military" untuk akselerasi perolehan Army XP harian.',
        tags: ['Officer Corps', 'Army XP']
      },
      {
        heading: 'Division Command Spirit',
        description: 'Pilih "Aggressive Reconnaissance" untuk +10% pergerakan di segala medan, atau "Relentless Assault" untuk +5% soft attack dan peluang taktik tak terduga dalam simulasi tempur.',
        tags: ['Spirit Taktis', 'Komandan']
      }
    ],
    summaryTips: [
      'Promosikan jenderal berbakat menjadi Field Marshal untuk membagikan keahlian ofensif ke 5 jenderal di bawah komandonya.',
      'Simpan Command Power minimal 50 poin untuk keadaan darurat mengaktifkan Last Stand di garis benteng.'
    ]
  },
  {
    id: 'g-extra-13',
    level: 'menengah',
    title: 'MIO (Military Industrial Organizations): Leveling & Trait Khusus',
    subtitle: 'Cara melatih pabrikan Henschel, Porsche, Vickers, dan Mitsubishi untuk senjata superior.',
    iconName: 'Factory',
    category: 'Ekonomi & Industri',
    readTimeMinutes: 5,
    overview: 'DLC Arms Against Tyranny memperkenalkan MIO yang naik level setiap kali Anda menugaskannya untuk meriset teknologi atau memproduksi peralatan di pabrik militer.',
    keyPoints: [
      {
        heading: 'Siklus Leveling MIO Cepat',
        description: 'Tugaskan MIO pilihan Anda ke jalur produksi massal sejak 1936. Setiap 1.000 peralatan yang diproduksi menambah dana riset MIO. Naikkan cabang trait yang mengurangi biaya produksi (-10% IC) terlebih dahulu.',
        tags: ['MIO', 'Leveling Pabrikan']
      },
      {
        heading: 'Menerapkan Upgrade pada Peralatan yang Sudah Ada',
        description: 'Saat MIO naik level dan membuka trait baru, Anda tidak perlu merancang ulang dari nol. Cukup klik tombol "Apply MIO Upgrades" pada varian peralatan yang sedang aktif diproduksi.',
        proTip: 'Henschel memberikan bonus Armor & Breakthrough tak tertandingi pada tank menengah Jerman.',
        tags: ['Trait Khusus', 'Upgrade']
      }
    ],
    summaryTips: [
      'Fokuskan produksi pada 1 atau 2 MIO utama agar levelnya cepat mencapai Tier 8-10.',
      'Jangan berganti-ganti MIO di tengah jalan karena akan memperlambat akumulasi poin pengalaman.'
    ]
  },
  {
    id: 'g-extra-14',
    level: 'ahli',
    title: 'Riset Proyek Khusus (Special Projects): Gotterdammerung Update',
    subtitle: 'Membangun fasilitas sains, riset senjata rahasia, rudal balistik, dan jet supersonik.',
    iconName: 'Cpu',
    category: 'Ekonomi & Industri',
    readTimeMinutes: 5,
    overview: 'Fasilitas proyek khusus memungkinkan negara mengalokasikan ilmuwan terkemuka untuk mengembangkan prototipe teknologi terobosan melampaui pohon riset standar.',
    keyPoints: [
      {
        heading: 'Membangun Fasilitas Riset (Special Project Facility)',
        description: 'Bangun fasilitas proyek khusus di provinsi terpencil yang aman dari jangkauan pembom musuh. Alokasikan ilmuwan elit sesuai keahliannya (Fisika, Penerbangan, atau Metalurgi).',
        tags: ['Special Projects', 'Fasilitas']
      },
      {
        heading: 'Siklus Iterasi Prototipe',
        description: 'Setiap proyek menghasilkan prototipe dengan tingkat keberhasilan probabilistik. Jika uji coba berhasil, Anda akan membuka varian senjata eksperimental dengan stat 30% di atas teknologi zamannya.',
        tags: ['Prototipe', 'Senjata Rahasia']
      }
    ],
    summaryTips: [
      'Proyek roket dan reaktor nuklir adalah investasi jangka panjang yang mulai membuahkan hasil di tahun 1943-1944.',
      'Pastikan Anda memiliki surplus pabrik sipil sebelum memulai pembangunan fasilitas khusus.'
    ]
  },
  {
    id: 'g-extra-15',
    level: 'menengah',
    title: 'Monopoli Sumber Daya Alam: Karet, Minyak & Tungsten',
    subtitle: 'Kuasai rute dagang Hindia Belanda, Malaya, Ploesti, dan Kaukasus untuk melumpuhkan musuh.',
    iconName: 'Globe',
    category: 'Ekonomi & Industri',
    readTimeMinutes: 4,
    overview: 'Perang Dunia II di HOI4 pada dasarnya adalah perang memperebutkan sumber daya. Tanpa Karet dan Minyak, mesin perang negara Poros atau Sekutu akan lumpuh total.',
    keyPoints: [
      {
        heading: 'Karet (Rubber): Leher Angsa Pabrik Pesawat',
        description: 'Lebih dari 80% karet dunia berlokasi di Malaya Inggris dan Hindia Belanda (Indonesia). Jika Jepang atau Poros merebut Asia Tenggara, Sekutu akan kehabisan karet untuk memproduksi pesawat tempur dan truk.',
        tags: ['Karet', 'Asia Tenggara']
      },
      {
        heading: 'Minyak Bumi (Oil): Darah Peperangan Modern',
        description: 'Kuasai ladang minyak Ploesti (Rumania), Baku (Kaukasus Soviet), atau Timur Tengah. Tanpa bahan bakar, armada laut tidak bisa berlayar dan divisi tank kehilangan 90% serangannya.',
        proTip: 'Jika terisolasi dari jalur laut, bangun Synthetic Refineries dan riset teknologi hidrogenasi batubara.',
        tags: ['Minyak', 'Bahan Bakar']
      }
    ],
    summaryTips: [
      'Gunakan kapal selam untuk memblokade rute konvoi impor sumber daya musuh di Samudra Atlantik dan Hindia.',
      'Gunakan hukum perdagangan Free Trade untuk mendapatkan bonus riset +10% dan kecepatan konstruksi +15% selama Anda tidak kekurangan sumber daya.'
    ]
  },
  {
    id: 'g-extra-16',
    level: 'ahli',
    title: 'Strategi Negara Minor: Finlandia (Sisu & Winter War)',
    subtitle: 'Cara menghancurkan jutaan tentara Uni Soviet di hutan salju dan Garis Mannerheim.',
    iconName: 'Award',
    category: 'Militer Darat',
    readTimeMinutes: 6,
    recommendedForTag: 'FIN',
    overview: 'Finlandia memiliki spirit nasional "Sisu" dan mekanik Perang Musim Dingin unik yang memungkinkan negara berpenduduk sedikit mengalahkan raksasa Uni Soviet.',
    keyPoints: [
      {
        heading: 'Pertahanan Garis Mannerheim',
        description: 'Tingkatkan benteng tanah Garis Mannerheim di tanah genting Karelia. Gunakan template infanteri ski hutan dengan batalion pemburu khusus (Sissi) yang kebal penalti cuaca dingin ekstrem.',
        tags: ['Finlandia', 'Winter War']
      },
      {
        heading: 'Mottitactic: Pengepungan Pasukan Soviet',
        description: 'Biarkan pasukan Soviet masuk ke pedalaman hutan bersalju yang miskin suplai. Ketika mereka kelaparan dan menderita attrition beku, gunakan divisi ski cepat Anda untuk memotong rel perbekalan dan memusnahkan kantong (Motti) tersebut.',
        proTip: 'Jangan pernah menyerang balik secara frontal sebelum pasukan Soviet kehabisan suplai dan organisasi.',
        tags: ['Motti Tactic', 'Pertahanan Salju']
      }
    ],
    summaryTips: [
      'Gunakan kompi Maintenance Company untuk mencuri ratusan ribu senapan dan tank Soviet yang ditinggalkan musuh.',
      'Bentuk aliansi Nordik atau manfaatkan invasi Jerman ke Soviet (Barbarossa) untuk merebut kembali Karelia.'
    ]
  },
  {
    id: 'g-extra-17',
    level: 'menengah',
    title: 'Strategi Negara Minor: Belanda (Pertahanan Banjir Polder & Batavia)',
    subtitle: 'Gunakan banjir Zuid-Willemsvaart untuk menghentikan Blitzkrieg Jerman di tahun 1940.',
    iconName: 'Globe',
    category: 'Intelijen & Politik',
    recommendedForTag: 'HOL',
    readTimeMinutes: 5,
    overview: 'Belanda memiliki mekanik unik membuka tanggul laut polder untuk menenggelamkan dataran rendahnya, menghentikan tank Jerman seketika dengan penalti pergerakan luar biasa.',
    keyPoints: [
      {
        heading: 'Inundasi Polder (Banjir Pertahanan)',
        description: 'Saat Jerman menyatakan perang, ambil fokus pertahanan polder dan buka tanggul laut. Petak tanah yang terendam air memberikan penalti serangan dan kecepatan -70% pada pasukan Jerman.',
        tags: ['Belanda', 'Polder']
      },
      {
        heading: 'Relokasi Ibukota ke Batavia (Hindia Belanda)',
        description: 'Jika daratan Eropa tidak dapat dipertahankan, Anda dapat memindahkan pemerintahan ke Batavia (Jakarta) dan memanfaatkan jutaan manpower serta sumber daya karet tak terbatas untuk membiayai pembebasan Eropa.',
        tags: ['Hindia Belanda', 'Relokasi']
      }
    ],
    summaryTips: [
      'Bangun benteng laut level 4 di garis Amsterdam-Rotterdam untuk bertahan tak terhingga waktu.',
      'Aliansikan diri dengan Inggris sejak awal tahun 1939.'
    ]
  },
  {
    id: 'g-extra-18',
    level: 'ahli',
    title: 'Strategi Negara Minor: Polandia (Membalikkan Nasib Dua Front)',
    subtitle: 'Tahan gempuran Jerman dan Soviet sekaligus dengan garis sungai Vistula dan benteng parit.',
    iconName: 'Shield',
    category: 'Militer Darat',
    recommendedForTag: 'POL',
    readTimeMinutes: 6,
    overview: 'Bermain Polandia di tahun 1939 adalah ujian tertinggi bagi pemain HOI4. Anda harus bertahan dari ancaman capit ganda Jerman di barat dan Uni Soviet di timur.',
    keyPoints: [
      {
        heading: 'Strategi Garis Pertahanan Sungai Vistula & San',
        description: 'Segera lepaskan koridor Danzig jika tidak siap, dan tarik seluruh tentara ke balik Sungai Vistula dan San di Warsawa. Sungai memberikan penalti serangan -30% pada divisi Panzer Jerman.',
        tags: ['Polandia', 'Sungai Vistula']
      },
      {
        heading: 'Fokus Sanacja vs Monarki Habsburg/Romanov',
        description: 'Jalur pohon fokus Polandia memungkinkan pembentukan Persemakmuran Polandia-Lituania atau aliansi Miedzymorze yang mengumpulkan negara-negara Baltik dan Rumania ke dalam blok pertahanan bersama.',
        proTip: 'Gunakan kavaleri cepat Polandia untuk melakukan serangan balik kilat ke Prussia Timur saat tentara Jerman terfokus di Silesia.',
        tags: ['Miedzymorze', 'Politik']
      }
    ],
    summaryTips: [
      'Pasang Support Anti-Air di SEMUA divisi Polandia untuk meniadakan superioritas udara Luftwaffe.',
      'Jangan biarkan Warsawa terkepung; pastikan jalur pasokan ke Rumania tetap terbuka untuk impor suplai.'
    ]
  },
  {
    id: 'g-extra-19',
    level: 'menengah',
    title: 'Strategi Negara Minor: Tiongkok Nasionalis (Chiang Kai-shek vs Jepang)',
    subtitle: 'Taktik bumi hangus, banjir Sungai Kuning, dan grinding attrition menguras industri Tokyo.',
    iconName: 'Globe',
    category: 'Militer Darat',
    recommendedForTag: 'CHI',
    readTimeMinutes: 5,
    overview: 'Sebagai Tiongkok Nasionalis, Anda memiliki jutaan manpower namun hampir tidak memiliki pabrik dan senapan modern. Kemenangan diraih melalui perang gerilya dan attrition ruang geografis.',
    keyPoints: [
      {
        heading: 'Pertahanan Sungai Kuning & Bumi Hangus',
        description: 'Tarik pasukan dari Beijing ke garis alami Sungai Kuning. Saat pasukan Jepang mendekat, aktifkan keputusan keputusan meledakkan tanggul Sungai Kuning untuk menghambat invasi mereka selama berbulan-bulan.',
        tags: ['Tiongkok', 'Sungai Kuning']
      },
      {
        heading: 'Mencegah Pendaratan Amfibi di Pesisir',
        description: 'Tempatkan 1-2 divisi murah di SETIAP pelabuhan dari Shanghai hingga Guangzhou. Tentara Jepang akan kehabisan suplai jika mereka mendarat di luar pelabuhan tanpa jalur logistik.',
        proTip: 'Gunakan hukum pertahanan Mass Mobilization untuk mendapatkan kecepatan recovery organisasi luar biasa.',
        tags: ['Garrison Pantai', 'Anti-Invasi']
      }
    ],
    summaryTips: [
      'Satukan para Warlord (Panglima Perang) ke dalam Front Persatuan Nasionalis (United Front).',
      'Manfaatkan bantuan militer Flying Tigers dan Lend-Lease dari Amerika Serikat untuk pasokan senjata.'
    ]
  },
  {
    id: 'g-extra-20',
    level: 'ahli',
    title: 'Peace Conference Meta: Trik Mendominasi Konferensi Perdamaian',
    subtitle: 'Cara mengambil seluruh pabrik, mencaplok armada kapal perang musuh, dan membuat negara boneka.',
    iconName: 'Award',
    category: 'Intelijen & Politik',
    readTimeMinutes: 5,
    overview: 'Konferensi perdamaian di patch baru menggunakan sistem poin lelang bergiliran. Mengetahui prioritas pengeluaran poin mencegah Sekutu membuat perbatasan jelek (border gore).',
    keyPoints: [
      {
        heading: 'Mencaplok Armada Kapal Perang (Take Navy)',
        description: 'Anda sekarang dapat menuntut penyerahan seluruh kapal perang musuh (Take Surface Fleet)! Ini memungkinkan negara tanpa industri galangan (seperti Jerman yang menang melawan Inggris) langsung memiliki 200 kapal perang modern secara instan.',
        tags: ['Peace Conference', 'Armada Laut']
      },
      {
        heading: 'Membuat Puppet Daripada Aneksasi Langsung',
        description: 'Membuat negara boneka (Puppet / Satellite) jauh lebih murah poinnya daripada aneksasi langsung, dan Anda tetap dapat menggunakan manpower serta pabrik mereka tanpa risiko resistensi partisan.',
        proTip: 'Sisakan satu provinsi miskin sumber daya untuk musuh jika Anda kehabisan poin perdamaian.',
        tags: ['Puppet', 'Poin Lelang']
      }
    ],
    summaryTips: [
      'Tingkatkan kontribusi perang (War Score) dengan menembak jatuh pesawat, mengebom pabrik, dan merebut victory points bernilai tinggi.',
      'Demiliterisasi provinsi perbatasan untuk mencegah agresi militer baru di masa depan.'
    ]
  },
  {
    id: 'g-extra-21',
    level: 'pemula',
    title: 'Manajemen Stabilitas & War Support: Menghindari Mogok Kerja',
    subtitle: 'Pertahankan stabilitas di atas 50% untuk menghindari krisis pemogokan buruh dan draft dodging.',
    iconName: 'Shield',
    category: 'Intelijen & Politik',
    readTimeMinutes: 3,
    overview: 'Jika Stabilitas negaramu jatuh di bawah 50%, buruh pabrik akan mogok kerja, produksi terhenti, dan ancaman perang saudara meningkat drastis.',
    keyPoints: [
      {
        heading: 'Penyebab Stabilitas Rendah',
        description: 'Perang yang berlarut-larut, pengeboman strategis musuh atas kota-kota Anda, tingginya angka kematian tentara di garis depan, dan keberadaan mata-mata musuh yang menyebarkan propaganda negatif.',
        tags: ['Stabilitas', 'Krisis']
      },
      {
        heading: 'Solusi Cepat Menaikkan Stabilitas',
        description: 'Gunakan keputusan "Improve Worker Conditions" (+12% stabilitas), pasang menteri Political Advisor yang memberi stabilitas harian, dan pertahankan popularitas partai penguasa di atas 70%.',
        proTip: 'Aktifkan keputusan "War Propaganda" setiap kali tersedia untuk mendongkrak War Support hingga 100%.',
        tags: ['Keputusan', 'Propaganda']
      }
    ],
    summaryTips: [
      'War Support 100% memberikan bonus kecepatan mobilisasi divisi dan attack di wilayah inti nasional.',
      'Jangan mengganti hukum conscription ke tingkat brutal jika stabilitas negaramu masih merah.'
    ]
  },
  {
    id: 'g-extra-22',
    level: 'menengah',
    title: 'Trik Lend-Lease: Mengirim Peralatan Surplus Panen Jutaan XP',
    subtitle: 'Kirim senapan lama ke sekutu yang sedang bertempur untuk memanen Army & Air XP masif.',
    iconName: 'Truck',
    category: 'Ekonomi & Industri',
    readTimeMinutes: 4,
    overview: 'Di awal permainan (1936-1938), Army XP sangat langka padahal Anda membutuhkannya untuk mengedit template divisi dan memilih doktrin. Lend-Lease adalah tambang XP tercepat.',
    keyPoints: [
      {
        heading: 'Kirim Bantuan ke Perang Saudara Spanyol & Tiongkok',
        description: 'Kirimkan ribuan senapan infanteri lama, pesawat tempur usang, atau truk ke pihak yang sedang bertempur aktif (misal Republik Spanyol atau Nasionalis Spanyol). Setiap kali mereka menggunakan senjata Anda dalam baku tembak, Anda mendapatkan aliran Army XP gratis setiap bulannya!',
        tags: ['Lend-Lease', 'Army XP']
      },
      {
        heading: 'Memaksimalkan Kapasitas Konvoi',
        description: 'Pastikan jalur konvoi laut aman dari serangan kapal selam musuh. Jika jalur terblokir, kirim bantuan lewat perbatasan darat langsung.',
        tags: ['Konvoi', 'Rute Dagang']
      }
    ],
    summaryTips: [
      'Gabungkan Lend-Lease dengan mengirim sukarelawan (Volunteer Divisions) dan atase militer untuk melipatgandakan perolehan XP.',
      'Gunakan Army XP awal ini untuk segera menghapus batalion tidak berguna dari template divisi Anda.'
    ]
  },
  {
    id: 'g-extra-23',
    level: 'ahli',
    title: 'Desain Kapal Selam Siluman (Submarine III/IV + Snorkel Meta)',
    subtitle: 'Cara melumpuhkan seluruh konvoi impor Inggris dan Amerika dengan armada U-Boat murah.',
    iconName: 'Anchor',
    category: 'Angkatan Laut',
    readTimeMinutes: 5,
    overview: 'Submarine III dan IV yang dilengkapi Snorkel memiliki angka visibilitas sub yang sangat rendah, membuat mereka hampir tidak terdeteksi oleh sonar destroyer musuh.',
    keyPoints: [
      {
        heading: 'Konfigurasi Modul Kapal Selam Meta',
        description: 'Gunakan Sasis Submarine 1940 atau 1944. Pasang Snorkel level tertinggi yang tersedia, Torpedo Tubes ganda, dan mesin diesel modern. Jangan memasang ranjau laut jika ingin fokus pada misi Convoy Raiding.',
        tags: ['Submarine Meta', 'Snorkel']
      },
      {
        heading: 'Taktik Doktrin Trade Interdiction',
        description: 'Pilih Doktrin Angkatan Laut "Trade Interdiction". Doktrin ini memberikan buff visibilitas kapal selam -20% dan kecepatan koordinasi serangan salvo torpedo pertama.',
        proTip: 'Bagi kapal selam ke dalam gugus tugas (Task Force) kecil berisi 8-12 kapal selam yang disebar di 6 zona laut samudra terbuka.',
        tags: ['Trade Interdiction', 'Wolfpack']
      }
    ],
    summaryTips: [
      'Hindari menugaskan kapal selam di perairan dangkal (Shallow Seas seperti Selat Inggris) karena penalti visibilitas +100% yang membuat mereka mudah dibom pesawat.',
      'Tenggelamkan 500+ konvoi musuh untuk membuat jutaan tentara lawan kelaparan amunisi di seberang samudra.'
    ]
  },
  {
    id: 'g-extra-24',
    level: 'menengah',
    title: 'Desain Kapal Perusak (Destroyer) Anti-Kapal Selam (ASW)',
    subtitle: 'Rakit armada pengawal konvoi murah bersenjata Sonar, Depth Charges, dan Radar.',
    iconName: 'Anchor',
    category: 'Angkatan Laut',
    readTimeMinutes: 4,
    overview: 'Kapal perang raksasa seperti Battleship dan Aircraft Carrier tidak berdaya melawan kapal selam tanpa kawalan Destroyer yang dirancang khusus untuk memburu U-Boat.',
    keyPoints: [
      {
        heading: 'Desain Destroyer Khusus Pemburu U-Boat',
        description: 'Gunakan sasis Destroyer 1936 atau 1940 murah. Pasang Sonar (wajib), 1x Depth Charge Mortar, 1x Baterai Kanon Ringan, dan Engine level 2. Biaya produksinya sangat hemat (hanya sekitar 1.200 IC).',
        tags: ['Destroyer ASW', 'Sonar']
      },
      {
        heading: 'Pengaturan Misi Patrol vs Convoy Escort',
        description: 'Tugaskan destroyer murah ini ke misi "Convoy Escort" di rute laut vital Anda. Ketika kapal selam musuh mencoba menyergap konvoi, destroyer akan langsung mendeteksi dan menghancurkan mereka dengan bom laut.',
        tags: ['Convoy Escort', 'Patroli']
      }
    ],
    summaryTips: [
      'Pertahankan rasio minimal 4 Destroyer untuk setiap 1 Kapal Induk / Battleship dalam armada tempur utama (Strike Force).',
      'Jangan biarkan screening efficiency armada Anda jatuh di bawah 100% agar kapal utama Anda terlindungi dari torpedo.'
    ]
  },
  {
    id: 'g-extra-25',
    level: 'ahli',
    title: 'Desain Light Cruiser Pemusnah Tabir Layar (Screen Killer)',
    subtitle: 'Spam baterai meriam ringan untuk menghabisi seluruh kapal perusak musuh dalam hitungan menit.',
    iconName: 'Anchor',
    category: 'Angkatan Laut',
    readTimeMinutes: 5,
    overview: 'Dalam pertempuran laut skala besar (Fleet Battle), armada yang kehilangan kapal layarnya (Screen) terlebih dahulu akan langsung dibantai oleh torpedo. Light Cruiser adalah pembunuh screen terbaik.',
    keyPoints: [
      {
        heading: 'Desain Light Cruiser Baterai Maksimal',
        description: 'Gunakan Sasis Cruiser 1940. Pasang 4 hingga 5 modul Light Cruiser Battery (meriam 6-inci). Ini menghasilkan Light Attack masif (45-60+ attack) yang dapat menenggelamkan destroyer musuh hanya dengan satu salvo tembakan.',
        tags: ['Light Cruiser', 'Screen Killer']
      },
      {
        heading: 'Armor Tipis tapi Cepat',
        description: 'Pasang Armor level 1 atau 2 saja agar kecepatan kapal tetap di atas 32 knot, membuatnya sulit dikenai tembakan meriam berat kapal tempur musuh.',
        tags: ['Kecepatan Kapal', 'Survival']
      }
    ],
    summaryTips: [
      'Sertakan 4-6 Light Cruiser tipe ini di armada Strike Force Anda untuk memusnahkan tabir pertahanan lawan sebelum meluncurkan serangan udara pesawat kapal induk.',
      'Satu skuadron Light Cruiser yang dirancang dengan benar dapat melenyapkan 50 destroyer musuh dalam satu pertempuran laut.'
    ]
  },
  {
    id: 'g-extra-26',
    level: 'pemula',
    title: 'Cara Membaca Combat Log & Indikator Pertempuran Gelembung (Bubble)',
    subtitle: 'Pahami arti angka hijau 100, kuning 50, merah 20, dan bilah Organization vs Strength.',
    iconName: 'Activity',
    category: 'Militer Darat',
    readTimeMinutes: 3,
    overview: 'Gelembung pertempuran (Combat Bubble) di peta adalah indikator real-time paling penting untuk memantau apakah serangan Anda berhasil atau justru menjadi pembantaian massal.',
    keyPoints: [
      {
        heading: 'Membaca Warna dan Angka Gelembung',
        description: 'Hijau (50-100): Pasukan Anda sedang menang dan pertahanan musuh hampir runtuh. Kuning (30-50): Pertempuran berimbang sengit. Merah (0-30): Pasukan Anda sedang kalah telak dan menderita kerugian besar; segera batalkan serangan!',
        tags: ['Combat Bubble', 'Indikator']
      },
      {
        heading: 'Bilah Hijau (Org) vs Bilah Cokelat (Strength)',
        description: 'Bilah Hijau menunjukkan Organization (semangat tempur & koordinasi). Jika bilah hijau habis, divisi akan mundur. Bilah Cokelat/Kuning menunjukkan Strength (persentase manpower dan senjata yang masih hidup). Jika bilah cokelat habis, divisi musnah selamanya!',
        tags: ['Organization', 'Strength']
      }
    ],
    summaryTips: [
      'Klik gelembung pertempuran untuk membuka jendela taktis detail yang menunjukkan taktik jenderal, bonus medan, dan kerusakan CAS.',
      'Segera tekan tombol STOP (shortcut H) jika melihat gelembung pertempuran berwarna merah pekat.'
    ]
  },
  {
    id: 'g-extra-27',
    level: 'menengah',
    title: 'Pengeboman Strategis (Strategic Bombing): Meratakan Industri Musuh',
    subtitle: 'Hancurkan pangkalan udara, pabrik militer, dan rel kereta api lawan dari ketinggian 10.000 meter.',
    iconName: 'Plane',
    category: 'Udara & CAS',
    readTimeMinutes: 4,
    overview: 'Pengeboman strategis adalah cara paling elegan untuk melemahkan negara industri besar seperti Inggris atau Jerman tanpa perlu mendaratkan satu pun tentara darat.',
    keyPoints: [
      {
        heading: 'Sasaran Prioritas Pengeboman',
        description: 'Buka menu pembom strategis dan pilih target prioritas: (1) Airfields (menghancurkan pangkalan udara agar pesawat tempur musuh tidak bisa lepas landas), (2) Railways & Supply Hubs (memutus suplai garis depan), (3) Military Factories.',
        tags: ['Strategic Bombing', 'Target Prioritas']
      },
      {
        heading: 'Pencegahan Kerugian Pembom',
        description: 'Pembom strategis sangat mahal diproduksi. Selalu sertakan Heavy Fighter jarak jauh untuk mengawal mereka, atau lakukan misi pengeboman di malam hari (Night Bombing) untuk menghindari tembakan meriam Flak.',
        tags: ['Escort Fighter', 'Night Bombing']
      }
    ],
    summaryTips: [
      'Gunakan pembom berat dengan Bomb Bay berkapasitas besar untuk meratakan seluruh infrastruktur provinsi dalam hitungan minggu.',
      'Pengeboman yang konsisten menurunkan War Support musuh hingga batas minimal.'
    ]
  },
  {
    id: 'g-extra-28',
    level: 'ahli',
    title: 'Serangan Bom Atom (Nuclear Strike): Syarat Mutlak & Efek Lapangan',
    subtitle: 'Persyaratan 75% air superiority, pembom strategis, dan efek penghancuran total divisi lawan.',
    iconName: 'Award',
    category: 'Udara & CAS',
    readTimeMinutes: 4,
    relatedCommand: 'nukes 10',
    overview: 'Bom atom di HOI4 adalah senjata pengubah jalannya sejarah yang dapat memaksa negara adidaya menyerah seketika jika dijatuhkan di kota-kota kunci.',
    keyPoints: [
      {
        heading: 'Tiga Syarat Wajib Menjatuhkan Bom Atom',
        description: '(1) Memiliki minimal 1 bom atom yang sudah selesai dirakit. (2) Memiliki minimal 75% Air Superiority di zona udara target. (3) Memiliki minimal 1 pesawat Strategic Bomber yang beroperasi di zona udara tersebut.',
        warning: 'Jika superioritas udara Anda hanya 74%, tombol bom atom tidak akan bisa diklik.',
        tags: ['Bom Atom', 'Syarat Nuklir']
      },
      {
        heading: 'Dampak Penghancuran Dahsyat',
        description: 'Menjatuhkan nuklir pada provinsi yang dipenuhi divisi musuh akan langsung menghancurkan 100% Organization mereka dan mengurangi Strength sebesar 50-80%, memungkinkan penembusan benteng terdalam (seperti Garis Maginot atau Pegunungan Alpen) secara instan!',
        tags: ['Dampak Ledakan', 'Anihilasi']
      }
    ],
    summaryTips: [
      'Jatuhkan dua bom atom di kota-kota utama Jepang (setelah armadanya dihancurkan) untuk memicu peristiwa Kapitulasi Bersejarah Jepang.',
      'Setiap ledakan bom atom mengurangi War Support negara korban secara permanen sebesar -20%.'
    ]
  },
  {
    id: 'g-extra-29',
    level: 'menengah',
    title: 'Manajemen Command Power (CP): Kapan Pakai Force Attack & Last Stand',
    subtitle: 'Gunakan kemampuan perwira staf tempur secara bijak tanpa mengorbankan promosi jenderal.',
    iconName: 'Zap',
    category: 'Militer Darat',
    readTimeMinutes: 3,
    overview: 'Command Power (CP) berkapasitas maksimal 100 poin dan digunakan untuk menyewa perwira tinggi militer, mempromosikan jenderal, dan mengaktifkan kemampuan taktis di medan laga.',
    keyPoints: [
      {
        heading: 'Kemampuan "Force Attack"',
        description: 'Memaksa divisi terus menyerang tanpa memperhitungkan kerugian korban dan mencegah musuh memulihkan organisasi. Sangat krusial digunakan saat tinggal selangkah lagi merebut pelabuhan atau ibukota musuh sebelum bala bantuan tiba.',
        warning: 'Divisi yang melakukan Force Attack tidak bisa mundur dan akan mengalami keausan peralatan (equipment loss) yang sangat parah.',
        tags: ['Force Attack', 'Ofensif']
      },
      {
        heading: 'Kemampuan "Last Stand"',
        description: 'Memberikan bonus defense masif dan divisi tidak akan mundur walau diserang dari 5 arah sekaligus. Gunakan pada divisi penjaga pulau terpencil atau benteng pertahanan vital.',
        tags: ['Last Stand', 'Defensif']
      }
    ],
    summaryTips: [
      'Gunakan "Staff Office Work" pada Field Marshal untuk mempercepat perolehan Planning Bonus hingga dua kali lipat lebih cepat.',
      'Jangan biarkan Command Power mengendap di angka 100 tanpa dimanfaatkan.'
    ]
  },
  {
    id: 'g-extra-30',
    level: 'ahli',
    title: 'Etiket & Aturan Standar Multiplayer (MP Rules)',
    subtitle: 'Larangan Space Marines, pembatasan kapal selam, dan diplomasi antar pemain manusia.',
    iconName: 'Users',
    category: 'Intelijen & Politik',
    readTimeMinutes: 5,
    overview: 'Bermain HOI4 di komunitas multiplayer sangat berbeda dengan melawan AI. Hampir semua server memiliki aturan resmi (Ruleset) untuk menjaga keseimbangan permainan.',
    keyPoints: [
      {
        heading: 'Larangan "Space Marines"',
        description: 'Space Marines adalah taktik memasukkan satu batalion Tank Berat ke dalam divisi infanteri biasa untuk memberikan armor tinggi ke seluruh divisi tanpa biaya mahal. Ini dilarang di hampir 95% server MP karena dianggap exploit mekanik.',
        tags: ['MP Rules', 'Space Marines Ban']
      },
      {
        heading: 'Pembatasan Kapal Selam & Strategi Pembom',
        description: 'Sebagian besar server melarang produksi massal Submarine III/IV dengan Snorkel atau pembom strategis berlebihan sebelum tahun 1941 untuk mencegah kehancuran industri dini yang membosankan.',
        tags: ['Keseimbangan MP', 'Batasan']
      }
    ],
    summaryTips: [
      'Di multiplayer, koordinasi udara (Air Superiority) dan suplai adalah kunci nomor satu; pemain yang kalah di udara hampir pasti kalah di darat.',
      'Selalu berkomunikasi aktif dengan anggota faksi Anda lewat voice chat saat melancarkan operasi ofensif besar.'
    ]
  }
];
