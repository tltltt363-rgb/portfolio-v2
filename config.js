/*
 * ════════════════════════════════════════════════════════════════
 *  config.js — 포트폴리오 내용을 고치는 파일이에요
 * ════════════════════════════════════════════════════════════════
 *
 *  가장 쉬운 방법: 사이트 주소 뒤에 /editor.html 을 붙여서 편집기로 고쳐요.
 *    https://tltltt363-rgb.github.io/portfolio-v2/editor.html
 *
 *  직접 고치는 법 (GitHub 웹사이트에서)
 *    1. 이 파일을 열고 오른쪽 위 연필(✏️) 버튼을 눌러요.
 *    2. 원하는 값을 고쳐요.
 *    3. 오른쪽 위 초록색 "Commit changes..." → 다시 "Commit changes" 를 눌러요.
 *    4. 1~2분 뒤 사이트를 새로고침하면 바뀐 내용이 보여요.
 *
 *  적는 규칙
 *    - 글자는 따옴표 안에:      "기본 성형 세트"
 *    - 숫자는 따옴표 없이:      380000
 *    - 켜기/끄기:              true / false
 *    - 목록 [ ... ] 안의 한 줄 { ... } 이 카드 하나예요.
 *      줄을 복사해서 붙여넣으면 추가, 줄을 지우면 삭제돼요. 순서를 바꾸면 화면 순서도 바뀌어요.
 *    - 줄 끝의 쉼표(,)는 지우지 마세요.
 *    - // 뒤는 설명이라 화면에 안 나와요.
 *
 *  고친 뒤 사이트가 하얗게 나오면 따옴표나 쉼표가 빠진 거예요.
 *  GitHub에서 이 파일의 "History" 를 눌러 바로 전 버전과 비교해 보세요.
 */
window.PORTFOLIO_CONFIG = {

  /* ━━━━━━━━━━ 기본 ━━━━━━━━━━
  */
  brandName: "무리",  // 브랜드 이름 (비우면 [브랜드명] 으로 보여요). 예: "MURI"
  accent: "#A4495B",  // 포인트 색 (색 코드)

  /* ━━━━━━━━━━ 맨 위 첫 화면 ━━━━━━━━━━
     제목에서 // 를 넣으면 줄이 바뀌어요.
  */
  heroEyebrow: "AVATAR PORTFOLIO",  // 제목 위 작은 영어 글자
  heroTitle: "화면 속 아바타를 더 완성도 있게",  // 큰 제목
  heroDesc: "아래 내용을 확인하신 후, 문의는 언제든 편하게 주세요\n\n제 아바타를 만드는것처럼 한분 한분에게 진심을 담아 아바타를 제작합니다.",  // 제목 아래 설명

  /* ━━━━━━━━━━ 맨 위 사진 묶음 ━━━━━━━━━━
     첫 화면 오른쪽 사진 3장이에요. 1번이 왼쪽 큰 칸, 2번이 오른쪽 위, 3번이 오른쪽 아래예요.
     file: 사진 (media/hero/ 에 올린 파일 이름 또는 사진 주소, .mp4 는 영상)   label: 사진 위 작은 글씨 (비우면 안 보여요)
     사진을 비워두면 그 칸은 임시 그림으로 보여요.
  */
  heroPhotos: [
    { file: "hero-01.webp", label: "BEFORE" },
    { file: "hero-02.webp", label: "AFTER" },
    { file: "hero-03.webp", label: "" },
  ],

  /* ━━━━━━━━━━ 장점 (WHY ME) ━━━━━━━━━━
     tag 는 카드 아래 검은 칩이에요. 비워두면 안 보여요.
     맨 위 첫 화면의 체크 칩에는 앞의 3개가 나와요.
  */
  strengthsTitle: "작가에게 맡기면 좋은 점",  // 장점 칸 제목
  strengths: [
    { title: "빠른 마감", desc: "약속한 날짜 안에 빠르게 완성해서 보내드려요.", tag: "" },
    { title: "예쁜 성형", desc: "작가만의 미감과 디테일로 아바타를 완성도 있게 살려요", tag: "" },
    { title: "중간 시안 공유", desc: "작업 중간에 결과를 보여드리고 의견을 반영해요.", tag: "" },
    { title: "처음이어도 친절하게", desc: "아바타 작업이 처음이거나 잘 모르시는 부분도 친절하게 안내해 드립니다.", tag: "" },
  ],

  /* ━━━━━━━━━━ 작업물 ━━━━━━━━━━
     file: 파일 이름 — 각 카테고리 폴더에 올린 파일 이름만 적으면 돼요.
        성형 → media/seonghyeong/   페이셜 → media/facial/
        텍스쳐 → media/texture/     뽀잉눈 → media/boing/
        (파일 올리기: 편집기의 "사진·영상 추가" 또는 GitHub "Add file → Upload files")
     title: 카드 제목 (아바타 이름)   desc: 카드 아래 한 줄 설명
     .mp4 .webm .mov 는 영상(자동 재생), 나머지는 사진으로 보여요.
     목록에 적은 순서대로 카드가 되고, 6개씩 한 페이지예요.
  */
  worksIntro: "작가의 작업물 포트폴리오 입니다",  // 작업물 제목 아래 한 줄 설명 (비우면 안 보여요)

  worksA: [  // 성형
    { file: "seonghyeong-01.webp", title: "Milltina", desc: "성형" },
    { file: "seonghyeong-02.webp", title: "Mayo", desc: "성형" },
    { file: "seonghyeong-03.webp", title: "Salt", desc: "성형" },
    { file: "seonghyeong-04.webp", title: "Mayo", desc: "성형" },
    { file: "seonghyeong-05.webp", title: "Shinano", desc: "성형" },
    { file: "seonghyeong-06.webp", title: "Milltina", desc: "성형" },
    { file: "seonghyeong-07.webp", title: "Milltina", desc: "성형" },
    { file: "seonghyeong-08.webp", title: "Mayo", desc: "성형" },
    { file: "seonghyeong-09.webp", title: "Milltina", desc: "성형" },
    { file: "seonghyeong-10.webp", title: "Mayo", desc: "성형" },
    { file: "seonghyeong-11.webp", title: "Milltina", desc: "성형" },
    { file: "seonghyeong-12.webp", title: "Chocolat", desc: "성형" },
    { file: "seonghyeong-13.webp", title: "Airi", desc: "성형" },
    { file: "seonghyeong-14.webp", title: "Milltina", desc: "성형" },
    { file: "seonghyeong-15.webp", title: "Suzuya", desc: "성형" },
    { file: "seonghyeong-16.webp", title: "Mayo", desc: "성형" },
    { file: "seonghyeong-17.webp", title: "Mayo", desc: "성형" },
    { file: "seonghyeong-18.webp", title: "Rurune", desc: "성형" },
    { file: "seonghyeong-19.webp", title: "Kaguya", desc: "성형" },
    { file: "seonghyeong-20.webp", title: "Milfy", desc: "성형" },
    { file: "seonghyeong-21.webp", title: "Milltina", desc: "성형" },
    { file: "seonghyeong-22.webp", title: "Milltina", desc: "성형" },
    { file: "seonghyeong-23.webp", title: "Airi", desc: "성형" },
    { file: "seonghyeong-24.webp", title: "Milltina", desc: "성형" },
    { file: "seonghyeong-25.webp", title: "Chocolat", desc: "성형" },
    { file: "seonghyeong-26.webp", title: "Chocolat", desc: "성형" },
    { file: "seonghyeong-27.webp", title: "Shinano", desc: "성형" },
    { file: "seonghyeong-28.webp", title: "Chocolat", desc: "성형" },
    { file: "seonghyeong-29.webp", title: "Lumina", desc: "성형" },
    { file: "seonghyeong-30.webp", title: "Shinano", desc: "성형" },
    { file: "seonghyeong-31.webp", title: "Eku", desc: "성형" },
  ],

  worksB: [  // 페이셜
    { file: "facial-01.mp4", title: "Milltina", desc: "페이셜" },
    { file: "facial-02.mp4", title: "Mayo", desc: "페이셜" },
    { file: "facial-03.mp4", title: "Milltina", desc: "페이셜" },
    { file: "facial-06.mp4", title: "Airi", desc: "페이셜" },
  ],

  worksC: [  // 텍스쳐
    { file: "texture-01.webp", title: "Milltina", desc: "메이크업" },
    { file: "texture-02.webp", title: "Milltina", desc: "메이크업" },
    { file: "texture-03.webp", title: "Airi", desc: "메이크업 + 블렌드쉐이프" },
    { file: "texture-04.webp", title: "Mayo", desc: "메이크업" },
    { file: "texture-05.webp", title: "Airi", desc: "메이크업" },
    { file: "texture-06.webp", title: "Milltina", desc: "메이크업" },
    { file: "texture-07.webp", title: "Airi", desc: "메이크업" },
    { file: "texture-08.webp", title: "Airi", desc: "AIRI & CHOCOLAT · 메이크업 + 아이 텍스쳐 + 애니메이션" },
    { file: "texture-09.webp", title: "Chocolat", desc: "" },
    { file: "texture-10.webp", title: "Mong Eye", desc: "아이 텍스쳐 · 아바타 10종" },
    { file: "texture-11.webp", title: "Mayo", desc: "메이크업 + 블렌드쉐이프" },
    { file: "texture-12.webp", title: "Kumaly", desc: "HELTY · 블렌드쉐이프 + 아이 텍스쳐 + 메이크업" },
    { file: "texture-13.jpg", title: "Shinano", desc: "메이크업 + 아이 텍스쳐 + 블렌드쉐이프" },
    { file: "texture-14.webp", title: "Shinano", desc: "ROLLY · 아이 텍스쳐 + 메이크업 + 블렌드쉐이프" },
    { file: "texture-15.webp", title: "Shinano", desc: "아이 텍스쳐 + 메이크업 + 애니메이션" },
  ],
  worksLinkC: "https://muridayo.booth.pm/",  // 텍스쳐 판매 링크
  worksLinkLabelC: "BOOTH에서 보기",  // 버튼 글자
  worksLinkTextC: "텍스쳐 작업물은 BOOTH에서 판매하고 있어요",  // 버튼 옆 안내 문구

  worksE: [  // 텍스쳐 비포·애프터
    { file: "texture-ba-01.webp", title: "Milltina makeup", desc: "텍스쳐 비포·애프터" },
    { file: "texture-ba-09.webp", title: "Airi", desc: "텍스쳐 비포·애프터" },
    { file: "texture-ba-02.webp", title: "Milltina makeup&eye", desc: "텍스쳐 비포·애프터" },
    { file: "texture-ba-03.webp", title: "Mayo makeup", desc: "텍스쳐 비포·애프터" },
    { file: "texture-ba-04.webp", title: "Mayo makeup", desc: "텍스쳐 비포·애프터" },
    { file: "texture-ba-05.webp", title: "Milltina makeup", desc: "텍스쳐 비포·애프터" },
    { file: "texture-ba-06.webp", title: "", desc: "텍스쳐 비포·애프터" },
    { file: "texture-ba-07.webp", title: "", desc: "텍스쳐 비포·애프터" },
    { file: "texture-ba-08.webp", title: "Airi makeup", desc: "텍스쳐 비포·애프터" },
    { file: "texture-ba-10.webp", title: "Airi makeup", desc: "텍스쳐 비포·애프터" },
    { file: "texture-ba-11.webp", title: "Mayo makeup", desc: "텍스쳐 비포·애프터" },
  ],

  worksD: [  // 뽀잉눈
    { file: "boing-02.mp4", title: "", desc: "" },
    { file: "boing-03.mp4", title: "", desc: "" },
    { file: "boing-04.mp4", title: "", desc: "" },
    { file: "boing-05.mp4", title: "", desc: "" },
    { file: "boing-06.mp4", title: "", desc: "" },
  ],

  /* ━━━━━━━━━━ 비포·애프터 ━━━━━━━━━━
     카테고리마다 사례를 넣어요. 사례 하나 = 작업 전(before) 사진 + 작업 후(after) 사진 + 설명.
     before / after: media/before-after/ 폴더의 파일 이름 (편집기에서 사진을 넣으면 자동으로 올라가요)
     title: 제목   desc: 설명   period: 작업 기간 (예: 7일)   platform: 사용 플랫폼 (예: VRChat · 치지직)
     사례를 하나라도 넣으면 임시 칸은 사라지고, 사례가 없는 카테고리는 숨겨져요.
     baRatio: 사진 비율 (예: "4 / 3", "1 / 1", "16 / 10")
  */
  baRatio: "1 / 1",  // 사진 비율

  baA: [  // 성형 비포·애프터
    { before: "ba-seonghyeong-01-before.webp", after: "ba-seonghyeong-10-after.webp", title: "개인용 Milltina", desc: "개인용 밀티나", period: "4일~5일", platform: "VRchat" },
    { before: "ba-seonghyeong-03-before.webp", after: "ba-seonghyeong-04-after.webp", title: "개인용 Mayo", desc: "개인용 마요", period: "7일", platform: "VRchat" },
    { before: "ba-seonghyeong-06-before.webp", after: "ba-seonghyeong-07-after.webp", title: "커미션용 Mayo", desc: "일러스트 기반 성형", period: "6일", platform: "VRchat" },
    { before: "ba-seonghyeong-05-before.webp", after: "ba-seonghyeong-06-after.webp", title: "개인용 shinano", desc: "개인용 시나노", period: "5일", platform: "VRchat" },
  ],

  baB: [  // 페이셜 비포·애프터
  ],

  baC: [  // 텍스쳐 비포·애프터
  ],

  baD: [  // 뽀잉눈 비포·애프터
  ],
  baCountA: 4,  // 사례를 안 넣었을 때 성형 임시 칸 수
  baCountB: 3,  // 페이셜 임시 칸 수
  baCountC: 3,  // 텍스쳐 임시 칸 수
  baCountD: 3,  // 뽀잉눈 임시 칸 수

  /* ━━━━━━━━━━ 가격 계산기 · 이벤트 ━━━━━━━━━━
  */
  eventText: "리뷰 작성 시 사진 1개 추가 (약속)",  // 이벤트 안내 (비우면 이벤트 배너가 안 보여요)

  /* ━━━━━━━━━━ 가격 계산기 · 세트 상품 ━━━━━━━━━━
     items: 포함 작업을 + 로 나눠 적어요. 개별 작업 이름이 들어 있으면 그 작업이 "세트 포함"으로 잠겨요.
     note: 추가 안내 (// 를 넣으면 줄이 바뀌어요, 비우면 안 보여요)
     bestSet: 추천 표시할 세트 번호 (0이면 없음)
  */
  bestSet: 1,  // 추천 세트 번호
  sets: [
    { name: "기본 성형 세트", items: "52가지 페이셜 + 성형 + 의상 1 + 헤어 1 + 텍스쳐 수정", price: 380000, note: "원하시는 인상이나 머리색, 눈색 등등 말해주셔야 합니다!\n에셋들은 들고와주셔야 합니다\n에셋은 양측구매가 원칙입니다.", desc: "" },
    { name: "원화 기반 성형 세트", items: "52가지 페이셜 + 원화 기반 성형 + 의상 1 + 헤어 1 + 텍스쳐 수정", price: 430000, note: "원화 기반으로 성형하는 세트입니다\n에셋들은 들고와주셔야 합니다\n에셋은 양측구매가 원칙입니다.", desc: "" },
    { name: "목소리 기반 성형 세트", items: "52가지 페이셜 + 목소리 기반 성형 + 의상 1 + 헤어 1 + 텍스쳐 수정", price: 430000, note: "목소리에 맞춰 어울리게 만드는 세트입니다\n에셋들은 들고와주셔야 합니다\n에셋은 양측구매가 원칙입니다.", desc: "" },
    { name: "오마카세 성형 세트", items: "52가지 페이셜 + 오마카세 성형 + 의상 1 + 헤어 1 + 텍스쳐 수정", price: 430000, note: "작가가 마음대로 만드는 세트입니다\n에셋들은 작가가 보유한걸로 마음대로 꾸밉니다. 에셋은 양측구매가 원칙입니다.", desc: "" },
  ],

  /* ━━━━━━━━━━ 가격 계산기 · 개별 작업 ━━━━━━━━━━
     group: 분류 (같은 분류끼리 한 상자로 묶여요. 같은 분류는 붙여서 적어 주세요)
     name: 이름   desc: 이름 아래 작은 설명 (비우면 안 보여요)   price: 가격 (원, 0이면 "가격 문의")
  */
  items: [
    { group: "초보", name: "파츠 같이 찾기", desc: "어떤 의상·헤어·악세서리를 쓸지 모를 때 함께 골라드려요", price: 20000 },
    { group: "성형", name: "성형", desc: "유니티, 블렌더", price: 100000 },
    { group: "성형", name: "원화 기반 성형", desc: "", price: 150000 },
    { group: "페이셜", name: "페이셜", desc: "기본 페이셜 · 52가지 ARKit", price: 250000 },
    { group: "페이셜", name: "텍스쳐 수정", desc: "", price: 15000 },
    { group: "VRM", name: "VRM 제작", desc: "베이스바디, 페이셜 쉐이프키만", price: 50000 },
    { group: "추가", name: "악세서리 추가", desc: "귀, 꼬리, 네일 등", price: 10000 },
    { group: "추가", name: "의상 추가", desc: "", price: 20000 },
    { group: "추가", name: "머리 추가", desc: "", price: 20000 },
    { group: "추가", name: "뽀잉눈", desc: "", price: 30000 },
    { group: "추가", name: "뽀잉귀", desc: "", price: 30000 },
    { group: "텍스쳐", name: "오리지널 텍스쳐 (메이크업)", desc: "자체 제작", price: 30000 },
    { group: "텍스쳐", name: "오리지널 텍스쳐 (눈)", desc: "자체 제작", price: 50000 },
    { group: "텍스쳐", name: "오리지널 텍스쳐 (눈+메이크업)", desc: "자체 제작", price: 80000 },
    { group: "기타", name: "포트폴리오 비공개", desc: "", price: 50000 },
    { group: "기타", name: "방송 셀카 촬영", desc: "장당 가격", price: 10000 },
    { group: "기타", name: "유니티 패키지", desc: "", price: 40000 },
    { group: "기타", name: "바디, 몸 교체", desc: "", price: 20000 },
  ],

  /* ━━━━━━━━━━ 가격 계산기 · 추가 옵션 ━━━━━━━━━━
  */
  dl3Name: "3일 마감",  // 마감 옵션 1 이름
  dl3Pct: 50,  // 마감 옵션 1 추가 비율 (%)
  dl1Name: "당일 마감",  // 마감 옵션 2 이름
  dl1Pct: 100,  // 마감 옵션 2 추가 비율 (%)
  revisionFree: 2,  // 무료 수정 횟수 (0이면 안내 안 보여요)
  revisionPrice: 10000,  // 수정 1회 추가 가격 (원)

  /* ━━━━━━━━━━ 분양 아바타 ━━━━━━━━━━
     saleReady: false 면 "준비 중" 안내만 보여요. 아래 목록을 채운 뒤 true 로 바꿔요.
     price 는 "35,000원" 처럼 글자로 적어요. sold: true 면 "분양완료" 로 바뀌어요.
  */
  saleReady: false,  // true = 카드 보이기 / false = 준비 중
  saleSoonTitle: "분양 아바타는 준비 중이에요",  // 준비 중 제목
  saleSoonText: "새 분양 아바타를 준비하고 있어요. 조금만 기다려 주세요!",  // 준비 중 설명
  saleIntro: "[분양 아바타 소개를 한 줄로 적어주세요]",  // 분양 아바타 제목 아래 한 줄 (비우면 안 보여요)
  sales: [
    { name: "", desc: "", price: "", link: "", sold: false },
    { name: "", desc: "", price: "", link: "", sold: false },
    { name: "", desc: "", price: "", link: "", sold: false },
    { name: "", desc: "", price: "", link: "", sold: false },
  ],

  /* ━━━━━━━━━━ 보유 아바타 ━━━━━━━━━━
     link 에 아바타 판매 페이지 주소를 넣으면 버튼이 생기고, 대표 사진을 자동으로 가져와요.
     image: 대표 사진 (자동으로 가져온 주소 또는 media/avatars/ 에 올린 파일 이름)
  */
  avatarsIntro: "작가가 가지고 있는 보유 아바타입니다 / 없는 아바타는 기프트로 선물해주실 경우 할인해드립니다",  // 보유 아바타 제목 아래 한 줄 (비우면 안 보여요)
  avatars: [
    { link: "https://booth.pm/ko/items/6538026", image: "https://booth.pximg.net/01965a9e-bce5-4027-bc0e-0b8e7df43c6e/i/6538026/182b133f-1c86-4ae8-8536-5e00f63b86cf_base_resized.jpg", name: "Milltina / 밀티나 ", desc: "" },
    { link: "https://booth.pm/ko/items/8122803", image: "https://booth.pximg.net/817e9a9a-020c-4fac-8b21-96f80d6e25cb/i/8122803/d9c776e9-d7e4-4f7c-a091-c777beecf3bb_base_resized.jpg", name: "Mayo / 마요", desc: "" },
    { link: "https://booth.pm/ko/items/6106863", image: "https://booth.pximg.net/ed52788c-0b3b-4e38-9ded-1e5797daf0ef/i/6106863/07bd77df-a8ee-4244-8c4e-16cf7cb584bb_base_resized.jpg", name: "Shinano / 시나노", desc: "" },
    { link: "https://booth.pm/ko/items/6082686", image: "https://booth.pximg.net/f420c992-4225-4ce0-b751-3a4acdceaab6/i/6082686/81021dbd-ca83-4c3b-8868-230e780b63a3_base_resized.jpg", name: "Airi / 아이리", desc: "" },
    { link: "https://booth.pm/ko/items/5058077", image: "https://booth.pximg.net/8a7426aa-ba62-4ef0-9e7d-2c8ea96e7c9b/i/5058077/a18424fe-a56e-411a-9c47-27c56909593c_base_resized.jpg", name: "Manuka / 마누카", desc: "" },
    { link: "https://booth.pm/ko/items/5650156", image: "https://booth.pximg.net/817e9a9a-020c-4fac-8b21-96f80d6e25cb/i/5650156/b620a7e2-feae-4c1c-a9da-0364bec82400_base_resized.jpg", name: "Sio / 시오", desc: "" },
    { link: "https://booth.pm/ko/items/4667400", image: "https://booth.pximg.net/f420c992-4225-4ce0-b751-3a4acdceaab6/i/4667400/1641b18e-eb97-4cbe-85fd-0f04cd53b46a_base_resized.jpg", name: "Moe / 모에", desc: "" },
    { link: "https://booth.pm/ko/items/8562330", image: "https://booth.pximg.net/96d1d589-6879-4d30-8891-a2c6b8d64186/i/8562330/4b163f36-c55d-4468-8c60-476c86d0f26b_base_resized.jpg", name: "Kaguya / 카구야", desc: "" },
    { link: "https://booth.pm/ko/items/5260363", image: "https://booth.pximg.net/a724e93d-5634-41cf-ac1f-8f8985536a5a/i/5260363/051a65d4-583a-439b-add8-5170e4fcd25f_base_resized.jpg", name: "Komano / 코마노", desc: "" },
    { link: "https://booth.pm/ko/items/5957830", image: "https://booth.pximg.net/96d1d589-6879-4d30-8891-a2c6b8d64186/i/5957830/a4e0ae5b-7797-448b-80b1-e852c861e080_base_resized.jpg", name: "rurune / 루루네", desc: "" },
    { link: "https://booth.pm/ko/items/6571299", image: "https://booth.pximg.net/1ae5d9f5-29a4-4574-ab86-a316c22db92a/i/6571299/7bda05bb-f9d5-45a8-811a-b95ac555beb8_base_resized.jpg", name: "Milfy / 밀피", desc: "" },
    { link: "https://booth.pm/ko/items/7328764", image: "https://booth.pximg.net/7d1d1238-0c5a-4d1b-a4d4-fcbc42bebca8/i/7328764/68d88751-994d-4dd3-8e54-5be5bcb51fdf_base_resized.jpg", name: "Eku / 이쿠", desc: "" },
    { link: "https://booth.pm/ko/items/3681787", image: "https://booth.pximg.net/ed52788c-0b3b-4e38-9ded-1e5797daf0ef/i/3681787/2409bb9f-24f3-42dd-8ad6-89a0656f2166_base_resized.jpg", name: "kikyo / 키쿄", desc: "" },
    { link: "https://booth.pm/ko/items/4035411", image: "https://booth.pximg.net/8a7426aa-ba62-4ef0-9e7d-2c8ea96e7c9b/i/4035411/6f839883-1ab0-48fa-bfca-10c73ab7a33d_base_resized.jpg", name: "Selestia / 셀레스티아", desc: "" },
    { link: "https://booth.pm/ko/items/7502898", image: "https://booth.pximg.net/87b70515-e32e-4a2e-bf41-317cf2c2177c/i/7502898/a2c93b99-de64-49f4-a76b-30ff769a5021_base_resized.jpg", name: "Lumina / 루미나", desc: "" },
  ],

  /* ━━━━━━━━━━ 진행 과정 ━━━━━━━━━━
     chip 은 단계 아래 작은 회색 칩이에요. 마지막 단계는 진한 색으로 표시돼요.
  */
  processSteps: [
    { title: "문의 보내기", desc: "양식을 복사해서 붙여넣어 보내주세요.", chip: "복사 → 붙여넣기" },
    { title: "상담 · 견적", desc: "레퍼런스를 보고 범위와 금액을 정해요.", chip: "레퍼런스 공유" },
    { title: "입금 · 일정", desc: "입금 확인 후 마감일을 알려드려요.", chip: "입금 후 확정" },
    { title: "작업 진행", desc: "정해진 일정에 맞춰 작업해요.", chip: "7~14일 소요" },
    { title: "시안 확인", desc: "중간 결과를 보고 수정을 요청해요.", chip: "수정 요청 가능" },
    { title: "최종 전달", desc: "완성 파일과 적용 방법을 보내드려요.", chip: "파일 + 적용법" },
  ],
  processFacts: [  // 진행 과정 아래 분홍 칸들
    { label: "작업 기한", value: "7~14일" },
    { label: "기본 수정 횟수", value: "2회" },
    { label: "결제 방식", value: "선금 100%" },
  ],

  /* ━━━━━━━━━━ 주의사항 ━━━━━━━━━━
     title: 굵은 첫 줄. **글자** 처럼 별표 두 개로 감싸면 강조돼요. 끝에 (괄호) 를 쓰면 회색으로 보여요.
     tag: 적으면 빨간 칸으로 강조돼요 (예: "필독"). 비우면 일반 칸이에요.
     items: 아래 작은 점 목록이에요.
  */
  notices: [
    {
      tag: "필독",
      title: " 꼭!! 이용규약 확인 후 에셋 가져와주세요!",
      items: [
        "유의사항을 숙지하지 않아 생기는 문제는 작가가 책임지지 않습니다.",
      ],
    },
    {
      tag: "",
      title: "작업 후 보관 기간은 **한 달**입니다.",
      items: [
        "장기 보관이 필요한 경우 미리 문의해주세요.",
      ],
    },
    {
      tag: "",
      title: "모든 작업은 결제 확인 후 시작됩니다.",
      items: [
        "의뢰인 본인만 사용 가능합니다.",
        "무단 복제, 배포, 재판매, 상업적 사용을 금지합니다.",
        "타인의 모델, 유료 에셋 무단 공유 등 작가와 무관한 저작권 문제로 인한 상황은 작가가 책임지지 않습니다.",
      ],
    },
    {
      tag: "",
      title: "작업한 결과물은 포트폴리오로 사용될 수 있습니다. (원하시지 않는 분은 미리 문의해주세요)",
      items: [
        "헤어 및 의상 추가는 파라미터 상황에 따라 추가 요청이 거절될 수 있습니다.",
        "지나치게 모호한 요청(“대충 예쁘게 해주세요”)은 작업 진행이 어렵습니다.",
      ],
    },
  ],
  impossible: [  // 불가능 작업 (끝에 (괄호) 를 쓰면 회색으로 보여요)
    "아바타 100% 풀 모델링 (제로베이스 제작)",
    "저작권 침해 가능성이 있는 캐릭터 도용 요청 (특정 게임 캐릭터)",
    "R18 관련 작업",
  ],
  deadlineText: "7일 ~ 14일",  // 작업 기한 (큰 글자)
  deadlineNote: "작업량 및 상황에 따라 일정이 변동될 수 있으며, 변동 시 미리 안내드립니다.",  // 작업 기한 아래 설명

  /* ━━━━━━━━━━ 자주 묻는 질문 ━━━━━━━━━━
     q: 질문, a: 답변. 줄을 복사하면 질문이 늘어나요.
  */
  faqs: [
    { q: "작업 기간은 얼마나 걸리나요?", a: "7일~14일입니다!\n작업 범위와 난이도에 따라 달라지며, 기본적으로 상담 후 예상 작업 기간을 안내해 드립니다." },
    { q: "어떤 플랫폼의 아바타를 작업하나요?", a: "VRChat 및 VSF 기반의 아바타 작업을 진행하고 있습니다. 작업 가능 여부는 사용하시는 아바타와 요청 사항에 따라 달라질 수 있습니다." },
    { q: "견적은 어떻게 하나요?", a: "원하시는 작업 내용과 범위를 확인한 뒤 개별 견적을 안내해 드립니다. 작업 전 충분한 상담을 통해 진행 방향을 결정합니다." },
    { q: "수정은 몇 번까지 되나요?", a: "기본 수정 범위 내(2회) 에서 진행되며, 최초 요청과 다른 방향의 변경이나 추가 작업은 별도 비용이 발생할 수 있습니다." },
    { q: "기존 아바타도 업그레이드할 수 있나요?", a: "가능합니다. 기존 아바타의 외형 개선부터 텍스처, 쉐이프키 등 원하시는 방향에 맞춰 업그레이드 작업을 진행할 수 있습니다." },
    { q: "작업 완료 후 문제가 발생하면 어떻게 하나요?", a: "전달받으신 작업물에 작업 범위 내 오류가 발생한 경우 확인 후 안내해 드립니다. 단, 사용 환경이나 별도 수정으로 발생한 문제는 지원이 어려울 수 있습니다." },
  ],
};
