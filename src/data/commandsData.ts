import { CommandItem, CommandCategory } from '../types';

export const POPULAR_COUNTRY_TAGS = [
  { tag: 'GER', name: 'Jerman (German Reich)', ideology: 'Fascism' },
  { tag: 'SOV', name: 'Uni Soviet (USSR)', ideology: 'Communism' },
  { tag: 'USA', name: 'Amerika Serikat (USA)', ideology: 'Democratic' },
  { tag: 'ENG', name: 'Inggris Raya (United Kingdom)', ideology: 'Democratic' },
  { tag: 'FRA', name: 'Prancis (France)', ideology: 'Democratic' },
  { tag: 'ITA', name: 'Italia (Italy)', ideology: 'Fascism' },
  { tag: 'JAP', name: 'Kekaisaran Jepang (Japan)', ideology: 'Fascism' },
  { tag: 'POL', name: 'Polandia (Poland)', ideology: 'Non-Aligned' },
  { tag: 'CHI', name: 'Tiongkok Nasionalis (China)', ideology: 'Non-Aligned' },
  { tag: 'PRC', name: 'Tiongkok Komunis (PRC)', ideology: 'Communism' },
  { tag: 'RAJ', name: 'India Britania (British Raj)', ideology: 'Non-Aligned' },
  { tag: 'CAN', name: 'Kanada (Canada)', ideology: 'Democratic' },
  { tag: 'AST', name: 'Australia', ideology: 'Democratic' },
  { tag: 'SPR', name: 'Spanyol (Republik / Nasionalis)', ideology: 'Democratic' },
  { tag: 'FIN', name: 'Finlandia (Finland)', ideology: 'Non-Aligned' },
  { tag: 'SWE', name: 'Swedia (Sweden)', ideology: 'Democratic' },
  { tag: 'TUR', name: 'Turki (Turkey)', ideology: 'Non-Aligned' },
  { tag: 'ROM', name: 'Rumania (Romania)', ideology: 'Non-Aligned' },
  { tag: 'HUN', name: 'Hungaria (Hungary)', ideology: 'Non-Aligned' },
  { tag: 'YUG', name: 'Yugoslavia', ideology: 'Non-Aligned' },
  { tag: 'INS', name: 'Hindia Belanda / Indonesia', ideology: 'Democratic' },
];

export const COMMANDS_DATA: CommandItem[] = [
  // ==================== POLITIK & STABILITAS ====================
  {
    id: 'cmd-pp',
    title: 'Tambah Political Power (PP)',
    code: 'pp 1000',
    description: 'Menambahkan poin Political Power untuk merekrut menteri, mengganti hukum ekonomi/wajib militer, dan mengambil keputusan nasional.',
    category: 'Politik & Stabilitas',
    parameterTemplate: 'pp {amount}',
    quickArgs: [{ label: 'Jumlah PP', defaultVal: '1000', placeholder: '1000' }],
    popular: true
  },
  {
    id: 'cmd-st',
    title: 'Tambah Stabilitas (Stability)',
    code: 'st 100',
    description: 'Mengatur atau menambahkan stabilitas negara hingga batas maksimal (100%). Menghindari pemogokan buruh dan mendongkrak efisiensi pabrik.',
    category: 'Politik & Stabilitas',
    parameterTemplate: 'st {amount}',
    quickArgs: [{ label: 'Jumlah (%)', defaultVal: '100', placeholder: '100' }],
    popular: true
  },
  {
    id: 'cmd-ws',
    title: 'Tambah War Support (Dukungan Perang)',
    code: 'ws 100',
    description: 'Meningkatkan dukungan rakyat terhadap perang hingga 100%. Memungkinkan penetapan hukum ekonomi perang dan wajib militer darurat.',
    category: 'Politik & Stabilitas',
    parameterTemplate: 'ws {amount}',
    quickArgs: [{ label: 'Jumlah (%)', defaultVal: '100', placeholder: '100' }],
    popular: true
  },
  {
    id: 'cmd-yesman',
    title: 'AI Menerima Semua Tawaran (Yesman)',
    code: 'yesman',
    description: 'Membuat semua negara AI menerima permintaan diplomasi apa pun (ajakan aliansi, pakta non-agresi, akses militer, perdagangan, atau tuntutan damai). Ketik lagi untuk mematikan.',
    category: 'Politik & Stabilitas',
    popular: true
  },
  {
    id: 'cmd-allowdiplo',
    title: 'Buka Semua Opsi Diplomasi Bebas (Allowdiplo)',
    code: 'allowdiplo',
    description: 'Membuka kunci semua aksi diplomasi tanpa memedulikan batas ideologi atau World Tension. Memungkinkan deklarasi perang instan.',
    category: 'Politik & Stabilitas',
    popular: true
  },
  {
    id: 'cmd-cp',
    title: 'Tambah Command Power',
    code: 'cp 100',
    description: 'Menambahkan Command Power militer (maks 100) untuk mempromosikan jenderal, memberi kemampuan komando tempur, atau melatih atase militer.',
    category: 'Politik & Stabilitas',
    parameterTemplate: 'cp {amount}',
    quickArgs: [{ label: 'Jumlah CP', defaultVal: '100', placeholder: '100' }]
  },

  // ==================== MILITER & MANPOWER ====================
  {
    id: 'cmd-manpower',
    title: 'Tambah Tenaga Manusia (Manpower)',
    code: 'manpower 1000000',
    description: 'Menambahkan cadangan tentara/populasi militer untuk melatih divisi baru dan mengganti prajurit yang gugur di garis depan.',
    category: 'Militer & Manpower',
    parameterTemplate: 'manpower {amount}',
    quickArgs: [{ label: 'Jumlah Manpower', defaultVal: '1000000', placeholder: '1000000' }],
    popular: true
  },
  {
    id: 'cmd-xp',
    title: 'Tambah Experience Darat, Laut & Udara (XP)',
    code: 'gain_xp 500',
    description: 'Menambahkan poin Army XP, Navy XP, dan Air XP sekaligus untuk merancang tank baru, modifikasi kapal/pesawat, dan membuka doktrin.',
    category: 'Militer & Manpower',
    parameterTemplate: 'gain_xp {amount}',
    quickArgs: [{ label: 'Jumlah XP', defaultVal: '500', placeholder: '500' }],
    popular: true
  },
  {
    id: 'cmd-fuel',
    title: 'Isi Bahan Bakar Penuh (Fuel)',
    code: 'fuel 1000000',
    description: 'Mengisi tangki cadangan minyak dan bahan bakar negaramu hingga maksimal agar tank, armada laut, dan pesawat tidak kehabisan bensin.',
    category: 'Militer & Manpower',
    parameterTemplate: 'fuel {amount}',
    quickArgs: [{ label: 'Jumlah Fuel', defaultVal: '1000000', placeholder: '1000000' }]
  },
  {
    id: 'cmd-add-equipment',
    title: 'Tambah Stok Peralatan Paling Mutakhir',
    code: 'add_latest_equipment 50000',
    description: 'Secara otomatis memasukkan puluhan ribu senapan, artileri, tank, pesawat, dan truk model tercanggih yang sudah kamu riset ke dalam gudang logistik.',
    category: 'Militer & Manpower',
    parameterTemplate: 'add_latest_equipment {amount}',
    quickArgs: [{ label: 'Jumlah Stok', defaultVal: '50000', placeholder: '50000' }],
    popular: true
  },
  {
    id: 'cmd-delall',
    title: 'Hapus Seluruh Tentara & Armada Negara Lawan',
    code: 'delall SOV',
    description: 'Menghapus total semua divisi tentara, skuadron pesawat, dan kapal perang dari negara target. Sangat ampuh untuk mengosongkan pertahanan musuh!',
    category: 'Militer & Manpower',
    parameterTemplate: 'delall {TAG}',
    quickArgs: [{ label: 'Tag Negara Target', defaultVal: 'SOV', placeholder: 'SOV' }],
    warning: 'Hati-hati: jangan memasukkan tag negaramu sendiri karena seluruh pasukanmu akan langsung lenyap.'
  },
  {
    id: 'cmd-teleport',
    title: 'Mode Teleportasi Pasukan (TP)',
    code: 'teleport',
    description: 'Mengaktifkan mode teleportasi. Pilih divisi apa saja, lalu klik kanan pada provinsi mana pun di dunia untuk langsung memindahkan mereka tanpa jeda.',
    category: 'Militer & Manpower'
  },
  {
    id: 'cmd-instant-prepare',
    title: 'Persiapan Invasi Laut Instan',
    code: 'instant_prepare',
    description: 'Menghilangkan waktu tunggu persiapan invasi amfibi angkatan laut (Naval Invasion). Pasukan marinirmu bisa langsung berlayar seketika.',
    category: 'Militer & Manpower'
  },

  // ==================== RISET & PRODUKSI ====================
  {
    id: 'cmd-ic',
    title: 'Konstruksi Instan (Instant Construction)',
    code: 'ic',
    description: 'Pabrik, benteng, pangkalan udara, rel kereta, dan galangan kapal selesai dibangun hanya dalam 1 hari atau 1 klik! Ketik lagi untuk mematikan.',
    category: 'Riset & Produksi',
    warning: 'PERINGATAN: Cheat ini juga mempengaruhi AI! Pause game terlebih dahulu, antrekan bangunanmu, biarkan 1 hari lewat, lalu matikan cheat sebelum unpause lama.',
    popular: true
  },
  {
    id: 'cmd-research-all',
    title: 'Buka Semua Riset Teknologi (Research All)',
    code: 'research all',
    description: 'Membuka seluruh pohon teknologi (tank modern, jet, kapal induk nuklir, artileri, industri) seketika.',
    category: 'Riset & Produksi',
    warning: 'Akan membuka teknologi masa depan secara instan dan tidak bisa di-undo tanpa memuat save data lama.',
    popular: true
  },
  {
    id: 'cmd-research-click',
    title: 'Riset Instan dengan Satu Klik',
    code: 'research_on_icon_click',
    description: 'Mengaktifkan mode riset klik. Cukup klik ikon teknologi apa saja di pohon riset untuk langsung membukanya seketika tanpa waktu tunggu.',
    category: 'Riset & Produksi',
    popular: true
  },
  {
    id: 'cmd-focus-auto',
    title: 'Fokus Nasional Selesai Otomatis (FA)',
    code: 'focus.autocomplete',
    description: 'Setiap kali kamu memilih Fokus Nasional (National Focus), fokus tersebut langsung selesai dalam 1 hari alih-alih menunggu 70 hari.',
    category: 'Riset & Produksi',
    popular: true
  },
  {
    id: 'cmd-focus-nochecks',
    title: 'Abaikan Syarat Fokus Nasional (FNC)',
    code: 'focus.nochecks',
    description: 'Mengabaikan semua prasyarat Fokus Nasional, memungkinkanmu mengambil jalur fokus mana pun secara bebas.',
    category: 'Riset & Produksi'
  },
  {
    id: 'cmd-decision-nochecks',
    title: 'Abaikan Syarat Keputusan (Decision No Checks)',
    code: 'decision.nochecks',
    description: 'Memungkinkanmu menekan dan mengeksekusi keputusan nasional apa pun di tab Keputusan tanpa memenuhi prasyarat.',
    category: 'Riset & Produksi'
  },

  // ==================== PETA & DIPLOMASI ====================
  {
    id: 'cmd-annex',
    title: 'Caplok Wilayah Negara Lain (Annex)',
    code: 'annex POL',
    description: 'Langsung mencaplok seluruh wilayah negara target secara instan tanpa perlu perang atau konferensi damai.',
    category: 'Peta & Diplomasi',
    parameterTemplate: 'annex {TAG}',
    quickArgs: [{ label: 'Tag Negara Target', defaultVal: 'POL', placeholder: 'POL' }],
    popular: true
  },
  {
    id: 'cmd-tag',
    title: 'Ganti Kontrol Negara Pemain (Tag Switch)',
    code: 'tag ENG',
    description: 'Mengalihkan kendali pemain ke negara lain secara langsung di tengah permainan (misal beralih ke Inggris, Uni Soviet, atau AS).',
    category: 'Peta & Diplomasi',
    parameterTemplate: 'tag {TAG}',
    quickArgs: [{ label: 'Tag Negara', defaultVal: 'ENG', placeholder: 'ENG' }],
    popular: true
  },
  {
    id: 'cmd-tdebug',
    title: 'Tampilkan Informasi Debug Peta (Tdebug)',
    code: 'tdebug',
    description: 'Menampilkan Province ID, State ID, Tag Negara, dan nilai perlawanan di tooltip kursor mouse saat diarahkan ke peta. Sangat berguna untuk modding dan cheat spesifik wilayah.',
    category: 'Peta & Diplomasi',
    popular: true
  },
  {
    id: 'cmd-fow',
    title: 'Buka Kabut Perang (Fog of War)',
    code: 'fow',
    description: 'Menghilangkan kabut perang sehingga seluruh pergerakan tentara, armada kapal, dan pangkalan musuh di seluruh dunia terlihat terang benderang.',
    category: 'Peta & Diplomasi',
    popular: true
  },
  {
    id: 'cmd-whitepeace',
    title: 'Paksa Gencatan Senjata Putih (White Peace)',
    code: 'whitepeace GER SOV',
    description: 'Menghentikan perang antara dua negara yang sedang bertikai dan mengembalikan status ke kondisi damai tanpa perubahan wilayah.',
    category: 'Peta & Diplomasi',
    parameterTemplate: 'whitepeace {TAG1} {TAG2}',
    quickArgs: [
      { label: 'Negara Pertama', defaultVal: 'GER', placeholder: 'GER' },
      { label: 'Negara Kedua', defaultVal: 'SOV', placeholder: 'SOV' }
    ]
  },
  {
    id: 'cmd-civilwar',
    title: 'Picu Perang Saudara (Civil War)',
    code: 'civilwar fascism USA',
    description: 'Memicu perang saudara instan dengan ideologi tertentu (fascism, communism, democratic, neutrality) pada negara sasaran.',
    category: 'Peta & Diplomasi',
    parameterTemplate: 'civilwar {ideology} {TAG}',
    quickArgs: [
      { label: 'Ideologi', defaultVal: 'fascism', placeholder: 'fascism' },
      { label: 'Tag Negara', defaultVal: 'USA', placeholder: 'USA' }
    ]
  },

  // ==================== DEBUG & KHUSUS ====================
  {
    id: 'cmd-nuke',
    title: 'Tambah Bom Atom Nuklir',
    code: 'nuke 10',
    description: 'Menambahkan persediaan bom nuklir ke gudang senjata negaramu siap luncur.',
    category: 'Debug & Khusus',
    parameterTemplate: 'nuke {amount}',
    quickArgs: [{ label: 'Jumlah Nuklir', defaultVal: '10', placeholder: '10' }],
    popular: true
  },
  {
    id: 'cmd-debug-nuking',
    title: 'Jatuhkan Nuklir Tanpa Syarat',
    code: 'debug_nuking',
    description: 'Memungkinkanmu menjatuhkan bom nuklir ke provinsi mana saja di dunia tanpa memerlukan superioritas udara 75% atau pesawat pembom strategis.',
    category: 'Debug & Khusus',
    popular: true
  },
  {
    id: 'cmd-agency-auto',
    title: 'Upgrade Badan Intelijen Instan (Agency)',
    code: 'agency.autocomplete',
    description: 'Menyelesaikan semua proyek upgrade departemen spionase (kriptologi, penyamaran, komando) tanpa menunggu 30 hari.',
    category: 'Debug & Khusus'
  },
  {
    id: 'cmd-weather',
    title: 'Matikan Efek Cuaca (Weather)',
    code: 'weather',
    description: 'Menonaktifkan cuaca buruk (hujan badai, salju beku ekstrem, lumpur Rasputitsa) yang memperlambat pergerakan dan memberi penalti pertempuran.',
    category: 'Debug & Khusus'
  },
  {
    id: 'cmd-observe',
    title: 'Mode Pengamat Bebas (Observe Mode)',
    code: 'observe',
    description: 'Melepaskan kendali negara dan masuk ke mode penonton netral untuk mengamati bagaimana AI bertempur satu sama lain dalam Perang Dunia II.',
    category: 'Debug & Khusus'
  }
];

export const COMMAND_CATEGORIES: CommandCategory[] = [
  {
    id: 'all',
    title: 'Semua Perintah',
    icon: 'Layers',
    description: 'Kumpulan lengkap cheat konsol Hearts of Iron IV',
    commands: COMMANDS_DATA
  },
  {
    id: 'politik',
    title: 'Politik & Stabilitas',
    icon: 'Landmark',
    description: 'Poin PP, stabilitas rakyat, war support, dan diplomasi bebas',
    commands: COMMANDS_DATA.filter(c => c.category === 'Politik & Stabilitas')
  },
  {
    id: 'militer',
    title: 'Militer & Manpower',
    icon: 'Shield',
    description: 'Manpower, suplai senjata mutakhir, bahan bakar, dan XP militer',
    commands: COMMANDS_DATA.filter(c => c.category === 'Militer & Manpower')
  },
  {
    id: 'riset',
    title: 'Riset & Produksi',
    icon: 'Factory',
    description: 'Konstruksi instan, pembuka pohon teknologi, dan fokus nasional instan',
    commands: COMMANDS_DATA.filter(c => c.category === 'Riset & Produksi')
  },
  {
    id: 'peta',
    title: 'Peta & Diplomasi',
    icon: 'MapPin',
    description: 'Pencaplokan instan, ganti negara tag, hilangkan kabut perang, dan tdebug',
    commands: COMMANDS_DATA.filter(c => c.category === 'Peta & Diplomasi')
  },
  {
    id: 'debug',
    title: 'Debug & Khusus',
    icon: 'Terminal',
    description: 'Bom nuklir bebas, spionase instan, kontrol cuaca, dan mode observe',
    commands: COMMANDS_DATA.filter(c => c.category === 'Debug & Khusus')
  }
];
