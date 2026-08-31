// Comprehensive Knowledge Base for Server-Side Guardrail Fallbacks
const KNOWLEDGE_BASE = [
  {
    intents: ["package", "packages", "pricing", "price", "cost", "how much", "rate", "quote", "tier", "small business", "build"],
    reply: "For small businesses, the **Apex Business Build (Starting at R5,000)** is our most popular package. It delivers a 3–5 page custom commercial architecture with direct WhatsApp integration, booking tools, sub-0.4s load speeds, and Google search indexing. If you need a fast 1–2 page entry page, our **Apex Starter Build (Starting at R1,500)** is also available. Would you like to discuss your requirements or message us on WhatsApp at 069 522 4226?"
  },
  {
    intents: ["starter", "single page", "landing page", "entry", "cheap", "r1500", "r1,500"],
    reply: "The **Apex Starter Build (Starting at R1,500)** includes a 1–2 page custom hand-coded landing page with sub-second loading speeds, mobile-first touch optimization, POPIA compliant contact forms, and 100% custom code ownership with zero monthly builder fees. Connect with us on WhatsApp at 069 522 4226 to get started."
  },
  {
    intents: ["enterprise", "pro", "r10000", "r10,000", "custom software", "crm", "automation"],
    reply: "The **Apex Enterprise Build (Starting at R10,000+)** is our premier tier for high-growth businesses. It features 5–10+ bespoke pages, custom interactive calculators, multi-step customer onboarding workflows, CRM webhooks, and 1st month free SLA maintenance. Reach out on WhatsApp at 069 522 4226 to scope your project."
  },
  {
    intents: ["contact", "phone", "whatsapp", "email", "call", "number", "location", "address", "durban"],
    reply: "You can reach Apex Digital SA directly via WhatsApp or phone at **+27 69 522 4226** or by email at **Apexdigtl@gmail.com**. Our engineering studio is based in Durban, KwaZulu-Natal, and we build high-performance web systems for clients nationwide across South Africa."
  },
  {
    intents: ["speed", "fast", "performance", "wordpress", "slow", "page speed"],
    reply: "Apex Digital builds 100% hand-crafted sites in HTML5, CSS3, and Vanilla JavaScript with sub-0.4s load times and 99/100 Google PageSpeed scores. We eliminate heavy WordPress plugins, builder locks, and security vulnerabilities so your visitors convert instantly."
  },
  {
    intents: ["seo", "google", "ranking", "search", "visibility", "find on google"],
    reply: "Every Apex Digital build includes complete technical SEO: clean semantic HTML5, JSON-LD Schema markup, XML sitemaps, Google Search Console indexing, and Generative Engine Optimization (GEO) for AI search citations (ChatGPT, Gemini, Perplexity)."
  }
];

function getKnowledgeFallback(userQuery) {
  const query = (userQuery || "").toLowerCase();
  for (const item of KNOWLEDGE_BASE) {
    if (item.intents.some(intent => query.includes(intent))) {
      return item.reply;
    }
  }
  return "Hello! I'm Vector from Apex Digital. We engineer bespoke, sub-second web platforms and software solutions designed to double conversion rates. How can I assist you with your project today? You can also message us directly on WhatsApp at 069 522 4226.";
}

function sanitizeAndGuardrail(text, userQuery) {
  if (!text || typeof text !== "string") return getKnowledgeFallback(userQuery);

  let clean = text;

  // 1. Strip reasoning and thinking tags
  clean = clean.replace(/<think>[\s\S]*?<\/think>/gi, "");
  clean = clean.replace(/```(?:thinking|thought|reasoning)[\s\S]*?```/gi, "");

  // 2. Strip safety evaluation / moderation artifacts (e.g. "User Safety: safe", "Safety: safe")
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

  // 5. Guardrail check: if output is too short, degenerate, or contains leftover safety labels
  if (clean.length < 25 || /^(?:safe|unsafe|user\s+safety|none|n\/a|ok)$/i.test(clean)) {
    return getKnowledgeFallback(userQuery);
  }

  return clean;
}

const SYSTEM_PROMPT = `You are Vector, the lead AI digital advisor for Apex Digital SA (apexdigitalsa.com), a premier web architecture and custom software engineering studio based in Durban, South Africa.

MASTER KNOWLEDGE BASE:
1. Build Tiers & Pricing:
   - Apex Starter Build (From R1,500): 1–2 page hand-coded single landing page. Sub-second mobile loading, direct lead capture, zero monthly builder fees. Ideal for startups and single-service businesses.
   - Apex Business Build (From R5,000): 3–5 page custom commercial architecture (Home, About, Services, Showcase, Contact). Includes WhatsApp click-to-chat, booking embeds, quote calculators, Google SEO indexing. Ideal for established South African businesses.
   - Apex Enterprise Build (From R10,000+): 5–10+ bespoke pages, custom interactive calculators, multi-step customer workflows, CRM integration, 1st month SLA maintenance.
2. Technical Architecture:
   - 100% custom hand-crafted code (HTML5, CSS3, Vanilla JS).
   - Sub-0.4s load speed, 99/100 Google PageSpeed score.
   - Zero WordPress/Elementor plugin bloat, zero security exploits, zero monthly builder lock-ins.
   - Strict POPIA data protection compliance.
3. Contact Details:
   - WhatsApp / Phone: 069 522 4226 (+27 69 522 4226)
   - Email: Apexdigtl@gmail.com
   - Location: Durban, KwaZulu-Natal (Serving clients nationwide)

CONVERSATION & GUARDRAIL RULES:
- Answer inquiries helpfully, concisely, and professionally based on the facts above.
- Recommend the best package based on what the client asks.
- Guide prospects toward booking consultations or messaging via WhatsApp at 069 522 4226.
- CRITICAL: Output ONLY your direct answer to the customer. NEVER include safety classification headers (like "User Safety: safe"), system tags, internal thoughts, or draft notes.`;

export async function onRequestPost(context) {
  try {
    const { message } = await context.request.json();

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

    // Call OpenRouter completions endpoint
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
        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPT
          },
          {
            role: "user",
            content: message.trim()
          }
        ],
        temperature: 0.6,
        max_tokens: 300
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
