import React, { useState } from 'react';
import {
  Globe, Flag, Factory, Award, CheckCircle2, AlertTriangle,
  Lightbulb, Star, Copy, Check, Shield, Flame, BookOpen, Layers
} from 'lucide-react';
import { CountryStrategy } from '../types';
import { COUNTRIES_STRATEGY_DATA } from '../data/countryData';

interface WarRoomViewerProps {
  searchQuery: string;
  isFavorite: (id: string) => boolean;
  toggleFavorite: (item: { id: string; type: 'country'; title: string; subtitle: string; tag: string }) => void;
}

export const WarRoomViewer: React.FC<WarRoomViewerProps> = ({
  searchQuery,
  isFavorite,
  toggleFavorite
}) => {
  const [selectedCountryId, setSelectedCountryId] = useState<string>('ger');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'countries' | 'doctrines'>('countries');

  const selectedCountry = COUNTRIES_STRATEGY_DATA.find(c => c.id === selectedCountryId) || COUNTRIES_STRATEGY_DATA[0];

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredCountries = COUNTRIES_STRATEGY_DATA.filter(c => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.tag.toLowerCase().includes(q) ||
      c.faction.toLowerCase().includes(q) ||
      c.leader.toLowerCase().includes(q) ||
      c.doctrineRecommendation.toLowerCase().includes(q) ||
      c.militaryStrategy.toLowerCase().includes(q)
    );
  });

  const generateCountryCopyText = (c: CountryStrategy) => {
    return `[HOI4 STRATEGI PERANG: ${c.name} (${c.tag})]
Pemimpin: ${c.leader} | Ideologi: ${c.ideology} | Faksi: ${c.faction}
Industri Awal: ${c.startingCivilianFactories} Civs, ${c.startingMilitaryFactories} Mils, ${c.startingDockyards} Dockyards
Doktrin Rekomendasi: ${c.doctrineRecommendation}
Fokus 1936: ${c.focusPath1936.join(' -> ')}
Strategi Industri: ${c.industryStrategy}
Strategi Militer: ${c.militaryStrategy}
Tips Komandan: ${c.proTips}`;
  };

  const DOCTRINES_INFO = [
    {
      name: 'Mobile Warfare',
      sub: 'Kecepatan Gerak & Lapis Baja (Blitzkrieg)',
      bestFor: ['Jerman (GER)', 'Italia (ITA)', 'Uni Soviet Alternatif'],
      keyFeatures: [
        '+20% Kecepatan gerak tank & motorized',
        '+15 Organization untuk batalion tank',
        'Breakthrough ekstra tinggi saat menyerang',
        'Memerlukan banyak pabrik tank dan persediaan bahan bakar melimpah'
      ],
      idealStyle: 'Pemain yang aktif melakukan micro-management manual tank untuk membuat kantung pengepungan kilat.'
    },
    {
      name: 'Superior Firepower',
      sub: 'Daya Hancur Artileri & Soft Attack Brutal',
      bestFor: ['Amerika Serikat (USA)', 'Minor Powers (Turki, Spanyol, dll.)', 'Swedia'],
      keyFeatures: [
        '+20% Soft Attack untuk seluruh infanteri & artileri',
        'Cabang Integrated Support memperkuat Support Company tanpa butuh banyak ruang',
        'Paling fleksibel di semua medan pertempuran',
        'Sangat ramah bagi pemula'
      ],
      idealStyle: 'Pemain yang ingin memenangkan perang frontal dengan menghancurkan organisasi musuh lewat tembakan artileri masif.'
    },
    {
      name: 'Grand Battleplan',
      sub: 'Benteng Entrenchment & Bonus Planning Maksimal',
      bestFor: ['Inggris Raya (ENG)', 'Prancis (FRA)', 'Jepang (JAP)'],
      keyFeatures: [
        '+10 Poin Entrenchment benteng gali pertahanan',
        'Hingga +60% Planning Bonus saat melancarkan serangan terencana',
        'Sangat tangguh saat menahan serbuan di garis sungai atau perbatasan benteng',
        'Kurang fleksibel jika garis pertempuran bergerak terlalu dinamis'
      ],
      idealStyle: 'Pemain yang mengandalkan garis pertahanan benteng tak tertembus disusul serangan ofensif terencana berskala besar.'
    },
    {
      name: 'Mass Assault',
      sub: 'Gelombang Manpower & Pemulihan Cepat (Deep Battle)',
      bestFor: ['Uni Soviet (SOV)', 'Tiongkok Nasionalis / Komunis (CHI/PRC)'],
      keyFeatures: [
        'Mengurangi Combat Width infanteri dari 2.0w menjadi 1.6w',
        'Kecepatan pemulihan organisasi dan reinforce rate tertinggi',
        '-20% Penalti suplai di wilayah sendiri (efek bumi hangus)',
        'Mampu membanjiri medan tempur dengan ratusan divisi murah'
      ],
      idealStyle: 'Pemain yang memanfaatkan kedalaman wilayah geografis dan jutaan prajurit untuk melelahkan musuh lewat perang atrisi.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Tab Switcher */}
      <div className="flex items-center justify-between gap-3 border-b border-[#22303c] pb-3.5">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('countries')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
              activeTab === 'countries'
                ? 'border border-[#10b981]/60 bg-[#122820] text-[#a7f3d0] shadow-md shadow-black/40'
                : 'border border-[#1e2a36] bg-[#0f1721] text-[#94a3b8] hover:text-[#f8fafc]'
            }`}
          >
            <Globe className="h-4 w-4 text-[#10b981]" />
            <span>Peta Kekuatan Negara PD II</span>
          </button>

          <button
            onClick={() => setActiveTab('doctrines')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
              activeTab === 'doctrines'
                ? 'border border-[#d97706]/60 bg-[#261f14] text-[#fde047] shadow-md shadow-black/40'
                : 'border border-[#1e2a36] bg-[#0f1721] text-[#94a3b8] hover:text-[#f8fafc]'
            }`}
          >
            <Layers className="h-4 w-4 text-[#eab308]" />
            <span>Matriks 4 Doktrin Militer Darat</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: COUNTRY STRATEGIES */}
      {activeTab === 'countries' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Country Selector (4 cols) */}
          <div className="lg:col-span-4 space-y-2">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#64748b] block mb-2">
              Pilih Markas Komando Negara:
            </span>
            <div className="space-y-2">
              {filteredCountries.map(country => {
                const isSelected = country.id === selectedCountryId;
                const isFav = isFavorite(country.id);

                return (
                  <button
                    key={country.id}
                    onClick={() => setSelectedCountryId(country.id)}
                    className={`w-full flex items-center justify-between rounded-xl border p-3.5 text-left transition-all ${
                      isSelected
                        ? 'border-[#10b981]/60 bg-gradient-to-r from-[#132c23] to-[#0f1a18] shadow-md shadow-black/40 text-[#f8fafc]'
                        : 'border-[#1e2938] bg-[#111923] text-[#94a3b8] hover:border-[#2f4356] hover:text-[#f1f5f9]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg font-serif text-lg font-bold text-white shadow-inner"
                        style={{
                          background: `linear-gradient(135deg, ${country.flagColors[0]}, ${country.flagColors[1]})`
                        }}
                      >
                        {country.flagSymbol}
                      </div>
                      <div>
                        <div className="font-bold text-sm tracking-tight text-[#f8fafc] flex items-center gap-2">
                          {country.name}
                          <span className="font-mono text-[11px] text-[#38bdf8] bg-[#0c2438] px-1.5 py-0.2 rounded">
                            {country.tag}
                          </span>
                        </div>
                        <div className="text-xs text-[#94a3b8]">{country.faction}</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="rounded bg-[#1e293b] px-2 py-0.5 text-[10px] font-mono text-[#cbd5e1] block">
                        {country.difficulty}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Strategic Dossier (8 cols) */}
          <div className="lg:col-span-8">
            <div className="rounded-xl border border-[#223344] bg-[#111923] shadow-xl shadow-black/50 overflow-hidden">
              {/* Dossier Header */}
              <div
                className="p-6 border-b border-[#1b2a38] relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, rgba(17,25,35,0.95), rgba(15,23,32,0.98))`
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl font-serif text-2xl font-bold text-white shadow-lg shadow-black/60 border border-white/10"
                      style={{
                        background: `linear-gradient(135deg, ${selectedCountry.flagColors[0]}, ${selectedCountry.flagColors[1]})`
                      }}
                    >
                      {selectedCountry.flagSymbol}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="font-mono text-xs font-bold text-[#38bdf8] bg-[#0c2438] px-2 py-0.5 rounded border border-[#38bdf8]/30">
                          TAG: {selectedCountry.tag}
                        </span>
                        <span className="text-xs font-mono text-[#fbbf24] bg-[#3b2b13] px-2 py-0.5 rounded border border-[#b45309]/30">
                          {selectedCountry.ideology}
                        </span>
                        <span className="text-xs font-mono text-[#94a3b8]">
                          Tingkat Kesulitan: <strong className="text-[#f1f5f9]">{selectedCountry.difficulty}</strong>
                        </span>
                      </div>
                      <h2 className="text-2xl font-black text-[#f8fafc] tracking-tight">
                        {selectedCountry.name}
                      </h2>
                      <p className="text-xs text-[#94a3b8] font-mono mt-0.5">
                        Pemimpin: <span className="text-[#f1f5f9] font-bold">{selectedCountry.leader}</span> • Faksi: <span className="text-[#38bdf8]">{selectedCountry.faction}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleFavorite({
                        id: selectedCountry.id,
                        type: 'country',
                        title: selectedCountry.name,
                        subtitle: `${selectedCountry.tag} • ${selectedCountry.faction}`,
                        tag: 'Negara'
                      })}
                      className={`rounded-lg border p-2.5 text-xs transition-colors ${
                        isFavorite(selectedCountry.id)
                          ? 'border-[#eab308]/60 bg-[#2b2512] text-[#facc15]'
                          : 'border-[#22303c] bg-[#131b24] text-[#64748b] hover:text-[#f8fafc]'
                      }`}
                      title={isFavorite(selectedCountry.id) ? 'Hapus dari Favorit' : 'Simpan ke Favorit'}
                    >
                      <Star className={`h-4 w-4 ${isFavorite(selectedCountry.id) ? 'fill-current' : ''}`} />
                    </button>

                    <button
                      onClick={() => handleCopy(selectedCountry.id, generateCountryCopyText(selectedCountry))}
                      className="flex items-center gap-1.5 rounded-lg border border-[#22303c] bg-[#131b24] px-3 py-2 text-xs font-semibold text-[#cbd5e1] hover:border-[#10b981] hover:text-[#f8fafc] transition-colors"
                    >
                      {copiedId === selectedCountry.id ? <Check className="h-4 w-4 text-[#22c55e]" /> : <Copy className="h-4 w-4" />}
                      <span>{copiedId === selectedCountry.id ? 'Tersalin!' : 'Salin Doktrin'}</span>
                    </button>
                  </div>
                </div>

                {/* Industrial Base Bar */}
                <div className="mt-5 grid grid-cols-3 gap-2.5 font-mono text-center">
                  <div className="rounded-lg border border-[#d97706]/40 bg-[#261f14] p-2.5">
                    <div className="text-[10px] uppercase font-bold text-[#fbbf24]">Pabrik Sipil (Civs)</div>
                    <div className="text-lg font-black text-[#fde047]">{selectedCountry.startingCivilianFactories}</div>
                  </div>
                  <div className="rounded-lg border border-[#16a34a]/40 bg-[#122b1c] p-2.5">
                    <div className="text-[10px] uppercase font-bold text-[#4ade80]">Pabrik Militer (Mils)</div>
                    <div className="text-lg font-black text-[#86efac]">{selectedCountry.startingMilitaryFactories}</div>
                  </div>
                  <div className="rounded-lg border border-[#2563eb]/40 bg-[#14233c] p-2.5">
                    <div className="text-[10px] uppercase font-bold text-[#60a5fa]">Galangan Kapal (Docks)</div>
                    <div className="text-lg font-black text-[#93c5fd]">{selectedCountry.startingDockyards}</div>
                  </div>
                </div>
              </div>

              {/* Dossier Body */}
              <div className="p-6 space-y-6 text-xs md:text-sm">
                {/* Recommended Doctrine */}
                <div className="rounded-lg border border-[#1e2e3e] bg-[#0d1620] p-4 space-y-1">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#38bdf8] flex items-center gap-1.5">
                    <Award className="h-4 w-4 text-[#38bdf8]" />
                    Rekomendasi Doktrin Utama:
                  </span>
                  <div className="text-sm font-semibold text-[#f8fafc]">
                    {selectedCountry.doctrineRecommendation}
                  </div>
                </div>

                {/* Priority Focus Path 1936-1937 */}
                <div className="space-y-2.5">
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#94a3b8] flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#10b981]" />
                    Urutan Fokus Nasional 1936-1937 (Prioritas Utama)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedCountry.focusPath1936.map((focus, fIdx) => (
                      <div
                        key={fIdx}
                        className="flex items-center gap-2.5 rounded-lg border border-[#1e2a38] bg-[#141e2a] p-2.5 text-xs text-[#cbd5e1]"
                      >
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1e2e40] font-mono text-[11px] text-[#38bdf8] font-bold">
                          {fIdx + 1}
                        </span>
                        <span className="font-medium text-[#f1f5f9]">{focus}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Industrial Strategy & Military Strategy */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-lg border border-[#1e2b38] bg-[#131d27] p-4 space-y-2">
                    <h5 className="font-mono text-xs font-bold uppercase text-[#fbbf24] flex items-center gap-1.5">
                      <Factory className="h-4 w-4 text-[#d97706]" />
                      Masterplan Ekonomi &amp; Pabrik
                    </h5>
                    <p className="text-xs leading-relaxed text-[#94a3b8]">
                      {selectedCountry.industryStrategy}
                    </p>
                  </div>

                  <div className="rounded-lg border border-[#1e2b38] bg-[#131d27] p-4 space-y-2">
                    <h5 className="font-mono text-xs font-bold uppercase text-[#38bdf8] flex items-center gap-1.5">
                      <Shield className="h-4 w-4 text-[#2563eb]" />
                      Doktrin &amp; Rencana Operasi Militer
                    </h5>
                    <p className="text-xs leading-relaxed text-[#94a3b8]">
                      {selectedCountry.militaryStrategy}
                    </p>
                  </div>
                </div>

                {/* Challenges & Pro Tips */}
                <div className="space-y-3">
                  <div className="rounded-lg border border-[#dc2626]/40 bg-[#2b1416]/70 p-4 space-y-2">
                    <h5 className="font-mono text-xs font-bold uppercase text-[#f87171] flex items-center gap-1.5">
                      <AlertTriangle className="h-4 w-4 text-[#ef4444]" />
                      Tantangan Kritis &amp; Kerentanan
                    </h5>
                    <ul className="space-y-1.5 text-xs text-[#fca5a5]">
                      {selectedCountry.keyChallenges.map((ch, cIdx) => (
                        <li key={cIdx} className="flex items-start gap-2">
                          <span className="font-bold">•</span>
                          <span>{ch}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-lg border border-[#d97706]/40 bg-[#261f14]/80 p-4 text-xs text-[#fef3c7] flex items-start gap-2.5">
                    <Lightbulb className="h-5 w-5 shrink-0 text-[#f59e0b] mt-0.5" />
                    <div>
                      <strong className="font-bold text-[#fbbf24]">Kiat Rahasia Panglima Perang: </strong>
                      {selectedCountry.proTips}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: DOCTRINES COMPARISON */}
      {activeTab === 'doctrines' && (
        <div className="space-y-6">
          <div className="rounded-xl border border-[#223344] bg-[#111923] p-5">
            <h3 className="text-lg font-bold text-[#f8fafc] mb-1">
              Panduan Memilih Doktrin Militer Darat (Land Doctrine Matrix)
            </h3>
            <p className="text-xs text-[#94a3b8] leading-relaxed">
              Doktrin darat adalah tulang punggung efektivitas tempur tentaramu di HOI4. Mengubah doktrin di tengah jalan membutuhkan 100 Army XP, sehingga memahami keunggulan komparatif masing-masing doktrin sejak 1936 sangat krusial.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DOCTRINES_INFO.map((doc, dIdx) => (
              <div
                key={dIdx}
                className="rounded-xl border border-[#223344] bg-[#111923] p-5 space-y-4 flex flex-col justify-between shadow-lg shadow-black/40"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-[#1b2835] pb-3 mb-3">
                    <div>
                      <h4 className="text-base font-bold text-[#f8fafc]">{doc.name}</h4>
                      <p className="text-xs text-[#38bdf8] font-mono">{doc.sub}</p>
                    </div>
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1e2e40] font-mono text-xs font-bold text-[#38bdf8]">
                      #{dIdx + 1}
                    </span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <span className="font-mono text-[11px] font-bold uppercase text-[#64748b] block mb-1">
                        Sangat Cocok Untuk:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {doc.bestFor.map(b => (
                          <span
                            key={b}
                            className="rounded border border-[#1e2e3e] bg-[#142332] px-2 py-0.5 font-mono text-[#cbd5e1]"
                          >
                            {b}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="font-mono text-[11px] font-bold uppercase text-[#64748b] block mb-1">
                        Fitur &amp; Bonus Unggulan:
                      </span>
                      <ul className="space-y-1 text-[#cbd5e1]">
                        {doc.keyFeatures.map((kf, kfIdx) => (
                          <li key={kfIdx} className="flex items-start gap-1.5">
                            <span className="text-[#38bdf8] font-bold">•</span>
                            <span>{kf}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-[#1b2835] bg-[#0c141d] p-3 text-xs text-[#94a3b8] mt-2">
                  <strong className="text-[#f1f5f9]">Gaya Bermain: </strong>
                  {doc.idealStyle}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
