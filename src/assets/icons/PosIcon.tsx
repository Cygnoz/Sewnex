type Props = {color?:string}
function PosIcon({ color}: Props) {
    return (
        <div>
            <svg width="20" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 8V6C18 5.46957 17.7893 4.96086 17.4142 4.58579C17.0391 4.21071 16.5304 4 16 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V13C2 13.5304 2.21071 14.0391 2.58579 14.4142C2.96086 14.7893 3.46957 15 4 15H12M10 19V15.04V18.19M7 19H12M18 12H20C21.1046 12 22 12.8954 22 14V20C22 21.1046 21.1046 22 20 22H18C16.8954 22 16 21.1046 16 20V14C16 12.8954 16.8954 12 18 12Z" stroke={color?color:"#A3A9B3"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

        </div>
    )
}

export default PosIcon