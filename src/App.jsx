// React core
import React, { useState, useRef, useEffect } from 'react';
import logoLeaf from './assets/logo.svg';
import './App.css';
import { DeepChat } from 'deep-chat-react';

function App() {

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
    if (body?.text) {
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
              stream: { simulation: 6 },
              url: '/api/chat',
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
            }}
            interceptors={{
              request: (body) => {
                // Inserta el prompt del sistema
                const systemPrompt = {
                  role: 'system',
                  text: 'Responde siempre de forma amable, empática y con un enfoque de apoyo psicológico y emocional.'
                };

                // Añade el mensaje del usuario actual al historial y sincroniza cache
                const pendingUser = { role: 'user', text: body.messages[0].text };
                const updatedHistory = [...conversationHistory, pendingUser];
                setConversationHistory(updatedHistory);

                const newBody = {
                  ...body,
                  messages: [systemPrompt, ...updatedHistory]
                };

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
