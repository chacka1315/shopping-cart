import Homepage from '../features/Homepage';
import { expect, describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('Homepage component', () => {
  it('renders the welcome text bloc', () => {
    render(<Homepage />);
    expect(screen.getByTestId(/presentation/i)).toBeInTheDocument();
  });

  it('renders the carousel', () => {
    render(<Homepage />);
    expect(screen.getByTestId(/carousel/)).toBeInTheDocument();
  });
});
