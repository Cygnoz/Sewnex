type Props = { color?: string }

function Info({ color }: Props) {
    return (
        <div>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.99935 13.3334V10.0001M9.99935 6.66675H10.0077M18.3327 10.0001C18.3327 14.6025 14.6017 18.3334 9.99935 18.3334C5.39698 18.3334 1.66602 14.6025 1.66602 10.0001C1.66602 5.39771 5.39698 1.66675 9.99935 1.66675C14.6017 1.66675 18.3327 5.39771 18.3327 10.0001Z"
                    stroke={color ? color : "#303F58"}
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    )
}

export default Info
