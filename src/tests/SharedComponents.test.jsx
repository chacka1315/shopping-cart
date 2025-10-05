import { Button, Input } from '../shared/SharedComponents';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const onClick = vi.fn();
const onChange = vi.fn();

describe('SharedComponent', () => {
  it('button has correct name and calls the callBk when user click', async () => {
    render(<Button onClick={onClick} name="Odin" />);
    const user = userEvent.setup();
    const button = screen.getByRole('button', { name: 'Odin' });

    expect(button).toBeInTheDocument();
    await user.click(button);
    expect(onClick).toHaveBeenCalled();
  });

  it('input call the callback', async () => {
    render(<Input onChange={onChange} />);
    const user = userEvent.setup();
    const input = screen.getByRole('textbox');

    await user.type(input, 'odin');

    expect(onChange).toHaveBeenCalledTimes(4);
  });
});
