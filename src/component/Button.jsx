export default function Button({ type, text, disabled }) {
  return (
    <button type={type} className={`${disabled ? "bg-gray-300" : "bg-mainBlue"} font-semibold text-white h-12 rounded-md transition duration-300 text-lg`} disabled={disabled}>
      {text}
    </button>
  );
}
