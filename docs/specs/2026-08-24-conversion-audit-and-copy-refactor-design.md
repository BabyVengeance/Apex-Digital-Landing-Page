# Live Website Conversion & UX Audit Engine & Niche-Agnostic Copy Refactoring Design

**Date:** 2026-08-24  
**Project:** Apex Digital SA Landing Page  
**Status:** Approved  

---

## 1. Executive Summary & Goals

This specification outlines the technical transformation of the Apex Digital landing page:
1. **Live Functional Tool:** Replaces the static/simulated speed auditor with a **real-time Google PageSpeed API-powered Mobile UX & Conversion Diagnostic Engine**. Prospective clients enter their live site URL to get real scores for Mobile Accessibility/UX, Search Visibility (SEO), Best Practices, and a computed **Apex Conversion Index**, alongside specific detected conversion leaks.
2. **Value Proposition Repositioning:** Refactors landing page copy to focus on **Bespoke Design, Conversion Architecture, Authority Positioning, and Revenue Growth** across all business niches (B2B, B2C, E-Commerce, Local Services, Corporate, Luxury), refactoring speed from a main sales hook into an included hosting infrastructure standard.

---

## 2. Technical Architecture: Live Conversion & UX Audit Engine

### 2.1 API Endpoint & Strategy
* **Endpoint:** `https://www.googleapis.com/pagespeedonline/v5/runPagespeed`
* **Query Parameters:**
  * `url`: User-provided target domain (automatically formatted with `https://` if omitted).
  * `strategy`: `mobile`
  * `category`: `ACCESSIBILITY`, `SEO`, `BEST_PRACTICES`, `PERFORMANCE`
* **Authentication:** Uses Google's free public endpoint (no rate-limit API key required for low-volume frontend calls, with error handling for network limits).

### 2.2 Execution & State Flow (`app.js`)
1. **Trigger:** User enters URL in `#auditor-url` and clicks `Execute Audit Protocol` (`runConversionAudit()`).
2. **Validation:** Validates URL format using regex. Displays diagnostic error in console if domain string is invalid.
3. **Console Feedback:** Hides prior scorecard, reveals `#auditor-console`, and streams live log lines:
   - `// Initiating live audit protocol on: {URL}`
   - `// Querying Google Lighthouse Engine...`
   - `// Auditing Mobile Accessibility & Touch Target Spacing...`
   - `// Inspecting Search Visibility & Meta Schema...`
   - `// Compiling Apex Conversion Scorecard...`
4. **Data Processing:**
   - Extracts numeric scores (0-100) from `data.lighthouseResult.categories`:
     - `mobileUx`: `accessibility.score * 100`
     - `seoScore`: `seo.score * 100`
     - `bestPractices`: `best-practices.score * 100`
   - Computes **Apex Conversion Index**:  
     `Math.round((mobileUx * 0.40) + (seoScore * 0.40) + (bestPractices * 0.20))`
   - Analyzes Google audit details for actionable alerts:
     - `tap-targets` -> Mobile click target collision warning
     - `color-contrast` -> Low text legibility warning
     - `meta-description` -> Missing Google snippet description
     - `is-on-https` -> Insecure HTTP security warning
5. **UI Rendering:**
   - Displays real score on `#legacy-dial`.
   - Populates `#legacy-ux`, `#legacy-seo`, `#legacy-practices`.
   - Displays custom verdict highlighting real site bottlenecks and CTA to claim a package via WhatsApp.

---

## 3. Copy Refactoring & Positioning Architecture (`index.html`)

### 3.1 Global Messaging Principles
* **Core Hook:** Bespoke Design, High Conversion Rates, Seamless Mobile UX, POPIA Compliance.
* **Universal Niche Focus:** Resonates across all commercial sectors (E-commerce, Local Services, Industrial, Professional Services, Real Estate).
* **Speed Positioning:** Frame speed as an included baseline ("Powered by high-performance edge hosting by default").

### 3.2 Key Section Copy Re-writes
* **Navigation Bar:** Rename `Speed Simulator` to `Conversion Audit`.
* **Hero Section:**
  * *Headline:* `BESPOKE WEB ENGINEERING & CONVERSION ARCHITECTURE`
  * *Subtitle:* `Apex Digital SA engineers custom high-converting web platforms, bespoke luxury interfaces, and friction-free lead capture engines for ambitious brands across every industry.`
  * *Badges:* `Bespoke UI Aesthetics`, `Frictionless Conversion UX`, `High-Performance Edge Hosting (Included)`.
* **Section 03 (Selected Works):** Highlight bespoke UI design, conversion pathways, and client revenue impact.
* **Section 04 (Auditor):**
  * *Header:* `04 // CONVERSION & UX DIAGNOSTIC` -> `WEBSITE CONVERSION & UX AUDITOR`
  * *Subtitle:* `Scan your website in real-time to audit mobile UX clarity, search visibility, and conversion bottlenecks powered by live Google Lighthouse data.`
  * *Panels:* `YOUR CURRENT SITE` (Live Google API score) vs `APEX CONVERSION STANDARD` (98+ UX Rating, Full Schema Authority, 100% POPIA Lead Protection).
* **FAQ Section:** Reframe technical questions around user conversion rates, custom UX vs standard templates, and edge hosting infrastructure.

---

## 4. Verification & Testing Plan

1. **Live API Testing:** Test `runConversionAudit()` against real domains (e.g., `google.com`, `wikipedia.org`, `ayesham.co.za`). Confirm real score output matches Google PageSpeed Insights.
2. **Error & Edge Case Testing:**
   - Test invalid URL strings (`asdfg`, `http://`). Confirm graceful error message in console.
   - Test offline/network timeout state.
3. **Responsive UI Verification:** Verify scorecard formatting across desktop, tablet, and 375px mobile screens.
4. **Copy Audit:** Ensure all instances of B2B restrictions and speed-first focus are cleanly replaced with universal conversion authority messaging.
