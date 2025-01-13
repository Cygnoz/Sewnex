type Props = {color?:string}

function CartIcon({ color}: Props) {
    return (
        <div>
            <svg width="20" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.05005 2.0498H4.05005L6.71005 14.4698C6.80763 14.9247 7.06072 15.3313 7.42576 15.6197C7.7908 15.908 8.24495 16.0602 8.71005 16.0498H18.49C18.9452 16.0491 19.3865 15.8931 19.7411 15.6076C20.0956 15.3222 20.3422 14.9243 20.4401 14.4798L22.09 7.0498H5.12005M9 21C9 21.5523 8.55228 22 8 22C7.44772 22 7 21.5523 7 21C7 20.4477 7.44772 20 8 20C8.55228 20 9 20.4477 9 21ZM20 21C20 21.5523 19.5523 22 19 22C18.4477 22 18 21.5523 18 21C18 20.4477 18.4477 20 19 20C19.5523 20 20 20.4477 20 21Z" stroke={color?color:"#A3A9B3"}  stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

        </div>
    )
}

export default CartIcon