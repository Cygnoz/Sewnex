type Props = { color: string,size?:number };

const Pen = ({ color,size }: Props) => {
  return (
    <div>
      <svg
        width={size || "14"}
        height={size || "14"}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17 3.00003C17.2547 2.69906 17.5697 2.45408 17.925 2.28071C18.2803 2.10733 18.6681 2.00936 19.0636 1.99304C19.4592 1.97672 19.8538 2.04241 20.2224 2.18591C20.5909 2.32942 20.9254 2.5476 21.2043 2.82655C21.4833 3.10549 21.7006 3.43909 21.8425 3.80607C21.9845 4.17305 22.0478 4.56536 22.0286 4.95801C22.0094 5.35065 21.908 5.73501 21.7309 6.08659C21.5538 6.43817 21.3049 6.74926 21 7.00003L7.5 20.5L2 22L3.5 16.5L17 3.00003Z"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default Pen;
