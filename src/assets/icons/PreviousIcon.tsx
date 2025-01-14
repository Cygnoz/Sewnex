type Props = {
    size?: number;
    color?: string;
}
 
const PreviousIcon = ({ size=24, color='white' }: Props) => {
    return (
        <svg width={size} height={size} viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.75 11.0996L5.25 7.59961L8.75 4.09961" stroke={color?color:"#71736B"} stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
       
    )
}
 
export default PreviousIcon