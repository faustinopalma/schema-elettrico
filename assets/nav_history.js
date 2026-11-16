/* ==========================================================================
   Shared Step-by-Step Navigation History Stack (index.html <-> pannelli/*.html)
   Guarantees a prominent 1-step "Return to previous page/view" button across
   every drill-down, panel jump, atlas visit, and graph mode transition.
   ========================================================================== */
(() => {
  "use strict";

  const STORAGE_KEY = "schema_elettrico_nav_stack_v1";
  const MAX_STACK = 45;

  function safeReadStack() {
    try {
      const raw = window.sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed.filter((it) => it && typeof it.url === "string" && typeof it.label === "string");
    } catch (_) {
      return [];
    }
  }

  function safeWriteStack(stack) {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(stack.slice(-MAX_STACK)));
    } catch (_) {
      /* sessionStorage unavailable — URL fallback params still work */
    }
  }

  function stripTransientParams(rawUrl) {
    try {
      const u = new URL(rawUrl, window.location.href);
      u.searchParams.delete("ret");
      u.searchParams.delete("retLabel");
      return u.toString();
    } catch (_) {
      return rawUrl;
    }
  }

  function sameTargetIgnoreTheme(urlA, urlB) {
    try {
      const a = new URL(urlA, window.location.href);
      const b = new URL(urlB, window.location.href);
      a.searchParams.delete("scoutTheme");
      b.searchParams.delete("scoutTheme");
      a.searchParams.delete("ret");
      b.searchParams.delete("ret");
      a.searchParams.delete("retLabel");
      b.searchParams.delete("retLabel");
      const normPath = (p) => p.replace(/\/index\.html$/, "/");
      return a.origin === b.origin && normPath(a.pathname) === normPath(b.pathname) && a.searchParams.toString() === b.searchParams.toString();
    } catch (_) {
      return urlA === urlB;
    }
  }

  function applyCurrentThemeToUrl(targetUrl) {
    try {
      const curTheme = document.documentElement.getAttribute("data-theme") || new URLSearchParams(window.location.search).get("scoutTheme");
      const u = new URL(targetUrl, window.location.href);
      if (u.origin !== window.location.origin) return window.location.origin;
      if (curTheme) {
        u.searchParams.set("scoutTheme", curTheme);
      }
      return u.toString();
    } catch (_) {
      return targetUrl;
    }
  }

  function peek() {
    const stack = safeReadStack();
    if (stack.length > 0) {
      return stack[stack.length - 1];
    }
    // Fallback to URL query params (?ret=...&retLabel=...) if opened in a fresh tab or restricted storage
    const sp = new URLSearchParams(window.location.search);
    const ret = sp.get("ret");
    const retLabel = sp.get("retLabel");
    if (ret) {
      try {
        const u = new URL(ret, window.location.href);
        if (u.origin === window.location.origin) {
          return { url: u.toString(), label: retLabel || "Pagina precedente", fromQueryFallback: true };
        }
      } catch (_) { /* ignore */ }
    }
    return null;
  }

  function pushStateEntry(url, label) {
    const cleanUrl = stripTransientParams(url);
    const cleanLabel = String(label || "Vista precedente").trim();
    const stack = safeReadStack();
    const last = stack[stack.length - 1];
    if (last && sameTargetIgnoreTheme(last.url, cleanUrl)) {
      last.url = cleanUrl;
      last.label = cleanLabel;
    } else {
      stack.push({ url: cleanUrl, label: cleanLabel });
    }
    safeWriteStack(stack);
  }

  function pushCurrent(label) {
    pushStateEntry(window.location.href, label);
  }

  function pop() {
    const stack = safeReadStack();
    if (stack.length > 0) {
      const item = stack.pop();
      safeWriteStack(stack);
      return item;
    }
    return peek();
  }

  /**
   * Navigate forward to `destHref` while recording the current page/view (`currentLabel`)
   * on the return stack. If `destHref` is ALREADY identical to the top of the return stack,
   * pops back instead of creating a redundant A -> B -> A ping-pong loop!
   */
  function navigateTo(destHref, currentLabel) {
    const destAbs = new URL(destHref, window.location.href).toString();
    const top = peek();
    if (top && sameTargetIgnoreTheme(top.url, destAbs)) {
      pop();
      window.location.href = applyCurrentThemeToUrl(top.url);
      return;
    }
    pushCurrent(currentLabel);
    const finalUrl = new URL(applyCurrentThemeToUrl(destAbs));
    // Also attach lightweight fallback ?ret= if short enough, without polluting history when sessionStorage works
    window.location.href = finalUrl.toString();
  }

  /**
   * Step back 1 level to the exact page/graph state where the user came from.
   * If `inPlaceHandler(urlObj)` is provided and returns true (used inside index.html
   * when stepping back between two states of index.html), skips full page reload!
   */
  function goBack(fallbackHref, inPlaceHandler) {
    const item = pop();
    const targetRaw = item ? item.url : fallbackHref;
    if (!targetRaw) return;
    const finalHref = applyCurrentThemeToUrl(targetRaw);
    if (typeof inPlaceHandler === "function") {
      try {
        const u = new URL(finalHref, window.location.href);
        if (inPlaceHandler(u)) {
          return;
        }
      } catch (_) { /* fall through to location.href */ }
    }
    window.location.href = finalHref;
  }

  window.SE_NAV = {
    peek,
    pushStateEntry,
    pushCurrent,
    pop,
    navigateTo,
    goBack,
    sameTargetIgnoreTheme,
    applyCurrentThemeToUrl
  };
})();
