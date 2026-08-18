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
  initScrollAnimations();
  initChatbotWidget();
  initCalculator();
  initWorkPreviews();

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

  if (theme === 'light') {
    if (navLogo) navLogo.src = 'logo-light.png';
    if (footerLogo) footerLogo.src = 'logo-light.png';
    if (favicon) favicon.href = 'logo-icon-black.png';
    if (triggerLogo) triggerLogo.src = 'logo-icon-black.png';
    if (headerLogo) headerLogo.src = 'logo-icon-black.png';
    if (themeIcon) {
      themeIcon.innerHTML = `<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>`;
    }
  } else {
    if (navLogo) navLogo.src = 'logo-dark.png';
    if (footerLogo) footerLogo.src = 'logo-dark.png';
    if (favicon) favicon.href = 'logo-icon-gold.png';
    if (triggerLogo) triggerLogo.src = 'logo-icon-gold.png';
    if (headerLogo) headerLogo.src = 'logo-icon-gold.png';
    if (themeIcon) {
      themeIcon.innerHTML = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>`;
    }
  }
}

/* ==========================================================================
   3. INFINITE 3D PARAMETRIC LOGO WIREFRAME SHADER WITH ENERGY PHOTONS
   Smooth infinite multi-axis rotation without pulse/beating click artifacts
   ========================================================================== */
function initWireframeCanvas() {
  const canvas = document.getElementById('hero-wireframe-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = canvas.offsetWidth;
  let height = canvas.height = canvas.offsetHeight;

  // Infinite continuous rotation state
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

  // Generate 3D Parametric Mesh Points (Trefoil / Torus Knot)
  const points = [];
  const lines = [];
  const uSteps = 84;
  const vSteps = 16;

  for (let i = 0; i < uSteps; i++) {
    const u = (i / uSteps) * Math.PI * 2;
    const p = 2, q = 3;
    const r = 180 + 40 * Math.cos(q * u);
    const x = r * Math.cos(p * u);
    const y = r * Math.sin(p * u);
    const z = 80 * Math.sin(q * u);

    for (let j = 0; j < vSteps; j++) {
      const v = (j / vSteps) * Math.PI * 2;
      const tubeR = 25;
      const px = x + tubeR * Math.cos(v) * Math.cos(u);
      const py = y + tubeR * Math.cos(v) * Math.sin(u);
      const pz = z + tubeR * Math.sin(v);

      points.push({ x: px, y: py, z: pz });
    }
  }

  for (let i = 0; i < uSteps; i++) {
    for (let j = 0; j < vSteps; j++) {
      const current = i * vSteps + j;
      const nextV = i * vSteps + ((j + 1) % vSteps);
      const nextU = ((i + 1) % uSteps) * vSteps + j;

      lines.push([current, nextV]);
      lines.push([current, nextU]);
    }
  }

  // Energy Photon Particles traveling continuously along the 3D curves
  const photons = [];
  for (let p = 0; p < 20; p++) {
    photons.push({
      progress: (p / 20) * Math.PI * 2,
      speed: 0.005 + Math.random() * 0.003,
      vOffset: (Math.floor(Math.random() * 16) / 16) * Math.PI * 2
    });
  }

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

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Continuous Infinite Multi-Axis Rotation
    angleY += 0.005; // Primary smooth Y spin
    angleX += 0.002; // Secondary pitch tilt
    angleZ += 0.001; // Subtle roll

    // Eased mouse parallax tracking
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    const renderAngleX = angleX + mouseY;
    const renderAngleY = angleY + mouseX;
    const renderAngleZ = angleZ;

    const centerX = width * 0.55;
    const centerY = height * 0.48;
    const fov = 450;

    const projectedPoints = points.map(pt => {
      let rPt = rotateX(pt, renderAngleX);
      rPt = rotateY(rPt, renderAngleY);
      rPt = rotateZ(rPt, renderAngleZ);

      const scale = fov / (fov + rPt.z + 300);
      return {
        x: centerX + rPt.x * scale,
        y: centerY + rPt.y * scale,
        z: rPt.z,
        scale: scale
      };
    });

    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const strokeColor = currentTheme === 'light' ? 'rgba(184, 146, 85, ' : 'rgba(223, 195, 138, ';

    // Draw 3D Wireframe Mesh Lines
    ctx.lineWidth = 0.65;
    for (let i = 0; i < lines.length; i++) {
      const p1 = projectedPoints[lines[i][0]];
      const p2 = projectedPoints[lines[i][1]];

      const depthAlpha = Math.max(0.08, Math.min(0.65, (p1.z + 200) / 400));
      
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.strokeStyle = strokeColor + depthAlpha + ')';
      ctx.stroke();
    }

    // Render Traveling Energy Photons
    photons.forEach(pt => {
      pt.progress += pt.speed;
      if (pt.progress > Math.PI * 2) pt.progress = 0;

      const u = pt.progress;
      const r = 180 + 40 * Math.cos(3 * u);
      const x = r * Math.cos(2 * u);
      const y = r * Math.sin(2 * u);
      const z = 80 * Math.sin(3 * u);

      const tubeR = 25;
      const px = x + tubeR * Math.cos(pt.vOffset) * Math.cos(u);
      const py = y + tubeR * Math.cos(pt.vOffset) * Math.sin(u);
      const pz = z + tubeR * Math.sin(pt.vOffset);

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
    seo: 'Baseline Google Indexing & Technical Hygiene',
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
    seo: 'Baseline SEO + POPIA Privacy Protocols',
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
    seo: 'Bundled Google Search Launchpad + Speed Tuning',
    leads: '+50 to +90',
    hours: '30 Hours',
    lift: '4.8x'
  }
};

const growthPathData = {
  none: {
    monthlyTitle: 'Self-Managed (Independent)',
    support: 'Self-Managed (Independent Hosting)',
    seoPlan: 'None (Baseline Only)'
  },
  essentials: {
    monthlyTitle: 'Essentials Technical Care',
    support: '1 Hour Monthly Dev Time (48h Turnaround)',
    seoPlan: '24/7 Security Shield & Weekly Maintenance'
  },
  visibility: {
    monthlyTitle: 'Visibility Rank Pathway',
    support: '3 Hours Monthly Dev Time (24h Turnaround)',
    seoPlan: 'Includes Homepage Google Search Ranking Campaign'
  },
  partner: {
    monthlyTitle: 'Partner Dominance Pathway',
    support: '6 Hours Priority Dev Time (<10h Turnaround)',
    seoPlan: 'Includes Multi-Page Local Search & Maps Dominance'
  }
};

let currentTier = 'standard';
let currentPath = 'visibility';

function initCalculator() {
  const tierBtns = document.querySelectorAll('#build-tier-group .calc-tier-btn');
  const pathBtns = document.querySelectorAll('#growth-path-group .calc-path-btn');

  tierBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tierBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentTier = btn.getAttribute('data-tier');
      updateCalculator();
    });
  });

  pathBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      pathBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentPath = btn.getAttribute('data-path');
      updateCalculator();
    });
  });

  updateCalculator();
}

function updateCalculator() {
  const tier = buildTierData[currentTier];
  const path = growthPathData[currentPath];
  if (!tier || !path) return;

  const upfrontEl = document.getElementById('calc-upfront');
  const upfrontDescEl = document.getElementById('calc-upfront-desc');
  const monthlyEl = document.getElementById('calc-monthly');
  const stackedEl = document.getElementById('calc-stacked-val');
  const listEl = document.getElementById('calc-deliverables-list');
  const leadsEl = document.getElementById('calc-leads-num');
  const hoursEl = document.getElementById('calc-hours-saved');
  const liftEl = document.getElementById('calc-conv-lift');

  if (upfrontEl) upfrontEl.textContent = tier.upfrontTitle;
  if (upfrontDescEl) upfrontDescEl.textContent = tier.upfrontDesc;
  if (monthlyEl) monthlyEl.textContent = path.monthlyTitle;
  if (stackedEl) stackedEl.textContent = tier.assetClass;

  if (listEl) {
    listEl.innerHTML = `
      <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> <span><strong>Page Scope:</strong> ${tier.pages}</span></li>
      <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> <span><strong>Integrations:</strong> ${tier.integrations}</span></li>
      <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> <span><strong>Google Visibility:</strong> ${path.seoPlan !== 'None (Baseline Only)' ? path.seoPlan : tier.seo}</span></li>
      <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> <span><strong>Developer Support:</strong> ${path.support}</span></li>
    `;
  }

  if (leadsEl) leadsEl.textContent = tier.leads;
  if (hoursEl) hoursEl.textContent = tier.hours;
  if (liftEl) liftEl.textContent = tier.lift;

  const ctaBtn = document.getElementById('calc-cta-btn');
  if (ctaBtn) {
    const msg = `Hi Apex Digital SA, I ran the speed/ROI calculator and would like to claim the package:
- Build Tier: ${tier.upfrontTitle} (${tier.upfrontDesc})
- Asset Class: ${tier.assetClass}
- Growth Pathway: ${path.monthlyTitle}
- Projected Leads: ${tier.leads}
- Staff Admin Saved: ${tier.hours}
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
    title: "Managed Platform Architecture (WordPress High-Speed)",
    desc: "Content management deployments for clients requiring internal content editing control, speed-hardened by Apex Digital to remove slow plugins and eliminate visual glitches.",
    features: [
      "Code hardening & speed optimization array",
      "Deep database query cleaning & caching rules",
      "Full POPIA policy configurations & cookie notice handlers"
    ],
    visual: [
      { title: "High-Speed CMS Engine", val: "Optimized Execution", highlight: true },
      { title: "Code Hardening Array", val: "Bloatware Stripped", highlight: false },
      { title: "Database Query Cache", val: "Sub-50ms Response", highlight: true },
      { title: "POPIA Privacy Shield", val: "Compliant Storage", highlight: false }
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

/* ==========================================================================
   10. MODAL CONTROLS & FORMSUBMIT MAIL SERVICE INTEGRATION
   ========================================================================== */
const FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/ajax/Apexdigtl@gmail.com';

function openModal() {
  const modal = document.getElementById('modal');
  if (modal) modal.classList.add('active');
}

function closeModal() {
  const modal = document.getElementById('modal');
  if (modal) modal.classList.remove('active');
}

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
        statusDiv.innerText = '✓ Protocol Received! An Apex Systems Engineer will contact you within 4 business hours.';
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
      statusDiv.innerText = '⚠️ Transmission delay. Please call or WhatsApp us directly at 069 522 4226.';
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
      statusDiv.innerText = '⚠️ Request delay. Please reach out via WhatsApp at 069 522 4226.';
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

  if (!trigger || !windowEl || (!window.ApexLLMEngine && !window.ApexRAGEngine)) return;

  const llmEngine = window.ApexLLMEngine 
    ? new window.ApexLLMEngine(window.APEX_KB_CORPUS)
    : new window.ApexRAGEngine(window.APEX_KB_CORPUS);

  // Toggle Chat Visibility
  trigger.addEventListener('click', () => {
    windowEl.classList.toggle('hidden');
    if (!windowEl.classList.contains('hidden')) {
      inputEl.focus();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      windowEl.classList.add('hidden');
    });
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
  }

  // Submit Handler
  if (formEl) {
    formEl.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = inputEl.value.trim();
      if (!val) return;
      submitUserQuery(val);
      inputEl.value = '';
    });
  }

  async function submitUserQuery(userText) {
    // Append User Message
    appendMessage(userText, 'user');

    // Show Typing Indicator
    showTypingIndicator();

    try {
      const answer = await llmEngine.query(userText);
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
    scrollToBottom();
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

    // Process lines for lists (- or * or 1.)
    const lines = html.split('\n');
    let inList = false;
    let listType = 'ul';
    let result = [];

    lines.forEach(line => {
      let trimmed = line.trim();

      // Skip heading tags from list paragraph wrapping
      if (trimmed.startsWith('<h3>') || trimmed.startsWith('<h4>')) {
        if (inList) {
          result.push(listType === 'ul' ? '</ul>' : '</ol>');
          inList = false;
        }
        result.push(trimmed);
        return;
      }

      // Check if line is a bullet point (- or * or •)
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ') || trimmed.startsWith('• ')) {
        if (!inList || listType !== 'ul') {
          if (inList) result.push(listType === 'ul' ? '</ul>' : '</ol>');
          result.push('<ul>');
          inList = true;
          listType = 'ul';
        }
        let content = trimmed.substring(2).trim();
        result.push(`<li>${content}</li>`);
      } 
      // Check if line is a numbered list (1., 2., etc.)
      else if (/^\d+\.\s/.test(trimmed)) {
        if (!inList || listType !== 'ol') {
          if (inList) result.push(listType === 'ul' ? '</ul>' : '</ol>');
          result.push('<ol>');
          inList = true;
          listType = 'ol';
        }
        let content = trimmed.replace(/^\d+\.\s/, '').trim();
        result.push(`<li>${content}</li>`);
      } 
      else {
        if (inList) {
          result.push(listType === 'ul' ? '</ul>' : '</ol>');
          inList = false;
        }
        if (trimmed.length > 0) {
          result.push(`<p>${trimmed}</p>`);
        }
      }
    });

    if (inList) result.push(listType === 'ul' ? '</ul>' : '</ol>');

    return result.join('');
  }
}

// Global Chat CTA Trigger Handler
window.handleChatCTA = function(action) {
  if (action === 'openModal') {
    if (typeof openModal === 'function') openModal();
  } else if (action === 'scrollSimulator') {
    const el = document.getElementById('simulator');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
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
   14. INTERACTIVE PERFORMANCE DIAGNOSTIC SIMULATOR (LIGHTHOUSE AUDIT)
   ========================================================================== */
window.runSpeedAudit = function() {
  const urlInput = document.getElementById('auditor-url');
  const consoleDiv = document.getElementById('auditor-console');
  const verdictDiv = document.getElementById('auditor-verdict');
  const legacyDial = document.getElementById('legacy-dial');
  
  if (!urlInput || !consoleDiv || !verdictDiv || !legacyDial) return;
  
  const url = urlInput.value.trim();
  if (!url) return;
  
  consoleDiv.classList.remove('hidden');
  verdictDiv.classList.add('hidden');
  
  // Reset dial
  legacyDial.textContent = '--';
  legacyDial.className = 'speed-dial';
  
  consoleDiv.innerHTML = `<div class="console-line">// Initiating audit protocol on: ${url}</div>`;
  
  const steps = [
    { delay: 600, text: '// Connection established. Querying edge headers...' },
    { delay: 1300, text: '// Downloading assets. Analyzing script footprint...' },
    { delay: 2000, text: '// WARNING: Found 22 render-blocking external scripts.' },
    { delay: 2600, text: '// WARNING: Images lack explicit width/height (causes Layout Shifts).' },
    { delay: 3200, text: '// Diagnostic metrics compiled. Pushing to scoreboard...' }
  ];
  
  steps.forEach(step => {
    setTimeout(() => {
      const line = document.createElement('div');
      line.className = 'console-line';
      line.textContent = step.text;
      consoleDiv.appendChild(line);
      consoleDiv.scrollTop = consoleDiv.scrollHeight;
    }, step.delay);
  });
  
  setTimeout(() => {
    consoleDiv.classList.add('hidden');
    
    // Fill comparator scorecard
    legacyDial.textContent = '42';
    legacyDial.classList.add('score-slow');
    
    document.getElementById('legacy-lcp').textContent = '4.8s';
    document.getElementById('legacy-cls').textContent = '0.28';
    document.getElementById('legacy-tbt').textContent = '840ms';
    
    document.getElementById('speed-saving').textContent = '4.4s (91% speed reduction)';
    document.getElementById('conversion-lift').textContent = '3.2x';
    
    verdictDiv.classList.remove('hidden');
  }, 3800);
};

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


