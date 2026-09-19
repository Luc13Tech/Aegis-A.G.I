import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('Erreur capturée par ErrorBoundary:', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <pre
          style={{
            padding: 20,
            color: '#DC2626',
            fontFamily: 'monospace',
            whiteSpace: 'pre-wrap',
            fontSize: 13,
            background: '#fff',
            minHeight: '100vh',
          }}
        >
          Erreur d'affichage :{'\n\n'}
          {this.state.error.message}
          {'\n\n'}
          {this.state.error.stack}
        </pre>
      );
    }
    return this.props.children;
  }
}
