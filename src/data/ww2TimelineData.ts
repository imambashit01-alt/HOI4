// Data Sejarah Garis Waktu Perang Dunia II (1936 - 1945)
// Berisi detail pertempuran, kontrol teritorial, garis depan militer (frontlines), dan panah manuver taktis.

export type FactionControl =
  | 'Axis'
  | 'Axis_Occupied'
  | 'Allies'
  | 'Allied_Liberated'
  | 'Comintern'
  | 'Vichy'
  | 'Neutral';

export interface BattleHotspot {
  id: string;
  name: string;
  x: number;
  y: number;
  type: 'land' | 'naval' | 'air';
  date: string;
  significance: string;
  casualties: string;
  outcome: 'Axis Victory' | 'Allied Victory' | 'Soviet Victory' | 'Indecisive';
}

export interface TacticalArrow {
  id: string;
  label: string;
  pathD: string; // SVG path command
  color: string;
  attacker: 'Axis' | 'Allies' | 'Comintern';
}

export interface WW2TimelineEvent {
  id: string;
  year: number;
  dateStr: string;
  title: string;
  subtitle: string;
  theater: 'Western Europe' | 'Eastern Front' | 'Mediterranean & Africa' | 'Pacific & Global' | 'Total War';
  phase: 'Persiapan & Ekspansi Awal' | 'Serangan Kilat Poros (Blitzkrieg)' | 'Titik Balik (Turning Points)' | 'Serangan Balik Sekutu & Soviet' | 'Keruntuhan Akhir Poros';
  description: string;
  belligerents: {
    attackers: string;
    defenders: string;
  };
  keyLeaders: string[];
  totalCasualtiesEstimate: string;
  worldTension: number; // in %
  associatedScenarioId?: string; // id in GlobalWarTracker
  // Territorial control mapping for European countries
  territoryState: Record<string, FactionControl>;
  // Frontlines (lines of contact)
  frontlines: {
    name: string;
    pathD: string;
    color: string;
    dashed?: boolean;
  }[];
  // Tactical military offensive arrows
  tacticalArrows: TacticalArrow[];
  // Battle markers
  hotspots: BattleHotspot[];
  // Summary tactical consequences
  impactSummary: string;
  hoi4MechanicTip: string;
}

export const WW2_TIMELINE_EVENTS: WW2TimelineEvent[] = [
  // 1. 1936: Rhineland Remilitarization
  {
    id: '1936_rhineland',
    year: 1936,
    dateStr: '7 Maret 1936',
    title: 'Remiliterisasi Rhineland & Meletusnya Perang Saudara Spanyol',
    subtitle: 'Langkah Pertama Hitler Menguji Ketegasan Sekutu Barat',
    theater: 'Western Europe',
    phase: 'Persiapan & Ekspansi Awal',
    description: 'Pasukan Wehrmacht memasuki zona demiliterisasi Rhineland melanggar Traktat Versailles dan Perjanjian Locarno. Prancis dan Inggris ragu-ragu dan tidak mengambil tindakan militer balasan. Sementara di Spanyol meletus perang saudara tempat Poros dan Uni Soviet menguji doktrin dan persenjataan baru mereka.',
    belligerents: {
      attackers: 'Jerman Nazi (Reichswehr/Wehrmacht)',
      defenders: 'Tanpa Perlawanan (Diplomasi Inggris-Prancis)'
    },
    keyLeaders: ['Adolf Hitler', 'Werner von Blomberg', 'Albert Lebrun', 'Stanley Baldwin'],
    totalCasualtiesEstimate: 'Hampir nihil (Korban Perang Spanyol: ~500.000 jiwa)',
    worldTension: 15,
    associatedScenarioId: 'blitzkrieg_1939',
    territoryState: {
      ger: 'Axis',
      fra: 'Allies',
      eng: 'Allies',
      sov: 'Comintern',
      ita: 'Axis',
      pol: 'Neutral',
      spa: 'Neutral',
      swe: 'Neutral',
      nor: 'Neutral',
      fin: 'Neutral',
      rom: 'Neutral',
      yug: 'Neutral',
      gre: 'Neutral',
      tur: 'Neutral',
      cze: 'Neutral',
      aus: 'Neutral',
      hun: 'Neutral',
      bul: 'Neutral',
      bel: 'Neutral',
      hol: 'Neutral',
      por: 'Neutral',
      ire: 'Neutral',
      den: 'Neutral',
      swi: 'Neutral',
      bal: 'Neutral'
    },
    frontlines: [],
    tacticalArrows: [
      { id: 'rhineland_march', label: 'Wehrmacht ke Rhineland', pathD: 'M 440 330 Q 420 330 400 335', color: '#ef4444', attacker: 'Axis' }
    ],
    hotspots: [
      {
        id: 'spot_rhineland',
        name: 'Zona Demiliterisasi Rhineland',
        x: 405,
        y: 335,
        type: 'land',
        date: '7 Maret 1936',
        significance: 'Ujian awal determinasi Sekutu Barat. Sukses mutlak Jerman tanpa meletuskan sebutir peluru.',
        casualties: '0 Korban',
        outcome: 'Axis Victory'
      },
      {
        id: 'spot_madrid',
        name: 'Madrid & Perang Spanyol',
        x: 230,
        y: 470,
        type: 'land',
        date: '1936-1939',
        significance: 'Laboratorium doktrin CAS (Legion Condor) dan sukarelawan divisi internasional.',
        casualties: '~500.000 korban',
        outcome: 'Axis Victory'
      }
    ],
    impactSummary: 'Jerman memulihkan perbatasan baratnya dan mulai membangun benteng Garis Siegfried (Westwall). World Tension mulai naik.',
    hoi4MechanicTip: 'Mengambil fokus Rhineland membuka pohon industri Four Year Plan dan memicu peristiwa peristiwa protes diplomatik Prancis.'
  },

  // 2. 1938: Anschluss & Munich
  {
    id: '1938_munich',
    year: 1938,
    dateStr: '12 Maret - 30 September 1938',
    title: 'Anschluss Austria & Perjanjian Munich (Sudetenland)',
    subtitle: 'Puncak Kebijakan Appeasement Sekutu Barat',
    theater: 'Western Europe',
    phase: 'Persiapan & Ekspansi Awal',
    description: 'Jerman menganeksasi Austria tanpa pertumpahan darah (Anschluss). Tak lama kemudian, Hitler menuntut wilayah Sudetenland dari Cekoslowakia. Melalui Perjanjian Munich, Perdana Menteri Inggris Neville Chamberlain menyetujui aneksasi demi mempertahankan "perdamaian untuk zaman kita" (Peace for our time).',
    belligerents: {
      attackers: 'Jerman Nazi & Kerajaan Italia',
      defenders: 'Cekoslowakia (Dikhianati oleh Inggris & Prancis)'
    },
    keyLeaders: ['Adolf Hitler', 'Neville Chamberlain', 'Édouard Daladier', 'Edvard Beneš'],
    totalCasualtiesEstimate: 'Tekanan diplomatik tanpa perang terbuka',
    worldTension: 35,
    associatedScenarioId: 'blitzkrieg_1939',
    territoryState: {
      ger: 'Axis',
      aus: 'Axis', // Annexed
      fra: 'Allies',
      eng: 'Allies',
      sov: 'Comintern',
      ita: 'Axis',
      pol: 'Neutral',
      spa: 'Neutral',
      swe: 'Neutral',
      nor: 'Neutral',
      fin: 'Neutral',
      rom: 'Neutral',
      yug: 'Neutral',
      gre: 'Neutral',
      tur: 'Neutral',
      cze: 'Axis_Occupied', // Sudeten ceded
      hun: 'Neutral',
      bul: 'Neutral',
      bel: 'Neutral',
      hol: 'Neutral',
      por: 'Neutral',
      ire: 'Neutral',
      den: 'Neutral',
      swi: 'Neutral',
      bal: 'Neutral'
    },
    frontlines: [],
    tacticalArrows: [
      { id: 'anschluss_arrow', label: 'Aneksasi Austria', pathD: 'M 460 360 L 465 390', color: '#ef4444', attacker: 'Axis' },
      { id: 'sudeten_arrow', label: 'Tekanan Sudetenland', pathD: 'M 480 340 L 510 345', color: '#ef4444', attacker: 'Axis' }
    ],
    hotspots: [
      {
        id: 'spot_vienna',
        name: 'Wina (Anschluss Austria)',
        x: 480,
        y: 380,
        type: 'land',
        date: '12 Maret 1938',
        significance: 'Penyatuan Austria ke dalam Reich Jerman menambah 7 juta penduduk dan divisi tentara.',
        casualties: 'Nihil',
        outcome: 'Axis Victory'
      },
      {
        id: 'spot_munich',
        name: 'Munich (Penyerahan Sudetenland)',
        x: 440,
        y: 365,
        type: 'land',
        date: '30 September 1938',
        significance: 'Cekoslowakia kehilangan jaringan benteng pegunungan dan pabrik senjata berat Skoda Works.',
        casualties: 'Nihil',
        outcome: 'Axis Victory'
      }
    ],
    impactSummary: 'Jerman mendapatkan industri Skoda Works dan memperpendek perbatasan serang ke Polandia. Moril militer Jerman melonjak tajam.',
    hoi4MechanicTip: 'Jika Cekoslowakia menolak di Munich, Jerman berisiko perang dini melawan Ceko dan Prancis jika Sekutu menjaminnya.'
  },

  // 3. 1939: Invasion of Poland
  {
    id: '1939_poland',
    year: 1939,
    dateStr: '1 September - 6 Oktober 1939',
    title: 'Invasi Polandia (Fall Weiss) - Meletusnya Perang Dunia II',
    subtitle: 'Debut Mematikan Doktrin Perang Kilat (Blitzkrieg)',
    theater: 'Western Europe',
    phase: 'Serangan Kilat Poros (Blitzkrieg)',
    description: 'Wehrmacht meluncurkan invasi dari utara, barat, dan selatan ke Polandia, didahului pemboman Luftwaffe dan manuver divisi Panzer Guderian. Tanggal 3 September, Inggris dan Prancis menyatakan perang kepada Jerman. Pada 17 September, Uni Soviet menyerbu Polandia dari timur sesuai protokol rahasia Pakta Molotov-Ribbentrop.',
    belligerents: {
      attackers: 'Jerman Nazi & Uni Soviet (Invasi Bersama)',
      defenders: 'Republik Polandia (Sekutu Inggris & Prancis)'
    },
    keyLeaders: ['Fedor von Bock', 'Gerd von Rundstedt', 'Edward Rydz-Śmigły', 'Władysław Sikorski'],
    totalCasualtiesEstimate: 'Polandia: ~200.000 gugur/luka & 700.000 tawanan; Jerman: ~44.000 korban; Soviet: ~10.000 korban',
    worldTension: 100,
    associatedScenarioId: 'blitzkrieg_1939',
    territoryState: {
      ger: 'Axis',
      aus: 'Axis',
      cze: 'Axis_Occupied',
      pol: 'Axis_Occupied', // Split with Soviet
      fra: 'Allies',
      eng: 'Allies',
      sov: 'Comintern',
      ita: 'Axis',
      spa: 'Neutral',
      swe: 'Neutral',
      nor: 'Neutral',
      fin: 'Neutral',
      rom: 'Neutral',
      yug: 'Neutral',
      gre: 'Neutral',
      tur: 'Neutral',
      hun: 'Neutral',
      bul: 'Neutral',
      bel: 'Neutral',
      hol: 'Neutral',
      por: 'Neutral',
      ire: 'Neutral',
      den: 'Neutral',
      swi: 'Neutral',
      bal: 'Neutral'
    },
    frontlines: [
      { name: 'Front Polandia Barat', pathD: 'M 530 270 Q 560 300 520 340', color: '#ef4444' },
      { name: 'Front Soviet Timur', pathD: 'M 620 250 L 610 330', color: '#dc2626' }
    ],
    tacticalArrows: [
      { id: 'arrow_pol_north', label: 'Heeresgruppe Nord', pathD: 'M 500 270 Q 540 280 570 290', color: '#ef4444', attacker: 'Axis' },
      { id: 'arrow_pol_south', label: 'Heeresgruppe Süd', pathD: 'M 490 350 Q 530 330 570 305', color: '#ef4444', attacker: 'Axis' },
      { id: 'arrow_pol_soviet', label: 'Serbuan Red Army', pathD: 'M 640 290 L 590 295', color: '#dc2626', attacker: 'Comintern' }
    ],
    hotspots: [
      {
        id: 'spot_westerplatte',
        name: 'Danzig & Westerplatte',
        x: 535,
        y: 265,
        type: 'naval',
        date: '1 September 1939',
        significance: 'Tembakan kapal Schleswig-Holstein menandai peluru pertama Perang Dunia II di Eropa.',
        casualties: '~1.000 korban',
        outcome: 'Axis Victory'
      },
      {
        id: 'spot_warsaw',
        name: 'Pengepungan Warsawa',
        x: 570,
        y: 295,
        type: 'land',
        date: '8-28 September 1939',
        significance: 'Pemboman karpet udara Luftwaffe memaksa ibukota Polandia menyerah tanpa syarat.',
        casualties: '~40.000 korban warga & tentara',
        outcome: 'Axis Victory'
      }
    ],
    impactSummary: 'Polandia terbagi dua di sepanjang Sungai Bug. Inggris dan Prancis memasuki status perang (Phoney War). World Tension mencapai 100%.',
    hoi4MechanicTip: 'Menggunakan fokus "Danzig or War" memicu jaminan Inggris. Pastikan divisi Panzer terkonsentrasi untuk membobol garis perbatasan.'
  },

  // 4. 1940: Fall of France & Dunkirk
  {
    id: '1940_fall_of_france',
    year: 1940,
    dateStr: '10 Mei - 25 Juni 1940',
    title: 'Kejatuhan Prancis & Evakuasi Dunkirk (Fall Gelb & Rot)',
    subtitle: 'Runtuhnya Kekuatan Darat Utama Sekutu dalam 6 Pekan',
    theater: 'Western Europe',
    phase: 'Serangan Kilat Poros (Blitzkrieg)',
    description: 'Wehrmacht mengejutkan Sekutu dengan melintasi Hutan Ardennes yang dianggap mustahil dilalui tank (Rencana Manstein). Pasukan Jerman mengepung Korps Ekspedisi Inggris (BEF) dan Tentara Prancis di Dunkirk. Paris jatuh pada 14 Juni. Prancis menandatangani gencatan senjata di Compiègne; wilayah utara diduduki, dan wilayah selatan menjadi rezim boneka Prancis Vichy.',
    belligerents: {
      attackers: 'Jerman Nazi & Kerajaan Italia',
      defenders: 'Prancis, Inggris Raya, Belgia & Belanda'
    },
    keyLeaders: ['Heinz Guderian', 'Erich von Manstein', 'Maurice Gamelin', 'Charles de Gaulle', 'Philippe Pétain'],
    totalCasualtiesEstimate: 'Sekutu: ~360.000 gugur/luka & 1,9 juta tawanan; Jerman: ~156.000 korban',
    worldTension: 100,
    associatedScenarioId: 'blitzkrieg_1939',
    territoryState: {
      ger: 'Axis',
      aus: 'Axis',
      cze: 'Axis_Occupied',
      pol: 'Axis_Occupied',
      hol: 'Axis_Occupied',
      bel: 'Axis_Occupied',
      fra: 'Axis_Occupied', // Northern occupied, Southern Vichy
      eng: 'Allies',
      sov: 'Comintern',
      ita: 'Axis',
      den: 'Axis_Occupied',
      nor: 'Axis_Occupied',
      spa: 'Neutral',
      swe: 'Neutral',
      fin: 'Neutral',
      rom: 'Neutral',
      yug: 'Neutral',
      gre: 'Neutral',
      tur: 'Neutral',
      hun: 'Axis',
      bul: 'Neutral',
      por: 'Neutral',
      ire: 'Neutral',
      swi: 'Neutral',
      bal: 'Comintern'
    },
    frontlines: [
      { name: 'Garis Maginot (Dilewati)', pathD: 'M 380 345 L 390 375 L 395 405', color: '#3b82f6', dashed: true },
      { name: 'Garis Gencatan Senjata Vichy', pathD: 'M 330 405 Q 360 415 390 410', color: '#eab308' }
    ],
    tacticalArrows: [
      { id: 'ardennes_thrust', label: 'Terobosan Panzer Ardennes', pathD: 'M 390 325 Q 365 330 330 315', color: '#ef4444', attacker: 'Axis' },
      { id: 'dunkirk_evac', label: 'Operasi Dynamo Evakuasi BEF', pathD: 'M 330 315 L 325 285', color: '#3b82f6', attacker: 'Allies' },
      { id: 'paris_drive', label: 'Serbuan Menuju Paris', pathD: 'M 345 320 L 345 350', color: '#ef4444', attacker: 'Axis' }
    ],
    hotspots: [
      {
        id: 'spot_sedan',
        name: 'Terobosan Sedan & Sungai Meuse',
        x: 365,
        y: 335,
        type: 'land',
        date: '13-15 Mei 1940',
        significance: 'Guderian menyeberangi Meuse, membongkar seluruh poros pertahanan Prancis dalam 48 jam.',
        casualties: '~15.000 korban',
        outcome: 'Axis Victory'
      },
      {
        id: 'spot_dunkirk',
        name: 'Evakuasi Dunkirk (Operasi Dynamo)',
        x: 330,
        y: 310,
        type: 'naval',
        date: '26 Mei - 4 Juni 1940',
        significance: 'Armada perahu kecil sipil dan AL Inggris menyelamatkan 338.226 serdadu Sekutu melintasi Selat Inggris.',
        casualties: '~68.000 prajurit BEF tertinggal / tertawan',
        outcome: 'Allied Victory'
      },
      {
        id: 'spot_paris',
        name: 'Jatuhnya Ibukota Paris',
        x: 345,
        y: 350,
        type: 'land',
        date: '14 Juni 1940',
        significance: 'Paris dinyatakan kota terbuka; pemerintahan Prancis bubar dan melahirkan Vichy.',
        casualties: 'Kota diserahkan tanpa pemboman besar',
        outcome: 'Axis Victory'
      }
    ],
    impactSummary: 'Inggris Raya berdiri sendirian menghadapi Blok Poros di Eropa barat. Pembentukan Free France di bawah Jenderal De Gaulle.',
    hoi4MechanicTip: 'Gunakan fokus "Around Maginot" untuk menyerang lewat Belanda dan Belgia sebelum Prancis sempat memperkuat garis perbatasan utara.'
  },

  // 5. 1940: Battle of Britain
  {
    id: '1940_battle_of_britain',
    year: 1940,
    dateStr: '10 Juli - 31 Oktober 1940',
    title: 'Pertempuran Britania (Battle of Britain & The Blitz)',
    subtitle: 'Duel Udara Akbar Pertama Menggagalkan Invasi Singa Laut',
    theater: 'Western Europe',
    phase: 'Serangan Kilat Poros (Blitzkrieg)',
    description: 'Luftwaffe melancarkan ofensif udara masif untuk melumpuhkan RAF guna mempersiapkan invasi amfibi ke Inggris (Operasi Singa Laut / Seelöwe). Namun, jaringan stasiun radar terpadu Inggris (Dowding System) dan keunggulan pesawat tempur Spitfire serta Hurricane berhasil mematahkan dominasi Jerman.',
    belligerents: {
      attackers: 'Luftwaffe Jerman Nazi',
      defenders: 'Royal Air Force (Inggris, Polandia, Kanada, Ceko)'
    },
    keyLeaders: ['Hermann Göring', 'Hugh Dowding', 'Keith Park', 'Winston Churchill'],
    totalCasualtiesEstimate: 'Jerman: 1.887 pesawat & ~2.600 penerbang; Inggris: 1.023 pesawat & 544 penerbang (+43.000 warga sipil Blitz)',
    worldTension: 100,
    associatedScenarioId: 'blitzkrieg_1939',
    territoryState: {
      ger: 'Axis',
      aus: 'Axis',
      cze: 'Axis_Occupied',
      pol: 'Axis_Occupied',
      hol: 'Axis_Occupied',
      bel: 'Axis_Occupied',
      fra: 'Axis_Occupied',
      eng: 'Allies',
      sov: 'Comintern',
      ita: 'Axis',
      den: 'Axis_Occupied',
      nor: 'Axis_Occupied',
      spa: 'Neutral',
      swe: 'Neutral',
      fin: 'Neutral',
      rom: 'Axis',
      yug: 'Neutral',
      gre: 'Neutral',
      tur: 'Neutral',
      hun: 'Axis',
      bul: 'Neutral',
      por: 'Neutral',
      ire: 'Neutral',
      swi: 'Neutral',
      bal: 'Comintern'
    },
    frontlines: [],
    tacticalArrows: [
      { id: 'air_blitz_arrow', label: 'Serangan Udara Luftwaffe', pathD: 'M 350 320 Q 340 300 332 285', color: '#ef4444', attacker: 'Axis' }
    ],
    hotspots: [
      {
        id: 'spot_london',
        name: 'Langit London & Selat Inggris',
        x: 332,
        y: 280,
        type: 'air',
        date: 'September 1940',
        significance: 'Kegagalan meraih supremasi udara memaksa Hitler membatalkan Operasi Singa Laut selamanya.',
        casualties: '~3.000 pesawat hancur kedua belah pihak',
        outcome: 'Allied Victory'
      }
    ],
    impactSummary: 'Kekalahan strategis besar pertama Hitler. Inggris tetap menjadi benteng pangkalan udara Sekutu tak tergoyahkan.',
    hoi4MechanicTip: 'Tanpa 70%+ supremasi udara (Air Superiority) di English Channel, invasi amfibi ke kepulauan Britania mustahil diluncurkan.'
  },

  // 6. 1941: Operation Barbarossa
  {
    id: '1941_barbarossa',
    year: 1941,
    dateStr: '22 Juni - 5 Desember 1941',
    title: 'Operasi Barbarossa - Invasi Terbesar Sepanjang Sejarah ke Uni Soviet',
    subtitle: 'Benturan Ideologi Raksasa Membuka Front Timur yang Berdarah',
    theater: 'Eastern Front',
    phase: 'Serangan Kilat Poros (Blitzkrieg)',
    description: 'Lebih dari 3,8 juta serdadu Blok Poros melintasi perbatasan Uni Soviet sepanjang 2.900 km dalam tiga kelompok tentara (Nord ke Leningrad, Mitte ke Moskow, Süd ke Ukraina). Jutaan tentara Soviet tertawan dalam pengepungan raksasa di Bialystok, Minsk, dan Kiev. Namun di depan gerbang Moskow, musim dingin ekstrem dan serangan balik Zhukov menghentikan langkah Wehrmacht.',
    belligerents: {
      attackers: 'Jerman Nazi, Rumania, Finlandia, Italia, Hungaria',
      defenders: 'Uni Soviet (Tentara Merah / Red Army)'
    },
    keyLeaders: ['Adolf Hitler', 'Gerd von Rundstedt', 'Heinz Guderian', 'Joseph Stalin', 'Georgy Zhukov'],
    totalCasualtiesEstimate: 'Soviet: ~4,5 juta korban (2,3 juta tewas/tertawan); Poros: ~850.000 korban',
    worldTension: 100,
    associatedScenarioId: 'barbarossa_1941',
    territoryState: {
      ger: 'Axis',
      aus: 'Axis',
      cze: 'Axis_Occupied',
      pol: 'Axis_Occupied',
      fra: 'Axis_Occupied',
      hol: 'Axis_Occupied',
      bel: 'Axis_Occupied',
      eng: 'Allies',
      sov: 'Comintern', // Western territories deeply invaded
      ita: 'Axis',
      rom: 'Axis',
      hun: 'Axis',
      bul: 'Axis',
      fin: 'Axis',
      yug: 'Axis_Occupied',
      gre: 'Axis_Occupied',
      den: 'Axis_Occupied',
      nor: 'Axis_Occupied',
      spa: 'Neutral',
      swe: 'Neutral',
      tur: 'Neutral',
      bal: 'Axis_Occupied',
      swi: 'Neutral',
      por: 'Neutral',
      ire: 'Neutral'
    },
    frontlines: [
      { name: 'Front Barbarossa Maksimum 1941', pathD: 'M 640 140 Q 670 200 730 220 Q 750 250 720 320 Q 750 380 735 448', color: '#ef4444' }
    ],
    tacticalArrows: [
      { id: 'barbarossa_north', label: 'Ke Leningrad', pathD: 'M 590 230 Q 640 190 680 160', color: '#ef4444', attacker: 'Axis' },
      { id: 'barbarossa_center', label: 'Ke Moskow (Op. Taifun)', pathD: 'M 580 280 Q 660 250 740 225', color: '#ef4444', attacker: 'Axis' },
      { id: 'barbarossa_south', label: 'Ke Kiev & Rostov', pathD: 'M 560 340 Q 640 370 720 390', color: '#ef4444', attacker: 'Axis' }
    ],
    hotspots: [
      {
        id: 'spot_leningrad',
        name: 'Pengepungan Leningrad (900 Hari)',
        x: 685,
        y: 155,
        type: 'land',
        date: '8 September 1941',
        significance: 'Blokade brutal selama 872 hari menewaskan lebih dari 1 juta warga sipil akibat kelaparan ekstrem.',
        casualties: '>1,5 juta korban jiwa',
        outcome: 'Indecisive'
      },
      {
        id: 'spot_kiev',
        name: 'Kantong Pengepungan Kiev',
        x: 650,
        y: 340,
        type: 'land',
        date: 'Agustus - September 1941',
        significance: 'Pengepungan terbesar sepanjang sejarah militer; lebih dari 665.000 serdadu Red Army tertawan.',
        casualties: '>700.000 korban Soviet',
        outcome: 'Axis Victory'
      },
      {
        id: 'spot_moscow',
        name: 'Pertempuran Moskow & Serangan Balik Musim Dingin',
        x: 755,
        y: 220,
        type: 'land',
        date: 'Oktober 1941 - Januari 1942',
        significance: 'Divisi Siberia Zhukov melancarkan serangan balik di suhu -30°C, memukul mundur Wehrmacht 150 km.',
        casualties: '~1 juta total korban',
        outcome: 'Soviet Victory'
      }
    ],
    impactSummary: 'Rencana kemenangan kilat Jerman gagal. Wehrmacht terjebak dalam perang atrisi multidimensi di hamparan raksasa Rusia.',
    hoi4MechanicTip: 'Waspadai suplai musim dingin di Soviet! Hubungkan jalur kereta api (Railways) dan tingkatkan level Supply Hubs sebelum musim lumpur Rasputitsa tiba.'
  },

  // 7. 1941: Pearl Harbor & US Enters War
  {
    id: '1941_pearl_harbor',
    year: 1941,
    dateStr: '7 - 11 Desember 1941',
    title: 'Serangan Pearl Harbor & Masuknya Amerika Serikat ke Perang Global',
    subtitle: '"A Date Which Will Live in Infamy"',
    theater: 'Pacific & Global',
    phase: 'Serangan Kilat Poros (Blitzkrieg)',
    description: 'Armada kapal induk Kekaisaran Jepang (Kido Butai) melancarkan serangan udara mendadak ke pangkalan Armada Pasifik AS di Pearl Harbor, Hawaii. Sehari kemudian, Presiden Roosevelt mendeklarasikan perang terhadap Jepang. Pada 11 Desember, Hitler dan Mussolini mendeklarasikan perang terhadap AS, menyatukan perang Eropa dan Asia-Pasifik menjadi satu Perang Dunia Total.',
    belligerents: {
      attackers: 'Kekaisaran Jepang (Blok Poros Pasifik)',
      defenders: 'Amerika Serikat (Armada Pasifik)'
    },
    keyLeaders: ['Franklin D. Roosevelt', 'Isoroku Yamamoto', 'Chuichi Nagumo', 'Husband Kimmel'],
    totalCasualtiesEstimate: 'AS: 2.403 gugur, 4 kapal tempur tenggelam; Jepang: 64 gugur, 29 pesawat hancur',
    worldTension: 100,
    associatedScenarioId: 'barbarossa_1941',
    territoryState: {
      ger: 'Axis',
      aus: 'Axis',
      cze: 'Axis_Occupied',
      pol: 'Axis_Occupied',
      fra: 'Axis_Occupied',
      eng: 'Allies',
      sov: 'Comintern',
      ita: 'Axis',
      rom: 'Axis',
      hun: 'Axis',
      bul: 'Axis',
      fin: 'Axis',
      yug: 'Axis_Occupied',
      gre: 'Axis_Occupied',
      hol: 'Axis_Occupied',
      bel: 'Axis_Occupied',
      den: 'Axis_Occupied',
      nor: 'Axis_Occupied',
      spa: 'Neutral',
      swe: 'Neutral',
      tur: 'Neutral',
      bal: 'Axis_Occupied',
      swi: 'Neutral',
      por: 'Neutral',
      ire: 'Neutral'
    },
    frontlines: [],
    tacticalArrows: [
      { id: 'us_lend_lease', label: 'Konvoi Lend-Lease Atlantik', pathD: 'M 160 220 Q 230 200 300 230', color: '#3b82f6', attacker: 'Allies' }
    ],
    hotspots: [
      {
        id: 'spot_pearl_harbor',
        name: 'Pearl Harbor (Oahu, Hawaii)',
        x: 100,
        y: 520,
        type: 'naval',
        date: '7 Desember 1941',
        significance: 'Membangkitkan raksasa industri militer AS (Arsenal of Democracy) dan menghapus sentimen isolasionisme.',
        casualties: '2.403 prajurit AS gugur',
        outcome: 'Axis Victory'
      }
    ],
    impactSummary: 'Kekuatan industri raksasa Amerika Serikat resmi terjun ke medan tempur. Pasokan senjata, tank, dan bahan bakar mengalir deras ke Inggris dan Soviet via Lend-Lease.',
    hoi4MechanicTip: 'Masuknya AS menghapus hukum isolasionisme, melipatgandakan pabrik militer melalui fokus "Giant Wakes" dan "Arsenal of Democracy".'
  },

  // 8. 1942: Turning Points - Stalingrad & El Alamein
  {
    id: '1942_turning_points',
    year: 1942,
    dateStr: 'Juli - November 1942',
    title: 'Titik Balik Akbar: Pengepungan Stalingrad & Kemenangan El Alamein',
    subtitle: 'Awal dari Akhir Kejayaan Blok Poros di Afrika dan Rusia',
    theater: 'Total War',
    phase: 'Titik Balik (Turning Points)',
    description: 'Di front selatan Rusia, Wehrmacht meluncurkan Operasi Fall Blau menuju ladang minyak Kaukasus dan terhenti di reruntuhan Stalingrad. Tanggal 19 November 1942, Soviet melancarkan Operasi Uranus, mengepung Angkatan Darat ke-6 Jerman pimpinan Paulus. Sementara di Mesir, Jenderal Montgomery mengalahkan Panzerarmee Afrika pimpinan Rommel di El Alamein, menyelamatkan Terusan Suez.',
    belligerents: {
      attackers: 'Tentara Merah Soviet & Tentara ke-8 Inggris',
      defenders: 'Wehrmacht Jerman, Italia, Rumania, Hungaria'
    },
    keyLeaders: ['Friedrich Paulus', 'Vasily Chuikov', 'Georgy Zhukov', 'Bernard Montgomery', 'Erwin Rommel'],
    totalCasualtiesEstimate: 'Stalingrad: >1,8 juta total korban; El Alamein: ~50.000 korban Poros & 13.500 Sekutu',
    worldTension: 100,
    associatedScenarioId: 'ww2_climax_1943',
    territoryState: {
      ger: 'Axis',
      aus: 'Axis',
      cze: 'Axis_Occupied',
      pol: 'Axis_Occupied',
      fra: 'Axis_Occupied',
      eng: 'Allies',
      sov: 'Comintern',
      ita: 'Axis',
      rom: 'Axis',
      hun: 'Axis',
      bul: 'Axis',
      fin: 'Axis',
      yug: 'Axis_Occupied',
      gre: 'Axis_Occupied',
      hol: 'Axis_Occupied',
      bel: 'Axis_Occupied',
      den: 'Axis_Occupied',
      nor: 'Axis_Occupied',
      spa: 'Neutral',
      swe: 'Neutral',
      tur: 'Neutral',
      bal: 'Axis_Occupied',
      swi: 'Neutral',
      por: 'Neutral',
      ire: 'Neutral'
    },
    frontlines: [
      { name: 'Front Stalingrad Maksimum Poros', pathD: 'M 650 160 Q 720 230 710 320 Q 780 370 820 400', color: '#ef4444' },
      { name: 'Jepitan Operasi Uranus', pathD: 'M 800 370 Q 840 395 810 420', color: '#dc2626', dashed: true }
    ],
    tacticalArrows: [
      { id: 'uranus_north', label: 'Jepitan Uranus Utara', pathD: 'M 780 370 Q 810 390 825 400', color: '#dc2626', attacker: 'Comintern' },
      { id: 'uranus_south', label: 'Jepitan Uranus Selatan', pathD: 'M 800 430 Q 820 415 825 400', color: '#dc2626', attacker: 'Comintern' },
      { id: 'el_alamein_arrow', label: 'Terobosan Sekutu El Alamein', pathD: 'M 640 590 L 590 580', color: '#3b82f6', attacker: 'Allies' }
    ],
    hotspots: [
      {
        id: 'spot_stalingrad',
        name: 'Pengepungan Stalingrad (Sungai Volga)',
        x: 825,
        y: 400,
        type: 'land',
        date: 'Agustus 1942 - Februari 1943',
        significance: 'Pertempuran terkejam dan paling mematikan dalam sejarah manusia. Menghancurkan seluruh Angkatan Darat ke-6 Jerman.',
        casualties: '>1,8 juta korban tewas/terluka',
        outcome: 'Soviet Victory'
      },
      {
        id: 'spot_el_alamein',
        name: 'Pertempuran El Alamein Kedua',
        x: 625,
        y: 585,
        type: 'land',
        date: '23 Oktober - 5 November 1942',
        significance: 'Montgomery menghancurkan kekuatan lapis baja Afrika Korps, mengakhiri ancaman Poros ke ladang minyak Timur Tengah.',
        casualties: '~65.000 total korban',
        outcome: 'Allied Victory'
      }
    ],
    impactSummary: 'Inisiatif strategis perang berpindah tangan secara permanen ke pihak Sekutu dan Uni Soviet.',
    hoi4MechanicTip: 'Pengepungan kantong (Encirclement) di Stalingrad memutuskan suplai ke nol, melipatgandakan penalti debuff divisi hingga 100% musnah.'
  },

  // 9. 1943: Kursk & Invasion of Sicily
  {
    id: '1943_kursk_sicily',
    year: 1943,
    dateStr: 'Juli - September 1943',
    title: 'Pertempuran Tank Terbesar di Kursk & Invasi Sekutu ke Sisilia/Italia',
    subtitle: 'Patahnya Serangan Poros Terakhir dan Runtuhnya Fasisme Italia',
    theater: 'Total War',
    phase: 'Titik Balik (Turning Points)',
    description: 'Hitler melancarkan Operasi Citadel di tonjolan Kursk menggunakan tank baru Panther dan Tiger. Soviet yang telah mengetahui rencana tersebut membangun jaringan pertahanan bertingkat sedalam 50 km. Di saat yang sama, Sekutu mendarat di Sisilia (Operasi Husky), memicu kudeta yang melengserkan Benito Mussolini dan penyerahan tanpa syarat Italia.',
    belligerents: {
      attackers: 'Jerman Nazi vs Uni Soviet (Kursk) / Sekutu vs Italia & Jerman (Sisilia)',
      defenders: 'Pertahanan Red Army (Kursk) & Poros (Italia)'
    },
    keyLeaders: ['Erich von Manstein', 'Walter Model', 'Georgy Zhukov', 'Dwight D. Eisenhower', 'George S. Patton'],
    totalCasualtiesEstimate: 'Kursk: ~170.000 Jerman & ~860.000 Soviet; Sisilia: ~150.000 korban Poros',
    worldTension: 100,
    associatedScenarioId: 'ww2_climax_1943',
    territoryState: {
      ger: 'Axis',
      aus: 'Axis',
      cze: 'Axis_Occupied',
      pol: 'Axis_Occupied',
      fra: 'Axis_Occupied',
      eng: 'Allies',
      sov: 'Comintern', // Reclaiming Ukraine
      ita: 'Allied_Liberated', // Southern Italy captured, North RSI
      rom: 'Axis',
      hun: 'Axis',
      bul: 'Axis',
      fin: 'Axis',
      yug: 'Axis_Occupied',
      gre: 'Axis_Occupied',
      hol: 'Axis_Occupied',
      bel: 'Axis_Occupied',
      den: 'Axis_Occupied',
      nor: 'Axis_Occupied',
      spa: 'Neutral',
      swe: 'Neutral',
      tur: 'Neutral',
      bal: 'Axis_Occupied',
      swi: 'Neutral',
      por: 'Neutral',
      ire: 'Neutral'
    },
    frontlines: [
      { name: 'Front Timur Pasca-Kursk 1943', pathD: 'M 650 160 Q 690 230 670 320 Q 680 390 715 448', color: '#dc2626' },
      { name: 'Garis Gustav (Italia)', pathD: 'M 440 455 Q 460 465 480 475', color: '#ef4444' }
    ],
    tacticalArrows: [
      { id: 'kursk_pincer_north', label: 'Jepitan Citadel Utara', pathD: 'M 720 290 L 735 310', color: '#ef4444', attacker: 'Axis' },
      { id: 'kursk_counter', label: 'Serangan Balik Soviet Poltava', pathD: 'M 740 310 Q 700 330 660 350', color: '#dc2626', attacker: 'Comintern' },
      { id: 'sicily_landing', label: 'Pendaratan Sisilia (Op. Husky)', pathD: 'M 470 560 L 475 535', color: '#3b82f6', attacker: 'Allies' }
    ],
    hotspots: [
      {
        id: 'spot_kursk',
        name: 'Tonjolan Kursk & Prokhorovka',
        x: 735,
        y: 310,
        type: 'land',
        date: '5-16 Juli 1943',
        significance: 'Pertempuran lapis baja terbesar di dunia. Jerman kehilangan cadangan tank strategisnya dan tak pernah mampu menyerang lagi di Timur.',
        casualties: '>6.000 tank dan 1.000 pesawat terlibat',
        outcome: 'Soviet Victory'
      },
      {
        id: 'spot_sicily',
        name: 'Pendaratan Sisilia (Operasi Husky)',
        x: 480,
        y: 535,
        type: 'naval',
        date: '9 Juli 1943',
        significance: 'Membuka front kedua di benua Eropa, memaksa Jerman mengalihkan divisi elit Panzer dari front Kursk.',
        casualties: '~25.000 korban Sekutu & 160.000 Poros',
        outcome: 'Allied Victory'
      }
    ],
    impactSummary: 'Jerman kehilangan kemampuan ofensif strategis di Front Timur. Italia menyerah dan mendeklarasikan perang balik ke Jerman.',
    hoi4MechanicTip: 'Kehilangan Sisilia dan Roma memicu peristiwa pemakzulan Mussolini dan pembentukan Repubblica Sociale Italiana (RSI) boneka Jerman.'
  },

  // 10. 1944: D-Day Normandy & Operation Bagration
  {
    id: '1944_dday_bagration',
    year: 1944,
    dateStr: '6 - 22 Juni 1944',
    title: 'D-Day Pendaratan Normandia & Operasi Bagration',
    subtitle: 'Serangan Raksasa Dua Sisi Menjepit Jantung Reich Ketiga',
    theater: 'Total War',
    phase: 'Serangan Balik Sekutu & Soviet',
    description: 'Tanggal 6 Juni 1944, armada amfibi terbesar dalam sejarah (5.000 kapal, 156.000 serdadu Sekutu) mendarat di lima pantai Normandia (Utah, Omaha, Gold, Juno, Sword). Pada 22 Juni, persis tiga tahun setelah Barbarossa, Tentara Merah meluncurkan Operasi Bagration di Belarusia, menghancurkan seluruh Grup Angkatan Darat Tengah Jerman (Heeresgruppe Mitte) dan merebut kembali Minsk serta Polandia timur.',
    belligerents: {
      attackers: 'Sekutu Barat (AS, Inggris, Kanada, Prancis) & Uni Soviet',
      defenders: 'Wehrmacht Jerman di Benteng Tembok Atlantik & Front Timur'
    },
    keyLeaders: ['Dwight D. Eisenhower', 'Bernard Montgomery', 'Omar Bradley', 'Konstantin Rokossovsky', 'Erwin Rommel'],
    totalCasualtiesEstimate: 'Normandia: ~210.000 korban Sekutu & ~400.000 Jerman; Bagration: ~450.000 korban Jerman & ~765.000 Soviet',
    worldTension: 100,
    associatedScenarioId: 'ww2_climax_1943',
    territoryState: {
      ger: 'Axis',
      aus: 'Axis',
      cze: 'Axis_Occupied',
      pol: 'Allied_Liberated',
      fra: 'Allied_Liberated', // Paris liberated in Aug
      bel: 'Allied_Liberated',
      hol: 'Axis_Occupied',
      eng: 'Allies',
      sov: 'Comintern',
      ita: 'Allied_Liberated',
      rom: 'Comintern', // Switched sides in Aug
      hun: 'Axis',
      bul: 'Comintern',
      fin: 'Neutral', // Armistice
      yug: 'Allied_Liberated',
      gre: 'Allied_Liberated',
      den: 'Axis_Occupied',
      nor: 'Axis_Occupied',
      spa: 'Neutral',
      swe: 'Neutral',
      tur: 'Neutral',
      bal: 'Comintern',
      swi: 'Neutral',
      por: 'Neutral',
      ire: 'Neutral'
    },
    frontlines: [
      { name: 'Front Normandia & Garis Siegfried Barat', pathD: 'M 350 310 Q 380 340 395 370', color: '#3b82f6' },
      { name: 'Front Bagration di Sungai Vistula', pathD: 'M 570 240 Q 560 290 550 350 Q 580 410 610 430', color: '#dc2626' }
    ],
    tacticalArrows: [
      { id: 'dday_landing_arrow', label: 'Operasi Overlord Amfibi', pathD: 'M 330 295 L 325 330', color: '#3b82f6', attacker: 'Allies' },
      { id: 'paris_liberation', label: 'Pembebasan Paris & Belgia', pathD: 'M 325 330 Q 355 345 375 335', color: '#3b82f6', attacker: 'Allies' },
      { id: 'bagration_arrow', label: 'Operasi Bagration ke Warsawa', pathD: 'M 640 270 Q 590 280 560 295', color: '#dc2626', attacker: 'Comintern' }
    ],
    hotspots: [
      {
        id: 'spot_omaha',
        name: 'Pantai Omaha & Normandia (D-Day)',
        x: 320,
        y: 335,
        type: 'naval',
        date: '6 Juni 1944',
        significance: 'Penetrasi pertama Tembok Atlantik (Atlantic Wall) yang dijaga ketat oleh Jerman.',
        casualties: '>10.000 korban Sekutu pada hari-H',
        outcome: 'Allied Victory'
      },
      {
        id: 'spot_minsk',
        name: 'Kantong Pengepungan Minsk (Op. Bagration)',
        x: 620,
        y: 275,
        type: 'land',
        date: 'Juni - Juli 1944',
        significance: 'Kehancuran 28 divisi Wehrmacht sekaligus; bencana militer terburuk dalam sejarah militer Jerman.',
        casualties: '>400.000 tentara Jerman hancur',
        outcome: 'Soviet Victory'
      },
      {
        id: 'spot_paris_liberated',
        name: 'Pembebasan Kota Paris',
        x: 345,
        y: 350,
        type: 'land',
        date: '25 Agustus 1944',
        significance: 'Divisi Lapis Baja ke-2 Leclerc dan perlawanan rakyat membebaskan ibukota Prancis.',
        casualties: '~3.000 korban',
        outcome: 'Allied Victory'
      }
    ],
    impactSummary: 'Jerman terjepit di antara dua front darat raksasa. Ladang minyak Ploesti di Rumania jatuh ke tangan Soviet, memutus total pasokan bensin Jerman.',
    hoi4MechanicTip: 'Melakukan invasi laut D-Day membutuhkan dominasi armada laut di perairan Selat Inggris dan teknologi landing craft yang mutakhir.'
  },

  // 11. 1944: Battle of the Bulge
  {
    id: '1944_battle_of_the_bulge',
    year: 1944,
    dateStr: '16 Desember 1944 - 25 Januari 1945',
    title: 'Serangan Terakhir di Hutan Ardennes (Battle of the Bulge)',
    subtitle: 'Judi Terakhir Hitler Memecah Belah Aliansi Sekutu Barat',
    theater: 'Western Europe',
    phase: 'Keruntuhan Akhir Poros',
    description: 'Memanfaatkan cuaca berkabut yang melumpuhkan angkatan udara Sekutu, Hitler meluncurkan ofensif kejutan melalui Hutan Ardennes menuju pelabuhan vital Antwerp (Unternehmen Wacht am Rhein). Pasukan payung AS ke-101 mempertahankan Bastogne yang terkepung dengan heroik ("Nuts!"). Setelah cuaca cerah, Angkatan Udara Sekutu dan serbuan tank Tentara ke-3 Patton mematahkan tonjolan Jerman.',
    belligerents: {
      attackers: 'Angkatan Darat ke-5 & ke-6 Panzer Jerman',
      defenders: 'Angkatan Darat AS (didukung korps Inggris)'
    },
    keyLeaders: ['Gerd von Rundstedt', 'Sepp Dietrich', 'Anthony McAuliffe', 'George S. Patton', 'Dwight D. Eisenhower'],
    totalCasualtiesEstimate: 'AS: ~89.000 korban; Jerman: ~100.000 korban & kehilangan tank terakhir yang tak tergantikan',
    worldTension: 100,
    associatedScenarioId: 'ww2_climax_1943',
    territoryState: {
      ger: 'Axis',
      aus: 'Axis',
      cze: 'Axis_Occupied',
      pol: 'Comintern',
      fra: 'Allied_Liberated',
      bel: 'Allied_Liberated',
      hol: 'Axis_Occupied',
      eng: 'Allies',
      sov: 'Comintern',
      ita: 'Allied_Liberated',
      rom: 'Comintern',
      hun: 'Comintern',
      bul: 'Comintern',
      fin: 'Neutral',
      yug: 'Allied_Liberated',
      gre: 'Allied_Liberated',
      den: 'Axis_Occupied',
      nor: 'Axis_Occupied',
      spa: 'Neutral',
      swe: 'Neutral',
      tur: 'Neutral',
      bal: 'Comintern',
      swi: 'Neutral',
      por: 'Neutral',
      ire: 'Neutral'
    },
    frontlines: [
      { name: 'Tonjolan Ardennes (The Bulge)', pathD: 'M 370 330 Q 350 340 370 350', color: '#ef4444' }
    ],
    tacticalArrows: [
      { id: 'bulge_arrow', label: 'Dorongan Panzer ke Meuse', pathD: 'M 385 340 L 360 340', color: '#ef4444', attacker: 'Axis' },
      { id: 'patton_relief', label: 'Serangan Bantuan Patton ke Bastogne', pathD: 'M 365 375 L 365 345', color: '#3b82f6', attacker: 'Allies' }
    ],
    hotspots: [
      {
        id: 'spot_bastogne',
        name: 'Pengepungan Bastogne',
        x: 365,
        y: 340,
        type: 'land',
        date: '20-27 Desember 1944',
        significance: 'Divisi Lintas Udara 101 menolak menyerah di tengah salju membeku dan memotong jalur pasokan utama Jerman.',
        casualties: '~3.000 korban divisi 101',
        outcome: 'Allied Victory'
      }
    ],
    impactSummary: 'Jerman kehabisan bahan bakar dan cadangan tentara terlatih. Front Barat runtuh total membuka jalan Sekutu menyeberangi Sungai Rhine.',
    hoi4MechanicTip: 'Kehabisan Fuel membuat seluruh divisi lapis baja kehilangan mobilitas dan nilai breakthrough turun drastis hingga 80%.'
  },

  // 12. 1945: Fall of Berlin & Victory in Europe
  {
    id: '1945_fall_of_berlin',
    year: 1945,
    dateStr: '16 April - 8 Mei 1945',
    title: 'Pertempuran Berlin & Kapitulasi Total Reich Ketiga (Hari Kemenangan VE-Day)',
    subtitle: 'Tumbangnya Nazisme di Eropa dan Akhir Tirani Poros',
    theater: 'Total War',
    phase: 'Keruntuhan Akhir Poros',
    description: 'Tentara Merah Soviet di bawah Marshal Zhukov dan Konev melancarkan serangan akhir ke ibukota Berlin dengan 2,5 juta prajurit dan ribuan meriam artileri. Pada 25 April, tentara Amerika dan Soviet bertemu di Sungai Elbe di Torgau. Pada 30 April, Hitler bunuh diri di Fuhrerbunker. Tanggal 8 Mei 1945, Jerman menandatangani kapitulasi militer tanpa syarat, mengakhiri Perang Dunia II di Eropa.',
    belligerents: {
      attackers: 'Uni Soviet & Pasukan Sekutu Barat',
      defenders: 'Sisa Wehrmacht, Waffen-SS, Volkssturm & Pemuda Hitler'
    },
    keyLeaders: ['Georgy Zhukov', 'Ivan Konev', 'Adolf Hitler', 'Karl Dönitz', 'Dwight D. Eisenhower'],
    totalCasualtiesEstimate: 'Berlin: ~100.000 korban tentara Jerman & puluhan ribu warga; Soviet: ~81.000 gugur & 280.000 terluka',
    worldTension: 0,
    associatedScenarioId: 'ww2_climax_1943',
    territoryState: {
      ger: 'Allied_Liberated', // Occupied by 4 powers
      aus: 'Allied_Liberated',
      cze: 'Allied_Liberated',
      pol: 'Comintern',
      fra: 'Allied_Liberated',
      bel: 'Allied_Liberated',
      hol: 'Allied_Liberated',
      eng: 'Allies',
      sov: 'Comintern',
      ita: 'Allied_Liberated',
      rom: 'Comintern',
      hun: 'Comintern',
      bul: 'Comintern',
      fin: 'Neutral',
      yug: 'Allied_Liberated',
      gre: 'Allied_Liberated',
      den: 'Allied_Liberated',
      nor: 'Allied_Liberated',
      spa: 'Neutral',
      swe: 'Neutral',
      tur: 'Neutral',
      bal: 'Comintern',
      swi: 'Neutral',
      por: 'Neutral',
      ire: 'Neutral'
    },
    frontlines: [
      { name: 'Garis Pertemuan Sekutu & Soviet di Sungai Elbe', pathD: 'M 475 250 L 455 350', color: '#10b981', dashed: true }
    ],
    tacticalArrows: [
      { id: 'zhukov_berlin', label: 'Front Belorussia ke-1 (Zhukov)', pathD: 'M 540 295 L 485 295', color: '#dc2626', attacker: 'Comintern' },
      { id: 'konev_berlin', label: 'Front Ukraina ke-1 (Konev)', pathD: 'M 530 330 Q 490 315 480 298', color: '#dc2626', attacker: 'Comintern' },
      { id: 'us_elbe_arrow', label: 'Dorongan Tentara AS ke Elbe', pathD: 'M 400 310 L 450 310', color: '#3b82f6', attacker: 'Allies' }
    ],
    hotspots: [
      {
        id: 'spot_seelow',
        name: 'Ketinggian Seelow (Seelow Heights)',
        x: 505,
        y: 292,
        type: 'land',
        date: '16-19 April 1945',
        significance: 'Gerbang terakhir menuju Berlin; Zhukov membongkar garis pertahanan Jerman dengan ribuan lampu sorot dan bombardir artileri dahsyat.',
        casualties: '>50.000 korban',
        outcome: 'Soviet Victory'
      },
      {
        id: 'spot_reichstag',
        name: 'Gedung Reichstag & Fuhrerbunker Berlin',
        x: 470,
        y: 295,
        type: 'land',
        date: '30 April - 2 Mei 1945',
        significance: 'Pengibaran bendera merah palu arit di puncak Reichstag menandai kehancuran total rezim Nazi.',
        casualties: 'Ibukota Berlin hancur total',
        outcome: 'Soviet Victory'
      },
      {
        id: 'spot_torgau',
        name: 'Pertemuan di Elbe (Torgau)',
        x: 460,
        y: 310,
        type: 'land',
        date: '25 April 1945',
        significance: 'Tentara Divisi Infanteri ke-69 AS berjabat tangan dengan Tentara Garda ke-58 Soviet, membelah Jerman menjadi dua.',
        casualties: 'Pertemuan damai simbolik kemenangan bersama',
        outcome: 'Allied Victory'
      }
    ],
    impactSummary: 'Jerman terbagi menjadi 4 zona pendudukan Sekutu (AS, Inggris, Prancis, Soviet). Konferensi Potsdam merumuskan tatanan pascaperang dunia dan dimulainya era Perang Dingin.',
    hoi4MechanicTip: 'Ketika Surrender Progress mencapai batas 100%, Konferensi Perdamaian (Peace Conference) otomatis dipicu untuk membagi wilayah jajahan dan mendirikan pemerintahan baru.'
  }
];
