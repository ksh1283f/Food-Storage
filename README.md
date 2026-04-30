# 🍱 반찬 유통기한 관리 앱

> 집에서 만든 반찬을 관리하고 AI 레시피 추천까지 받는 React Native 앱

![Expo](https://img.shields.io/badge/Expo-SDK%2054-000020?logo=expo)
![React Native](https://img.shields.io/badge/React%20Native-0.76-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)
![Firebase](https://img.shields.io/badge/Firebase-Auth-FFCA28?logo=firebase)

---

## 문제 정의

냉장고에 반찬이 언제 만들었는지 기억나지 않아 유통기한이 지나도록 방치하거나, 재료가 있음에도 뭘 만들지 몰라 낭비하는 상황을 해결하기 위해 제작했습니다.

---

## 주요 기능

| 기능 | 설명 |
|------|------|
| 반찬 등록 | 카테고리 + 보관 방법 선택 시 유통기한 자동 계산 |
| D-Day 시각화 | 만료일까지 남은 일수를 색상(위험/주의/안전)으로 표시 |
| 상태 관리 | 먹었어요 / 버렸어요 처리 |
| AI 레시피 추천 | 보유 재료 기반 요리 추천 및 상세 레시피 제공 |
| 로컬 알림 | 매일 오전 9시 만료 임박 반찬 리마인더 |
| Firebase 인증 | 이메일/비밀번호 회원가입 · 로그인, 자동 세션 복구 |

---

## 기술 스택 및 선택 이유

| 기술 | 선택 이유 |
|------|-----------|
| **Expo SDK 54** | 빠른 개발 환경, OTA 업데이트 지원 |
| **expo-router** | 파일 기반 라우팅으로 구조적 일관성 확보 |
| **Zustand** | Redux 대비 보일러플레이트 최소화, 단순한 API |
| **Firebase Auth** | 서버 없이 인증 인프라 구축 가능 |
| **AsyncStorage** | 반찬 데이터 로컬 영속화 |
| **TypeScript** | 타입 안정성, 리팩토링 편의성 |

---

## 아키텍처

```
app/                        # expo-router 라우트
  (auth)/login·signup       # 인증 플로우
  (tabs)/index·recipe       # 메인 탭
  add.tsx / [id].tsx        # 반찬 CRUD
  recipe/[id].tsx           # 레시피 상세

src/
  lib/firebase.ts           # Firebase 초기화
  lib/api.ts                # ID 토큰 자동 첨부 HTTP 클라이언트
  store/
    authStore.ts            # 인증 상태 + 세션 복구 로직
    useDishStore.ts         # 반찬 CRUD + AsyncStorage 동기화
    useRecipeStore.ts       # AI 레시피 상태
  api/aiRecipeApi.ts        # 레시피 API 연동
  utils/                    # 유통기한 계산, 레시피 매핑
  theme/designSystem.ts     # 디자인 토큰 (COLORS, TYPO, SPACING)
```

**인증 흐름**

```
앱 시작
  └─ onAuthStateChanged
       ├─ user 있음 → 탭 화면
       └─ user 없음 → AsyncStorage 세션 확인
            ├─ 세션 있음 → 자동 로그인 → 탭 화면
            └─ 세션 없음 → 로그인 화면
```

---

## 기술적 도전 과제

### 1. Firebase Auth 세션 유지
`@react-native-async-storage/async-storage` v2와 Firebase 12의 `getReactNativePersistence` 간 호환 문제로 로그인 후 앱 재시작 시 세션이 초기화되는 문제가 발생했습니다.

**해결:** Firebase의 내장 persistence 대신, 로그인 성공 시 자격증명을 AsyncStorage에 저장하고, 앱 시작 시 `onAuthStateChanged`에서 null을 반환할 경우 저장된 자격증명으로 자동 재로그인하는 방식으로 구현했습니다.

### 2. API 인증 토큰 자동 주입
모든 API 요청마다 Firebase ID 토큰을 수동으로 첨부하면 중복 코드가 발생합니다.

**해결:** `api.ts`에 공통 HTTP 클라이언트를 구현해 요청 시 `auth.currentUser.getIdToken()`을 자동으로 헤더에 첨부하도록 처리했습니다.

### 3. Metro 번들러의 Firebase 모듈 해석
`firebase/auth`의 `package.json`에 `react-native` 필드가 없어 Metro가 웹 번들을 사용, `getReactNativePersistence`가 undefined로 평가되는 문제를 분석했습니다.

---

## 카테고리별 권장 보관일

| 카테고리 | 냉장 | 냉동 |
|----------|------|------|
| 나물 | 3일 | 14일 |
| 볶음 | 5일 | 14일 |
| 조림 | 7일 | 30일 |
| 김치 | 14일 | 60일 |
| 국 | 3일 | 14일 |

---

## 실행 방법

```bash
npm install
npx expo start --clear
```

Expo Go 앱으로 QR 코드를 스캔하세요.

### 환경 변수

`.env.local` 파일 생성 후 아래 값을 설정하세요:

```
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=...
EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID=...
```
