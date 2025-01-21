import React from 'react';

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  className: string;
  backgroundImage?: string;
  backgroundHeight?: string; // Add a new prop for height
  iconClassName?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon: Icon,
  className,
  backgroundImage,
  backgroundHeight = "100px", // Default height
  iconClassName = "bg-background/20 bg-custom-gradient2",
}) => {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-6 transition-all hover:shadow-lg ${className}`}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: backgroundHeight, // Apply customizable height
      }}
    >
      <div className="flex items-center gap-4">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-full ${iconClassName}`}
        >
          <Icon />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-semibold text-muted-foreground">
            {title}
          </p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
