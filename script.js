const cfg = window.BUBU || {};

// 모바일 메뉴
const menuBtn = document.querySelector('.menu-btn');
const nav = document.getElementById('nav');
menuBtn.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
});
nav.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    nav.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }
});

// 문자 문의: 안내 문구가 미리 입력된 문자 앱 열기 (iOS/안드로이드 공통 형식)
const smsHref = 'sms:01088188658?&body=' + encodeURIComponent(cfg.smsText || '');
document.querySelectorAll('#sms-btn, [data-sms]').forEach((a) => { a.href = smsHref; });

// 카카오톡: 주소가 등록된 경우에만 버튼 표시
const kakao = document.getElementById('kakao-btn');
if (cfg.kakaoUrl && /^https:\/\//.test(cfg.kakaoUrl)) {
  kakao.href = cfg.kakaoUrl;
  kakao.hidden = false;
}

// 사진 크게 보기 (그룹별로 넘겨 보기)
const lb = document.getElementById('lb');
const lbImg = lb.querySelector('img');
const lbCap = lb.querySelector('figcaption');
let group = [];
let idx = 0;

function show(i) {
  idx = (i + group.length) % group.length;
  const b = group[idx];
  const img = b.querySelector('img');
  lbImg.src = img.currentSrc || img.src;
  lbImg.alt = img.alt;
  lbCap.textContent = b.dataset.cap || '';
}
document.querySelectorAll('[data-lb]').forEach((b) => {
  b.addEventListener('click', () => {
    group = [...document.querySelectorAll('[data-lb="' + b.dataset.lb + '"]')];
    show(group.indexOf(b));
    lb.showModal();
  });
});
lb.querySelector('.lb-x').addEventListener('click', () => lb.close());
lb.querySelector('.lb-p').addEventListener('click', () => show(idx - 1));
lb.querySelector('.lb-n').addEventListener('click', () => show(idx + 1));
lb.addEventListener('click', (e) => { if (e.target === lb) lb.close(); });
lb.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') show(idx - 1);
  if (e.key === 'ArrowRight') show(idx + 1);
});
