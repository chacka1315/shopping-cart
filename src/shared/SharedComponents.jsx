export function Button({ onClick, name = 'button', type = 'button' }) {
  return (
    <button onClick={onClick} type={type}>
      {name}
    </button>
  );
}

export function Input({ onChange, id, placeholder, type = 'text', value }) {
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
