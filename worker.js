/**
 * Apex Digital Landing Page — Worker Entry Point
 *
 * This file does two things:
 * 1. Proxies chatbot POST requests from /api/chat to the Gemini API
 *    using the GEMINI_API_KEY secret (so the key never reaches the browser).
 * 2. Serves all other requests from your static assets.
 *
 * IMPORTANT: Keep this file in your project root alongside wrangler.toml.
 * If you deploy with Wrangler without this file, it will wipe the Worker
 * code and all bindings (including the GEMINI_API_KEY secret).
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // ------------------------------------------------------------------
    // /api/chat — Server-side proxy for the Gemini API
    // ------------------------------------------------------------------
    // Your frontend chatbot JS should POST to /api/chat with a Gemini-style
    // request body. This Worker injects the API key server-side and forwards
    // the request to Google's Gemini API. The response is passed straight
    // back to the browser.
    //
    // Example frontend call:
    //   fetch("/api/chat", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       contents: [{ parts: [{ text: userMessage }] }]
    //     })
    //   })
    // ------------------------------------------------------------------
    if (url.pathname === "/api/chat" && request.method === "POST") {
      try {
        const body = await request.text();

        const geminiUrl =
          "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" +
          env.GEMINI_API_KEY;

        const geminiResp = await fetch(geminiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: body,
        });

        const geminiData = await geminiResp.text();

        return new Response(geminiData, {
          status: geminiResp.status,
          headers: { "Content-Type": "application/json" },
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    // ------------------------------------------------------------------
    // All other requests — serve static assets
    // ------------------------------------------------------------------
    return env.ASSETS.fetch(request);
  },
};
