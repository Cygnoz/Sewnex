

type Props = {color?:any}

const MessageIcon = ({color}: Props) => {
  return (
    <div>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.10841 11.6666C6.22175 12.2377 7.50246 12.3924 8.71977 12.1028C9.93707 11.8132 11.0109 11.0983 11.7478 10.0871C12.4846 9.07575 12.8361 7.83453 12.7388 6.58704C12.6414 5.33955 12.1018 4.16784 11.217 3.28306C10.3322 2.39827 9.16047 1.85859 7.91299 1.76127C6.6655 1.66395 5.42427 2.01539 4.41298 2.75226C3.40168 3.48912 2.68682 4.56296 2.39721 5.78026C2.1076 6.99756 2.2623 8.27828 2.83341 9.39161L1.66675 12.8333L5.10841 11.6666Z" stroke={color ||"#0B9C56"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

    </div>
  )
}

export default MessageIcon