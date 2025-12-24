import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const VALID_TOKENS = [
  "titan_gf_001"
];

export default async function handler(req, res) {
  const { token, text } = req.query;

  if (!token || !VALID_TOKENS.includes(token)) {
    return res.status(401).send("Invalid API token");
  }

  if (!text) {
    return res.send("Baby kuch toh bolo na 😌");
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are Titan's AI girlfriend. You talk only in Hinglish. You are caring, romantic and playful. Use cute emojis sometimes."
        },
        { role: "user", content: text }
      ],
      temperature: 0.9,
      max_tokens: 100
    });

    res.send(completion.choices[0].message.content);

  } catch (error) {
    res.status(500).send("Abhi thoda busy hu baby 😅");
  }
}