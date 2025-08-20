// React core
import React, { useState, useRef, useEffect } from 'react';
import logoLeaf from './assets/logo.svg';
import './App.css';
import { DeepChat } from 'deep-chat-react';

function App() {

  // Generate or retrieve a per-tab sessionId for server-side memory
  const [sessionId] = useState(() => {
    const existing = sessionStorage.getItem('sessionId');
    if (existing) return existing;
    const uuid = (crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`);
    sessionStorage.setItem('sessionId', uuid);
    return uuid;
  });

  // Lee historial guardado en localStorage (si existe)
  const [conversationHistory, setConversationHistory] = useState(() => {
    try {
      const stored = sessionStorage.getItem('conversationHistory');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Error leyendo conversación en sesión', e);
      return [];
    }
  });

  // Sincroniza el historial en localStorage cada vez que cambie
  useEffect(() => {
    try {
      sessionStorage.setItem('conversationHistory', JSON.stringify(conversationHistory));
    } catch (e) {
      console.error('Error guardando conversación en sesión', e);
    }
  }, [conversationHistory]);
  const chatRef = useRef(null);

  // Guarda el nuevo mensaje del usuario
  const handleUserMessage = (body) => {
    const lastUser = [...body.messages].reverse().find(m => m.role === 'user');
    if (lastUser) {
      setConversationHistory((prev) => [...prev, { role: 'user', text: lastUser.text }]);
    }
    return body;
  };

  // Guarda la respuesta del asistente (IA)
  const handleAIResponse = (body) => {
    // Nuestra API devuelve { text: string }
    if (body && typeof body.text === 'string') {
      setConversationHistory((prev) => [...prev, { role: 'ai', text: body.text }]);
    }
    return body;
  };

  return (
    <>
      <header className="top-nav">
        <div className="nav-content">
          <div className="brand">
            <img src={logoLeaf} alt="Resan logo" className="nav-logo" />
            <span className="brand-name">Resan</span>
          </div>
          <nav className="nav-links">
            <a href="index.html">Chat</a>
            <a href="recursos.html">Recursos</a>
            <a href="tests.html">Tests</a>
            <a href="ayuda.html">Ayuda</a>
          </nav>
        </div>
      </header>
      <main>
        <h1 className="site-title">Resan</h1>
        <p className="site-subtitle">Tu compañero de bienestar emocional. Un rincón tranquilo en internet para reflexionar y encontrar apoyo.</p>

        <div id="chat" className="chat-wrapper">
          <h2 className="chat-title">Tu Espacio para la Reflexión</h2>
          <p className="chat-subtitle">Vierte tus pensamientos, sentimientos y reflexiones a continuación.</p>

          <DeepChat
            ref={chatRef}
            style={{ borderRadius: '10px', height: '450px', width: '100%' }}
            connect={{
              url: '/api/chat',
              method: 'POST',
              stream : 'True',
              headers: {
                'Content-Type': 'application/json',
                'x-session-id': sessionId,
              },
            }}
            interceptors={{
              request: (body) => {
                // Añade el mensaje del usuario actual al historial de UI y sincroniza cache de sesión
                const lastUserMsg = [...(body?.messages ?? [])].reverse().find(m => m.role === 'user');
                const pendingText = lastUserMsg?.text ?? '';
                const pendingUser = { role: 'user', text: pendingText };
                const updatedHistory = [...conversationHistory, pendingUser];
                setConversationHistory(updatedHistory);

                const newBody = {
                  ...body,
                  // Para el backend solo enviamos el turno actual; el servidor mantiene el historial por sessionId
                  messages: [pendingUser]
                };

                // Debug: verify messages being sent
                try {
                  console.debug('[DeepChat] Sending roles:', newBody.messages.map(m => m.role), 'sessionId:', sessionId);
                } catch (e) {}

                return newBody;
              },
              response: (body) => {
                return handleAIResponse(body); // guarda la respuesta del asistente
              }
            }}
            messageStyles={{
              user: { backgroundColor: '#ffffff' },
              ai: { backgroundColor: '#f5f5f5' },
            }}
          />
        </div>


      </main>
    </>
  );
}

export default App;
