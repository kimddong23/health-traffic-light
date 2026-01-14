# 건강 신호등 (Health Traffic Light)

공공데이터 기반 '전 국민 건강 신호등' - 맞춤형 건강 위험도 분석 및 능동적 케어 서비스

## 프로젝트 개요

> **본 프로젝트는 UI/UX 목업(Mockup)입니다.** 실제 API 연동 없이 샘플 데이터로 구현되어 있으며, 서비스 컨셉과 사용자 경험을 시연하기 위한 프로토타입입니다.

'건강 신호등'은 건강검진 데이터를 직관적인 신호등 색상(초록-노랑-빨강)으로 시각화하여 누구나 쉽게 자신의 건강 상태를 파악할 수 있는 서비스입니다. 웨어러블 기기 없이도 스마트폰만으로 건강 관리가 가능하며, 위험 징후 감지 시 병원 방문을 능동적으로 권유합니다.

## 주요 기능

### 1. 건강 신호등 대시보드
- 건강검진 결과를 초록(안전), 노랑(주의), 빨강(위험) 색상으로 시각화
- 전체 건강 상태 요약 및 건강 나이 표시
- 주의가 필요한 지표 우선 노출

### 2. 건강검진 결과 상세 분석
- 개별 지표별 상세 정보 제공
- 10년간 추세 차트로 변화 추이 확인
- 기준 범위 및 건강 관리 조언 제공

### 3. 주변 병원 찾기
- 위치 기반 가까운 병원 검색
- 진료과목별 필터링
- 전화 연결 및 지도 연동

### 4. 건강 알림 센터
- 위험 징후 감지 시 즉시 알림
- 정기 검진 일정 안내
- 활동 목표 달성 알림

### 5. 활동량 추적
- 스마트폰 내장 센서 활용 걸음 수 측정
- 일일 목표 대비 달성률 표시
- 칼로리 소모량 및 활동 시간 기록

## 기술 스택

- **Frontend**: React 18, TypeScript
- **빌드 도구**: Vite
- **스타일링**: Tailwind CSS
- **애니메이션**: Framer Motion
- **차트**: Recharts
- **아이콘**: Lucide React
- **라우팅**: React Router DOM

## 로컬 실행 방법

### 1단계: Node.js 설치 확인

먼저 Node.js가 설치되어 있는지 확인합니다. 터미널(명령 프롬프트)을 열고 다음 명령어를 입력하세요:

```bash
node --version
```

버전이 표시되면 설치되어 있는 것입니다. 만약 설치되어 있지 않다면 [Node.js 공식 사이트](https://nodejs.org/ko)에서 LTS 버전을 다운로드하여 설치하세요.

### 2단계: 프로젝트 다운로드

**방법 A: Git으로 클론하기**
```bash
git clone https://github.com/kimddong23/health-traffic-light.git
cd health-traffic-light
```

**방법 B: ZIP 파일로 다운로드하기**
1. GitHub 저장소 페이지에서 녹색 `Code` 버튼 클릭
2. `Download ZIP` 선택
3. 다운로드된 파일 압축 해제
4. 터미널에서 압축 해제된 폴더로 이동

### 3단계: 의존성 패키지 설치

프로젝트 폴더에서 다음 명령어를 실행하여 필요한 패키지들을 설치합니다:

```bash
npm install
```

설치가 완료될 때까지 잠시 기다려주세요 (1-2분 소요).

### 4단계: 개발 서버 실행

```bash
npm run dev
```

실행 후 터미널에 다음과 같은 메시지가 표시됩니다:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
```

### 5단계: 브라우저에서 확인

웹 브라우저를 열고 주소창에 다음 주소를 입력하세요:

```
http://localhost:5173
```

건강 신호등 앱이 실행됩니다.

### 서버 종료 방법

터미널에서 `Ctrl + C`를 누르면 개발 서버가 종료됩니다.

### 프로덕션 빌드 (배포용)

실제 서버에 배포할 파일을 생성하려면:

```bash
npm run build
```

빌드된 파일은 `dist/` 폴더에 생성됩니다.

## 프로젝트 구조

```
health-traffic-light/
├── public/
│   └── vite.svg              # 앱 아이콘
├── src/
│   ├── components/           # 재사용 가능한 UI 컴포넌트
│   │   ├── Layout.tsx        # 레이아웃 (네비게이션 포함)
│   │   ├── TrafficLight.tsx  # 신호등 컴포넌트
│   │   ├── StatusBadge.tsx   # 상태 뱃지
│   │   ├── HealthCard.tsx    # 건강 지표 카드
│   │   ├── HealthSummaryCard.tsx  # 건강 요약 카드
│   │   ├── ActivityCard.tsx  # 활동량 카드
│   │   ├── AlertCard.tsx     # 알림 카드
│   │   ├── HospitalCard.tsx  # 병원 정보 카드
│   │   └── TrendChart.tsx    # 추세 차트
│   ├── pages/                # 페이지 컴포넌트
│   │   ├── HomePage.tsx      # 메인 대시보드
│   │   ├── CheckupPage.tsx   # 검진 결과 목록
│   │   ├── MetricDetailPage.tsx  # 지표 상세
│   │   ├── HospitalsPage.tsx # 병원 찾기
│   │   ├── AlertsPage.tsx    # 알림 센터
│   │   └── ProfilePage.tsx   # 내 정보
│   ├── data/
│   │   └── mockData.ts       # 샘플 데이터
│   ├── types/
│   │   └── health.ts         # TypeScript 타입 정의
│   ├── App.tsx               # 앱 라우팅
│   ├── main.tsx              # 앱 진입점
│   └── index.css             # 전역 스타일
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.ts
```

## 데이터 연동

현재는 `src/data/mockData.ts`에 샘플 데이터가 포함되어 있습니다. 실제 서비스 구현 시 다음 API와 연동할 수 있습니다:

### 공공데이터 포털 API (예시)
- 건강보험공단 건강검진 데이터
- 국민건강보험 투약 정보
- 병원 정보 API

### 데이터 연동 방법
1. `src/data/` 폴더에 API 호출 로직 추가
2. 각 페이지에서 mock 데이터 대신 API 데이터 사용
3. 필요 시 상태 관리 라이브러리(Zustand, Redux 등) 도입

## 디자인 원칙

### 색상 체계
- **안전 (Safe)**: 초록색 계열 (`#10b981`)
- **주의 (Caution)**: 노란색 계열 (`#f59e0b`)
- **위험 (Danger)**: 빨간색 계열 (`#ef4444`)
- **기본 (Primary)**: 파란색 계열 (`#3b82f6`)

### UI/UX 특징
- 모바일 퍼스트 반응형 디자인
- 직관적인 신호등 색상 시스템
- 부드러운 애니메이션 효과
- 접근성을 고려한 색상 대비

## 법적 고려사항

본 서비스는 비의료 건강관리 서비스 가이드라인을 준수합니다:
- 의료 행위(진단)로 오인되지 않는 안내 문구 사용
- "주의 단계입니다", "전문의 상담을 권장합니다" 등 표현 사용
- 단정적인 진단 표현 지양

## 향후 개선 계획

1. 실제 건강검진 API 연동
2. 스마트폰 센서 연동 (Health Connect, HealthKit)
3. 푸시 알림 기능 구현
4. 병원 예약 시스템 연동
5. 다국어 지원

## 작성자

**신주용**

- 이메일: robotshin96@gmail.com
- 2025 나의건강기록 앱 공모전 제안 분야 출품작

## 라이선스

본 프로젝트는 공모전 출품용으로 제작되었습니다.
