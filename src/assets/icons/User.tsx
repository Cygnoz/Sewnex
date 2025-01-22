type Props = {color?:string};

const User = ({color}: Props) => {
  return (
    <div>
      <svg
        width="17"
        height="20"
        viewBox="0 0 17 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.8008 19V17C15.8008 15.9391 15.3794 14.9217 14.6292 14.1716C13.8791 13.4214 12.8616 13 11.8008 13H5.80078C4.73992 13 3.7225 13.4214 2.97235 14.1716C2.22221 14.9217 1.80078 15.9391 1.80078 17V19M12.8008 5C12.8008 7.20914 11.0099 9 8.80078 9C6.59164 9 4.80078 7.20914 4.80078 5C4.80078 2.79086 6.59164 1 8.80078 1C11.0099 1 12.8008 2.79086 12.8008 5Z"
          stroke={color?color:"#054928"}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  );
};

export default User;
