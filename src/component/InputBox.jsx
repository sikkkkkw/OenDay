import { useTheme } from "../ThemeContext";

export default function InputBox({ name, type, placeholder, register, errorOption, errors }) {
  const { isDark } = useTheme();
  return (
    <div className="flex flex-col gap-1 relative">
      <input {...register(`${name}`, errorOption)} type={type} placeholder="" className={`input-custom peer ${errors && "ring-red-500 ring-3"} ${isDark && "text-white"} `} />
      {/* 플레이스홀더 대체 */}
      <label className={`label-custom ${isDark && "bg-[#111] peer-focus:bg-[#111]"}`}>{placeholder}</label>
      {errors && <span className="text-red-500 text-sm">{errors}</span>}
    </div>
  );
}
