export interface CommandPostAlert {
  id: string;
  category: 'resources' | 'naval' | 'logistics' | 'air';
  priority: 'urgent' | 'strategic' | 'tactical';
  title: string;
  sender: string;
  codeName: string;
  message: string;
  details: string[];
  actionLabel?: string;
  targetTab?: string;
  nationTag?: string;
}

export const COMMAND_POST_ALERTS: CommandPostAlert[] = [
  // ==================== NAVAL POSITIONING & COMBAT TIPS ====================
  {
    id: 'naval-screen-ratio-4-1',
    category: 'naval',
    priority: 'urgent',
    codeName: 'TELEGRAM AL-88/GOLDEN-RATIO',
    sender: 'Departemen Operasi Angkatan Laut (Admiralty Operations)',
    title: 'Rasio Emas Skrining Armada Laut 4:1 (Screen-to-Capital Ratio)',
    message: 'Jangan pernah mengerahkan Kapal Tempur (Battleship) atau Kapal Induk (Carrier) tanpa perlindungan minimal 4 Kapal Skrining (Destroyer / Light Cruiser) per 1 Capital Ship.',
    details: [
      'Jika efisiensi skrining jatuh di bawah 100%, torpedo kapal selam dan perusak musuh akan menembus langsung ke kapal induk dan kapal tempur tanpa hambatan.',
      'Rekomendasi armada aman: 1 Battleship/Carrier didampingi 4-6 Destroyer bersenjata Depth Charge & Torpedo.',
      'Pastikan kecepatan skrining tidak lebih lambat dari 28 knot agar tidak tertinggal saat manuver mengurung.'
    ],
    actionLabel: 'Buka Desainer Armada',
    targetTab: 'naval_designer'
  },
  {
    id: 'naval-strike-force-positioning',
    category: 'naval',
    priority: 'strategic',
    codeName: 'KAWAT MARKAS-STRIKE-PORT',
    sender: 'Pusat Komando Armada Tempur Gabungan',
    title: 'Posisi Pangkalan Armada Pemukul (Strike Force)',
    message: 'Tugaskan armada utama Anda pada misi "Strike Force" dan tempatkan di pelabuhan pangkalan berfasilitas level 8-10 yang berbatasan langsung dengan laut pertempuran.',
    details: [
      'Misi Strike Force tetap bersandar di pelabuhan untuk menghemat 100% konsumsi bahan bakar (Fuel) sampai satuan Patroli mendeteksi armada musuh.',
      'Jika pangkalan terlalu jauh, armada pemukul akan terlambat mencegat sebelum pertempuran laut selesai.',
      'Pilih pangkalan dengan perlindungan Anti-Air (AA) level tinggi untuk menangkal serangan udara naval strike pelabuhan.'
    ],
    actionLabel: 'Buka Desainer Armada',
    targetTab: 'naval_designer'
  },
  {
    id: 'naval-patrol-task-force',
    category: 'naval',
    priority: 'tactical',
    codeName: 'DISPATCH-PATROL-FLOATPLANE',
    sender: 'Seksi Pengintaian Udara-Maritim',
    title: 'Satuan Patroli Terpisah & Aturan "Jangan Terlibat"',
    message: 'Bentuk gugus tugas patroli kecil (1-2 Light Cruiser berspesifikasi Radar & Catapult Floatplane) dengan aturan keterlibatan "Do Not Engage" (Jangan Terlibat).',
    details: [
      'Tugas patroli HANYA mendeteksi musuh hingga level kepastian 100%, bukan bertempur.',
      'Aturan "Never Engage" mencegah cruiser intai berharga Anda ditenggelamkan oleh armada tempur berat lawan sebelum armada pemukul tiba.',
      'Kecepatan minimal kapal patroli harus di atas 33 knot untuk meloloskan diri jika disergap.'
    ],
    actionLabel: 'Buka Desainer Armada',
    targetTab: 'naval_designer'
  },
  {
    id: 'naval-shallow-waters-penalty',
    category: 'naval',
    priority: 'urgent',
    codeName: 'PERINGATAN MARITIM: PERAIRAN DANGKAL',
    sender: 'Staf Hidrografi & Navigasi Perang',
    title: 'Penalti Positioning di Perairan Sempit (Shallow Waters / Selat Dover)',
    message: 'Hindari mengerahkan armada kapal tempur berat (Heavy Battleship & Super-Heavy) ke perairan dangkal seperti Selat Dover (English Channel) atau Laut Baltik.',
    details: [
      'Perairan sempit memberikan penalti Positioning hingga -30% hingga -50% bagi kapal berlambung besar, melipatgandakan peluang terkena torpedo.',
      'Gunakan kapal selam, perusak lincah, dan sayap pembom laut darat (Naval Bomber) untuk mengontrol perairan sempit ini.',
      'Armada berat sebaiknya dipusatkan di perairan dalam (Ocean / Deep Ocean) seperti Samudra Atlantik Utara atau Pasifik Tengah.'
    ],
    actionLabel: 'Buka Desainer Armada',
    targetTab: 'naval_designer'
  },
  {
    id: 'naval-carrier-cap-limit',
    category: 'naval',
    priority: 'strategic',
    codeName: 'DOKTRIN KAPAL INDUK: ATURAN 4-CARRIER',
    sender: 'Komando Armada Sayap Laut Pasifik',
    title: 'Batas Maksimal 4 Kapal Induk per Gugus Tugas Tempur',
    message: 'Jangan pernah menyatukan lebih dari 4 Kapal Induk (Aircraft Carrier) dalam satu armada tempur laut untuk menghindari penalti kepadatan udara.',
    details: [
      'Membawa 5 kapal induk menimbulkan penalti sortie -20%, dan 6 kapal induk menimbulkan penalti hingga -40% efektivitas sayap tempur.',
      'Rasio pesawat ideal di atas dek kapal induk: 50% Naval Bomber (penghancur lambung), 35% Carrier Fighter (supremasi udara laut), 15% CAS.',
      'Jika Anda memiliki 8 kapal induk, pisahkan menjadi dua armada tempur terpisah di zona laut berbeda.'
    ],
    actionLabel: 'Buka Desainer Armada',
    targetTab: 'naval_designer'
  },
  {
    id: 'naval-convoy-raiding-chokepoints',
    category: 'naval',
    priority: 'tactical',
    codeName: 'INTELIJEN MARITIM: CHOKEPOINT MALAKA',
    sender: 'Komando Armada Kapal Selam Bawah Air',
    title: 'Titik Pencegatan Konvoi Mematikan (Convoy Raiding Chokepoints)',
    message: 'Posisikan kapal selam U-boat pada chokepoint kritis dunia untuk memutus suplai karet, tungsten, dan minyak lawan.',
    details: [
      'Chokepoint paling mematikan: Selat Malaka (memutus karet Hindia Belanda ke Sekutu), Celah Teluk Biskaya, dan Tanjung Harapan (Afrika Selatan).',
      'Atur doktrin kapal selam ke "Trade Interdiction" untuk memaksimalkan faktor siluman (stealth) dan laju tembak torpedo.',
      'Hindari menugaskan kapal selam di zona laut dengan supremasi udara musuh tinggi karena pembom laut darat akan membantai mereka.'
    ],
    actionLabel: 'Buka Desainer Armada',
    targetTab: 'naval_designer'
  },
  {
    id: 'naval-shore-bombardment',
    category: 'naval',
    priority: 'strategic',
    codeName: 'TAKTIK AMFIBI: SHORE BOMBARDMENT',
    sender: 'Komando Pendaratan Korps Marinir',
    title: 'Pemboman Pantai Mengurangi Stat Musuh hingga -25%',
    message: 'Sebelum meluncurkan invasi amfibi, posisikan kapal tempur tua (Battleship / Heavy Cruiser) di garis pantai pendaratan untuk memicu efek Shore Bombardment.',
    details: [
      'Shore Bombardment memotong serangan darat (Soft Attack) dan pertahanan divisi garnisun pantai musuh hingga maksimal -25%.',
      'Pastikan juga ada pesawat CAS dan Air Superiority di atas provinsi pendaratan untuk melumpuhkan entrenchment bunker pantai musuh.',
      'Gunakan divisi Marinir dengan Support Engineer dan Amphibious Tank untuk menembus benteng Atlantik / Pasifik.'
    ],
    actionLabel: 'Buka Battle Planner',
    targetTab: 'battle_planner'
  },

  // ==================== RESOURCE MANAGEMENT TIPS ====================
  {
    id: 'res-rubber-synthetic-crisis',
    category: 'resources',
    priority: 'urgent',
    codeName: 'DARURAT LOGISTIK: KRISIS PASOKAN KARET',
    sender: 'Kementerian Amunisi & Industri Perang',
    title: 'Krisis Pasokan Karet (Rubber) & Kilang Minyak Sintetis',
    message: 'Karet adalah bahan baku wajib untuk Pesawat Tempur (Fighter), Pembom CAS, dan Truk Bermotor. Defisit karet memotong efisiensi pabrik hingga -50%!',
    details: [
      'Lebih dari 90% karet dunia berada di Malaya & Hindia Belanda. Jika Anda memainkan blok Poros, akses ini akan diblokir oleh armada Sekutu.',
      'Solusi mandiri: Bangun Synthetic Refinery level 2+ di provinsi inti dan selesaikan riset "Rubber Processing" pada pohon teknologi Industri.',
      'Satu pabrik sintetis dengan teknologi 1939 menghasilkan +2 Minyak dan +2 Karet secara mandiri tanpa memerlukan jalur laut konvoi.'
    ],
    actionLabel: 'Buka Peta Sumber Daya',
    targetTab: 'strategic_resources'
  },
  {
    id: 'res-tungsten-medium-tanks',
    category: 'resources',
    priority: 'strategic',
    codeName: 'MEMORANDUM ARSENAL: PASOKAN TUNGSTEN',
    sender: 'Direktorat Pengadaan Material Lapis Baja',
    title: 'Jalur Tungsten Vital untuk Produksi Tank Medium',
    message: 'Setiap lini produksi Tank Medium (Panzer III/IV, T-34, Sherman) dan Artileri Berat menuntut 3 hingga 4 unit Tungsten per pabrik militer.',
    details: [
      'Produsen tungsten terbesar di Eropa adalah Portugal, Spanyol, dan Swedia. Jaga hubungan diplomatik atau kendalikan jalur kereta darat ke Iberia.',
      'Jika jalur laut diblokir Sekutu, impor melalui konvoi akan tenggelam. Prioritaskan rute impor darat yang tidak melewati perairan samudra.',
      'Jika terjadi defisit parah, turunkan sementara alokasi pabrik militer pada tank berat dan beralih ke tank ringan/SPG untuk menghemat tungsten.'
    ],
    actionLabel: 'Buka Peta Sumber Daya',
    targetTab: 'strategic_resources'
  },
  {
    id: 'res-oil-fuel-silos-management',
    category: 'resources',
    priority: 'urgent',
    codeName: 'TELEGRAM ENERGI: CADANGAN BAHAN BAKAR',
    sender: 'Komando Logistik Bahan Bakar Perang',
    title: 'Krisis Minyak Mentah & Manajemen Silo Bahan Bakar (Fuel)',
    message: 'Kapal perang, pesawat tempur, dan divisi tank tidak dapat bertempur tanpa Bahan Bakar (Fuel). Saat bahan bakar habis, stat ofensif anjlok hingga -75%!',
    details: [
      'Minyak mentah (Oil) diubah secara otomatis menjadi cadangan bahan bakar harian berdasarkan kapasitas kilang.',
      'Bangun Fuel Silo di dekat kawasan industri aman untuk memperbesar batas cadangan bahan bakar strategis nasional hingga ratusan hari perang.',
      'Gunakan slider prioritas bahan bakar di tab Logistik: prioritaskan Angkatan Udara (Air Wing) dan Divisi Lapis Baja daripada konvoi laut sekunder.'
    ],
    actionLabel: 'Buka Peta Sumber Daya',
    targetTab: 'strategic_resources'
  },
  {
    id: 'res-infrastructure-extraction-bonus',
    category: 'resources',
    priority: 'tactical',
    codeName: 'PETUNJUK TEKNIS INFRASTRUKTUR-TAMBANG',
    sender: 'Biro Perencanaan Tata Ruang & Pembangunan',
    title: 'Tingkatkan Infrastruktur untuk Bonus Ekstraksi +20%/Level',
    message: 'Membangun infrastruktur di provinsi yang kaya sumber daya alam (seperti Baku, Silesia, Curacao, Texas) akan meningkatkan hasil tambang lokal hingga +20% per level.',
    details: [
      'Level infrastruktur 5 di provinsi tambang baja/minyak dapat menghasilkan puluhan unit sumber daya tambahan tanpa perlu impor pabrik sipil.',
      'Biaya pembangunan infrastruktur jauh lebih murah daripada membangun kilang sintetis baru.',
      'Selesaikan riset "Excavation I-V" di pohon teknologi industri untuk tambahan ekstraksi kumulatif +10% per tingkat riset.'
    ],
    actionLabel: 'Buka Peta Sumber Daya',
    targetTab: 'strategic_resources'
  },
  {
    id: 'res-trade-laws-analysis',
    category: 'resources',
    priority: 'strategic',
    codeName: 'ANALISIS HUKUM PERDAGANGAN INTERNASIONAL',
    sender: 'Dewan Ekonomi & Hubungan Perdagangan',
    title: 'Dilema Free Trade vs War Economy / Limited Exports',
    message: 'Hukum Perdagangan Bebas (Free Trade) memberikan bonus riset +10% dan kecepatan pabrik +15%, namun mengekspor 80% sumber daya alam Anda ke pasar global.',
    details: [
      'Gunakan Free Trade pada tahun 1936-1938 saat masa damai untuk mempercepat kemajuan teknologi dan konstruksi pabrik sipil.',
      'Segera beralih ke "Limited Exports" atau "Closed Economy" saat perang dunia pecah agar sumber daya minyak dan baja tidak tersedot keluar.',
      'Negara dengan sumber daya melimpah seperti AS atau Uni Soviet dapat mempertahankan Export Focus lebih lama daripada Jerman.'
    ],
    actionLabel: 'Buka Master Playbook',
    targetTab: 'master_playbook'
  },
  {
    id: 'res-consumer-goods-ratio',
    category: 'resources',
    priority: 'strategic',
    codeName: 'ARAHAN MOBILISASI INDUSTRI SIPIL',
    sender: 'Kementerian Perekonomian Perang',
    title: 'Hukum Mobilisasi Perang & Rasio Consumer Goods',
    message: 'Pabrik Sipil yang terikat pada Barang Konsumsi (Consumer Goods) tidak dapat digunakan untuk konstruksi. Turunkan persentase ini secepat mungkin.',
    details: [
      'Beralih dari Civilian Economy (35% Consumer Goods) ke War Economy (15% Consumer Goods) membebaskan puluhan pabrik untuk membangun industri militer.',
      'Hukum "Total Mobilization" menurunkan consumer goods menjadi hanya 10%, tetapi memotong manpower sebesar -3%.',
      'Gunakan keputusan politik "Women in the Workforce" untuk memulihkan penalti manpower dari Total Mobilization secara permanen.'
    ],
    actionLabel: 'Buka Master Playbook',
    targetTab: 'master_playbook'
  },
  {
    id: 'res-aluminum-fighter-planes',
    category: 'resources',
    priority: 'urgent',
    codeName: 'PERINGATAN ARSENAL: BAUKSIT & ALUMINIUM',
    sender: 'Departemen Produksi Sayap Udara',
    title: 'Defisit Aluminium Mematikan Produksi Pesawat Tempur',
    message: 'Setiap pesawat tempur Fighter Mk.II menuntut 3 unit Aluminium. Kehilangan akses bauksit Hungaria atau Prancis akan melumpuhkan rantai pasokan pesawat.',
    details: [
      'Tanpa superioritas udara, divisi darat akan terkena penalti pergerakan -50% dan pengeboman CAS terus-menerus.',
      'Amankan tambang bauksit di Hungaria, Yugoslavia, dan Prancis sebelum memulai pertempuran udara skala penuh melawan RAF Sekutu.',
      'Selalu pertahankan surplus minimal +8 Aluminium di inventaris untuk mencegah penalti efisiensi pabrik saat pabrik baru selesai dibangun.'
    ],
    actionLabel: 'Buka Peta Sumber Daya',
    targetTab: 'strategic_resources'
  },

  // ==================== LOGISTICS & SUPPLY POST TIPS ====================
  {
    id: 'logistics-motorization-three-trucks',
    category: 'logistics',
    priority: 'urgent',
    codeName: 'PERINTAH LOGISTIK MEDAN: MOTORISASI HUB',
    sender: 'Inspektorat Jenderal Perbekalan & Jalur Kereta',
    title: 'Tingkatkan Motorisasi Supply Hub ke Simbol "3 Truk"',
    message: 'Jangkauan suplai dari stasiun kereta (Supply Hub) berlipat ganda jika Anda mengklik tombol kuda menjadi simbol Tiga Truk (Full Motorization).',
    details: [
      'Mengaktifkan motorisasi penuh memperluas jangkauan logistik hingga beberapa provinsi di pedalaman Soviet atau pegunungan Balkan.',
      'Pastikan lini produksi truk militer Anda mencukupi, karena motorisasi hub membutuhkan cadangan sekitar 50-100 truk per stasiun.',
      'Hubungkan setiap hub baru dengan jalur kereta api (Railway) minimal level 2 agar pasokan dari ibu kota tidak tersendat.'
    ],
    actionLabel: 'Buka Kalkulator Logistik',
    targetTab: 'logistics_calculator'
  }
];
