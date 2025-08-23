import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey:
    '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'
});

export const handleChatRequest = async (req, res) => {
  try {
    const { message, wellData } = req.body;
    if (!message) return res.status(400).json({ success: false, error: 'Message is required' });

    const prompt = `You are a drilling assistant. Answer based on the well data: ${JSON.stringify(
      wellData
    )}. User question: ${message}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 500
    });

    const answer = completion.choices[0].message.content;

    res.json({ success: true, answer });
  } catch (error) {
    console.error(error);
    if (error.code === 'insufficient_quota') {
      return res.status(429).json({
        success: false,
        error: 'OpenAI quota exceeded. Please check your plan or billing.'
      });
    }
    res.status(500).json({ success: false, error: 'Something went wrong' });
  }
};
