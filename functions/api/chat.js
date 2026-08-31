// Comprehensive Knowledge Base for Server-Side Guardrail Fallbacks (Audited & Accurate)
const KNOWLEDGE_BASE = [
  {
    intents: ["hi", "hello", "hey", "greetings", "good morning", "good day", "who are you"],
    reply: "Hello. I am **Vector**, Lead Systems Architect & AI Advisor for Apex Digital SA. We engineer high-performance web systems and digital platforms across custom code, WordPress, Shopify, and Wix, built to drive qualified inbound revenue. Are you looking to scope a new website build, upgrade an existing site, or explore our services?"
  },
  {
    intents: ["plumbing", "plumber", "electrician", "contractor", "trade", "local service", "dentist", "clinic", "flower", "business type"],
    reply: "For a local service business like a plumbing or trade company, the **Apex Standard Build** is ideal:\n\n- **Direct WhatsApp Lead Capture**: Instant click-to-chat for urgent callouts and emergency quotes.\n- **3–5 Commercial Pages**: Home, Services (Leak Detection, Pipe Repair, Maintenance), About, Projects/Reviews, and Contact.\n- **Google Local Search Visibility**: Structured Schema markup and Search Console setup so local homeowners find you on Google Search.\n- **Interactive Quote Forms**: Mobile-optimized intake forms for instant job requests.\n\nWould you like to discuss your project scope or message us directly on WhatsApp at 069 522 4226?"
  },
  {
    intents: ["on the fence", "why get a website", "need a website", "why a website", "worth it", "benefit", "small business website", "flower store", "business owner"],
    reply: "For a growing South African business, a professional website is your primary 24/7 revenue engine:\n\n- **100% Asset Ownership**: Unlike social media channels that restrict organic reach behind ad algorithms, your website is your owned digital real estate.\n- **Instant Credibility & Trust**: High-intent buyers look for verified web presence before requesting quotes or placing orders.\n- **Direct Google Search Capture**: Rank locally on Google Search and get cited in AI search engines (ChatGPT, Gemini, Perplexity).\n- **Frictionless Conversion**: Integrated WhatsApp click-to-chat and direct intake forms turn visitors into paying clients.\n\nWould you like to discuss the right website scope for your business or message us on WhatsApp at 069 522 4226?"
  },
  {
    intents: ["package", "packages", "pricing", "price", "cost", "how much", "rate", "quote", "tier", "budget"],
    reply: "Here is our estimated investment range for custom website builds:\n\n- **Apex Starter Build**: R1,500 – R3,500 (starting at R1,500)\n  * 1 custom core page (Single Landing Page). High-speed lead capture, mobile-first design, built-in POPIA compliance.\n\n- **Apex Standard Build**: R5,000 – R8,000 (starting at R5,000)\n  * 3–5 structured pages (Home, About, Services, Showcase, Contact). Includes WhatsApp click-to-chat, calendar booking embeds, custom intake forms, and Google SEO indexing.\n\n- **Apex Pro Build**: R8,000 – R10,000+ (starts at R8,000)\n  * 5–10 structured pages. Includes interactive business calculators, multi-step lead workflows, search entity authority, and priority SLA maintenance.\n\nWe build on custom code as well as WordPress, Shopify, and Wix. Would you like to scope a build for your budget on WhatsApp at 069 522 4226?"
  },
  {
    intents: ["starter", "starter build", "single page", "landing page", "entry"],
    reply: "The **Apex Starter Build** is our single-page web footprint:\n\n- **Scope**: 1 custom core landing page engineered for direct lead capture.\n- **Features**: Sub-second mobile loading speeds, POPIA compliant contact forms, WhatsApp integration.\n- **Ownership**: 100% full asset ownership with zero monthly builder locks.\n\nConnect with us on WhatsApp at 069 522 4226 to get started."
  },
  {
    intents: ["standard", "standard build", "5 page", "commercial site", "small business"],
    reply: "The **Apex Standard Build** is our flagship multi-page commercial website system:\n\n- **Scope**: 3–5 structured pages (Home, About, Services, Showcase/Portfolio, Contact).\n- **Integrations**: Direct WhatsApp click-to-chat, calendar booking embeds, custom quote intake calculators.\n- **Search Authority**: Semantic HTML5, structured Schema markup, Google Search Console indexing.\n\nMessage us on WhatsApp at 069 522 4226 to discuss your project scope."
  },
  {
    intents: ["pro", "pro build", "market dominance"],
    reply: "The **Apex Pro Build** is our premier tier for high-growth businesses:\n\n- **Scope**: 5–10 structured pages with custom UI/UX design systems.\n- **Advanced Tools**: Interactive pricing calculators, multi-step lead workflows, CRM webhook routing.\n- **Search Authority**: Complete Google search entity alignment and Generative Engine Optimization (GEO) for AI citations.\n\nReach out on WhatsApp at 069 522 4226 to scope your project."
  },
  {
    intents: ["platform", "platforms", "wordpress", "wix", "shopify", "woocommerce", "webflow", "tech stack", "technology"],
    reply: "Apex Digital SA works across **all leading web platforms**:\n\n- **Custom Code (HTML5, CSS3, Vanilla JS, React, Node)**: Ultra-fast rendering, sub-0.4s load times, 99/100 Google PageSpeed.\n- **WordPress & WooCommerce**: Content-rich commercial platforms with easy team publishing.\n- **Shopify**: High-volume retail e-commerce with automated shipping & South African payment gateways.\n- **Wix & Webflow**: Modular business sites with intuitive visual dashboards."
  },
  {
    intents: ["ecommerce", "e-commerce", "online store", "shop", "payfast", "yoco", "ozow", "shipping", "tunl"],
    reply: "We build high-converting transactional e-commerce stores across Shopify, WooCommerce, Wix, and custom code:\n\n- **Payment Gateways**: PayFast, Yoco, Ozow & Peach Payments for ZAR card and EFT checkout.\n- **Shipping Integrations**: Automated rate calculations with Courier Guy, Tunl, and DHL.\n- **Conversion Features**: Abandoned cart recovery, product configurators, and mobile checkout."
  },
  {
    intents: ["contact", "phone", "whatsapp", "email", "call", "number", "location", "address", "durban"],
    reply: "You can reach Apex Digital SA directly via:\n\n- **WhatsApp / Phone**: [+27 69 522 4226](tel:+27695224226)\n- **Email**: [Apexdigtl@gmail.com](mailto:Apexdigtl@gmail.com)\n- **Studio HQ**: Durban, KwaZulu-Natal (Serving clients nationwide across SA & globally)"
  },
  {
    intents: ["seo", "google", "ranking", "search", "visibility", "geo", "ai search"],
    reply: "Every Apex Digital build includes complete technical SEO:\n\n- **Technical Foundation**: Semantic HTML5, JSON-LD Schema markup & sub-second loading.\n- **Search Launchpad**: XML sitemaps, Google Search Console indexing & rich snippets.\n- **Generative Engine Optimization (GEO)**: Entity authority graphs for AI search citations (ChatGPT, Gemini, Perplexity)."
  },
  {
    intents: ["portfolio", "case study", "lasergen", "compass", "boss rides", "ayesha", "cato ridge", "property"],
    reply: "Our proven client platforms include:\n\n1. **LaserGen** ([lasergen.co.za](https://lasergen.co.za)): Industrial laser cleaning platform.\n2. **Compass Logistics** ([compasslogistics.co.za](https://compasslogistics.co.za)): SADC freight logistics portal.\n3. **Boss Rides** ([bossrides.co.za](https://bossrides.co.za)): Luxury automotive showcase.\n4. **Global Colour Correct** ([globalcolourcorrect.com](https://globalcolourcorrect.com)): Shopify global cosmetics store.\n5. **Ayesha M Jewellery** ([ayesham.co.za](https://ayesham.co.za)): Custom e-commerce store with 3D product configurator.\n6. **Cato Ridge Land** ([catoridge.netlify.app](https://catoridge.netlify.app)): Industrial land development portal.\n7. **Commercial Property Hub** ([propertyportfolio.netlify.app](https://propertyportfolio.netlify.app)): Real estate investment portal."
  }
];

function getKnowledgeFallback(userQuery) {
  const query = (userQuery || "").toLowerCase();
  for (const item of KNOWLEDGE_BASE) {
    if (item.intents.some(intent => query.includes(intent))) {
      return item.reply;
    }
  }
  return "Hello. I am Vector, Lead Systems Architect at Apex Digital SA. We engineer bespoke, high-performance web systems and digital platforms across custom code, WordPress, Shopify, and Wix. How can I assist with your project architecture today? You can also connect with us on WhatsApp at 069 522 4226.";
}

function sanitizeAndGuardrail(text, userQuery) {
  if (!text || typeof text !== "string") return getKnowledgeFallback(userQuery);

  let clean = text;

  // 1. Strip reasoning and thinking tags
  clean = clean.replace(/<think>[\s\S]*?<\/think>/gi, "");
  clean = clean.replace(/```(?:thinking|thought|reasoning)[\s\S]*?```/gi, "");

  // 2. Strip safety evaluation / moderation artifacts
  clean = clean.replace(/^(?:user\s+safety|safety\s+assessment|safety\s+evaluation|safety|content\s+safety|moderation|harm\s+evaluation):\s*[^\n]+\n*/gim, "");
  clean = clean.replace(/\[\s*(?:user\s+safety|safety\s+assessment|safety\s+evaluation|safety):\s*[^\]]+\]/gim, "");

  // 3. Strip un-tagged thinking process headers
  if (/^(?:here['’]?s\s+(?:a\s+)?thinking\s+process|thinking\s+process|thought\s+process|internal\s+reasoning)/i.test(clean.trim())) {
    const responseMatch = clean.match(/(?:(?:draft|final)\s+response(?:\s*\([^)]*\))?|response\s*to\s*user|final\s*answer):\s*["“']?([\s\S]+?)(?:["”']?\s*(?:\n\s*check\s+against|\n\s*guidelines:|\n\s*[0-9]+\.|\n\s*[A-Z][a-zA-Z\s]+:\s*(?:yes|no)|$))/i);
    if (responseMatch && responseMatch[1]) {
      clean = responseMatch[1].trim().replace(/^["“']|["”']$/g, "").trim();
    } else {
      const lines = clean.split("\n");
      const filtered = lines.filter(line => {
        const trimmed = line.trim();
        return !/^(?:[0-9]+\.|\*|-|•|analyze|identify|check\s+against|determine|draft|helpful\?|concise\?|professional\?|mentions\?|role\?)/i.test(trimmed);
      });
      clean = filtered.join("\n").trim();
    }
  }

  // 4. Strip surrounding quotation marks
  clean = clean.replace(/^["“]([\s\S]*)["”]$/, "$1").trim();

  // 5. Detect and repair abrupt sentence truncation (e.g. cut off mid-sentence)
  if (clean.length > 50 && !/[.!?)"'*\s]$/.test(clean.trim())) {
    const lastPunctuation = Math.max(
      clean.lastIndexOf("."),
      clean.lastIndexOf("!"),
      clean.lastIndexOf("?"),
      clean.lastIndexOf("\n")
    );
    if (lastPunctuation > 40) {
      clean = clean.substring(0, lastPunctuation + 1).trim();
    }
  }

  // 6. Guardrail check: if output is too short, degenerate, or contains leftover safety labels
  if (clean.length < 25 || /^(?:safe|unsafe|user\s+safety|none|n\/a|ok)$/i.test(clean)) {
    return getKnowledgeFallback(userQuery);
  }

  return clean;
}

const SYSTEM_PROMPT = `You are VECTOR, the Lead AI Systems Architect & Digital Growth Strategist for Apex Digital SA (apexdigitalsa.com).

YOUR IMMUTABLE IDENTITY & VOICE:
- Identity: You are Vector, lead technical architect and commercial systems strategist for Apex Digital SA, based in Durban, South Africa.
- Persona & Tone: High-agency, authoritative, articulate, professional, and commercially sharp.
- Self-Introduction: When greeting or asked who you are, state: "I am Vector, Lead Systems Architect at Apex Digital SA."

CONTEXT BOUNDARY & INTENT RESOLUTION:
- You are strictly an AI advisor for Apex Digital SA. All user questions asking about "which package", "what package", "builds", "recommendations", or "services" refer EXCLUSIVELY to Apex Digital SA's website build tiers (Apex Starter Build, Apex Standard Build, Apex Pro Build).
- NEVER ask the visitor if they mean third-party services like LLC formation, business insurance, accounting, franchises, or job scheduling software. You ONLY advise on Apex Digital SA's website and software engineering packages.
- When a user asks "which package for my plumbing business" (or any trade/service business like electrician, HVAC, dental, contractor, flower store):
  1. Immediately recommend the **Apex Standard Build** (3–5 pages) because local service businesses require WhatsApp click-to-chat, custom quote intake forms, emergency callout routing, and Google local search indexing.
  2. For solo freelancers or single-service launches, recommend the **Apex Starter Build** (1 page).
  3. For multi-location operations or platforms requiring custom tools/calculators, recommend the **Apex Pro Build**.

STRICT PRICING DISCLOSURE RULES:
- NEVER mention prices, costs, or Rand figures UNLESS the user explicitly asks about pricing, cost, rates, budget, or quotes.
- When the user EXPLICITLY asks for pricing, cost estimates, or budget ranges, output ONLY these exact estimates:
  • Apex Starter Build: R1,500 – R3,500 (starting at R1,500)
  • Apex Standard Build: R5,000 – R8,000 (starting at R5,000)
  • Apex Pro Build: R8,000 – R10,000+ (starts at R8,000)

RESPONSE FORMATTING & SCANNABILITY:
- Structure all comparisons, recommendations, and tier listings using clean bullet points (\`- \`) and distinct line breaks.
- NEVER lump tier options into dense walls of text. Make information easy to scan and digest at a glance.

MASTER KNOWLEDGE BASE:
1. Website Build Tiers & Exact Scope:
   - Apex Starter Build: 1 custom core page (Single Landing Page). High-speed lead generation, mobile touch optimization, POPIA compliance. Ideal for solo businesses, startups, single-offer launches.
   - Apex Standard Build: 3–5 structured pages (Home, About, Services, Showcase/Portfolio, Contact). Includes WhatsApp click-to-chat, calendar/booking links, custom quote intake calculators, and Google search indexing. Ideal for local commercial and trade businesses (plumbers, electricians, clinics).
   - Apex Pro Build: 5–10 structured pages. Interactive business calculators, multi-step lead workflows, search entity authority, and priority SLA maintenance.
   * CRITICAL RULE: The exact tier names are ONLY "Starter Build", "Standard Build", and "Pro Build". NEVER invent names like "Business Build".

2. Multi-Platform & Technology Philosophy:
   - Apex Digital SA works across ALL leading web platforms: Custom Code (HTML5, CSS3, Vanilla JS, React, Node), WordPress & WooCommerce, Shopify, and Wix.
   - CRITICAL RULE: NEVER downplay or criticize WordPress, Wix, Shopify, or any CMS platform. We are multi-platform engineering experts who tailor the right platform to the client's needs.

3. Complete Digital Services:
   - Core Web Platforms (Starter, Standard, Pro)
   - Transactional E-Commerce Stores (Shopify, WooCommerce, Wix, Custom Code with PayFast/Yoco/Ozow & Courier Guy/Tunl)
   - Website Redesign & Platform Refresh (UI/UX overhaul, speed tuning, conversion refactoring)
   - Custom Web Applications & SaaS (Client portals, database & API sync)
   - AI Automation & AI-Ops Engines (24/7 RAG chatbots, lead-to-viewing routing, CRM sync)
   - GEO & SEO Authority Services (Google Search indexing, JSON-LD Schema markup, Generative Engine Optimization for AI citations)

4. Direct Contact:
   - WhatsApp / Phone: 069 522 4226 (+27 69 522 4226)
   - Email: Apexdigtl@gmail.com
   - Studio HQ: Durban, KwaZulu-Natal (Engineering nationwide solutions across South Africa)

CONVERSATION & COMPLETENESS RULES:
- ALWAYS provide a FULL, COMPLETE, AND COHESIVE answer from start to finish. Never leave thoughts or sentences unfinished.
- Skip generic introductory filler and get straight to addressing the user's specific query.
- Conclude naturally with a clear next step (e.g. messaging on WhatsApp at 069 522 4226 or claiming a free custom demo).
- CRITICAL: Output ONLY your direct customer dialogue. NEVER include safety classification headers (like "User Safety: safe"), internal thoughts, or draft notes.`;

export async function onRequestPost(context) {
  try {
    const { message, history } = await context.request.json();

    if (!message || typeof message !== "string" || !message.trim()) {
      return new Response(JSON.stringify({ error: "Message is required." }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const apiKey = context.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "OPENROUTER_API_KEY environment variable is not configured." }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    // Top-tier fast free models on OpenRouter (strictly <= 3 items)
    const modelOrder = [
      "google/gemini-2.0-flash-exp:free",
      "meta-llama/llama-3.3-70b-instruct:free",
      "openrouter/free"
    ];

    // Build structured conversation turns
    const messagesPayload = [
      {
        role: "system",
        content: SYSTEM_PROMPT
      }
    ];

    // Inject recent conversation history for persistent context and identity
    if (Array.isArray(history) && history.length > 0) {
      for (const turn of history.slice(-6)) {
        if (turn && turn.role && turn.content) {
          messagesPayload.push({
            role: turn.role === "assistant" || turn.role === "model" ? "assistant" : "user",
            content: String(turn.content).trim()
          });
        }
      }
    }

    // Append current user message
    messagesPayload.push({
      role: "user",
      content: message.trim()
    });

    // Call OpenRouter completions endpoint with 800 tokens buffer for complete responses
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey.trim()}`,
        "HTTP-Referer": "https://apexdigitalsa.com",
        "X-Title": "Apex Digital SA"
      },
      body: JSON.stringify({
        model: modelOrder[0],
        models: modelOrder,
        messages: messagesPayload,
        temperature: 0.6,
        max_tokens: 800
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("OpenRouter API error:", response.status, errorData);
      
      // Return authoritative knowledge fallback on API errors
      return new Response(
        JSON.stringify({ reply: getKnowledgeFallback(message) }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        }
      );
    }

    const data = await response.json();
    const rawContent = data.choices?.[0]?.message?.content || "";
    const reply = sanitizeAndGuardrail(rawContent, message);

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ reply: getKnowledgeFallback(typeof message === "string" ? message : "") }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      }
    );
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Methods": "POST, OPTIONS"
    }
  });
}
