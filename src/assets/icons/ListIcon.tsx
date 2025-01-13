type Props = {color?:string}

function ListIcon({color }: Props) {
    return (
        <div>
            <svg width="20" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 17L5 19L9 15M13 6H21M13 12H21M13 18H21M4 5H8C8.55228 5 9 5.44772 9 6V10C9 10.5523 8.55228 11 8 11H4C3.44772 11 3 10.5523 3 10V6C3 5.44772 3.44772 5 4 5Z" stroke={color?color:"#A3A9B3"}stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

        </div>
    )
}

export default ListIcon