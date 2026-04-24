import { IconProps } from "../../types/todo.types";

export default function DotIcon({ size = 16, className }: IconProps) {
  return (
    <svg 
      viewBox="0 0 8 8" 
      width={size}
      height={size}
      fill="currentColor" 
      className={className}>
      <circle cx="4" cy="4" r="4" />
    </svg>
  );
}
