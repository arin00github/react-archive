# Web API Engineering Archive

브라우저 Web API 및 프론트엔드 클라이언트 설계를 기능 단위로 정리한 포트폴리오 아카이브.

- 목적: Canvas / MediaRecorder / OpenLayers / 외부 API 연동 등 “브라우저 중심 기능”을 설계 관점에서 정리
- 형태: 라우팅 단위로 분리된 기능 아카이브 (단일 서비스가 아니라 기술 실험 모음)

## Demo

- Live: (배포 링크)
- Screenshots: (이미지 또는 GIF)

## Tech Stack

- **Framework**: Next.js, React
- **UI**: MUI
- **State & Data Fetching**: React Query
- **Web APIs**: Canvas API, MediaRecorder API
- **Map**: OpenLayers
- **Edge/Proxy**: Cloudflare Worker

## Routes

- `/drawing` : Canvas 기반 그림판
- `/record-audio` : MediaRecorder 기반 녹음
- `/data-visualize` : 차트 시각화
- `/worldmap` : OpenLayers 세계지도
- `/diplomacy` : 공공데이터 API 연동 + Worker Proxy

---

# Feature Breakdown & Engineering Notes

## /drawing — Canvas 기반 그림판

### 제공 기능

- 펜 색상 변경
- Reset
- Undo / Redo
- 이미지 다운로드

### Engineering Notes

- Canvas는 React의 선언형 렌더링 모델과 다르게 **명령형(imperative) API** 중심이라, `useRef`로 Canvas 컨텍스트를 직접 제어하는 방식으로 구현.
- Undo/Redo는 “히스토리 스택” 문제로 이어지므로, **상태/그리기 로직 분리 + 히스토리 관리 전략**을 의식하고 구성.

---

## /record-audio — MediaRecorder 기반 녹음

### 제공 기능

- 녹음 시작/종료
- 로컬 저장
- 녹음 리스트 표출
- 선택한 녹음 `audio` 태그로 재생
- 마이크 권한 체크 및 상태 표시

### Engineering Notes

- 권한 승인/거부에 따라 UX 흐름이 갈라지기 때문에, **권한 상태를 UI에 명확히 노출**하도록 설계.
- 녹음 결과는 Blob으로 수집되며, 재생을 위해 Object URL 생성/정리가 필요하므로 **자원 해제**(cleanup)를 고려.

---

## /data-visualize — 데이터 시각화

### 제공 기능

- 차트 종류 선택에 따른 캔버스 변경
- 옵션 토글:
  - 제목 표시 여부
  - Tooltip 표시 여부
  - Legend 표시 여부 및 위치

### Engineering Notes

- 옵션 변경이 잦은 UI라서, “옵션 상태 → 차트 설정” 변환 레이어를 분리해 **UI 로직과 차트 설정 로직을 분리**하는 방향으로 구성.

---

## /worldmap — OpenLayers 세계지도

### 제공 기능

- OpenLayers 지도 렌더링
- 국가 선택 시 국가 정보 팝업 표출

### Engineering Notes

- OpenLayers는 React와 생명주기가 다르므로, 초기화/정리(cleanup)를 `useEffect` 기준으로 맞추고 **이벤트 핸들링과 레이어 관리**를 분리.

---

## /diplomacy — 공공데이터 API 연동

### 제공 기능

- 외부 공공데이터 API 호출
- 페이지네이션
- React Query 캐싱
- 검색 기능: API 미지원으로 미구현

### Engineering Notes

- API Key가 URL/클라이언트에 노출되는 문제를 줄이기 위해 **Cloudflare Worker Proxy**를 사용.
- 클라이언트는 Worker 엔드포인트만 호출하도록 하여 “노출 최소화” 구조를 구성.
- React Query를 사용해 **캐싱/재요청/로딩 상태**를 표준화.

---

# Limitations

- 서버 저장(계정 기반 데이터 저장) 미구현
- 인증/권한 시스템 미구현
- 일부 기능은 외부 API 제약(검색 등)으로 제한
