
type Props = {
    size?:number;
    color?:string;
}

const ArrowRight = ({size=9, color}: Props) => {
  return (
<svg width={size} height={size} viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.700073 4.6001H7.70007M7.70007 4.6001L4.20007 1.1001M7.70007 4.6001L4.20007 8.1001" stroke={color?color:"#565148"} stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  )
}

export default ArrowRight