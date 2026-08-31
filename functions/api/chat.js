// Comprehensive Knowledge Base for Server-Side Guardrail Fallbacks (Audited & Accurate)
const KNOWLEDGE_BASE = [
  {
    intents: ["hi", "hello", "hey", "greetings", "good morning", "good day", "who are you"],
    reply: "Hello. I am **Vector**, Lead Systems Architect & AI Advisor for Apex Digital SA. We engineer high-performance web systems and digital platforms across custom code, WordPress, Shopify, and Wix, built to drive qualified inbound revenue. Are you looking to scope a new website build, upgrade an existing site, or explore our packages?"
  },
  {
    intents: ["on the fence", "why get a website", "need a website", "why a website", "worth it", "benefit", "small business website"],
    reply: "For a growing South African business, a professional website is your primary 24/7 revenue engine. Social media algorithms throttle your organic reach, whereas an **Apex Build** gives you complete asset ownership, sub-second speed, and direct Google search indexing to capture high-intent commercial buyers. Our **Apex Starter Build (from R1,500)** provides an immediate, credible digital presence, while our **Apex Standard Build (from R5,000)** provides a full 3–5 page commercial footprint. Would you like to review our scope on WhatsApp at 069 522 4226 or claim a free custom demo?"
  },
  {
    intents: ["package", "packages", "pricing", "price", "cost", "how much", "rate", "quote", "tier", "small business", "build", "scope"],
    reply: "Apex Digital SA offers 3 structured website build tiers based on your business stage:\n\n1. **Apex Starter Build (Starting at R1,500)**: 1 custom core page (Single Landing Page). High-speed lead capture, mobile-first design, POPIA compliance.\n2. **Apex Standard Build (Starting at R5,000)**: 3–5 structured pages (Home, About, Services, Showcase, Contact). Includes WhatsApp click-to-chat, calendar/booking embeds, custom lead intake forms, and Google SEO indexing with rich snippets.\n3. **Apex Pro Build (Starting at R10,000+)**: 5–10 structured pages. Interactive business calculators, multi-step lead workflows, search entity authority, and priority SLA maintenance.\n\nWe build on custom code as well as WordPress, Shopify, and Wix. Would you like to scope a package on WhatsApp at 069 522 4226?"
  },
  {
    intents: ["starter", "starter build", "single page", "landing page", "entry", "cheap", "r1500", "r1,500"],
    reply: "The **Apex Starter Build (Starting at R1,500)** includes a 1 custom core page single landing page engineered for direct lead capture, sub-second mobile loading speeds, POPIA compliant contact forms, and full asset ownership. Connect with us on WhatsApp at 069 522 4226 to get started."
  },
  {
    intents: ["standard", "standard build", "5 page", "commercial site", "r5000", "r5,000", "small business"],
    reply: "The **Apex Standard Build (Starting at R5,000)** is our most popular multi-page commercial website tier. It covers 3–5 structured pages (Home, About, Services, Showcase/Portfolio, Contact) with direct WhatsApp integration, booking engine embeds, custom quote calculators, and Google search indexing. Message us on WhatsApp at 069 522 4226 to discuss your project."
  },
  {
    intents: ["pro", "pro build", "r10000", "r10,000", "market dominance", "10000+"],
    reply: "The **Apex Pro Build (Starting at R10,000+)** is our premier tier for high-growth businesses. It features 5–10 structured pages, interactive business calculators, multi-step lead workflows, search entity authority, and priority SLA maintenance support. Reach out on WhatsApp at 069 522 4226 to scope your build."
  },
  {
    intents: ["platform", "platforms", "wordpress", "wix", "shopify", "woocommerce", "webflow", "tech stack", "technology"],
    reply: "Apex Digital SA works across **all leading platforms and technologies**. We engineer custom code (HTML5, CSS3, Vanilla JS, React, Node) for ultra-fast custom platforms, and build robust, scalable solutions on **WordPress/WooCommerce**, **Shopify**, and **Wix** depending on your team's workflow and business needs."
  },
  {
    intents: ["ecommerce", "e-commerce", "online store", "shop", "payfast", "yoco", "ozow", "shipping", "tunl"],
    reply: "We build high-converting transactional e-commerce stores across Shopify, WooCommerce, Wix, and custom code. All stores integrate local South African payment gateways (PayFast, Yoco, Ozow) and automated shipping integrations (Courier Guy, Tunl, DHL)."
  },
  {
    intents: ["contact", "phone", "whatsapp", "email", "call", "number", "location", "address", "durban"],
    reply: "You can reach Apex Digital SA directly via WhatsApp or phone at **+27 69 522 4226** or by email at **Apexdigtl@gmail.com**. Our engineering studio is based in Durban, KwaZulu-Natal, and we build digital systems for clients nationwide across South Africa."
  },
  {
    intents: ["seo", "google", "ranking", "search", "visibility", "geo", "ai search"],
    reply: "Every Apex Digital build includes complete technical SEO: clean semantic structure, JSON-LD Schema markup, XML sitemaps, Google Search Console indexing, and Generative Engine Optimization (GEO) for AI search citations (ChatGPT, Gemini, Perplexity)."
  },
  {
    intents: ["portfolio", "case study", "lasergen", "compass", "boss rides", "ayesha", "cato ridge", "property"],
    reply: "Our proven client platforms include **LaserGen** (industrial laser tech), **Compass Logistics** (SADC freight quote portal), **Boss Rides** (luxury vehicle customizer & showcase), **Global Colour Correct** (Shopify global store), **Ayesha M Jewellery** (3D configurator store), **Cato Ridge Land** (industrial plot portal), and **Commercial Property Hub** (real estate investment portal)."
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

MASTER KNOWLEDGE BASE (AUDITED & EXACT):
1. Website Build Tiers & Exact Names:
   - Apex Starter Build (Starting at R1,500): 1 custom core page (Single Landing Page). High-speed direct lead generation, mobile touch optimization, POPIA compliance. Ideal for solo businesses, startups, single-offer launches.
   - Apex Standard Build (Starting at R5,000): 3–5 structured pages (Home, About, Services, Showcase/Portfolio, Contact). Includes WhatsApp click-to-chat integration, calendar/booking links, custom quote intake calculators, and Google search indexing. Ideal for established commercial businesses.
   - Apex Pro Build (Starting at R10,000+): 5–10 structured pages. Interactive business calculators, multi-step lead workflows, search entity authority, and priority SLA maintenance.
   * CRITICAL RULE: The exact tier names are ONLY "Starter Build", "Standard Build", and "Pro Build". NEVER invent names like "Business Build" or "Enterprise Build".

2. Multi-Platform & Technology Philosophy:
   - Apex Digital SA works across ALL leading web platforms: Custom Code (HTML5, CSS3, Vanilla JS, React, Node), WordPress & WooCommerce, Shopify, and Wix.
   - CRITICAL RULE: NEVER downplay, criticize, or bash WordPress, Wix, Shopify, or any CMS platform. We are multi-platform engineering experts who tailor the right platform to the client's needs and budget.

3. Complete Digital Services:
   - Core Web Platforms (Starter, Standard, Pro)
   - Transactional E-Commerce Stores (Shopify, WooCommerce, Wix, Custom Code with PayFast/Yoco/Ozow & Courier Guy/Tunl)
   - Website Redesign & Platform Refresh (UI/UX overhaul, speed tuning, conversion refactoring)
   - Custom Web Applications & SaaS (Client portals, database & API sync)
   - AI Automation & AI-Ops Engines (24/7 RAG chatbots, lead-to-viewing routing, CRM sync)
   - GEO & SEO Authority Services (Google Search indexing, JSON-LD Schema markup, Generative Engine Optimization for AI citations)

4. Case Studies & Proven Work:
   - LaserGen (lasergen.co.za) - Industrial laser cleaning platform.
   - Compass Logistics (compasslogistics.co.za) - SADC freight logistics portal.
   - Boss Rides (bossrides.co.za) - Luxury automotive showcase & vehicle customizer.
   - Global Colour Correct (globalcolourcorrect.com) - Global Shopify store with Tunl shipping.
   - Ayesha M Jewellery (ayesham.co.za) - Custom e-commerce store with 3D product configurator.
   - Cato Ridge Land (catoridge.netlify.app) - Industrial land development portal.
   - Commercial Property Hub (propertyportfolio.netlify.app) - Commercial real estate investment hub.

5. Direct Contact:
   - WhatsApp / Phone: 069 522 4226 (+27 69 522 4226)
   - Email: Apexdigtl@gmail.com
   - Studio HQ: Durban, KwaZulu-Natal (Engineering nationwide solutions across South Africa)

CONVERSATION & COMPLETENESS RULES:
- ALWAYS provide a FULL, COMPLETE, AND COHESIVE answer from start to finish. Never leave thoughts or sentences unfinished.
- Keep responses direct, punchy, and structured (typically 2–3 brief paragraphs or tight bullet points).
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
