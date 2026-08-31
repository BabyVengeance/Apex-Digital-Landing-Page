/* ==========================================================================
   APEX DIGITAL SA — HIGH-INTELLIGENCE RAG & LLM CHATBOT ENGINE
   Deep Technical Context • Sovereign Security Guardrails • Zero Fluff
   ========================================================================== */

(function () {
  'use strict';

  // Structured Apex Digital Master Knowledge Corpus (Deep, Exhaustive Responses)
  const APEX_KB_CORPUS = [
    {
      id: "packages_overview",
      intents: ["package", "packages", "pricing", "cost", "how much", "tier", "options", "price", "rate", "quote", "build"],
      title: "Apex Custom Website Build Packages",
      response: `Apex Digital SA engineers 3 bespoke website build tiers tailored to your business growth phase and revenue goals:

- **Apex Starter Build (Starting at R1,500)**: A high-impact 1–2 page hand-coded single landing page. Engineered for focused service offerings, immediate lead capture, sub-second mobile loading, and total POPIA compliance. Includes direct contact form handlers and zero monthly builder fees.
- **Apex Business Build (Starting at R5,000)**: Our flagship 3–5 page custom commercial architecture (Home, About, Services, Showcase, Contact). Built for established South African businesses requiring WhatsApp click-to-chat integration, online booking widgets, custom intake calculators, and initial Google search indexing with rich snippets.
- **Apex Enterprise Build (Starting at R10,000)**: Complete market dominance platform (5–10 bespoke pages). Includes custom interactive tools, multi-step lead routing, CRM webhooks, sub-0.4s speed tuning, full Google search launchpad, and 1st month free priority maintenance & SLA.

All builds feature 100% custom hand-crafted code (HTML5, CSS3, Vanilla JS) with zero monthly builder locks or hidden licensing fees.`,
      cta: { text: "Claim Free Custom Demo", action: "openModal" }
    },
    {
      id: "starter_tier",
      intents: ["starter", "basic site", "cheap website", "single page", "landing page", "entry level", "r1500"],
      title: "Apex Starter Build (Starting at R1,500)",
      response: `The **Apex Starter Build** is designed for ambitious startups, freelancers, and single-offer businesses that need a rapid, highly credible online presence:

### What's Included:
- **Scope**: 1–2 custom hand-coded pages (Home & Contact/Lead Capture).
- **Performance**: Sub-second loading speed guaranteed (sub-0.4s average), mobile touch target optimization, and zero Elementor/WordPress plugin bloat.
- **Compliance & Security**: Native SSL configuration, POPIA privacy policy compliance, and anti-spam form handlers.
- **Ownership**: 100% custom code ownership with no ongoing builder subscription costs.

Ideal for running paid ad traffic, launching a new service, or replacing an outdated template site.`,
      cta: { text: "Request Starter Scope", action: "openModal" }
    },
    {
      id: "standard_tier",
      intents: ["standard", "business website", "5 page", "normal site", "booking widget", "whatsapp chat", "r5000", "commercial"],
      title: "Apex Standard Build (Starting at R5,000)",
      response: `Our **Apex Standard Build** is our most popular multi-page commercial architecture, engineered to establish strong industry authority and double visitor conversion rates:

### Key Deliverables:
- **Scope**: 3–5 structured pages (Home, About, Core Services, Portfolio/Showcase, Contact).
- **Interactive Tools**: WhatsApp direct click-to-chat integration, calendar booking link embed, or custom quote intake calculator.
- **Google Visibility**: Clean HTML5 semantic hierarchy, open-graph social previews, and baseline Google search indexing setup.
- **Speed Engineering**: Hand-crafted CSS/JS animations with sub-0.4s page load speeds.

Built for established service providers, logistics firms, real estate agencies, and commercial vendors looking for continuous qualified inbound leads.`,
      cta: { text: "Request Standard Quote", action: "openModal" }
    },
    {
      id: "pro_tier",
      intents: ["pro", "enterprise", "full website", "complete site", "automation", "best package", "top tier", "r10000", "dominance"],
      title: "Apex Pro Build (Starting at R10,000)",
      response: `The **Apex Pro Build** is our premier growth engine for businesses seeking market dominance and maximum administrative automation:

### Advanced Capabilities:
- **Scope**: 5–10 bespoke pages with tailored UI/UX design systems.
- **Interactive Engines**: Custom programmatic pricing calculators, multi-step customer onboarding workflows, and CRM webhook routing.
- **Search & Speed Launchpad**: Complete Google search entity alignment, sub-0.4s speed tuning, and sub-second asset delivery.
- **Included SLA**: First month of dedicated web engineering & technical maintenance free of charge.

Designed for high-growth enterprises that need bespoke tools, zero performance bottlenecks, and a platform that scales seamlessly.`,
      cta: { text: "Request Pro Blueprint", action: "openModal" }
    },
    {
      id: "maintenance_plans",
      intents: ["maintenance", "monthly", "care", "upkeep", "hosting", "support", "after launch", "sla"],
      title: "Hosting, Support & Post-Launch Security",
      response: `Every website built by Apex Digital SA includes high-performance edge hosting, SSL security certification, and automated POPIA privacy protocols by default.

- **Included Edge Infrastructure**: Lightning-fast edge server hosting, automatic SSL encryption, and POPIA privacy form security built into your project.
- **In-House Managed**: Clean, maintainable hand-coded architecture that is 100% self-managed post-launch with zero mandatory monthly fees.
- **On-Demand Developer Support**: Available whenever you need structural updates, new page additions, or feature expansions.`,
      cta: { text: "Discuss Website Project", action: "openModal" }
    },
    {
      id: "case_studies_results",
      intents: ["case study", "results", "proof", "examples", "portfolio", "success", "clients", "lasergen", "compass", "boss rides", "colour correct", "ayesha m", "cato ridge", "property portfolio"],
      title: "Featured Client Builds & Empirical Results",
      response: `Apex Digital SA has engineered high-speed, custom web platforms across industrial, automotive, real estate, and e-commerce verticals:

1. **LaserGen** ([lasergen.co.za](https://lasergen.co.za)): Industrial laser refurbishment platform with sub-second mobile loading & direct quote capture.
2. **Compass Logistics** ([compasslogistics.co.za](https://compasslogistics.co.za)): SADC B2B freight logistics portal with automated quote request routing.
3. **Boss Rides** ([bossrides.co.za](https://bossrides.co.za)): Luxury automotive showcase with interactive specs and direct booking pathways.
4. **Global Colour Correct** ([globalcolourcorrect.com](https://globalcolourcorrect.com)): International e-commerce store with Shopify & Tunl global shipping.
5. **Ayesha M** ([ayesham.co.za](https://ayesham.co.za)): Boutique fashion store with custom Mag Case 3D product configurator & PayFast checkout.
6. **Cato Ridge Land** ([catoridge.netlify.app](https://catoridge.netlify.app)): Commercial & industrial land development portal for investor lead generation.
7. **Commercial Real Estate Portfolio** ([propertyportfolio.netlify.app](https://propertyportfolio.netlify.app)): High-yield property investment hub optimized for speed and lead capture.

All builds feature sub-0.4s speeds, 99/100 Google PageSpeed scores, zero CMS plugin bloat, and 100% custom code ownership.`,
      cta: { text: "See Live Builds in Portfolio", action: "openModal" }
    },
    {
      id: "seo_google_visibility",
      intents: ["seo", "google", "ranking", "search engine", "find on google", "first page", "visibility", "traffic", "leads", "geo"],
      title: "Google Search & Local Visibility Strategy",
      response: `We structure every site to get discovered by local buyers actively searching on Google:

1. **Technical SEO**: Clean semantic HTML5, JSON-LD Schema markup & 99/100 PageSpeed scores.
2. **Search Launchpad**: Comprehensive XML sitemaps, Google Search Console indexing & rich snippet setup.
3. **Generative Engine Optimization (GEO)**: Structured entity data for AI search citations (ChatGPT, Gemini, Perplexity).

Every website build includes structured search engine optimization, Google Search Console indexing, and rich snippet setup.`,
      cta: { text: "Audit My Google Ranking", action: "openModal" }
    },
    {
      id: "speed_performance",
      intents: ["speed", "fast", "latency", "slow website", "loading", "mobile", "core web vitals", "performance"],
      title: "Sub-Second Loading Speed & Performance Engineering",
      response: `Website speed directly dictates your lead conversion rate and Google ranking:

- **Sub-0.4s Page Loading**: Custom hand-coded sites load in under 0.4s, eliminating bounce rate.
- **Zero Plugin Overhead**: Lightweight Vanilla JS & CSS instead of 30+ heavy WordPress plugins.
- **Core Web Vitals Guarantee**: 99/100 Google PageSpeed scores with WebP images & layout shift protection.

A 1-second delay reduces conversions by up to 20%. Apex Digital ensures instant mobile loading nationwide.`,
      cta: { text: "Calculate Project ROI & Scope", action: "scrollSection:simulator" }
    },
    {
      id: "why_apex_vs_others",
      intents: ["why apex", "different", "wordpress vs custom", "agency", "freelancer", "wix", "squarespace", "elementor", "template"],
      title: "Why Custom Code Outranks Generic Template Builders",
      response: `Why bespoke hand-coded architecture outperforms template builders (WordPress, Wix, Squarespace):

- **Speed**: Sub-0.4s load speed vs 3.5s+ for heavy WordPress/Elementor templates.
- **Security**: Zero vulnerability to public plugin exploits or automated database breaches.
- **Conversion Rate**: Tailored user flows built specifically for your sales process without template limits.
- **Ownership & Costs**: 100% custom code ownership with zero monthly builder fees or lock-ins.`,
      cta: { text: "See Code Architecture", action: "scrollSection:architecture" }
    },
    {
      id: "ecommerce_integrations",
      intents: ["ecommerce", "e-commerce", "online store", "payfast", "yoco", "tunl", "shipping", "payments", "shopify"],
      title: "Transactional E-Commerce & Payment Gateways",
      response: `We build high-converting online stores engineered for South African & global commerce:

- **Local Payment Gateways**: PayFast, Yoco, Ozow & Peach Payments for instant ZAR card and EFT checkout.
- **Automated Shipping**: Live rate calculations & order routing with Courier Guy, Tunl international & DHL.
- **Conversion Tools**: Abandoned cart recovery, dynamic product configurators & friction-free mobile checkouts.`,
      cta: { text: "Request E-Commerce Blueprint", action: "openModal" }
    },
    {
      id: "popia_security",
      intents: ["popia", "privacy", "security", "data", "gdpr", "compliance", "ssl", "protection"],
      title: "POPIA Data Protection & Security Protocols",
      response: `All Apex Digital builds natively conform to South African POPIA privacy laws:

- **Secure Data Handling**: Form submission data is encrypted and transmitted directly without storage leaks.
- **Privacy Controls**: Transparent consent notices, cookie policy integration & standard SSL encryption.
- **Zero Exploit Risk**: Clean hand-crafted code eliminating plugin vulnerability vectors.`,
      cta: { text: "Discuss Security Requirements", action: "openModal" }
    },
    {
      id: "contact_location",
      intents: ["contact", "phone", "whatsapp", "email", "address", "location", "durban", "rohan", "reach out", "call"],
      title: "Contact Apex Digital SA Lead Systems Architect",
      response: `Connect directly with our technical leadership:

- **Lead Architect**: Rohan Ramlall
- **Phone / WhatsApp**: [+27 69 522 4226](tel:+27695224226)
- **Email**: [Apexdigtl@gmail.com](mailto:Apexdigtl@gmail.com)
- **HQ**: Durban, KwaZulu-Natal (Serving clients nationwide across SA & globally)`,
      cta: { text: "Chat Directly on WhatsApp", action: "openWhatsApp" }
    }
  ];

  // Quick prompt buttons with sleek SVG icons (NO EMOJIS)
  const QUICK_PROMPTS = [
    { 
      label: "Packages & Pricing", 
      query: "What are your website packages and prices?",
      iconSvg: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`
    },
    { 
      label: "Real Client Results", 
      query: "Can you show me real case studies and results?",
      iconSvg: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`
    },
    { 
      label: "Google SEO Strategy", 
      query: "How will you get my site found on Google?",
      iconSvg: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`
    },
    { 
      label: "Calculate Project ROI", 
      query: "How do I calculate deliverables and ROI for my project?",
      iconSvg: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="16" y1="14" x2="16" y2="18"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="8" y1="18" x2="8" y2="18.01"/><line x1="12" y1="18" x2="12" y2="18.01"/></svg>`
    },
    { 
      label: "Build Process & SLA", 
      query: "How long does a build take and what support is included?",
      iconSvg: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`
    }
  ];

  // RAG & Dynamic Gemini LLM Engine Implementation (Netlify Proxy Architecture)
  class ApexLLMEngine {
    constructor(corpus) {
      this.corpus = corpus;
      this.proxyEndpoint = "/.netlify/functions/chat";
      this.ragFallback = new ApexRAGEngine(corpus);
      this.history = [];
    }

    async query(userText) {
      this.history.push({
        role: "user",
        parts: [{ text: userText }]
      });

      if (this.history.length > 10) {
        this.history = this.history.slice(-10);
      }

      try {
        const answerText = await this.callProxyAPI(userText);
        this.history.push({
          role: "model",
          parts: [{ text: answerText }]
        });
        const cta = this.deriveCTA(userText, answerText);
        return { title: null, text: answerText, cta: cta };
      } catch (err) {
        console.warn("Netlify LLM Function unavailable, reverting to client-side RAG engine:", err);
        this.history.pop(); // Remove pending user message from history on error
        return this.ragFallback.query(userText);
      }
    }

    async callProxyAPI(userText) {
      const payload = {
        contents: this.history.length > 0 ? this.history : [{ parts: [{ text: userText }] }]
      };

      const endpoints = ["/api/chat"];
      let lastError = null;

      for (const endpoint of endpoints) {
        try {
          const response = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
          });

          if (response.ok) {
            const data = await response.json();
            if (data && typeof data.text === "string" && data.text) {
              return data.text.trim();
            }
            if (data && data.candidates?.[0]?.content?.parts?.[0]?.text) {
              return data.candidates[0].content.parts[0].text.trim();
            }
          } else {
            const errData = await response.json().catch(() => ({}));
            lastError = new Error(errData.error || `HTTP ${response.status} from ${endpoint}`);
          }
        } catch (fetchErr) {
          lastError = fetchErr;
        }
      }

      throw lastError || new Error("Failed to reach serverless AI endpoint");
    }

    deriveCTA(userText, answerText) {
      const q = (userText || "").toLowerCase();
      const a = (answerText || "").toLowerCase();
      const combined = q + " " + a;

      // 1. Direct WhatsApp / Phone Contact
      if (q.includes("whatsapp") || q.includes("phone") || q.includes("call") || q.includes("number") || q.includes("chat directly") || q.includes("talk") || q.includes("reach out")) {
        return { text: "Chat Directly on WhatsApp", action: "openWhatsApp" };
      }

      // 2. Investment & ROI Calculator Section (#simulator)
      if (combined.includes("roi") || combined.includes("calculator") || combined.includes("investment") || combined.includes("deliverables") || combined.includes("conversion lift") || combined.includes("impact")) {
        return { text: "Calculate Project ROI & Scope", action: "scrollSection:simulator" };
      }

      // 3. Real Client Portfolio & Works (#portfolio)
      if (combined.includes("case study") || combined.includes("portfolio") || combined.includes("lasergen") || combined.includes("compass") || combined.includes("boss rides") || combined.includes("ayesha") || combined.includes("cato ridge") || combined.includes("example") || combined.includes("proof") || combined.includes("work") || combined.includes("showcase")) {
        return { text: "Explore Live Client Portfolio", action: "scrollSection:portfolio" };
      }

      // 4. Website Packages & Pricing Tiers (#services)
      if (combined.includes("package") || combined.includes("pricing") || combined.includes("cost") || combined.includes("price") || combined.includes("r1,500") || combined.includes("r5,000") || combined.includes("r10,000") || combined.includes("starter") || combined.includes("standard") || combined.includes("pro") || combined.includes("tier")) {
        return { text: "Compare Build Tiers & Pricing", action: "scrollSection:services" };
      }

      // 5. Code Architecture & Technical Performance (#architecture)
      if (combined.includes("architecture") || combined.includes("hand-coded") || combined.includes("vanilla") || combined.includes("wordpress vs") || combined.includes("speed") || combined.includes("load time") || combined.includes("page speed") || combined.includes("latency")) {
        return { text: "See Code Architecture", action: "scrollSection:architecture" };
      }

      // 6. Agency Manifesto & About (#agency)
      if (combined.includes("manifesto") || combined.includes("agency") || combined.includes("philosophy") || combined.includes("about") || combined.includes("who is apex") || combined.includes("rohan")) {
        return { text: "Read Agency Manifesto", action: "scrollSection:agency" };
      }

      // 7. Frequently Asked Questions & Timelines (#faq)
      if (combined.includes("faq") || combined.includes("timeline") || combined.includes("how long") || combined.includes("turnaround") || combined.includes("popia") || combined.includes("domain") || combined.includes("hosting")) {
        return { text: "Explore FAQ & Timelines", action: "scrollSection:faq" };
      }

      // 8. Custom Demo / Intake Consultation Modal (Default Fallback)
      return { text: "Claim Free Custom Demo Website", action: "openModal" };
    }

    clearHistory() {
      this.history = [];
    }
  }

  class ApexRAGEngine {
    constructor(corpus) {
      this.corpus = corpus;
    }

    tokenize(text) {
      return text.toLowerCase()
        .replace(/[^a-z0-9\s]/g, ' ')
        .split(/\s+/)
        .filter(w => w.length > 2);
    }

    scoreItem(item, queryTokens, rawQuery) {
      let score = 0;
      const rawLower = rawQuery.toLowerCase();

      for (const intent of item.intents) {
        if (rawLower.includes(intent.toLowerCase())) {
          score += 15;
        }
      }

      const itemTokens = this.tokenize(item.title + " " + item.response);
      for (const token of queryTokens) {
        if (itemTokens.includes(token)) {
          score += 2;
        }
      }

      return score;
    }

    query(userText) {
      const tokens = this.tokenize(userText);
      if (tokens.length === 0) {
        return this.getFallbackResponse();
      }

      let bestMatch = null;
      let highestScore = 0;

      for (const item of this.corpus) {
        const score = this.scoreItem(item, tokens, userText);
        if (score > highestScore) {
          highestScore = score;
          bestMatch = item;
        }
      }

      if (bestMatch && highestScore >= 6) {
        return {
          title: bestMatch.title,
          text: bestMatch.response,
          cta: bestMatch.cta
        };
      }

      return this.getFallbackResponse(userText);
    }

    getFallbackResponse(userQuery = "") {
      return {
        title: "Apex Digital Web Architecture & Growth",
        text: `At Apex Digital SA, we engineer custom, sub-second web architectures designed specifically to generate qualified leads and double sales conversion rates.

### Core Website Build Tiers:
- **Apex Starter Build (Starting at R1,500)**: 1–2 page hand-coded single landing page.
- **Apex Business Build (Starting at R5,000)**: 3–5 page custom business engine with WhatsApp chat, booking tools, or quote calculators.
- **Apex Enterprise Build (Starting at R10,000)**: 5–10 page bespoke dominance platform with custom calculators and CRM workflows.

Would you like to explore a specific package, review our real client case studies, or claim a free custom demo website?`,
        cta: { text: "Claim Free Demo Website", action: "openModal" }
      };
    }
  }

  // Export engine and data globally
  window.ApexLLMEngine = ApexLLMEngine;
  window.ApexRAGEngine = ApexRAGEngine;
  window.APEX_KB_CORPUS = APEX_KB_CORPUS;
  window.APEX_QUICK_PROMPTS = QUICK_PROMPTS;
})();
