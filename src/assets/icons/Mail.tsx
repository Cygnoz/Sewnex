
type Props = { color?: string }

function Mail({ color }: Props) {
    return (
        <div>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.6673 4.66675L8.68732 8.46675C8.4815 8.5957 8.24353 8.66409 8.00065 8.66409C7.75777 8.66409 7.5198 8.5957 7.31398 8.46675L1.33398 4.66675M2.66732 2.66675H13.334C14.0704 2.66675 14.6673 3.2637 14.6673 4.00008V12.0001C14.6673 12.7365 14.0704 13.3334 13.334 13.3334H2.66732C1.93094 13.3334 1.33398 12.7365 1.33398 12.0001V4.00008C1.33398 3.2637 1.93094 2.66675 2.66732 2.66675Z" stroke={color ? color : "#4B5C79"} stroke-linecap="round" stroke-linejoin="round" />
            </svg>


        </div>
    )
}

export default Mail