type Props = { color?: string, strokeWidth?: string; size?: string, className?:string };

function CheveronDown({ color, strokeWidth, size, className }: Props) {
  return (
    <div>
      <svg
        width={size ? size : "24"}
        height={size ? size : "24"}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className?className:""}
      >
        <path
          d="M6 9L12 15L18 9"
          stroke={color ? color : "#818894"}
          stroke-width={strokeWidth ? strokeWidth : "2"}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  );
}

export default CheveronDown;
