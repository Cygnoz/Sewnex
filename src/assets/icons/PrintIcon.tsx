
type Props = { color?: any };

export const PrintIcon = ({ color }: Props) => {
  return (
    <div>
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_3556_20376)">
          <path
            d="M3.5013 5.25008V1.16675H10.5013V5.25008M3.5013 10.5001H2.33464C2.02522 10.5001 1.72847 10.3772 1.50968 10.1584C1.29089 9.93958 1.16797 9.64283 1.16797 9.33341V6.41675C1.16797 6.10733 1.29089 5.81058 1.50968 5.59179C1.72847 5.373 2.02522 5.25008 2.33464 5.25008H11.668C11.9774 5.25008 12.2741 5.373 12.4929 5.59179C12.7117 5.81058 12.8346 6.10733 12.8346 6.41675V9.33341C12.8346 9.64283 12.7117 9.93958 12.4929 10.1584C12.2741 10.3772 11.9774 10.5001 11.668 10.5001H10.5013M3.5013 8.16675H10.5013V12.8334H3.5013V8.16675Z"
            stroke={color?color:"#0B9C56"}
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_3556_20376">
            <rect width="14" height="14" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};
