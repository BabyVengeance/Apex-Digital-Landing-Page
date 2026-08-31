export async function onRequestPost(context) {
  try {
    const { message } = await context.request.json();

    if (!message) {
      return new Response(JSON.stringify({ error: "Message is required." }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const rawApiKey = context.env.GROQ_API_KEY;

    if (!rawApiKey) {
      return new Response(
        JSON.stringify({ error: "GROQ_API_KEY environment variable is not configured in Cloudflare." }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    // Sanitize API key (strip quotes, spaces, accidental newlines)
    const apiKey = rawApiKey.trim().replace(/^["']|["']$/g, '');

    // Auto-discover active models authorized for this exact API Key
    let availableModels = [];
    try {
      const modelsRes = await fetch("https://api.groq.com/openai/v1/models", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${apiKey}`
        }
      });
      if (modelsRes.ok) {
        const modelsData = await modelsRes.json();
        availableModels = (modelsData.data || []).map(m => m.id);
      }
    } catch (e) {
      // Fall back to static candidates if discovery endpoint fails
    }

    // Priority candidates
    const defaultCandidates = [
      "llama-3.3-70b-versatile",
      "llama-3.1-8b-instant",
      "llama-3.1-70b-versatile",
      "llama3-70b-8192",
      "llama3-8b-8192",
      "mixtral-8x7b-32768",
      "gemma2-9b-it"
    ];

    let modelsToTry = [];
    if (availableModels.length > 0) {
      // Filter out non-chat models (whisper, embeddings, guard, tts)
      const validChatModels = availableModels.filter(m => 
        !m.includes("whisper") && 
        !m.includes("embed") && 
        !m.includes("guard") &&
        !m.includes("tts")
      );
      
      const prioritized = defaultCandidates.filter(c => validChatModels.includes(c));
      const others = validChatModels.filter(c => !defaultCandidates.includes(c));
      modelsToTry = [...prioritized, ...others];
    }

    if (modelsToTry.length === 0) {
      modelsToTry = defaultCandidates;
    }

    let reply = null;
    let lastError = null;

    const systemPrompt = "You are Vector, the digital AI assistant for Apex Digital, a premium web development and software solutions agency based in Durban, South Africa. Answer inquiries helpfully, concisely, and professionally. Guide prospective clients toward booking consultations or messaging via WhatsApp at 069 522 4226.";

    for (const model of modelsToTry) {
      try {
        const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: model,
            messages: [
              {
                role: "system",
                content: systemPrompt
              },
              {
                role: "user",
                content: message
              }
            ],
            temperature: 0.7,
            max_tokens: 300
          })
        });

        if (groqResponse.ok) {
          const data = await groqResponse.json();
          reply = data.choices?.[0]?.message?.content;
          if (reply) break;
        } else {
          const errText = await groqResponse.text();
          lastError = { status: groqResponse.status, details: errText, model };
        }
      } catch (err) {
        lastError = { error: err.message, model };
      }
    }

    if (!reply) {
      return new Response(
        JSON.stringify({ 
          error: "Groq API request failed", 
          details: lastError,
          availableModelsDiscovered: availableModels 
        }),
        {
          status: 502,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

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
