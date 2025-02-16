type Props = {
  bgColor?: string;
  size?: string;
  width?: string;
  height?: string;
};

function ArrowUpRightIcon({ bgColor, size, width, height }: Props) {
  return (
    <div
      className={`p-3 rounded-full flex items-center justify-center`}
      style={{
        backgroundColor: bgColor || "transparent",
        width: width ? width : "52px",
        height: height ? height : "52px",
      }}
    >
      <svg
        width={size ? size : "28"}
        height={size ? size : "28"}
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.32538 8.3252H19.6746M19.6746 8.3252V19.6744M19.6746 8.3252L8.32538 19.6744"
          stroke="white"
          strokeWidth="2.47619"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default ArrowUpRightIcon;
