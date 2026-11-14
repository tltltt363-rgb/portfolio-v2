/*
 * dc-runtime.js
 * index.html 안의 <template id="dc-template"> 마크업을 읽어서
 * js/portfolio.js 의 Component 로직과 합쳐 화면을 그려주는 작은 실행기예요.
 * 이 파일은 보통 고칠 필요가 없어요. (글자·가격·사진은 index.html 과 config.js 에서 고쳐요)
 *
 * 지원하는 문법
 *   {{ 이름 }}                         값 끼워 넣기 (점으로 하위 값: {{ card.title }})
 *   <sc-for list="{{목록}}" as="x">    목록 반복 ({{ $index }} = 순번)
 *   <sc-if value="{{조건}}">           조건이 참일 때만 표시
 *   onClick="{{함수}}" 등              이벤트 연결
 */
(function () {
  'use strict';
  var R = window.React;
  var h = R.createElement;

  var ATTR_MAP = {
    'class': 'className', 'for': 'htmlFor', 'tabindex': 'tabIndex', 'readonly': 'readOnly',
    'autoplay': 'autoPlay', 'playsinline': 'playsInline', 'maxlength': 'maxLength',
    'colspan': 'colSpan', 'rowspan': 'rowSpan', 'crossorigin': 'crossOrigin', 'srcset': 'srcSet',
    'stroke-width': 'strokeWidth', 'stroke-linecap': 'strokeLinecap', 'stroke-linejoin': 'strokeLinejoin',
    'stroke-dasharray': 'strokeDasharray', 'stroke-miterlimit': 'strokeMiterlimit',
    'fill-rule': 'fillRule', 'clip-rule': 'clipRule', 'stop-color': 'stopColor', 'stop-opacity': 'stopOpacity',
    'xlink:href': 'xlinkHref', 'novalidate': 'noValidate', 'enctype': 'encType', 'autocomplete': 'autoComplete'
  };
  var BOOL_ATTRS = { disabled: 1, checked: 1, readOnly: 1, muted: 1, autoPlay: 1, playsInline: 1, hidden: 1, selected: 1, required: 1, multiple: 1, open: 1, loop: 1, controls: 1 };
  var VOID = { input: 1, img: 1, br: 1, hr: 1, meta: 1, link: 1, source: 1, track: 1, wbr: 1, area: 1, col: 1, embed: 1 };
  var EVENTS = {};
  ['Click', 'ClickCapture', 'Change', 'Input', 'MouseDown', 'MouseUp', 'MouseMove', 'MouseEnter', 'MouseLeave',
    'KeyDown', 'KeyUp', 'Scroll', 'Submit', 'Focus', 'Blur', 'PointerDown', 'PointerMove', 'PointerUp',
    'TouchStart', 'TouchMove', 'TouchEnd', 'DoubleClick', 'ContextMenu', 'Wheel', 'Load', 'Error']
    .forEach(function (n) { EVENTS[('on' + n).toLowerCase()] = 'on' + n; });

  var WHOLE = /^\s*\{\{\s*([^{}]+?)\s*\}\}\s*$/;
  var ANY = /\{\{\s*([^{}]+?)\s*\}\}/g;

  function lookup(scope, path) {
    if (path === 'true') return true;
    if (path === 'false') return false;
    if (path === 'null') return null;
    if (/^-?\d+(\.\d+)?$/.test(path)) return Number(path);
    if (/^'.*'$|^".*"$/.test(path)) return path.slice(1, -1);
    var cur = scope, parts = path.split('.');
    for (var i = 0; i < parts.length; i++) {
      if (cur == null) return undefined;
      cur = cur[parts[i]];
    }
    return cur;
  }
  function interp(str, scope) {
    return str.replace(ANY, function (m, p) { var v = lookup(scope, p); return v == null ? '' : String(v); });
  }
  function valueOf(raw, scope) {
    var m = WHOLE.exec(raw);
    return m ? lookup(scope, m[1]) : interp(raw, scope);
  }

  function splitDecls(str) {
    var out = [], depth = 0, buf = '';
    for (var i = 0; i < str.length; i++) {
      var ch = str[i];
      if (ch === '(') depth++;
      else if (ch === ')') depth = Math.max(0, depth - 1);
      if (ch === ';' && depth === 0) { out.push(buf); buf = ''; } else buf += ch;
    }
    if (buf.trim()) out.push(buf);
    return out;
  }
  function styleObj(str) {
    var o = {};
    splitDecls(String(str || '')).forEach(function (decl) {
      var idx = decl.indexOf(':');
      if (idx < 0) return;
      var prop = decl.slice(0, idx).trim(), val = decl.slice(idx + 1).trim();
      if (!prop || !val) return;
      if (prop.indexOf('--') !== 0) {
        prop = prop.replace(/^-(webkit|moz|ms)-/, function (m, v) { return v.charAt(0).toUpperCase() + v.slice(1) + '-'; })
          .replace(/-([a-z])/g, function (m, c) { return c.toUpperCase(); });
      }
      o[prop] = val;
    });
    return o;
  }

  /* 템플릿 DOM → 가벼운 설명 트리 */
  function compile(node) {
    if (node.nodeType === 3) {
      var t = node.nodeValue;
      if (!t.trim() && t.indexOf('\n') >= 0) return null;
      return { k: 't', v: t, dyn: t.indexOf('{{') >= 0 };
    }
    if (node.nodeType !== 1) return null;
    var tag = node.tagName.toLowerCase();
    var kids = compileKids(node);
    if (tag === 'sc-for') return { k: 'for', list: node.getAttribute('list') || '', as: node.getAttribute('as') || 'item', c: kids };
    if (tag === 'sc-if') return { k: 'if', v: node.getAttribute('value') || '', c: kids };
    var attrs = [];
    for (var i = 0; i < node.attributes.length; i++) {
      var a = node.attributes[i];
      if (a.name.indexOf('hint-') === 0) continue;
      attrs.push([a.name, a.value]);
    }
    return { k: 'el', tag: node.namespaceURI === 'http://www.w3.org/2000/svg' ? node.tagName : tag, a: attrs, c: kids };
  }
  function compileKids(node) {
    var src = node.content ? node.content.childNodes : node.childNodes, out = [];
    for (var i = 0; i < src.length; i++) { var c = compile(src[i]); if (c) out.push(c); }
    return out;
  }

  function renderList(nodes, scope, key) {
    var out = [];
    for (var i = 0; i < nodes.length; i++) {
      var r = renderOne(nodes[i], scope, key + '.' + i);
      if (Array.isArray(r)) { for (var j = 0; j < r.length; j++) out.push(r[j]); }
      else if (r != null && r !== '') out.push(r);
    }
    return out;
  }
  function renderOne(n, scope, key) {
    if (n.k === 't') return n.dyn ? interp(n.v, scope) : n.v;
    if (n.k === 'if') return valueOf(n.v, scope) ? renderList(n.c, scope, key) : null;
    if (n.k === 'for') {
      var list = valueOf(n.list, scope), out = [];
      if (!Array.isArray(list)) return out;
      for (var i = 0; i < list.length; i++) {
        var sc = Object.create(scope);
        sc[n.as] = list[i];
        sc.$index = i;
        var r = renderList(n.c, sc, key + '[' + i + ']');
        for (var j = 0; j < r.length; j++) out.push(r[j]);
      }
      return out;
    }
    var props = { key: key };
    for (var a = 0; a < n.a.length; a++) {
      var name = n.a[a][0], raw = n.a[a][1];
      if (EVENTS[name]) {
        var fn = valueOf(raw, scope);
        if (typeof fn === 'function') props[EVENTS[name]] = fn;
        continue;
      }
      var val = valueOf(raw, scope);
      if (name === 'style') { props.style = styleObj(val); continue; }
      var pname = ATTR_MAP[name] || name;
      if (BOOL_ATTRS[pname]) {
        props[pname] = WHOLE.test(raw) ? !!val : (raw === '' || raw === pname.toLowerCase() || raw === 'true');
        continue;
      }
      if (pname === 'value' || pname === 'defaultValue') { props[pname] = val == null ? '' : val; continue; }
      props[pname] = (val === undefined || val === null) ? undefined : (typeof val === 'object' ? String(val) : val);
    }
    if (VOID[n.tag]) return h(n.tag, props);
    var kids = renderList(n.c, scope, key);
    return h.apply(null, [n.tag, props].concat(kids));
  }

  /* 템플릿 읽기 */
  var tpl = document.getElementById('dc-template');
  var root = tpl.content.querySelector('x-dc') || tpl.content;
  var COMPILED = [];
  var styleText = '';
  var kidsSrc = root.childNodes;
  for (var i = 0; i < kidsSrc.length; i++) {
    var node = kidsSrc[i];
    if (node.nodeType === 1 && node.tagName.toLowerCase() === 'helmet') {
      node.querySelectorAll('style').forEach(function (s) { styleText += s.textContent + '\n'; });
      continue;
    }
    var c = compile(node);
    if (c) COMPILED.push(c);
  }
  if (styleText) {
    var st = document.createElement('style');
    st.setAttribute('data-from', 'helmet');
    st.textContent = styleText;
    document.head.appendChild(st);
  }

  class DCLogic extends R.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }
    render() {
      var vals = this.renderVals ? this.renderVals() : {};
      return h.apply(null, [R.Fragment, null].concat(renderList(COMPILED, vals, 'r')));
    }
  }
  window.DCLogic = DCLogic;

  window.mountPortfolio = function (Component, props) {
    var el = document.getElementById('app');
    window.ReactDOMClient.createRoot(el).render(h(Component, props || {}));
  };
})();
