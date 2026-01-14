import type {
  HealthCheckup,
  MetricHistory,
  HealthAlert,
  Hospital,
  UserProfile,
  ActivityData,
  Medication,
  MedicalVisit
} from '../types/health';

// 사용자 프로필
export const userProfile: UserProfile = {
  id: 'user-001',
  name: '김건강',
  birthDate: '1985-03-15',
  gender: 'male',
  height: 175,
  weight: 72,
  bloodType: 'A+'
};

// 최신 건강검진 결과
export const latestCheckup: HealthCheckup = {
  id: 'checkup-2024-001',
  date: '2024-11-15',
  overallStatus: 'caution',
  healthAge: 43,
  actualAge: 39,
  metrics: [
    {
      id: 'bp-systolic',
      name: '수축기 혈압',
      value: 135,
      unit: 'mmHg',
      status: 'caution',
      normalRange: { min: 90, max: 120 },
      cautionRange: { min: 120, max: 140 },
      description: '심장이 수축할 때 혈관에 가해지는 압력입니다.',
      advice: '염분 섭취를 줄이고, 규칙적인 유산소 운동을 권장합니다.'
    },
    {
      id: 'bp-diastolic',
      name: '이완기 혈압',
      value: 88,
      unit: 'mmHg',
      status: 'caution',
      normalRange: { min: 60, max: 80 },
      cautionRange: { min: 80, max: 90 },
      description: '심장이 이완할 때 혈관에 가해지는 압력입니다.',
      advice: '스트레스 관리와 충분한 수면이 도움됩니다.'
    },
    {
      id: 'fasting-glucose',
      name: '공복 혈당',
      value: 105,
      unit: 'mg/dL',
      status: 'caution',
      normalRange: { min: 70, max: 100 },
      cautionRange: { min: 100, max: 126 },
      description: '8시간 이상 금식 후 측정한 혈중 포도당 농도입니다.',
      advice: '탄수화물 섭취를 조절하고, 식이섬유가 풍부한 음식을 섭취하세요.'
    },
    {
      id: 'total-cholesterol',
      name: '총 콜레스테롤',
      value: 195,
      unit: 'mg/dL',
      status: 'safe',
      normalRange: { min: 0, max: 200 },
      cautionRange: { min: 200, max: 240 },
      description: '혈중 총 콜레스테롤 수치입니다.',
      advice: '현재 정상 범위입니다. 건강한 식습관을 유지하세요.'
    },
    {
      id: 'ldl-cholesterol',
      name: 'LDL 콜레스테롤',
      value: 125,
      unit: 'mg/dL',
      status: 'safe',
      normalRange: { min: 0, max: 130 },
      cautionRange: { min: 130, max: 160 },
      description: '나쁜 콜레스테롤로 알려진 저밀도 지질단백질입니다.',
      advice: '포화지방 섭취를 줄이고 불포화지방을 섭취하세요.'
    },
    {
      id: 'hdl-cholesterol',
      name: 'HDL 콜레스테롤',
      value: 55,
      unit: 'mg/dL',
      status: 'safe',
      normalRange: { min: 40, max: 999 },
      cautionRange: { min: 35, max: 40 },
      description: '좋은 콜레스테롤로 알려진 고밀도 지질단백질입니다.',
      advice: '유산소 운동이 HDL 수치 상승에 도움됩니다.'
    },
    {
      id: 'bmi',
      name: '체질량지수',
      value: 23.5,
      unit: 'kg/m²',
      status: 'safe',
      normalRange: { min: 18.5, max: 23 },
      cautionRange: { min: 23, max: 25 },
      description: '체중(kg)을 키(m)의 제곱으로 나눈 값입니다.',
      advice: '정상 범위입니다. 현재 체중을 유지하세요.'
    },
    {
      id: 'hemoglobin',
      name: '헤모글로빈',
      value: 15.2,
      unit: 'g/dL',
      status: 'safe',
      normalRange: { min: 13, max: 17 },
      cautionRange: { min: 11, max: 13 },
      description: '적혈구 내 산소 운반 단백질의 농도입니다.',
      advice: '정상 범위입니다.'
    },
    {
      id: 'ast',
      name: 'AST (간기능)',
      value: 28,
      unit: 'U/L',
      status: 'safe',
      normalRange: { min: 0, max: 40 },
      cautionRange: { min: 40, max: 80 },
      description: '간 건강을 나타내는 효소 수치입니다.',
      advice: '정상 범위입니다. 과음을 피하세요.'
    },
    {
      id: 'alt',
      name: 'ALT (간기능)',
      value: 32,
      unit: 'U/L',
      status: 'safe',
      normalRange: { min: 0, max: 40 },
      cautionRange: { min: 40, max: 80 },
      description: '간세포 손상 정도를 나타내는 효소 수치입니다.',
      advice: '정상 범위입니다.'
    },
    {
      id: 'gfr',
      name: '사구체여과율',
      value: 92,
      unit: 'mL/min',
      status: 'safe',
      normalRange: { min: 90, max: 999 },
      cautionRange: { min: 60, max: 90 },
      description: '신장의 노폐물 배출 기능을 나타냅니다.',
      advice: '정상 범위입니다. 수분 섭취를 적정히 유지하세요.'
    }
  ]
};

// 건강 지표 히스토리 (10년치)
export const metricHistories: MetricHistory[] = [
  {
    metricId: 'bp-systolic',
    metricName: '수축기 혈압',
    unit: 'mmHg',
    history: [
      { date: '2015-04', value: 118, status: 'safe' },
      { date: '2016-04', value: 120, status: 'safe' },
      { date: '2017-04', value: 122, status: 'caution' },
      { date: '2018-04', value: 125, status: 'caution' },
      { date: '2019-04', value: 118, status: 'safe' },
      { date: '2020-04', value: 128, status: 'caution' },
      { date: '2021-04', value: 130, status: 'caution' },
      { date: '2022-04', value: 126, status: 'caution' },
      { date: '2023-04', value: 132, status: 'caution' },
      { date: '2024-11', value: 135, status: 'caution' }
    ]
  },
  {
    metricId: 'fasting-glucose',
    metricName: '공복 혈당',
    unit: 'mg/dL',
    history: [
      { date: '2015-04', value: 88, status: 'safe' },
      { date: '2016-04', value: 90, status: 'safe' },
      { date: '2017-04', value: 92, status: 'safe' },
      { date: '2018-04', value: 95, status: 'safe' },
      { date: '2019-04', value: 94, status: 'safe' },
      { date: '2020-04', value: 98, status: 'safe' },
      { date: '2021-04', value: 100, status: 'safe' },
      { date: '2022-04', value: 102, status: 'caution' },
      { date: '2023-04', value: 103, status: 'caution' },
      { date: '2024-11', value: 105, status: 'caution' }
    ]
  },
  {
    metricId: 'total-cholesterol',
    metricName: '총 콜레스테롤',
    unit: 'mg/dL',
    history: [
      { date: '2015-04', value: 180, status: 'safe' },
      { date: '2016-04', value: 185, status: 'safe' },
      { date: '2017-04', value: 192, status: 'safe' },
      { date: '2018-04', value: 198, status: 'safe' },
      { date: '2019-04', value: 195, status: 'safe' },
      { date: '2020-04', value: 190, status: 'safe' },
      { date: '2021-04', value: 188, status: 'safe' },
      { date: '2022-04', value: 192, status: 'safe' },
      { date: '2023-04', value: 194, status: 'safe' },
      { date: '2024-11', value: 195, status: 'safe' }
    ]
  },
  {
    metricId: 'bmi',
    metricName: '체질량지수',
    unit: 'kg/m²',
    history: [
      { date: '2015-04', value: 22.1, status: 'safe' },
      { date: '2016-04', value: 22.5, status: 'safe' },
      { date: '2017-04', value: 22.8, status: 'safe' },
      { date: '2018-04', value: 23.2, status: 'caution' },
      { date: '2019-04', value: 23.0, status: 'safe' },
      { date: '2020-04', value: 23.8, status: 'caution' },
      { date: '2021-04', value: 24.1, status: 'caution' },
      { date: '2022-04', value: 23.6, status: 'caution' },
      { date: '2023-04', value: 23.4, status: 'caution' },
      { date: '2024-11', value: 23.5, status: 'caution' }
    ]
  }
];

// 건강 알림
export const healthAlerts: HealthAlert[] = [
  {
    id: 'alert-001',
    type: 'warning',
    title: '혈압 주의 필요',
    message: '최근 검진 결과 수축기 혈압이 135mmHg로 주의 단계입니다. 전문의 상담을 권장합니다.',
    metricId: 'bp-systolic',
    date: '2024-11-16',
    isRead: false,
    actionUrl: '/hospitals'
  },
  {
    id: 'alert-002',
    type: 'warning',
    title: '공복 혈당 상승 추세',
    message: '공복 혈당이 3년 연속 상승하고 있습니다. 당뇨 예방을 위한 생활 습관 개선이 필요합니다.',
    metricId: 'fasting-glucose',
    date: '2024-11-16',
    isRead: false,
    actionUrl: '/checkup/fasting-glucose'
  },
  {
    id: 'alert-003',
    type: 'info',
    title: '정기 건강검진 안내',
    message: '다음 국가건강검진 예정일이 2025년 4월입니다. 미리 일정을 확인해 주세요.',
    date: '2024-11-01',
    isRead: true
  },
  {
    id: 'alert-004',
    type: 'info',
    title: '걸음 수 목표 달성',
    message: '이번 주 평균 걸음 수 8,500보로 목표를 달성했습니다.',
    date: '2024-11-10',
    isRead: true
  }
];

// 주변 병원 정보
export const nearbyHospitals: Hospital[] = [
  {
    id: 'hospital-001',
    name: '서울대학교병원',
    type: '상급종합병원',
    specialty: ['내과', '심장내과', '내분비내과'],
    address: '서울특별시 종로구 대학로 101',
    distance: '2.3km',
    rating: 4.8,
    phone: '02-2072-2114',
    isOpen: true,
    openHours: '평일 08:30-17:30'
  },
  {
    id: 'hospital-002',
    name: '강북삼성병원',
    type: '종합병원',
    specialty: ['내과', '가정의학과', '건강검진센터'],
    address: '서울특별시 종로구 새문안로 29',
    distance: '1.5km',
    rating: 4.5,
    phone: '02-2001-2001',
    isOpen: true,
    openHours: '평일 08:00-17:00'
  },
  {
    id: 'hospital-003',
    name: '연세내과의원',
    type: '의원',
    specialty: ['내과'],
    address: '서울특별시 종로구 종로 33',
    distance: '0.8km',
    rating: 4.6,
    phone: '02-123-4567',
    isOpen: true,
    openHours: '평일 09:00-18:00, 토 09:00-13:00'
  },
  {
    id: 'hospital-004',
    name: '종로성모내과',
    type: '의원',
    specialty: ['내과', '순환기내과'],
    address: '서울특별시 종로구 삼봉로 81',
    distance: '1.2km',
    rating: 4.4,
    phone: '02-765-4321',
    isOpen: false,
    openHours: '평일 09:00-18:00'
  },
  {
    id: 'hospital-005',
    name: '서울메디컬센터',
    type: '종합병원',
    specialty: ['내과', '외과', '정형외과'],
    address: '서울특별시 중구 을지로 39',
    distance: '3.1km',
    rating: 4.3,
    phone: '02-3456-7890',
    isOpen: true,
    openHours: '24시간 응급실 운영'
  }
];

// 활동 데이터 (최근 7일)
export const activityData: ActivityData[] = [
  { date: '2024-11-08', steps: 7823, distance: 5.2, calories: 320, activeMinutes: 45 },
  { date: '2024-11-09', steps: 9156, distance: 6.1, calories: 380, activeMinutes: 52 },
  { date: '2024-11-10', steps: 6421, distance: 4.3, calories: 275, activeMinutes: 35 },
  { date: '2024-11-11', steps: 8934, distance: 5.9, calories: 365, activeMinutes: 48 },
  { date: '2024-11-12', steps: 10234, distance: 6.8, calories: 420, activeMinutes: 62 },
  { date: '2024-11-13', steps: 5678, distance: 3.8, calories: 240, activeMinutes: 28 },
  { date: '2024-11-14', steps: 8567, distance: 5.7, calories: 350, activeMinutes: 46 }
];

// 투약 정보
export const medications: Medication[] = [
  {
    id: 'med-001',
    name: '아스피린프로텍트정 100mg',
    dosage: '1정',
    frequency: '1일 1회 아침 식후',
    startDate: '2024-06-15',
    prescribedBy: '서울대학교병원 심장내과',
    purpose: '심혈관 질환 예방'
  }
];

// 진료 이력
export const medicalVisits: MedicalVisit[] = [
  {
    id: 'visit-001',
    date: '2024-11-15',
    hospital: '강북삼성병원',
    department: '건강검진센터',
    doctor: '이건강',
    diagnosis: '국가건강검진',
    notes: '혈압, 혈당 주의 소견. 6개월 후 재검 권고.'
  },
  {
    id: 'visit-002',
    date: '2024-06-15',
    hospital: '서울대학교병원',
    department: '심장내과',
    doctor: '박심장',
    diagnosis: '고혈압 전단계',
    notes: '생활습관 개선 권고. 아스피린 처방.'
  },
  {
    id: 'visit-003',
    date: '2024-03-20',
    hospital: '연세내과의원',
    department: '내과',
    doctor: '김내과',
    diagnosis: '상기도감염',
    notes: '감기 증상. 약물 처방 후 호전.'
  }
];
