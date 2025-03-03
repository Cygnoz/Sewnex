type Props = { color: string,className?:string };

const Delete = ({color,className}: Props) => {
  return (
    <div>
      <svg
        width="20"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M18 9L12 15M12 9L18 15M20 5H9L2 12L9 19H20C20.5304 19 21.0391 18.7893 21.4142 18.4142C21.7893 18.0391 22 17.5304 22 17V7C22 6.46957 21.7893 5.96086 21.4142 5.58579C21.0391 5.21071 20.5304 5 20 5Z"
          stroke={color}
          strokeWidth="1"
          strokeLinecap="round"
        strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default Delete;
