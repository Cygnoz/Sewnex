

type Props = {color?:any};

export const List = ({ color }: Props) => {
  return (
    <div>
      <svg
        width="15"
        height="17"
        viewBox="0 0 15 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.33464 4.25H12.918M5.33464 8.5H12.918M5.33464 12.75H12.918M2.41797 4.25H2.4238M2.41797 8.5H2.4238M2.41797 12.75H2.4238"
          stroke={color?color:"#004D4D"}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  );
};
