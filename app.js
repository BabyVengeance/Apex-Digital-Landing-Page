/* ==========================================================================
   APEX DIGITAL SA — HIGH-LUXURY ARCHITECTURAL INTERACTIVE ENGINE
   Features: Infinite Smooth 3D Parametric Wireframe Rotation, Energy Photons,
   Cinematic Preloader, Dual Ring Cursor, Kinetic Hero Split Reveal, & Speed Simulator
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initThemeState();
  initHeroKineticReveal();
  initWireframeCanvas();
  initCustomCursor();
  initScrollProgress();
  init3DTiltCards();
  initNavbarScroll();
  initMobileMenu();
  initScrollAnimations();
  initChatbotWidget();
  initCalculator();
  initWorkPreviews();
  initEcosystemCanvas();

  // Register service worker for offline edge caching
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch(err => {
        console.log('SW registration failed: ', err);
      });
    });
  }
});

/* ==========================================================================
   1. CINEMATIC PRE-LOADER BOOT SEQUENCE & KINETIC HERO REVEAL
   ========================================================================== */
function initPreloader() {
  const loader = document.getElementById('cinematic-loader');
  if (!loader) return;
  setTimeout(() => {
    loader.classList.add('loaded');
  }, 1100);
}

function initHeroKineticReveal() {
  const heroTitle = document.getElementById('hero-title');
  if (!heroTitle) return;

  // Split by words first, then split characters inside each word to prevent mid-word breaks
  const rawWords = heroTitle.innerText.trim().split(/\s+/);
  
  heroTitle.innerHTML = rawWords.map(word => {
    const chars = word.split('').map(c => `<span class="char">${c}</span>`).join('');
    return `<span class="word">${chars}</span>`;
  }).join(' ');

  setTimeout(() => {
    if (typeof gsap !== 'undefined') {
      gsap.fromTo("#hero-title .char",
        { y: "115%", opacity: 0 },
        { y: "0%", opacity: 1, stagger: 0.015, duration: 0.7, ease: "power4.out" }
      );
      gsap.fromTo("#hero-desc",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power2.out", delay: 0.25 }
      );
    } else {
      heroTitle.classList.add('revealed');
    }
  }, 1100);
}

function initScrollAnimations() {
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Section Titles ScrollTrigger
    gsap.utils.toArray('.section-title').forEach(title => {
      gsap.fromTo(title,
        { y: 30, opacity: 0 },
        {
          scrollTrigger: {
            trigger: title,
            start: "top 85%",
          },
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out"
        }
      );
    });

    // Agency Manifesto Pillars
    gsap.utils.toArray('.agency-pillar-card').forEach((card, idx) => {
      gsap.fromTo(card,
        { x: -20, opacity: 0 },
        {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
          x: 0,
          opacity: 1,
          duration: 0.6,
          delay: idx * 0.1,
          ease: "power2.out"
        }
      );
    });

    // Selected Works Interactive Items
    gsap.utils.toArray('.work-list-item').forEach((item, idx) => {
      gsap.fromTo(item,
        { y: 20, opacity: 0 },
        {
          scrollTrigger: {
            trigger: item,
            start: "top 88%",
          },
          y: 0,
          opacity: 1,
          duration: 0.5,
          delay: idx * 0.08,
          ease: "power2.out"
        }
      );
    });
  }
}

/* ==========================================================================
   2. DYNAMIC LIGHT & DARK THEME ENGINE + FAVICON SYNC
   ========================================================================== */
function initThemeState() {
  const savedTheme = localStorage.getItem('apex_theme') || 'dark';
  setTheme(savedTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
  localStorage.setItem('apex_theme', newTheme);
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const navLogo = document.getElementById('nav-logo-img');
  const footerLogo = document.getElementById('footer-logo-img');
  const favicon = document.getElementById('favicon');
  const themeIcon = document.getElementById('theme-icon');
  const triggerLogo = document.querySelector('.trigger-logo-img');
  const headerLogo = document.querySelector('.header-logo-img');
  const centerBadgeLogo = document.querySelector('.center-badge-logo');

  if (theme === 'light') {
    if (navLogo) navLogo.src = 'assets/images/logo-light-no-text.webp';
    if (footerLogo) footerLogo.src = 'assets/images/logo-light.webp';
    if (favicon) favicon.href = 'assets/images/logo-icon-black.webp';
    if (triggerLogo) triggerLogo.src = 'assets/images/logo-icon-black.webp';
    if (headerLogo) headerLogo.src = 'assets/images/logo-icon-black.webp';
    if (centerBadgeLogo) centerBadgeLogo.src = 'assets/images/logo-light-no-text.webp';
    if (themeIcon) {
      themeIcon.innerHTML = `<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>`;
    }
  } else {
    if (navLogo) navLogo.src = 'assets/images/logo-dark-no-text.webp';
    if (footerLogo) footerLogo.src = 'assets/images/logo-dark.webp';
    if (favicon) favicon.href = 'assets/images/logo-icon-gold.webp';
    if (triggerLogo) triggerLogo.src = 'assets/images/logo-icon-gold.webp';
    if (headerLogo) headerLogo.src = 'assets/images/logo-icon-gold.webp';
    if (centerBadgeLogo) centerBadgeLogo.src = 'assets/images/logo-dark-no-text.webp';
    if (themeIcon) {
      themeIcon.innerHTML = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>`;
    }
  }
}

function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const navContainer = document.querySelector('.nav-container');
  const navLinks = document.querySelectorAll('.nav-link, .nav-actions .btn-champagne, .nav-social-btn');

  if (!toggleBtn || !navContainer) return;

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = navContainer.classList.toggle('mobile-open');
    toggleBtn.classList.toggle('active', isOpen);
    toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    document.body.classList.toggle('menu-open', isOpen);
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navContainer.classList.remove('mobile-open');
      toggleBtn.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    });
  });

  document.addEventListener('click', (e) => {
    if (navContainer.classList.contains('mobile-open') && !navContainer.contains(e.target)) {
      navContainer.classList.remove('mobile-open');
      toggleBtn.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    }
  });
}

/* ==========================================================================
   3. INFINITE 3D DUAL PARAMETRIC LOGO VORTEX SHADER WITH WAVE NOISE & PHOTONS
   Outer Knot (p=2, q=3) + Inner Core Knot (p=3, q=2) + Dynamic 3D Harmonic Noise + 180 Particles
   ========================================================================== */
function initWireframeCanvas() {
  const canvas = document.getElementById('hero-wireframe-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = canvas.offsetWidth;
  let height = canvas.height = canvas.offsetHeight;

  let angleX = 0.2;
  let angleY = 0.3;
  let angleZ = 0.1;

  let targetMouseX = 0;
  let targetMouseY = 0;
  let mouseX = 0;
  let mouseY = 0;

  window.addEventListener('resize', () => {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  });

  window.addEventListener('mousemove', (e) => {
    targetMouseY = (e.clientY / window.innerHeight - 0.5) * 0.4;
    targetMouseX = (e.clientX / window.innerWidth - 0.5) * 0.4;
  });

  window.addEventListener('scroll', () => {
    angleY += window.scrollY * 0.0001;
  });

  // Helper 3D rotation functions
  function rotateX(pt, a) {
    const cos = Math.cos(a), sin = Math.sin(a);
    return { x: pt.x, y: pt.y * cos - pt.z * sin, z: pt.y * sin + pt.z * cos };
  }

  function rotateY(pt, a) {
    const cos = Math.cos(a), sin = Math.sin(a);
    return { x: pt.x * cos + pt.z * sin, y: pt.y, z: -pt.x * sin + pt.z * cos };
  }

  function rotateZ(pt, a) {
    const cos = Math.cos(a), sin = Math.sin(a);
    return { x: pt.x * cos - pt.y * sin, y: pt.x * sin + pt.y * cos, z: pt.z };
  }

  // Generate Base Mesh Definitions
  // 1. Primary Outer Trefoil Knot (p=2, q=3)
  const outerStepsU = 84;
  const outerStepsV = 16;

  // 2. Secondary Inner Core Knot (p=3, q=2, 68% Scale)
  const innerStepsU = 64;
  const innerStepsV = 12;

  // Particle Swarm Initializations (40 Track Photons + 140 Ambient Vortex Dust)
  const trackPhotons = [];
  for (let p = 0; p < 40; p++) {
    trackPhotons.push({
      progress: (p / 40) * Math.PI * 2,
      speed: 0.004 + Math.random() * 0.004,
      vOffset: (Math.floor(Math.random() * 16) / 16) * Math.PI * 2,
      isInner: p % 2 === 0
    });
  }

  const vortexParticles = [];
  for (let i = 0; i < 140; i++) {
    const radius = 60 + Math.random() * 260;
    const theta = Math.random() * Math.PI * 2;
    const phi = (Math.random() - 0.5) * Math.PI;
    vortexParticles.push({
      x: radius * Math.cos(theta) * Math.cos(phi),
      y: radius * Math.sin(theta) * Math.cos(phi),
      z: radius * Math.sin(phi),
      orbitSpeed: 0.002 + Math.random() * 0.005,
      orbitRadius: radius,
      angle: theta,
      elevation: phi,
      size: 0.8 + Math.random() * 2.2,
      alphaOffset: Math.random() * Math.PI * 2
    });
  }

  let animTime = 0;

  function animate() {
    ctx.clearRect(0, 0, width, height);
    animTime += 0.016;

    // Continuous Multi-Axis Rotation State
    angleY += 0.004;
    angleX += 0.0018;
    angleZ += 0.0008;

    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    const renderAngleX = angleX + mouseY;
    const renderAngleY = angleY + mouseX;
    const renderAngleZ = angleZ;

    // Inverse Rotation State for Inner Core
    const innerAngleX = renderAngleX + 0.45;
    const innerAngleY = -renderAngleY * 1.35;
    const innerAngleZ = -renderAngleZ * 0.8;

    const centerX = width * 0.55;
    const centerY = height * 0.48;
    const fov = 450;

    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const outerStrokeBase = currentTheme === 'light' ? 'rgba(184, 146, 85, ' : 'rgba(223, 195, 138, ';
    const innerStrokeBase = currentTheme === 'light' ? 'rgba(140, 105, 50, ' : 'rgba(255, 220, 160, ';

    // --- 1. GENERATE & DRAW PRIMARY OUTER MESH ---
    const outerPoints = [];
    const outerLines = [];

    for (let i = 0; i < outerStepsU; i++) {
      const u = (i / outerStepsU) * Math.PI * 2;
      const p = 2, q = 3;
      const r = 180 + 40 * Math.cos(q * u);
      const x = r * Math.cos(p * u);
      const y = r * Math.sin(p * u);
      const z = 80 * Math.sin(q * u);

      for (let j = 0; j < outerStepsV; j++) {
        const v = (j / outerStepsV) * Math.PI * 2;
        // Harmonic Surface Noise Displacement
        const noise = Math.sin(u * 5 + animTime * 2.0) * Math.cos(v * 3 + animTime * 1.5) * 6.0;
        const tubeR = 26 + noise;

        const px = x + tubeR * Math.cos(v) * Math.cos(u);
        const py = y + tubeR * Math.cos(v) * Math.sin(u);
        const pz = z + tubeR * Math.sin(v);

        let pt = rotateX({ x: px, y: py, z: pz }, renderAngleX);
        pt = rotateY(pt, renderAngleY);
        pt = rotateZ(pt, renderAngleZ);

        const scale = fov / (fov + pt.z + 300);
        outerPoints.push({
          x: centerX + pt.x * scale,
          y: centerY + pt.y * scale,
          z: pt.z
        });
      }
    }

    for (let i = 0; i < outerStepsU; i++) {
      for (let j = 0; j < outerStepsV; j++) {
        const current = i * outerStepsV + j;
        const nextV = i * outerStepsV + ((j + 1) % outerStepsV);
        const nextU = ((i + 1) % outerStepsU) * outerStepsV + j;
        outerLines.push([current, nextV], [current, nextU]);
      }
    }

    ctx.lineWidth = 0.65;
    for (let i = 0; i < outerLines.length; i++) {
      const p1 = outerPoints[outerLines[i][0]];
      const p2 = outerPoints[outerLines[i][1]];
      const depthAlpha = Math.max(0.06, Math.min(0.65, (p1.z + 220) / 440));
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.strokeStyle = outerStrokeBase + depthAlpha + ')';
      ctx.stroke();
    }

    // --- 2. GENERATE & DRAW SECONDARY INNER CORE MESH ---
    const innerPoints = [];
    const innerLines = [];

    for (let i = 0; i < innerStepsU; i++) {
      const u = (i / innerStepsU) * Math.PI * 2;
      const p = 3, q = 2; // Inverse winding pattern
      const r = (180 + 30 * Math.cos(q * u)) * 0.68;
      const x = r * Math.cos(p * u);
      const y = r * Math.sin(p * u);
      const z = 60 * Math.sin(q * u) * 0.68;

      for (let j = 0; j < innerStepsV; j++) {
        const v = (j / innerStepsV) * Math.PI * 2;
        const innerNoise = Math.cos(u * 8 - animTime * 3.0) * 4.0;
        const tubeR = 18 + innerNoise;

        const px = x + tubeR * Math.cos(v) * Math.cos(u);
        const py = y + tubeR * Math.cos(v) * Math.sin(u);
        const pz = z + tubeR * Math.sin(v);

        let pt = rotateX({ x: px, y: py, z: pz }, innerAngleX);
        pt = rotateY(pt, innerAngleY);
        pt = rotateZ(pt, innerAngleZ);

        const scale = fov / (fov + pt.z + 300);
        innerPoints.push({
          x: centerX + pt.x * scale,
          y: centerY + pt.y * scale,
          z: pt.z
        });
      }
    }

    for (let i = 0; i < innerStepsU; i++) {
      for (let j = 0; j < innerStepsV; j++) {
        const current = i * innerStepsV + j;
        const nextV = i * innerStepsV + ((j + 1) % innerStepsV);
        const nextU = ((i + 1) % innerStepsU) * innerStepsV + j;
        innerLines.push([current, nextV], [current, nextU]);
      }
    }

    ctx.lineWidth = 0.55;
    for (let i = 0; i < innerLines.length; i++) {
      const p1 = innerPoints[innerLines[i][0]];
      const p2 = innerPoints[innerLines[i][1]];
      const depthAlpha = Math.max(0.08, Math.min(0.75, (p1.z + 200) / 400));
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.strokeStyle = innerStrokeBase + (depthAlpha * 0.85) + ')';
      ctx.stroke();
    }

    // --- 3. RENDER TRACK PHOTONS ---
    trackPhotons.forEach(pt => {
      pt.progress += pt.speed;
      if (pt.progress > Math.PI * 2) pt.progress = 0;

      const u = pt.progress;
      let px, py, pz;

      if (!pt.isInner) {
        const r = 180 + 40 * Math.cos(3 * u);
        const x = r * Math.cos(2 * u);
        const y = r * Math.sin(2 * u);
        const z = 80 * Math.sin(3 * u);
        const tubeR = 26;
        px = x + tubeR * Math.cos(pt.vOffset) * Math.cos(u);
        py = y + tubeR * Math.cos(pt.vOffset) * Math.sin(u);
        pz = z + tubeR * Math.sin(pt.vOffset);

        let rPt = rotateX({ x: px, y: py, z: pz }, renderAngleX);
        rPt = rotateY(rPt, renderAngleY);
        rPt = rotateZ(rPt, renderAngleZ);

        const scale = fov / (fov + rPt.z + 300);
        const screenX = centerX + rPt.x * scale;
        const screenY = centerY + rPt.y * scale;

        ctx.beginPath();
        ctx.arc(screenX, screenY, Math.max(1.5, 3.5 * scale), 0, Math.PI * 2);
        ctx.fillStyle = currentTheme === 'light' ? '#B89655' : '#FFFFFF';
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#DFC38A';
        ctx.fill();
        ctx.shadowBlur = 0;
      } else {
        const r = (180 + 30 * Math.cos(2 * u)) * 0.68;
        const x = r * Math.cos(3 * u);
        const y = r * Math.sin(3 * u);
        const z = 60 * Math.sin(2 * u) * 0.68;
        const tubeR = 18;
        px = x + tubeR * Math.cos(pt.vOffset) * Math.cos(u);
        py = y + tubeR * Math.cos(pt.vOffset) * Math.sin(u);
        pz = z + tubeR * Math.sin(pt.vOffset);

        let rPt = rotateX({ x: px, y: py, z: pz }, innerAngleX);
        rPt = rotateY(rPt, innerAngleY);
        rPt = rotateZ(rPt, innerAngleZ);

        const scale = fov / (fov + rPt.z + 300);
        const screenX = centerX + rPt.x * scale;
        const screenY = centerY + rPt.y * scale;

        ctx.beginPath();
        ctx.arc(screenX, screenY, Math.max(1.2, 3.0 * scale), 0, Math.PI * 2);
        ctx.fillStyle = currentTheme === 'light' ? '#DFC38A' : '#FFDF9E';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#B89655';
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    });

    // --- 4. RENDER 140 AMBIENT VORTEX DUST PARTICLES ---
    vortexParticles.forEach(vp => {
      vp.angle += vp.orbitSpeed;
      const vx = vp.orbitRadius * Math.cos(vp.angle) * Math.cos(vp.elevation);
      const vy = vp.orbitRadius * Math.sin(vp.angle) * Math.cos(vp.elevation);
      const vz = vp.orbitRadius * Math.sin(vp.elevation);

      let rPt = rotateX({ x: vx, y: vy, z: vz }, renderAngleX * 0.8);
      rPt = rotateY(rPt, renderAngleY * 0.8);

      const scale = fov / (fov + rPt.z + 300);
      const screenX = centerX + rPt.x * scale;
      const screenY = centerY + rPt.y * scale;

      const alphaPulse = 0.2 + 0.5 * Math.sin(animTime * 2 + vp.alphaOffset);
      const pAlpha = Math.max(0.1, Math.min(0.85, (rPt.z + 250) / 500)) * alphaPulse;

      ctx.beginPath();
      ctx.arc(screenX, screenY, vp.size * scale, 0, Math.PI * 2);
      ctx.fillStyle = currentTheme === 'light'
        ? `rgba(184, 146, 85, ${pAlpha})`
        : `rgba(223, 195, 138, ${pAlpha})`;
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

function initCustomCursor() {
  const dot = document.getElementById('cursor-dot');
  const outline = document.getElementById('cursor-outline');
  if (!dot || !outline) return;

  let mouseX = 0, mouseY = 0;
  let outlineX = 0, outlineY = 0;
  
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  });
  
  function updateCursor() {
    const lerp = 0.15;
    let targetX = mouseX;
    let targetY = mouseY;
    
    // Proximity checking for magnetic buttons
    const activeHover = document.querySelector('.btn-champagne:hover, .btn-outline-luxury:hover, .theme-toggle-btn:hover, .faq-trigger:hover, .nav-link:hover');
    if (activeHover) {
      const rect = activeHover.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Pull outline center towards hover element center
      targetX = centerX + (mouseX - centerX) * 0.3;
      targetY = centerY + (mouseY - centerY) * 0.3;
      
      outline.style.width = `${rect.width + 12}px`;
      outline.style.height = `${rect.height + 12}px`;
      outline.style.borderRadius = getComputedStyle(activeHover).borderRadius || '4px';
      outline.style.borderColor = 'var(--champagne)';
    } else {
      outline.style.width = '32px';
      outline.style.height = '32px';
      outline.style.borderRadius = '50%';
      outline.style.borderColor = 'var(--border-champagne)';
    }
    
    outlineX += (targetX - outlineX) * lerp;
    outlineY += (targetY - outlineY) * lerp;
    
    outline.style.left = `${outlineX}px`;
    outline.style.top = `${outlineY}px`;
    
    requestAnimationFrame(updateCursor);
  }
  updateCursor();
}

/* ==========================================================================
   5. INTERACTIVE SPEED & ROI SIMULATOR ENGINE
   ========================================================================== */
/* ==========================================================================
   5. INTERACTIVE APEX INVESTMENT & DELIVERABLES ROI GENERATOR
   ========================================================================== */
const buildTierData = {
  starter: {
    upfrontTitle: 'STARTER SCOPE',
    upfrontDesc: 'Core Hand-Coded Infrastructure',
    assetClass: 'Agile Launch Package',
    pages: '1–2 Custom Hand-Coded Pages',
    integrations: 'Mobile Responsive + Direct Contact Form',
    seo: 'Baseline Google Indexing & Search Schema',
    hosting: 'High-Performance Edge Hosting + POPIA Compliance',
    leads: '+10 to +18',
    hours: '5 Hours',
    lift: '1.8x'
  },
  standard: {
    upfrontTitle: 'STANDARD SCOPE',
    upfrontDesc: 'Bespoke Commercial Architecture',
    assetClass: 'Commercial Growth Asset',
    pages: '5 Custom Hand-Coded Pages',
    integrations: 'WhatsApp Direct Chat / Booking Engine / Intake Forms',
    seo: 'Search Engine Optimization & Authority Schema',
    hosting: 'High-Performance Edge Hosting + POPIA Compliance',
    leads: '+25 to +40',
    hours: '15 Hours',
    lift: '3.2x'
  },
  pro: {
    upfrontTitle: 'PRO ENGINE SCOPE',
    upfrontDesc: 'Enterprise Niche Dominance Build',
    assetClass: 'Enterprise Market Dominance',
    pages: '5–8 Custom Pages + Lead Automation Suite',
    integrations: 'Full Niche Integration Suite + CRM Webhooks',
    seo: 'Google Search Dominance + Speed & Conversion Hardening',
    hosting: 'High-Performance Edge Hosting + POPIA Compliance',
    leads: '+50 to +90',
    hours: '30 Hours',
    lift: '4.8x'
  }
};

let currentTier = 'standard';

function initCalculator() {
  const tierBtns = document.querySelectorAll('#build-tier-group .calc-tier-btn');

  tierBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tierBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentTier = btn.getAttribute('data-tier');
      updateCalculator();
    });
  });

  updateCalculator();
}

function updateCalculator() {
  const tier = buildTierData[currentTier];
  if (!tier) return;

  const upfrontEl = document.getElementById('calc-upfront');
  const upfrontDescEl = document.getElementById('calc-upfront-desc');
  const stackedEl = document.getElementById('calc-stacked-val');
  const listEl = document.getElementById('calc-deliverables-list');
  const leadsEl = document.getElementById('calc-leads-num');
  const hoursEl = document.getElementById('calc-hours-saved');
  const liftEl = document.getElementById('calc-conv-lift');

  if (upfrontEl) upfrontEl.textContent = tier.upfrontTitle;
  if (upfrontDescEl) upfrontDescEl.textContent = tier.upfrontDesc;
  if (stackedEl) stackedEl.textContent = tier.assetClass;

  if (listEl) {
    listEl.innerHTML = `
      <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> <span><strong>Page Scope:</strong> ${tier.pages}</span></li>
      <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> <span><strong>Integrations:</strong> ${tier.integrations}</span></li>
      <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> <span><strong>Search Visibility:</strong> ${tier.seo}</span></li>
      <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> <span><strong>Hosting &amp; Security:</strong> ${tier.hosting}</span></li>
    `;
  }

  if (leadsEl) leadsEl.textContent = tier.leads;
  if (hoursEl) hoursEl.textContent = tier.hours;
  if (liftEl) liftEl.textContent = tier.lift;

  const ctaBtn = document.getElementById('calc-cta-btn');
  if (ctaBtn) {
    const msg = `Hi Apex Digital SA, I reviewed your website packages and would like to claim the blueprint:
- Build Tier: ${tier.upfrontTitle} (${tier.upfrontDesc})
- Asset Scope: ${tier.assetClass}
- Deliverables: ${tier.pages}
- Estimated Leads: ${tier.leads}
- Expected Conversion Lift: ${tier.lift}`;
    ctaBtn.href = `https://wa.me/27695224226?text=${encodeURIComponent(msg)}`;
  }
}

/* ==========================================================================
   6. SCROLL PROGRESS INDICATOR
   ========================================================================== */
function initScrollProgress() {
  const progress = document.getElementById('scroll-progress');
  if (!progress) return;

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const currentProgress = (window.scrollY / totalHeight) * 100;
    progress.style.width = `${currentProgress}%`;
  });
}

/* ==========================================================================
   7. INTERACTIVE 3D TILT CARDS
   ========================================================================== */
function init3DTiltCards() {
  const cards = document.querySelectorAll('.capability-card, .impact-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });
}

/* ==========================================================================
   8. NAVBAR SCROLL GLASS EFFECT
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/* ==========================================================================
   9. INTERACTIVE WEBSITE ARCHITECTURE TAB SWITCHER
   ========================================================================== */
const archData = {
  web: {
    title: "Custom Code Architecture",
    desc: "Bespoke frontend engines built directly in modern HTML5, CSS3, and JavaScript that deliver zero visual glitches, sub-0.4s rendering, and native search schema markup.",
    features: [
      "Custom code execution (Zero slow CMS plugin dependencies)",
      "Sub-Second speed & automated image optimization",
      "POPIA privacy protocols & cookie consent management"
    ],
    visual: [
      { title: "Ultra-Fast Edge Hosting", val: "Global CDN // <15ms", highlight: true },
      { title: "Instant Page Cache", val: "Pre-Rendered Delivery", highlight: false },
      { title: "Google Search Schema", val: "Rich Snippets Enabled", highlight: false },
      { title: "Direct Lead & CRM Routing", val: "Instant Notifications", highlight: true }
    ]
  },
  cms: {
    title: "Custom Web Application & Web App Architecture",
    desc: "Bespoke web applications, interactive portals, and SaaS MVP engines engineered with serverless APIs, custom databases, and high-throughput workflows.",
    features: [
      "Custom serverless API & database architecture integration",
      "Interactive calculation tools & client portal workflows",
      "Scalable SaaS MVP framework & zero-vendor-lock codebase"
    ],
    visual: [
      { title: "Custom Web App Engine", val: "Serverless Execution", highlight: true },
      { title: "API & Database Sync", val: "Real-time Data Flow", highlight: false },
      { title: "Interactive UI Portal", val: "High-Touch Conversion", highlight: true },
      { title: "POPIA Privacy Shield", val: "Encrypted Storage", highlight: false }
    ]
  },
  ecom: {
    title: "Transactional E-Commerce Architecture",
    desc: "High-conversion commerce engines configured for local and international retail with PayFast/Yoco payment gateways, automated courier shipping, and abandoned cart recovery.",
    features: [
      "PayFast & Yoco South African payment clearing gateway integration",
      "Automated courier shipping rates & weight calculation",
      "Automated abandoned cart conversion recovery"
    ],
    visual: [
      { title: "High-Velocity Catalog", val: "Dynamic Filtering", highlight: true },
      { title: "PayFast / Yoco Gateway", val: "Encrypted Transaction", highlight: true },
      { title: "Courier Integration", val: "Live Express Line Sync", highlight: false },
      { title: "Cart Recovery Engine", val: "Automated Follow-Up", highlight: true }
    ]
  }
};

function switchTab(key, evt) {
  const data = archData[key];
  if (!data) return;

  const btns = document.querySelectorAll('.arch-tab-btn');
  btns.forEach(b => b.classList.remove('active'));
  if (evt && evt.target) {
    evt.target.classList.add('active');
  }

  document.getElementById('arch-title').textContent = data.title;
  document.getElementById('arch-desc').textContent = data.desc;

  const featuresList = document.getElementById('arch-features');
  featuresList.innerHTML = data.features.map(f => `
    <li class="arch-feature-item">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
      <span>${f}</span>
    </li>
  `).join('');

  const visualBox = document.getElementById('arch-visual');
  visualBox.innerHTML = data.visual.map(n => `
    <div class="flow-node ${n.highlight ? 'highlight' : ''}">
      <span class="node-title">${n.title}</span>
      <span class="node-val">${n.val}</span>
    </div>
  `).join('');
}

function switchServiceTab(tabId, evt) {
  const tabs = document.querySelectorAll('.service-tab-btn');
  const panels = document.querySelectorAll('.services-tab-panel');

  tabs.forEach(tab => tab.classList.remove('active'));
  panels.forEach(panel => {
    panel.classList.remove('active');
    panel.style.display = 'none';
  });

  if (evt && evt.currentTarget) {
    evt.currentTarget.classList.add('active');
  }

  const targetPanel = document.getElementById(tabId);
  if (targetPanel) {
    targetPanel.style.display = 'block';
    setTimeout(() => {
      targetPanel.classList.add('active');
    }, 10);
  }
}

/* ==========================================================================
   10. MODAL CONTROLS & FORMSUBMIT MAIL SERVICE INTEGRATION
   ========================================================================== */
const FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/ajax/apexdigtl@gmail.com';

function openModal() {
  const modal = document.getElementById('modal');
  if (modal) modal.classList.add('active');
}

function closeModal() {
  const modal = document.getElementById('modal');
  if (modal) modal.classList.remove('active');
}

function openLegalModal(tabId = 'popia') {
  const modal = document.getElementById('legal-modal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    switchLegalTab(tabId);
  }
}

function closeLegalModal() {
  const modal = document.getElementById('legal-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function switchLegalTab(tabId) {
  const tabs = document.querySelectorAll('.legal-tab-btn');
  const contents = document.querySelectorAll('.legal-tab-content');

  tabs.forEach(tab => {
    if (tab.dataset.tab === tabId) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });

  contents.forEach(content => {
    if (content.id === `legal-tab-${tabId}`) {
      content.classList.add('active');
    } else {
      content.classList.remove('active');
    }
  });
}

// Global window mappings
window.openLegalModal = openLegalModal;
window.closeLegalModal = closeLegalModal;
window.switchLegalTab = switchLegalTab;

// Close modals when clicking backdrop or pressing Escape key
document.addEventListener('click', (e) => {
  const legalModal = document.getElementById('legal-modal');
  if (legalModal && e.target === legalModal) {
    closeLegalModal();
  }
  const modal = document.getElementById('modal');
  if (modal && e.target === modal) {
    closeModal();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLegalModal();
    closeModal();
  }
});

async function handleFormSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const submitBtn = document.getElementById('intake-submit-btn');
  const statusDiv = document.getElementById('intake-form-status');
  const originalBtnText = submitBtn ? submitBtn.innerText : 'Submit Website Intake Protocol';

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerText = 'Transmitting Protocol...';
  }

  if (statusDiv) {
    statusDiv.style.display = 'block';
    statusDiv.style.backgroundColor = 'rgba(212, 175, 55, 0.1)';
    statusDiv.style.color = '#dfc38a';
    statusDiv.style.border = '1px solid rgba(212, 175, 55, 0.3)';
    statusDiv.innerText = 'Submitting requirements to Apex Digital SA...';
  }

  try {
    const formData = new FormData(form);
    const payload = {};
    formData.forEach((value, key) => { payload[key] = value; });

    const response = await fetch(FORMSUBMIT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json().catch(() => ({}));

    if (response.ok || result.success === "true" || result.success === true) {
      if (statusDiv) {
        statusDiv.style.backgroundColor = 'rgba(40, 167, 69, 0.15)';
        statusDiv.style.color = '#2ecc71';
        statusDiv.style.border = '1px solid rgba(46, 204, 113, 0.4)';
        statusDiv.innerText = '✓ Protocol Received! An Apex Systems Engineer will contact you at apexdigtl@gmail.com within 4 business hours.';
      }
      form.reset();
    } else {
      throw new Error(result.message || 'Submission failed');
    }
  } catch (err) {
    console.error('FormSubmit Error:', err);
    if (statusDiv) {
      statusDiv.style.backgroundColor = 'rgba(220, 53, 69, 0.15)';
      statusDiv.style.color = '#e74c3c';
      statusDiv.style.border = '1px solid rgba(231, 76, 60, 0.4)';
      statusDiv.innerText = '⚠️ Transmission note: If this is your first submission, please confirm FormSubmit activation at apexdigtl@gmail.com, or reach out via WhatsApp at +27 69 522 4226.';
    }
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerText = originalBtnText;
    }
  }
}

async function handleModalSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const submitBtn = document.getElementById('modal-submit-btn');
  const statusDiv = document.getElementById('modal-form-status');
  const originalBtnText = submitBtn ? submitBtn.innerText : 'Request Free Consultation & Demo Website';

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerText = 'Submitting Request...';
  }

  if (statusDiv) {
    statusDiv.style.display = 'block';
    statusDiv.style.backgroundColor = 'rgba(212, 175, 55, 0.1)';
    statusDiv.style.color = '#dfc38a';
    statusDiv.style.border = '1px solid rgba(212, 175, 55, 0.3)';
    statusDiv.innerText = 'Requesting free consultation & demo website...';
  }

  try {
    const formData = new FormData(form);
    const payload = {};
    formData.forEach((value, key) => { payload[key] = value; });

    const response = await fetch(FORMSUBMIT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json().catch(() => ({}));

    if (response.ok || result.success === "true" || result.success === true) {
      if (statusDiv) {
        statusDiv.style.backgroundColor = 'rgba(40, 167, 69, 0.15)';
        statusDiv.style.color = '#2ecc71';
        statusDiv.style.border = '1px solid rgba(46, 204, 113, 0.4)';
        statusDiv.innerText = '✓ Demo Request Received! We will contact you immediately.';
      }
      form.reset();
      setTimeout(() => {
        closeModal();
        if (statusDiv) statusDiv.style.display = 'none';
      }, 2500);
    } else {
      throw new Error(result.message || 'Submission failed');
    }
  } catch (err) {
    console.error('FormSubmit Modal Error:', err);
    if (statusDiv) {
      statusDiv.style.backgroundColor = 'rgba(220, 53, 69, 0.15)';
      statusDiv.style.color = '#e74c3c';
      statusDiv.style.border = '1px solid rgba(231, 76, 60, 0.4)';
      statusDiv.innerText = '⚠️ Request note: Please confirm FormSubmit activation at apexdigtl@gmail.com if needed, or reach out via WhatsApp at +27 69 522 4226.';
    }
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerText = originalBtnText;
    }
  }
}

/* ==========================================================================
   11. STAGGERED SCROLL REVEAL OBSERVER
   ========================================================================== */
function initIntersectionObserver() {
  const cards = document.querySelectorAll('.capability-card, .impact-card, .strategy-card, .simulator-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(card);
  });
}

/* ==========================================================================
   12. APEX RESULTS-FOCUSED RAG CHATBOT UI CONTROLLER
   ========================================================================== */
function initChatbotWidget() {
  const trigger = document.getElementById('chatbot-trigger');
  const windowEl = document.getElementById('chatbot-window');
  const closeBtn = document.getElementById('chatbot-close');
  const messagesEl = document.getElementById('chat-messages');
  const promptsEl = document.getElementById('chat-quick-prompts');
  const formEl = document.getElementById('chat-form');
  const inputEl = document.getElementById('chat-input');

  if (!trigger || !windowEl) return;

  // Global Fail-Safe Toggle Function
  window.toggleChatbotWindow = function() {
    const isHidden = windowEl.classList.contains('hidden');
    if (isHidden) {
      windowEl.classList.remove('hidden');
      if (inputEl) inputEl.focus();
    } else {
      windowEl.classList.add('hidden');
    }
  };

  // Toggle Chat Visibility
  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    window.toggleChatbotWindow();
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      windowEl.classList.add('hidden');
    });
  }

  let llmEngineInstance = null;
  function getLLMEngine() {
    if (!llmEngineInstance) {
      if (window.ApexLLMEngine) {
        llmEngineInstance = new window.ApexLLMEngine(window.APEX_KB_CORPUS);
      } else if (window.ApexRAGEngine) {
        llmEngineInstance = new window.ApexRAGEngine(window.APEX_KB_CORPUS);
      }
    }
    return llmEngineInstance;
  }

  // Populate Quick Prompts with SVG Vectors (NO EMOJIS)
  if (promptsEl && window.APEX_QUICK_PROMPTS) {
    promptsEl.innerHTML = window.APEX_QUICK_PROMPTS.map(p => `
      <button class="prompt-chip" data-query="${p.query}">
        ${p.iconSvg || ''}
        <span>${p.label}</span>
      </button>
    `).join('');

    promptsEl.querySelectorAll('.prompt-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const queryText = chip.getAttribute('data-query');
        submitUserQuery(queryText);
      });
    });

    // Enable Mouse Wheel Horizontal Scrolling
    promptsEl.addEventListener('wheel', (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        promptsEl.scrollLeft += e.deltaY;
      }
    }, { passive: false });

    // Enable Click & Drag Physics for Mouse Users
    let isDown = false;
    let startX;
    let scrollLeftPos;

    promptsEl.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - promptsEl.offsetLeft;
      scrollLeftPos = promptsEl.scrollLeft;
      promptsEl.style.cursor = 'grabbing';
    });

    promptsEl.addEventListener('mouseleave', () => {
      isDown = false;
      promptsEl.style.cursor = 'default';
    });

    promptsEl.addEventListener('mouseup', () => {
      isDown = false;
      promptsEl.style.cursor = 'default';
    });

    promptsEl.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - promptsEl.offsetLeft;
      const walk = (x - startX) * 2;
      promptsEl.scrollLeft = scrollLeftPos - walk;
    });
  }

  // Submit Handler
  if (formEl) {
    formEl.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = inputEl ? inputEl.value.trim() : '';
      if (!val) return;
      submitUserQuery(val);
      if (inputEl) inputEl.value = '';
    });
  }

  async function submitUserQuery(userText) {
    // Append User Message
    appendMessage(userText, 'user');

    // Show Typing Indicator
    showTypingIndicator();

    try {
      const engine = getLLMEngine();
      let answer;
      if (engine) {
        answer = await engine.query(userText);
      } else {
        answer = {
          title: "Apex Digital Web Architecture & Growth",
          text: "Welcome to Apex Digital SA! How can we assist with your web build or software project today?",
          cta: { text: "Claim Free Demo Website", action: "openModal" }
        };
      }
      removeTypingIndicator();
      appendBotMessage(answer);
    } catch (error) {
      console.error("Chat error:", error);
      removeTypingIndicator();
      appendBotMessage({
        title: "Connection Error",
        text: "Apologies, our AI solutions architect is briefly offline. Please try again or click below to contact us directly.",
        cta: { text: "Contact Apex Team", action: "openModal" }
      });
    }
  }

  function appendMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender}-message`;
    msgDiv.innerHTML = `<div class="message-content"><p>${escapeHtml(text)}</p></div>`;
    messagesEl.appendChild(msgDiv);
    scrollToBottom();
  }

  function appendBotMessage(answer) {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'message bot-message';

    let formattedText = formatMarkdown(answer.text);
    let ctaHtml = '';
    if (answer.cta) {
      ctaHtml = `<button class="chat-cta-btn" onclick="handleChatCTA('${answer.cta.action}')">
        ${escapeHtml(answer.cta.text)}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </button>`;
    }

    msgDiv.innerHTML = `
      <div class="message-content">
        ${answer.title ? `<p class="msg-title">${escapeHtml(answer.title)}</p>` : ''}
        ${formattedText}
        ${ctaHtml}
      </div>
    `;

    messagesEl.appendChild(msgDiv);
    scrollToMessageTop(msgDiv);
  }

  function showTypingIndicator() {
    removeTypingIndicator();
    const typingDiv = document.createElement('div');
    typingDiv.id = 'chat-typing';
    typingDiv.className = 'message bot-message';
    typingDiv.innerHTML = `
      <div class="typing-indicator">
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
      </div>
    `;
    messagesEl.appendChild(typingDiv);
    scrollToBottom();
  }

  function removeTypingIndicator() {
    const existing = document.getElementById('chat-typing');
    if (existing) existing.remove();
  }

  function scrollToBottom() {
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function scrollToMessageTop(msgEl) {
    if (!msgEl || !messagesEl) return;
    const msgRect = msgEl.getBoundingClientRect();
    const containerRect = messagesEl.getBoundingClientRect();
    const relativeTop = msgRect.top - containerRect.top + messagesEl.scrollTop - 12;
    messagesEl.scrollTo({
      top: Math.max(0, relativeTop),
      behavior: 'smooth'
    });
  }

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, function(m) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
    });
  }

  function formatMarkdown(txt) {
    if (!txt) return '';
    let html = escapeHtml(txt);

    // Markdown Links [Text](URL)
    html = html.replace(/\[(.*?)\]\((https?:\/\/.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="chat-link">$1</a>');

    // Subheadings ### Header and ## Header
    html = html.replace(/^### (.*$)/gim, '<h4>$1</h4>');
    html = html.replace(/^## (.*$)/gim, '<h3>$1</h3>');

    // Bold text **word**
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Clean up any remaining orphaned double asterisks
    html = html.replace(/\*\*/g, '');

    const lines = html.split('\n');
    let inList = false;
    let listType = null;
    let result = [];

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      let trimmed = line.trim();

      if (!trimmed) {
        // Lookahead to see if next non-empty line is a list item of the same list
        let nextNonEmpty = null;
        for (let j = i + 1; j < lines.length; j++) {
          if (lines[j].trim()) {
            nextNonEmpty = lines[j].trim();
            break;
          }
        }
        
        if (inList && nextNonEmpty) {
          const isNextUl = /^[-*•]\s/.test(nextNonEmpty);
          const isNextOl = /^\d+[\.\)]\s/.test(nextNonEmpty);
          if ((listType === 'ul' && isNextUl) || (listType === 'ol' && isNextOl)) {
            // Keep list open, skip empty line
            continue;
          }
        }

        if (inList) {
          result.push(listType === 'ul' ? '</ul>' : '</ol>');
          inList = false;
          listType = null;
        }
        continue;
      }

      // Check for headings
      if (trimmed.startsWith('<h3>') || trimmed.startsWith('<h4>')) {
        if (inList) {
          result.push(listType === 'ul' ? '</ul>' : '</ol>');
          inList = false;
          listType = null;
        }
        result.push(trimmed);
        continue;
      }

      const isUl = /^[-*•]\s/.test(trimmed);
      const isOl = /^\d+[\.\)]\s/.test(trimmed);

      if (isUl || isOl) {
        const currentType = isUl ? 'ul' : 'ol';
        if (!inList || listType !== currentType) {
          if (inList) {
            result.push(listType === 'ul' ? '</ul>' : '</ol>');
          }
          result.push(currentType === 'ul' ? '<ul>' : '<ol>');
          inList = true;
          listType = currentType;
        }

        let content = isUl 
          ? trimmed.replace(/^[-*•]\s/, '').trim() 
          : trimmed.replace(/^\d+[\.\)]\s/, '').trim();

        result.push(`<li>${content}</li>`);
      } else {
        if (inList) {
          // If sub-description under existing list item, append inside previous <li>
          if (result.length > 0 && result[result.length - 1].endsWith('</li>')) {
            let lastLi = result.pop();
            lastLi = lastLi.substring(0, lastLi.length - 5);
            lastLi += `<div class="chat-subtext">${trimmed}</div></li>`;
            result.push(lastLi);
            continue;
          } else {
            result.push(listType === 'ul' ? '</ul>' : '</ol>');
            inList = false;
            listType = null;
          }
        }

        result.push(`<p>${trimmed}</p>`);
      }
    }

    if (inList) {
      result.push(listType === 'ul' ? '</ul>' : '</ol>');
    }

    return result.join('');
  }
}

// Global Chat CTA Trigger Handler
window.handleChatCTA = function(action) {
  if (!action) return;

  if (action === 'openModal') {
    if (typeof openModal === 'function') openModal();
  } else if (action === 'openWhatsApp') {
    window.open('https://wa.me/27695224226', '_blank', 'noopener,noreferrer');
  } else if (action.startsWith('scrollSection:')) {
    const targetId = action.replace('scrollSection:', '');
    const el = document.getElementById(targetId);
    if (el) {
      const chatbotWin = document.getElementById('chatbot-window');
      if (chatbotWin && window.innerWidth <= 768) {
        chatbotWin.classList.add('hidden');
      }
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  } else if (action === 'scrollSimulator') {
    const el = document.getElementById('simulator');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    const el = document.getElementById(action);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

/* ==========================================================================
   13. PORTFOLIO FLOATING MEDIA HOVER PREVIEWS (SPRING LERP PHYSICS)
   ========================================================================== */
function initWorkPreviews() {
  const preview = document.getElementById('portfolio-hover-preview');
  const img = document.getElementById('hover-preview-img');
  const items = document.querySelectorAll('.work-list-item');
  if (!preview || !img || items.length === 0) return;
  
  let targetX = 0, targetY = 0;
  let currentX = 0, currentY = 0;
  let isHovered = false;
  
  window.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  });
  
  function tick() {
    if (isHovered) {
      const lerpFactor = 0.15;
      currentX += (targetX - currentX) * lerpFactor;
      currentY += (targetY - currentY) * lerpFactor;
      
      preview.style.left = `${currentX + 24}px`;
      preview.style.top = `${currentY + 24}px`;
    }
    requestAnimationFrame(tick);
  }
  tick();
  
  items.forEach(item => {
    const previewSrc = item.getAttribute('data-preview');
    if (!previewSrc) return;
    
    item.addEventListener('mouseenter', () => {
      img.src = previewSrc;
      preview.classList.add('active');
      isHovered = true;
    });
    
    item.addEventListener('mouseleave', () => {
      preview.classList.remove('active');
      isHovered = false;
    });
  });
}

/* ==========================================================================
   14. INTERACTIVE LIVE MOBILE UX & CONVERSION AUDIT ENGINE
   ========================================================================== */
let currentDigitalStatus = 'no-website'; // 'no-website' or 'outdated-website'
let currentSimMode = 'b2b';
let currentSelectedSpeed = 3.5;

window.setDigitalStatus = function(status) {
  currentDigitalStatus = status;
  const noSiteBtn = document.getElementById('status-no-site');
  const oldSiteBtn = document.getElementById('status-old-site');
  const speedGroup = document.getElementById('speed-control-group');
  
  if (noSiteBtn) noSiteBtn.classList.toggle('active', status === 'no-website');
  if (oldSiteBtn) oldSiteBtn.classList.toggle('active', status === 'outdated-website');
  
  if (speedGroup) {
    speedGroup.style.display = status === 'no-website' ? 'none' : 'block';
  }
  
  const demandLabel = document.getElementById('demand-label');
  const inputTitle = document.getElementById('input-title');
  const inputDesc = document.getElementById('input-desc');
  const scorecardTitle = document.getElementById('scorecard-title');
  const metricLabel = document.getElementById('scorecard-metric-label');
  const citationText = document.getElementById('citation-text');
  const ctaBtn = document.getElementById('sim-cta-btn');
  
  if (status === 'no-website') {
    if (demandLabel) demandLabel.innerText = "Monthly Local Industry Searches";
    if (inputTitle) inputTitle.innerText = "1. Local Search Demand & Contract Value";
    if (inputDesc) inputDesc.innerText = "Adjust local monthly search volume and deal size to calculate lost revenue handed to competitors.";
    if (scorecardTitle) scorecardTitle.innerText = "2. Competitor Market Leakage Scorecard";
    if (metricLabel) metricLabel.innerText = "ESTIMATED REVENUE HANDED TO COMPETITORS EVERY MONTH";
    if (citationText) citationText.innerHTML = "Calculations based on BrightLocal 2024 Study (81% of buyers research online before hiring) &amp; Google Local Search Intent Data (62% of clicks go to top local websites).";
    if (ctaBtn) ctaBtn.innerHTML = "CAPTURE YOUR LOCAL MARKET REVENUE &rarr;";
  } else {
    if (demandLabel) demandLabel.innerText = "Monthly Website Visitors";
    if (inputTitle) inputTitle.innerText = "1. Business Metrics &amp; Speed Profile";
    if (inputDesc) inputDesc.innerText = "Adjust your monthly traffic, deal size, and estimated load time to analyze your current revenue tax.";
    if (scorecardTitle) scorecardTitle.innerText = "2. Financial Revenue Latency Tax";
    if (metricLabel) metricLabel.innerText = "ESTIMATED MONTHLY LEAKED REVENUE";
    if (citationText) citationText.innerHTML = "Calculations based on Deloitte Digital's <em>'Milliseconds Make Millions'</em> study (10.1% B2B lead loss per 0.1s delay) and Google Consumer Insights.";
    if (ctaBtn) ctaBtn.innerHTML = "ELIMINATE REVENUE LATENCY TAX &rarr;";
  }
  
  window.updateRevenueSimulator();
};

window.setSimulatorMode = function(mode) {
  currentSimMode = mode;
  const b2bBtn = document.getElementById('sim-mode-b2b');
  const b2cBtn = document.getElementById('sim-mode-b2c');
  if (b2bBtn) b2bBtn.classList.toggle('active', mode === 'b2b');
  if (b2cBtn) b2cBtn.classList.toggle('active', mode === 'b2c');
  
  const valueLabel = document.getElementById('value-label');
  const valueSlider = document.getElementById('sim-value');
  
  if (valueLabel && valueSlider) {
    if (mode === 'b2b') {
      valueLabel.innerText = "Average Client / Deal Value (ZAR)";
      valueSlider.min = 1500;
      valueSlider.max = 150000;
      valueSlider.step = 1000;
      valueSlider.value = 15000;
    } else {
      valueLabel.innerText = "Average Order / Transaction Value (ZAR)";
      valueSlider.min = 150;
      valueSlider.max = 15000;
      valueSlider.step = 100;
      valueSlider.value = 1200;
    }
  }
  
  window.updateRevenueSimulator();
};

window.setSpeedTier = function(button, speed) {
  document.querySelectorAll('.sim-speed-btn').forEach(btn => btn.classList.remove('active'));
  if (button) button.classList.add('active');
  currentSelectedSpeed = parseFloat(speed);
  window.updateRevenueSimulator();
};

window.updateRevenueSimulator = function() {
  const trafficEl = document.getElementById('sim-traffic');
  const valueEl = document.getElementById('sim-value');
  if (!trafficEl || !valueEl) return;
  
  const traffic = parseInt(trafficEl.value, 10);
  const dealValue = parseInt(valueEl.value, 10);
  
  const trafficBadge = document.getElementById('traffic-badge');
  const valueBadge = document.getElementById('value-badge');
  if (trafficBadge) trafficBadge.innerText = traffic.toLocaleString() + " / mo";
  if (valueBadge) valueBadge.innerText = "R " + dealValue.toLocaleString();
  
  let monthlyLoss = 0;
  let currentCaptureRate = 0;
  let apexTargetRate = 0.15; // 15% target market capture
  
  if (currentDigitalStatus === 'no-website') {
    // 81% of buyers search online (BrightLocal)
    const activeOnlineBuyers = traffic * 0.81;
    // Top 3 websites capture ~62% of traffic, producing 15% lead conversions
    const competitorCapturedLeads = activeOnlineBuyers * apexTargetRate;
    
    monthlyLoss = Math.round(competitorCapturedLeads * dealValue);
    currentCaptureRate = 0.0;
  } else {
    // Outdated Website Mode
    const baseRate = currentSimMode === 'b2b' ? 0.0235 : 0.0182;
    apexTargetRate = baseRate * 1.6;
    
    let latencyPenalty = 0.45;
    if (currentSelectedSpeed <= 1.5) latencyPenalty = 0.0;
    else if (currentSelectedSpeed <= 3.5) latencyPenalty = 0.45;
    else if (currentSelectedSpeed <= 5.0) latencyPenalty = 0.65;
    else latencyPenalty = 0.82;
    
    currentCaptureRate = baseRate * (1 - latencyPenalty);
    const lostConversions = Math.max(0, (traffic * apexTargetRate) - (traffic * currentCaptureRate));
    monthlyLoss = Math.round(lostConversions * dealValue);
  }
  
  const annualLoss = monthlyLoss * 12;
  
  const monthlyLossDisplay = document.getElementById('monthly-loss-display');
  const annualLossDisplay = document.getElementById('annual-loss-display');
  if (monthlyLossDisplay) {
    monthlyLossDisplay.innerHTML = `R ${monthlyLoss.toLocaleString()} <span class="monthly-loss-sub">/ mo</span>`;
  }
  if (annualLossDisplay) {
    annualLossDisplay.innerText = `R ${annualLoss.toLocaleString()} / yr`;
  }
  
  const currentConvLabel = document.getElementById('current-conv-label');
  const currentConvEl = document.getElementById('current-conv-rate');
  const apexConvEl = document.getElementById('apex-conv-rate');
  const currentBar = document.getElementById('current-bar');
  
  if (currentDigitalStatus === 'no-website') {
    if (currentConvLabel) currentConvLabel.innerText = "Current Search Capture Rate:";
    if (currentConvEl) currentConvEl.innerText = "0.0% (Invisible)";
    if (apexConvEl) apexConvEl.innerText = "15.0% (Market Leader)";
    if (currentBar) currentBar.style.width = "0%";
  } else {
    if (currentConvLabel) currentConvLabel.innerText = "Current Estimated Conversion Rate:";
    if (currentConvEl) currentConvEl.innerText = (currentCaptureRate * 100).toFixed(2) + "%";
    if (apexConvEl) apexConvEl.innerText = (apexTargetRate * 100).toFixed(2) + "%";
    if (currentBar) {
      const barPercent = Math.max(10, Math.min(100, (currentCaptureRate / apexTargetRate) * 100));
      currentBar.style.width = barPercent + "%";
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('sim-traffic')) {
    window.setDigitalStatus('no-website');
  }
});

/* ==========================================================================
   15. HIGH-CONVERTING FAQ ACCORDION TRIGGER
   ========================================================================== */
window.toggleFaq = function(e) {
  const trigger = e.currentTarget;
  const item = trigger.closest('.faq-item');
  if (!item) return;
  
  const isActive = item.classList.contains('active');
  
  // Close all other items
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
  
  if (!isActive) {
    item.classList.add('active');
  }
};

/* ==========================================================================
   16. INTERACTIVE ECOSYSTEM NODE NETWORK CANVAS ENGINE
   ========================================================================== */
function initEcosystemCanvas() {
  const container = document.getElementById('ecosystem-canvas-card');
  const canvas = document.getElementById('ecosystem-canvas');
  if (!container || !canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height, centerX, centerY;
  let mouseX = 0, mouseY = 0;
  let isHovered = false;

  const tagTL = document.getElementById('node-tag-tl');
  const tagTR = document.getElementById('node-tag-tr');
  const tagBL = document.getElementById('node-tag-bl');
  const tagBR = document.getElementById('node-tag-br');

  function resize() {
    width = canvas.width = container.clientWidth;
    height = canvas.height = container.clientHeight;
    centerX = width / 2;
    centerY = height / 2;
  }
  resize();
  window.addEventListener('resize', resize);

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    mouseX = e.clientX - rect.left - centerX;
    mouseY = e.clientY - rect.top - centerY;
    isHovered = true;
  });

  container.addEventListener('mouseleave', () => {
    isHovered = false;
  });

  // Calculate 4 Aspect Target Anchor Coordinates relative to canvas
  function getTagCenter(el, fallbackX, fallbackY) {
    if (!el) return { x: fallbackX, y: fallbackY };
    const rect = el.getBoundingClientRect();
    const cRect = container.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2 - cRect.left,
      y: rect.top + rect.height / 2 - cRect.top
    };
  }

  // Energy Photons Traveling along 4 Fixed Aspect Beams
  const photonCountPerBeam = 3;
  const beamPhotons = [0, 1, 2, 3].map(() => {
    const arr = [];
    for (let p = 0; p < photonCountPerBeam; p++) {
      arr.push({
        progress: (p / photonCountPerBeam) + Math.random() * 0.2,
        speed: 0.003 + Math.random() * 0.003,
        pulse: Math.random() * Math.PI * 2
      });
    }
    return arr;
  });

  // Orbiting Grid Web Particles
  const nodeCount = 28;
  const orbitNodes = [];
  for (let i = 0; i < nodeCount; i++) {
    const angle = (Math.PI * 2 / nodeCount) * i + (Math.random() * 0.4);
    const distance = 60 + Math.random() * (Math.min(width, height) * 0.36);
    orbitNodes.push({
      angle: angle,
      distance: distance,
      radius: 1.5 + Math.random() * 2,
      speed: (0.0015 + Math.random() * 0.003) * (i % 2 === 0 ? 1 : -1),
      pulse: Math.random() * Math.PI * 2
    });
  }

  function render() {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';

    // Dynamic theme colors
    const bgFill = isLight ? '#FFFFFF' : '#000000';
    const ringStroke = isLight ? 'rgba(184, 146, 85, ' : 'rgba(223, 195, 138, ';
    const beamPrimary = isLight ? 'rgba(184, 146, 85, 0.65)' : 'rgba(223, 195, 138, 0.45)';
    const photonFill = isLight ? '#6D5422' : '#FFF2D4';
    const shadowColor = isLight ? '#b89655' : '#dfc38a';

    // Canvas background clearing
    ctx.fillStyle = bgFill;
    ctx.fillRect(0, 0, width, height);

    // Mouse parallax offsets
    const targetOffsetX = isHovered ? mouseX * 0.08 : 0;
    const targetOffsetY = isHovered ? mouseY * 0.08 : 0;

    const currentCenterX = centerX + targetOffsetX * 0.2;
    const currentCenterY = centerY + targetOffsetY * 0.2;

    // Get live positions of 4 Aspect Tags
    const aspectTargets = [
      getTagCenter(tagTL, width * 0.2, height * 0.2),
      getTagCenter(tagTR, width * 0.8, height * 0.2),
      getTagCenter(tagBL, width * 0.2, height * 0.8),
      getTagCenter(tagBR, width * 0.8, height * 0.8)
    ];

    const time = Date.now() * 0.002;

    // 1. Draw Central Concentric Pulse Aura Rings
    for (let r = 1; r <= 3; r++) {
      const ringRadius = 54 + r * 26 + Math.sin(time + r) * 4;
      ctx.beginPath();
      ctx.arc(currentCenterX, currentCenterY, ringRadius, 0, Math.PI * 2);
      ctx.strokeStyle = `${ringStroke}${0.1 / r})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // 2. Draw Permanent Golden Beams & Traveling Energy Photons to the 4 Fixed Aspects
    const photonCoords = [];

    aspectTargets.forEach((target, bIdx) => {
      // Permanent Primary Connection Vector
      ctx.beginPath();
      ctx.moveTo(currentCenterX, currentCenterY);
      ctx.lineTo(target.x, target.y);
      ctx.strokeStyle = beamPrimary;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Pulsing outer aura line
      ctx.beginPath();
      ctx.moveTo(currentCenterX, currentCenterY);
      ctx.lineTo(target.x, target.y);
      ctx.strokeStyle = isLight ? `rgba(184, 146, 85, ${0.2 + Math.sin(time * 2 + bIdx) * 0.1})` : `rgba(223, 195, 138, ${0.15 + Math.sin(time * 2 + bIdx) * 0.08})`;
      ctx.lineWidth = 3.5;
      ctx.stroke();

      // Animate Traveling Energy Photons Along Vector
      beamPhotons[bIdx].forEach(photon => {
        photon.progress += photon.speed;
        if (photon.progress > 1) photon.progress = 0;
        photon.pulse += 0.04;

        const px = currentCenterX + (target.x - currentCenterX) * photon.progress;
        const py = currentCenterY + (target.y - currentCenterY) * photon.progress;
        photonCoords.push({ x: px, y: py });

        // Draw Photon Energy Bead
        ctx.beginPath();
        ctx.arc(px, py, 3 + Math.sin(photon.pulse) * 1.2, 0, Math.PI * 2);
        ctx.fillStyle = photonFill;
        ctx.shadowBlur = 10;
        ctx.shadowColor = shadowColor;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Target Anchor Node Pulse Dot at the fixed aspect tag end
      ctx.beginPath();
      ctx.arc(target.x, target.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = shadowColor;
      ctx.shadowBlur = 8;
      ctx.shadowColor = shadowColor;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    // 3. Update & Draw Morphing Inter-Node Grid Webs
    orbitNodes.forEach((node, idx) => {
      node.angle += node.speed;
      node.pulse += 0.025;

      const currentDist = node.distance + Math.sin(node.pulse) * 4;
      const nx = currentCenterX + Math.cos(node.angle) * currentDist;
      const ny = currentCenterY + Math.sin(node.angle) * currentDist;

      // Connect morphing nodes to neighboring traveling photons
      photonCoords.forEach(p => {
        const pd = Math.hypot(nx - p.x, ny - p.y);
        if (pd < 75) {
          ctx.beginPath();
          ctx.moveTo(nx, ny);
          ctx.lineTo(p.x, p.y);
          ctx.strokeStyle = `rgba(223, 195, 138, ${0.25 * (1 - pd / 75)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      });

      // Orbiting Node Dot
      ctx.beginPath();
      ctx.arc(nx, ny, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(244, 226, 187, ${0.4 + Math.sin(node.pulse) * 0.3})`;
      ctx.fill();
    });

    requestAnimationFrame(render);
  }
  render();
}


