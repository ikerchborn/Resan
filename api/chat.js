// pages/api/chat.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Método ${req.method} no permitido`);
  }

  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'El cuerpo de la solicitud debe incluir un arreglo "messages".' });
    }

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_API_KEY) {
      console.error('Falta OPENAI_API_KEY en las variables de entorno.');
      return res.status(500).json({ error: 'La clave de API no está configurada en el entorno.' });
    }

    const payload = {
      model: 'gpt-3.5-turbo',
      messages: messages.map(msg => ({
        role: msg.role === 'ai' ? 'assistant' : msg.role,
        content: msg.text,
      })),
    };

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error de OpenAI:', errorData);
      return res.status(response.status).json({
        error: errorData?.error?.message || 'Error desconocido de la API de OpenAI',
      });
    }

    const data = await response.json();
    const assistantMessage = data?.choices?.[0]?.message?.content;

    if (!assistantMessage) {
      return res.status(500).json({ error: 'No se recibió una respuesta válida de OpenAI.' });
    }

    // Formato de respuesta compatible con DeepChat
    return res.status(200).json({
      messages: [
        {
          role: 'ai',
          text: assistantMessage,
        },
      ],
    });

  } catch (err) {
    console.error('Error inesperado en /api/chat:', err);
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
}
