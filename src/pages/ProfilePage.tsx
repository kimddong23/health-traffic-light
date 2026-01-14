import { motion } from 'framer-motion';
import {
  ArrowLeft,
  User,
  Calendar,
  Ruler,
  Scale,
  Droplet,
  FileText,
  Pill,
  ChevronRight,
  Settings,
  HelpCircle,
  LogOut,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { userProfile, medications, medicalVisits, latestCheckup } from '../data/mockData';

export default function ProfilePage() {
  const navigate = useNavigate();

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const menuItems = [
    {
      icon: FileText,
      label: '진료 이력',
      value: `${medicalVisits.length}건`,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100',
    },
    {
      icon: Pill,
      label: '복용 약물',
      value: `${medications.length}건`,
      color: 'text-purple-500',
      bgColor: 'bg-purple-100',
    },
  ];

  const settingsItems = [
    { icon: Settings, label: '설정' },
    { icon: HelpCircle, label: '도움말' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 헤더 */}
      <header className="bg-white border-b border-slate-100">
        <div className="px-4 py-4 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-1 -ml-1 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft size={24} className="text-slate-700" />
          </button>
          <h1 className="text-lg font-bold text-slate-900">내 정보</h1>
        </div>
      </header>

      <div className="px-4 py-6 space-y-4">
        {/* 프로필 카드 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100"
        >
          <div className="flex items-center gap-4 mb-5">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center">
              <User size={32} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">{userProfile.name}</h2>
              <p className="text-slate-500">
                {userProfile.gender === 'male' ? '남성' : '여성'} · {calculateAge(userProfile.birthDate)}세
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
              <Calendar size={20} className="text-slate-400" />
              <div>
                <p className="text-xs text-slate-500">생년월일</p>
                <p className="font-medium text-slate-800">
                  {new Date(userProfile.birthDate).toLocaleDateString('ko-KR')}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
              <Droplet size={20} className="text-red-400" />
              <div>
                <p className="text-xs text-slate-500">혈액형</p>
                <p className="font-medium text-slate-800">{userProfile.bloodType || '-'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
              <Ruler size={20} className="text-slate-400" />
              <div>
                <p className="text-xs text-slate-500">신장</p>
                <p className="font-medium text-slate-800">{userProfile.height}cm</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
              <Scale size={20} className="text-slate-400" />
              <div>
                <p className="text-xs text-slate-500">체중</p>
                <p className="font-medium text-slate-800">{userProfile.weight}kg</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 건강 나이 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-5 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">나의 건강 나이</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-4xl font-bold">{latestCheckup.healthAge}</span>
                <span className="text-slate-400">세</span>
              </div>
              <p className="text-sm text-slate-400 mt-1">
                실제 나이 {latestCheckup.actualAge}세
              </p>
            </div>
            <div className={`px-4 py-2 rounded-xl ${
              latestCheckup.healthAge > latestCheckup.actualAge
                ? 'bg-amber-500/20 text-amber-400'
                : 'bg-emerald-500/20 text-emerald-400'
            }`}>
              <span className="text-2xl font-bold">
                {latestCheckup.healthAge > latestCheckup.actualAge ? '+' : ''}
                {latestCheckup.healthAge - latestCheckup.actualAge}
              </span>
              <span className="text-sm ml-1">세</span>
            </div>
          </div>
        </motion.div>

        {/* 의료 정보 메뉴 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
        >
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className={`w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors ${
                  index !== menuItems.length - 1 ? 'border-b border-slate-100' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${item.bgColor}`}>
                    <Icon size={20} className={item.color} />
                  </div>
                  <span className="font-medium text-slate-800">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-500">{item.value}</span>
                  <ChevronRight size={18} className="text-slate-400" />
                </div>
              </button>
            );
          })}
        </motion.div>

        {/* 최근 진료 이력 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100"
        >
          <h3 className="font-semibold text-slate-800 mb-3">최근 진료 이력</h3>
          <div className="space-y-3">
            {medicalVisits.slice(0, 2).map((visit) => (
              <div
                key={visit.id}
                className="p-3 bg-slate-50 rounded-xl"
              >
                <div className="flex items-start justify-between mb-1">
                  <p className="font-medium text-slate-800">{visit.hospital}</p>
                  <span className="text-xs text-slate-500">
                    {new Date(visit.date).toLocaleDateString('ko-KR')}
                  </span>
                </div>
                <p className="text-sm text-slate-600">{visit.department} · {visit.diagnosis}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 설정 메뉴 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
        >
          {settingsItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className={`w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors ${
                  index !== settingsItems.length - 1 ? 'border-b border-slate-100' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={20} className="text-slate-500" />
                  <span className="font-medium text-slate-700">{item.label}</span>
                </div>
                <ChevronRight size={18} className="text-slate-400" />
              </button>
            );
          })}
        </motion.div>

        {/* 로그아웃 */}
        <button className="w-full flex items-center justify-center gap-2 py-3 text-slate-500 hover:text-red-600 transition-colors">
          <LogOut size={18} />
          <span>로그아웃</span>
        </button>

        {/* 앱 버전 */}
        <p className="text-center text-xs text-slate-400">
          건강 신호등 v1.0.0
        </p>
      </div>
    </div>
  );
}
