/* ==========================================================================
   APEX DIGITAL SA — HIGH-INTELLIGENCE RAG & LLM CHATBOT ENGINE
   Deep Technical Context • Multi-Platform Engineering • Zero Fluff
   ========================================================================== */

(function () {
  'use strict';

  // Structured Apex Digital Master Knowledge Corpus (Audited & Accurate)
  const APEX_KB_CORPUS = [
    {
      id: "packages_overview",
      intents: ["package", "packages", "pricing", "cost", "how much", "tier", "options", "price", "rate", "quote", "build"],
      title: "Apex Custom Website Build Packages",
      response: `Apex Digital SA offers 3 structured website build tiers tailored to your business growth phase and revenue goals, starting at R1,500 and scaling up to R10,000+:

- **Apex Starter Build (Starting at R1,500)**: 1 custom core page (Single Landing Page). Engineered for focused service offerings, direct-response lead generation, sub-second mobile loading, and POPIA privacy compliance.
- **Apex Standard Build (Starting at R5,000)**: Our most popular multi-page commercial architecture (3–5 structured pages: Home, About, Services, Showcase, Contact). Includes WhatsApp click-to-chat integration, calendar/booking link embeds, custom lead intake capture, and Google search indexing with rich snippets.
- **Apex Pro Build (Starting at R10,000+)**: Market dominance platform (5–10 structured pages). Includes interactive business calculators, search entity authority, multi-step lead workflows, and priority SLA support.

We build across custom code (HTML5/CSS3/JS/React) and leading CMS platforms (WordPress, Shopify, Webflow, Wix) tailored to your operational needs.`,
      cta: { text: "Compare Build Tiers & Pricing", action: "scrollSection:services" }
    },
    {
      id: "starter_tier",
      intents: ["starter", "starter build", "basic site", "single page", "landing page", "entry level", "r1500", "r1,500"],
      title: "Apex Starter Build (Starting at R1,500)",
      response: `The **Apex Starter Build** is designed for startups, freelancers, and single-offer businesses that need a rapid, highly credible online footprint:

### Key Deliverables:
- **Scope**: 1 custom core landing page engineered for direct lead capture.
- **Performance**: Sub-second loading speed, mobile touch target optimization, and clean conversion UX.
- **Compliance & Security**: Native SSL encryption, POPIA privacy compliance, and anti-spam contact form handlers.
- **Ownership**: Complete asset ownership with high-performance edge hosting setup.

Ideal for running paid ad campaigns, launching a new service, or establishing a credible digital home base.`,
      cta: { text: "Claim Free Custom Demo", action: "openModal" }
    },
    {
      id: "standard_tier",
      intents: ["standard", "standard build", "commercial site", "5 page", "normal site", "booking widget", "whatsapp chat", "r5000", "r5,000", "small business"],
      title: "Apex Standard Build (Starting at R5,000)",
      response: `Our **Apex Standard Build** is our flagship multi-page commercial website system, engineered to establish strong industry authority and double visitor conversion rates:

### Key Deliverables:
- **Scope**: 3–5 structured pages (Home, About, Services, Showcase/Portfolio, Contact).
- **Interactive Tools**: WhatsApp direct click-to-chat integration, calendar booking link embed, or custom quote intake calculator.
- **Google Search Visibility**: Clean semantic hierarchy, open-graph social previews, structured Schema markup, and Google Search Console indexing.
- **Performance**: High-speed mobile-first design with smooth responsive animations.

Built for established service providers, logistics firms, medical practices, real estate agencies, and commercial vendors looking for continuous qualified inbound leads.`,
      cta: { text: "Calculate Project ROI & Scope", action: "scrollSection:simulator" }
    },
    {
      id: "pro_tier",
      intents: ["pro", "pro build", "full website", "complete site", "automation", "best package", "top tier", "r10000", "r10,000", "market dominance", "10000+"],
      title: "Apex Pro Build (Starting at R10,000+)",
      response: `The **Apex Pro Build** is our premier growth engine for businesses seeking market dominance, advanced customer routing, and administrative automation:

### Advanced Capabilities:
- **Scope**: 5–10 structured pages with tailored bespoke UI/UX design systems.
- **Interactive Engines**: Custom programmatic pricing calculators, multi-step customer onboarding workflows, and CRM webhook routing.
- **Search & Entity Authority**: Complete Google search entity alignment, Generative Engine Optimization (GEO) for AI citations, and sub-0.4s speed tuning.
- **Included SLA**: Priority web engineering & technical maintenance support.

Designed for high-growth enterprises that need bespoke tools, zero performance bottlenecks, and a scalable digital platform.`,
      cta: { text: "Request Pro Blueprint", action: "openModal" }
    },
    {
      id: "platforms_technologies",
      intents: ["platform", "platforms", "wordpress", "wix", "shopify", "woocommerce", "webflow", "technology", "tech stack", "custom code", "cms"],
      title: "Multi-Platform Engineering: Custom Code, WordPress, Shopify & Wix",
      response: `Apex Digital SA is platform-agnostic. We engineer high-performing web platforms across all leading technologies based on your specific business goals, budget, and operational requirements:

- **Custom Code (HTML5, CSS3, Vanilla JS, React, Node)**: For businesses requiring maximum performance, sub-0.4s load speed, 99/100 Google PageSpeed scores, and bespoke web apps.
- **WordPress & WooCommerce**: For content-rich platforms, blogs, and scalable e-commerce where teams want easy self-managed content publishing.
- **Shopify**: For high-volume transactional retail e-commerce with automated shipping, PayFast/Yoco gateways, and inventory sync.
- **Wix & Webflow**: For modular, visually expressive business sites with intuitive client dashboards.

We analyze your business model and recommend the ideal technology stack for maximum return on investment.`,
      cta: { text: "See Code Architecture", action: "scrollSection:architecture" }
    },
    {
      id: "ecommerce_integrations",
      intents: ["ecommerce", "e-commerce", "online store", "shop", "payfast", "yoco", "ozow", "shipping", "payments", "tunl", "courier"],
      title: "Transactional E-Commerce & Payment Gateways",
      response: `We build high-converting online stores engineered for South African & global commerce across Shopify, WooCommerce, Wix, and bespoke custom code:

- **Local Payment Gateways**: PayFast, Yoco, Ozow & Peach Payments for instant ZAR card and EFT checkout.
- **Automated Shipping**: Live rate calculations & order routing with Courier Guy, Tunl international & DHL.
- **Conversion Tools**: Abandoned cart recovery, dynamic product configurators, and friction-free mobile checkouts.`,
      cta: { text: "Request E-Commerce Scope", action: "openModal" }
    },
    {
      id: "redesign_refresh",
      intents: ["redesign", "refresh", "revamp", "upgrade site", "slow site", "fix website", "overhaul"],
      title: "Website Redesign & Platform Overhaul",
      response: `Our **Website Redesign & Refresh** service modernizes your existing web assets with:

- **Boutique UI/UX Overhaul**: Modern, high-conversion visual systems built for high-trust user engagement.
- **Speed & Code Hardening**: Optimizing assets, scripts, and layout shift to bring load times under 1 second.
- **Mobile Conversion Refactoring**: Touch-optimized layouts with clear action triggers.
- **Zero Downtime Migration**: Seamless migration preserving your existing SEO rankings and domain authority.`,
      cta: { text: "Audit My Current Website", action: "openModal" }
    },
    {
      id: "ai_automation",
      intents: ["ai", "automation", "agent", "chatbot", "rag", "crm", "workflow", "leads routing"],
      title: "AI Automation & AI-Ops Workflow Engines",
      response: `Apex Digital integrates autonomous AI systems to streamline your operations 24/7:

- **24/7 Custom RAG Chatbots**: Intelligent, context-grounded AI advisors that qualify leads and answer customer questions instantly.
- **Lead-to-Viewing & Intake Routing**: Programmatic lead qualification and routing directly into your CRM or WhatsApp.
- **Operational Workflow Agents**: Automated administrative intake and customer communication flows.`,
      cta: { text: "Discuss AI Integration", action: "openModal" }
    },
    {
      id: "seo_google_visibility",
      intents: ["seo", "google", "ranking", "search engine", "find on google", "first page", "visibility", "traffic", "geo", "ai search"],
      title: "Google Search & AI Visibility Strategy (GEO & SEO)",
      response: `We structure every site to get discovered by local buyers actively searching on Google and AI search engines:

1. **Technical SEO**: Clean semantic HTML5, JSON-LD Schema entity markup & 99/100 PageSpeed scores.
2. **Search Launchpad**: Comprehensive XML sitemaps, Google Search Console indexing & rich snippet setup.
3. **Generative Engine Optimization (GEO)**: Structured entity graphs so your business gets cited inside AI search engines (ChatGPT, Gemini, Perplexity).`,
      cta: { text: "Audit My Google Ranking", action: "openModal" }
    },
    {
      id: "case_studies_results",
      intents: ["case study", "results", "proof", "examples", "portfolio", "success", "clients", "lasergen", "compass", "boss rides", "colour correct", "ayesha m", "cato ridge", "property portfolio"],
      title: "Featured Client Builds & Empirical Results",
      response: `Apex Digital SA has engineered high-performing web platforms across industrial, logistics, automotive, real estate, and e-commerce verticals:

1. **LaserGen** ([lasergen.co.za](https://lasergen.co.za)): Industrial laser refurbishment platform with sub-second mobile loading & direct quote capture.
2. **Compass Logistics** ([compasslogistics.co.za](https://compasslogistics.co.za)): SADC B2B freight logistics portal with automated quote request routing.
3. **Boss Rides** ([bossrides.co.za](https://bossrides.co.za)): Luxury automotive customization & vehicle showcase portal.
4. **Global Colour Correct** ([globalcolourcorrect.com](https://globalcolourcorrect.com)): International e-commerce store with Shopify & Tunl global shipping.
5. **Ayesha M Jewellery** ([ayesham.co.za](https://ayesham.co.za)): Custom e-commerce store with 3D Mag Case product configurator & PayFast checkout.
6. **Cato Ridge Land** ([catoridge.netlify.app](https://catoridge.netlify.app)): Commercial & industrial land development portal for investor lead generation.
7. **Commercial Property Hub** ([propertyportfolio.netlify.app](https://propertyportfolio.netlify.app)): Real estate investment portal with yield metrics and broker routing.`,
      cta: { text: "Explore Live Client Portfolio", action: "scrollSection:portfolio" }
    },
    {
      id: "contact_location",
      intents: ["contact", "phone", "whatsapp", "email", "address", "location", "durban", "vector", "reach out", "call", "team"],
      title: "Contact Apex Digital SA Engineering Team",
      response: `Connect directly with our web architecture & engineering team:

- **Technical Team**: Apex Digital SA Systems Architecture Unit
- **Phone / WhatsApp**: [+27 69 522 4226](tel:+27695224226)
- **Email**: [Apexdigtl@gmail.com](mailto:Apexdigtl@gmail.com)
- **HQ**: Durban, KwaZulu-Natal (Serving clients nationwide across South Africa & globally)`,
      cta: { text: "Chat Directly on WhatsApp", action: "openWhatsApp" }
    }
  ];

  // Quick prompt buttons with sleek SVG icons (NO EMOJIS)
  const QUICK_PROMPTS = [
    { 
      label: "Packages & Pricing", 
      query: "What are your website build packages and prices?",
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
      label: "Platforms & Tech", 
      query: "What platforms and technologies do you build with?",
      iconSvg: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`
    }
  ];

  // Dynamic LLM Engine Implementation (Cloudflare Serverless Function Endpoint)
  class ApexLLMEngine {
    constructor(corpus) {
      this.corpus = corpus;
      this.endpoint = "/api/chat";
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
        console.warn("Cloudflare Serverless Endpoint (/api/chat) unreachable, falling back to client-side RAG:", err);
        this.history.pop();
        return this.ragFallback.query(userText);
      }
    }

    async callProxyAPI(userText) {
      const historyPayload = this.history
        .slice(0, -1)
        .slice(-6)
        .map(h => ({
          role: h.role === "user" ? "user" : "assistant",
          content: h.parts?.[0]?.text || h.content || ""
        }))
        .filter(h => h.content);

      const response = await fetch(this.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: userText,
          history: historyPayload
        })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `HTTP ${response.status} from ${this.endpoint}`);
      }

      const data = await response.json();
      const reply =
        data.reply ||
        (data.candidates?.[0]?.content?.parts?.[0]?.text) ||
        data.text;

      if (!reply || typeof reply !== "string") {
        throw new Error("Invalid response format received from /api/chat");
      }

      return reply.trim();
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

      // 5. Code Architecture & Technical Platforms (#architecture)
      if (combined.includes("architecture") || combined.includes("hand-coded") || combined.includes("vanilla") || combined.includes("wordpress") || combined.includes("shopify") || combined.includes("wix") || combined.includes("webflow") || combined.includes("speed") || combined.includes("load time") || combined.includes("page speed") || combined.includes("latency")) {
        return { text: "See Code Architecture", action: "scrollSection:architecture" };
      }

      // 6. Agency Manifesto & About (#agency)
      if (combined.includes("manifesto") || combined.includes("agency") || combined.includes("philosophy") || combined.includes("about") || combined.includes("who is apex") || combined.includes("team") || combined.includes("vector")) {
        return { text: "Read Agency Manifesto", action: "scrollSection:agency" };
      }

      // 7. Frequently Asked Questions & Timelines (#faq)
      if (combined.includes("faq") || combined.includes("timeline") || combined.includes("how long") || combined.includes("turnaround") || combined.includes("popia") || combined.includes("domain") || combined.includes("hosting")) {
        return { text: "Explore FAQ & Timelines", action: "scrollSection:faq" };
      }

      // 8. Custom Demo / Consultation Modal (Default Fallback)
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
        text: `At Apex Digital SA, we engineer high-performance web systems across custom code (HTML/CSS/JS/React), WordPress, Shopify, and Wix, designed specifically to generate qualified leads and maximize conversion rates.

### Core Website Build Tiers:
- **Apex Starter Build (Starting at R1,500)**: 1 custom core page (Single Landing Page).
- **Apex Standard Build (Starting at R5,000)**: 3–5 page commercial engine with WhatsApp chat, booking tools, or quote intake.
- **Apex Pro Build (Starting at R10,000+)**: 5–10 page market dominance platform with custom calculators and CRM workflows.

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
