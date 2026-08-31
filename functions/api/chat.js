export async function onRequestPost(context) {
  try {
    const { message } = await context.request.json();

    if (!message) {
      return new Response(JSON.stringify({ error: "Message is required." }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const apiKey = context.env.GROQ_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "GROQ_API_KEY environment variable is not configured." }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    // Resilient model fallback sequence to guarantee high-availability
    const preferredModel = context.env.GROQ_MODEL ? [context.env.GROQ_MODEL] : [];
    const candidateModels = [
      ...preferredModel,
      "llama-3.1-8b-instant",
      "llama3-70b-8192",
      "llama3-8b-8192",
      "mixtral-8x7b-32768",
      "gemma2-9b-it"
    ];

    // Remove duplicates while preserving order
    const modelsToTry = [...new Set(candidateModels)];

    let reply = null;
    let lastError = null;

    const systemPrompt = "You are the digital AI assistant for Apex Digital, a premium web development and software solutions studio based in Durban, South Africa. Answer inquiries helpfully, concisely, and professionally. Guide prospective clients toward booking consultations or messaging via WhatsApp.";

    for (const model of modelsToTry) {
      try {
        const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey.trim()}`
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
            max_tokens: 350
          })
        });

        if (groqResponse.ok) {
          const data = await groqResponse.json();
          reply = data.choices?.[0]?.message?.content;
          if (reply) break;
        } else {
          const errText = await groqResponse.text();
          lastError = { status: groqResponse.status, details: errText, model };
          // If model is not found, continue to next candidate model
          continue;
        }
      } catch (reqErr) {
        lastError = { error: reqErr.message, model };
      }
    }

    if (!reply) {
      return new Response(
        JSON.stringify({ 
          error: "Groq API request failed across all candidate models", 
          details: lastError 
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
