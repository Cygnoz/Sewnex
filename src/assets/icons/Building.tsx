
type Props = {color?:any, size?:number};

const Building = ({color,size}:Props) => {
  return (
    <div>
      <svg
        width={size||"20"}
        height={size||"20"}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.5026 18.3334V15.0001H12.5026V18.3334M6.66927 5.00008H6.6776M13.3359 5.00008H13.3443M10.0026 5.00008H10.0109M10.0026 8.33342H10.0109M10.0026 11.6667H10.0109M13.3359 8.33342H13.3443M13.3359 11.6667H13.3443M6.66927 8.33342H6.6776M6.66927 11.6667H6.6776M5.0026 1.66675H15.0026C15.9231 1.66675 16.6693 2.41294 16.6693 3.33341V16.6667C16.6693 17.5872 15.9231 18.3334 15.0026 18.3334H5.0026C4.08213 18.3334 3.33594 17.5872 3.33594 16.6667V3.33341C3.33594 2.41294 4.08213 1.66675 5.0026 1.66675Z"
          stroke={color?color:"#818894"}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  );
};

export default Building;
