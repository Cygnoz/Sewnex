type Props = { color?: string, strokeWidth?: string };

function CheveronDown({ color, strokeWidth }: Props) {
  return (
    <div>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
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
