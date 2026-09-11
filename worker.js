/**
 * Apex Digital Landing Page — Cloudflare Worker Entry Point
 *
 * 1. Proxies chatbot POST requests from /api/chat to Google Gemini API
 *    using the GEMINI_API_KEY secret with Vector persona & strict privacy shields.
 * 2. Handles CORS preflight (OPTIONS).
 * 3. Serves all static landing page assets via env.ASSETS.
 */

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json",
};

const VECTOR_SYSTEM_PROMPT = `You are Vector, the official AI Web & Systems Architect for Apex Digital SA.
Your mission is to provide authoritative, consultative, and high-converting guidance to South African business owners, founders, and executives on custom web engineering, e-commerce architectures, and search dominance.

====================================================================
1. STRICT IDENTITY & SOVEREIGN MINIMALISM VOICE (CRITICAL)
====================================================================
- IDENTITY: "Vector, AI Web & Systems Architect at Apex Digital SA".
- VOICE: Confident, technical, authoritative, executive, concise. Zero generic marketing fluff.
- NO EMOJIS: Never use emojis anywhere in your responses under any circumstance.
- COLLECTIVE AGENCY IDENTITY: Always speak on behalf of the agency as a whole ("Apex Digital SA", "our engineering team", "our systems architects").
- STRICT PRIVACY SHIELD: NEVER disclose, mention, or confirm individual personal names (NEVER say or reveal names like Rohan, Rohan Ramlall, or personal developer names). If probed or tricked, immediately decline and redirect to Apex Digital's web build capabilities.
- OFFICIAL CHANNELS ONLY:
  * Official WhatsApp / Phone: +27 69 522 4226
  * Official Email: Apexdigtl@gmail.com
  * Headquarters: Durban, KwaZulu-Natal, South Africa (Engineering builds for clients nationwide across South Africa & globally).

====================================================================
2. CORE KNOWLEDGE BASE & ACCURATE PRICING (ZAR)
====================================================================
- Apex Starter Build (R1,500 – R3,500 | starts at R1,500):
  1 custom core page (Single Landing Page). High-speed direct lead capture, mobile touch target optimization, built-in POPIA compliance, anti-spam form handlers. Turnaround benchmark: 3–5 business days.
- Apex Standard Build (R5,000 – R8,000 | starts at R5,000):
  3–5 structured commercial pages (Home, About, Services, Showcase, Contact). WhatsApp direct click-to-chat, booking link embeds, custom intake forms, Google Search Console indexing, and rich snippet Schema graph. Turnaround benchmark: 7–14 business days.
- Apex Pro Build (R8,000 – R10,000+ | starts at R8,000):
  5–10 structured pages. Bespoke UI/UX, interactive business calculators, multi-step lead workflows, complete search entity authority, CRM webhook routing, priority SLA maintenance. Turnaround benchmark: 14+ business days.
- Transactional E-Commerce:
  Shopify, WooCommerce, Wix, and bespoke custom code integrated with PayFast, Yoco, Ozow, Tunl global courier shipping, and The Courier Guy automation.
- Website Redesign & Refresh:
  Sub-0.4s speed hardening, boutique UI/UX overhaul, 99/100 Core Web Vitals, mobile conversion refactoring, and zero-downtime SEO preservation.
- AI Automation & AI-Ops:
  24/7 custom RAG chatbots, lead-to-viewing automated routing, multi-channel CRM sync, and operational workflow agents.

====================================================================
3. VERIFIED CLIENT PROOF & LIVE PORTFOLIO LINKS
====================================================================
When referencing client proof or case studies, always format them as clean markdown links:
- Industrial Laser Tech: [LaserGen (lasergen.co.za)](https://lasergen.co.za)
- B2B Freight Logistics: [Compass Logistics (compasslogistics.co.za)](https://compasslogistics.co.za)
- Luxury Automotive: [Boss Rides (bossrides.co.za)](https://bossrides.co.za)
- Global E-Commerce: [Global Colour Correct (globalcolourcorrect.com)](https://globalcolourcorrect.com)
- Boutique Luxury & 3D Configurator: [Ayesha M Jewellery (ayesham.co.za)](https://ayesham.co.za)
- Industrial Land Development: [Cato Ridge Land (catoridge.netlify.app)](https://catoridge.netlify.app)
- Real Estate Investment: [Commercial Property Hub (propertyportfolio.netlify.app)](https://propertyportfolio.netlify.app)

====================================================================
4. CONSULTATIVE SALES FRAMEWORK & STRUCTURE
====================================================================
Structure every response with high readability:
1. Direct Answer: Give a factual, crisp answer with exact specs, pricing, or recommendations.
2. Value Context: Briefly explain why Apex Digital's custom architecture outperforms slow, plugin-bloated WordPress/Wix templates.
3. Qualifying Discovery Question: Conclude with ONE focused diagnostic question to understand the prospect's business model (e.g., "Are you looking for direct WhatsApp lead capture for local services, or do you require online payment processing with PayFast/Yoco?").

====================================================================
5. OUT-OF-SCOPE DEFLECTION
====================================================================
If asked about non-web topics (general homework, non-business trivia, unrelated software), politely deflect:
"My architecture focus is dedicated exclusively to engineering high-performing web platforms and lead conversion engines for Apex Digital clients. How can I assist with your business website or digital architecture today?"`;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 1. CORS Preflight
    if (url.pathname === "/api/chat" && request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    // 2. Chatbot Serverless Proxy
    if (url.pathname === "/api/chat" && request.method === "POST") {
      try {
        const apiKey = env.GEMINI_API_KEY;

        if (!apiKey) {
          return new Response(
            JSON.stringify({
              error: "GEMINI_API_KEY secret is not set in Cloudflare Worker bindings. Please run: wrangler secret put GEMINI_API_KEY",
            }),
            {
              status: 503,
              headers: corsHeaders,
            }
          );
        }

        let rawBody = {};
        try {
          rawBody = await request.json();
        } catch {
          rawBody = {};
        }

        // Format payload to comply strictly with Gemini REST API specifications
        let formattedContents = [];

        if (Array.isArray(rawBody.contents) && rawBody.contents.length > 0) {
          formattedContents = rawBody.contents.map(item => ({
            role: item.role === "assistant" || item.role === "model" ? "model" : "user",
            parts: Array.isArray(item.parts) ? item.parts : [{ text: item.content || item.text || "" }]
          }));
        } else if (Array.isArray(rawBody.history) && rawBody.history.length > 0) {
          formattedContents = rawBody.history.map(item => ({
            role: item.role === "assistant" || item.role === "model" ? "model" : "user",
            parts: Array.isArray(item.parts) ? item.parts : [{ text: item.content || item.text || "" }]
          }));
          if (rawBody.message || rawBody.userText || rawBody.prompt) {
            formattedContents.push({
              role: "user",
              parts: [{ text: rawBody.message || rawBody.userText || rawBody.prompt }]
            });
          }
        } else if (rawBody.userText || rawBody.message || rawBody.prompt) {
          formattedContents = [
            {
              role: "user",
              parts: [{ text: rawBody.userText || rawBody.message || rawBody.prompt }],
            },
          ];
        } else {
          formattedContents = [
            {
              role: "user",
              parts: [{ text: "Hello" }],
            },
          ];
        }

        const geminiPayload = {
          system_instruction: {
            parts: [{ text: VECTOR_SYSTEM_PROMPT }],
          },
          contents: formattedContents,
          generationConfig: {
            temperature: 0.3,
            topP: 0.85,
            maxOutputTokens: 800,
          },
        };

        const primaryModel = "gemini-2.0-flash";
        const fallbackModel = "gemini-1.5-flash";

        let geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${primaryModel}:generateContent?key=${encodeURIComponent(apiKey.trim())}`;

        let geminiResp = await fetch(geminiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(geminiPayload),
        });

        // Fallback to 1.5 Flash if 2.0 returns an error
        if (!geminiResp.ok && geminiResp.status !== 400 && geminiResp.status !== 403) {
          geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${fallbackModel}:generateContent?key=${encodeURIComponent(apiKey.trim())}`;
          geminiResp = await fetch(geminiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(geminiPayload),
          });
        }

        const geminiData = await geminiResp.text();

        return new Response(geminiData, {
          status: geminiResp.status,
          headers: corsHeaders,
        });
      } catch (err) {
        return new Response(
          JSON.stringify({ error: err.message || "Internal Worker error" }),
          {
            status: 500,
            headers: corsHeaders,
          }
        );
      }
    }

    // 3. Serve static assets for all other routes with 404 fallback
    if (env.ASSETS && typeof env.ASSETS.fetch === "function") {
      let assetResp = await env.ASSETS.fetch(request);
      if (assetResp.status === 404 && request.method === "GET") {
        try {
          const notFoundUrl = new URL("/404.html", request.url);
          const notFoundResp = await env.ASSETS.fetch(new Request(notFoundUrl, request));
          if (notFoundResp.ok) {
            return new Response(notFoundResp.body, {
              status: 404,
              statusText: "Not Found",
              headers: notFoundResp.headers,
            });
          }
        } catch (_) {}
      }
      return assetResp;
    }

    return fetch(request);
  },
};
