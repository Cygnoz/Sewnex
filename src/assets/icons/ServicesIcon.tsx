type Props = { color: string }

function ServicesIcon({ color }: Props) {
    return (
        <div>
            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.9991 3.21973C15.0973 3.21966 15.1941 3.2427 15.2817 3.28701C15.3693 3.33131 15.4452 3.39562 15.5033 3.47473L15.5491 3.54723L18.2683 8.57056L18.3 8.64806L18.31 8.68139L18.3266 8.76639L18.3316 8.84473C18.3312 8.90101 18.3236 8.95701 18.3091 9.01139L18.27 9.11556L18.2383 9.17306C18.2193 9.20268 18.1984 9.23108 18.1758 9.25806L18.2258 9.19306L18.205 9.22223L10.4966 17.9764C10.4334 18.0623 10.3477 18.1291 10.2491 18.1697L10.1675 18.1972L10.1025 18.2114L9.99996 18.2197L9.91663 18.2147L9.81829 18.1931C9.76731 18.1786 9.71852 18.1573 9.67329 18.1297L9.66579 18.1239C9.62636 18.0994 9.58999 18.0703 9.55746 18.0372L1.81579 9.24889L1.79413 9.22223L1.76079 9.17306C1.7137 9.09675 1.68357 9.01121 1.67246 8.92223L1.66663 8.84473L1.66913 8.78973L1.67996 8.71556L1.69996 8.64389L1.71829 8.59473L1.74163 8.54723L4.44996 3.54723C4.49665 3.46094 4.563 3.38686 4.64364 3.33098C4.72428 3.2751 4.81694 3.23898 4.91413 3.22556L4.99913 3.21973H14.9991ZM12.4975 9.46973H7.49829L9.99829 15.8756L12.4975 9.46973ZM6.15746 9.46973H3.67413L8.13329 14.5314L6.15746 9.46973ZM16.3225 9.46973H13.84L11.8666 14.5281L16.3225 9.46973ZM7.47579 4.46973H5.37079L3.33913 8.21973H6.27579L7.47579 4.46973ZM11.2091 4.46973H8.78829L7.58746 8.21973H12.4083L11.2091 4.46973ZM14.6258 4.46973H12.5216L13.7216 8.21973H16.6566L14.6258 4.46973Z" fill={color} />
            </svg>


        </div>
    )
}

export default ServicesIcon