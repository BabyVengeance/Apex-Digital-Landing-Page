export async function onRequestPost(context) {
  try {
    const { message } = await context.request.json();

    if (!message) {
      return new Response(JSON.stringify({ error: "Message is required." }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    // Pull API key securely from Cloudflare Pages Environment Variables
    const apiKey = context.env.GEMINI_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "GEMINI_API_KEY environment variable is not configured." }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    // Query Gemini 1.5 Flash via REST endpoint
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const geminiResponse = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `You are the digital AI assistant for Apex Digital, a premium web development and software solutions studio based in Durban, South Africa. Answer inquiries helpfully, concisely, and professionally. User message: ${message}`
              }
            ]
          }
        ]
      })
    });

    if (!geminiResponse.ok) {
      const errorData = await geminiResponse.text();
      return new Response(
        JSON.stringify({ error: "Gemini API request failed", details: errorData }),
        {
          status: geminiResponse.status,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    const data = await geminiResponse.json();
    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Thank you for contacting Apex Digital. How can we assist you with your project today?";

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message || "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

// Support CORS preflight if needed
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "POST, OPTIONS"
    }
  });
}
