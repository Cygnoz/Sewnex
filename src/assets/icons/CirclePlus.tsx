type Props = {
    size?: number;
    color?: string;
  };

function CirclePlus({ size, color}: Props) {
    return (
        <div>
            <svg width={size || "16"} height={size || "16"} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_3303_20484)">
                    <path d="M5.33203 7.99992H10.6654M7.9987 5.33325V10.6666M14.6654 7.99992C14.6654 11.6818 11.6806 14.6666 7.9987 14.6666C4.3168 14.6666 1.33203 11.6818 1.33203 7.99992C1.33203 4.31802 4.3168 1.33325 7.9987 1.33325C11.6806 1.33325 14.6654 4.31802 14.6654 7.99992Z" stroke={color || "white"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </g>
                <defs>
                    <clipPath id="clip0_3303_20484">
                        <rect width="16" height="16" fill="white" />
                    </clipPath>
                </defs>
            </svg>

        </div>
    )
}

export default CirclePlus