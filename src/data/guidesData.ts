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
    readTimeMinutes: 3,
    relatedCommand: 'pp 1000',
    overview: 'Hearts of Iron IV adalah grand strategy real-time yang didesain untuk dimainkan dengan sering melakukan PAUSE (jeda). Mengendalikan waktu adalah kunci agar tidak panik saat perang dunia meletus.',
    keyPoints: [
      {
        heading: 'Kunci Tombol Spasi (Spacebar) & Kontrol Kecepatan',
        description: 'Gunakan kecepatan 4 atau 5 saat fase damai (1936-1939) membangun industri, lalu segera turunkan ke kecepatan 2 atau 3 saat pertempuran aktif dimulai. Selalu tekan Spacebar untuk jeda setiap kali mengambil keputusan penting.',
        proTip: 'Gunakan tombol shortcut keypad + dan - untuk menaikkan/menurunkan kecepatan tanpa menggeser kursor mouse.',
        tags: ['Dasar UI', 'Kontrol Waktu'],
        steps: [
          'Tekan Spasi untuk menjeda (Pause) permainan setiap ada notifikasi baru.',
          'Gunakan Speed 4-5 saat fase damai 1936-1938 untuk mempercepat konstruksi.',
          'Turunkan ke Speed 2-3 begitu operasi militer aktif atau perang diumumkan.'
        ]
      },
      {
        heading: 'Membaca Bilah Status Atas (Top Bar)',
        description: 'Top bar menunjukkan sumber daya vital negaramu: Political Power (PP), Stabilitas, War Support, Manpower, Pabrik (Civs/Mils/Dockyards), Bahan Bakar (Fuel), serta Logistik Defisit.',
        warning: 'Jika persediaan Bahan Bakar (Fuel) habis (0 hari tersisa), semua tank, truk suplai, pesawat terbang, dan kapal perang akan lumpuh dan kehilangan 90% efektivitas tempurnya.',
        tags: ['Indikator', 'Sumber Daya']
      },
      {
        heading: 'Tingkat Ketegangan Dunia (World Tension)',
        description: 'Bola dunia di pojok kanan atas menunjukkan persentase World Tension. Angka ini naik saat negara fasis menyerang/mencaplok wilayah. Negara demokratis terikat aturan: mereka tidak bisa menjamin kemerdekaan negara lain sebelum World Tension mencapai batas tertentu (misal 25% batas jaminan Inggris).',
        tags: ['Geopolitik', 'World Tension']
      }
    ],
    summaryTips: [
      'Jangan pernah membiarkan waktu berjalan di Speed 5 saat tentaramu sedang bertempur aktif.',
      'Periksa notifikasi pop-up merah di bilah atas; pop-up merah menandakan pabrik menganggur, divisi tidak terlatih, atau slot riset kosong.'
    ]
  },
  {
    id: 'g-pemula-2',
    level: 'pemula',
    title: 'Manajemen Pabrik: Sipil, Militer & Galangan',
    subtitle: 'Pahami rasio pembangunan Pabrik Sipil (Civs) vs Militer (Mils) dan Consumer Goods.',
    iconName: 'Factory',
    category: 'Ekonomi & Industri',
    readTimeMinutes: 4,
    relatedCommand: 'ic',
    overview: 'Kekuatan sebuah negara di HOI4 ditentukan oleh basis industrinya. Tanpa pabrik sipil yang cukup di awal, kamu tidak akan bisa memproduksi ribuan senapan, artileri, dan tank saat 1939 tiba.',
    keyPoints: [
      {
        heading: 'Aturan Emas 1936-1938: Bangun Pabrik Sipil (Civs) Terlebih Dahulu',
        description: 'Pabrik Sipil (warna oranye) digunakan untuk membangun pabrik lain, infrastruktur, radar, dan mengimpor sumber daya. Selama tahun 1936 hingga akhir 1937 atau pertengahan 1938, fokuslah 80-100% membangun Pabrik Sipil.',
        proTip: 'Semakin tinggi infrastruktur di suatu provinsi (maks level 5), semakin cepat pembangunan pabrik di provinsi tersebut berkat bonus efisiensi konstruksi hingga +100%.',
        tags: ['Konstruksi', 'Civs']
      },
      {
        heading: 'Peralihan ke Pabrik Militer (Mils) Menjelang Perang',
        description: 'Mulai akhir 1938 atau 1939, alihkan semua antrean konstruksi ke Pabrik Militer (warna hijau). Pabrik militer langsung memproduksi senjata, artileri, tank, dan pesawat.',
        tags: ['Peralatan', 'Mils']
      },
      {
        heading: 'Memahami Pajak Consumer Goods (Barang Konsumsi)',
        description: 'Sebagian pabrik sipilmu akan disita oleh populasi untuk kebutuhan sipil. Persentase ini ditentukan oleh Hukum Ekonomi (Economic Law). Di bawah Civilian Economy, hingga 35-40% pabrik terkunci, sedangkan di War Economy hanya 15-20%, dan Total Mobilization hanya 10%.',
        warning: 'Ubah Hukum Ekonomimu ke Early Mobilization -> Partial Mobilization -> War Economy sesegera mungkin menggunakan Political Power saat syarat terpenuhi.',
        tags: ['Hukum Ekonomi', 'Consumer Goods']
      }
    ],
    summaryTips: [
      'Jangan buru-buru membangun Pabrik Militer di Januari 1936; ini membatasi kapasitas pertumbuhan industrimu di masa depan.',
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
    readTimeMinutes: 3,
    relatedCommand: 'st 100',
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
        warning: 'Jangan pernah memilih All Adults Serve atau Scraping the Barrel kecuali kamu berada di ambang kehancuran total karena penalti pabriknya sangat masif (-30% hingga -40%).',
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
    readTimeMinutes: 4,
    relatedDivisionSearch: '21w',
    overview: 'Menggerakkan puluhan divisi satu per satu dengan klik manual sangat lambat. HOI4 menggunakan sistem Battleplan untuk mengotomatisasi pergerakan garis depan sembari memberikan bonus serangan hingga +30% atau +50% berkat akumulasi planning.',
    keyPoints: [
      {
        heading: 'Hierarki Komando: Divisi -> Jenderal (24 Divisi) -> Marsekal Lapangan (5 Jenderal)',
        description: 'Pilih divisi tempurmu, klik tanda plus hijau di bawah untuk membuat Army di bawah Jenderal (kapasitas 24 divisi). Kemudian kelompokkan tentara ke dalam Army Group di bawah Marsekal Lapangan (Field Marshal) yang menampung hingga 120 divisi.',
        tags: ['Komando', 'Jenderal'],
        steps: [
          'Pilih grup divisi tempur dengan drag mouse atau Shift-klik.',
          'Klik tombol [+] hijau di bawah untuk menunjuk Jenderal berkeahlian cocok.',
          'Pilih Jenderal tersebut dan klik [+] kedua untuk memasukkannya ke bawah Marsekal Lapangan (Field Marshal).'
        ]
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
      'Gunakan Garrison Order untuk menugaskan pasukan murah menjaga pelabuhan dan garis pantai agar tidak terkena invasi amfibi musuh.'
    ]
  },
  {
    id: 'g-pemula-5',
    level: 'pemula',
    title: 'Prioritas Riset Teknologi 1936-1937',
    subtitle: 'Slot riset teknologi sangat berharga: apa saja yang WAJIB diambil terlebih dahulu?',
    iconName: 'Cpu',
    category: 'Ekonomi & Industri',
    readTimeMinutes: 3,
    relatedCommand: 'research_on_icon_click',
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
      'Dispersed Industry vs Concentrated Industry: pilih Dispersed jika kamu sering mengganti lini produksi senjata atau rentan dibom musuh; pilih Concentrated jika industrimu aman di pedalaman.'
    ]
  },
  {
    id: 'g-pemula-6',
    level: 'pemula',
    title: 'Garrison, Resistensi Wilayah Pendudukan & Hukum Kepatuhan',
    subtitle: 'Solusi krisis manpower & senapan bocor: hukum pendudukan dan template garrison terbaik.',
    iconName: 'ShieldAlert',
    category: 'Intelijen & Politik',
    readTimeMinutes: 4,
    relatedDivisionSearch: 'garrison',
    overview: 'Banyak pemain pemula heran mengapa cadangan senapan dan manpower mereka tiba-tiba defisit puluhan ribu padahal tidak sedang berperang. Jawabannya adalah sistem Garrison wilayah taklukan!',
    keyPoints: [
      {
        heading: 'Template Garrison Terbaik: Kavaleri (Kuda) Murni',
        description: 'Kuda memiliki rasio Penekanan (Suppression) tertinggi per biaya senapan (2.0 suppression per batalion). Jangan pernah menggunakan infanteri biasa atau tank berat sebagai garrison karena akan menghabiskan jutaan senapan dan manpower.',
        proTip: 'Buat template divisi khusus berisi 1 batalion Kavaleri (atau 5-25 kavaleri dengan Support Military Police). Buka menu Occupied Territories dan pasang template ini sebagai garrison resmi.',
        tags: ['Garrison', 'Kavaleri', 'Suppression']
      },
      {
        heading: 'Memilih Hukum Pendudukan (Occupation Law)',
        description: 'Secara default gunakan "Local Police Force" atau "Civilian Oversight". Jika resistensi melonjak di atas 50%, ubah sementara ke "Secret Police" atau "Military Governor". Begitu resistensi turun dan kepatuhan (Compliance) mencapai 80%, kamu mendapatkan 75% pabrik dan manpower lokal!',
        warning: 'Hindari hukum "Brutal Oppression" kecuali dalam keadaan darurat karena hukum ini menghancurkan kepatuhan dan memicu kerusakan pabrik akibat sabotase partisan.',
        tags: ['Hukum Pendudukan', 'Kepatuhan']
      },
      {
        heading: 'Peran Support Military Police (MP)',
        description: 'Setelah meriset teknologi Military Police, pasang Support MP pada template garrison yang memiliki banyak batalion kavaleri (misal 50 width kavaleri). MP memberikan bonus persentase suppression ke seluruh batalion di divisinya.',
        tags: ['Military Police', 'Efisiensi']
      }
    ],
    summaryTips: [
      'Selalu pantau tab "Occupied Territories" setelah menaklukkan negara baru.',
      'Gunakan agen spionase di misi "Root Out Resistance" di wilayah bermasalah tinggi.'
    ]
  },
  {
    id: 'g-pemula-7',
    level: 'pemula',
    title: 'Mekanisme Manpower & Rekrutmen Divisi Tanpa Krisis',
    subtitle: 'Cara melatih pasukan efisien, rasio cadangan prajurit, dan rotasi pemulihan divisi.',
    iconName: 'Shield',
    category: 'Militer Darat',
    readTimeMinutes: 3,
    relatedCommand: 'manpower 500000',
    overview: 'Manpower adalah nyawa dari angkatan bersenjata. Kehabisan manpower di tengah perang dunia berarti divisi yang terluka di garis depan tidak akan pernah pulih dan mudah dihancurkan lawan.',
    keyPoints: [
      {
        heading: 'Prioritas Pelatihan: Latih Hingga Level "Trained" Sebelum Deploy',
        description: 'Divisi yang dilatih di antrean rekrutmen akan keluar dengan level "Trained" (100% efektivitas tempur). Jika kamu terpaksa deploy dini (Deploy Green), divisi akan keluar dengan status "Green" (-25% penalti tempur) dan harus dilatih lagi di darat.',
        proTip: 'Gunakan perintah "Exercise" (Shift + K) untuk melatih divisi yang baru keluar ke level Regular (+25% bonus tempur) tanpa menghabiskan manpower baru.',
        tags: ['Pelatihan', 'Trained']
      },
      {
        heading: 'Core vs Non-Core Manpower',
        description: 'Populasi negara asalmu adalah "Core Territory" (memberikan 100% manpower sesuai hukum wajib militer). Wilayah taklukan adalah "Non-Core Territory" dan secara default hanya menyumbang 2% manpower kecuali kamu memiliki kepatuhan (compliance) tinggi.',
        tags: ['Core Populasi', 'Non-Core']
      },
      {
        heading: 'Field Hospital: Solusi Penyelamat Manpower Negara Kecil',
        description: 'Jika negaramu kekurangan manpower (seperti Finlandia, Swedia, atau Kanada), sertakan Support Field Hospital di template divisi. Support ini mengembalikan hingga 20-40% korban perang kembali ke cadangan manpower negaramu!',
        tags: ['Field Hospital', 'Rasio Korban']
      }
    ],
    summaryTips: [
      'Jangan biarkan divisi terus berlatih militer saat persediaan bahan bakar (Fuel) atau senapan sedang minus.',
      'Naikkan hukum wajib militer satu tingkat lebih awal sebelum manpower menyentuh angka 0.'
    ]
  },
  {
    id: 'g-pemula-8',
    level: 'pemula',
    title: 'Rantai Komando Marsekal & Trait Jenderal Terbaik',
    subtitle: 'Maksimalkan batas komando, grinding trait Jenderal, dan alokasi Command Power (CP).',
    iconName: 'Landmark',
    category: 'Militer Darat',
    readTimeMinutes: 4,
    relatedDivisionSearch: 'infanteri',
    overview: 'Jenderal yang berpengalaman dengan kumpulan trait spesialis dapat memberikan bonus serangan dan pertahanan hingga +40%, membalikkan keadaan dalam pertempuran yang tampaknya mustahil.',
    keyPoints: [
      {
        heading: 'Mekanisme Warisan Trait Marsekal Lapangan (Field Marshal)',
        description: 'Field Marshal memimpin hingga 5 Jenderal (120 divisi). Trait yang dimiliki oleh Field Marshal akan diturunkan sebesar 50% efektivitasnya ke SELURUH 120 divisi di bawah komandonya!',
        proTip: 'Field Marshal terbaik adalah yang memiliki trait "Logistics Wizard" (mengurangi konsumsi suplai 120 divisi hingga 15%) dan "Offensive Doctrine" (-1 lebar tempur per divisi).',
        tags: ['Field Marshal', 'Logistics Wizard']
      },
      {
        heading: 'Trait Jenderal Terpenting untuk Di-Grind',
        description: 'Untuk Jenderal Tank: grind trait "Panzer Leader" hingga naik menjadi "Panzer Expert" (+10% Armor Attack). Untuk Jenderal Infanteri: grind "Infantry Leader" -> "Infantry Expert" (+10% Defense & Soft Attack).',
        tags: ['Panzer Expert', 'Infantry Expert']
      },
      {
        heading: 'Penggunaan Command Power (CP) di Medan Tempur',
        description: 'Gunakan kemampuan aktif Jenderal seperti "Staff Office Plan" (mempercepat planning 400%), "Force Attack" (menyerang tanpa memedulikan organisasi, tidak bisa dipukul mundur), atau "Last Stand" (mempertahankan kota/pelabuhan tanpa mundur meski organisasi habis).',
        warning: 'Force Attack dan Last Stand menyebabkan divisi kehilangan HP dan peralatan dalam jumlah sangat besar; jangan gunakan jika stockpile senjatamu tipis.',
        tags: ['Force Attack', 'Last Stand']
      }
    ],
    summaryTips: [
      'Tugaskan tentara sukarelawan (Volunteers) ke Perang Saudara Spanyol atau Tiongkok di 1936-1937 untuk grinding level Jenderal dan Army XP gratis.',
      'Jangan promosikan Jenderal berpengalaman menjadi Field Marshal tanpa perhitungan, karena mereka akan kehilangan status skill level saat promosi.'
    ]
  },
  {
    id: 'g-pemula-9',
    level: 'pemula',
    title: 'Navigasi Peta Suplai (F4) & Indikator Bahaya Logistik',
    subtitle: 'Cara membaca peti cokelat, kuning, dan tengkorak merah sebelum tentaramu mati kelaparan.',
    iconName: 'Truck',
    category: 'Logistik & Suplai',
    readTimeMinutes: 4,
    relatedCommand: 'ale 5000',
    overview: 'Banyak komandan pemula heran mengapa 40 divisinya kalah melawan 10 divisi musuh. Di HOI4, tentara yang lapar kehilangan 90% daya serang dan organisasi. Mengetahui cara membaca peta suplai F4 adalah keterampilan bertahan hidup paling mendasar.',
    keyPoints: [
      {
        heading: 'Arti Warna Indikator Suplai di Atas Kepala Divisi',
        description: 'Peti Cokelat: Suplai 100% penuh, divisi bertempur optimal. Peti Kuning: Suplai mulai menipis (cadangan lokal habis, efektivitas turun 20-40%). Peti Tengkorak Merah: KELAPARAN TOTAL. Divisi kehilangan organisasi, tidak bisa memulihkan HP, dan senapan meledak sendiri akibat attrition!',
        tags: ['Peta Suplai', 'Indikator Peti']
      },
      {
        heading: 'Tiga Tindakan Penyelamatan Darurat Saat Muncul Peti Merah',
        description: 'Langkah 1: Jangan menambah divisi baru ke provinsi tersebut; segera tarik 30-50% divisi keluar ke provinsi tetangga yang berwarna hijau. Langkah 2: Klik Jenderal, ubah motorisasi suplai dari Kuda menjadi Truk Bermotor Ganda. Langkah 3: Klik Supply Hub terdekat dan hubungkan rel kereta api langsung ke ibukota.',
        proTip: 'Satu Supply Hub rata-rata hanya mampu menampung 15-25 divisi. Menumpuk 60 divisi di satu kota kecil di Polandia atau Tiongkok adalah vonis mati logistik.',
        tags: ['Penyelamatan Suplai', 'Evakuasi']
      },
      {
        heading: 'Kapasitas Truk dan Lokomotif Kereta Api',
        description: 'Memiliki rel kereta api saja tidak cukup jika negaramu kehabisan Kereta Api (Trains) atau Truk (Trucks) di stockpile logistik. Selalu alokasikan minimal 2 pabrik militer untuk memproduksi Kereta Api standar dan 3 pabrik untuk Truk sejak tahun 1936.',
        warning: 'Jika pembom taktis musuh menghancurkan kereta apimu hingga defisit, seluruh jaringan rel di negaramu akan macet total.',
        tags: ['Kereta Api', 'Truk Logistik']
      }
    ],
    summaryTips: [
      'Buka mode peta F4 setiap kali kamu hendak memindahkan pasukan dalam jumlah besar.',
      'Jika menyerang ke wilayah pulau atau seberang laut, tingkatkan level Pelabuhan (Naval Base) hingga level 8-10 agar kapasitas muat suplai dari konvoi mencukupi.'
    ]
  },
  {
    id: 'g-pemula-10',
    level: 'pemula',
    title: 'Bumi Hangus (Scorched Earth) & Garis Mundur Darurat (Fallback Line)',
    subtitle: 'Cara mundur teratur saat perbatasan jebol, jebakan suplai musuh, dan perintah Fallback Line.',
    iconName: 'Flame',
    category: 'Militer Darat',
    readTimeMinutes: 4,
    relatedDivisionSearch: 'infanteri',
    overview: 'Ketika pertahanan garis depanmu ditembus oleh tank berat musuh yang tak terhentikan, memaksa bertahan di tempat hanya akan menghabiskan seluruh divisimu. Taktik mundur strategis dengan Bumi Hangus akan mengubah kemenangan musuh menjadi mimpi buruk logistik.',
    keyPoints: [
      {
        heading: 'Membuat Fallback Line di Belakang Sungai Besar',
        description: 'Pilih Army-mu, klik ikon garis pertahanan cadangan (Fallback Line, shortcut C), lalu tarik garis di sepanjang tepian sungai besar (seperti Sungai Dnieper di Ukraina atau Sungai Seine di Prancis). Divisimu akan mundur teratur dan membentuk garis benteng baru.',
        tags: ['Fallback Line', 'Garis Mundur'],
        steps: [
          'Pilih seluruh grup divisi yang berada di bawah tekanan musuh.',
          'Tekan tombol Fallback Line (Shortcut C) pada toolbar jenderal.',
          'Gambar garis tepat di belakang rintangan sungai atau deretan pegunungan.',
          'Biarkan 2-3 divisi menjaga gerakan mundur (Rearguard) agar pasukan utama tidak terkena overrun.'
        ]
      },
      {
        heading: 'Eksekusi Bumi Hangus (Scorched Earth) pada Rel dan Hub',
        description: 'Buka state provinsi yang hendak kamu tinggalkan. Klik tombol api "Scorched Earth" (membutuhkan 5 Command Power per state). Seluruh rel kereta api dan supply hub di wilayah tersebut akan dihancurkan seketika sebelum musuh masuk!',
        proTip: 'Ketika musuh merangsek masuk ke wilayah yang terkena bumi hangus, tank dan infanteri mereka akan langsung kelaparan (100% supply penalty) dan kehilangan seluruh organisasi mereka di depan garis Fallback Line-mu.',
        tags: ['Bumi Hangus', 'Scorched Earth']
      },
      {
        heading: 'Penalti Menyeberangi Sungai Bagi Penyerang',
        description: 'Menyerang melintasi sungai memberikan penalti serangan hingga -30% hingga -60% untuk musuh. Menggabungkan Fallback Line di seberang sungai dengan Support Engineer di divisimu membuat garis pertahanan baru ini hampir mustahil ditembus.',
        tags: ['River Crossing', 'Pertahanan Sungai']
      }
    ],
    summaryTips: [
      'Jangan aktifkan Scorched Earth di tanah air inti yang tidak berniat kamu lepaskan dalam waktu dekat.',
      'Begitu musuh kehabisan suplai dan terhenti di depan sungaimu, segera lancarkan serangan balik dengan divisi tank segar.'
    ]
  },
  {
    id: 'g-pemula-11',
    level: 'pemula',
    title: 'Pelatihan Tentara (Army Drill) & Pengumpulan Army XP Gratis',
    subtitle: 'Trik melatih divisi hingga Regular (+25% tempur) tanpa kehabisan stok senjata.',
    iconName: 'Award',
    category: 'Militer Darat',
    readTimeMinutes: 4,
    relatedCommand: 'xp 500',
    overview: 'Divisi yang baru selesai direkrut berstatus Green atau Trained dengan penalti tempur -25%. Melatih mereka melalui tombol Shift + Exercise meningkatkan status mereka menjadi Regular (+25% Combat Modifier) sekaligus menghasilkan pundi-pundi Army Experience (XP) untuk merombak template.',
    keyPoints: [
      {
        heading: 'Shortcut Shift + Exercise (Otomatis Berhenti Saat Bintang Penuh)',
        description: 'Jika menekan tombol Exercise biasa (ikon roda gerigi), divisimu akan terus berlatih tanpa henti dan terus membuang peralatan karena kecelakaan latihan. Tekan Shift + Klik pada ikon Exercise! Divisi akan otomatis berhenti berlatih begitu mencapai level 3 (Regular).',
        proTip: 'Melatih divisi menaikkan stat tempur sebesar 50% relatif (dari -25% penalti Green menjadi +25% bonus Regular).',
        tags: ['Shift Exercise', 'Level Pengalaman', 'Regular']
      },
      {
        heading: 'Trik Divisi Tunggal untuk Farming Army XP di Tahun 1936',
        description: 'Kecepatan perolehan Army XP dari latihan dihitung dari persentase divisi yang berlatih dibanding total seluruh divisimu. Jika kamu menghapus semua divisi kecuali 1 divisi kavaleri/tank besar lalu melatihnya, kamu mendapatkan laju Army XP maksimal dengan konsumsi bahan bakar dan kerugian senjata yang sangat minim!',
        tags: ['One Division Exploit', 'Farming Army XP']
      },
      {
        heading: 'Mencegah Kerusakan Senjata Berlebih Saat Latihan',
        description: 'Latihan menyebabkan Attrition 5-6%. Pastikan kamu memiliki surplus senapan dan artileri di stockpile logistik sebelum menyalakan latihan seluruh tentara.',
        warning: 'Hentikan segera semua latihan divisi 1 bulan sebelum perang dimulai agar cadangan senapanmu kembali terisi penuh.',
        tags: ['Stockpile Senjata', 'Atrisi Latihan']
      }
    ],
    summaryTips: [
      'Kirim Military Attache ke negara yang sedang berperang (seperti Nasionalis Spanyol atau Tiongkok) dengan 100 PP untuk mendapatkan aliran Army XP pasif setiap hari.',
      'Gunakan Army XP awal untuk memasukkan Support Artillery dan Support Engineer ke divisi infanteri utama.'
    ]
  },
  {
    id: 'g-pemula-12',
    level: 'pemula',
    title: 'Perang Saudara Spanyol: Ladang XP & Uji Tempur Sukarelawan',
    subtitle: 'Panduan mengirim 2 divisi tank sukarelawan (Volunteers) dan air volunteers pada Juli 1936.',
    iconName: 'Globe',
    category: 'Intelijen & Politik',
    readTimeMinutes: 4,
    relatedCommand: 'allowdiplo',
    overview: 'Perang Saudara Spanyol yang meletus pada Juli 1936 adalah laboratorium perang terbaik di HOI4. Mengirim divisi sukarelawan (Volunteers) memungkinkanmu mengasah jenderal, mengumpulkan ratusan Army & Air XP, dan mengarahkan hasil perang tanpa memicu Perang Dunia II.',
    keyPoints: [
      {
        heading: 'Syarat & Cara Mengirimkan Pasukan Sukarelawan (Send Volunteers)',
        description: 'Klik kanan pada faksi yang ingin kamu dukung (Spanyol Nasionalis / Republik). Pilih "Send Volunteers". Jumlah divisi yang bisa dikirim bergantung pada total divisi yang kamu miliki di tanah air (biasanya 2-6 divisi). Tambahkan juga "Send Air Volunteers" untuk mengirim 100-200 pesawat CAS dan Fighter.',
        tags: ['Send Volunteers', 'Spanyol 1936']
      },
      {
        heading: 'Kirim Divisi Tank Berkualitas, Bukan Infanteri Biasa',
        description: 'Karena slot sukarelawan sangat terbatas, JANGAN kirim infanteri lambat. Kirim 2 divisi Light Tank atau Motorized dengan jenderal terbaikmu (seperti Guderian atau Rommel). Karena Spanyol memiliki debuff medan "Unplanned Offensive" (-90% serang), gunakan tankmu untuk memotong garis suplai musuh dan melancarkan pengepungan (Encirclement) di Madrid atau Barcelona!',
        proTip: 'Jangan terburu-buru memenangkan perang Spanyol dalam sebulan; pertahankan perang berlarut-larut hingga akhir 1937 agar kamu terus memanen XP setiap hari.',
        tags: ['Taktik Sukarelawan', 'Grinding Jenderal']
      },
      {
        heading: 'Pemanenan Air XP dari Langit Spanyol',
        description: 'Tempatkan 1 wing pesawat CAS dan 1 wing Fighter di pangkalan udara Valladolid atau Madrid. Kamu akan meraup hingga 200+ Air XP yang sangat berharga untuk mendesain pesawat tempur Fighter 1940 yang tak terkalahkan sebelum 1939.',
        tags: ['Air XP', 'Air Volunteers']
      }
    ],
    summaryTips: [
      'Pastikan pelabuhan tujuan sukarelawan tidak terblokade sebelum konvoi divisi berlayar.',
      'Begitu perang saudara usai, tarik pasukanmu pulang dan gunakan trait jenderal yang baru didapat untuk melatih divisi reguler.'
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
    readTimeMinutes: 5,
    relatedCommand: 'ale 5000',
    overview: 'Penyebab nomor satu kekalahan pemain di Rusia, Afrika, atau pedalaman Tiongkok adalah KELAPARAN LOGISTIK (Attrition). Divisi tanpa suplai kehilangan organisasi, senjata hancur sendiri, dan mudah dihancurkan meski jumlah pasukannya lebih banyak.',
    keyPoints: [
      {
        heading: 'Bagaimana Suplai Mengalir di Peta',
        description: 'Suplai mengalir dari Ibu Kota -> Jaringan Rel Kereta Api (Railways) -> Supply Hub atau Pelabuhan Laut -> Divisi Tempur di medan laga. Jika rel kereta terputus atau tidak terhubung ke ibukota, Supply Hub akan mati total.',
        tags: ['Supply Hub', 'Railways'],
        steps: [
          'Buka mode peta Supply (tekan F4) untuk melihat garis pasokan ungu dan merah.',
          'Identifikasi provinsi Supply Hub terdekat dengan garis depan.',
          'Pastikan ada rel kereta yang tidak putus menghubungkan hub tersebut langsung ke ibukotamu.'
        ]
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
    readTimeMinutes: 4,
    relatedDivisionSearch: '21w',
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
      'Tambahkan Reconnaissance company untuk membantu jenderalamu memilih taktik counter terbaik di medan laga.'
    ]
  },
  {
    id: 'g-menengah-3',
    level: 'menengah',
    title: 'Superioritas Udara & Close Air Support (CAS)',
    subtitle: 'Mengapa "Green Air" memenangkan perang dan bagaimana merancang pesawat pengebom mematikan.',
    iconName: 'Plane',
    category: 'Udara & CAS',
    readTimeMinutes: 5,
    relatedDivisionSearch: 'anti-air',
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
        tags: ['Airframe', 'Desain Pesawat'],
        steps: [
          'Riset 1936 atau 1940 Small Airframe.',
          'Pasang 2x atau 3x 4x Heavy Machine Guns di modul senjata.',
          'Pilih Engine level tertinggi yang tersedia.',
          'Tambahkan Drop Tanks untuk memastikan jangkauan mencakup seluruh zona udara operasi.'
        ]
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
    readTimeMinutes: 5,
    relatedDivisionSearch: 'armor',
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
    readTimeMinutes: 4,
    relatedDivisionSearch: 'doktrin',
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
  {
    id: 'g-menengah-6',
    level: 'menengah',
    title: 'Ship Designer & Meta Armada Laut Modern (Man the Guns)',
    subtitle: 'Rancang Destroyer Anti-Submarine, Light Cruiser penyapu tirai, dan konfigurasi torpedo.',
    iconName: 'Anchor',
    category: 'Angkatan Laut',
    readTimeMinutes: 5,
    relatedCommand: 'it',
    overview: 'Merancang kapal perang di DLC Man the Guns sangat intuitif jika kamu mengetahui peran tiap kelas: Destroyer memburu kapal selam, Light Cruiser membersihkan tirai musuh, dan Heavy Ships menenggelamkan induk armada lawan.',
    keyPoints: [
      {
        heading: 'Desain Destroyer (DD) Anti-Kapal Selam Spesialis',
        description: 'Chassis 1936/1940 Destroyer -> Pasang Sonar 2 di modul khusus -> Pasang Depth Charge Mortar ganda di belakang -> Mesin Engine II. Kapal ini murah diproduksi massal dan akan melenyapkan kapal selam musuh yang berusaha menyergap konvoi.',
        proTip: 'Buat varian Destroyer kedua yang fokus hanya pada Torpedo Tubes ganda untuk armada serbu malam (Night Torpedo Strike).',
        tags: ['Destroyer', 'Sonar', 'Depth Charge']
      },
      {
        heading: 'Light Cruiser (CL) Screen Killer: Inti Kemenangan Laut',
        description: 'Gunakan Cruiser Chassis -> Isi semua slot menengah dengan Light Cruiser Medium Battery -> Pasang modul Catapult Airplane -> Radar laut terbaik -> Armor level 1 atau 2. Kapal ini memiliki Light Attack luar biasa yang membantai destroyer lawan dalam hitungan menit.',
        tags: ['Screen Killer', 'Light Attack']
      },
      {
        heading: 'Pentingnya Menyesuaikan Armada Patrol vs Strike Force',
        description: 'Bagi angkatan lautmu: 1) Grup Patroli kecil (1-2 Light Cruiser ber-catapult plane + 4 DD) yang diatur ke "Do Not Engage" untuk mendeteksi armada musuh, dan 2) Main Strike Force besar (Battleship, Carrier, dan puluhan DD pengawal) yang siaga di pelabuhan untuk menyerbu saat target terdeteksi.',
        tags: ['Patrol', 'Strike Force']
      }
    ],
    summaryTips: [
      'Jangan tempatkan seluruh armada tempurmu di laut setiap hari karena akan menguras jutaan barel bahan bakar (Fuel).',
      'Pasang Anti-Air level 2 pada semua kapal tempur besar untuk menghalau serangan pesawat Naval Bomber musuh.'
    ]
  },
  {
    id: 'g-menengah-7',
    level: 'menengah',
    title: 'Varian Batalion Khusus: SPG, Tank Destroyer & Anti-Air Bermotor',
    subtitle: 'Kapan menyematkan Medium Tank Destroyer (TD), Artileri Bermotor (SPG), dan SPAA.',
    iconName: 'Crosshair',
    category: 'Militer Darat',
    readTimeMinutes: 4,
    relatedDivisionSearch: 'armor',
    overview: 'Mengubah chassis tank menjadi varian spesialis (Tank Destroyer, Artileri Swagerak SPG, atau SPAA) memberikan statistik ekstrem dengan biaya industri yang jauh lebih hemat dibanding tank standar.',
    keyPoints: [
      {
        heading: 'Tank Destroyer (TD): Pembunuh Tank Lawan',
        description: 'Jika kamu menghadapi negara ber-tank tebal (seperti tank berat Jerman atau tank T-34 Soviet), pasang meriam High Velocity Anti-Tank Cannon pada chassis Medium Tank dan ubah tipenya menjadi Tank Destroyer. Satu batalion TD memberikan Hard Attack dan Piercing astronomis.',
        proTip: 'Cukup masukkan 1 atau 2 batalion Tank Destroyer ke dalam divisi lapis bajamu untuk melipatgandakan Piercing divisi tanpa merusak combat width.',
        tags: ['Tank Destroyer', 'Piercing', 'Hard Attack']
      },
      {
        heading: 'Self-Propelled Artillery (SPG): Pemusnah Infanteri Berbenteng',
        description: 'Ubah chassis Medium atau Light Tank dengan memasang Artileri Howitzer besar dan pilih peran SPG. SPG memakan 3 combat width per batalion tetapi memberikan Soft Attack 2x lebih besar daripada batalion tank biasa.',
        tags: ['SPG', 'Artileri Swagerak']
      },
      {
        heading: 'Self-Propelled Anti-Air (SPAA): Mengamankan Koridor Lapis Baja',
        description: 'Jika kamu tidak memiliki dominasi udara penuh, sematkan 1 batalion Anti-Air Bermotor pada divisi tankmu. Ini melindungi tank berhargamu dari pemboman CAS musuh hingga 75%!',
        tags: ['SPAA', 'Anti-Air']
      }
    ],
    summaryTips: [
      'Pastikan kecepatan varian SPG atau TD sama dengan kecepatan tank utama dan motorized infantry pengawalnya.',
      'Konversi tank lama yang ada di gudang menjadi SPG atau TD melalui opsi "Convert from Stockpile" di pabrik militer untuk menghemat 60% biaya produksi.'
    ]
  },
  {
    id: 'g-menengah-8',
    level: 'menengah',
    title: 'Operasi Reaktor Nuklir & Supremasi Bom Atom',
    subtitle: 'Prasyarat teknologi nuklir, pembangunan reaktor, dan syarat eksekusi drop bom atom.',
    iconName: 'Flame',
    category: 'Udara & CAS',
    readTimeMinutes: 4,
    relatedCommand: 'nuke 10',
    overview: 'Bom Atom bukan sekadar senjata akhir permainan; bom atom adalah instrumen pamungkas untuk menjebol kebuntuan garis depan super kuat, melumpuhkan benteng pesisir, dan memaksa negara musuh menyerah seketika.',
    keyPoints: [
      {
        heading: 'Pohon Riset Teknologi Nuklir (1940-1945)',
        description: 'Riset Atomic Research -> Nuclear Reactor -> Heavy Water Extraction -> Manhattan Project. Setelah teknologi Nuclear Bomb selesai, kamu harus membangun fasilitas Nuclear Reactor di provinsimu. Setiap reaktor memproduksi persentase bom atom per tahun.',
        tags: ['Riset Nuklir', 'Reaktor'],
        steps: [
          'Selesaikan riset Atomic Research di tab Industri/Engineering.',
          'Bangun minimal 2-4 Nuclear Reactor di provinsi dengan infrastruktur tinggi.',
          'Selesaikan riset "Nuclear Bomb" untuk mulai mengisi persediaan hulu ledak.'
        ]
      },
      {
        heading: 'Syarat Mutlak Menjatuhkan Bom Atom di Medan Tempur',
        description: 'Untuk menjatuhkan nuke, kamu membutuhkan: 1) Minimal 1 bom atom di stockpile, 2) Pesawat Strategic Bomber yang bertugas di zona udara target, dan 3) Minimal 75% Superioritas Udara (Green Air) di atas zona tersebut.',
        warning: 'Tanpa 75% air superiority, tombol drop nuke di provinsi musuh tidak akan bisa ditekan.',
        tags: ['Strategic Bomber', 'Air Superiority']
      },
      {
        heading: 'Dampak Penghancuran Nuke',
        description: 'Menjatuhkan nuke pada provinsi pertempuran akan: memusnahkan organisasi semua divisi musuh menjadi 0, menghancurkan seluruh benteng beton (Forts), memutus rel dan Supply Hub, serta memotong War Support negara musuh sebesar 5-10%!',
        proTip: 'Segera serbu provinsi tersebut dengan tank atau kavaleri kilat beberapa detik setelah nuke meledak sebelum musuh sempat pulih.',
        tags: ['Dampak Nuke', 'Penembusan Instan']
      }
    ],
    summaryTips: [
      'Gunakan nuke untuk mematikan pelabuhan utama musuh sehingga armada laut mereka kehilangan pangkalan reparasi.',
      'Dua kali nuke di wilayah Jepang saat mereka tidak lagi memiliki angkatan laut akan memicu event kapitulasi instan Jepang.'
    ]
  },
  {
    id: 'g-menengah-9',
    level: 'menengah',
    title: 'Mastery Mengatasi Attrition Semua Negara & Medan Ekstrem',
    subtitle: 'Solusi tuntas kelaparan suplai di lumpur Rusia, gurun Afrika, rimba tropis, dan salju abadi.',
    iconName: 'Truck',
    category: 'Logistik & Suplai',
    readTimeMinutes: 5,
    relatedDivisionSearch: 'logistik',
    overview: 'Attrition (Atrisi) adalah pembunuh tentara nomor satu di HOI4 yang memusnahkan tank dan senapan tanpa musuh melepaskan satu peluru pun. Memahami rumus mekanis atrisi dan trik penanganannya memungkinkan negara mana pun melancarkan invasi ke gurun Sahara hingga ke pedalaman Siberia tanpa kehilangan efektivitas tempur.',
    keyPoints: [
      {
        heading: 'Rumus Mekanis Kerusakan Attrition & Kunci Reliability',
        description: 'Kerusakan peralatan akibat atrisi dihitung dengan rumus: Kehilangan per jam = Nilai Attrition % × (100% - Keandalan/Reliability) / 2. Jika tank atau senapanmu memiliki Reliability 100%, kerusakan akibat kerusakan medan (mechanical breakdown) mendekati 0! Pasang Support Maintenance Company di divisimu untuk menaikkan Reliability seluruh peralatan hingga +15% sekaligus mencuri 10-20% peralatan musuh.',
        proTip: 'Rancang tank di Tank Designer dengan Reliability minimal 80-90%. Jangan serakah menambah mesin dan armor jika reliability jatuh ke 60% karena tankmu akan meledak sendiri di medan perang.',
        tags: ['Rumus Attrition', 'Reliability', 'Maintenance Company']
      },
      {
        heading: 'Solusi Attrition di Medan Ekstrem (Barbarossa, Afrika, Tropis)',
        description: '1) Musim Dingin Rusia (Deep Winter / Blizzard): Pastikan riset Winter Clothing/Equipment, gunakan Marsekal dengan trait Winter Specialist, dan hentikan ofensif saat musim lumpur (Rasputitsa / Mud) di musim semi. 2) Gurun Afrika Utara (Desert Extreme): Jangan pernah membawa Heavy Tank ke El Alamein atau Sahara; gunakan divisi infanteri 15w-18w atau divisi Light Tank berkecepatan tinggi dengan konsumsi suplai rendah. 3) Rimba Tropis Asia / Amazon: Pasang Support Logistics Company untuk memangkas konsumsi suplai hingga 20-30%.',
        warning: 'Menyerang saat kondisi lumpur (Mud) memberikan penalti kecepatan gerak hingga -50% dan penalti atrisi +70%. Tunggu hingga tanah membeku di musim dingin atau mengering di musim panas!',
        tags: ['Medan Ekstrem', 'Rasputitsa', 'Gurun Afrika', 'Rimba Tropis']
      },
      {
        heading: 'Pilar Penyelamat: Motorisasi 3-Truk, Rel Kereta, & Air Supply',
        description: 'Untuk memastikan suplai mengalir ke daerah terpencil: 1) Klik Army, ubah ikon motorisasi ke "Truk Ganda" (Double Trucks). 2) Sambungkan jalur rel kereta api level 2-3 dari pelabuhan atau ibukota langsung ke Supply Hub terdepan. 3) Manfaatkan armada Transport Planes dengan misi "Air Supply" untuk menjatuhkan logistik dari udara jika pasukanmu terisolasi atau berada di luar jangkauan hub darat.',
        tags: ['Air Supply', 'Motorisasi Suplai', 'Transport Planes'],
        steps: [
          'Tekan F4 untuk memeriksa jangkauan radius Supply Hub terdekat.',
          'Ubah prioritas motorisasi hub dari Kuda (Horse) menjadi Truk (Motorized) untuk melipatgandakan jangkauan kilometer suplai.',
          'Sertakan Support Logistics Company di template divisi yang beroperasi di wilayah minus infrastruktur.',
          'Tugaskan 50-100 Transport Planes dengan misi Air Supply di zona udara pertempuran untuk pasokan darurat.'
        ]
      }
    ],
    summaryTips: [
      'Buka mode peta laut (F2) dan klik kanan zona laut rawan untuk memilih "Red/Block Access" agar kapal konvoi suplaimu tidak melewati perairan yang dipatroli kapal selam musuh.',
      'Jika menyerang negara kepulauan atau wilayah seberang samudra, pelabuhan (Naval Base) level 10 adalah syarat mutlak untuk menampung suplai 24+ divisi.'
    ]
  },
  {
    id: 'g-menengah-10',
    level: 'menengah',
    title: 'Seni Bertahan Mutlak: Taktik Last Stand & Division Cycling',
    subtitle: 'Cara efektif menahan gempuran fatal, rotasi organisasi manual, dan jebakan parit tak tertembus.',
    iconName: 'ShieldAlert',
    category: 'Militer Darat',
    readTimeMinutes: 5,
    relatedDivisionSearch: 'pertahanan',
    overview: 'Kemampuan Command Power "Last Stand" dan taktik "Division Cycling" adalah dua teknik pertahanan paling sakti di HOI4. Ketika perbatasanmu digempur oleh ratusan divisi tank musuh, kombinasi taktik ini mampu menghentikan serangan lawan di tempat tanpa kehilangan satu jengkal tanah pun.',
    keyPoints: [
      {
        heading: 'Mekanisme & Rahasia Perintah "Last Stand" (Shift + Perisai Merah)',
        description: 'Last Stand (biaya 10-25 Command Power per Jenderal) memberikan efek luar biasa selama 7 hari: 1) Divisi TIDAK BISA DIPUKUL MUNDUR (mereka tidak akan me-retreat meskipun Organisasi turun ke 0), 2) Bonus Entrenchment instan, 3) Kerusakan organisasi yang diterima berkurang drastis. Namun ada konsekuensi fatal: Divisi menerima penalti +100% kerusakan HP dan kehilangan perlengkapan (Equipment Loss)!',
        tags: ['Last Stand', 'Command Power', 'Pertahanan Ekstrem']
      },
      {
        heading: 'Kapan WAJIB Digunakan vs Kapan DILARANG KERAS Digunakan',
        description: 'WAJIB DIGUNAKAN: 1) Menahan Pelabuhan krusial saat musuh melancarkan invasi laut (jika musuh gagal merebut pelabuhan dalam 5 hari, pasukan invasi mereka akan kehabisan suplai dan hancur total!). 2) Menahan kota choke point strategis (Leningrad, Sevastopol, El Alamein, Terusan Suez, Selat Messina) sementara bala bantuan sedang dalam perjalanan. DILARANG KERAS: 1) Di medan terbuka (Plains) tanpa rintangan alam, 2) Saat negaramu sedang defisit senapan/artileri (divisimu akan musnah permanen karena hilangnya seluruh HP), 3) Saat musuh menguasai langit dengan 1.000+ pesawat CAS.',
        warning: 'Jangan aktifkan Last Stand jika kamu tidak memiliki stockpile cadangan senjata yang memadai di gudang logistik.',
        tags: ['Aturan Last Stand', 'Choke Point', 'Pelabuhan']
      },
      {
        heading: 'Teknik "Division Cycling" (Rotasi Manual Divisi Pertahanan)',
        description: 'Division Cycling adalah teknik menahan pertempuran tanpa henti selama berbulan-bulan: Siapkan 2 kelompok divisi di satu provinsi bertahan (misal 3 divisi di baris depan dan 3 divisi di provinsi tepat di belakangnya). Saat 3 divisi depan bertempur dan organisasinya tersisa 20%, gerakkan 3 divisi segar dari belakang masuk ke provinsi tersebut. Begitu divisi segar masuk ke combat queue, tarik 3 divisi yang kelelahan ke belakang untuk istirahat dan memulihkan org!',
        proTip: 'Pasang Support Signal Company di template divisimu. Signal Company meningkatkan Reinforce Rate hingga +20%, memastikan divisi cadanganmu langsung melompat ke garis tempur saat masuk tanpa menunggu berjam-jam.',
        tags: ['Division Cycling', 'Reinforce Rate', 'Signal Company'],
        steps: [
          'Tempatkan 2-3 divisi bertahan di garis parit utama.',
          'Posisikan 2-3 divisi cadangan di provinsi tepat di belakang garis pertahanan.',
          'Pantau jendela pertempuran (gelembung angka pertempuran).',
          'Saat organisasi divisi depan turun ke warna kuning (20-30%), klik divisi cadangan untuk masuk ke pertempuran.',
          'Tarik divisi yang terluka mundur satu langkah ke belakang untuk regenerasi organisasi hingga 100% sebelum dimasukkan kembali.'
        ]
      }
    ],
    summaryTips: [
      'Gabungkan Last Stand dengan doktrin Grand Battleplan dan Support Engineer untuk melipatgandakan nilai parit (Entrenchment) hingga di atas 40 poin.',
      'Membangun Benteng (Forts) cukup hingga level 3 atau 4; jangan bangun Fort level 10 karena AI akan menolak menyerang dan memilih mencari rute memutar.'
    ]
  },
  {
    id: 'g-menengah-11',
    level: 'menengah',
    title: 'Penangkal Dominasi Udara: Meta Support Anti-Air & Flak Darat',
    subtitle: 'Cara negara miskin melumpuhkan ribuan pesawat CAS dan pengebom Sekutu tanpa membuat Fighter.',
    iconName: 'Shield',
    category: 'Udara & CAS',
    readTimeMinutes: 4,
    relatedDivisionSearch: 'anti-air',
    overview: 'Banyak negara kecil atau menengah tidak memiliki ratusan pabrik militer untuk memproduksi ribuan pesawat tempur. Solusi paling hemat dan mematikan untuk meng-counter superioritas udara musuh adalah strategi Anti-Air komprehensif di darat.',
    keyPoints: [
      {
        heading: 'Keajaiban Support Anti-Air (Support AA) di Setiap Divisi',
        description: 'Memasukkan 1 kompi Support Anti-Air (hanya membutuhkan 20-30 pucuk meriam anti-udara dan 1 pabrik militer) memberikan 3 manfaat spektakuler: 1) Memotong kerusakan CAS musuh terhadap organisasimu hingga -75%, 2) Menembak jatuh ratusan pesawat pengebom musuh langsung dari medan darat, 3) Memberikan nilai Piercing yang cukup untuk menembus tank ringan dan medium awal lawan!',
        proTip: 'Jika kamu berperang melawan kekuatan udara raksasa seperti Inggris atau Jerman, Support AA adalah modul paling hemat biaya dalam permainan.',
        tags: ['Support AA', 'Counter CAS', 'Piercing']
      },
      {
        heading: 'Pembangunan Flak Darat (State Anti-Air Level 5)',
        description: 'Bangun instalasi Anti-Air di antrean konstruksi provinsi (State AA). Bangunan ini otomatis menembak jatuh pesawat musuh yang beroperasi di zona udara tersebut dan mengurangi efektivitas misi Strategic Bombing serta Logistical Strike musuh hingga 50-80% tanpa memerlukan bahan bakar (0 Fuel)!',
        tags: ['State AA', 'Flak', 'Pertahanan Statis']
      },
      {
        heading: 'Riset Meriam Anti-Air Towed II & III',
        description: 'Meriam Anti-Air 1940 (Anti-Air II) memiliki stat Air Attack dan Piercing yang meningkat tajam. Pasang senjata ini di lini produksi sebelum musuh membuka pesawat pengebom CAS canggih.',
        warning: 'Pastikan kebutuhan baja (Steel) untuk produksi senjata AA tercukupi agar lini produksimu tidak tersendat.',
        tags: ['Teknologi AA', 'Produksi']
      }
    ],
    summaryTips: [
      'Tambahkan 1 batalion Anti-Air Swagerak (SPAA) pada divisi lapis baja untuk melindungi tank mahalmu dari serangan udara.',
      'Jika kamu terpaksa bertempur di bawah udara merah (Red Air), bergeraklah di malam hari atau di medan hutan lebat untuk mengurangi penalti deteksi CAS.'
    ]
  },
  {
    id: 'g-menengah-12',
    level: 'menengah',
    title: 'Manajemen Cadangan Minyak Global & Logistik Bahan Bakar (Fuel)',
    subtitle: 'Bangun tangki Silo raksasa, kendalikan konsumsi armada laut, dan amankan kilang sintetis.',
    iconName: 'Flame',
    category: 'Logistik & Suplai',
    readTimeMinutes: 4,
    relatedCommand: 'fuel 500000',
    overview: 'Bahan Bakar (Fuel) adalah darah kehidupan perang modern. Tanpa bensin, tank tercanggihmu akan berjalan lebih lambat dari infanteri kaki, kapal tempur raksasa akan menjadi target mengapung tak berdaya, dan pesawat tempur tidak akan bisa lepas landas.',
    keyPoints: [
      {
        heading: 'Dampak Fatal Fuel 0 Hari (Zero Fuel Debuff)',
        description: 'Saat cadangan bahan bakarmu habis: Kecepatan tank berkurang hingga -90%, efektivitas serang dan pertahanan lapis baja turun drastis, pesawat tidak menerima misi, dan armada laut kehilangan kemampuan manuver tempur serta menerima penalti fatal!',
        tags: ['Krisis Fuel', 'Debuff Nol Bensin']
      },
      {
        heading: 'Membangun Tangki Penyimpanan (Fuel Silo) Sebelum 1939',
        description: 'Secara default, kapasitas penampungan minyak suatu negara sangat kecil (biasanya hanya cukup untuk 3-6 bulan perang). Selama tahun 1937-1938, bangun 4-6 Fuel Silo di provinsi yang aman dari pengeboman musuh. Impor minyak mentah dari Venezuela atau Uni Soviet saat damai untuk menimbun 2+ juta barel cadangan strategis!',
        proTip: 'Impor minyak saat masa damai hanya membutuhkan 1 pabrik sipil per 8 unit minyak mentah—sangat murah dibanding harus mengimpor saat perang ketika konvoi dicegat musuh.',
        tags: ['Fuel Silo', 'Cadangan Strategis']
      },
      {
        heading: 'Manajemen Efisiensi: Mematikan Armada dan Latihan saat Damai',
        description: 'Melatih armada laut besar (Fleet Exercise) menguras jutaan liter bensin dalam hitungan minggu. Segera hentikan latihan armada begitu Navy XP yang dibutuhkan terkumpul, dan tempatkan armada di pelabuhan dengan status "Strike Force" (hanya berlayar saat musuh terdeteksi) alih-alih berpatroli terus-menerus.',
        tags: ['Rasionalisasi Bensin', 'Strike Force']
      }
    ],
    summaryTips: [
      'Bangun Synthetic Refineries jika negaramu terisolasi dari jalur laut global untuk memproduksi minyak dan karet sintetis dari batu bara lokal.',
      'Gunakan teknologi Fuel Refining di tab riset industri untuk melipatgandakan output bahan bakar dari setiap barel minyak mentah.'
    ]
  },
  {
    id: 'g-menengah-13',
    level: 'menengah',
    title: 'Perang Tambang Laut (Naval Mines) & Penyergapan Selat Sempit',
    subtitle: 'Ranjau laut murah untuk memusnahkan kapal perang musuh dan menguasai selat strategis.',
    iconName: 'Anchor',
    category: 'Angkatan Laut',
    readTimeMinutes: 4,
    relatedCommand: 'it',
    overview: 'Ranjau laut (Naval Mines) adalah senjata asimetris paling efektif untuk negara dengan angkatan laut kecil. Menabur 1.000 ranjau di selat sempit (Selat Malaka, Laut Baltik, Selat Inggris, Laut Merah) memberikan keunggulan supremasi laut hingga 100% dan penalti mematikan bagi armada musuh.',
    keyPoints: [
      {
        heading: 'Efek Debuff Mengerikan 1.000 Ranjau Laut (Minefield 100%)',
        description: 'Jika suatu zona laut terisi 1.000 ranjau: Kapal musuh menerima penalti kecepatan gerak hingga -80%, peluang terkena ledakan ranjau yang menenggelamkan kapal secara acak, dan memberikan negaramu Supremasi Laut (Naval Superiority) instan hingga +100% tanpa perlu menempatkan satu pun Battleship!',
        proTip: 'Ranjau laut adalah cara tercepat bagi Jerman untuk mendapatkan Naval Superiority di Selat Inggris demi melancarkan invasi amfibi Operation Sea Lion.',
        tags: ['Naval Mines', 'Supremasi Laut', 'Debuff Ranjau']
      },
      {
        heading: 'Konversi Destroyer Murah & Minelaying Submarines',
        description: 'Gunakan lambung kapal selam tier 1 (1936) atau Destroyer tua. Pasang modul "Mine Laying Rails". Biaya produksinya sangat murah (hanya sekitar 300-400 IC). Buat 10-15 unit dan tugaskan misi "Mine Planting" di zona perairan sasaran sejak awal perang.',
        tags: ['Mine Layer', 'Desain Kapal Murah']
      },
      {
        heading: 'Pembersihan Ranjau Musuh (Minesweeping)',
        description: 'Jika perairanmu diranjau oleh musuh, armada dagang dan konvoimu akan karam satu per satu. Pasang modul "Minesweeping Gear" pada Destroyer kelas ringan untuk membersihkan ranjau laut dengan aman.',
        warning: 'Jangan biarkan Battleship mahal berlayar melintasi zona laut merah bertanda bahaya ranjau tanpa dikawal kapal penyapu ranjau.',
        tags: ['Minesweeper', 'Penyapu Ranjau']
      }
    ],
    summaryTips: [
      'Menabur ranjau laut hanya bisa dilakukan saat kondisi perang (War) aktif di perairan internasional atau teritorial lawan.',
      'Satu wing pesawat terbang laut (Naval Bomber) juga dapat dilengkapi modul tebar ranjau udara untuk menabur ranjau secara kilat.'
    ]
  },
  {
    id: 'g-menengah-14',
    level: 'menengah',
    title: 'Spionase Taktis: Kudeta Politik (Coup) & Pencurian Blueprint',
    subtitle: 'Maksimalkan Agency upgrades, jaringan mata-mata 100%, dan sabotase industri lawan.',
    iconName: 'Eye',
    category: 'Intelijen & Politik',
    readTimeMinutes: 5,
    relatedDivisionSearch: 'intel',
    overview: 'DLC La Résistance memperkenalkan sistem Intelligence Agency yang sangat kuat. Melalui 5 agen mata-mata berdedikasi, kamu bisa mencuri teknologi canggih negara musuh, menyabotase pabrik militer mereka dari dalam, atau bahkan memicu perang saudara yang menggulingkan pemerintahan musuh.',
    keyPoints: [
      {
        heading: 'Peningkatan Kunci Intelligence Agency di 1936-1937',
        description: 'Segera dirikan Agency dengan 5 pabrik sipil selama 30 hari. Prioritaskan upgrade berikut: 1) Department of Defense (Anti-Partisan & Counter-Intel), 2) Form Cryptology Department (untuk memecahkan kode radio militer musuh), 3) Invisible Ink & Radio Interception, 4) Commando Training untuk meningkatkan keberhasilan misi berbahaya.',
        proTip: 'Menjadi Spymaster dari suatu faksi (misal Sekutu atau Poros) memberimu bonus +1 agen mata-mata untuk setiap 2 anggota faksi!',
        tags: ['Intelligence Agency', 'Spymaster', 'Upgrade Agency']
      },
      {
        heading: 'Misi Pencurian Cetak Biru Riset (Steal Blueprint)',
        description: 'Bangun jaringan intelijen 50%+ di ibukota musuh (misal Washington atau London). Tugaskan 2 agen untuk misi "Steal Industrial Blueprint" atau "Steal Army Tech". Jika berhasil, kamu akan mendapatkan potongan waktu riset (Research Boost) 100%-300% atau bahkan membuka teknologi generasi berikutnya secara instan!',
        tags: ['Steal Tech', 'Pencurian Riset']
      },
      {
        heading: 'Memicu Kudeta Militer (Stage Coup) Tanpa Mengirim Divisi',
        description: 'Jika musuh memiliki Stabilitas rendah (<50%) dan dukungan ideologimu sudah di atas 20% melalui misi "Boost Ideology", kamu dapat meluncurkan operasi "Stage Coup". Negara target akan langsung terbelah menjadi perang saudara, mengalihkan 50% divisi musuh dari garis depanmu!',
        warning: 'Operasi Coup membutuhkan puluhan ribu senapan infanteri di gudang intelijen; siapkan surplus senapan cadangan sebelum memulai.',
        tags: ['Stage Coup', 'Kudeta', 'Perang Saudara Buatan']
      }
    ],
    summaryTips: [
      'Pecahkan kode radio musuh (Crack Enigma/Cipher) sebelum melancarkan serangan umum untuk mendapatkan buff +15% Soft Attack dan +15% Breakthrough selama 30 hari pertempuran.',
      'Tempatkan 1 agen dengan misi Counter-Intelligence di ibukotamu sendiri untuk menangkap mata-mata musuh yang berusaha mencuri rencanamu.'
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
    readTimeMinutes: 5,
    relatedCommand: 'it',
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
    readTimeMinutes: 5,
    relatedCommand: 'agency.autocomplete',
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
        tags: ['Kolaborasi', 'Kapitulasi Cepat'],
        steps: [
          'Rekrut Illusive Gentleman untuk slot agen tambahan.',
          'Tempatkan agen di ibukota target hingga jaringan intelijen (Spy Network) mencapai 50%.',
          'Mulai operasi "Prepare Collaboration Government" di tab Operations.',
          'Ulangi minimal 2-3 kali sebelum perang dimulai.'
        ]
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
    readTimeMinutes: 4,
    relatedDivisionSearch: 'armor',
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
    readTimeMinutes: 5,
    relatedDivisionSearch: 'special',
    overview: 'Menembus perbatasan yang penuh benteng beton (seperti Garis Maginot atau Selat Inggris) membutuhkan unit khusus: Marinir Amfibi atau Divisi Terjun Payung Paratroopers.',
    keyPoints: [
      {
        heading: 'Syarat Mutlak Invasi Laut (Naval Invasion)',
        description: 'Untuk melancarkan invasi amfibi, kamu membutuhkan: 1) Riset teknologi Landing Craft di tab laut, 2) Superioritas laut di atas 50% di SEMUA zona laut yang dilintasi konvoi, 3) Jumlah konvoi kapal angkut yang cukup, dan 4) Waktu persiapan (planning days) di pelabuhan asal.',
        tags: ['Invasi Laut', 'D-Day'],
        steps: [
          'Riset Landing Craft I di tab teknologi Angkatan Laut.',
          'Pilih divisi marinir, klik ikon jangkar (Naval Invasion Order), klik pelabuhan asal lalu klik pantai sasaran musuh.',
          'Kirim armada kapal perang ke semua zona laut rute invasi dengan misi "Naval Invasion Support" atau "Patrol".',
          'Tunggu bilah persiapan terisi penuh lalu klik panah hijau serang di atas komandan.'
        ]
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
    readTimeMinutes: 4,
    relatedCommand: 'fuel 500000',
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
  },
  {
    id: 'g-ahli-6',
    level: 'ahli',
    title: 'Konferensi Perdamaian (Peace Conference) & Trik Bidding War',
    subtitle: 'Maksimalkan poin perang, rebut armada laut musuh (Take Navy), dan buat Puppet State kaya.',
    iconName: 'Landmark',
    category: 'Intelijen & Politik',
    readTimeMinutes: 5,
    relatedCommand: 'annex [TAG]',
    overview: 'Sistem Peace Conference yang diperbarui menggunakan sistem lelang giliran (Turns & Bidding). Jika kamu tidak tahu cara memanfaatkan poin perang (War Participation), AI Sekutu akan merebut wilayah kunci dan menciptakan kekacauan batas wilayah (border gore).',
    keyPoints: [
      {
        heading: 'Cara Mendapatkan Skor War Participation Tertinggi',
        description: 'Poin perang didapat dari: 1) Korban musuh yang kamu bunuh (Casualties inflicted), 2) Menaklukkan provinsi dan kota bernilai kemenangan (Victory Points captured), 3) Pemboman strategis instalasi musuh (Strategic Bombing), dan 4) Menenggelamkan kapal musuh.',
        tags: ['War Score', 'Partisipasi']
      },
      {
        heading: 'Prioritas Tuntutan: Ambil Armada Musuh (Take Navy)',
        description: 'Menuntut kapal perang musuh (Take Navy) membutuhkan biaya poin relatif murah tetapi memberikan puluhan Battleship, Carrier, dan Destroyer canggih milik Inggris, Prancis, atau Jepang secara gratis ke angkatan lautmu!',
        proTip: 'Ambil armada musuh di Turn 1 sebelum negara koalisi lain menuntut kapal tersebut atau menenggelamkannya.',
        tags: ['Take Navy', 'Armada Gratis']
      },
      {
        heading: 'Mendirikan Puppet State vs Aneksasi Langsung',
        description: 'Menganeksasi semua wilayah musuh akan membebani garrisonmu dengan ribuan korban partisan. Lebih menguntungkan untuk membuat "Puppet State" (Negara Boneka). Negara boneka mengelola garrisonnya sendiri, dan kamu bisa mengimpor seluruh sumber daya mereka hanya dengan biaya 1 Pabrik Sipil per 80 unit!',
        tags: ['Puppet State', 'Sumber Daya']
      }
    ],
    summaryTips: [
      'Di ronde pertama, tawar (Bid) wilayah bernilai industri tinggi dan pelabuhan utama.',
      'Gunakan opsi "Demilitarize Zone" di perbatasan untuk mencegah musuh menaruh tentara di batas negaramu.'
    ]
  },
  {
    id: 'g-ahli-7',
    level: 'ahli',
    title: 'Space Marines & Matematika Armor Piercing Threshold',
    subtitle: 'Rumus Armor divisi tak tertembus dan cara counter divisi Space Marines lawan.',
    iconName: 'Shield',
    category: 'Militer Darat',
    readTimeMinutes: 5,
    relatedDivisionSearch: 'space marines',
    overview: '"Space Marines" adalah julukan komunitas untuk divisi infanteri biasa yang disusupi 1 batalion Heavy Tank atau Medium Tank Destroyer berarmor tebal. Ini menciptakan efek mekanis di mana divisi infanteri musuh tidak memiliki piercing yang cukup untuk menembusnya.',
    keyPoints: [
      {
        heading: 'Rumus Matematis Armor & Piercing HOI4',
        description: 'Armor Divisi dihitung dengan rumus: (0.3 × Nilai Armor Tertinggi) + (0.7 × Rata-rata Seluruh Batalion). Karena 1 batalion Heavy Tank memiliki nilai armor 100+, nilai total armor divisi infanteri melonjak di atas 30-40—jauh di atas nilai Piercing infanteri musuh (biasanya hanya 5-10).',
        tags: ['Rumus Armor', 'Space Marines']
      },
      {
        heading: 'Dampak Status "Unpierced" di Medan Laga',
        description: 'Jika musuh tidak bisa menembus armor divisimu (Unpierced): divisimu menerima pengurangan kerusakan hingga -50% (damage taken halved) dan memberikan bonus serangan organisasi +50% ke musuh! Divisimu menjadi buldoser berjalan.',
        proTip: 'Di game multiplayer, taktik ini sering dibatasi aturan tertentu karena sangat dominan; namun di singleplayer melawan AI, ini adalah senjata pamungkas.',
        tags: ['Unpierced', 'Pengurangan Damage']
      },
      {
        heading: 'Cara Meng-counter Space Marines Musuh',
        description: 'Jika kamu diserang oleh divisi Space Marines musuh, pasang Support Anti-Tank (Support AT) atau masukkan 1 batalion Anti-Tank towed di template divisimu. Ini langsung menaikkan Piercing divisimu di atas nilai armor mereka, melenyapkan seluruh bonus pertahanan mereka.',
        tags: ['Anti-Tank', 'Counter Taktik']
      }
    ],
    summaryTips: [
      'Pastikan kecepatan batalion tank yang kamu pasang tidak lebih lambat dari 4.0 km/jam agar tidak memperlambat laju jalan kaki infanteri.',
      'Rancang tank pendukung ini dengan fokus 100% pada poin Armor di Tank Designer, tanpa perlu senjata turret yang mahal.'
    ]
  },
  {
    id: 'g-ahli-8',
    level: 'ahli',
    title: 'Speedrun World Conquest: Early Justify War & Tundukkan Sekutu 1937',
    subtitle: 'Kalkulasi World Tension di bawah 25%, taktik invasi dini Belanda & Prancis, dan capitulate UK.',
    iconName: 'Globe',
    category: 'Intelijen & Politik',
    readTimeMinutes: 5,
    relatedCommand: 'allowdiplo',
    overview: 'Bagi pemain ahli yang ingin menaklukkan dunia, menunggu hingga 1939 saat Sekutu sudah mengumpulkan ratusan divisi adalah pilihan lambat. Dengan memahami mekanisme World Tension, kamu bisa menaklukkan Sekutu di akhir 1936 atau awal 1937!',
    keyPoints: [
      {
        heading: 'Batas Keramat 25% World Tension & Jaminan Inggris',
        description: 'Inggris dan Prancis TIDAK BISA memberikan Jaminan Kemerdekaan (Guarantee Independence) jika World Tension berada di bawah 25%. Di Januari 1936, justifikasi perang terhadap target netral bernilai tinggi seperti Belanda (kaya karet & minyak Hindia Belanda).',
        tags: ['World Tension', 'Justify Cepat'],
        steps: [
          'Kumpulkan 50 PP pertama di Januari 1936.',
          'Justifikasi perang ke Belanda sebelum Perang Saudara Spanyol menaikkan World Tension ke 25%.',
          'Taklukkan Belanda dengan cepat menggunakan paratrooper atau tank kilat untuk menyita pulau Jawa & Sumatra.',
          'Gunakan pelabuhan Belanda untuk meluncurkan invasi laut ke pesisir timur Inggris (Hull/Dover).'
        ]
      },
      {
        heading: 'Menaklukkan Kerajaan Inggris (Capitulate UK) dalam 2 Minggu',
        description: 'Armada laut Inggris menjaga Selat Inggris (English Channel). Namun di Laut Utara (North Sea), patroli mereka sering kosong. Seberangkan divisi tank atau kavaleri dari pelabuhan Jerman/Belanda menuju Newcastle atau Hull. Daratan Inggris di 1937 hampir tidak memiliki tentara garnisun!',
        proTip: 'Begitu 1 pelabuhan Inggris kamu kuasai, kirim 24 divisi cadanganmu lewat pelabuhan tersebut dan serbu London. Begitu Inggris menyerah, seluruh Persemakmuran (Kanada, Australia, India) jatuh ke tanganmu.',
        tags: ['Invasi Inggris', 'Sea Lion Kilat']
      },
      {
        heading: 'Menyita Pabrik & Armada Sekutu Sebelum 1938',
        description: 'Di Konferensi Perdamaian 1937, ambil seluruh pulau Inggris, koloni Prancis, dan sita armada Royal Navy. Kini negaramu memiliki 300+ pabrik, armada laut nomor satu di dunia, dan minyak tanpa batas sebelum perang dunia resmi dimulai!',
        tags: ['Konferensi Kilat', 'Dominasi Global']
      }
    ],
    summaryTips: [
      'Gunakan divisi paratrooper untuk merebut Victory Points Prancis dalam 48 jam jika kamu memilih jalur perang darat cepat.',
      'Jangan biarkan Amerika Serikat bergabung ke Sekutu; taklukkan Inggris sebelum AS keluar dari status isolasionisme Great Depression.'
    ]
  },
  {
    id: 'g-ahli-9',
    level: 'ahli',
    title: 'Busting Garis Benteng Super: Maginot Line, Stalin Line & Siegfried',
    subtitle: 'Kombinasi Trait Fortress Buster, Siege Artillery, Heavy Flame Tank, dan Railway Gun.',
    iconName: 'Crosshair',
    category: 'Militer Darat',
    readTimeMinutes: 5,
    relatedDivisionSearch: 'armor',
    overview: 'Benteng beton level 7 hingga 10 (seperti Garis Maginot Prancis atau Garis Stalin Soviet) memberikan penalti serangan hingga -70% hingga -90% bagi penyerang biasa. Mencoba menyerbu benteng ini secara frontal tanpa taktik spesialis sama saja dengan membunuh jutaan prajuritmu sendiri.',
    keyPoints: [
      {
        heading: 'Trait Jenderal "Fortress Buster" & Perintah "Siege Artillery"',
        description: 'Jenderal dengan trait Fortress Buster membuka kemampuan aktif Command Power bernama "Siege Artillery" (Shift+Klik di antarmuka tempur). Perintah ini memberikan bonus serangan +50% terhadap benteng dan langsung merusak struktur beton benteng setiap jam pertempuran!',
        proTip: 'Grind trait Fortress Buster dengan menyerang benteng level rendah di Spanyol atau Cekoslowakia sebelum perang dunia dimulai.',
        tags: ['Fortress Buster', 'Siege Artillery', 'Benteng Maginot']
      },
      {
        heading: 'Penyemat Support Heavy Flame Tank & Engineer Company',
        description: 'Batalion Support Flame Tank (khususnya Heavy Flame Tank) memberikan bonus serangan masif terhadap medan Fort (+20%), Urban (+15%), dan River Crossing (+10%). Dipadukan dengan Support Engineer Company III/IV, divisimu akan mengabaikan sebagian besar penalti perlindungan benteng lawan.',
        tags: ['Flame Tank', 'Engineer Company', 'Penetrasi Benteng']
      },
      {
        heading: 'Serangan Multi-Arah & Bombardir Udara Strategis (Fort Bombing)',
        description: 'Jangan pernah menyerang benteng hanya dari 1 provinsi. Serang dari minimal 3-4 arah sekaligus untuk memperlebar combat width menjadi 140w-175w. Sementara itu, tugaskan Strategic Bombers dengan misi "Strategic Bombing" yang menargetkan infrastruktur "Forts" di provinsi tersebut untuk menghancurkan benteng beton musuh dari udara dalam 3-5 hari!',
        warning: 'Benteng yang rusak (damaged forts) kehilangan bonus pertahanannya secara proporsional. Serbu begitu level benteng turun dari 10 menjadi 3-4.',
        tags: ['Strategic Bombing', 'Multi-Direction', 'Penghancuran Benteng']
      }
    ],
    summaryTips: [
      'Gunakan Railway Gun yang ditempatkan di rel terdekat untuk memberikan debuff -10% pertahanan tambahan pada divisi penjaga benteng.',
      'Jika musuh terkepung di dalam benteng tanpa akses pelabuhan atau rel ke ibukota, tunggu hingga suplai mereka nol sebelum melancarkan serbuan terakhir.'
    ]
  },
  {
    id: 'g-ahli-10',
    level: 'ahli',
    title: 'Krisis Manpower Teratasi: Divisi Kolonial (Puppet) & Non-Core Exploitation',
    subtitle: 'Cara negara kecil (minor) memiliki 2 juta tentara tanpa kehabisan tenaga kerja pabrik.',
    iconName: 'Users',
    category: 'Militer Darat',
    readTimeMinutes: 5,
    relatedCommand: 'manpower 1000000',
    overview: 'Banyak negara dengan potensi industri luar biasa (seperti Belanda, Swedia, Hungaria, atau Kanada) terhambat oleh populasi kecil. Pemain veteran menggunakan sistem Puppet Divisions dan eksploitasi Non-Core untuk melipatgandakan jumlah tentara hingga puluhan kali lipat tanpa mengorbankan pekerja pabrik.',
    keyPoints: [
      {
        heading: 'Mekanisme Divisi Kolonial (Colonial / Puppet Template)',
        description: 'Jika kamu memiliki negara bawahan / Puppet (misal: Hindia Belanda, British Raj, atau puppet Tiongkok): Buka menu Division Designer, klik tombol salin template negara bonekamu. Buat divisi di bawah bendera kolonial. Divisi ini menggunakan 90% hingga 100% Manpower dari negara boneka, namun 100% peralatan dan komandonya berada di bawah tanganmu!',
        proTip: 'Satu puppet Tiongkok atau Hindia Belanda dapat menyediakan 3.000.000 hingga 5.000.000 manpower gratis bagi negara induknya!',
        tags: ['Puppet Division', 'Manpower Koloni', 'Trik Minor']
      },
      {
        heading: 'Kombinasi Total Mobilization & Keputusan "Women in the Workforce"',
        description: 'Hukum ekonomi "Total Mobilization" adalah hukum terbaik untuk kecepatan pembuatan pabrik militer (+30%), tetapi memberikan penalti -3% rekrutmen manpower (sering membuat manpower negara kecil menjadi 0). Solusinya: Segera ambil keputusan politik "Women in the Workforce" di tab Decisions. Keputusan ini memberikan +9% Factory Output, +20% Stability, dan memulihkan +3% manpower, membatalkan penalti Total Mobilization sepenuhnya!',
        tags: ['Total Mobilization', 'Women in Workforce', 'Ekonomi Militer']
      },
      {
        heading: 'Field Hospital IV & Prinsip "Zero Casualties" (Nol Korban)',
        description: 'Tingkatkan riset Field Hospital ke level III atau IV di tab infanteri. Field Hospital canggih mengembalikan (Trickleback) hingga 40-50% korban luka kembali ke cadangan manpower nasional setelah pertempuran usai, sekaligus mempertahankan 80%+ level pengalaman (XP) prajurit veteran.',
        tags: ['Field Hospital', 'Trickleback', 'Pengalaman Prajurit']
      }
    ],
    summaryTips: [
      'Gunakan hukum pendudukan "Civilian Oversight" atau "Local Police Force" untuk menaikkan Compliance hingga 80% di wilayah non-core agar menyumbang pabrik dan manpower ekstra.',
      'Jangan menganeksasi negara puppet yang memiliki populasi ratusan juta jika kamu membutuhkan manpower mereka; pertahankan mereka sebagai Koloni atau Dominian.'
    ]
  },
  {
    id: 'g-ahli-11',
    level: 'ahli',
    title: 'Umpan Laut & Perangkap Pemusnah Armada (Naval Baiting & Port Strike)',
    subtitle: 'Cara menenggelamkan Royal Navy atau US Navy dengan biaya murah di bawah payung udara.',
    iconName: 'Anchor',
    category: 'Angkatan Laut',
    readTimeMinutes: 5,
    relatedCommand: 'it',
    overview: 'Membangun armada kapal tempur raksasa membutuhkan waktu bertahun-tahun dan ribuan baja. Pemain ahli tidak mengadu Battleship melawan Battleship musuh secara adil; mereka memancing armada utama musuh ke dalam zona jebakan kematian yang dijaga oleh Naval Bomber dan kapal selam.',
    keyPoints: [
      {
        heading: 'Taktik Patroli Umpan (The Decoy Screen Fleet)',
        description: 'Bentuk grup kecil beranggotakan 2-3 Destroyer murah atau 1 Light Cruiser usang, atur aturan pertempuran mereka ke "Do Not Engage" atau "Low Risk", dan tugaskan misi Patroli di zona laut sempit (seperti Selat Inggris, Laut Baltik, atau Selat Mediterania). AI musuh akan melihat kapal ini dan segera mengirimkan Main Strike Force mereka (termasuk Battleship dan Carrier kebanggaan mereka) keluar dari pelabuhan untuk menyergap.',
        tags: ['Decoy Fleet', 'Umpan Armada', 'Patroli']
      },
      {
        heading: 'Zona Payung Kematian: 1.000 Pesawat Naval Bomber Darat',
        description: 'Di atas zona laut tempat armada umpan berpatroli, tempatkan 800-1.200 pesawat Naval Bomber (atau CAS dengan modul torpedo/bom laut) di pangkalan udara darat terdekat. Begitu Main Strike Force musuh masuk ke zona tersebut, pesawat daratmu akan meluncurkan ribuan torpedo setiap beberapa jam pertempuran laut!',
        proTip: 'Pesawat Naval Bomber berbasis darat tidak memiliki batas penalti overcrowding seperti Carrier, dan biaya produksinya 10x lebih murah daripada satu kapal tempur besar.',
        tags: ['Naval Bomber', 'Payung Udara', 'Pemusnahan Battleship']
      },
      {
        heading: 'Serangan Pelabuhan (Port Strike Execution)',
        description: 'Setelah armada musuh terluka parah oleh bom laut, mereka akan melarikan diri dan bersandar di pangkalan laut terdekat untuk perbaikan (Repairs). Alihkan misi pesawat pengebommu menjadi "Port Strike" di atas pelabuhan tersebut. Kapal musuh yang sedang diperbaiki tidak bisa bermanuver dan akan tenggelam langsung di dermaga!',
        tags: ['Port Strike', 'Penenggelaman Dermaga']
      }
    ],
    summaryTips: [
      'Gunakan ranjau laut (Naval Mines) di rute pelayaran musuh untuk memberikan penalti kecepatan gerak dan peluang kerusakan kapal musuh hingga 80%.',
      'Pastikan kamu memiliki setidaknya 60-70% Superioritas Udara di zona laut tersebut agar pesawat pembom lautmu tidak dicegat oleh Fighter musuh.'
    ]
  },
  {
    id: 'g-ahli-12',
    level: 'ahli',
    title: 'Meriam Rel Raksasa (Railway Guns) & Pengepungan Strategis',
    subtitle: 'Dukungan artileri artileri super berat 15 provinsi, debuff lawan -10%, dan pengamanan jalur rel.',
    iconName: 'Zap',
    category: 'Militer Darat',
    readTimeMinutes: 4,
    relatedDivisionSearch: 'artileri',
    overview: 'Railway Guns (Meriam Rel Kaliber Raksasa seperti Schwerer Gustav) adalah salah satu instrumen pendukung paling mematikan dari DLC No Step Back. Cukup dengan menempatkan 1-2 Railway Gun di belakang garis depan, seluruh pasukan musuh dalam radius puluhan provinsi akan menerima debuff pertahanan yang melumpuhkan.',
    keyPoints: [
      {
        heading: 'Produksi & Penugasan Railway Guns ke Army Group',
        description: 'Riset Railway Gun di tab artileri (tersedia sejak 1936/1939). Produksi Railway Gun di pabrik militer (membutuhkan 10 IC dan material baja). Begitu selesai, Railway Gun akan muncul di rel ibukota. Klik Railway Gun, lalu klik kanan pada ikon Marsekal Lapangan (Field Marshal) atau Army-mu untuk menugaskannya sebagai senjata pendukung resmi.',
        tags: ['Railway Gun', 'Penugasan', 'Meriam Raksasa'],
        steps: [
          'Selesaikan riset Railway Guns pada tab Artileri.',
          'Alokasikan 2-3 pabrik militer untuk memproduksi Railway Gun di lini produksi.',
          'Pilih Railway Gun yang sudah siap di peta, klik kanan pada potret Jenderal atau Field Marshal garis depan.',
          'Railway Gun akan otomatis bergerak mengikuti pergerakan garis depan di atas rel kereta api.'
        ]
      },
      {
        heading: 'Dampak Debuff "Railway Gun Bombardment" (-10% Stat Musuh)',
        description: 'Setiap pertempuran darat yang terjadi dalam radius tembak Railway Gun (hingga 15 provinsi di sepanjang jaringan rel) akan mendapatkan status Railway Gun Bombardment. Musuh menerima penalti: -10% Soft Attack, -10% Hard Attack, -10% Defense, -10% Breakthrough, dan penurunan drastis penalti benteng!',
        proTip: 'Satu Railway Gun saja cukup untuk memberikan buff pada seluruh sektor garis depan sepanjang 200 kilometer.',
        tags: ['Debuff Tembakan', 'Radius 15 Provinsi']
      },
      {
        heading: 'Pengamanan Jalur Rel & Bahaya Pengeboman Logistik',
        description: 'Railway Gun HANYA bisa bergerak di atas rel kereta api yang utuh. Jika pembom taktis musuh menghancurkan rel di belakangnya, Railway Gun bisa terisolasi dan disita (captured) oleh musuh jika garis pertahananmu mundur. Selalu lindungi jalur rel dengan Fighter payung udara atau Support Anti-Air.',
        warning: 'Jangan biarkan Railway Gun berada di provinsi garis depan tanpa pengawalan divisi infanteri.',
        tags: ['Keamanan Rel', 'Penangkapan Senjata']
      }
    ],
    summaryTips: [
      'Bangun rel kereta api level 2 menuju garis perbatasan sebelum menyerang agar Railway Gun dapat bergerak leluasa tanpa terhambat bottleneck rel sempit.',
      'Gabungkan Railway Gun dengan perencanaan serang (Planning Bonus) maksimal untuk menghasilkan daya tembus serangan pertama yang menghancurkan.'
    ]
  },
  {
    id: 'g-ahli-13',
    level: 'ahli',
    title: 'Operasi Amfibi Kilat & Invasi Lintas Samudra',
    subtitle: 'Riset Landing Craft, persiapan 70 hari invasi, pendaratan diapit (Flanking Port), dan Mulberry Harbours.',
    iconName: 'Anchor',
    category: 'Angkatan Laut',
    readTimeMinutes: 5,
    relatedCommand: 'teleport',
    overview: 'Invasi amfibi melintasi Selat Inggris atau Samudra Pasifik adalah operasi militer paling rumit di HOI4. Melakukan pendaratan langsung ke pelabuhan berbenteng biasanya berujung pada pembantaian divisimu. Gunakan teknik Flanking Pincer dan Mulberry Harbours untuk mendaratkan pasukan dengan selamat.',
    keyPoints: [
      {
        heading: 'Riset Teknologi Transport & Landing Craft 1940',
        description: 'Teknologi Transport 1936 hanya memungkinkan kamu meluncurkan 10 divisi sekaligus dengan waktu persiapan 70 hari. Segera selesaikan riset "Landing Craft" 1940 di tab Angkatan Laut untuk melipatgandakan kapasitas menjadi 24 divisi, memotong waktu persiapan hingga 50%, dan memberikan bonus pertahanan amfibi +15%.',
        tags: ['Landing Craft', 'Transport Riset', 'Kapasitas Invasi']
      },
      {
        heading: 'Teknik "Flanking The Port" (Mendarat di Kiri-Kanan Pelabuhan)',
        description: 'JANGAN mendaratkan seluruh divisi langsung ke provinsi pelabuhan musuh karena musuh biasanya menempatkan infanteri berbenteng di sana. Daratkan 2 divisi Marinir tepat di provinsi sebelah kiri pelabuhan dan 2 divisi di sebelah kanan pelabuhan (pantai tak terjaga), lalu serang pelabuhan dari 3 arah darat sekaligus!',
        proTip: 'Dukungan Bombardir Laut dari Battleship di garis pantai memberikan penalti pertahanan musuh hingga -25% selama pertempuran amfibi berlangsung.',
        tags: ['Flanking Pincer', 'Amfibi', 'Naval Bombardment']
      },
      {
        heading: 'Pembangunan Pelabuhan Apung (Mulberry Harbours / Floating Harbors)',
        description: 'Produksi modul "Floating Harbor" di galangan kapalmu. Saat merencanakan invasi amfibi, centang opsi pelabuhan apung. Begitu pasukanmu mendarat di pantai biasa tanpa kota, Mulberry Harbour otomatis menyediakan suplai penuh selama 30 hari hingga pelabuhan permanen musuh berhasil direbut!',
        warning: 'Jika kamu gagal merebut pelabuhan dalam 30 hari sebelum durasi Mulberry Harbour habis, seluruh tentara invasimu akan kehabisan suplai dan musnah.',
        tags: ['Mulberry Harbour', 'Suplai Pantai']
      }
    ],
    summaryTips: [
      'Kamu membutuhkan minimal 50% Supremasi Laut (Naval Superiority) di SETIAP zona laut yang dilewati rute konvoi invasi amfibi.',
      'Sertakan Support Pioneer/Engineer dan Amtrac (Amphibious Tractor) di template divisi Marinir untuk menghapus penalti pendaratan pantai.'
    ]
  },
  {
    id: 'g-ahli-14',
    level: 'ahli',
    title: 'Strategi Pesawat Jet & Rudal Balistik V2 / Nuklir Antar-Benua',
    subtitle: 'Riset Advanced Rocketry, roket silik V2 tanpa kru, dan pengiriman hulu ledak ICBM ke wilayah Sekutu.',
    iconName: 'Zap',
    category: 'Udara & CAS',
    readTimeMinutes: 5,
    relatedCommand: 'research all',
    overview: 'Saat perang dunia memasuki tahun 1944-1945, perlombaan senjata beralih ke era jet dan teknologi roket balistik. Pembangunan situs peluncuran roket (Rocket Sites) dan rudal V2 memungkinkanmu membombardir pabrik dan lapangan udara musuh dari jarak ribuan kilometer tanpa membahayakan satu pun nyawa pilot.',
    keyPoints: [
      {
        heading: 'Pohon Riset Rocketry & Situs Peluncuran Roket (Rocket Sites)',
        description: 'Selesaikan riset Rocket Engines hingga V2 Rocket di tab rekayasa/engineering. Bangun "Rocket Sites" di provinsi perbatasan (misal Prancis utara menghadap London). Situs ini otomatis memproduksi dan menembakkan rudal balistik setiap hari ke zona sasaran.',
        proTip: 'Rudal balistik V2 tidak bisa dicegat oleh pesawat tempur Fighter atau meriam anti-udara (Flak) musuh!',
        tags: ['V2 Rocket', 'Rocket Site', 'Senjata Balistik']
      },
      {
        heading: 'Jet Fighters & Jet CAS: Kecepatan Melebihi 900 km/jam',
        description: 'Jet Fighter generasi akhir memiliki stat Kecepatan (Speed) dan Agility yang jauh melampaui pesawat baling-baling konvensional. Pesawat jet mendominasi pertempuran udara, menembak jatuh 10x lebih banyak pesawat musuh per rasio kerugian.',
        tags: ['Jet Engine', 'Jet Fighter', 'Supremasi Udara Akhir']
      },
      {
        heading: 'Penggabungan Bom Atom dengan Rudal Balistik',
        description: 'Dengan riset roket tier akhir, kamu dapat memasang hulu ledak nuklir langsung pada rudal balistik jarak jauh. Kamu tidak lagi membutuhkan pesawat Strat Bomber raksasa atau superioritas udara 75% untuk menjatuhkan bom nuklir ke ibukota lawan!',
        warning: 'Konsumsi tungsten dan aluminium untuk produksi roket dan jet sangat masif; amankan rute perdagangan sumber daya sebelum peralihan industri.',
        tags: ['Nuklir Balistik', 'ICBM', 'Endgame Meta']
      }
    ],
    summaryTips: [
      'Gunakan misi Strategic Bombing dari Rocket Sites untuk melumpuhkan jaringan rel kereta api dan pelabuhan Sekutu tanpa kehilangan manpower pilot.',
      'Dua hulu ledak nuklir yang dijatuhkan pada pusat industri musuh akan meruntuhkan National Unity / War Support mereka ke titik nadir, memicu negosiasi damai.'
    ]
  },

  // ==================== TAMBAHAN PANDUAN BARU PEMULA ====================
  {
    id: 'g-pemula-13',
    level: 'pemula',
    title: 'Manajemen Manpower & Hirarki Hukum Wajib Militer (Conscription Laws)',
    subtitle: 'Kapan harus menaikkan wajib militer dari Volunteer Only ke Extensive Conscription tanpa melumpuhkan pabrik.',
    iconName: 'Users',
    category: 'Militer Darat',
    readTimeMinutes: 4,
    relatedCommand: 'manpower 100000',
    overview: 'Manpower adalah nyawa dari setiap divisi militer. Tanpa manpower cadangan yang cukup, divisimu tidak dapat memperkuat tentara yang terluka di garis depan. Memahami hukum wajib militer (Conscription Laws) dan penalti ekonominya adalah pengetahuan dasar wajib setiap panglima.',
    keyPoints: [
      {
        heading: 'Tingkatan Hukum Wajib Militer & Persentase Populasi',
        description: 'Hukum wajib militer dimulai dari Disarmed Nation (1%), Volunteer Only (1.5%), Limited Conscription (2.5%), Extensive Conscription (5%), Service by Requirement (10%), All Adults Serve (20%), hingga Scraping the Barrel (25%).',
        proTip: 'Extensive Conscription (5%) adalah "Sweet Spot" emas: memberikan jutaan prajurit tanpa memberikan penalti output pabrik sipil atau militer sama sekali!',
        tags: ['Conscription Laws', 'Wajib Militer', 'Extensive Conscription']
      },
      {
        heading: 'Bahaya Penalti Ekonomi Wajib Militer Ekstrem',
        description: 'Jika kamu menaikkan hukum di atas 5%: Service by Requirement memberi penalti -10% Factory Output dan -10% Construction Speed. All Adults Serve memotong -30%, dan Scraping the Barrel memotong -40% kecepatan produksi pabrik serta +50% waktu latihan prajurit.',
        warning: 'Jangan pernah menaikkan ke All Adults Serve atau Scraping the Barrel kecuali tokomu benar-benar terancam capitulasi total.',
        tags: ['Penalti Industri', 'Scraping the Barrel']
      },
      {
        heading: 'Syarat Dukungan Perang (War Support)',
        description: 'Menaikkan hukum wajib militer membutuhkan War Support minimal: Limited Conscription butuh 10% War Support, Extensive Conscription butuh 20%, dan Service by Requirement butuh 50% War Support atau status negara sedang diserang.',
        tags: ['War Support', 'Political Power']
      }
    ],
    summaryTips: [
      'Hemat Political Power 150 PP sejak awal permainan untuk langsung beralih ke Extensive Conscription begitu perang meletus.',
      'Jika kehabisan manpower saat perang defensif, gunakan fokus nasional negara atau desentralisasi populasi koloni jika memilikinya.'
    ]
  },
  {
    id: 'g-pemula-14',
    level: 'pemula',
    title: 'Neraca Buku Logistik (Logistics Ledger) & Manajemen Stockpile Gudang Senjata',
    subtitle: 'Shortcut "I" untuk memantau surplus harian, defisit senapan, dan prioritas reinforcement garis depan.',
    iconName: 'Truck',
    category: 'Logistik & Suplai',
    readTimeMinutes: 4,
    relatedCommand: 'ae 10000 infantry_equipment_1',
    overview: 'Jendela Logistik (tekan shortcut "I") adalah laporan akuntansi militer terlengkap di HOI4. Dari sini kamu bisa melihat apakah pabrikmu memproduksi cukup senapan untuk menutupi korban pertempuran, atau apakah negaramu menuju kebangkrutan persenjataan.',
    keyPoints: [
      {
        heading: 'Membaca Saldo Harian (Daily Balance) & Days of Production',
        description: 'Kolom "Daily Balance" menunjukkan selisih antara senjata yang diproduksi pabrik per hari dikurangi senjata yang hancur di garis depan. Jika bertanda minus merah (-120/hari), divisimu kehilangan lebih banyak senapan dibanding yang dibuat pabrik.',
        proTip: 'Angka di sebelah kanan (misal "+45d") menunjukkan berapa hari lagi stok gudangmu akan habis jika intensitas pertempuran terus berlangsung pada tingkat saat ini.',
        tags: ['Logistics Tab', 'Shortcut I', 'Daily Balance']
      },
      {
        heading: 'Tab Prioritas Persenjataan (Reinforcement vs Upgrades vs Training)',
        description: 'Di tab Recruitment & Deployment, kamu dapat mengatur slider prioritas distribusi peralatan: 1) Reinforcements (mengirim senjata ke divisi terluka di front), 2) Upgrades (mengganti senjata usang dengan model baru), 3) Operations/Garrison, 4) Divisions in Training.',
        warning: 'Selalu berikan prioritas bintang 3 (High) untuk Reinforcements agar divisi tempurmu tidak kehabisan senjata di parit!',
        tags: ['Prioritas Pasokan', 'Reinforcements']
      },
      {
        heading: 'Deteksi Kerusakan Logistik Tersembunyi',
        description: 'Bila angka "In Stock" berwarna merah, divisimu beroperasi dengan penalti Combat Effectiveness hingga -50%. Pindahkan pabrik militer dari produksi kendaraan mewah ke produksi senapan dasar segera.',
        tags: ['Defisit Gudang', 'Pabrik Darurat']
      }
    ],
    summaryTips: [
      'Biasakan memeriksa Logistics Ledger (shortcut I) setiap awal bulan dalam game untuk mengantisipasi defisit senjata sebelum garis depan runtuh.',
      'Jangan menambah antrean divisi baru jika saldo senapan infanterimu masih berada di bawah angka 0.'
    ]
  },
  {
    id: 'g-pemula-15',
    level: 'pemula',
    title: 'Sistem Promosi Jenderal, Traits, & Komando Field Marshal',
    subtitle: 'Cara melatih jenderal menjadi Brilliant Strategist tanpa kehilangan trait spesialisasi penting.',
    iconName: 'Award',
    category: 'Militer Darat',
    readTimeMinutes: 4,
    relatedCommand: 'cp 100',
    overview: 'Jenderal (General) dan Marsekal Lapangan (Field Marshal) memimpin pasukanmu dengan memberikan bonus stat yang menentukan kemenangan. Memilih trait yang tepat dan mengetahui batasan komando divisi menjamin efisiensi taktis maksimal di garis depan.',
    keyPoints: [
      {
        heading: 'Batas Komando: 24 Divisi untuk Jenderal, 5 Korps untuk Marsekal',
        description: 'Seorang Jenderal biasa dapat memimpin hingga 24 divisi (atau 30 jika memiliki trait Skilled Staffer). Marsekal Lapangan (Field Marshal) dapat memimpin hingga 5 Jenderal (total 120 divisi). Jika melebihi batas ini, seluruh pasukan menerima penalti efektivitas parah!',
        tags: ['Batas Divisi', 'Struktur Komando']
      },
      {
        heading: 'Trait Spesialisasi: Infantry Leader, Panzer Leader, & Trickster',
        description: 'Jenderal mengumpulkan pengalaman trait berdasarkan aksi pasukannya di lapangan: bertempur dengan tank memicu trait Panzer Leader (+Attack & Movement), bertempur di hutan memicu Jungle Rat, dan melakukan manuver flank memicu Trickster (+Reconnaissance & Surprises).',
        proTip: 'Field Marshal membagikan 50% dari efek trait mereka ke SELURUH divisi di bawah komando mereka!',
        tags: ['Trait Jenderal', 'Panzer Leader', 'Field Marshal']
      },
      {
        heading: 'Aturan Promosi Jenderal Menjadi Field Marshal',
        description: 'Mempromosikan Jenderal menjadi Field Marshal berbiaya Command Power (CP) dan akan mengurangi 1 level skill serta menonaktifkan trait berbasis korps divisi langsung. Promosikan hanya jenderal yang sudah berlevel tinggi (Level 5+) atau memiliki trait Brilliant Strategist.',
        warning: 'Jangan mempromosikan jenderal spesialis tank terbaikmu menjadi marsekal jika kamu masih membutuhkan mereka memimpin korps lapis baja di ujung tombak.',
        tags: ['Promosi Marsekal', 'Command Power']
      }
    ],
    summaryTips: [
      'Gunakan Command Power (CP) untuk menetapkan Army Spirits di menu perwira (Officer Corp) guna mempercepat perolehan XP jenderal sebesar +15%.',
      'Kelompokkan divisi infanteri penahan garis di bawah Jenderal ber-trait Defensive Doctrine untuk bonus Entrenchment maksimal.'
    ]
  },
  {
    id: 'g-pemula-16',
    level: 'pemula',
    title: 'Pabrik Sipil vs Militer: Kurva Snowballing Ekonomi 1936-1939',
    subtitle: 'Titik balik emas kapan harus berhenti membangun Civs dan beralih 100% ke Pabrik Militer (Mils).',
    iconName: 'Factory',
    category: 'Ekonomi & Industri',
    readTimeMinutes: 4,
    relatedCommand: 'ic',
    overview: 'Kesalahan paling sering pemain pemula adalah membangun Pabrik Militer terlalu awal (sehingga ekonomi terlambat tumbuh) atau membangun Pabrik Sipil terlalu lama (sehingga tidak memiliki senjata saat perang meletus pada September 1939). Inilah panduan matematis kurva industri HOI4.',
    keyPoints: [
      {
        heading: 'Fase Snowballing Sipil (1936 - Pertengahan 1938)',
        description: 'Di tahun 1936-1937, bangunlah HANYA Pabrik Sipil (Civs) di negara bagian dengan infrastruktur tertinggi (Infrastruktur 4 atau 5 memberikan bonus kecepatan bangun hingga +40%). Setiap 15 Civs memberimu 1 antrean konstruksi penuh ekstra untuk melipatgandakan laju pembangunan.',
        tags: ['Civs Greed', 'Snowballing', 'Infrastruktur']
      },
      {
        heading: 'Titik Balik (Pivot Date): Pertengahan 1938',
        description: 'Tepat pada musim panas 1938 (atau 1.5 tahun sebelum tanggal perang negaramu), hentikan total pembangunan pabrik sipil dan alihkan 100% kapasitas konstruksi untuk membangun Pabrik Militer (Mils). Pabrik militer butuh 10-12 bulan untuk mencapai Production Efficiency Cap maksimal.',
        proTip: 'Jika mulai membangun Mils pada pertengahan 1938, garis produksimu akan mencapai efisiensi 100% tepat saat Perang Dunia II meletus di September 1939.',
        tags: ['Pivot Industri', 'Efisiensi Produksi']
      },
      {
        heading: 'Kebijakan Ekonomi: War Economy vs Total Mobilization',
        description: 'Segera beralih dari Early Mobilization ke War Economy menggunakan 150 Political Power. War Economy memangkas jatah Consumer Goods menjadi hanya 20%, membebaskan lebih banyak pabrik sipil untuk proyek pembangunan nasional.',
        warning: 'Total Mobilization menurunkan Consumer Goods ke 10% tapi memotong -3% populasi manpower; kombinasikan dengan keputusan "Women in the Workforce" untuk menghapus penalti ini.',
        tags: ['War Economy', 'Consumer Goods']
      }
    ],
    summaryTips: [
      'Negara minor dengan <15 pabrik sipil awal sebaiknya langsung membangun Pabrik Militer sejak 1937 karena waktu mereka terlalu sempit untuk snowballing sipil.',
      'Gunakan Industrial Concern di kabinet menteri untuk bonus +10% riset teknologi industri.'
    ]
  },

  // ==================== TAMBAHAN PANDUAN BARU MENENGAH ====================
  {
    id: 'g-menengah-15',
    level: 'menengah',
    title: 'Kalkulator Penggantian Peralatan & Drain Logistik Perang Panjang',
    subtitle: 'Rumus attrition harian, kerugian pertempuran, dan penentuan jumlah pabrik penyeimbang (Break-even Mils).',
    iconName: 'Activity',
    category: 'Logistik & Suplai',
    readTimeMinutes: 5,
    relatedDivisionSearch: 'infantry',
    overview: 'Pertempuran gesekan (War of Attrition) tidak dimenangkan oleh siapa yang memiliki pasukan terbanyak, melainkan siapa yang pabriknya mampu menggantikan senapan dan meriam yang hancur lebih cepat daripada laju kehancurannya di medan laga.',
    keyPoints: [
      {
        heading: 'Rumus Kehancuran Peralatan Tempur (Combat & Terrain Attrition)',
        description: 'Kerugian peralatan per hari dipengaruhi oleh 3 faktor: 1) Intensitas kontak tempur (rata-rata 1-3% senjata hancur per hari pertempuran sengit), 2) Tingkat atrisi medan cuaca (lumpur, rawa, salju menambahkan 10-20% atrisi), 3) Defisit suplai (divisi tanpa suplai kehilangan hingga 30% peralatan per hari karena ditinggalkan).',
        tags: ['Atrisi Tempur', 'Rumus Kerugian']
      },
      {
        heading: 'Menghitung Pabrik Militer Penyeimbang (Break-Even Mils)',
        description: 'Satu pabrik militer memproduksi sekitar 270 senapan infanteri per bulan (pada efisiensi stabil). Jika korps divisimu kehilangan 2.700 senapan setiap bulan dalam ofensif berkelanjutan, kamu WAJIB mengalokasikan minimal 10 pabrik militer HANYA untuk menutup kerugian itu, belum termasuk pembuatan divisi baru!',
        proTip: 'Gunakan tab "Konsumsi Manpower & Logistik" di War Room untuk melihat kalkulasi otomatis pabrik penyeimbang untuk seluruh persenjataanmu.',
        tags: ['Break-Even Mils', 'Kapasitas Industri']
      },
      {
        heading: 'Peran Support Maintenance Company untuk Mengurangi Kerugian',
        description: 'Menambahkan Maintenance Company ke template divisi menaikkan stat Reliability sebesar +5% hingga +15%. Hal ini tidak hanya memangkas kerugian akibat kecelakaan hingga 80%, tetapi juga memungkinkan divisimu merebut (capture) hingga 10% peralatan musuh yang hancur!',
        tags: ['Maintenance Company', 'Equipment Capture', 'Reliability']
      }
    ],
    summaryTips: [
      'Rancang tank dan truk dengan Reliability minimal 80% untuk meminimalkan atrisi mesin di medan berlumpur.',
      'Hentikan serangan infanteri jika kamu melihat garis merah pada indikator perlengkapan di bawah ikon divisimu.'
    ]
  },
  {
    id: 'g-menengah-16',
    level: 'menengah',
    title: 'Desain Tank Destroyer (TD) & Pematah Lapis Baja Berat Lawan',
    subtitle: 'Solusi murah ber-Armor Piercing tinggi untuk menghancurkan divisi Panzer elit lawan tanpa tank berat mahal.',
    iconName: 'Shield',
    category: 'Militer Darat',
    readTimeMinutes: 4,
    relatedDivisionSearch: 'tank',
    overview: 'Menghadapi divisi Heavy Tank musuh (seperti IS-2 Soviet atau Tiger Jerman) bisa menjadi mimpi buruk jika divisimu tidak memiliki nilai Piercing yang cukup. Membangun Tank Destroyer berbasis sasis Medium memberikan daya tembus mematikan dengan sepertiga biaya Industrial Capacity (IC).',
    keyPoints: [
      {
        heading: 'Konversi Sasis Tank Menjadi Tank Destroyer (Tank Designer)',
        description: 'Di menu Tank Designer, ubah peran sasis (Role) menjadi Tank Destroyer. Pasang meriam High-Velocity Cannon atau Heavy Anti-Tank Gun. Komponen ini memberikan Piercing dan Hard Attack spektakuler yang menembus armor tank tercanggih sekalipun.',
        tags: ['Tank Destroyer', 'High Velocity Cannon', 'Piercing']
      },
      {
        heading: 'Rasio Batalion TD di Divisi Garis Depan',
        description: 'Kamu tidak perlu membuat divisi penuh Tank Destroyer. Cukup tambahkan 1 atau 2 batalion TD ke dalam divisi infanteri reguler atau divisi motorized-mu. Kehadiran 1 batalion TD langsung melipatgandakan nilai Hard Attack dan Piercing seluruh divisi ke level yang cukup untuk menembus divisi lapis baja musuh!',
        proTip: 'Satu batalion Tank Destroyer dengan Armor mumpuni dapat memberikan bonus "Unpierced Armor" ke seluruh divisi infanterimu (mengurangi separuh kerusakan yang diterima).',
        tags: ['Template TD', 'Space Marines TD']
      },
      {
        heading: 'Efisiensi IC Dibanding Heavy Tank Penuh',
        description: 'Satu batalion Heavy Tank membutuhkan 40 tank berat yang memakan biaya ribuan IC dan chromium langka. Sebaliknya, Medium Tank Destroyer hanya membutuhkan 36 unit per batalion dengan konsumsi tungsten yang jauh lebih bersahabat.',
        tags: ['Efisiensi IC', 'Logistik Logam']
      }
    ],
    summaryTips: [
      'Pastikan kecepatan (Speed) Tank Destroyer-mu menyamai kecepatan divisi tank pendampingnya (minimal 8-10 km/jam).',
      'Gunakan doktrin Superior Firepower cabang kanan (Integrated Support) untuk mendongkrak soft attack dari divisi pendamping TD.'
    ]
  },
  {
    id: 'g-menengah-17',
    level: 'menengah',
    title: 'Taktik Pengepungan Kantong (Kessel Encirclement) & Sapu Bersih',
    subtitle: 'Manuver capit kepiting ganda, pemotongan rel kereta api, dan pemusnahan divisi tanpa jalan mundur.',
    iconName: 'Crosshair',
    category: 'Militer Darat',
    readTimeMinutes: 5,
    relatedDivisionSearch: 'armor',
    overview: 'Mendorong garis depan musuh hanya membuat mereka mundur ke provinsi berikutnya. Kunci memenangkan perang darat di HOI4 adalah Encirclement (Pengepungan Kantong): memotong jalur suplai musuh, mengurung mereka di satu kantong wilayah, dan memusnahkan seluruh divisi hingga nol tanpa sisa manpower yang kembali ke musuh.',
    keyPoints: [
      {
        heading: 'Taktik Pincer Movement (Capit Kepiting Ganda)',
        description: 'Bentuk dua kelompok divisi Panzer/Motorized di dua titik berbeda pada garis perbatasan. Luncurkan serangan menembus satu titik lemah pertahanan musuh dari kiri dan kanan secara bersamaan, lalu satukan kedua ujung tombak lapis baja di belakang garis musuh (pada Supply Hub atau persimpangan rel).',
        tags: ['Pincer Movement', 'Capit Kepiting', 'Encirclement']
      },
      {
        heading: 'Trik "Pinning Attack" Menggunakan Infanteri Lambat',
        description: 'Saat tankmu meluncur di sayap belakang musuh, perintahkan divisi infanterimu di garis depan untuk MENYERANG langsung divisi musuh yang berada di tengah. Pertempuran ini (Pinning Attack) mengunci divisi musuh di tempat sehingga mereka tidak bisa kabur atau berbalik arah mencegat tankmu!',
        proTip: 'Pinning Attack tidak ditujukan untuk menang perang, melainkan untuk menahan musuh selama 48-72 jam sampai kantong pengepungan tertutup rapat.',
        tags: ['Pinning Attack', 'Penguncian Gerak']
      },
      {
        heading: 'Penyusutan Kantong & Pembersihan Total',
        description: 'Begitu kantong terkunci, divisi musuh yang terkepung akan menerima debuff "Out of Supply" (-50% ke seluruh stat) dan penalti "Encircled" (-30% pertahanan). Gunakan infanteri pendukung untuk meremas kantong dari segala arah sampai seluruh divisi musuh terhapus dari peta permainan.',
        warning: 'Jangan tinggalkan leher kantong pengepunganmu tanpa penjagaan, karena musuh akan berusaha melancarkan serangan balik putus asa untuk membuka koridor suplai.',
        tags: ['Pembersihan Kantong', 'Debuff Encircled']
      }
    ],
    summaryTips: [
      'Gunakan pesawat CAS di atas zona kantong untuk membantai divisi musuh yang sedang mengalami debuff organisasi.',
      'Satu pengepungan sukses terhadap 20 divisi musuh seringkali langsung melumpuhkan seluruh kapabilitas pertahanan musuh di teater perang tersebut.'
    ]
  },
  {
    id: 'g-menengah-18',
    level: 'menengah',
    title: 'Perlindungan Rute Konvoi Laut & Penyergapan U-Boat Samudra',
    subtitle: 'Misi Convoy Escort, penutupan selat berbahaya, dan pengamanan impor minyak serta karet vital.',
    iconName: 'Anchor',
    category: 'Angkatan Laut',
    readTimeMinutes: 4,
    relatedCommand: 'it',
    overview: 'Bahkan negara adidaya sekalipun akan lumpuh jika rute konvoi lautnya disergap oleh kapal selam musuh. Kapal selam yang menenggelamkan konvoi dagang akan menghentikan pasokan karet, minyak, dan melenyapkan divisi darat yang sedang berlayar di laut.',
    keyPoints: [
      {
        heading: 'Gugus Tugas Pemburu Kapal Selam (ASW Escort Task Force)',
        description: 'Bentuk armada kecil yang terdiri dari 6-8 Destroyer murah. Lengkapi Destroyer dengan modul "Sonar", "Depth Charges" (Bom Laut), dan radar terbaik. Tugaskan mereka pada misi "Convoy Escort" di zona laut yang dilalui rute dagang konvoimu.',
        tags: ['ASW', 'Anti Submarine', 'Convoy Escort', 'Depth Charge']
      },
      {
        heading: 'Fitur Pemblokiran Rute Laut (Sea Zone Access Restriction)',
        description: 'Klik pada zona laut di peta (misal Selat Inggris atau Samudra Atlantik Barat). Di panel bawah, klik tombol akses: ubah dari Hijau (Bebas) menjadi Merah (Dilarang/Avoided). Semua konvoi dagang dan transportasi pasukanmu akan otomatis berlayar memutar menghindari zona berbahaya yang dipenuhi ranjau dan U-boat lawan!',
        proTip: 'Menutup Selat Inggris untuk konvoi Sekutu dan mengalihkannya memutari utara Skotlandia menyelamatkan ratusan konvoi dari pembom Stuka Jerman.',
        tags: ['Blokir Rute', 'Sea Zone Restriction']
      },
      {
        heading: 'Produksi Cadangan Konvoi yang Sehat',
        description: 'Selalu alokasikan minimal 2-4 galangan kapal (Dockyards) untuk terus memproduksi konvoi tanpa henti. Cadangan konvoi minimal yang aman selama perang laut aktif adalah 400-600 konvoi di gudang.',
        tags: ['Stok Konvoi', 'Galangan Kapal']
      }
    ],
    summaryTips: [
      'Gunakan pesawat Naval Bomber bertipe Patroli Maritim dari pangkalan darat terdekat untuk mendeteksi dan menenggelamkan kapal selam musuh dari udara.',
      'Jangan pernah memindahkan divisi infanteri lewat laut tanpa memastikan zona perairan tersebut dikawal kapal tempur pengawal.'
    ]
  },

  // ==================== TAMBAHAN PANDUAN BARU AHLI ====================
  {
    id: 'g-ahli-15',
    level: 'ahli',
    title: 'Trik Antrean Rekrutmen Tanpa Batas & Penimbunan Manpower (Queue Hoarding)',
    subtitle: 'Sembunyikan ratusan ribu manpower di antrean rekrutmen sebelum terkena demobilisasi atau event pengurangan populasi.',
    iconName: 'Users',
    category: 'Militer Darat',
    readTimeMinutes: 4,
    relatedCommand: 'manpower 500000',
    overview: 'Dalam HOI4, saat kamu menempatkan divisi ke dalam antrean rekrutmen (Training Queue), manpower langsung ditarik dari cadangan nasional ke kamp pelatihan. Eksploitasi taktis ini memungkinkan pemain veteran "mengunci" manpower sebelum terjadi perubahan hukum wajib militer atau event demobilisasi pasca-perang.',
    keyPoints: [
      {
        heading: 'Mekanisme Penarikan Manpower ke Antrean Latihan',
        description: 'Jika kamu memiliki 500.000 manpower bebas dan antrean pelatihan divisi infanteri dibuka untuk 50 divisi, seluruh 500.000 prajurit tersebut langsung ditarik ke dalam barak pelatihan meskipun kamu sama sekali TIDAK memiliki persediaan senapan untuk mereka.',
        tags: ['Queue Hoarding', 'Eksploitasi Barak', 'Manpower Trick']
      },
      {
        heading: 'Perlindungan Manpower dari Hukum Demobilisasi Pasca-Perang',
        description: 'Jika perjanjian damai selesai dan negaramu dipaksa menurunkan hukum wajib militer dari Extensive ke Volunteer Only (yang biasanya menghapus jutaan manpower yang tidak termobilisasi), simpan seluruh manpower-mu di antrean pelatihan divisi raksasa! Setelah hukum berubah, batalkan antrean untuk mengembalikan prajurit ke cadangan tanpa terpotong.',
        proTip: 'Manpower yang sudah berada di barak pelatihan tidak terpengaruh oleh batas hukum conscription yang baru.',
        tags: ['Anti Demobilisasi', 'Penguncian Manpower']
      },
      {
        heading: 'Pengerahan Darurat Saat Diserang Mendadak (Early Deploy)',
        description: 'Divisi di antrean pelatihan dapat dikerahkan ke peta (Deploy) segera setelah mencapai 20% pelatihan. Meskipun mereka berstatus Green (-25% penalti tempur), mereka dapat langsung menduduki parit dan kota strategis untuk menahan serangan kilat musuh selagi menunggu pasukan utama tiba.',
        warning: 'Divisi yang dikerahkan dini pada level 20% memiliki HP dan organisasi rendah; segera hentikan ofensif dan biarkan mereka menggali parit pertahanan.',
        tags: ['Early Deploy', 'Pengerahan Cepat']
      }
    ],
    summaryTips: [
      'Gunakan template divisi ber-manpower tinggi (seperti 25 batalion infanteri) sebagai "wadah penampung" sementara jika ingin menimbun manpower dalam jumlah raksasa.',
      'Begitu kamu membutuhkan manpower kembali ke cadangan, cukup klik tombol silang merah pada baris antrean pelatihan.'
    ]
  },
  {
    id: 'g-ahli-16',
    level: 'ahli',
    title: 'Meta Mechanized Infantry & Amtrac: Benteng Berjalan Anti-Soft Attack',
    subtitle: 'Rasio Hardness 70-85% dan HP luar biasa untuk membatalkan 80% serangan infanteri dan menembus sungai berlumpur.',
    iconName: 'Shield',
    category: 'Militer Darat',
    readTimeMinutes: 5,
    relatedDivisionSearch: 'mechanized',
    overview: 'Mechanized Infantry (Infanteri Mekanis) dan Amtrac (Traktor Amfibi Lapis Baja) adalah unit darat terkuat di HOI4 pada paruh akhir perang. Dengan nilai Hardness yang mencapai 85%, mereka mengubah formula tempur musuh sehingga sebagian besar Soft Attack lawan yang masif menjadi sama sekali tidak berguna.',
    keyPoints: [
      {
        heading: 'Formula Pertahanan Hardness: Menetralkan Soft Attack Lawan',
        description: 'Jika divisi musuh memiliki 1.000 Soft Attack dan 100 Hard Attack, mereka akan menghancurkan infanteri biasa. Tetapi melawan divisimu yang memiliki Hardness 80%, hanya 20% Soft Attack (200) dan 80% Hard Attack (80) yang dihitung! Divisi mekanismu hanya menerima total 280 serangan, memotong lebih dari 70% kerusakan secara instan!',
        tags: ['Hardness Formula', 'Mechanized', 'Kalkulasi Tempur']
      },
      {
        heading: 'Kekuatan Amtrac untuk Menembus Sungai & Pendaratan Pantai',
        description: 'Amtrac (Amphibious Tractor) menggabungkan armor lapis baja dengan perlindungan terhadap penalti medan air. Menyerang melintasi sungai atau mendarat dari laut biasanya memberi penalti hingga -50%, namun Amtrac justru memberikan bonus serang melintasi sungai (+20%) dan rawa (+15%).',
        proTip: 'Pasangkan 6 Amtrac dengan 8 Medium Tank amfibi untuk menciptakan divisi penerobos sungai yang mustahil dihentikan di garis Stalin Line atau sungai Rhine.',
        tags: ['Amtrac', 'Penerobos Sungai', 'Amfibi']
      },
      {
        heading: 'Efisiensi Nilai Hit Points (HP) dan Penghematan Manpower',
        description: 'Mechanized Infantry memiliki stat HP tertinggi di antara semua batalion di HOI4 (25-30 HP per batalion dibanding hanya 2 HP pada tank). Nilai HP yang tinggi ini memastikan divisi lapis bajamu kehilangan sangat sedikit prajurit dan peralatan mahal saat menerima tembakan meriam musuh.',
        tags: ['Stat HP', 'Konservasi Pasukan']
      }
    ],
    summaryTips: [
      'Turunkan biaya IC Mechanized di Tank Designer atau MIO (Military Industrial Organization) untuk mempercepat produksinya secara massal pada tahun 1942.',
      'Sertakan Support Maintenance dan Flame Tank untuk memaksimalkan efisiensi terobosan divisi mekanis di segala jenis medan.'
    ]
  },
  {
    id: 'g-ahli-17',
    level: 'ahli',
    title: 'Serangan Logistik Udara (Logistical Strike) & Penghancuran Kereta Api Lawan',
    subtitle: 'Gunakan misi CAS & Tactical Bomber untuk meledakkan rel kereta api, truk, dan lokomotif hingga suplai musuh nol dalam 48 jam.',
    iconName: 'Zap',
    category: 'Udara & CAS',
    readTimeMinutes: 4,
    relatedDivisionSearch: 'air',
    overview: 'Mengapa harus menabrak benteng beton musuh jika kamu bisa membuat mereka mati kelaparan tanpa peluru? Misi Logistical Strike adalah taktik perang udara paling menghancurkan di HOI4: menghancurkan infrastruktur rel, meledakkan lokomotif kereta api musuh, dan membuat seluruh garis depan musuh menderita debuff Attrition 100%.',
    keyPoints: [
      {
        heading: 'Mekanisme Misi Logistical Strike',
        description: 'Pilih wing pesawat Tactical Bomber atau CAS. Klik tombol misi "Logistical Strike" (ikon jalur rel/kereta api). Pesawatmu akan secara spesifik membidik lokomotif kereta api musuh, jembatan, dan jaringan rel yang menghubungkan ibukota musuh dengan garis perbatasan mereka.',
        proTip: 'Menghancurkan cadangan lokomotif musuh hingga 0 mematikan SELURUH distribusi suplai kereta api mereka di seluruh penjuru dunia!',
        tags: ['Logistical Strike', 'Kereta Api', 'Suplai Lumpuh']
      },
      {
        heading: 'Efek Berantai Terhadap Organisasi & Kecepatan Musuh',
        description: 'Saat jalur rel putus, Supply Hub musuh terputus dari jaringan logistik. Dalam waktu 48 jam, divisi musuh di garis depan akan kehabisan makanan dan amunisi: Kecepatan gerak musuh turun hingga 1 km/jam, pertahanan runtuh -50%, dan mereka tidak dapat meregenerasi Organization sama sekali.',
        tags: ['Debuff Putus Suplai', 'Stok Amunisi Habis']
      },
      {
        heading: 'Desain Pesawat Khusus Pembasmi Kereta Api',
        description: 'Di Aircraft Designer, pasang modul "Anti-Tank Cannon" atau "Small Bomb Bay" yang memiliki stat Ground Attack tinggi. Pasang Armor Plate dan Drop Tanks untuk jangkauan operasional mendalam ke belakang garis musuh.',
        warning: 'Pastikan kamu memiliki Fighter pengawal dengan Air Superiority minimal 60% sebelum meluncurkan misi Logistical Strike agar pesawat pengebommu tidak dibantai oleh pencegat musuh.',
        tags: ['Desain Pesawat CAS', 'Aircraft Designer']
      }
    ],
    summaryTips: [
      'Gunakan Logistical Strike di front Rusia (Barbarossa) untuk melumpuhkan pertahanan Tentara Merah di Sungai Dnieper tanpa membuang nyawa pasukan darat.',
      'Pantau jumlah lokomotif musuh yang hancur melalui tab Air War Details (shortcut L).'
    ]
  },
  {
    id: 'g-ahli-18',
    level: 'ahli',
    title: 'Pasar Senjata Internasional (Arms Market): Ekspor & Impor Senjata Darurat',
    subtitle: 'DLC Arms Against Tyranny: Beli senapan dan pesawat bekas dengan pabrik sipil untuk menutupi defisit secara kilat.',
    iconName: 'Factory',
    category: 'Ekonomi & Industri',
    readTimeMinutes: 4,
    relatedCommand: 'ic',
    overview: 'Fitur Arms Market dari DLC Arms Against Tyranny memungkinkan negara manapun membeli dan menjual persenjataan militer di pasar global. Jika kamu mengalami defisit mendadak 10.000 senapan infanteri atau membutuhkan 200 pesawat tempur tambahan, kamu dapat membelinya langsung dari negara lain menggunakan alokasi pabrik sipil sementara.',
    keyPoints: [
      {
        heading: 'Cara Membeli Senjata di International Market',
        description: 'Buka tab Arms Market (ikon koin & senjata di bilah atas). Pilih kategori senjata yang dibutuhkan (misal Infanteri, Artileri, Pesawat, Tank). Pilih penawaran dari negara yang memiliki opini diplomatik bersahabat denganmu. Tentukan jumlah pesanan dan tetapkan berapa banyak Pabrik Sipil (Civs) yang kamu alokasikan untuk membayar kontrak pembelian.',
        tags: ['Arms Market', 'Beli Senjata', 'Impor Senjata']
      },
      {
        heading: 'Kecepatan Pengiriman vs Biaya Pabrik Sipil',
        description: 'Semakin banyak pabrik sipil yang kamu alokasikan ke kontrak (misal 5 Civs), semakin cepat senjata tersebut dikirim ke gudang stockpile-mu. Begitu seluruh senjata terkirim, pabrik sipil tersebut otomatis kembali ke kendalimu untuk proyek konstruksi.',
        proTip: 'Membeli senjata di pasar internasional adalah cara terbaik bagi negara minor yang industri militernya kecil untuk memiliki tank dan pesawat tempur modern.',
        tags: ['Kecepatan Kontrak', 'Alokasi Civs']
      },
      {
        heading: 'Menjual Persenjataan Usang untuk Meraup Pabrik Sipil Ekstra',
        description: 'Jika kamu memiliki 50.000 senapan tier 1 (Weapons I) usang di gudang yang tidak terpakai, masukkan senjata tersebut ke pasar jual (Create Market Listing). Negara lain yang membutuhkan senjata akan membelinya, dan mereka WAJIB memberimu pabrik sipil gratis selama masa pembayaran kontrak!',
        warning: 'Jangan menjual senjata canggih ke negara yang berpotensi menjadi musuhmu di kemudian hari.',
        tags: ['Ekspor Senjata', 'Pabrik Gratis']
      }
    ],
    summaryTips: [
      'Gunakan Arms Market untuk membuang tank dan pesawat rampasan perang (Captured Equipment) yang tidak cocok dengan doktrinmu demi mendapatkan pabrik sipil.',
      'Pastikan rute laut ke negara penjual aman dari sergapan kapal selam agar kargo pengiriman senjata tidak karam di samudra.'
    ]
  }
];


