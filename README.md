# 현샘영수 홈페이지

Next.js (App Router) + TypeScript + Tailwind CSS 원페이지 사이트.

## 실행

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 배포 전 빌드 확인
```

## 환경변수 (상담 신청 → 텔레그램 알림)

`.env.example` 을 복사해 `.env.local` 을 만들고 값을 채웁니다.

```
TELEGRAM_BOT_TOKEN=123456:ABC...
TELEGRAM_CHAT_ID=123456789
```

1. 텔레그램에서 **@BotFather** → `/newbot` → 발급된 토큰을 `TELEGRAM_BOT_TOKEN` 에 입력
2. 만든 봇과 대화를 열고 아무 메시지나 보냄
3. 브라우저에서 `https://api.telegram.org/bot<토큰>/getUpdates` 접속 → `"chat":{"id": ...}` 숫자를 `TELEGRAM_CHAT_ID` 에 입력

환경변수가 없으면 폼 제출 시 "전송에 실패했습니다" 메시지가 나옵니다.

알림 방식을 이메일 등으로 바꾸려면 `src/lib/notify.ts` 의 `sendConsultNotification` 함수 내용만 교체하면 됩니다.

## Vercel 배포 (무료 플랜)

1. 이 폴더를 GitHub 저장소에 올립니다.
2. https://vercel.com → **Add New → Project** → 저장소 선택 (Framework: Next.js 자동 인식)
3. **Environment Variables** 에 `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` 입력 → **Deploy**
4. 도메인 연결: Project → Settings → Domains

환경변수를 나중에 바꿨다면 Deployments 에서 **Redeploy** 해야 반영됩니다.

## 내용 수정 — `src/content.ts`

문구·링크는 모두 이 파일 하나에 있습니다. 따옴표 안의 글자만 바꾸면 됩니다.

| 항목 | 위치 |
|---|---|
| 카카오톡 채널 주소 | `site.kakaoUrl` (지금은 `https://pf.kakao.com/_XXXX` 임시값) |
| 메인 문구 | `hero` |
| 메인 사진 | `hero.photo` — 지금은 Unsplash 임시 사진. 원장님 사진을 `public/hero.jpg` 로 넣고 `photo: "/hero.jpg"`, `photoAlt` 도 함께 수정 |
| 메인 사진 위 배지 | `hero.badge` |
| 공부방 사진 | `photos` — `public` 폴더에 넣고 `{ src: "/room-1.jpg", alt: "…" }`. 선생님 소개 아래에 표시, 비어 있으면 숨김 |
| 영어·수학 수업 설명, 수업 시간 | `english`, `math` (`paragraphs` 의 한 줄 = 한 문단) |
| 학습 관리 4개 항목 | `care.items` |
| 탐구 코칭 | `coaching` |
| 선생님 소개 / 사진 | `teacher` — 사진을 `public/teacher.jpg` 로 넣고 `photo: "/teacher.jpg"`. 비워두면 사진 영역이 숨겨집니다. |
| 영어 특별 과정 | `englishSpecial` — 라벨·제목·항목·안내 문구. `items` 를 비우면 박스가 숨겨집니다. |
| 진학 | `admissions` — `period` 에 기간(비우면 숨김), `groups` 에 `{ label, verb: "선발"/"진학", schools: [...] }`. 끝에 "등"이 자동으로 붙습니다. 비어 있으면 숨겨집니다. |
| 상담 폼 학년 목록·과목 | `consult.grades`, `consult.subjects` |
| 상담 안내 문구 (카카오톡 안내) | `consult.kakaoGuide`, `consult.kakaoTip`, `consult.notice` |
| 수업 대상 및 시간표 | 시간은 `english` / `math` / `coaching` 의 `schedule` 에서 자동으로 가져옵니다. 표 제목·안내 문구는 `timetable` |
| 자주 묻는 질문 | `faq` — `{ q: "질문", a: "답변" }` 을 추가·삭제 |
| 푸터 상호·대표자·교습자 신고번호 | `footer` — 비워둔 항목은 표시되지 않습니다. |

## 이미지

- `public/logo.png` — 원본 로고
- `public/logo-header.png` — 헤더·푸터용 가로형 로고 (원본에서 잘라 배경을 투명하게 만든 것)
- `src/app/icon.png`, `apple-icon.png` — 파비콘 (HS 모노그램)
- `src/app/opengraph-image.png` — 카카오톡·SNS 공유 미리보기 이미지
