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
    if (navLogo) navLogo.src = 'assets/images/logo-light.png';
    if (footerLogo) footerLogo.src = 'assets/images/logo-light.png';
    if (favicon) favicon.href = 'assets/images/logo-icon-black.png';
    if (triggerLogo) triggerLogo.src = 'assets/images/logo-icon-black.png';
    if (headerLogo) headerLogo.src = 'assets/images/logo-icon-black.png';
    if (centerBadgeLogo) centerBadgeLogo.src = 'assets/images/logo-icon-black.png';
    if (themeIcon) {
      themeIcon.innerHTML = `<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>`;
    }
  } else {
    if (navLogo) navLogo.src = 'assets/images/logo-dark.png';
    if (footerLogo) footerLogo.src = 'assets/images/logo-dark.png';
    if (favicon) favicon.href = 'assets/images/logo-icon-gold.png';
    if (triggerLogo) triggerLogo.src = 'assets/images/logo-icon-gold.png';
    if (headerLogo) headerLogo.src = 'assets/images/logo-icon-gold.png';
    if (centerBadgeLogo) centerBadgeLogo.src = 'assets/images/logo-icon-gold.png';
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
   14. INTERACTIVE LIVE MOBILE UX & CONVERSION AUDIT ENGINE
   ========================================================================== */
window.runConversionAudit = async function() {
  const urlInput = document.getElementById('auditor-url');
  const consoleDiv = document.getElementById('auditor-console');
  const verdictDiv = document.getElementById('auditor-verdict');
  const legacyDial = document.getElementById('legacy-dial');
  
  if (!urlInput || !consoleDiv || !verdictDiv || !legacyDial) return;
  
  let rawUrl = urlInput.value.trim();
  if (!rawUrl) {
    alert('Please enter a valid website URL (e.g. yourcompany.co.za)');
    return;
  }
  
  let targetUrl = rawUrl;
  if (!/^https?:\/\//i.test(targetUrl)) {
    targetUrl = 'https://' + targetUrl;
  }
  
  consoleDiv.classList.remove('hidden');
  verdictDiv.classList.add('hidden');
  
  legacyDial.textContent = '--';
  legacyDial.className = 'speed-dial';
  
  const uxEl = document.getElementById('legacy-ux');
  const seoEl = document.getElementById('legacy-seo');
  const practicesEl = document.getElementById('legacy-practices');
  
  if (uxEl) uxEl.textContent = '--';
  if (seoEl) seoEl.textContent = '--';
  if (practicesEl) practicesEl.textContent = '--';
  
  consoleDiv.innerHTML = `<div class="console-line">// Initiating live diagnostic scan on: ${targetUrl}</div>`;
  
  const appendConsole = (msg) => {
    const line = document.createElement('div');
    line.className = 'console-line';
    line.textContent = msg;
    consoleDiv.appendChild(line);
    consoleDiv.scrollTop = consoleDiv.scrollHeight;
  };
  
  setTimeout(() => appendConsole('// Querying edge DOM metadata & mobile viewport headers...'), 300);
  setTimeout(() => appendConsole('// Analyzing SEO title architecture & search snippet tags...'), 800);
  setTimeout(() => appendConsole('// Evaluating mobile touch targets & visual asset clarity...'), 1400);
  
  try {
    const apiUrl = `https://api.microlink.io?url=${encodeURIComponent(targetUrl)}`;
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const result = await response.json();
    const data = result && result.data ? result.data : {};
    const headers = result && result.headers ? result.headers : {};
    
    appendConsole('// Real-time metadata received. Compiling dynamic Conversion Scorecard...');
    
    const title = (data.title || '').trim();
    const description = (data.description || '').trim();
    const hasImage = !!(data.image && data.image.url);
    const hasLogo = !!(data.logo && data.logo.url);
    const publisher = (data.publisher || '').trim();
    const lang = (data.lang || '').trim();
    const isHttps = targetUrl.startsWith('https://');
    const hasEncoding = !!(headers['content-encoding']);
    const serverTech = (headers.server || '').trim();
    
    // Dynamic SEO Score Calculation (0-100)
    let seoScore = 100;
    const seoIssues = [];
    
    if (!title) {
      seoScore -= 30;
      seoIssues.push('Missing HTML title tag reduces search index visibility.');
    } else if (title.length < 15 || title.length > 70) {
      seoScore -= 12;
      seoIssues.push(`Page title length (${title.length} chars) is unoptimized for mobile search snippets.`);
    }
    
    if (!description) {
      seoScore -= 30;
      seoIssues.push('Missing meta description tag causing poor Google search snippet click-through rates.');
    } else if (description.length < 50 || description.length > 170) {
      seoScore -= 12;
      seoIssues.push(`Meta description (${description.length} chars) is outside optimal mobile snippet length.`);
    }
    
    if (!publisher) {
      seoScore -= 10;
      seoIssues.push('Missing publisher metadata & structured business schema.');
    }
    
    seoScore = Math.max(35, Math.min(100, seoScore));
    
    // Dynamic Mobile UX Score Calculation (0-100)
    let uxScore = 100;
    const uxIssues = [];
    
    if (!hasImage) {
      uxScore -= 22;
      uxIssues.push('Missing social sharing image preview tag (Open Graph image), degrading WhatsApp/social lead previews.');
    }
    if (!hasLogo) {
      uxScore -= 18;
      uxIssues.push('Missing high-resolution mobile brand icon or touch favicon.');
    }
    if (title.length > 60) {
      uxScore -= 12;
      uxIssues.push('Header title truncates on narrow mobile viewport widths.');
    }
    if (!isHttps) {
      uxScore -= 30;
      uxIssues.push('Unencrypted HTTP connection displays security warnings to mobile visitors.');
    }
    
    uxScore = Math.max(40, Math.min(100, uxScore));
    
    // Dynamic Best Practices Score Calculation (0-100)
    let practicesScore = 100;
    const practiceIssues = [];
    
    if (!isHttps) {
      practicesScore -= 35;
      practiceIssues.push('Insecure connection headers.');
    }
    if (!lang) {
      practicesScore -= 15;
      practiceIssues.push('Missing HTML language attribute.');
    }
    if (!hasEncoding) {
      practicesScore -= 15;
      practiceIssues.push('Uncompressed server payload response.');
    }
    
    practicesScore = Math.max(45, Math.min(100, practicesScore));
    
    // Weighted Conversion Index: UX (40%), SEO (40%), Best Practices (20%)
    const conversionIndex = Math.round((uxScore * 0.4) + (seoScore * 0.4) + (practicesScore * 0.2));
    
    const allIssues = [...seoIssues, ...uxIssues, ...practiceIssues];
    if (allIssues.length === 0) {
      allIssues.push('Sub-optimal lead conversion pathways and user navigation flow restricting customer enquiry volume.');
    }
    
    setTimeout(() => {
      consoleDiv.classList.add('hidden');
      
      legacyDial.textContent = conversionIndex;
      if (conversionIndex >= 85) {
        legacyDial.className = 'speed-dial score-fast';
      } else if (conversionIndex >= 65) {
        legacyDial.className = 'speed-dial score-medium';
      } else {
        legacyDial.className = 'speed-dial score-slow';
      }
      
      if (uxEl) uxEl.textContent = `${uxScore}/100`;
      if (seoEl) seoEl.textContent = `${seoScore}/100`;
      if (practicesEl) practicesEl.textContent = `${practicesScore}/100`;
      
      const domainClean = rawUrl.replace(/^https?:\/\//i, '').replace(/\/.*$/, '');
      const displayTitle = title ? `"${title}"` : 'Unidentified Title';
      
      verdictDiv.innerHTML = `
        <div style="border-left: 3px solid var(--gold-champagne); padding-left: 14px; text-align: left;">
          <p style="font-size: 1rem; color: var(--text-primary);">
            ⚠️ <strong>Audit Report for ${domainClean}:</strong> Computed Conversion Index is <strong>${conversionIndex}/100</strong>.
          </p>
          <p style="margin-top: 6px; font-size: 0.88rem; color: var(--text-muted);">
            <strong>Page Title Analyzed:</strong> ${displayTitle}
          </p>
          <p style="margin-top: 8px; font-size: 0.88rem; color: var(--text-secondary);">
            <strong>Detected Conversion Bottlenecks:</strong> ${allIssues.slice(0, 3).join(' ')}
          </p>
          <p style="margin-top: 12px; font-weight: 600; font-size: 0.92rem; color: var(--gold-champagne);">
            Upgrading ${domainClean} to Apex Bespoke Web Architecture will eliminate these visual bottlenecks and maximize lead conversions.
          </p>
        </div>
      `;
      verdictDiv.classList.remove('hidden');
    }, 1800);
    
  } catch (err) {
    console.error('Live Audit Error:', err);
    appendConsole(`// ERROR: Could not analyze ${rawUrl}. Please check domain spelling.`);
    setTimeout(() => {
      consoleDiv.classList.add('hidden');
    }, 3000);
  }
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


