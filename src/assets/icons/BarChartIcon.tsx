type Props = {color?:string}

function BarChartIcon({color }: Props) {
    return (
        <div>
            <svg width="20" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 3V21H21M13 17V9M18 17V5M8 17V14" stroke={color?color:"#A3A9B3"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

        </div>
    )
}

export default BarChartIcon