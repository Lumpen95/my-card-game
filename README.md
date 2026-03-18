# my-card-game

Canvas API + JavaScript로 만든 카드 뒤집기(메모리) 게임입니다.  
점수는 Supabase `card_scores` 테이블에 저장됩니다.

## 실행

- `card_game/card-game.html`을 브라우저로 열면 됩니다.

## Supabase 설정

`card_game/config.js` 파일을 만들어(레포에 커밋되지 않음) 아래 2개 값을 Supabase 대시보드(Project Settings → API)에서 복사해 넣으세요.

1) `card_game/config.example.js`를 `card_game/config.js`로 복사  
2) 아래 값 채우기

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY` (publishable key 또는 legacy anon key)

## 배포(Vercel)에서 config.js 자동 생성

이 레포는 빌드 시점에 `card_game/config.js`를 자동 생성합니다.

- Vercel 프로젝트에서 Environment Variables에 아래 두 값을 추가하세요:
  - `SUPABASE_URL`
  - `SUPABASE_ANON_KEY`
- 빌드 단계에서 `npm run build`가 실행되며 `scripts/generate-config.mjs`가 `card_game/config.js`를 생성합니다.

## 기능

- 이름 입력 후 시작 버튼을 누르면 타이머 시작
- 클리어 시 기록 저장
- 하단 리더보드(top 10) 표시

