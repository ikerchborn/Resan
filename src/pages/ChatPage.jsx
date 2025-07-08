import { DeepChat } from 'deep-chat-react';
import './ChatPage.css';

export default function ChatPage() {
  return (
    <main className="chat-wrapper">
      <h2 className="chat-title">Tu Espacio para la Reflexión</h2>
      <div className="chat-container">
        <DeepChat
          style={{ borderRadius: '8px', height: '400px' }}
          request={{ url: '/api/chat' }}
        />
      </div>
    </main>
  );
}
