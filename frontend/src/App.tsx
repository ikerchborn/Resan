import { DeepChat } from "deep-chat-react";
import "./App.css";
import { useState, useEffect } from "react";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 700);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}

function App() {
  const isMobile = useIsMobile();

  const wrapperPadding = isMobile ? "0.75rem" : "1.5rem";

  return (
    <section className="chat-wrapper" style={{ padding: wrapperPadding }}>
      <h2 className="chat-title">Tu Espacio para la Reflexión</h2>
      <p className="chat-subtitle">Vierte tus pensamientos, sentimientos y reflexiones a continuación.</p>

      <DeepChat
        connect={{ url: "/api/chat" }}
        style={{
          background: "#ffffff",
          borderRadius: "8px",
          padding: isMobile ? "0.75rem" : "1rem",
          width: "100%",
          height: isMobile ? "320px" : "420px", // altura reducida para que encaje sin zoom
          boxSizing: "border-box",
        }}
        names={{
          ai: { text: "Resan", style: { color: "#4b5d1f", fontWeight: 700 } },
          user: { text: "Tú", style: { color: "#ffffff", fontWeight: 700 }, position: "right" },
        }}
        textInput={{ placeholder: { text: "Escribe tu mensaje aquí..." } }}
        introMessage={{ text: "Bienvenido a tu espacio seguro. Siéntete libre de escribir lo que tienes en mente. Estoy aquí para escucharte." }}
        messageStyles={{
          default: { 
            ai: { backgroundColor: "#e6eacb", color: "#34401a" },
            user: { backgroundColor: "#4b5d1f", color: "#ffffff" },
          },
        }}
      />
    </section>
  );
}

export default App;
