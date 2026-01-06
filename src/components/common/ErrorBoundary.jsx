import React from 'react';

/**
 * Composant ErrorBoundary
 * Capture les erreurs React et les affiche de manière conviviale
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: '20px',
            margin: '20px',
            border: '1px solid #f44336',
            borderRadius: '8px',
            backgroundColor: '#ffebee',
          }}
        >
          <h2 style={{ color: '#c62828' }}>Une erreur est survenue</h2>
          <details
            style={{
              marginBottom: '20px',
              padding: '10px',
              backgroundColor: '#fff',
              borderRadius: '4px',
            }}
          >
            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
              Détails de l'erreur
            </summary>
            <pre
              style={{
                marginTop: '10px',
                padding: '10px',
                backgroundColor: '#f5f5f5',
                overflow: 'auto',
                fontSize: '12px',
              }}
            >
              {this.state.error && this.state.error.toString()}
              {'\n\n'}
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </pre>
          </details>
          <button
            onClick={this.resetError}
            style={{
              padding: '10px 20px',
              backgroundColor: '#1976d2',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            Réessayer
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
