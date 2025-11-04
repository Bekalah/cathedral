import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-content container">
        <div className="logo">
          <h1>OpenSpec Master Opus</h1>
          <span className="subtitle">Cathedral Master v2.0</span>
        </div>
        <nav className="nav">
          <a href="https://github.com/bekalah/cathedral" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="https://bekalah.github.io/cathedral" target="_blank" rel="noopener noreferrer">
            Codex
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
