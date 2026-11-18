🏥 MediBridge

한국을 방문한 일본인 여행자를 위한 AI 기반 의료 가이드 앱 GDG on Campus SWU · 2026 Impact Up 프로젝트

여행 중 몸이 아플 때 말이 통하지 않아도, 증상만 입력하면 알러지·복용약을 고려한 응급도 판정, 가까운 약국·병원 안내, 한국어/일본어 병기 소통 카드를 제공합니다.

<br>
👥 팀 구성
파트	담당
팀장 · Backend	@ojin4477
AI	프롬프트 및 입출력 JSON 스키마 설계
Frontend	React Native 앱 화면 구현 및 API 연동
Design	Figma 와이어프레임 및 UI 디자인
<br>
✨ 주요 기능
기능	설명
온보딩	기저질환 · 알러지 · 복용약 입력
유행병 알림	현지 보건 상황(유행 질환) 안내
증상 문진	부위 · 통증 정도 · 증상 선택
AI 진단	사용자 프로필과 증상을 바탕으로 응급도(셀프케어 / 약국 / 병원·응급실) 판정
약국·병원 안내	주변 약국 및 의료기관 목록
소통 카드	약사·의사에게 보여줄 수 있는 한/일 병기 카드
사용자 흐름
온보딩 → 홈(유행병 알림) → 증상 입력 → AI 진단 → 셀프케어 / 약국 방문 / 병원·응급실
                                                     ↓
                                              약국 안내 · 소통 카드
<br>
🛠 기술 스택
구분	기술
Backend	Java 21, Spring Boot 3.2, Gradle
AI	Google Gemini API (gemini-2.5-flash)
Frontend	React Native 0.85, TypeScript, React Navigation
Infra	Docker, Google Cloud Run
Tools	IntelliJ IDEA, Postman, GitHub, Figma
<br>
📡 API 명세 (Backend)
Method	Endpoint	설명
GET	/api/health	서버 상태 확인
GET	/api/conditions	기저질환 목록
GET	/api/allergens	알러지 목록
GET	/api/medications	복용약 목록
GET	/api/alerts	유행병 알림
GET	/api/symptom-questions	증상 문진 질문
GET	/api/facilities	약국 · 병원 목록
POST	/api/diagnose	AI 진단 (핵심)
GET	/api/comm-card/{diagnoseId}	한/일 소통 카드
POST /api/diagnose

AI 파트가 설계한 입출력 스키마에 맞춰 설계했습니다.

입력: 사용자 프로필(기저질환, 알러지, 복용약), 증상 정보, 현지 보건 상황
출력: 추정 질환(일본어/한국어), 심각도(severity), 신뢰도, 판단 근거, 추천 행동(recommendedOption)과 선택지, 위험 신호, 안전 주의사항, 면책 문구
<br>
📁 프로젝트 구조
2026-medibridge-ImpactUp
├── backend/                     # Spring Boot 서버
│   ├── src/main/java/com/example/MediLink
│   │   ├── controller/          # REST API 컨트롤러 (9개)
│   │   ├── service/             # 비즈니스 로직, Gemini 연동(DiagnoseService)
│   │   ├── model/               # 요청/응답 DTO
│   │   └── CorsConfig.java
│   ├── src/main/resources/      # CSV/JSON 기반 기초 데이터
│   └── Dockerfile
├── src/                         # React Native 화면 및 API 연결
├── android/ · ios/              # 네이티브 프로젝트
└── App.tsx
<br>
🚀 실행 방법 (Backend)
bash
cd backend

# Gemini API 키를 환경변수로 설정 (코드에 직접 넣지 않습니다)
export GEMINI_API_KEY=발급받은_키        # Windows: set GEMINI_API_KEY=발급받은_키

./gradlew bootRun
# http://localhost:8080/api/health
배포

Docker 멀티 스테이지 빌드(JDK로 빌드 → JRE로 실행)로 이미지를 만들어 Google Cloud Run(asia-northeast3)에 배포하고, 프론트엔드와 연동했습니다. API 키는 Cloud Run 환경변수로 주입했습니다.

<br>
🔧 트러블슈팅
문제	원인 및 해결
Gemini API 404 오류	모델명 오류 → gemini-2.5-flash로 수정
프론트 요청 시 NullPointerException	프론트 요청 형식과 DTO 불일치 → DiagnoseRequest를 프론트 형식에 맞게 재설계
배포 환경에서 GEMINI_API_KEY 읽기 실패	${GEMINI_API_KEY} 형식으로 로컬/배포 환경변수 분리
응답이 영어로 반환됨	프롬프트에 일본어 응답 지시 추가
<br>
🤝 협업 방식
브랜치 전략: main / develop / 파트별 브랜치(dev, front, AI/ML) → PR 기반 머지
API 명세서를 작성·공유하여 AI · 프론트 · 디자인 파트 간 입출력 스키마 합의
Figma 와이어프레임을 기준으로 화면별 필요 API 도출, 핵심 사용자 시나리오 중심으로 MVP 범위 설정
<br>
📌 향후 개선 사항
Gemini 응답 JSON 파싱 및 DiagnoseResponse 매핑 고도화 (현재 일부 응답은 임시 데이터로 반환)
CORS 허용 도메인을 운영 도메인으로 제한
CSV/JSON 기초 데이터를 DB로 이전
