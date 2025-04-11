export async function getGeminiSuggestion(prompt: string): Promise<string> {
    const API_KEY = "AIzaSyBXhX-Lnvqo6sUgtdi6OJP0hKuQrjEiLZ4";
  
    const fullPrompt = `
  You are a helpful and practical financial advisor. Based on this user's data, give 2–3 short and personalized suggestions to improve financial health (e.g. save more, invest better, cut expenses).
  
  ${prompt}
  `;
  
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: fullPrompt }] }],
          generationConfig: {
            temperature: 0.8,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 300,
          },
        }),
      }
    );
  
    const data = await response.json();
  
    // Debug log
    console.log("Gemini raw response:", data);
  
    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No suggestions returned. Try modifying your inputs.";
  
    return text;
  }
  