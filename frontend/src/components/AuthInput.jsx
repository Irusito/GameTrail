export default function AuthInput({
  type = "text",
  placeholder,
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="
        w-full
        bg-[#121212]
        border
        border-[#2A2A2A]
        rounded-lg
        px-4
        py-3
        text-[#F5F5F5]
        outline-none
        focus:border-[#3C91E6]
        transition
      "
    />
  );
}