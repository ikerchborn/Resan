import './Home.css';
import leaf from '../assets/logo.svg';

export default function Home() {
  return (
    <main className="home">
      <section className="hero">
        <h1 className="title">Resan</h1>
        <p className="subtitle">Tu compañero de bienestar emocional. Un rincón tranquilo en internet para reflexionar y encontrar apoyo.</p>
        <img src={leaf} alt="Decorative leaf" className="hero-leaf" />
      </section>
      <section className="callout">
        <h2>Hola, comparte con nosotros lo que sientes</h2>
      </section>
    </main>
  );
}
