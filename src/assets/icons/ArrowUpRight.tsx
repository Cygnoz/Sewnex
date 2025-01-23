type Props = {
    size?: number;
    color?: string;
};

const ArrowUpRight = ({ size, color }: Props) => {
    return (
        <svg width={size ? size : "10px"}
            height={size ? size : "10px"} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1H11M11 1V11M11 1L1 11" stroke={color ? color : "#818894"}
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>


    );
};

export default ArrowUpRight;
