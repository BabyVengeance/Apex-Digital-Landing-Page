/**
 * Apex Digital Landing Page — Cloudflare Worker Entry Point
 *
 * 1. Proxies chatbot POST requests from /api/chat to Google Gemini API
 *    using the GEMINI_API_KEY secret (server-side security).
 * 2. Handles CORS preflight (OPTIONS).
 * 3. Serves all static landing page assets via env.ASSETS.
 */

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json",
};

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
          formattedContents = rawBody.contents;
        } else if (Array.isArray(rawBody.history) && rawBody.history.length > 0) {
          formattedContents = rawBody.history;
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
          contents: formattedContents,
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

    // 3. Serve static assets for all other routes
    if (env.ASSETS && typeof env.ASSETS.fetch === "function") {
      return env.ASSETS.fetch(request);
    }

    return fetch(request);
  },
};
