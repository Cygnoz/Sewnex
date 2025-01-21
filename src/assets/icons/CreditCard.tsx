
type Props = { color?: string }

function CreditCard({ color }: Props) {
    return (
        <div>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.33398 6.66659H14.6673M2.66732 3.33325H13.334C14.0704 3.33325 14.6673 3.93021 14.6673 4.66659V11.3333C14.6673 12.0696 14.0704 12.6666 13.334 12.6666H2.66732C1.93094 12.6666 1.33398 12.0696 1.33398 11.3333V4.66659C1.33398 3.93021 1.93094 3.33325 2.66732 3.33325Z"  stroke={color ? color : "#4B5C79"}  stroke-linecap="round" stroke-linejoin="round" />
            </svg>

        </div>
    )
}

export default CreditCard