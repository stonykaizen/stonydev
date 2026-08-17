import { Component, type ReactNode } from 'react';
import { SITE, waLink } from '../config';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

// Si algo revienta en runtime, en lugar de una pantalla negra el visitante
// ve un mensaje con las vías de contacto — el lead no se pierde.
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error('StonyDev — error de runtime:', error);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          background: '#030303',
          color: '#e2e8f0',
          fontFamily: 'Inter, system-ui, sans-serif',
          padding: '24px',
          textAlign: 'center',
        }}
      >
        <span style={{ fontSize: '48px' }} aria-hidden="true">
          ⚡
        </span>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#fff' }}>
          Algo salió mal al cargar la página
        </h1>
        <p style={{ maxWidth: '440px', fontSize: '14px', color: '#94a3b8', lineHeight: 1.6 }}>
          Recargá la página para intentarlo de nuevo. Si el problema sigue, escribinos directo y te
          respondemos igual:
        </p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <a
            href={waLink(
              '¡Hola StonyDev! Les escribo desde la web (tuve un problema para cargarla).'
            )}
            style={{
              background: '#25D366',
              color: '#fff',
              fontWeight: 700,
              fontSize: '13px',
              padding: '10px 22px',
              borderRadius: '99px',
              textDecoration: 'none',
            }}
          >
            WhatsApp {SITE.whatsappDisplay}
          </a>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: 'transparent',
              color: '#e2e8f0',
              border: '1px solid rgba(255,255,255,.2)',
              fontWeight: 600,
              fontSize: '13px',
              padding: '10px 22px',
              borderRadius: '99px',
              cursor: 'pointer',
            }}
          >
            Recargar página
          </button>
        </div>
      </div>
    );
  }
}
