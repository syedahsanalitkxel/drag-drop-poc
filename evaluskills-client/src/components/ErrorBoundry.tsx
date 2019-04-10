import React, { createRef, RefObject } from 'react';

import NotificationSystem, { System } from 'react-notification-system';
import { ErrorContextProvider } from '../context/ErrorContext';
import ErrorContextInterface from '../interfaces/ErrorContext';
import ErrorObjectInterface from '../interfaces/ErrorObject';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState extends ErrorContextInterface {
  hasError: false;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public static getDerivedStateFromError(error: any) {
    console.log('DERIVED STATE ', error);
    return { hasError: true };
  }

  private notificationsRef: RefObject<System> = createRef<System>();

  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.setError = this.setError.bind(this);

    this.state = {
      error: {
        fail: false,
        message: '',
        statusCode: '',
      },
      hasError: false,
      setError: this.setError,
    };
  }

  public setError(error: ErrorObjectInterface, show?: boolean) {
    if (show && this.notificationsRef && this.notificationsRef.current) {
      this.notificationsRef.current.addNotification({
        level: 'error',
        message: (
          <div>
            <b>{error.statusCode}: </b>
            {error.message}
          </div>
        ),
        position: 'tc',
      });
    }
    this.setState({
      ...this.state,
      error,
    });
  }

  public componentDidCatch(error: any, info: any) {
    // You can also log the error to an error reporting service
    console.log('CDC', error, info);
  }

  public render() {
    const { children } = this.props;
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    return (
      <ErrorContextProvider value={this.state}>
        <NotificationSystem ref={this.notificationsRef} />
        {children}
      </ErrorContextProvider>
    );
  }
}

export default ErrorBoundary;
