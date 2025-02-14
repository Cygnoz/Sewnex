interface HomeCardProps {
    icon: React.ReactNode; // Accepts rendered JSX, e.g., <CheckIcon color="green" />
    title: string;
    description: string; // Description text below the title
    number: any;
    iconFrameColor?: string; // Frame background color for the icon
    bgColor?: string; // Background color for the card
    titleColor?: string;
    descriptionColor?: string;
    numberColor?: string;
    border?: string;
  }
  
  const HomeCard = ({
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
        className={`flex items-center justify-between w-full h-[90px] px-4 py-3  mr-6 rounded-[20px] ${
          bgColor ? `bg-[${bgColor}]` : 'bg-white'
        } ${border ? `border border-[${border}]` : ''} rounded-2xl shadow-sm`}
      >
        {/* Left Section: Icon, Title, and Description */}
        <div className="flex items-center">
          {/* Icon Frame */}
          <div
            className="w-[40px] h-[40px] rounded-full flex items-center justify-center"
            style={{
              background: iconFrameColor?.includes('linear-gradient')
                ? iconFrameColor
                : `background-color: ${iconFrameColor}`,
            }}
          >
            {icon}
          </div>
  
          {/* Title and Description */}
          <div className="ml-4">
            <h2
              className={`text-sm font-bold ${
                titleColor ? `text-[${titleColor}]` : 'text-[#0B1320]'
              }`}
            >
              {title}
            </h2>
            <p
              className={`text-xs font-normal ${
                descriptionColor ? `text-[${descriptionColor}]` : 'text-[#495160]'
              }`}
            >
              {description}
            </p>
          </div>
        </div>
  
        {/* Right Section: Number */}
        <div
          className={`text-2xl font-bold mr-4 ${
            numberColor ? `text-[${numberColor}]` : 'text-[#0B1320]'
          }`}
        >
          {number}
        </div>
      </div>
    );
  };
  
  export default HomeCard;
  