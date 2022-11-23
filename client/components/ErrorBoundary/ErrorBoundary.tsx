import React from "react";

interface PropsType {
  children: React.ReactNode;
}

interface StateType {
  hasError: boolean;
}
class ErrorBoundary extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error: any) {
    console.log({ error });
    return { hasError: true };
  }
  componentDidCatch(error: any, errorInfo: any) {
    console.log({ error, errorInfo });
  }
  componentDidMount(): void {
    console.log({ hi: 2 });
  }
  render() {
    if (this.state.hasError) {
      console.log({ error: this.state.hasError });
      return (
        <div>
          <h2>Oops, there is an error!</h2>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false })}
          >
            Try again?
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
