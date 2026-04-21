// ===== DAY COUNTER =====
(function () {
  var start = new Date('2026-01-20');
  var now = new Date();
  var diff = Math.floor((now - start) / (1000 * 60 * 60 * 24));
  var el = document.getElementById('daycount');
  if (el) el.textContent = diff + ' days!!';
})();

// ===== 6-MONTH COUNTDOWN =====
(function () {
  var start = new Date('2026-01-20');
  var sixMonths = new Date(start);
  sixMonths.setMonth(sixMonths.getMonth() + 6);
  var now = new Date();
  var diff = Math.ceil((sixMonths - now) / (1000 * 60 * 60 * 24));
  var el = document.getElementById('sixmonths');
  if (el) el.textContent = diff > 0 ? diff : '0 (it\'s today!!)';
})();

// ===== VISITOR COUNTER (localStorage) =====
(function () {
  var count = parseInt(localStorage.getItem('seovisitors') || '0') + 1;
  localStorage.setItem('seovisitors', count);
  var pad = String(count).padStart(6, '0');
  var cEl = document.getElementById('counter');
  var vEl = document.getElementById('visitor-num');
  if (cEl) cEl.textContent = pad;
  if (vEl) vEl.textContent = count;
})();

// ===== POPUP ON LOAD =====
window.addEventListener('load', function () {
  var overlay = document.getElementById('popup-overlay');
  if (overlay) overlay.classList.add('active');
});

function closePopup() {
  var overlay = document.getElementById('popup-overlay');
  if (overlay) overlay.classList.remove('active');
}

// ===== LIGHTBOX =====
function openLightbox(src, caption) {
  var lb = document.getElementById('lightbox');
  var img = document.getElementById('lightbox-img');
  var cap = document.getElementById('lightbox-caption');
  img.src = src;
  cap.textContent = caption || '';
  lb.classList.add('active');
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
}

// ===== PHOTO GRID - auto-load images from images/ folder =====
// Known image extensions to try
var photoFiles = [];

// We inject photos at build time via the HTML; this handles click-to-open
document.addEventListener('DOMContentLoaded', function () {
  var grid = document.getElementById('photoGrid');
  if (!grid) return;

  // Wire up any <img> tags already in the grid
  grid.querySelectorAll('img').forEach(function (img) {
    img.addEventListener('click', function () {
      openLightbox(img.src, img.alt);
    });
  });
});

// ===== GUESTBOOK =====
function signGuestbook(e) {
  e.preventDefault();
  var name = document.getElementById('gb-name').value.trim();
  var msg  = document.getElementById('gb-msg').value.trim();
  if (!name || !msg) return;

  var entries = document.getElementById('guestbook-entries');
  var div = document.createElement('div');
  div.className = 'gb-entry';
  div.innerHTML = '<b>' + escapeHtml(name) + '</b> says: <i>"' + escapeHtml(msg) + '"</i>';
  entries.appendChild(div);

  document.getElementById('gb-name').value = '';
  document.getElementById('gb-msg').value = '';
}

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ===== POLL =====
function votePoll(e) {
  e.preventDefault();
  var selected = document.querySelector('input[name="poll"]:checked');
  if (!selected) return;
  var messages = {
    '1': 'Aww, thanks!! ♥',
    '2': 'We agree!! ♥♥',
    '3': 'CORRECT ANSWER!! ♥♥♥'
  };
  var result = document.getElementById('poll-result');
  result.style.display = 'block';
  result.textContent = messages[selected.value] || '♥';
}

// ===== CURSOR SPARKLE EFFECT =====
(function () {
  var colors = ['#ff69b4','#ff00ff','#ffff00','#00ffff','#ff6600'];
  document.addEventListener('mousemove', function (e) {
    if (Math.random() > 0.3) return; // only fire 70% of moves
    var spark = document.createElement('div');
    spark.textContent = '✦';
    spark.style.cssText = [
      'position:fixed',
      'pointer-events:none',
      'left:' + (e.clientX - 6) + 'px',
      'top:' + (e.clientY - 6) + 'px',
      'font-size:14px',
      'color:' + colors[Math.floor(Math.random() * colors.length)],
      'z-index:99999',
      'transition:all 0.6s ease-out',
      'opacity:1'
    ].join(';');
    document.body.appendChild(spark);
    requestAnimationFrame(function () {
      spark.style.opacity = '0';
      spark.style.transform = 'translateY(-20px) scale(0.5)';
    });
    setTimeout(function () { spark.remove(); }, 650);
  });
})();
