interface HomeCardProps {
    icon: React.ReactNode; // Accepts rendered JSX, e.g., <CheckIcon color="green" />
    title: string;
    description: string; // Description text below the title
    number: any;
    iconFrameColor: string; // Frame background color for the icon
    bgColor?: string; // Background color for the card
    titleColor?: string;
    descriptionColor?: string;
    numberColor?: string;
    border?: string;
  }
  
  const OrderCard = ({
    icon,
    title,
    description,
    number,
    iconFrameColor,
    bgColor,
    titleColor,
    descriptionColor,
    numberColor,
    border,
  }: HomeCardProps) => {
    return (
      <div
        className={`flex w-full h-[130px] px-5 py-4 rounded-[20px] mr-6 shadow-sm ${
          bgColor ? `bg-[${bgColor}]` : 'bg-white'
        } ${border ? `border border-[${border}]` : ''}`}
      >
        {/* Left Column: Icon, Title, and Description */}
        <div className="flex flex-col items-start justify-center w-2/3">
          {/* Icon Frame */}
          <div
            className="w-[48px] h-[48px] rounded-full flex items-center justify-center mb-2"
            style={{ backgroundColor: iconFrameColor }}
          >
            {icon}
          </div>
  
          {/* Title */}
          <h2
            className={`text-sm font-bold mb-1 ${
              titleColor ? `text-[${titleColor}]` : 'text-[#0B1320]'
            }`}
          >
            {title}
          </h2>
  
          {/* Description */}
          <p
            className={`text-xs ${
              descriptionColor ? `text-[${descriptionColor}]` : 'text-[#495160]'
            }`}
          >
            {description}
          </p>
        </div>
  
        {/* Right Column: Number */}
        <div
          className={`flex items-start justify-end w-1/3 text-2xl font-bold ${
            numberColor ? `text-[${numberColor}]` : 'text-[#0B1320]'
          }`}
        >
          {number}
        </div>
      </div>
    );
  };
  
  export default OrderCard;
  