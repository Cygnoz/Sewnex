type Props = { color?: string }

function LineChart({ color }: Props) {
    return (
        <div>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 2.5V17.5H17.5M15.8333 7.5L11.6667 11.6667L8.33333 8.33333L5.83333 10.8333" stroke={color ? color : "#495160"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

        </div>
    )
}

export default LineChart