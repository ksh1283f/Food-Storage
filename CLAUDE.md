# 🍱 Food Expire Manager - Claude Code Prompt

## 🎯 Goal

Build a React Native (Expo) mobile app that helps users track homemade side dishes and get notified before they expire.

This is an MVP-focused project. Prioritize simplicity, usability, and fast input.

---

## 🧱 Tech Stack

* React Native (Expo Managed Workflow)
* TypeScript
* Zustand (state management)
* AsyncStorage (local persistence)
* Expo Notifications (local push notifications)
* React Navigation (stack)

---

## 📁 Project Structure

Create the following structure:

```
src/
 ├─ components/
 │   └─ DishCard.tsx
 ├─ screens/
 │   ├─ HomeScreen.tsx
 │   ├─ AddScreen.tsx
 │   └─ DetailScreen.tsx
 ├─ store/
 │   └─ useDishStore.ts
 ├─ utils/
 │   ├─ date.ts
 │   └─ categoryRules.ts
 ├─ services/
 │   ├─ storage.ts
 │   └─ notification.ts
 └─ types/
     └─ index.ts
```

---

## 📦 Data Model

```ts
type Dish = {
  id: string;
  name: string;
  category: string;
  storageType: "fridge" | "freezer";
  createdAt: string;
  expireAt: string;
  recommendedDays: number;
  status: "active" | "eaten" | "discarded";
};
```

---

## 🧠 Core Logic

### Category Rules

```ts
const CATEGORY_RULES = {
  나물: { fridge: 3, freezer: 14 },
  볶음: { fridge: 5, freezer: 14 },
  조림: { fridge: 7, freezer: 30 },
  김치: { fridge: 14, freezer: 60 },
  국: { fridge: 3, freezer: 14 }
};
```

---

### Expire Date Calculation

* When user adds a dish:

  * Automatically calculate `expireAt`
  * Use category + storageType

---

### D-Day Logic

* expired: D < 0
* today: D == 0
* soon: D <= 2
* safe: D > 2

---

## 📱 Screens

### 1. HomeScreen

* Show list of dishes sorted by `expireAt`
* Display:

  * name
  * D-Day
* Button to navigate to AddScreen
* Tap item → DetailScreen

---

### 2. AddScreen

Inputs:

* dish name (TextInput)
* category (default: 나물)

Auto:

* createdAt = now
* expireAt = calculated

On submit:

* save to store
* go back

---

### 3. DetailScreen

Show:

* name
* D-Day

Actions:

* "먹었어요" → status = eaten
* "버렸어요" → status = discarded

---

## 🗃 State Management

Use Zustand:

* dishes[]
* addDish()
* updateDish()
* load()

Persist data using AsyncStorage.

---

## 💾 Storage

* Save dishes to AsyncStorage
* Load on app start

---

## 🔔 Notifications

* Request permission on app start
* Schedule daily notification at 9 AM

Message:

* "오늘 먹으면 좋은 반찬이 있어요"

(Advanced: generate dynamic message based on expiring items)

---

## ⚠️ Constraints

* Keep UI simple (no heavy design)
* Focus on functionality first
* Avoid over-engineering
* No backend (local-only MVP)

---

## 🚀 Deliverables

Claude should generate:

1. Full working Expo project code
2. All files in the structure above
3. Clean, readable TypeScript code
4. Minimal but functional UI

---

## 🔥 Optional Improvements (if time allows)

* Category dropdown UI
* Better styling (card UI)
* Grouping (today / soon / safe)
* Dynamic notification message

---

## 🧩 Important Philosophy

* Input must be fast (under 3 seconds)
* Notifications must be useful, not spammy
* This is a behavior-driven app (eat before expire)

---

## ✅ Success Criteria

* User can add dish in < 5 seconds
* User sees which dish to eat first
* App reminds user daily
* Data persists after restart

---

## 💬 Instruction to Claude

Generate the full project step by step.

Start with:

1. package.json dependencies
2. folder structure
3. core logic files
4. UI screens
5. navigation setup
6. notification setup

Ensure everything runs with:

```
npx create-expo-app
npx expo start
```

---
