/*
 * config.js — 포트폴리오에서 자주 바꾸는 값을 모아둔 파일이에요.
 * GitHub에서 이 파일을 열고 연필(✏️) 버튼을 눌러 고친 뒤 "Commit changes"를 누르면 돼요.
 *
 * 적는 규칙
 *   - 글자는 따옴표 안에:  "기본 성형 세트"
 *   - 숫자는 따옴표 없이:  380000
 *   - 켜기/끄기는 true / false
 *   - 줄 끝의 쉼표(,)는 지우지 마세요.
 *   - // 뒤는 설명이라 화면에 안 나와요.
 */
window.PORTFOLIO_CONFIG = {

  /* ──────── 기본 ────────
     포인트 색: "#A4495B" 같은 색 코드
  */
  accent: "#A4495B",  // 포인트 색

  /* ──────── 분양 아바타 준비 중 ────────
     분양 아바타를 채운 뒤 saleReady 를 true 로 바꾸면 카드가 다시 보여요.
  */
  saleReady: false,  // false면 "준비 중" 안내만 보여요
  saleSoonTitle: "분양 아바타는 준비 중이에요",  // 준비 중 제목
  saleSoonText: "새 분양 아바타를 준비하고 있어요. 조금만 기다려 주세요!",  // 준비 중 설명

  /* ──────── 장점 (01 · WHY ME) ────────
     개수를 늘렸다면 str5Title, str5Desc, str5Tag 처럼 번호를 이어서 적어요.
     Tag는 카드 아래 검은 칩이에요. 비워두면 안 보여요.
  */
  strengthCount: 4,  // 장점 개수
  str1Title: "빠른 마감",  // 장점 1 제목
  str1Desc: "약속한 날짜 안에 빠르게 완성해서 보내드려요.",  // 장점 1 설명
  str1Tag: "",  // 장점 1 태그 (예: "평균 3일 완성")
  str2Title: "예쁜 성형",  // 장점 2 제목
  str2Desc: "원래 아바타의 느낌은 살리면서 더 예쁜 얼굴로 다듬어요.",  // 장점 2 설명
  str2Tag: "",  // 장점 2 태그 (예: "평균 3일 완성")
  str3Title: "중간 시안 공유",  // 장점 3 제목
  str3Desc: "작업 중간에 결과를 보여드리고 의견을 반영해요.",  // 장점 3 설명
  str3Tag: "",  // 장점 3 태그 (예: "평균 3일 완성")
  str4Title: "방송 화면 맞춤",  // 장점 4 제목
  str4Desc: "방송 화면에서 잘 보이도록 표정과 디테일을 챙겨요.",  // 장점 4 설명
  str4Tag: "",  // 장점 4 태그 (예: "평균 3일 완성")

  /* ──────── 비포·애프터 (02) ────────
     카테고리별 사례 개수예요.
  */
  baCountA: 4,  // 성형 사례 수
  baCountB: 3,  // 페이셜 사례 수
  baCountC: 3,  // 텍스쳐 사례 수
  baCountD: 3,  // 뽀잉눈 사례 수

  /* ──────── 작업물 (03) ────────
     파일을 넣지 않은 카테고리는 아래 개수만큼 임시 그림이 나와요.
     실제 작업물은 media 폴더에 파일을 올리고 worksMedia 에 주소를 적어요. 넣은 순서대로 카드가 되고,
     .mp4 .webm .mov 파일은 영상 카드, 그 밖의 사진은 이미지 카드로 자동 인식돼요. 이때 개수는 파일 수로 자동 계산돼요.
     예) worksMediaA: ["media/seonghyeong/01.jpg", "media/seonghyeong/02.mp4"],
     카드 제목·설명은 worksTitlesA / worksDescsA 에 파일과 같은 순서로 적어요. (없으면 기본 문구)
     판매 링크 버튼은 worksLinkA (버튼 글자 worksLinkLabelA, 안내 문구 worksLinkTextA) 로 카테고리마다 달 수 있어요.
  */
  countA: 16,  // 성형 임시 카드 수 (파일을 넣으면 무시돼요)
  countB: 12,  // 페이셜 임시 카드 수 (파일을 넣으면 무시돼요)
  countC: 12,  // 텍스쳐 임시 카드 수 (파일을 넣으면 무시돼요)
  countD: 12,  // 뽀잉눈 임시 카드 수 (파일을 넣으면 무시돼요)
  worksMediaA: [  // 성형 파일 목록
    "media/seonghyeong/seonghyeong-01.webp",
    "media/seonghyeong/seonghyeong-02.webp",
    "media/seonghyeong/seonghyeong-03.webp",
    "media/seonghyeong/seonghyeong-04.webp",
    "media/seonghyeong/seonghyeong-05.webp",
    "media/seonghyeong/seonghyeong-06.webp",
    "media/seonghyeong/seonghyeong-07.webp",
    "media/seonghyeong/seonghyeong-08.webp",
    "media/seonghyeong/seonghyeong-09.webp",
    "media/seonghyeong/seonghyeong-10.webp",
    "media/seonghyeong/seonghyeong-11.webp",
    "media/seonghyeong/seonghyeong-12.webp",
    "media/seonghyeong/seonghyeong-13.webp",
    "media/seonghyeong/seonghyeong-14.webp",
    "media/seonghyeong/seonghyeong-15.webp",
    "media/seonghyeong/seonghyeong-16.webp",
    "media/seonghyeong/seonghyeong-17.webp",
    "media/seonghyeong/seonghyeong-18.webp",
    "media/seonghyeong/seonghyeong-19.webp",
    "media/seonghyeong/seonghyeong-20.webp",
    "media/seonghyeong/seonghyeong-21.webp",
    "media/seonghyeong/seonghyeong-22.webp",
    "media/seonghyeong/seonghyeong-23.webp",
    "media/seonghyeong/seonghyeong-24.webp",
    "media/seonghyeong/seonghyeong-25.webp",
    "media/seonghyeong/seonghyeong-26.webp",
    "media/seonghyeong/seonghyeong-27.webp",
    "media/seonghyeong/seonghyeong-28.webp",
    "media/seonghyeong/seonghyeong-29.webp",
    "media/seonghyeong/seonghyeong-30.webp",
    "media/seonghyeong/seonghyeong-31.webp",
  ],
  worksTitlesA: [  // 성형 카드 제목
    "Milltina",
    "Mayo",
    "Salt",
    "Mayo",
    "Shinano",
    "Milltina",
    "Milltina",
    "Mayo",
    "Milltina",
    "Mayo",
    "Milltina",
    "Chocolat",
    "Airi",
    "Milltina",
    "Suzuya",
    "Mayo",
    "Mayo",
    "Rurune",
    "Kaguya",
    "Milfy",
    "Milltina",
    "Milltina",
    "Airi",
    "Milltina",
    "Chocolat",
    "Chocolat",
    "Shinano",
    "Chocolat",
    "Lumina",
    "Shinano",
    "Eku",
  ],
  worksDescsA: [  // 성형 카드 한 줄 설명
    "성형",
    "성형",
    "성형",
    "성형",
    "성형",
    "성형",
    "성형",
    "성형",
    "성형",
    "성형",
    "성형",
    "성형",
    "성형",
    "성형",
    "성형",
    "성형",
    "성형",
    "성형",
    "성형",
    "성형",
    "성형",
    "성형",
    "성형",
    "성형",
    "성형",
    "성형",
    "성형",
    "성형",
    "성형",
    "성형",
    "성형",
  ],
  worksMediaB: [  // 페이셜 파일 목록
    "media/facial/facial-01.mp4",
    "media/facial/facial-02.mp4",
    "media/facial/facial-03.mp4",
    "media/facial/facial-06.mp4",
  ],
  worksTitlesB: [  // 페이셜 카드 제목
    "Milltina",
    "Mayo",
    "Milltina",
    "Airi",
  ],
  worksDescsB: [  // 페이셜 카드 한 줄 설명
    "페이셜",
    "페이셜",
    "페이셜",
    "페이셜",
  ],
  worksLinkC: "https://muridayo.booth.pm/",  // 텍스쳐 판매 링크 (비우면 버튼이 안 보여요)
  worksLinkLabelC: "BOOTH에서 보기",  // 버튼 글자
  worksLinkTextC: "텍스쳐 작업물은 BOOTH에서 판매하고 있어요",  // 버튼 옆 안내 문구
  worksMediaC: [  // 텍스쳐 파일 목록
    "media/texture/texture-01.webp",
    "media/texture/texture-02.webp",
    "media/texture/texture-03.webp",
    "media/texture/texture-04.webp",
    "media/texture/texture-05.webp",
    "media/texture/texture-06.webp",
    "media/texture/texture-07.webp",
    "media/texture/texture-08.webp",
    "media/texture/texture-09.webp",
    "media/texture/texture-10.webp",
    "media/texture/texture-11.webp",
    "media/texture/texture-12.webp",
    "media/texture/texture-13.jpg",
    "media/texture/texture-14.webp",
    "media/texture/texture-15.webp",
  ],
  worksTitlesC: [  // 텍스쳐 카드 제목 (파일 순서와 같아요)
    "Milltina",
    "Milltina",
    "Airi",
    "Mayo",
    "Airi",
    "Milltina",
    "Airi",
    "Airi",
    "Chocolat",
    "Mong Eye",
    "Mayo",
    "Kumaly",
    "Shinano",
    "Shinano",
    "Shinano",
  ],
  worksDescsC: [  // 텍스쳐 카드 한 줄 설명
    "메이크업",
    "메이크업",
    "메이크업 + 블렌드쉐이프",
    "메이크업",
    "메이크업",
    "메이크업",
    "메이크업",
    "AIRI & CHOCOLAT · 메이크업 + 아이 텍스쳐 + 애니메이션",
    "",
    "아이 텍스쳐 · 아바타 10종",
    "메이크업 + 블렌드쉐이프",
    "HELTY · 블렌드쉐이프 + 아이 텍스쳐 + 메이크업",
    "메이크업 + 아이 텍스쳐 + 블렌드쉐이프",
    "ROLLY · 아이 텍스쳐 + 메이크업 + 블렌드쉐이프",
    "아이 텍스쳐 + 메이크업 + 애니메이션",
  ],
  worksMediaD: [  // 뽀잉눈 파일 목록
    "media/boing/boing-02.mp4",
    "media/boing/boing-03.mp4",
    "media/boing/boing-04.mp4",
    "media/boing/boing-05.mp4",
    "media/boing/boing-06.mp4",
  ],

  /* ──────── 분양 아바타 (04) ────────
     개수를 늘렸다면 sale5Name … 처럼 번호를 이어서 적어요.
     Sold 를 true 로 바꾸면 분양완료로 표시돼요.
  */
  countF: 4,  // 분양 아바타 개수
  sale1Name: "",  // 1번 이름
  sale1Desc: "",  // 1번 소개
  sale1Price: "",  // 1번 분양가 (예: "30,000원")
  sale1Link: "",  // 1번 분양 페이지 주소
  sale1Sold: false,  // 1번 분양완료 여부
  sale2Name: "",  // 2번 이름
  sale2Desc: "",  // 2번 소개
  sale2Price: "",  // 2번 분양가 (예: "30,000원")
  sale2Link: "",  // 2번 분양 페이지 주소
  sale2Sold: false,  // 2번 분양완료 여부
  sale3Name: "",  // 3번 이름
  sale3Desc: "",  // 3번 소개
  sale3Price: "",  // 3번 분양가 (예: "30,000원")
  sale3Link: "",  // 3번 분양 페이지 주소
  sale3Sold: false,  // 3번 분양완료 여부
  sale4Name: "",  // 4번 이름
  sale4Desc: "",  // 4번 소개
  sale4Price: "",  // 4번 분양가 (예: "30,000원")
  sale4Link: "",  // 4번 분양 페이지 주소
  sale4Sold: false,  // 4번 분양완료 여부

  /* ──────── 보유 아바타 (05) ────────
     개수를 늘렸다면 av5Name … 처럼 번호를 이어서 적어요.
  */
  avatarCount: 4,  // 보유 아바타 개수
  av1Name: "",  // 1번 이름
  av1Desc: "",  // 1번 소개
  av1Link: "",  // 1번 아바타 링크
  av2Name: "",  // 2번 이름
  av2Desc: "",  // 2번 소개
  av2Link: "",  // 2번 아바타 링크
  av3Name: "",  // 3번 이름
  av3Desc: "",  // 3번 소개
  av3Link: "",  // 3번 아바타 링크
  av4Name: "",  // 4번 이름
  av4Desc: "",  // 4번 소개
  av4Link: "",  // 4번 아바타 링크

  /* ──────── 가격 계산기 · 세트 상품 (06) ────────
     Items(포함 작업)는 + 로 나눠 적어요. 계산기 항목 이름이 들어 있으면 그 항목이 "세트 포함"으로 잠겨요.
     Note(추가 안내)에서 // 를 넣으면 줄이 바뀌어요.
     bestSet: 추천 표시할 세트 번호 (0이면 없음)
  */
  setCount: 4,  // 세트 개수 (0이면 세트 칸 숨김)
  bestSet: 0,  // 추천 세트 번호
  set1Name: "기본 성형 세트",  // 세트 1 이름
  set1Desc: "",  // 세트 1 한 줄 설명 (비우면 안 보여요)
  set1Items: "52가지 페이셜 + 성형 + 의상 1 + 헤어 1 + 텍스쳐 수정",  // 세트 1 포함 작업
  set1Price: 380000,  // 세트 1 가격 (원)
  set1Note: "[추가 안내 글을 적어주세요]",  // 세트 1 추가 안내
  set2Name: "원화 기반 성형 세트",  // 세트 2 이름
  set2Desc: "",  // 세트 2 한 줄 설명 (비우면 안 보여요)
  set2Items: "52가지 페이셜 + 원화 기반 성형 + 의상 1 + 헤어 1 + 텍스쳐 수정",  // 세트 2 포함 작업
  set2Price: 430000,  // 세트 2 가격 (원)
  set2Note: "[추가 안내 글을 적어주세요]",  // 세트 2 추가 안내
  set3Name: "목소리 기반 성형 세트",  // 세트 3 이름
  set3Desc: "",  // 세트 3 한 줄 설명 (비우면 안 보여요)
  set3Items: "52가지 페이셜 + 목소리 기반 성형 + 의상 1 + 헤어 1 + 텍스쳐 수정",  // 세트 3 포함 작업
  set3Price: 430000,  // 세트 3 가격 (원)
  set3Note: "[추가 안내 글을 적어주세요]",  // 세트 3 추가 안내
  set4Name: "오마카세 성형 세트",  // 세트 4 이름
  set4Desc: "",  // 세트 4 한 줄 설명 (비우면 안 보여요)
  set4Items: "52가지 페이셜 + 오마카세 성형 + 의상 1 + 헤어 1 + 텍스쳐 수정",  // 세트 4 포함 작업
  set4Price: 430000,  // 세트 4 가격 (원)
  set4Note: "[추가 안내 글을 적어주세요]",  // 세트 4 추가 안내

  /* ──────── 가격 계산기 · 개별 작업 ────────
     개수를 늘렸다면 item18Group, item18Name, item18Desc, item18Price … 처럼 이어서 적어요.
     Group(분류)이 같은 항목끼리 제목 아래 묶여서 보여요. 같은 분류는 붙여서 적어 주세요.
     1~4번 가격은 priceA~priceD 이름을 써요. 가격을 0으로 두면 "가격 문의"로 나와요.
  */
  itemCount: 17,  // 개별 작업 개수
  item1Group: "성형",  // 1번 분류
  item1Name: "성형",  // 1번 이름
  item1Desc: "유니티, 블렌더",  // 1번 설명 (비우면 안 보여요)
  priceA: 100000,  // 1번 가격 (원, 0이면 가격 문의)
  item2Group: "성형",  // 2번 분류
  item2Name: "원화 기반 성형",  // 2번 이름
  item2Desc: "",  // 2번 설명 (비우면 안 보여요)
  priceB: 150000,  // 2번 가격 (원, 0이면 가격 문의)
  item3Group: "페이셜",  // 3번 분류
  item3Name: "페이셜",  // 3번 이름
  item3Desc: "기본 페이셜 · 52가지 ARKit",  // 3번 설명 (비우면 안 보여요)
  priceC: 250000,  // 3번 가격 (원, 0이면 가격 문의)
  item4Group: "페이셜",  // 4번 분류
  item4Name: "텍스쳐 수정",  // 4번 이름
  item4Desc: "",  // 4번 설명 (비우면 안 보여요)
  priceD: 15000,  // 4번 가격 (원, 0이면 가격 문의)
  item5Group: "VRM",  // 5번 분류
  item5Name: "VRM 제작",  // 5번 이름
  item5Desc: "베이스바디, 페이셜 쉐이프키만",  // 5번 설명 (비우면 안 보여요)
  item5Price: 50000,  // 5번 가격 (원, 0이면 가격 문의)
  item6Group: "추가",  // 6번 분류
  item6Name: "악세서리 추가",  // 6번 이름
  item6Desc: "귀, 꼬리, 네일 등",  // 6번 설명 (비우면 안 보여요)
  item6Price: 10000,  // 6번 가격 (원, 0이면 가격 문의)
  item7Group: "추가",  // 7번 분류
  item7Name: "의상 추가",  // 7번 이름
  item7Desc: "",  // 7번 설명 (비우면 안 보여요)
  item7Price: 20000,  // 7번 가격 (원, 0이면 가격 문의)
  item8Group: "추가",  // 8번 분류
  item8Name: "머리 추가",  // 8번 이름
  item8Desc: "",  // 8번 설명 (비우면 안 보여요)
  item8Price: 20000,  // 8번 가격 (원, 0이면 가격 문의)
  item9Group: "추가",  // 9번 분류
  item9Name: "뽀잉눈",  // 9번 이름
  item9Desc: "",  // 9번 설명 (비우면 안 보여요)
  item9Price: 30000,  // 9번 가격 (원, 0이면 가격 문의)
  item10Group: "추가",  // 10번 분류
  item10Name: "뽀잉귀",  // 10번 이름
  item10Desc: "",  // 10번 설명 (비우면 안 보여요)
  item10Price: 0,  // 10번 가격 (원, 0이면 가격 문의)
  item11Group: "텍스쳐",  // 11번 분류
  item11Name: "오리지널 텍스쳐 (메이크업)",  // 11번 이름
  item11Desc: "자체 제작",  // 11번 설명 (비우면 안 보여요)
  item11Price: 30000,  // 11번 가격 (원, 0이면 가격 문의)
  item12Group: "텍스쳐",  // 12번 분류
  item12Name: "오리지널 텍스쳐 (눈)",  // 12번 이름
  item12Desc: "자체 제작",  // 12번 설명 (비우면 안 보여요)
  item12Price: 50000,  // 12번 가격 (원, 0이면 가격 문의)
  item13Group: "텍스쳐",  // 13번 분류
  item13Name: "오리지널 텍스쳐 (눈+메이크업)",  // 13번 이름
  item13Desc: "자체 제작",  // 13번 설명 (비우면 안 보여요)
  item13Price: 80000,  // 13번 가격 (원, 0이면 가격 문의)
  item14Group: "기타",  // 14번 분류
  item14Name: "포트폴리오 비공개",  // 14번 이름
  item14Desc: "",  // 14번 설명 (비우면 안 보여요)
  item14Price: 50000,  // 14번 가격 (원, 0이면 가격 문의)
  item15Group: "기타",  // 15번 분류
  item15Name: "방송 셀카 촬영",  // 15번 이름
  item15Desc: "장당 가격",  // 15번 설명 (비우면 안 보여요)
  item15Price: 10000,  // 15번 가격 (원, 0이면 가격 문의)
  item16Group: "기타",  // 16번 분류
  item16Name: "유니티 패키지",  // 16번 이름
  item16Desc: "",  // 16번 설명 (비우면 안 보여요)
  item16Price: 40000,  // 16번 가격 (원, 0이면 가격 문의)
  item17Group: "기타",  // 17번 분류
  item17Name: "바디, 몸 교체",  // 17번 이름
  item17Desc: "",  // 17번 설명 (비우면 안 보여요)
  item17Price: 20000,  // 17번 가격 (원, 0이면 가격 문의)

  /* ──────── 가격 계산기 · 추가 옵션 ────────
  */
  dl3Name: "3일 마감",  // 마감 옵션 1 이름
  dl3Pct: 50,  // 마감 옵션 1 추가 비율 (%)
  dl1Name: "당일 마감",  // 마감 옵션 2 이름
  dl1Pct: 100,  // 마감 옵션 2 추가 비율 (%)
  revisionFree: 2,  // 무료 수정 횟수 (0이면 안내 안 보여요)
  revisionPrice: 10000,  // 수정 1회 추가 가격 (원)
  eventText: "리뷰 작성 시 사진 1개 추가 (약속)",  // 이벤트 안내 (비우면 안 보여요)
};
