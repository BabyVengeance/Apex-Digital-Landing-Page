# Apex Digital SA — Full Website Audit & Implementation Spec for Antigravity IDE Agent

**Domain:** `apexdigitalsa.com`  
**Generated:** 2026-09-29  
**Purpose:** Public-source/SERP audit and actionable engineering plan. Feed this file to the agent and implement the fixes in priority order.

> Note: This is a public HTML/SERP audit. A lab Lighthouse/PageSpeed run could not be completed from the audit environment, so Core Web Vitals items are framed as high-priority validation/fix work rather than measured scores.

---

## Executive summary

**Strong foundation:** fast-static positioning, semantic HTML, clear offers, good CTA coverage, FAQ/Organization/WebPage schema, geo meta, OG/Twitter tags, POPIA/PAIA notices, and `robots.txt`/`llms.txt` AI-discovery files. The homepage positions Apex around custom code, schema, POPIA compliance and conversion engineering.

**Main organic problem:** Google is being given only two meaningful URLs to rank — the homepage and `/case-studies/`. Money terms need dedicated indexable pages: web development Durban, e-commerce development South Africa, custom web apps, website redesign, SEO/GEO, AI automation, plus location pages for Johannesburg/Cape Town/Pretoria/Durban where commercially real.

**Biggest trust/risk issue:** the case-study page uses “verified” proof and phrases like “built with” beside well-known third-party businesses such as Bathu and Yuppiechef. If Apex did not personally build those exact systems, this can look misleading and may trigger customer distrust and Google scrutiny around money claims. Label them as market benchmarks unless they are verifiably Apex builds.

**Brand conflict risk:** search results also surface `apexdigitalsa.co.za` with similar “we handle digital” positioning, a Saudi “Apex Digital” LinkedIn entity, and a TikTok `@apexdigitalsa` gadget-store presence. Exact-name SERP ambiguity must be reduced.

---

# P0 — Technical SEO blockers

## 1. Fix `/sitemap.xml`

`robots.txt` advertises `https://apexdigitalsa.com/sitemap.xml`, but the sitemap fetch failed in the audit. A broken sitemap is a bad look for an agency selling technical SEO.

Requirements:
- Return valid XML sitemap with HTTP 200 and `application/xml`.
- Include only canonical 200 URLs.
- Submit to Google Search Console and Bing Webmaster Tools.

Starter sitemap:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://apexdigitalsa.com/</loc><priority>1.0</priority></url>
  <url><loc>https://apexdigitalsa.com/case-studies/</loc><priority>0.8</priority></url>
  <!-- add service pages when live -->
</urlset>
```

Acceptance checks:
- `https://apexdigitalsa.com/sitemap.xml` returns `200 OK`.
- Content-Type is XML.
- Every `<loc>` is canonical, indexable, and not redirected.
- Sitemap is referenced in `robots.txt`.

## 2. Consolidate host/protocol variants

Manually verify:

```bash
curl -I http://apexdigitalsa.com
curl -I http://www.apexdigitalsa.com
curl -I https://www.apexdigitalsa.com
curl -I https://apexdigitalsa.com
```

Expected: all variants 301 to `https://apexdigitalsa.com/`.

- Add HSTS only after HTTPS is stable everywhere.
- Keep canonical tags pointing to `https://apexdigitalsa.com/` or the correct canonical page URL.

## 3. Fix 404 slugs

Do not leave `/about/`, `/services/`, `/work/`, `/calculator/`, `/faq/`, `/contact/` as 404s.

Choose one:
1. Create real pages at those slugs, or
2. Change all public links to the actual anchors: `/#agency`, `/#services`, `/#portfolio`, `/#simulator`, `/#faq`, `/#strategy`.

Implementation preference:
- Keep the homepage as the cinematic sales page.
- Add real `/about/` and `/contact/` pages for trust and local entity reinforcement.
- Move service content to indexable service pages over time.

## 4. Repair HTML typos affecting forms

Homepage select:

```html
<option value="" disabledselected>
```

must become:

```html
<option value="" disabled selected>
```

Case-studies modal inputs:

```html
requiredautocomplete="name"
requiredautocomplete="tel"
requiredautocomplete="email"
```

must become:

```html
required autocomplete="name"
required autocomplete="tel"
required autocomplete="email"
```

Search the repo for other missing-space attribute errors, e.g. `requiredautocomplete`, `disabledselected`, `class=...id=...` etc.

## 5. Spam protection

Current risk: FormSubmit with `_captcha=false` is convenient but spam-prone.

Implement:
- Honeypot field hidden from users.
- Cloudflare Turnstile or reCAPTCHA.
- Server-side validation even if using a form backend.
- Consider moving lead handling to a serverless function or form backend that does not expose the raw Gmail address in HTML.

Privacy/consent:
- Add a required consent checkbox before submission linking to POPIA policy.
- Do not send personal lead data to unnecessary third parties.

---

# P0 — Schema and local entity cleanup

Current schema is ambitious but has risky items.

## Fix these now

1. **Do not put CIPC registration in `taxID`.** Use:

```json
"identifier": {
  "@type": "PropertyValue",
  "propertyID": "CIPC Registration Number",
  "value": "2026/237102/07"
}
```

2. **Resolve address/coordinate mismatch.** Schema says `Umhlanga Ridge`, but the geo coordinates point to central Durban. Pick one NAP and keep it identical on site, footer, Google Business Profile, LinkedIn, Instagram, Linktree, CIPC references and citations.

3. **Replace the Google Business Profile link.** The audited `share.google/...` link resolved to a generic Google result set that included unrelated Apex entities, not a clean verified Durban profile. Use the actual GBP place URL or CID link.

4. **Only use `aggregateRating` if reviews are real and visible.** Do not invent ratings.

5. **Do not mark third-party benchmark case studies as Apex-authored `CreativeWork`.** If they are not Apex builds, use neutral labels and cite sources. If they are Apex builds, prove it with URLs, analytics, screenshots and client permission.

## Recommended core entity JSON-LD

```json
{
  "@context": "https://schema.org",
  "@type": ["ProfessionalService", "LocalBusiness"],
  "@id": "https://apexdigitalsa.com/#organization",
  "name": "Apex Digital SA",
  "legalName": "Apex Digital SA (Pty) Ltd",
  "url": "https://apexdigitalsa.com/",
  "logo": "https://apexdigitalsa.com/assets/images/logo-dark.webp",
  "image": "https://apexdigitalsa.com/assets/images/logo-dark.webp",
  "description": "Custom web development, e-commerce, web application and GEO/SEO agency based in Durban, South Africa.",
  "telephone": "+27695224226",
  "email": "apexdigtl@gmail.com",
  "priceRange": "R1500 - R10000+",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Choose one real address line",
    "addressLocality": "Durban or Umhlanga",
    "addressRegion": "KwaZulu-Natal",
    "addressCountry": "ZA"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -29.7256,
    "longitude": 31.0832
  },
  "areaServed": ["Durban", "KwaZulu-Natal", "Johannesburg", "Cape Town", "Pretoria", "South Africa"],
  "sameAs": [
    "https://www.linkedin.com/company/apex-digital-southafrica/",
    "https://www.instagram.com/apexdigital_sa/",
    "https://linktr.ee/ApexDigital_"
  ]
}
```

Important: use coordinates that match the real address. Do not keep `Umhlanga Ridge` with central-Durban coordinates.

Add per-page schema when creating service pages:
- `Service` schema for each service page.
- `BreadcrumbList` for every page.
- `FAQPage` only where visible FAQs exist.
- `WebPage` with `datePublished`/`dateModified`.
- `Article`/`TechArticle` for blog content with author and citations where applicable.

---

# P0 — Homepage title/meta/H1 rewrite

Current title: `Apex Digital SA — Premium Web Development`

Recommended title:

```text
Web Development & SEO Agency in Durban | Apex Digital SA
```

Recommended meta description:

```text
Apex Digital SA builds custom-coded websites, e-commerce stores, web apps and AI lead systems for South African businesses. Fast, POPIA-conscious, conversion-focused.
```

Recommended H1:

```text
Custom Web Development & Conversion Engineering in Durban
```

Keep the current cinematic subheading as the secondary statement:

```text
Bespoke web platforms, luxury interfaces and friction-free lead capture for ambitious brands.
```

Reason: the current H1 is brand-stylistic, not query-oriented. A clearer H1 helps relevance for “web development Durban” while preserving the luxury positioning.

Also update:
- Open Graph title/description to match.
- Twitter card title/description to match.
- `og:url`, canonical, and schema `WebPage.name` alignment.

---

# Detailed audit findings and fixes

## 1. Indexation and site architecture

**Finding:** only the homepage and case-studies page are meaningfully indexed from the audited site query.

**Problem:** one strong homepage cannot rank for every service and city. You are competing against agencies with dedicated service/location pages.

**Fix:** build a hub-and-spoke structure:

```text
/
 /web-development-durban/
 /web-development-south-africa/
 /website-redesign-durban/
 /ecommerce-website-development-south-africa/
 /custom-web-application-development/
 /seo-and-geo-services-south-africa/
 /ai-automation-chatbots/
 /case-studies/
 /work/lasergen/
 /work/compass-logistics/
 /work/boss-rides/
 /work/colour-correct/
 /about/
 /contact/
```

Each service page needs:
- unique H1/title/meta
- 1,200–1,800 words of useful copy
- process section
- pricing guidance or starting price
- FAQs with FAQPage schema
- one relevant case study
- internal links to related services
- CTA to WhatsApp and intake form

Each location page must not be doorway spam. Make it genuinely local: suburbs served, local business examples, local search behavior, language/tone, map, reviews and city-specific FAQs.

## 2. Content trust and case-study compliance

**Finding:** the case-study page has strong commercial copy, but some source names appear to be public benchmarks rather than Apex client builds.

**Risk:** high-ticket B2B buyers may verify claims. If Yuppiechef/Bathu/VIVA are not Apex clients, wording like “Built with Apex...” becomes a credibility problem.

**Fix wording:**

Instead of:

```text
Built with: Transactional E-Commerce Engine
```

Use:

```text
Architecture pattern: Transactional E-Commerce Engine
Market proof: Bathu Sneakers
Apex relevance: we engineer similar omnichannel systems for retail clients.
```

Then create real Apex case studies for LaserGen, Compass Logistics, Boss Rides, Colour Correct, Ayesha M, Cato Ridge and Commercial Property Hub. For each include:
- client goal
- before state
- stack used
- build time
- measurable result where permission exists
- screenshots
- testimonial
- live URL
- date published/modified

If numbers cannot be disclosed, say that and show process/technical proof instead.

## 3. Local SEO and brand SERP

**Finding:** exact-name SERP ambiguity is real: `.co.za`, Saudi consulting, gadget TikTok and the Durban agency can collide.

**Fix:**
- Decide whether `apexdigitalsa.co.za` is yours. If yes, 301 or canonical to `.com`. If no, consider a clearer brand modifier in titles: `Apex Digital SA — Durban Web Engineering`.
- Create/claim a real Google Business Profile with categories such as website designer, software company and internet marketing service.
- Add services, photos, service areas, opening hours, review link and GBP posts.
- Build consistent citations: business directories, Clutch, DesignRush, LinkedIn company page, GitHub if applicable, Behance if applicable, local SA directories.
- Embed a real map only if you serve from a real address; otherwise use service-area settings.

## 4. Performance and Core Web Vitals risk

No reliable lab score was obtained, but the public source shows likely pressure points:
- render-blocking Google Fonts request with multiple families/weights
- GSAP + ScrollTrigger
- custom cursor and canvas animations
- cinematic loader before content
- chatbot JS
- Cloudflare challenge/insights snippets

**Fixes:**
- self-host and subset fonts; reduce to one display font plus one body font
- preload only the true hero/logo assets
- remove unused font weights, likely Inter if not needed
- disable custom cursor on touch/mobile
- cap the cinematic loader at a very short maximum and respect `prefers-reduced-motion`
- make hero content available immediately; do not gate LCP behind animation
- lazy-load below-fold canvases, chatbot and heavy interaction modules
- ensure Cloudflare Bot Fight Mode/managed challenge is not challenging Googlebot, PageSpeed Insights or real users
- test with Lighthouse mobile + field CrUX; aim for LCP under 2.5s, INP under 200ms, CLS under 0.1

Add explicit performance budgets: hero image, CSS, JS, font payload and third-party scripts.

## 5. Accessibility and conversion UX

Good existing elements: labels, required fields, aria labels on some controls, WhatsApp CTAs, mobile dock.

Fixes:
- add `type="button"` to non-submit buttons using `onclick`
- add `aria-expanded` to FAQ triggers
- ensure all icon-only links have accessible names
- give canvases `aria-hidden="true"` where decorative
- ensure focus outlines remain visible
- check champagne-on-black contrast; luxury gold often fails contrast
- do not rely on color alone for form errors
- add success states that are announced to screen readers

Conversion improvements:
- reduce repeated CTA wording; differentiate primary CTA by page intent
- add a short “Who this is for / not for” section to qualify leads
- add response-time proof, process timeline and sample proposal expectations
- add optional calendar booking after form submit
- track WhatsApp clicks as conversions

## 6. Security and governance

Recommended headers:

```text
Strict-Transport-Security
Content-Security-Policy
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy
frame-ancestors 'self'
```

Also:
- move forms off raw `formsubmit.co` if possible or lock it with AJAX + token/honeypot
- add consent checkbox before submission linking to POPIA policy
- publish a real PAIA manual if required; the modal notice is not a substitute for the prescribed manual/process
- separate marketing analytics from lead data; do not send personal form data to unnecessary third parties

---

# Organic ranking plan

## Phase 1 — week 1: foundation
- fix sitemap, redirects, 404 slugs
- rewrite homepage title/meta/H1
- fix schema identifiers/address/GBP
- relabel benchmark case studies
- add captcha/honeypot and privacy checkbox
- create service pages outline and wire internal links
- verify GSC, Bing, GBP, analytics and conversion events

## Phase 2 — weeks 2–4: money pages
Publish high-intent pages:

1. `/web-development-durban/`
2. `/ecommerce-website-development-south-africa/`
3. `/website-redesign-and-performance-optimization/`
4. `/custom-web-applications/`
5. `/seo-and-geo-services/`
6. `/ai-automation-chatbots/`

Target query groups:
- web development Durban
- website developer Durban
- web design agency Durban
- ecommerce website developer South Africa
- PayFast/Yoco website integration
- custom web application development South Africa
- website speed optimization South Africa
- POPIA compliant website design
- generative engine optimization South Africa
- AI chatbot for lead generation South Africa

Validate volume in Google Keyword Planner/GSC before final prioritization.

## Phase 3 — months 2–3: proof and authority
Create real client case studies, comparison pages and answer-first content:
- “How much does a website cost in Durban?”
- “Custom-coded website vs WordPress for SA businesses”
- “PayFast vs Yoco for e-commerce checkout”
- “Core Web Vitals for South African websites”
- “POPIA basics for small business websites”
- “What is GEO and how is it different from SEO?”

Add author/reviewer bios, dates, sources and outbound citations. Keep `llms-full.txt` synchronized with real pages.

## Phase 4 — ongoing authority
- earn links from client sites: “Website by Apex Digital SA”
- publish 2–4 useful posts monthly, not fluff
- pursue SA business/tech directories and podcasts
- get Google reviews after every successful delivery
- build a simple ROI email/report for prospects using your calculator

---

# 90-day action checklist

## Days 1–3
- repair sitemap
- 301 host/protocol variants
- remove/redirect 404 slugs
- fix form HTML and spam protection
- fix schema CIPC/taxID, address/geo, GBP sameAs
- rewrite homepage title/meta/H1

## Days 4–10
- relabel non-Apex case studies
- publish real Apex portfolio pages for LaserGen/Compass/etc.
- create service page templates
- set up GSC/Bing/GBP/conversions

## Days 11–30
- launch 3–6 service/location pages
- add internal links from homepage and case studies
- add citations and review acquisition flow
- run Lighthouse + CrUX validation

## Days 31–90
- publish 4–8 high-intent articles/case studies
- build links from client footers and directories
- improve calculator CTAs and lead qualification
- iterate based on GSC queries and conversion data

---

# Final implementation notes

Apex Digital SA already looks more technically sophisticated than many template agencies. The gap is not effort; it is **indexable surface area, proof integrity and entity consistency**. Fix the sitemap/redirects/404s, clean the schema and GBP signals, stop implying third-party benchmarks are your builds, then expand into service/location pages with real Apex proof. That is the fastest credible path to higher organic rankings.

---

## Evidence/source notes for the implementing agent

Public audit inputs used:
- `https://apexdigitalsa.com/`
- `https://apexdigitalsa.com/case-studies/`
- `https://apexdigitalsa.com/robots.txt`
- `https://apexdigitalsa.com/llms.txt`
- `https://apexdigitalsa.com/llms-full.txt`
- Public source HTML for homepage and case-studies page
- Public search/SERP checks for `site:apexdigitalsa.com`, brand variants, `apexdigitalsa.co.za`, LinkedIn/Instagram/Linktree/share.google references

Observed public facts to preserve while editing:
- Homepage title observed: `Apex Digital SA — Premium Web Development`.
- Homepage meta description observed: `Apex Digital SA engineers custom high-performance websites, e-commerce platforms, and conversion engines for South African & global businesses.`
- Homepage H1 observed: `BESPOKE WEB ENGINEERING & CONVERSION ARCHITECTURE`.
- Case-studies title observed: `Apex Digital — The ROI of a High-Performance Website`.
- Case-studies meta description observed: `Calculate your business's digital revenue lift. Explore 10 verified case studies of South African and global businesses that transformed their bottom line with results-driven web infrastructure.`
- `robots.txt` allows broad crawlers and AI agents and references `sitemap.xml`, `llms.txt`, and `llms-full.txt`.
- `llms.txt`/`llms-full.txt` reference entity/legal details including CIPC `2026/237102/07`, email `apexdigtl@gmail.com`, phone `+27 69 522 4226`, Durban/KZN location, social anchors, service tiers, FAQs, and portfolio links.
- Public search results surfaced homepage and case-studies page for the domain, plus brand-conflicting results for `apexdigitalsa.co.za`, a Saudi Apex Digital LinkedIn entity, and a TikTok `@apexdigitalsa` gadget-store presence.

Do not delete existing POPIA/PAIA/cookie disclosures; improve and formalize them where required.
