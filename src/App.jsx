import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import logoLeaf from './assets/logo.svg';
import './App.css';

// Importa DeepChat y sus estilos
import { DeepChat } from 'deep-chat-react';

function App() {
  return (
    <>
      <header className="top-nav">
        <div className="nav-content">
          <div className="brand">
            <img src={logoLeaf} alt="Resan logo" className="nav-logo" />
            <span className="brand-name">Resan</span>
          </div>
          <nav className="nav-links">
            <a href="#chat">Chat</a>
            <a href="#recursos">Recursos</a>
            <a href="#ayuda">Ayuda</a>
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
          // demo={true} // Quita esto cuando uses tu propia API para que no use la demo
          style={{ borderRadius: '10px', height: '450px', width: '100%' }} // Ajusta el estilo como necesites
          connect={{
            url: '/api/chat', // Endpoint serverless
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
          }}
          messageStyles={{
            user: { backgroundColor: '#ffffff' },
            ai: { backgroundColor: '#f5f5f5' }
          }}
           // Puedes añadir otras propiedades de DeepChat aquí, como defaultMessages, textInput, etc.
      />
      </div>
      </main>
    </>
  );
}
export default App
