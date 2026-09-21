import { BattlePlanPreset } from '../types';

export const BATTLE_PLAN_PRESETS: BattlePlanPreset[] = [
  {
    id: 'plan-barbarossa-1941',
    name: 'Operasi Barbarossa (Pincer Bialystok-Minsk 1941)',
    theater: 'Front Timur (Eropa Timur)',
    year: 1941,
    historicalName: 'Unternehmen Barbarossa - Heeresgruppe Mitte',
    description: 'Manuver capit kepiting lapis baja (Double Pincer Encirclement) oleh Panzergruppe 2 (Guderian) dan Panzergruppe 3 (Hoth) untuk mengisolasi dan memusnahkan 300.000 pasukan Tentara Merah di kantong Bialystok dan Minsk.',
    mapBackdrop: 'barbarossa',
    tacticalNotes: [
      'Gunakan Panzer Korps di kedua sayap utara dan selatan untuk menembus garis pertahanan terlemah.',
      'Infanteri bertugas mengikat formasi utama musuh di tengah tanpa melakukan serangan frontal bunuh diri.',
      'Tutup kantong pengepungan di Minsk sebelum divisi infanteri musuh berhasil mundur ke Sungai Dnieper.',
      'Lindungi sayap luar dari serangan balik lapis baja musuh menggunakan artileri anti-tank 88mm.'
    ],
    estimatedBonus: 48,
    encirclementPotential: 85,
    elements: [
      {
        id: 'front-line-1',
        type: 'frontline',
        color: '#dc2626',
        points: [
          { x: 180, y: 120 },
          { x: 210, y: 220 },
          { x: 220, y: 340 },
          { x: 200, y: 460 },
          { x: 190, y: 560 }
        ],
        label: 'Garis Depan Awal 22 Juni 1941',
        strokeWidth: 4,
        style: 'solid'
      },
      {
        id: 'spearhead-north',
        type: 'spearhead',
        color: '#f59e0b',
        points: [
          { x: 210, y: 160 },
          { x: 340, y: 140 },
          { x: 500, y: 190 },
          { x: 580, y: 260 }
        ],
        label: 'Panzergruppe 3 (Hoth) -> Minsk',
        strokeWidth: 5,
        style: 'solid'
      },
      {
        id: 'spearhead-south',
        type: 'spearhead',
        color: '#f59e0b',
        points: [
          { x: 200, y: 440 },
          { x: 330, y: 430 },
          { x: 480, y: 360 },
          { x: 580, y: 280 }
        ],
        label: 'Panzergruppe 2 (Guderian) -> Minsk',
        strokeWidth: 5,
        style: 'solid'
      },
      {
        id: 'encirclement-minsk',
        type: 'encirclement',
        color: '#ef4444',
        points: [
          { x: 360, y: 220 },
          { x: 520, y: 200 },
          { x: 580, y: 270 },
          { x: 520, y: 340 },
          { x: 360, y: 310 },
          { x: 360, y: 220 }
        ],
        label: 'Kessel (Kantong) Bialystok-Minsk',
        strokeWidth: 3,
        style: 'pincer'
      },
      {
        id: 'offensive-smolensk',
        type: 'offensive_arrow',
        color: '#3b82f6',
        points: [
          { x: 580, y: 270 },
          { x: 740, y: 260 },
          { x: 860, y: 240 }
        ],
        label: 'Eksploitasi Tahap 2 -> Smolensk & Moskow',
        strokeWidth: 4,
        style: 'dashed'
      }
    ],
    markers: [
      {
        id: 'm-pg3',
        x: 230,
        y: 150,
        name: 'Panzergruppe 3 (Hoth)',
        symbol: 'armor',
        side: 'friendly',
        count: 4,
        org: 85
      },
      {
        id: 'm-pg2',
        x: 220,
        y: 430,
        name: 'Panzergruppe 2 (Guderian)',
        symbol: 'armor',
        side: 'friendly',
        count: 5,
        org: 90
      },
      {
        id: 'm-inf4',
        x: 200,
        y: 280,
        name: 'Tentara Ke-4 Infanteri',
        symbol: 'infantry',
        side: 'friendly',
        count: 12,
        org: 95
      },
      {
        id: 'm-cas-luftwaffe',
        x: 350,
        y: 90,
        name: 'Luftflotte 2 (Stuka CAS)',
        symbol: 'paratrooper',
        side: 'friendly',
        count: 600,
        org: 100
      },
      {
        id: 'm-sov-3rd',
        x: 420,
        y: 230,
        name: 'Tentara Ke-3 Soviet (Terkepung)',
        symbol: 'infantry',
        side: 'hostile',
        count: 8,
        org: 40
      },
      {
        id: 'm-sov-10th',
        x: 440,
        y: 310,
        name: 'Tentara Ke-10 Soviet (Terkepung)',
        symbol: 'infantry',
        side: 'hostile',
        count: 10,
        org: 35
      }
    ]
  },
  {
    id: 'plan-fall-gelb-1940',
    name: 'Fall Gelb (Ardennes Sickle Cut / Manstein Plan 1940)',
    theater: 'Front Barat (Prancis & Belgia)',
    year: 1940,
    historicalName: 'Fall Gelb - Sichelschnitt Plan',
    description: 'Umpan tipuan di dataran rendah Belgia menarik tentara terbaik Inggris-Prancis ke utara, sementara pasukan lapis baja utama menerobos hutan lebat Ardennes yang dianggap mustahil dilalui tank, menyeberangi Sungai Meuse di Sedan, dan berpacu ke pantai Selat Inggris untuk mengurung pasukan Sekutu di Dunkirk.',
    mapBackdrop: 'western_front',
    tacticalNotes: [
      'Gunakan Army Group B di utara sebagai umpan agar Sekutu masuk ke jebakan Dyle Plan.',
      'Army Group A menerobos Ardennes dengan kecepatan maksimal tanpa menunggu infanteri berjalan kaki.',
      'Paksa penyeberangan Sungai Meuse di Sedan menggunakan bantuan pengebom tukik Stuka intensif.',
      'Pacu divisi tank Guderian & Rommel ke Abbeville di pesisir Atlantik untuk memotong jalur logistik Sekutu.'
    ],
    estimatedBonus: 55,
    encirclementPotential: 92,
    elements: [
      {
        id: 'maginot-line',
        type: 'fallback',
        color: '#64748b',
        points: [
          { x: 300, y: 520 },
          { x: 420, y: 540 },
          { x: 560, y: 560 },
          { x: 680, y: 590 }
        ],
        label: 'Garis Maginot Prancis (Hindari Serangan Frontal!)',
        strokeWidth: 6,
        style: 'solid'
      },
      {
        id: 'spearhead-ardennes',
        type: 'spearhead',
        color: '#f59e0b',
        points: [
          { x: 490, y: 340 },
          { x: 400, y: 350 },
          { x: 320, y: 370 },
          { x: 220, y: 330 },
          { x: 140, y: 260 }
        ],
        label: 'Tusukan Sabit (Sichelschnitt) -> Sedan & Pantai Selat',
        strokeWidth: 6,
        style: 'solid'
      },
      {
        id: 'diversion-belgium',
        type: 'offensive_arrow',
        color: '#3b82f6',
        points: [
          { x: 500, y: 200 },
          { x: 380, y: 210 },
          { x: 280, y: 220 }
        ],
        label: 'Umpan Tipuan Army Group B (Belgia)',
        strokeWidth: 4,
        style: 'dashed'
      },
      {
        id: 'pocket-dunkirk',
        type: 'encirclement',
        color: '#dc2626',
        points: [
          { x: 150, y: 170 },
          { x: 250, y: 180 },
          { x: 240, y: 250 },
          { x: 140, y: 250 },
          { x: 150, y: 170 }
        ],
        label: 'Pengepungan Dunkirk (BEF & Prancis Terjebak)',
        strokeWidth: 4,
        style: 'pincer'
      }
    ],
    markers: [
      {
        id: 'm-guderian',
        x: 410,
        y: 340,
        name: 'Panzerkorps XIX (Guderian)',
        symbol: 'armor',
        side: 'friendly',
        count: 3,
        org: 95
      },
      {
        id: 'm-rommel',
        x: 360,
        y: 380,
        name: '7. Panzer-Division (Rommel "Ghost")',
        symbol: 'armor',
        side: 'friendly',
        count: 2,
        org: 90
      },
      {
        id: 'm-bef',
        x: 200,
        y: 200,
        name: 'British Expeditionary Force (BEF)',
        symbol: 'infantry',
        side: 'hostile',
        count: 10,
        org: 50
      },
      {
        id: 'm-fr-french1',
        x: 180,
        y: 270,
        name: 'Tentara Ke-1 Prancis (Terkepung)',
        symbol: 'infantry',
        side: 'hostile',
        count: 8,
        org: 45
      }
    ]
  },
  {
    id: 'plan-uranus-1942',
    name: 'Operasi Uranus (Pengepungan Stalingrad 1942)',
    theater: 'Front Timur (Sungai Volga & Don)',
    year: 1942,
    historicalName: 'Operatsiya Uranus - STAVKA',
    description: 'Serangan balik strategis Tentara Merah di utara dan selatan Stalingrad menghantam sayap luar tentara Poros yang dijaga divisi Rumania yang minim persenjataan anti-tank, bertemu di Kalach-na-Donu dan mengurung 250.000 pasukan Tentara Ke-6 Paulus.',
    mapBackdrop: 'barbarossa',
    tacticalNotes: [
      'Konsentrasikan artileri penghancur (God of War) di sektor sayap utara dan selatan.',
      'Jangan menyerang langsung kota Stalingrad di mana pertempuran jarak dekat parit menguntungkan infanteri musuh.',
      'Gunakan korps kavaleri dan tank T-34 untuk melintasi Sungai Don yang membeku.',
      'Bertemu di jembatan Kalach untuk memutus jalur pasokan kereta api Tentara Ke-6 selamanya.'
    ],
    estimatedBonus: 50,
    encirclementPotential: 88,
    elements: [
      {
        id: 'uranus-north-pincer',
        type: 'spearhead',
        color: '#dc2626',
        points: [
          { x: 260, y: 160 },
          { x: 380, y: 220 },
          { x: 470, y: 310 }
        ],
        label: 'Front Barat Daya (Vatutin) -> Kalach',
        strokeWidth: 6,
        style: 'solid'
      },
      {
        id: 'uranus-south-pincer',
        type: 'spearhead',
        color: '#dc2626',
        points: [
          { x: 340, y: 520 },
          { x: 420, y: 440 },
          { x: 470, y: 330 }
        ],
        label: 'Front Stalingrad (Yeremenko) -> Kalach',
        strokeWidth: 6,
        style: 'solid'
      },
      {
        id: 'stalingrad-pocket',
        type: 'encirclement',
        color: '#ef4444',
        points: [
          { x: 470, y: 320 },
          { x: 550, y: 260 },
          { x: 620, y: 320 },
          { x: 540, y: 390 },
          { x: 470, y: 320 }
        ],
        label: 'Kantong Stalingrad (Tentara Ke-6 Terjebak)',
        strokeWidth: 4,
        style: 'pincer'
      }
    ],
    markers: [
      {
        id: 'm-t34-north',
        x: 320,
        y: 190,
        name: 'Korps Tank Ke-26 Soviet',
        symbol: 'armor',
        side: 'friendly',
        count: 4,
        org: 95
      },
      {
        id: 'm-t34-south',
        x: 380,
        y: 470,
        name: 'Korps Mekanis Ke-4 Soviet',
        symbol: 'armor',
        side: 'friendly',
        count: 3,
        org: 90
      },
      {
        id: 'm-paulus',
        x: 550,
        y: 310,
        name: 'Tentara Ke-6 Jerman (Jenderal Paulus)',
        symbol: 'infantry',
        side: 'hostile',
        count: 20,
        org: 30
      }
    ]
  }
];
