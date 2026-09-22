export interface HOI4LeaderTrait {
  id: string;
  name: string;
  type: 'personality' | 'status' | 'military' | 'political';
  description: string;
  icon?: string;
  modifiers: {
    label: string;
    value: string;
    positive?: boolean;
  }[];
}

export interface HOI4AlternateLeader {
  name: string;
  yearRange: string;
  ideology: 'Fascism' | 'Democratic' | 'Communism' | 'Non-Aligned';
  subIdeology: string;
  title: string;
  portraitUrls: string[];
  traits: HOI4LeaderTrait[];
  historicBio: string;
}

export interface HOI4LeaderData {
  tag: string;
  countryName: string;
  countryAdjective: string;
  leaderName: string;
  title: string;
  tenureYears: string;
  ideology: 'Fascism' | 'Democratic' | 'Communism' | 'Non-Aligned';
  subIdeology: string;
  ideologyColor: string;
  portraitUrls: string[];
  traits: HOI4LeaderTrait[];
  politicalPowerGain: string;
  stabilityBonus: string;
  warSupportBonus: string;
  historicBio: string;
  historicQuote: string;
  quoteSpeaker?: string;
  signatureFocus: string;
  countryFlagEmoji: string;
  alternateLeaders?: HOI4AlternateLeader[];
}

export interface MajorLeaderResolvedItem {
  tag: string;
  countryName: string;
  countryAdjective: string;
  countryFlagEmoji: string;
  leaderName: string;
  title: string;
  tenureYears: string;
  ideology: 'Fascism' | 'Democratic' | 'Communism' | 'Non-Aligned';
  subIdeology: string;
  ideologyColor: string;
  resolvedPortraitUrl: string;
  traits: HOI4LeaderTrait[];
  politicalPowerGain: string;
  stabilityBonus: string;
  warSupportBonus: string;
  signatureFocus: string;
  historicQuote: string;
  quoteSpeaker?: string;
  historicBio: string;
  alternateCount: number;
  isAlternateActive?: boolean;
  alternateIndex?: number;
}

export const HOI4_MAJOR_LEADERS: Record<string, HOI4LeaderData> = {
  GER: {
    tag: 'GER',
    countryName: 'Jerman (German Reich)',
    countryAdjective: 'Jerman',
    leaderName: 'Adolf Hitler',
    title: 'Führer und Reichskanzler',
    tenureYears: '1933 – 1945',
    ideology: 'Fascism',
    subIdeology: 'National Socialism',
    ideologyColor: '#b91c1c',
    countryFlagEmoji: '🇩🇪',
    portraitUrls: [
      'https://hoi4.paradoxwikis.com/images/thumb/d/d4/Adolf_Hitler.png/150px-Adolf_Hitler.png',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Hitler_portrait_crop.jpg/300px-Hitler_portrait_crop.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Bundesarchiv_Bild_183-S33880%2C_Adolf_Hitler_retouched.jpg/300px-Bundesarchiv_Bild_183-S33880%2C_Adolf_Hitler_retouched.jpg'
    ],
    politicalPowerGain: '+25%',
    stabilityBonus: '+10%',
    warSupportBonus: '+15%',
    signatureFocus: 'Rhineland -> Anschluss -> Danzig or War',
    historicQuote: 'Kekuatan tidak terletak pada pertahanan melainkan pada serangan yang tak henti-hentinya.',
    quoteSpeaker: 'Adolf Hitler, 1939',
    historicBio: 'Pemimpin Partai Nazi yang memegang kekuasaan mutlak sejak 1933. Memulai re-militerisasi Rhineland pada 1936, mencaplok Austria dan Sudetenland, serta meluncurkan doktrin Blitzkrieg melawan Polandia yang memicu Perang Dunia II di Eropa.',
    traits: [
      {
        id: 'ger_dictator',
        name: 'Diktator (Dictator)',
        type: 'political',
        description: 'Kekuasaan absolut mempercepat konsolidasi aparatur negara dan deklarasi perang.',
        modifiers: [
          { label: 'Perolehan Kekuatan Politik (Daily PP Gain)', value: '+25%', positive: true },
          { label: 'Waktu Justifikasi Target Perang', value: '-25%', positive: true }
        ]
      },
      {
        id: 'ger_cornered_fox',
        name: 'Rubah Terpojok (Cornered Fox)',
        type: 'personality',
        description: 'Meningkatkan kegigihan pertahanan saat wilayah inti tanah air terancam invasi musuh.',
        modifiers: [
          { label: 'Pertahanan di Wilayah Inti (Core Territory Defense)', value: '+10%', positive: true },
          { label: 'Ambang Batas Menyerah (Surrender Limit)', value: '-15%', positive: false }
        ]
      }
    ],
    alternateLeaders: [
      {
        name: 'Hermann Göring',
        yearRange: '1945 (Penerus Reich)',
        ideology: 'Fascism',
        subIdeology: 'Fascism',
        title: 'Reichsmarschall der Luftwaffe',
        portraitUrls: [
          'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Hermann_G%C3%B6ring_1942.jpg/300px-Hermann_G%C3%B6ring_1942.jpg'
        ],
        traits: [
          {
            id: 'goring_air_supremacy',
            name: 'Panglima Udara (Air Marshall)',
            type: 'military',
            description: 'Mengutamakan produksi pesawat tempur dan doktrin superioritas udara.',
            modifiers: [
              { label: 'Efisiensi Produksi Pesawat (Fighter Production)', value: '+10%', positive: true }
            ]
          }
        ],
        historicBio: 'Komandan tertinggi Luftwaffe dan penerus resmi Hitler yang ditunjuk dalam keputusan Reichstag 1939.'
      },
      {
        name: 'Karl Dönitz',
        yearRange: '1945 (Pemerintahan Flensburg)',
        ideology: 'Non-Aligned',
        subIdeology: 'Military Junta',
        title: 'Großadmiral & Reichspräsident',
        portraitUrls: [
          'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Karl_D%C3%B6nitz_1943.jpg/300px-Karl_D%C3%B6nitz_1943.jpg'
        ],
        traits: [
          {
            id: 'donitz_u_boat',
            name: 'Serigala Samudra (Wolfpack Master)',
            type: 'military',
            description: 'Pelopor taktik gerombolan serigala kapal selam U-boat di Atlantik.',
            modifiers: [
              { label: 'Deteksi & Penyerangan Kapal Selam', value: '+15%', positive: true }
            ]
          }
        ],
        historicBio: 'Pemimpin terakhir Jerman pada Mei 1945 yang memimpin penandatanganan kapitulasi tanpa syarat kepada Sekutu.'
      }
    ]
  },

  SOV: {
    tag: 'SOV',
    countryName: 'Uni Soviet (Union of Soviet Socialist Republics)',
    countryAdjective: 'Soviet',
    leaderName: 'Joseph Stalin',
    title: 'Sekretaris Jenderal Partai Komunis & Vozhd',
    tenureYears: '1924 – 1953',
    ideology: 'Communism',
    subIdeology: 'Stalinism (Marxism-Leninism)',
    ideologyColor: '#dc2626',
    countryFlagEmoji: '☭',
    portraitUrls: [
      'https://hoi4.paradoxwikis.com/images/thumb/5/52/Iosif_Stalin.png/150px-Iosif_Stalin.png',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Joseph_Stalin_in_July_1941.jpg/300px-Joseph_Stalin_in_July_1941.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Cropped_Stalin1943.jpg/300px-Cropped_Stalin1943.jpg'
    ],
    politicalPowerGain: '-10% (Awal) / +15% (1942+)',
    stabilityBonus: '+15%',
    warSupportBonus: '+20%',
    signatureFocus: 'The Great Purge -> Lessons of War -> Order No. 227',
    historicQuote: 'Kematian satu orang adalah tragedi, kematian jutaan orang adalah statistik.',
    quoteSpeaker: 'Joseph Stalin',
    historicBio: 'Pemimpin besi Uni Soviet yang mentransformasi negaranya menjadi kekuatan industri berat raksasa dan memimpin perlawanan epik dalam Perang Patriotik Raya melawan invasi Wehrmacht Jerman dari Moskow hingga Berlin.',
    traits: [
      {
        id: 'sov_great_war_hero',
        name: 'Pahlawan Perang Patriotik (Great Patriotic War Leader)',
        type: 'military',
        description: 'Membangkitkan tekad jutaan rakyat pekerja untuk mempertahankan ibu kota dan tanah tumpah darah.',
        modifiers: [
          { label: 'Serangan Divisi di Tanah Air (Core Attack)', value: '+10%', positive: true },
          { label: 'Dukungan Perang (War Support)', value: '+15%', positive: true },
          { label: 'Mobilisasi Manpower Mingguan', value: '+500 jiwa', positive: true }
        ]
      },
      {
        id: 'sov_iron_will',
        name: 'Tekad Besi (Iron Will)',
        type: 'personality',
        description: 'Pemerintahan pusat yang tak tergoyahkan oleh ancaman kekalahan maupun pengeboman strategis.',
        modifiers: [
          { label: 'Batas Kapitulasi (Surrender Limit)', value: '+10%', positive: true },
          { label: 'Stabilitas Politik Nasional', value: '+10%', positive: true }
        ]
      }
    ],
    alternateLeaders: [
      {
        name: 'Georgy Zhukov',
        yearRange: '1943 – 1945 (Panglima Tertinggi)',
        ideology: 'Communism',
        subIdeology: 'Military Stratocracy',
        title: 'Marsekal Uni Soviet',
        portraitUrls: [
          'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Georgy_Zhukov_1945.jpg/300px-Georgy_Zhukov_1945.jpg'
        ],
        traits: [
          {
            id: 'zhukov_deep_battle',
            name: 'Pakar Operasi Jauh (Deep Battle Master)',
            type: 'military',
            description: 'Mempercepat pergerakan mekanis dan terobosan artileri berat.',
            modifiers: [
              { label: 'Kecepatan Terobosan Lapis Baja', value: '+12%', positive: true }
            ]
          }
        ],
        historicBio: 'Jenderal paling terkemuka Tentara Merah yang mempertahankan Moskow, memenangkan Stalingrad, dan memimpin parade kemenangan di Berlin.'
      }
    ]
  },

  USA: {
    tag: 'USA',
    countryName: 'Amerika Serikat (United States of America)',
    countryAdjective: 'Amerika',
    leaderName: 'Franklin D. Roosevelt',
    title: 'Presiden ke-32 Amerika Serikat',
    tenureYears: '1933 – 1945',
    ideology: 'Democratic',
    subIdeology: 'Liberalism',
    ideologyColor: '#2563eb',
    countryFlagEmoji: '🇺🇸',
    portraitUrls: [
      'https://hoi4.paradoxwikis.com/images/thumb/8/86/Franklin_Delano_Roosevelt.png/150px-Franklin_Delano_Roosevelt.png',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/FDR_1944_Color_Portrait.jpg/300px-FDR_1944_Color_Portrait.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/FDR_in_1933.jpg/300px-FDR_in_1933.jpg'
    ],
    politicalPowerGain: '+15%',
    stabilityBonus: '+15%',
    warSupportBonus: '+5% (Awal) / +40% (Pearl Harbor)',
    signatureFocus: 'Continue the New Deal -> Giant Wakes -> Arsenal of Democracy',
    historicQuote: 'Satu-satunya hal yang patut kita takuti adalah ketakutan itu sendiri.',
    quoteSpeaker: 'Franklin D. Roosevelt, Pidato Pelantikan 1933',
    historicBio: 'Presiden AS yang memimpin bangsa keluar dari Depresi Besar melalui program New Deal dan mengubah Amerika menjadi "Gudang Senjata Demokrasi" (Arsenal of Democracy) yang memproduksi ribuan kapal perang, tank, dan pembom untuk Sekutu.',
    traits: [
      {
        id: 'usa_new_deal',
        name: 'Reformator New Deal (New Deal Reformer)',
        type: 'political',
        description: 'Mendorong ekspansi infrastruktur dan kapasitas pabrik sipil di seluruh negara bagian.',
        modifiers: [
          { label: 'Kecepatan Konstruksi Pabrik Sipil', value: '+10%', positive: true },
          { label: 'Kebutuhan Pabrik Barang Konsumsi (Consumer Goods)', value: '-5%', positive: true }
        ]
      },
      {
        id: 'usa_arsenal_democracy',
        name: 'Gudang Senjata Demokrasi (Arsenal of Democracy)',
        type: 'status',
        description: 'Mempercepat bantuan Lend-Lease kepada sekutu dan memobilisasi pabrik militer masif.',
        modifiers: [
          { label: 'Output Pabrik Militer & Galangan', value: '+15%', positive: true },
          { label: 'Efisiensi Konversi Pabrik', value: '+20%', positive: true }
        ]
      }
    ],
    alternateLeaders: [
      {
        name: 'Harry S. Truman',
        yearRange: '1945 (Presiden ke-33)',
        ideology: 'Democratic',
        subIdeology: 'Liberalism',
        title: 'Presiden ke-33 Amerika Serikat',
        portraitUrls: [
          'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Harry_S_Truman_-_NARA_-_530677.jpg/300px-Harry_S_Truman_-_NARA_-_530677.jpg'
        ],
        traits: [
          {
            id: 'truman_atomic_resolve',
            name: 'Penyelesai Perang (War Finisher)',
            type: 'political',
            description: 'Ketegasan dalam mengakhiri konflik global dan meluncurkan proyek rekonstruksi Marshall.',
            modifiers: [
              { label: 'Dukungan Perang Terhadap Faksi Poros', value: '+15%', positive: true }
            ]
          }
        ],
        historicBio: 'Wakil Presiden yang dilantik pada April 1945 menyusul wafatnya Roosevelt, memimpin akhir perang di Pasifik dan pembentukan PBB.'
      }
    ]
  },

  ENG: {
    tag: 'ENG',
    countryName: 'Kerajaan Inggris (United Kingdom)',
    countryAdjective: 'Inggris',
    leaderName: 'Winston Churchill',
    title: 'Perdana Menteri Inggris & Menteri Pertahanan',
    tenureYears: '1940 – 1945',
    ideology: 'Democratic',
    subIdeology: 'Conservatism',
    ideologyColor: '#1d4ed8',
    countryFlagEmoji: '🇬🇧',
    portraitUrls: [
      'https://hoi4.paradoxwikis.com/images/thumb/0/07/Winston_Churchill.png/150px-Winston_Churchill.png',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Sir_Winston_Churchill_-_1941%2C_by_Yousuf_Karsh.jpg/300px-Sir_Winston_Churchill_-_1941%2C_by_Yousuf_Karsh.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Winston_Churchill_cph.3a49880.jpg/300px-Winston_Churchill_cph.3a49880.jpg'
    ],
    politicalPowerGain: '+15%',
    stabilityBonus: '+15%',
    warSupportBonus: '+25%',
    signatureFocus: 'Steady as She Goes -> Shadow Scheme -> The British Empire League',
    historicQuote: 'Kita akan bertempur di pantai, kita akan bertempur di tempat pendaratan, kita tidak akan pernah menyerah!',
    quoteSpeaker: 'Winston Churchill, Juni 1940',
    historicBio: 'Negarawan legendaris Inggris yang menjadi simbol perlawanan tanpa kompromi melawan agresi fasisme setelah jatuhnya Prancis pada 1940, memimpin Pertempuran Britania dan menggalang koalisi Sekutu global.',
    traits: [
      {
        id: 'eng_bulldog',
        name: 'Bulldog Britania (British Bulldog)',
        type: 'personality',
        description: 'Semangat perlawanan gigih yang menolak segala bentuk kapitulasi atau pakta perdamaian semu.',
        modifiers: [
          { label: 'Dukungan Perang (War Support)', value: '+20%', positive: true },
          { label: 'Ambang Batas Menyerah (Surrender Limit)', value: '+10%', positive: true },
          { label: 'Pertahanan Melawan Serangan Udara (Air Defense)', value: '+15%', positive: true }
        ]
      },
      {
        id: 'eng_imperial_ties',
        name: 'Tali Kekaisaran (Imperial Guardian)',
        type: 'status',
        description: 'Memperkuat loyalitas dan kontribusi suplai dari Dominium Kanada, Australia, Raj India, dan Afrika.',
        modifiers: [
          { label: 'Manpower dari Persemakmuran (Commonwealth)', value: '+10%', positive: true }
        ]
      }
    ],
    alternateLeaders: [
      {
        name: 'Neville Chamberlain',
        yearRange: '1937 – 1940 (Pemimpin Awal 1936)',
        ideology: 'Democratic',
        subIdeology: 'Conservatism',
        title: 'Perdana Menteri Inggris (1937-1940)',
        portraitUrls: [
          'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Neville_Chamberlain_1938.jpg/300px-Neville_Chamberlain_1938.jpg'
        ],
        traits: [
          {
            id: 'chamberlain_appeasement',
            name: 'Diplomasi Perdamaian (Appeasement Architect)',
            type: 'political',
            description: 'Berupaya mencegah perang di Eropa melalui konsesi teritorial seperti Perjanjian Munich.',
            modifiers: [
              { label: 'Kebutuhan Pabrik Barang Konsumsi', value: '-3%', positive: true },
              { label: 'Dukungan Perang Nasional (War Support)', value: '-15%', positive: false }
            ]
          }
        ],
        historicBio: 'Perdana Menteri Inggris yang menandatangani Perjanjian Munich 1938 dengan klaim "Perdamaian untuk Generasi Kita", sebelum pecahnya perang pada 1939.'
      }
    ]
  },

  JAP: {
    tag: 'JAP',
    countryName: 'Kekaisaran Jepang (Empire of Japan)',
    countryAdjective: 'Jepang',
    leaderName: 'Kaisar Hirohito (Shōwa)',
    title: 'Kaisar ke-124 Jepang (Tenno)',
    tenureYears: '1926 – 1989',
    ideology: 'Fascism',
    subIdeology: 'Fascism (Imperial Militarism)',
    ideologyColor: '#991b1b',
    countryFlagEmoji: '🇯🇵',
    portraitUrls: [
      'https://hoi4.paradoxwikis.com/images/thumb/e/e0/Hirohito.png/150px-Hirohito.png',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Emperor_Hirohito_in_dress_uniform.jpg/300px-Emperor_Hirohito_in_dress_uniform.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Hirohito_in_dress_uniform.jpg/300px-Hirohito_in_dress_uniform.jpg'
    ],
    politicalPowerGain: '+10%',
    stabilityBonus: '+20%',
    warSupportBonus: '+15%',
    signatureFocus: 'Purge the Kodoha Faction -> Guide the Zaibatsus -> Strike South',
    historicQuote: 'Tanggung jawab kita adalah menanggung apa yang tak tertahankan, demi menjaga masa depan bangsa.',
    quoteSpeaker: 'Kaisar Hirohito',
    historicBio: 'Penguasa monarki Jepang selama era ekspansionisme militer di Asia Pasifik, Perang Tiongkok-Jepang Kedua, dan Perang Pasifik melawan Amerika Serikat dan Sekutu.',
    traits: [
      {
        id: 'jap_living_deity',
        name: 'Dewa yang Hidup (Living Deity / Tenno)',
        type: 'status',
        description: 'Penghormatan suci rakyat kepada Kaisar menjamin stabilitas domestik tertinggi di dunia.',
        modifiers: [
          { label: 'Stabilitas Politik (Stability)', value: '+20%', positive: true },
          { label: 'Batas Menyerah Tanpa Syarat (Surrender Limit)', value: '+30%', positive: true }
        ]
      },
      {
        id: 'jap_samurai_code',
        name: 'Semangat Bushido (Bushido Spirit)',
        type: 'military',
        description: 'Doktrin pantang menyerah yang meningkatkan keuletan prajurit di pulau-pulau Pasifik.',
        modifiers: [
          { label: 'Pemberian Perintah Tempur Ekstrem (Kamikaze / Banzai)', value: 'Tersedia', positive: true },
          { label: 'Pertahanan Entrenchment', value: '+10%', positive: true }
        ]
      }
    ],
    alternateLeaders: [
      {
        name: 'Hideki Tojo',
        yearRange: '1941 – 1944 (Perdana Menteri Militer)',
        ideology: 'Fascism',
        subIdeology: 'Military Junta',
        title: 'Jenderal AD & Perdana Menteri Jepang',
        portraitUrls: [
          'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Hideki_Tojo.jpg/300px-Hideki_Tojo.jpg'
        ],
        traits: [
          {
            id: 'tojo_militarism',
            name: 'Pakar Mobilisasi Tentara (Army Mobilizer)',
            type: 'military',
            description: 'Mempercepat pelatihan divisi infanteri dan logistik tentara darat.',
            modifiers: [
              { label: 'Kecepatan Pelatihan Divisi (Division Training)', value: '+15%', positive: true }
            ]
          }
        ],
        historicBio: 'Perdana Menteri masa perang yang memimpin penyerangan Pearl Harbor dan mendominasi kebijakan militer kekaisaran.'
      }
    ]
  },

  ITA: {
    tag: 'ITA',
    countryName: 'Kerajaan Italia (Kingdom of Italy)',
    countryAdjective: 'Italia',
    leaderName: 'Benito Mussolini',
    title: 'Il Duce del Fascismo & Perdana Menteri',
    tenureYears: '1922 – 1943',
    ideology: 'Fascism',
    subIdeology: 'Fascism',
    ideologyColor: '#c2410c',
    countryFlagEmoji: '🇮🇹',
    portraitUrls: [
      'https://hoi4.paradoxwikis.com/images/thumb/d/d0/Benito_Mussolini.png/150px-Benito_Mussolini.png',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Benito_Mussolini_in_Yugoslavia.jpg/300px-Benito_Mussolini_in_Yugoslavia.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Benito_Mussolini_in_uniform.jpg/300px-Benito_Mussolini_in_uniform.jpg'
    ],
    politicalPowerGain: '+15%',
    stabilityBonus: '+5%',
    warSupportBonus: '+10%',
    signatureFocus: 'Ethiopian War Logistics -> Mare Nostrum -> Pact of Steel',
    historicQuote: 'Lebih baik hidup satu hari sebagai singa daripada seratus tahun sebagai domba.',
    quoteSpeaker: 'Benito Mussolini',
    historicBio: 'Pendiri ideologi fasisme modern yang berambisi membangkitkan kejayaan Kekaisaran Romawi Kuno di Laut Mediterania (Mare Nostrum) dan membentuk Poros Roma-Berlin bersama Adolf Hitler.',
    traits: [
      {
        id: 'ita_il_duce',
        name: 'Il Duce (Pemimpin Tertinggi)',
        type: 'political',
        description: 'Meningkatkan perolehan dukungan partai fasis dan percepatan keputusan kolonial.',
        modifiers: [
          { label: 'Perolehan Kekuatan Politik (PP Gain)', value: '+15%', positive: true },
          { label: 'Popularitas Fasisme Harian', value: '+0.10/hari', positive: true }
        ]
      },
      {
        id: 'ita_mare_nostrum',
        name: 'Penguasa Mediterania (Mare Nostrum Vision)',
        type: 'military',
        description: 'Memberikan dorongan taktis bagi armada laut Regia Marina di Mediterania.',
        modifiers: [
          { label: 'Kapasitas Galangan Kapal Perang', value: '+10%', positive: true },
          { label: 'Kelemahan Penurunan Dukungan Perang saat Invasi Sisilia', value: '-15%', positive: false }
        ]
      }
    ],
    alternateLeaders: [
      {
        name: 'Victor Emmanuel III',
        yearRange: '1900 – 1946 (Raja Monarki)',
        ideology: 'Non-Aligned',
        subIdeology: 'Monarchy',
        title: 'Raja Italia & Kaisar Etiopia',
        portraitUrls: [
          'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Vittorio_Emanuele_III_1936.jpg/300px-Vittorio_Emanuele_III_1936.jpg'
        ],
        traits: [
          {
            id: 'vittorio_royal_grace',
            name: 'Monarki Tradisional (Royal Legitimacy)',
            type: 'status',
            description: 'Memulihkan dukungan kaum konservatif dan gereja.',
            modifiers: [
              { label: 'Stabilitas Domestik (Stability)', value: '+15%', positive: true }
            ]
          }
        ],
        historicBio: 'Raja Italia yang memecat dan memerintahkan penangkapan Mussolini pada Juli 1943 setelah pendaratan Sekutu di Sisilia.'
      }
    ]
  },

  FRA: {
    tag: 'FRA',
    countryName: 'Republik Prancis (French Republic)',
    countryAdjective: 'Prancis',
    leaderName: 'Édouard Daladier',
    title: 'Presiden Dewan Menteri (Président du Conseil)',
    tenureYears: '1938 – 1940',
    ideology: 'Democratic',
    subIdeology: 'Radical Socialism',
    ideologyColor: '#1e40af',
    countryFlagEmoji: '🇫🇷',
    portraitUrls: [
      'https://hoi4.paradoxwikis.com/images/thumb/f/fa/%C3%89douard_Daladier.png/150px-%C3%89douard_Daladier.png',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/%C3%89douard_Daladier_1938.jpg/300px-%C3%89douard_Daladier_1938.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Edouard_Daladier_1933.jpg/300px-Edouard_Daladier_1933.jpg'
    ],
    politicalPowerGain: '-15% (Disjointed Gov)',
    stabilityBonus: '-10%',
    warSupportBonus: '+5%',
    signatureFocus: 'Form the Popular Front -> Alpine Line -> Maginot Extension',
    historicQuote: 'Prancis menginginkan perdamaian, tetapi tidak akan mundur dari komitmen menjaga kebebasan Eropa.',
    quoteSpeaker: 'Édouard Daladier, 1939',
    historicBio: 'Pemimpin Republik Prancis Ketiga pada pembukaan Perang Dunia II. Menghadapi parlemen yang terpecah-belah dan mengandalkan benteng beton raksasa Garis Maginot untuk menahan ofensif Jerman.',
    traits: [
      {
        id: 'fra_maginot_guardian',
        name: 'Pelindung Maginot (Maginot Protector)',
        type: 'status',
        description: 'Mempercepat pembangunan benteng darat di sepanjang perbatasan timur.',
        modifiers: [
          { label: 'Kecepatan Konstruksi Benteng (Land Forts)', value: '+20%', positive: true },
          { label: 'Penalti Pemerintahan Terbelah (Disjointed Gov)', value: '-0.30 PP/hari', positive: false }
        ]
      },
      {
        id: 'fra_great_war_shadow',
        name: 'Beban Perang Dunia Pertama (Victors of the Great War)',
        type: 'military',
        description: 'Kekhawatiran mendalam akan jatuhnya korban jiwa baru memperlambat pemulihan doktrin militer.',
        modifiers: [
          { label: 'Biaya Riset Doktrin Militer Darat', value: '+50%', positive: false }
        ]
      }
    ],
    alternateLeaders: [
      {
        name: 'Charles de Gaulle',
        yearRange: '1940 – 1944 (Prancis Merdeka)',
        ideology: 'Democratic',
        subIdeology: 'Gaullism / Stratocracy',
        title: 'Pemimpin Pasukan Prancis Merdeka (Free France)',
        portraitUrls: [
          'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/General_Charles_de_Gaulle_1942.jpg/300px-General_Charles_de_Gaulle_1942.jpg'
        ],
        traits: [
          {
            id: 'degaulle_free_france',
            name: 'Pemberontak yang Gigih (Defiant Rebel)',
            type: 'personality',
            description: 'Memimpin gerakan perlawanan bawah tanah (French Resistance) dari pengasingan London.',
            modifiers: [
              { label: 'Efisiensi Sabotase Perlawanan Rakyat', value: '+25%', positive: true },
              { label: 'Dukungan Perang Prancis Merdeka', value: '+20%', positive: true }
            ]
          }
        ],
        historicBio: 'Jenderal divisi lapis baja yang menolak kapitulasi kepada Jerman, mendirikan Pasukan Prancis Merdeka dan memimpin pembebasan Paris 1944.'
      },
      {
        name: 'Philippe Pétain',
        yearRange: '1940 – 1944 (Prancis Vichy)',
        ideology: 'Fascism',
        subIdeology: 'Authoritarian Faction',
        title: 'Chef de l’État Français (Vichy)',
        portraitUrls: [
          'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Philippe_P%C3%A9tain_1940.jpg/300px-Philippe_P%C3%A9tain_1940.jpg'
        ],
        traits: [
          {
            id: 'petain_verdun_hero',
            name: 'Pahlawan Verdun (Hero of Verdun)',
            type: 'status',
            description: 'Wibawa masa lampau yang digunakan untuk melegitimasi rezim kolaborator di zona selatan.',
            modifiers: [
              { label: 'Kepatuhan Wilayah Jajahan Afrika', value: '+10%', positive: true }
            ]
          }
        ],
        historicBio: 'Marsekal Prancis yang dihormati dalam Perang Dunia I, namun memimpin rezim kolaborator Vichy yang berkolaborasi dengan Jerman Nazi setelah kekalahan 1940.'
      }
    ]
  }
};

/**
 * Singleton Service for dynamically fetching, preloading, verifying and caching official HOI4 leader portraits
 */
class HOI4LeaderService {
  private verifiedCache = new Map<string, string>();
  private failedUrls = new Set<string>();

  /**
   * Retrieves leader data for a nation tag
   */
  public getLeader(tag: string): HOI4LeaderData | undefined {
    const cleanTag = tag.toUpperCase();
    return HOI4_MAJOR_LEADERS[cleanTag];
  }

  /**
   * Returns all 7 Major Nation leaders
   */
  public getAllMajorLeaders(): HOI4LeaderData[] {
    return Object.values(HOI4_MAJOR_LEADERS);
  }

  /**
   * Checks if a nation tag is one of the 7 major powers
   */
  public isMajor(tag: string): boolean {
    return !!HOI4_MAJOR_LEADERS[tag.toUpperCase()];
  }

  /**
   * Resolves the best working portrait URL with dynamic verification
   */
  public async resolvePortrait(tag: string, alternateIndex?: number): Promise<string> {
    const leader = this.getLeader(tag);
    if (!leader) return '';

    const cacheKey = `${tag}_${alternateIndex ?? 'default'}`;
    if (this.verifiedCache.has(cacheKey)) {
      return this.verifiedCache.get(cacheKey)!;
    }

    const targetUrls = (alternateIndex !== undefined && leader.alternateLeaders && leader.alternateLeaders[alternateIndex])
      ? leader.alternateLeaders[alternateIndex].portraitUrls
      : leader.portraitUrls;

    for (const url of targetUrls) {
      if (this.failedUrls.has(url)) continue;

      try {
        const isWorking = await this.testImageUrl(url);
        if (isWorking) {
          this.verifiedCache.set(cacheKey, url);
          return url;
        } else {
          this.failedUrls.add(url);
        }
      } catch {
        this.failedUrls.add(url);
      }
    }

    // Default to first URL as fallback
    const fallback = targetUrls[0] || '';
    this.verifiedCache.set(cacheKey, fallback);
    return fallback;
  }

  /**
   * Tests whether an image URL successfully loads
   */
  private testImageUrl(url: string, timeoutMs: number = 3500): Promise<boolean> {
    return new Promise((resolve) => {
      const img = new Image();
      let timer: number | null = null;

      const cleanup = () => {
        if (timer) clearTimeout(timer);
        img.onload = null;
        img.onerror = null;
      };

      timer = window.setTimeout(() => {
        cleanup();
        resolve(false);
      }, timeoutMs);

      img.onload = () => {
        cleanup();
        resolve(true);
      };

      img.onerror = () => {
        cleanup();
        resolve(false);
      };

      img.src = url;
    });
  }

  /**
   * Preloads all 7 major nation portraits in the background
   */
  public preloadAllMajors(): void {
    Object.keys(HOI4_MAJOR_LEADERS).forEach(tag => {
      this.resolvePortrait(tag).catch(() => {});
    });
  }

  /**
   * Returns canonical tags for the 7 major powers in HOI4
   */
  public getMajorTags(): string[] {
    return ['GER', 'SOV', 'USA', 'ENG', 'JAP', 'ITA', 'FRA'];
  }

  /**
   * Dynamically resolves official portraits and complete metadata for all 7 major nations simultaneously
   */
  public async fetchOfficialMajorLeaders(): Promise<MajorLeaderResolvedItem[]> {
    const tags = this.getMajorTags();
    const results = await Promise.all(
      tags.map(tag => this.fetchMajorLeader(tag))
    );
    return results.filter((item): item is MajorLeaderResolvedItem => item !== null);
  }

  /**
   * Dynamically resolves a single leader with verified portrait URL, traits, and fallback
   */
  public async fetchMajorLeader(tag: string, alternateIndex?: number): Promise<MajorLeaderResolvedItem | null> {
    const leader = this.getLeader(tag);
    if (!leader) return null;

    const resolvedUrl = await this.resolvePortrait(tag, alternateIndex);

    const isAlternate = alternateIndex !== undefined && leader.alternateLeaders && leader.alternateLeaders[alternateIndex];
    const altData = isAlternate ? leader.alternateLeaders![alternateIndex] : null;

    return {
      tag: leader.tag,
      countryName: leader.countryName,
      countryAdjective: leader.countryAdjective,
      countryFlagEmoji: leader.countryFlagEmoji,
      leaderName: altData ? altData.name : leader.leaderName,
      title: altData ? altData.title : leader.title,
      tenureYears: altData ? altData.yearRange : leader.tenureYears,
      ideology: altData ? altData.ideology : leader.ideology,
      subIdeology: altData ? altData.subIdeology : leader.subIdeology,
      ideologyColor: leader.ideologyColor,
      resolvedPortraitUrl: resolvedUrl,
      traits: altData ? altData.traits : leader.traits,
      politicalPowerGain: leader.politicalPowerGain,
      stabilityBonus: leader.stabilityBonus,
      warSupportBonus: leader.warSupportBonus,
      signatureFocus: leader.signatureFocus,
      historicQuote: leader.historicQuote,
      quoteSpeaker: leader.quoteSpeaker,
      historicBio: altData ? altData.historicBio : leader.historicBio,
      alternateCount: leader.alternateLeaders ? leader.alternateLeaders.length : 0,
      isAlternateActive: !!altData,
      alternateIndex
    };
  }

  /**
   * Clears the in-memory verification cache to force re-fetch
   */
  public clearCache(): void {
    this.verifiedCache.clear();
    this.failedUrls.clear();
  }
}

export const hoi4LeaderService = new HOI4LeaderService();
