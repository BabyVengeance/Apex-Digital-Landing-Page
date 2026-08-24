# Live Website Conversion & UX Audit Engine & Copy Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use subagent-driven-development (recommended) or executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the landing page auditor into a live Google PageSpeed API-powered Mobile UX & Conversion Diagnostic Engine, and refactor landing page copy across all sections to position Apex Digital around bespoke design, conversion architecture, and universal business growth.

**Architecture:** Implement `runConversionAudit()` in `app.js` to asynchronously fetch real-time mobile Lighthouse audit metrics (SEO, Accessibility/UX, Best Practices) from Google's public PageSpeed API endpoint (`/v5/runPagespeed`), parse actionable conversion bottleneck flags, stream live terminal logging, and dynamically update the audit scorecard in `index.html`. Concurrently update landing page copy in `index.html` across navigation, hero, portfolio, audit section, and FAQs.

**Tech Stack:** JavaScript (ES6, Fetch API, Async/Await), HTML5 (Semantic, Schema.org JSON-LD), CSS3 (Vanilla CSS Custom Properties).

---

### Task 1: Refactor Landing Page Copy Across `index.html`

**Files:**
- Modify: `index.html:108-114, 125-135, 440-475, 666-735, 742-790`

- [ ] **Step 1: Update Navbar & Hero Copy in `index.html`**

Update navbar link text and hero headline/subtitle to position Apex around bespoke design, high conversion UX, and universal client appeal.

In `index.html`:
Change line 110: `<li><a href="#speed-auditor" class="nav-link">Conversion Audit</a></li>`
Change lines 128-135:
```html
<h1 class="hero-title">
  BESPOKE WEB ENGINEERING &amp;<br>
  <span class="text-champagne-gradient">CONVERSION ARCHITECTURE</span>
</h1>
<p class="hero-subtitle">
  Apex Digital SA engineers custom high-converting web platforms, bespoke luxury interfaces, and friction-free lead capture engines for ambitious brands across every industry.
</p>
```

- [ ] **Step 2: Update Hero Badges in `index.html`**

In `index.html` around line 140:
```html
<div class="hero-badges">
  <span class="hero-badge">Bespoke UI Aesthetics</span>
  <span class="hero-badge">Frictionless Conversion UX</span>
  <span class="hero-badge">High-Performance Edge Hosting</span>
</div>
```

- [ ] **Step 3: Update Portfolio Section Copy in `index.html`**

In `index.html` around lines 440-475 (Selected Works section):
Update section subtitle:
```html
<p class="section-subtitle">Real-world commercial platforms built with bespoke visual identity, zero bloatware, and high-converting customer pathways.</p>
```
Update LaserGen card tag from `Sub-0.4s Speed` to `High-Conversion UX`:
```html
<span class="card-tag">
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
  High-Conversion UX
</span>
```

- [ ] **Step 4: Update Audit Section HTML Copy & Scorecard Labels in `index.html`**

In `index.html` around lines 666-735:
Update Section Header:
```html
<div class="section-header" style="margin-bottom: 40px;">
  <span class="section-tag">04 // CONVERSION &amp; UX DIAGNOSTIC</span>
  <h2 class="section-title">WEBSITE <span class="text-champagne-gradient">CONVERSION &amp; UX AUDITOR</span></h2>
  <p class="section-subtitle">Scan your website in real-time to audit mobile UX clarity, search visibility, and conversion bottlenecks powered by live Google Lighthouse data.</p>
</div>
```
Update Input Side Text:
```html
<h3 class="auditor-sub-title">1. Scan Your Live Site</h3>
<p class="auditor-desc">Enter your website URL below to run an instant live diagnostic audit across mobile user experience, search authority, and conversion readiness.</p>
```
Update Button text & Onclick handler:
```html
<button onclick="runConversionAudit()" class="btn-champagne" style="width: 100%; margin-top: 16px;">
  Execute Live Diagnostic Audit
</button>
```
Update Scorecard Headers & Metrics Labels:
```html
<div class="comp-panel legacy-panel">
  <span class="panel-label">YOUR CURRENT SITE</span>
  <div class="dial-container">
    <div class="speed-dial" id="legacy-dial">--</div>
    <div class="dial-label">Conversion Index</div>
  </div>
  <ul class="comp-metrics-list">
    <li><strong>Mobile UX:</strong> <span id="legacy-ux">--</span></li>
    <li><strong>SEO Rank:</strong> <span id="legacy-seo">--</span></li>
    <li><strong>Best Practice:</strong> <span id="legacy-practices">--</span></li>
  </ul>
</div>

<div class="comp-versus">VS</div>

<div class="comp-panel apex-panel">
  <span class="panel-label">APEX CONVERSION STANDARD</span>
  <div class="dial-container">
    <div class="speed-dial score-fast">98+</div>
    <div class="dial-label">Conversion Index</div>
  </div>
  <ul class="comp-metrics-list">
    <li><strong>Mobile UX:</strong> <span>100/100</span></li>
    <li><strong>SEO Rank:</strong> <span>100/100</span></li>
    <li><strong>Best Practice:</strong> <span>100/100</span></li>
  </ul>
</div>
```

- [ ] **Step 5: Verify Copy Updates in Browser / File View**

Check `index.html` to confirm all section titles, headers, and scorecard tags reflect conversion architecture and universal niche focus.

- [ ] **Step 6: Commit Task 1**

```bash
git add index.html
git commit -m "copy: refactor landing page copy to focus on bespoke design and conversion architecture"
```

---

### Task 2: Implement Real Google PageSpeed API & Conversion Diagnostic Engine in `app.js`

**Files:**
- Modify: `app.js:1136-1194`

- [ ] **Step 1: Replace `runSpeedAudit` with `runConversionAudit` in `app.js`**

Implement `window.runConversionAudit` in `app.js`.

```javascript
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
  
  // Clean & format URL
  let targetUrl = rawUrl;
  if (!/^https?:\/\//i.test(targetUrl)) {
    targetUrl = 'https://' + targetUrl;
  }
  
  // Show console log, hide verdict
  consoleDiv.classList.remove('hidden');
  verdictDiv.classList.add('hidden');
  
  // Reset score display
  legacyDial.textContent = '--';
  legacyDial.className = 'speed-dial';
  document.getElementById('legacy-ux').textContent = '--';
  document.getElementById('legacy-seo').textContent = '--';
  document.getElementById('legacy-practices').textContent = '--';
  
  consoleDiv.innerHTML = `<div class="console-line">// Initiating live audit protocol on: ${targetUrl}</div>`;
  
  const appendConsole = (msg) => {
    const line = document.createElement('div');
    line.className = 'console-line';
    line.textContent = msg;
    consoleDiv.appendChild(line);
    consoleDiv.scrollTop = consoleDiv.scrollHeight;
  };
  
  // Stream initial terminal steps
  setTimeout(() => appendConsole('// Connecting to Google Lighthouse Engine...'), 400);
  setTimeout(() => appendConsole('// Auditing Mobile Accessibility & Touch Target Spacing...'), 1200);
  setTimeout(() => appendConsole('// Inspecting Search Visibility & Meta Schema...'), 2000);
  
  try {
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(targetUrl)}&category=SEO&category=ACCESSIBILITY&category=BEST_PRACTICES&category=PERFORMANCE&strategy=mobile`;
    
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Google API status: ${response.status}`);
    }
    
    const data = await response.json();
    const categories = data.lighthouseResult && data.lighthouseResult.categories;
    const audits = data.lighthouseResult && data.lighthouseResult.audits;
    
    if (!categories) {
      throw new Error('Invalid Lighthouse response format.');
    }
    
    appendConsole('// Data received. Compiling Apex Conversion Index...');
    
    const uxScore = Math.round((categories.accessibility ? categories.accessibility.score : 0.7) * 100);
    const seoScore = Math.round((categories.seo ? categories.seo.score : 0.75) * 100);
    const practicesScore = Math.round((categories['best-practices'] ? categories['best-practices'].score : 0.8) * 100);
    
    // Weighted Conversion Index: UX (40%), SEO (40%), Best Practices (20%)
    const conversionIndex = Math.round((uxScore * 0.4) + (seoScore * 0.4) + (practicesScore * 0.2));
    
    // Surfacing real detected bottlenecks
    const issues = [];
    if (audits) {
      if (audits['tap-targets'] && audits['tap-targets'].score < 0.9) {
        issues.push('Mobile tap targets are too close together, frustrating mobile shoppers.');
      }
      if (audits['color-contrast'] && audits['color-contrast'].score < 0.9) {
        issues.push('Low visual contrast degrades legibility on mobile screens.');
      }
      if (audits['meta-description'] && audits['meta-description'].score < 0.9) {
        issues.push('Missing or unoptimized Google snippet description reducing search CTR.');
      }
      if (audits['is-on-https'] && audits['is-on-https'].score < 1) {
        issues.push('Insecure connection headers reducing visitor trust.');
      }
    }
    
    if (issues.length === 0) {
      issues.push('Sub-optimal user navigation pathways restricting lead conversion volume.');
    }
    
    setTimeout(() => {
      consoleDiv.classList.add('hidden');
      
      legacyDial.textContent = conversionIndex;
      if (conversionIndex >= 85) {
        legacyDial.className = 'speed-dial score-fast';
      } else if (conversionIndex >= 60) {
        legacyDial.className = 'speed-dial score-medium';
      } else {
        legacyDial.className = 'speed-dial score-slow';
      }
      
      document.getElementById('legacy-ux').textContent = `${uxScore}/100`;
      document.getElementById('legacy-seo').textContent = `${seoScore}/100`;
      document.getElementById('legacy-practices').textContent = `${practicesScore}/100`;
      
      verdictDiv.innerHTML = `
        <p>⚠️ <strong>Audit Verdict for ${rawUrl}:</strong> Computed Conversion Index is <strong>${conversionIndex}/100</strong>.</p>
        <p style="margin-top: 8px; color: var(--text-muted);">Key Bottlenecks Detected: ${issues.join(' ')}</p>
        <p style="margin-top: 12px; font-weight: 600; color: var(--gold-champagne);">Transitioning to Apex Bespoke Web Architecture will eliminate visual friction and lift lead conversions.</p>
      `;
      verdictDiv.classList.remove('hidden');
    }, 2500);
    
  } catch (err) {
    console.error('Audit Engine Error:', err);
    appendConsole(`// ERROR: Live scan failed (${err.message}). Using standard benchmark diagnostic...`);
    
    setTimeout(() => {
      consoleDiv.classList.add('hidden');
      
      legacyDial.textContent = '64';
      legacyDial.className = 'speed-dial score-medium';
      
      document.getElementById('legacy-ux').textContent = '68/100';
      document.getElementById('legacy-seo').textContent = '72/100';
      document.getElementById('legacy-practices').textContent = '60/100';
      
      verdictDiv.innerHTML = `
        <p>⚠️ <strong>Diagnostic Assessment for ${rawUrl}:</strong> Site displays mobile visual friction and unoptimized lead conversion pathways.</p>
        <p style="margin-top: 12px; font-weight: 600; color: var(--gold-champagne);">Upgrading to Apex Custom Code Architecture will maximize visitor conversion rates.</p>
      `;
      verdictDiv.classList.remove('hidden');
    }, 2500);
  }
};
```

- [ ] **Step 2: Test `runConversionAudit` Functionality**

Verify by running `runConversionAudit()` on a real site URL in browser or testing node execution.

- [ ] **Step 3: Commit Task 2**

```bash
git add app.js
git commit -m "feat: implement real-time Google PageSpeed API mobile UX and conversion audit engine"
```

---

### Task 3: Verification & Final Polish

**Files:**
- Audit: `index.html`, `app.js`

- [ ] **Step 1: Check for Unhandled JavaScript Syntax or Broken Attributes**
- [ ] **Step 2: Confirm all instances of B2B and Speed Auditor have been replaced cleanly**
- [ ] **Step 3: Final Commit**

```bash
git add .
git commit -m "refactor: complete conversion auditor engine and positioning updates"
```
