import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorBoundary from '../ErrorBoundary';

const ProblemChild = () => {
  throw new Error('Error thrown from problem child');
};

test('Renders fallback UI when there is an error', () => {
  const { getByText } = render(
    <ErrorBoundary>
      <ProblemChild />
    </ErrorBoundary>
  );

  expect(getByText('Something went wrong.')).toBeInTheDocument();
});