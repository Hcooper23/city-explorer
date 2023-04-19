import React from 'react';
import { Alert } from 'react-bootstrap';

function ErrorAlert({ errorMessage }) {
  return (
    <Alert variant="danger" id="errorAlert">
      <Alert.Heading>Error</Alert.Heading>
      <p>{errorMessage}</p>
    </Alert>
  );
}

export default ErrorAlert;