

type Props = { size?: number; className?: string; color?: string };

function Upload({ size, className, color }: Props) {
  return (
    <div>
      <svg
        width={size || "18"}
        height={size || "18"}
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M15.75 11.25V14.25C15.75 14.6478 15.592 15.0294 15.3107 15.3107C15.0294 15.592 14.6478 15.75 14.25 15.75H3.75C3.35218 15.75 2.97064 15.592 2.68934 15.3107C2.40804 15.0294 2.25 14.6478 2.25 14.25V11.25M12.75 6L9 2.25M9 2.25L5.25 6M9 2.25V11.25"
          stroke={color?color:"#818894"}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  );
}

export default Upload;
