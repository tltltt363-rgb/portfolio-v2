/* 나루토 커서를 "그림"으로 직접 그려서 마우스를 따라다니게 해요.
   브라우저 커서는 숨기고(cursor:none) 이 그림만 보이기 때문에,
   어떤 동작(클릭, 글 선택, 메뉴 이동, 사진 크게 보기, 스크롤...)을 해도 기본 커서로 바뀌지 않아요.
   마우스가 없는 기기(휴대폰·태블릿)에서는 아무것도 하지 않아요. */
(function () {
  if (window.__pfCursor) return; window.__pfCursor = true;
  var fine = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!fine) return;
  var base = (document.currentScript && document.currentScript.src) || location.href;
  var src = new URL('media/cursor/default@2x.png?v=5', base).href;
  var W = 30, H = 32, HX = 0, HY = 0; /* 화면에 보이는 크기와 클릭 지점 */
  var root = document.documentElement;
  var el = null, x = -100, y = -100, shown = false;

  var make = function () {
    if (el || !document.body) return;
    el = document.createElement('div');
    el.id = 'pf-cursor';
    el.setAttribute('aria-hidden', 'true');
    el.style.cssText = 'position:fixed;left:0;top:0;width:' + W + 'px;height:' + H + 'px;' +
      'background:url("' + src + '") no-repeat 0 0/' + W + 'px ' + H + 'px;' +
      'pointer-events:none;z-index:2147483647;opacity:0;will-change:transform;contain:strict;' +
      'transform:translate3d(-100px,-100px,0)';
    document.body.appendChild(el);
  };
  var place = function () { if (el) el.style.transform = 'translate3d(' + (x - HX) + 'px,' + (y - HY) + 'px,0)'; };
  var show = function () { if (el && !shown) { shown = true; el.style.opacity = '1'; } };
  var hide = function () { if (el && shown) { shown = false; el.style.opacity = '0'; } };

  var move = function (e) {
    if (e.pointerType && e.pointerType !== 'mouse') { hide(); return; }
    if (e.target && e.target.tagName === 'IFRAME') { hide(); return; }
    make(); x = e.clientX; y = e.clientY; place(); show();
    if (!root.classList.contains('pf-jscur')) root.classList.add('pf-jscur');
  };
  var opt = { passive: true, capture: true };
  if ('onpointerrawupdate' in window) window.addEventListener('pointerrawupdate', move, opt);
  window.addEventListener('pointermove', move, opt);
  window.addEventListener('pointerdown', move, opt);
  window.addEventListener('pointerup', move, opt);
  window.addEventListener('mousemove', move, opt);
  window.addEventListener('dragover', function (e) { x = e.clientX; y = e.clientY; place(); }, opt);
  document.addEventListener('mouseout', function (e) {
    if (e.relatedTarget) return;
    var w = window.innerWidth, h = window.innerHeight;
    if (e.clientX <= 0 || e.clientY <= 0 || e.clientX >= w - 1 || e.clientY >= h - 1) hide();
  }, true);
  /* 마우스가 다른 iframe(편집기 미리보기, 아트머그 안의 포트폴리오, 문의 창) 위로 가면
     그쪽 커서가 대신 그려지니까 이쪽 그림은 숨겨요 (커서 두 개 방지) */
  document.addEventListener('mouseover', function (e) { if (e.target && e.target.tagName === 'IFRAME') hide(); }, true);
  window.addEventListener('blur', hide);
  document.addEventListener('visibilitychange', function () { if (document.hidden) hide(); });
  /* 아트머그처럼 다른 페이지 안(iframe)에 있을 때: 바깥 페이지가 스크롤되면
     마우스는 화면에서 그대로인데 안쪽 내용만 움직이니까, 그림도 같은 만큼 옮겨서 마우스 위치에 붙어 있게 해요 */
  if (window.parent !== window) {
    var lastRaw = null;
    window.addEventListener('message', function (e) {
      var d = e.data || {};
      if (d.type !== 'pf-viewport' || typeof d.raw !== 'number') return;
      if (lastRaw !== null && shown) { y += lastRaw - d.raw; place(); }
      lastRaw = d.raw;
    });
  }
  /* 그림이 빠지는 일이 없게 다른 요소가 body 를 바꿔도 다시 붙여요 */
  setInterval(function () { if (el && !el.isConnected && document.body) document.body.appendChild(el); }, 1000);
  /* 미리 불러오기 */
  var pre = new Image(); pre.src = src;
})();
