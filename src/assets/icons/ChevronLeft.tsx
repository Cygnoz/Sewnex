
type Props = { color?: string, className?: string, strokeWidth?: string };

const ChevronLeft = ({ color, className, strokeWidth }: Props) => {
  return (
    <div>
      <svg width={strokeWidth || "16"} height={strokeWidth || "16"} viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.84853 0.351472C9.31716 0.820101 9.31716 1.5799 8.84853 2.04853L2.89706 8L8.84853 13.9515C9.31716 14.4201 9.31716 15.1799 8.84853 15.6485C8.3799 16.1172 7.6201 16.1172 7.15147 15.6485L0.351472 8.84853C-0.117157 8.3799 -0.117157 7.6201 0.351472 7.15147L7.15147 0.351472C7.6201 -0.117157 8.3799 -0.117157 8.84853 0.351472Z" fill={color || "#0F172A"} />
      </svg>
    </div>
  );
};

export default ChevronLeft;
