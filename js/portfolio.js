/*
 * portfolio.js — 화면의 동작(계산기, 슬라이드, 크게 보기, 문의 양식 복사 등)을 담당해요.
 * 가격·개수·이름 같은 값은 이 파일이 아니라 config.js 에서 고쳐요.
 */
class Component extends DCLogic {
  componentDidMount() {
    setTimeout(() => this.playCardVideos(), 0);
    try {
      if (typeof IntersectionObserver !== 'undefined') {
        const vis = {};
        this._qObs = new IntersectionObserver((entries) => {
          entries.forEach((en) => { vis[en.target.id || en.target.className] = en.isIntersecting; });
          const any = Object.keys(vis).some((k) => vis[k]);
          if (any !== !!(this.state && this.state.quoteInView)) this.setState({ quoteInView: any });
        }, { threshold: 0.12 });
        const qc = document.querySelector('.quote-col');
        const iq = document.getElementById('inquiry');
        if (qc) this._qObs.observe(qc);
        if (iq) this._qObs.observe(iq);
      }
    } catch (e) {}
    try {
      const el = document.getElementById('works-track');
      if (!el || typeof IntersectionObserver === 'undefined') return;
      this._wObs = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting || this._wNudged) return;
          if (el.querySelectorAll('.works-page').length < 2) return;
          this._wNudged = true;
          setTimeout(() => {
            el.classList.add('w-nudge');
            setTimeout(() => el.classList.remove('w-nudge'), 1500);
          }, 500);
          if (this._wObs) this._wObs.disconnect();
        });
      }, { threshold: 0.4 });
      this._wObs.observe(el);
    } catch (e) {}
  }
  /* 작업물 영상: 소리 없이 자동 반복 재생 */
  playCardVideos() {
    try {
      document.querySelectorAll('#works-track video').forEach((v) => {
        v.muted = true;
        v.defaultMuted = true;
        if (v.paused) { const p = v.play(); if (p && p.catch) p.catch(() => {}); }
      });
    } catch (e) {}
  }
  componentDidUpdate() { this.playCardVideos(); }
  componentWillUnmount() {
    if (this._wObs) this._wObs.disconnect();
    if (this._qObs) this._qObs.disconnect();
    if (this._dragCleanup) this._dragCleanup();
  }
  /* 부드럽게 미끄러지듯 이동 (easeOutCubic) */
  glideTo(el, target, dur) {
    if (!el) return;
    const max = Math.max(0, el.scrollWidth - el.clientWidth);
    const to = Math.max(0, Math.min(max, target));
    if (el._raf) cancelAnimationFrame(el._raf);
    const from = el.scrollLeft;
    const dist = to - from;
    if (Math.abs(dist) < 1) { el.scrollLeft = to; el.classList.remove('is-dragging'); return; }
    el.classList.add('is-dragging');
    const d = dur || Math.min(700, Math.max(320, Math.abs(dist) * 0.6));
    const t0 = performance.now();
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    const step = (now) => {
      const p = Math.min(1, (now - t0) / d);
      el.scrollLeft = from + dist * ease(p);
      if (p < 1) el._raf = requestAnimationFrame(step);
      else { el._raf = null; el.classList.remove('is-dragging'); }
    };
    el._raf = requestAnimationFrame(step);
  }
  openLb(kind, i) {
    this.setState({ lb: { kind, i } });
    setTimeout(() => { try { const el = document.getElementById('lightbox'); if (el) el.focus(); } catch (e) {} }, 40);
  }
  snapUnit(el) {
    const first = el.querySelector(el.id === 'works-track' ? '.works-page' : 'article');
    return (first ? first.getBoundingClientRect().width : el.clientWidth) + 24;
  }
  startDrag(e) {
    if (e.button !== 0) return;
    const el = e.currentTarget;
    e.preventDefault();
    if (el._raf) { cancelAnimationFrame(el._raf); el._raf = null; }
    el.classList.add('is-dragging');
    const now0 = performance.now();
    const d = { x: e.clientX, left: el.scrollLeft, moved: false, target: el.scrollLeft, raf: null, samples: [{ t: now0, x: e.clientX }] };
    const move = (ev) => {
      const dx = ev.clientX - d.x;
      if (!d.moved && Math.abs(dx) > 4) d.moved = true;
      if (!d.moved) return;
      ev.preventDefault();
      d.target = d.left - dx;
      const now = performance.now();
      d.samples.push({ t: now, x: ev.clientX });
      while (d.samples.length > 2 && now - d.samples[0].t > 90) d.samples.shift();
      if (!d.raf) d.raf = requestAnimationFrame(() => { d.raf = null; el.scrollLeft = d.target; });
    };
    const up = () => {
      cleanup();
      if (d.raf) { cancelAnimationFrame(d.raf); d.raf = null; el.scrollLeft = d.target; }
      this._justDragged = d.moved;
      setTimeout(() => { this._justDragged = false; }, 0);
      if (!d.moved) { el.classList.remove('is-dragging'); return; }
      const a = d.samples[0], b = d.samples[d.samples.length - 1];
      const v = b.t > a.t ? (b.x - a.x) / (b.t - a.t) : 0;
      const unit = this.snapUnit(el);
      if (el.id === 'works-track') {
        const n = el.querySelectorAll('.works-page').length;
        const start = Math.round(d.left / unit);
        const moved = el.scrollLeft - d.left;
        let page = start;
        if (moved > unit * 0.15 || v < -0.35) page = start + 1;
        else if (moved < -unit * 0.15 || v > 0.35) page = start - 1;
        page = Math.max(0, Math.min(n - 1, page));
        this.glideTo(el, page * unit);
      } else {
        const projected = el.scrollLeft - v * 280;
        this.glideTo(el, Math.round(projected / unit) * unit);
      }
    };
    const cleanup = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
      this._dragCleanup = null;
    };
    if (this._dragCleanup) this._dragCleanup();
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    this._dragCleanup = cleanup;
  }
  renderVals() {
    const accent = this.props.accent ?? '#A4495B';
    const st = this.state || {};
    const set = (o) => this.setState(o);
    const won = (n) => Math.round(n).toLocaleString('ko-KR') + '원';
    const num = (v, d) => { const n = Number(v); return isFinite(n) && v !== null && v !== '' && v !== undefined ? n : d; };

    /* ---------- hero ---------- */
    const heroTiles = [
      { col: '1', row: '1 / span 2', tone: '#E6E0E1', rot: '-1.5', label: 'BEFORE', labelBg: 'rgba(43,35,39,0.78)', labelColor: '#FFFFFF', isImage: true, isVideo: false },
      { col: '2', row: '1', tone: '#F3DDE2', rot: '1.2', label: 'AFTER', labelBg: accent, labelColor: '#FFFFFF', isImage: true, isVideo: false },
      { col: '2', row: '2', tone: '#F2E5E1', rot: '-1', label: 'MP4', labelBg: '#FFFFFF', labelColor: '#2B2327', isImage: false, isVideo: true }
    ];

    /* ---------- strengths ---------- */
    const baseStrengths = [
      { title: '빠른 마감', desc: '약속한 날짜 안에 빠르게 완성해서 보내드려요.', tag: '' },
      { title: '예쁜 성형', desc: '원래 아바타의 느낌은 살리면서 더 예쁜 얼굴로 다듬어요.', tag: '' },
      { title: '중간 시안 공유', desc: '작업 중간에 결과를 보여드리고 의견을 반영해요.', tag: '' },
      { title: '방송 화면 맞춤', desc: '방송 화면에서 잘 보이도록 표정과 디테일을 챙겨요.', tag: '' }
    ];
    const stIcons = ['iZap', 'iSpark', 'iChat', 'iScreen', 'iHeart', 'iShield'];
    const strN = Math.min(500, Math.max(1, Math.round(num(this.props.strengthCount, 4))));
    const strengths = [];
    for (let i = 0; i < strN; i++) {
      const k = 'str' + (i + 1);
      const b = baseStrengths[i] || { title: '', desc: '', tag: '' };
      const title = String(this.props[k + 'Title'] ?? b.title).trim() || '[장점 ' + (i + 1) + ']';
      const desc = String(this.props[k + 'Desc'] ?? b.desc).trim() || '[장점 설명을 한 줄로 적어주세요]';
      const tag = String(this.props[k + 'Tag'] ?? b.tag).trim();
      const ic = stIcons[i % stIcons.length];
      strengths.push({
        no: (i + 1 < 10 ? '0' : '') + (i + 1), title, desc, tag, hasTag: !!tag,
        iZap: ic === 'iZap', iSpark: ic === 'iSpark', iChat: ic === 'iChat',
        iScreen: ic === 'iScreen', iHeart: ic === 'iHeart', iShield: ic === 'iShield'
      });
    }
    const heroStrengths = strengths.slice(0, Math.min(3, strengths.length)).map((g) => ({ title: g.title }));

    /* ---------- before / after ---------- */
    const ba = num(st.ba, 50);
    const baMode = st.baMode || 'slider';
    const baModes = [['slider', '슬라이더'], ['side', '나란히']].map(([k, label]) => ({
      label,
      pressed: baMode === k ? 'true' : 'false',
      bg: baMode === k ? '#FFFFFF' : 'transparent',
      shadow: baMode === k ? '0 2px 6px rgba(80,40,55,0.18)' : 'none',
      pick: () => set({ baMode: k })
    }));
    const caseDefs = [
      { id: 'a', label: '성형', n: num(this.props.baCountA, 4), ex: '부드러운 인상으로 성형' },
      { id: 'c', label: '텍스쳐', n: num(this.props.baCountC, 3), ex: '피부·헤어 텍스쳐 리페인트' },
      { id: 'd', label: '뽀잉눈', n: num(this.props.baCountD, 3), ex: '반짝이는 뽀잉눈 적용' },
      { id: 'b', label: '페이셜', n: num(this.props.baCountB, 3), ex: '표정 블렌드쉐이프 보강' }
    ].map((c) => ({ ...c, n: Math.min(500, Math.max(1, Math.round(c.n))) }));
    const baCase = st.baCase || 'a';
    const baCat = caseDefs.find((c) => c.id === baCase) || caseDefs[0];
    const baPosAll = st.baPos || {};
    const baPos = Math.min(baCat.n - 1, num(baPosAll[baCat.id], 0));
    const goCase = (i) => set({ baPos: { ...baPosAll, [baCat.id]: (i + baCat.n) % baCat.n }, ba: 50 });
    const beforeTones = ['#E6E0E1', '#E2E0E6', '#E6E3DE', '#E0E3E2'];
    const afterTones = ['#F3DDE2', '#EEDDEB', '#F4E2D9', '#F1DAE4'];
    const baCases = caseDefs.map((c) => {
      const on = c.id === baCat.id;
      return {
        label: c.label,
        count: String(c.n),
        selected: on ? 'true' : 'false',
        bg: on ? '#2B2327' : '#FFFFFF',
        color: on ? '#FFFFFF' : '#2B2327',
        border: on ? '#2B2327' : '#EFE4E5',
        pick: () => set({ baCase: c.id, ba: 50 })
      };
    });
    const baDots = [];
    for (let i = 0; i < baCat.n; i++) {
      const on = i === baPos;
      baDots.push({
        aria: baCat.label + ' ' + (i + 1) + '번째 사례',
        current: on ? 'true' : 'false',
        w: on ? 28 : 8,
        bg: on ? accent : '#D9C8CC',
        pick: () => goCase(i)
      });
    }

    /* ---------- works ---------- */
    const filter = st.filter || 'all';
    const resetWorks = () => {
      const el = typeof document !== 'undefined' ? document.getElementById('works-track') : null;
      if (el) el.scrollTo({ left: 0, behavior: 'auto' });
    };
    const chips = [['all', '전체'], ['image', '이미지'], ['video', '영상']].map(([k, label]) => ({
      label,
      pressed: filter === k ? 'true' : 'false',
      bg: filter === k ? '#2B2327' : '#FFFFFF',
      color: filter === k ? '#FFFFFF' : '#2B2327',
      border: filter === k ? '#2B2327' : '#EFE4E5',
      pick: () => { resetWorks(); set({ filter: k, wPage: 0 }); }
    }));
    const catDefs = [
      { id: 'a', label: '성형', base: 'image', n: num(this.props.countA, 16), icon: 'iFace' },
      { id: 'b', label: '페이셜', base: 'video', n: num(this.props.countB, 12), icon: 'iSmile' },
      { id: 'c', label: '텍스쳐', base: 'image', n: num(this.props.countC, 12), icon: 'iBrush' },
      { id: 'd', label: '뽀잉눈', base: 'video', n: num(this.props.countD, 12), icon: 'iEye' }
    ].map((c) => ({ ...c, n: Math.min(500, Math.max(1, Math.round(c.n))) }));
    const tab = st.tab || 'a';
    const nFor = (c) => (mediaLists[c.id] && mediaLists[c.id].length ? mediaLists[c.id].length : c.n);
    const tones = ['#EED9DD', '#F2E5E1', '#E8DADF', '#F0E3E5', '#E9D5D9', '#EDE2DF'];
    const pad = (n) => (n < 10 ? '0' : '') + n;
    /* 영상 카드 번호: Tweaks 'worksVideoA' 등. 쉼표로 구분, 1-5처럼 범위도 가능. 나머지는 이미지 */
    const videoDefaults = { a: '3, 6, 9, 12, 15', b: '1, 2, 4, 5, 7, 8, 10, 11', c: '3, 6, 9, 12', d: '1, 2, 4, 5, 7, 8, 10, 11' };
    const parseNums = (str) => {
      const set2 = {};
      String(str || '').split(/[,\s]+/).forEach((tk) => {
        const m = tk.match(/^(\d+)(?:-(\d+))?$/);
        if (!m) return;
        const a = Number(m[1]), b = m[2] ? Number(m[2]) : a;
        for (let n = Math.min(a, b); n <= Math.max(a, b) && n <= 500; n++) set2[n] = true;
      });
      return set2;
    };
    const videoSets = {};
    ['a', 'b', 'c', 'd'].forEach((id) => { videoSets[id] = parseNums(videoDefaults[id]); });
    /* 작업물 파일: Tweaks 'worksMediaA' 등에 파일 주소를 넣으면 넣은 순서대로 카드가 되고,
       영상 파일(.mp4 .webm .mov .m4v 또는 주소 끝 #video)은 영상 카드, 나머지는 이미지 카드로 자동 인식 */
    const isVideoUrl = (u) => /\.(mp4|webm|mov|m4v)(\?|#|$)/i.test(u) || /#video$/i.test(u);
    const mediaLists = {};
    ['a', 'b', 'c', 'd'].forEach((id) => {
      mediaLists[id] = String(this.props['worksMedia' + id.toUpperCase()] ?? '').split(/[\s,]+/).map((u) => u.trim()).filter((u) => u.length > 0);
    });
    const typeFor = (c, i) => {
      const ml = mediaLists[c.id];
      if (ml && ml.length) return isVideoUrl(ml[i] || '') ? 'video' : 'image';
      return videoSets[c.id] && videoSets[c.id][i + 1] ? 'video' : 'image';
    };
    const cats = catDefs.map((c) => {
      const on = c.id === tab;
      return {
        label: c.label,
        count: String(nFor(c)),
        selected: on ? 'true' : 'false',
        bg: on ? accent : '#FFFFFF',
        border: on ? accent : '#EFE4E5',
        color: on ? '#FFFFFF' : '#2B2327',
        subColor: on ? '#FBE3E8' : '#6E6266',
        iconBg: on ? 'rgba(255,255,255,0.18)' : '#F5E8EA',
        iconColor: on ? '#FFFFFF' : accent,
        shadow: on ? '0 16px 28px -14px rgba(164,73,91,0.7)' : '0 1px 2px rgba(80,40,55,0.06),0 10px 20px -16px rgba(80,40,55,0.35)',
        iFace: c.icon === 'iFace', iSmile: c.icon === 'iSmile', iBrush: c.icon === 'iBrush', iEye: c.icon === 'iEye',
        pick: () => { resetWorks(); set({ tab: c.id, wPage: 0 }); }
      };
    });
    const cur = catDefs.find((c) => c.id === tab) || catDefs[0];
    const cards = [];
    /* 카테고리 판매 링크: 'worksLinkA' 등 (+ 'worksLinkLabelA', 'worksLinkTextA') */
    const linkRaw = String(this.props['worksLink' + cur.id.toUpperCase()] ?? '').trim();
    const worksLink = linkRaw ? (/^https?:\/\//i.test(linkRaw) ? linkRaw : 'https://' + linkRaw) : '';
    const worksLinkLabel = String(this.props['worksLinkLabel' + cur.id.toUpperCase()] ?? '').trim() || 'BOOTH에서 보기';
    const worksLinkText = String(this.props['worksLinkText' + cur.id.toUpperCase()] ?? '').trim() || (cur.label + ' 작업물은 BOOTH에서 판매하고 있어요');
    const curMedia = mediaLists[cur.id] || [];
    /* 카드 제목·설명: 'worksTitlesA' / 'worksDescsA' 등 (배열, 또는 | 로 구분한 글자) */
    const textList = (v) => (Array.isArray(v) ? v.map((x) => String(x == null ? '' : x)) : String(v == null ? '' : v).split('|').map((x) => x.trim()));
    const curTitles = textList(this.props['worksTitles' + cur.id.toUpperCase()]).filter((x, i, arr) => arr.length > 1 || x);
    const curDescs = textList(this.props['worksDescs' + cur.id.toUpperCase()]);
    for (let i = 0; i < nFor(cur); i++) {
      const type = typeFor(cur, i);
      if (filter !== 'all' && filter !== type) continue;
      const sold = cur.status && i === 1;
      const src = curMedia[i] ? curMedia[i].replace(/#video$/i, '') : '';
      cards.push({
        tone: tones[i % tones.length],
        label: type === 'image' ? 'IMAGE' : 'MP4',
        isImage: type === 'image', isGif: false, isVideo: type === 'video',
        src, thumb: src ? src + '#t=0.5' : '', showPlay: type === 'video' && !src, hasImg: !!src && type === 'image', hasVid: !!src && type === 'video', phImage: !src && type === 'image',
        title: curTitles[i] ? curTitles[i] : '[' + (cur.avatar ? '아바타 이름' : '작업물 제목') + ' ' + pad(i + 1) + ']',
        meta: curDescs[i] != null && curDescs[i] !== '' ? curDescs[i] : (curTitles.length ? '' : (cur.avatar ? '[짧은 설명]' : '[한 줄 설명]')),
        hasStatus: !!cur.status,
        statusLabel: sold ? '분양완료' : '분양중',
        statusBg: sold ? 'rgba(43,35,39,0.82)' : accent
      });
    }

    cards.forEach((c, idx) => { c.open = () => this.openLb('works', idx); c.aria = c.title + ' 크게 보기'; });
    const PER = 6;
    const pages = [];
    for (let i = 0; i < cards.length; i += PER) pages.push({ cards: cards.slice(i, i + PER) });
    const wN = Math.max(1, pages.length);
    const wPage = Math.min(wN - 1, num(st.wPage, 0));
    const wTrack = () => (typeof document !== 'undefined' ? document.getElementById('works-track') : null);
    const wStep = (el) => { const pg = el.querySelector('.works-page'); return (pg ? pg.getBoundingClientRect().width : el.clientWidth) + 24; };
    const wTo = (i) => {
      const el = wTrack();
      if (!el) return;
      const t = Math.max(0, Math.min(wN - 1, i));
      this.glideTo(el, t * wStep(el));
    };
    const wGo = (dir) => {
      const el = wTrack();
      if (!el) return;
      const cur = Math.round(el.scrollLeft / wStep(el));
      wTo((cur + dir + wN) % wN);
    };
    const wScroll = (e) => {
      const el = e.currentTarget;
      const p = Math.round(el.scrollLeft / wStep(el));
      if (p !== (this.state && this.state.wPage)) this.setState({ wPage: p });
    };
    const wDots = [];
    for (let i = 0; i < wN; i++) {
      const on = i === wPage;
      wDots.push({ aria: (i + 1) + '페이지로 이동', current: on ? 'true' : 'false', w: on ? 28 : 8, bg: on ? accent : '#D9C8CC', pick: () => wTo(i) });
    }

    /* ---------- my avatars ---------- */
    const avN = Math.min(500, Math.max(1, Math.round(num(this.props.avatarCount, 4))));
    const avTones = ['#F3DDE2', '#EEDDEB', '#F4E2D9', '#E8DADF'];
    const txt = (v) => (v == null ? '' : String(v).trim());
    const toUrl = (v) => { const s = txt(v); if (!s) return ''; return /^https?:\/\//i.test(s) ? s : 'https://' + s; };
    const avatars = [];
    for (let i = 0; i < avN; i++) {
      const k = 'av' + (i + 1);
      const link = toUrl(this.props[k + 'Link']);
      avatars.push({
        no: 'No.' + pad(i + 1),
        tone: avTones[i % avTones.length],
        name: txt(this.props[k + 'Name']) || '[아바타 이름 ' + pad(i + 1) + ']',
        desc: txt(this.props[k + 'Desc']) || '[아바타 소개를 한두 줄로 적어주세요]',
        link, hasLink: !!link, noLink: !link
      });
    }

    /* ---------- sale avatars ---------- */
    const saleN = Math.min(500, Math.max(1, Math.round(num(this.props.countF, 4))));
    const saleTones = ['#EEDDEB', '#F3DDE2', '#E8DADF', '#F4E2D9'];
    const sales = [];
    for (let i = 0; i < saleN; i++) {
      const k = 'sale' + (i + 1);
      const sold = !!this.props[k + 'Sold'];
      const link = toUrl(this.props[k + 'Link']);
      const price = txt(this.props[k + 'Price']);
      sales.push({
        no: 'No.' + pad(i + 1),
        tone: saleTones[i % saleTones.length],
        name: txt(this.props[k + 'Name']) || '[분양 아바타 이름 ' + pad(i + 1) + ']',
        desc: txt(this.props[k + 'Desc']) || '[짧은 소개를 적어주세요]',
        price: price || '[분양가]',
        priceColor: sold ? '#6E6266' : accent,
        priceDeco: sold ? 'line-through' : 'none',
        statusLabel: sold ? '분양완료' : '분양중',
        statusBg: sold ? 'rgba(43,35,39,0.82)' : accent,
        sold, link, hasLink: !!link && !sold, noLink: !link && !sold
      });
    }
    sales.forEach((a, idx) => { a.open = () => this.openLb('sales', idx); a.aria = a.name + ' 크게 보기'; });
    const saleStep = (dir) => {
      const el = typeof document !== 'undefined' ? document.getElementById('sale-track') : null;
      if (!el) return;
      const w = this.snapUnit(el);
      this.glideTo(el, (Math.round(el.scrollLeft / w) + dir) * w);
    };

    avatars.forEach((a, idx) => { a.open = () => this.openLb('avatars', idx); a.aria = a.name + ' 크게 보기'; });
    const avTrack = () => (typeof document !== 'undefined' ? document.getElementById('avatar-track') : null);
    const avStep = (dir) => {
      const el = avTrack();
      if (!el) return;
      const w = this.snapUnit(el);
      this.glideTo(el, (Math.round(el.scrollLeft / w) + dir) * w);
    };
    const avDown = (e) => this.startDrag(e);
    const avClickCapture = (e) => {
      if (this._justDragged) { e.preventDefault(); e.stopPropagation(); this._justDragged = false; }
    };

    /* ---------- price calculator ---------- */
    const dlDefs = [
      { k: 'd3', name: String(this.props.dl3Name ?? '3일 마감').trim() || '3일 마감', pct: Math.max(0, num(this.props.dl3Pct, 50)) },
      { k: 'd1', name: String(this.props.dl1Name ?? '당일 마감').trim() || '당일 마감', pct: Math.max(0, num(this.props.dl1Pct, 100)) }
    ];
    const revPrice = num(this.props.revisionPrice, 10000);
    const baseItems = [
      { id: 'a', pk: 'priceA', name: '성형', desc: '얼굴형 · 이목구비 쉐이프 수정', price: 80000 },
      { id: 'b', pk: 'priceB', name: '페이셜', desc: '표정 블렌드쉐이프 · 립싱크', price: 120000 },
      { id: 'c', pk: 'priceC', name: '텍스쳐', desc: '피부 · 헤어 · 의상 리페인트', price: 60000 },
      { id: 'd', pk: 'priceD', name: '뽀잉눈', desc: '반짝이는 눈 하이라이트 효과', price: 40000 }
    ];
    const itemN = Math.min(500, Math.max(1, Math.round(num(this.props.itemCount, 4))));
    const itemDefs = [];
    const P = {};
    for (let i = 0; i < itemN; i++) {
      const b = baseItems[i] || { id: 'i' + (i + 1), pk: 'item' + (i + 1) + 'Price', name: '', desc: '', price: 0 };
      const nm = String(this.props['item' + (i + 1) + 'Name'] ?? '').trim();
      const ds = String(this.props['item' + (i + 1) + 'Desc'] ?? '').trim();
      P[b.id] = Math.max(0, num(this.props[b.pk], b.price));
      itemDefs.push({
        id: b.id,
        name: nm || b.name || '[항목 이름 ' + pad(i + 1) + ']',
        desc: ds || b.desc || '[항목 설명을 한 줄로 적어주세요]'
      });
    }
    const priceOf = (id) => P[id] || 0;
    const priceText = (n) => (n > 0 ? won(n) : '가격 문의');

    /* sets */
    const baseSets = [
      { name: '기본 성형 세트', desc: '', items: '52가지 페이셜 + 성형 + 의상 1 + 헤어 1 + 텍스쳐 수정', price: 380000 },
      { name: '원화 기반 성형 세트', desc: '', items: '52가지 페이셜 + 원화 기반 성형 + 의상 1 + 헤어 1 + 텍스쳐 수정', price: 430000 },
      { name: '목소리 기반 성형 세트', desc: '', items: '52가지 페이셜 + 목소리 기반 성형 + 의상 1 + 헤어 1 + 텍스쳐 수정', price: 430000 },
      { name: '오마카세 성형 세트', desc: '', items: '52가지 페이셜 + 오마카세 성형 + 의상 1 + 헤어 1 + 텍스쳐 수정', price: 430000 }
    ];
    /* 포함 작업: "+" 또는 쉼표로 구분. 숫자는 계산기 항목 번호, 글자는 그대로 표시하고
       계산기 항목 이름이 들어 있으면 그 항목을 세트 포함으로 잠가요. */
    const parseInc = (str) => {
      const chips = [];
      const linked = [];
      String(str || '').split(/[,+]+/).forEach((tk) => {
        const t = tk.trim();
        if (!t) return;
        let hit = null;
        if (/^\d+$/.test(t)) hit = itemDefs[Number(t) - 1] || null;
        else hit = itemDefs.find((it) => it.name === t) || itemDefs.find((it) => it.name && t.indexOf(it.name) >= 0) || null;
        chips.push(/^\d+$/.test(t) && hit ? hit.name : t);
        if (hit && linked.indexOf(hit) < 0) linked.push(hit);
      });
      return { chips, linked };
    };
    const setN = Math.min(500, Math.max(0, Math.round(num(this.props.setCount, 4))));
    const bestSet = Math.round(num(this.props.bestSet, 0));
    const setDefs = [];
    for (let i = 0; i < setN; i++) {
      const k = 'set' + (i + 1);
      const b = baseSets[i] || { name: '', desc: '', items: '', price: 0 };
      const nm = String(this.props[k + 'Name'] ?? b.name).trim();
      const ds = String(this.props[k + 'Desc'] ?? b.desc).trim();
      const parsed = parseInc(this.props[k + 'Items'] ?? b.items);
      const inc = parsed.linked;
      const chips = parsed.chips;
      const price = Math.max(0, num(this.props[k + 'Price'], b.price));
      const note = String(this.props[k + 'Note'] ?? (i < 4 ? '[추가 안내 글을 적어주세요]' : '')).replace(/\s*\/\/\s*/g, '\n').trim();
      const orig = inc.reduce((s2, it) => s2 + priceOf(it.id), 0);
      const save = price > 0 ? Math.max(0, orig - price) : 0;
      setDefs.push({
        i, inc, chips, price, orig, save, note,
        name: nm || '[세트 이름 ' + pad(i + 1) + ']',
        desc: ds
      });
    }
    const selSetIdx = (st.set != null && st.set < setN) ? st.set : null;
    const chosenSet = selSetIdx != null ? setDefs[selSetIdx] : null;
    const inSet = {};
    if (chosenSet) chosenSet.inc.forEach((it) => { inSet[it.id] = true; });
    const sets = setDefs.map((s2) => {
      const on = selSetIdx === s2.i;
      return {
        name: s2.name, desc: s2.desc, hasDesc: !!s2.desc, note: s2.note, hasNote: !!s2.note,
        inc: s2.chips.length ? s2.chips.map((t) => ({ name: t })) : [{ name: '[포함 작업]' }],
        best: bestSet === s2.i + 1,
        hasSave: s2.save > 0,
        origLabel: won(s2.orig),
        pctLabel: (s2.orig > 0 ? Math.round(s2.save / s2.orig * 100) : 0) + '% 할인',
        priceLabel: priceText(s2.price),
        pressed: on ? 'true' : 'false',
        border: on ? accent : '#FFFFFF',
        ring: on ? accent : '#D9C8CC',
        dot: on ? accent : 'transparent',
        shadow: on ? '0 18px 32px -16px rgba(164,73,91,0.6)' : '0 1px 2px rgba(80,40,55,0.06),0 12px 24px -16px rgba(80,40,55,0.35)',
        toggle: () => set({ set: on ? null : s2.i })
      };
    });

    /* items */
    const sel = st.sel || {};
    const items = itemDefs.map((it) => {
      const locked = !!inSet[it.id];
      const on = locked || !!sel[it.id];
      return {
        name: it.name, desc: it.desc, on, locked, free: !locked,
        priceLabel: locked ? '세트 포함' : priceText(priceOf(it.id)) + (priceOf(it.id) > 0 ? '~' : ''),
        priceColor: locked ? '#6E6266' : accent,
        priceDeco: 'none',
        pressed: on ? 'true' : 'false',
        bg: locked ? '#FBF6F7' : '#FFFFFF',
        borderStyle: locked ? 'dashed' : 'solid',
        border: locked ? '#D9C8CC' : (on ? accent : '#FFFFFF'),
        cursor: locked ? 'default' : 'pointer',
        shadow: locked ? 'none' : (on ? '0 14px 28px -14px rgba(164,73,91,0.55)' : '0 1px 2px rgba(80,40,55,0.06),0 10px 20px -14px rgba(80,40,55,0.3)'),
        boxBorder: on ? accent : '#D9C8CC',
        boxBg: on ? accent : '#FFFFFF',
        toggle: () => { if (!locked) set({ sel: { ...sel, [it.id]: !sel[it.id] } }); }
      };
    });

    const ITEM_PREVIEW = 8;
    const itemsAll = !!st.itemsAll;
    const itemsShown = (itemsAll || items.length <= ITEM_PREVIEW) ? items : items.filter((it, idx) => idx < ITEM_PREVIEW || it.on);

    /* options */
    const dlKey = st.deadline || null;
    const dl = dlDefs.find((o) => o.k === dlKey) || null;
    const rev = num(st.rev, 0);
    const opts = dlDefs.map((o) => {
      const on = dlKey === o.k;
      return {
        name: o.name, desc: '마감 옵션 · 작업비 +' + o.pct + '%',
        pressed: on ? 'true' : 'false',
        border: on ? accent : '#FFFFFF',
        track: on ? accent : '#D9C8CC',
        justify: on ? 'flex-end' : 'flex-start',
        toggle: () => set({ deadline: on ? null : o.k })
      };
    });

    /* totals */
    const extras = itemDefs.filter((it) => sel[it.id] && !inSet[it.id]);
    const extrasSum = extras.reduce((s2, it) => s2 + priceOf(it.id), 0);
    const base = (chosenSet ? chosenSet.price : 0) + extrasSum;
    const saveN = chosenSet ? chosenSet.save : 0;
    const listN = base + saveN;
    const dlAmt = dl ? base * dl.pct / 100 : 0;
    const revAmt = rev * revPrice;
    const optAmt = dlAmt + revAmt;
    const totalN = base + optAmt;
    const optLines = [];
    if (rev > 0) optLines.push({ name: '수정 추가 ' + rev + '회', amount: '+' + won(revAmt) });
    if (dl) optLines.push({ name: dl.name + ' (+' + dl.pct + '%)', amount: '+' + won(dlAmt), deadline: true });
    const extraLines = extras.map((it) => ({ name: it.name, amount: priceText(priceOf(it.id)) }));
    const hasLines = !!chosenSet || extras.length > 0;
    const setLine = chosenSet ? {
      name: chosenSet.name,
      price: priceText(chosenSet.price),
      inc: '포함 · ' + (chosenSet.chips.length ? chosenSet.chips.join(' · ') : '-'),
      orig: won(chosenSet.orig),
      hasSave: chosenSet.save > 0
    } : { name: '', price: '', inc: '', orig: '', hasSave: false };
    const chosenNames = (chosenSet ? [chosenSet.name] : []).concat(extras.map((it) => it.name));
    const quoteLines = [];
    if (chosenSet) quoteLines.push({ tag: '세트', tagBg: accent, tagColor: '#FFFFFF', name: chosenSet.name, sub: chosenSet.chips.join(' · '), hasSub: chosenSet.chips.length > 0, amount: priceText(chosenSet.price) });
    extras.forEach((it) => quoteLines.push({ tag: '작업', tagBg: '#F5E8EA', tagColor: '#7A3446', name: it.name, sub: '', hasSub: false, amount: priceText(priceOf(it.id)) }));
    optLines.forEach((o) => quoteLines.push(o.deadline
      ? { tag: '마감', tagBg: '#2B2327', tagColor: '#FFFFFF', name: o.name, sub: '작업비 전체에 붙는 금액이에요', hasSub: true, amount: o.amount }
      : { tag: '옵션', tagBg: '#EFE4E5', tagColor: '#4A3E44', name: o.name, sub: '', hasSub: false, amount: o.amount }));
    const barSummary = chosenNames.length ? chosenNames[0] + (chosenNames.length > 1 ? ' 외 ' + (chosenNames.length - 1) + '개' : '') + (dl ? ' · ' + dl.name : '') : '';
    const dt = new Date();
    const today = dt.getFullYear() + '.' + pad(dt.getMonth() + 1) + '.' + pad(dt.getDate());

    /* ---------- process ---------- */
    const steps = [
      ['문의 보내기', '양식을 복사해서 붙여넣어 보내주세요.', '복사 → 붙여넣기', 'iChat'],
      ['상담 · 견적', '레퍼런스를 보고 범위와 금액을 정해요.', '레퍼런스 공유', 'iQuote'],
      ['입금 · 일정', '입금 확인 후 마감일을 알려드려요.', '입금 후 확정', 'iPay'],
      ['작업 진행', '정해진 일정에 맞춰 작업해요.', '7~14일 소요', 'iWork'],
      ['시안 확인', '중간 결과를 보고 수정을 요청해요.', '수정 요청 가능', 'iCheck'],
      ['최종 전달', '완성 파일과 적용 방법을 보내드려요.', '파일 + 적용법', 'iDone']
    ].map(([title, desc, chip, icon], i, arr) => {
      const last = i === arr.length - 1;
      return {
        no: pad(i + 1), title, desc, chip,
        notLast: !last,
        circleBg: last ? accent : '#FFFFFF',
        circleColor: last ? '#FFFFFF' : accent,
        chipAlign: 'auto',
        iChat: icon === 'iChat', iQuote: icon === 'iQuote', iPay: icon === 'iPay',
        iWork: icon === 'iWork', iCheck: icon === 'iCheck', iDone: icon === 'iDone'
      };
    });

    /* ---------- inquiry form ---------- */
    const f = st.form || {};
    const setF = (k) => (e) => set({ form: { ...(this.state && this.state.form || {}), [k]: e.target.value } });
    const platform = f.platform || '';
    const platforms = ['치지직', 'SOOP', '유튜브', '기타'].map((label) => {
      const on = platform === label;
      return {
        label,
        pressed: on ? 'true' : 'false',
        bg: on ? '#2B2327' : '#FFFFFF',
        color: on ? '#FFFFFF' : '#2B2327',
        border: on ? '#2B2327' : '#E2CFD3',
        pick: () => set({ form: { ...f, platform: on ? '' : label } })
      };
    });
    const optList = [];
    if (rev > 0) optList.push('수정 ' + rev + '회 추가');
    if (dl) optList.push(dl.name);
    const quoteSummary = hasLines ? chosenNames.join(' + ') + ' · ' + won(totalN) : '아직 선택 안 함';
    const blank = (v) => (v && String(v).trim() ? String(v).trim() : '');
    const inquiryText = [
      '[방송용 아바타 작업 문의]',
      '',
      '■ 닉네임 / 방송명 : ' + blank(f.nick),
      '■ 방송 플랫폼 : ' + platform,
      '■ 연락받을 곳 : ' + blank(f.contact),
      '■ 세트 상품 : ' + (chosenSet ? chosenSet.name + (chosenSet.chips.length ? ' (' + chosenSet.chips.join(' + ') + ')' : '') : '없음'),
      '■ 개별 작업 : ' + (extras.length ? extras.map((it) => it.name).join(', ') : '없음'),
      '■ 추가 옵션 : ' + (optList.length ? optList.join(', ') : '없음'),
      '■ 예상 견적 : ' + (hasLines ? won(totalN) + ' (포트폴리오 계산기 기준)' : ''),
      '■ 레퍼런스 : ' + blank(f.ref),
      '■ 요청사항 : ' + blank(f.memo),
      '',
      '주의사항 확인 : ' + (st.agree ? 'O' : 'X')
    ].join('\n');

    const finish = (mode) => {
      this.setState({ copied: mode });
      clearTimeout(this._copyT);
      this._copyT = setTimeout(() => this.setState({ copied: null }), mode === 'ok' ? 2200 : 4000);
    };
    const fallback = () => {
      try {
        const el = document.getElementById('inquiry-text');
        const r = document.createRange();
        r.selectNodeContents(el);
        const s = window.getSelection();
        s.removeAllRanges();
        s.addRange(r);
        const ok = document.execCommand && document.execCommand('copy');
        finish(ok ? 'ok' : 'manual');
      } catch (e) { finish('manual'); }
    };
    const copy = () => {
      if (!st.agree) return;
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(inquiryText).then(() => finish('ok'), fallback);
        } else { fallback(); }
      } catch (e) { fallback(); }
    };
    const copied = st.copied;

    /* ---------- notice + faq ---------- */
    const notices = ['[주의사항을 한 줄씩 적어주세요]', '[예: 작업 시작 후에는 환불이 어려워요]', '[예: 원본 파일 재배포는 금지예요]', '[예: 진행 기간은 순서에 따라 달라질 수 있어요]']
      .map((text, i) => ({ n: i + 1, text }));
    const faqOpen = st.faq == null ? 0 : st.faq;
    const faqs = [
      ['작업 기간은 얼마나 걸리나요?', '[작업 기간 안내를 적어주세요]'],
      ['어떤 플랫폼의 아바타를 작업하나요?', '[작업 가능한 플랫폼과 파일 형식을 적어주세요]'],
      ['결제는 어떻게 하나요?', '[결제 방법과 선금 비율을 적어주세요]'],
      ['수정은 몇 번까지 되나요?', '[기본 수정 횟수와 추가 비용을 적어주세요]']
    ].map(([q, a], i) => ({
      q, a,
      open: faqOpen === i,
      expanded: faqOpen === i ? 'true' : 'false',
      rot: faqOpen === i ? '180' : '0',
      toggle: () => set({ faq: faqOpen === i ? -1 : i })
    }));

    const baCounter0 = pad(baPos + 1) + ' / ' + pad(baCat.n);
    /* ---------- lightbox ---------- */
    const lb = st.lb || null;
    let lbList = [];
    if (lb && lb.kind === 'works') lbList = cards.map((c) => ({ tone: c.tone, label: c.label, isImage: c.isImage, isGif: c.isGif, isVideo: c.isVideo, isAvatar: false, title: c.title, meta: c.meta, ratio: '4 / 5', src: c.src }));
    if (lb && lb.kind === 'sales') lbList = sales.map((a) => ({ tone: a.tone, label: a.statusLabel, isImage: false, isGif: false, isVideo: false, isAvatar: true, title: a.name, meta: a.desc + ' · ' + a.price, ratio: '3 / 4' }));
    if (lb && lb.kind === 'avatars') lbList = avatars.map((a) => ({ tone: a.tone, label: a.no, isImage: false, isGif: false, isVideo: false, isAvatar: true, title: a.name, meta: a.desc, ratio: '3 / 4' }));
    const lbIsBa = !!lb && lb.kind === 'ba';
    const lbN = lbList.length;
    const lbI = lbN && lb ? ((lb.i % lbN) + lbN) % lbN : 0;
    const lbCur = lbList[lbI] || {};
    const lbClose = () => set({ lb: null });
    const lbGo = (dir) => {
      if (lbIsBa) { goCase(baPos + dir); return; }
      if (lbN > 1) set({ lb: { kind: lb.kind, i: (lbI + dir + lbN) % lbN } });
    };
    const lbKey = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); lbClose(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); lbGo(-1); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); lbGo(1); }
    };

    return {
      accent, heroTiles,
      lbOpen: !!lb && (lbIsBa || lbN > 0), lbIsBa, lbIsSingle: !lbIsBa,
      lbTone: lbCur.tone || '#EED9DD', lbRatio: lbCur.src ? (lbCur.isVideo ? '16 / 9' : '1 / 1') : (lbCur.ratio || '4 / 5'), lbLabel: lbCur.label || '', lbShowLabel: !!lbCur.label,
      lbIsVideo: !!lbCur.isVideo && !lbCur.src, lbIsGif: !!lbCur.isGif, lbIsImage: !!lbCur.isImage && !lbCur.src, lbIsAvatar: !!lbCur.isAvatar,
      lbSrc: lbCur.src || '', lbHasImg: !!lbCur.src && !!lbCur.isImage, lbHasVid: !!lbCur.src && !!lbCur.isVideo,
      lbTitle: lbIsBa ? baCat.label + ' 사례 ' + (baPos + 1) : (lbCur.title || ''),
      lbMeta: lbIsBa ? '[' + baCat.label + ' 사례 ' + (baPos + 1) + ' 제목: 예) ' + baCat.ex + ']' : (lbCur.meta || ''),
      lbCounter: lbIsBa ? baCounter0 : (lbN ? pad(lbI + 1) + ' / ' + pad(lbN) : ''),
      lbHasNav: lbIsBa ? baCat.n > 1 : lbN > 1,
      lbPrev: () => lbGo(-1), lbNext: () => lbGo(1), lbClose, lbKey,
      lbBackdrop: (e) => { if (e.target === e.currentTarget) lbClose(); },
      lbBefore: beforeTones[baPos % beforeTones.length], lbAfter: afterTones[baPos % afterTones.length],
      baZoom: () => this.openLb('ba', 0),
      ba, onBa: (e) => set({ ba: Number(e.target.value) }),
      baModes, isSlider: baMode === 'slider', isSide: baMode === 'side',
      baCases, baDots, baCaseNo: pad(baPos + 1), baLabel: baCat.label,
      baTitle: '[' + baCat.label + ' 사례 ' + (baPos + 1) + ' 제목: 예) ' + baCat.ex + ']',
      baCounter: baCounter0,
      baBefore: beforeTones[baPos % beforeTones.length], baAfter: afterTones[baPos % afterTones.length],
      baPrev: () => goCase(baPos - 1), baNext: () => goCase(baPos + 1),
      baToPrice: () => {
        const hit = itemDefs.find((it) => it.name === baCat.label) || itemDefs.find((it) => it.id === baCat.id);
        if (hit) set({ sel: { ...sel, [hit.id]: true } });
      },
      chips, cats, cards, hasCards: cards.length > 0, noCards: cards.length === 0, avatars,
      hasWorksLink: !!worksLink, worksLink, worksLinkLabel, worksLinkText,
      pages, wMulti: wN > 1, wDots, wPageW: wN > 1 ? 'calc(100% - 88px)' : '100%',
      wShowPrev: wN > 1 && wPage > 0, wShowNext: wN > 1 && wPage < wN - 1, wPrev: () => wGo(-1), wNext: () => wGo(1), wScroll,
      wPageLabel: '총 ' + cards.length + '개 · ' + (wPage + 1) + ' / ' + wN + ' 페이지',
      sales, salePrev: () => saleStep(-1), saleNext: () => saleStep(1),
      avPrev: () => avStep(-1), avNext: () => avStep(1), avDown, avClickCapture,
      items, opts, rev, revDesc: '1회당 +' + won(revPrice),
      revMinus: () => set({ rev: Math.max(0, rev - 1) }),
      revPlus: () => set({ rev: Math.min(10, rev + 1) }),
      itemsShown, itemTotal: items.length, itemsMore: items.length > ITEM_PREVIEW,
      itemsExpanded: itemsAll ? 'true' : 'false', itemsMoreRot: itemsAll ? '180' : '0',
      itemsMoreLabel: itemsAll ? '접기' : '작업 ' + (items.length - itemsShown.length) + '개 더 보기',
      toggleItemsAll: () => set({ itemsAll: !itemsAll }),
      sets, hasSets: setN > 0, stepItems: setN > 0 ? '2' : '1', stepOpts: setN > 0 ? '3' : '2',
      itemsHint: chosenSet ? '세트에 없는 작업만 더할 수 있어요' : '여러 개 선택 가능',
      hasLines, noLines: !hasLines, total: won(totalN), today,
      quoteLines, hasBreakdown: saveN > 0 || optLines.length > 0, barSummary,
      showBar: hasLines && !st.quoteInView && !st.barHidden,
      showMiniBar: hasLines && !st.quoteInView && !!st.barHidden,
      hideBar: () => set({ barHidden: true }), showBarAgain: () => set({ barHidden: false }),
      hasSetLine: !!chosenSet, setLine, hasExtra: extras.length > 0, extraLines,
      hasOpt: optLines.length > 0, optLines, optLabel: '+' + won(optAmt),
      listLabel: won(listN), hasSave: saveN > 0, saveLabel: '-' + won(saveN), saveShort: won(saveN),
      resetCalc: () => set({ sel: {}, set: null, deadline: null, rev: 0 }),
      steps,
      fNick: f.nick || '', fContact: f.contact || '', fRef: f.ref || '', fMemo: f.memo || '',
      onNick: setF('nick'), onContact: setF('contact'), onRef: setF('ref'), onMemo: setF('memo'),
      fAgree: !!st.agree, onAgree: (e) => set({ agree: !!e.target.checked }),
      noSubmit: (e) => { if (e && e.preventDefault) e.preventDefault(); },
      platforms, quoteSummary, inquiryText, copy,
      copyDone: !!st.agree && copied === 'ok', copyIdle: !!st.agree && copied !== 'ok', copyLocked: !st.agree,
      copyLabel: !st.agree ? '주의사항 확인 후 복사할 수 있어요' : (copied === 'ok' ? '복사 완료! 붙여넣기만 하면 돼요' : (copied === 'manual' ? '양식이 선택됐어요 · Ctrl+C로 복사해 주세요' : '문의 양식 복사하기')),
      copyBg: !st.agree ? '#4A3E45' : (copied === 'ok' ? '#2E7D5B' : accent),
      copyColor: !st.agree ? '#BFB1B6' : '#FFFFFF',
      copyShadow: !st.agree ? 'none' : '0 12px 24px -10px rgba(0,0,0,0.6)',
      copyCursor: !st.agree ? 'not-allowed' : 'pointer',
      copyHint: !st.agree ? '양식의 「주의사항을 모두 확인했어요」에 체크하면 버튼이 켜져요' : '복사한 양식을 문의 채널에 붙여넣어 보내주세요',
      copyHintColor: !st.agree ? '#E7B9C3' : '#BFB1B6',
      agreeBorder: st.agree ? '#2E7D5B' : accent,
      agreeBg: st.agree ? '#EEF7F2' : '#FBF2F4',
      agreeTag: st.agree ? '확인 완료' : '필수',
      agreeTagColor: st.agree ? '#1F6146' : accent,
      notices, faqs
    };
  }
}
window.PortfolioComponent = Component;
