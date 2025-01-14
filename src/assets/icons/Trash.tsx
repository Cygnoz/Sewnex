type Props = {
    color?: string;
    size?: number;
  };
  
  function Trash({ color, size }: Props) {
    return (
      <svg
      width={size||"22"}
      height={size||"22"}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 3.99967H14M12.6667 3.99967V13.333C12.6667 13.9997 12 14.6663 11.3333 14.6663H4.66667C4 14.6663 3.33333 13.9997 3.33333 13.333V3.99967M5.33333 3.99967V2.66634C5.33333 1.99967 6 1.33301 6.66667 1.33301H9.33333C10 1.33301 10.6667 1.99967 10.6667 2.66634V3.99967"
          stroke={ color || "#768294"}
                  stroke-width="1.7"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    );
  }
  
  export default Trash;