// ===== DAY COUNTER =====
(function () {
  var nowEST = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }));
  var start = new Date('2026-01-22');
  var diff = Math.floor((nowEST - start) / (1000 * 60 * 60 * 24));
  var el = document.getElementById('daycount');
  if (el) el.textContent = diff + ' days!!';
})();

// ===== 6-MONTH COUNTDOWN =====
(function () {
  var nowEST = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }));
  var sixMonths = new Date('2026-07-22');
  var diff = Math.ceil((sixMonths - nowEST) / (1000 * 60 * 60 * 24));
  var el = document.getElementById('sixmonths');
  if (el) el.textContent = diff > 0 ? diff : '0 (it\'s today!!)';
})();

// ===== VISITOR COUNTER =====
(function () {
  var cEl = document.getElementById('counter');
  var vEl = document.getElementById('visitor-num');
  if (cEl) cEl.textContent = '000001';
  if (vEl) vEl.textContent = '1';
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

// ===== GUESTBOOK (Firebase Firestore) =====
var db = (function () {
  var firebaseConfig = {
    apiKey: "AIzaSyBMmgeSCuPBTvpPcVL3UGBu9sRV_6uxIHw",
    authDomain: "princess-4a412.firebaseapp.com",
    projectId: "princess-4a412",
    storageBucket: "princess-4a412.firebasestorage.app",
    messagingSenderId: "326717943448",
    appId: "1:326717943448:web:6d07e2d62e490aa5a56aed"
  };
  firebase.initializeApp(firebaseConfig);
  return firebase.firestore();
})();

// Live-load all entries
db.collection('guestbook')
  .orderBy('timestamp', 'asc')
  .onSnapshot(function (snapshot) {
    var entries = document.getElementById('guestbook-entries');
    entries.innerHTML = '';
    snapshot.forEach(function (doc) {
      var d = doc.data();
      var div = document.createElement('div');
      div.className = 'gb-entry';
      div.innerHTML = '<b>' + escapeHtml(d.name) + '</b> says: <i>"' + escapeHtml(d.message) + '"</i>';
      entries.appendChild(div);
    });
  });

function signGuestbook(e) {
  e.preventDefault();
  var name = document.getElementById('gb-name').value.trim();
  var msg  = document.getElementById('gb-msg').value.trim();
  if (!name || !msg) return;

  db.collection('guestbook').add({
    name: name,
    message: msg,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  });

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
  var result = document.getElementById('poll-result');
  result.style.display = 'block';
  if (selected.value === '6') {
    result.textContent = 'CORRECT ANSWER!! ♥♥♥';
  } else {
    result.textContent = 'Hmm... that\'s true but try again!! 👀';
  }
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
