import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Star, ExternalLink } from 'lucide-react';
import type { Hospital } from '../types/health';

interface HospitalCardProps {
  hospital: Hospital;
  index?: number;
}

export default function HospitalCard({ hospital, index = 0 }: HospitalCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 card-hover"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-slate-800">{hospital.name}</h3>
            <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
              hospital.isOpen
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-slate-100 text-slate-600'
            }`}>
              {hospital.isOpen ? '진료중' : '진료종료'}
            </span>
          </div>
          <p className="text-sm text-slate-500">{hospital.type}</p>
        </div>
        <div className="flex items-center gap-1 text-amber-500">
          <Star size={16} fill="currentColor" />
          <span className="text-sm font-medium">{hospital.rating}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {hospital.specialty.map((spec) => (
          <span
            key={spec}
            className="px-2 py-0.5 bg-primary-50 text-primary-700 text-xs rounded-full"
          >
            {spec}
          </span>
        ))}
      </div>

      <div className="space-y-2 text-sm text-slate-600">
        <div className="flex items-start gap-2">
          <MapPin size={16} className="text-slate-400 mt-0.5 flex-shrink-0" />
          <div>
            <span>{hospital.address}</span>
            <span className="text-primary-600 font-medium ml-2">{hospital.distance}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-slate-400 flex-shrink-0" />
          <span>{hospital.openHours}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone size={16} className="text-slate-400 flex-shrink-0" />
          <a href={`tel:${hospital.phone}`} className="text-primary-600 hover:underline">
            {hospital.phone}
          </a>
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <a
          href={`tel:${hospital.phone}`}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors"
        >
          <Phone size={18} />
          전화하기
        </a>
        <a
          href={`https://map.kakao.com/link/search/${encodeURIComponent(hospital.name)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-colors"
        >
          <ExternalLink size={18} />
          지도
        </a>
      </div>
    </motion.div>
  );
}
