import { Button, Image } from "@chakra-ui/react";
import React from "react";
import styles from "./ErrorBoundary.module.css";
interface PropsType {
  children: React.ReactNode;
}
interface StateType {
  hasError: boolean;
}
class ErrorBoundary extends React.Component<PropsType, StateType> {
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
      return (
        <div className={styles.error__boundary}>
          <h2>Oops, there is in cakesday app!</h2>
          <Image alt="logo" src="/header-logo.png" />
          <div>
            <Button
              type="button"
              onClick={() => this.setState({ hasError: false })}
            >
              Try again?
            </Button>
            <Button
              type="button"
              onClick={() => this.setState({ hasError: false })}
            >
              Report Error
            </Button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
