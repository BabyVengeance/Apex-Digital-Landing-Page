function sanitizeReply(text) {
  if (!text || typeof text !== "string") return "";
  let clean = text;

  // 1. Strip standard <think>...</think> tags
  clean = clean.replace(/<think>[\s\S]*?<\/think>/gi, "");

  // 2. Strip code-block thinking artifacts
  clean = clean.replace(/```(?:thinking|thought|reasoning)[\s\S]*?```/gi, "");

  // 3. Strip un-tagged conversational thinking process leaks
  if (/^(?:here['’]?s\s+(?:a\s+)?thinking\s+process|thinking\s+process|thought\s+process|internal\s+reasoning)/i.test(clean.trim())) {
    // Extract explicitly quoted or delineated draft response if present
    const responseMatch = clean.match(/(?:(?:draft|final)\s+response(?:\s*\([^)]*\))?|response\s*to\s*user|final\s*answer):\s*["“']?([\s\S]+?)(?:["”']?\s*(?:\n\s*check\s+against|\n\s*guidelines:|\n\s*[0-9]+\.|\n\s*[A-Z][a-zA-Z\s]+:\s*(?:yes|no)|$))/i);
    
    if (responseMatch && responseMatch[1]) {
      clean = responseMatch[1].trim().replace(/^["“']|["”']$/g, "").trim();
    } else {
      // Fallback: strip checklist/bullet lines and keep clean dialogue
      const lines = clean.split("\n");
      const filtered = lines.filter(line => {
        const trimmed = line.trim();
        return !/^(?:[0-9]+\.|\*|-|•|analyze|identify|check\s+against|determine|draft|helpful\?|concise\?|professional\?|mentions\?|role\?)/i.test(trimmed);
      });
      clean = filtered.join("\n").trim();
    }
  }

  // 4. Strip surrounding stray quotes
  clean = clean.replace(/^["“]([\s\S]*)["”]$/, "$1").trim();

  return clean;
}

export async function onRequestPost(context) {
  try {
    const { message } = await context.request.json();

    if (!message) {
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

    // Prioritized list of ultra-fast free instruct models + fallback router
    const modelOrder = [
      "meta-llama/llama-3.3-70b-instruct:free",
      "google/gemini-2.0-flash-exp:free",
      "meta-llama/llama-3.1-8b-instruct:free",
      "mistralai/mistral-small-24b-instruct-2501:free",
      "qwen/qwen-2.5-72b-instruct:free",
      "openrouter/free"
    ];

    // Call OpenRouter completions endpoint with fallback models & reasoning disabled
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey.trim()}`,
        "HTTP-Referer": "https://apexdigitalsa.com",
        "X-Title": "Apex Digital SA"
      },
      body: JSON.stringify({
        models: modelOrder,
        messages: [
          {
            role: "system",
            content: "You are Vector, the digital AI assistant for Apex Digital, a premium web development and software solutions studio based in Durban, South Africa. Answer inquiries helpfully, concisely, and professionally. Guide prospective clients toward booking consultations or messaging via WhatsApp at 069 522 4226. CRITICAL RULE: Output ONLY the direct final response to the user. NEVER include internal thoughts, thinking process, reasoning steps, or checklists in your reply."
          },
          {
            role: "user",
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 250,
        reasoning: {
          effort: "none"
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      return new Response(
        JSON.stringify({ error: "OpenRouter API request failed", details: errorData }),
        {
          status: response.status,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    const data = await response.json();
    const rawContent = data.choices?.[0]?.message?.content || "";
    const reply = sanitizeReply(rawContent) || "Hello! I'm Vector from Apex Digital. How can I assist you with your web or software project today? You can also message us directly on WhatsApp at 069 522 4226.";

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
