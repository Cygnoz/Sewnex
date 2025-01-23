type Props = { color?: string; size?: number; };
function PrinterIcon({ color, size }: Props) {
  return (
    <svg width={size || 17}
      height={size || 17} viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_2849_111064)">
        <path d="M5.25 6.75V1.5H14.25V6.75M5.25 13.5H3.75C3.35218 13.5 2.97064 13.342 2.68934 13.0607C2.40804 12.7794 2.25 12.3978 2.25 12V8.25C2.25 7.85218 2.40804 7.47064 2.68934 7.18934C2.97064 6.90804 3.35218 6.75 3.75 6.75H15.75C16.1478 6.75 16.5294 6.90804 16.8107 7.18934C17.092 7.47064 17.25 7.85218 17.25 8.25V12C17.25 12.3978 17.092 12.7794 16.8107 13.0607C16.5294 13.342 16.1478 13.5 15.75 13.5H14.25M5.25 10.5H14.25V16.5H5.25V10.5Z"
          stroke={color || "#0B9C56"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </g>
      <defs>
        <clipPath id="clip0_2849_111064">
          <rect width="18" height="18" fill="white" transform="translate(0.75)" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default PrinterIcon;
