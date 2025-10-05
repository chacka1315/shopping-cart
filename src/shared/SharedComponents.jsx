export function Button({
  onClick,
  name = 'button',
  type = 'button',
  id = '',
  ariaLabel,
}) {
  return (
    <button
      onClick={onClick}
      type={type}
      id={id}
      {...(ariaLabel ? { 'aria-label': ariaLabel } : {})}
    >
      {name}
    </button>
  );
}

export function Input({
  onChange,
  id = '',
  placeholder = '',
  type = 'text',
  value,
}) {
  return (
    <input
      type={type}
      id={id}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
    />
  );
}
