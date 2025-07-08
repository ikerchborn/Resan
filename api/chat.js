// api/chat.js
// Esta función se ejecutará cuando tu frontend (DeepChat) haga una solicitud a /api/chat

export default async function handler(req, res) {
    // Asegúrate de que solo permites solicitudes POST, ya que DeepChat las usa para enviar mensajes
    if (req.method === 'POST') {
      try {
        // DeepChat envía un objeto con una propiedad 'messages'
        const { messages } = req.body;
  
        // **Acceder a la clave API de forma segura:**
        // Esta variable debe estar configurada en el panel de Vercel (Environment Variables)
        const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  
        if (!OPENAI_API_KEY) {
          console.error('OPENAI_API_KEY no está configurada en las variables de entorno de Vercel.');
          return res.status(500).json({ error: 'La clave de la API de OpenAI no está configurada.' });
        }
  
        // Construye la solicitud para la API de OpenAI
        // Adapta este cuerpo a la estructura exacta que espera la API de OpenAI
        // y al modelo que quieres usar (ej. gpt-3.5-turbo, gpt-4)
        const openaiPayload = {
          model: 'gpt-3.5-turbo', // O tu modelo preferido
          messages: messages.map(msg => ({
            role: msg.role === 'ai' ? 'assistant' : msg.role, // DeepChat usa 'ai', OpenAI usa 'assistant'
            content: msg.text,
          })),
        };
  
        const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
          },
          body: JSON.stringify(openaiPayload),
        });
  
        // Manejar errores de la API de OpenAI
        if (!openaiResponse.ok) {
          const errorData = await openaiResponse.json();
          console.error('Error de la API de OpenAI:', errorData);
          return res.status(openaiResponse.status).json({
            error: errorData.error ? errorData.error.message : 'Error desconocido al comunicarse con OpenAI',
          });
        }
  
        const data = await openaiResponse.json();
        // Extrae el mensaje de respuesta del asistente
        const assistantMessage = data.choices[0].message.content;
  
        // Envía la respuesta a DeepChat en el formato esperado
        // DeepChat espera un objeto con una propiedad 'text' para un mensaje simple
        res.status(200).json({ text: assistantMessage });
  
      } catch (error) {
        console.error('Error en la función serverless /api/chat:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
      }
    } else {
      // Si no es un método POST, devuelve un error
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Método ${req.method} no permitido`);
    }
  }