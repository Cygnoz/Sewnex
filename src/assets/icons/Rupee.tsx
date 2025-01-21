type Props = { color?: string };

const Rupee = ({ color }: Props) => {
  return (
    <div>
      <svg
        width="15"
        height="20"
        viewBox="0 0 15 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.59961 1H13.5996M1.59961 6H13.5996M10.0996 19L1.59961 11H4.59961C11.2666 11 11.2666 1 4.59961 1"
          stroke={color?color:"#054928"}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  );
};

export default Rupee;
