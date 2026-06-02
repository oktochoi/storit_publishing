# 스토릿 퍼블리싱 가이드

개발·디자인 인수 시 참고하는 **폴더 구조**와 **파일 네이밍** 규칙입니다.

## 디렉터리 구조

```
storit_publishing/
├── assets/
│   ├── icons/              # 전역 UI 아이콘 (닫기, 뒤로, GNB 등)
│   └── images/
│       ├── common/         # 여러 화면에서 쓰는 배경·웨이브·아이콘
│       ├── main/           # 홈(메인) 전용
│       ├── onboarding/     # 온보딩·로그인·환영
│       ├── invite/         # 친구 초대 모달
│       ├── shop/           # 상점
│       ├── ranking/        # 랭킹
│       ├── quiz/           # 퀴즈 플레이·결과
│       ├── myquiz/         # 내 퀴즈
│       ├── missions/       # 미션·재료
│       ├── attendance/     # 출석
│       └── mypage/         # 마이페이지
├── css/                    # 화면군별 스타일 (*-common.css)
├── js/
└── pages/                  # URL 단위 HTML (기능별 하위 폴더)
```

## 네이밍 규칙

| 구분 | 규칙 | 예시 |
|------|------|------|
| 파일명 | **kebab-case** (소문자, 하이픈) | `hero-banner.svg`, `modal-cookie-shortage.svg` |
| 폴더 접두어 | 폴더명을 파일명에 **반복하지 않음** | `invite/hero.svg` (❌ `invite/invite-hero.svg`) |
| 배경 | `bg-` 접두어 | `common/bg-main.svg`, `common/bg-agree.svg` |
| 아이콘 | `icon-` 접두어 | `main/icon-alarm.svg`, `invite/icon-copy.svg` |
| 모달 일러스트 | `modal-` 접두어 | `shop/modal-cookie-shortage.svg` |
| 온보딩 단계 | `step-N.svg` | `onboarding/step-1.svg` |
| 버튼 이미지 | `btn-` 접두어 | `onboarding/btn-kakao.svg` |

공백·언더스코어·대문자 파일명은 사용하지 않습니다.  
(예: ~~`Back Button.svg`~~ → `icons/icon-back.svg`, ~~`happy_cookie.svg`~~ → `shop/complete-happy-cookie.svg`)

## CSS / HTML

- **BEM** 유사 클래스: `블록__요소--수식어` (예: `invite-sheet__close`)
- 화면별 공통 CSS: `{기능}-common.css` (`invite-common.css`, `shop-common.css`)
- 에셋 경로: 절대 경로 `/assets/...` (로컬 Live Server·배포 공통)
- 닫기 버튼 아이콘: `/assets/icons/XIcon.svg` (`object-fit: contain`)

## 주요 화면 · 미리보기 URL

| 화면 | 경로 |
|------|------|
| 홈 + 친구 초대 모달 | `/pages/main/index.html?invite=1` |
| 친구 초대 별도 보상 | `?reward=1` |
| 상점 · 쿠키 부족 모달 | `/pages/shop/product.html?modal=cookie` |
| 상점 · 발급 실패 모달 | `?modal=fail` |
| 친구 초대 (리다이렉트) | `/pages/invite/index.html` → 메인 `?invite=1` |

## 친구 초대 에셋 (`assets/images/invite/`)

| 파일 | 용도 |
|------|------|
| `hero.svg` | 시트 상단에 걸치는 쿠키·봉투 일러스트 |
| `icon-copy.svg` | 초대 코드 복사 |
| `reward-title-cookie.svg` | 별도 보상 모달 타이틀 장식 |

## 상점 모달 에셋 (`assets/images/shop/`)

| 파일 | 용도 |
|------|------|
| `modal-cookie-shortage.svg` | 보유 쿠키 부족 |
| `modal-coupon-fail.svg` | 쿠폰 발급 실패 |
| `complete-happy-cookie.svg` | 교환 완료 히어로 |

## 공통 에셋 (`assets/images/common/`)

| 파일 | 용도 |
|------|------|
| `bg-main.svg` | 메인·퀴즈·랭킹 등 크림 배경 |
| `bg-agree.svg` | 약관·회원정보 배경 |
| `wave-bottom.svg` | 하단 물결 데코 |
| `icon-check.svg` | 출석체크 등 체크 아이콘 |
| `icon-notification.svg` | 알림 모달 아이콘 |

## 전역 아이콘 (`assets/icons/`)

| 파일 | 용도 |
|------|------|
| `icon-back.svg` | 헤더 뒤로가기 |
| `XIcon.svg` | 모달 닫기 (12×12) |
| `icon-calendar.svg` | 생년월일 입력 |
| `angel-cookie.svg` | 홈 쿠키 모달 |

## 인수 시 체크리스트

- [ ] 새 이미지는 해당 **기능 폴더**에만 추가
- [ ] 파일명 **kebab-case**, 폴더명 중복 접두어 없음
- [ ] HTML/CSS/JS 경로가 `/assets/...` 로 통일되어 있는지
- [ ] 테스트·중복 에셋(`_test.png`, 미사용 SVG) 제거 여부

---

문의·추가 규칙이 필요하면 이 문서에 섹션을 이어서 정리하면 됩니다.
