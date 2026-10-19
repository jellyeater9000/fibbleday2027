// Shared by every page: sizes the title lockup.
// Title sizes are 128 / 128 / 150 px. They scale down only when they would not fit the width.
(function () {
  var lock = document.getElementById('lockup');
  var scriptEl = document.getElementById('script');
  var codeEl = document.getElementById('code');
  if (!lock || !scriptEl || !codeEl) return;

  function fit() {
    lock.classList.remove('stack');
    lock.style.setProperty('--k1', '1');
    lock.style.setProperty('--k2', '1');
    var avail = lock.clientWidth;
    var w1 = scriptEl.offsetWidth;
    var sx = parseFloat(getComputedStyle(codeEl).getPropertyValue('--sx')) || 1;
    var w2 = codeEl.offsetWidth * sx;
    var gap = 24;
    var k1 = 1, k2 = 1;
    if (w1 + w2 + gap > avail) {
      var k = (avail - gap) / (w1 + w2);
      if (k >= 0.55) {
        k1 = k2 = k;
      } else {
        lock.classList.add('stack');
        k1 = Math.min(1, avail / w1);
        k2 = Math.min(1, avail / w2);
      }
    }
    lock.style.setProperty('--k1', String(k1));
    lock.style.setProperty('--k2', String(k2));
    // the barcode is squeezed with scaleX, so give back the space it no longer uses
    codeEl.style.marginRight = (-(1 - sx) * codeEl.offsetWidth) + 'px';
  }

  fit();
  window.addEventListener('resize', fit);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
})();

// Main page: after an RSVP, show a thank-you message (then tidy the address bar).
(function () {
  var el = document.getElementById('thanks');
  if (!el) return;
  var answer = new URLSearchParams(window.location.search).get('rsvp');
  if (answer !== 'coming' && answer !== 'cant') return;

  var name = '';
  try {
    name = sessionStorage.getItem('rsvp-name') || '';
    sessionStorage.removeItem('rsvp-name');
  } catch (e) {}
  var who = name ? ', ' + name : '';

  el.textContent = answer === 'coming'
    ? 'thank you' + who + '!'
    : 'thanks for letting me know' + who + '!';
  el.hidden = false;

  try { history.replaceState(null, '', window.location.pathname); } catch (e) {}
})();