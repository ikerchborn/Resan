// api/chat.js
// Esta función se ejecutará cuando tu frontend (DeepChat) haga una solicitud a /api/chat

// Memoria en servidor por sesión (en producción usar Redis u otro almacén externo)
const sessions = new Map(); // sessionId -> [{role: 'system'|'user'|'assistant', content: string}]

// Prompt del sistema (se agrega una sola vez por sesión)
const SYSTEM_PROMPT = 'Responde siempre de forma amable, empática y con un enfoque de apoyo psicológico y emocional.';

// Limita el tamaño de historial para evitar desbordar tokens (aprox. por número de mensajes)
const MAX_MESSAGES = 40; // ajustable

export default async function handler(req, res) {
    // Asegúrate de que solo permites solicitudes POST, ya que DeepChat las usa para enviar mensajes
    if (req.method === 'POST') {
      try {
        // Identificador de sesión
        const sessionId = req.headers['x-session-id'] || req.body?.sessionId;
        if (!sessionId) {
          return res.status(400).json({ error: 'Missing x-session-id' });
        }

        // Mensaje(s) del usuario en este turno (el frontend envía solo el turno actual)
        const { messages = [] } = req.body;
  
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
        // Recupera historial o crea si no existe
        if (!sessions.has(sessionId)) {
          // Inicializa con el prompt del sistema
          sessions.set(sessionId, [{ role: 'system', content: SYSTEM_PROMPT }]);
        }

        const history = sessions.get(sessionId);

        // Agrega turno(s) de usuario de esta petición al historial
        for (const msg of messages) {
          if (msg && msg.role === 'user' && typeof msg.text === 'string') {
            history.push({ role: 'user', content: msg.text });
          }
        }

        // Aplica recorte simple si excede MAX_MESSAGES
        if (history.length > MAX_MESSAGES) {
          // Conserva el system y los últimos N-1 mensajes
          const system = history[0];
          const tail = history.slice(-1 * (MAX_MESSAGES - 1));
          sessions.set(sessionId, [system, ...tail]);
        }

        const openaiPayload = {
          model: 'gpt-3.5-turbo', // O tu modelo preferido
          messages: sessions.get(sessionId),
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

        // Guarda respuesta del asistente en el historial de la sesión
        const updated = sessions.get(sessionId) || [];
        updated.push({ role: 'assistant', content: assistantMessage });
        sessions.set(sessionId, updated);
  
        // Envía la respuesta a DeepChat en el formato esperado
        // DeepChat espera un objeto con una propiedad 'text' para un mensaje simple
        res.status(200).json({ text: assistantMessage });
  
      } catch (error) {
        console.error('Error en la función serverless /api/chat:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
      }
    } else {
      //cambio necesario
      // Si no es un método POST, devuelve un error
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Método ${req.method} no permitido`);
    }
  }
