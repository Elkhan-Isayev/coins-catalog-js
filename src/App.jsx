import { Link, Outlet } from 'react-router-dom';

// Shared shell: a slim header on every page plus the routed content.
export default function App() {
  return (
    <div className="app">
      <header className="app-header">
        <Link to="/" className="app-logo">
          <span aria-hidden="true">◉</span> Coins Catalog
        </Link>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/coins">Coins</Link>
        </nav>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
      <footer className="app-footer">
        <p>A lightweight, static coins catalog. Built with React &amp; Vite.</p>
      </footer>
    </div>
  );
}
