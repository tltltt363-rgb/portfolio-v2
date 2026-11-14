# 방송용 아바타 포트폴리오

성형 · 페이셜 · 텍스쳐 · 뽀잉눈 작업을 소개하는 포트폴리오 사이트예요.
가격 계산기, 세트 상품, 비포·애프터 비교, 문의 양식 복사가 들어 있어요.

## 파일 구성

| 파일 | 하는 일 | 고칠 일 |
|---|---|---|
| `config.js` | 가격, 세트, 개수, 아바타 정보, 작업물 파일 목록 | **자주 고쳐요** |
| `index.html` | 화면에 보이는 글자와 배치 (`[브랜드명]` 같은 문구) | 문구를 바꿀 때 |
| `media/` | 작업물 사진·영상을 넣는 폴더 | 파일을 올릴 때 |
| `js/portfolio.js` | 계산기, 슬라이드, 크게 보기 같은 동작 | 거의 없어요 |
| `js/dc-runtime.js`, `js/react.bundle.js` | 화면을 그려주는 실행 파일 | 고치지 마세요 |

## GitHub에서 고치는 법

1. 고칠 파일(대부분 `config.js`)을 눌러 열어요.
2. 오른쪽 위 연필(✏️) 버튼을 눌러요.
3. 값을 바꾸고 **Commit changes** 를 눌러요.

`config.js` 적는 규칙

- 글자는 따옴표 안에: `"기본 성형 세트"`
- 숫자는 따옴표 없이: `380000`
- 켜기/끄기는 `true` / `false`
- 줄 끝의 쉼표(`,`)는 지우지 마세요.

### 자주 하는 일

**가격 바꾸기**: `config.js` 의 `set1Price`, `priceA`, `dl3Pct` 같은 값을 고쳐요.

**세트 추가하기**: `setCount` 를 5로 올리고, 아래처럼 5번을 이어서 적어요.

```js
set5Name: "새 세트 이름",
set5Desc: "",
set5Items: "52가지 페이셜 + 성형 + 의상 1",
set5Price: 400000,
set5Note: "",
```

**작업물 사진·영상 넣기**

1. GitHub에서 `media` 폴더로 들어가 **Add file → Upload files** 로 파일을 올려요.
   카테고리별로 폴더를 나누면 편해요. (예: `media/seonghyeong/01.jpg`)
2. `config.js` 의 `worksMediaA`(성형), `worksMediaB`(페이셜), `worksMediaC`(텍스쳐), `worksMediaD`(뽀잉눈)에 주소를 적어요.

```js
worksMediaA: ["media/seonghyeong/01.jpg", "media/seonghyeong/02.mp4", "media/seonghyeong/03.png"],
```

- 적은 순서대로 카드가 되고, 카드 개수도 파일 수만큼 자동으로 맞춰져요.
- `.mp4` `.webm` `.mov` 파일은 **영상 카드**, 나머지 사진은 **이미지 카드**로 자동 인식돼요.
- 파일 이름에 띄어쓰기나 쉼표가 없게 해주세요.

**분양완료 표시하기**: `sale1Sold: true` 로 바꿔요.

**글자(문구) 바꾸기**: `index.html` 에서 `[브랜드명]`, `[보유 아바타 소개를 한 줄로 적어주세요]` 처럼
대괄호로 된 글자를 찾아 바꿔요. `{{ ... }}` 로 된 부분은 자동으로 채워지는 자리라 그대로 두세요.

## 인터넷에 공개하기 (GitHub Pages)

1. 저장소의 **Settings → Pages** 로 가요.
2. **Source** 를 `Deploy from a branch`, 브랜치를 `main`, 폴더를 `/ (root)` 로 고르고 **Save**.
3. 1~2분 뒤 위쪽에 나오는 주소(`https://아이디.github.io/저장소이름/`)로 들어가면 돼요.

이후에는 파일을 고치고 Commit 할 때마다 사이트에 자동으로 반영돼요. (보통 1분 안팎)

## 컴퓨터에서 미리 보기

`index.html` 을 바로 더블클릭해도 열려요. 사진이 안 보이면 이 폴더에서 아래 명령으로 열어요.

```bash
python -m http.server 8000
```

그다음 브라우저에서 `http://localhost:8000` 으로 들어가요.
