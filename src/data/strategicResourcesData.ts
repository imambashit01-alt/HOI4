import {
  CriticalResourceType,
  StrategicResourceHotspot,
  StrategicChokepoint,
  StrategicConvoyRoute
} from '../types';

export interface ResourceMeta {
  type: CriticalResourceType;
  name: string;
  chemicalName: string;
  symbol: string;
  color: string;
  bgGlow: string;
  borderColor: string;
  icon: string;
  shortDesc: string;
  fullDesc: string;
  equipmentRequired: string[];
  withoutResourcePenalty: string;
  global1936Supply: number; // total units on map in 1936
  topProducers: { name: string; tag: string; amount: number; share: string }[];
  syntheticTechPath: string;
}

export const CRITICAL_RESOURCES_META: Record<CriticalResourceType, ResourceMeta> = {
  rubber: {
    type: 'rubber',
    name: 'Karet (Rubber)',
    chemicalName: 'Natural Latex & Buna Elastomers',
    symbol: 'Ru',
    color: '#22c55e', // emerald green
    bgGlow: 'rgba(34, 197, 94, 0.45)',
    borderColor: '#4ade80',
    icon: '🌿',
    shortDesc: 'Bahan baku vital untuk pesawat tempur (Fighter/CAS), truk suplai bermotor, dan kendaraan mekanis.',
    fullDesc: 'Karet adalah salah satu dari "Tiga Pilar Kelaparan Perang" di HOI4. Sekitar 92% cadangan karet alam dunia pada tahun 1936 terkonsentrasi di Asia Tenggara (Malaya Britania, Hindia Belanda, dan Indochina Prancis). Tanpa karet, perakitan pesawat tempur dan truk logistik terhenti atau memakan penalti waktu hingga 75%. Blokade laut Sekutu terhadap Jerman memaksa Axis meneliti teknologi pabrik karet sintetis (Buna) yang sangat boros pabrik sipil.',
    equipmentRequired: [
      'Small Airframe (Fighter I-III, CAS I-III)',
      'Medium Airframe (Tactical Bomber, Heavy Fighter)',
      'Large Airframe (Strategic Bomber, Transport Plane)',
      'Motorized Supply Trucks',
      'Mechanized Infantry I-III'
    ],
    withoutResourcePenalty: 'Penalti efisiensi pabrik hingga -75% produksi airframe & motorized. Pesawat kekurangan roda pendarat dan tangki bahan bakar fleksibel.',
    global1936Supply: 1085,
    topProducers: [
      { name: 'Malaya Britania (Singapura/Penang)', tag: 'MAL', amount: 560, share: '51.6%' },
      { name: 'Hindia Belanda (Sumatra/Jawa)', tag: 'INS', amount: 395, share: '36.4%' },
      { name: 'Indochina Prancis (Saigon)', tag: 'FIC', amount: 65, share: '6.0%' },
      { name: 'Ceylon (Sri Lanka)', tag: 'ENG', amount: 40, share: '3.7%' },
      { name: 'Liberia & Kongo Belgia', tag: 'LIB', amount: 25, share: '2.3%' }
    ],
    syntheticTechPath: 'Riset Synthetic Rubber I - IV (Buna-Werke). Tiap Synthetic Refinery memberikan +2 sampai +4 Karet per pabrik.'
  },
  tungsten: {
    type: 'tungsten',
    name: 'Wolfram (Tungsten)',
    chemicalName: 'Heavy Tungsten Carbide (W)',
    symbol: 'W',
    color: '#f97316', // bright orange / amber
    bgGlow: 'rgba(249, 115, 22, 0.45)',
    borderColor: '#fb923c',
    icon: '🔩',
    shortDesc: 'Logam super padat penembus zirah baja, bahan baku meriam tank medium, berat, artileri, dan laras senjata berat.',
    fullDesc: 'Wolfram (Tungsten) memiliki titik leleh tertinggi dan kekerasan luar biasa, menjadikannya bahan utama amunisi Armour-Piercing (APCR), pelapis laras artileri kaliber besar, dan bagian kritis sasis tank kelas Medium (Panzer IV, T-34) serta Heavy (Tiger, IS-2). Di Eropa, Portugal dan Spanyol menjadi rebutan sengit Perang Ekonomi intelijen (Wolfram War) karena Jerman tidak memiliki tambang domestik.',
    equipmentRequired: [
      'Medium Tank Chassis & Turrets (Panzer IV, T-34, M4 Sherman)',
      'Heavy Tank Chassis (Tiger I-II, KV-1, IS-2)',
      'Towed Artillery & Anti-Tank Guns (Pak 40, 17-Pounder)',
      'Self-Propelled Artillery (Hummel, Priest, SU-122)',
      'Jet Engine Airframes (Late Game)'
    ],
    withoutResourcePenalty: 'Kapasitas produksi tank medium & artileri anjlok drastis (-70% output pabrik). Divisi lapis baja kehilangan daya gempur (Soft/Hard Attack).',
    global1936Supply: 780,
    topProducers: [
      { name: 'British Raj (Burma / Mawchi Mine)', tag: 'RAJ', amount: 165, share: '21.2%' },
      { name: 'Portugal (Panasqueira / Beira)', tag: 'POR', amount: 155, share: '19.9%' },
      { name: 'Republik Tiongkok / Yunnan', tag: 'CHI', amount: 130, share: '16.7%' },
      { name: 'Amerika Serikat (Nevada/California)', tag: 'USA', amount: 80, share: '10.3%' },
      { name: 'Spanyol Nasionalis / Republik', tag: 'SPA', amount: 72, share: '9.2%' },
      { name: 'Siam (Thailand)', tag: 'SIA', amount: 48, share: '6.2%' }
    ],
    syntheticTechPath: 'Tidak dapat diproduksi sintetis! Wajib diamankan lewat perdagangan pabrik sipil, invasi darat, atau ekspansi tambang teknologi Excavation I-V (+50% output tambang).'
  },
  oil: {
    type: 'oil',
    name: 'Minyak Mentah (Crude Oil & Fuel)',
    chemicalName: 'Petroleum Hydrocarbons',
    symbol: 'Oil',
    color: '#eab308', // gold / yellow
    bgGlow: 'rgba(234, 179, 8, 0.45)',
    borderColor: '#facc15',
    icon: '🛢️',
    shortDesc: 'Bahan baku pemurnian Fuel (BBM) untuk menggerakkan divisi Panzer, armada kapal perang, pesawat terbang, dan truk logistik.',
    fullDesc: 'Minyak adalah urat nadi absolut mobilitas Perang Dunia II. Tanpa BBM (Fuel), tank baja berjalan secepat kura-kura dengan penalti -90% kecepatan dan serangan, kapal perang terapung tak berdaya, dan pesawat pembom tidak bisa mengudara. AS dan Uni Soviet memegang monopoli terbesar, sementara Jerman bergantung pada sumur Ploiești Rumania dan Jepang tercekik oleh embargo minyak 1941 hingga memicu serangan ke Hindia Belanda dan Pearl Harbor.',
    equipmentRequired: [
      'Refining Fuel (1 Minyak mentah = ~48-96 Fuel harian)',
      'Operasional Kapal Perang (Battleships, Carriers, Destroyers)',
      'Operasional Wing Pesawat (Fighters, CAS, Strategic Bombers)',
      'Divisi Motorized, Mechanized, dan Seluruh Korps Lapis Baja',
      'Hub Logistik & Truk Suplai Garis Depan'
    ],
    withoutResourcePenalty: 'Stok BBM habis (Fuel Shortage 0): Divisi lapis baja kehilangan -90% mobilitas & attack, pesawat tidak dapat menjalankan misi superioritas, armada laut mogok.',
    global1936Supply: 1420,
    topProducers: [
      { name: 'Amerika Serikat (Texas/California/Oklahoma)', tag: 'USA', amount: 670, share: '47.2%' },
      { name: 'Uni Soviet (Baku / Kaukasus / Ural)', tag: 'SOV', amount: 240, share: '16.9%' },
      { name: 'Venezuela (Maracaibo / Aruba)', tag: 'VEN', amount: 165, share: '11.6%' },
      { name: 'Hindia Belanda (Sumatra/Borneo/Palembang)', tag: 'INS', amount: 95, share: '6.7%' },
      { name: 'Rumania (Ploiești)', tag: 'ROM', amount: 82, share: '5.8%' },
      { name: 'Iran (Abadan / Khuzestan) & Irak (Mosul)', tag: 'PER', amount: 85, share: '6.0%' },
      { name: 'Meksiko (Tampico)', tag: 'MEX', amount: 45, share: '3.2%' }
    ],
    syntheticTechPath: 'Riset Coal Liquidization (Synthetic Oil I - IV). Tiap kilang sintetis mengubah batubara domestik menjadi +3 hingga +8 Minyak mentah.'
  }
};

export const STRATEGIC_RESOURCE_HOTSPOTS: StrategicResourceHotspot[] = [
  // ==================== ASIA-PASIFIK & HINDIA BELANDA (THE RUBBER & OIL CRADLE) ====================
  {
    id: 'hotspot-malaya-rubber',
    name: 'Semenanjung Malaya & Singapura',
    region: 'asia_pacific',
    countryTag: 'MAL',
    countryName: 'Malaya Britania (United Kingdom)',
    faction: 'Allies',
    resourceType: 'rubber',
    amount1936: 560,
    worldSharePercent: 51.6,
    x: 735,
    y: 365,
    keyProvinces: ['Kuala Lumpur', 'Singapura', 'Penang', 'Ipoh'],
    chokepointRisk: 'Ekstrem',
    chokepointName: 'Selat Malaka & Pintu Masuk Samudra Hindia',
    militaryCriticality: 'Pemasok lebih dari 50% karet dunia. Jika jatuh ke tangan Jepang, kekuatan udara Sekutu di Pasifik & Eropa lumpuh tanpa pasokan alternatif.',
    dominationStrategy: {
      axisTactic: 'Jepang wajib melancarkan invasi kilat lewat Thailand darat atau pendaratan amfibi ke Kota Bharu untuk merebut Singapura dalam 60 hari.',
      alliesTactic: 'Garnisun benteng Singapura level 5, tempatkan armada Royal Navy Force Z (Prince of Wales & Repulse) dan payung udara Fighter Hawker Hurricane.',
      sovietsTactic: 'Jika Sekutu kehilangan Malaya, Soviet tidak dapat mengimpor ban truk Studebaker Lend-Lease dari Sekutu.'
    },
    ww2HistoricalOperation: {
      name: 'Kampanye Malaya & Jatuhnya Singapura',
      year: '1941-1942',
      outcome: 'Kemenangan Mutlak Jepang (Jenderal Tomoyuki Yamashita)',
      details: 'Jepang menyerbu dengan sepeda cepat melintasi hutan bakau Malaya, mengejutkan Inggris yang mengira benteng meriam pantai Singapura hanya bisa diserang dari arah laut.'
    },
    syntheticAlternative: 'Jerman dan AS terpaksa mengalokasikan puluhan pabrik sipil untuk mendirikan kompleks Buna Rubber jika Selat Malaka diblokade.'
  },
  {
    id: 'hotspot-sumatra-rubber-oil',
    name: 'Sumatra (Palembang & Jambi)',
    region: 'asia_pacific',
    countryTag: 'INS',
    countryName: 'Hindia Belanda (Dutch East Indies)',
    faction: 'Allies',
    resourceType: 'rubber',
    amount1936: 210,
    worldSharePercent: 19.4,
    x: 725,
    y: 395,
    keyProvinces: ['Palembang', 'Medan', 'Jambi', 'Padang'],
    chokepointRisk: 'Ekstrem',
    chokepointName: 'Selat Sunda & Selat Bangka',
    militaryCriticality: 'Kombinasi langka: produsen karet alam terbesar kedua sekaligus ladang minyak paling subur di Pasifik Barat Daya.',
    dominationStrategy: {
      axisTactic: 'Jepang harus menerjunkan Pasukan Payung (Paratroopers) langsung ke kilang minyak Plaju & Sungai Gerong untuk mencegah sabotase bumi hangus KNIL Belanda.',
      alliesTactic: 'Lakukan taktik Scorched Earth (bumi hangus) kilang minyak sebelum mundur ke Jawa jika tidak mampu menahan armada Kido Butai Jepang.',
      sovietsTactic: 'Amankan diplomasi dengan Sekutu agar jalur pasokan karet selatan tetap terbuka.'
    },
    ww2HistoricalOperation: {
      name: 'Pertempuran Palembang (Operasi L)',
      year: 'Februari 1942',
      outcome: 'Kemenangan Jepang, Kilang Direbut Utuh',
      details: 'Pasukan payung elit Teishin Shudan mendarat tepat di kompleks kilang Palembang, melucuti peledak sebelum tentara KNIL Belanda sempat memicu detonator.'
    }
  },
  {
    id: 'hotspot-borneo-oil-rubber',
    name: 'Borneo (Balikpapan & Tarakan)',
    region: 'asia_pacific',
    countryTag: 'INS',
    countryName: 'Hindia Belanda & Borneo Utara',
    faction: 'Allies',
    resourceType: 'oil',
    amount1936: 95,
    worldSharePercent: 6.7,
    x: 765,
    y: 380,
    keyProvinces: ['Balikpapan', 'Tarakan', 'Brunei', 'Miri'],
    chokepointRisk: 'Tinggi',
    chokepointName: 'Selat Makassar',
    militaryCriticality: 'Minyak bumi berkualitas sangat murni (paraffin-rich) yang bisa langsung dimasukkan ke tangki kapal perang tanpa perlu pemurnian rumit.',
    dominationStrategy: {
      axisTactic: 'Kunci utama Doktrin Nanshin-ron (Ekspedisi Selatan Jepang). Merebut Balikpapan memberikan fuel cadangan 100+ hari pertempuran armada.',
      alliesTactic: 'Gunakan kapal selam ABDACOM di Selat Makassar untuk menyergap konvoi kapal angkut infanteri pendarat Jepang.',
      sovietsTactic: 'Biarkan Jepang terikat di perairan Indonesia agar divisi tentara Jepang di Manchuria (Kwantung Army) tidak menyerang Vladivostok.'
    },
    ww2HistoricalOperation: {
      name: 'Pertempuran Balikpapan & Tarakan',
      year: 'Januari 1942',
      outcome: 'Kemenangan Jepang',
      details: 'Meskipun 4 destroyer AS berhasil menyusup malam hari dan menenggelamkan 3 kapal angkut Jepang, pasukan pendarat Jepang berhasil mengamankan sumur minyak Tarakan.'
    }
  },
  {
    id: 'hotspot-burma-tungsten',
    name: 'Burma (Mawchi Mine & Tavoy)',
    region: 'asia_pacific',
    countryTag: 'RAJ',
    countryName: 'British Raj / Burma',
    faction: 'Allies',
    resourceType: 'tungsten',
    amount1936: 165,
    worldSharePercent: 21.2,
    x: 695,
    y: 310,
    keyProvinces: ['Mawchi', 'Rangoon', 'Mandalay', 'Tavoy'],
    chokepointRisk: 'Tinggi',
    chokepointName: 'Burma Road & Lembah Salween',
    militaryCriticality: 'Tambang Tungsten tunggal terbesar di Kerajaan Inggris. Memasok tungsten untuk produksi meriam tank Cruiser dan 25-Pounder Sekutu.',
    dominationStrategy: {
      axisTactic: 'Jepang harus merebut Rangoon dan memotong Jalur Burma (Burma Road), memutus pasokan logam keras Chiang Kai-shek dan Inggris.',
      alliesTactic: 'Bangun pangkalan udara di Ledo (India) dan terbangkan rute suplai The Hump melintasi Himalaya jika Burma jatuh.',
      sovietsTactic: 'Beli tungsten dari wilayah barat daya China via perbatasan Xinjiang.'
    },
    ww2HistoricalOperation: {
      name: 'Invasi Burma & Pemotongan Burma Road',
      year: '1942',
      outcome: 'Jepang Merebut Mawchi Mines',
      details: 'Jepang menguasai tambang Mawchi yang saat itu memproduksi sepertiga dari total tungsten Kekaisaran Britania.'
    }
  },
  {
    id: 'hotspot-china-tungsten',
    name: 'Tiongkok Selatan (Yunnan & Jiangxi)',
    region: 'asia_pacific',
    countryTag: 'CHI',
    countryName: 'Republik Tiongkok (Nationalist China)',
    faction: 'Neutral',
    resourceType: 'tungsten',
    amount1936: 130,
    worldSharePercent: 16.7,
    x: 740,
    y: 280,
    keyProvinces: ['Kunming (Yunnan)', 'Ganzhou (Jiangxi)', 'Guangzhou'],
    chokepointRisk: 'Sedang',
    chokepointName: 'Pelabuhan Kanton & Jalur Indochina',
    militaryCriticality: 'Sangat vital untuk industri tank dan peluru artileri Jerman sebelum 1938 via barter perjanjian militer Sino-German (Falkenhausen).',
    dominationStrategy: {
      axisTactic: 'Jerman dapat membarter senjata tua dengan tungsten China sebelum bergabung penuh dengan Blok Poros Jepang.',
      alliesTactic: 'Kirimkan bantuan Foreign Aid dan korps sukarelawan Flying Tigers untuk menjaga Kunming tetap bebas dari invasi darat Jepang.',
      sovietsTactic: 'Jalankan Operasi Zet untuk menyuplai I-16 ke China demi imbalan logam strategis wolfram via rute darat Xinjiang.'
    },
    ww2HistoricalOperation: {
      name: 'Perjanjian Perdagangan Militer Sino-German',
      year: '1934-1938',
      outcome: 'Jerman menukar cetak biru senjata dengan ribuan ton Wolfram China',
      details: 'Jenderal Alexander von Falkenhausen melatih divisi elit China (Divisi 87 & 88) yang dibayar penuh menggunakan ekspor tungsten Jiangxi.'
    }
  },
  {
    id: 'hotspot-indochina-rubber',
    name: 'Indochina Prancis (Saigon & Cochinchina)',
    region: 'asia_pacific',
    countryTag: 'FIC',
    countryName: 'Indochina Prancis (Vichy / Prancis)',
    faction: 'Allies',
    resourceType: 'rubber',
    amount1936: 65,
    worldSharePercent: 6.0,
    x: 730,
    y: 335,
    keyProvinces: ['Saigon', 'Hanoi', 'Da Nang', 'Phnom Penh'],
    chokepointRisk: 'Sedang',
    chokepointName: 'Laut Cina Selatan',
    militaryCriticality: 'Pemasok karet ketiga terbesar di Asia Tenggara. Menjadi batu loncatan invasi Jepang ke Malaya dan Hindia Belanda.',
    dominationStrategy: {
      axisTactic: 'Gunakan tekanan diplomatik setelah Prancis jatuh (1940) untuk menduduki Indochina secara damai via perjanjian Vichy France.',
      alliesTactic: 'Lakukan blokade armada kapal selam dari Filipina terhadap rute pelayaran Saigon-Tokyo.',
      sovietsTactic: 'Dukung gerilyawan Viet Minh untuk menyabotase perkebunan karet milik kolonialis Prancis dan pendudukan Jepang.'
    },
    ww2HistoricalOperation: {
      name: 'Pendudukan Jepang atas Indochina Prancis',
      year: 'September 1940 & Juli 1941',
      outcome: 'Jepang Merebut Pangkalan Udara & Karet',
      details: 'Pendudukan pangkalan udara Saigon oleh Jepang menjadi pemicu langsung Presiden Roosevelt memberlakukan Embargo Minyak total kepada Jepang.'
    }
  },

  // ==================== EROPA & MEDITERANIA (CRUCIAL EUROPEAN CHOKEPOINTS) ====================
  {
    id: 'hotspot-romania-oil',
    name: 'Ploiești & Lembah Prahova',
    region: 'europe',
    countryTag: 'ROM',
    countryName: 'Kerajaan Rumania (Kingdom of Romania)',
    faction: 'Neutral',
    resourceType: 'oil',
    amount1936: 82,
    worldSharePercent: 5.8,
    x: 550,
    y: 195,
    keyProvinces: ['Ploiești', 'Bucharest', 'Câmpina', 'Constanța'],
    chokepointRisk: 'Ekstrem',
    chokepointName: 'Pintu Gerbang Balkan & Jalur Kereta Danube',
    militaryCriticality: 'Satu-satunya sumber minyak darat besar di daratan Eropa tengah. Memasok lebih dari 60% kebutuhan bahan bakar militer Jerman Nazi (Wehrmacht & Luftwaffe).',
    dominationStrategy: {
      axisTactic: 'Wajib menarik Rumania ke Faksi Axis secepat mungkin (Pohon Fokus Rekrut Rumania) atau melakukan invasi paksa sebelum 1940.',
      alliesTactic: 'Luncurkan misi pengeboman strategis jarak jauh dari pangkalan udara Benghazi/Foggia (Operasi Tidal Wave) untuk menghancurkan kilang distilasi.',
      sovietsTactic: 'Dorong front selatan Ukraina (Operasi Jassy-Kishinev 1944) untuk merebut Ploiești; saat kilang ini jatuh, Jerman kehabisan minyak dalam 4 minggu.'
    },
    ww2HistoricalOperation: {
      name: 'Operasi Tidal Wave (Pengeboman Ploiești)',
      year: '1 Agustus 1943',
      outcome: 'Kerusakan Sementara dengan Korban Pembom Berat Sekutu',
      details: '178 pembom berat B-24 Liberator AS terbang rendah di atas cerobong kilang; Jerman menembak jatuh 53 pesawat dengan artileri Flak terpadu.'
    }
  },
  {
    id: 'hotspot-portugal-tungsten',
    name: 'Portugal (Tambang Panasqueira & Beira)',
    region: 'europe',
    countryTag: 'POR',
    countryName: 'Portugal (Estado Novo)',
    faction: 'Neutral',
    resourceType: 'tungsten',
    amount1936: 155,
    worldSharePercent: 19.9,
    x: 435,
    y: 220,
    keyProvinces: ['Panasqueira', 'Fundão', 'Lisbon', 'Porto'],
    chokepointRisk: 'Tinggi',
    chokepointName: 'Jalur Netral Semenanjung Iberia & Teluk Biscay',
    militaryCriticality: 'Pemasok wolfram Eropa terbesar. Karena Portugal netral, siapa pun yang memiliki pabrik sipil (Civs) terbanyak dapat memborong cadangan ini.',
    dominationStrategy: {
      axisTactic: 'Jerman harus mengalokasikan 10-15 Pabrik Sipil per hari untuk mengimpor tungsten Portugal, atau lakukan invasi lewat Spanyol (Operasi Isabella).',
      alliesTactic: 'Lakukan "Pre-emptive Buying" (pembelian pencegahan): Inggris memborong seluruh kuota tambang Panasqueira dengan pound sterling emas agar Jerman kekurangan pasokan.',
      sovietsTactic: 'Beli tungsten sebelum jalur Atlantik terputus oleh kapal selam U-boat.'
    },
    ww2HistoricalOperation: {
      name: 'Perang Wolfram Portugal (The Wolfram Crisis)',
      year: '1942-1944',
      outcome: 'Perang Penawaran Intelijen, Akhirnya Embargo ke Jerman (Juni 1944)',
      details: 'Perdana Menteri Salazar memainkan Jerman dan Sekutu dalam perang lelang harga tungsten, meraup jutaan batangan emas batangan dari Reichsbank.'
    }
  },
  {
    id: 'hotspot-spain-tungsten',
    name: 'Spanyol (Galicia & Salamanca)',
    region: 'europe',
    countryTag: 'SPA',
    countryName: 'Spanyol (Nationalist / Republican)',
    faction: 'Neutral',
    resourceType: 'tungsten',
    amount1936: 72,
    worldSharePercent: 9.2,
    x: 450,
    y: 210,
    keyProvinces: ['A Coruña (Galicia)', 'Salamanca', 'Madrid', 'Bilbao'],
    chokepointRisk: 'Sedang',
    chokepointName: 'Pegunungan Pyrenees & Perbatasan Prancis',
    militaryCriticality: 'Sumber tungsten darat langsung untuk Jerman tanpa harus melewati rute laut Inggris jika Spanyol berpihak ke Poros.',
    dominationStrategy: {
      axisTactic: 'Kirimkan sukarelawan Condor Legion ke Nasionalis Franco; setelah menang, barter senjata dengan pasokan tambang Galicia.',
      alliesTactic: 'Terapkan embargo minyak gandum ke Spanyol agar Franco menolak permintaan Hitler untuk bergabung ke PD II (Pertemuan Hendaye).',
      sovietsTactic: 'Dukung Republik Spanyol untuk mengamankan cadangan emas Spanyol dan mineral tungsten.'
    },
    ww2HistoricalOperation: {
      name: 'Ekspor Rahasia Wolfram Spanyol ke Pabrik Krupp',
      year: '1940-1943',
      outcome: 'Kereta api rahasia melintasi Prancis yang diduduki',
      details: 'Spanyol mengekspor ribuan ton konsentrat wolfram ke Jerman sebagai pembayaran utang bantuan militer Franco dari Hitler.'
    }
  },
  {
    id: 'hotspot-baku-oil',
    name: 'Kaukasus & Baku (Azerbaijan SSR)',
    region: 'europe',
    countryTag: 'SOV',
    countryName: 'Uni Soviet (USSR)',
    faction: 'Comintern',
    resourceType: 'oil',
    amount1936: 215,
    worldSharePercent: 15.1,
    x: 605,
    y: 195,
    keyProvinces: ['Baku', 'Grozny', 'Maikop', 'Tbilisi'],
    chokepointRisk: 'Ekstrem',
    chokepointName: 'Pegunungan Kaukasus & Sungai Volga (Stalingrad)',
    militaryCriticality: 'Menghasilkan lebih dari 70% minyak Uni Soviet. Jika Baku jatuh, Tentara Merah lumpuh tanpa tank T-34 dan pesawat tempur Yak.',
    dominationStrategy: {
      axisTactic: 'Target utama Operasi Fall Blau 1942: Angkatan Darat Grup A menyerbu Kaukasus untuk merebut Maikop, Grozny, dan Baku demi memecahkan krisis BBM Jerman.',
      alliesTactic: 'Jika Soviet terdesak, siapkan Operasi Pike (pemboman pangkalan RAF Irak ke kilang Baku) agar minyak tidak jatuh ke tangan Hitler.',
      sovietsTactic: 'Bangun benteng pertahanan di celah pegunungan Kaukasus dan persiapkan evakuasi fasilitas pengeboran ke kawasan Volga-Ural ("Baku Kedua").'
    },
    ww2HistoricalOperation: {
      name: 'Operasi Edelweiss & Pertempuran Kaukasus',
      year: '1942-1943',
      outcome: 'Kekalahan Poros di Stalingrad, Penarikan Pasukan dari Kaukasus',
      details: 'Divisi Gebirgsjäger Jerman sempat mengibarkan bendera swastika di puncak Gunung Elbrus, namun gagal mencapai sumur minyak Baku karena garis suplai terputus di Stalingrad.'
    }
  },

  // ==================== TIMUR TENGAH (MIDDLE EAST ARTERY) ====================
  {
    id: 'hotspot-iran-oil',
    name: 'Khuzestan & Kilang Abadan (Iran)',
    region: 'middle_east',
    countryTag: 'PER',
    countryName: 'Iran (Persia)',
    faction: 'Neutral',
    resourceType: 'oil',
    amount1936: 55,
    worldSharePercent: 3.9,
    x: 630,
    y: 235,
    keyProvinces: ['Abadan', 'Ahvaz', 'Masjed Soleyman', 'Tehran'],
    chokepointRisk: 'Tinggi',
    chokepointName: 'Selat Hormuz & Teluk Persia',
    militaryCriticality: 'Kilang Abadan adalah kilang minyak terbesar di dunia pada masa PD II. Mengisi bahan bakar seluruh Armada Mediterania dan Armada Hindia Royal Navy.',
    dominationStrategy: {
      axisTactic: 'Lakukan kudeta spionase Abwehr di Tehran untuk menutup kilang dari tangan Inggris.',
      alliesTactic: 'Luncurkan invasi gabungan Anglo-Soviet (Operasi Countenance 1941) untuk menggulingkan Shah yang bersimpati ke Jerman dan mengamankan Koridor Persia.',
      sovietsTactic: 'Manfaatkan Koridor Persia sebagai rute utama penerimaan ribuan tank dan truk Lend-Lease dari Amerika Serikat.'
    },
    ww2HistoricalOperation: {
      name: 'Invasi Anglo-Soviet ke Iran (Operasi Countenance)',
      year: 'Agustus 1941',
      outcome: 'Kemenangan Sekutu & Soviet, Pembagian Wilayah Pendudukan',
      details: 'Inggris dan Soviet menduduki Iran dalam hitungan hari untuk menjamin aliran minyak Abadan dan membuka rute logistik kereta api Trans-Iran.'
    }
  },
  {
    id: 'hotspot-iraq-oil',
    name: 'Irak (Mosul & Kirkuk)',
    region: 'middle_east',
    countryTag: 'IRQ',
    countryName: 'Kerajaan Irak (British Influence)',
    faction: 'Allies',
    resourceType: 'oil',
    amount1936: 30,
    worldSharePercent: 2.1,
    x: 605,
    y: 220,
    keyProvinces: ['Kirkuk', 'Mosul', 'Basra', 'Baghdad'],
    chokepointRisk: 'Tinggi',
    chokepointName: 'Pipa Minyak Kirkuk-Haifa & Terusan Suez',
    militaryCriticality: 'Mengalirkan minyak via jalur pipa langsung ke pelabuhan Haifa di Mediterania, menghemat ribuan mil pelayaran konvoi.',
    dominationStrategy: {
      axisTactic: 'Dukung kudeta Perdana Menteri Rashid Ali al-Gaylani (1941) dan kirimkan skuadron Luftwaffe (Fliegerführer Irak) untuk mengusir pangkalan RAF Habbaniya.',
      alliesTactic: 'Serang balik dengan brigade Gurkha dan Pasukan Arab Transyordania (Arab Legion) untuk merebut kembali Baghdad sebelum bala bantuan Jerman tiba.',
      sovietsTactic: 'Amankan perbatasan Kaukasus selatan dari pengaruh Jerman di Timur Tengah.'
    },
    ww2HistoricalOperation: {
      name: 'Perang Anglo-Irak & Pemberontakan Golden Square',
      year: 'Mei 1941',
      outcome: 'Kemenangan Inggris, Pipa Minyak Diselamatkan',
      details: 'Pasukan Inggris mempertahankan pangkalan RAF Habbaniya dan menduduki kembali Baghdad dalam kampanye kilat satu bulan.'
    }
  },

  // ==================== AMERIKA & ATLANTIK (THE ALLIED ARSENAL) ====================
  {
    id: 'hotspot-usa-texas-oil',
    name: 'Amerika Serikat (Texas, Oklahoma & Gulf Coast)',
    region: 'americas',
    countryTag: 'USA',
    countryName: 'Amerika Serikat (USA)',
    faction: 'Allies',
    resourceType: 'oil',
    amount1936: 520,
    worldSharePercent: 36.6,
    x: 235,
    y: 200,
    keyProvinces: ['Houston (Texas)', 'Tulsa (Oklahoma)', 'Port Arthur', 'Dallas'],
    chokepointRisk: 'Sedang',
    chokepointName: 'Teluk Meksiko & Jalur Pipa Big Inch',
    militaryCriticality: 'Pondasi utama kekuatan militer Sekutu sedunia. Tanpa sumur minyak Texas, armada Sekutu tidak akan pernah bisa melancarkan pendaratan D-Day atau lompat pulau di Pasifik.',
    dominationStrategy: {
      axisTactic: 'Kapal selam U-boat Jerman wajib menggelar Operasi Paukenschlag (Drumbeat) di lepas pantai Teluk Texas untuk menenggelamkan kapal tanker sebelum mencapai Atlantik.',
      alliesTactic: 'Bangun sistem pipa minyak raksasa "Big Inch" dan "Little Big Inch" di pedalaman darat dari Texas ke New Jersey untuk menghindari kapal selam U-boat.',
      sovietsTactic: 'Minta pengiriman kargo minyak penerbangan beroktan tinggi (Aviation Fuel 100-Octane) via jalur konvoi Arktik Murmansk.'
    },
    ww2HistoricalOperation: {
      name: 'Operasi Paukenschlag (Serangan U-boat di Pesisir AS)',
      year: '1942',
      outcome: 'Kemenangan Taktis U-boat Awal, Kemudian Dinetralkan oleh Sistem Konvoi AS',
      details: 'U-boat di bawah Laksamana Karl Dönitz menenggelamkan ratusan tanker minyak di lepas pantai Florida dan Texas karena kota-kota pesisir AS awalnya menolak mematikan lampu malam hari (blackout).'
    }
  },
  {
    id: 'hotspot-usa-california-oil',
    name: 'California Selatan (Los Angeles Basin & San Joaquin)',
    region: 'americas',
    countryTag: 'USA',
    countryName: 'Amerika Serikat (USA)',
    faction: 'Allies',
    resourceType: 'oil',
    amount1936: 150,
    worldSharePercent: 10.6,
    x: 180,
    y: 195,
    keyProvinces: ['Los Angeles', 'Bakersfield', 'Long Beach', 'San Diego'],
    chokepointRisk: 'Rendah',
    chokepointName: 'Pangkalan Armada Pasifik San Diego & Terusan Panama',
    militaryCriticality: 'Memasok bahan bakar langsung untuk seluruh operasi Armada Pasifik AS (US Pacific Fleet) dari pangkalan Pearl Harbor hingga Okinawa.',
    dominationStrategy: {
      axisTactic: 'Kapal selam jarak jauh I-boat Jepang sempat melancarkan penembakan meriam ke kilang minyak Ellwood di Santa Barbara (Februari 1942) untuk memicu kepanikan warga.',
      alliesTactic: 'Kawal rute tanker dari Los Angeles ke Hawaii dengan gugus tugas kapal perusak destroyer escorts.',
      sovietsTactic: 'Rute pengiriman kargo Lend-Lease aman lewat kapal berbendera Soviet rute Pasifik Utara (Vladivostok).'
    },
    ww2HistoricalOperation: {
      name: 'Pengeboman Kilang Minyak Ellwood oleh I-17 Jepang',
      year: '23 Februari 1942',
      outcome: 'Kerusakan Ringan, Memicu Histeria Invasi Pesisir Barat AS',
      details: 'Kapal selam raksasa Jepang I-17 menembakkan 16 peluru meriam ke instalasi minyak Ellwood, memicu kepanikan malam berikutnya yang dikenal sebagai "Battle of Los Angeles".'
    }
  },
  {
    id: 'hotspot-venezuela-oil',
    name: 'Venezuela & Antillen Belanda (Maracaibo & Aruba)',
    region: 'americas',
    countryTag: 'VEN',
    countryName: 'Venezuela (Refining in Aruba/Curaçao)',
    faction: 'Neutral',
    resourceType: 'oil',
    amount1936: 165,
    worldSharePercent: 11.6,
    x: 295,
    y: 285,
    keyProvinces: ['Maracaibo', 'Caracas', 'Pulau Aruba', 'Pulau Curaçao'],
    chokepointRisk: 'Tinggi',
    chokepointName: 'Laut Karibia & Selat Karibia-Atlantik',
    militaryCriticality: 'Penyumbang minyak luar negeri terbesar bagi Inggris. Kilang minyak Pulau Aruba memurnikan bahan bakar aviasi untuk pesawat Spitfire RAF saat Battle of Britain.',
    dominationStrategy: {
      axisTactic: 'Luncurkan Operasi Neuland (Februari 1942): kelompok U-boat menyerang tangki minyak Aruba dan menenggelamkan armada kapal tanker danau Maracaibo.',
      alliesTactic: 'Tempatkan garnisun tentara AS di Aruba dan bangun pangkalan patroli pesawat anti-kapal selam di Trinidad.',
      sovietsTactic: 'Pastikan Venezuela tetap ramah kepada Sekutu agar pasokan minyak Lend-Lease tidak terbagi.'
    },
    ww2HistoricalOperation: {
      name: 'Operasi Neuland (Pertempuran Karibia)',
      year: '16 Februari 1942',
      outcome: 'Kerusakan Tanker & Kilang Aruba oleh U-156',
      details: 'U-156 Jerman menembakkan torpedo ke kapal tanker di pelabuhan San Nicolas Aruba dan mencoba menembak kilang minyak dengan meriam dek 105mm.'
    }
  },
  {
    id: 'hotspot-usa-nevada-tungsten',
    name: 'Amerika Serikat (Nevada & California Tungsten Belt)',
    region: 'americas',
    countryTag: 'USA',
    countryName: 'Amerika Serikat (USA)',
    faction: 'Allies',
    resourceType: 'tungsten',
    amount1936: 80,
    worldSharePercent: 10.3,
    x: 195,
    y: 190,
    keyProvinces: ['Pine Creek Mine (Bishop)', 'Mill City (Nevada)', 'Tungsten City'],
    chokepointRisk: 'Rendah',
    chokepointName: 'Pedalaman Benua Amerika (Aman dari Serangan Langsung)',
    militaryCriticality: 'Memasok tungsten untuk produksi meriam tank Sherman 76mm dan amunisi sabot peluru kendali pabrik alutsista Midwest.',
    dominationStrategy: {
      axisTactic: 'Mustahil diserang langsung lewat darat; sabotase intelijen mata-mata Operasi Pastorius adalah satu-satunya opsi teoritis Poros.',
      alliesTactic: 'Riset Excavation Tech secepatnya untuk melipatgandakan output tambang menjadi 120+ unit.',
      sovietsTactic: 'Minta pasokan ingot tungsten dari pabrik AS jika rute Burma terputus oleh invasi Jepang.'
    },
    ww2HistoricalOperation: {
      name: 'Mobilisasi Tambang Pine Creek Bishop California',
      year: '1941-1945',
      outcome: 'Peningkatan Produksi 400% untuk Industri Alutsista',
      details: 'Tambang Pine Creek di ketinggian pegunungan Sierra Nevada ditingkatkan statusnya menjadi instalasi militer rahasia yang dijaga ketat oleh FBI.'
    }
  },

  // ==================== AFRIKA & LAINNYA ====================
  {
    id: 'hotspot-liberia-rubber',
    name: 'Liberia (Perkebunan Karet Firestone Harbel)',
    region: 'africa',
    countryTag: 'LIB',
    countryName: 'Liberia',
    faction: 'Neutral',
    resourceType: 'rubber',
    amount1936: 25,
    worldSharePercent: 2.3,
    x: 445,
    y: 330,
    keyProvinces: ['Harbel (Firestone Plantation)', 'Monrovia'],
    chokepointRisk: 'Sedang',
    chokepointName: 'Celah Sempit Atlantik Tengah (Dakar-Natal Gap)',
    militaryCriticality: 'Satu-satunya sumber karet alam yang tersisa di pihak Sekutu setelah seluruh Asia Tenggara jatuh ke tangan Jepang pada musim semi 1942.',
    dominationStrategy: {
      axisTactic: 'Kirim U-boat untuk memblokade pelabuhan Monrovia dan menghentikan pengiriman getah karet ke New York.',
      alliesTactic: 'AS menandatangani Perjanjian Pertahanan dengan Liberia pada 1942, membangun Pangkalan Udara Robertsfield untuk pendaratan pesawat transatlantik.',
      sovietsTactic: 'Dukung rute udara Sekutu via Afrika Tengah.'
    },
    ww2HistoricalOperation: {
      name: 'Operasi Penyelamatan Pasokan Karet Firestone Liberia',
      year: '1942-1944',
      outcome: 'Memasok Kebutuhan Darurat Militer AS',
      details: 'Perkebunan Firestone seluas 1 juta hektar di Harbel bekerja 24 jam sehari memasok lateks untuk ban pesawat B-17 Flying Fortress saat Malaya dikuasai Jepang.'
    }
  }
];

export const STRATEGIC_CHOKEPOINTS: StrategicChokepoint[] = [
  {
    id: 'choke-malacca',
    name: 'Selat Malaka (Singapura)',
    threatLevel: 'Ekstrem',
    controllingPower: 'United Kingdom (1936) / Kekaisaran Jepang (1942)',
    x: 735,
    y: 370,
    affectedResources: ['rubber', 'oil'],
    strategicImpact: 'Gerbang sempit antara Samudra Hindia dan Laut Cina Selatan. 88% pasokan karet alam dunia dan konvoi minyak Hindia Belanda wajib melintasi selat ini. Siapa yang menguasai Singapura memegang saklar hidup-mati industri pesawat tempur dunia.',
    howToControlOrBypass: 'Kuasai Pangkalan Angkatan Laut Singapura dan pulau Sumatra. Untuk mem-bypass: konvoi harus memutar jauh melintasi selatan Pulau Jawa dan Selat Sunda yang rawan ranjau laut.'
  },
  {
    id: 'choke-suez',
    name: 'Terusan Suez & Pintu Masuk Laut Merah',
    threatLevel: 'Ekstrem',
    controllingPower: 'United Kingdom (Mesir)',
    x: 575,
    y: 235,
    affectedResources: ['oil', 'rubber'],
    strategicImpact: 'Jalur tercepat yang menghubungkan minyak Timur Tengah (Abadan/Kirkuk) dan karet Malaya ke pelabuhan industri Inggris di Liverpool. Jika Suez jatuh, kapal Sekutu terpaksa memutar 8.000 mil laut mengitari Tanjung Harapan Afrika Selatan.',
    howToControlOrBypass: 'Axis: Dorong divisi lapis baja Rommel (Afrika Korps) melintasi El Alamein untuk merebut Alexandria dan Suez. Allies: Wajib pertahankan garis benteng El Alamein dan dominasi udara di Malta.'
  },
  {
    id: 'choke-gibraltar',
    name: 'Selat Gibraltar (The Rock)',
    threatLevel: 'Tinggi',
    controllingPower: 'United Kingdom',
    x: 440,
    y: 228,
    affectedResources: ['oil', 'tungsten'],
    strategicImpact: 'Mengunci seluruh armada Mediterania di dalam atau di luar Samudra Atlantik. Tanpa Gibraltar, kapal perang Italia dan Jerman terkurung di Laut Tengah dan tidak bisa melindungi konvoi wolfram Spanyol.',
    howToControlOrBypass: 'Axis: Operasi Felix (invasi Gibraltar melalui wilayah Spanyol darat dengan artileri berat 600mm Karl-Gerät). Allies: Bentengi terowongan karang Gibraltar dengan meriam pesisir 9.2-inch.'
  },
  {
    id: 'choke-hormuz',
    name: 'Selat Hormuz & Teluk Persia',
    threatLevel: 'Tinggi',
    controllingPower: 'United Kingdom & Iran',
    x: 635,
    y: 245,
    affectedResources: ['oil'],
    strategicImpact: 'Pintu keluar tunggal untuk seluruh minyak dari kilang raksasa Abadan (Iran) dan ladang minyak Irak. Target serangan kapal selam Poros untuk melumpuhkan bahan bakar Armada Hindia Inggris.',
    howToControlOrBypass: 'Allies: Operasi Countenance (pendudukan militer Iran 1941) untuk menjamin patroli anti-kapal selam di Teluk Oman.'
  },
  {
    id: 'choke-danish-straits',
    name: 'Selat Denmark & Laut Baltik (Kattegat/Skagerrak)',
    threatLevel: 'Sedang',
    controllingPower: 'Denmark / Jerman Nazi',
    x: 505,
    y: 145,
    affectedResources: ['oil', 'tungsten'],
    strategicImpact: 'Menutup Laut Baltik menjadi "Danau Pribadi Poros". Mencegah armada Royal Navy Inggris menyusup ke rute pengapalan bijih besi Swedia dan minyak sintetis Jerman di Stettin.',
    howToControlOrBypass: 'Axis: Operasi Weserübung (invasi kilat Denmark dan Norwegia dalam 24 jam pada April 1940) untuk mengunci mulut selat secara permanen.'
  },
  {
    id: 'choke-panama',
    name: 'Terusan Panama',
    threatLevel: 'Tinggi',
    controllingPower: 'United States',
    x: 275,
    y: 295,
    affectedResources: ['oil', 'tungsten'],
    strategicImpact: 'Menghubungkan dua samudra armada AS. Memungkinkan kapal perang, kapal induk, dan tanker minyak Texas bergerak antara Samudra Pasifik dan Atlantik dalam hitungan hari.',
    howToControlOrBypass: 'Axis: Rencana Operasi Sen Toku (serangan pesawat pembom dari kapal selam raksasa I-400 Jepang ke pintu air Gatun Dam). Allies: Pasang jaring torpedo dan skuadron radar pengintai 360 derajat.'
  }
];

export const STRATEGIC_CONVOY_ROUTES: StrategicConvoyRoute[] = [
  {
    id: 'route-rubber-express',
    name: 'Jalur Ekspres Karet Asia ke Liverpool',
    resourceType: 'rubber',
    fromLocation: 'Singapura (Malaya)',
    toLocation: 'Liverpool (Inggris)',
    points: [
      { x: 735, y: 365 }, // Singapore
      { x: 670, y: 345 }, // Ceylon
      { x: 605, y: 285 }, // Aden
      { x: 575, y: 235 }, // Suez
      { x: 510, y: 220 }, // Malta
      { x: 440, y: 228 }, // Gibraltar
      { x: 450, y: 175 }, // Bay of Biscay
      { x: 485, y: 155 }  // Liverpool
    ],
    dailyFlowUnits: 140,
    vulnerabilityZones: [
      'Selat Malaka (ranjau laut Jepang)',
      'Selat Sisilia / Malta (pembom torpedo Savoia-Marchetti Italia)',
      'Teluk Biscay (kapal selam U-boat & Focke-Wulf Fw 200 Condor)'
    ],
    interceptionTactics: 'Tempatkan 10-15 U-boat Jerman di Western Approaches (barat Irlandia) dengan misi Convoy Raiding. Tenggelamkan 2-3 konvoi per bulan untuk menguras persediaan karet pabrik pesawat RAF Supermarine Spitfire.'
  },
  {
    id: 'route-japan-southern-oil',
    name: 'Jalur Darah Minyak Hindia Belanda ke Tokyo',
    resourceType: 'oil',
    fromLocation: 'Balikpapan & Palembang',
    toLocation: 'Yokohama / Kure (Jepang)',
    points: [
      { x: 725, y: 395 }, // Palembang
      { x: 730, y: 335 }, // Saigon
      { x: 770, y: 290 }, // Formosa (Taiwan)
      { x: 800, y: 245 }, // Okinawa
      { x: 825, y: 220 }  // Tokyo / Kure
    ],
    dailyFlowUnits: 85,
    vulnerabilityZones: [
      'Selat Luzon (Convoy choke point utama)',
      'Laut Cina Selatan (zona sergap kapal selam US Navy Gato-class)',
      'Pesisir Formosa (serangan udara kapal induk Task Force 58)'
    ],
    interceptionTactics: 'Taktik Wolfpack Kapal Selam Sekutu di Selat Luzon. Pada 1944, kapal selam AS menenggelamkan lebih dari 75% kapal tanker minyak Jepang, membuat kapal tempur Yamato kehabisan BBM dan hanya bisa mengisi bahan bakar satu arah saat Operasi Ten-Go.'
  },
  {
    id: 'route-atlantic-oil-corridor',
    name: 'Koridor Minyak Atlantik Curacao/Venezuela ke Eropa',
    resourceType: 'oil',
    fromLocation: 'Pulau Aruba / Maracaibo',
    toLocation: 'Clyde / Southampton (Inggris)',
    points: [
      { x: 295, y: 285 }, // Aruba
      { x: 345, y: 250 }, // Bermuda
      { x: 410, y: 200 }, // Mid-Atlantic Air Gap (Black Pit)
      { x: 480, y: 155 }  // British Ports
    ],
    dailyFlowUnits: 120,
    vulnerabilityZones: [
      'Laut Karibia (serangan U-boat permukaan malam hari)',
      'Mid-Atlantic Air Gap (area samudra yang tidak terjangkau pesawat darat)'
    ],
    interceptionTactics: 'Gunakan kapal selam U-boat Type IX jarak jauh di area "Black Pit" Atlantik tengah sebelum Sekutu mengerahkan kapal induk kawal (Escort Carriers) Bogue-class dan pesawat B-24 Very Long Range (VLR).'
  }
];

export interface MajorResourceDominationGuide {
  tag: string;
  countryName: string;
  leader: string;
  startingCondition: {
    rubber: string;
    tungsten: string;
    oil: string;
  };
  achillesHeel: string;
  masterDominationPlan: {
    title: string;
    phase: string;
    targetResource: CriticalResourceType;
    conquestTarget: string;
    stepByStepTactics: string[];
    syntheticAlternativePlan: string;
  }[];
  proTips: string[];
}

export const MAJOR_RESOURCE_DOMINATION_GUIDES: MajorResourceDominationGuide[] = [
  {
    tag: 'GER',
    countryName: 'Jerman (German Reich)',
    leader: 'Adolf Hitler',
    startingCondition: {
      rubber: '0 Unit (Defisit Kritis - Mutlak tergantung sintetis)',
      tungsten: '0 Unit (Defisit Total - Wajib impor dari Portugal/Spanyol)',
      oil: '15 Unit (Hanya cukup untuk 2-3 bulan manuver tank awal)'
    },
    achillesHeel: 'Blokade Laut Atlantik Sekutu memutus 100% impor karet dan minyak luar negeri segera setelah perang meletus pada September 1939.',
    masterDominationPlan: [
      {
        title: 'Operasi Amankan Minyak Ploiești Rumania',
        phase: '1936-1939 (Pre-War)',
        targetResource: 'oil',
        conquestTarget: 'Ploiești (Rumania)',
        stepByStepTactics: [
          'Ambil fokus nasional "Align Romania" atau selesaikan "Second Vienna Award" untuk memaksa Rumania masuk ke Blok Poros secara damai.',
          'Bangun infrastruktur level 5 di distrik Prahova dan pasang hukum ekonomi War Economy.',
          'Tempatkan 2-3 divisi Flak Anti-Air di sekitar Ploiești untuk menembak jatuh skuadron pembom Sekutu dari Mediterania.'
        ],
        syntheticAlternativePlan: 'Wajib riset Synthetic Oil I-III sebelum 1940. Bangun minimal 12-16 Synthetic Refineries di pedalaman Jerman (Hanover, Thuringia, Silesia) yang aman dari serangan pembom taktis Sekutu.'
      },
      {
        title: 'Perang Ekonomi & Monopoli Wolfram Semenanjung Iberia',
        phase: '1938-1941',
        targetResource: 'tungsten',
        conquestTarget: 'Portugal (Panasqueira) & Spanyol (Galicia)',
        stepByStepTactics: [
          'Gunakan 8-12 Pabrik Sipil (Civs) untuk mengimpor tungsten dari Portugal setiap hari. Jangan biarkan Inggris memborong kuota pasar terbuka!',
          'Kirimkan bantuan korps sukarelawan ke Nasionalis Spanyol saat Perang Saudara Spanyol agar Franco bersedia menandatangani perjanjian ekspor konsentrat wolfram.',
          'Jika Inggris memblokade perdagangan laut, jalankan "Operation Isabella" (invasi darat Spanyol dan Portugal melintasi Pyrenees) untuk merebut tambang Panasqueira secara fisik.'
        ],
        syntheticAlternativePlan: 'Tungsten tidak bisa disintesis! Prioritaskan riset Excavation II dan III (+10% dan +20% output tambang) untuk melipatgandakan hasil tambang domestik yang sedikit.'
      },
      {
        title: 'Operasi Edelweiss: Menembus Jantung Minyak Kaukasus (Baku)',
        phase: '1942 (Operation Barbarossa Phase 2)',
        targetResource: 'oil',
        conquestTarget: 'Maikop, Grozny & Baku (Uni Soviet)',
        stepByStepTactics: [
          'Fokuskan Korps Lapis Baja Panzer Grup Selatan melewati Kharkov dan Rostov menuju sungai Don.',
          'Lindungi sayap utara di Stalingrad agar rute pasokan kereta api ke Kaukasus tidak terputus di tengah jalan.',
          'Rebut kilang Maikop dan Grozny untuk memotong 70% suplai bahan bakar Tentara Merah Soviet.'
        ],
        syntheticAlternativePlan: 'Jika gerak maju ke Kaukasus macet, tingkatkan target Synthetic Refineries menjadi 30 buah dengan teknologi Coal Liquefaction IV.'
      }
    ],
    proTips: [
      'Gunakan teknologi "Fuel Silos": Bangun 4-6 Fuel Silos di Brandenburg sebelum 1939 dan isi penuh stok minyak saat masih damai via impor dari Venezuela atau AS.',
      'Riset teknologi "Buna Rubber" seawal mungkin di tab Industry. 1 Pabrik Sintetis dengan riset Rubber IV menghasilkan +4 Karet dan +2 Minyak.',
      'Jangan memproduksi tank berat (Tiger/King Tiger) secara berlebihan sebelum pasokan Wolfram Spanyol/Portugal benar-benar stabil.'
    ]
  },
  {
    tag: 'JAP',
    countryName: 'Kekaisaran Jepang (Empire of Japan)',
    leader: 'Hirohito / Hideki Tojo',
    startingCondition: {
      rubber: '15 Unit (Defisit - Bergantung pada impor Malaya/Hindia)',
      tungsten: '45 Unit (Cukup untuk senjata infantri, kurang untuk tank)',
      oil: '10 Unit (Kritis! Stok cadangan hanya bertahan 18 bulan armada)'
    },
    achillesHeel: 'Ketergantungan 80% pada impor minyak dari Amerika Serikat. Saat AS memberlakukan embargo minyak 1941, armada laut Kekaisaran (Kido Butai) akan mati mesin dalam 1,5 tahun.',
    masterDominationPlan: [
      {
        title: 'Doktrin Nanshin-ron: Menyerbu Lumbung Karet & Minyak Hindia Belanda',
        phase: '1941-1942',
        targetResource: 'oil',
        conquestTarget: 'Palembang, Balikpapan, Tarakan (Hindia Belanda) & Malaya',
        stepByStepTactics: [
          'Terjunkan pasukan payung (Paratroopers) langsung ke ladang minyak Palembang untuk mencegah tentara Belanda meledakkan instalasi kilang.',
          'Serbu benteng Singapura lewat jalan darat Malaya untuk menguasai lebih dari 500 unit Karet dunia sekaligus mengamankan Selat Malaka.',
          'Kuasai pelabuhan minyak Tarakan dan Balikpapan untuk mengisi kembali tangki armada kapal induk Kido Butai.'
        ],
        syntheticAlternativePlan: 'Jepang kekurangan pabrik sipil untuk membangun kilang sintetis; menguasai Hindia Belanda dan Malaya adalah satu-satunya jalan kelangsungan hidup kekaisaran.'
      },
      {
        title: 'Benteng Pengawal Konvoi: Melindungi Garis Hidup Laut Cina Selatan',
        phase: '1942-1944',
        targetResource: 'rubber',
        conquestTarget: 'Selat Luzon, Formosa & Pangkalan Udara Filipina',
        stepByStepTactics: [
          'Bangun sedikitnya 40-60 kapal perusak murah (Destroyer dengan sonar & depth charges) untuk menjalankan misi Convoy Escort dari Palembang ke Yokohama.',
          'Tempatkan sayap pesawat Naval Bomber berpusat di pangkalan udara Formosa, Saigon, dan Manila untuk memburu kapal selam AS.',
          'Jangan gunakan seluruh armada perusak untuk menyerang kapal perang musuh; jika konvoi minyak tenggelam, kapal induk tercanggih pun tidak akan bisa berlayar.'
        ],
        syntheticAlternativePlan: 'Tingkatkan teknologi Excavation I-IV di wilayah jajahan Korea dan Manchuria untuk memaksimalkan ekstraksi tambang wolfram.'
      }
    ],
    proTips: [
      'Segera setelah merebut Palembang dan Tarakan, kerahkan pabrik sipil untuk memperbaiki kilang yang rusak (Infrastructure & Refinery repair) agar produksi minyak pulih 100% dalam tempo 90 hari.',
      'Amankan Siam (Thailand) sebagai sekutu Poros tanpa perang; Siam menyediakan pangkalan darat gratis dan puluhan unit Tungsten tambahan.',
      'Simpan stok minyak sebelum menyerang Pearl Harbor dengan mengimpor maksimal dari AS saat ketegangan dunia (World Tension) masih di bawah 25%.'
    ]
  },
  {
    tag: 'ENG',
    countryName: 'Britania Raya (United Kingdom)',
    leader: 'Winston Churchill',
    startingCondition: {
      rubber: '600+ Unit via Malaya & Ceylon (Monopoli Dunia)',
      tungsten: '170+ Unit via Burma & Portugal (Sangat Kuat)',
      oil: '0 Unit di Kepulauan Inggris (100% bergantung pada konvoi laut)'
    },
    achillesHeel: 'Seluruh pulau Inggris tidak memiliki sumur minyak domestik. Jalur konvoi tanker laut Atlantik dan Mediterania sangat rentan terhadap kapal selam U-boat Jerman.',
    masterDominationPlan: [
      {
        title: 'Proteksi Benteng Singapura & Monopoli Karet Global',
        phase: '1936-1941',
        targetResource: 'rubber',
        conquestTarget: 'Semenanjung Malaya & Selat Malaka',
        stepByStepTactics: [
          'Perkuat pangkalan Angkatan Laut Singapura ke level 10 dan tempatkan gugus tugas kapal tempur Prince of Wales.',
          'Bangun pangkalan udara di Malaya dan tempatkan sedikitnya 200 pesawat tempur Hawker Hurricane untuk mencegah pendaratan amfibi Jepang.',
          'Tolak ekspor karet ke negara-negara Poros dengan beralih ke hukum perdagangan "Export Focus" atau "Limited Exports" saat tensi perang naik.'
        ],
        syntheticAlternativePlan: 'Inggris tidak memerlukan pabrik karet sintetis selama Singapura dan Ceylon tetap berada di bawah kendali Persemakmuran.'
      },
      {
        title: 'Mempertahankan Terusan Suez & Kilang Abadan Timur Tengah',
        phase: '1940-1943',
        targetResource: 'oil',
        conquestTarget: 'Irak, Iran, dan Terusan Suez Mesir',
        stepByStepTactics: [
          'Hancurkan pemberontakan Rashidi di Irak (1941) secepatnya untuk mengamankan pipa minyak Kirkuk-Haifa.',
          'Lakukan invasi militer bersama Soviet ke Iran (Operasi Countenance) untuk menjamin kilang Abadan tidak disabotase agen Jerman.',
          'Kalahkan tentara Afrika Korps Rommel di El Alamein untuk memastikan jalur pasokan laut pendek Mediterania tetap terbuka.'
        ],
        syntheticAlternativePlan: 'Jika Suez terancam jatuh, alihkan seluruh rute konvoi mengitari Tanjung Harapan (Afrika Selatan) dan kawal dengan kapal induk ringan.'
      }
    ],
    proTips: [
      'Gunakan strategi "Pre-emptive Wolfram Buying": Borong seluruh pasokan wolfram Portugal dengan pabrik sipil agar Jerman tercekik dan tidak mampu merakit tank Panzer IV.',
      'Luncurkan Operasi Tidal Wave (pemboman strategis ke Ploiești Rumania) dari pangkalan udara Cyrenaica (Libya) untuk memutus 60% bahan bakar Hitler.'
    ]
  },
  {
    tag: 'USA',
    countryName: 'Amerika Serikat (USA)',
    leader: 'Franklin D. Roosevelt',
    startingCondition: {
      rubber: '0 Unit di Daratan Utama (100% bergantung pada impor Pasifik)',
      tungsten: '80 Unit di Nevada/California (Cukup untuk awal, butuh impor jika perang besar)',
      oil: '670+ Unit (Raksasa Minyak Dunia - Menguasai ~50% total global)'
    },
    achillesHeel: 'Kekurangan total karet alam domestik! Jika Jepang merebut Singapura dan Hindia Belanda, pabrik pesawat AS di Detroit dan Seattle kekurangan bahan ban pesawat.',
    masterDominationPlan: [
      {
        title: 'Program Karet Sintetis Darurat Nasional (Rubber Reserve Company)',
        phase: '1941-1943',
        targetResource: 'rubber',
        conquestTarget: 'Bangun Kompleks Sintetis di Ohio & Texas',
        stepByStepTactics: [
          'Gunakan kapasitas industri raksasa AS (200+ pabrik sipil) untuk membangun 20 Synthetic Refineries sesaat setelah perang Pasifik pecah.',
          'Amankan jalur laut ke perkebunan Firestone di Liberia dan kembangkan program karet liar di lembah Amazon Brasil.',
          'Riset teknologi Synthetic Rubber IV untuk meningkatkan efisiensi getah karet buatan per pabrik.'
        ],
        syntheticAlternativePlan: 'Ekonomi AS begitu masif sehingga mampu membangun 30 pabrik sintetis tanpa mengganggu produksi tank dan kapal perang.'
      },
      {
        title: 'Senjata Geopolitik: Embargo Minyak 1941 Terhadap Blok Poros',
        phase: 'Juli 1941',
        targetResource: 'oil',
        conquestTarget: 'Pemutusan Total Ekspor Minyak ke Jepang & Poros',
        stepByStepTactics: [
          'Aktifkan embargo minyak total terhadap Kekaisaran Jepang sebagai respon atas pendudukan Indochina Prancis.',
          'Gunakan armada kapal selam US Navy (rute pangkalan Pearl Harbor dan Perth Australia) untuk memburu setiap kapal tanker yang mencoba berlayar dari Indonesia ke Jepang.',
          'Suplai Uni Soviet dengan jutaan ton avtur penerbangan beroktan tinggi dan bensin truk via jalur Lend-Lease Koridor Persia.'
        ],
        syntheticAlternativePlan: 'AS memiliki cadangan minyak terbukti terbesar di dunia; tidak memerlukan kilang minyak sintetis sama sekali.'
      }
    ],
    proTips: [
      'Bangun pipa minyak darat "Big Inch" dan "Little Big Inch" dari Texas ke New York untuk mengeliminasi ancaman U-boat Jerman di Teluk Meksiko.',
      'Gunakan hukum perdagangan "Free Trade" di awal permainan (1936-1939) untuk memanen bonus riset +10% dan kecepatan konstruksi pabrik +15% berkat ekspor minyak besar-besaran.'
    ]
  },
  {
    tag: 'SOV',
    countryName: 'Uni Soviet (USSR)',
    leader: 'Iosif Stalin',
    startingCondition: {
      rubber: '0 Unit (Defisit Kritis - Mengandalkan impor Sekutu & Lend-Lease)',
      tungsten: '40 Unit di Pegunungan Ural (Kurang untuk memproduksi ribuan T-34)',
      oil: '240+ Unit di Kaukasus (Baku/Grozny/Maikop - Sangat Melimpah)'
    },
    achillesHeel: 'Ketergantungan 70% produksi minyak pada wilayah Kaukasus (Baku) yang berada sangat dekat dengan perbatasan front selatan Jerman.',
    masterDominationPlan: [
      {
        title: 'Membentengi Benteng Kaukasus & Mempertahankan Baku',
        phase: '1941-1943',
        targetResource: 'oil',
        conquestTarget: 'Baku, Grozny, Maikop & Stalingrad',
        stepByStepTactics: [
          'Tempatkan sedikitnya 2 Tentara Lapangan (24-48 divisi infantri bertameng pegunungan) di celah Gunung Kaukasus.',
          'Jangan biarkan pasukan tank Jerman melewati garis Sungai Don dan kota Stalingrad.',
          'Jika Maikop terancam jatuh, gunakan keputusan "Scorched Earth" (Bumi Hangus) untuk merusak sumur bor sehingga Jerman tidak bisa menyedot minyak selama 180 hari.'
        ],
        syntheticAlternativePlan: 'Riset fokus nasional "Baku Kedua" (Second Baku) di kawasan Volga-Ural (Bashkiria & Tatarstan) untuk menciptakan cadangan minyak cadangan jauh di pedalaman Rusia yang mustahil dijangkau pesawat pembom Jerman.'
      },
      {
        title: 'Mengamankan Wolfram Pedalaman & Barter Tiongkok',
        phase: '1937-1944',
        targetResource: 'tungsten',
        conquestTarget: 'Tambang Pegunungan Altai & Jalur Xinjiang',
        stepByStepTactics: [
          'Riset teknologi Excavation I-V di seluruh tambang Ural dan Siberia untuk melipatgandakan output tungsten domestik.',
          'Beli tungsten dari Sheng Shicai di Xinjiang (Provinsi Sinkiang Tiongkok) lewat jalur darat yang aman dari serangan laut.',
          'Tukar kayu dan minyak dengan ingot tungsten Amerika lewat perjanjian protokol Lend-Lease rute Vladivostok.'
        ],
        syntheticAlternativePlan: 'Bangun pabrik karet sintetis Sovpren di Moskow dan Gorky untuk menjaga kelangsungan pabrik tank T-34.'
      }
    ],
    proTips: [
      'Gunakan keputusan "Evakuasi Industri ke Ural" (Relocation of Industry to the Urals) segera setelah perang dengan Jerman dimulai untuk memindahkan pabrik ke zona aman.',
      'Stok bahan bakar Soviet sangat besar, tetapi cadangan karetnya nol: jangan ragu menukar 5-10 pabrik sipil untuk mengimpor karet dari Hindia Belanda sebelum perang Pasifik meletus.'
    ]
  }
];
