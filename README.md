# 🍱 반찬 유통기한 관리 앱

집에서 만든 반찬의 유통기한을 추적하고, 먹기 좋은 반찬을 놓치지 않도록 도와주는 모바일 앱입니다.

## 주요 기능

- 반찬 등록 — 이름, 카테고리, 보관 방법 입력 시 유통기한 자동 계산
- D-Day 표시 — 만료까지 남은 일수를 색상으로 시각화
- 반찬 관리 — 먹었어요 / 버렸어요 처리 및 정보 편집
- 매일 오전 9시 알림 — 오늘 먹어야 할 반찬 리마인더
- 로컬 저장 — 백엔드 없이 기기에 데이터 유지

## 카테고리별 권장 보관일

| 카테고리 | 냉장 | 냉동 |
|----------|------|------|
| 나물 | 3일 | 14일 |
| 볶음 | 5일 | 14일 |
| 조림 | 7일 | 30일 |
| 김치 | 14일 | 60일 |
| 국 | 3일 | 14일 |

## 기술 스택

- **React Native** (Expo Managed Workflow)
- **expo-router** — 파일 기반 라우팅
- **Zustand** — 상태 관리
- **AsyncStorage** — 로컬 데이터 저장
- **expo-notifications** — 로컬 푸시 알림
- **TypeScript**

## 프로젝트 구조

```
app/
  _layout.tsx       # 루트 레이아웃, 초기화
  index.tsx         # 홈 (반찬 목록)
  add.tsx           # 반찬 추가
  [id].tsx          # 반찬 상세 / 편집

src/
  components/
    dish/           # 반찬 관련 컴포넌트
    ui/             # 공통 UI (Button, Card, Badge)
  hooks/            # 커스텀 훅 (selector)
  services/         # AsyncStorage, 알림
  store/            # Zustand 스토어
  theme/            # 디자인 시스템
  types/            # TypeScript 타입
  utils/            # 날짜 계산, 카테고리 규칙
```

## 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npx expo start
```

Expo Go 앱으로 QR 코드를 스캔하거나 시뮬레이터에서 실행하세요.
