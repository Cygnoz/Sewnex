type Props = {
    size?: number;
    color?: string;
  };
  
  const CheckActive = ({ size, color }: Props) => {
    return (
      <svg  width={size ? size : "48px"}
      height={size ? size : "48px"}
       viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.75" width="48" height="48" rx="24" fill="url(#paint0_linear_2824_88493)"/>
      <path d="M33.9154 23.9999C33.9154 29.0624 29.8112 33.1666 24.7487 33.1666C19.6862 33.1666 15.582 29.0624 15.582 23.9999C15.582 18.9374 19.6862 14.8333 24.7487 14.8333C29.8112 14.8333 33.9154 18.9374 33.9154 23.9999ZM22.5029 29.0916L30.3379 21.2558L29.1595 20.0774L22.5904 26.6466L20.527 24.1383L19.2679 25.2299L22.5029 29.0908V29.0916Z" fill={color ? color : "#004D4D"} />
      <defs>
      <linearGradient id="paint0_linear_2824_88493" x1="0.950196" y1="11.5" x2="69.4502" y2="64.5" gradientUnits="userSpaceOnUse">
      <stop stop-color="#F7ECD9"/>
      <stop offset="1" stop-color="#B5F0D3"/>
      </linearGradient>
      </defs>
      </svg>
      
    );
  };
  
  export default CheckActive;
  