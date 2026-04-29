# 🍱 반찬 유통기한 관리 앱

집에서 만든 반찬의 유통기한을 추적하고, AI 레시피 추천까지 받을 수 있는 모바일 앱입니다.

## 주요 기능

- **반찬 등록** — 이름, 카테고리, 보관 방법 입력 시 유통기한 자동 계산
- **D-Day 표시** — 만료까지 남은 일수를 색상으로 시각화
- **반찬 관리** — 먹었어요 / 버렸어요 처리 및 정보 편집
- **AI 레시피 추천** — 보유 재료 기반으로 만들 수 있는 요리 추천
- **매일 오전 9시 알림** — 오늘 먹어야 할 반찬 리마인더
- **로그인 / 회원가입** — Firebase 이메일 인증
- **자동 로그인** — 앱 재시작 시 세션 복구

## 카테고리별 권장 보관일

| 카테고리 | 냉장 | 냉동 |
|----------|------|------|
| 나물 | 3일 | 14일 |
| 볶음 | 5일 | 14일 |
| 조림 | 7일 | 30일 |
| 김치 | 14일 | 60일 |
| 국 | 3일 | 14일 |

## 기술 스택

| 분류 | 기술 |
|------|------|
| 프레임워크 | React Native (Expo SDK 54, Managed Workflow) |
| 라우팅 | expo-router (파일 기반) |
| 상태 관리 | Zustand |
| 로컬 저장 | AsyncStorage |
| 인증 | Firebase Auth (이메일/비밀번호) |
| AI 추천 | 백엔드 REST API 연동 |
| 알림 | expo-notifications |
| 언어 | TypeScript |

## 프로젝트 구조

```
app/
  (auth)/
    login.tsx         # 로그인 화면
    signup.tsx        # 회원가입 화면
  (tabs)/
    index.tsx         # 홈 — 반찬 목록
    recipe.tsx        # AI 레시피 추천 목록
  add.tsx             # 반찬 추가
  [id].tsx            # 반찬 상세 / 편집
  recipe/[id].tsx     # 레시피 상세
  _layout.tsx         # 루트 레이아웃, 인증 가드

src/
  api/                # AI 레시피 API 클라이언트
  components/
    auth/             # AuthInput, AuthButton
    dish/             # 반찬 카드 등
    ui/               # 공통 UI (Button, Card, Badge)
  hooks/              # 커스텀 훅
  lib/
    firebase.ts       # Firebase 초기화
    api.ts            # 인증 토큰 자동 첨부 HTTP 클라이언트
  services/           # 알림 설정
  store/
    authStore.ts      # 인증 상태, 세션 복구
    useDishStore.ts   # 반찬 목록 CRUD
    useRecipeStore.ts # 레시피 상태
  theme/              # 디자인 시스템 (COLORS, TYPO, SPACING)
  types/              # TypeScript 타입 정의
  utils/              # 날짜 계산, 카테고리 규칙, 레시피 매핑
```

## 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (캐시 초기화 포함)
npx expo start --clear
```

Expo Go 앱으로 QR 코드를 스캔하거나 시뮬레이터에서 실행하세요.

## 환경 변수

`.env.local` 파일을 생성하고 아래 값을 설정하세요:

```
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=...
EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID=...
```
