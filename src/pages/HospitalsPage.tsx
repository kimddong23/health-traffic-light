import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, MapPin, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import HospitalCard from '../components/HospitalCard';
import { nearbyHospitals } from '../data/mockData';

const specialtyFilters = [
  '전체',
  '내과',
  '심장내과',
  '내분비내과',
  '가정의학과',
  '건강검진센터',
];

export default function HospitalsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('전체');
  const [showOnlyOpen, setShowOnlyOpen] = useState(false);

  const filteredHospitals = nearbyHospitals.filter((hospital) => {
    const matchesSearch =
      hospital.name.includes(searchQuery) ||
      hospital.address.includes(searchQuery) ||
      hospital.specialty.some((s) => s.includes(searchQuery));

    const matchesSpecialty =
      selectedSpecialty === '전체' ||
      hospital.specialty.includes(selectedSpecialty);

    const matchesOpenStatus = !showOnlyOpen || hospital.isOpen;

    return matchesSearch && matchesSpecialty && matchesOpenStatus;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 헤더 */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-10">
        <div className="px-4 py-4 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-1 -ml-1 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft size={24} className="text-slate-700" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-slate-900">병원 찾기</h1>
            <p className="text-sm text-slate-500 flex items-center gap-1">
              <MapPin size={14} />
              현재 위치 기준
            </p>
          </div>
        </div>

        {/* 검색 바 */}
        <div className="px-4 pb-4">
          <div className="relative">
            <Search
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="병원명, 진료과목 검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-3 bg-slate-100 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="px-4 py-4">
        {/* 필터 */}
        <div className="mb-4 space-y-3">
          {/* 진료과목 필터 */}
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            {specialtyFilters.map((specialty) => (
              <button
                key={specialty}
                onClick={() => setSelectedSpecialty(specialty)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedSpecialty === specialty
                    ? 'bg-primary-500 text-white'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-primary-300'
                }`}
              >
                {specialty}
              </button>
            ))}
          </div>

          {/* 진료중 필터 */}
          <button
            onClick={() => setShowOnlyOpen(!showOnlyOpen)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              showOnlyOpen
                ? 'bg-emerald-500 text-white'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-emerald-300'
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full ${
                showOnlyOpen ? 'bg-white' : 'bg-emerald-500'
              }`}
            />
            진료중인 병원만
          </button>
        </div>

        {/* 결과 카운트 */}
        <p className="text-sm text-slate-500 mb-4">
          {filteredHospitals.length}개의 병원을 찾았습니다
        </p>

        {/* 병원 목록 */}
        <div className="space-y-4">
          {filteredHospitals.length > 0 ? (
            filteredHospitals.map((hospital, index) => (
              <HospitalCard key={hospital.id} hospital={hospital} index={index} />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin size={32} className="text-slate-400" />
              </div>
              <p className="text-slate-500">검색 조건에 맞는 병원이 없습니다.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedSpecialty('전체');
                  setShowOnlyOpen(false);
                }}
                className="mt-4 text-primary-600 font-medium"
              >
                필터 초기화
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
