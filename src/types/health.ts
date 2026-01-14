// 건강 상태 타입 정의
export type HealthStatus = 'safe' | 'caution' | 'danger';

// 건강 지표 인터페이스
export interface HealthMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: HealthStatus;
  normalRange: {
    min: number;
    max: number;
  };
  cautionRange: {
    min: number;
    max: number;
  };
  description: string;
  advice: string;
}

// 건강검진 결과 인터페이스
export interface HealthCheckup {
  id: string;
  date: string;
  metrics: HealthMetric[];
  overallStatus: HealthStatus;
  healthAge: number;
  actualAge: number;
}

// 건강검진 히스토리 인터페이스
export interface HealthHistory {
  date: string;
  value: number;
  status: HealthStatus;
}

// 건강 지표별 히스토리
export interface MetricHistory {
  metricId: string;
  metricName: string;
  unit: string;
  history: HealthHistory[];
}

// 알림 인터페이스
export interface HealthAlert {
  id: string;
  type: 'warning' | 'info' | 'urgent';
  title: string;
  message: string;
  metricId?: string;
  date: string;
  isRead: boolean;
  actionUrl?: string;
}

// 병원 정보 인터페이스
export interface Hospital {
  id: string;
  name: string;
  type: string;
  specialty: string[];
  address: string;
  distance: string;
  rating: number;
  phone: string;
  isOpen: boolean;
  openHours: string;
  lat?: number;
  lng?: number;
}

// 사용자 프로필 인터페이스
export interface UserProfile {
  id: string;
  name: string;
  birthDate: string;
  gender: 'male' | 'female';
  height: number;
  weight: number;
  bloodType?: string;
}

// 활동 데이터 인터페이스
export interface ActivityData {
  date: string;
  steps: number;
  distance: number;
  calories: number;
  activeMinutes: number;
}

// 투약 정보 인터페이스
export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  prescribedBy: string;
  purpose: string;
}

// 진료 이력 인터페이스
export interface MedicalVisit {
  id: string;
  date: string;
  hospital: string;
  department: string;
  doctor: string;
  diagnosis: string;
  notes: string;
}
